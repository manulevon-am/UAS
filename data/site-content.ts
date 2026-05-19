import type { Locale } from "@/lib/i18n";
import { getCanonicalUrl } from "@/lib/site";

type LocalizedText = Record<Locale, string>;

type RouteContent = {
  title: string;
  description: string;
};

export type StaticRoute = "home" | "structure" | "documents" | "news" | "join";

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
  distributionSectionId?: string;
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
    documents: "Документы",
    news: "Новости",
    join: "Присоединиться",
    cta: "Присоединиться",
  },
  en: {
    home: "Home",
    structure: "Structure",
    documents: "Documents",
    news: "News",
    join: "Join",
    cta: "Join",
  },
  hy: {
    home: "Գլխավոր",
    structure: "Կառուցվածք",
    documents: "Փաստաթղթեր",
    news: "Նորություններ",
    join: "Միանալ",
    cta: "Միանալ",
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
      title: loc(
        "Координация и развитие глобального армянского взаимодействия",
        "Coordination and Development of Global Armenian Interaction",
        "Համաշխարհային հայկական փոխգործակցության համակարգում և զարգացում",
      ),
      description: loc(
        "Развитие взаимодействия и сотрудничества между армянскими общинами, организациями и представителями по всему миру.",
        "Development of interaction and cooperation among Armenian communities, organizations, and representatives around the world.",
        "Ամբողջ աշխարհում հայկական համայնքների, կազմակերպությունների և ներկայացուցիչների միջև փոխգործակցության և համագործակցության զարգացում։",
      ),
    },
    {
      title: loc(
        "Международное и правовое представительство",
        "International and Legal Representation",
        "Միջազգային և իրավական ներկայացուցչություն",
      ),
      description: loc(
        "Представление интересов армянства и армянских общин в международной общественной и правовой повестке.",
        "Representation of Armenian interests and Armenian communities within the international public and legal agenda.",
        "Հայության և հայկական համայնքների շահերի ներկայացում միջազգային հանրային և իրավական օրակարգում։",
      ),
    },
    {
      title: loc(
        "Консолидация армянского потенциала",
        "Consolidation of Armenian Potential",
        "Հայկական ներուժի համախմբում",
      ),
      description: loc(
        "Объединение интеллектуальных, общественных и организационных ресурсов армянского мира для долгосрочного развития и взаимодействия.",
        "Bringing together the intellectual, civic, and organizational resources of the Armenian world for long-term development and cooperation.",
        "Հայկական աշխարհի մտավոր, հանրային և կազմակերպական ռեսուրսների համախմբում՝ երկարաժամկետ զարգացման և համագործակցության համար։",
      ),
    },
    {
      title: loc(
        "Формирование общеармянского представительного органа",
        "Formation of a Pan-Armenian Representative Body",
        "Համահայկական ներկայացուցչական մարմնի ձևավորում",
      ),
      description: loc(
        "Содействие развитию всеармянского участия и представлению интересов армянства в общеармянских вопросах.",
        "Supporting the development of pan-Armenian participation and the representation of Armenian interests in common Armenian issues.",
        "Աջակցություն համահայկական մասնակցության զարգացմանը և հայության շահերի ներկայացմանը համահայկական հարցերում։",
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
    seatsOccupied: 1,
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
    seatsOccupied: 15,
    candidates: 0,
    description: loc("РФ и страны СНГ"),
    marker: { x: 64, y: 24 },
  },
  {
    id: "usa-canada",
    title: loc("США и Канада"),
    seatsTotal: 100,
    seatsOccupied: 1,
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
    seatsOccupied: 1,
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
    seatsOccupied: 15,
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
    seatsOccupied: 6,
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
  {
    id: "ashot-sarkisyan",
    name: "Աշոտ Սարկիսյան",
    regionId: "armenia",
    country: "Հայաստան",
    city: "Երևան",
    status: "mandate_holder",
    role: "Сенатор",
    photo:
      "https://static.wixstatic.com/media/a79dba_ef155fbafdea4e74ad46c46bcfadcba4~mv2.jpg/v1/fill/w_291,h_375,al_c,q_80,usm_0.66_1.00_0.01,enc_avif,quality_auto/104352702_196084758331613_8875113999358829574_n_edited.jpg",
    bio: "Опубликован в списке сенаторов блока Армения.",
  },
  {
    id: "inesa-asryan",
    name: "Ինեսա Ասրյան",
    regionId: "usa-canada",
    distributionSectionId: "usa-canada",
    country: "ԱՄՆ / Լատինական Ամերիկա",
    city: "—",
    status: "mandate_holder",
    role: "Сенатор",
    photo:
      "https://static.wixstatic.com/media/a79dba_8c866f73d6324321b469e4da1e8b87ad~mv2.jpg/v1/fill/w_178,h_219,al_c,lg_1,q_80,enc_avif,quality_auto/373429398_264003073188625_247395331986758058_n_edited.jpg",
    bio: "Опубликована в списке сенаторов блока США / Латинская Америка.",
  },
  {
    id: "arsen-abrahamyan",
    name: "Արսեն Աբրահամյան",
    regionId: "russia-cis",
    distributionSectionId: "russia",
    country: "ՌԴ և ԱՊՀ",
    city: "—",
    status: "mandate_holder",
    role: "Сенатор",
    photo:
      "https://static.wixstatic.com/media/a79dba_4e03bd8306364985aa68cf17308fa53f~mv2.jpg/v1/fill/w_201,h_250,al_c,lg_1,q_80,enc_avif,quality_auto/292722245_508336167726892_21963698861800.jpg",
    bio: "Опубликован в списке сенаторов блока РФ и стран СНГ.",
  },
  {
    id: "artur-poghosyan",
    name: "Արթուր Պողոսյան",
    regionId: "russia-cis",
    distributionSectionId: "russia",
    country: "ՌԴ և ԱՊՀ",
    city: "—",
    status: "mandate_holder",
    role: "Сенатор",
    photo:
      "https://static.wixstatic.com/media/a79dba_b35a48423d6141ef8cc9567cc48beb51~mv2.jpg/v1/fill/w_201,h_257,al_c,q_80,usm_0.66_1.00_0.01,enc_avif,quality_auto/354488407_728875852323649_8250111534948152157_n_edited.jpg",
    bio: "Опубликован в списке сенаторов блока РФ и стран СНГ.",
  },
  {
    id: "lusine-hovakimyan",
    name: "Լուսինե Հովակիմյան",
    regionId: "russia-cis",
    distributionSectionId: "russia",
    country: "ՌԴ և ԱՊՀ",
    city: "—",
    status: "mandate_holder",
    role: "Сенатор",
    photo:
      "https://static.wixstatic.com/media/a79dba_ff9498bd1da74fbfa20ccbfaf45c7e3c~mv2.jpg/v1/fill/w_201,h_272,al_c,q_80,usm_0.66_1.00_0.01,enc_avif,quality_auto/59a28c7e-b632-4efe-b6a9-31ffedccc90a_edited_edited_edited.jpg",
    bio: "Опубликована в списке сенаторов блока РФ и стран СНГ.",
  },
  {
    id: "oganes-katikyan",
    name: "Օգանես Կատիկյան",
    regionId: "russia-cis",
    distributionSectionId: "russia",
    country: "ՌԴ և ԱՊՀ",
    city: "—",
    status: "mandate_holder",
    role: "Сенатор",
    photo:
      "https://static.wixstatic.com/media/a79dba_70de2bef63f4464d9fad7ed8013d2d4a~mv2.jpg/v1/fill/w_208,h_291,al_c,lg_1,q_80,enc_avif,quality_auto/IMG-20230616-WA0000_edited.jpg",
    bio: "Опубликован в списке сенаторов блока РФ и стран СНГ.",
  },
  {
    id: "vladimir-pashayan",
    name: "Վլադիմիր Փաշայան",
    regionId: "russia-cis",
    distributionSectionId: "russia",
    country: "ՌԴ և ԱՊՀ",
    city: "—",
    status: "mandate_holder",
    role: "Сенатор",
    photo:
      "https://static.wixstatic.com/media/a79dba_9b882ce10e27442e9b0c0408acfa100e~mv2.jpg/v1/fill/w_201,h_272,al_c,q_80,enc_avif,quality_auto/346103676_591424642786332_4162683423528836001_n_edited.jpg",
    bio: "Опубликован в списке сенаторов блока РФ и стран СНГ.",
  },
  {
    id: "luiza-iosifova",
    name: "Լուիզա Իոսիֆովա",
    regionId: "russia-cis",
    distributionSectionId: "russia",
    country: "ՌԴ և ԱՊՀ",
    city: "—",
    status: "mandate_holder",
    role: "Сенатор",
    photo:
      "https://static.wixstatic.com/media/a79dba_c9fcac5912c8407ab04352d532949ce9~mv2.jpg/v1/fill/w_208,h_257,al_c,q_80,usm_0.66_1.00_0.01,enc_avif,quality_auto/294821148_446948520627604_1989368671484391514_n_edited.jpg",
    bio: "Опубликована в списке сенаторов блока РФ и стран СНГ.",
  },
  {
    id: "armen-avagyan",
    name: "Արմեն Ավագյան",
    regionId: "russia-cis",
    distributionSectionId: "russia",
    country: "ՌԴ և ԱՊՀ",
    city: "—",
    status: "mandate_holder",
    role: "Сенатор",
    photo:
      "https://static.wixstatic.com/media/a79dba_217b4bd92be0492d94d0d1f8af925f15~mv2.jpg/v1/fill/w_201,h_250,al_c,q_80,usm_0.66_1.00_0.01,enc_avif,quality_auto/5771963a-8446-42c8-9d4b-195ba28a7beb_edited.jpg",
    bio: "Опубликован в списке сенаторов блока РФ и стран СНГ.",
  },
  {
    id: "davit-abrahamyan",
    name: "Դավիթ Աբրահամյան",
    regionId: "russia-cis",
    distributionSectionId: "russia",
    country: "ՌԴ և ԱՊՀ",
    city: "—",
    status: "mandate_holder",
    role: "Сенатор",
    photo:
      "https://static.wixstatic.com/media/a79dba_f4495907a03347d2878cc8a06c377d0c~mv2.jpg/v1/fill/w_208,h_250,al_c,q_80,usm_0.66_1.00_0.01,enc_avif,quality_auto/387518171_6712357708887454_7198709620081735399_n_edited_edited.jpg",
    bio: "Опубликован в списке сенаторов блока РФ и стран СНГ.",
  },
  {
    id: "sahak-avagyan",
    name: "Սահակ Ավագյան",
    regionId: "russia-cis",
    distributionSectionId: "russia",
    country: "ՌԴ և ԱՊՀ",
    city: "—",
    status: "mandate_holder",
    role: "Сенатор",
    photo:
      "https://static.wixstatic.com/media/a79dba_32de490f99634cbdbacb4b3722a43def~mv2.jpg/v1/fill/w_233,h_272,al_c,q_80,usm_0.66_1.00_0.01,enc_avif,quality_auto/292534834_592863545563658_8881670996754971955_n_edited.jpg",
    bio: "Опубликован в списке сенаторов блока РФ и стран СНГ.",
  },
  {
    id: "robert-abrahamyan-russia",
    name: "Ռոբերտ Աբրահամյան",
    regionId: "russia-cis",
    distributionSectionId: "russia",
    country: "ՌԴ և ԱՊՀ",
    city: "—",
    status: "mandate_holder",
    role: "Сенатор",
    photo:
      "https://static.wixstatic.com/media/a79dba_d3295916c3094983b31b119eaed07fae~mv2.jpg/v1/fill/w_223,h_266,al_c,lg_1,q_80,enc_avif,quality_auto/373416727_1013799816711012_4773968636419086474_n_edited.jpg",
    bio: "Опубликован в списке сенаторов блока РФ и стран СНГ.",
  },
  {
    id: "garik-ghazaryan",
    name: "Գարիկ Ղազարյան",
    regionId: "russia-cis",
    distributionSectionId: "russia",
    country: "ՌԴ և ԱՊՀ",
    city: "—",
    status: "mandate_holder",
    role: "Сенатор",
    photo:
      "https://static.wixstatic.com/media/a79dba_8786161b0a7a4bf6bafa71505ca95f9e~mv2.jpg/v1/crop/x_3,y_40,w_266,h_344/fill/w_208,h_269,al_c,q_80,usm_0.66_1.00_0.01,enc_avif,quality_auto/344715399_942911610248699_40845791885057.jpg",
    bio: "Опубликован в списке сенаторов блока РФ и стран СНГ.",
  },
  {
    id: "hamlet-tatoyan",
    name: "Համլետ Թաթոյան",
    regionId: "russia-cis",
    distributionSectionId: "russia",
    country: "ՌԴ և ԱՊՀ",
    city: "—",
    status: "mandate_holder",
    role: "Сенатор",
    photo:
      "https://static.wixstatic.com/media/a79dba_f60f2fe934034512ac9f4cb238335bec~mv2.jpg/v1/fill/w_193,h_226,al_c,lg_1,q_80,enc_avif,quality_auto/372314546_686875743319574_63640034478766.jpg",
    bio: "Опубликован в списке сенаторов блока РФ и стран СНГ.",
  },
  {
    id: "smbat-hakobyan",
    name: "Սմբատ Հակոբյան",
    regionId: "russia-cis",
    distributionSectionId: "russia",
    country: "ՌԴ և ԱՊՀ",
    city: "—",
    status: "mandate_holder",
    role: "Сенатор",
    photo:
      "https://static.wixstatic.com/media/a79dba_0bf1c532f5504a0b9e8d5d54d340f082~mv2.jpg/v1/fill/w_215,h_279,al_c,q_80,usm_0.66_1.00_0.01,enc_avif,quality_auto/014-1_edited.jpg",
    bio: "Опубликован в списке сенаторов блока РФ и стран СНГ.",
  },
  {
    id: "artur-ayvazyan",
    name: "Արթուր Այվազյան",
    regionId: "russia-cis",
    distributionSectionId: "russia",
    country: "ՌԴ և ԱՊՀ",
    city: "—",
    status: "mandate_holder",
    role: "Сенатор",
    photo:
      "https://static.wixstatic.com/media/a79dba_60abc6f03008456a81958436eebefeed~mv2.jpg/v1/crop/x_4,y_20,w_185,h_226/fill/w_233,h_284,al_c,lg_1,q_80,enc_avif,quality_auto/372908819_1325229595056099_1994672331029574826_n_edited.jpg",
    bio: "Опубликован в списке сенаторов блока РФ и стран СНГ.",
  },
  {
    id: "ghukas-manukyan-russia",
    name: "Ղուկաս Մանուկյան",
    regionId: "russia-cis",
    distributionSectionId: "russia",
    country: "ՌԴ և ԱՊՀ",
    city: "—",
    status: "mandate_holder",
    role: "Сенатор",
    photo:
      "https://static.wixstatic.com/media/a79dba_b0b919ac1f294f6fb66b206def4c47df~mv2.jpg/v1/fill/w_208,h_257,al_c,q_80,usm_0.66_1.00_0.01,enc_avif,quality_auto/355854081_1192897042105237_5971321152800836845_n_edited.jpg",
    bio: "Опубликован в списке сенаторов блока РФ и стран СНГ.",
  },
  {
    id: "avetis-sadoyan",
    name: "Պրոֆ․ Ավետիս Սադոյան",
    distributionSectionId: "europe",
    country: "Եվրոպա",
    city: "—",
    status: "mandate_holder",
    role: "Сенатор",
    photo:
      "https://static.wixstatic.com/media/a79dba_fe7088e9823246f7b1e790f490801bc2~mv2.jpg/v1/fill/w_292,h_292,al_c,q_80,usm_0.66_1.00_0.01,enc_avif,quality_auto/460961613_10234978697991892_8185912569949107483_n.jpg",
    bio: "Опубликован в списке сенаторов блока Европа.",
  },
  {
    id: "tigran-mikaelyan",
    name: "Տիգրան Միքաելյան",
    distributionSectionId: "europe",
    country: "Եվրոպա",
    city: "—",
    status: "mandate_holder",
    role: "Сенатор",
    photo:
      "https://static.wixstatic.com/media/a79dba_14837408cbca4a80aad6a3724255e072~mv2.jpg/v1/fill/w_194,h_292,al_c,q_80,usm_0.66_1.00_0.01,enc_avif,quality_auto/460646920_10230333783361378_283805555592.jpg",
    bio: "Опубликован в списке сенаторов блока Европа.",
  },
  {
    id: "gevorg-grigoryan",
    name: "Գևորգ Գրիգորյան",
    distributionSectionId: "europe",
    country: "Եվրոպա",
    city: "—",
    status: "mandate_holder",
    role: "Сенатор",
    photo:
      "https://static.wixstatic.com/media/a79dba_337af5131f904b31a78505ff6e08edb3~mv2.jpg/v1/fill/w_253,h_300,al_c,q_80,usm_0.66_1.00_0.01,enc_avif,quality_auto/487002929_29523624217224689_2644955363019547876_n_edited.jpg",
    bio: "Опубликован в списке сенаторов блока Европа.",
  },
  {
    id: "robert-abrahamyan-europe",
    name: "Ռոբերտ Աբրահամյան",
    distributionSectionId: "europe",
    country: "Եվրոպա",
    city: "—",
    status: "mandate_holder",
    role: "Сенатор",
    photo:
      "https://static.wixstatic.com/media/a79dba_d3741a2a7a7941c5a940a97a0205f76d~mv2.jpg/v1/fill/w_287,h_329,al_c,lg_1,q_80,enc_avif,quality_auto/373416727_1013799816711012_4773968636419086474_n_edited.jpg",
    bio: "Опубликован в списке сенаторов блока Европа.",
  },
  {
    id: "ghukas-manukyan-europe",
    name: "Ղուկաս Մանուկյան",
    distributionSectionId: "europe",
    country: "Եվրոպա",
    city: "—",
    status: "mandate_holder",
    role: "Сенатор",
    photo:
      "https://static.wixstatic.com/media/a79dba_5358638a6a0549d496affd0a1eabd634~mv2.jpg/v1/fill/w_277,h_329,al_c,lg_1,q_80,enc_avif,quality_auto/355854081_1192897042105237_5971321152800836845_n_edited.jpg",
    bio: "Опубликован в списке сенаторов блока Европа.",
  },
  {
    id: "artak-ghukasyan",
    name: "Արտակ Ղուկասյան",
    distributionSectionId: "europe",
    country: "Եվրոպա",
    city: "—",
    status: "mandate_holder",
    role: "Сенатор",
    photo:
      "https://static.wixstatic.com/media/a79dba_07265d55fa154612adb0219b9dcee2dc~mv2.jpg/v1/fill/w_234,h_329,al_c,lg_1,q_80,enc_avif,quality_auto/352409233_965868651533190_8739659972698191359_n_edited.jpg",
    bio: "Опубликован в списке сенаторов блока Европа.",
  },
];
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
