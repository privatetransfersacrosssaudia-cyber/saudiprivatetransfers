import type { Bilingual } from "@/lib/i18n/config";
import type {
  ClusterCta,
  ClusterFaq,
  ClusterStat,
  RelatedLink,
} from "@/lib/content/riyadh/types";
import type { RouteKey } from "@/lib/i18n/routes";
import type { SiteImageKey } from "@/lib/site-images";

/**
 * Jeddah → Madinah.
 *
 * Researched independently, and the research produced an uncomfortable result
 * that the page is built around rather than buried: **on this corridor the
 * train usually wins, and it wins by a lot.** Aggregated figures put the
 * Haramain run at roughly 1 h 45 m to 2 h against four to five hours of
 * driving, and a Haramain station sits inside King Abdulaziz airport, so an
 * arriving passenger can reach it without leaving the terminal.
 *
 * The Makkah ↔ Madinah page could award the car a row on honest grounds. Here
 * it cannot. So this page does not pretend to be a close contest: it states
 * who should take the train, plainly and first, and then sets out the cases
 * where a car is genuinely the better answer — luggage, group size, hours no
 * train runs, a door-to-door journey with no handover, and stops on the way.
 *
 * The page's central object is a **handover diagram**, not a speed table,
 * because handovers are the one axis on which the car actually wins:
 *
 * - by train from the airport: train, then a road leg — one handover;
 * - by train from a city hotel: road, train, road — two handovers;
 * - by car: one drive — none.
 *
 * Stating it that way is honest in both directions. It concedes the speed
 * argument completely and makes the real argument visible.
 *
 * Figures. The distance range 405–450 km is the one already published across
 * this site's Jeddah pages and is kept so the corridor cannot contradict its
 * hub. The duration is given as **four to five hours**, which is what the
 * independent sources support — Rome2rio computes about 4 h 9 m over 411.5 km,
 * and a route operator gives 410–430 km in four to five hours. The Jeddah hub
 * and the Jeddah airport page previously carried a more optimistic 3.75-hour
 * lower bound; nothing found in research supports a figure that low, and both
 * have been corrected to match this page.
 *
 * No train fares, times or seat availability appear anywhere. Those belong to
 * the operator, they change, and a figure copied here would only be wrong
 * later. The page says so and sends the reader to the operator.
 */

/** One way of making the journey, expressed as its segments and handovers. */
export type JourneyOption = {
  key: string;
  label: Bilingual<string>;
  /** Ordered legs. `weight` sets the segment's share of the bar. */
  segments: { kind: "road" | "rail"; label: Bilingual<string>; weight: number }[];
  /**
   * Written out rather than a number plus a shared noun: "1 handovers" is
   * wrong in English, and Arabic number-noun agreement makes the naive form
   * worse still (1 takes the singular, 2 the dual, 3-10 the plural).
   */
  handoverLabel: Bilingual<string>;
  time: Bilingual<string>;
  note: Bilingual<string>;
};

export const jeddahMadinah = {
  routeKey: "jeddahToMadinah" as RouteKey,
  imageKey: "dest-madinah" as SiteImageKey,

  seo: {
    title: {
      en: "Jeddah to Madinah by private car — and when the train is better",
      ar: "من جدة إلى المدينة المنورة بسيارة خاصة — ومتى يكون القطار أفضل",
    },
    description: {
      en: "The road north is about 405–450 km and four to five hours. The Haramain train does it in under two. Here is who the car is actually for, and how to get a written quotation.",
      ar: "الطريق شمالًا نحو 405–450 كم وأربع إلى خمس ساعات. وقطار الحرمين يقطعه في أقل من ساعتين. وهنا بيان لمن تناسبه السيارة فعلًا، وكيف تحصل على عرض سعر مكتوب.",
    },
  },

  crumbLabel: { en: "Jeddah to Madinah", ar: "جدة إلى المدينة" },

  // --- Hero --------------------------------------------------------------

  eyebrow: { en: "North to the Prophet's city", ar: "شمالًا إلى مدينة النبي ﷺ" },
  title: {
    en: "Jeddah to Madinah",
    ar: "من جدة إلى المدينة المنورة",
  },
  standfirst: {
    en: "We arrange the private car on this road, and we will begin by telling you that for most people the train is faster — a great deal faster. What a car gives you instead is one vehicle from your door to your hotel with nothing to change on the way. Below is an honest account of which of those two is your answer.",
    ar: "نرتّب السيارة الخاصة على هذا الطريق، ونبدأ بإخبارك أن القطار أسرع لمعظم الناس — أسرع بكثير. أما ما تمنحه السيارة فهو مركبة واحدة من بابك إلى فندقك دون تبديل في الطريق. وفيما يلي بيان صادق لأي الخيارين هو إجابتك.",
  },

  primaryCta: { en: "Request a quotation", ar: "اطلب عرض سعر" },
  secondaryCta: { en: "Compare the two", ar: "قارن بينهما" },

  stats: [
    {
      label: { en: "Road distance", ar: "المسافة البرية" },
      value: { en: "405–450 km", ar: "405–450 كم" },
      note: {
        en: "Door to door; planners measure less, centre to centre.",
        ar: "من الباب إلى الباب؛ وتقيس برامج المسارات أقل، من مركز إلى مركز.",
      },
    },
    {
      label: { en: "Driving time", ar: "زمن القيادة" },
      value: { en: "4–5 hrs", ar: "4–5 ساعات" },
      note: {
        en: "Before stops. Most journeys include at least one.",
        ar: "قبل التوقف. ومعظم الرحلات تتضمن توقفًا واحدًا على الأقل.",
      },
    },
    {
      label: { en: "Haramain train", ar: "قطار الحرمين" },
      value: { en: "Under 2 hrs", ar: "أقل من ساعتين" },
      note: {
        en: "Station to station, by published figures.",
        ar: "من محطة إلى محطة، بحسب الأرقام المنشورة.",
      },
    },
    {
      label: { en: "Handovers by car", ar: "مرات التبديل بالسيارة" },
      value: { en: "None", ar: "لا شيء" },
      note: {
        en: "One vehicle, loaded once and unloaded once.",
        ar: "مركبة واحدة، تُحمَّل مرة وتُفرَّغ مرة.",
      },
    },
  ] satisfies ClusterStat[],

  // --- The handover diagram ----------------------------------------------

  compare: {
    heading: { en: "Three ways to make this journey", ar: "ثلاث طرق لأداء هذه الرحلة" },
    lead: {
      en: "The bars below are not about speed — the train wins on speed and there is nothing to argue about. They are about how many times you and your luggage have to move from one thing to another, which is the axis the car actually wins on.",
      ar: "الأشرطة أدناه ليست عن السرعة — فالقطار يفوز بالسرعة ولا مجال للجدل. بل هي عن عدد المرات التي تضطر فيها أنت وحقائبك إلى الانتقال من وسيلة إلى أخرى، وهو المحور الذي تفوز فيه السيارة فعلًا.",
    },
    legend: {
      road: { en: "Road", ar: "برًّا" },
      rail: { en: "Train", ar: "قطارًا" },
    },
    options: [
      {
        key: "rail-airport",
        label: {
          en: "By train, starting at Jeddah airport",
          ar: "بالقطار، بدءًا من مطار جدة",
        },
        segments: [
          {
            kind: "rail" as const,
            label: { en: "Haramain, station inside the terminal", ar: "قطار الحرمين، ومحطته داخل الصالة" },
            weight: 7,
          },
          {
            kind: "road" as const,
            label: { en: "Road leg to your hotel", ar: "مرحلة برية إلى فندقك" },
            weight: 2,
          },
        ],
        handoverLabel: { en: "One handover", ar: "تبديل واحد" },
        time: { en: "Roughly 2 hrs plus the last leg", ar: "نحو ساعتين زائد المرحلة الأخيرة" },
        note: {
          en: "The strongest case for the train anywhere in the Kingdom: the station is in the airport, so you never leave the building to reach it. If you are landing at Jeddah with hand luggage and heading straight for Madinah, this is very likely your answer.",
          ar: "أقوى حجة للقطار في المملكة كلها: فالمحطة داخل المطار، فلا تغادر المبنى للوصول إليها. فإن كنت تهبط في جدة بأمتعة يدوية ومتجهًا مباشرة إلى المدينة المنورة، فهذه على الأرجح إجابتك.",
        },
      },
      {
        key: "rail-city",
        label: {
          en: "By train, starting at a Jeddah hotel",
          ar: "بالقطار، بدءًا من فندق في جدة",
        },
        segments: [
          {
            kind: "road" as const,
            label: { en: "Road leg to the city station", ar: "مرحلة برية إلى محطة المدينة" },
            weight: 2,
          },
          {
            kind: "rail" as const,
            label: { en: "Haramain", ar: "قطار الحرمين" },
            weight: 7,
          },
          {
            kind: "road" as const,
            label: { en: "Road leg to your hotel", ar: "مرحلة برية إلى فندقك" },
            weight: 2,
          },
        ],
        handoverLabel: { en: "Two handovers", ar: "تبديلان" },
        time: { en: "Roughly 2 hrs plus both legs", ar: "نحو ساعتين زائد المرحلتين" },
        note: {
          en: "Still quick, but the ends are now yours to manage: a drive across Jeddah to Al-Sulaymaniyah, bags on and off, then another road leg at the Madinah end, where the station is in Knowledge Economic City rather than beside the Prophet's Mosque.",
          ar: "ما زال سريعًا، لكن الطرفين صارا من شأنك: رحلة عبر جدة إلى السليمانية، وتحميل الحقائب وتنزيلها، ثم مرحلة برية أخرى في طرف المدينة المنورة، حيث تقع المحطة في مدينة المعرفة الاقتصادية لا بجوار المسجد النبوي.",
        },
      },
      {
        key: "car",
        label: {
          en: "By car, starting anywhere in Jeddah",
          ar: "بالسيارة، بدءًا من أي مكان في جدة",
        },
        segments: [
          {
            kind: "road" as const,
            label: { en: "One drive, door to door", ar: "قيادة واحدة، من الباب إلى الباب" },
            weight: 11,
          },
        ],
        handoverLabel: { en: "No handovers", ar: "بلا تبديل" },
        time: { en: "4–5 hrs", ar: "4–5 ساعات" },
        note: {
          en: "Slower on the clock and simpler in every other way. The car collects you where you are, at the hour you choose, and stops where you ask. Nothing is carried across a concourse and nobody is counted onto a platform.",
          ar: "أبطأ على الساعة وأبسط في كل ما عداها. فالسيارة تقلّك من حيث أنت، في الساعة التي تختارها، وتتوقف حيث تطلب. ولا يُحمل شيء عبر صالة ولا يُعدّ أحد على رصيف.",
        },
      },
    ] satisfies JourneyOption[],
    footnote: {
      en: "We publish no train fares, departure times or seat availability. Those belong to the Haramain operator, they change, and a figure copied here would only be wrong later. Check the operator directly — and if the train suits you better, take it.",
      ar: "ولا ننشر أسعار القطار ولا مواعيد مغادرته ولا توافر مقاعده. فتلك من شأن مشغّل قطار الحرمين، وهي تتغير، ورقم يُنقل هنا لن يكون إلا خطأً لاحقًا. فراجع المشغّل مباشرةً — وإن كان القطار أنسب لك فخذه.",
    },
  },

  // --- Who the car is for -------------------------------------------------

  carFor: {
    heading: { en: "When the car is the better answer", ar: "متى تكون السيارة الإجابة الأفضل" },
    lead: {
      en: "Not a sales list. These are the cases where people who started out intending to take the train end up asking us for a price instead, and they are the ones where we think they are right to.",
      ar: "ليست قائمة ترويجية. بل هي الحالات التي ينتهي فيها من كان ينوي ركوب القطار إلى طلب سعر منا، وهي التي نرى أنهم محقون فيها.",
    },
    cases: [
      {
        title: { en: "A family, with real luggage", ar: "عائلة، ومعها حقائب حقيقية" },
        body: {
          en: "Loading once at a hotel door and unloading once at another beats two road legs, a platform and a luggage rack. The more of you there are, the more decisively this holds.",
          ar: "فالتحميل مرة عند باب فندق والتفريغ مرة عند آخر أفضل من مرحلتين بريتين ورصيف ورفّ حقائب. وكلما زاد عددكم ازدادت هذه الحجة رجحانًا.",
        },
      },
      {
        title: { en: "An hour that does not suit a train", ar: "ساعة لا تناسب قطارًا" },
        body: {
          en: "A car leaves when you are ready, including at hours no service runs, and waits while you finish at the hotel. Check the operator's timetable first — if a departure happens to sit near your checkout, take it.",
          ar: "فالسيارة تنطلق حين تكون جاهزًا، بما في ذلك ساعات لا تعمل فيها الخدمة، وتنتظر ريثما تنهي أمورك في الفندق. فراجع جدول المشغّل أولًا — فإن صادف أن تقع مغادرة قرب موعد مغادرتك الفندق فخذها.",
        },
      },
      {
        title: { en: "You want to stop on the way", ar: "تريد التوقف في الطريق" },
        body: {
          en: "A train stops where its timetable says. If you want a service break, a prayer stop, or a visit somewhere on the route, it belongs in the quotation and the car is the only one of the three that can do it.",
          ar: "فالقطار يتوقف حيث يقول جدوله. أما إن أردت استراحة أو توقفًا للصلاة أو زيارة موضع على المسار، فمحل ذلك عرض السعر، والسيارة وحدها من الثلاثة من يستطيعه.",
        },
      },
      {
        title: { en: "Nobody wants a handover that day", ar: "لا أحد يريد تبديلًا ذلك اليوم" },
        body: {
          en: "After a long flight, or with someone in the party who finds platforms and stairs hard going, the simpler journey is worth more than the faster one. That is a legitimate reason and we are not going to talk you out of it.",
          ar: "فبعد رحلة جوية طويلة، أو مع وجود من يشق عليه الأرصفة والدرج في المجموعة، تكون الرحلة الأبسط أثمن من الأسرع. وهذا سبب وجيه ولن نثنيك عنه.",
        },
      },
    ],
  },

  // --- The road -----------------------------------------------------------

  road: {
    heading: { en: "The drive itself", ar: "الرحلة البرية نفسها" },
    lead: {
      en: "A long coastal-then-inland run north. Straightforward driving; the length is the thing to plan around rather than the difficulty.",
      ar: "رحلة طويلة شمالًا، ساحلية ثم داخلية. والقيادة فيها مباشرة؛ والطول هو ما ينبغي التخطيط له لا الصعوبة.",
    },
    points: [
      {
        title: { en: "Where it starts changes the distance", ar: "نقطة البدء تغيّر المسافة" },
        body: {
          en: "Jeddah runs a long way up the coast, so a pickup in the north of the city and a pickup near Al-Balad are not the same journey. We quote on your actual address rather than on a city-to-city figure.",
          ar: "تمتد جدة مسافة طويلة على الساحل، فالاستقبال من شمال المدينة والاستقبال قرب البلد ليسا الرحلة نفسها. ونحن نسعّر وفق عنوانك الفعلي لا وفق رقم من مدينة إلى مدينة.",
        },
      },
      {
        title: { en: "One stop is normal", ar: "التوقف مرة أمر معتاد" },
        body: {
          en: "Service areas with fuel, food and prayer facilities sit along the route. Most parties stop once; families with children often stop twice. Say if you would rather press on.",
          ar: "على المسار مناطق خدمات فيها وقود وطعام ومصليات. ومعظم المجموعات تتوقف مرة؛ والعائلات التي معها أطفال تتوقف مرتين غالبًا. فاذكر إن كنت تفضّل المواصلة.",
        },
      },
      {
        title: { en: "Arriving in the Central Area", ar: "الوصول إلى المنطقة المركزية" },
        body: {
          en: "Most journeys end at a hotel near the Prophet's Mosque, where the approach roads are managed. Give the hotel by name and the drop-off point is confirmed with you before the day.",
          ar: "تنتهي معظم الرحلات عند فندق قرب المسجد النبوي، حيث طرق الاقتراب منظَّمة. فاذكر اسم الفندق ليُؤكَّد معك مكان التوصيل قبل اليوم المحدد.",
        },
      },
      {
        title: { en: "Check-in time is worth saying", ar: "يستحق موعد دخول الفندق أن يُذكر" },
        body: {
          en: "If the room is not available until the afternoon, a very early departure only buys you a wait in a lobby. Tell us and we will plan around it.",
          ar: "إذا لم تكن الغرفة متاحة قبل العصر، فالانطلاق المبكر جدًا لا يشتري لك إلا انتظارًا في بهو الفندق. فأخبرنا لنخطط وفق ذلك.",
        },
      },
    ],
    footnote: {
      en: "Route planners compute about 411 km and a little over four hours for this road, measuring centre to centre. The range above is door to door, which is why it is wider at both ends. Your quotation is written against the two addresses you give us.",
      ar: "تحسب برامج تخطيط المسارات نحو 411 كم وما يزيد قليلًا على أربع ساعات لهذا الطريق، قياسًا من مركز إلى مركز. أما النطاق أعلاه فمن الباب إلى الباب، ولذلك هو أوسع في الطرفين. ويُكتب عرض سعرك وفق العنوانين اللذين تعطينا إياهما.",
    },
  },

  // --- What to send -------------------------------------------------------

  sending: {
    heading: { en: "What we need to quote it", ar: "ما نحتاجه لتسعيرها" },
    lead: {
      en: "Each line changes the answer, and sending them together is the difference between a price and a round of questions.",
      ar: "كل سطر يغيّر الإجابة، وإرسالها مجتمعة هو الفرق بين سعر وجولة أسئلة.",
    },
    items: [
      {
        en: "Where in Jeddah you are starting — the hotel by name and its district, or the airport with your flight number.",
        ar: "من أين تبدأ في جدة — اسم الفندق وحيّه، أو المطار مع رقم رحلتك.",
      },
      {
        en: "The hotel in Madinah by name, so the drop-off point can be confirmed.",
        ar: "واسم الفندق في المدينة المنورة، ليُؤكَّد مكان التوصيل.",
      },
      {
        en: "The date, and the time you want to leave — and whether that time is set by a checkout or a check-in.",
        ar: "والتاريخ ووقت المغادرة المطلوب — وهل يحدده موعد مغادرة فندق أم موعد دخول آخر.",
      },
      {
        en: "Passengers counted exactly, including children and infants travelling on a lap.",
        ar: "وعدد الركاب بدقة، شاملًا الأطفال والرضّع المحمولين.",
      },
      {
        en: "Luggage counted honestly, with Zamzam containers included.",
        ar: "وعدد الحقائب بصدق، مع إدراج عبوات ماء زمزم.",
      },
      {
        en: "Any stop you want built into the journey.",
        ar: "وأي توقف تريد إدراجه في الرحلة.",
      },
      {
        en: "Anything out of the ordinary: a child seat, a wheelchair, a passenger who cannot manage steps.",
        ar: "وأي أمر غير معتاد: مقعد أطفال، أو كرسي متحرك، أو راكب لا يستطيع صعود الدرج.",
      },
    ] satisfies Bilingual<string>[],
  },

  // --- Vehicles -----------------------------------------------------------

  vehicles: {
    heading: { en: "Which vehicle to ask for", ar: "أي مركبة تطلب" },
    lead: {
      en: "Categories, not a named fleet — we confirm what is available for your date rather than promising a model. Four to five hours is long enough that a category one seat too small stops being a detail.",
      ar: "فئات لا أسطول بأسماء — فنحن نؤكد المتاح لتاريخك بدل الوعد بطراز. وأربع إلى خمس ساعات مدة تكفي لأن تتوقف فئة تنقصها مقعد واحد عن كونها تفصيلًا.",
    },
    slugs: ["sedan", "suv", "van", "minibus"],
    footnote: {
      en: "Seat and luggage figures are the brackets we quote against, not a promise about a particular car.",
      ar: "وأرقام المقاعد والحقائب هي الفئات التي نسعّر وفقها، لا وعدًا بسيارة بعينها.",
    },
  },

  // --- Booking ------------------------------------------------------------

  booking: {
    heading: { en: "How booking works", ar: "كيف يتم الحجز" },
    note: {
      en: "Sending an enquiry does not confirm a booking and does not hold a vehicle for your date. We reply with a written price; you decide; and your transfer is confirmed only when we send a booking confirmation saying so. Nothing is reserved and no payment is taken on this website. Peak Umrah periods and the Hajj season are the dates most likely to be unavailable — and if we cannot cover a journey we will say so rather than leave the request open.",
      ar: "إرسال الطلب لا يؤكد حجزًا ولا يحجز مركبة لتاريخك. ونرد عليك بسعر مكتوب؛ ثم تقرر أنت؛ ولا تتأكد رحلتك إلا عندما نرسل رسالة تأكيد حجز تنص على ذلك. ولا يُحجز شيء ولا يُستوفى أي مبلغ عبر هذا الموقع. وفترات العمرة الذروة وموسم الحج أكثر التواريخ احتمالًا لعدم التوافر — وإن تعذّر علينا تغطية رحلة قلنا ذلك بدل إبقاء الطلب معلّقًا.",
    },
  },

  // --- FAQs ---------------------------------------------------------------

  faqs: [
    {
      question: {
        en: "How long does it take to drive from Jeddah to Madinah?",
        ar: "كم تستغرق الرحلة البرية من جدة إلى المدينة المنورة؟",
      },
      answer: {
        en: "About four to five hours of driving for roughly 405–450 km door to door, before any stop, and most parties stop at least once. Route planners compute less — around 411 km and a little over four hours — because they measure centre to centre rather than from one hotel door to another. Where in Jeddah you start makes a real difference, so we quote on your address.",
        ar: "نحو أربع إلى خمس ساعات من القيادة لمسافة تقارب 405–450 كم من الباب إلى الباب، قبل أي توقف، ومعظم المجموعات تتوقف مرة على الأقل. وتحسب برامج تخطيط المسارات أقل — نحو 411 كم وما يزيد قليلًا على أربع ساعات — لأنها تقيس من مركز إلى مركز لا من باب فندق إلى آخر. ونقطة البدء في جدة تُحدث فرقًا حقيقيًا، ولذلك نسعّر وفق عنوانك.",
      },
    },
    {
      question: {
        en: "Should I take the Haramain train instead?",
        ar: "هل آخذ قطار الحرمين بدلًا من ذلك؟",
      },
      answer: {
        en: "Quite possibly, and we would rather say so than sell you a car you do not need. The train does this corridor in well under half the driving time, and a Haramain station sits inside King Abdulaziz airport, so if you are landing at Jeddah with hand luggage and going straight on, it is very likely your answer. The car wins when there is real luggage, a group, an hour no train serves, a stop you want on the way, or simply a day when nobody wants to change vehicles.",
        ar: "ربما نعم، ونفضّل قول ذلك على أن نبيعك سيارة لا تحتاجها. فالقطار يقطع هذا المسار في أقل بكثير من نصف زمن القيادة، وتقع محطة لقطار الحرمين داخل مطار الملك عبدالعزيز، فإن كنت تهبط في جدة بأمتعة يدوية ومتجهًا مباشرة فهو على الأرجح إجابتك. أما السيارة فتتفوق عند وجود حقائب حقيقية، أو مجموعة، أو ساعة لا يخدمها قطار، أو توقف تريده في الطريق، أو ببساطة يوم لا يريد فيه أحد تبديل المركبات.",
      },
    },
    {
      question: {
        en: "Which Jeddah station does the train leave from?",
        ar: "من أي محطة في جدة ينطلق القطار؟",
      },
      answer: {
        en: "Jeddah has two Haramain stations: one in the city at Al-Sulaymaniyah and one inside King Abdulaziz airport. They are a long way apart, so if you are asking us for a road leg to a station, say which one. At the Madinah end the station is in Knowledge Economic City, about 7 km from the Prophet's Mosque, so a road leg is needed there in any case. We sell no rail tickets and publish no train times.",
        ar: "في جدة محطتان لقطار الحرمين: واحدة في المدينة بالسليمانية، وأخرى داخل مطار الملك عبدالعزيز. وبينهما مسافة بعيدة، فإن كنت تطلب منا مرحلة برية إلى محطة فاذكر أيهما. وفي طرف المدينة المنورة تقع المحطة في مدينة المعرفة الاقتصادية، على نحو 7 كم من المسجد النبوي، فتلزم مرحلة برية هناك على كل حال. ونحن لا نبيع تذاكر قطار ولا ننشر مواعيده.",
      },
    },
    {
      question: {
        en: "Can you collect me from Jeddah airport and drive straight to Madinah?",
        ar: "هل يمكنكم استقبالي من مطار جدة والتوجه مباشرة إلى المدينة؟",
      },
      answer: {
        en: "Yes. Send the flight number and the pickup follows your aircraft rather than a clock time, with sixty minutes of waiting included. Be aware that this is the one journey where the train is at its strongest, because its station is inside the terminal — if you are travelling light, it is worth checking the timetable before you ask us for a price.",
        ar: "نعم. أرسل رقم الرحلة ليتبع موعد الاستقبال طائرتك لا توقيت الساعة، مع ستين دقيقة انتظار مشمولة. وانتبه إلى أن هذه هي الرحلة التي يكون فيها القطار في أقوى حالاته، لأن محطته داخل الصالة — فإن كنت مسافرًا بأمتعة خفيفة فيستحق الأمر مراجعة الجدول قبل أن تطلب منا سعرًا.",
      },
    },
    {
      question: {
        en: "Can we stop on the way, and does it cost more?",
        ar: "هل يمكننا التوقف في الطريق، وهل يزيد ذلك التكلفة؟",
      },
      answer: {
        en: "Yes to stopping — service areas with fuel, food and prayer facilities sit along the route, and a short service stop is part of a journey this long. A stop that adds real time, such as a detour or a long wait, belongs in the quotation, so tell us in advance and it will be priced rather than discussed at the roadside.",
        ar: "نعم للتوقف — فعلى المسار مناطق خدمات فيها وقود وطعام ومصليات، والتوقف القصير للخدمات جزء من رحلة بهذا الطول. أما التوقف الذي يضيف وقتًا فعليًا، كانعطاف عن المسار أو انتظار طويل، فمحله عرض السعر، فأخبرنا مسبقًا ليُسعَّر بدل أن يُناقَش على قارعة الطريق.",
      },
    },
    {
      question: {
        en: "Can a non-Muslim travel on this route?",
        ar: "هل يمكن لغير المسلم السفر على هذا المسار؟",
      },
      answer: {
        en: "Madinah does not carry the entry restriction that applies to Makkah, though the area immediately around the Prophet's Mosque is treated differently from the rest of the city. This road does not pass through Makkah. We arrange road transport and do not give immigration or religious advice, and we are not an official Hajj or Umrah operator — tell us the journey you need and we will answer honestly for that specific journey.",
        ar: "لا يسري على المدينة المنورة قيد الدخول المطبَّق على مكة المكرمة، وإن كان المحيط المباشر للمسجد النبوي يُعامل معاملة تختلف عن بقية المدينة. وهذا الطريق لا يمر بمكة. ونحن نرتّب النقل البري ولا نقدّم استشارات تتعلق بالجوازات أو الشرع، ولسنا مشغّلًا رسميًا للحج أو العمرة — فأخبرنا بالرحلة التي تحتاجها ونجيبك بصدق عن تلك الرحلة تحديدًا.",
      },
    },
    {
      question: {
        en: "Is there a fixed price for Jeddah to Madinah?",
        ar: "هل هناك سعر ثابت من جدة إلى المدينة؟",
      },
      answer: {
        en: "No. Every journey is quoted individually, because the price depends on where in Jeddah you start, the vehicle category, the date and time, and any stop you want built in. You get a written price before anything is reserved, and nothing is confirmed until we send a booking confirmation.",
        ar: "لا. فكل رحلة تُسعَّر على حدة، لأن السعر يعتمد على نقطة البدء في جدة وفئة المركبة والتاريخ والوقت وأي توقف تريد إدراجه. وتحصل على سعر مكتوب قبل حجز أي شيء، ولا يتأكد شيء حتى نرسل رسالة تأكيد الحجز.",
      },
    },
  ] satisfies ClusterFaq[],

  // --- Related ------------------------------------------------------------

  relatedHeading: { en: "Related journeys", ar: "رحلات ذات صلة" },
  related: [
    {
      routeKey: "jeddah" as RouteKey,
      label: { en: "All Jeddah transfers", ar: "جميع خدمات النقل في جدة" },
      note: {
        en: "The hub: the airport, the road to Makkah, the corniche and journeys out of the city.",
        ar: "الصفحة الرئيسية: المطار، وطريق مكة، والكورنيش، والرحلات خارج المدينة.",
      },
    },
    {
      routeKey: "madinah" as RouteKey,
      label: { en: "All Madinah transfers", ar: "جميع خدمات النقل في المدينة" },
      note: {
        en: "The other end: airport and station pickups, hotel runs and Ziyarat.",
        ar: "الطرف الآخر: الاستقبال من المطار والمحطة، والتنقل بين الفنادق، والزيارة.",
      },
    },
    {
      routeKey: "madinahAirport" as RouteKey,
      label: { en: "Madinah airport transfers", ar: "النقل من مطار المدينة" },
      note: {
        en: "If you fly this leg instead: arrivals timed to your flight, about 20 km into the city.",
        ar: "إن قطعت هذه المرحلة جوًّا: استقبال مضبوط على رحلتك، ونحو 20 كم إلى المدينة.",
      },
    },
    {
      routeKey: "jeddahToMakkah" as RouteKey,
      label: { en: "Jeddah to Makkah", ar: "من جدة إلى مكة" },
      note: {
        en: "The journey most people make first, with the entry rules set out in full.",
        ar: "الرحلة التي يؤديها معظم الناس أولًا، مع بيان قيود الدخول كاملة.",
      },
    },
  ] satisfies RelatedLink[],

  cta: {
    eyebrow: { en: "One price, in writing", ar: "سعر واحد، مكتوب" },
    heading: {
      en: "Tell us where in Jeddah you are starting",
      ar: "أخبرنا من أين تبدأ في جدة",
    },
    body: {
      en: "With the Madinah hotel, the date and time, how many passengers and bags, and any stop you want built in. We reply with a written price for that journey. Nothing is reserved and no payment is taken until you accept it — and if the train is the better answer for you, we will say so.",
      ar: "مع فندق المدينة المنورة، والتاريخ والوقت، وعدد الركاب والحقائب، وأي توقف تريد إدراجه. ونرد عليك بسعر مكتوب لتلك الرحلة. ولا يُحجز شيء ولا يُستوفى أي مبلغ حتى تقبله — وإن كان القطار هو الإجابة الأفضل لك قلنا ذلك.",
    },
    button: { en: "Request a quotation", ar: "اطلب عرض سعر" },
  } satisfies ClusterCta,
} as const;
