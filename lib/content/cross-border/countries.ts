import type { Bilingual } from "@/lib/i18n/config";
import type { SiteImageKey } from "@/lib/site-images";
import type { RouteKey } from "@/lib/i18n/routes";
import type { ClusterFaq, RelatedLink } from "@/lib/content/riyadh/types";

/**
 * The five country pages under the cross-border hub.
 *
 * ## Why these are not one template with the name swapped
 *
 * Because the geography genuinely differs, and the geography is the page.
 * Saudi Arabia has exactly one road crossing with the UAE and one with Qatar;
 * it has two with Kuwait; its link to Bahrain is a 25 km causeway; and its
 * link to Oman is a 725 km desert road that did not exist before December
 * 2021. Those facts decide what a customer needs to be told, so each page is
 * built around its own:
 *
 * - **UAE** — one gate, and the cities arrive in order along one road.
 * - **Bahrain** — the short crossing; the whole journey is the approach.
 * - **Qatar** — one gate, a long way from everywhere; the question is how far
 *   *you* are from Salwa.
 * - **Kuwait** — two gates, and which one you use follows where you start.
 * - **Oman** — the newest and longest road, with a genuine second option.
 * - **Jordan** — three gates that surface at opposite ends of the country,
 *   and the only destination here reached from the north-west rather than
 *   the Gulf, which inverts the cluster's usual "Eastern Province is
 *   nearest" logic.
 *
 * ## Sourcing
 *
 * The crossing names and counts were verified against official and news
 * sources in November 2026 rather than written from memory:
 *
 * - Al Batha ↔ Ghuwaifat is the only Saudi–UAE land crossing (Saudipedia;
 *   Abu Dhabi Police).
 * - Salwa ↔ Abu Samra is the only Saudi–Qatar land crossing (Saudipedia;
 *   Gulf Times).
 * - Khafji ↔ Nuwaiseeb and Ar-Ruqi ↔ Salmi are the two Saudi–Kuwait
 *   crossings (Saudipedia; Wikipedia).
 * - The Empty Quarter road (Ramlat Khaliya ↔ Oman's Empty Quarter post,
 *   toward Ibri) opened 8 December 2021 (Oman Observer; The National).
 * - Saudi Arabia has three land ports with Jordan along roughly 745 km of
 *   border: Al-Haditha ↔ Al-Omari, Halat Ammar ↔ Al-Mudawwara and Ad-Durrah
 *   ↔ Durra by Aqaba (Saudipedia's entries for all three; Jordan Times and
 *   Arab News on the Durra closures and reopening).
 *
 * What is deliberately *not* published: opening hours, waiting times,
 * procedures, fees, visa rules and anything about who may cross. Those move,
 * they differ by nationality and vehicle, and they are not ours to state.
 * Every page sends the reader to the official authorities for them.
 */

export type Crossing = {
  saudiSide: Bilingual<string>;
  otherSide: Bilingual<string>;
  detail: Bilingual<string>;
};

export type DestinationCity = {
  name: Bilingual<string>;
  note: Bilingual<string>;
};

export type ChecklistItem = {
  label: Bilingual<string>;
  body: Bilingual<string>;
};

export type CountryPage = {
  routeKey: RouteKey;
  imageKey: SiteImageKey;
  seo: { title: Bilingual<string>; description: Bilingual<string> };
  crumbLabel: Bilingual<string>;
  eyebrow: Bilingual<string>;
  title: Bilingual<string>;
  standfirst: Bilingual<string>;
  primaryCta: Bilingual<string>;
  /** Seeds the quote form's `dropoff`. */
  dropoffSeed: Bilingual<string>;
  intro: { heading: Bilingual<string>; body: Bilingual<string>[] };
  crossings: {
    heading: Bilingual<string>;
    lead: Bilingual<string>;
    items: Crossing[];
    note: Bilingual<string>;
  };
  cities: {
    heading: Bilingual<string>;
    lead: Bilingual<string>;
    items: DestinationCity[];
  };
  departures: { heading: Bilingual<string>; body: Bilingual<string> };
  /**
   * What actually decides the vehicle on *this* route. Country-specific on
   * purpose: a 25 km causeway and a 725 km desert corridor ask different
   * things of a car, and writing one paragraph for all five would have been
   * both less useful and the largest block of duplicate text in the cluster.
   */
  vehicles: { lead: Bilingual<string>; note: Bilingual<string> };
  checklist: {
    heading: Bilingual<string>;
    lead: Bilingual<string>;
    items: ChecklistItem[];
  };
  faqs: ClusterFaq[];
  cta: {
    eyebrow: Bilingual<string>;
    heading: Bilingual<string>;
    body: Bilingual<string>;
    button: Bilingual<string>;
  };
  whatsappMessage: Bilingual<string>;
  related: RelatedLink[];
};

/** Shared by all five: the arrangement at the border is route-specific. */
export const arrangementNote: Bilingual<string> = {
  en: "Whether the car you set off in is the car that arrives depends on the route and on what is arranged for it. Some journeys run the whole way on one vehicle; others change hands after the border. Which applies to yours is written into the quotation before you accept it, not left to be discovered on the day.",
  ar: "أما كون السيارة التي تنطلق بها هي التي تصل، فيعتمد على المسار وعلى ما رُتّب له. فبعض الرحلات تمضي كاملةً بمركبة واحدة؛ وأخرى تنتقل إلى يد أخرى بعد الحدود. وما ينطبق على رحلتك يُكتب في عرض السعر قبل قبولك له، لا يُترك لتكتشفه يوم السفر.",
};

/** Shared by all five: entry is not ours to promise. */
export const documentsNote: Bilingual<string> = {
  en: "Entry rules depend on your nationality, your documents and the regulations in force on the day, and they differ between passengers in the same car. Check them with the official immigration and border authorities for both countries. Booking a vehicle is not permission to cross, and we do not advise on entry requirements.",
  ar: "تعتمد أنظمة الدخول على جنسيتك ووثائقك والأنظمة السارية في حينه، وتختلف بين ركاب في السيارة نفسها. فتحقّق منها لدى جهات الجوازات والحدود الرسمية في البلدين. وحجز المركبة ليس إذنًا بالعبور، ونحن لا نفتي في شروط الدخول.",
};

/* ========================================================================== */
/*  UNITED ARAB EMIRATES                                                      */
/* ========================================================================== */

export const uae: CountryPage = {
  routeKey: "saudiToUae",
  imageKey: "svc-intercity",
  seo: {
    title: {
      en: "Saudi Arabia to UAE Private Transfer | Car and Driver",
      ar: "نقل خاص من السعودية إلى الإمارات | سيارة وسائق",
    },
    description: {
      en: "Private car and driver from anywhere in Saudi Arabia to Dubai, Abu Dhabi and other UAE cities, by the Al Batha crossing. Written quotation before anything is confirmed.",
      ar: "سيارة خاصة وسائق من أي مكان في السعودية إلى دبي وأبوظبي ومدن الإمارات، عبر منفذ البطحاء. عرض سعر مكتوب قبل أي تأكيد.",
    },
  },
  crumbLabel: { en: "Saudi Arabia to the UAE", ar: "من السعودية إلى الإمارات" },
  eyebrow: { en: "Saudi Arabia → United Arab Emirates", ar: "السعودية ← الإمارات" },
  title: {
    en: "Private transfers from Saudi Arabia to the UAE",
    ar: "نقل خاص من السعودية إلى الإمارات",
  },
  standfirst: {
    en: "There is one road into the Emirates, and everything else about the journey follows from that. Al Batha is the only land crossing the two countries share — so whether you are going to Abu Dhabi, Dubai, Sharjah or Al Ain, you are on the same highway until you are through it.",
    ar: "هناك طريق واحد إلى الإمارات، وكل ما عدا ذلك في الرحلة يتبع هذه الحقيقة. فالبطحاء هو المعبر البري الوحيد بين البلدين — وسواء قصدت أبوظبي أو دبي أو الشارقة أو العين، فأنت على الطريق نفسه حتى تجتازه.",
  },
  primaryCta: { en: "Request a UAE transfer quote", ar: "اطلب عرض سعر إلى الإمارات" },
  dropoffSeed: { en: "Dubai, UAE", ar: "دبي، الإمارات" },
  intro: {
    heading: {
      en: "One crossing, and then the cities arrive in order",
      ar: "معبر واحد، ثم تتوالى المدن بالترتيب",
    },
    body: [
      {
        en: "This is the busiest cross-border request we get, and the most straightforward to explain. Saudi Arabia and the UAE share exactly one land crossing, at Al Batha on the Saudi side and Ghuwaifat on the Emirati side. Every private car making this journey by road goes through it.",
        ar: "هذا أكثر طلبات العبور ورودًا إلينا، وأيسرها شرحًا. فالسعودية والإمارات بينهما معبر بري واحد فقط، هو البطحاء من الجانب السعودي والغويفات من الجانب الإماراتي. وكل سيارة خاصة تقطع هذه الرحلة برًّا تمرّ منه.",
      },
      {
        en: "What that means in practice is useful: the Emirates are reached in a sequence. Abu Dhabi comes first after the border, then Dubai, then the northern Emirates. Al Ain sits inland on its own road. So telling us the city, not just the country, changes the shape of the journey — and it is the difference between a quotation you can use and one full of assumptions.",
        ar: "وهذا مفيد عمليًا: فالإمارات تُبلغ بالتتابع. أبوظبي أولًا بعد الحدود، ثم دبي، ثم الإمارات الشمالية. أما العين فتقع في الداخل على طريقها الخاص. لذا فإن ذكر المدينة لا البلد وحده يغيّر شكل الرحلة — وهو الفرق بين عرض سعر تستفيد منه وآخر مليء بالافتراضات.",
      },
    ],
  },
  crossings: {
    heading: { en: "The crossing", ar: "المعبر" },
    lead: {
      en: "One gate, used by everyone travelling this way by road.",
      ar: "بوابة واحدة، يسلكها كل مسافر برًّا في هذا الاتجاه.",
    },
    items: [
      {
        saudiSide: { en: "Al Batha", ar: "البطحاء" },
        otherSide: { en: "Ghuwaifat", ar: "الغويفات" },
        detail: {
          en: "On Saudi Arabia's eastern border, reached from the Eastern Province or on the long run from Riyadh. Ghuwaifat sits in the far west of Abu Dhabi emirate, and the road from it runs east along the coast towards the cities.",
          ar: "على الحدود الشرقية للسعودية، ويُبلغ من المنطقة الشرقية أو عبر الطريق الطويل من الرياض. وتقع الغويفات في أقصى غرب إمارة أبوظبي، ويمتد الطريق منها شرقًا بمحاذاة الساحل نحو المدن.",
        },
      },
    ],
    note: {
      en: "We publish no opening hours, waiting times or procedures for Al Batha. They change, they differ by vehicle and nationality, and the authorities on both sides are the place to confirm them.",
      ar: "ولا ننشر مواعيد عمل ولا أزمنة انتظار ولا إجراءات للبطحاء. فهي تتغيّر، وتختلف باختلاف المركبة والجنسية، والجهات الرسمية على الجانبين هي مرجع تأكيدها.",
    },
  },
  cities: {
    heading: { en: "Where people are usually going", ar: "إلى أين يقصد الناس عادةً" },
    lead: {
      en: "Listed in the order the road reaches them after the border, which is also roughly the order of how long the day is.",
      ar: "مرتّبة بحسب بلوغ الطريق لها بعد الحدود، وهو تقريبًا ترتيب طول اليوم كذلك.",
    },
    items: [
      {
        name: { en: "Abu Dhabi", ar: "أبوظبي" },
        note: {
          en: "The first major city past the crossing, and the shortest of these journeys. The capital's own districts are spread out, so an address helps more than a city name here.",
          ar: "أول مدينة كبرى بعد المعبر، وأقصر هذه الرحلات. وأحياء العاصمة متباعدة، فالعنوان هنا أنفع من اسم المدينة.",
        },
      },
      {
        name: { en: "Dubai", ar: "دبي" },
        note: {
          en: "The one asked for most. Further along the coast than Abu Dhabi, so the day is longer — worth planning the start time around rather than discovering it.",
          ar: "أكثرها طلبًا. وأبعد على الساحل من أبوظبي، فاليوم أطول — ويستحق أن يُخطَّط وقت الانطلاق حوله لا أن يُكتشف.",
        },
      },
      {
        name: { en: "Sharjah and the northern Emirates", ar: "الشارقة والإمارات الشمالية" },
        note: {
          en: "Beyond Dubai again. Ajman, Umm Al Quwain and Ras Al Khaimah follow the same coast road, each one adding to the leg past the border.",
          ar: "أبعد من دبي كذلك. وعجمان وأم القيوين ورأس الخيمة على طريق الساحل نفسه، وكلٌّ منها يزيد المرحلة التالية للحدود.",
        },
      },
      {
        name: { en: "Al Ain", ar: "العين" },
        note: {
          en: "Inland rather than along the coast, so it is its own route rather than a stop on the way to Dubai. Say so clearly if Al Ain is the destination.",
          ar: "في الداخل لا على الساحل، فهي مسار قائم بذاته لا محطة في طريق دبي. فاذكر ذلك بوضوح إن كانت العين هي الوجهة.",
        },
      },
    ],
  },
  departures: {
    heading: { en: "Starting from inside Saudi Arabia", ar: "الانطلاق من داخل السعودية" },
    body: {
      en: "Pickup can be anywhere in the Kingdom. In practice the Eastern Province cities — Dammam, Al Khobar, Dhahran, Al Ahsa — sit closest to the road east, and Riyadh is the other common starting point with a long first leg before the border. From Jeddah or Madinah the journey crosses most of the country before it reaches the crossing at all, which is worth weighing honestly before you commit to a date.",
      ar: "يمكن أن يكون الاستقبال من أي مكان في المملكة. وعمليًا تكون مدن المنطقة الشرقية — الدمام والخبر والظهران والأحساء — الأقرب إلى الطريق شرقًا، والرياض نقطة الانطلاق الشائعة الأخرى بمرحلة أولى طويلة قبل الحدود. أما من جدة أو المدينة المنورة فتقطع الرحلة معظم البلاد قبل أن تبلغ المعبر أصلًا، وهذا يستحق وزنًا صادقًا قبل تثبيت التاريخ.",
    },
  },
  vehicles: {
    lead: {
      en: "This is a motorway journey almost end to end, so the choice is mostly about how comfortably your party travels for a long stretch rather than about the terrain. Luggage matters more than usual here: people crossing to the Emirates are often moving for a while rather than for a night.",
      ar: "هذه رحلة على طرق سريعة من طرفها إلى طرفها تقريبًا، فالاختيار يدور حول راحة مجموعتك في مسافة طويلة أكثر منه حول طبيعة الأرض. والأمتعة هنا أهمّ من المعتاد: فالعابرون إلى الإمارات ينتقلون غالبًا لمدة لا لليلة واحدة.",
    },
    note: {
      en: "A sedan suits two or three travelling light; a van or minibus keeps a family together with the cases rather than splitting them between cars. Whether a particular category is right for this crossing is confirmed with the quotation, not assumed from this list.",
      ar: "فالسيدان تناسب اثنين أو ثلاثة بأمتعة خفيفة؛ والڤان أو الميني باص يُبقي العائلة مع حقائبها في مركبة واحدة بدل تفريقها بين سيارتين. أما ملاءمة فئة بعينها لهذا المعبر فتُؤكَّد مع عرض السعر لا تُفترض من هذه القائمة.",
    },
  },
  checklist: {
    heading: { en: "What to put in the enquiry", ar: "ما تضعه في الطلب" },
    lead: {
      en: "These five turn a rough question into a quotable journey.",
      ar: "هذه الخمسة تحوّل سؤالًا عامًّا إلى رحلة قابلة للتسعير.",
    },
    items: [
      {
        label: { en: "Which Emirate, and where in it", ar: "أي إمارة، وأين فيها" },
        body: {
          en: "Abu Dhabi and Ras Al Khaimah are hours apart on the same road. A district or hotel name settles it.",
          ar: "بين أبوظبي ورأس الخيمة ساعات على الطريق نفسه. واسم الحي أو الفندق يحسم الأمر.",
        },
      },
      {
        label: { en: "Your exact pickup address", ar: "عنوان استقبالك بالضبط" },
        body: {
          en: "The first leg to Al Batha is measured from your door, not from your city.",
          ar: "تُقاس المرحلة الأولى إلى البطحاء من بابك لا من مدينتك.",
        },
      },
      {
        label: { en: "The date, and the time you want to arrive by", ar: "التاريخ، والوقت الذي تريد الوصول قبله" },
        body: {
          en: "If something at the other end is fixed, say so — it changes when the day has to start.",
          ar: "إن كان لديك موعد ثابت في الطرف الآخر فاذكره — فهو يغيّر وقت بدء اليوم.",
        },
      },
      {
        label: { en: "Passengers and luggage", ar: "الركاب والأمتعة" },
        body: {
          en: "Both decide the vehicle, and the vehicle is part of what has to suit the crossing.",
          ar: "كلاهما يحدّد المركبة، والمركبة جزء ممّا يلزم أن يناسب المعبر.",
        },
      },
      {
        label: { en: "One way, or coming back", ar: "ذهابًا فقط، أم عودة" },
        body: {
          en: "A return is quoted with the outbound leg rather than bolted on afterwards.",
          ar: "تُسعَّر العودة مع رحلة الذهاب لا تُلحَق بها بعدًا.",
        },
      },
    ],
  },
  faqs: [
    {
      question: { en: "Can I travel from Riyadh to Dubai by private car?", ar: "هل أسافر من الرياض إلى دبي بسيارة خاصة؟" },
      answer: {
        en: "Yes, and it is the request we see most. The route runs east across the Kingdom to Al Batha, through the crossing at Ghuwaifat, then along the coast past Abu Dhabi to Dubai. It is a long day by any measure, so it is worth agreeing the start time rather than leaving it open.",
        ar: "نعم، وهو أكثر ما يُطلب لدينا. ويمضي المسار شرقًا عبر المملكة إلى البطحاء، ثم من معبر الغويفات، ثم بمحاذاة الساحل مرورًا بأبوظبي إلى دبي. وهو يوم طويل بكل المقاييس، فيُستحسن الاتفاق على وقت الانطلاق لا تركه مفتوحًا.",
      },
    },
    {
      question: { en: "Is Al Batha the only way in by road?", ar: "هل البطحاء هو المنفذ البري الوحيد؟" },
      answer: {
        en: "It is the only land crossing between Saudi Arabia and the UAE, so yes for a road journey. Anything you read about other routes into the Emirates will be going through a third country.",
        ar: "هو المعبر البري الوحيد بين السعودية والإمارات، فالجواب نعم لرحلة برية. وأي مسار آخر تقرأ عنه إلى الإمارات سيكون عبر بلد ثالث.",
      },
    },
    {
      question: { en: "Does the same driver take us the whole way?", ar: "هل يقودنا السائق نفسه طوال الطريق؟" },
      answer: {
        en: "Sometimes, and it depends on the route and what is arranged for it rather than on preference. Some journeys run on one vehicle throughout; on others the journey changes hands after the border. The quotation says which applies to yours before you accept it.",
        ar: "أحيانًا، ويعتمد ذلك على المسار وما رُتّب له لا على الرغبة. فبعض الرحلات تمضي بمركبة واحدة طوال الطريق؛ وفي غيرها تنتقل الرحلة إلى يد أخرى بعد الحدود. ويذكر عرض السعر ما ينطبق على رحلتك قبل قبولك له.",
      },
    },
    {
      question: { en: "How long does the border take?", ar: "كم تستغرق إجراءات الحدود؟" },
      answer: {
        en: "We do not publish a figure, because it is not ours to promise. Processing at Al Batha depends on the day, the season and how busy the post is. We plan the driving either side of it; the post itself belongs to the authorities.",
        ar: "لا ننشر رقمًا، لأن ذلك ليس لنا أن نعد به. فالإجراءات في البطحاء تعتمد على اليوم والموسم وازدحام المنفذ. نحن نخطّط القيادة على جانبيه؛ أما المنفذ نفسه فللجهات الرسمية.",
      },
    },
    {
      question: { en: "Can we stop in Abu Dhabi on the way to Dubai?", ar: "هل نتوقف في أبوظبي في الطريق إلى دبي؟" },
      answer: {
        en: "Ask, and say how long you want there. Abu Dhabi sits on the road to Dubai, so a stop is a natural thing to arrange — but it lengthens the day and is quoted as part of the journey rather than assumed.",
        ar: "اسأل، واذكر المدة التي تريدها هناك. فأبوظبي تقع على طريق دبي، والتوقف فيها ترتيب طبيعي — لكنه يطيل اليوم ويُسعَّر جزءًا من الرحلة لا يُفترض.",
      },
    },
    {
      question: { en: "What do we need to cross?", ar: "ماذا نحتاج للعبور؟" },
      answer: {
        en: "That depends on your nationality and documents, and on the rules in force when you travel. Check with the official immigration and border authorities of both countries. We arrange the car; admission is decided at the border, not by the booking.",
        ar: "يعتمد ذلك على جنسيتك ووثائقك، وعلى الأنظمة السارية وقت سفرك. فتحقّق لدى جهات الجوازات والحدود الرسمية في البلدين. نحن نرتّب السيارة؛ أما السماح بالدخول فيُقرَّر عند الحدود لا بالحجز.",
      },
    },
  ],
  cta: {
    eyebrow: { en: "Saudi Arabia → UAE", ar: "السعودية ← الإمارات" },
    heading: { en: "Tell us which Emirate", ar: "أخبرنا أي إمارة" },
    body: {
      en: "Send your pickup address, the city you are heading for, the date and how many of you are travelling. We will review the route and come back with a written quotation.",
      ar: "أرسل عنوان استقبالك، والمدينة التي تقصدها، والتاريخ، وعددكم. سنراجع المسار ونعود إليك بعرض سعر مكتوب.",
    },
    button: { en: "Request a UAE transfer quote", ar: "اطلب عرض سعر إلى الإمارات" },
  },
  whatsappMessage: {
    en: "Hello, I would like a quotation for a private transfer from Saudi Arabia to the UAE.",
    ar: "السلام عليكم، أرغب في عرض سعر لنقل خاص من السعودية إلى الإمارات.",
  },
  related: [
    {
      routeKey: "crossBorderTransfers",
      label: { en: "Cross-border transfers", ar: "النقل عبر الحدود" },
      note: {
        en: "How these journeys are arranged in general, and the other countries served.",
        ar: "كيف تُرتَّب هذه الرحلات عمومًا، والبلدان الأخرى المخدومة.",
      },
    },
    {
      routeKey: "saudiToOman",
      label: { en: "Saudi Arabia to Oman", ar: "من السعودية إلى عُمان" },
      note: {
        en: "The other long eastern journey — and one that can be routed through the Emirates.",
        ar: "الرحلة الشرقية الطويلة الأخرى — ويمكن أن تمرّ عبر الإمارات.",
      },
    },
    {
      routeKey: "dammam",
      label: { en: "Dammam and the Eastern Province", ar: "الدمام والمنطقة الشرقية" },
      note: {
        en: "The region closest to the road east, and where many of these journeys start.",
        ar: "المنطقة الأقرب إلى الطريق شرقًا، ومنها تبدأ كثير من هذه الرحلات.",
      },
    },
    {
      routeKey: "riyadh",
      label: { en: "Riyadh transfers", ar: "خدمات النقل في الرياض" },
      note: {
        en: "The capital hub, and the usual alternative starting point for this route.",
        ar: "مركز العاصمة، ونقطة الانطلاق البديلة المعتادة لهذا المسار.",
      },
    },
  ],
};

/* ========================================================================== */
/*  BAHRAIN                                                                   */
/* ========================================================================== */

export const bahrain: CountryPage = {
  routeKey: "saudiToBahrainTransfers",
  imageKey: "svc-border",
  seo: {
    title: {
      en: "Saudi Arabia to Bahrain Private Transfer | Causeway Car",
      ar: "نقل خاص من السعودية إلى البحرين | سيارة عبر الجسر",
    },
    description: {
      en: "Private car and driver from anywhere in Saudi Arabia across the King Fahd Causeway to Manama and other Bahrain addresses. Written quotation before booking.",
      ar: "سيارة خاصة وسائق من أي مكان في السعودية عبر جسر الملك فهد إلى المنامة وعناوين البحرين. عرض سعر مكتوب قبل الحجز.",
    },
  },
  crumbLabel: { en: "Saudi Arabia to Bahrain", ar: "من السعودية إلى البحرين" },
  eyebrow: { en: "Saudi Arabia → Bahrain", ar: "السعودية ← البحرين" },
  title: {
    en: "Private transfers from Saudi Arabia to Bahrain",
    ar: "نقل خاص من السعودية إلى البحرين",
  },
  standfirst: {
    en: "This is the shortest international journey we run, and the one where the drive on the Saudi side usually matters more than the crossing itself. The King Fahd Causeway is about twenty-five kilometres of road over water. Getting to it from where you are is the part worth planning.",
    ar: "هذه أقصر رحلة دولية نشغّلها، وفيها تكون القيادة على الجانب السعودي أهمّ عادةً من العبور نفسه. فجسر الملك فهد نحو خمسة وعشرين كيلومترًا من الطريق فوق الماء. أما الوصول إليه من موضعك فهو الجزء الذي يستحق التخطيط.",
  },
  primaryCta: { en: "Request a Bahrain transfer quote", ar: "اطلب عرض سعر إلى البحرين" },
  dropoffSeed: { en: "Manama, Bahrain", ar: "المنامة، البحرين" },
  intro: {
    heading: {
      en: "The crossing is short. The approach is the journey",
      ar: "العبور قصير. والطريق إليه هو الرحلة",
    },
    body: [
      {
        en: "From Al Khobar the causeway is on your doorstep, and the whole thing is a short run. From Riyadh it is a long day on the eastward highway before you so much as see the water. From Jeddah it is most of the width of the country first. Same crossing, three completely different journeys — which is why the pickup address matters more here than anywhere else in the cluster.",
        ar: "من الخبر يكون الجسر على عتبة بابك، والأمر كله تنقّل قصير. ومن الرياض يوم طويل على الطريق الشرقي قبل أن ترى الماء أصلًا. ومن جدة عرض البلاد كله أولًا. المعبر نفسه، وثلاث رحلات مختلفة تمامًا — ولهذا يكون عنوان الاستقبال هنا أهمّ منه في أي صفحة أخرى في هذه المجموعة.",
      },
      {
        en: "Journeys do not stop at the causeway. Pickup can be anywhere in the Kingdom and the destination can be an address in Bahrain — a hotel in Manama, a house in Riffa, the airport on Muharraq. Say where you are actually going and it is quoted to the door.",
        ar: "ولا تتوقف الرحلات عند الجسر. فالاستقبال يمكن أن يكون من أي مكان في المملكة، والوجهة عنوانًا في البحرين — فندقًا في المنامة، أو بيتًا في الرفاع، أو المطار في المحرق. فاذكر وجهتك الفعلية ويُسعَّر الأمر حتى الباب.",
      },
    ],
  },
  crossings: {
    heading: { en: "The crossing", ar: "المعبر" },
    lead: {
      en: "One link, and the only road between the two countries.",
      ar: "رابط واحد، وهو الطريق الوحيد بين البلدين.",
    },
    items: [
      {
        saudiSide: { en: "King Fahd Causeway, Al Khobar side", ar: "جسر الملك فهد، جهة الخبر" },
        otherSide: { en: "Bahrain side, towards Manama", ar: "الجانب البحريني، باتجاه المنامة" },
        detail: {
          en: "The causeway begins just outside Al Khobar and runs to a midway point before continuing to the Bahraini side, where entry is processed. It is the only land link between Saudi Arabia and Bahrain.",
          ar: "يبدأ الجسر من خارج الخبر مباشرة ويمتد إلى نقطة وسطى قبل أن يواصل إلى الجانب البحريني حيث تُنجز إجراءات الدخول. وهو الرابط البري الوحيد بين السعودية والبحرين.",
        },
      },
    ],
    note: {
      en: "Our separate crossing guide sets out what the Causeway Authority and Bahrain's visa portal actually publish — documents, insurance, fees — and marks clearly what could not be confirmed from an official source. It is the better page to read before you travel; this one is for arranging the car.",
      ar: "ويبيّن دليل العبور المستقل لدينا ما تنشره فعلًا المؤسسة العامة للجسر وبوابة التأشيرات البحرينية — من وثائق وتأمين ورسوم — ويوسم بوضوح ما تعذّر تأكيده من مصدر رسمي. وهو الصفحة الأنسب للقراءة قبل السفر؛ أما هذه فلترتيب السيارة.",
    },
  },
  cities: {
    heading: { en: "Where in Bahrain", ar: "أين في البحرين" },
    lead: {
      en: "The island is small, so the difference between these is minutes rather than hours — but an address still beats a city name on a quotation.",
      ar: "الجزيرة صغيرة، فالفرق بين هذه دقائق لا ساعات — ومع ذلك يبقى العنوان أفضل من اسم المدينة في عرض السعر.",
    },
    items: [
      {
        name: { en: "Manama", ar: "المنامة" },
        note: {
          en: "The capital and the usual destination, including the hotel and business districts around Seef and the diplomatic area.",
          ar: "العاصمة والوجهة المعتادة، بما فيها أحياء الفنادق والأعمال حول السيف والمنطقة الدبلوماسية.",
        },
      },
      {
        name: { en: "Muharraq and the airport", ar: "المحرق والمطار" },
        note: {
          en: "North-east across its own causeway from Manama. A common drop-off when the road journey connects to a flight.",
          ar: "شمال شرق، عبر جسرها الخاص من المنامة. ونقطة نزول شائعة حين تتصل الرحلة البرية برحلة جوية.",
        },
      },
      {
        name: { en: "Riffa and the centre of the island", ar: "الرفاع ووسط الجزيرة" },
        note: {
          en: "Residential and inland rather than on the water. Worth giving a full address, since the district is large.",
          ar: "سكنية وداخلية لا على الساحل. ويُستحسن إعطاء عنوان كامل، فالمنطقة واسعة.",
        },
      },
    ],
  },
  departures: {
    heading: { en: "Starting from inside Saudi Arabia", ar: "الانطلاق من داخل السعودية" },
    body: {
      en: "Al Khobar, Dammam and Dhahran are the natural starting points — the causeway is right there. Al Ahsa and Jubail are a straightforward run across the province. Riyadh is the long eastward highway before the crossing, and it is a different kind of day: better started early than squeezed. Pickup from anywhere else in the Kingdom can be asked for and is reviewed on the distance.",
      ar: "الخبر والدمام والظهران نقاط الانطلاق الطبيعية — فالجسر هناك مباشرة. والأحساء والجبيل تنقّل ميسور عبر المنطقة. أما الرياض فطريق شرقي طويل قبل المعبر، وهو يوم من نوع آخر: يُستحسن بدؤه مبكرًا لا حشره. ويمكن طلب الاستقبال من أي مكان آخر في المملكة ويُراجَع بحسب المسافة.",
    },
  },
  vehicles: {
    lead: {
      en: "The shortest crossing on the list, so this is the one route where the vehicle question is usually the simplest: it is decided by how many of you there are and what you are carrying, not by the road.",
      ar: "أقصر معبر في القائمة، ولهذا يكون سؤال المركبة هنا أبسط ما يكون عادةً: يحدّده عددكم وما تحملونه، لا الطريق.",
    },
    note: {
      en: "Day trips across the causeway with shopping on the way back are common, and a boot that was fine on the outbound leg is not always fine on the return. Say if that is the plan. Category suitability for the crossing is confirmed with the quotation.",
      ar: "ورحلات اليوم الواحد عبر الجسر مع مشتريات في طريق العودة شائعة، وصندوق كفى في الذهاب قد لا يكفي في الإياب. فاذكر إن كان ذلك هو المراد. وتُؤكَّد ملاءمة الفئة للمعبر مع عرض السعر.",
    },
  },
  checklist: {
    heading: { en: "What to put in the enquiry", ar: "ما تضعه في الطلب" },
    lead: {
      en: "Short journey, short list — but these four decide the price.",
      ar: "رحلة قصيرة وقائمة قصيرة — لكن هذه الأربعة تحدّد السعر.",
    },
    items: [
      {
        label: { en: "Where you are starting", ar: "من أين تنطلق" },
        body: {
          en: "Al Khobar and Riyadh are not the same journey to the same causeway. This is the single biggest factor here.",
          ar: "ليست الخبر والرياض الرحلة نفسها إلى الجسر نفسه. وهذا أكبر عامل هنا.",
        },
      },
      {
        label: { en: "The address in Bahrain", ar: "العنوان في البحرين" },
        body: {
          en: "Hotel, home or the airport — the journey is quoted to where you are actually going, not to the end of the bridge.",
          ar: "فندق أو منزل أو المطار — تُسعَّر الرحلة إلى وجهتك الفعلية لا إلى نهاية الجسر.",
        },
      },
      {
        label: { en: "Date and rough time", ar: "التاريخ والوقت تقريبًا" },
        body: {
          en: "Weekend evenings are known to be the busiest on the causeway. If your timing is flexible, say so.",
          ar: "ومعلوم أن أمسيات نهاية الأسبوع أكثر الأوقات ازدحامًا على الجسر. فإن كان وقتك مرنًا فاذكر ذلك.",
        },
      },
      {
        label: { en: "Passengers, luggage, and whether you are coming back", ar: "الركاب والأمتعة، وهل ستعود" },
        body: {
          en: "Day return and one way are different arrangements and are priced differently.",
          ar: "فالعودة في اليوم نفسه والذهاب فقط ترتيبان مختلفان ويُسعَّران مختلفَين.",
        },
      },
    ],
  },
  faqs: [
    {
      question: { en: "Do you drive across the causeway into Bahrain?", ar: "هل تعبرون الجسر إلى داخل البحرين؟" },
      answer: {
        en: "Yes. Pickup can be from anywhere in the Kingdom and the journey can continue across to an address in Bahrain. If you would rather be dropped at the crossing and make your own way over, that can be quoted too — they are different journeys, so say which you want.",
        ar: "نعم. يمكن أن يكون الاستقبال من أي مكان في المملكة وأن تمضي الرحلة عبر الجسر إلى عنوان في البحرين. وإن فضّلت النزول عند المعبر والعبور بنفسك فذلك يُسعَّر أيضًا — فهما رحلتان مختلفتان، فاذكر أيّهما تريد.",
      },
    },
    {
      question: { en: "How long does the causeway take?", ar: "كم يستغرق عبور الجسر؟" },
      answer: {
        en: "We do not publish a figure. The drive over the water is short, but how long the posts take depends on the day and the traffic — weekend evenings are well known for queues. It is not something any transport company can promise, so we plan around it rather than guarantee it.",
        ar: "لا ننشر رقمًا. فالقيادة فوق الماء قصيرة، أما مدة المنافذ فتعتمد على اليوم والزحام — وأمسيات نهاية الأسبوع معروفة بالطوابير. وليس ذلك ممّا تستطيع شركة نقل الوعد به، فنخطّط حوله ولا نضمنه.",
      },
    },
    {
      question: { en: "Can you collect us from Bahrain and bring us back?", ar: "هل تستقبلوننا من البحرين وتعيدوننا؟" },
      answer: {
        en: "Return journeys are quoted — give the return date and time in the enquiry and both directions are priced together. Whether the same car and driver wait or the return is its own arrangement depends on the route, and the quotation says which.",
        ar: "تُسعَّر رحلات العودة — فاذكر تاريخ العودة ووقتها في الطلب ويُسعَّر الاتجاهان معًا. أما بقاء السيارة والسائق نفسيهما بالانتظار أو كون العودة ترتيبًا مستقلًا فيعتمد على المسار، ويذكر عرض السعر أيّهما.",
      },
    },
    {
      question: { en: "What about visas and insurance?", ar: "وماذا عن التأشيرات والتأمين؟" },
      answer: {
        en: "Those are yours to arrange, and they depend on your nationality and documents. Our separate causeway guide collects what the official sources publish about documents, insurance and fees, and marks what it could not confirm. Check the current position with the authorities before you travel.",
        ar: "تلك من ترتيبك، وتعتمد على جنسيتك ووثائقك. ويجمع دليل الجسر المستقل لدينا ما تنشره المصادر الرسمية عن الوثائق والتأمين والرسوم، ويوسم ما تعذّر تأكيده. فتحقّق من الوضع الحالي لدى الجهات الرسمية قبل السفر.",
      },
    },
    {
      question: { en: "Is this cheaper than flying?", ar: "هل هذا أرخص من الطيران؟" },
      answer: {
        en: "We do not publish prices, so there is no honest comparison to make here. What the road has over the flight on this particular route is that it is door to door and the causeway is short — for a family with luggage, that is usually the real argument rather than cost.",
        ar: "لا ننشر أسعارًا، فلا مقارنة صادقة تُعقد هنا. وما يتميّز به الطريق على الطيران في هذا المسار تحديدًا أنه من الباب إلى الباب وأن الجسر قصير — ولعائلة بأمتعة يكون ذلك عادةً الحجة الحقيقية لا الكلفة.",
      },
    },
  ],
  cta: {
    eyebrow: { en: "Saudi Arabia → Bahrain", ar: "السعودية ← البحرين" },
    heading: { en: "Tell us where you are starting", ar: "أخبرنا من أين تنطلق" },
    body: {
      en: "Send your pickup address, where in Bahrain you are heading, the date and how many of you are travelling. We will come back with a written quotation.",
      ar: "أرسل عنوان استقبالك، ووجهتك في البحرين، والتاريخ، وعددكم. وسنعود إليك بعرض سعر مكتوب.",
    },
    button: { en: "Request a Bahrain transfer quote", ar: "اطلب عرض سعر إلى البحرين" },
  },
  whatsappMessage: {
    en: "Hello, I would like a quotation for a private transfer from Saudi Arabia to Bahrain.",
    ar: "السلام عليكم، أرغب في عرض سعر لنقل خاص من السعودية إلى البحرين.",
  },
  related: [
    {
      routeKey: "saudiToBahrain",
      label: { en: "The King Fahd Causeway guide", ar: "دليل جسر الملك فهد" },
      note: {
        en: "What the authorities publish about documents, insurance and fees — and what could not be confirmed.",
        ar: "ما تنشره الجهات الرسمية عن الوثائق والتأمين والرسوم — وما تعذّر تأكيده.",
      },
    },
    {
      routeKey: "crossBorderTransfers",
      label: { en: "Cross-border transfers", ar: "النقل عبر الحدود" },
      note: {
        en: "How these journeys are arranged, and the other countries served.",
        ar: "كيف تُرتَّب هذه الرحلات، والبلدان الأخرى المخدومة.",
      },
    },
    {
      routeKey: "dammam",
      label: { en: "Dammam and the Eastern Province", ar: "الدمام والمنطقة الشرقية" },
      note: {
        en: "The region the causeway starts from, and the shortest way to it.",
        ar: "المنطقة التي يبدأ منها الجسر، وأقصر طريق إليه.",
      },
    },
    {
      routeKey: "riyadhToAlKhobar",
      label: { en: "Riyadh to Al Khobar", ar: "من الرياض إلى الخبر" },
      note: {
        en: "The long eastward leg, if your journey to the causeway starts in the capital.",
        ar: "المرحلة الشرقية الطويلة، إن بدأت رحلتك إلى الجسر من العاصمة.",
      },
    },
  ],
};

/* ========================================================================== */
/*  QATAR                                                                     */
/* ========================================================================== */

export const qatar: CountryPage = {
  routeKey: "saudiToQatar",
  imageKey: "khobar-corniche",
  seo: {
    title: {
      en: "Saudi Arabia to Qatar Private Transfer | Car and Driver",
      ar: "نقل خاص من السعودية إلى قطر | سيارة وسائق",
    },
    description: {
      en: "Private car and driver from anywhere in Saudi Arabia to Doha and other Qatar addresses, by the Salwa crossing. Written quotation before anything is confirmed.",
      ar: "سيارة خاصة وسائق من أي مكان في السعودية إلى الدوحة وعناوين قطر، عبر منفذ سلوى. عرض سعر مكتوب قبل أي تأكيد.",
    },
  },
  crumbLabel: { en: "Saudi Arabia to Qatar", ar: "من السعودية إلى قطر" },
  eyebrow: { en: "Saudi Arabia → Qatar", ar: "السعودية ← قطر" },
  title: {
    en: "Private transfers from Saudi Arabia to Qatar",
    ar: "نقل خاص من السعودية إلى قطر",
  },
  standfirst: {
    en: "Qatar has one land border in the world, and it is with Saudi Arabia. Everything arriving by road goes through Salwa — which makes the planning question unusually simple: how far are you from that one gate, and what happens after it.",
    ar: "لقطر حدود برية واحدة في العالم، وهي مع السعودية. وكل ما يصلها برًّا يمرّ عبر سلوى — وهذا يجعل سؤال التخطيط بسيطًا على غير المعتاد: كم تبعد عن تلك البوابة الوحيدة، وماذا يجري بعدها.",
  },
  primaryCta: { en: "Request a Qatar transfer quote", ar: "اطلب عرض سعر إلى قطر" },
  dropoffSeed: { en: "Doha, Qatar", ar: "الدوحة، قطر" },
  intro: {
    heading: {
      en: "One gate, and it is a long way from most places",
      ar: "بوابة واحدة، وهي بعيدة عن معظم المواضع",
    },
    body: [
      {
        en: "Salwa sits on the Saudi side of the only crossing into Qatar; Abu Samra is the Qatari post opposite it. Because the peninsula has no other land approach, the journey is really two questions stacked together — the drive to Salwa, and the drive from Abu Samra up to Doha.",
        ar: "تقع سلوى على الجانب السعودي من المعبر الوحيد إلى قطر؛ وأبو سمرة هو المنفذ القطري المقابل. ولأن شبه الجزيرة ليس لها مدخل بري آخر، فالرحلة في حقيقتها سؤالان متراكبان — القيادة إلى سلوى، ثم القيادة من أبو سمرة صعودًا إلى الدوحة.",
      },
      {
        en: "That second leg is longer than people expect: Abu Samra is in the far south-west of Qatar and Doha is up the eastern coast. It is worth knowing before you pick a departure time, and it is the main reason we ask for the destination address rather than just the country.",
        ar: "والمرحلة الثانية أطول ممّا يتوقّع الناس: فأبو سمرة في أقصى جنوب غرب قطر، والدوحة شمالًا على الساحل الشرقي. ويجدر معرفة ذلك قبل اختيار وقت الانطلاق، وهو السبب الرئيس في طلبنا عنوان الوجهة لا اسم البلد فقط.",
      },
    ],
  },
  crossings: {
    heading: { en: "The crossing", ar: "المعبر" },
    lead: {
      en: "Qatar's only land border, on both sides.",
      ar: "حدود قطر البرية الوحيدة، من الجانبين.",
    },
    items: [
      {
        saudiSide: { en: "Salwa", ar: "سلوى" },
        otherSide: { en: "Abu Samra", ar: "أبو سمرة" },
        detail: {
          en: "Salwa is on Saudi Arabia's eastern border and is the only crossing connecting the Kingdom to Qatar. Abu Samra faces it on the Qatari side, in the far south-west of the peninsula, with the road to Doha running north-east from there.",
          ar: "تقع سلوى على الحدود الشرقية للسعودية وهي المعبر الوحيد الرابط بين المملكة وقطر. ويقابلها أبو سمرة من الجانب القطري، في أقصى جنوب غرب شبه الجزيرة، ويمتد منها الطريق إلى الدوحة شمالًا شرقًا.",
        },
      },
    ],
    note: {
      en: "The crossing was closed between 2017 and January 2021 and has been operating since. We publish nothing about its hours, lanes or procedures — confirm the current position with the authorities on both sides before you travel.",
      ar: "وقد أُغلق المعبر بين 2017 ويناير 2021، وهو عامل منذئذ. ولا ننشر شيئًا عن مواعيده أو مساراته أو إجراءاته — فتحقّق من الوضع الحالي لدى الجهات الرسمية على الجانبين قبل السفر.",
    },
  },
  cities: {
    heading: { en: "Where in Qatar", ar: "أين في قطر" },
    lead: {
      en: "Nearly everything is on or near the east coast, which is the far side of the country from the border.",
      ar: "كل شيء تقريبًا على الساحل الشرقي أو قربه، وهو الجانب الأبعد عن الحدود.",
    },
    items: [
      {
        name: { en: "Doha", ar: "الدوحة" },
        note: {
          en: "The destination in almost every enquiry. A district or hotel name is worth giving — the city stretches a long way along the bay.",
          ar: "الوجهة في كل طلب تقريبًا. ويستحق اسم الحي أو الفندق الذكر — فالمدينة ممتدة طويلًا على الخليج.",
        },
      },
      {
        name: { en: "Lusail and the northern suburbs", ar: "لوسيل والضواحي الشمالية" },
        note: {
          en: "Beyond Doha to the north, so a little further again after an already long second leg.",
          ar: "شمال الدوحة، فهي أبعد قليلًا بعد مرحلة ثانية طويلة أصلًا.",
        },
      },
      {
        name: { en: "Al Wakrah and the south", ar: "الوكرة والجنوب" },
        note: {
          en: "South of Doha on the coast, and closer to the road up from the border than the city centre is.",
          ar: "جنوب الدوحة على الساحل، وأقرب إلى الطريق الصاعد من الحدود من وسط المدينة.",
        },
      },
    ],
  },
  departures: {
    heading: { en: "How far you are from Salwa", ar: "كم تبعد عن سلوى" },
    body: {
      en: "The Eastern Province cities — Al Ahsa, Dammam, Al Khobar, Jubail — are the closest to the crossing and make the most straightforward day. Riyadh adds a long first leg east and south before the border is in sight. From the western side of the Kingdom the journey crosses the country first, which is possible but is a different scale of trip and is reviewed accordingly.",
      ar: "مدن المنطقة الشرقية — الأحساء والدمام والخبر والجبيل — هي الأقرب إلى المعبر وتصنع أيسر الأيام. والرياض تضيف مرحلة أولى طويلة شرقًا وجنوبًا قبل أن تلوح الحدود. أما من الجانب الغربي للمملكة فتقطع الرحلة البلاد أولًا، وذلك ممكن لكنه مقياس آخر للرحلة ويُراجَع على هذا الأساس.",
    },
  },
  vehicles: {
    lead: {
      en: "Two long legs with a border in the middle, which makes this a comfort decision more than a capacity one. The stretch north from Abu Samra to Doha is the part people have not accounted for when they pick the smallest car that technically fits.",
      ar: "مرحلتان طويلتان بينهما حدود، ما يجعل هذا قرار راحة أكثر منه قرار سعة. والامتداد شمالًا من أبو سمرة إلى الدوحة هو ما لا يحسب له الناس حسابًا حين يختارون أصغر سيارة تكفي شكلًا.",
    },
    note: {
      en: "If anyone in the party struggles with long stretches seated, say so in the enquiry and the vehicle is chosen around that rather than around the headcount alone. Suitability for the crossing is confirmed with the quotation.",
      ar: "وإن كان في المجموعة من يشقّ عليه الجلوس مددًا طويلة فاذكر ذلك في الطلب، لتُختار المركبة على هذا الأساس لا على العدد وحده. وتُؤكَّد الملاءمة للمعبر مع عرض السعر.",
    },
  },
  checklist: {
    heading: { en: "What to put in the enquiry", ar: "ما تضعه في الطلب" },
    lead: {
      en: "The second leg is the one people underestimate, so three of these are about it.",
      ar: "المرحلة الثانية هي ما يستهين به الناس، فثلاثة من هذه عنها.",
    },
    items: [
      {
        label: { en: "Your pickup address", ar: "عنوان استقبالك" },
        body: {
          en: "Distance to Salwa is the first half of the quotation, and it is measured from your door.",
          ar: "المسافة إلى سلوى هي نصف عرض السعر الأول، وتُقاس من بابك.",
        },
      },
      {
        label: { en: "Where in Qatar, precisely", ar: "أين في قطر، بدقة" },
        body: {
          en: "Doha is a long way from Abu Samra. Lusail is further. An address settles the second half.",
          ar: "الدوحة بعيدة عن أبو سمرة. ولوسيل أبعد. والعنوان يحسم النصف الثاني.",
        },
      },
      {
        label: { en: "When you need to arrive", ar: "متى يلزم أن تصل" },
        body: {
          en: "If there is a fixed appointment at the other end, the day has to be built backwards from it.",
          ar: "إن كان في الطرف الآخر موعد ثابت، فيجب أن يُبنى اليوم رجوعًا منه.",
        },
      },
      {
        label: { en: "Passengers, luggage and return", ar: "الركاب والأمتعة والعودة" },
        body: {
          en: "The usual three. A return is quoted with the outbound leg, not added later.",
          ar: "الثلاثة المعتادة. وتُسعَّر العودة مع رحلة الذهاب لا تُضاف لاحقًا.",
        },
      },
    ],
  },
  faqs: [
    {
      question: { en: "Is Salwa the only way into Qatar by road?", ar: "هل سلوى هي المنفذ البري الوحيد إلى قطر؟" },
      answer: {
        en: "Yes. Qatar shares a land border only with Saudi Arabia, and Salwa–Abu Samra is the crossing. Any road journey into the country uses it.",
        ar: "نعم. فحدود قطر البرية مع السعودية وحدها، ومعبر سلوى — أبو سمرة هو المنفذ. وكل رحلة برية إلى البلاد تمرّ منه.",
      },
    },
    {
      question: { en: "How far is Doha from the border?", ar: "كم تبعد الدوحة عن الحدود؟" },
      answer: {
        en: "Further than most people assume — Abu Samra is in the far south-west of the peninsula and Doha is up the east coast. We do not publish a driving time, because we do not publish driving times for any route, but it is a substantial leg on its own and worth planning for rather than treating as the last few minutes of the trip.",
        ar: "أبعد ممّا يفترض معظم الناس — فأبو سمرة في أقصى جنوب غرب شبه الجزيرة، والدوحة شمالًا على الساحل الشرقي. ولا ننشر زمن قيادة، لأننا لا ننشره لأي مسار، لكنها مرحلة كبيرة بذاتها تستحق التخطيط لا أن تُعامَل كدقائق أخيرة من الرحلة.",
      },
    },
    {
      question: { en: "Can we be taken to a hotel in Doha directly?", ar: "هل نُنقل إلى فندق في الدوحة مباشرة؟" },
      answer: {
        en: "Yes — give the hotel name and the journey is quoted to the door rather than to the border. Whether one vehicle makes the whole trip or the journey changes hands after the crossing depends on the route and is set out in the quotation.",
        ar: "نعم — اذكر اسم الفندق وتُسعَّر الرحلة حتى الباب لا حتى الحدود. أما كون مركبة واحدة تقطع الطريق كله أو انتقال الرحلة بعد المعبر فيعتمد على المسار ويُبيَّن في عرض السعر.",
      },
    },
    {
      question: { en: "What documents will we need?", ar: "ما الوثائق التي سنحتاجها؟" },
      answer: {
        en: "That depends on your nationality and the rules in force when you travel, and it is not something we advise on. Check with the official immigration and border authorities of both countries before the date.",
        ar: "يعتمد ذلك على جنسيتك والأنظمة السارية وقت سفرك، وليس ممّا نفتي فيه. فتحقّق لدى جهات الجوازات والحدود الرسمية في البلدين قبل الموعد.",
      },
    },
    {
      question: { en: "Can you quote a return a few days later?", ar: "هل تسعّرون عودة بعد أيام؟" },
      answer: {
        en: "Yes. Give both dates and both directions are quoted together. A gap of several days usually means the return is arranged separately rather than a vehicle waiting, and the quotation will say so plainly.",
        ar: "نعم. اذكر التاريخين ويُسعَّر الاتجاهان معًا. والفاصل بعدة أيام يعني عادةً أن العودة تُرتَّب على حدة لا أن مركبة تنتظر، ويذكر عرض السعر ذلك صراحةً.",
      },
    },
  ],
  cta: {
    eyebrow: { en: "Saudi Arabia → Qatar", ar: "السعودية ← قطر" },
    heading: { en: "Tell us where in Qatar", ar: "أخبرنا أين في قطر" },
    body: {
      en: "Send your pickup address, the address you are heading for, the date and your passenger count. We will review both legs and reply with a written quotation.",
      ar: "أرسل عنوان استقبالك، والعنوان الذي تقصده، والتاريخ، وعدد الركاب. سنراجع المرحلتين ونرد بعرض سعر مكتوب.",
    },
    button: { en: "Request a Qatar transfer quote", ar: "اطلب عرض سعر إلى قطر" },
  },
  whatsappMessage: {
    en: "Hello, I would like a quotation for a private transfer from Saudi Arabia to Qatar.",
    ar: "السلام عليكم، أرغب في عرض سعر لنقل خاص من السعودية إلى قطر.",
  },
  related: [
    {
      routeKey: "crossBorderTransfers",
      label: { en: "Cross-border transfers", ar: "النقل عبر الحدود" },
      note: {
        en: "How these journeys are arranged, and the other countries served.",
        ar: "كيف تُرتَّب هذه الرحلات، والبلدان الأخرى المخدومة.",
      },
    },
    {
      routeKey: "alAhsa",
      label: { en: "Al Ahsa", ar: "الأحساء" },
      note: {
        en: "The closest of the Eastern Province hubs to the road south towards Salwa.",
        ar: "أقرب مراكز المنطقة الشرقية إلى الطريق جنوبًا نحو سلوى.",
      },
    },
    {
      routeKey: "dammam",
      label: { en: "Dammam and the Eastern Province", ar: "الدمام والمنطقة الشرقية" },
      note: {
        en: "Where most journeys to this crossing begin.",
        ar: "حيث تبدأ معظم الرحلات إلى هذا المعبر.",
      },
    },
    {
      routeKey: "saudiToBahrainTransfers",
      label: { en: "Saudi Arabia to Bahrain", ar: "من السعودية إلى البحرين" },
      note: {
        en: "The other Gulf crossing from the same corner of the country, and a much shorter one.",
        ar: "المعبر الخليجي الآخر من الركن نفسه من البلاد، وهو أقصر بكثير.",
      },
    },
  ],
};

/* ========================================================================== */
/*  KUWAIT                                                                    */
/* ========================================================================== */

export const kuwait: CountryPage = {
  routeKey: "saudiToKuwait",
  imageKey: "route-highway65-north",
  seo: {
    title: {
      en: "Saudi Arabia to Kuwait Private Transfer | Car and Driver",
      ar: "نقل خاص من السعودية إلى الكويت | سيارة وسائق",
    },
    description: {
      en: "Private car and driver from anywhere in Saudi Arabia to Kuwait City, by the Khafji or Ruqi crossing. Written quotation before anything is confirmed.",
      ar: "سيارة خاصة وسائق من أي مكان في السعودية إلى مدينة الكويت، عبر منفذ الخفجي أو الرقعي. عرض سعر مكتوب قبل أي تأكيد.",
    },
  },
  crumbLabel: { en: "Saudi Arabia to Kuwait", ar: "من السعودية إلى الكويت" },
  eyebrow: { en: "Saudi Arabia → Kuwait", ar: "السعودية ← الكويت" },
  title: {
    en: "Private transfers from Saudi Arabia to Kuwait",
    ar: "نقل خاص من السعودية إلى الكويت",
  },
  standfirst: {
    en: "This is the one crossing on our list where there is a genuine choice of gate. Two roads run north into Kuwait — one along the coast, one inland — and which suits your journey depends almost entirely on where in Saudi Arabia you are starting.",
    ar: "هذا هو المعبر الوحيد في قائمتنا الذي فيه اختيار حقيقي للبوابة. فطريقان يمتدان شمالًا إلى الكويت — أحدهما ساحلي والآخر داخلي — وأيّهما يناسب رحلتك يعتمد كليًّا تقريبًا على موضع انطلاقك في السعودية.",
  },
  primaryCta: { en: "Request a Kuwait transfer quote", ar: "اطلب عرض سعر إلى الكويت" },
  dropoffSeed: { en: "Kuwait City, Kuwait", ar: "مدينة الكويت، الكويت" },
  intro: {
    heading: { en: "Two gates, and the coast is not always the right one", ar: "بوابتان، وليس الساحل دائمًا هو الصواب" },
    body: [
      {
        en: "Saudi Arabia and Kuwait share two land crossings. Khafji is the coastal one, on the Gulf north of Jubail, facing Nuwaiseeb on the Kuwaiti side. Ar-Ruqi is the inland one, in the Hafr Al-Batin area, facing Salmi. Both lead to Kuwait City; they just approach the country from different directions.",
        ar: "بين السعودية والكويت معبران بريان. فالخفجي هو الساحلي، على الخليج شمال الجبيل، ويقابله النويصيب من الجانب الكويتي. والرقعي هو الداخلي، في منطقة حفر الباطن، ويقابله السالمي. وكلاهما يفضي إلى مدينة الكويت؛ غير أنهما يقاربان البلاد من جهتين مختلفتين.",
      },
      {
        en: "For a journey starting in Dammam or Al Khobar, the coast road and Khafji are usually the natural line. Starting from Riyadh or the north of the Kingdom, the inland road through Hafr Al-Batin and Ar-Ruqi can make more sense. We look at both against your actual pickup rather than defaulting to one.",
        ar: "فلرحلة تبدأ من الدمام أو الخبر يكون الطريق الساحلي والخفجي هو الخط الطبيعي عادةً. وللانطلاق من الرياض أو شمال المملكة قد يكون الطريق الداخلي عبر حفر الباطن والرقعي أوجه. وننظر في الاثنين مقابل موضع استقبالك الفعلي لا نفترض أحدهما.",
      },
    ],
  },
  crossings: {
    heading: { en: "The two crossings", ar: "المعبران" },
    lead: {
      en: "Which one a journey uses is part of the route planning, not something you need to decide before enquiring.",
      ar: "وأيّهما تسلكه الرحلة جزء من تخطيط المسار، لا أمر يلزمك حسمه قبل الطلب.",
    },
    items: [
      {
        saudiSide: { en: "Al Khafji", ar: "الخفجي" },
        otherSide: { en: "Nuwaiseeb", ar: "النويصيب" },
        detail: {
          en: "The coastal crossing, in the Eastern Province on the Gulf. It is the older of the two, opened in 1970, and the natural line from Dammam, Al Khobar and Jubail.",
          ar: "المعبر الساحلي، في المنطقة الشرقية على الخليج. وهو الأقدم من الاثنين، افتُتح عام 1970، والخط الطبيعي من الدمام والخبر والجبيل.",
        },
      },
      {
        saudiSide: { en: "Ar-Ruqi", ar: "الرقعي" },
        otherSide: { en: "Salmi", ar: "السالمي" },
        detail: {
          en: "The inland crossing, in the Hafr Al-Batin area of the Eastern Province, facing Salmi in Kuwait's Jahra governorate. Often the better line from Riyadh and the north.",
          ar: "المعبر الداخلي، في منطقة حفر الباطن بالمنطقة الشرقية، ويقابله السالمي في محافظة الجهراء الكويتية. وهو غالبًا الخط الأفضل من الرياض والشمال.",
        },
      },
    ],
    note: {
      en: "Operating hours and procedures at both posts are set by the authorities and are not something we publish — reports about them vary and change. Confirm the current position before you travel.",
      ar: "ومواعيد العمل والإجراءات في المنفذين تحدّدها الجهات الرسمية وليست ممّا ننشره — فالتقارير عنها متفاوتة ومتغيّرة. فتحقّق من الوضع الحالي قبل السفر.",
    },
  },
  cities: {
    heading: { en: "Where in Kuwait", ar: "أين في الكويت" },
    lead: {
      en: "The country is compact and most destinations cluster around the capital and the coast south of it.",
      ar: "البلاد متراصّة، ومعظم الوجهات متجمّعة حول العاصمة والساحل جنوبها.",
    },
    items: [
      {
        name: { en: "Kuwait City", ar: "مدينة الكويت" },
        note: {
          en: "The destination in most enquiries, including the business district and the hotels along the bay.",
          ar: "الوجهة في معظم الطلبات، بما فيها منطقة الأعمال والفنادق على الخليج.",
        },
      },
      {
        name: { en: "Salmiya and Hawally", ar: "السالمية وحولي" },
        note: {
          en: "The dense residential and shopping districts east of the centre. Give a street or building — they are large areas.",
          ar: "أحياء السكن والتسوق المكتظة شرق المركز. فاذكر شارعًا أو مبنى — فهي مناطق واسعة.",
        },
      },
      {
        name: { en: "Al Ahmadi and the south", ar: "الأحمدي والجنوب" },
        note: {
          en: "South of the capital, and nearer the coastal road up from Nuwaiseeb than the city centre is.",
          ar: "جنوب العاصمة، وأقرب إلى الطريق الساحلي الصاعد من النويصيب من وسط المدينة.",
        },
      },
    ],
  },
  departures: {
    heading: { en: "Which gate suits your start", ar: "أي بوابة تناسب انطلاقك" },
    body: {
      en: "From Dammam, Al Khobar, Dhahran or Jubail the coast and Khafji are usually the shorter line. From Riyadh, Buraydah or Hafr Al-Batin itself the inland road to Ar-Ruqi often works better. You do not need to choose: give us the pickup address and the destination, and the route is planned around them rather than around a default.",
      ar: "من الدمام أو الخبر أو الظهران أو الجبيل يكون الساحل والخفجي الخط الأقصر عادةً. ومن الرياض أو بريدة أو حفر الباطن نفسها يكون الطريق الداخلي إلى الرقعي أنسب غالبًا. ولا يلزمك الاختيار: أعطنا عنوان الاستقبال والوجهة، ويُخطَّط المسار حولهما لا حول افتراض مسبق.",
    },
  },
  vehicles: {
    lead: {
      en: "Both routes north are surfaced road, so the vehicle follows the party rather than the terrain. What does change with the gate is the length of the drive, and that is worth weighing if you are travelling with children.",
      ar: "كلا الطريقين شمالًا معبّد، فالمركبة تتبع المجموعة لا طبيعة الأرض. أما ما يتغيّر بتغيّر البوابة فطول القيادة، ويستحق ذلك وزنًا إن كنت مسافرًا مع أطفال.",
    },
    note: {
      en: "Give the real passenger count rather than the one that fits the car you have in mind — if the number needs a second vehicle, it is better to find that out in the quotation than at the border. Category suitability is confirmed there too.",
      ar: "واذكر عدد الركاب الحقيقي لا العدد الذي يناسب السيارة التي تتصوّرها — فإن كان العدد يستلزم مركبة ثانية، فاكتشاف ذلك في عرض السعر خير من اكتشافه عند الحدود. وتُؤكَّد ملاءمة الفئة هناك كذلك.",
    },
  },
  checklist: {
    heading: { en: "What to put in the enquiry", ar: "ما تضعه في الطلب" },
    lead: {
      en: "With two possible routes, the pickup address does more work here than usual.",
      ar: "مع وجود مسارين محتملين، يؤدي عنوان الاستقبال هنا دورًا أكبر من المعتاد.",
    },
    items: [
      {
        label: { en: "Exactly where you are starting", ar: "موضع انطلاقك بالضبط" },
        body: {
          en: "It is what decides which of the two crossings the route is built around.",
          ar: "فهو ما يحدّد أيّ المعبرين يُبنى المسار حوله.",
        },
      },
      {
        label: { en: "The address in Kuwait", ar: "العنوان في الكويت" },
        body: {
          en: "Salmiya and Al Ahmadi are approached differently depending on the gate used.",
          ar: "فالسالمية والأحمدي يُقارَبان على نحو مختلف باختلاف البوابة المستخدمة.",
        },
      },
      {
        label: { en: "Date and preferred timing", ar: "التاريخ والتوقيت المفضّل" },
        body: {
          en: "Say if you need to arrive by a particular hour, and the day is planned backwards from it.",
          ar: "اذكر إن لزمك الوصول قبل ساعة بعينها، فيُخطَّط اليوم رجوعًا منها.",
        },
      },
      {
        label: { en: "Passengers, luggage and return", ar: "الركاب والأمتعة والعودة" },
        body: {
          en: "The vehicle follows the first two; the third changes the arrangement on both sides.",
          ar: "فالمركبة تتبع الأولَين؛ والثالث يغيّر الترتيب على الجانبين.",
        },
      },
    ],
  },
  faqs: [
    {
      question: { en: "Which border crossing will we use?", ar: "أي معبر سنسلك؟" },
      answer: {
        en: "Whichever suits the route. Khafji on the coast is usually the line from the Eastern Province cities; Ar-Ruqi inland often works better from Riyadh and the north. We plan it around your pickup and destination and tell you which the quotation is based on.",
        ar: "ما يناسب المسار. فالخفجي الساحلي هو الخط المعتاد من مدن المنطقة الشرقية؛ والرقعي الداخلي أنسب غالبًا من الرياض والشمال. ونخطّط ذلك حول موضع استقبالك ووجهتك ونخبرك على أيّهما بُني عرض السعر.",
      },
    },
    {
      question: { en: "Can we ask for a specific crossing?", ar: "هل نطلب معبرًا بعينه؟" },
      answer: {
        en: "You can say which you would prefer and why, and it will be taken into account. Whether it is practical depends on the route and on what is arranged for it, so it is answered for your journey rather than promised in advance.",
        ar: "يمكنك ذكر ما تفضّله وسببه، ويُؤخذ في الحسبان. أما كونه عمليًا فيعتمد على المسار وما رُتّب له، فيُجاب عنه لرحلتك لا يُوعد به مسبقًا.",
      },
    },
    {
      question: { en: "Is the drive from Riyadh practical in a day?", ar: "هل القيادة من الرياض عملية في يوم؟" },
      answer: {
        en: "It is a long day and it is regularly asked for. We will not put a duration on it, but we will tell you honestly if the timing you have in mind does not fit the route — before you accept a quotation rather than after.",
        ar: "هو يوم طويل ويُطلب باستمرار. ولن نضع له مدة، لكننا سنخبرك بصراحة إن كان التوقيت الذي تتصوّره لا يناسب المسار — قبل قبولك عرض السعر لا بعده.",
      },
    },
    {
      question: { en: "Does the same car continue into Kuwait?", ar: "هل تُكمل السيارة نفسها إلى الكويت؟" },
      answer: {
        en: "Sometimes. It depends on the route and on what is arranged for it, not on preference, and a handover after the border is a normal arrangement on some journeys. The quotation states which applies before you accept it.",
        ar: "أحيانًا. يعتمد ذلك على المسار وما رُتّب له لا على الرغبة، والتسليم بعد الحدود ترتيب معتاد في بعض الرحلات. ويذكر عرض السعر ما ينطبق قبل قبولك له.",
      },
    },
    {
      question: { en: "What about documents and entry?", ar: "وماذا عن الوثائق والدخول؟" },
      answer: {
        en: "Those depend on your nationality and the current rules, and they are yours to check with the official authorities of both countries. We arrange the vehicle and the route; admission at the border is not something a booking can secure.",
        ar: "تعتمد على جنسيتك والأنظمة الحالية، ومن شأنك التحقق منها لدى الجهات الرسمية في البلدين. نحن نرتّب المركبة والمسار؛ أما السماح بالدخول عند الحدود فليس ممّا يضمنه حجز.",
      },
    },
  ],
  cta: {
    eyebrow: { en: "Saudi Arabia → Kuwait", ar: "السعودية ← الكويت" },
    heading: { en: "Give us your start and your destination", ar: "أعطنا نقطة انطلاقك ووجهتك" },
    body: {
      en: "Send the pickup address, where in Kuwait you are going, the date and your passenger count. We will work out which route fits and reply with a written quotation.",
      ar: "أرسل عنوان الاستقبال، ووجهتك في الكويت، والتاريخ، وعدد الركاب. سنحدّد المسار المناسب ونرد بعرض سعر مكتوب.",
    },
    button: { en: "Request a Kuwait transfer quote", ar: "اطلب عرض سعر إلى الكويت" },
  },
  whatsappMessage: {
    en: "Hello, I would like a quotation for a private transfer from Saudi Arabia to Kuwait.",
    ar: "السلام عليكم، أرغب في عرض سعر لنقل خاص من السعودية إلى الكويت.",
  },
  related: [
    {
      routeKey: "crossBorderTransfers",
      label: { en: "Cross-border transfers", ar: "النقل عبر الحدود" },
      note: {
        en: "How these journeys are arranged, and the other countries served.",
        ar: "كيف تُرتَّب هذه الرحلات، والبلدان الأخرى المخدومة.",
      },
    },
    {
      routeKey: "jubail",
      label: { en: "Jubail", ar: "الجبيل" },
      note: {
        en: "The last major city on the coast road before the Khafji crossing.",
        ar: "آخر مدينة كبرى على الطريق الساحلي قبل معبر الخفجي.",
      },
    },
    {
      routeKey: "dammam",
      label: { en: "Dammam and the Eastern Province", ar: "الدمام والمنطقة الشرقية" },
      note: {
        en: "Where the coastal route north usually begins.",
        ar: "حيث يبدأ عادةً الطريق الساحلي شمالًا.",
      },
    },
    {
      routeKey: "riyadh",
      label: { en: "Riyadh transfers", ar: "خدمات النقل في الرياض" },
      note: {
        en: "The capital hub, and the usual start for the inland route to Ar-Ruqi.",
        ar: "مركز العاصمة، والبداية المعتادة للطريق الداخلي إلى الرقعي.",
      },
    },
  ],
};

/* ========================================================================== */
/*  OMAN                                                                      */
/* ========================================================================== */

export const oman: CountryPage = {
  routeKey: "saudiToOman",
  imageKey: "guide-desert",
  seo: {
    title: {
      en: "Saudi Arabia to Oman Private Transfer | Car and Driver",
      ar: "نقل خاص من السعودية إلى عُمان | سيارة وسائق",
    },
    description: {
      en: "Private car and driver from Saudi Arabia to Muscat and other Oman destinations, by the Empty Quarter road or through the UAE. Written quotation first.",
      ar: "سيارة خاصة وسائق من السعودية إلى مسقط ووجهات عُمان، عبر طريق الربع الخالي أو عبر الإمارات. عرض سعر مكتوب أولًا.",
    },
  },
  crumbLabel: { en: "Saudi Arabia to Oman", ar: "من السعودية إلى عُمان" },
  eyebrow: { en: "Saudi Arabia → Oman", ar: "السعودية ← عُمان" },
  title: {
    en: "Private transfers from Saudi Arabia to Oman",
    ar: "نقل خاص من السعودية إلى عُمان",
  },
  standfirst: {
    en: "Until December 2021 there was no direct road between these two countries at all — you went the long way round through the Emirates. The Empty Quarter road changed that, and it is now the longest and most planning-heavy journey we quote.",
    ar: "حتى ديسمبر 2021 لم يكن بين هذين البلدين طريق مباشر أصلًا — كنت تدور عبر الإمارات. ثم غيّر طريق الربع الخالي ذلك، وهو اليوم أطول ما نسعّره من رحلات وأكثرها حاجةً إلى تخطيط.",
  },
  primaryCta: { en: "Request an Oman transfer quote", ar: "اطلب عرض سعر إلى عُمان" },
  dropoffSeed: { en: "Muscat, Oman", ar: "مسقط، عُمان" },
  intro: {
    heading: { en: "A new road across the Empty Quarter", ar: "طريق جديد عبر الربع الخالي" },
    body: [
      {
        en: "The direct link opened on 8 December 2021 and runs roughly 725 kilometres in total — about 564 of them on the Saudi side and 161 in Oman — from the Batha–Haradh area across the Empty Quarter, past Shaybah, to the Ramlat Khaliya crossing and down towards Ibri. It cut a very long detour out of the journey.",
        ar: "افتُتح الرابط المباشر في 8 ديسمبر 2021، ويمتد نحو 725 كيلومترًا إجمالًا — منها قرابة 564 في الجانب السعودي و161 في عُمان — من منطقة البطحاء وحرض عبر الربع الخالي، مرورًا بالشيبة، إلى معبر رملة خليّة ونزولًا نحو عبري. وقد اختصر التفافًا طويلًا جدًّا من الرحلة.",
      },
      {
        en: "It is still desert driving for hundreds of kilometres, with very little between the two ends. That is not a reason to avoid it — it is a reason to plan it properly, and the main reason this page asks more questions than the others before quoting.",
        ar: "ومع ذلك تبقى قيادةً في الصحراء مئات الكيلومترات، وليس بين الطرفين إلا القليل. وليس ذلك سببًا لتجنّبه — بل سبب للتخطيط له كما ينبغي، وهو السبب الرئيس في أن هذه الصفحة تسأل أكثر من غيرها قبل التسعير.",
      },
      {
        en: "The older route through the Emirates still exists and is sometimes the better answer, particularly if your destination is in northern Oman or you want to break the journey. Both are considered against what you actually need rather than assumed.",
        ar: "ولا يزال المسار الأقدم عبر الإمارات قائمًا، وقد يكون أحيانًا الجواب الأفضل، خصوصًا إن كانت وجهتك في شمال عُمان أو أردت تجزئة الرحلة. ويُنظر في الاثنين مقابل حاجتك الفعلية لا بافتراض.",
      },
    ],
  },
  crossings: {
    heading: { en: "Two ways in", ar: "طريقان للدخول" },
    lead: {
      en: "One direct and new, one older and through a third country.",
      ar: "أحدهما مباشر وجديد، والآخر أقدم وعبر بلد ثالث.",
    },
    items: [
      {
        saudiSide: { en: "Ramlat Khaliya, past Shaybah", ar: "رملة خليّة، بعد الشيبة" },
        otherSide: { en: "Oman's Empty Quarter post, towards Ibri", ar: "منفذ الربع الخالي العُماني، باتجاه عبري" },
        detail: {
          en: "The direct desert corridor, open since December 2021. Long, remote and the shortest line on a map by a wide margin.",
          ar: "الممر الصحراوي المباشر، مفتوح منذ ديسمبر 2021. طويل ونائٍ، وهو أقصر خط على الخريطة بفارق كبير.",
        },
      },
      {
        saudiSide: { en: "Al Batha, into the UAE", ar: "البطحاء، إلى الإمارات" },
        otherSide: { en: "Onward from the Emirates into Oman", ar: "ثم من الإمارات إلى عُمان" },
        detail: {
          en: "The route everyone used before the desert road opened. It passes through a third country, which means its own entry requirements on top of Oman's.",
          ar: "المسار الذي كان يسلكه الجميع قبل افتتاح الطريق الصحراوي. ويمرّ ببلد ثالث، ما يعني متطلبات دخول خاصة به فوق متطلبات عُمان.",
        },
      },
    ],
    note: {
      en: "Reported opening arrangements have differed between sources and may have changed since. Nothing here is a statement about what is open on your date — confirm that with the authorities, and we will confirm the route with your quotation.",
      ar: "وقد اختلفت التقارير عن ترتيبات العمل بين المصادر وربما تغيّرت منذئذ. ولا شيء هنا إقرار بما هو مفتوح في تاريخك — فتحقّق من ذلك لدى الجهات الرسمية، ونؤكّد نحن المسار مع عرض سعرك.",
    },
  },
  cities: {
    heading: { en: "Where in Oman", ar: "أين في عُمان" },
    lead: {
      en: "The country is long, and the difference between these destinations is substantial rather than marginal.",
      ar: "البلاد ممتدة، والفرق بين هذه الوجهات كبير لا هامشي.",
    },
    items: [
      {
        name: { en: "Muscat", ar: "مسقط" },
        note: {
          en: "The usual destination, on the northern coast. Reached from the desert corridor by way of Ibri and the interior road.",
          ar: "الوجهة المعتادة، على الساحل الشمالي. وتُبلغ من الممر الصحراوي عبر عبري وطريق الداخل.",
        },
      },
      {
        name: { en: "Sohar and the north", ar: "صحار والشمال" },
        note: {
          en: "Closer to the Emirates than to the desert crossing, which is often what makes the older route the better one for these.",
          ar: "أقرب إلى الإمارات منها إلى المعبر الصحراوي، وهذا غالبًا ما يجعل المسار الأقدم أفضل لهذه الوجهات.",
        },
      },
      {
        name: { en: "Salalah and the south", ar: "صلالة والجنوب" },
        note: {
          en: "A very long way south of Muscat. Worth raising early in the enquiry, because it changes the shape of the whole journey.",
          ar: "جنوب مسقط بمسافة طويلة جدًّا. ويستحق الذكر مبكرًا في الطلب، لأنه يغيّر شكل الرحلة كلها.",
        },
      },
    ],
  },
  departures: {
    heading: { en: "Starting from inside Saudi Arabia", ar: "الانطلاق من داخل السعودية" },
    body: {
      en: "The desert corridor is reached from the Batha–Haradh side, which makes the Eastern Province and Riyadh the practical starting points. From further west the journey crosses most of the Kingdom before the corridor even begins, and we would rather discuss that honestly with you than quote it as though it were an ordinary day's drive.",
      ar: "يُبلغ الممر الصحراوي من جهة البطحاء وحرض، ما يجعل المنطقة الشرقية والرياض نقطتَي الانطلاق العمليتين. أما من الغرب فتقطع الرحلة معظم المملكة قبل أن يبدأ الممر أصلًا، ونفضّل مناقشة ذلك معك بصراحة بدل تسعيره كأنه قيادة يوم عادي.",
    },
  },
  vehicles: {
    lead: {
      en: "This is the one route on the list where the road itself is part of the decision. Hours of desert driving with very little in between asks more of a vehicle and of the people in it than a motorway run does.",
      ar: "هذا هو المسار الوحيد في القائمة الذي يكون فيه الطريق نفسه جزءًا من القرار. فساعات القيادة في الصحراء وليس بين الطرفين إلا القليل تتطلب من المركبة ومن ركابها أكثر ممّا يتطلبه طريق سريع.",
    },
    note: {
      en: "Tell us the ages in the party and anything that makes long stretches hard, because on this distance that shapes the choice more than the headcount does. Nothing here says a given category is authorised for the crossing — that is checked for your route and confirmed with the quotation.",
      ar: "أخبرنا بأعمار المجموعة وبكل ما يصعّب المسافات الطويلة، فعلى هذه المسافة يشكّل ذلك الاختيار أكثر ممّا يشكّله العدد. ولا شيء هنا يقول إن فئة بعينها مأذون بها للمعبر — فذلك يُتحقَّق منه لمسارك ويُؤكَّد مع عرض السعر.",
    },
  },
  checklist: {
    heading: { en: "What we need to know first", ar: "ما نحتاج معرفته أولًا" },
    lead: {
      en: "More than the other routes, because the distances here punish vague planning.",
      ar: "أكثر ممّا تحتاجه المسارات الأخرى، لأن المسافات هنا لا تسامح التخطيط الغامض.",
    },
    items: [
      {
        label: { en: "Where in Oman you are going", ar: "إلى أين في عُمان" },
        body: {
          en: "Muscat, Sohar and Salalah are three very different journeys, and they may not even use the same route in.",
          ar: "فمسقط وصحار وصلالة ثلاث رحلات مختلفة جدًّا، وقد لا تسلك المسار نفسه أصلًا.",
        },
      },
      {
        label: { en: "Whether you are willing to go via the UAE", ar: "هل تقبل الذهاب عبر الإمارات" },
        body: {
          en: "It is a real alternative, but it adds a third country's entry requirements. Worth saying early either way.",
          ar: "فهو بديل حقيقي، لكنه يضيف متطلبات دخول بلد ثالث. ويستحق الذكر مبكرًا في الحالين.",
        },
      },
      {
        label: { en: "Your dates, and how fixed they are", ar: "تواريخك، ومدى ثباتها" },
        body: {
          en: "A journey this long has less room to absorb a late start than a short crossing does.",
          ar: "فرحلة بهذا الطول أقل احتمالًا لتأخّر الانطلاق من معبر قصير.",
        },
      },
      {
        label: { en: "Passengers, luggage and anyone with particular needs", ar: "الركاب والأمتعة ومن له احتياج خاص" },
        body: {
          en: "Hours of desert driving are not the same ask as an hour on a causeway. Tell us and it is planned for.",
          ar: "فساعات القيادة في الصحراء ليست كساعة على جسر. أخبرنا ويُخطَّط لذلك.",
        },
      },
      {
        label: { en: "One way, or a return", ar: "ذهابًا فقط، أم عودة" },
        body: {
          en: "On a route this long the return is often its own arrangement rather than the same car waiting.",
          ar: "وفي مسار بهذا الطول تكون العودة غالبًا ترتيبًا مستقلًا لا انتظارًا للسيارة نفسها.",
        },
      },
    ],
  },
  faqs: [
    {
      question: { en: "Is there a direct road from Saudi Arabia to Oman?", ar: "هل هناك طريق مباشر من السعودية إلى عُمان؟" },
      answer: {
        en: "Yes, since December 2021. The Empty Quarter road runs about 725 kilometres from the Batha–Haradh area across the desert, past Shaybah, to the Ramlat Khaliya crossing and on towards Ibri. Before it opened, every road journey between the two countries went through the UAE.",
        ar: "نعم، منذ ديسمبر 2021. ويمتد طريق الربع الخالي نحو 725 كيلومترًا من منطقة البطحاء وحرض عبر الصحراء، مرورًا بالشيبة، إلى معبر رملة خليّة ثم نحو عبري. وقبل افتتاحه كانت كل رحلة برية بين البلدين تمرّ بالإمارات.",
      },
    },
    {
      question: { en: "Is the desert route or the UAE route better?", ar: "أيّهما أفضل: الطريق الصحراوي أم عبر الإمارات؟" },
      answer: {
        en: "It depends on where you are going and what you are willing to deal with. The desert road is far shorter on a map; the Emirates route is longer but passes through populated country and may suit northern Oman better. Going via the UAE also means meeting a third country's entry requirements. We will set out which we are quoting and why.",
        ar: "يعتمد على وجهتك وما أنت مستعد للتعامل معه. فالطريق الصحراوي أقصر بكثير على الخريطة؛ والمسار عبر الإمارات أطول لكنه يمرّ ببلاد عامرة وقد يناسب شمال عُمان أكثر. والمرور بالإمارات يعني كذلك استيفاء متطلبات دخول بلد ثالث. وسنبيّن أيّهما نسعّر ولماذا.",
      },
    },
    {
      question: { en: "How long does the journey take?", ar: "كم تستغرق الرحلة؟" },
      answer: {
        en: "We do not publish durations for any route, and we would be especially reluctant to on this one. What we will do is tell you plainly whether the dates and timings you have in mind are realistic for the distance, before you accept a quotation.",
        ar: "لا ننشر مددًا لأي مسار، وسنكون هنا أشدّ تحفّظًا. وما سنفعله أن نخبرك بصراحة إن كانت التواريخ والتوقيتات التي تتصوّرها واقعية لهذه المسافة، قبل قبولك عرض السعر.",
      },
    },
    {
      question: { en: "Can you take us to Salalah?", ar: "هل تنقلوننا إلى صلالة؟" },
      answer: {
        en: "Ask, and say so at the start of the enquiry rather than at the end. Salalah is a very long way south of Muscat and it changes the whole shape of the journey, so it needs to be part of the planning from the beginning rather than added to it.",
        ar: "اسأل، واذكر ذلك في أول الطلب لا في آخره. فصلالة جنوب مسقط بمسافة طويلة جدًّا وتغيّر شكل الرحلة كله، فيلزم أن تكون جزءًا من التخطيط من البداية لا إضافةً إليه.",
      },
    },
    {
      question: { en: "Does one driver do the whole trip?", ar: "هل يقود سائق واحد الرحلة كلها؟" },
      answer: {
        en: "On a journey of this length, a handover is a normal part of the arrangement on some routes, and on others the same vehicle continues. It follows the route and what is arranged for it, and the quotation tells you which before you accept it.",
        ar: "في رحلة بهذا الطول يكون التسليم جزءًا معتادًا من الترتيب في بعض المسارات، وفي غيرها تُكمل المركبة نفسها. ويتبع ذلك المسار وما رُتّب له، ويخبرك عرض السعر أيّهما قبل قبولك له.",
      },
    },
    {
      question: { en: "What documents do we need?", ar: "ما الوثائق التي نحتاجها؟" },
      answer: {
        en: "That depends on your nationality, your documents and the route — and if you travel via the Emirates, on that country's requirements as well. Check with the official authorities for each country you will enter. We do not advise on entry rules.",
        ar: "يعتمد على جنسيتك ووثائقك والمسار — وإن سافرت عبر الإمارات فعلى متطلبات ذلك البلد أيضًا. فتحقّق لدى الجهات الرسمية لكل بلد ستدخله. ونحن لا نفتي في أنظمة الدخول.",
      },
    },
  ],
  cta: {
    eyebrow: { en: "Saudi Arabia → Oman", ar: "السعودية ← عُمان" },
    heading: { en: "Start the conversation early", ar: "ابدأ الحديث مبكرًا" },
    body: {
      en: "This is the longest journey on the list, so the more you tell us at the start the more useful the first reply will be. Send your pickup, your destination in Oman, your dates and your passenger count.",
      ar: "هذه أطول رحلة في القائمة، فكلما أخبرتنا أكثر في البداية كان أول ردّ أنفع. أرسل موضع استقبالك، ووجهتك في عُمان، وتواريخك، وعدد الركاب.",
    },
    button: { en: "Request an Oman transfer quote", ar: "اطلب عرض سعر إلى عُمان" },
  },
  whatsappMessage: {
    en: "Hello, I would like a quotation for a private transfer from Saudi Arabia to Oman.",
    ar: "السلام عليكم، أرغب في عرض سعر لنقل خاص من السعودية إلى عُمان.",
  },
  related: [
    {
      routeKey: "crossBorderTransfers",
      label: { en: "Cross-border transfers", ar: "النقل عبر الحدود" },
      note: {
        en: "How these journeys are arranged, and the other countries served.",
        ar: "كيف تُرتَّب هذه الرحلات، والبلدان الأخرى المخدومة.",
      },
    },
    {
      routeKey: "saudiToUae",
      label: { en: "Saudi Arabia to the UAE", ar: "من السعودية إلى الإمارات" },
      note: {
        en: "The older way into Oman, and a journey in its own right.",
        ar: "الطريق الأقدم إلى عُمان، ورحلة قائمة بذاتها.",
      },
    },
    {
      routeKey: "alAhsa",
      label: { en: "Al Ahsa", ar: "الأحساء" },
      note: {
        en: "On the way east towards the start of the desert corridor.",
        ar: "في الطريق شرقًا نحو بداية الممر الصحراوي.",
      },
    },
    {
      routeKey: "riyadh",
      label: { en: "Riyadh transfers", ar: "خدمات النقل في الرياض" },
      note: {
        en: "The capital hub, and a common starting point for this route.",
        ar: "مركز العاصمة، ونقطة انطلاق شائعة لهذا المسار.",
      },
    },
  ],
};

/* ========================================================================== */
/*  JORDAN                                                                    */
/* ========================================================================== */

export const jordan: CountryPage = {
  routeKey: "saudiToJordan",
  imageKey: "tabuk-castle",
  seo: {
    title: {
      en: "Saudi Arabia to Jordan Private Transfer | Car and Driver",
      ar: "نقل خاص من السعودية إلى الأردن | سيارة وسائق",
    },
    description: {
      en: "Private car and driver from Saudi Arabia to Amman, Aqaba and Petra, by the Haditha, Halat Ammar or Durra crossing. Written quotation before anything is confirmed.",
      ar: "سيارة خاصة وسائق من السعودية إلى عمّان والعقبة والبتراء، عبر منفذ الحديثة أو حالة عمار أو الدرة. عرض سعر مكتوب قبل أي تأكيد.",
    },
  },
  crumbLabel: { en: "Saudi Arabia to Jordan", ar: "من السعودية إلى الأردن" },
  eyebrow: { en: "Saudi Arabia → Jordan", ar: "السعودية ← الأردن" },
  title: {
    en: "Private transfers from Saudi Arabia to Jordan",
    ar: "نقل خاص من السعودية إلى الأردن",
  },
  standfirst: {
    en: "Every other crossing on this site runs east towards the Gulf. This one runs north-west, and it is the only destination we serve with three separate land ports — which matters, because they come out at opposite ends of Jordan.",
    ar: "كل معبر آخر في هذا الموقع يمضي شرقًا نحو الخليج. أما هذا فيمضي شمالًا غربًا، وهو الوجهة الوحيدة التي نخدمها بثلاثة منافذ برية — وذلك مهم، لأنها تفضي إلى طرفَي الأردن المتقابلَين.",
  },
  primaryCta: { en: "Request a Jordan transfer quote", ar: "اطلب عرض سعر إلى الأردن" },
  dropoffSeed: { en: "Amman, Jordan", ar: "عمّان، الأردن" },
  intro: {
    heading: {
      en: "Three gates, and they do not lead to the same place",
      ar: "ثلاث بوابات، ولا تفضي إلى الموضع نفسه",
    },
    body: [
      {
        en: "Saudi Arabia shares roughly 745 kilometres of border with Jordan and three land ports along it. That is more than we have with any other country on this site, and unlike Kuwait's two — which both end up in Kuwait City — Jordan's three arrive in genuinely different parts of the country.",
        ar: "تمتد حدود السعودية مع الأردن نحو 745 كيلومترًا، وعليها ثلاثة منافذ برية. وهذا أكثر ممّا لدينا مع أي بلد آخر في هذا الموقع، وخلافًا لمعبرَي الكويت — اللذين يفضيان كلاهما إلى مدينة الكويت — فإن منافذ الأردن الثلاثة تصل إلى مناطق مختلفة فعلًا من البلاد.",
      },
      {
        en: "Al-Haditha, in Al-Jouf, faces Al-Omari and opens onto the road to Zarqa and Amman in the north. Ad-Durrah, down on the Gulf of Aqaba in Haql, comes out beside Aqaba itself in the far south. Halat Ammar, in Tabuk, faces Al-Mudawwara in Ma'an governorate, which is the part of Jordan Petra sits in.",
        ar: "فالحديثة، في الجوف، تقابل العُمري وتفضي إلى طريق الزرقاء وعمّان شمالًا. والدرة، على خليج العقبة في حقل، تخرج بجانب العقبة نفسها في أقصى الجنوب. وحالة عمار، في تبوك، تقابل المدوّرة في محافظة معان، وهي الجهة التي تقع فيها البتراء.",
      },
      {
        en: "All three are gates we run journeys through, so the useful question is not which crossing you want — it is where you are starting and where in Jordan you are going. Give us those two and the route follows from them, rather than the other way round.",
        ar: "والمعابر الثلاثة جميعًا بوابات نشغّل الرحلات عبرها، فالسؤال النافع ليس أي معبر تريد — بل من أين تنطلق وإلى أين في الأردن أنت ذاهب. أعطنا هذين ويتبعهما المسار، لا العكس.",
      },
    ],
  },
  crossings: {
    heading: { en: "The three crossings", ar: "المعابر الثلاثة" },
    lead: {
      en: "We run journeys through all three, listed here north to south. Which one your journey uses is not a preference you pick from a menu — it follows from where you are starting and where in Jordan you are going, and it is settled as part of the route planning rather than before you enquire.",
      ar: "نشغّل الرحلات عبر المعابر الثلاثة جميعًا، وهي مرتّبة هنا من الشمال إلى الجنوب. وليس المعبر الذي تسلكه رحلتك تفضيلًا تنتقيه من قائمة — بل يتبع موضع انطلاقك ووجهتك داخل الأردن، ويُحسم ضمن تخطيط المسار لا قبل طلبك.",
    },
    items: [
      {
        saudiSide: { en: "Al-Haditha (Al-Jouf)", ar: "الحديثة (الجوف)" },
        otherSide: { en: "Al-Omari", ar: "العُمري" },
        detail: {
          en: "The Kingdom's largest land port, and the one that opens onto northern Jordan — the road through Zarqa to Amman. Typically the relevant gate when the destination is Amman or the Dead Sea, and the natural line from Al-Jouf, Sakaka, Hail or Riyadh. Whether it is the one your journey uses is confirmed with your quotation.",
          ar: "أكبر منفذ بري في المملكة، وهو الذي يفضي إلى شمال الأردن — طريق الزرقاء إلى عمّان. وهو عادةً البوابة المعنية حين تكون الوجهة عمّان أو البحر الميت، والخط الطبيعي من الجوف وسكاكا وحائل والرياض. أما كونه المعبر الذي تسلكه رحلتك فيُؤكَّد مع عرض سعرك.",
        },
      },
      {
        saudiSide: { en: "Halat Ammar (Tabuk)", ar: "حالة عمار (تبوك)" },
        otherSide: { en: "Al-Mudawwara (Ma'an)", ar: "المدوّرة (معان)" },
        detail: {
          en: "The inland crossing in the north-west, facing Ma'an governorate — the part of Jordan Petra and Wadi Rum sit in, which makes it the gate those destinations usually point to. Commonly reached from Tabuk, AlUla or Madinah. Traveller movement through it is notably active in the Hajj and Umrah seasons, when Jordanian and Palestinian pilgrims use it.",
          ar: "المعبر الداخلي في الشمال الغربي، ويقابل محافظة معان — وهي الجهة التي تقع فيها البتراء ووادي رم، ما يجعله البوابة التي تشير إليها هاتان الوجهتان عادةً. ويُبلغ غالبًا من تبوك أو العُلا أو المدينة المنورة. وحركة المسافرين عبره نشطة بوضوح في موسمَي الحج والعمرة، حين يسلكه الحجاج الأردنيون والفلسطينيون.",
        },
      },
      {
        saudiSide: { en: "Ad-Durrah (Haql, Tabuk)", ar: "الدرة (حقل، تبوك)" },
        otherSide: { en: "Durra, beside Aqaba", ar: "الدرة، بجوار العقبة" },
        detail: {
          en: "On the Gulf of Aqaba in Haql governorate, overlooking the water. The shortest line to Aqaba by a long way, so it is the gate an Aqaba destination usually points to, and it sits closest to a Tabuk or Haql pickup. The Jordanian terminal there is run by the Aqaba Special Economic Zone Authority.",
          ar: "على خليج العقبة في محافظة حقل، مطلّة على الماء. وهي أقصر خط إلى العقبة بفارق كبير، فهي البوابة التي تشير إليها عادةً وجهةٌ في العقبة، وهي الأقرب إلى استقبال من تبوك أو حقل. ويدير محطتها من الجانب الأردني سلطة منطقة العقبة الاقتصادية الخاصة.",
        },
      },
    ],
    note: {
      en: "Pairings like these are the usual shape rather than a rule, and listing all three does not mean every Saudi starting point can be matched to every Jordanian destination on every date. All three have also been closed for maintenance at times, with traffic redirected to the others. We publish no hours, lanes or procedures for any of them — confirm the current position with the Saudi and Jordanian authorities before you travel, and we will confirm the route, and whether your particular journey can be covered, with your quotation.",
      ar: "وهذه المقارنات هي الشكل المعتاد لا قاعدة ملزمة، وذكر المعابر الثلاثة لا يعني إمكان مطابقة كل نقطة انطلاق سعودية بكل وجهة أردنية في كل تاريخ. كما أُغلقت الثلاثة للصيانة في أوقات مختلفة، وحُوّلت الحركة إلى غيرها. ولا ننشر مواعيد ولا مسارات ولا إجراءات لأيٍّ منها — فتحقّق من الوضع الحالي لدى الجهات السعودية والأردنية قبل السفر، ونؤكّد نحن المسار، وإمكان تغطية رحلتك تحديدًا، مع عرض سعرك.",
    },
  },
  cities: {
    heading: { en: "Where in Jordan", ar: "أين في الأردن" },
    lead: {
      en: "Jordan is long from north to south, and the destination decides the crossing rather than the reverse. These are the ones people ask for.",
      ar: "الأردن ممتدة من الشمال إلى الجنوب، والوجهة هي التي تحدّد المعبر لا العكس. وهذه أكثر ما يُطلب.",
    },
    items: [
      {
        name: { en: "Amman", ar: "عمّان" },
        note: {
          en: "The capital, in the north, usually reached through Al-Haditha and Al-Omari. An address or district helps — the city is spread across a lot of hills.",
          ar: "العاصمة، في الشمال، وتُبلغ عادةً عبر الحديثة والعُمري. ويفيد ذكر عنوان أو حي — فالمدينة ممتدة على تلال كثيرة.",
        },
      },
      {
        name: { en: "Aqaba", ar: "العقبة" },
        note: {
          en: "On the Red Sea in the far south, and the one destination where the crossing choice is obvious: Ad-Durrah comes out next to it.",
          ar: "على البحر الأحمر في أقصى الجنوب، وهي الوجهة الوحيدة التي يكون فيها اختيار المعبر بديهيًا: فالدرة تخرج بجوارها.",
        },
      },
      {
        name: { en: "Petra and Wadi Musa", ar: "البتراء ووادي موسى" },
        note: {
          en: "In Ma'an governorate in the south, inland from Aqaba. Worth naming specifically rather than saying 'southern Jordan', because it changes which gate makes sense.",
          ar: "في محافظة معان جنوبًا، في الداخل بعيدًا عن العقبة. ويستحق التسمية تحديدًا بدل قول «جنوب الأردن»، لأنه يغيّر البوابة الأنسب.",
        },
      },
      {
        name: { en: "Wadi Rum", ar: "وادي رم" },
        note: {
          en: "The desert south of Petra and inland from Aqaba. Say where you are staying, since accommodation there is scattered rather than in one town.",
          ar: "الصحراء جنوب البتراء وداخلًا عن العقبة. فاذكر مكان إقامتك، لأن أماكن النزول هناك متفرقة لا متجمّعة في بلدة واحدة.",
        },
      },
      {
        name: { en: "The Dead Sea", ar: "البحر الميت" },
        note: {
          en: "West of Amman, down in the rift. Normally approached from the north after Al-Omari rather than from the southern crossings.",
          ar: "غرب عمّان، في الأخدود. ويُقارَب عادةً من الشمال بعد العُمري لا من المعابر الجنوبية.",
        },
      },
    ],
  },
  departures: {
    heading: { en: "The north-west is the near side here", ar: "الشمال الغربي هو الجانب القريب هنا" },
    body: {
      en: "This is the one route where the Eastern Province is the far side of the country rather than the near one, and where you start narrows the gate before the destination has even been considered. Tabuk and Haql sit closest to Ad-Durrah and Halat Ammar, which is why a Tabuk pickup pairs so naturally with Aqaba or Petra. Al-Jouf and Sakaka sit by Al-Haditha, the northern gate towards Amman. AlUla and Madinah are a reasonable run north to the Tabuk gates. From Riyadh the northern crossing is usually the sensible line; from Jeddah every option is a long haul north-west. All of these are quoted, but the distances are real, and where a combination does not make sense we will say so rather than let a date get fixed around a guess.",
      ar: "هذا هو المسار الوحيد الذي تكون فيه المنطقة الشرقية الجانب البعيد من البلاد لا القريب، والذي يضيّق فيه موضعُ انطلاقك البوابةَ قبل النظر في الوجهة أصلًا. فتبوك وحقل الأقرب إلى الدرة وحالة عمار، ولهذا يتلاءم استقبالٌ من تبوك تلاؤمًا طبيعيًا مع العقبة أو البتراء. والجوف وسكاكا بجوار الحديثة، البوابة الشمالية نحو عمّان. والعُلا والمدينة المنورة مسافة معقولة شمالًا إلى بوابتَي تبوك. ومن الرياض يكون المعبر الشمالي هو الخط المعقول عادةً؛ ومن جدة تكون كل الخيارات طريقًا طويلًا شمالًا غربًا. وكل هذه تُسعَّر، لكن المسافات حقيقية، وحيث لا يكون الجمع بينها معقولًا نقول ذلك بدل ترك التاريخ يُثبَّت على تخمين.",
    },
  },
  vehicles: {
    lead: {
      en: "Surfaced road throughout on all three approaches, so the vehicle follows the party rather than the terrain. What is unusual here is the spread: a run to Aqaba from Tabuk and a run to Amman from Riyadh are not remotely the same day, and the right car is not always the same car.",
      ar: "الطريق معبّد في المقاربات الثلاث جميعًا، فالمركبة تتبع المجموعة لا طبيعة الأرض. وغير المعتاد هنا هو التباين: فرحلة إلى العقبة من تبوك ورحلة إلى عمّان من الرياض ليستا اليوم نفسه ولا قريبًا من ذلك، وليست السيارة المناسبة واحدة دائمًا.",
    },
    note: {
      en: "If the journey is a long one and you are travelling with children or anyone who finds long stretches hard, say so and the choice is made around that. Nothing listed here is a statement that a category is authorised for a particular crossing — that is checked for your route and confirmed with the quotation.",
      ar: "وإن كانت الرحلة طويلة وكنت مسافرًا مع أطفال أو مع من يشقّ عليه طول الطريق، فاذكر ذلك ليُبنى الاختيار عليه. ولا شيء مذكور هنا إقرار بأن فئة مأذون بها لمعبر بعينه — فذلك يُتحقَّق منه لمسارك ويُؤكَّد مع عرض السعر.",
    },
  },
  checklist: {
    heading: { en: "What to put in the enquiry", ar: "ما تضعه في الطلب" },
    lead: {
      en: "With three possible gates, the destination does more work here than on any other route in the cluster.",
      ar: "مع ثلاث بوابات محتملة، تؤدي الوجهة هنا دورًا أكبر ممّا تؤديه في أي مسار آخر في هذه المجموعة.",
    },
    items: [
      {
        label: { en: "Where in Jordan, by name", ar: "أين في الأردن، بالاسم" },
        body: {
          en: "Amman and Aqaba are at opposite ends and use different crossings. 'Jordan' on its own cannot be routed.",
          ar: "فعمّان والعقبة في طرفين متقابلين وتستخدمان معبرين مختلفين. و«الأردن» وحدها لا يمكن رسم مسار لها.",
        },
      },
      {
        label: { en: "Your pickup address", ar: "عنوان استقبالك" },
        body: {
          en: "Starting in Tabuk and starting in Riyadh produce completely different quotations for the same destination.",
          ar: "فالانطلاق من تبوك والانطلاق من الرياض ينتجان عرضَي سعر مختلفين تمامًا للوجهة نفسها.",
        },
      },
      {
        label: { en: "The date, and how firm it is", ar: "التاريخ، ومدى ثباته" },
        body: {
          en: "Crossings here have been closed for maintenance before, with traffic sent to another gate. Flexibility is worth mentioning.",
          ar: "فقد أُغلقت المعابر هنا للصيانة من قبل، وحُوّلت الحركة إلى بوابة أخرى. ويستحق ذكرُ المرونة.",
        },
      },
      {
        label: { en: "Passengers and luggage", ar: "الركاب والأمتعة" },
        body: {
          en: "The usual pair, and they decide the vehicle before anything else does.",
          ar: "الزوج المعتاد، وهما يحدّدان المركبة قبل أي شيء آخر.",
        },
      },
      {
        label: { en: "Whether you are coming back", ar: "هل ستعود" },
        body: {
          en: "A return is quoted with the outbound leg. On a journey this long it is often its own arrangement rather than a car waiting.",
          ar: "تُسعَّر العودة مع رحلة الذهاب. وفي رحلة بهذا الطول تكون غالبًا ترتيبًا مستقلًا لا انتظارًا لسيارة.",
        },
      },
    ],
  },
  faqs: [
    {
      question: {
        en: "Does the crossing depend on where in Jordan we are going?",
        ar: "هل يعتمد المعبر على وجهتنا داخل الأردن؟",
      },
      answer: {
        en: "Almost entirely. Al-Haditha opens onto the north and the road to Amman; Ad-Durrah comes out beside Aqaba in the far south; Halat Ammar faces Ma'an governorate in between. Give the destination and the gate follows from it — you do not need to pick one yourself.",
        ar: "كليًّا تقريبًا. فالحديثة تفضي إلى الشمال وطريق عمّان؛ والدرة تخرج بجوار العقبة في أقصى الجنوب؛ وحالة عمار تقابل محافظة معان بينهما. فأعطِ الوجهة ويتبعها المعبر — ولا يلزمك اختيار واحد بنفسك.",
      },
    },
    {
      question: { en: "Can you take us to Petra?", ar: "هل تنقلوننا إلى البتراء؟" },
      answer: {
        en: "Enquiries for it are taken. Petra sits at Wadi Musa in Ma'an governorate in southern Jordan, so it is reached through the southern end of the border rather than through Amman. Name it specifically in the enquiry — 'southern Jordan' is not precise enough to route.",
        ar: "تُستقبَل الطلبات إليها. وتقع البتراء في وادي موسى بمحافظة معان جنوب الأردن، فتُبلغ من الطرف الجنوبي للحدود لا عبر عمّان. فسمِّها تحديدًا في الطلب — فـ«جنوب الأردن» ليست دقيقة بما يكفي لرسم مسار.",
      },
    },
    {
      question: {
        en: "We are starting from Tabuk — is that an advantage?",
        ar: "ننطلق من تبوك — هل في ذلك أفضلية؟",
      },
      answer: {
        en: "For Jordan, yes, and it is the one destination on this site where that is true. Tabuk province holds two of the three crossings, including Ad-Durrah at Haql on the Gulf of Aqaba. For every other country we serve, the Eastern Province is the near side; for Jordan it is the far one.",
        ar: "للأردن نعم، وهي الوجهة الوحيدة في هذا الموقع التي يصحّ فيها ذلك. فمنطقة تبوك تضمّ اثنين من المعابر الثلاثة، منها الدرة في حقل على خليج العقبة. أما سائر البلدان التي نخدمها فالمنطقة الشرقية هي جانبها القريب؛ وفي الأردن هي البعيد.",
      },
    },
    {
      question: {
        en: "Can we travel to Jordan from Madinah or Jeddah?",
        ar: "هل نسافر إلى الأردن من المدينة المنورة أو جدة؟",
      },
      answer: {
        en: "You can ask from either. Madinah is a reasonable run north; Jeddah is considerably further and is a different scale of journey. Both are reviewed on the actual distance rather than waved through, and if the timing you have in mind does not fit we will say so before you accept anything.",
        ar: "يمكنك الطلب من أيٍّ منهما. فالمدينة المنورة مسافة معقولة شمالًا؛ وجدة أبعد بكثير وهي مقياس آخر للرحلة. ويُراجَع الاثنان على المسافة الفعلية لا يُمرَّران مجاملةً، وإن كان التوقيت الذي تتصوّره لا يناسب قلنا ذلك قبل أن تقبل شيئًا.",
      },
    },
    {
      question: {
        en: "Who decides whether we are allowed into Jordan?",
        ar: "من يقرّر السماح لنا بدخول الأردن؟",
      },
      answer: {
        en: "The Jordanian authorities at the border, on the day, according to your nationality and documents and the rules then in force. Arranging a car with us has no bearing on it, and we do not advise on entry requirements — check them with the official authorities of both countries before you travel.",
        ar: "الجهات الأردنية عند الحدود، في حينه، بحسب جنسيتك ووثائقك والأنظمة السارية عندئذ. ولا أثر لترتيب سيارة معنا في ذلك، ونحن لا نفتي في شروط الدخول — فتحقّق منها لدى الجهات الرسمية في البلدين قبل السفر.",
      },
    },
    {
      question: {
        en: "Could the crossing be closed when we travel?",
        ar: "هل يمكن أن يكون المعبر مغلقًا وقت سفرنا؟",
      },
      answer: {
        en: "It has happened: these ports have each been shut for maintenance at times, with traffic sent to one of the others. That is one reason we confirm the route in the quotation rather than earlier, and a reason to mention it if your dates are not movable.",
        ar: "قد حدث ذلك: فقد أُغلق كلٌّ من هذه المنافذ للصيانة في أوقات، وحُوّلت الحركة إلى غيره. وهذا أحد أسباب تأكيدنا المسار في عرض السعر لا قبله، وسبب لذكر الأمر إن كانت تواريخك غير قابلة للتغيير.",
      },
    },
  ],
  cta: {
    eyebrow: { en: "Saudi Arabia → Jordan", ar: "السعودية ← الأردن" },
    heading: { en: "Tell us which end of Jordan", ar: "أخبرنا أي طرف من الأردن" },
    body: {
      en: "Send your pickup address, the city or site you are heading for, the date and how many of you are travelling. We will work out which crossing the route should use and reply with a written quotation.",
      ar: "أرسل عنوان استقبالك، والمدينة أو الموضع الذي تقصده، والتاريخ، وعددكم. سنحدّد المعبر الذي ينبغي أن يسلكه المسار ونرد بعرض سعر مكتوب.",
    },
    button: { en: "Request a Jordan transfer quote", ar: "اطلب عرض سعر إلى الأردن" },
  },
  whatsappMessage: {
    en: "Hello, I would like a quotation for a private transfer from Saudi Arabia to Jordan.",
    ar: "السلام عليكم، أرغب في عرض سعر لنقل خاص من السعودية إلى الأردن.",
  },
  related: [
    {
      routeKey: "crossBorderTransfers",
      label: { en: "Cross-border transfers", ar: "النقل عبر الحدود" },
      note: {
        en: "How these journeys are arranged in general, and the other countries served.",
        ar: "كيف تُرتَّب هذه الرحلات عمومًا، والبلدان الأخرى المخدومة.",
      },
    },
    {
      routeKey: "tabuk",
      label: { en: "Tabuk transfers", ar: "خدمات النقل في تبوك" },
      note: {
        en: "The province holding two of the three crossings, and the nearest Saudi base for this route.",
        ar: "المنطقة التي تضمّ اثنين من المعابر الثلاثة، وأقرب قاعدة سعودية لهذا المسار.",
      },
    },
    {
      routeKey: "alula",
      label: { en: "AlUla", ar: "العُلا" },
      note: {
        en: "On the road north, and home to Hegra — carved by the same Nabataeans who built Petra.",
        ar: "على الطريق شمالًا، وفيها الحِجر — من نحت الأنباط أنفسهم الذين بنوا البتراء.",
      },
    },
    {
      routeKey: "madinah",
      label: { en: "Madinah transfers", ar: "خدمات النقل في المدينة المنورة" },
      note: {
        en: "A common starting point for the run north-west towards the border.",
        ar: "نقطة انطلاق شائعة للطريق شمالًا غربًا نحو الحدود.",
      },
    },
  ],
};

export const countryPages: CountryPage[] = [
  uae,
  bahrain,
  qatar,
  kuwait,
  oman,
  jordan,
];
