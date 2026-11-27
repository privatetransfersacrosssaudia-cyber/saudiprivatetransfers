import type { Bilingual } from "@/lib/i18n/config";
import type { SiteImageKey } from "@/lib/site-images";
import type { RouteKey } from "@/lib/i18n/routes";
import type { ClusterFaq, RelatedLink } from "@/lib/content/riyadh/types";

/**
 * Cross-border transfers from Saudi Arabia.
 *
 * ## The idea the page is built on
 *
 * Every domestic journey on this site is continuous: one car, one driver,
 * pickup to drop-off. An international one has **a seam in it**. At the
 * border the arrangement may carry straight on, or it may change hands —
 * and which of those happens is not the customer's to choose. It depends on
 * the country, the route and what is permitted and arranged on the day.
 *
 * So the page is organised around that seam rather than around countries.
 * The journey diagram shows one line crossing a border and splits it into
 * the two honest outcomes; the destination section says what an enquiry to
 * each country actually means; and the planning section is about what has to
 * be known *before* the quotation, because that is the real work.
 *
 * ## Two things this page deliberately does not do
 *
 * **It publishes no photograph of any destination country.** This project
 * holds no image of Dubai, Doha, Kuwait City, Muscat or the Bahrain skyline
 * — the only border asset is the King Fahd Causeway. Rather than label a
 * generic skyline as a city it is not, the destination section is
 * typographic. The gap is reported rather than papered over.
 *
 * **It does not give immigration advice.** Entry rules depend on nationality,
 * document, vehicle and the day, and they change. The page says consistently
 * that those are checked with the official authorities, and never reproduces
 * a requirement we cannot stand behind.
 *
 * ## Bahrain
 *
 * This page once carried a caveat saying our Bahrain journeys stopped at the
 * Saudi side of the causeway, because that is what the rest of the site said
 * at the time and contradicting a live page on the strength of a brief would
 * have been the wrong way round. The owner has since confirmed the opposite:
 * journeys run from anywhere in the Kingdom, across the causeway, and on to
 * destinations inside Bahrain.
 *
 * The caveat is gone and the whole site was swept for the old wording, which
 * had spread into eleven files including the Terms page. What stays is the
 * part that was never about Bahrain: whether one car makes the whole trip
 * depends on the route, and the quotation says which it is.
 *
 * ## Yemen
 *
 * Omitted from the destination list. The owner lists it, but it cannot be
 * represented responsibly from here: current security conditions, lawful
 * operating arrangements and actual route capability are not verifiable in
 * this session, and a landing page that invites enquiries for travel into
 * Yemen without that verification is not something to publish on a guess.
 * It is flagged for the owner rather than half-included.
 *
 * Jordan was added once the owner confirmed it, and has its own page like
 * the others. Iraq is still not listed: it has not been confirmed.
 */

export type BorderCountry = {
  id: string;
  /** The country's own page under this hub. */
  routeKey: RouteKey;
  name: Bilingual<string>;
  /** Rendered large; the Arabic is the customary short form. */
  article: Bilingual<string>;
  /** What an enquiry to this country actually means today. */
  body: Bilingual<string>;
  /** A caveat specific to this country, where one is warranted. */
  caveat?: Bilingual<string>;
  /** Only Bahrain has a genuine, accurate photograph in this project. */
  imageKey?: SiteImageKey;
};

export const crossBorder = {
  routeKey: "crossBorderTransfers" as const,
  imageKey: "coverage" as SiteImageKey,

  seo: {
    title: {
      en: "Cross-Border Transfers from Saudi Arabia | Private Car",
      ar: "النقل عبر الحدود من السعودية | سيارة خاصة",
    },
    description: {
      en: "Private cross-border transfers from cities across Saudi Arabia to the UAE, Bahrain, Qatar, Kuwait, Oman and Jordan. Driver and border arrangements are confirmed in writing before anything is booked.",
      ar: "نقل خاص عبر الحدود من مدن السعودية إلى الإمارات والبحرين وقطر والكويت وعُمان والأردن. وتُؤكَّد ترتيبات السائق والحدود كتابةً قبل أي حجز.",
    },
  },

  crumbLabel: { en: "Cross-border transfers", ar: "النقل عبر الحدود" },
  eyebrow: { en: "Cross-border transfers", ar: "النقل عبر الحدود" },

  title: {
    en: "Private cross-border transfers from Saudi Arabia",
    ar: "نقل خاص عبر الحدود انطلاقًا من السعودية",
  },

  standfirst: {
    en: "A road journey that leaves the country takes more arranging than one that stays inside it. Where you start, which country you are heading for, who drives each part and what happens at the border all have to be settled before the journey is confirmed — and all of it comes back to you in writing first.",
    ar: "الرحلة البرية التي تغادر البلاد تحتاج ترتيبًا أكثر من التي تبقى داخلها. فنقطة انطلاقك، والبلد الذي تقصده، ومن يقود كل جزء، وما يجري عند الحدود — كل ذلك يُحسم قبل تأكيد الرحلة، ويصلك مكتوبًا أولًا.",
  },

  primaryCta: { en: "Request a cross-border quote", ar: "اطلب عرض سعر عبر الحدود" },
  secondaryCta: { en: "Explore destinations", ar: "استعرض الوجهات" },

  /** §6 + §11 — the seam, and the two honest outcomes at it. */
  seam: {
    heading: {
      en: "Every international journey has a seam in it",
      ar: "لكل رحلة دولية خيط وصل",
    },
    lead: {
      en: "Inside the Kingdom a private transfer is one continuous thing: the same car, the same driver, your door to your destination. Cross a border and the journey has a joint in the middle of it — and what happens at that joint is the single most useful thing to understand before you enquire.",
      ar: "داخل المملكة يكون النقل الخاص شيئًا واحدًا متصلًا: السيارة نفسها، والسائق نفسه، من بابك إلى وجهتك. أما عبور الحدود فيجعل للرحلة مفصلًا في وسطها — وفهم ما يجري عند ذلك المفصل أنفع ما تعرفه قبل أن تطلب.",
    },
    saudiLeg: { en: "Your pickup in Saudi Arabia", ar: "استقبالك داخل السعودية" },
    borderLabel: { en: "The border", ar: "الحدود" },
    models: [
      {
        id: "continue",
        tag: { en: "Model A", ar: "الحالة أ" },
        label: { en: "The same car carries on", ar: "السيارة نفسها تُكمل" },
        body: {
          en: "Where it is permitted and has been arranged for that route, the driver and vehicle you started with continue across and take you to the destination.",
          ar: "حيث يكون ذلك مسموحًا ومُرتَّبًا لذلك المسار، يُكمل السائق والمركبة اللذان انطلقت بهما العبور ويوصلانك إلى الوجهة.",
        },
      },
      {
        id: "handover",
        tag: { en: "Model B", ar: "الحالة ب" },
        label: { en: "The journey changes hands", ar: "الرحلة تنتقل إلى يد أخرى" },
        body: {
          en: "On other routes a different driver or vehicle takes over once the border is behind you, and carries on to the destination from there.",
          ar: "وفي مسارات أخرى يتسلّم سائق أو مركبة مختلفة بعد اجتياز الحدود، ويُكمل بك إلى الوجهة من هناك.",
        },
      },
    ],
    note: {
      en: "Which of the two applies is not something you pick from a menu. It follows the country, the route and what is permitted and arranged at the time — so it is checked for your journey and written into the quotation before you accept it. Anyone who tells you the answer before looking at the route is guessing.",
      ar: "وليس اختيار إحدى الحالتين أمرًا تنتقيه من قائمة. فهو يتبع البلد والمسار وما هو مسموح ومُرتَّب حينها — لذا يُتحقَّق منه لرحلتك ويُكتب في عرض السعر قبل قبولك له. ومن يخبرك بالجواب قبل النظر في المسار فإنما يخمّن.",
    },
  },

  /** §9 — typographic, because no destination photography exists here. */
  destinations: {
    heading: { en: "Where journeys currently go", ar: "إلى أين تذهب الرحلات حاليًا" },
    lead: {
      en: "These are the countries the owner currently takes enquiries for. Listing a country here means an enquiry is welcome and will be looked at properly — it does not mean a particular route, city or date is available, and none of that is settled until the quotation.",
      ar: "هذه هي البلدان التي تُستقبَل الطلبات إليها حاليًا. ووجود بلد هنا يعني أن الطلب مرحَّب به وسيُدرَس كما ينبغي — لا أن مسارًا أو مدينة أو تاريخًا بعينه متاح، ولا يُحسم شيء من ذلك قبل عرض السعر.",
    },
    countries: [
      {
        id: "uae",
        routeKey: "saudiToUae",
        name: { en: "United Arab Emirates", ar: "الإمارات العربية المتحدة" },
        article: { en: "the UAE", ar: "الإمارات" },
        body: {
          en: "The most commonly asked-for crossing, usually from the Eastern Province or Riyadh, and Dubai is the destination people name most often. Other Emirates are asked about too — which of them works on your date is part of what the quotation answers rather than something to assume here.",
          ar: "أكثر العبور طلبًا، وغالبًا من المنطقة الشرقية أو الرياض، ودبي أكثر الوجهات تسميةً. ويُسأل عن إمارات أخرى كذلك — وأيّها يصلح في تاريخك جزء ممّا يجيب عنه عرض السعر لا ممّا يُفترض هنا.",
        },
      },
      {
        id: "bahrain",
        routeKey: "saudiToBahrainTransfers",
        name: { en: "Bahrain", ar: "البحرين" },
        article: { en: "Bahrain", ar: "البحرين" },
        body: {
          en: "Reached by the King Fahd Causeway from Al Khobar, and the crossing most travellers from the Eastern Province already know. Pickup can be from anywhere in the Kingdom, and the destination can be an address in Bahrain rather than a drop-off short of it.",
          ar: "يُبلغ عبر جسر الملك فهد من الخبر، وهو المعبر الذي يعرفه أصلًا معظم المسافرين من المنطقة الشرقية. ويمكن أن يكون الاستقبال من أي مكان في المملكة، والوجهة عنوانًا داخل البحرين لا نقطة نزول دونه.",
        },
        caveat: {
          en: "Journeys run from anywhere in the Kingdom, across the causeway, and on to an address in Bahrain — the crossing is not where we stop. Whether the car you set off in is the car that arrives depends on the route, and that is settled in the quotation rather than assumed here.",
          ar: "تنطلق الرحلات من أي مكان في المملكة، وتعبر الجسر، وتصل إلى عنوان داخل البحرين — فالمعبر ليس حيث نتوقف. أما كون السيارة التي انطلقت بها هي التي تصل، فيعتمد على المسار، ويُحسم في عرض السعر لا بافتراض هنا.",
        },
        imageKey: "svc-border",
      },
      {
        id: "qatar",
        routeKey: "saudiToQatar",
        name: { en: "Qatar", ar: "قطر" },
        article: { en: "Qatar", ar: "قطر" },
        body: {
          en: "A land journey south-east through the Eastern Province to the one land crossing the two countries share. Enquiries are taken; the route and the arrangement at the border are confirmed for the specific journey.",
          ar: "رحلة برية جنوبًا شرقًا عبر المنطقة الشرقية إلى المعبر البري الوحيد بين البلدين. تُستقبَل الطلبات، ويُؤكَّد المسار والترتيب عند الحدود لكل رحلة بعينها.",
        },
      },
      {
        id: "kuwait",
        routeKey: "saudiToKuwait",
        name: { en: "Kuwait", ar: "الكويت" },
        article: { en: "Kuwait", ar: "الكويت" },
        body: {
          en: "North up the Gulf coast from the Eastern Province, or the long run from Riyadh. Which crossing and what happens at it are settled for your route before you accept anything.",
          ar: "شمالًا على ساحل الخليج من المنطقة الشرقية، أو الطريق الطويل من الرياض. ويُحسم أي معبر وما يجري عنده لمسارك قبل أن تقبل شيئًا.",
        },
      },
      {
        id: "jordan",
        routeKey: "saudiToJordan",
        name: { en: "Jordan", ar: "الأردن" },
        article: { en: "Jordan", ar: "الأردن" },
        body: {
          en: "The one destination here reached north-west rather than east, and the only one with three land ports — all of which we run journeys through. That matters because they come out at opposite ends of the country: the road to Amman, the crossing beside Aqaba, and the gate facing Ma'an where Petra sits, so the one your journey uses follows your pickup and destination.",
          ar: "الوجهة الوحيدة هنا التي تُبلغ شمالًا غربًا لا شرقًا، والوحيدة ذات ثلاثة منافذ برية — نشغّل الرحلات عبرها جميعًا. وذلك مهم لأنها تفضي إلى طرفَي البلاد: طريق عمّان، والمعبر بجوار العقبة، والبوابة المقابلة لمعان حيث تقع البتراء، فالمعبر الذي تسلكه رحلتك يتبع موضع استقبالك ووجهتك.",
        },
      },
      {
        id: "oman",
        routeKey: "saudiToOman",
        name: { en: "Oman", ar: "سلطنة عُمان" },
        article: { en: "Oman", ar: "عُمان" },
        body: {
          en: "The longest of these by road, and the one where the planning matters most — distance, the crossing used and the arrangement beyond it all need looking at together rather than one at a time.",
          ar: "أطولها برًّا، وأكثرها حاجةً إلى التخطيط — فالمسافة والمعبر المستخدم والترتيب بعده أمور يُنظر فيها مجتمعةً لا واحدًا تلو الآخر.",
        },
      },
    ] satisfies BorderCountry[],
    scope: {
      en: "Iraq is not on this list, and that is deliberate — it is not a confirmed operating destination, so there is nothing here to enquire about yet. Jordan was in the same position until recently and now has a page of its own.",
      ar: "ولا يرد العراق في هذه القائمة، وذلك مقصود — فهو ليس وجهة تشغيل مؤكَّدة، فلا شيء هنا يُطلب بشأنه بعد. وقد كانت الأردن في الموضع نفسه حتى وقت قريب، ولها اليوم صفحتها الخاصة.",
    },
    imageGap: {
      en: "There are no destination photographs on this page. We hold an honest picture of the causeway and of the roads inside the Kingdom, and none of the cities across these borders — so rather than put a stock skyline under a country's name and let you assume it was ours, there is nothing.",
      ar: "ولا توجد صور للوجهات في هذه الصفحة. فلدينا صورة صادقة للجسر وللطرق داخل المملكة، ولا شيء من مدن ما وراء هذه الحدود — وبدل وضع صورة جاهزة تحت اسم بلد وتركك تظن أنها لنا، فضّلنا ألا نضع شيئًا.",
    },
  },

  /** §10 */
  departures: {
    heading: { en: "Where the journey can start", ar: "من أين تبدأ الرحلة" },
    lead: {
      en: "Pickup can be requested from any city in the Kingdom, subject to the quotation and to availability on your date. These are the places people most often set out from, grouped the way the roads actually run.",
      ar: "يمكن طلب الاستقبال من أي مدينة في المملكة، رهنًا بعرض السعر وبالتوافر في تاريخك. وهذه أكثر المواضع انطلاقًا، مرتّبة وفق امتداد الطرق فعلًا.",
    },
    groups: [
      {
        label: { en: "Eastern Province", ar: "المنطقة الشرقية" },
        note: {
          en: "Closest to the Bahrain, Qatar and Kuwait crossings, and the usual starting point for them.",
          ar: "الأقرب إلى معابر البحرين وقطر والكويت، ونقطة الانطلاق المعتادة إليها.",
        },
        cities: {
          en: ["Dammam", "Al Khobar", "Dhahran", "Jubail", "Al Ahsa"],
          ar: ["الدمام", "الخبر", "الظهران", "الجبيل", "الأحساء"],
        },
      },
      {
        label: { en: "Central region", ar: "المنطقة الوسطى" },
        note: {
          en: "The capital and the towns around it, with a long first leg east or north before any border.",
          ar: "العاصمة والبلدات حولها، بمرحلة أولى طويلة شرقًا أو شمالًا قبل أي حدود.",
        },
        cities: {
          en: ["Riyadh", "Al Kharj", "Shaqra", "Buraydah"],
          ar: ["الرياض", "الخرج", "شقراء", "بريدة"],
        },
      },
      {
        label: { en: "Western region", ar: "المنطقة الغربية" },
        note: {
          en: "The Red Sea side. Every border on this page is a long way east of here, which is the first thing to weigh.",
          ar: "جهة البحر الأحمر. وكل حدود في هذه الصفحة تبعد شرقًا كثيرًا عن هنا، وذلك أول ما يُوزن.",
        },
        cities: {
          en: ["Jeddah", "Makkah", "Madinah", "Taif", "Yanbu"],
          ar: ["جدة", "مكة المكرمة", "المدينة المنورة", "الطائف", "ينبع"],
        },
      },
      {
        label: { en: "Northern and southern", ar: "الشمال والجنوب" },
        note: {
          en: "Further out again. Practical for some journeys and not for others, which is exactly what the review is for.",
          ar: "أبعد كذلك. عملية لبعض الرحلات دون غيرها، وهذا بالضبط ما تُراجَع لأجله.",
        },
        cities: {
          en: ["Tabuk", "Hail", "Abha", "Jazan", "Najran"],
          ar: ["تبوك", "حائل", "أبها", "جازان", "نجران"],
        },
      },
    ],
    note: {
      en: "A city appearing here says the pickup can be asked for, not that every country on this page is sensible from it. A Jeddah-to-Oman request and a Khobar-to-Bahrain one are not remotely the same journey, and they are not reviewed as though they were.",
      ar: "ووجود مدينة هنا يقول إن الاستقبال يمكن طلبه منها، لا إن كل بلد في هذه الصفحة معقول انطلاقًا منها. فطلب من جدة إلى عُمان وآخر من الخبر إلى البحرين ليسا الرحلة نفسها ولا قريبًا من ذلك، ولا يُراجَعان كأنهما كذلك.",
    },
  },

  /** §12 */
  planning: {
    heading: { en: "What the quotation needs to know", ar: "ما يحتاج عرض السعر معرفته" },
    lead: {
      en: "An international journey is quoted on more than distance. The more of this your enquiry answers, the closer the first reply is to a real price rather than a list of questions.",
      ar: "لا تُسعَّر الرحلة الدولية على المسافة وحدها. وكلما أجاب طلبك عن المزيد من هذا، اقترب أول ردّ من سعر حقيقي لا من قائمة أسئلة.",
    },
    items: [
      {
        label: { en: "The exact pickup address", ar: "عنوان الاستقبال بالضبط" },
        body: {
          en: "Not just the city. The first leg to the border is measured from the door you are standing at.",
          ar: "لا اسم المدينة فقط. فالمرحلة الأولى إلى الحدود تُقاس من الباب الذي تقف عنده.",
        },
      },
      {
        label: { en: "The destination, as precisely as you can", ar: "الوجهة، بأدقّ ما تستطيع" },
        body: {
          en: "A country tells us very little. A city, and ideally an address, tells us whether the journey is one day's driving or something else.",
          ar: "اسم البلد يقول القليل جدًا. أما المدينة، وعنوان إن أمكن، فيقول إن كانت الرحلة قيادة يوم واحد أم شيئًا آخر.",
        },
      },
      {
        label: { en: "Who is travelling, and with what", ar: "من يسافر، ومعه ماذا" },
        body: {
          en: "Passenger numbers and the luggage decide the vehicle, and the vehicle is part of what has to be authorised for the crossing.",
          ar: "عدد الركاب والأمتعة يحدّدان المركبة، والمركبة جزء ممّا يلزم الإذن به للعبور.",
        },
      },
      {
        label: { en: "The date, and whether you are coming back", ar: "التاريخ، وهل ستعود" },
        body: {
          en: "A return changes the arrangement on both sides of the border, so it is quoted as part of the journey rather than added afterwards.",
          ar: "العودة تغيّر الترتيب على جانبي الحدود، لذا تُسعَّر جزءًا من الرحلة لا تُضاف بعدها.",
        },
      },
      {
        label: { en: "Anything the route has to work around", ar: "أي شيء يجب أن يراعيه المسار" },
        body: {
          en: "A stop on the way, someone who cannot sit for long stretches, a time you have to arrive by. Say it early and it is planned for.",
          ar: "محطة في الطريق، أو راكب لا يحتمل الجلوس طويلًا، أو وقت لا بد أن تصل فيه. اذكره مبكرًا ليُخطَّط له.",
        },
      },
    ],
    documents: {
      heading: { en: "Travel documents are yours to check", ar: "ووثائق السفر مسؤوليتك أنت" },
      body: {
        en: "Whether you may enter a country, on which document, and what your vehicle needs to accompany you, depends on your nationality, your papers and the rules in force on the day you travel. Those rules change, and they differ between travellers in the same car. Check them with the official immigration, customs and border authorities for the countries involved — we do not advise on them, and we would rather say that plainly than have you rely on a transport company for an answer that is not ours to give.",
        ar: "أما دخولك بلدًا من عدمه، وبأي وثيقة، وما تحتاجه مركبتك لمرافقتك، فيعتمد على جنسيتك وأوراقك والأنظمة السارية يوم سفرك. وتلك الأنظمة تتغيّر، وتختلف بين مسافرين في سيارة واحدة. فتحقّق منها لدى جهات الجوازات والجمارك والحدود الرسمية في البلدان المعنية — فنحن لا نفتي فيها، ونقول ذلك صراحةً بدل أن تعتمد على شركة نقل في جواب ليس لنا أن نعطيه.",
      },
    },
    crossing: {
      heading: { en: "And the crossing itself takes what it takes", ar: "والعبور نفسه يأخذ ما يأخذ" },
      body: {
        en: "We publish no crossing time and no waiting allowance for a border, because neither is ours to promise. How long a post takes depends on the day, the traffic, the season and the officers on duty — not on the company that drove you there. What we can say is that the arrangement either side of it is planned in advance rather than improvised.",
        ar: "ولا ننشر زمنًا للعبور ولا مدة انتظار عند منفذ، لأن أيًّا منهما ليس لنا أن نعد به. فمدة المنفذ تعتمد على اليوم والزحام والموسم والموظفين المناوبين — لا على الشركة التي أوصلتك إليه. وما نستطيع قوله إن الترتيب على جانبيه مخطَّط مسبقًا لا مرتجَل.",
      },
    },
  },

  /** §13 */
  shapes: {
    heading: { en: "One way, or there and back", ar: "ذهابًا فقط، أو ذهابًا وإيابًا" },
    lead: {
      en: "Both are quoted. They are not the same arrangement, and the difference is worth stating before you ask for one.",
      ar: "كلاهما يُسعَّر. وليسا الترتيب نفسه، ويستحق الفرق بيانًا قبل أن تطلب أحدهما.",
    },
    items: [
      {
        label: { en: "One way out", ar: "ذهابًا فقط" },
        body: {
          en: "Pickup in Saudi Arabia, drop-off across the border, and the journey ends there.",
          ar: "استقبال داخل السعودية، ونزول خلف الحدود، وتنتهي الرحلة هناك.",
        },
      },
      {
        label: { en: "Out and back", ar: "ذهابًا وإيابًا" },
        body: {
          en: "A planned return to Saudi Arabia on a date you give us. Quoted together with the outbound leg, because the two affect each other.",
          ar: "عودة مخطَّطة إلى السعودية في تاريخ تحدّده. وتُسعَّر مع رحلة الذهاب، لأن كلًّا منهما يؤثر في الآخر.",
        },
      },
    ],
    note: {
      en: "What a return does not automatically mean is the same driver and the same car waiting for you. On some routes that is how it works; on others the return is its own arrangement. It is confirmed in the quotation, not assumed from the fact that you booked both directions.",
      ar: "وما لا تعنيه العودة تلقائيًا أن السائق نفسه والسيارة نفسها بانتظارك. ففي بعض المسارات يكون الأمر كذلك؛ وفي غيرها تكون العودة ترتيبًا قائمًا بذاته. ويُؤكَّد ذلك في عرض السعر، لا يُفترض من كونك حجزت الاتجاهين.",
    },
  },

  /** §14 */
  process: {
    heading: { en: "How a crossing gets arranged", ar: "كيف يُرتَّب العبور" },
    lead: {
      en: "Four steps, and the booking is only confirmed at the last of them.",
      ar: "أربع خطوات، ولا يُؤكَّد الحجز إلا في آخرها.",
    },
    steps: [
      {
        label: { en: "Share the journey", ar: "شارك تفاصيل الرحلة" },
        body: {
          en: "Your pickup in Saudi Arabia, the country and city you are heading for, the date, and how many of you are travelling.",
          ar: "مكان استقبالك في السعودية، والبلد والمدينة اللذين تقصدهما، والتاريخ، وعددكم.",
        },
      },
      {
        label: { en: "The arrangements are reviewed", ar: "تُراجَع الترتيبات" },
        body: {
          en: "The route, the crossing, which driver-and-vehicle arrangement applies, and whether the destination can be served on your date.",
          ar: "المسار، والمعبر، وأي ترتيب للسائق والمركبة ينطبق، وهل يمكن خدمة الوجهة في تاريخك.",
        },
      },
      {
        label: { en: "A written quotation", ar: "عرض سعر مكتوب" },
        body: {
          en: "The price and the arrangement set out in writing, including what happens at the border and who drives after it.",
          ar: "السعر والترتيب مكتوبين، بما في ذلك ما يجري عند الحدود ومن يقود بعدها.",
        },
      },
      {
        label: { en: "Confirmed separately", ar: "ويُؤكَّد الحجز على حدة" },
        body: {
          en: "After you accept it. Submitting the form starts this; it does not reserve a vehicle.",
          ar: "بعد قبولك له. وإرسال النموذج يبدأ هذا؛ ولا يحجز مركبة.",
        },
      },
    ],
  },

  /** §15 */
  vehicles: {
    heading: { en: "Vehicles for a long road day", ar: "مركبات ليوم طريق طويل" },
    lead: {
      en: "The same four categories as every other journey here. For a crossing, the party size and the luggage decide as usual — and then the vehicle itself has to suit the route.",
      ar: "الفئات الأربع نفسها المعتمدة في كل رحلة هنا. وفي العبور يحدّد عددُ الركاب والأمتعةُ الاختيارَ كالعادة — ثم يلزم أن تناسب المركبة نفسها المسار.",
    },
    note: {
      en: "Not every vehicle is suitable for every crossing, and a category being listed here is not a statement that it is authorised for a particular border. That is checked for your route and confirmed with the quotation. Parties larger than one vehicle's bracket travel as more than one car, subject to availability.",
      ar: "وليست كل مركبة صالحة لكل معبر، ووجود فئة هنا ليس إقرارًا بأنها مأذون بها لحدود بعينها. فذلك يُتحقَّق منه لمسارك ويُؤكَّد مع عرض السعر. والمجموعات التي تتجاوز سعة مركبة واحدة تسافر بأكثر من سيارة، رهنًا بالتوافر.",
    },
  },

  faqHeading: { en: "Common questions", ar: "أسئلة متكررة" },

  faqs: [
    {
      question: {
        en: "Can I arrange a transfer from any city in Saudi Arabia?",
        ar: "هل أرتّب نقلًا من أي مدينة في السعودية؟",
      },
      answer: {
        en: "You can ask from anywhere in the Kingdom, and it is reviewed on its merits rather than against a list. Whether a given city works for a given border depends on the distance and the route, so a pickup far from the crossing is looked at more carefully than one beside it — but the enquiry is welcome either way.",
        ar: "يمكنك الطلب من أي مكان في المملكة، ويُدرَس الطلب بحسب حاله لا مقابل قائمة. وصلاحية مدينة بعينها لحدود بعينها تعتمد على المسافة والمسار، فالاستقبال البعيد عن المعبر يُنظر فيه بعناية أكبر من القريب منه — والطلب مرحَّب به في الحالين.",
      },
    },
    {
      question: {
        en: "Which countries can I request a transfer to?",
        ar: "إلى أي البلدان أطلب النقل؟",
      },
      answer: {
        en: "The United Arab Emirates, Bahrain, Qatar, Kuwait, Oman and Jordan — each has its own page with the crossings and destinations set out. Iraq is not currently served, so it is not offered here. If you need somewhere not on the list, ask and you will get a straight answer rather than a maybe.",
        ar: "الإمارات العربية المتحدة والبحرين وقطر والكويت وسلطنة عُمان والأردن — ولكلٍّ صفحتها الخاصة التي تبيّن المعابر والوجهات. أما العراق فغير مخدوم حاليًا، فلا يُعرض هنا. وإن احتجت موضعًا خارج القائمة فاسأل تحصل على جواب صريح لا على «ربما».",
      },
    },
    {
      question: {
        en: "Can I travel from Saudi Arabia to Dubai by private car?",
        ar: "هل أسافر من السعودية إلى دبي بسيارة خاصة؟",
      },
      answer: {
        en: "It is the crossing asked for most often, and enquiries for it are taken. What the journey looks like in practice — the route, and whether the car you start in is the car you arrive in — is confirmed for your specific booking before you accept the quotation.",
        ar: "هو أكثر العبور طلبًا، وتُستقبَل الطلبات إليه. أما شكل الرحلة عمليًا — المسار، وهل السيارة التي تنطلق بها هي التي تصل بها — فيُؤكَّد لحجزك تحديدًا قبل قبولك عرض السعر.",
      },
    },
    {
      question: {
        en: "Can the same driver and vehicle cross the border?",
        ar: "هل يعبر السائق نفسه والمركبة نفسها الحدود؟",
      },
      answer: {
        en: "Sometimes, and it depends on the country and the route rather than on preference. On some journeys the same car continues across; on others a different driver or vehicle takes over past the border. We do not claim one or the other applies everywhere, and which it is for your journey is written into the quotation.",
        ar: "أحيانًا، ويعتمد ذلك على البلد والمسار لا على الرغبة. ففي بعض الرحلات تُكمل السيارة نفسها العبور؛ وفي غيرها يتسلّم سائق أو مركبة مختلفة بعد الحدود. ولا ندّعي انطباق إحدى الحالتين في كل مكان، وما ينطبق على رحلتك يُكتب في عرض السعر.",
      },
    },
    {
      question: {
        en: "Is a handover at the border always required?",
        ar: "هل التسليم عند الحدود مطلوب دائمًا؟",
      },
      answer: {
        en: "No, and it is not always avoidable either. It follows what is permitted and arranged on that route. Where a handover is part of your journey, the quotation says so before you accept it rather than you meeting it at the border.",
        ar: "لا، وليس تفاديه ممكنًا دائمًا كذلك. فهو يتبع ما هو مسموح ومُرتَّب في ذلك المسار. وحيث يكون التسليم جزءًا من رحلتك يذكر عرض السعر ذلك قبل قبولك، بدل أن تفاجأ به عند الحدود.",
      },
    },
    {
      question: { en: "Can I arrange a return journey?", ar: "هل أرتّب رحلة عودة؟" },
      answer: {
        en: "Yes. Give the return date in the enquiry and both directions are quoted together. A return does not automatically mean the same car and driver wait for you — on some routes the return is its own arrangement, and the quotation makes clear which applies.",
        ar: "نعم. اذكر تاريخ العودة في الطلب ويُسعَّر الاتجاهان معًا. ولا تعني العودة تلقائيًا انتظار السيارة والسائق نفسيهما لك — ففي بعض المسارات تكون العودة ترتيبًا مستقلًا، ويوضّح عرض السعر ما ينطبق.",
      },
    },
    {
      question: {
        en: "What travel documents do we need?",
        ar: "ما وثائق السفر التي نحتاجها؟",
      },
      answer: {
        en: "That depends on your nationality, your documents and the rules in force on your travel date, and it can differ between passengers in the same vehicle. Check it with the official immigration and border authorities of the countries you are travelling between. We arrange transport; we do not advise on entry requirements and would not want you relying on us for that.",
        ar: "يعتمد ذلك على جنسيتك ووثائقك والأنظمة السارية في تاريخ سفرك، وقد يختلف بين ركاب في مركبة واحدة. فتحقّق منه لدى جهات الجوازات والحدود الرسمية في البلدين اللذين تسافر بينهما. نحن نرتّب النقل؛ ولا نفتي في شروط الدخول ولا نودّ أن تعتمد علينا فيها.",
      },
    },
    {
      question: {
        en: "Who is responsible for visas and entry permission?",
        ar: "من المسؤول عن التأشيرات وإذن الدخول؟",
      },
      answer: {
        en: "The traveller. Entry is decided by the authorities of the country you are entering, not by the company that drove you to the border. Arranging transport is not an assurance that you will be admitted, and we would be misleading you to suggest otherwise.",
        ar: "المسافر. فالدخول تقرّره سلطات البلد الذي تدخله، لا الشركة التي أوصلتك إلى الحدود. وترتيب النقل ليس ضمانًا للسماح لك بالدخول، ولو أوحينا بغير ذلك لكنّا ضلّلناك.",
      },
    },
    {
      question: {
        en: "Can we travel as a family with luggage?",
        ar: "هل نسافر عائلةً مع الأمتعة؟",
      },
      answer: {
        en: "Yes, and the number of you plus the bags is what picks the vehicle. Give the real passenger count and a sense of the luggage in the enquiry so the quotation covers everyone and everything you are bringing.",
        ar: "نعم، وعددكم مع الحقائب هو ما يحدّد المركبة. فاذكر عدد الركاب الحقيقي ووصفًا للأمتعة في الطلب ليشمل عرض السعر كل من معك وكل ما تحمله.",
      },
    },
    {
      question: {
        en: "We are a party of nine. One vehicle?",
        ar: "نحن تسعة أشخاص. مركبة واحدة؟",
      },
      answer: {
        en: "Nine is beyond a single vehicle's bracket here, so it is arranged as more than one car travelling together, subject to availability and to both vehicles suiting the crossing. Put the full number in the enquiry so the quotation covers all of you.",
        ar: "تسعة تتجاوز سعة مركبة واحدة لدينا، فيُرتَّب ذلك بأكثر من سيارة تسير معًا، رهنًا بالتوافر وبملاءمة المركبتين للمعبر. فاذكر العدد الكامل في الطلب ليشملكم عرض السعر جميعًا.",
      },
    },
    {
      question: {
        en: "Can I ask for a pickup city not listed here?",
        ar: "هل أطلب الاستقبال من مدينة غير مذكورة هنا؟",
      },
      answer: {
        en: "Yes. The cities on this page are the common ones, not the limit. Name where you actually are and it is reviewed for the border you want.",
        ar: "نعم. فالمدن في هذه الصفحة هي الشائعة لا الحد الأقصى. سمِّ موضعك الفعلي ويُراجَع للحدود التي تريدها.",
      },
    },
    {
      question: {
        en: "How is a cross-border journey priced?",
        ar: "كيف تُسعَّر الرحلة عبر الحدود؟",
      },
      answer: {
        en: "On the whole arrangement rather than distance alone: the leg inside the Kingdom, the crossing, the driver and vehicle arrangement, the onward leg, and a return where you have asked for one. That is why the quotation follows a review instead of appearing instantly.",
        ar: "على الترتيب كاملًا لا على المسافة وحدها: المرحلة داخل المملكة، والعبور، وترتيب السائق والمركبة، والمرحلة التالية، والعودة إن طلبتها. ولهذا يأتي عرض السعر بعد مراجعة لا فورًا.",
      },
    },
    {
      question: {
        en: "Is the journey confirmed when I send the form?",
        ar: "هل تُؤكَّد الرحلة بإرسالي النموذج؟",
      },
      answer: {
        en: "No. The form opens a conversation. There is no checkout, no online payment and no instant availability here — the review comes first, then a written quotation, and the booking is confirmed separately once you accept it.",
        ar: "لا. النموذج يفتح محادثة. فليس هنا سلة شراء ولا دفع إلكتروني ولا تأكيد توافر فوري — تأتي المراجعة أولًا، ثم عرض سعر مكتوب، ويُؤكَّد الحجز على حدة بعد قبولك له.",
      },
    },
    {
      question: {
        en: "Can you guarantee how long the border will take?",
        ar: "هل تضمنون مدة الإجراءات على الحدود؟",
      },
      answer: {
        en: "No, and nobody honestly can. Processing time at a crossing depends on the day, the season, the traffic and the authorities on duty. We plan the arrangement either side of it; the post itself is not ours to promise, so we publish no crossing time.",
        ar: "لا، ولا يستطيع ذلك أحد بصدق. فزمن الإجراءات عند المعبر يعتمد على اليوم والموسم والزحام والجهات المناوبة. نحن نخطّط الترتيب على جانبيه؛ أما المنفذ نفسه فليس لنا أن نعد به، ولهذا لا ننشر زمنًا للعبور.",
      },
    },
  ] satisfies ClusterFaq[],

  cta: {
    eyebrow: { en: "One journey, two countries", ar: "رحلة واحدة، بلدان" },
    heading: { en: "Tell us where you are going", ar: "أخبرنا إلى أين أنت ذاهب" },
    body: {
      en: "Send your pickup, the country and city you want to reach, the date and how many of you are travelling. We will review the route and the border arrangement and come back with a written quotation.",
      ar: "أرسل مكان استقبالك، والبلد والمدينة اللذين تريد بلوغهما، والتاريخ، وعددكم. سنراجع المسار وترتيب الحدود ونعود إليك بعرض سعر مكتوب.",
    },
    button: { en: "Request a cross-border quote", ar: "اطلب عرض سعر عبر الحدود" },
  },

  whatsappMessage: {
    en: "Hello, I would like to ask about a cross-border transfer from Saudi Arabia.",
    ar: "السلام عليكم، أود السؤال عن نقل عبر الحدود انطلاقًا من السعودية.",
  },
  whatsappCta: { en: "Ask on WhatsApp", ar: "اسأل عبر واتساب" },

  relatedHeading: { en: "Related pages", ar: "صفحات ذات صلة" },

  related: [
    {
      routeKey: "saudiToBahrain",
      label: { en: "The King Fahd Causeway", ar: "جسر الملك فهد" },
      note: {
        en: "Our guide to the Bahrain crossing, including what our own journeys there do and do not cover.",
        ar: "دليلنا لمعبر البحرين، وفيه ما تشمله رحلاتنا إليه وما لا تشمله.",
      },
    },
    {
      routeKey: "cityToCity",
      label: { en: "City-to-city transfers", ar: "النقل بين المدن" },
      note: {
        en: "The same kind of road journey without a border in it, between cities inside the Kingdom.",
        ar: "النوع نفسه من الرحلات البرية بلا حدود في وسطها، بين مدن داخل المملكة.",
      },
    },
    {
      routeKey: "airportTransfers",
      label: { en: "Airport transfers", ar: "النقل من وإلى المطارات" },
      note: {
        en: "If you are flying out rather than driving, the run to the terminal is quoted separately.",
        ar: "إن كنت ستسافر جوًّا لا برًّا، فرحلة الوصول إلى الصالة تُسعَّر على حدة.",
      },
    },
    {
      routeKey: "dammam",
      label: { en: "Dammam and the Eastern Province", ar: "الدمام والمنطقة الشرقية" },
      note: {
        en: "The region closest to the Bahrain, Qatar and Kuwait crossings, and where most of these journeys begin.",
        ar: "المنطقة الأقرب إلى معابر البحرين وقطر والكويت، ومنها تبدأ معظم هذه الرحلات.",
      },
    },
    {
      routeKey: "riyadh",
      label: { en: "Riyadh transfers", ar: "خدمات النقل في الرياض" },
      note: {
        en: "The capital hub, and the long first leg east towards the Gulf borders.",
        ar: "مركز العاصمة، والمرحلة الأولى الطويلة شرقًا نحو حدود الخليج.",
      },
    },
  ] satisfies RelatedLink[],
};
