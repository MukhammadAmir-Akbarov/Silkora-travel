export type TourType = "silkRoad" | "luxury";
export type Locale = "ru" | "en" | "uz";

export type TourDay = { title: string; desc: string };
export type TourContent = {
  title: string;
  summary: string;
  highlights: string[];
  days: TourDay[];
  included: string[];
  excluded: string[];
};

export type Tour = {
  slug: string;
  type: TourType;
  image: string;
  priceFrom: string; // indicative per-person — TODO replace with real prices
  nights: number;
  groupMax: number;
  content: Record<Locale, TourContent>;
};

export const TOURS: Tour[] = [
  {
    slug: "samarkand",
    type: "silkRoad",
    image: "/destinations/samarkand.jpg",
    priceFrom: "$290",
    nights: 2,
    groupMax: 12,
    content: {
      ru: {
        title: "Самарканд — сердце Шёлкового пути",
        summary:
          "Три дня в легендарном городе: Регистан, Гур-Эмир, Шахи-Зинда и базары, где время остановилось. Камерная группа, лучший гид и атмосферные ужины.",
        highlights: [
          "Площадь Регистан на рассвете без толп",
          "Мавзолей Гур-Эмир — усыпальница Тамерлана",
          "Некрополь Шахи-Зинда и обсерватория Улугбека",
          "Ужин с видом и дегустация плова",
        ],
        days: [
          { title: "День 1 — Прибытие и Регистан", desc: "Встреча в аэропорту, заселение в бутик-отель. Вечерняя прогулка по Регистану и ужин в национальном ресторане." },
          { title: "День 2 — Сокровища города", desc: "Гур-Эмир, Биби-Ханым, базар Сиаб, некрополь Шахи-Зинда и обсерватория Улугбека с личным гидом." },
          { title: "День 3 — Ремёсла и отъезд", desc: "Мастерская шёлковых ковров и бумаги, свободное время для покупок, трансфер." },
        ],
        included: ["Проживание 2 ночи 4–5★", "Завтраки и 2 ужина", "Личный гид-историк", "Все трансферы", "Входные билеты"],
        excluded: ["Авиабилеты", "Виза (при необходимости)", "Личные расходы", "Страховка"],
      },
      en: {
        title: "Samarkand — heart of the Silk Road",
        summary:
          "Three days in the legendary city: Registan, Gur-Emir, Shah-i-Zinda and timeless bazaars. Small group, a top guide and atmospheric dinners.",
        highlights: [
          "Registan Square at sunrise, crowd-free",
          "Gur-Emir — the mausoleum of Tamerlane",
          "Shah-i-Zinda necropolis & Ulugh Beg observatory",
          "Dinner with a view and a plov tasting",
        ],
        days: [
          { title: "Day 1 — Arrival & Registan", desc: "Airport welcome, check-in at a boutique hotel. Evening stroll across Registan and dinner at a local restaurant." },
          { title: "Day 2 — Treasures of the city", desc: "Gur-Emir, Bibi-Khanym, Siab bazaar, Shah-i-Zinda necropolis and Ulugh Beg observatory with a private guide." },
          { title: "Day 3 — Crafts & departure", desc: "Silk carpet and paper workshops, free time for shopping, transfer." },
        ],
        included: ["2 nights 4–5★", "Breakfasts & 2 dinners", "Private historian guide", "All transfers", "Entrance tickets"],
        excluded: ["Flights", "Visa (if required)", "Personal expenses", "Insurance"],
      },
      uz: {
        title: "Samarqand — Ipak yoʻli yuragi",
        summary:
          "Afsonaviy shaharda uch kun: Registon, Goʻri Amir, Shohi Zinda va vaqt toʻxtagan bozorlar. Ixcham guruh, eng yaxshi gid va goʻzal kechki ovqatlar.",
        highlights: [
          "Tongda olomonsiz Registon maydoni",
          "Goʻri Amir — Amir Temur maqbarasi",
          "Shohi Zinda nekropoli va Ulugʻbek rasadxonasi",
          "Manzarali kechki ovqat va palov tatib koʻrish",
        ],
        days: [
          { title: "1-kun — Kelish va Registon", desc: "Aeroportda kutib olish, butik-mehmonxonaga joylashish. Registon boʻylab kechki sayr va milliy restoranda ovqat." },
          { title: "2-kun — Shahar xazinalari", desc: "Goʻri Amir, Bibixonim, Siyob bozori, Shohi Zinda va Ulugʻbek rasadxonasi shaxsiy gid bilan." },
          { title: "3-kun — Hunarmandchilik va joʻnash", desc: "Ipak gilam va qogʻoz ustaxonasi, xarid uchun erkin vaqt, transfer." },
        ],
        included: ["2 kecha 4–5★", "Nonushta va 2 kechki ovqat", "Shaxsiy gid-tarixchi", "Barcha transferlar", "Kirish chiptalari"],
        excluded: ["Aviachiptalar", "Viza (kerak boʻlsa)", "Shaxsiy xarajatlar", "Sugʻurta"],
      },
    },
  },
  {
    slug: "bukhara",
    type: "silkRoad",
    image: "/destinations/bukhara.jpg",
    priceFrom: "$260",
    nights: 2,
    groupMax: 12,
    content: {
      ru: {
        title: "Бухара — город-музей под открытым небом",
        summary:
          "Священная Бухара: минарет Калян, торговые купола, Ляби-Хауз и более 140 памятников в шаговой доступности. Неспешный темп и подлинная атмосфера.",
        highlights: ["Минарет Калян и Пои-Калян", "Древние торговые купола", "Ансамбль Ляби-Хауз вечером", "Летняя резиденция эмира"],
        days: [
          { title: "День 1 — Старый город", desc: "Заселение, прогулка по историческому центру: Ляби-Хауз, медресе и торговые купола, ужин с фольклорным шоу." },
          { title: "День 2 — Памятники и ремёсла", desc: "Пои-Калян, крепость Арк, мечеть Боло-Хауз, мастерские чеканки и трансфер." },
        ],
        included: ["Проживание 2 ночи 4★", "Завтраки и 1 ужин", "Личный гид", "Все трансферы", "Входные билеты"],
        excluded: ["Авиабилеты", "Виза (при необходимости)", "Личные расходы", "Страховка"],
      },
      en: {
        title: "Bukhara — a living open-air museum",
        summary:
          "Sacred Bukhara: the Kalyan minaret, trading domes, Lyab-i Hauz and 140+ monuments within walking distance. A gentle pace and authentic atmosphere.",
        highlights: ["Kalyan minaret & Poi-Kalyan", "Ancient trading domes", "Lyab-i Hauz by night", "The emir's summer palace"],
        days: [
          { title: "Day 1 — Old town", desc: "Check-in and a walk through the historic centre: Lyab-i Hauz, madrasahs and trading domes, dinner with a folklore show." },
          { title: "Day 2 — Monuments & crafts", desc: "Poi-Kalyan, the Ark fortress, Bolo-Hauz mosque, metal-chasing workshops and transfer." },
        ],
        included: ["2 nights 4★", "Breakfasts & 1 dinner", "Private guide", "All transfers", "Entrance tickets"],
        excluded: ["Flights", "Visa (if required)", "Personal expenses", "Insurance"],
      },
      uz: {
        title: "Buxoro — ochiq osmon ostidagi muzey-shahar",
        summary:
          "Muqaddas Buxoro: Kalon minorasi, savdo gumbazlari, Labi Hovuz va piyoda masofada 140+ yodgorlik. Bemalol sur'at va haqiqiy muhit.",
        highlights: ["Kalon minorasi va Poi Kalon", "Qadimiy savdo gumbazlari", "Kechqurun Labi Hovuz", "Amirning yozgi saroyi"],
        days: [
          { title: "1-kun — Eski shahar", desc: "Joylashish va tarixiy markaz boʻylab sayr: Labi Hovuz, madrasalar va savdo gumbazlari, folklor shousi bilan kechki ovqat." },
          { title: "2-kun — Yodgorliklar va hunar", desc: "Poi Kalon, Ark qal'asi, Bolo Hovuz masjidi, kandakorlik ustaxonalari va transfer." },
        ],
        included: ["2 kecha 4★", "Nonushta va 1 kechki ovqat", "Shaxsiy gid", "Barcha transferlar", "Kirish chiptalari"],
        excluded: ["Aviachiptalar", "Viza (kerak boʻlsa)", "Shaxsiy xarajatlar", "Sugʻurta"],
      },
    },
  },
  {
    slug: "khiva",
    type: "silkRoad",
    image: "/destinations/khiva.jpg",
    priceFrom: "$250",
    nights: 1,
    groupMax: 12,
    content: {
      ru: {
        title: "Хива — сказка Ичан-Калы",
        summary:
          "Внутренний город Ичан-Кала за крепостными стенами — словно ожившая восточная сказка. Бирюзовые минареты, ночные прогулки по пустым улочкам.",
        highlights: ["Минарет Кальта-Минор", "Крепость Куня-Арк", "Закат со стен Ичан-Калы", "Дворец Таш-Хаули"],
        days: [
          { title: "День 1 — Ичан-Кала", desc: "Заселение внутри крепости, экскурсия по медресе и минаретам, закат со смотровой площадки, ужин." },
          { title: "День 2 — Утро и отъезд", desc: "Утренняя прогулка по пустому городу, мастерская резьбы по дереву, трансфер." },
        ],
        included: ["Проживание 1 ночь внутри Ичан-Калы", "Завтрак и ужин", "Личный гид", "Трансферы", "Входные билеты"],
        excluded: ["Авиабилеты", "Виза (при необходимости)", "Личные расходы", "Страховка"],
      },
      en: {
        title: "Khiva — the fairy tale of Itchan Kala",
        summary:
          "The walled inner city of Itchan Kala is an Eastern fairy tale come to life. Turquoise minarets and night walks down empty lanes.",
        highlights: ["Kalta Minor minaret", "Kunya-Ark fortress", "Sunset from the city walls", "Tash-Hauli palace"],
        days: [
          { title: "Day 1 — Itchan Kala", desc: "Check-in inside the fortress, a tour of madrasahs and minarets, sunset from the viewpoint, dinner." },
          { title: "Day 2 — Morning & departure", desc: "Morning walk through the empty city, a wood-carving workshop, transfer." },
        ],
        included: ["1 night inside Itchan Kala", "Breakfast & dinner", "Private guide", "Transfers", "Entrance tickets"],
        excluded: ["Flights", "Visa (if required)", "Personal expenses", "Insurance"],
      },
      uz: {
        title: "Xiva — Ichan Qal'a ertagi",
        summary:
          "Qal'a devorlari ortidagi Ichan Qal'a — jonlangan sharq ertagi. Feruza minoralar va boʻsh koʻchalarda tungi sayrlar.",
        highlights: ["Kalta Minor minorasi", "Koʻhna Ark qal'asi", "Qal'a devoridan quyosh botishi", "Tosh Hovli saroyi"],
        days: [
          { title: "1-kun — Ichan Qal'a", desc: "Qal'a ichida joylashish, madrasa va minoralar boʻylab ekskursiya, koʻzatuv maydonchasidan quyosh botishi, kechki ovqat." },
          { title: "2-kun — Ertalab va joʻnash", desc: "Boʻsh shahar boʻylab ertalabki sayr, yogʻoch oʻymakorligi ustaxonasi, transfer." },
        ],
        included: ["Ichan Qal'a ichida 1 kecha", "Nonushta va kechki ovqat", "Shaxsiy gid", "Transferlar", "Kirish chiptalari"],
        excluded: ["Aviachiptalar", "Viza (kerak boʻlsa)", "Shaxsiy xarajatlar", "Sugʻurta"],
      },
    },
  },
  {
    slug: "maldives",
    type: "luxury",
    image: "/destinations/maldives.jpg",
    priceFrom: "$1900",
    nights: 6,
    groupMax: 2,
    content: {
      ru: {
        title: "Мальдивы — вилла над океаном",
        summary:
          "Шесть ночей в курорте 5★ на собственном острове: вилла над водой, спа, дайвинг и ужины на закате. Идеально для медового месяца.",
        highlights: ["Вилла над водой с прямым входом в лагуну", "Спа-ритуалы и приватный ужин на пляже", "Снорклинг с морскими черепахами", "Закатный круиз на дони"],
        days: [
          { title: "Дни 1–2 — Прибытие и релакс", desc: "Трансфер на гидросамолёте, заселение на виллу, спа и знакомство с островом." },
          { title: "Дни 3–4 — Океан", desc: "Снорклинг и дайвинг, круиз с дельфинами, ужин при свечах на песчаной отмели." },
          { title: "Дни 5–6 — Наслаждение и отъезд", desc: "Свободные дни для спа и пляжа, прощальный ужин, трансфер в аэропорт." },
        ],
        included: ["6 ночей на вилле над водой 5★", "Завтраки и ужины", "Трансфер гидросамолётом", "Спа-ритуал", "Снорклинг-снаряжение"],
        excluded: ["Авиабилеты", "Алкоголь премиум", "Дополнительные экскурсии", "Страховка"],
      },
      en: {
        title: "Maldives — a villa above the ocean",
        summary:
          "Six nights at a 5★ private-island resort: an overwater villa, spa, diving and sunset dinners. Perfect for a honeymoon.",
        highlights: ["Overwater villa with direct lagoon access", "Spa rituals and a private beach dinner", "Snorkelling with sea turtles", "Sunset dhoni cruise"],
        days: [
          { title: "Days 1–2 — Arrival & relax", desc: "Seaplane transfer, villa check-in, spa and getting to know the island." },
          { title: "Days 3–4 — The ocean", desc: "Snorkelling and diving, a dolphin cruise, a candlelit dinner on a sandbank." },
          { title: "Days 5–6 — Indulge & depart", desc: "Free days for spa and beach, farewell dinner, airport transfer." },
        ],
        included: ["6 nights overwater villa 5★", "Breakfasts & dinners", "Seaplane transfer", "Spa ritual", "Snorkelling gear"],
        excluded: ["Flights", "Premium alcohol", "Extra excursions", "Insurance"],
      },
      uz: {
        title: "Maldiv orollari — okean ustidagi villa",
        summary:
          "Shaxsiy orolda 5★ kurortda olti kecha: suv ustidagi villa, spa, diving va quyosh botishidagi kechki ovqatlar. Asal oyi uchun ideal.",
        highlights: ["Lagunaga toʻgʻridan-toʻgʻri chiqadigan suv ustidagi villa", "Spa marosimlari va shaxsiy plyaj ovqati", "Dengiz toshbaqalari bilan snorkling", "Quyosh botishida doni kruizi"],
        days: [
          { title: "1–2-kun — Kelish va dam", desc: "Gidrosamolyotda transfer, villaga joylashish, spa va orol bilan tanishuv." },
          { title: "3–4-kun — Okean", desc: "Snorkling va diving, delfinlar bilan kruiz, qum sayozligida sham yorugʻida kechki ovqat." },
          { title: "5–6-kun — Rohat va joʻnash", desc: "Spa va plyaj uchun erkin kunlar, xayrlashuv ovqati, aeroportga transfer." },
        ],
        included: ["Suv ustidagi villada 6 kecha 5★", "Nonushta va kechki ovqatlar", "Gidrosamolyot transferi", "Spa marosimi", "Snorkling jihozlari"],
        excluded: ["Aviachiptalar", "Premium alkogol", "Qoʻshimcha ekskursiyalar", "Sugʻurta"],
      },
    },
  },
  {
    slug: "dubai",
    type: "luxury",
    image: "/destinations/dubai.jpg",
    priceFrom: "$690",
    nights: 4,
    groupMax: 6,
    content: {
      ru: {
        title: "Дубай — роскошь и приключения",
        summary:
          "Четыре дня контрастов: небоскрёбы и пустыня, премиальный шопинг и сафари на джипах. Отель 5★ и индивидуальная программа.",
        highlights: ["Бурдж-Халифа и смотровая площадка", "Сафари по дюнам и ужин в пустыне", "Круиз по Дубай-Марине", "Премиальный шопинг и Золотой рынок"],
        days: [
          { title: "День 1 — Современный Дубай", desc: "Заселение в 5★, Бурдж-Халифа, Дубай-Молл и фонтаны." },
          { title: "День 2 — Пустыня", desc: "Сафари на джипах, катание на верблюдах, ужин с шоу под звёздами." },
          { title: "День 3 — Море и старый город", desc: "Круиз по Марине, исторический квартал Аль-Фахиди, Золотой и Пряный рынки." },
          { title: "День 4 — Шопинг и отъезд", desc: "Свободное время, премиальный шопинг, трансфер." },
        ],
        included: ["4 ночи 5★", "Завтраки", "Сафари с ужином", "Билеты на Бурдж-Халифу", "Трансферы"],
        excluded: ["Авиабилеты", "Виза ОАЭ", "Обеды и ужины (кроме указанных)", "Страховка"],
      },
      en: {
        title: "Dubai — luxury and adventure",
        summary:
          "Four days of contrasts: skyscrapers and desert, premium shopping and a jeep safari. A 5★ hotel and a tailor-made programme.",
        highlights: ["Burj Khalifa observation deck", "Dune safari and desert dinner", "Dubai Marina cruise", "Premium shopping & the Gold Souk"],
        days: [
          { title: "Day 1 — Modern Dubai", desc: "Check-in at a 5★, Burj Khalifa, Dubai Mall and the fountains." },
          { title: "Day 2 — The desert", desc: "Jeep safari, camel riding, dinner with a show under the stars." },
          { title: "Day 3 — Sea & old town", desc: "Marina cruise, the historic Al Fahidi quarter, the Gold and Spice souks." },
          { title: "Day 4 — Shopping & departure", desc: "Free time, premium shopping, transfer." },
        ],
        included: ["4 nights 5★", "Breakfasts", "Safari with dinner", "Burj Khalifa tickets", "Transfers"],
        excluded: ["Flights", "UAE visa", "Lunches & dinners (except listed)", "Insurance"],
      },
      uz: {
        title: "Dubay — hashamat va sarguzasht",
        summary:
          "Toʻrt kun qarama-qarshiliklar: osmonoʻpar binolar va sahro, premium shoping va jip safari. 5★ mehmonxona va individual dastur.",
        highlights: ["Burj Xalifa koʻzatuv maydonchasi", "Sahro safari va sahroda kechki ovqat", "Dubay Marina kruizi", "Premium shoping va Oltin bozori"],
        days: [
          { title: "1-kun — Zamonaviy Dubay", desc: "5★ ga joylashish, Burj Xalifa, Dubai Mall va favvoralar." },
          { title: "2-kun — Sahro", desc: "Jip safari, tuyada sayr, yulduzlar ostida shou bilan kechki ovqat." },
          { title: "3-kun — Dengiz va eski shahar", desc: "Marina kruizi, tarixiy Al Fahidi mahallasi, Oltin va Ziravor bozorlari." },
          { title: "4-kun — Shoping va joʻnash", desc: "Erkin vaqt, premium shoping, transfer." },
        ],
        included: ["4 kecha 5★", "Nonushtalar", "Safari va kechki ovqat", "Burj Xalifa chiptalari", "Transferlar"],
        excluded: ["Aviachiptalar", "BAA vizasi", "Tushlik va kechki ovqatlar (koʻrsatilganidan tashqari)", "Sugʻurta"],
      },
    },
  },
  {
    slug: "turkey",
    type: "luxury",
    image: "/destinations/turkey.jpg",
    priceFrom: "$590",
    nights: 5,
    groupMax: 8,
    content: {
      ru: {
        title: "Турция — Стамбул и побережье",
        summary:
          "Пять ночей: имперский Стамбул и отдых на Эгейском побережье. История, гастрономия, Босфор и всё включено у моря.",
        highlights: ["Айя-София и Голубая мечеть", "Круиз по Босфору", "Гранд-базар и хаммам", "Курорт у моря с all inclusive"],
        days: [
          { title: "День 1–2 — Стамбул", desc: "Заселение, Айя-София, Голубая мечеть, дворец Топкапы и Гранд-базар, ужин с видом на Босфор." },
          { title: "День 3 — Босфор", desc: "Круиз по проливу, хаммам, свободное время и переезд на побережье." },
          { title: "День 4–5 — Море", desc: "Отдых на курорте 5★ all inclusive, экскурсии по желанию, трансфер." },
        ],
        included: ["5 ночей 4–5★", "Завтраки, all inclusive на побережье", "Экскурсии по Стамбулу", "Круиз по Босфору", "Трансферы"],
        excluded: ["Авиабилеты", "Личные расходы", "Дополнительные экскурсии", "Страховка"],
      },
      en: {
        title: "Turkey — Istanbul and the coast",
        summary:
          "Five nights: imperial Istanbul and a stay on the Aegean coast. History, cuisine, the Bosphorus and all-inclusive by the sea.",
        highlights: ["Hagia Sophia & the Blue Mosque", "Bosphorus cruise", "Grand Bazaar & hammam", "Seaside all-inclusive resort"],
        days: [
          { title: "Day 1–2 — Istanbul", desc: "Check-in, Hagia Sophia, the Blue Mosque, Topkapi Palace and the Grand Bazaar, dinner over the Bosphorus." },
          { title: "Day 3 — The Bosphorus", desc: "Strait cruise, hammam, free time and transfer to the coast." },
          { title: "Day 4–5 — The sea", desc: "Stay at a 5★ all-inclusive resort, optional excursions, transfer." },
        ],
        included: ["5 nights 4–5★", "Breakfasts, all-inclusive on the coast", "Istanbul tours", "Bosphorus cruise", "Transfers"],
        excluded: ["Flights", "Personal expenses", "Extra excursions", "Insurance"],
      },
      uz: {
        title: "Turkiya — Istanbul va sohil",
        summary:
          "Besh kecha: imperatorlik Istanbuli va Egey sohilida dam. Tarix, gastronomiya, Bosfor va dengiz boʻyida all inclusive.",
        highlights: ["Ayasofiya va Koʻk masjid", "Bosfor kruizi", "Katta bozor va hammom", "Dengiz boʻyida all inclusive kurort"],
        days: [
          { title: "1–2-kun — Istanbul", desc: "Joylashish, Ayasofiya, Koʻk masjid, Topqopi saroyi va Katta bozor, Bosfor manzarali kechki ovqat." },
          { title: "3-kun — Bosfor", desc: "Boʻgʻoz boʻylab kruiz, hammom, erkin vaqt va sohilga koʻchish." },
          { title: "4–5-kun — Dengiz", desc: "5★ all inclusive kurortda dam, ixtiyoriy ekskursiyalar, transfer." },
        ],
        included: ["5 kecha 4–5★", "Nonushta, sohilda all inclusive", "Istanbul ekskursiyalari", "Bosfor kruizi", "Transferlar"],
        excluded: ["Aviachiptalar", "Shaxsiy xarajatlar", "Qoʻshimcha ekskursiyalar", "Sugʻurta"],
      },
    },
  },
];

export const TOUR_SLUGS = TOURS.map((t) => t.slug);

export function getTour(slug: string): Tour | undefined {
  return TOURS.find((t) => t.slug === slug);
}
