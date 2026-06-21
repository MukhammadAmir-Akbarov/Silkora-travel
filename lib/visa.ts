export type VisaLocale = "ru" | "en" | "uz";

// Official portals (locale-independent). Always the source of truth.
export const VISA_OFFICIAL: Record<string, string> = {
  uzbekistan: "https://e-visa.gov.uz",
  turkey: "https://www.evisa.gov.tr",
  uae: "https://smartservices.icp.gov.ae",
  maldives: "https://imuga.immigration.gov.mv",
  schengen: "https://www.schengenvisainfo.com",
};

type Outbound = { key: string; name: string; status: string; note: string };
type FaqItem = { q: string; a: string };

type VisaContent = {
  title: string;
  subtitle: string;
  inboundTitle: string;
  inboundIntro: string;
  inboundPoints: string[];
  inboundCta: string;
  outboundTitle: string;
  outboundIntro: string;
  outbound: Outbound[];
  faqTitle: string;
  faq: FaqItem[];
  disclaimer: string;
  helpTitle: string;
  helpText: string;
  helpCta: string;
};

export const VISA: Record<VisaLocale, VisaContent> = {
  ru: {
    title: "Визовая информация",
    subtitle:
      "Кратко о визах для въезда в Узбекистан и выезда за рубеж. Актуальные требования — на официальных порталах, а оформление мы возьмём на себя.",
    inboundTitle: "Виза в Узбекистан (для туристов)",
    inboundIntro:
      "Узбекистан открыт для путешественников: для граждан многих стран виза не нужна, для остальных действует удобная электронная виза (e-Visa).",
    inboundPoints: [
      "Безвизовый въезд для граждан 90+ стран (как правило, до 30 дней).",
      "Электронная виза (e-Visa) оформляется онлайн за несколько дней.",
      "Нужен загранпаспорт, действительный ещё минимум 3 месяца.",
      "Регистрация по месту пребывания оформляется автоматически через отель.",
    ],
    inboundCta: "Оформить e-Visa на e-visa.gov.uz",
    outboundTitle: "Визы для выезда (граждане Узбекистана)",
    outboundIntro:
      "Самые популярные направления SILKORA и их визовый режим для граждан Узбекистана.",
    outbound: [
      { key: "turkey", name: "Турция", status: "Без визы", note: "Как правило, до 30 дней по загранпаспорту." },
      { key: "uae", name: "ОАЭ (Дубай)", status: "Виза по прилёте / e-Visa", note: "Оформляется быстро, часто через авиакомпанию или агентство." },
      { key: "maldives", name: "Мальдивы", status: "Виза по прилёте", note: "Бесплатно, до 30 дней. Нужны обратный билет и бронь отеля." },
      { key: "schengen", name: "Европа (Шенген)", status: "Требуется виза", note: "Запись в визовый центр, пакет документов, бронь и страховка." },
    ],
    faqTitle: "Частые вопросы",
    faq: [
      { q: "Нужна ли виза в Узбекистан?", a: "Зависит от гражданства: для 90+ стран — нет, для остальных оформляется e-Visa онлайн. Проверьте свою страну на e-visa.gov.uz." },
      { q: "Сколько оформляется e-Visa?", a: "Обычно 2–3 рабочих дня. Рекомендуем подавать заявку заранее." },
      { q: "Помогаете ли вы с визами для выезда?", a: "Да. Собираем документы, заполняем анкеты и сопровождаем вас до получения визы." },
      { q: "Какой паспорт нужен?", a: "Загранпаспорт, действительный ещё минимум 3–6 месяцев после окончания поездки." },
    ],
    disclaimer:
      "Визовые правила могут меняться. Перед поездкой уточняйте актуальные требования на официальном сайте или у наших менеджеров.",
    helpTitle: "Поможем с визой",
    helpText:
      "Возьмём на себя документы, анкеты и запись — вам останется только собрать чемодан.",
    helpCta: "Получить помощь",
  },
  en: {
    title: "Visa information",
    subtitle:
      "A quick guide to visas for entering Uzbekistan and travelling abroad. Always confirm current rules on the official portals — and let us handle the paperwork.",
    inboundTitle: "Visa to Uzbekistan (for tourists)",
    inboundIntro:
      "Uzbekistan is open to travellers: citizens of many countries need no visa, and the rest can use a convenient e-Visa.",
    inboundPoints: [
      "Visa-free entry for citizens of 90+ countries (usually up to 30 days).",
      "The e-Visa is issued online within a few days.",
      "A passport valid for at least 3 more months is required.",
      "Registration at your place of stay is handled automatically by your hotel.",
    ],
    inboundCta: "Apply for an e-Visa at e-visa.gov.uz",
    outboundTitle: "Visas for travelling abroad (Uzbek citizens)",
    outboundIntro:
      "SILKORA's most popular destinations and their visa regime for Uzbek citizens.",
    outbound: [
      { key: "turkey", name: "Turkey", status: "Visa-free", note: "Typically up to 30 days with a passport." },
      { key: "uae", name: "UAE (Dubai)", status: "Visa on arrival / e-Visa", note: "Issued quickly, often via the airline or an agency." },
      { key: "maldives", name: "Maldives", status: "Visa on arrival", note: "Free, up to 30 days. A return ticket and hotel booking are required." },
      { key: "schengen", name: "Europe (Schengen)", status: "Visa required", note: "Appointment at a visa centre, documents, booking and insurance." },
    ],
    faqTitle: "Frequently asked questions",
    faq: [
      { q: "Do I need a visa for Uzbekistan?", a: "It depends on your citizenship: 90+ countries are visa-free; the rest apply for an e-Visa online. Check your country at e-visa.gov.uz." },
      { q: "How long does the e-Visa take?", a: "Usually 2–3 business days. We recommend applying in advance." },
      { q: "Do you help with outbound visas?", a: "Yes. We gather documents, fill in forms and guide you all the way to approval." },
      { q: "What passport do I need?", a: "A passport valid for at least 3–6 months after your trip ends." },
    ],
    disclaimer:
      "Visa rules can change. Always confirm current requirements on the official website or with our managers before travelling.",
    helpTitle: "We'll handle your visa",
    helpText:
      "We take care of documents, forms and appointments — all you need to do is pack.",
    helpCta: "Get help",
  },
  uz: {
    title: "Viza ma'lumotlari",
    subtitle:
      "Oʻzbekistonga kirish va chet elga chiqish vizalari haqida qisqacha. Dolzarb talablarni rasmiy portallarda tekshiring — hujjatlarni esa biz oʻz zimmamizga olamiz.",
    inboundTitle: "Oʻzbekistonga viza (sayyohlar uchun)",
    inboundIntro:
      "Oʻzbekiston sayohatchilar uchun ochiq: koʻplab davlat fuqarolariga viza kerak emas, qolganlari uchun qulay elektron viza (e-Visa) mavjud.",
    inboundPoints: [
      "90+ davlat fuqarolari uchun vizasiz kirish (odatda 30 kungacha).",
      "Elektron viza (e-Visa) bir necha kun ichida onlayn rasmiylashtiriladi.",
      "Kamida 3 oy amal qiladigan xorijiy pasport kerak.",
      "Yashash joyida roʻyxatdan oʻtish mehmonxona orqali avtomatik amalga oshiriladi.",
    ],
    inboundCta: "e-visa.gov.uz orqali e-Visa olish",
    outboundTitle: "Chet elga chiqish vizalari (Oʻzbekiston fuqarolari)",
    outboundIntro:
      "SILKORAning eng mashhur yoʻnalishlari va ular uchun Oʻzbekiston fuqarolariga viza rejimi.",
    outbound: [
      { key: "turkey", name: "Turkiya", status: "Vizasiz", note: "Odatda pasport bilan 30 kungacha." },
      { key: "uae", name: "BAA (Dubay)", status: "Kelishda viza / e-Visa", note: "Tez rasmiylashtiriladi, koʻpincha aviakompaniya yoki agentlik orqali." },
      { key: "maldives", name: "Maldiv orollari", status: "Kelishda viza", note: "Bepul, 30 kungacha. Qaytish chiptasi va mehmonxona broni kerak." },
      { key: "schengen", name: "Yevropa (Shengen)", status: "Viza kerak", note: "Viza markaziga yozilish, hujjatlar, bron va sugʻurta." },
    ],
    faqTitle: "Koʻp soʻraladigan savollar",
    faq: [
      { q: "Oʻzbekistonga viza kerakmi?", a: "Fuqarolikka bogʻliq: 90+ davlat uchun kerak emas, qolganlari e-Visa onlayn rasmiylashtiradi. Davlatingizni e-visa.gov.uz da tekshiring." },
      { q: "e-Visa qancha vaqtda tayyor boʻladi?", a: "Odatda 2–3 ish kuni. Arizani oldindan topshirishni tavsiya qilamiz." },
      { q: "Chet el vizalarida yordam berasizmi?", a: "Ha. Hujjatlarni yigʻamiz, anketalarni toʻldiramiz va viza olinguncha hamrohlik qilamiz." },
      { q: "Qanday pasport kerak?", a: "Sayohat tugagach kamida 3–6 oy amal qiladigan xorijiy pasport." },
    ],
    disclaimer:
      "Viza qoidalari oʻzgarishi mumkin. Sayohatdan oldin dolzarb talablarni rasmiy saytda yoki menejerlarimizdan aniqlang.",
    helpTitle: "Vizada yordam beramiz",
    helpText:
      "Hujjatlar, anketalar va navbatni oʻz zimmamizga olamiz — sizga faqat jamlanish qoladi.",
    helpCta: "Yordam olish",
  },
};
