import type { Locale } from "@/lib/i18n";
import { getCanonicalUrl } from "@/lib/site";

type LocalizedText = Record<Locale, string>;

type RouteContent = {
  title: string;
  description: string;
};

export type StaticRoute = "home" | "structure" | "documents" | "join";

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
};

export type MandateDistributionRow = {
  id: string;
  index: number;
  region: LocalizedText;
  entries: {
    label: LocalizedText;
    seats: LocalizedText;
  }[];
};

export type MandateDistributionSection = {
  id: string;
  index: number;
  title: LocalizedText;
  seatsTotal: number;
  seatsOccupied: number;
  candidates: number;
  entries: {
    label: LocalizedText;
    seats: LocalizedText;
    seatsValue: number;
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
  country: string;
  city: string;
  status: "mandate_holder" | "candidate";
  role: string;
  votesFor?: number;
  votesAgainst?: number;
  photo?: string;
  bio: string;
};

export type DocumentCard = {
  id: string;
  title: LocalizedText;
  category: LocalizedText;
  language: string;
  description: LocalizedText;
  fileUrl: string;
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
    documents: {
      title: "Документы",
      description:
        "Основные документы Всеармянского Сената: концепция, манифест и рабочие материалы.",
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
    documents: {
      title: "Documents",
      description:
        "Core documents of the United Armenian Senate: concept, manifesto, and working materials.",
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
    documents: {
      title: "Փաստաթղթեր",
      description:
        "Համահայկական Սենատի հիմնական փաստաթղթերը՝ հայեցակարգ, մանիֆեստ և աշխատանքային նյութեր։",
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
    documents: "Документы",
    join: "Присоединиться",
    cta: "Стать сенатором",
  },
  en: {
    home: "Home",
    structure: "Structure",
    documents: "Documents",
    join: "Join",
    cta: "Become a Senator",
  },
  hy: {
    home: "Գլխավոր",
    structure: "Կառուցվածք",
    documents: "Փաստաթղթեր",
    join: "Միանալ",
    cta: "Դառնալ սենատոր",
  },
};

export const homePageContent = {
  heroEyebrow: loc("Международная институциональная платформа"),
  heroSubtitle: loc(
    "Всеармянский Сенат — международная платформа координации и представительства армянских общин мира.",
    "The United Armenian Senate is an international platform for coordination and representation of Armenian communities worldwide.",
    "Համահայկական Սենատը համաշխարհային հայկական համայնքների համակարգման և ներկայացուցչության միջազգային հարթակ է։",
  ),
  heroText: loc(
    "Сенат объединяет армянские общины, организации и представителей по всему миру для координации взаимодействия, сотрудничества и представления интересов армянства.",
    "The Senate brings together Armenian communities, organizations, and representatives worldwide to coordinate efforts, defend Armenian rights, and build a unified institutional framework.",
    "Սենատը միավորում է հայկական համայնքները, կազմակերպություններն ու ներկայացուցիչներին ամբողջ աշխարհում՝ համակարգման, հայության իրավունքների պաշտպանության և միասնական ինստիտուցիոնալ կառուցվածքի ձևավորման համար։",
  ),
  aboutTitle: loc("О Сенате", "About the Senate", "Սենատի մասին"),
  aboutText: loc(
    "Единая схема показывает, как UAS соединяет мандатную систему, органы управления и ключевые задачи международной армянской платформы.",
    "The unified scheme shows how UAS connects the mandate system, governance bodies, and the key tasks of the international Armenian platform.",
    "Միասնական սխեման ցույց է տալիս, թե ինչպես է UAS-ը միավորում մանդատային համակարգը, կառավարման մարմիններն ու համահայկական հարթակի հիմնական խնդիրները։",
  ),
  senateTitle: loc("Что такое Сенат"),
  senateCards: [
    {
      title: loc("501 мандат"),
      description: loc("Система глобального представительства армянства."),
    },
    {
      title: loc("9 региональных блоков"),
      description: loc(
        "Региональная структура мандатов по ключевым зонам армянского мира.",
      ),
    },
    {
      title: loc("Кандидаты и выборы"),
      description: loc(
        "Сенаторы могут выдвигаться общинами, организациями или через самовыдвижение.",
      ),
    },
    {
      title: loc("Структурные органы"),
      description: loc(
        "Комиссии и рабочие органы Сената отвечают за направления деятельности.",
      ),
    },
  ],
  tasksTitle: loc("Главные задачи Сената"),
  tasks: [
    {
      title: loc("Координация армянских общин"),
      description: loc(
        "Создание единой системы взаимодействия армянских общин и организаций.",
      ),
    },
    {
      title: loc("Представительство армянства"),
      description: loc(
        "Представление интересов армянских общин и структур в международной повестке.",
      ),
    },
    {
      title: loc("Защита прав армян"),
      description: loc(
        "Работа по вопросам прав армянства, исторической справедливости и правового представительства.",
      ),
    },
    {
      title: loc("Сохранение идентичности"),
      description: loc(
        "Поддержка армянской культуры, языка, наследия и связи с исторической родиной.",
      ),
    },
    {
      title: loc("Организация участия"),
      description: loc(
        "Создание механизма выдвижения, выбора и участия сенаторов.",
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
  becomeTitle: loc("Как стать сенатором"),
  becomeText: loc(
    "Кандидаты в сенаторы могут быть выдвинуты армянскими общинами, организациями, общественными структурами или подать заявку через механизм самовыдвижения.",
  ),
  becomeCards: [
    loc("Самовыдвижение"),
    loc("Выдвижение общиной"),
    loc("Выдвижение организацией"),
    loc("Кандидат от общественной структуры"),
  ],
};

export const mandateRegions: MandateBlock[] = [
  {
    id: "armenia",
    title: loc("Армения"),
    seatsTotal: 120,
    seatsOccupied: 0,
    candidates: 0,
    description: loc(
      "Армения, беженцы из Азербайджана, Арцах, Нахичевань, Карс, Сурмалу",
    ),
    marker: { x: 55, y: 44 },
  },
  {
    id: "russia-cis",
    title: loc("РФ и страны СНГ"),
    seatsTotal: 110,
    seatsOccupied: 0,
    candidates: 0,
    description: loc("РФ и страны СНГ"),
    marker: { x: 64, y: 24 },
  },
  {
    id: "usa-canada",
    title: loc("США и Канада"),
    seatsTotal: 100,
    seatsOccupied: 0,
    candidates: 0,
    description: loc("США — 75 мандатов, Канада — 25 мандатов"),
    marker: { x: 18, y: 28 },
  },
  {
    id: "sevres",
    title: loc("Страны Севрского Договора"),
    seatsTotal: 66,
    seatsOccupied: 0,
    candidates: 0,
    description: loc("Страны Севрского Договора"),
    marker: { x: 46, y: 21 },
  },
  {
    id: "south-america",
    title: loc("Южная Америка"),
    seatsTotal: 42,
    seatsOccupied: 0,
    candidates: 0,
    description: loc("Армянские общины стран Южной Америки"),
    marker: { x: 28, y: 72 },
  },
  {
    id: "australia-asia",
    title: loc("Австралия и Южная/Восточная Азия"),
    seatsTotal: 24,
    seatsOccupied: 0,
    candidates: 0,
    description: loc("Австралия, страны Южной и Восточной Азии"),
    marker: { x: 82, y: 68 },
  },
  {
    id: "middle-east",
    title: loc("Страны Ближнего Востока"),
    seatsTotal: 18,
    seatsOccupied: 0,
    candidates: 0,
    description: loc("Страны Ближнего Востока"),
    marker: { x: 57, y: 41 },
  },
  {
    id: "georgia",
    title: loc("Грузия"),
    seatsTotal: 11,
    seatsOccupied: 0,
    candidates: 0,
    description: loc("Армянская община Грузии"),
    marker: { x: 56, y: 39 },
  },
  {
    id: "iran",
    title: loc("Иран"),
    seatsTotal: 10,
    seatsOccupied: 0,
    candidates: 0,
    description: loc("Иран"),
    marker: { x: 60, y: 44 },
  },
];

export const institutionBlocks: MandateBlock[] = [
  {
    id: "apostolic-church",
    title: loc("Армянская Апостольская Церковь"),
    seatsTotal: 14,
    seatsOccupied: 0,
    candidates: 0,
    description: loc("Эчмиадзин — 7 мест, Антилиас — 7 мест"),
    marker: { x: 0, y: 0 },
  },
  {
    id: "catholic-evangelical",
    title: loc("Католические и Евангелические церкви"),
    seatsTotal: 10,
    seatsOccupied: 0,
    candidates: 0,
    description: loc(
      "Католическая церковь — 5 мест, Евангелическая церковь — 5 мест",
    ),
    marker: { x: 0, y: 0 },
  },
  {
    id: "unions",
    title: loc("Союзы и общественные организации"),
    seatsTotal: 20,
    seatsOccupied: 0,
    candidates: 0,
    description: loc("Землячества, общественные союзы и другие структуры"),
    marker: { x: 0, y: 0 },
  },
];

export const mandateMapGroups: MandateBlock[] = [
  {
    id: "sevres-18",
    title: loc("Страны Севрского Договора", "Sevres Treaty Countries", "Սևրի դաշնագիրը վավերացրած երկրներ"),
    seatsTotal: 54,
    seatsOccupied: 0,
    candidates: 0,
    description: loc("18 стран, ратифицировавших Севрский договор", "18 countries of the Sevres Treaty", "Սևրի դաշնագիրը վավերացրած 18 երկրներ"),
    marker: { x: 46, y: 21 },
  },
  {
    id: "usa-canada-total",
    title: loc("США и Канада", "USA and Canada", "ԱՄՆ և Կանադա"),
    seatsTotal: 96,
    seatsOccupied: 0,
    candidates: 0,
    description: loc("Общины и иные армянские структуры США и Канады", "Communities and Armenian structures in the USA and Canada", "ԱՄՆ և Կանադայի համայնքներ և հայկական կառույցներ"),
    marker: { x: 18, y: 28 },
  },
  {
    id: "russia-total",
    title: loc("РФ", "Russia", "ՌԴ"),
    seatsTotal: 55,
    seatsOccupied: 0,
    candidates: 0,
    description: loc("Общины, Конгресс и РҲМ", "Communities, Congress and RHM", "Համայնքներ, Կոնգրես և ՌՀՄ"),
    marker: { x: 64, y: 24 },
  },
  {
    id: "middle-east-total",
    title: loc("Страны Ближнего Востока", "Middle East", "Մերձավոր Արևելքի երկրներ"),
    seatsTotal: 30,
    seatsOccupied: 0,
    candidates: 0,
    description: loc("Общины и армянские структуры", "Communities and Armenian structures", "Համայնքներ և հայկական կառույցներ"),
    marker: { x: 57, y: 41 },
  },
  {
    id: "latin-america-total",
    title: loc("Латинская Америка", "Latin America", "Լատինական Ամերիկա"),
    seatsTotal: 40,
    seatsOccupied: 0,
    candidates: 0,
    description: loc("Общины и армянские структуры", "Communities and Armenian structures", "Համայնքներ և հայկական կառույցներ"),
    marker: { x: 28, y: 72 },
  },
  {
    id: "australia-asia-total",
    title: loc("Австралия и Южная/Восточная Азия", "Australia and South/East Asia", "Ավստրալիա և Հարավային/Արևելյան Ասիա"),
    seatsTotal: 30,
    seatsOccupied: 0,
    candidates: 0,
    description: loc("Армянские общины региона", "Armenian communities of the region", "Տարածաշրջանի հայկական համայնքներ"),
    marker: { x: 82, y: 68 },
  },
  {
    id: "europe-total",
    title: loc("Европа", "Europe", "Եվրոպա"),
    seatsTotal: 82,
    seatsOccupied: 0,
    candidates: 0,
    description: loc("Общины, структуры и Հայ Դատ", "Communities, structures and Hay Dat", "Համայնքներ, կառույցներ և Հայ Դատ"),
    marker: { x: 50, y: 18 },
  },
  {
    id: "central-asia-iran-total",
    title: loc("Средняя Азия и Иран", "Central Asia and Iran", "Միջին Ասիա և Իրան"),
    seatsTotal: 35,
    seatsOccupied: 0,
    candidates: 0,
    description: loc("Армянские общины региона", "Armenian communities of the region", "Տարածաշրջանի հայկական համայնքներ"),
    marker: { x: 67, y: 39 },
  },
  {
    id: "ukraine-georgia-moldova-belarus-total",
    title: loc("Украина, Грузия, Молдова, Беларусь", "Ukraine, Georgia, Moldova, Belarus", "Ուկրաինա, Վրաստան, Մոլդովա, Բելոռուս"),
    seatsTotal: 35,
    seatsOccupied: 0,
    candidates: 0,
    description: loc("Армянские общины региона", "Armenian communities of the region", "Տարածաշրջանի հայկական համայնքներ"),
    marker: { x: 58, y: 26 },
  },
];

export const mandateDistributionRows: MandateDistributionRow[] = [
  {
    id: "dist-1",
    index: 1,
    region: loc("18 стран, ратифицировавших Севрский договор", "18 countries that ratified the Sevres Treaty", "Սևրի դաշնագիրը վավերացրած 18 երկրներ"),
    entries: [
      { label: loc("армянские общины", "Armenian communities", "հայկական համայնքներ"), seats: loc("54 мест", "54 seats", "54 տեղ") },
      { label: loc("армянские структуры", "Armenian structures", "հայկական կառույցներ"), seats: loc("", "", "") },
    ],
  },
  {
    id: "dist-2",
    index: 2,
    region: loc("США, Канада", "USA, Canada", "ԱՄՆ, Կանադա"),
    entries: [
      { label: loc("армянские общины", "Armenian communities", "հայկական համայնքներ"), seats: loc("40 мест", "40 seats", "40 տեղ") },
    ],
  },
  {
    id: "dist-3",
    index: 3,
    region: loc("США, Канада", "USA, Canada", "ԱՄՆ, Կանադա"),
    entries: [
      { label: loc("иные армянские структуры", "other Armenian structures", "հայկական այլ կառույցներ"), seats: loc("15 мест", "15 seats", "15 տեղ") },
      { label: loc("Армянский конгресс", "Armenian Congress", "Հայկական Համագումար"), seats: loc("18 мест", "18 seats", "18 տեղ") },
      { label: loc("Ай Дат", "Hay Dat", "Հայ Դատ"), seats: loc("6 мест", "6 seats", "6 տեղ") },
      { label: loc("Благотворительные структуры", "Charitable organizations", "Բարեգործական"), seats: loc("5 мест", "5 seats", "5 տեղ") },
      { label: loc("традиционные партии", "traditional parties", "Ավանդական կուսակցություններ"), seats: loc("12 мест", "12 seats", "12 տեղ") },
    ],
  },
  {
    id: "dist-4",
    index: 4,
    region: loc("РФ", "Russia", "ՌԴ"),
    entries: [
      { label: loc("армянские общины", "Armenian communities", "հայկական համայնքներ"), seats: loc("35 мест", "35 seats", "35 տեղ") },
    ],
  },
  {
    id: "dist-5",
    index: 5,
    region: loc("РФ", "Russia", "ՌԴ"),
    entries: [
      { label: loc("Армянский конгресс", "Armenian Congress", "Հայկական Կոնգրես"), seats: loc("10 мест", "10 seats", "10 տեղ") },
      { label: loc("РҲМ", "RHM", "ՌՀՄ"), seats: loc("10 мест", "10 seats", "10 տեղ") },
    ],
  },
  {
    id: "dist-6",
    index: 6,
    region: loc("Страны Ближнего Востока", "Middle Eastern countries", "Մերձավոր Արևելքի երկրներ"),
    entries: [
      { label: loc("армянские общины", "Armenian communities", "հայկական համայնքներ"), seats: loc("20 мест", "20 seats", "20 տեղ") },
    ],
  },
  {
    id: "dist-7",
    index: 7,
    region: loc("Страны Ближнего Востока", "Middle Eastern countries", "Մերձավոր Արևելքի երկրներ"),
    entries: [
      { label: loc("армянские структуры", "Armenian structures", "հայկական կառույցներ"), seats: loc("10 мест", "10 seats", "10 տեղ") },
    ],
  },
  {
    id: "dist-8",
    index: 8,
    region: loc("Страны Латинской Америки", "Latin American countries", "Լատ. Ամերիկայի երկրներ"),
    entries: [
      { label: loc("армянские общины", "Armenian communities", "հայկական համայնքներ"), seats: loc("30 мест", "30 seats", "30 տեղ") },
    ],
  },
  {
    id: "dist-9",
    index: 9,
    region: loc("Страны Латинской Америки", "Latin American countries", "Լատ. Ամերիկայի երկրներ"),
    entries: [
      { label: loc("армянские структуры", "Armenian structures", "հայկական կառույցներ"), seats: loc("10 мест", "10 seats", "10 տեղ") },
    ],
  },
  {
    id: "dist-10",
    index: 10,
    region: loc("Австралия, страны Южной и Восточной Азии", "Australia, South and East Asian countries", "Ավստրալիա, Հարավային և Արևելյան Ասիայի երկրներ"),
    entries: [
      { label: loc("армянские общины", "Armenian communities", "հայկական համայնքներ"), seats: loc("30 мест", "30 seats", "30 տեղ") },
    ],
  },
  {
    id: "dist-11",
    index: 11,
    region: loc("Европейские страны", "European countries", "Եվրոպական երկրներ"),
    entries: [
      { label: loc("армянские общины", "Armenian communities", "հայկական համայնքներ"), seats: loc("50 мест", "50 seats", "50 տեղ") },
      { label: loc("армянские структуры", "Armenian structures", "հայկական կառույցներ"), seats: loc("26 мест", "26 seats", "26 տեղ") },
      { label: loc("Ай Дат", "Hay Dat", "Հայ Դատ"), seats: loc("6 мест", "6 seats", "6 տեղ") },
    ],
  },
  {
    id: "dist-12",
    index: 12,
    region: loc("Среднеазиатские страны и Иран", "Central Asian countries and Iran", "Միջին Ասիական երկրներ և Իրան"),
    entries: [
      { label: loc("армянские общины", "Armenian communities", "հայկական համայնքներ"), seats: loc("35 мест", "35 seats", "35 տեղ") },
    ],
  },
  {
    id: "dist-13",
    index: 13,
    region: loc("Украина, Грузия, Молдова, Беларусь", "Ukraine, Georgia, Moldova, Belarus", "Ուկրաինա, Վրաստան, Մոլդովա, Բելոռուս"),
    entries: [
      { label: loc("армянские общины", "Armenian communities", "հայկական համայնքներ"), seats: loc("35 мест", "35 seats", "35 տեղ") },
    ],
  },
  {
    id: "dist-14",
    index: 14,
    region: loc("Армянская Апостольская Церковь", "Armenian Apostolic Church", "Հայ Առաքելական եկեղեցի"),
    entries: [
      { label: loc("Эчмиадзин", "Etchmiadzin", "Էջմիածին"), seats: loc("7 мест", "7 seats", "7 տեղ") },
      { label: loc("Антилиас", "Antelias", "Անթիլիաս"), seats: loc("7 мест", "7 seats", "7 տեղ") },
    ],
  },
  {
    id: "dist-15",
    index: 15,
    region: loc("Католические и Евангелические церкви", "Catholic and Evangelical churches", "Կաթողիկե և Ավետարանչական եկեղեցիներ"),
    entries: [
      { label: loc("Католические", "Catholic", "Կաթողիկե"), seats: loc("5 мест", "5 seats", "5 տեղ") },
      { label: loc("Евангелические", "Evangelical", "Ավետարանչական"), seats: loc("5 мест", "5 seats", "5 տեղ") },
    ],
  },
  {
    id: "dist-16",
    index: 16,
    region: loc("Союзы", "Unions", "Միություններ"),
    entries: [
      { label: loc("земляческие", "compatriot unions", "Հայրենակցական"), seats: loc("5 мест", "5 seats", "5 տեղ") },
      { label: loc("Ай Ариакан", "Hay Ariakan", "Հայ Արիական"), seats: loc("3 места", "3 seats", "3 տեղ") },
      { label: loc("Варданац", "Vardanats", "Վարդանաց"), seats: loc("2 места", "2 seats", "2 տեղ") },
      { label: loc("Тагадир", "Tagadir", "Թագադիր"), seats: loc("5 мест", "5 seats", "5 տեղ") },
      { label: loc("армянские беженцы из Азербайджана", "Armenian refugees from Azerbaijan", "Ադրբեջանի հայ փախստականներ"), seats: loc("5 мест", "5 seats", "5 տեղ") },
    ],
  },
];

export const mandateDistributionSections: MandateDistributionSection[] = [
  {
    id: "sevres-18",
    index: 1,
    title: loc("18 стран, ратифицировавших Севрский договор", "18 countries that ratified the Sevres Treaty", "Սևրի դաշնագիրը վավերացրած 18 երկրներ"),
    seatsTotal: 54,
    seatsOccupied: 0,
    candidates: 0,
    entries: [
      { label: loc("армянские общины", "Armenian communities", "հայկական համայնքներ"), seats: loc("54 мест", "54 seats", "54 տեղ"), seatsValue: 54 },
      { label: loc("армянские структуры", "Armenian structures", "հայկական կառույցներ"), seats: loc("—", "—", "—"), seatsValue: 0 },
    ],
  },
  {
    id: "usa-canada",
    index: 2,
    title: loc("США, Канада", "USA, Canada", "ԱՄՆ, Կանադա"),
    seatsTotal: 96,
    seatsOccupied: 0,
    candidates: 0,
    entries: [
      { label: loc("армянские общины", "Armenian communities", "հայկական համայնքներ"), seats: loc("40 мест", "40 seats", "40 տեղ"), seatsValue: 40 },
      { label: loc("иные армянские структуры", "other Armenian structures", "հայկական այլ կառույցներ"), seats: loc("15 мест", "15 seats", "15 տեղ"), seatsValue: 15 },
      { label: loc("Армянский конгресс", "Armenian Congress", "Հայկական Համագումար"), seats: loc("18 мест", "18 seats", "18 տեղ"), seatsValue: 18 },
      { label: loc("Ай Дат", "Hay Dat", "Հայ Դատ"), seats: loc("6 мест", "6 seats", "6 տեղ"), seatsValue: 6 },
      { label: loc("Благотворительные структуры", "Charitable organizations", "Բարեգործական"), seats: loc("5 мест", "5 seats", "5 տեղ"), seatsValue: 5 },
      { label: loc("традиционные партии", "traditional parties", "Ավանդական կուսակցություններ"), seats: loc("12 мест", "12 seats", "12 տեղ"), seatsValue: 12 },
    ],
  },
  {
    id: "russia",
    index: 3,
    title: loc("РФ", "Russia", "ՌԴ"),
    seatsTotal: 55,
    seatsOccupied: 0,
    candidates: 0,
    entries: [
      { label: loc("армянские общины", "Armenian communities", "հայկական համայնքներ"), seats: loc("35 мест", "35 seats", "35 տեղ"), seatsValue: 35 },
      { label: loc("Армянский конгресс", "Armenian Congress", "Հայկական Կոնգրես"), seats: loc("10 мест", "10 seats", "10 տեղ"), seatsValue: 10 },
      { label: loc("РҲМ", "RHM", "ՌՀՄ"), seats: loc("10 мест", "10 seats", "10 տեղ"), seatsValue: 10 },
    ],
  },
  {
    id: "middle-east",
    index: 4,
    title: loc("Страны Ближнего Востока", "Middle Eastern countries", "Մերձավոր Արևելքի երկրներ"),
    seatsTotal: 30,
    seatsOccupied: 0,
    candidates: 0,
    entries: [
      { label: loc("армянские общины", "Armenian communities", "հայկական համայնքներ"), seats: loc("20 мест", "20 seats", "20 տեղ"), seatsValue: 20 },
      { label: loc("армянские структуры", "Armenian structures", "հայկական կառույցներ"), seats: loc("10 мест", "10 seats", "10 տեղ"), seatsValue: 10 },
    ],
  },
  {
    id: "latin-america",
    index: 5,
    title: loc("Страны Латинской Америки", "Latin American countries", "Լատ. Ամերիկայի երկրներ"),
    seatsTotal: 40,
    seatsOccupied: 0,
    candidates: 0,
    entries: [
      { label: loc("армянские общины", "Armenian communities", "հայկական համայնքներ"), seats: loc("30 мест", "30 seats", "30 տեղ"), seatsValue: 30 },
      { label: loc("армянские структуры", "Armenian structures", "հայկական կառույցներ"), seats: loc("10 мест", "10 seats", "10 տեղ"), seatsValue: 10 },
    ],
  },
  {
    id: "australia-asia",
    index: 6,
    title: loc("Австралия, страны Южной и Восточной Азии", "Australia, South and East Asian countries", "Ավստրալիա, Հարավային և Արևելյան Ասիայի երկրներ"),
    seatsTotal: 30,
    seatsOccupied: 0,
    candidates: 0,
    entries: [
      { label: loc("армянские общины", "Armenian communities", "հայկական համայնքներ"), seats: loc("30 мест", "30 seats", "30 տեղ"), seatsValue: 30 },
    ],
  },
  {
    id: "europe",
    index: 7,
    title: loc("Европейские страны", "European countries", "Եվրոպական երկրներ"),
    seatsTotal: 82,
    seatsOccupied: 0,
    candidates: 0,
    entries: [
      { label: loc("армянские общины", "Armenian communities", "հայկական համայնքներ"), seats: loc("50 мест", "50 seats", "50 տեղ"), seatsValue: 50 },
      { label: loc("армянские структуры", "Armenian structures", "հայկական կառույցներ"), seats: loc("26 мест", "26 seats", "26 տեղ"), seatsValue: 26 },
      { label: loc("Ай Дат", "Hay Dat", "Հայ Դատ"), seats: loc("6 мест", "6 seats", "6 տեղ"), seatsValue: 6 },
    ],
  },
  {
    id: "central-asia-iran",
    index: 8,
    title: loc("Среднеазиатские страны и Иран", "Central Asian countries and Iran", "Միջին Ասիական երկրներ և Իրան"),
    seatsTotal: 35,
    seatsOccupied: 0,
    candidates: 0,
    entries: [
      { label: loc("армянские общины", "Armenian communities", "հայկական համայնքներ"), seats: loc("35 мест", "35 seats", "35 տեղ"), seatsValue: 35 },
    ],
  },
  {
    id: "ukraine-georgia-moldova-belarus",
    index: 9,
    title: loc("Украина, Грузия, Молдова, Беларусь", "Ukraine, Georgia, Moldova, Belarus", "Ուկրաինա, Վրաստան, Մոլդովա, Բելոռուս"),
    seatsTotal: 35,
    seatsOccupied: 0,
    candidates: 0,
    entries: [
      { label: loc("армянские общины", "Armenian communities", "հայկական համայնքներ"), seats: loc("35 мест", "35 seats", "35 տեղ"), seatsValue: 35 },
    ],
  },
  {
    id: "apostolic-church",
    index: 10,
    title: loc("Армянская Апостольская Церковь", "Armenian Apostolic Church", "Հայ Առաքելական եկեղեցի"),
    seatsTotal: 14,
    seatsOccupied: 0,
    candidates: 0,
    entries: [
      { label: loc("Эчмиадзин", "Etchmiadzin", "Էջմիածին"), seats: loc("7 мест", "7 seats", "7 տեղ"), seatsValue: 7 },
      { label: loc("Антилиас", "Antelias", "Անթիլիաս"), seats: loc("7 мест", "7 seats", "7 տեղ"), seatsValue: 7 },
    ],
  },
  {
    id: "catholic-evangelical",
    index: 11,
    title: loc("Католические и Евангелические церкви", "Catholic and Evangelical churches", "Կաթողիկե և Ավետարանչական եկեղեցիներ"),
    seatsTotal: 10,
    seatsOccupied: 0,
    candidates: 0,
    entries: [
      { label: loc("Католические", "Catholic", "Կաթողիկե"), seats: loc("5 мест", "5 seats", "5 տեղ"), seatsValue: 5 },
      { label: loc("Евангелические", "Evangelical", "Ավետարանչական"), seats: loc("5 мест", "5 seats", "5 տեղ"), seatsValue: 5 },
    ],
  },
  {
    id: "unions",
    index: 12,
    title: loc("Союзы", "Unions", "Միություններ"),
    seatsTotal: 20,
    seatsOccupied: 0,
    candidates: 0,
    entries: [
      { label: loc("земляческие", "compatriot unions", "Հայրենակցական"), seats: loc("5 мест", "5 seats", "5 տեղ"), seatsValue: 5 },
      { label: loc("Ай Ариакан", "Hay Ariakan", "Հայ Արիական"), seats: loc("3 места", "3 seats", "3 տեղ"), seatsValue: 3 },
      { label: loc("Варданац", "Vardanats", "Վարդանաց"), seats: loc("2 места", "2 seats", "2 տեղ"), seatsValue: 2 },
      { label: loc("Тагадир", "Tagadir", "Թագադիր"), seats: loc("5 мест", "5 seats", "5 տեղ"), seatsValue: 5 },
      { label: loc("армянские беженцы из Азербайджана", "Armenian refugees from Azerbaijan", "Ադրբեջանի հայ փախստականներ"), seats: loc("5 мест", "5 seats", "5 տեղ"), seatsValue: 5 },
    ],
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
    language: "HY",
    description: loc(
      "Документ описывает цель, структуру, функции, распределение мандатов и порядок формирования Сената.",
    ),
    fileUrl: "/documents/concept.txt",
  },
  {
    id: "manifest",
    title: loc("Манифест"),
    category: loc("Программный документ"),
    language: "HY",
    description: loc(
      "Документ с основными рабочими направлениями и принципами Сената.",
    ),
    fileUrl: "/documents/manifesto.txt",
  },
];

export const regionSenators: PersonCard[] = [];
export const regionCandidates: PersonCard[] = [];
export const institutionMandateHolders: PersonCard[] = [];
export const institutionCandidates: PersonCard[] = [];

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

export function findInstitutionById(id: string) {
  return institutionBlocks.find((item) => item.id === id);
}

export function findDistributionSectionById(id: string) {
  return mandateDistributionSections.find((item) => item.id === id);
}
