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
 * Dammam — King Fahd International Airport.
 *
 * Researched independently, and the page is built on the gap between the two
 * numbers that describe this airport.
 *
 * The famous one: it is the largest airport in the world by land area, about
 * 780 km² by the Guinness World Records figure — bigger than some countries,
 * and widely repeated for that reason. Sources also note that most of that
 * land is undeveloped, so the part a passenger uses is a small fraction of it.
 *
 * The one that affects you: this airport sits well inland from the cities it
 * serves, and it serves three of them at materially different distances —
 * roughly 36 km to Dammam, 47 km to Dhahran and 58 km to Al Khobar. Al Khobar
 * is about sixty per cent further than Dammam. Unlike Madinah, where almost
 * every arrival is going to one district twenty kilometres away, here the city
 * you name changes the journey substantially, which is why the distance ladder
 * is the page's central object rather than a single headline figure.
 *
 * Those three distances are Saudipedia's, taken from the Dammam hub so the
 * two pages cannot drift apart. Independent sources give a range for the
 * Dammam figure — Wikipedia says about 31 km, one travel reference 35 km and
 * another 20 km — because they measure to different points; the footnote says
 * so rather than presenting one as settled.
 *
 * Two things the page refuses to invent. **Terminal structure**: published
 * descriptions contradict each other, one calling it a single public terminal
 * and another describing three, so no chart appears and the arrangement is
 * confirmed per flight — the same position the Jeddah and Madinah airport
 * pages take. **The causeway**: this is the airport people fly into to cross
 * to Bahrain, and our service stops at the Saudi side. That boundary is stated
 * on the page rather than left for a customer to discover, and it matches the
 * Dammam hub and the Bahrain guide word for word in substance.
 */

/** One city served by the airport, with its distance from it. */
export type ServedCity = {
  name: Bilingual<string>;
  km: number;
  distance: Bilingual<string>;
  note: Bilingual<string>;
};

export const dammamAirport = {
  routeKey: "dammamAirport" as RouteKey,
  imageKey: "dest-dammam" as SiteImageKey,

  seo: {
    title: {
      en: "Dammam airport transfers — King Fahd International (DMM)",
      ar: "النقل من مطار الدمام — الملك فهد الدولي (DMM)",
    },
    description: {
      en: "Private car from King Fahd International to Dammam, Dhahran and Al Khobar — three cities at three different distances. Arrivals timed to your flight, quoted on your address.",
      ar: "سيارة خاصة من مطار الملك فهد الدولي إلى الدمام والظهران والخبر — ثلاث مدن على ثلاث مسافات مختلفة. استقبال مضبوط على رحلتك، وتسعير وفق عنوانك.",
    },
  },

  crumbLabel: { en: "Airport transfers", ar: "النقل من المطار" },

  // --- Hero --------------------------------------------------------------

  eyebrow: {
    en: "King Fahd International Airport",
    ar: "مطار الملك فهد الدولي",
  },
  title: {
    en: "Dammam airport transfers",
    ar: "النقل من مطار الدمام وإليه",
  },
  standfirst: {
    en: "This is the largest airport on earth by land area. That is the number everyone quotes, and it is not the number that affects you. The one that does is how far it sits from the city you are actually going to — and that answer is different for Dammam, Dhahran and Al Khobar.",
    ar: "هذا أكبر مطار في العالم من حيث المساحة. وهو الرقم الذي يردده الجميع، وليس الرقم الذي يعنيك. أما الذي يعنيك فهو بُعده عن المدينة التي تقصدها فعلًا — والإجابة تختلف بين الدمام والظهران والخبر.",
  },

  /** The two-number opposition the hero is built on. */
  contrast: {
    famous: {
      value: { en: "780 km²", ar: "780 كم²" },
      label: { en: "The airport's land area", ar: "مساحة أرض المطار" },
      note: {
        en: "The world's largest, and mostly undeveloped.",
        ar: "الأكبر في العالم، ومعظمها غير مطوَّر.",
      },
    },
    useful: {
      value: { en: "36–58 km", ar: "36–58 كم" },
      label: { en: "The road out to your city", ar: "الطريق إلى مدينتك" },
      note: {
        en: "Dammam, Dhahran or Al Khobar — and they are not the same journey.",
        ar: "الدمام أو الظهران أو الخبر — وليست رحلة واحدة.",
      },
    },
  },

  primaryCta: { en: "Request a quotation", ar: "اطلب عرض سعر" },
  secondaryCta: { en: "Which city?", ar: "أي مدينة؟" },

  stats: [
    {
      label: { en: "To Dammam", ar: "إلى الدمام" },
      value: { en: "~36 km", ar: "~36 كم" },
      note: {
        en: "The closest of the three.",
        ar: "الأقرب بين الثلاث.",
      },
    },
    {
      label: { en: "To Dhahran", ar: "إلى الظهران" },
      value: { en: "~47 km", ar: "~47 كم" },
      note: {
        en: "A third further than Dammam.",
        ar: "أبعد من الدمام بنحو الثلث.",
      },
    },
    {
      label: { en: "To Al Khobar", ar: "إلى الخبر" },
      value: { en: "~58 km", ar: "~58 كم" },
      note: {
        en: "Roughly sixty per cent further than Dammam.",
        ar: "أبعد من الدمام بنحو ستين في المئة.",
      },
    },
    {
      label: { en: "Waiting included", ar: "الانتظار المشمول" },
      value: { en: "60 minutes", ar: "60 دقيقة" },
      note: {
        en: "And the pickup follows your flight, not a clock.",
        ar: "وموعد الاستقبال يتبع رحلتك لا الساعة.",
      },
    },
  ] satisfies ClusterStat[],

  // --- The distance ladder ------------------------------------------------

  cities: {
    heading: {
      en: "Three cities, three journeys",
      ar: "ثلاث مدن، ثلاث رحلات",
    },
    lead: {
      en: "The airport sits well inland, so every arrival begins with a road journey to the coast. How long that journey is depends entirely on which of the three you are going to, and the spread between them is wide enough to matter when you are planning a day.",
      ar: "يقع المطار في عمق البر، فيبدأ كل وصول برحلة برية إلى الساحل. وطول تلك الرحلة يعتمد كليًا على أي المدن الثلاث تقصد، والفارق بينها واسع بما يكفي ليهمّ عند تخطيط يومك.",
    },
    list: [
      {
        name: { en: "Dammam", ar: "الدمام" },
        km: 36,
        distance: { en: "~36 km", ar: "~36 كم" },
        note: {
          en: "The capital of the Eastern Province and the closest of the three. Most arrivals heading for the city centre or the corniche are on this leg.",
          ar: "عاصمة المنطقة الشرقية وأقرب الثلاث. ومعظم القادمين إلى وسط المدينة أو الكورنيش يسلكون هذه المرحلة.",
        },
      },
      {
        name: { en: "Dhahran", ar: "الظهران" },
        km: 47,
        distance: { en: "~47 km", ar: "~47 كم" },
        note: {
          en: "Between the other two. A common destination for business visitors, and the compounds and campuses there often need a named gate rather than a district.",
          ar: "بين المدينتين الأخريين. ووجهة شائعة لزوار الأعمال، وغالبًا ما تحتاج المجمعات والمقارّ هناك بوابة محددة بالاسم لا حيًّا.",
        },
      },
      {
        name: { en: "Al Khobar", ar: "الخبر" },
        km: 58,
        distance: { en: "~58 km", ar: "~58 كم" },
        note: {
          en: "The furthest, on the Gulf shore. Add the city traffic at the far end and this is a materially longer run than the Dammam one, which is worth knowing before you fix a meeting time.",
          ar: "الأبعد، على ساحل الخليج. وبإضافة ازدحام المدينة في الطرف البعيد تصبح هذه رحلة أطول فعليًا من رحلة الدمام، وهو ما يستحق معرفته قبل تحديد موعد اجتماع.",
        },
      },
    ] satisfies ServedCity[],
    footnote: {
      en: "These are Saudipedia's approximate figures, rounded, and the same ones the Dammam page uses. Other references give a range for the Dammam distance — about 31 km in one, 35 km in another, 20 km in a third — because they measure to different points in a city that spreads. Your own pickup and destination decide the journey, and the quotation is written against the address you give us.",
      ar: "هذه أرقام «السعودية بالعربي» التقريبية مقرَّبة، وهي نفسها المستخدمة في صفحة الدمام. وتذكر مراجع أخرى نطاقًا لمسافة الدمام — نحو 31 كم في أحدها، و35 كم في آخر، و20 كم في ثالث — لأنها تقيس إلى نقاط مختلفة في مدينة ممتدة. ونقطة انطلاقك ووجهتك هما ما يحدد الرحلة، ويُكتب عرض السعر وفق العنوان الذي تعطينا إياه.",
    },
  },

  // --- Arrivals -----------------------------------------------------------

  arrivals: {
    heading: { en: "Landing at King Fahd", ar: "الهبوط في مطار الملك فهد" },
    lead: {
      en: "The driver is waiting when you come out, because the pickup was set from the aircraft rather than from the time on your ticket.",
      ar: "يكون السائق في انتظارك عند خروجك، لأن موعد الاستقبال ضُبط على الطائرة لا على الوقت المدوَّن في تذكرتك.",
    },
    steps: [
      {
        title: { en: "Send the flight number", ar: "أرسل رقم الرحلة" },
        body: {
          en: "The pickup follows your aircraft, so an early landing or a long delay moves it rather than stranding it. Sixty minutes of waiting is included, which covers an ordinary walk through immigration and baggage.",
          ar: "فموعد الاستقبال يتبع طائرتك، فالهبوط المبكر أو التأخر الطويل يُزيحه بدل أن يتركه عالقًا. ومدة الانتظار المشمولة ستون دقيقة، وتغطي المرور المعتاد بالجوازات واستلام الحقائب.",
        },
      },
      {
        title: { en: "Name the city, then the address", ar: "اذكر المدينة ثم العنوان" },
        body: {
          en: "Dammam, Dhahran or Al Khobar first, because that sets the length of the journey — then the hotel, compound or street. A compound or campus usually needs the gate as well.",
          ar: "الدمام أو الظهران أو الخبر أولًا، لأن ذلك يحدد طول الرحلة — ثم الفندق أو المجمع أو الشارع. وغالبًا ما يحتاج المجمع أو المقر ذكر البوابة كذلك.",
        },
      },
      {
        title: { en: "We confirm the meeting arrangement", ar: "نؤكد ترتيب اللقاء" },
        body: {
          en: "In writing, before the day, for your flight — not a landmark copied from somewhere else. You also get a number to call if anything changes while you are still inside.",
          ar: "كتابةً، قبل اليوم المحدد، ولرحلتك أنت — لا معلمًا منقولًا من مكان آخر. ويصلك كذلك رقم للاتصال إن تغيّر شيء وأنت ما زلت في الداخل.",
        },
      },
      {
        title: { en: "Say if you are arriving late", ar: "اذكر إن كنت تصل متأخرًا" },
        body: {
          en: "A late arrival into Al Khobar is close to an hour on the road after a flight. It is a different kind of evening from a short run into Dammam, and it is better planned than discovered.",
          ar: "فالوصول المتأخر إلى الخبر يعني قرابة ساعة على الطريق بعد رحلة جوية. وهي أمسية من نوع مختلف عن رحلة قصيرة إلى الدمام، والتخطيط لها أفضل من اكتشافها.",
        },
      },
    ],
  },

  // --- Departures ---------------------------------------------------------

  departures: {
    heading: { en: "Flying out of King Fahd", ar: "المغادرة من مطار الملك فهد" },
    lead: {
      en: "The arithmetic runs backwards, and the city you are leaving from changes it more here than at most airports. Give us the airline's check-in or bag-drop time and we work back through the drive and the hour of day to a pickup at your door.",
      ar: "يسير الحساب تراجعيًا، والمدينة التي تغادر منها تغيّره هنا أكثر من معظم المطارات. أعطنا موعد إجراءات السفر أو تسليم الحقائب ونحسب رجوعًا عبر زمن الطريق وساعة اليوم إلى موعد استقبال عند بابك.",
    },
    points: [
      {
        title: { en: "An Al Khobar departure starts earlier", ar: "المغادرة من الخبر تبدأ أبكر" },
        body: {
          en: "Roughly sixty per cent more road than from Dammam, before any traffic. The same flight means a meaningfully earlier pickup, and that is the single most common miscalculation on this route.",
          ar: "طريق أطول بنحو ستين في المئة مما هو من الدمام، قبل أي ازدحام. فالرحلة نفسها تعني استقبالًا أبكر بوضوح، وهذا أكثر أخطاء الحساب شيوعًا على هذا المسار.",
        },
      },
      {
        title: { en: "Give the flight number here too", ar: "اذكر رقم الرحلة هنا أيضًا" },
        body: {
          en: "A departure that is retimed is as disruptive as an arrival that is delayed, and we would rather learn it from the flight than from you at the door.",
          ar: "فتغيير موعد المغادرة لا يقل إرباكًا عن تأخر الوصول، ونفضّل أن نعرفه من الرحلة لا منك عند الباب.",
        },
      },
      {
        title: { en: "Say if you are checking bags", ar: "أخبرنا إن كنت ستسجّل حقائب" },
        body: {
          en: "Bag drop closes before boarding does, and that deadline, not the departure time, is what we actually work back from.",
          ar: "فتسليم الحقائب يُغلق قبل الصعود إلى الطائرة، وذلك الموعد لا وقت الإقلاع هو ما نحسب تراجعيًا منه فعلًا.",
        },
      },
    ],
  },

  // --- The causeway boundary ----------------------------------------------

  causeway: {
    eyebrow: { en: "Before you book", ar: "قبل أن تحجز" },
    heading: {
      en: "If you are heading for Bahrain",
      ar: "إذا كنت متجهًا إلى البحرين",
    },
    body: [
      {
        en: "A good number of people fly into this airport in order to cross the King Fahd Causeway, which starts just south of Al Khobar. It is worth being plain about where our service ends: we stay in Saudi Arabia. We do not cross the causeway and we do not provide transport in Bahrain.",
        ar: "يصل عدد لا بأس به من الناس إلى هذا المطار بقصد عبور جسر الملك فهد، الذي يبدأ جنوب الخبر مباشرة. ويجدر التصريح بحدود خدمتنا: نحن نبقى داخل المملكة العربية السعودية. فلا نعبر الجسر ولا نقدّم النقل في البحرين.",
      },
      {
        en: "What we can quote is the Saudi-side leg — the airport to Al Khobar, or to an address on this side. Border formalities, visas and the crossing itself are yours to arrange, and our border guide sets out what we could and could not verify about them.",
        ar: "وما يمكننا تسعيره هو المرحلة داخل السعودية — من المطار إلى الخبر، أو إلى عنوان في هذا الجانب. أما إجراءات الحدود والتأشيرات والعبور نفسه فمن شأنك ترتيبها، ويبيّن دليل الحدود لدينا ما استطعنا التحقق منه وما لم نستطع.",
      },
    ],
    linkLabel: {
      en: "Read the Saudi Arabia to Bahrain guide",
      ar: "اقرأ دليل السعودية إلى البحرين",
    },
  },

  // --- Terminal -----------------------------------------------------------

  terminal: {
    heading: { en: "Which terminal", ar: "أي صالة" },
    body: [
      {
        en: "We confirm the arrangement for your flight in writing before the day, and your airline's own confirmation will say the same. We publish no terminal chart for this airport: the published descriptions of it contradict each other, one calling it a single public terminal and another describing three. Copying either would make us confidently wrong.",
        ar: "نؤكد الترتيب الخاص برحلتك كتابةً قبل اليوم المحدد، وسيقول تأكيد شركة الطيران الشيء نفسه. ولا ننشر مخططًا للصالات في هذا المطار: فالأوصاف المنشورة له يناقض بعضها بعضًا، إذ يصفه أحدها بصالة عامة واحدة ويصفه آخر بثلاث. ونقل أي منهما يجعلنا مخطئين بثقة.",
      },
    ],
  },

  // --- Beyond the three cities -------------------------------------------

  beyond: {
    heading: { en: "Beyond the three cities", ar: "خارج المدن الثلاث" },
    lead: {
      en: "Not every arrival is going to the tri-city area. These are quoted as journeys in their own right rather than as an airport run with extra kilometres bolted on.",
      ar: "ليس كل قادم متجهًا إلى نطاق المدن الثلاث. وهذه تُسعَّر رحلاتٍ قائمة بذاتها لا رحلة مطار أُضيفت إليها كيلومترات.",
    },
    items: [
      {
        label: { en: "Jubail", ar: "الجبيل" },
        detail: {
          en: "North up the coast — the old town and the industrial city are not the same destination, so say which.",
          ar: "شمالًا على الساحل — والبلدة القديمة والمدينة الصناعية ليستا وجهة واحدة، فاذكر أيهما.",
        },
        routeKey: "jubail" as RouteKey,
      },
      {
        label: { en: "Al Ahsa", ar: "الأحساء" },
        detail: {
          en: "Inland to the oasis — Hofuf, Mubarraz and the hotels around them.",
          ar: "داخلًا إلى الواحة — الهفوف والمبرز والفنادق حولهما.",
        },
        routeKey: "alAhsa" as RouteKey,
      },
      {
        label: { en: "Riyadh", ar: "الرياض" },
        detail: {
          en: "The long road west across the peninsula, quoted as an intercity journey.",
          ar: "الطريق الطويل غربًا عبر شبه الجزيرة، ويُسعَّر رحلةً بين المدن.",
        },
        routeKey: "riyadhToDammam" as RouteKey,
      },
      {
        label: { en: "Ras Tanura and the industrial north", ar: "رأس تنورة والشمال الصناعي" },
        detail: {
          en: "Site and facility runs along the coast. Tell us the destination and whether a gate pass or escort is involved at the far end, because that changes the timing.",
          ar: "رحلات إلى المواقع والمنشآت على الساحل. أخبرنا بالوجهة وهل يلزم تصريح دخول أو مرافقة في الطرف البعيد، فذلك يغيّر التوقيت.",
        },
      },
    ],
  },

  // --- Vehicles -----------------------------------------------------------

  vehicles: {
    heading: { en: "Which vehicle to ask for", ar: "أي مركبة تطلب" },
    lead: {
      en: "Categories, not a named fleet — we confirm what is available for your date rather than promising a model. On a run to Al Khobar you are in the vehicle for the best part of an hour, so the category is worth getting right rather than rounding down.",
      ar: "فئات لا أسطول بأسماء — فنحن نؤكد المتاح لتاريخك بدل الوعد بطراز. وفي الرحلة إلى الخبر تبقى في المركبة قرابة الساعة، فتستحق الفئة أن تُضبط لا أن تُقرَّب نزولًا.",
    },
    slugs: ["sedan", "suv", "van", "minibus"],
    footnote: {
      en: "Seat and luggage figures are the brackets we quote against, not a promise about a particular car.",
      ar: "وأرقام المقاعد والحقائب هي الفئات التي نسعّر وفقها، لا وعدًا بسيارة بعينها.",
    },
  },

  // --- What to send -------------------------------------------------------

  sending: {
    heading: { en: "What to send us", ar: "ما ترسله إلينا" },
    lead: {
      en: "Short list, and the first line on it is the one that changes the price most.",
      ar: "قائمة قصيرة، وأول سطر فيها هو الأكثر تغييرًا للسعر.",
    },
    items: [
      {
        en: "Which city — Dammam, Dhahran or Al Khobar — and then the hotel, compound or street address.",
        ar: "أي مدينة — الدمام أم الظهران أم الخبر — ثم الفندق أو المجمع أو عنوان الشارع.",
      },
      {
        en: "The gate, if your destination is a compound, campus or facility.",
        ar: "والبوابة، إن كانت وجهتك مجمعًا أو مقرًّا أو منشأة.",
      },
      {
        en: "Arrival or departure, with the flight number either way.",
        ar: "ووصول أم مغادرة، مع رقم الرحلة في الحالين.",
      },
      {
        en: "The date and time — and for a departure, the check-in or bag-drop time rather than the take-off time.",
        ar: "والتاريخ والوقت — وفي المغادرة موعد إجراءات السفر أو تسليم الحقائب لا وقت الإقلاع.",
      },
      {
        en: "Passengers counted exactly, including children and infants travelling on a lap.",
        ar: "وعدد الركاب بدقة، شاملًا الأطفال والرضّع المحمولين.",
      },
      {
        en: "Luggage counted honestly, large cases and cabin bags separately.",
        ar: "وعدد الحقائب بصدق، الكبيرة وحقائب المقصورة كلٌّ على حدة.",
      },
      {
        en: "Anything out of the ordinary: a child seat, a wheelchair, a passenger who cannot manage steps.",
        ar: "وأي أمر غير معتاد: مقعد أطفال، أو كرسي متحرك، أو راكب لا يستطيع صعود الدرج.",
      },
    ] satisfies Bilingual<string>[],
  },

  // --- Booking ------------------------------------------------------------

  booking: {
    heading: { en: "How booking works", ar: "كيف يتم الحجز" },
    note: {
      en: "Sending an enquiry does not confirm a booking and does not hold a vehicle for your date. We reply with a written price; you decide; and your transfer is confirmed only when we send a booking confirmation saying so. Nothing is reserved and no payment is taken on this website. If we cannot cover a journey we will say so rather than leave the request open.",
      ar: "إرسال الطلب لا يؤكد حجزًا ولا يحجز مركبة لتاريخك. ونرد عليك بسعر مكتوب؛ ثم تقرر أنت؛ ولا تتأكد رحلتك إلا عندما نرسل رسالة تأكيد حجز تنص على ذلك. ولا يُحجز شيء ولا يُستوفى أي مبلغ عبر هذا الموقع. وإن تعذّر علينا تغطية رحلة قلنا ذلك بدل إبقاء الطلب معلّقًا.",
    },
  },

  // --- FAQs ---------------------------------------------------------------

  faqs: [
    {
      question: {
        en: "How far is King Fahd International Airport from Al Khobar?",
        ar: "كم يبعد مطار الملك فهد الدولي عن الخبر؟",
      },
      answer: {
        en: "About 58 km, against roughly 47 km to Dhahran and 36 km to Dammam — so Al Khobar is about sixty per cent further than Dammam, and the run takes close to an hour once city traffic at the far end is counted. Those are Saudipedia's approximate figures; other references give a different number for the Dammam distance because they measure to different points. We quote on your actual address.",
        ar: "نحو 58 كم، مقابل قرابة 47 كم إلى الظهران و36 كم إلى الدمام — فالخبر أبعد من الدمام بنحو ستين في المئة، وتستغرق الرحلة قرابة الساعة بعد حساب ازدحام المدينة في الطرف البعيد. وهذه أرقام «السعودية بالعربي» التقريبية؛ وتذكر مراجع أخرى رقمًا مختلفًا لمسافة الدمام لأنها تقيس إلى نقاط مختلفة. ونحن نسعّر وفق عنوانك الفعلي.",
      },
    },
    {
      question: {
        en: "Is this really the largest airport in the world?",
        ar: "هل هذا فعلًا أكبر مطار في العالم؟",
      },
      answer: {
        en: "By land area, yes — about 780 km² by the Guinness World Records figure, which is larger than some countries. It is worth knowing that most of that land is undeveloped, so the part you actually walk through is a small fraction of it. For a passenger the useful number is not the airport's area but the distance from it to your city, which is why this page leads with the second one.",
        ar: "من حيث المساحة، نعم — نحو 780 كم² بحسب رقم موسوعة غينيس، وهي أكبر من بعض الدول. ويجدر أن تعرف أن معظم تلك الأرض غير مطوَّرة، فالجزء الذي تمر به فعلًا كسر صغير منها. وبالنسبة للمسافر، فالرقم المفيد ليس مساحة المطار بل بُعده عن مدينتك، ولهذا تبدأ هذه الصفحة بالثاني.",
      },
    },
    {
      question: {
        en: "Can you take us across the King Fahd Causeway to Bahrain?",
        ar: "هل يمكنكم نقلنا عبر جسر الملك فهد إلى البحرين؟",
      },
      answer: {
        en: "No. Our service stays in Saudi Arabia: we do not cross the causeway and we do not provide transport in Bahrain. What we can quote is the Saudi-side leg — the airport to Al Khobar or another address on this side. Visas and border formalities are yours to arrange, and our Saudi Arabia to Bahrain guide sets out what we were able to verify about them and what we were not.",
        ar: "لا. فخدمتنا تبقى داخل المملكة العربية السعودية: لا نعبر الجسر ولا نقدّم النقل في البحرين. وما يمكننا تسعيره هو المرحلة داخل السعودية — من المطار إلى الخبر أو إلى عنوان آخر في هذا الجانب. أما التأشيرات وإجراءات الحدود فمن شأنك ترتيبها، ويبيّن دليل السعودية إلى البحرين لدينا ما استطعنا التحقق منه وما لم نستطع.",
      },
    },
    {
      question: {
        en: "Which terminal will my flight use?",
        ar: "أي صالة ستستخدمها رحلتي؟",
      },
      answer: {
        en: "We confirm it for your flight in writing before the day, and your airline's confirmation will say the same. We publish no terminal chart on purpose: published descriptions of this airport contradict each other, one calling it a single public terminal and another describing three. We would rather confirm your flight than reproduce a description we cannot stand behind.",
        ar: "نؤكدها لرحلتك كتابةً قبل اليوم المحدد، وسيقول تأكيد شركة الطيران الشيء نفسه. ولا ننشر مخططًا للصالات عمدًا: فالأوصاف المنشورة لهذا المطار يناقض بعضها بعضًا، إذ يصفه أحدها بصالة عامة واحدة ويصفه آخر بثلاث. ونفضّل تأكيد رحلتك على إعادة نشر وصف لا نستطيع الالتزام به.",
      },
    },
    {
      question: {
        en: "My flight is delayed. Will the driver still be there?",
        ar: "تأخرت رحلتي. هل سيظل السائق موجودًا؟",
      },
      answer: {
        en: "That is what the flight number is for. The pickup is set from your aircraft rather than from a clock time, so a delay moves it rather than leaving it stranded at the old one. Sixty minutes of waiting is included, and because the pickup follows the flight, a late landing does not by itself use up that hour.",
        ar: "لهذا يُطلب رقم الرحلة. فموعد الاستقبال مضبوط على طائرتك لا على توقيت ساعة، فالتأخير يُزيحه بدل أن يتركه عالقًا عند الموعد القديم. ومدة الانتظار المشمولة ستون دقيقة، ولأن الموعد يتبع الرحلة فإن الهبوط المتأخر لا يستهلك تلك الساعة بذاته.",
      },
    },
    {
      question: {
        en: "Can you collect from a compound or a company facility?",
        ar: "هل يمكنكم الاستقبال من مجمع سكني أو منشأة تابعة لشركة؟",
      },
      answer: {
        en: "Yes, and the thing to send is the gate rather than just the name. Compounds and campuses in Dhahran and around the industrial areas often have several entrances and controlled access, and if a pass or an escort is needed at the far end it changes the timing. Tell us at the enquiry stage and the arrangement is confirmed in writing before the day.",
        ar: "نعم، والمطلوب إرساله هو البوابة لا الاسم وحده. فللمجمعات والمقارّ في الظهران وحول المناطق الصناعية مداخل عدة ودخول منظَّم، وإن لزم تصريح أو مرافقة في الطرف البعيد تغيّر التوقيت. فأخبرنا عند إرسال الطلب ليُؤكَّد الترتيب كتابةً قبل اليوم المحدد.",
      },
    },
    {
      question: {
        en: "Is there a fixed price for an airport transfer?",
        ar: "هل هناك سعر ثابت لرحلة المطار؟",
      },
      answer: {
        en: "No. Every journey is quoted individually, because the price depends on which of the three cities you are going to, the exact address, the vehicle category, and the date and hour. You get a written price before anything is reserved, and nothing is confirmed until we send a booking confirmation.",
        ar: "لا. فكل رحلة تُسعَّر على حدة، لأن السعر يعتمد على أي المدن الثلاث تقصد، والعنوان بالضبط، وفئة المركبة، والتاريخ والساعة. وتحصل على سعر مكتوب قبل حجز أي شيء، ولا يتأكد شيء حتى نرسل رسالة تأكيد الحجز.",
      },
    },
  ] satisfies ClusterFaq[],

  // --- Related ------------------------------------------------------------

  relatedHeading: { en: "Related journeys", ar: "رحلات ذات صلة" },
  related: [
    {
      routeKey: "dammam" as RouteKey,
      label: {
        en: "Dammam, Al Khobar & Dhahran",
        ar: "الدمام والخبر والظهران",
      },
      note: {
        en: "The hub: hotels and addresses across the three cities, and journeys between them.",
        ar: "الصفحة الرئيسية: الفنادق والعناوين في المدن الثلاث، والتنقل بينها.",
      },
    },
    {
      routeKey: "saudiToBahrain" as RouteKey,
      label: {
        en: "Saudi Arabia to Bahrain",
        ar: "من السعودية إلى البحرين",
      },
      note: {
        en: "Travel information for the King Fahd Causeway. We do not cross it.",
        ar: "معلومات سفر عن جسر الملك فهد. ونحن لا نعبره.",
      },
    },
    {
      routeKey: "riyadhToDammam" as RouteKey,
      label: { en: "Riyadh to Dammam", ar: "من الرياض إلى الدمام" },
      note: {
        en: "The road west across the peninsula, if you are continuing rather than flying.",
        ar: "الطريق غربًا عبر شبه الجزيرة، إن كنت تواصل برًّا لا جوًّا.",
      },
    },
    {
      routeKey: "jubail" as RouteKey,
      label: { en: "Jubail", ar: "الجبيل" },
      note: {
        en: "North up the coast: the old town and the industrial city.",
        ar: "شمالًا على الساحل: البلدة القديمة والمدينة الصناعية.",
      },
    },
  ] satisfies RelatedLink[],

  cta: {
    eyebrow: { en: "One price, in writing", ar: "سعر واحد، مكتوب" },
    heading: {
      en: "Tell us which city, and the flight number",
      ar: "أخبرنا بالمدينة ورقم الرحلة",
    },
    body: {
      en: "With the address or the gate, the date, whether you are arriving or departing, and how many passengers and bags. We reply with a written price for that journey. Nothing is reserved and no payment is taken until you accept it.",
      ar: "مع العنوان أو البوابة، والتاريخ، وهل أنت قادم أم مغادر، وعدد الركاب والحقائب. ونرد عليك بسعر مكتوب لتلك الرحلة. ولا يُحجز شيء ولا يُستوفى أي مبلغ حتى تقبله.",
    },
    button: { en: "Request a quotation", ar: "اطلب عرض سعر" },
  } satisfies ClusterCta,
} as const;
