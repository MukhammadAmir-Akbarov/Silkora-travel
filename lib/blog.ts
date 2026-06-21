export type BlogLocale = "ru" | "en" | "uz";

export type BlogContent = {
  title: string;
  excerpt: string;
  tag: string;
  body: string; // markdown
};

export type Post = {
  slug: string;
  image: string;
  date: string; // ISO yyyy-mm-dd
  readMin: number;
  content: Record<BlogLocale, BlogContent>;
};

export const POSTS: Post[] = [
  {
    slug: "silk-road-7-days",
    image: "/destinations/samarkand.jpg",
    date: "2026-05-20",
    readMin: 6,
    content: {
      ru: {
        title: "Великий шёлковый путь за 7 дней: идеальный маршрут",
        excerpt:
          "Самарканд, Бухара и Хива за одну неделю — как увидеть главное без спешки.",
        tag: "Маршруты",
        body: `## С чего начать
Классический маршрут по Узбекистану укладывается в семь дней и связывает три города-сокровища Шёлкового пути. Между ними удобно перемещаться на скоростных поездах «Афросиёб».

### Дни 1–3: Самарканд
Площадь Регистан, мавзолей Гур-Эмир, некрополь Шахи-Зинда и обсерватория Улугбека. Закладывайте вечер на прогулку по Регистану без толп.

### Дни 4–5: Бухара
Минарет Калян, торговые купола и ансамбль Ляби-Хауз. Бухара компактна — всё в шаговой доступности.

### Дни 6–7: Хива
Ичан-Кала за крепостными стенами: бирюзовые минареты и тишина утренних улочек.

## Советы
- Лучшее время — апрель–май и сентябрь–октябрь.
- Бронируйте поезда «Афросиёб» заранее.
- Возьмите наличные для базаров и ремесленных лавок.

SILKORA соберёт этот маршрут под ваш темп и бюджет — с личным гидом и проверенными отелями.`,
      },
      en: {
        title: "The Great Silk Road in 7 days: the perfect route",
        excerpt:
          "Samarkand, Bukhara and Khiva in one week — how to see the best without rushing.",
        tag: "Itineraries",
        body: `## Where to begin
The classic route through Uzbekistan fits into seven days and links the three treasure cities of the Silk Road. High-speed Afrosiyob trains connect them comfortably.

### Days 1–3: Samarkand
Registan Square, the Gur-Emir mausoleum, the Shah-i-Zinda necropolis and the Ulugh Beg observatory. Save an evening for a crowd-free walk across Registan.

### Days 4–5: Bukhara
The Kalyan minaret, the trading domes and the Lyab-i Hauz ensemble. Bukhara is compact — everything is within walking distance.

### Days 6–7: Khiva
Itchan Kala behind its fortress walls: turquoise minarets and the silence of early-morning lanes.

## Tips
- Best time: April–May and September–October.
- Book Afrosiyob trains in advance.
- Carry cash for bazaars and craft workshops.

SILKORA will tailor this route to your pace and budget — with a private guide and trusted hotels.`,
      },
      uz: {
        title: "Buyuk Ipak yoʻli 7 kunda: ideal marshrut",
        excerpt:
          "Samarqand, Buxoro va Xiva bir hafta ichida — shoshilmasdan eng asosiyni qanday koʻrish mumkin.",
        tag: "Marshrutlar",
        body: `## Nimadan boshlash kerak
Oʻzbekiston boʻylab klassik marshrut yetti kunga sigʻadi va Ipak yoʻlining uchta xazina-shahrini bogʻlaydi. Ular orasida «Afrosiyob» tezyurar poyezdlarida qulay harakatlanasiz.

### 1–3-kunlar: Samarqand
Registon maydoni, Goʻri Amir maqbarasi, Shohi Zinda nekropoli va Ulugʻbek rasadxonasi. Registon boʻylab olomonsiz sayr uchun bir kechani ajrating.

### 4–5-kunlar: Buxoro
Kalon minorasi, savdo gumbazlari va Labi Hovuz majmuasi. Buxoro ixcham — hammasi piyoda masofada.

### 6–7-kunlar: Xiva
Qal'a devorlari ortidagi Ichan Qal'a: feruza minoralar va ertalabki koʻchalar sukunati.

## Maslahatlar
- Eng yaxshi vaqt — aprel–may va sentabr–oktabr.
- «Afrosiyob» poyezdlarini oldindan bron qiling.
- Bozor va hunarmandchilik doʻkonlari uchun naqd pul oling.

SILKORA bu marshrutni sur'at va byudjetingizga moslaydi — shaxsiy gid va ishonchli mehmonxonalar bilan.`,
      },
    },
  },
  {
    slug: "maldives-honeymoon",
    image: "/destinations/maldives.jpg",
    date: "2026-05-10",
    readMin: 5,
    content: {
      ru: {
        title: "Медовый месяц на Мальдивах: как выбрать остров",
        excerpt:
          "Виллы над водой, приватность и сервис — что важно для идеального путешествия вдвоём.",
        tag: "Идеи",
        body: `## Тип виллы
Вилла над водой — главная мечта Мальдив: прямой вход в лагуну и закаты у воды. Пляжные виллы тише и часто просторнее.

## Расположение острова
Близкие к аэропорту острова удобны коротким трансфером на катере. Дальние — гидросамолёт и максимум приватности.

## Что включить
- Приватный ужин на песчаной отмели
- Спа-ритуалы для двоих
- Снорклинг с морскими черепахами

## Когда ехать
Сухой сезон — с ноября по апрель. Это лучшее время для медового месяца.

SILKORA подберёт остров и виллу под ваш стиль — и возьмёт на себя все детали.`,
      },
      en: {
        title: "A Maldives honeymoon: how to choose your island",
        excerpt:
          "Overwater villas, privacy and service — what matters for the perfect trip for two.",
        tag: "Inspiration",
        body: `## Villa type
The overwater villa is the Maldives dream: direct lagoon access and sunsets by the water. Beach villas are quieter and often more spacious.

## Island location
Islands near the airport mean a short speedboat transfer. Far-flung ones mean a seaplane and maximum privacy.

## What to include
- A private dinner on a sandbank
- Spa rituals for two
- Snorkelling with sea turtles

## When to go
The dry season runs from November to April — the best window for a honeymoon.

SILKORA will match the island and villa to your style — and handle every detail.`,
      },
      uz: {
        title: "Maldiv orollarida asal oyi: orolni qanday tanlash",
        excerpt:
          "Suv ustidagi villalar, maxfiylik va xizmat — ikki kishilik mukammal sayohat uchun nima muhim.",
        tag: "Gʻoyalar",
        body: `## Villa turi
Suv ustidagi villa — Maldivning asosiy orzusi: lagunaga toʻgʻridan-toʻgʻri chiqish va suv yonida quyosh botishi. Plyaj villalari tinchroq va koʻpincha kengroq.

## Orol joylashuvi
Aeroportga yaqin orollar — qisqa kater transferi. Uzoqdagilari — gidrosamolyot va maksimal maxfiylik.

## Nimani kiritish kerak
- Qum sayozligida shaxsiy kechki ovqat
- Ikki kishilik spa marosimlari
- Dengiz toshbaqalari bilan snorkling

## Qachon borish kerak
Quruq mavsum — noyabrdan aprelgacha. Asal oyi uchun eng yaxshi davr.

SILKORA orol va villani uslubingizga moslaydi — va barcha tafsilotlarni oʻz zimmasiga oladi.`,
      },
    },
  },
  {
    slug: "best-time-samarkand",
    image: "/destinations/samarkand-2.jpg",
    date: "2026-04-28",
    readMin: 4,
    content: {
      ru: {
        title: "Когда лучше ехать в Самарканд",
        excerpt:
          "Погода, сезоны и цены по месяцам — выбираем идеальное время для поездки.",
        tag: "Гид",
        body: `## Весна (апрель–май)
Лучшее время: цветущие сады, мягкое тепло и зелёные оазисы. Туристов много — бронируйте заранее.

## Осень (сентябрь–октябрь)
Тёплые дни, прохладные вечера и сезон фруктов. Идеально для долгих прогулок.

## Лето (июнь–август)
Жарко, до +40 °C. Зато меньше туристов и ниже цены — выбирайте утренние и вечерние экскурсии.

## Зима (ноябрь–март)
Тихо и атмосферно, памятники без толп. Возьмите тёплую одежду.

Подскажем лучшие даты под ваши планы и подберём тур — напишите нам.`,
      },
      en: {
        title: "The best time to visit Samarkand",
        excerpt:
          "Weather, seasons and prices month by month — choosing the perfect time to travel.",
        tag: "Guide",
        body: `## Spring (April–May)
The best time: blossoming gardens, mild warmth and green oases. It's busy — book ahead.

## Autumn (September–October)
Warm days, cool evenings and fruit season. Perfect for long walks.

## Summer (June–August)
Hot, up to 40 °C. But fewer tourists and lower prices — choose morning and evening tours.

## Winter (November–March)
Quiet and atmospheric, monuments without crowds. Bring warm clothing.

We'll suggest the best dates for your plans and arrange the tour — get in touch.`,
      },
      uz: {
        title: "Samarqandga qachon borish yaxshiroq",
        excerpt:
          "Ob-havo, mavsumlar va narxlar oylar boʻyicha — sayohat uchun ideal vaqtni tanlaymiz.",
        tag: "Yoʻriqnoma",
        body: `## Bahor (aprel–may)
Eng yaxshi vaqt: gullagan bogʻlar, mayin issiqlik va yashil vohalar. Sayyohlar koʻp — oldindan bron qiling.

## Kuz (sentabr–oktabr)
Issiq kunlar, salqin kechalar va meva mavsumi. Uzoq sayrlar uchun ideal.

## Yoz (iyun–avgust)
Issiq, +40 °C gacha. Lekin sayyohlar kamroq va narxlar pastroq — ertalabki va kechki ekskursiyalarni tanlang.

## Qish (noyabr–mart)
Tinch va goʻzal, yodgorliklar olomonsiz. Issiq kiyim oling.

Rejalaringizga mos eng yaxshi sanalarni aytamiz va tur tanlaymiz — bizga yozing.`,
      },
    },
  },
];

export const POST_SLUGS = POSTS.map((p) => p.slug);

export function getPost(slug: string): Post | undefined {
  return POSTS.find((p) => p.slug === slug);
}
