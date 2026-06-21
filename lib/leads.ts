export type Lead = {
  name?: string;
  phone?: string;
  destination?: string;
  dates?: string; // travel dates / month
  travelers?: string; // party size
  budget?: string;
  message?: string;
  itinerary?: string; // optional: full AI itinerary attached
  locale?: string;
  source?: string; // "contact" | "planner"
};

function formatLead(lead: Lead): string {
  const rows: string[] = ["🌍 SILKORA — новая заявка"];
  if (lead.source) rows.push(`Источник: ${lead.source}`);
  if (lead.name) rows.push(`Имя: ${lead.name}`);
  if (lead.phone) rows.push(`Телефон: ${lead.phone}`);
  if (lead.destination) rows.push(`Направление: ${lead.destination}`);
  if (lead.dates) rows.push(`Даты: ${lead.dates}`);
  if (lead.travelers) rows.push(`Путешественников: ${lead.travelers}`);
  if (lead.budget) rows.push(`Бюджет: ${lead.budget}`);
  if (lead.message) rows.push(`Сообщение: ${lead.message}`);
  if (lead.locale) rows.push(`Язык: ${lead.locale}`);
  if (lead.itinerary) rows.push(`\n— Маршрут —\n${lead.itinerary}`);
  return rows.join("\n");
}

async function sendTelegram(text: string): Promise<void> {
  const token = process.env.TELEGRAM_BOT_TOKEN;
  const chat = process.env.TELEGRAM_CHAT_ID;
  if (!token || !chat) throw new Error("telegram not configured");
  const res = await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      chat_id: chat,
      text: text.slice(0, 4000),
      disable_web_page_preview: true,
    }),
  });
  if (!res.ok) throw new Error(`Telegram error: ${res.status}`);
}

async function sendEmail(text: string): Promise<void> {
  const key = process.env.RESEND_API_KEY;
  const to = process.env.LEAD_EMAIL;
  if (!key || !to) throw new Error("resend not configured");
  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${key}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from: "SILKORA <onboarding@resend.dev>",
      to: [to],
      subject: "SILKORA — новая заявка",
      text,
    }),
  });
  if (!res.ok) throw new Error(`Resend error: ${res.status}`);
}

// Durable fallback sink: POST the raw lead anywhere (Google Apps Script,
// n8n, Zapier, Supabase fn). Ensures no lead is ever lost if Telegram fails.
async function sendFallback(lead: Lead): Promise<void> {
  const url = process.env.LEAD_FALLBACK_WEBHOOK;
  if (!url) throw new Error("fallback not configured");
  const res = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ ...lead, receivedAt: new Date().toISOString() }),
  });
  if (!res.ok) throw new Error(`Fallback error: ${res.status}`);
}

// Delivers a lead across every configured channel and NEVER throws — a lead
// must never be silently lost. Returns which channels accepted it.
export async function deliverLead(
  lead: Lead,
): Promise<{ channel: string; channels: string[] }> {
  const text = formatLead(lead);
  const channels: string[] = [];

  // Durable sink first (best-effort, independent of the notification channel).
  try {
    await sendFallback(lead);
    channels.push("webhook");
  } catch (err) {
    if (process.env.LEAD_FALLBACK_WEBHOOK)
      console.error("Lead fallback failed:", err);
  }

  // Notification channel: Telegram, then email.
  try {
    await sendTelegram(text);
    channels.push("telegram");
  } catch (tgErr) {
    if (process.env.TELEGRAM_BOT_TOKEN)
      console.error("Telegram delivery failed:", tgErr);
    try {
      await sendEmail(text);
      channels.push("email");
    } catch (mailErr) {
      if (process.env.RESEND_API_KEY)
        console.error("Email delivery failed:", mailErr);
    }
  }

  // Last-resort durability: always log so nothing is lost.
  if (channels.length === 0) {
    console.log("\n[SILKORA LEAD]\n" + text + "\n");
    channels.push("console");
  }

  return { channel: channels[0], channels };
}
