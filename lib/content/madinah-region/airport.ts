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
 * Madinah airport transfers.
 *
 * Researched independently of the corridor page, and the research is what
 * shaped it. Three things came back that no template would have produced:
 *
 * 1. Saudipedia states the airport is "about twenty km from the Prophet's
 *    Mosque" in both its body text and its info box, and that it is reached
 *    from inside the city "through three routes: Airport Road, King Abdulaziz
 *    Road, and King Salman Road, within twenty-five minutes". Three *named*
 *    roads and a stated time is unusually specific for a Saudi airport, and it
 *    is the spine of this page.
 * 2. Saudipedia does **not** describe the terminal structure at all — not how
 *    many terminals, not whether domestic and international are separate
 *    halls. Other published sources disagree with each other. So this page
 *    publishes no terminal chart and says plainly why, consistent with how the
 *    Jeddah airport page handles the same problem.
 * 3. The Makkah Route Initiative completes immigration, visa, health checks
 *    and baggage at the pilgrim's *home* airport, and arrivals under it board
 *    dedicated buses to their accommodation in Makkah or Madinah. It is for
 *    Hajj pilgrims only, from participating airports in a limited set of
 *    countries, and coverage changes season to season.
 *
 * That third item is the page's honest moment, and the equivalent of the
 * Haramain comparison on the corridor page: a large share of this airport's
 * arrivals already have their transfer handled and should not be sold one.
 * The `makkahRoute` block says so before the page asks for an enquiry, and it
 * refuses to tell a reader whether they are on the scheme, because only their
 * Hajj organiser knows and we are not a Hajj operator.
 *
 * Distances conflict in the wild — lower sources say 10 to 15 km. Saudipedia
 * is the authority and says twenty, twice, so twenty is what appears, with a
 * footnote rather than a silent choice.
 *
 * The hero image is Al-Masjid an-Nabawi — where the transfer ends — and not a
 * terminal photograph. The project holds no picture of this airport. It
 * previously used `svc-airport`, which was checked against the actual file and
 * is the terminal at Jeddah's King Abdulaziz International, with its
 * distinctive curved roof: an unmistakable airport building, and the wrong
 * one. A photograph of a different airport on an airport page reads as a claim
 * about this one. If a verified picture of Prince Mohammad bin Abdulaziz
 * International is ever licensed, it belongs here.
 *
 * Nothing here describes a facility, a gate, a hall, a meeting point inside
 * the building or a procedure that was not in a source. Where the honest
 * answer is "we confirm it for your booking", that is what it says.
 */

export type RoadRoute = {
  name: Bilingual<string>;
};

/** One line of the input ledger: what you send, and what it decides. */
export type InputRow = {
  input: Bilingual<string>;
  decides: Bilingual<string>;
};

export const madinahAirport = {
  routeKey: "madinahAirport" as RouteKey,
  imageKey: "pilgrimage" as SiteImageKey,

  seo: {
    title: {
      en: "Madinah airport transfers — Prince Mohammad bin Abdulaziz (MED)",
      ar: "النقل من مطار المدينة المنورة — الأمير محمد بن عبدالعزيز (MED)",
    },
    description: {
      en: "Private car between Madinah airport and your hotel, about 20 km. Arrivals timed to your flight number, departures worked back from check-in, and an honest note on who does not need us.",
      ar: "سيارة خاصة بين مطار المدينة المنورة وفندقك، نحو 20 كم. استقبال مضبوط على رقم رحلتك، ومغادرة محسوبة تراجعيًا من موعد إجراءات السفر، وملاحظة صادقة عمّن لا يحتاج إلينا.",
    },
  },

  crumbLabel: { en: "Airport transfers", ar: "النقل من المطار" },

  // --- Hero --------------------------------------------------------------

  eyebrow: {
    en: "Prince Mohammad bin Abdulaziz International",
    ar: "مطار الأمير محمد بن عبدالعزيز الدولي",
  },
  title: {
    en: "Madinah airport transfers",
    ar: "النقل من مطار المدينة المنورة وإليه",
  },
  standfirst: {
    en: "Nearly everyone who lands here is going to the same part of the city, so the journey is rarely the hard part. The timing is. We set the pickup from your flight number rather than from a clock, and for a departure we work backwards from check-in.",
    ar: "يقصد جميع من يهبطون هنا تقريبًا الجزء نفسه من المدينة، فنادرًا ما تكون الرحلة هي الجزء الصعب. التوقيت هو الصعب. ونحن نضبط موعد الاستقبال على رقم رحلتك لا على الساعة، وفي المغادرة نحسب تراجعيًا من موعد إجراءات السفر.",
  },

  /** The headline object: the distance, the time, and the three named roads. */
  approach: {
    distance: { en: "~20 km", ar: "~20 كم" },
    duration: { en: "~25 minutes", ar: "~25 دقيقة" },
    toLabel: { en: "to the Prophet's Mosque", ar: "إلى المسجد النبوي" },
    roadsLabel: { en: "Three routes into the city", ar: "ثلاثة طرق إلى المدينة" },
    roads: [
      { name: { en: "Airport Road", ar: "طريق المطار" } },
      { name: { en: "King Abdulaziz Road", ar: "طريق الملك عبدالعزيز" } },
      { name: { en: "King Salman Road", ar: "طريق الملك سلمان" } },
    ] satisfies RoadRoute[],
  },

  primaryCta: { en: "Request a quotation", ar: "اطلب عرض سعر" },
  secondaryCta: { en: "Do you need us?", ar: "هل تحتاج إلينا؟" },

  stats: [
    {
      label: { en: "To the Prophet's Mosque", ar: "إلى المسجد النبوي" },
      value: { en: "~20 km", ar: "~20 كم" },
      note: {
        en: "Saudipedia's figure, in its text and its info box.",
        ar: "رقم «السعودية بالعربي»، في نصّها وفي بطاقة بياناتها.",
      },
    },
    {
      label: { en: "Typical drive", ar: "زمن الرحلة المعتاد" },
      value: { en: "~25 min", ar: "~25 دقيقة" },
      note: {
        en: "Longer at prayer times and in the Hajj and Umrah seasons.",
        ar: "وأطول في أوقات الصلاة وفي موسمي الحج والعمرة.",
      },
    },
    {
      label: { en: "Routes into the city", ar: "الطرق إلى المدينة" },
      value: { en: "Three", ar: "ثلاثة" },
      note: {
        en: "Airport, King Abdulaziz and King Salman roads.",
        ar: "طرق المطار والملك عبدالعزيز والملك سلمان.",
      },
    },
    {
      label: { en: "For pilgrims", ar: "لقاصدي الحج والعمرة" },
      value: { en: "Second to Jeddah", ar: "الثاني بعد جدة" },
      note: {
        en: "The Kingdom's second airport for Hajj and Umrah arrivals.",
        ar: "ثاني مطارات المملكة في استقبال قاصدي الحج والعمرة.",
      },
    },
  ] satisfies ClusterStat[],

  // --- The honest block ---------------------------------------------------

  makkahRoute: {
    eyebrow: { en: "Before you ask for a price", ar: "قبل أن تطلب سعرًا" },
    heading: {
      en: "Some arrivals here already have transport",
      ar: "بعض القادمين إلى هنا لديهم نقل مرتَّب بالفعل",
    },
    lead: {
      en: "The Makkah Route Initiative moves immigration, the visa, health checks and baggage to the pilgrim's own departure airport. Pilgrims who travel under it board dedicated buses to their accommodation on arrival, with luggage handled separately. If that is you, your transfer is part of the scheme and you do not need to buy one.",
      ar: "تنقل مبادرة «طريق مكة» إجراءات الجوازات والتأشيرة والفحص الصحي والحقائب إلى مطار مغادرة الحاج نفسه. ومن يسافر ضمنها يستقلّ عند الوصول حافلات مخصصة إلى مكان إقامته، وتُعالج حقائبه على حدة. فإن كنت منهم، فنقلك جزء من المبادرة ولا حاجة بك إلى شرائه.",
    },
    columns: [
      {
        title: { en: "Then you probably do not need us", ar: "إذن غالبًا لا تحتاج إلينا" },
        body: {
          en: "You are travelling for Hajj, from one of the participating airports, and your organiser has told you that you are on the Makkah Route. Your arrival and your onward transport are arranged. Booking a car as well would mean paying twice for one journey.",
          ar: "أنت مسافر للحج، من أحد المطارات المشاركة، وأخبرك منظّمك أنك ضمن «طريق مكة». فوصولك ونقلك التالي مرتَّبان. وحجز سيارة فوق ذلك يعني أن تدفع مرتين عن رحلة واحدة.",
        },
      },
      {
        title: { en: "Then this page is for you", ar: "إذن هذه الصفحة لك" },
        body: {
          en: "You are arriving for Umrah or on an ordinary visit, or on a domestic flight, or for Hajj from an airport the scheme does not cover. You clear immigration at Madinah and you make your own way to your hotel. That is the journey we arrange.",
          ar: "أنت قادم لعمرة أو زيارة عادية، أو على رحلة داخلية، أو للحج من مطار لا تشمله المبادرة. فتُنهي إجراءات الجوازات في المدينة المنورة وتتدبر وصولك إلى فندقك بنفسك. وتلك هي الرحلة التي نرتّبها.",
        },
      },
    ],
    footnote: {
      en: "The scheme is for Hajj pilgrims only, it runs from a limited list of participating airports, and the countries and airports on that list change from season to season. We are not a Hajj operator and we cannot tell you whether you are on it — your Hajj organiser can, and they are the right people to ask.",
      ar: "والمبادرة مخصصة لحجاج بيت الله الحرام وحدهم، وتنطلق من قائمة محدودة من المطارات المشاركة، وتتغير الدول والمطارات في تلك القائمة من موسم إلى آخر. ولسنا مشغّلًا للحج ولا يمكننا إخبارك هل أنت ضمنها — فمنظّم حجك يعلم ذلك، وهو الجهة الصحيحة للسؤال.",
    },
  },

  // --- Arrivals -----------------------------------------------------------

  arrivals: {
    heading: { en: "Landing at Madinah", ar: "الهبوط في المدينة المنورة" },
    lead: {
      en: "The driver is waiting when you come out, because the pickup was set from the aircraft rather than from the time printed on your ticket.",
      ar: "يكون السائق في انتظارك عند خروجك، لأن موعد الاستقبال ضُبط على الطائرة لا على الوقت المطبوع في تذكرتك.",
    },
    steps: [
      {
        title: { en: "Send the flight number", ar: "أرسل رقم الرحلة" },
        body: {
          en: "It is the single most useful thing on the form. The pickup follows your aircraft, so an early landing or a two-hour delay moves the pickup instead of stranding it.",
          ar: "هو أنفع ما في النموذج. فموعد الاستقبال يتبع طائرتك، فالهبوط المبكر أو التأخر ساعتين يُزيح الموعد بدل أن يُفشله.",
        },
      },
      {
        title: { en: "We confirm the meeting arrangement", ar: "نؤكد ترتيب اللقاء" },
        body: {
          en: "In writing, before the day, for your flight — not a landmark copied off someone else's website. You also get a number to call if anything changes while you are still inside.",
          ar: "كتابةً، قبل اليوم المحدد، ولرحلتك أنت — لا معلمًا منقولًا عن موقع آخر. ويصلك كذلك رقم للاتصال إن تغيّر شيء وأنت ما زلت في الداخل.",
        },
      },
      {
        title: { en: "Sixty minutes of waiting is included", ar: "ستون دقيقة انتظار مشمولة" },
        body: {
          en: "Which covers an ordinary walk through immigration and baggage. Because the pickup is set from the flight, a late landing does not by itself eat into that hour.",
          ar: "وتغطي المرور المعتاد بالجوازات واستلام الحقائب. ولأن الموعد مضبوط على الرحلة، فالهبوط المتأخر لا يستهلك تلك الساعة بذاته.",
        },
      },
      {
        title: { en: "Tell us the hotel by name", ar: "اذكر اسم الفندق" },
        body: {
          en: "The Central Area around the Prophet's Mosque has managed approach roads, so the drop-off point is confirmed with you rather than assumed.",
          ar: "فالمنطقة المركزية حول المسجد النبوي فيها طرق اقتراب منظَّمة، ولذلك يُؤكَّد معك مكان التوصيل بدل افتراضه.",
        },
      },
    ],
    lateNote: {
      en: "If you land before dawn, say so. A 3am arrival and a 3pm arrival are different jobs: the room may not be ready, the Central Area moves differently around Fajr, and it is better to plan for that than to discover it with your luggage in a lobby.",
      ar: "وإذا هبطت قبل الفجر فاذكر ذلك. فالوصول الثالثة فجرًا يختلف عن الوصول الثالثة عصرًا: قد لا تكون الغرفة جاهزة، وتتحرك المنطقة المركزية على نحو مختلف قرب الفجر، والتخطيط لذلك أفضل من اكتشافه وحقائبك في بهو الفندق.",
    },
  },

  // --- Departures ---------------------------------------------------------

  departures: {
    heading: { en: "Flying out of Madinah", ar: "المغادرة من مطار المدينة" },
    lead: {
      en: "The arithmetic runs the other way. Give us the airline's check-in or bag-drop time and we work back from it — through the drive, the traffic you are likely to meet and the hour of day — to a pickup time at your hotel door.",
      ar: "هنا يسير الحساب في الاتجاه المعاكس. أعطنا موعد إجراءات السفر أو تسليم الحقائب لدى شركة الطيران ونحسب تراجعيًا منه — عبر زمن الطريق، والازدحام المتوقع، وساعة اليوم — لنصل إلى موعد استقبال عند باب فندقك.",
    },
    points: [
      {
        title: { en: "Give the flight number here too", ar: "اذكر رقم الرحلة هنا أيضًا" },
        body: {
          en: "A departure that is retimed is as disruptive as an arrival that is delayed, and we would rather know about it from the flight than from you at the door.",
          ar: "فتغيير موعد المغادرة لا يقل إرباكًا عن تأخر الوصول، ونفضّل أن نعرف ذلك من الرحلة لا منك عند الباب.",
        },
      },
      {
        title: { en: "Say if you are checking bags", ar: "أخبرنا إن كنت ستسجّل حقائب" },
        body: {
          en: "Bag drop closes before boarding does, and in the pilgrimage seasons the queue for it is the part that catches people out.",
          ar: "فتسليم الحقائب يُغلق قبل الصعود إلى الطائرة، وفي مواسم الحج والعمرة يكون طابوره هو ما يفاجئ الناس.",
        },
      },
      {
        title: { en: "Hotel checkout is the other constraint", ar: "مغادرة الفندق هي القيد الآخر" },
        body: {
          en: "If checkout is hours before your flight, tell us — sometimes the better answer is a later pickup with your bags held at the hotel rather than a long wait at the airport.",
          ar: "فإن كان موعد مغادرة الفندق قبل رحلتك بساعات، فأخبرنا — فقد يكون الأفضل أحيانًا استقبالًا متأخرًا مع حفظ حقائبك في الفندق بدل انتظار طويل في المطار.",
        },
      },
    ],
  },

  // --- The road -----------------------------------------------------------

  roads: {
    heading: { en: "The drive into the city", ar: "الطريق إلى داخل المدينة" },
    lead: {
      en: "About 20 km, and the airport connects to the city by three roads rather than one. Which of them the driver uses on the day is a matter of the traffic and the hour, not of a route we promise in advance.",
      ar: "نحو 20 كم، والمطار موصول بالمدينة بثلاثة طرق لا بطريق واحد. وأيّها يسلكه السائق في اليوم المحدد مسألة ازدحام وساعة، لا مسار نَعِد به مسبقًا.",
    },
    footnote: {
      en: "Published distances for this airport disagree: some sources say 10 or 15 km. Saudipedia gives about 20 km in both its text and its info box and names the twenty-five-minute figure, so that is what we use. Your own journey depends on which part of the city your hotel is in, and the quotation is written against the address you give us.",
      ar: "تتباين المسافات المنشورة لهذا المطار: فبعض المصادر تذكر 10 أو 15 كم. و«السعودية بالعربي» تذكر نحو 20 كم في نصّها وبطاقة بياناتها وتذكر رقم الخمس والعشرين دقيقة، فذلك ما نعتمده. ورحلتك أنت تتوقف على الجزء الذي يقع فيه فندقك من المدينة، ويُكتب عرض السعر وفق العنوان الذي تعطينا إياه.",
    },
  },

  // --- Terminal -----------------------------------------------------------

  terminal: {
    heading: { en: "Which terminal, and why we publish no chart", ar: "أي صالة، ولماذا لا ننشر مخططًا" },
    body: [
      {
        en: "We do not publish a terminal chart for this airport, and the reason is specific rather than evasive. The authoritative Saudi reference for it describes the airport's capacity, its area and its history, and says nothing at all about how many passenger terminals are in use or how domestic and international are divided. The published sources that do describe it disagree with each other.",
        ar: "لا ننشر مخططًا للصالات في هذا المطار، والسبب محدد لا مراوغ. فالمرجع السعودي المعتمد له يصف طاقته ومساحته وتاريخه، ولا يذكر البتة عدد صالات الركاب العاملة ولا كيفية الفصل بين الرحلات الداخلية والدولية. أما المصادر المنشورة التي تصفه فيناقض بعضها بعضًا.",
      },
      {
        en: "Rather than copy one of them and be confidently wrong, we confirm the arrangement for your flight, in writing, before the day — and your airline's own confirmation will say the same thing.",
        ar: "وبدل نقل أحدها والوقوع في خطأ واثق، نؤكد لك الترتيب الخاص برحلتك كتابةً قبل اليوم المحدد — وسيقول تأكيد شركة الطيران نفسه الشيء ذاته.",
      },
    ],
  },

  // --- Onward -------------------------------------------------------------

  onward: {
    heading: { en: "Where people go from here", ar: "إلى أين يتجه الناس من هنا" },
    lead: {
      en: "Most arrivals are going a short way to one district. A few are going a long way, and those are quoted as journeys in their own right.",
      ar: "معظم القادمين يتجهون مسافة قصيرة إلى حي واحد. وقليل منهم يتجه مسافة طويلة، وتلك تُسعَّر رحلاتٍ قائمة بذاتها.",
    },
    items: [
      {
        label: { en: "Central Area hotels", ar: "فنادق المنطقة المركزية" },
        detail: {
          en: "The usual journey: around 20 km to a hotel near the Prophet's Mosque, with the drop-off point confirmed for your property.",
          ar: "الرحلة المعتادة: نحو 20 كم إلى فندق قرب المسجد النبوي، مع تأكيد مكان التوصيل لمنشأتك.",
        },
      },
      {
        label: { en: "Quba Mosque and Ziyarat", ar: "مسجد قباء والزيارة" },
        detail: {
          en: "Visits within the city, arranged as their own booking rather than tacked on to an airport run with luggage still in the car.",
          ar: "زيارات داخل المدينة، تُرتَّب حجزًا مستقلًا لا تُضاف إلى رحلة مطار والحقائب ما تزال في السيارة.",
        },
      },
      {
        label: { en: "The Haramain station", ar: "محطة قطار الحرمين" },
        detail: {
          en: "About 7 km from the Prophet's Mosque, in Knowledge Economic City. We provide the road leg; the train belongs to its operator.",
          ar: "على نحو 7 كم من المسجد النبوي، في مدينة المعرفة الاقتصادية. ونحن نوفّر المرحلة البرية؛ أما القطار فلمشغّله.",
        },
      },
      {
        label: { en: "On to Makkah", ar: "ومنها إلى مكة المكرمة" },
        detail: {
          en: "A journey of 440–450 km with a Miqat and a checkpoint on it, set out in full on its own page.",
          ar: "رحلة من 440–450 كم عليها ميقات ونقطة تفتيش، مبيَّنة بالكامل في صفحتها الخاصة.",
        },
        routeKey: "makkahToMadinah" as RouteKey,
      },
      {
        label: { en: "AlUla, Yanbu and Jeddah", ar: "العُلا وينبع وجدة" },
        detail: {
          en: "Long road journeys from the airport or the city, each quoted on its own route and timing.",
          ar: "رحلات برية طويلة من المطار أو من المدينة، تُسعَّر كلٌّ وفق مسارها وتوقيتها.",
        },
      },
    ],
  },

  // --- Vehicles -----------------------------------------------------------

  vehicles: {
    heading: { en: "Which vehicle to ask for", ar: "أي مركبة تطلب" },
    lead: {
      en: "Categories, not a named fleet — we confirm what is available for your date rather than promising a model. On a short airport run the category is decided almost entirely by how many of you there are and how much you are carrying.",
      ar: "فئات لا أسطول بأسماء — فنحن نؤكد المتاح لتاريخك بدل الوعد بطراز. وفي رحلة مطار قصيرة تتحدد الفئة كلها تقريبًا بعددكم وبحجم ما تحملونه.",
    },
    slugs: ["sedan", "suv", "van", "minibus"],
    footnote: {
      en: "Seat and luggage figures are the brackets we quote against, not a promise about a particular car. Zamzam containers count as luggage — include them.",
      ar: "وأرقام المقاعد والحقائب هي الفئات التي نسعّر وفقها، لا وعدًا بسيارة بعينها. وعبوات ماء زمزم تُحسب ضمن الحقائب — فأدرجها.",
    },
  },

  // --- The input ledger ---------------------------------------------------

  inputs: {
    heading: { en: "What you send, and what it decides", ar: "ما ترسله، وما الذي يحدده" },
    lead: {
      en: "Nothing on this list is bureaucracy. Each line changes a real decision on our side, and the ones people leave out are the ones that cause the problems.",
      ar: "لا شيء في هذه القائمة روتين إداري. فكل سطر يغيّر قرارًا حقيقيًا لدينا، وما يُغفله الناس منها هو ما يسبب المشكلات.",
    },
    rows: [
      {
        input: { en: "Flight number", ar: "رقم الرحلة" },
        decides: {
          en: "Whether the pickup follows your aircraft or a guess.",
          ar: "هل يتبع موعد الاستقبال طائرتك أم تخمينًا.",
        },
      },
      {
        input: { en: "Arrival or departure", ar: "وصول أم مغادرة" },
        decides: {
          en: "Which way we do the arithmetic — forward from landing, or backwards from check-in.",
          ar: "في أي اتجاه نحسب — تقدّمًا من الهبوط، أم تراجعًا من إجراءات السفر.",
        },
      },
      {
        input: { en: "Hotel name", ar: "اسم الفندق" },
        decides: {
          en: "The drop-off point, and the distance the price is written against.",
          ar: "مكان التوصيل، والمسافة التي يُكتب السعر وفقها.",
        },
      },
      {
        input: { en: "Passengers, counted exactly", ar: "عدد الركاب بدقة" },
        decides: {
          en: "The vehicle category — the largest single factor in the price.",
          ar: "فئة المركبة — وهي العامل الأكبر في السعر.",
        },
      },
      {
        input: { en: "Luggage, including Zamzam", ar: "الحقائب، وفيها ماء زمزم" },
        decides: {
          en: "Whether that category actually fits what you are carrying.",
          ar: "هل تتسع تلك الفئة فعلًا لما تحمله.",
        },
      },
      {
        input: { en: "Anything out of the ordinary", ar: "أي أمر غير معتاد" },
        decides: {
          en: "A child seat, a wheelchair, a passenger who cannot manage steps — arranged in advance, not produced on the day.",
          ar: "مقعد أطفال، أو كرسي متحرك، أو راكب لا يستطيع صعود الدرج — تُدبَّر مسبقًا لا تُستحضر يوم الرحلة.",
        },
      },
    ] satisfies InputRow[],
  },

  // --- Booking ------------------------------------------------------------

  booking: {
    heading: { en: "How booking works", ar: "كيف يتم الحجز" },
    note: {
      en: "Sending an enquiry does not confirm a booking and does not hold a vehicle for your date. We reply with a written price; you decide; and your transfer is confirmed only when we send a booking confirmation saying so. Nothing is reserved and no payment is taken on this website. The Hajj season and peak Umrah periods are the dates most likely to be unavailable, so earlier is better — and if we cannot cover a journey we will say so rather than leave the request open.",
      ar: "إرسال الطلب لا يؤكد حجزًا ولا يحجز مركبة لتاريخك. ونرد عليك بسعر مكتوب؛ ثم تقرر أنت؛ ولا تتأكد رحلتك إلا عندما نرسل رسالة تأكيد حجز تنص على ذلك. ولا يُحجز شيء ولا يُستوفى أي مبلغ عبر هذا الموقع. وموسم الحج وفترات العمرة الذروة أكثر التواريخ احتمالًا لعدم التوافر، فالتبكير أفضل — وإن تعذّر علينا تغطية رحلة قلنا ذلك بدل إبقاء الطلب معلّقًا.",
    },
  },

  // --- FAQs ---------------------------------------------------------------

  faqs: [
    {
      question: {
        en: "How far is Madinah airport from the Prophet's Mosque?",
        ar: "كم يبعد مطار المدينة عن المسجد النبوي؟",
      },
      answer: {
        en: "About 20 km, and roughly 25 minutes in ordinary traffic. The airport connects to the city by three roads — Airport Road, King Abdulaziz Road and King Salman Road. Some published sources give shorter distances; we use the figure the authoritative Saudi reference states, and we quote on your actual hotel address rather than on any headline number.",
        ar: "نحو 20 كم، وقرابة 25 دقيقة في الازدحام المعتاد. والمطار موصول بالمدينة بثلاثة طرق: طريق المطار وطريق الملك عبدالعزيز وطريق الملك سلمان. وتذكر بعض المصادر المنشورة مسافات أقل؛ ونحن نعتمد الرقم الذي يذكره المرجع السعودي المعتمد، ونسعّر وفق عنوان فندقك الفعلي لا وفق أي رقم معلن.",
      },
    },
    {
      question: {
        en: "I am coming for Hajj through the Makkah Route Initiative. Do I need a transfer?",
        ar: "سأقدم للحج عبر مبادرة طريق مكة. هل أحتاج إلى نقل؟",
      },
      answer: {
        en: "Probably not. Pilgrims travelling under the scheme complete immigration, the visa, health checks and baggage at their own departure airport and board dedicated buses to their accommodation on arrival. Booking a car as well would mean paying twice for one journey. We cannot tell you whether you are on the scheme — it is for Hajj pilgrims from a limited list of participating airports, and the list changes season to season. Your Hajj organiser will know.",
        ar: "غالبًا لا. فمن يسافر ضمن المبادرة يُنهي إجراءات الجوازات والتأشيرة والفحص الصحي والحقائب في مطار مغادرته، ويستقل عند الوصول حافلات مخصصة إلى مكان إقامته. وحجز سيارة فوق ذلك يعني الدفع مرتين عن رحلة واحدة. ولا يمكننا إخبارك هل أنت ضمنها — فهي لحجاج بيت الله الحرام من قائمة محدودة من المطارات المشاركة، وتتغير القائمة من موسم إلى آخر. ومنظّم حجك يعلم ذلك.",
      },
    },
    {
      question: {
        en: "Which terminal will my flight use?",
        ar: "أي صالة ستستخدمها رحلتي؟",
      },
      answer: {
        en: "We confirm it for your flight in writing before the day, and your airline's confirmation will say the same. We publish no terminal chart on purpose: the authoritative Saudi reference for this airport does not describe how its passenger terminals are divided, and the sources that do describe it contradict one another. Copying one of them would make us confidently wrong.",
        ar: "نؤكدها لرحلتك كتابةً قبل اليوم المحدد، وسيقول تأكيد شركة الطيران الشيء نفسه. ولا ننشر مخططًا للصالات عمدًا: فالمرجع السعودي المعتمد لهذا المطار لا يصف كيفية تقسيم صالات الركاب فيه، والمصادر التي تصفه يناقض بعضها بعضًا. ونقل أحدها يجعلنا مخطئين بثقة.",
      },
    },
    {
      question: {
        en: "My flight is delayed. Will the driver still be there?",
        ar: "تأخرت رحلتي. هل سيظل السائق موجودًا؟",
      },
      answer: {
        en: "That is what the flight number is for. The pickup is set from your aircraft rather than from a clock time, so a delay moves the pickup rather than leaving it stranded at the old one. Sixty minutes of waiting time is included, and because the pickup follows the flight, a late landing does not by itself use up that hour.",
        ar: "لهذا يُطلب رقم الرحلة. فموعد الاستقبال مضبوط على طائرتك لا على توقيت ساعة، فالتأخير يُزيح الموعد بدل أن يتركه عالقًا عند الموعد القديم. ومدة الانتظار المشمولة ستون دقيقة، ولأن الموعد يتبع الرحلة فإن الهبوط المتأخر لا يستهلك تلك الساعة بذاته.",
      },
    },
    {
      question: {
        en: "Can you collect me from the Haramain station instead?",
        ar: "هل يمكنكم استقبالي من محطة قطار الحرمين بدلًا من ذلك؟",
      },
      answer: {
        en: "Yes. The station is in Knowledge Economic City, about 7 km from the Prophet's Mosque, so the last stretch to a hotel in the Central Area is by road either way. Tell us the train's arrival time and we will set the pickup from it. We provide the road leg only; the train is run by its own operator and we sell no rail tickets.",
        ar: "نعم. فالمحطة في مدينة المعرفة الاقتصادية، على نحو 7 كم من المسجد النبوي، فالمسافة الأخيرة إلى فندق في المنطقة المركزية برية في الحالين. أخبرنا بموعد وصول القطار ونضبط الاستقبال عليه. ونحن نوفّر المرحلة البرية فقط؛ أما القطار فيشغّله مشغّله ولا نبيع تذاكر قطار.",
      },
    },
    {
      question: {
        en: "Can non-Muslims use this airport and travel with you?",
        ar: "هل يمكن لغير المسلمين استخدام هذا المطار والسفر معكم؟",
      },
      answer: {
        en: "Madinah does not have the entry restriction that applies to Makkah, though the area immediately around the Prophet's Mosque is treated differently from the rest of the city. We arrange road transport and do not give immigration or religious advice, and we are not an official Hajj or Umrah operator. Tell us the journey you need and we will answer honestly for that specific journey rather than in general.",
        ar: "لا يسري على المدينة المنورة قيد الدخول المطبَّق على مكة المكرمة، وإن كان المحيط المباشر للمسجد النبوي يُعامل معاملة تختلف عن بقية المدينة. ونحن نرتّب النقل البري ولا نقدّم استشارات تتعلق بالجوازات أو الشرع، ولسنا مشغّلًا رسميًا للحج أو العمرة. فأخبرنا بالرحلة التي تحتاجها ونجيبك بصدق عن تلك الرحلة تحديدًا لا بإجابة عامة.",
      },
    },
    {
      question: {
        en: "Is there a fixed price for an airport transfer?",
        ar: "هل هناك سعر ثابت لرحلة المطار؟",
      },
      answer: {
        en: "No. Every journey is quoted individually, because the price depends on the vehicle category, the hour of the day, the date and your actual hotel address. You get a written price before anything is reserved, and nothing is confirmed until we send a booking confirmation.",
        ar: "لا. فكل رحلة تُسعَّر على حدة، لأن السعر يعتمد على فئة المركبة وساعة اليوم والتاريخ وعنوان فندقك الفعلي. وتحصل على سعر مكتوب قبل حجز أي شيء، ولا يتأكد شيء حتى نرسل رسالة تأكيد الحجز.",
      },
    },
  ] satisfies ClusterFaq[],

  // --- Related ------------------------------------------------------------

  relatedHeading: { en: "Related journeys", ar: "رحلات ذات صلة" },
  related: [
    {
      routeKey: "airportTransfers",
      label: { en: "Airport transfers across Saudi Arabia", ar: "النقل من المطارات في السعودية" },
      note: {
        en: "The service page above this one: how arrivals and departures differ, what your flight number does, and a local-time converter for long-haul arrivals.",
        ar: "الصفحة الأعم فوق هذه: كيف يختلف الوصول عن المغادرة، وما الذي يفعله رقم رحلتك، ومحوّل توقيت محلي للقادمين من رحلات طويلة.",
      },
    },
    {
      routeKey: "madinah" as RouteKey,
      label: { en: "All Madinah transfers", ar: "جميع خدمات النقل في المدينة" },
      note: {
        en: "The hub: station pickups, hotel runs, Ziyarat and journeys out of the city.",
        ar: "الصفحة الرئيسية: الاستقبال من المحطة، والتنقل بين الفنادق، والزيارة، والرحلات خارج المدينة.",
      },
    },
    {
      routeKey: "makkahToMadinah" as RouteKey,
      label: { en: "Madinah to Makkah", ar: "من المدينة إلى مكة" },
      note: {
        en: "The road south in full: the Miqat stop, the checkpoint, and car against train.",
        ar: "الطريق جنوبًا كاملًا: التوقف عند الميقات، ونقطة التفتيش، والسيارة مقابل القطار.",
      },
    },
    {
      routeKey: "jeddahAirport" as RouteKey,
      label: { en: "Jeddah airport transfers", ar: "النقل من مطار جدة" },
      note: {
        en: "The Kingdom's first pilgrimage gateway, where a Haramain station sits inside the terminal.",
        ar: "بوابة الحج والعمرة الأولى في المملكة، وفيها محطة قطار الحرمين داخل الصالة.",
      },
    },
    {
      routeKey: "alula" as RouteKey,
      label: { en: "AlUla", ar: "العُلا" },
      note: {
        en: "North-west of Madinah: the Old Town, Hegra and the drive out from the city.",
        ar: "شمال غرب المدينة: البلدة القديمة والحِجر والطريق من المدينة.",
      },
    },
  ] satisfies RelatedLink[],

  cta: {
    eyebrow: { en: "One price, in writing", ar: "سعر واحد، مكتوب" },
    heading: {
      en: "Send the flight number and the hotel",
      ar: "أرسل رقم الرحلة واسم الفندق",
    },
    body: {
      en: "With the date, whether you are arriving or departing, and how many passengers and bags. We reply with a written price for that journey. Nothing is reserved and no payment is taken until you accept it.",
      ar: "مع التاريخ، وهل أنت قادم أم مغادر، وعدد الركاب والحقائب. ونرد عليك بسعر مكتوب لتلك الرحلة. ولا يُحجز شيء ولا يُستوفى أي مبلغ حتى تقبله.",
    },
    button: { en: "Request a quotation", ar: "اطلب عرض سعر" },
  } satisfies ClusterCta,
} as const;
