import type { RoutePageContent } from "@/lib/content/riyadh/types";

/**
 * Riyadh to Madinah.
 *
 * Researched independently of the Riyadh–Makkah page, and it is a different
 * journey with a different argument — not the same page with the destination
 * swapped.
 *
 * **The structural difference.** Riyadh to Makkah is one long road with
 * nothing much on it. Riyadh to Madinah has a city in the middle. The road
 * runs north-west through Qassim, and Buraydah sits at roughly the 360 km
 * mark of an ~850 km journey — a substantial place this site already
 * documents in full, with its own airport, its own hotels and its own page.
 * So the signature element here is a **midpoint diptych**: the journey drawn
 * as two legs hinged on Qassim, the first of which we already cover.
 *
 * **The honest moment, and it is this page's alone.** The railway gives up
 * exactly where the diptych hinges. Riyadh's northern line runs through
 * Qassim on its way to Hail and the Jordanian border, so you can ride a train
 * for the first half of this journey. The Haramain line reaches Madinah from
 * Makkah and Jeddah. The two networks never meet, and the Riyadh–Jeddah link
 * that would join them has been reported as planned rather than built. Half
 * this journey has a railway; the other half does not, and that is a far more
 * interesting fact than "there is no train".
 *
 * **Figures.** Published totals run from about 830 km to about 870 km,
 * depending on the route and the endpoints. The two legs corroborate the
 * upper part of that: our own Riyadh–Buraydah page gives ~360 km and 3.5–4.5
 * hours, and published road figures put Buraydah–Madinah at about 510 km and
 * roughly four and a half hours. We publish ~850 km and 8–9 hours of moving
 * time, with the spread stated rather than smoothed away.
 *
 * **Entry is not the Makkah rule and must never be written as if it were.**
 * Visit Saudi says Madinah welcomes visitors from around the world, and that
 * access to certain sacred areas, including Al Masjid an Nabawi, is
 * restricted to Muslims. That is what `madinah.ts` says and it is what this
 * page says. The Riyadh–Makkah page states an absolute restriction because
 * Makkah's rule is absolute. Copying either sentence onto the other page
 * would be wrong in one direction and misleading in the other.
 *
 * `imageKey` is `route-highway65-north`, verified by eye: a dashboard view of
 * an empty expressway running north into dust haze, flat desert, a mesa on
 * the horizon. It is the Qassim–Riyadh expressway and it was unused in the
 * project before this page. Its emptiness is the right note for this route in
 * a way it would not be for the escarpment page.
 *
 * Sources: this project's own Riyadh–Buraydah page and Riyadh railway page;
 * published road figures for the Buraydah–Madinah leg; Visit Saudi, via
 * `madinah.ts`, for the access wording; press reporting that the Riyadh–
 * Jeddah railway is planned rather than built.
 */

export const riyadhToMadinah: RoutePageContent = {
  routeKey: "riyadhToMadinah",
  imageKey: "route-highway65-north",

  seo: {
    title: {
      en: "Riyadh to Madinah by road — private car, ~850 km",
      ar: "من الرياض إلى المدينة المنورة برًّا — سيارة خاصة، نحو 850 كم",
    },
    description: {
      en: "The drive from Riyadh to Madinah through Qassim: about 850 km in two legs of roughly 360 and 510 km, eight to nine hours, and why the train only covers the first half.",
      ar: "الرحلة البرية من الرياض إلى المدينة المنورة عبر القصيم: نحو 850 كم في مرحلتين قرابة 360 و510 كم، وثماني إلى تسع ساعات، ولماذا لا يغطي القطار إلا نصفها الأول.",
    },
  },

  crumbLabel: { en: "Riyadh to Madinah", ar: "الرياض إلى المدينة" },

  hero: {
    eyebrow: { en: "Riyadh · north-west through Qassim", ar: "الرياض · شمالًا غربًا عبر القصيم" },
    h1: {
      en: "Riyadh to Madinah by road",
      ar: "من الرياض إلى المدينة المنورة برًّا",
    },
    lead: {
      en: "About 850 km north-west, and unlike most long Saudi journeys this one has a real city at its middle. The road runs through Qassim, which is where the railway stops being an option and the second half of the drive begins.",
      ar: "نحو 850 كم شمالًا غربًا، وخلافًا لمعظم الرحلات السعودية الطويلة ففي منتصف هذه مدينة حقيقية. فالطريق يمر بالقصيم، وهناك يتوقف القطار عن كونه خيارًا ويبدأ النصف الثاني من الرحلة.",
    },
  },

  stats: [
    {
      label: { en: "Approximate distance", ar: "المسافة التقريبية" },
      value: { en: "~850 km", ar: "~850 كم" },
      note: {
        en: "Published totals run from about 830 km to about 870 km, depending on the route taken and where in each city the measurement starts.",
        ar: "تتراوح الإجماليات المنشورة بين نحو 830 و870 كم، بحسب المسار المسلوك وموضع بدء القياس في كل مدينة.",
      },
    },
    {
      label: { en: "Driving time", ar: "زمن القيادة" },
      value: { en: "8–9 hours", ar: "8–9 ساعات" },
      note: {
        en: "Moving time only, and it is the sum of two unequal halves rather than one steady run.",
        ar: "زمن السير فقط، وهو حاصل جمع نصفين غير متساويين لا رحلة واحدة متصلة.",
      },
    },
    {
      label: { en: "The halfway city", ar: "مدينة المنتصف" },
      value: { en: "Qassim", ar: "القصيم" },
      note: {
        en: "Buraydah sits at roughly the 360 km mark. It has its own page on this site, with the first leg set out in detail.",
        ar: "تقع بريدة عند نحو الكيلومتر 360. ولها صفحتها على هذا الموقع، وفيها المرحلة الأولى بالتفصيل.",
      },
    },
  ],

  statsChecked: {
    en: "Distance and driving-time figures last checked November 2026.",
    ar: "آخر تحقق من أرقام المسافة وزمن القيادة: نوفمبر 2026.",
  },

  overview: {
    heading: { en: "A journey with a middle", ar: "رحلة لها منتصف" },
    paragraphs: [
      {
        en: "Most long road journeys in the Kingdom are a single uninterrupted effort: you set off, you drive, and the only thing that changes is the light. This one is not like that. The road to Madinah leaves Riyadh heading north-west and passes through Qassim, and Qassim is not a fuel stop — it is a province with a working city at its centre, an international airport and hotels of its own.",
        ar: "معظم الرحلات البرية الطويلة في المملكة جهد واحد متصل: تنطلق ثم تقود، ولا يتغير سوى الضوء. وهذه ليست كذلك. فالطريق إلى المدينة المنورة يغادر الرياض شمالًا غربًا ويمر بالقصيم، والقصيم ليست محطة وقود — بل منطقة في قلبها مدينة عاملة ومطار دولي وفنادق خاصة بها.",
      },
      {
        en: "That changes how the journey is planned rather than just how it is described. The day has a natural break at a place where you can stop properly, and for some travellers it is the reason to split the drive across two days instead of one. For others it is simply reassurance: the halfway point is somewhere, not nowhere.",
        ar: "وهذا يغيّر طريقة التخطيط للرحلة لا طريقة وصفها فحسب. فلليوم استراحة طبيعية في مكان يمكنك التوقف فيه كما ينبغي، وهو لدى بعض المسافرين سبب تقسيم الرحلة على يومين بدل يوم. ولدى غيرهم مجرد طمأنينة: فنقطة المنتصف مكانٌ ما، لا لا مكان.",
      },
      {
        en: "It also makes the first half of this journey the best-documented stretch of road we publish out of Riyadh, because we already have a page for it.",
        ar: "كما يجعل النصف الأول من هذه الرحلة أكثر أجزاء الطريق توثيقًا فيما ننشره انطلاقًا من الرياض، لأن لدينا صفحة له أصلًا.",
      },
    ],
  },

  // --- The signature element: the midpoint diptych -------------------------

  midpoint: {
    heading: { en: "Two legs, hinged on Qassim", ar: "مرحلتان مفصلهما القصيم" },
    lead: {
      en: "The halves are not equal and they do not feel the same. Here is each one, with the figures we can stand behind.",
      ar: "النصفان غير متساويين ولا يُحسّان سواء. وهذا كل منهما، بالأرقام التي نستطيع ضمانها.",
    },
    hinge: {
      name: { en: "Buraydah, Qassim", ar: "بريدة، القصيم" },
      note: {
        en: "The hinge. A city of its own with an airport and hotels — and the furthest point on this journey a train can reach.",
        ar: "المفصل. مدينة قائمة بذاتها لها مطار وفنادق — وأبعد نقطة في هذه الرحلة يبلغها قطار.",
      },
      routeKey: "riyadhToBuraydah",
    },
    legs: [
      {
        index: { en: "Leg one", ar: "المرحلة الأولى" },
        name: { en: "Riyadh to Qassim", ar: "من الرياض إلى القصيم" },
        distance: { en: "~360 km", ar: "~360 كم" },
        duration: { en: "3.5–4.5 hours", ar: "3.5–4.5 ساعة" },
        detail: {
          en: "The documented half. Expressway north across open country, and the one stretch of this journey that has a page of its own on this site with the stages and the stops set out.",
          ar: "النصف الموثَّق. طريق سريع شمالًا عبر أرض مفتوحة، وهو الجزء الوحيد من هذه الرحلة الذي له صفحة خاصة على هذا الموقع فيها المراحل والتوقفات.",
        },
      },
      {
        index: { en: "Leg two", ar: "المرحلة الثانية" },
        name: { en: "Qassim to Madinah", ar: "من القصيم إلى المدينة المنورة" },
        distance: { en: "~510 km", ar: "~510 كم" },
        duration: { en: "4.5–5 hours", ar: "4.5–5 ساعة" },
        detail: {
          en: "The longer half, and the emptier one. West and south-west towards the Hijaz, with the settlements thinning out before the approach into Madinah. This is the half no railway covers.",
          ar: "النصف الأطول والأكثر خلاءً. غربًا وجنوبًا غربًا نحو الحجاز، والعمران يتناقص قبل الاقتراب من المدينة المنورة. وهذا هو النصف الذي لا تغطيه أي سكة حديد.",
        },
      },
    ],
    footnote: {
      en: "The two legs add up to a little more than the shortest published total, which is normal: a route through a city is not the shortest line between two points, and the figures above are measured between different places. Your quotation is built on your actual addresses.",
      ar: "ومجموع المرحلتين أكبر قليلًا من أقل إجمالي منشور، وهذا طبيعي: فالمسار عبر مدينة ليس أقصر خط بين نقطتين، والأرقام أعلاه مقيسة بين مواضع مختلفة. ويُبنى عرض سعرك على عنوانيك الفعليين.",
    },
  },

  stages: {
    heading: { en: "What the day feels like", ar: "كيف يمضي اليوم" },
    lead: {
      en: "Not a timetable. Conditions, your stops and the season all move it.",
      ar: "ليس جدولًا زمنيًا. فالظروف وتوقفاتك والموسم كلها تغيّره.",
    },
    items: [
      {
        name: { en: "North out of Riyadh", ar: "شمالًا من الرياض" },
        detail: {
          en: "Expressway and open country almost immediately. This is the fast part of the day and the part where the kilometres go by most easily.",
          ar: "طريق سريع وأرض مفتوحة فورًا تقريبًا. وهذا هو الجزء السريع من اليوم، والذي تمضي فيه الكيلومترات أيسر ما تكون.",
        },
      },
      {
        name: { en: "Qassim, and the decision", ar: "القصيم والقرار" },
        detail: {
          en: "The halfway city. Stop properly, or push on — it is the one point on this journey where that is a real choice rather than a question of where to find fuel.",
          ar: "مدينة المنتصف. توقّف كما ينبغي أو واصل — فهي النقطة الوحيدة في هذه الرحلة التي يكون فيها ذلك خيارًا حقيقيًا لا سؤالًا عن موضع الوقود.",
        },
      },
      {
        name: { en: "West towards the Hijaz", ar: "غربًا نحو الحجاز" },
        detail: {
          en: "The long second leg. Quieter country and longer gaps between places than the first half had. Worth planning your stops in advance rather than assuming them.",
          ar: "المرحلة الثانية الطويلة. أرض أهدأ ومسافات أطول بين المواضع مما كان في النصف الأول. ويستحق الأمر تخطيط توقفاتك مسبقًا لا افتراضها.",
        },
      },
      {
        name: { en: "Into Madinah", ar: "الدخول إلى المدينة المنورة" },
        detail: {
          en: "The approach to the central area, where the traffic depends heavily on the hour and the season. Hotel drop-off near the Prophet's Mosque is its own question, covered below.",
          ar: "الاقتراب من المنطقة المركزية، وحركتها تعتمد كثيرًا على الساعة والموسم. والنزول عند الفنادق قرب المسجد النبوي مسألة قائمة بذاتها، وهي أدناه.",
        },
      },
    ],
  },

  pickup: {
    heading: { en: "Where we collect you in Riyadh", ar: "من أين نستقبلك في الرياض" },
    paragraphs: [
      {
        en: "Any address in Riyadh, or King Khalid International Airport if you are connecting from a flight. Send the full address rather than a district name — on a day this long, the first half hour is the one most easily wasted.",
        ar: "أي عنوان في الرياض، أو مطار الملك خالد الدولي إن كنت قادمًا من رحلة جوية. وأرسل العنوان الكامل لا اسم الحي — ففي يوم بهذا الطول تكون نصف الساعة الأولى أسهل ما يُهدر.",
      },
      {
        en: "Tell us in the enquiry whether you want this as one day or two. If two, say so early: an overnight in Qassim changes the shape of the booking rather than just adding a line to it, and it is quoted differently.",
        ar: "وأخبرنا في الطلب إن كنت تريدها يومًا واحدًا أو يومين. وإن كانت يومين فاذكر ذلك مبكرًا: فالمبيت في القصيم يغيّر شكل الحجز لا يضيف إليه سطرًا فحسب، ويُسعَّر على نحو مختلف.",
      },
    ],
  },

  dropoff: {
    heading: { en: "Arriving in Madinah", ar: "الوصول إلى المدينة المنورة" },
    paragraphs: [
      {
        en: "Visit Saudi says Madinah welcomes visitors from around the world, and that access to certain sacred areas, including Al Masjid an Nabawi, is restricted to Muslims. That is a different rule from the one that applies to Makkah, and we state it as it is rather than carrying the other city's wording across. Check current official guidance for your own dates.",
        ar: "تذكر «روح السعودية» أن المدينة المنورة ترحب بالزوار من أنحاء العالم، وأن الدخول إلى مواضع مقدسة معينة، ومنها المسجد النبوي، مقصور على المسلمين. وهذا حكم يختلف عن المطبَّق في مكة المكرمة، ونذكره كما هو لا ننقل صياغة المدينة الأخرى إليه. وتحقق من الإرشادات الرسمية السارية لتواريخك.",
      },
      {
        en: "For the hotel itself, the exact pickup and drop-off point depends on the property and on the traffic arrangements on the day, and it is confirmed for each journey. We do not promise access to the mosque grounds, pedestrian areas or hotel forecourts. Send the hotel name and its address, not the brand alone.",
        ar: "أما الفندق نفسه فنقطة النزول والاستقبال فيه تعتمد على المنشأة وعلى ترتيبات الحركة ذلك اليوم، وتُؤكَّد لكل رحلة. ولا نَعِد بالوصول إلى ساحات المسجد أو المناطق المخصصة للمشاة أو ساحات الفنادق. فأرسل اسم الفندق وعنوانه، لا العلامة التجارية وحدها.",
      },
    ],
  },

  // --- The honest comparison: where the railway gives up -------------------

  comparison: {
    heading: {
      en: "The railway covers half of this",
      ar: "السكة تغطي نصف هذه الرحلة",
    },
    lead: {
      en: "This is the part worth knowing before you plan, and it is more particular than it first sounds. Both ends of this journey have a railway. They are not the same railway, and they do not meet.",
      ar: "هذا هو الجزء الجدير بالمعرفة قبل التخطيط، وهو أدق مما يبدو أول وهلة. فلطرفَي هذه الرحلة سكة حديد. وليستا السكة نفسها، ولا تلتقيان.",
    },
    columns: [
      {
        title: { en: "What rail can do", ar: "ما تستطيعه السكة" },
        headline: { en: "The first half", ar: "النصف الأول" },
        points: [
          {
            en: "Riyadh's northern line runs through Qassim on its way to Hail and the Jordanian border, so a train will take you as far as the halfway city.",
            ar: "يمر خط الرياض الشمالي بالقصيم في طريقه إلى حائل والحدود الأردنية، فيبلغ بك القطار مدينة المنتصف.",
          },
          {
            en: "The Haramain line serves Madinah at the other end, from Makkah and Jeddah.",
            ar: "ويخدم خط الحرمين المدينة المنورة في الطرف الآخر، قادمًا من مكة المكرمة وجدة.",
          },
          {
            en: "Both are real services. Neither of them connects to the other.",
            ar: "وكلتاهما خدمة قائمة فعلًا. ولا تتصل إحداهما بالأخرى.",
          },
        ],
      },
      {
        title: { en: "What it cannot", ar: "وما لا تستطيعه" },
        headline: { en: "The second half", ar: "النصف الثاني" },
        points: [
          {
            en: "There is no rail line between Qassim and Madinah, so the longer leg of this journey has no train at all.",
            ar: "لا خط سكة حديد بين القصيم والمدينة المنورة، فالمرحلة الأطول من هذه الرحلة بلا قطار البتة.",
          },
          {
            en: "A Riyadh–Jeddah railway that would join the two networks has been reported as planned rather than built. We publish no opening date, because none of our sources agrees on one.",
            ar: "وقد ورد أن سكة الرياض – جدة التي تربط الشبكتين مخطَّطة لا منفَّذة. ولا ننشر تاريخ افتتاح، لأن مصادرنا لا تتفق على واحد.",
          },
          {
            en: "So the practical choice for the whole journey is road or air, and the car is the only one that does it without a change.",
            ar: "فالخيار العملي للرحلة كاملة هو البر أو الجو، والسيارة وحدها تقطعها دون تبديل.",
          },
        ],
      },
    ],
    footnote: {
      en: "We arrange road transport and sell no rail or air tickets, so none of this is a sales argument. Madinah has its own airport with a page on this site; if flying suits you better, fly, and we will quote whichever leg you still need.",
      ar: "ونحن نرتّب النقل البري ولا نبيع تذاكر قطار ولا طيران، فليس في هذا كله حجة بيع. وللمدينة المنورة مطارها وله صفحة على هذا الموقع؛ فإن كان الطيران أنسب لك فسافر جوًّا، ونسعّر لك ما تبقى من مراحل.",
    },
  },

  practical: {
    heading: { en: "Practical notes", ar: "ملاحظات عملية" },
    items: [
      {
        heading: { en: "One day or two", ar: "يوم واحد أو يومان" },
        paragraphs: [
          {
            en: "This is the one long route out of Riyadh where splitting the journey is a sensible default rather than a fallback, because the break lands at a city rather than a roadside. Say which you want in the enquiry; we do not book hotels, so an overnight is yours to arrange.",
            ar: "هذا هو المسار الطويل الوحيد من الرياض الذي يكون فيه تقسيم الرحلة خيارًا افتراضيًا معقولًا لا بديلًا اضطراريًا، لأن الاستراحة تقع في مدينة لا على قارعة طريق. فاذكر ما تريد في الطلب؛ ونحن لا نحجز فنادق، فالمبيت ترتّبه أنت.",
          },
        ],
      },
      {
        heading: { en: "The second half is emptier", ar: "النصف الثاني أكثر خلاءً" },
        paragraphs: [
          {
            en: "Places are further apart west of Qassim than they are between Riyadh and Qassim. We do not publish a list of facilities along it, because what is open on a given day is not something we can verify from here — but it is worth filling up and eating at the hinge rather than after it.",
            ar: "المواضع أكثر تباعدًا غرب القصيم منها بين الرياض والقصيم. ولا ننشر قائمة بالخدمات على امتداده، لأن ما هو مفتوح في يوم بعينه ليس مما نستطيع التحقق منه من هنا — لكن يُستحسن التزود بالوقود والطعام عند المفصل لا بعده.",
          },
        ],
      },
      {
        heading: { en: "One driver or two", ar: "سائق واحد أم اثنان" },
        paragraphs: [
          {
            en: "Eight to nine hours is a long shift. Whether your journey is covered by one driver or two is set when it is arranged and stated in the quotation, so it is not something you discover on the road.",
            ar: "ثماني إلى تسع ساعات مناوبة طويلة. وتحديد ما إن كان يغطي رحلتك سائق واحد أم اثنان يتم عند الترتيب ويُذكر في عرض السعر، فلا يكون أمرًا تكتشفه على الطريق.",
          },
        ],
      },
    ],
  },

  booking: {
    heading: { en: "What we need to quote it", ar: "ما نحتاجه للتسعير" },
    paragraphs: [
      {
        en: "The full pickup address in Riyadh, the hotel name and address in Madinah, the date, the departure time you want, how many passengers and how many suitcases — and whether you want this as one day or two. Sending an enquiry does not confirm a booking and does not hold a vehicle for your date.",
        ar: "عنوان الانطلاق الكامل في الرياض، واسم الفندق وعنوانه في المدينة المنورة، والتاريخ، وموعد المغادرة الذي تريده، وعدد الركاب وعدد الحقائب — وهل تريدها يومًا واحدًا أو يومين. وإرسال الطلب لا يؤكد حجزًا ولا يحجز مركبة لتاريخك.",
      },
      {
        en: "We reply with a written price. You decide. Your transfer is confirmed only when we send a booking confirmation saying so, and nothing is reserved and no payment is taken on this website.",
        ar: "ونرد بسعر مكتوب. ثم تقرر أنت. ولا تتأكد رحلتك إلا عندما نرسل رسالة تأكيد حجز تنص على ذلك، ولا يُحجز شيء ولا يُستوفى أي مبلغ عبر هذا الموقع.",
      },
    ],
  },

  onward: {
    heading: { en: "Once you are there", ar: "بعد الوصول" },
    items: [
      {
        heading: { en: "Madinah to Makkah", ar: "من المدينة إلى مكة" },
        paragraphs: [
          {
            en: "Approximately 440–450 km south, with its own page covering both directions — and on that corridor the Haramain train is a genuine alternative, which it is not on this one.",
            ar: "نحو 440–450 كم جنوبًا، ولها صفحتها التي تغطي الاتجاهين — وعلى ذلك الممر يكون قطار الحرمين بديلًا حقيقيًا، بخلاف هذا المسار.",
          },
        ],
      },
      {
        heading: { en: "AlUla, and the coast", ar: "العلا والساحل" },
        paragraphs: [
          {
            en: "Madinah is the usual starting point for AlUla, about 383 km north-west through Khaybar, and for Yanbu on the Red Sea. Both are covered from the Madinah hub.",
            ar: "المدينة المنورة هي نقطة الانطلاق المعتادة إلى العلا، على نحو 383 كم شمالًا غربًا عبر خيبر، وإلى ينبع على البحر الأحمر. وكلتاهما مشمولة من صفحة المدينة.",
          },
        ],
      },
    ],
  },

  faqHeading: { en: "Common questions", ar: "الأسئلة الشائعة" },

  faqs: [
    {
      question: {
        en: "How far is Riyadh from Madinah by road?",
        ar: "كم تبعد الرياض عن المدينة المنورة برًّا؟",
      },
      answer: {
        en: "About 850 km through Qassim, in two legs of roughly 360 km and 510 km. Published totals range from about 830 to about 870 km depending on the route and the endpoints, which is why we give a figure with the spread rather than a single precise number.",
        ar: "نحو 850 كم عبر القصيم، في مرحلتين قرابة 360 كم و510 كم. وتتراوح الإجماليات المنشورة بين نحو 830 و870 كم بحسب المسار ونقطتي البداية والنهاية، ولهذا نعطي رقمًا مع بيان الفارق لا رقمًا واحدًا دقيقًا.",
      },
    },
    {
      question: {
        en: "Is there a train from Riyadh to Madinah?",
        ar: "هل يوجد قطار من الرياض إلى المدينة المنورة؟",
      },
      answer: {
        en: "Not for the whole journey, and the detail is worth having. Riyadh's northern line runs through Qassim towards Hail and the Jordanian border, so rail covers roughly the first half. The Haramain line serves Madinah from Makkah and Jeddah. The two networks do not connect, and the Riyadh–Jeddah railway that would join them has been reported as planned rather than built. So the whole journey is road or air.",
        ar: "ليس للرحلة كاملة، والتفصيل جدير بالمعرفة. فخط الرياض الشمالي يمر بالقصيم نحو حائل والحدود الأردنية، فتغطي السكة نحو النصف الأول. ويخدم خط الحرمين المدينة المنورة قادمًا من مكة وجدة. والشبكتان غير متصلتين، وقد ورد أن سكة الرياض – جدة التي تربطهما مخطَّطة لا منفَّذة. فالرحلة كاملةً برًّا أو جوًّا.",
      },
    },
    {
      question: {
        en: "Should we break the journey at Qassim?",
        ar: "هل نقسّم الرحلة عند القصيم؟",
      },
      answer: {
        en: "It is a real option here in a way it is not on most long Saudi routes, because the halfway point is a city with an airport and hotels rather than a service area. Families travelling with children often do. Tell us in the enquiry if you want two days, because it changes how the journey is quoted. We arrange the transport, not the accommodation.",
        ar: "خيار حقيقي هنا على نحو لا يتوفر في معظم المسارات السعودية الطويلة، لأن نقطة المنتصف مدينة لها مطار وفنادق لا منطقة خدمات. والعائلات المسافرة بأطفال تفعل ذلك كثيرًا. فأخبرنا في الطلب إن أردت يومين، لأن ذلك يغيّر طريقة تسعير الرحلة. ونحن نرتّب النقل لا الإقامة.",
      },
    },
    {
      question: {
        en: "Can non-Muslims travel with you to Madinah?",
        ar: "هل يمكن لغير المسلمين السفر معكم إلى المدينة المنورة؟",
      },
      answer: {
        en: "Visit Saudi says Madinah welcomes visitors from around the world, and that access to certain sacred areas, including Al Masjid an Nabawi, is restricted to Muslims. This is not the same rule that applies to Makkah, where entry to the city itself is restricted. Check current official guidance for your dates, and tell us your destination address so we can say plainly what we can and cannot drive you to.",
        ar: "تذكر «روح السعودية» أن المدينة المنورة ترحب بالزوار من أنحاء العالم، وأن الدخول إلى مواضع مقدسة معينة، ومنها المسجد النبوي، مقصور على المسلمين. وليس هذا هو الحكم المطبَّق في مكة المكرمة حيث يُقيَّد دخول المدينة نفسها. فتحقق من الإرشادات الرسمية السارية لتواريخك، وأخبرنا بعنوان وجهتك لنوضح بصراحة إلى أين نستطيع إيصالك وإلى أين لا.",
      },
    },
    {
      question: {
        en: "Would flying be better?",
        ar: "هل الطيران أفضل؟",
      },
      answer: {
        en: "For one or two people travelling light, usually yes — Madinah has its own international airport and it has a page on this site. The drive makes sense for families and groups, for anyone with real luggage, for anyone who wants the Qassim break in the plan, and for anyone who would rather not hand their bags over at all. We sell no air tickets, so we have no stake in the answer.",
        ar: "لشخص أو شخصين بأمتعة خفيفة، نعم عادةً — فللمدينة المنورة مطارها الدولي وله صفحة على هذا الموقع. وتكون الرحلة البرية منطقية للعائلات والمجموعات، ولمن لديه أمتعة حقيقية، ولمن يريد استراحة القصيم ضمن الخطة، ولمن يفضّل ألا يسلّم حقائبه أصلًا. ونحن لا نبيع تذاكر طيران، فلا مصلحة لنا في الجواب.",
      },
    },
    {
      question: {
        en: "What is the road like on the second half?",
        ar: "كيف حال الطريق في النصف الثاني؟",
      },
      answer: {
        en: "Quieter and emptier than the first, with longer gaps between places west of Qassim. We do not publish a list of what is open along it, because that is not something we can verify from here and a stale list is worse than none. The practical advice is to fill up and eat at Qassim rather than assuming something later.",
        ar: "أهدأ وأكثر خلاءً من الأول، والمسافات بين المواضع أطول غرب القصيم. ولا ننشر قائمة بما هو مفتوح عليه، لأن ذلك ليس مما نستطيع التحقق منه من هنا، والقائمة القديمة أسوأ من غيابها. والنصيحة العملية أن تتزود بالوقود والطعام في القصيم لا أن تفترض شيئًا لاحقًا.",
      },
    },
  ],

  related: [
    {
      routeKey: "riyadh",
      label: { en: "Private transfers in Riyadh", ar: "توصيل خاص في الرياض" },
      note: {
        en: "The capital hub: the airport, hotels, the railway stations and every route out of the city.",
        ar: "مركز العاصمة: المطار والفنادق ومحطات القطار وكل مسار خارج المدينة.",
      },
    },
    {
      routeKey: "madinah",
      label: { en: "Private transfers in Madinah", ar: "توصيل خاص في المدينة المنورة" },
      note: {
        en: "Once you arrive: the central-area hotels, Ziyarat, the airport and the station.",
        ar: "بعد الوصول: فنادق المنطقة المركزية والمزارات والمطار والمحطة.",
      },
    },
    {
      routeKey: "riyadhToBuraydah",
      label: { en: "Riyadh to Buraydah", ar: "الرياض إلى بريدة" },
      note: {
        en: "The first leg of this journey, documented in full — ~360 km and 3.5 to 4.5 hours.",
        ar: "المرحلة الأولى من هذه الرحلة، موثّقة بالكامل — نحو 360 كم و3.5 إلى 4.5 ساعة.",
      },
    },
    {
      routeKey: "madinahAirport",
      label: { en: "Madinah airport transfers", ar: "النقل من مطار المدينة" },
      note: {
        en: "If you decide to fly instead: Prince Mohammad bin Abdulaziz and the road to your hotel.",
        ar: "إن قررت السفر جوًّا: مطار الأمير محمد بن عبدالعزيز والطريق إلى فندقك.",
      },
    },
    {
      routeKey: "makkahToMadinah",
      label: { en: "Makkah to Madinah", ar: "من مكة إلى المدينة" },
      note: {
        en: "The pilgrimage corridor, approximately 440–450 km — and the one where the train really does compete.",
        ar: "ممر الحج والعمرة، نحو 440–450 كم — وهو الذي ينافس فيه القطار فعلًا.",
      },
    },
    {
      routeKey: "riyadhRailway",
      label: { en: "Riyadh railway station transfers", ar: "النقل من محطات قطار الرياض" },
      note: {
        en: "If you take the train as far as Qassim: which of Riyadh's two stations the northern line leaves from.",
        ar: "إن ركبت القطار إلى القصيم: من أي محطتي الرياض ينطلق الخط الشمالي.",
      },
    },
  ],

  cta: {
    eyebrow: { en: "One day, or two", ar: "يوم واحد أو يومان" },
    heading: {
      en: "Tell us how you want to break it",
      ar: "أخبرنا كيف تريد تقسيمها",
    },
    body: {
      en: "The addresses at both ends, the date, how many of you, and whether Qassim is a stop or just a place you pass. We reply with a written price.",
      ar: "العنوانان في الطرفين، والتاريخ، وعددكم، وهل القصيم محطة توقف أم مجرد مكان تمرّون به. ونرد بسعر مكتوب.",
    },
    button: { en: "Request a quotation", ar: "اطلب عرض سعر" },
  },
};
