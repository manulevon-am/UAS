import type { Locale } from "@/lib/i18n";
import { getCanonicalUrl } from "@/lib/site";

type LocalizedText = Record<Locale, string>;

type RouteContent = {
  title: string;
  description: string;
};

export type StaticRoute =
  | "home"
  | "structure"
  | "cec"
  | "documents"
  | "news"
  | "join";

export type MandateBlock = {
  id: string;
  title: LocalizedText;
  seatsTotal: number;
  seatsOccupied: number;
  candidates: number;
  description: LocalizedText;
  marker: {
    x: number;
    y: number;
  };
  subRegions?: {
    label: LocalizedText;
    seats: number;
  }[];
};

export type SenateBody = {
  title: LocalizedText;
  subtitle: LocalizedText;
  members: number;
  description: LocalizedText;
};

export type PersonCard = {
  id: string;
  name: string;
  regionId?: string;
  institutionId?: string;
  distributionSectionId?: string;
  country: string;
  city: string;
  status: "mandate_holder" | "candidate";
  role: string;
  votesFor?: number;
  votesAgainst?: number;
  photo?: string;
  socialUrl?: string;
  bio: string;
};

export type DocumentCard = {
  id: string;
  title: LocalizedText;
  category: LocalizedText;
  language: string;
  description: LocalizedText;
  fileUrl: string;
  sourceUrl?: string;
};

const loc = (ru: string, en = ru, hy = ru): LocalizedText => ({ ru, en, hy });

export const routeMeta: Record<Locale, Record<StaticRoute, RouteContent>> = {
  ru: {
    home: {
      title: "United Armenian Senate",
      description:
        "Всеармянский Сенат — международная платформа координации и представительства армянских общин мира.",
    },
    structure: {
      title: "Структура мандатов",
      description:
        "Распределение 501 мандата по регионам, институциональным квотам и структурным органам Всеармянского Сената.",
    },
    cec: {
      title: "Центральная избирательная комиссия (ЦИК)",
      description:
        "Как проходят онлайн-выборы Сената: этапы работы ЦИК, легитимность, структура комиссий и международно-правовая основа.",
    },
    documents: {
      title: "Документы",
      description:
        "Основные документы Всеармянского Сената: концепция, декларация и руководство по работе.",
    },
    news: {
      title: "Новости",
      description:
        "Новости и объявления United Armenian Senate.",
    },
    join: {
      title: "Присоединиться",
      description:
        "Форма подачи заявки для сенаторов, кандидатов, организаций, волонтёров и запросов в United Armenian Senate.",
    },
  },
  en: {
    home: {
      title: "United Armenian Senate",
      description:
        "The United Armenian Senate is an international platform for coordination and representation of Armenian communities worldwide.",
    },
    structure: {
      title: "Mandate Structure",
      description:
        "The distribution of 501 mandates across regional blocks, institutional quotas, and Senate bodies.",
    },
    cec: {
      title: "Центральная избирательная комиссия (ЦИК)",
      description:
        "Как проходят онлайн-выборы Сената: этапы работы ЦИК, легитимность, структура комиссий и международно-правовая основа.",
    },
    documents: {
      title: "Documents",
      description:
        "Core documents of the United Armenian Senate: concept, declaration, and operating guide.",
    },
    news: {
      title: "News",
      description:
        "News and announcements from the United Armenian Senate.",
    },
    join: {
      title: "Join",
      description:
        "Application form for senators, candidates, organizations, volunteers, and contact requests.",
    },
  },
  hy: {
    home: {
      title: "United Armenian Senate",
      description:
        "Համահայկական Սենատը համաշխարհային հայկական համայնքների համակարգման և ներկայացուցչության միջազգային հարթակ է։",
    },
    structure: {
      title: "Մանդատների կառուցվածք",
      description:
        "501 մանդատների բաշխումը տարածաշրջանային բլոկների, ինստիտուցիոնալ քվոտաների և Սենատի մարմինների միջև։",
    },
    cec: {
      title: "Центральная избирательная комиссия (ЦИК)",
      description:
        "Как проходят онлайн-выборы Сената: этапы работы ЦИК, легитимность, структура комиссий и международно-правовая основа.",
    },
    documents: {
      title: "Փաստաթղթեր",
      description:
        "Համահայկական Սենատի հիմնական փաստաթղթերը՝ հայեցակարգ, հռչակագիր և աշխատանքային ուղեցույց։",
    },
    news: {
      title: "Նորություններ",
      description:
        "United Armenian Senate-ի նորություններն ու հայտարարությունները։",
    },
    join: {
      title: "Միանալ",
      description:
        "Դիմումի ձև սենատորների, թեկնածուների, կազմակերպությունների, կամավորների և կապ հաստատելու համար։",
    },
  },
};

export const navigationLabels: Record<
  Locale,
  Record<StaticRoute | "cta", string>
> = {
  ru: {
    home: "Главная",
    structure: "Структура",
    cec: "ЦИК",
    documents: "Документы",
    news: "Новости",
    join: "Присоединиться",
    cta: "Присоединиться",
  },
  en: {
    home: "Home",
    structure: "Structure",
    cec: "CEC",
    documents: "Documents",
    news: "News",
    join: "Join",
    cta: "Join",
  },
  hy: {
    home: "Գլխավոր",
    structure: "Կառուցվածք",
    cec: "ԿԸՀ",
    documents: "Փաստաթղթեր",
    news: "Նորություններ",
    join: "Միանալ",
    cta: "Միանալ",
  },
};

export const homePageContent = {
  heroEyebrow: loc("Международная институциональная платформа"),
  heroSubtitle: loc(
    "Всеармянский сенат (UAS) — это международная общественно-политическая организация, созданная на выборной основе. Она объединяет представителей армянской диаспоры (Спюрка) и самой Армении.",
  ),
  heroText: loc(
    "Будучи экспертно-аналитической и координационной платформой, Сенат не занимается законотворчеством в классическом понимании, а фокусируется на решении специфических стратегических задач.",
  ),
  aboutTitle: loc("О Сенате", "About the Senate", "Սենատի մասին"),
  aboutText: loc(
    "Единая схема показывает, как UAS соединяет мандатную систему, органы управления и ключевые задачи международной армянской платформы.",
    "The unified scheme shows how UAS connects the mandate system, governance bodies, and the key tasks of the international Armenian platform.",
    "Միասնական սխեման ցույց է տալիս, թե ինչպես է UAS-ը միավորում մանդատային համակարգը, կառավարման մարմիններն ու համահայկական հարթակի հիմնական խնդիրները։",
  ),
  orgTiles: [
    {
      title: loc("ЦИК"),
      description: loc(
        "Центральная координация процедур, отбора и внутренней организации.",
      ),
    },
    {
      title: loc("501 сенатский мандат"),
      description: loc(
        "Представительная база UAS, распределённая по международным блокам. В их число входят 12 пожизненных сенаторов.",
      ),
    },
    {
      title: loc("Совет старейшин"),
      description: loc(
        "Консультативное и стратегическое звено институциональной преемственности.",
      ),
    },
    {
      title: loc("Структурные органы"),
      description: loc(
        "Комиссии, аналитические центры и рабочие направления Сената.",
      ),
    },
  ],
  tasksTitle: loc("Миссия и функции"),
  tasks: [
    {
      title: loc("Консолидация потенциала диаспоры и Армении"),
      description: loc(
        "Сенаторы координируют взаимодействие между крупными предпринимателями, учеными и общественными деятелями, проживающими за рубежом, а также выстраивают диалог с государственными институтами стран их проживания.",
      ),
    },
    {
      title: loc("Защита национальных и геополитических интересов"),
      description: loc(
        "Организация регулярно выступает с заявлениями и продвигает интересы армянства на международной арене. Это включает в себя отстаивание прав армянского народа на основе Севрского мирного договора, вопросы репараций, защиты суверенитета, безопасности границ и сохранения национальной идентичности.",
      ),
    },
    {
      title: loc("Обеспечение экономической и энергетической безопасности"),
      description: loc(
        "Сенаторы осуществляют мониторинг рисков, связанных со стратегическими активами Армении (крупными инфраструктурными и энергетическими объектами), и противодействуют попыткам их внешнего или недружественного поглощения.",
      ),
    },
    {
      title: loc("Взаимодействие с Правительством Западной Армении в изгнании"),
      description: loc(
        "Всеармянский сенат тесно сотрудничает со структурами, поднимающими вопросы защиты прав армянского населения Западной Армении, международного признания Геноцида и сохранения культурно-исторического наследия.",
      ),
    },
    {
      title: loc("Инвестиционное кураторство и фондовая деятельность"),
      description: loc(
        "Одной из ключевых практических задач является создание специализированного фонда. Его деятельность направлена на реализацию положений Севрского мирного договора, международное признание правопреемственности Первой Республики Армения и продвижение вопроса о репарациях.",
      ),
    },
  ],
  structureTitle: loc("Структура мандатов Сената"),
  structureText: loc(
    "501 мандат распределяется между региональными блоками. В каждом блоке отображается общее количество мест, занятые мандаты, кандидаты и свободные места.",
  ),
  institutionsTitle: loc("Институциональные квоты"),
  institutionsText: loc(
    "Отдельные мандаты могут быть закреплены за церковными, общественными и союзными структурами.",
  ),
  bodiesTitle: loc("Структурные органы Сената"),
  bodiesText: loc(
    "Рабочие органы Сената отвечают за ключевые направления общественной, правовой, аналитической, культурной и организационной деятельности.",
  ),
  commissionsTitle: loc("Главные избирательные комиссии Сената"),
  commissions: [
    {
      country: loc("Республика Армения"),
      office: loc("Основная комиссия в Ереване"),
      flag: "am",
    },
    {
      country: loc("Российская Федерация"),
      office: loc("Территориальная комиссия в Москве"),
      flag: "ru",
    },
    {
      country: loc("Соединённые Штаты Америки"),
      office: loc("Территориальная комиссия в Лос-Анджелесе"),
      flag: "us",
    },
    {
      country: loc("Европейский Союз"),
      office: loc("Территориальная комиссия в Берлине, Германия"),
      flag: "eu",
    },
  ],
  becomeTitle: loc("Как стать сенатором"),
  becomeText: loc(
    "Кандидатами могут стать армяне, достигшие 35-летнего возраста и обладающие определенным общественным авторитетом, независимо от места их жительства. Участники Шестого Всеармянского форума «Армения-Диаспора» имеют право выдвигать свои кандидатуры.",
  ),
  becomeCards: [
    loc("Самовыдвижение"),
    loc("Под гарантии трёх граждан"),
    loc("От армянской организации"),
  ],
  becomeCondition: loc(
    "Каждый кандидат обязан самостоятельно организовать собственную избирательную кампанию и обеспечить себе на выборах не менее 501 голоса.",
  ),
  lifetimeTitle: loc("12 пожизненных сенаторов"),
  lifetimeText: loc(
    "Постоянный почётный состав Сената. Двенадцать пожизненных сенаторов входят в число 501 мандата.",
  ),
  lifetimeSenators: [
    { name: "Арам Мкртчян", country: "Германия", flag: "de" },
    { name: "Тигран Багратуни", country: "Германия", flag: "de" },
    { name: "Карине Айрапетян", country: "Германия", flag: "de" },
    { name: "Ваге Месропян", country: "США", flag: "us" },
    { name: "Бакур Карапетян", country: "Армения", flag: "am" },
    { name: "Азат Саргсян", country: "Армения", flag: "am" },
    { name: "Кармен Мирзоян", country: "Франция", flag: "fr" },
    { name: "Ваге Махчикян", country: "Сирия", flag: "sy" },
    { name: "Арсен Абраамян", country: "Россия", flag: "ru" },
    { name: "Лариса Оганесян", country: "Испания", flag: "es" },
  ],
  legalBasisTitle: loc("Международные институты и правовые стандарты"),
  legalBasisText: loc(
    "Деятельность Избирательной комиссии и процедура формирования Сената строго регламентированы международными нормами.",
  ),
  legalBasisCards: [
    {
      title: loc("Совет Европы"),
      badge: "F-67075",
      description: loc(
        "Методология и правила проведения голосования опираются на официальное руководство: «Применение международных избирательных стандартов. Справочник Совета Европы для организаций гражданского общества» (Council of Europe, Strasbourg, F-67075).",
      ),
    },
    {
      title: loc("Принципы гуманитарного права"),
      badge: "jus in bello",
      description: loc(
        "Комиссия обеспечивает защиту прав и равный доступ к голосованию для всех участников, независимо от внешних кризисных факторов.",
      ),
    },
  ],
};

export const mandateRegions: MandateBlock[] = [
  {
    id: "armenia",
    title: loc("Армения", "Armenia", "Հայաստան"),
    seatsTotal: 120,
    seatsOccupied: 24,
    candidates: 0,
    description: loc(
      "Армения, беженцы из Азербайджана, Арцах, Нахичевань, Карс, Сурмалу",
      "Armenia, refugees from Azerbaijan, Artsakh, Nakhichevan, Kars, Surmalu",
      "Հայաստան, Ադրբեջանից փախստականներ, Արցախ, Նախիջևան, Կարս, Սուրմալու",
    ),
    marker: { x: 55, y: 44 },
  },
  {
    id: "russia-cis",
    title: loc("РФ и страны СНГ", "Russia and CIS countries", "ՌԴ և ԱՊՀ երկրներ"),
    seatsTotal: 110,
    seatsOccupied: 26,
    candidates: 2,
    description: loc(
      "Российская Федерация и страны СНГ",
      "Russian Federation and CIS countries",
      "Ռուսաստանի Դաշնություն և ԱՊՀ երկրներ",
    ),
    marker: { x: 64, y: 24 },
  },
  {
    id: "usa-canada",
    title: loc("США и Канада", "USA and Canada", "ԱՄՆ և Կանադա"),
    seatsTotal: 100,
    seatsOccupied: 9,
    candidates: 0,
    description: loc(
      "США — 75 мандатов, Канада — 25 мандатов",
      "USA — 75 mandates, Canada — 25 mandates",
      "ԱՄՆ — 75 մանդատ, Կանադա — 25 մանդատ",
    ),
    marker: { x: 18, y: 28 },
    subRegions: [
      { label: loc("США", "USA", "ԱՄՆ"), seats: 75 },
      { label: loc("Канада", "Canada", "Կանադա"), seats: 25 },
    ],
  },
  {
    id: "sevres",
    title: loc(
      "Страны Севрского Договора",
      "Sèvres Treaty Countries",
      "Սևրի դաշնագիրը վավերացրած երկրներ",
    ),
    seatsTotal: 66,
    seatsOccupied: 11,
    candidates: 0,
    description: loc(
      "Страны, ратифицировавшие Севрский договор",
      "Countries that ratified the Sèvres Treaty",
      "Սևրի դաշնագիրը վավերացրած երկրներ",
    ),
    marker: { x: 46, y: 21 },
  },
  {
    id: "south-america",
    title: loc("Южная Америка", "South America", "Հարավային Ամերիկա"),
    seatsTotal: 42,
    seatsOccupied: 2,
    candidates: 0,
    description: loc(
      "Армянские общины стран Южной Америки",
      "Armenian communities of South America",
      "Հարավային Ամերիկայի հայկական համայնքներ",
    ),
    marker: { x: 28, y: 72 },
  },
  {
    id: "australia-asia",
    title: loc(
      "Австралия и Южная/Восточная Азия",
      "Australia and South/East Asia",
      "Ավստրալիա և Հարավային/Արևելյան Ասիա",
    ),
    seatsTotal: 24,
    seatsOccupied: 0,
    candidates: 0,
    description: loc(
      "Австралия, страны Южной и Восточной Азии",
      "Australia, countries of South and East Asia",
      "Ավստրալիա, Հարավային և Արևելյան Ասիայի երկրներ",
    ),
    marker: { x: 82, y: 68 },
  },
  {
    id: "middle-east",
    title: loc(
      "Страны Ближнего Востока",
      "Middle Eastern countries",
      "Մերձավոր Արևելքի երկրներ",
    ),
    seatsTotal: 18,
    seatsOccupied: 2,
    candidates: 0,
    description: loc(
      "Армянские общины Ближнего Востока",
      "Armenian communities of the Middle East",
      "Մերձավոր Արևելքի հայկական համայնքներ",
    ),
    marker: { x: 57, y: 41 },
  },
  {
    id: "georgia",
    title: loc("Грузия", "Georgia", "Վրաստան"),
    seatsTotal: 11,
    seatsOccupied: 2,
    candidates: 0,
    description: loc(
      "Армянская община Грузии",
      "Armenian community of Georgia",
      "Վրաստանի հայ համայնք",
    ),
    marker: { x: 56, y: 39 },
  },
  {
    id: "iran",
    title: loc("Иран", "Iran", "Իրան"),
    seatsTotal: 10,
    seatsOccupied: 1,
    candidates: 0,
    description: loc(
      "Армянская община Ирана",
      "Armenian community of Iran",
      "Իրանի հայ համայնք",
    ),
    marker: { x: 60, y: 44 },
  },
];

export const senateBodies: SenateBody[] = [
  {
    title: loc("Комиссия мировоззрения"),
    subtitle: loc("Комиссия имени Маштоца"),
    members: 5,
    description: loc("Вопросы ценностей, мировоззрения и смысловой основы."),
  },
  {
    title: loc("Комиссия истории"),
    subtitle: loc("Комиссия имени Хоренаци"),
    members: 5,
    description: loc("История, историография и историческая преемственность."),
  },
  {
    title: loc("Комиссия естественных наук"),
    subtitle: loc("Комиссия имени Ширакаци"),
    members: 5,
    description: loc("Научная и образовательная повестка."),
  },
  {
    title: loc("Комиссия политической подготовки"),
    subtitle: loc("Комиссия имени Нжде"),
    members: 5,
    description: loc(
      "Подготовка и представление общественно-политических деятелей.",
    ),
  },
  {
    title: loc("Научно-технологическая комиссия"),
    subtitle: loc("Технологическое направление"),
    members: 5,
    description: loc("Научные, технологические и инновационные инициативы."),
  },
  {
    title: loc("Комиссия спорта и здоровья"),
    subtitle: loc("Путь Айка"),
    members: 5,
    description: loc("Физическое развитие, спорт и здоровье."),
  },
  {
    title: loc("Правовая комиссия"),
    subtitle: loc("Комиссия имени Гоша"),
    members: 5,
    description: loc("Правосознание, законодательство и правовая работа."),
  },
  {
    title: loc("Комиссия организации общин"),
    subtitle: loc("Общинная координация"),
    members: 5,
    description: loc("Организационная система армянских общин."),
  },
  {
    title: loc("Информационно-аналитический центр"),
    subtitle: loc("Аналитическое направление"),
    members: 5,
    description: loc("Аналитика, мониторинг и информационная работа."),
  },
  {
    title: loc("Комиссия информационной системы"),
    subtitle: loc("Медиа и издательская система"),
    members: 5,
    description: loc("Медиа, публикации и координация информационных каналов."),
  },
];

export const documents: DocumentCard[] = [
  {
    id: "concept",
    title: loc("Концепция организации Всеармянского Сената"),
    category: loc("Основной документ"),
    language: "RU",
    description: loc(
      "Концепция Сената: цель, структура, функции, распределение мандатов и порядок формирования.",
    ),
    fileUrl:
      "https://westernarmenia-wixsite-com.translate.goog/senate/%D5%B0%D5%A1%D5%B5%D5%A5%D6%81%D5%A1%D5%AF%D5%A1%D6%80%D5%A3?_x_tr_sl=auto&_x_tr_tl=ru&_x_tr_hl=ru&_x_tr_hist=true",
    sourceUrl:
      "https://westernarmenia.wixsite.com/senate/%D5%B0%D5%A1%D5%B5%D5%A5%D6%81%D5%A1%D5%AF%D5%A1%D6%80%D5%A3",
  },
  {
    id: "declaration-guide",
    title: loc("Декларация. Руководство по работе Сената"),
    category: loc("Рабочий документ"),
    language: "RU",
    description: loc(
      "Декларация и руководство по работе Сената, опубликованные в исходных материалах.",
    ),
    fileUrl:
      "https://westernarmenia-wixsite-com.translate.goog/senate?_x_tr_sl=auto&_x_tr_tl=ru&_x_tr_hl=ru&_x_tr_hist=true",
    sourceUrl: "https://westernarmenia.wixsite.com/senate",
  },
];

export const regionSenators: PersonCard[] = [
  // --- Армения (120) ---
  {
    id: "armenia-1",
    name: "Ашот Саркисян",
    regionId: "armenia",
    country: "Армения",
    city: "",
    status: "mandate_holder",
    role: "Сенатор",
    photo:
      "https://static.wixstatic.com/media/a79dba_ef155fbafdea4e74ad46c46bcfadcba4~mv2.jpg/v1/fill/w_291,h_375,al_c,q_80,usm_0.66_1.00_0.01,enc_avif,quality_auto/104352702_196084758331613_8875113999358829574_n_edited.jpg",
    socialUrl: "https://www.facebook.com/", bio: "Руководитель территориального центра ЦИК в Ереване.",
  },
  { id: "armenia-2", name: "Азат Саргсян", regionId: "armenia", country: "Армения", city: "", status: "mandate_holder", role: "Сенатор", socialUrl: "https://www.facebook.com/", bio: "Общественный деятель, представитель армянской диаспоры." },
  { id: "armenia-3", name: "Григорий Айвазян", regionId: "armenia", country: "Армения", city: "", status: "mandate_holder", role: "Сенатор", socialUrl: "https://www.facebook.com/", bio: "Общественный деятель, представитель армянской диаспоры." },
  { id: "armenia-4", name: "Зорик Бахчян", regionId: "armenia", country: "Арцах", city: "", status: "mandate_holder", role: "Сенатор", socialUrl: "https://www.facebook.com/", bio: "Общественный деятель, представитель армянской диаспоры." },
  { id: "armenia-5", name: "Овик Аванесов", regionId: "armenia", country: "Арцах", city: "", status: "mandate_holder", role: "Сенатор", socialUrl: "https://www.facebook.com/", bio: "Общественный деятель, представитель армянской диаспоры." },
  { id: "armenia-6", name: "Мгер Арутюнян", regionId: "armenia", country: "Арцах", city: "", status: "mandate_holder", role: "Сенатор", socialUrl: "https://www.facebook.com/", bio: "Общественный деятель, представитель армянской диаспоры." },
  { id: "armenia-7", name: "Багур Карапетян", regionId: "armenia", country: "Армения", city: "", status: "mandate_holder", role: "Сенатор", socialUrl: "https://www.facebook.com/", bio: "Общественный деятель, представитель армянской диаспоры." },
  { id: "armenia-8", name: "Давид Алексанян", regionId: "armenia", country: "Армения", city: "", status: "mandate_holder", role: "Сенатор", socialUrl: "https://www.facebook.com/", bio: "Общественный деятель, представитель армянской диаспоры." },
  { id: "armenia-9", name: "Армен Седракян", regionId: "armenia", country: "Армения", city: "", status: "mandate_holder", role: "Сенатор", socialUrl: "https://www.facebook.com/", bio: "Общественный деятель, представитель армянской диаспоры." },
  { id: "armenia-10", name: "Мкртич Антонян", regionId: "armenia", country: "Армения", city: "", status: "mandate_holder", role: "Сенатор", socialUrl: "https://www.facebook.com/", bio: "Общественный деятель, представитель армянской диаспоры." },
  { id: "armenia-11", name: "Сурен Григор", regionId: "armenia", country: "Армения", city: "", status: "mandate_holder", role: "Сенатор", socialUrl: "https://www.facebook.com/", bio: "Общественный деятель, представитель армянской диаспоры." },
  { id: "armenia-12", name: "Хайк Варданян", regionId: "armenia", country: "Армения", city: "", status: "mandate_holder", role: "Сенатор", socialUrl: "https://www.facebook.com/", bio: "Общественный деятель, представитель армянской диаспоры." },
  { id: "armenia-13", name: "Геворг Манукян", regionId: "armenia", country: "Армения", city: "", status: "mandate_holder", role: "Сенатор", socialUrl: "https://www.facebook.com/", bio: "Общественный деятель, представитель армянской диаспоры." },
  { id: "armenia-14", name: "Сусанна Гюрджинян", regionId: "armenia", country: "Армения", city: "", status: "mandate_holder", role: "Сенатор", socialUrl: "https://www.facebook.com/", bio: "Общественный деятель, представитель армянской диаспоры." },
  { id: "armenia-15", name: "Аваг Хачатрян", regionId: "armenia", country: "Армения", city: "", status: "mandate_holder", role: "Сенатор", socialUrl: "https://www.facebook.com/", bio: "Общественный деятель, представитель армянской диаспоры." },
  { id: "armenia-16", name: "Армине Геворгян", regionId: "armenia", country: "Армения", city: "", status: "mandate_holder", role: "Сенатор", socialUrl: "https://www.facebook.com/", bio: "Общественный деятель, представитель армянской диаспоры." },
  { id: "armenia-17", name: "Аелета Дангян", regionId: "armenia", country: "Армения", city: "", status: "mandate_holder", role: "Сенатор", socialUrl: "https://www.facebook.com/", bio: "Общественный деятель, представитель армянской диаспоры." },
  { id: "armenia-18", name: "Армен Аветисян", regionId: "armenia", country: "Армения", city: "", status: "mandate_holder", role: "Сенатор", socialUrl: "https://www.facebook.com/", bio: "Общественный деятель, представитель армянской диаспоры." },
  { id: "armenia-19", name: "Армен Хачикян", regionId: "armenia", country: "Армения", city: "", status: "mandate_holder", role: "Сенатор", socialUrl: "https://www.facebook.com/", bio: "Общественный деятель, представитель армянской диаспоры." },
  { id: "armenia-20", name: "Армен Саргсян", regionId: "armenia", country: "Армения", city: "", status: "mandate_holder", role: "Сенатор", socialUrl: "https://www.facebook.com/", bio: "Общественный деятель, представитель армянской диаспоры." },
  { id: "armenia-21", name: "Эмма Бегиджанян", regionId: "armenia", country: "Армения", city: "", status: "mandate_holder", role: "Сенатор", socialUrl: "https://www.facebook.com/", bio: "Общественный деятель, представитель армянской диаспоры." },
  { id: "armenia-22", name: "Маарине Саргсян", regionId: "armenia", country: "Армения", city: "", status: "mandate_holder", role: "Сенатор", socialUrl: "https://www.facebook.com/", bio: "Общественный деятель, представитель армянской диаспоры." },
  { id: "armenia-23", name: "Марине Хачатрян", regionId: "armenia", country: "Армения", city: "", status: "mandate_holder", role: "Сенатор", socialUrl: "https://www.facebook.com/", bio: "Общественный деятель, представитель армянской диаспоры." },
  { id: "armenia-24", name: "Сурен Бадалов", regionId: "armenia", country: "Армения", city: "", status: "mandate_holder", role: "Сенатор", socialUrl: "https://www.facebook.com/", bio: "Общественный деятель, представитель армянской диаспоры." },

  // --- РФ и страны СНГ (110) ---
  {
    id: "russia-cis-1",
    name: "Саак Авакян",
    regionId: "russia-cis",
    country: "Россия / СНГ",
    city: "",
    status: "mandate_holder",
    role: "Сенатор",
    photo:
      "https://static.wixstatic.com/media/a79dba_32de490f99634cbdbacb4b3722a43def~mv2.jpg/v1/fill/w_233,h_272,al_c,q_80,usm_0.66_1.00_0.01,enc_avif,quality_auto/292534834_592863545563658_8881670996754971955_n_edited.jpg",
    socialUrl: "https://www.facebook.com/", bio: "Общественный деятель, представитель армянской диаспоры.",
  },
  {
    id: "russia-cis-2",
    name: "Луиза Иосифова",
    regionId: "russia-cis",
    country: "Россия / СНГ",
    city: "",
    status: "mandate_holder",
    role: "Сенатор",
    photo:
      "https://static.wixstatic.com/media/a79dba_c9fcac5912c8407ab04352d532949ce9~mv2.jpg/v1/fill/w_208,h_257,al_c,q_80,usm_0.66_1.00_0.01,enc_avif,quality_auto/294821148_446948520627604_1989368671484391514_n_edited.jpg",
    socialUrl: "https://www.facebook.com/", bio: "Общественный деятель, представитель армянской диаспоры.",
  },
  {
    id: "russia-cis-3",
    name: "Арсен Абраамян",
    regionId: "russia-cis",
    country: "Россия / СНГ",
    city: "",
    status: "mandate_holder",
    role: "Сенатор",
    photo:
      "https://static.wixstatic.com/media/a79dba_4e03bd8306364985aa68cf17308fa53f~mv2.jpg/v1/fill/w_201,h_250,al_c,lg_1,q_80,enc_avif,quality_auto/292722245_508336167726892_21963698861800.jpg",
    socialUrl: "https://www.facebook.com/", bio: "Руководитель территориального центра ЦИК в Москве.",
  },
  {
    id: "russia-cis-4",
    name: "Давид Абраамян",
    regionId: "russia-cis",
    country: "Россия / СНГ",
    city: "",
    status: "mandate_holder",
    role: "Сенатор",
    photo:
      "https://static.wixstatic.com/media/a79dba_f4495907a03347d2878cc8a06c377d0c~mv2.jpg/v1/fill/w_208,h_250,al_c,q_80,usm_0.66_1.00_0.01,enc_avif,quality_auto/387518171_6712357708887454_7198709620081735399_n_edited_edited.jpg",
    socialUrl: "https://www.facebook.com/", bio: "Общественный деятель, представитель армянской диаспоры.",
  },
  { id: "russia-cis-5", name: "Аида Варданян", regionId: "russia-cis", country: "Россия / СНГ", city: "", status: "mandate_holder", role: "Сенатор", socialUrl: "https://www.facebook.com/", bio: "Общественный деятель, представитель армянской диаспоры." },
  {
    id: "russia-cis-6",
    name: "Артур Айвазян",
    regionId: "russia-cis",
    country: "Россия / СНГ",
    city: "",
    status: "mandate_holder",
    role: "Сенатор",
    photo:
      "https://static.wixstatic.com/media/a79dba_60abc6f03008456a81958436eebefeed~mv2.jpg/v1/crop/x_4,y_20,w_185,h_226/fill/w_233,h_284,al_c,lg_1,q_80,enc_avif,quality_auto/372908819_1325229595056099_1994672331029574826_n_edited.jpg",
    socialUrl: "https://www.facebook.com/", bio: "Общественный деятель, представитель армянской диаспоры.",
  },
  {
    id: "russia-cis-7",
    name: "Гамлет Татоян",
    regionId: "russia-cis",
    country: "Россия / СНГ",
    city: "",
    status: "mandate_holder",
    role: "Сенатор",
    photo:
      "https://static.wixstatic.com/media/a79dba_f60f2fe934034512ac9f4cb238335bec~mv2.jpg/v1/fill/w_193,h_226,al_c,lg_1,q_80,enc_avif,quality_auto/372314546_686875743319574_63640034478766.jpg",
    socialUrl: "https://www.facebook.com/", bio: "Общественный деятель, представитель армянской диаспоры.",
  },
  { id: "russia-cis-8", name: "Арман", regionId: "russia-cis", country: "Россия / СНГ", city: "Димитровград", status: "mandate_holder", role: "Сенатор", socialUrl: "https://www.facebook.com/", bio: "Общественный деятель, представитель армянской диаспоры." },
  {
    id: "russia-cis-9",
    name: "Артур Погосян",
    regionId: "russia-cis",
    country: "Россия / СНГ",
    city: "Кабарда",
    status: "mandate_holder",
    role: "Сенатор",
    photo:
      "https://static.wixstatic.com/media/a79dba_b35a48423d6141ef8cc9567cc48beb51~mv2.jpg/v1/fill/w_201,h_257,al_c,q_80,usm_0.66_1.00_0.01,enc_avif,quality_auto/354488407_728875852323649_8250111534948152157_n_edited.jpg",
    socialUrl: "https://www.facebook.com/", bio: "Общественный деятель, представитель армянской диаспоры.",
  },
  { id: "russia-cis-10", name: "Ашот Мурадян", regionId: "russia-cis", country: "Россия / СНГ", city: "", status: "mandate_holder", role: "Сенатор", socialUrl: "https://www.facebook.com/", bio: "Общественный деятель, представитель армянской диаспоры." },
  { id: "russia-cis-11", name: "Владимир Бегларян", regionId: "russia-cis", country: "Россия / СНГ", city: "", status: "mandate_holder", role: "Сенатор", socialUrl: "https://www.facebook.com/", bio: "Общественный деятель, представитель армянской диаспоры." },
  {
    id: "russia-cis-12",
    name: "Владимир Пашоян",
    regionId: "russia-cis",
    country: "Россия / СНГ",
    city: "",
    status: "mandate_holder",
    role: "Сенатор",
    photo:
      "https://static.wixstatic.com/media/a79dba_9b882ce10e27442e9b0c0408acfa100e~mv2.jpg/v1/fill/w_201,h_272,al_c,q_80,enc_avif,quality_auto/346103676_591424642786332_4162683423528836001_n_edited.jpg",
    socialUrl: "https://www.facebook.com/", bio: "Общественный деятель, представитель армянской диаспоры.",
  },
  {
    id: "russia-cis-13",
    name: "Гарик Газарян",
    regionId: "russia-cis",
    country: "Россия / СНГ",
    city: "",
    status: "mandate_holder",
    role: "Сенатор",
    photo:
      "https://static.wixstatic.com/media/a79dba_8786161b0a7a4bf6bafa71505ca95f9e~mv2.jpg/v1/crop/x_3,y_40,w_266,h_344/fill/w_208,h_269,al_c,q_80,usm_0.66_1.00_0.01,enc_avif,quality_auto/344715399_942911610248699_40845791885057.jpg",
    socialUrl: "https://www.facebook.com/", bio: "Общественный деятель, представитель армянской диаспоры.",
  },
  {
    id: "russia-cis-14",
    name: "Гукас Манукян",
    regionId: "russia-cis",
    country: "Россия / СНГ",
    city: "Молдова",
    status: "mandate_holder",
    role: "Сенатор",
    photo:
      "https://static.wixstatic.com/media/a79dba_b0b919ac1f294f6fb66b206def4c47df~mv2.jpg/v1/fill/w_208,h_257,al_c,q_80,usm_0.66_1.00_0.01,enc_avif,quality_auto/355854081_1192897042105237_5971321152800836845_n_edited.jpg",
    socialUrl: "https://www.facebook.com/", bio: "Общественный деятель, представитель армянской диаспоры.",
  },
  {
    id: "russia-cis-15",
    name: "Оганнес Катикян",
    regionId: "russia-cis",
    country: "Россия / СНГ",
    city: "",
    status: "mandate_holder",
    role: "Сенатор",
    photo:
      "https://static.wixstatic.com/media/a79dba_70de2bef63f4464d9fad7ed8013d2d4a~mv2.jpg/v1/fill/w_208,h_291,al_c,lg_1,q_80,enc_avif,quality_auto/IMG-20230616-WA0000_edited.jpg",
    socialUrl: "https://www.facebook.com/", bio: "Общественный деятель, представитель армянской диаспоры.",
  },
  { id: "russia-cis-16", name: "Наира Саркисян", regionId: "russia-cis", country: "Россия / СНГ", city: "", status: "mandate_holder", role: "Сенатор", socialUrl: "https://www.facebook.com/", bio: "Общественный деятель, представитель армянской диаспоры." },
  { id: "russia-cis-17", name: "Размик", regionId: "russia-cis", country: "Россия / СНГ", city: "Чебоксары", status: "mandate_holder", role: "Сенатор", socialUrl: "https://www.facebook.com/", bio: "Общественный деятель, представитель армянской диаспоры." },
  { id: "russia-cis-18", name: "Феликс Бадалян", regionId: "russia-cis", country: "Россия / СНГ", city: "", status: "mandate_holder", role: "Сенатор", socialUrl: "https://www.facebook.com/", bio: "Общественный деятель, представитель армянской диаспоры." },
  { id: "russia-cis-19", name: "Ашот Шахсуварян", regionId: "russia-cis", country: "Россия / СНГ", city: "", status: "mandate_holder", role: "Сенатор", socialUrl: "https://www.facebook.com/", bio: "Общественный деятель, представитель армянской диаспоры." },
  { id: "russia-cis-20", name: "Вардан Арзуманян", regionId: "russia-cis", country: "Россия / СНГ", city: "", status: "mandate_holder", role: "Сенатор", socialUrl: "https://www.facebook.com/", bio: "Общественный деятель, представитель армянской диаспоры." },
  { id: "russia-cis-21", name: "Аршак Тигранвич", regionId: "russia-cis", country: "Россия / СНГ", city: "", status: "mandate_holder", role: "Сенатор", socialUrl: "https://www.facebook.com/", bio: "Общественный деятель, представитель армянской диаспоры." },
  { id: "russia-cis-22", name: "Армен Григорян", regionId: "russia-cis", country: "Россия / СНГ", city: "", status: "mandate_holder", role: "Сенатор", socialUrl: "https://www.facebook.com/", bio: "Общественный деятель, представитель армянской диаспоры." },
  {
    id: "russia-cis-23",
    name: "Армен Авагян",
    regionId: "russia-cis",
    country: "Россия / СНГ",
    city: "",
    status: "mandate_holder",
    role: "Сенатор",
    photo:
      "https://static.wixstatic.com/media/a79dba_217b4bd92be0492d94d0d1f8af925f15~mv2.jpg/v1/fill/w_201,h_250,al_c,q_80,usm_0.66_1.00_0.01,enc_avif,quality_auto/5771963a-8446-42c8-9d4b-195ba28a7beb_edited.jpg",
    socialUrl: "https://www.facebook.com/", bio: "Общественный деятель, представитель армянской диаспоры.",
  },
  { id: "russia-cis-24", name: "Армен Артурович", regionId: "russia-cis", country: "Россия / СНГ", city: "", status: "mandate_holder", role: "Сенатор", socialUrl: "https://www.facebook.com/", bio: "Общественный деятель, представитель армянской диаспоры." },
  { id: "russia-cis-25", name: "Ашот Севян", regionId: "russia-cis", country: "Россия / СНГ", city: "", status: "mandate_holder", role: "Сенатор", socialUrl: "https://www.facebook.com/", bio: "Общественный деятель, представитель армянской диаспоры." },
  {
    id: "russia-cis-26",
    name: "Смбат Акопян",
    regionId: "russia-cis",
    country: "Россия / СНГ",
    city: "",
    status: "mandate_holder",
    role: "Сенатор",
    photo:
      "https://static.wixstatic.com/media/a79dba_0bf1c532f5504a0b9e8d5d54d340f082~mv2.jpg/v1/fill/w_215,h_279,al_c,q_80,usm_0.66_1.00_0.01,enc_avif,quality_auto/014-1_edited.jpg",
    socialUrl: "https://www.facebook.com/", bio: "Общественный деятель, представитель армянской диаспоры.",
  },

  // --- США и Канада (100) ---
  { id: "usa-canada-1", name: "Левон Улубабов", regionId: "usa-canada", country: "США / Канада", city: "", status: "mandate_holder", role: "Сенатор", socialUrl: "https://www.facebook.com/", bio: "Общественный деятель, представитель армянской диаспоры." },
  { id: "usa-canada-2", name: "Ваге Месропян", regionId: "usa-canada", country: "США / Канада", city: "", status: "mandate_holder", role: "Сенатор", socialUrl: "https://www.facebook.com/", bio: "Руководитель территориального центра ЦИК в Лос-Анджелесе." },
  { id: "usa-canada-3", name: "Эдвин", regionId: "usa-canada", country: "США / Канада", city: "", status: "mandate_holder", role: "Сенатор", socialUrl: "https://www.facebook.com/", bio: "Общественный деятель, представитель армянской диаспоры." },
  { id: "usa-canada-4", name: "Артур Нуриджанян", regionId: "usa-canada", country: "США / Канада", city: "", status: "mandate_holder", role: "Сенатор", socialUrl: "https://www.facebook.com/", bio: "Общественный деятель, представитель армянской диаспоры." },
  { id: "usa-canada-5", name: "Мариам Яан", regionId: "usa-canada", country: "США / Канада", city: "", status: "mandate_holder", role: "Сенатор", socialUrl: "https://www.facebook.com/", bio: "Общественный деятель, представитель армянской диаспоры." },
  { id: "usa-canada-6", name: "Гагик Саакян", regionId: "usa-canada", country: "США / Канада", city: "", status: "mandate_holder", role: "Сенатор", socialUrl: "https://www.facebook.com/", bio: "Общественный деятель, представитель армянской диаспоры." },
  { id: "usa-canada-7", name: "Марине Казарян", regionId: "usa-canada", country: "США / Канада", city: "", status: "mandate_holder", role: "Сенатор", socialUrl: "https://www.facebook.com/", bio: "Общественный деятель, представитель армянской диаспоры." },
  { id: "usa-canada-8", name: "Лилит Манасян", regionId: "usa-canada", country: "США / Канада", city: "", status: "mandate_holder", role: "Сенатор", socialUrl: "https://www.facebook.com/", bio: "Общественный деятель, представитель армянской диаспоры." },
  { id: "usa-canada-9", name: "Агабек", regionId: "usa-canada", country: "США / Канада", city: "", status: "mandate_holder", role: "Сенатор", socialUrl: "https://www.facebook.com/", bio: "Общественный деятель, представитель армянской диаспоры." },

  // --- Страны Севрского Договора (66) ---
  {
    id: "sevres-1",
    name: "Аветис Садоян",
    regionId: "sevres",
    country: "Севрский договор",
    city: "",
    status: "mandate_holder",
    role: "Сенатор",
    photo:
      "https://static.wixstatic.com/media/a79dba_fe7088e9823246f7b1e790f490801bc2~mv2.jpg/v1/fill/w_292,h_292,al_c,q_80,usm_0.66_1.00_0.01,enc_avif,quality_auto/460961613_10234978697991892_8185912569949107483_n.jpg",
    socialUrl: "https://www.facebook.com/", bio: "Общественный деятель, представитель армянской диаспоры.",
  },
  { id: "sevres-2", name: "Едуард Барсегян", regionId: "sevres", country: "Севрский договор", city: "", status: "mandate_holder", role: "Сенатор", socialUrl: "https://www.facebook.com/", bio: "Общественный деятель, представитель армянской диаспоры." },
  { id: "sevres-3", name: "Саркис Каспарян", regionId: "sevres", country: "Севрский договор", city: "", status: "mandate_holder", role: "Сенатор", socialUrl: "https://www.facebook.com/", bio: "Общественный деятель, представитель армянской диаспоры." },
  { id: "sevres-4", name: "Леонардо Басмаджян", regionId: "sevres", country: "Севрский договор", city: "", status: "mandate_holder", role: "Сенатор", socialUrl: "https://www.facebook.com/", bio: "Общественный деятель, представитель армянской диаспоры." },
  {
    id: "sevres-5",
    name: "Геворг Григорян",
    regionId: "sevres",
    country: "Севрский договор",
    city: "",
    status: "mandate_holder",
    role: "Сенатор",
    photo:
      "https://static.wixstatic.com/media/a79dba_337af5131f904b31a78505ff6e08edb3~mv2.jpg/v1/fill/w_253,h_300,al_c,q_80,usm_0.66_1.00_0.01,enc_avif,quality_auto/487002929_29523624217224689_2644955363019547876_n_edited.jpg",
    socialUrl: "https://www.facebook.com/", bio: "Руководитель территориального центра ЦИК в Вене.",
  },
  {
    id: "sevres-6",
    name: "Тиграм Микаелян",
    regionId: "sevres",
    country: "Севрский договор",
    city: "",
    status: "mandate_holder",
    role: "Сенатор",
    photo:
      "https://static.wixstatic.com/media/a79dba_14837408cbca4a80aad6a3724255e072~mv2.jpg/v1/fill/w_194,h_292,al_c,q_80,usm_0.66_1.00_0.01,enc_avif,quality_auto/460646920_10230333783361378_283805555592.jpg",
    socialUrl: "https://www.facebook.com/", bio: "Общественный деятель, представитель армянской диаспоры.",
  },
  { id: "sevres-7", name: "Кармен Мирзоян", regionId: "sevres", country: "Севрский договор", city: "", status: "mandate_holder", role: "Сенатор", socialUrl: "https://www.facebook.com/", bio: "Общественный деятель, представитель армянской диаспоры." },
  { id: "sevres-8", name: "Арарат Гукасян", regionId: "sevres", country: "Севрский договор", city: "", status: "mandate_holder", role: "Сенатор", socialUrl: "https://www.facebook.com/", bio: "Общественный деятель, представитель армянской диаспоры." },
  { id: "sevres-9", name: "Карине Айрапетян", regionId: "sevres", country: "Севрский договор", city: "", status: "mandate_holder", role: "Сенатор", socialUrl: "https://www.facebook.com/", bio: "Общественный деятель, представитель армянской диаспоры." },
  { id: "sevres-10", name: "Тигран Багратуни", regionId: "sevres", country: "Севрский договор", city: "", status: "mandate_holder", role: "Сенатор", socialUrl: "https://www.facebook.com/", bio: "Общественный деятель, представитель армянской диаспоры." },
  { id: "sevres-11", name: "Лариса Оганесян", regionId: "sevres", country: "Севрский договор", city: "", status: "mandate_holder", role: "Сенатор", socialUrl: "https://www.facebook.com/", bio: "Общественный деятель, представитель армянской диаспоры." },

  // --- Южная Америка (42) ---
  {
    id: "south-america-1",
    name: "Иннеса Асрян Катамикян",
    regionId: "south-america",
    country: "Бразилия",
    city: "",
    status: "mandate_holder",
    role: "Сенатор",
    photo:
      "https://static.wixstatic.com/media/a79dba_8c866f73d6324321b469e4da1e8b87ad~mv2.jpg/v1/fill/w_178,h_219,al_c,lg_1,q_80,enc_avif,quality_auto/373429398_264003073188625_247395331986758058_n_edited.jpg",
    socialUrl: "https://www.facebook.com/", bio: "Общественный деятель, представитель армянской диаспоры.",
  },
  { id: "south-america-2", name: "Саргис Карамикян", regionId: "south-america", country: "Бразилия", city: "", status: "mandate_holder", role: "Сенатор", socialUrl: "https://www.facebook.com/", bio: "Общественный деятель, представитель армянской диаспоры." },

  // --- Страны Ближнего Востока (18) ---
  { id: "middle-east-1", name: "Ваге Махчикян", regionId: "middle-east", country: "Ближний Восток", city: "", status: "mandate_holder", role: "Сенатор", socialUrl: "https://www.facebook.com/", bio: "Общественный деятель, представитель армянской диаспоры." },
  { id: "middle-east-2", name: "Нарек Абраамян", regionId: "middle-east", country: "Ближний Восток", city: "", status: "mandate_holder", role: "Сенатор", socialUrl: "https://www.facebook.com/", bio: "Общественный деятель, представитель армянской диаспоры." },

  // --- Грузия (11) ---
  { id: "georgia-1", name: "Геврог Екносян", regionId: "georgia", country: "Грузия", city: "", status: "mandate_holder", role: "Сенатор", socialUrl: "https://www.facebook.com/", bio: "Общественный деятель, представитель армянской диаспоры." },
  { id: "georgia-2", name: "Саркис Маркакян", regionId: "georgia", country: "Грузия", city: "", status: "mandate_holder", role: "Сенатор", socialUrl: "https://www.facebook.com/", bio: "Общественный деятель, представитель армянской диаспоры." },

  // --- Иран (10) ---
  { id: "iran-1", name: "Андраник Симонян", regionId: "iran", country: "Иран", city: "", status: "mandate_holder", role: "Сенатор", socialUrl: "https://www.facebook.com/", bio: "Общественный деятель, представитель армянской диаспоры." },
];
export const regionCandidates: PersonCard[] = [
  { id: "russia-cis-cand-1", name: "Армен Давтян", regionId: "russia-cis", country: "Россия / СНГ", city: "", status: "candidate", role: "Кандидат", votesFor: 0, votesAgainst: 0, socialUrl: "https://www.facebook.com/", bio: "Общественный деятель, представитель армянской диаспоры." },
  { id: "russia-cis-cand-2", name: "Шаген Петросян", regionId: "russia-cis", country: "Россия / СНГ", city: "", status: "candidate", role: "Кандидат", votesFor: 0, votesAgainst: 0, socialUrl: "https://www.facebook.com/", bio: "Общественный деятель, представитель армянской диаспоры." },
];

export const joinPageContent = {
  eyebrow: loc("Подача заявки"),
  title: loc("Присоединиться к United Armenian Senate"),
  description: loc(
    "Заполните форму, если хотите стать сенатором, кандидатом, представлять организацию, стать волонтёром или связаться с Сенатом.",
  ),
  submitLabel: loc("Отправить заявку"),
  success: loc(
    "Заявка отправлена. Представитель Сената свяжется с вами.",
  ),
  fields: {
    firstName: loc("Имя"),
    lastName: loc("Фамилия"),
    country: loc("Страна"),
    city: loc("Город"),
    email: loc("Email"),
    phone: loc("Телефон"),
    messenger: loc("Telegram / WhatsApp"),
    applicationType: loc("Тип заявки"),
    block: loc("Регион или институциональный блок"),
    organization: loc("Организация, если есть"),
    experience: loc("Опыт / компетенции"),
    message: loc("Сообщение"),
  },
  applicationTypes: [
    loc("Хочу стать сенатором"),
    loc("Хочу стать кандидатом"),
    loc("Представляю организацию"),
    loc("Хочу стать волонтёром"),
    loc("Хочу связаться с Сенатом"),
  ],
};

export const footerContent = {
  description: loc(
    "United Armenian Senate — светлая и понятная институциональная платформа для координации армянских общин, мандатов и участия в работе Сената.",
  ),
  contactsTitle: loc("Контакты"),
  email: "info@uasenate.org",
  phone: "+374 10 700 501",
};

export const structurePageContent = {
  eyebrow: loc("Структура мандатов"),
  title: loc("501 мандат и институциональная архитектура Сената"),
  description: loc(
    "На этой странице показаны региональные блоки, институциональные квоты, свободные места и структурные органы Всеармянского Сената.",
  ),
};

export const cecPageContent = {
  eyebrow: loc("Избирательный процесс"),
  title: loc("Центральная избирательная комиссия"),
  description: loc(
    "Единая система ЦИК полностью управляет процессом формирования Сената: от проведения онлайн-выборов и распределения 501 мандата до правовой поддержки избранных сенаторов.",
  ),
  stepsTitle: loc("Как проходят выборы"),
  stepsText: loc(
    "Процесс выстроен в три последовательных этапа — от безопасного онлайн-голосования до юридического сопровождения сенаторов.",
  ),
  steps: [
    {
      title: loc("Онлайн-выборы"),
      description: loc(
        "ЦИК организует безопасное дистанционное голосование, обеспечивает кибербезопасность и доступ для избирателей из любой точки мира.",
      ),
    },
    {
      title: loc("Распределение мандатов"),
      description: loc(
        "Проводит прозрачный подсчёт голосов, верифицирует результаты и закрепляет 501 мандат за региональными представителями.",
      ),
    },
    {
      title: loc("Правовая поддержка"),
      description: loc(
        "Обеспечивает юридическое сопровождение, помогает сенаторам войти в курс дела и координирует их дальнейшую правовую деятельность.",
      ),
    },
  ],
  factsTitle: loc("Общая информация и легитимность"),
  factsText: loc(
    "Ключевые параметры избирательного процесса Всеармянского сената.",
  ),
  facts: [
    {
      value: "Онлайн",
      label: loc("Формат выборов"),
      description: loc("Голосование проводится дистанционно, в режиме онлайн."),
    },
    {
      value: "~300 000",
      label: loc("Избирателей со всего мира"),
      description: loc(
        "Ожидаемая явка призвана обеспечить легитимность выборов.",
      ),
    },
    {
      value: "501",
      label: loc("Сенатор"),
      description: loc(
        "Общее число мандатов не может быть менее 499 и более 501. Выборы завершаются, когда состав полностью укомплектован.",
      ),
    },
    {
      value: "5 лет",
      label: loc("Срок полномочий"),
      description: loc(
        "На такой срок избираются сенаторы (кроме пожизненных).",
      ),
    },
    {
      value: "F-67075",
      label: loc("Правовая база"),
      description: loc(
        "Выборы основаны на справочнике Совета Европы «Применение международных избирательных стандартов» (2016).",
      ),
    },
  ],
  structureTitle: loc("Структура комиссий"),
  structureText: loc(
    "Систему координируют штаб-квартира и четыре территориальных центра. Контроль за процессом выборов берёт на себя ЦИК в США (Лос-Анджелес).",
  ),
  hq: {
    title: loc("Штаб-квартира"),
    city: loc("Берлин, Германия"),
    head: loc("Арам Мкртчян"),
    flag: "de",
  },
  centers: [
    { city: loc("Ереван, Армения"), head: loc("Ашот Саркисян"), flag: "am" },
    { city: loc("Москва, Россия"), head: loc("Арсен Абраамян"), flag: "ru" },
    { city: loc("Лос-Анджелес, США"), head: loc("Ваге Месропян"), flag: "us" },
    { city: loc("Вена, ЕС"), head: loc("Геворг Григорян"), flag: "eu" },
  ],
  legalTitle: loc("Международно-правовая основа"),
  legalText: loc(
    "Деятельность Комиссии и процедура формирования Сената регламентированы международными нормами.",
  ),
  legalCards: [
    {
      title: loc("Совет Европы"),
      badge: "F-67075",
      description: loc(
        "Методология и правила голосования опираются на справочник Совета Европы «Применение международных избирательных стандартов» (Council of Europe, Strasbourg, F-67075).",
      ),
    },
    {
      title: loc("Принципы гуманитарного права"),
      badge: "jus in bello",
      description: loc(
        "Комиссия руководствуется принципами международного гуманитарного права, обеспечивая защиту прав и равный доступ к голосованию для всех участников.",
      ),
    },
  ],
  ctaTitle: loc("Выдвижение кандидатуры"),
  ctaText: loc(
    "Кандидатом может стать армянин, достигший 35 лет и обладающий определённым общественным авторитетом, независимо от места жительства. Приём заявок и регистрация кандидатов проходят онлайн.",
  ),
  ctaButton: loc("Подать заявку"),
};

export function getAlternates(locale: Locale, route: StaticRoute) {
  return {
    canonical: getCanonicalUrl(locale, route),
    languages: {
      hy: getCanonicalUrl("hy", route),
      ru: getCanonicalUrl("ru", route),
      en: getCanonicalUrl("en", route),
    },
  };
}

export function getFreeSeats(block: Pick<MandateBlock, "seatsTotal" | "seatsOccupied">) {
  return block.seatsTotal - block.seatsOccupied;
}

export function getMandateOverview(blocks: MandateBlock[]) {
  const seatsTotal = blocks.reduce((sum, item) => sum + item.seatsTotal, 0);
  const seatsOccupied = blocks.reduce((sum, item) => sum + item.seatsOccupied, 0);
  const candidates = blocks.reduce((sum, item) => sum + item.candidates, 0);
  const seatsFree = seatsTotal - seatsOccupied;

  return {
    seatsTotal,
    seatsOccupied,
    candidates,
    seatsFree,
  };
}

export function findRegionById(id: string) {
  return mandateRegions.find((item) => item.id === id);
}

