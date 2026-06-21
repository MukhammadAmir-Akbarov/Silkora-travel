import type { PlannerInput } from "./prompts";

// Fallback itinerary used when ANTHROPIC_API_KEY is not configured,
// so the planner is fully demonstrable without a key.
export function demoItinerary(input: PlannerInput): string {
  const rawDest =
    input.destination?.trim() ||
    (input.locale === "ru"
      ? "Самарканд"
      : input.locale === "uz"
        ? "Samarqand"
        : "Samarkand");
  // Escape Markdown-significant characters before interpolating into headings.
  const dest = rawDest
    .replace(/[\\`*_{}[\]()#+\-.!|>~]/g, "\\$&")
    .replace(/\s+/g, " ");
  const days = Math.min(Math.max(input.durationDays ?? 3, 1), 4);

  const T = {
    ru: {
      title: `Маршрут мечты: ${dest}`,
      intro:
        "Образец маршрута от SILKORA AI. Подключите ANTHROPIC_API_KEY — и здесь появится по-настоящему персональный план.",
      day: (n: number) => `День ${n} — знакомство и впечатления`,
      morning: "**Утро:** неспешный завтрак и обзорная прогулка по главным жемчужинам направления.",
      afternoon: "**День:** авторская экскурсия с гидом, локальный обед и время для атмосферных кадров.",
      evening: "**Вечер:** ужин в характерном ресторане и закат в лучшей видовой точке.",
      stayH: "Где остановиться",
      stay: "- Бутик-отель в историческом центре\n- Городской 5★ с панорамным видом\n- Уютный гостевой дом с национальным колоритом",
      budgetH: "Ориентир по бюджету",
      budget: "Примерно **$700–$1500** на человека (перелёт + проживание + экскурсии). Это оценка — точную смету подготовит менеджер.",
      tipsH: "Советы SILKORA",
      tips: "- Лучшее время — весна и ранняя осень\n- Бронируйте отели заранее в высокий сезон\n- Загляните на местный базар за специями и сувенирами",
      outro: "Нравится? Отправьте этот маршрут менеджеру SILKORA — и мы превратим его в реальное путешествие.",
    },
    en: {
      title: `Dream itinerary: ${dest}`,
      intro:
        "A sample itinerary from SILKORA AI. Add an ANTHROPIC_API_KEY to generate a truly personalised plan here.",
      day: (n: number) => `Day ${n} — discover & delight`,
      morning: "**Morning:** a relaxed breakfast and a walk through the destination's signature highlights.",
      afternoon: "**Afternoon:** a private guided tour, a local lunch and time for the perfect photos.",
      evening: "**Evening:** dinner at a characterful restaurant and sunset from the best viewpoint.",
      stayH: "Where to stay",
      stay: "- Boutique hotel in the historic centre\n- Downtown 5★ with panoramic views\n- Cosy guesthouse full of local character",
      budgetH: "Approximate budget",
      budget: "Around **$700–$1500** per person (flights + stay + experiences). This is an estimate — a manager will prepare an exact quote.",
      tipsH: "SILKORA tips",
      tips: "- Best time: spring and early autumn\n- Book hotels early in high season\n- Visit the local bazaar for spices and souvenirs",
      outro: "Love it? Send this itinerary to a SILKORA manager and we'll turn it into a real journey.",
    },
    uz: {
      title: `Orzudagi marshrut: ${dest}`,
      intro:
        "SILKORA AI namunaviy marshruti. Bu yerda haqiqiy shaxsiy reja chiqishi uchun ANTHROPIC_API_KEY qoʻshing.",
      day: (n: number) => `${n}-kun — tanishuv va taassurotlar`,
      morning: "**Ertalab:** bemalol nonushta va yoʻnalishning asosiy goʻzalliklari boʻylab sayr.",
      afternoon: "**Kunduzi:** gid bilan maxsus ekskursiya, mahalliy tushlik va ajoyib suratlar uchun vaqt.",
      evening: "**Kechqurun:** milliy restoranda kechki ovqat va eng yaxshi nuqtadan quyosh botishi.",
      stayH: "Qayerda toʻxtash",
      stay: "- Tarixiy markazdagi butik-mehmonxona\n- Panoramali 5★ shahar mehmonxonasi\n- Milliy ruhdagi shinam mehmon uyi",
      budgetH: "Taxminiy byudjet",
      budget: "Bir kishi uchun taxminan **$700–$1500** (reys + joylashuv + ekskursiyalar). Bu taxmin — aniq hisobni menejer tayyorlaydi.",
      tipsH: "SILKORA maslahatlari",
      tips: "- Eng yaxshi vaqt — bahor va erta kuz\n- Yuqori mavsumda mehmonxonalarni oldindan bron qiling\n- Ziravor va sovgʻalar uchun mahalliy bozorga kiring",
      outro: "Yoqdimi? Ushbu marshrutni SILKORA menejeriga yuboring — biz uni haqiqiy sayohatga aylantiramiz.",
    },
  }[input.locale];

  const dayBlocks = Array.from({ length: days }, (_, i) => {
    const n = i + 1;
    return `### ${T.day(n)}\n- ${T.morning}\n- ${T.afternoon}\n- ${T.evening}`;
  }).join("\n\n");

  return [
    `## ${T.title}`,
    T.intro,
    "",
    dayBlocks,
    "",
    "---",
    `### ${T.stayH}`,
    T.stay,
    "",
    `### ${T.budgetH}`,
    T.budget,
    "",
    `### ${T.tipsH}`,
    T.tips,
    "",
    T.outro,
  ].join("\n");
}
