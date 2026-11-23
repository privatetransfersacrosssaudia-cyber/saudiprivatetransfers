import type { Bilingual } from "@/lib/i18n/config";
import type {
  ClusterCta,
  ClusterFaq,
  ClusterStat,
  JourneyStage,
  RelatedLink,
} from "@/lib/content/riyadh/types";
import type { RouteKey } from "@/lib/i18n/routes";
import type { SiteImageKey } from "@/lib/site-images";

/**
 * Makkah ↔ Madinah.
 *
 * The page's thesis, and the reason it is not a mirror-image template: this is
 * one road carrying two different journeys. Northbound is a checkout and a
 * long drive. Southbound passes a Miqat and ends at a checkpoint that turns
 * people back. Any layout that treats the two directions as symmetric is
 * describing a road rather than a journey, so this content is deliberately
 * lopsided — `southbound` carries two blocks that `northbound` has no
 * equivalent for.
 *
 * Figures, and where they come from:
 *
 * - 440–450 km and 4½–5½ hours are already published across this site
 *   (`faqs.ts`, both hubs, `services.ts`). They are reused verbatim rather
 *   than restated, so the corridor cannot contradict the hubs it sits between.
 * - Route planners publish less — about 435 km and 4¼ hours — because they
 *   measure edge to edge on open road. The `road.footnote` says so rather than
 *   letting a reader conclude we padded it.
 * - The Haramain figure, 2¼–2¾ hours, is the range already used on both hubs.
 * - Dhu al-Hulayfah at about 14 km from the Prophet's Mosque is Saudipedia's
 *   and Visit Madinah's figure. Less authoritative sources say 9 or 18; the
 *   two official ones agree, so 14 is what appears here.
 *
 * The hero image is the Great Mosque of Makkah — one end of the corridor —
 * and not a road photograph, because the project holds no verified picture of
 * this road. It previously used `route-highway40-west`, which was checked
 * against the actual file and is Highway 40 at the Tuwaiq escarpment, west of
 * Riyadh: the Riyadh–Makkah road, not this one. `svc-intercity` is Highway 60
 * and is no better. Showing an endpoint is true; showing a different road as
 * though it were this one is not. If a verified Makkah–Madinah road photograph
 * is ever licensed, it belongs here.
 *
 * Two things this page must never become. It is not religious guidance: the
 * Miqat block says we build the stop into the journey and nothing whatever
 * about whether it applies to a given traveller. And it is not a claim to be
 * faster than the train — the speed row is awarded to the train outright,
 * because on this corridor the train plainly wins it.
 *
 * `train.lead` states the tally (one row to the train, one to the car, two
 * genuinely undecided). If a row is ever added, removed or its `verdict`
 * changed, that sentence has to change with it, in both languages.
 */

export type DirectionKey = "north" | "south";

/** One row of the train comparison, with the honest answer attached. */
export type TrainRow = {
  question: Bilingual<string>;
  /** Which mode actually wins this row. "depends" is a real answer here. */
  verdict: "car" | "train" | "depends";
  detail: Bilingual<string>;
};

export const makkahMadinah = {
  routeKey: "makkahToMadinah" as RouteKey,
  imageKey: "dest-makkah" as SiteImageKey,

  seo: {
    title: {
      en: "Makkah to Madinah private transfers — both directions",
      ar: "النقل الخاص بين مكة المكرمة والمدينة المنورة — في الاتجاهين",
    },
    description: {
      en: "Private car between the two holy cities, about 440–450 km. Pickup and drop-off at hotels, the road itself, an honest comparison with the Haramain train, and how to get a written quotation.",
      ar: "سيارة خاصة بين المدينتين المقدستين، نحو 440–450 كم. الاستقبال والتوصيل من الفنادق، وتفاصيل الطريق، ومقارنة صادقة مع قطار الحرمين، وكيفية الحصول على عرض سعر مكتوب.",
    },
  },

  crumbLabel: { en: "Makkah to Madinah", ar: "مكة إلى المدينة" },

  // --- Hero --------------------------------------------------------------

  eyebrow: { en: "Between the two holy cities", ar: "بين المدينتين المقدستين" },
  title: {
    en: "Makkah to Madinah, and back",
    ar: "من مكة المكرمة إلى المدينة المنورة، والعكس",
  },
  standfirst: {
    en: "One road, two different journeys. We arrange the private car in either direction — the whole vehicle for your party, door to door, timed to your hotel rather than to a timetable. The train also runs this corridor, and on this page we say plainly when it is the better answer.",
    ar: "طريق واحد ورحلتان مختلفتان. نرتّب السيارة الخاصة في الاتجاهين — المركبة بكاملها لمجموعتك، من الباب إلى الباب، بتوقيت فندقك لا بجدول ثابت. وقطار الحرمين يخدم هذا المسار أيضًا، وفي هذه الصفحة نقول بوضوح متى يكون هو الأفضل.",
  },

  /** The two ends of the route plate in the hero. */
  plate: {
    origin: { en: "Makkah", ar: "مكة المكرمة" },
    destination: { en: "Madinah", ar: "المدينة المنورة" },
    distance: { en: "440–450 km", ar: "440–450 كم" },
    bothWays: { en: "Both directions", ar: "في الاتجاهين" },
  },

  primaryCta: { en: "Request a quotation", ar: "اطلب عرض سعر" },
  secondaryCta: { en: "Car or train?", ar: "السيارة أم القطار؟" },

  stats: [
    {
      label: { en: "Road distance", ar: "المسافة البرية" },
      value: { en: "440–450 km", ar: "440–450 كم" },
      note: {
        en: "Door to door, which is longer than any planner's figure.",
        ar: "من الباب إلى الباب، وهي أطول من رقم أي مخطِّط مسارات.",
      },
    },
    {
      label: { en: "Driving time", ar: "زمن القيادة" },
      value: { en: "4½–5½ hrs", ar: "4½–5½ ساعة" },
      note: {
        en: "Without stops. Most journeys include at least one.",
        ar: "دون توقف. ومعظم الرحلات تتضمن توقفًا واحدًا على الأقل.",
      },
    },
    {
      label: { en: "Haramain train", ar: "قطار الحرمين" },
      value: { en: "2¼–2¾ hrs", ar: "2¼–2¾ ساعة" },
      note: {
        en: "Station to station, by published figures.",
        ar: "من محطة إلى محطة، بحسب الأرقام المنشورة.",
      },
    },
    {
      label: { en: "Vehicle", ar: "المركبة" },
      value: { en: "Reserved for you", ar: "محجوزة لك وحدك" },
      note: {
        en: "Nobody else is added to the journey.",
        ar: "لا يُضاف أحد آخر إلى الرحلة.",
      },
    },
  ] satisfies ClusterStat[],

  // --- The thesis ---------------------------------------------------------

  asymmetry: {
    heading: {
      en: "The same road is not the same journey",
      ar: "الطريق نفسه ليس الرحلة نفسها",
    },
    paragraphs: [
      {
        en: "Most route pages describe a corridor once and assume the return leg is the first one reversed. Here it is not, and the difference is worth knowing before you book.",
        ar: "تصف معظم صفحات المسارات المسار مرة واحدة وتفترض أن رحلة العودة هي الأولى معكوسة. وهنا ليس الأمر كذلك، والفرق جدير بأن تعرفه قبل الحجز.",
      },
      {
        en: "Going north, the journey is a hotel checkout and a long drive that ends at a Madinah hotel. Going south, two things sit on the road that have no northbound equivalent: a Miqat just outside Madinah, where many travellers ask to stop, and the checkpoint on the approach to Makkah, where entry is restricted to Muslims. Both change how the journey is planned, not just how it is described.",
        ar: "ففي الاتجاه شمالًا تكون الرحلة مغادرةَ فندق وقيادةً طويلة تنتهي عند فندق في المدينة المنورة. أما جنوبًا فيقع على الطريق أمران لا نظير لهما شمالًا: ميقات خارج المدينة المنورة مباشرة يطلب كثير من المسافرين التوقف عنده، ونقطة التفتيش على مشارف مكة المكرمة حيث الدخول مقصور على المسلمين. وكلاهما يغيّر طريقة تخطيط الرحلة، لا طريقة وصفها فحسب.",
      },
      {
        en: "So the two directions are set out separately below. Read the one you are actually travelling.",
        ar: "ولذلك يرد الاتجاهان منفصلين أدناه. فاقرأ الاتجاه الذي تسافره فعلًا.",
      },
    ],
  },

  // --- Northbound ---------------------------------------------------------

  northbound: {
    key: "north" as DirectionKey,
    from: { en: "Makkah", ar: "مكة المكرمة" },
    to: { en: "Madinah", ar: "المدينة المنورة" },
    heading: {
      en: "Leaving Makkah for Madinah",
      ar: "المغادرة من مكة المكرمة إلى المدينة المنورة",
    },
    lead: {
      en: "Usually the second half of a trip: the rites are finished, the hotel is being vacated, and the question is how to reach Madinah without the afternoon disappearing. The pickup is built around your checkout, not around a departure board.",
      ar: "غالبًا ما تكون النصف الثاني من الرحلة: انتهت المناسك، ويجري إخلاء الفندق، والسؤال هو كيف تصل إلى المدينة المنورة دون أن يضيع العصر. ويُبنى موعد الاستقبال حول موعد مغادرتك الفندق، لا حول لوحة مواعيد.",
    },
    points: [
      {
        title: { en: "Pickup at your Makkah hotel", ar: "الاستقبال من فندقك في مكة" },
        body: {
          en: "Name the hotel and, if it is one of the large towers near the Haram, the entrance you will come out of. The streets closest to the Grand Mosque are controlled and a car cannot always stop at the door you walked in through, so the meeting point is confirmed in writing before the day.",
          ar: "اذكر اسم الفندق، وإن كان من الأبراج الكبيرة قرب الحرم فاذكر المدخل الذي ستخرج منه. فالشوارع الأقرب إلى المسجد الحرام منظَّمة، ولا تستطيع السيارة دائمًا التوقف عند الباب الذي دخلت منه، ولذلك يُؤكَّد مكان اللقاء كتابةً قبل اليوم المحدد.",
        },
      },
      {
        title: { en: "Timed to checkout, not to a timetable", ar: "بتوقيت مغادرة الفندق لا بجدول" },
        body: {
          en: "Tell us your checkout time and we set the pickup from it. If the hotel will hold your bags and you want to pray before leaving, say so — a later departure is a planning decision, not a problem.",
          ar: "أخبرنا بموعد مغادرتك الفندق ونضبط الاستقبال عليه. وإذا كان الفندق سيحفظ حقائبك وأردت الصلاة قبل المغادرة، فاذكر ذلك — فتأخير الانطلاق قرار تنظيمي لا مشكلة.",
        },
      },
      {
        title: { en: "Arriving in Madinah", ar: "الوصول إلى المدينة المنورة" },
        body: {
          en: "Most arrivals are hotels in the Central Area around the Prophet's Mosque. Give us the hotel name; the approach roads there are managed too, and the drop-off point is confirmed the same way as the pickup.",
          ar: "معظم الوصول يكون إلى فنادق المنطقة المركزية حول المسجد النبوي. زوّدنا باسم الفندق؛ فطرق الاقتراب هناك منظَّمة أيضًا، ويُؤكَّد مكان التوصيل بالطريقة نفسها التي يُؤكَّد بها مكان الاستقبال.",
        },
      },
      {
        title: { en: "Check-in time is worth saying", ar: "يستحق موعد دخول الفندق أن يُذكر" },
        body: {
          en: "If your Madinah room is not available until the afternoon, an early start just means waiting in a lobby with your luggage. Tell us the check-in time and we will plan the departure around it rather than against it.",
          ar: "إذا لم تكن غرفتك في المدينة متاحة قبل العصر، فالانطلاق المبكر يعني مجرد انتظار في بهو الفندق مع حقائبك. أخبرنا بموعد الدخول ونخطط الانطلاق وفقه لا ضده.",
        },
      },
    ],
  },

  // --- Southbound ---------------------------------------------------------

  southbound: {
    key: "south" as DirectionKey,
    from: { en: "Madinah", ar: "المدينة المنورة" },
    to: { en: "Makkah", ar: "مكة المكرمة" },
    heading: {
      en: "Leaving Madinah for Makkah",
      ar: "المغادرة من المدينة المنورة إلى مكة المكرمة",
    },
    lead: {
      en: "The same road, but two things sit on it that the northbound journey never meets. Neither is a service we sell; both are facts about the route that change how the day is planned.",
      ar: "الطريق نفسه، لكن عليه أمران لا تلقاهما الرحلة شمالًا أبدًا. وليس أي منهما خدمة نبيعها؛ بل كلاهما حقيقة عن المسار تغيّر طريقة تخطيط اليوم.",
    },
    points: [
      {
        title: { en: "Pickup at your Madinah hotel", ar: "الاستقبال من فندقك في المدينة" },
        body: {
          en: "Same arrangement as the other direction: the hotel name, the entrance, and a confirmed meeting point. The Central Area around the Prophet's Mosque has the same managed approach roads.",
          ar: "الترتيب نفسه كالاتجاه الآخر: اسم الفندق، والمدخل، ومكان لقاء مؤكَّد. فالمنطقة المركزية حول المسجد النبوي فيها طرق اقتراب منظَّمة كذلك.",
        },
      },
      {
        title: { en: "Luggage goes in before the stop", ar: "تُحمَّل الحقائب قبل التوقف" },
        body: {
          en: "If you plan to stop at the Miqat, everything you need for the rest of the journey should be reachable rather than buried at the bottom of the boot. Worth a minute at the hotel door.",
          ar: "إذا كنت تنوي التوقف عند الميقات، فينبغي أن يكون كل ما تحتاجه لبقية الرحلة في متناولك لا مدفونًا في قاع الصندوق. وهو أمر يستحق دقيقة عند باب الفندق.",
        },
      },
    ],

    /**
     * Deliberately factual and deliberately narrow. We state where the place
     * is and that we will build the stop into the journey if asked. We say
     * nothing about whether it applies to any given traveller, because that is
     * religious guidance and not ours to give.
     */
    miqat: {
      label: { en: "On the road south, only", ar: "على الطريق جنوبًا، حصرًا" },
      heading: {
        en: "The stop at Dhu al-Hulayfah",
        ar: "التوقف عند ذي الحليفة",
      },
      body: [
        {
          en: "Dhu al-Hulayfah — widely known as Abyar Ali — lies about 14 km from the Prophet's Mosque, on the Makkah side of Madinah. It is the Miqat for travellers setting out from Madinah, and a great many journeys in this direction begin with a stop there.",
          ar: "تقع ذو الحليفة — وتُعرف على نطاق واسع بآبار علي — على نحو 14 كم من المسجد النبوي، في الجهة المؤدية إلى مكة من المدينة المنورة. وهي ميقات المتوجهين من المدينة، ويبدأ عدد كبير من الرحلات في هذا الاتجاه بتوقف عندها.",
        },
        {
          en: "If you want that stop, say so when you enquire and it goes into the journey and into the quotation, with the waiting time accounted for. What we will not do is tell you whether it applies to you, when to enter ihram, or how long to take — we arrange the car and the stop; the rest is not ours to advise on.",
          ar: "فإذا أردت ذلك التوقف، فاذكره عند إرسال طلبك ليُدرَج في الرحلة وفي عرض السعر، مع احتساب وقت الانتظار. أما ما لن نفعله فهو أن نخبرك هل ينطبق عليك، أو متى تُحرم، أو كم تمكث — فنحن نرتّب السيارة والتوقف، وما عدا ذلك ليس من شأننا أن نفتي فيه.",
        },
      ],
      footnote: {
        en: "The 14 km figure is the one published by Saudipedia and the Visit Madinah site. Other sources say 9 km or 18 km; where official sources agree with each other, we follow them.",
        ar: "ورقم 14 كم هو المنشور في «السعودية بالعربي» (Saudipedia) وموقع «زوروا المدينة». وتذكر مصادر أخرى 9 كم أو 18 كم؛ وحين تتفق المصادر الرسمية فيما بينها، فإننا نتبعها.",
      },
    },

    /** Already stated on the Jeddah → Makkah page; repeated because a traveller on this page may never see that one. */
    checkpoint: {
      label: { en: "On the approach to Makkah", ar: "على مشارف مكة المكرمة" },
      heading: {
        en: "Entry to Makkah is restricted",
        ar: "الدخول إلى مكة المكرمة مقيَّد",
      },
      body: [
        {
          en: "Entry to Makkah is restricted to Muslims, and the restriction is enforced at a checkpoint on the road in. This is not our rule and we have no discretion over it.",
          ar: "الدخول إلى مكة المكرمة مقصور على المسلمين، ويُطبَّق هذا القيد عند نقطة تفتيش على الطريق المؤدي إليها. وليس هذا نظامنا ولا سلطة لنا عليه.",
        },
        {
          en: "We will not carry a passenger who is not permitted to enter on the travel date. If your party includes someone in that position, tell us when you enquire and we will quote a journey that works — Madinah to Jeddah, for instance — rather than take you to a checkpoint and turn round.",
          ar: "ولن ننقل راكبًا غير مسموح له بالدخول في تاريخ السفر. فإن كان في مجموعتك من هو كذلك، فأخبرنا عند إرسال طلبك ونسعّر لك رحلة تناسبك — من المدينة إلى جدة مثلًا — بدل أن نقصد بك نقطة التفتيش ثم نعود.",
        },
        {
          en: "We arrange road transport. We are not an official Hajj or Umrah operator and we do not issue visas, permits or packages.",
          ar: "نحن نرتّب النقل البري. ولسنا مشغّلًا رسميًا للحج أو العمرة، ولا نصدر تأشيرات ولا تصاريح ولا برامج.",
        },
      ],
    },
  },

  // --- The road itself ----------------------------------------------------

  road: {
    heading: { en: "The road between them", ar: "الطريق بينهما" },
    lead: {
      en: "A long, well-surfaced desert highway with service areas along it. Nothing about the drive is difficult; the length is the thing to plan around.",
      ar: "طريق صحراوي طويل جيد الرصف تتخلله مناطق خدمات. ولا شيء في القيادة صعب؛ إنما الطول هو ما ينبغي التخطيط له.",
    },
    stages: [
      {
        name: { en: "Out of the city", ar: "الخروج من المدينة" },
        detail: {
          en: "The slowest part at either end. Managed streets, hotel forecourts and traffic around the mosque districts take longer than the open road ever does.",
          ar: "أبطأ جزء في الطرفين. فالشوارع المنظَّمة وساحات الفنادق والازدحام حول منطقتي المسجدين تستغرق أطول مما يستغرقه الطريق المفتوح.",
        },
        km: 0,
      },
      {
        name: { en: "The open highway", ar: "الطريق السريع المفتوح" },
        detail: {
          en: "Most of the journey. Dual carriageway across open country, with the kilometres passing steadily and little to slow you down.",
          ar: "معظم الرحلة. طريق مزدوج عبر أرض مفتوحة، تمضي فيه الكيلومترات بانتظام ولا يكاد شيء يبطئك.",
        },
        km: 120,
      },
      {
        name: { en: "A stop, usually around halfway", ar: "توقف، غالبًا قرب المنتصف" },
        detail: {
          en: "Service areas with fuel, food and prayer facilities. Most parties stop once; families with children often stop twice. Tell us if you would rather press on.",
          ar: "مناطق خدمات فيها وقود وطعام ومصليات. ومعظم المجموعات تتوقف مرة؛ والعائلات التي معها أطفال تتوقف مرتين غالبًا. وأخبرنا إن كنت تفضّل المواصلة دون توقف.",
        },
        km: 230,
      },
      {
        name: { en: "Into the second city", ar: "الدخول إلى المدينة الثانية" },
        detail: {
          en: "Back into managed streets, and — southbound only — the checkpoint on the approach to Makkah.",
          ar: "العودة إلى شوارع منظَّمة، و— جنوبًا فقط — نقطة التفتيش على مشارف مكة المكرمة.",
        },
        km: 445,
      },
    ] satisfies JourneyStage[],
    footnote: {
      en: "Route planners publish shorter figures — around 435 km and a little over four hours — because they measure from the edge of one city to the edge of the other on open road. Your journey starts at a hotel door in one holy city and ends at a hotel door in the other, and those city ends are the slow part. We quote on the two addresses you give us, so the distance on your quotation may not match any planner exactly.",
      ar: "تنشر برامج تخطيط المسارات أرقامًا أقل — نحو 435 كم وما يزيد قليلًا على أربع ساعات — لأنها تقيس من طرف مدينة إلى طرف الأخرى على طريق مفتوح. أما رحلتك فتبدأ عند باب فندق في إحدى المدينتين المقدستين وتنتهي عند باب فندق في الأخرى، وطرفا المدينتين هما الجزء البطيء. ونحن نسعّر وفق العنوانين اللذين تعطينا إياهما، فقد لا تطابق المسافة في عرض سعرك أي برنامج تخطيط بدقة.",
    },
  },

  // --- Car or train -------------------------------------------------------

  train: {
    heading: { en: "Car or the Haramain train?", ar: "السيارة أم قطار الحرمين؟" },
    lead: {
      en: "The Haramain high-speed line runs this corridor and does it well. We sell the car, so take the following with that in mind — but we would rather you arrived happy on a train than irritated in a car you did not need. Of these four rows the train takes one outright, the car takes one, and two genuinely depend on your own circumstances.",
      ar: "يخدم قطار الحرمين السريع هذا المسار ويؤدي عمله جيدًا. ونحن نبيع السيارة، فخذ ما يلي بعين الاعتبار — لكننا نفضّل أن تصل راضيًا في قطار على أن تصل متضايقًا في سيارة لم تكن بحاجة إليها. ومن هذه الصفوف الأربعة يحسم القطار واحدًا، وتحسم السيارة واحدًا، ويعتمد اثنان فعليًا على ظروفك أنت.",
    },
    rows: [
      {
        question: {
          en: "Which is faster between the two cities?",
          ar: "أيهما أسرع بين المدينتين؟",
        },
        verdict: "train" as const,
        detail: {
          en: "The train, and it is not close: about 2¼ to 2¾ hours station to station against four and a half to five and a half hours of driving. A car is not trying to win on time, and we will not pretend otherwise.",
          ar: "القطار، والفارق كبير: نحو 2¼ إلى 2¾ ساعة من محطة إلى محطة مقابل أربع ساعات ونصف إلى خمس ساعات ونصف من القيادة. فالسيارة لا تنافس على الزمن، ولن ندّعي غير ذلك.",
        },
      },
      {
        question: {
          en: "Which is faster door to door?",
          ar: "أيهما أسرع من الباب إلى الباب؟",
        },
        verdict: "depends" as const,
        detail: {
          en: "The stations are not in the mosque districts. Makkah's is at al-Rusaifa, about 3 km from the Grand Mosque; Madinah's is in Knowledge Economic City, about 7 km from the Prophet's Mosque. Add two road legs, the wait before departure and the luggage handling at both ends, and the gap narrows. It rarely closes, but for a late arrival with a lot of bags it can.",
          ar: "المحطتان ليستا في منطقتي المسجدين. فمحطة مكة في الرصيفة على نحو 3 كم من المسجد الحرام؛ ومحطة المدينة في مدينة المعرفة الاقتصادية على نحو 7 كم من المسجد النبوي. وبإضافة رحلتين بريتين، والانتظار قبل المغادرة، ومناولة الحقائب في الطرفين، يضيق الفارق. وقلّما يزول، لكنه قد يزول لوصول متأخر مع حقائب كثيرة.",
        },
      },
      {
        question: {
          en: "Which suits a family with luggage?",
          ar: "أيهما يناسب عائلة ومعها حقائب؟",
        },
        verdict: "car" as const,
        detail: {
          en: "The car. One vehicle, loaded once at a hotel door and unloaded once at another, with nobody carrying a case across a concourse or counting children onto a platform. This is the row that decides it for most groups.",
          ar: "السيارة. مركبة واحدة تُحمَّل مرة عند باب فندق وتُفرَّغ مرة عند باب آخر، دون أن يحمل أحد حقيبة عبر صالة أو يعدّ الأطفال على رصيف. وهذا هو الصف الذي يحسم الأمر لمعظم المجموعات.",
        },
      },
      {
        question: {
          en: "Which fits an awkward departure time?",
          ar: "أيهما يناسب موعد مغادرة غير مريح؟",
        },
        verdict: "depends" as const,
        detail: {
          en: "A car leaves when you are ready, including at hours no train runs, and waits while you finish at the hotel. But if a train happens to leave near your checkout time, it is simply the better answer. Check the timetable before you ask us for a price — we would rather you did.",
          ar: "السيارة تنطلق حين تكون جاهزًا، بما في ذلك ساعات لا يعمل فيها القطار، وتنتظر ريثما تنهي أمورك في الفندق. لكن إن صادف أن يغادر قطار قرب موعد مغادرتك الفندق، فهو ببساطة الأفضل. فراجع الجدول قبل أن تطلب منا سعرًا — نفضّل أن تفعل.",
        },
      },
    ] satisfies TrainRow[],
    footnote: {
      en: "We publish no train fares, times or seat availability. Those belong to the operator, they change, and a figure copied here would only be wrong later. Check the Haramain operator directly, and if the train suits you better, take it.",
      ar: "ولا ننشر أسعار القطار ولا مواعيده ولا توافر مقاعده. فتلك من شأن المشغّل، وهي تتغير، ورقم يُنقل هنا لن يكون إلا خطأً لاحقًا. فراجع مشغّل قطار الحرمين مباشرةً، وإن كان القطار أنسب لك فخذه.",
    },
    verdictLabels: {
      car: { en: "Car", ar: "السيارة" },
      train: { en: "Train", ar: "القطار" },
      depends: { en: "Depends", ar: "يعتمد" },
    },
  },

  // --- Vehicles -----------------------------------------------------------

  vehicles: {
    heading: { en: "Which vehicle to ask for", ar: "أي مركبة تطلب" },
    lead: {
      en: "These are categories, not a named fleet — we confirm what is available for your date rather than promising a model in advance. On a journey this long the category matters more than it does across a city: five hours is a long time in a car that is one seat too small.",
      ar: "هذه فئات لا أسطول بأسماء محددة — فنحن نؤكد المتاح لتاريخك بدل الوعد بطراز مسبقًا. وفي رحلة بهذا الطول تهمّ الفئة أكثر مما تهمّ داخل المدينة: فخمس ساعات وقت طويل في سيارة تنقصها مقعد واحد.",
    },
    /** Which of the shared categories to surface, in order. All four apply here. */
    slugs: ["sedan", "suv", "van", "minibus"],
    footnote: {
      en: "Seat and luggage figures are the brackets we quote against, not a promise about a particular car.",
      ar: "وأرقام المقاعد والحقائب هي الفئات التي نسعّر وفقها، لا وعدًا بسيارة بعينها.",
    },
  },

  // --- What a quotation needs ---------------------------------------------

  quoting: {
    heading: { en: "What we need to quote this journey", ar: "ما نحتاجه لتسعير هذه الرحلة" },
    lead: {
      en: "Every item below changes the answer. Sending them together is the difference between a price and a round of questions.",
      ar: "كل بند أدناه يغيّر الإجابة. وإرسالها مجتمعة هو الفرق بين سعر وجولة أسئلة.",
    },
    points: [
      {
        title: { en: "Direction, and both hotels", ar: "الاتجاه، والفندقان" },
        body: {
          en: "Which way you are going, the hotel you are leaving and the hotel you are going to — by name. A district is not enough at either end.",
          ar: "في أي اتجاه تسافر، والفندق الذي تغادره والفندق الذي تقصده — بالاسم. فذكر الحي وحده لا يكفي في أي من الطرفين.",
        },
      },
      {
        title: { en: "Date, and the time you want to leave", ar: "التاريخ ووقت المغادرة المطلوب" },
        body: {
          en: "If the time is set by a hotel checkout or a check-in at the other end, say which — it often changes what we recommend.",
          ar: "وإذا كان الوقت محكومًا بمغادرة فندق أو بدخول فندق في الطرف الآخر، فاذكر أيهما — فذلك يغيّر توصيتنا كثيرًا.",
        },
      },
      {
        title: { en: "Passengers, counted exactly", ar: "عدد الركاب بدقة" },
        body: {
          en: "Including children, and including infants travelling on a lap. The number decides the vehicle category, and the category is the largest single factor in the price.",
          ar: "شاملًا الأطفال، وشاملًا الرضّع المحمولين. فالعدد يحدد فئة المركبة، والفئة هي العامل الأكبر في السعر.",
        },
      },
      {
        title: { en: "Luggage, counted honestly", ar: "عدد الحقائب بصدق" },
        body: {
          en: "Large suitcases and cabin bags separately. Zamzam containers are the ones most often left off a list and the ones that most often will not fit — count them in.",
          ar: "الحقائب الكبيرة وحقائب المقصورة كلٌّ على حدة. وعبوات ماء زمزم هي الأكثر نسيانًا في القوائم والأكثر تعذّرًا في الاتساع — فاحسبها.",
        },
      },
      {
        title: { en: "Any stop you want built in", ar: "أي توقف تريد إدراجه" },
        body: {
          en: "The Miqat heading south, a service stop, a Ziyarat place on the way — each one is time, and time belongs in the quotation rather than in a conversation at the roadside.",
          ar: "الميقات في الاتجاه جنوبًا، أو توقف خدمات، أو موضع زيارة في الطريق — كل واحد منها وقت، والوقت محله عرض السعر لا حديث على قارعة الطريق.",
        },
      },
      {
        title: { en: "Anything out of the ordinary", ar: "أي أمر غير معتاد" },
        body: {
          en: "A child seat, a wheelchair, a passenger who cannot manage steps, an unusually early start. Told in advance these are arranged; mentioned on the day they may not be.",
          ar: "مقعد أطفال، أو كرسي متحرك، أو راكب لا يستطيع صعود الدرج، أو انطلاقة مبكرة جدًا. فهذه تُدبَّر إن ذُكرت مسبقًا، وقد لا تُدبَّر إن ذُكرت يوم الرحلة.",
        },
      },
    ],
  },

  // --- Booking ------------------------------------------------------------

  booking: {
    heading: { en: "How booking works", ar: "كيف يتم الحجز" },
    intro: {
      en: "Nothing is reserved and no payment is taken while you are deciding.",
      ar: "لا يُحجز شيء ولا يُستوفى أي مبلغ أثناء تفكيرك.",
    },
    steps: [
      {
        title: { en: "You send the journey", ar: "ترسل تفاصيل الرحلة" },
        body: {
          en: "The form, or WhatsApp. An enquiry, not a booking.",
          ar: "عبر النموذج أو واتساب. وهو طلب لا حجز.",
        },
      },
      {
        title: { en: "We check the date", ar: "نتحقق من التاريخ" },
        body: {
          en: "Route and whether a vehicle can be arranged for it.",
          ar: "المسار وإمكانية تدبير مركبة له.",
        },
      },
      {
        title: { en: "We quote in writing", ar: "نرسل عرض سعر مكتوب" },
        body: {
          en: "One price for that journey, with what it covers.",
          ar: "سعر واحد لتلك الرحلة، مع بيان ما يشمله.",
        },
      },
      {
        title: { en: "You accept, or you do not", ar: "تقبل أو لا تقبل" },
        body: {
          en: "Accepting is not the confirmation; the booking confirmation is a separate message.",
          ar: "والقبول ليس هو التأكيد؛ فرسالة تأكيد الحجز منفصلة.",
        },
      },
    ],
    note: {
      en: "Sending an enquiry does not confirm a booking and does not hold a vehicle for your date. Your transfer is confirmed when we send you a booking confirmation saying so. Peak Umrah periods and the Hajj season are the dates most likely to be unavailable, so earlier is better — but we will tell you honestly if we cannot cover a journey rather than leave the request open.",
      ar: "وإرسال الطلب لا يؤكد حجزًا ولا يحجز مركبة لتاريخك. ولا تتأكد رحلتك إلا عندما نرسل إليك رسالة تأكيد حجز تنص على ذلك. ومواسم العمرة الذروة وموسم الحج هي أكثر التواريخ احتمالًا لعدم التوافر، فالتبكير أفضل — لكننا سنخبرك بصراحة إن تعذّر علينا تغطية رحلة بدل أن نُبقي الطلب معلّقًا.",
    },
  },

  // --- FAQs ---------------------------------------------------------------

  faqs: [
    {
      question: {
        en: "How long does the drive from Makkah to Madinah take?",
        ar: "كم تستغرق الرحلة البرية من مكة المكرمة إلى المدينة المنورة؟",
      },
      answer: {
        en: "About four and a half to five and a half hours of driving for roughly 440–450 km, before any stop. Most parties stop at least once, so plan for longer than the driving time alone. Route planners publish a shorter figure because they measure edge to edge on open road rather than hotel door to hotel door.",
        ar: "نحو أربع ساعات ونصف إلى خمس ساعات ونصف من القيادة لمسافة تقارب 440–450 كم، قبل أي توقف. ومعظم المجموعات تتوقف مرة على الأقل، فخطط لوقت أطول من زمن القيادة وحده. وتنشر برامج تخطيط المسارات رقمًا أقل لأنها تقيس من طرف إلى طرف على طريق مفتوح لا من باب فندق إلى باب فندق.",
      },
    },
    {
      question: {
        en: "Is the Haramain train better than a car between the two cities?",
        ar: "هل قطار الحرمين أفضل من السيارة بين المدينتين؟",
      },
      answer: {
        en: "For one or two people travelling light, often yes, and we will say so. It is far faster between the stations. The car wins when there are bags, children or a group, because it loads once at a hotel door and unloads once at another, and when your departure time does not match a train. Neither station is in the mosque district, so door to door the gap is smaller than the headline times suggest.",
        ar: "لمسافر أو مسافرَين بأمتعة خفيفة، نعم في الغالب، ونقولها صراحة. فهو أسرع بكثير بين المحطتين. أما السيارة فتتفوق عند وجود حقائب أو أطفال أو مجموعة، لأنها تُحمَّل مرة عند باب فندق وتُفرَّغ مرة عند آخر، وكذلك حين لا يوافق وقت مغادرتك قطارًا. وليست أي من المحطتين في منطقة المسجد، فالفارق من الباب إلى الباب أقل مما توحي به الأرقام المعلنة.",
      },
    },
    {
      question: {
        en: "Can the driver stop at Dhu al-Hulayfah on the way to Makkah?",
        ar: "هل يمكن أن يتوقف السائق عند ذي الحليفة في الطريق إلى مكة؟",
      },
      answer: {
        en: "Yes — say so when you enquire and the stop goes into the journey and into the quotation, with waiting time accounted for. It is about 14 km from the Prophet's Mosque on the Makkah side of Madinah. We arrange the car and the stop; we do not advise on whether it applies to you or on anything to do with ihram.",
        ar: "نعم — اذكر ذلك عند إرسال طلبك ليُدرَج التوقف في الرحلة وفي عرض السعر، مع احتساب وقت الانتظار. وتبعد نحو 14 كم عن المسجد النبوي في الجهة المؤدية إلى مكة من المدينة. ونحن نرتّب السيارة والتوقف؛ ولا نفتي في انطباق ذلك عليك ولا في شيء يتعلق بالإحرام.",
      },
    },
    {
      question: {
        en: "Can a non-Muslim travel with us on this route?",
        ar: "هل يمكن لغير المسلم السفر معنا على هذا المسار؟",
      },
      answer: {
        en: "Not into Makkah. Entry is restricted to Muslims and enforced at a checkpoint on the road in; we will not carry a passenger who is not permitted to enter on the travel date. Tell us at the enquiry stage and we will quote something that works instead, such as Madinah to Jeddah. The leg between Madinah and places outside the Makkah boundary is a different question and we will answer it honestly for your specific journey.",
        ar: "ليس إلى داخل مكة المكرمة. فالدخول مقصور على المسلمين ويُطبَّق عند نقطة تفتيش على الطريق؛ ولن ننقل راكبًا غير مسموح له بالدخول في تاريخ السفر. فأخبرنا عند إرسال الطلب ونسعّر لك بديلًا مناسبًا، كرحلة من المدينة إلى جدة. أما الرحلة بين المدينة المنورة ومواضع خارج حدود مكة فمسألة أخرى نجيب عنها بصدق وفق رحلتك تحديدًا.",
      },
    },
    {
      question: {
        en: "Can we stop on the way, and does it cost more?",
        ar: "هل يمكننا التوقف في الطريق، وهل يزيد ذلك التكلفة؟",
      },
      answer: {
        en: "Yes to stopping — service areas with fuel, food and prayer facilities sit along the route and most journeys include at least one. A short service stop is part of a journey this long. A stop that adds real time, such as a detour or a long wait, belongs in the quotation, so tell us in advance and it will be priced rather than discussed at the roadside.",
        ar: "نعم للتوقف — فعلى الطريق مناطق خدمات فيها وقود وطعام ومصليات، ومعظم الرحلات تتضمن توقفًا واحدًا على الأقل. والتوقف القصير للخدمات جزء من رحلة بهذا الطول. أما التوقف الذي يضيف وقتًا فعليًا، كانعطاف عن المسار أو انتظار طويل، فمحله عرض السعر، فأخبرنا مسبقًا ليُسعَّر بدل أن يُناقَش على قارعة الطريق.",
      },
    },
    {
      question: {
        en: "Do you take Zamzam containers?",
        ar: "هل تنقلون عبوات ماء زمزم؟",
      },
      answer: {
        en: "Count them with your luggage when you enquire. They are the single item most often left off a list and the one most likely not to fit alongside a full set of suitcases, so the honest answer depends on how many and which vehicle category you are quoted. Tell us the number and we will quote a vehicle that takes them.",
        ar: "احسبها ضمن حقائبك عند إرسال الطلب. فهي أكثر ما يُنسى في القوائم وأكثر ما قد لا يتسع إلى جانب مجموعة حقائب كاملة، فالإجابة الصادقة تعتمد على عددها وعلى فئة المركبة المسعَّرة لك. أخبرنا بالعدد ونسعّر لك مركبة تتسع لها.",
      },
    },
    {
      question: {
        en: "Is there a fixed price for Makkah to Madinah?",
        ar: "هل هناك سعر ثابت من مكة إلى المدينة؟",
      },
      answer: {
        en: "No. Every journey is quoted individually, because the price depends on the vehicle category, the date and time, the two exact addresses and any stop you want built in. You get a written price before anything is reserved, and nothing is confirmed until we send a booking confirmation.",
        ar: "لا. فكل رحلة تُسعَّر على حدة، لأن السعر يعتمد على فئة المركبة والتاريخ والوقت والعنوانين بالضبط وأي توقف تريد إدراجه. وتحصل على سعر مكتوب قبل حجز أي شيء، ولا يتأكد شيء حتى نرسل رسالة تأكيد الحجز.",
      },
    },
  ] satisfies ClusterFaq[],

  // --- Related ------------------------------------------------------------

  relatedHeading: { en: "Related journeys", ar: "رحلات ذات صلة" },
  related: [
    {
      routeKey: "umrahTransfers" as RouteKey,
      label: { en: "Umrah transfers", ar: "نقل العمرة" },
      note: {
        en: "The whole trip as one arrangement: the airport arrival, the hotel runs, the road between the holy cities and the departure leg.",
        ar: "الرحلة كلها ترتيبًا واحدًا: الوصول من المطار، والتنقل بين الفنادق، والطريق بين المدينتين المقدستين، ورحلة المغادرة.",
      },
    },
    {
      routeKey: "makkah" as RouteKey,
      label: { en: "Makkah transfers", ar: "التوصيل في مكة المكرمة" },
      note: {
        en: "Arrivals via Jeddah or Taif, the Haramain station and hotel runs.",
        ar: "الوصول عبر جدة أو الطائف، ومحطة قطار الحرمين، والتنقل بين الفنادق.",
      },
    },
    {
      routeKey: "madinah" as RouteKey,
      label: { en: "Madinah transfers", ar: "التوصيل في المدينة المنورة" },
      note: {
        en: "Airport and station pickups, hotel runs and Ziyarat journeys.",
        ar: "الاستقبال من المطار والمحطة، والتنقل بين الفنادق، ورحلات الزيارة.",
      },
    },
    {
      routeKey: "jeddahToMakkah" as RouteKey,
      label: { en: "Jeddah to Makkah", ar: "من جدة إلى مكة" },
      note: {
        en: "The other half of most itineraries: airport or city to your hotel.",
        ar: "النصف الآخر من معظم البرامج: من المطار أو المدينة إلى فندقك.",
      },
    },
    {
      routeKey: "jeddahAirport" as RouteKey,
      label: { en: "Jeddah airport transfers", ar: "النقل من مطار جدة" },
      note: {
        en: "Where most pilgrimage trips begin, and where a Haramain station sits inside the terminal.",
        ar: "حيث تبدأ معظم رحلات الحج والعمرة، وحيث تقع محطة قطار الحرمين داخل الصالة.",
      },
    },
  ] satisfies RelatedLink[],

  cta: {
    eyebrow: { en: "One price, in writing", ar: "سعر واحد، مكتوب" },
    heading: {
      en: "Tell us which direction, and when",
      ar: "أخبرنا بالاتجاه والموعد",
    },
    body: {
      en: "Send both hotel names, the date and time, how many passengers and bags, and any stop you want built in. We reply with a written price for that journey. Nothing is reserved and no payment is taken until you accept it.",
      ar: "أرسل اسمي الفندقين، والتاريخ والوقت، وعدد الركاب والحقائب، وأي توقف تريد إدراجه. ونرد عليك بسعر مكتوب لتلك الرحلة. ولا يُحجز شيء ولا يُستوفى أي مبلغ حتى تقبله.",
    },
    button: { en: "Request a quotation", ar: "اطلب عرض سعر" },
  } satisfies ClusterCta,
} as const;
