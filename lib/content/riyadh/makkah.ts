import type { RoutePageContent } from "@/lib/content/riyadh/types";

/**
 * Riyadh to Makkah.
 *
 * The longest approved journey in the Riyadh cluster, and the one where the
 * honest answer is most often "fly". That is the page's spine rather than a
 * caveat buried near the bottom: roughly 870 km and nine to ten hours of
 * driving against a short domestic flight to Jeddah, so the page spends its
 * opening establishing who the drive actually suits before describing it.
 *
 * **Figures.** Published distances range from about 870 km to about 950 km
 * depending on which points are measured. The lower end is corroborated from
 * inside this project: our own Riyadh–Taif page gives ~790 km for the shared
 * stretch, and the Ministry of Transport's Highway 40 description puts
 * Makkah to as-Sayl al-Kabir at 85.3 km, which lands within a few kilometres
 * of the 869 km road distance aggregators give. So ~870 km is published as
 * the figure with the spread stated, not smoothed away.
 *
 * **The signature element is the roll-call** — the nine settlements the
 * Ministry of Transport names along Highway 40 between the two cities, listed
 * in travel order with no distances attached. Numbers were considered and
 * rejected: Saudipedia's own segment lengths for this road contradict each
 * other (Taif–Riyadh appears as both 267.2 km and 264.9 km) and do not sum to
 * the road's stated 1,370 km total, so any per-town figure would be invented
 * precision. The bare list still does the work. Read as a tall column it is
 * the shape of the day.
 *
 * **Not the Makkah–Madinah corridor's design.** That page is "one road, two
 * journeys", built on a route plate and a milepost strip with distances on
 * it, because there the two directions genuinely differ. Here the direction
 * does not change the argument and the distances are not reliable enough to
 * draw, so this page is built the other way round: a decision first, then a
 * numberless list, then the practicalities.
 *
 * **Entry.** Makkah's restriction is absolute and is stated in the hero
 * rather than in the small print, matching `makkah.ts`: entry is restricted
 * to Muslims and we accept journeys only for passengers who may legally enter
 * on the travel date. Note that the Madinah route page states something
 * different, because the rule genuinely is different — the two pages must not
 * be read as mirror images.
 *
 * `imageKey` is `route-highway40-west`, verified by eye: a divided highway
 * cutting through a layered limestone escarpment in open desert, with freight
 * on it. It is the first real feature of this journey and it was unused
 * before this page.
 *
 * Sources: Saudipedia (Ministry of Transport and Logistic Services) for
 * Highway 40's length, provinces and the settlements along it; Rome2Rio for
 * the road distance and driving time; this project's own Riyadh–Taif page for
 * the shared stretch.
 */

export const riyadhToMakkah: RoutePageContent = {
  routeKey: "riyadhToMakkah",
  imageKey: "route-highway40-west",

  seo: {
    title: {
      en: "Riyadh to Makkah by road — private car, ~870 km",
      ar: "من الرياض إلى مكة برًّا — سيارة خاصة، نحو 870 كم",
    },
    description: {
      en: "The drive from Riyadh to Makkah on Highway 40: about 870 km and nine to ten hours, who it suits, when flying is the better answer, and what we need to quote it.",
      ar: "الرحلة البرية من الرياض إلى مكة المكرمة على الطريق 40: نحو 870 كم وتسع إلى عشر ساعات، ولمن تناسب، ومتى يكون الطيران أفضل، وما نحتاجه للتسعير.",
    },
  },

  crumbLabel: { en: "Riyadh to Makkah", ar: "الرياض إلى مكة" },

  hero: {
    eyebrow: { en: "Riyadh · Highway 40 west", ar: "الرياض · الطريق 40 غربًا" },
    h1: {
      en: "Riyadh to Makkah by road",
      ar: "من الرياض إلى مكة المكرمة برًّا",
    },
    lead: {
      en: "About 870 km on a single numbered road, and nine to ten hours of driving before you count a stop. Most people fly this one, and we will say so before we quote it. Entry to Makkah is restricted to Muslims, and we accept journeys into the city only for passengers who may legally enter on the travel date.",
      ar: "نحو 870 كم على طريق واحد مرقّم، وتسع إلى عشر ساعات قيادة قبل حساب أي توقف. ومعظم الناس يسافرون جوًّا في هذه الرحلة، وسنقول ذلك قبل أن نسعّرها. ودخول مكة المكرمة مقصور على المسلمين، ولا نقبل الرحلات إلى داخل المدينة إلا لركاب يحق لهم الدخول نظامًا في تاريخ السفر.",
    },
  },

  stats: [
    {
      label: { en: "Approximate distance", ar: "المسافة التقريبية" },
      value: { en: "~870 km", ar: "~870 كم" },
      note: {
        en: "Published figures run from about 870 km to about 950 km, because they measure between different points in each city. Our own Riyadh–Taif page gives ~790 km for the shared stretch.",
        ar: "تتراوح الأرقام المنشورة بين نحو 870 و950 كم، لأنها تقيس بين نقاط مختلفة في كل مدينة. وصفحتنا عن الرياض والطائف تذكر نحو 790 كم للجزء المشترك.",
      },
    },
    {
      label: { en: "Driving time", ar: "زمن القيادة" },
      value: { en: "9–10 hours", ar: "9–10 ساعات" },
      note: {
        en: "Moving time only. A real day on this road is longer once meals, prayers and fuel are in it.",
        ar: "زمن السير فقط. واليوم الفعلي على هذا الطريق أطول بعد حساب الطعام والصلاة والوقود.",
      },
    },
    {
      label: { en: "The road", ar: "الطريق" },
      value: { en: "Highway 40", ar: "الطريق 40" },
      note: {
        en: "The Kingdom's main west-to-east artery, running 1,370 km from Jeddah to Dammam and serving more than 66% of the population, according to the Ministry of Transport and Logistic Services.",
        ar: "الشريان الرئيس من الغرب إلى الشرق في المملكة، ويمتد 1,370 كم من جدة إلى الدمام ويخدم أكثر من 66% من السكان، بحسب وزارة النقل والخدمات اللوجستية.",
      },
    },
  ],

  statsChecked: {
    en: "Distance and driving-time figures last checked November 2026.",
    ar: "آخر تحقق من أرقام المسافة وزمن القيادة: نوفمبر 2026.",
  },

  overview: {
    heading: { en: "Who actually drives this", ar: "من يقطع هذا الطريق فعلًا" },
    paragraphs: [
      {
        en: "Riyadh to Makkah is the longest journey we quote out of the capital, and for one or two people travelling light it is usually the wrong choice. A domestic flight to Jeddah and a short transfer from there will get you to a Makkah hotel in a fraction of the day, and the Haramain train runs from inside the Jeddah airport. We arrange road transport and sell neither flights nor rail tickets, so there is nothing in this for us either way.",
        ar: "الرحلة من الرياض إلى مكة المكرمة هي أطول ما نسعّره انطلاقًا من العاصمة، ولشخص أو شخصين بأمتعة خفيفة تكون عادةً الخيار الخطأ. فرحلة داخلية إلى جدة ثم توصيلة قصيرة منها توصلك إلى فندقك في مكة في جزء يسير من اليوم، وقطار الحرمين ينطلق من داخل مطار جدة. ونحن نرتّب النقل البري ولا نبيع تذاكر طيران ولا قطار، فلا مصلحة لنا في أي الخيارين.",
      },
      {
        en: "The drive earns its place in a narrower set of cases, and they are real ones. A family of five or six with Umrah luggage, where four airline seats and a transfer at each end costs more and handles worse than one vehicle. A group that wants to leave Riyadh late and arrive in the morning. Anyone whose plan has an awkward shape — a stop at Taif on the way, a return date that has not been fixed, a pickup from an address a long way from King Khalid airport. And anyone who simply does not want to break the journey into a taxi, a terminal, a flight, another terminal and another car.",
        ar: "وتستحق الرحلة البرية مكانها في حالات أضيق، وهي حالات حقيقية. عائلة من خمسة أو ستة بأمتعة عمرة، حيث تكلّف أربعة مقاعد طيران وتوصيلتان في الطرفين أكثر وتُدار أصعب من مركبة واحدة. أو مجموعة تريد مغادرة الرياض ليلًا والوصول صباحًا. أو من كانت خطته غير معتادة — توقف في الطائف في الطريق، أو تاريخ عودة غير محدد، أو انطلاق من عنوان بعيد عن مطار الملك خالد. أو من لا يريد ببساطة تقطيع رحلته إلى سيارة أجرة وصالة وطائرة وصالة أخرى وسيارة أخرى.",
      },
      {
        en: "If you are in one of those cases, this page is for you. If you are not, we would rather tell you now than take the enquiry and let you work it out at hour six.",
        ar: "فإن كنت في إحدى تلك الحالات فهذه الصفحة لك. وإن لم تكن، فنفضّل إخبارك الآن على استقبال الطلب وتركك تكتشف ذلك في الساعة السادسة.",
      },
    ],
  },

  // --- The signature element: the roll-call -------------------------------

  wayNames: {
    heading: {
      en: "Nine places between here and there",
      ar: "تسعة مواضع بين هنا وهناك",
    },
    lead: {
      en: "These are the settlements the Ministry of Transport names along Highway 40 between the two cities, in the order you would pass them. We have put no distances against them, and that is deliberate — see the note below.",
      ar: "هذه هي المواضع التي تسمّيها وزارة النقل على الطريق 40 بين المدينتين، بالترتيب الذي تمرّ بها. ولم نضع أمامها مسافات، وذلك متعمَّد — انظر الملاحظة أدناه.",
    },
    from: { en: "Riyadh", ar: "الرياض" },
    to: { en: "Makkah al-Mukarramah", ar: "مكة المكرمة" },
    places: [
      { name: { en: "Al-Muzahimiyyah", ar: "المزاحمية" } },
      { name: { en: "Al-Quwayiyyah", ar: "القويعية" } },
      { name: { en: "Halaban", ar: "حلبان" } },
      { name: { en: "Ar-Ruwaydah", ar: "الرويضة" } },
      { name: { en: "Dhalm", ar: "ضلم" } },
      { name: { en: "Al-Muwayh", ar: "المويه" } },
      { name: { en: "Radwan", ar: "رضوان" } },
      { name: { en: "Al-Hawiyyah", ar: "الحوية" } },
      { name: { en: "As-Sayl al-Kabir", ar: "السيل الكبير" } },
    ],
    source: {
      en: "Route description published by Saudipedia, sourced to the Ministry of Transport and Logistic Services.",
      ar: "وصف المسار المنشور في السعودية بيديا، نقلًا عن وزارة النقل والخدمات اللوجستية.",
    },
    footnote: {
      en: "No kilometre figures, because the published ones do not agree with each other: the same ministry description gives the Taif–Riyadh road as both 267.2 km and 264.9 km, and its segments do not add up to the road's stated 1,370 km. A number we cannot stand behind is worse than no number. What the list is for is the length of it.",
      ar: "ولا أرقام كيلومترات، لأن المنشور منها لا يتفق فيما بينه: فالوصف الوزاري نفسه يذكر طريق الطائف – الرياض بـ267.2 كم وبـ264.9 كم معًا، ولا تبلغ أجزاؤه مجموع الطريق المعلن 1,370 كم. ورقمٌ لا نستطيع ضمانه أسوأ من غياب الرقم. وإنما فائدة القائمة في طولها.",
    },
  },

  // --- Stages --------------------------------------------------------------

  stages: {
    heading: { en: "How the day breaks up", ar: "كيف ينقسم اليوم" },
    lead: {
      en: "Not a timetable — conditions, your stops and the season all move it. It is the shape of the journey rather than a promise about it.",
      ar: "ليس جدولًا زمنيًا — فالظروف وتوقفاتك والموسم كلها تغيّره. وإنما هو شكل الرحلة لا وعد بشأنها.",
    },
    items: [
      {
        name: { en: "Out of Riyadh, and the escarpment", ar: "الخروج من الرياض والحافة" },
        detail: {
          en: "The city gives way quickly. Within the first hour the road cuts through the Tuwaiq escarpment — the layered cliff in the photograph above — which is the one piece of real scenery before the plateau.",
          ar: "تنتهي المدينة سريعًا. ففي الساعة الأولى يشق الطريق حافة طويق — ذلك الجرف الطبقي في الصورة أعلاه — وهي المشهد الوحيد الحقيقي قبل الهضبة.",
        },
      },
      {
        name: { en: "The long middle", ar: "الوسط الطويل" },
        detail: {
          en: "Most of the journey. Open country, freight, and the towns on the list above arriving at long intervals. This is the stretch that decides whether you enjoyed the day or endured it.",
          ar: "معظم الرحلة. أرض مفتوحة وشاحنات، والبلدات المذكورة أعلاه تأتي على فترات متباعدة. وهذا هو الجزء الذي يحدد إن كنت استمتعت باليوم أم تحمّلته.",
        },
      },
      {
        name: { en: "Down towards as-Sayl", ar: "النزول نحو السيل" },
        detail: {
          en: "The road reaches the high ground around Taif and then comes down. If Taif is part of your plan, this is where it is — and the ascent from Riyadh is covered in full on its own page.",
          ar: "يبلغ الطريق المرتفعات حول الطائف ثم ينزل. وإن كان الطائف ضمن خطتك فهنا موضعه — والصعود من الرياض مشروح بالكامل في صفحته الخاصة.",
        },
      },
      {
        name: { en: "Into Makkah", ar: "الدخول إلى مكة المكرمة" },
        detail: {
          en: "The last stretch, through the checkpoint and into the city. Expect the approach to the Haram to be slower than the open road was, particularly at prayer times and in Ramadan.",
          ar: "الجزء الأخير، عبر نقطة التفتيش ثم إلى المدينة. وتوقّع أن يكون الاقتراب من الحرم أبطأ من الطريق المفتوح، خاصة في أوقات الصلاة وفي رمضان.",
        },
      },
    ],
  },

  pickup: {
    heading: { en: "Where we collect you in Riyadh", ar: "من أين نستقبلك في الرياض" },
    paragraphs: [
      {
        en: "Any address in Riyadh — a home, a hotel, an office, or King Khalid International Airport if you are connecting from a flight. Give us the full address rather than a district: Riyadh is large enough that a district name can mean half an hour either way at the start of a ten-hour day.",
        ar: "أي عنوان في الرياض — منزل أو فندق أو مكتب، أو مطار الملك خالد الدولي إن كنت قادمًا من رحلة جوية. وأعطنا العنوان الكامل لا اسم الحي: فالرياض من الاتساع بحيث قد يعني اسم الحي نصف ساعة زيادةً أو نقصًا في بداية يوم من عشر ساعات.",
      },
      {
        en: "Departure time is yours to set, and it is the single decision that shapes this journey most. An early start puts you in Makkah in daylight; a late-evening start trades a night's sleep for arriving in the morning. Tell us which you want and we build the pickup around it.",
        ar: "وموعد الانطلاق قرارك، وهو القرار الأكثر تأثيرًا في شكل هذه الرحلة. فالانطلاق المبكر يوصلك إلى مكة في وضح النهار؛ والانطلاق في آخر المساء يقايض ليلة نوم بوصول صباحي. أخبرنا بما تريد ونبني موعد الاستقبال عليه.",
      },
    ],
  },

  dropoff: {
    heading: { en: "Arriving in Makkah", ar: "الوصول إلى مكة المكرمة" },
    paragraphs: [
      {
        en: "Entry to Makkah is restricted to Muslims, and further restrictions are announced around the Hajj season. We accept journeys into the city only for passengers who may legally enter on the travel date, and we confirm that before quoting rather than at the checkpoint.",
        ar: "دخول مكة المكرمة مقصور على المسلمين، وتُعلَن قيود إضافية حول موسم الحج. ولا نقبل الرحلات إلى داخل المدينة إلا لركاب يحق لهم الدخول نظامًا في تاريخ السفر، ونتأكد من ذلك قبل التسعير لا عند نقطة التفتيش.",
      },
      {
        en: "Vehicle access around the Grand Mosque is controlled and it is not the same for every hotel. Some allow a car to their entrance; others are reached on foot from the nearest permitted point. Which applies to yours depends on the property and on the restrictions in force at the time, and it is confirmed in writing when the journey is arranged. Send the hotel name and its address, not the brand alone.",
        ar: "ودخول المركبات حول المسجد الحرام منظَّم، ولا يتساوى فيه كل الفنادق. فبعضها يسمح بوصول السيارة إلى مدخله، وبعضها لا يُوصَل إليه إلا مشيًا من أقرب نقطة مسموح بها. ويعتمد أيّهما ينطبق على فندقك على المنشأة وعلى القيود السارية حينها، ويُؤكَّد كتابةً عند ترتيب الرحلة. فأرسل اسم الفندق وعنوانه، لا العلامة التجارية وحدها.",
      },
    ],
  },

  // --- The honest comparison ----------------------------------------------

  comparison: {
    heading: { en: "Driving against flying", ar: "البر مقابل الجو" },
    lead: {
      en: "Set out plainly, including the part that does not favour us. There is no rail link between Riyadh and Makkah, so the real choice is these two.",
      ar: "معروضان بوضوح، بما في ذلك ما ليس في صالحنا. ولا يوجد خط سكة حديد بين الرياض ومكة المكرمة، فالخيار الحقيقي هو هذان.",
    },
    columns: [
      {
        title: { en: "By road, with us", ar: "برًّا، معنا" },
        headline: { en: "9–10 hrs", ar: "9–10 ساعات" },
        points: [
          {
            en: "One vehicle, one driver, door to door. No terminals, no baggage limits beyond what the vehicle holds, and no connection to miss.",
            ar: "مركبة واحدة وسائق واحد، من الباب إلى الباب. بلا صالات، وبلا حدود أمتعة سوى ما تتسعه المركبة، وبلا ارتباط قد يفوتك.",
          },
          {
            en: "Makes sense for families and groups, where the per-seat arithmetic of flying turns against you.",
            ar: "ومنطقية للعائلات والمجموعات، حيث ينقلب حساب المقعد الواحد في الطيران ضدك.",
          },
          {
            en: "You choose when to leave, where to stop and how long for. Taif can be part of the day rather than a separate trip.",
            ar: "وأنت تختار موعد المغادرة وموضع التوقف ومدته. ويمكن أن يكون الطائف جزءًا من اليوم لا رحلة منفصلة.",
          },
          {
            en: "It is still a full day of driving, and nothing on this page pretends otherwise.",
            ar: "ويبقى يومًا كاملًا من القيادة، ولا شيء في هذه الصفحة يدّعي غير ذلك.",
          },
        ],
      },
      {
        title: { en: "By air, via Jeddah", ar: "جوًّا، عبر جدة" },
        headline: { en: "Much shorter", ar: "أقصر بكثير" },
        points: [
          {
            en: "Riyadh to Jeddah is a short domestic hop, and King Abdulaziz airport is the usual gateway for Makkah.",
            ar: "الرياض إلى جدة رحلة داخلية قصيرة، ومطار الملك عبدالعزيز هو البوابة المعتادة إلى مكة المكرمة.",
          },
          {
            en: "From the airport you have two onward options: the road to Makkah, or the Haramain train from the station inside the airport itself.",
            ar: "ومن المطار أمامك خياران للمتابعة: الطريق البري إلى مكة، أو قطار الحرمين من المحطة داخل المطار نفسه.",
          },
          {
            en: "Usually the better answer for one or two people travelling light.",
            ar: "وهو عادةً الجواب الأفضل لشخص أو شخصين بأمتعة خفيفة.",
          },
          {
            en: "Adds two handovers to the day, and airline baggage rules apply. We quote the road leg at the Jeddah end if you want it.",
            ar: "لكنه يضيف تبديلين إلى يومك، وتسري قواعد أمتعة شركة الطيران. ونسعّر الجزء البري في طرف جدة إن أردته.",
          },
        ],
      },
    ],
    footnote: {
      en: "We publish no flight times, fares or schedules — we sell no air tickets and the airlines are the live answer. Compare them yourself, then tell us which leg you want from us.",
      ar: "ولا ننشر مواعيد رحلات جوية ولا أسعارها ولا جداولها — فنحن لا نبيع تذاكر طيران وشركات الطيران هي الجواب الحيّ. قارن بنفسك ثم أخبرنا بالجزء الذي تريده منا.",
    },
  },

  practical: {
    heading: { en: "Practical notes", ar: "ملاحظات عملية" },
    items: [
      {
        heading: { en: "Stops are yours to call", ar: "التوقفات قرارك" },
        paragraphs: [
          {
            en: "We do not publish a list of recommended stops, because what is open on the day and what suits a family with small children are both things we would be guessing at from a desk. Tell us roughly how often you want to break and the driver works to that.",
            ar: "لا ننشر قائمة توقفات موصى بها، لأن ما هو مفتوح في ذلك اليوم وما يناسب عائلة بأطفال صغار أمران نخمّنهما من المكتب. أخبرنا تقريبًا كم مرة تريد الاستراحة ويعمل السائق على ذلك.",
          },
        ],
      },
      {
        heading: { en: "One driver or two", ar: "سائق واحد أم اثنان" },
        paragraphs: [
          {
            en: "Nine to ten hours is a long shift. Whether your journey is covered by one driver or two is set when it is arranged and stated in the quotation, so it is not a question you discover on the road. Ask if it matters to you.",
            ar: "تسع إلى عشر ساعات مناوبة طويلة. وتحديد ما إن كان يغطي رحلتك سائق واحد أم اثنان يتم عند الترتيب ويُذكر في عرض السعر، فلا يكون سؤالًا تكتشفه على الطريق. اسأل إن كان الأمر يعنيك.",
          },
        ],
      },
      {
        heading: { en: "Season changes the day", ar: "الموسم يغيّر اليوم" },
        paragraphs: [
          {
            en: "Ramadan and the weeks around Hajj change the traffic, the checkpoints and how long the last few kilometres into Makkah take. Give us your date early and we will tell you what we know about it rather than quoting a normal day.",
            ar: "رمضان والأسابيع المحيطة بالحج تغيّر الحركة وزمن نقاط التفتيش والمدة التي تستغرقها الكيلومترات الأخيرة إلى داخل مكة. فأعطنا تاريخك مبكرًا ونخبرك بما نعرفه عنه بدل تسعير يوم اعتيادي.",
          },
        ],
      },
    ],
  },

  booking: {
    heading: { en: "What we need to quote it", ar: "ما نحتاجه للتسعير" },
    paragraphs: [
      {
        en: "The full pickup address in Riyadh, the hotel name and address in Makkah, the date, the departure time you want, how many passengers and how many suitcases. Tell us if Taif is part of the plan and whether you want a return. Sending an enquiry does not confirm a booking and does not hold a vehicle for your date.",
        ar: "عنوان الانطلاق الكامل في الرياض، واسم الفندق وعنوانه في مكة المكرمة، والتاريخ، وموعد المغادرة الذي تريده، وعدد الركاب وعدد الحقائب. وأخبرنا إن كان الطائف ضمن الخطة وإن كنت تريد رحلة عودة. وإرسال الطلب لا يؤكد حجزًا ولا يحجز مركبة لتاريخك.",
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
        heading: { en: "Makkah to Madinah", ar: "من مكة إلى المدينة" },
        paragraphs: [
          {
            en: "The journey most people make next, approximately 440–450 km north. It has a page of its own covering both directions.",
            ar: "الرحلة التي يقوم بها معظم الناس بعد ذلك، نحو 440–450 كم شمالًا. ولها صفحة خاصة تغطي الاتجاهين.",
          },
        ],
      },
      {
        heading: { en: "Back to Jeddah", ar: "العودة إلى جدة" },
        paragraphs: [
          {
            en: "If you are flying home from King Abdulaziz, the departure run from Makkah is 80 to 100 km and is quoted the same way.",
            ar: "إن كنت ستسافر من مطار الملك عبدالعزيز، فرحلة المغادرة من مكة المكرمة بين 80 و100 كم وتُسعَّر بالطريقة نفسها.",
          },
        ],
      },
    ],
  },

  faqHeading: { en: "Common questions", ar: "الأسئلة الشائعة" },

  faqs: [
    {
      question: {
        en: "How long does the drive from Riyadh to Makkah really take?",
        ar: "كم تستغرق الرحلة من الرياض إلى مكة فعلًا؟",
      },
      answer: {
        en: "Nine to ten hours of moving time for roughly 870 km. A realistic door-to-door day is longer once meals, prayers, fuel and the slower approach into Makkah are counted. These are estimates from published route data, not a guaranteed arrival time.",
        ar: "تسع إلى عشر ساعات سير لنحو 870 كم. واليوم الواقعي من الباب إلى الباب أطول بعد حساب الطعام والصلاة والوقود والاقتراب الأبطأ من مكة. وهذه تقديرات من بيانات مسارات منشورة، لا وقت وصول مضمون.",
      },
    },
    {
      question: {
        en: "Why do published distances disagree — 870 km or 950 km?",
        ar: "لماذا تتعارض المسافات المنشورة — 870 كم أم 950 كم؟",
      },
      answer: {
        en: "Because they measure between different points. A figure taken from the edge of one city to the edge of the other is shorter than one taken between two central addresses, and some include the detour through Taif rather than the direct line past as-Sayl. We publish the lower figure with the spread stated, and your quotation is built on your actual addresses.",
        ar: "لأنها تقيس بين نقاط مختلفة. فالرقم المأخوذ من طرف مدينة إلى طرف الأخرى أقصر من المأخوذ بين عنوانين مركزيين، وبعضها يشمل الانعطاف عبر الطائف لا الخط المباشر عند السيل. وننشر الرقم الأدنى مع ذكر الفارق، ويُبنى عرض سعرك على عنوانيك الفعليين.",
      },
    },
    {
      question: {
        en: "Should I drive or fly?",
        ar: "هل أسافر برًّا أم جوًّا؟",
      },
      answer: {
        en: "Fly, for most people travelling as one or two with normal luggage — it is a short hop to Jeddah and the Haramain train leaves from inside that airport. Drive if you are a family or a group, if you have Umrah luggage, if you want Taif in the same day, or if you would rather not break the journey into five parts. We arrange the road journey and sell no air or rail tickets, so we have no stake in your answer.",
        ar: "جوًّا، لمعظم من يسافرون فردًا أو اثنين بأمتعة عادية — فهي رحلة قصيرة إلى جدة وقطار الحرمين ينطلق من داخل ذلك المطار. وبرًّا إن كنتم عائلة أو مجموعة، أو كانت لديكم أمتعة عمرة، أو أردتم الطائف في اليوم نفسه، أو كنتم تفضّلون ألا تُقطَّع الرحلة إلى خمسة أجزاء. ونحن نرتّب الرحلة البرية ولا نبيع تذاكر طيران ولا قطار، فلا مصلحة لنا في جوابك.",
      },
    },
    {
      question: {
        en: "Is there a train from Riyadh to Makkah?",
        ar: "هل يوجد قطار من الرياض إلى مكة؟",
      },
      answer: {
        en: "No. Riyadh's railway lines run east to the Gulf coast and north through Qassim and Hail; the Haramain line serves Makkah, Jeddah and Madinah. The two networks do not connect, and a Riyadh–Jeddah railway has been reported as planned rather than built. So the choice between Riyadh and Makkah is road or air.",
        ar: "لا. فخطوط سكة حديد الرياض تتجه شرقًا إلى ساحل الخليج وشمالًا عبر القصيم وحائل؛ وخط الحرمين يخدم مكة المكرمة وجدة والمدينة المنورة. والشبكتان غير متصلتين، وقد ورد أن سكة الرياض – جدة مخطَّطة لا منفَّذة. فالخيار بين الرياض ومكة هو البر أو الجو.",
      },
    },
    {
      question: {
        en: "Can non-Muslims travel with you to Makkah?",
        ar: "هل يمكن لغير المسلمين السفر معكم إلى مكة؟",
      },
      answer: {
        en: "No. Entry to Makkah is restricted to Muslims, and we accept journeys into the city only for passengers who may legally enter on the travel date. We can still arrange road journeys elsewhere in the region — Jeddah, Taif and the coast — and we will say which part of a plan we can and cannot carry before quoting.",
        ar: "لا. فدخول مكة المكرمة مقصور على المسلمين، ولا نقبل الرحلات إلى داخل المدينة إلا لركاب يحق لهم الدخول نظامًا في تاريخ السفر. وما زال بإمكاننا ترتيب رحلات برية في أنحاء أخرى من المنطقة — جدة والطائف والساحل — وسنوضح أي جزء من الخطة نستطيع تنفيذه وأيه لا، قبل التسعير.",
      },
    },
    {
      question: {
        en: "Can we stop at Taif on the way?",
        ar: "هل يمكننا التوقف في الطائف في الطريق؟",
      },
      answer: {
        en: "Yes, and it is the one detour that costs little, because Highway 40 already takes you to the high ground above Makkah. Say so in the enquiry and we quote the day with the stop in it. The climb from Riyadh has its own page with the elevation and the two mountain roads set out.",
        ar: "نعم، وهو الانعطاف الوحيد الذي يكلّف قليلًا، لأن الطريق 40 يأخذك أصلًا إلى المرتفعات فوق مكة. اذكر ذلك في الطلب ونسعّر اليوم متضمنًا التوقف. وللصعود من الرياض صفحة خاصة تبيّن الارتفاع وطريقَي الجبل.",
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
      routeKey: "makkah",
      label: { en: "Private transfers in Makkah", ar: "توصيل خاص في مكة المكرمة" },
      note: {
        en: "Once you arrive: the entry rules, hotel access near the Haram, and journeys on from the holy city.",
        ar: "بعد الوصول: شروط الدخول، ودخول الفنادق قرب الحرم، والسفر من المدينة المقدسة.",
      },
    },
    {
      routeKey: "riyadhToTaif",
      label: { en: "Riyadh to Taif", ar: "الرياض إلى الطائف" },
      note: {
        en: "The same road for most of the way, with the climb from ~600 m to ~1,800 m drawn to scale.",
        ar: "الطريق نفسه في معظمه، والصعود من نحو 600 م إلى نحو 1,800 م مرسومًا بمقياس.",
      },
    },
    {
      routeKey: "makkahToMadinah",
      label: { en: "Makkah to Madinah", ar: "من مكة إلى المدينة" },
      note: {
        en: "The pilgrimage corridor north, approximately 440–450 km, in both directions.",
        ar: "ممر الحج والعمرة شمالًا، نحو 440–450 كم، في الاتجاهين.",
      },
    },
    {
      routeKey: "jeddahToMakkah",
      label: { en: "Jeddah to Makkah", ar: "من جدة إلى مكة" },
      note: {
        en: "The short way in if you fly: 80 to 100 km from King Abdulaziz airport.",
        ar: "الطريق القصير إن سافرت جوًّا: 80 إلى 100 كم من مطار الملك عبدالعزيز.",
      },
    },
    {
      routeKey: "riyadhToJeddah",
      label: { en: "Riyadh to Jeddah", ar: "الرياض إلى جدة" },
      note: {
        en: "The same crossing without the last leg south — about 950 km, with the stages and the driver-hours answer.",
        ar: "العبور نفسه دون الجزء الأخير جنوبًا — نحو 950 كم، ومعه المراحل وجواب ساعات السائق.",
      },
    },
  ],

  cta: {
    eyebrow: { en: "A day, or a short flight", ar: "يوم كامل أو رحلة قصيرة" },
    heading: {
      en: "Tell us the plan and we will tell you honestly",
      ar: "أخبرنا بالخطة ونصارحك بالجواب",
    },
    body: {
      en: "The addresses at both ends, the date, the departure time you want and how many of you. We reply with a written price — and if we think you should fly, we will say that too.",
      ar: "العنوانان في الطرفين، والتاريخ، وموعد المغادرة الذي تريده، وعددكم. ونرد بسعر مكتوب — وإن رأينا أن الأفضل لك الطيران فسنقول ذلك أيضًا.",
    },
    button: { en: "Request a quotation", ar: "اطلب عرض سعر" },
  },
};
