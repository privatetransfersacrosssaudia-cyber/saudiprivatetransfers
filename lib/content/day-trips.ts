import type { Bilingual } from "@/lib/i18n/config";
import type { SiteImageKey } from "@/lib/site-images";
import type { ClusterFaq, RelatedLink } from "@/lib/content/riyadh/types";

/**
 * Private day trips across Saudi Arabia.
 *
 * ## The idea the page is built on
 *
 * Every other service page in this project answers "where are you going?".
 * A day trip is the one service where that is the wrong question, because
 * the customer is not going anywhere in particular — they are coming back.
 * **A day trip is a loop**, and the thing that actually decides whether it
 * works is how far out the loop reaches, because the road time comes out of
 * the same day as the time at the destination.
 *
 * So the page is organised by **reach**, not by region or by attraction.
 * Every destination sits in one of three bands relative to the starting
 * city — close to it, out of town, or far out — and the planner's summary
 * reads the *furthest band the customer has touched* and tells them what
 * shape of day that implies. Pick three places in one band and it is a
 * relaxed day; reach into the far band and it is realistically one
 * destination.
 *
 * That is an honest instrument. We do not know how long a party will linger
 * anywhere, and we publish no journey times, so a duration would be invented.
 * But "the further out you go, the less of the day is left for being there"
 * is true of all travel and needs no figure to be useful.
 *
 * ## What is deliberately withheld
 *
 * No hours, no prices, no waiting allowance, no ticket or guide inclusion,
 * no claim that any destination is open, accessible or doable as a same-day
 * return. The driver staying through an agreed outing is the one operational
 * commitment the owner has confirmed, so it is stated plainly and nothing is
 * built on top of it.
 *
 * Several places customers ask for by name — the Red Sand Dunes, Half Moon
 * Bay, Tarout, the Qiddiya attractions — have **no photograph in this
 * project**. They are named in prose where they genuinely help, and given no
 * card, rather than illustrated with a stock desert or beach that is not the
 * place. A misattributed photograph is a lie that happens to be pretty.
 */

export type ReachBand = "near" | "out" | "far";

export type DayTripStop = {
  id: string;
  name: Bilingual<string>;
  note: Bilingual<string>;
  band: ReachBand;
};

export type StartingCity = {
  id: string;
  /** The city as a traveller names it when asked where they are staying. */
  name: Bilingual<string>;
  /** What the pickup field is seeded with when this city is chosen. */
  pickupSeed: Bilingual<string>;
  blurb: Bilingual<string>;
  stops: DayTripStop[];
};

export type LookbookCard = {
  imageKey: SiteImageKey;
  place: Bilingual<string>;
  from: Bilingual<string>;
  line: Bilingual<string>;
  /** Large cards carry the section; small ones fill around them. */
  size: "wide" | "tall" | "small";
};

export const dayTrips = {
  routeKey: "privateDayTrips" as const,
  imageKey: "svc-daytrip" as SiteImageKey,

  seo: {
    title: {
      en: "Private Day Trips in Saudi Arabia with a Driver",
      ar: "رحلات يومية خاصة في السعودية مع سائق",
    },
    description: {
      en: "Arrange a private car and driver for a planned day out in Saudi Arabia — your own destinations, agreed stops and a return to where you started. Written quotation before anything is confirmed.",
      ar: "رتّب سيارة خاصة مع سائق ليوم مخطَّط في السعودية — وجهاتك أنت، ومحطات متفق عليها، وعودة إلى حيث بدأت. عرض سعر مكتوب قبل أي تأكيد.",
    },
  },

  crumbLabel: { en: "Private day trips", ar: "الرحلات اليومية الخاصة" },

  eyebrow: { en: "Private day trips", ar: "رحلات يومية خاصة" },

  title: {
    en: "Private day trips in Saudi Arabia with a dedicated driver",
    ar: "رحلات يومية خاصة في السعودية مع سائق مخصّص",
  },

  standfirst: {
    en: "Some days go better when you are not watching the clock for the next taxi. Tell us where you want to go, and the car and driver stay with you through the outing you have agreed — the stops along the way, and the run back to where you started.",
    ar: "بعض الأيام تمضي أفضل حين لا تراقب الساعة بانتظار سيارة الأجرة التالية. أخبرنا إلى أين تريد الذهاب، وتبقى السيارة والسائق معك طوال الجولة المتفق عليها — بما في ذلك المحطات في الطريق والعودة إلى حيث انطلقت.",
  },

  primaryCta: { en: "Plan your day trip", ar: "خطّط رحلتك اليومية" },
  secondaryCta: { en: "How it works", ar: "كيف تسير الرحلة" },

  /** §7 — the distinction that stops this page cannibalising city-to-city. */
  difference: {
    heading: {
      en: "A transfer drops you off. A day trip keeps the car",
      ar: "النقل يوصلك ويمضي. أما الرحلة اليومية فتبقى السيارة معك",
    },
    lead: {
      en: "They sound similar and they are priced on completely different things, so it is worth being precise about which one you are asking for.",
      ar: "يتشابه الاثنان في الظاهر، ويُسعَّران على أساسين مختلفين تمامًا، لذا يستحق الأمر توضيح أيّهما تطلب.",
    },
    transfer: {
      label: { en: "A point-to-point transfer", ar: "نقل من نقطة إلى نقطة" },
      body: {
        en: "One pickup, one destination. The car takes you there and the job is finished when you arrive. It is the right thing to book for an airport run, a hotel change or the road between two cities.",
        ar: "استقبال واحد ووجهة واحدة. توصلك السيارة وتنتهي المهمة بوصولك. وهو الخيار الصحيح لرحلة مطار، أو انتقال بين فندقين، أو الطريق بين مدينتين.",
      },
    },
    dayTrip: {
      label: { en: "A private day trip", ar: "رحلة يومية خاصة" },
      body: {
        en: "A planned outing where the driver stays with you for the arrangement you have agreed: the places on your list, the stops in between, and the return journey where that has been arranged. You are not re-negotiating a ride at every stop.",
        ar: "جولة مخطَّطة يبقى فيها السائق معك ضمن الترتيب المتفق عليه: المواضع التي اخترتها، والمحطات بينها، ورحلة العودة حيث اتُّفق عليها. ولست مضطرًا للبحث عن سيارة جديدة عند كل محطة.",
      },
    },
    note: {
      en: "What the day covers — how long, how many stops, where it ends — is settled in writing before anything is confirmed. We do not publish a fixed number of hours here, because the honest answer depends on the list you send us.",
      ar: "أما ما يشمله اليوم — مدته، وعدد محطاته، وأين ينتهي — فيُحسم كتابةً قبل أي تأكيد. ولا ننشر هنا عدد ساعات ثابتًا، لأن الجواب الصادق يعتمد على القائمة التي ترسلها إلينا.",
    },
  },

  /** The concept, stated plainly before the planner puts it to work. */
  loop: {
    heading: {
      en: "A day trip is a loop, and the road is part of it",
      ar: "الرحلة اليومية دائرة، والطريق جزء منها",
    },
    lead: {
      en: "This is the one thing worth getting right before you pick anywhere. The drive out and the drive back come out of the same day as the time you actually spend at the places. So the question is not how many destinations you can name — it is how far out the furthest one sits.",
      ar: "هذه هي النقطة التي يُستحسن ضبطها قبل اختيار أي موضع. فالذهاب والعودة يُقتطعان من اليوم نفسه الذي ستقضيه في المواضع. والسؤال ليس كم وجهة تستطيع تسميتها، بل كم يبعد أبعدها.",
    },
    bands: [
      {
        id: "near",
        label: { en: "Close to the city", ar: "قريب من المدينة" },
        body: {
          en: "Short runs out and back. You can put two or three together and still have the day feel unhurried.",
          ar: "تنقلات قصيرة ذهابًا وإيابًا. يمكنك ضمّ موضعين أو ثلاثة ويبقى اليوم غير متعجّل.",
        },
      },
      {
        id: "out",
        label: { en: "Out of town", ar: "خارج المدينة" },
        body: {
          en: "The drive becomes a real part of the day rather than a detail. One of these, perhaps with something small on the way, is a full and comfortable outing.",
          ar: "يصبح الطريق جزءًا حقيقيًا من اليوم لا تفصيلًا جانبيًا. وموضع واحد منها، وربما محطة صغيرة في الطريق، يصنع جولة كاملة ومريحة.",
        },
      },
      {
        id: "far",
        label: { en: "Far out", ar: "بعيد" },
        body: {
          en: "Plan it as the day's one destination. Some of these also raise a fair question about whether a same-day return is the right idea at all — say so in your enquiry and we will give you a straight answer rather than a hopeful one.",
          ar: "خطّط له بوصفه وجهة اليوم الوحيدة. وبعضها يطرح سؤالًا وجيهًا عمّا إذا كانت العودة في اليوم نفسه فكرة صائبة أصلًا — اذكر ذلك في طلبك ونعطيك جوابًا صريحًا لا جوابًا متفائلًا.",
        },
      },
    ],
  },

  /** §10 + §13 — the starting-city discovery section *is* the planner. */
  planner: {
    heading: { en: "Shape your day", ar: "ارسم شكل يومك" },
    lead: {
      en: "Start with where you are staying. The places below are grouped by how far they sit from it, and the summary tells you what shape of day your list adds up to. Nothing here is a booking, and nothing here is a price — it is a way of arriving at a realistic enquiry.",
      ar: "ابدأ من حيث تقيم. المواضع أدناه مرتّبة بحسب بُعدها عنك، ويخبرك الملخّص بالشكل الذي تؤول إليه قائمتك. لا شيء هنا حجز، ولا شيء هنا سعر — إنما وسيلة للوصول إلى طلب واقعي.",
    },
    cityLabel: { en: "Where are you staying?", ar: "أين تقيم؟" },
    pickupLabel: { en: "Pickup address", ar: "عنوان الاستقبال" },
    pickupPlaceholder: {
      en: "Hotel name or address",
      ar: "اسم الفندق أو العنوان",
    },
    passengersLabel: { en: "How many travelling?", ar: "كم عدد المسافرين؟" },
    passengersAny: { en: "Not sure yet", ar: "غير محدد بعد" },
    bandLabels: {
      near: { en: "Close to the city", ar: "قريب من المدينة" },
      out: { en: "Out of town", ar: "خارج المدينة" },
      far: { en: "Far out", ar: "بعيد" },
    },
    summaryLabel: { en: "Your day so far", ar: "يومك حتى الآن" },
    emptyState: {
      en: "Nothing chosen yet. Tick a place or two above, or go straight to the form and describe the day you have in mind.",
      ar: "لم تختر شيئًا بعد. أشّر على موضع أو موضعين أعلاه، أو اذهب مباشرة إلى النموذج واشرح اليوم الذي تتصوّره.",
    },
    shapes: {
      near: {
        en: "A relaxed day close to base. There is room here to linger, and to add something else if you want to.",
        ar: "يوم هادئ قريب من مقرّك. هنا متّسع للمكوث، ولإضافة موضع آخر إن أردت.",
      },
      out: {
        en: "A full day out. The drive is a real part of this one, so it is worth starting earlier than you think you need to.",
        ar: "يوم كامل خارج المدينة. الطريق جزء حقيقي منه، لذا يُستحسن البدء أبكر مما تظن.",
      },
      far: {
        en: "This reaches a long way out. Treat it as the day's one destination — and if the distance makes a same-day return doubtful, we will tell you that in the quotation rather than let you find out on the road.",
        ar: "هذه تمتد بعيدًا. اعتبرها وجهة اليوم الوحيدة — وإن جعلت المسافة العودة في اليوم نفسه مشكوكًا فيها، سنقول لك ذلك في عرض السعر بدل أن تكتشفه على الطريق.",
      },
    },
    spread: {
      en: "You have picked across more than one distance band. That can work, but it is the usual reason a day runs long — worth telling us which of these matters most to you.",
      ar: "اخترت من أكثر من نطاق مسافة. قد ينجح ذلك، لكنه السبب المعتاد في طول اليوم — ويستحسن أن تخبرنا أيّها يهمّك أكثر.",
    },
    carryOver: {
      en: "The date, how long you want the driver for, luggage, any accessibility needs and where the day should end go in the message box on the form — those cannot be carried across automatically.",
      ar: "أما التاريخ، والمدة التي تريد السائق خلالها، والأمتعة، وأي احتياجات حركة، والمكان الذي ينتهي فيه اليوم، فتُكتب في خانة الرسالة بالنموذج — فهذه لا تُنقل تلقائيًا.",
    },
    cta: { en: "Send your day-trip enquiry", ar: "أرسل طلب رحلتك اليومية" },
  },

  cities: [
    {
      id: "riyadh",
      name: { en: "Riyadh", ar: "الرياض" },
      pickupSeed: { en: "Hotel in Riyadh", ar: "فندق في الرياض" },
      blurb: {
        en: "The widest choice of day trips in the country, mostly because the escarpment and the old towns of Najd are all within reach of one city.",
        ar: "أوسع خيارات الرحلات اليومية في البلاد، أساسًا لأن حافة طويق وبلدات نجد القديمة كلها في متناول مدينة واحدة.",
      },
      stops: [
        {
          id: "diriyah",
          name: { en: "Diriyah and At-Turaif", ar: "الدرعية والطريف" },
          note: {
            en: "The mudbrick quarter on the edge of the city, and the usual first answer when someone asks what to see near Riyadh.",
            ar: "حي الطين على أطراف المدينة، وهو الجواب الأول عادةً حين يُسأل عمّا يُزار قرب الرياض.",
          },
          band: "near",
        },
        {
          id: "wadi-hanifah",
          name: { en: "Wadi Hanifah", ar: "وادي حنيفة" },
          note: {
            en: "The valley running along the western side of the city, easy to pair with Diriyah because they sit on the same side of town.",
            ar: "الوادي الممتد على الجانب الغربي من المدينة، ويسهل ضمّه إلى الدرعية لأنهما في الجهة نفسها.",
          },
          band: "near",
        },
        {
          id: "al-kharj",
          name: { en: "Al Kharj", ar: "الخرج" },
          note: {
            en: "South-east of the capital, with the old palace and the water pits that the town is known for.",
            ar: "جنوب شرق العاصمة، وفيها القصر القديم والخُدود المائية التي اشتهرت بها البلدة.",
          },
          band: "out",
        },
        {
          id: "red-sands",
          name: { en: "The Red Sands", ar: "الرمال الحمراء" },
          note: {
            en: "The dune field on the Mecca road west of the city. Often taken late in the day, and worth saying so in your enquiry if that is the plan.",
            ar: "كثبان الرمل على طريق مكة غرب المدينة. تُزار غالبًا في آخر النهار، ويستحسن ذكر ذلك في طلبك إن كان هذا هو المراد.",
          },
          band: "out",
        },
        {
          id: "edge-of-the-world",
          name: { en: "The Edge of the World", ar: "حافة العالم" },
          note: {
            en: "The Tuwaiq escarpment north-west of Riyadh. The approach is unpaved for the last stretch, so the vehicle and the route both need checking before this one is agreed.",
            ar: "حافة طويق شمال غرب الرياض. الطريق غير معبّد في آخره، لذا يحتاج اختيار المركبة والمسار إلى تدقيق قبل الاتفاق عليها.",
          },
          band: "far",
        },
        {
          id: "ushaiger",
          name: { en: "Ushaiger Heritage Village", ar: "قرية أشيقر التراثية" },
          note: {
            en: "A restored Najdi village north-west of the city, usually taken as the day's one destination rather than an addition to it.",
            ar: "قرية نجدية مرمّمة شمال غرب المدينة، وتُؤخذ عادةً وجهةً وحيدة لليوم لا إضافةً إليه.",
          },
          band: "far",
        },
      ],
    },
    {
      id: "jeddah",
      name: { en: "Jeddah", ar: "جدة" },
      pickupSeed: { en: "Hotel in Jeddah", ar: "فندق في جدة" },
      blurb: {
        en: "Two very different directions from one city: the old town and the water on your doorstep, and the mountain road up to Taif behind you.",
        ar: "اتجاهان مختلفان تمامًا من مدينة واحدة: البلدة القديمة والبحر أمام بابك، وطريق الجبل صاعدًا إلى الطائف خلفك.",
      },
      stops: [
        {
          id: "al-balad",
          name: { en: "Historic Jeddah (Al-Balad)", ar: "جدة التاريخية (البلد)" },
          note: {
            en: "The old merchant quarter with its coral-stone houses and shuttered balconies, in the middle of the city.",
            ar: "حي التجار القديم ببيوته الحجرية ورواشينه الخشبية، في قلب المدينة.",
          },
          band: "near",
        },
        {
          id: "corniche",
          name: { en: "The Corniche", ar: "الكورنيش" },
          note: {
            en: "The waterfront stretch along the Red Sea, easy to add to the end of a day in the old town.",
            ar: "امتداد الواجهة البحرية على البحر الأحمر، ويسهل إضافته إلى آخر يوم في البلدة القديمة.",
          },
          band: "near",
        },
        {
          id: "kaec",
          name: { en: "King Abdullah Economic City", ar: "مدينة الملك عبدالله الاقتصادية" },
          note: {
            en: "North up the coast at Rabigh, with its own waterfront. A straightforward run on good road.",
            ar: "شمالًا على الساحل عند رابغ، ولها واجهتها البحرية. طريق مباشر ومعبّد.",
          },
          band: "out",
        },
        {
          id: "taif",
          name: { en: "Taif and Al Hada", ar: "الطائف والهدا" },
          note: {
            en: "Up the escarpment road behind the city. The climb itself is much of the reason people go.",
            ar: "صعودًا في طريق الجبل خلف المدينة. والصعود نفسه جزء كبير من سبب الذهاب.",
          },
          band: "far",
        },
        {
          id: "al-shafa",
          name: { en: "Al Shafa", ar: "الشفا" },
          note: {
            en: "The highland above Taif, usually taken together with Al Hada rather than instead of it.",
            ar: "المرتفع فوق الطائف، ويُؤخذ عادةً مع الهدا لا بديلًا عنه.",
          },
          band: "far",
        },
      ],
    },
    {
      id: "eastern",
      name: { en: "The Eastern Province", ar: "المنطقة الشرقية" },
      pickupSeed: { en: "Hotel in Dammam or Al Khobar", ar: "فندق في الدمام أو الخبر" },
      blurb: {
        en: "Flat, fast roads and short distances between the cities, which makes two stops in a day unusually comfortable here.",
        ar: "طرق مستوية سريعة ومسافات قصيرة بين المدن، ما يجعل محطتين في اليوم مريحتين على نحو غير معتاد هنا.",
      },
      stops: [
        {
          id: "khobar-corniche",
          name: { en: "Al Khobar Corniche", ar: "كورنيش الخبر" },
          note: {
            en: "The waterfront along the gulf, in the middle of the built-up area.",
            ar: "الواجهة البحرية على الخليج، في وسط النطاق العمراني.",
          },
          band: "near",
        },
        {
          id: "ithra",
          name: { en: "Ithra, Dhahran", ar: "إثراء، الظهران" },
          note: {
            en: "The cultural centre at Dhahran. Check its own opening arrangements for your date.",
            ar: "المركز الثقافي في الظهران. تحقّق من مواعيده الخاصة في تاريخك.",
          },
          band: "near",
        },
        {
          id: "jubail",
          name: { en: "Jubail", ar: "الجبيل" },
          note: {
            en: "North along the coast, with the old town's minaret and the marina.",
            ar: "شمالًا على الساحل، وفيها مئذنة البلدة القديمة والمرسى.",
          },
          band: "out",
        },
        {
          id: "al-ahsa",
          name: { en: "Al Ahsa", ar: "الأحساء" },
          note: {
            en: "The oasis inland — Qasr Ibrahim and the Qaysariyah souq — and the largest single thing to do from this side of the country.",
            ar: "الواحة في الداخل — قصر إبراهيم وسوق القيصرية — وأكبر ما يُقصد من هذه الجهة من البلاد.",
          },
          band: "out",
        },
        {
          id: "half-moon",
          name: { en: "Half Moon Bay", ar: "خليج نصف القمر" },
          note: {
            en: "The bay south of Dhahran, often paired with a run along the corniche.",
            ar: "الخليج جنوب الظهران، ويُضمّ غالبًا إلى جولة على الكورنيش.",
          },
          band: "out",
        },
      ],
    },
    {
      id: "madinah",
      name: { en: "Madinah", ar: "المدينة المنورة" },
      pickupSeed: { en: "Hotel in Madinah", ar: "فندق في المدينة المنورة" },
      blurb: {
        en: "Worth separating two different days here: the religious sites around the city have their own page, and what is below is the countryside and the long road north.",
        ar: "يُستحسن الفصل بين يومين مختلفين هنا: فالمزارات حول المدينة لها صفحتها الخاصة، وما يلي هو الريف والطريق الطويل شمالًا.",
      },
      stops: [
        {
          id: "madinah-countryside",
          name: { en: "The palm country outside the city", ar: "مزارع النخيل خارج المدينة" },
          note: {
            en: "The farms and date groves on the city's edge, an easy half-day in a car.",
            ar: "المزارع وبساتين النخيل على أطراف المدينة، نصف يوم يسير بالسيارة.",
          },
          band: "near",
        },
        {
          id: "alula",
          name: { en: "AlUla", ar: "العُلا" },
          note: {
            en: "Hegra and the valley, a long way north. The distance is the whole planning question here, and it is a fair one to raise in your enquiry rather than assume either way.",
            ar: "الحِجر والوادي، بعيدًا في الشمال. والمسافة هي كل مسألة التخطيط هنا، ومن الوجيه طرحها في طلبك بدل افتراض جواب في أي اتجاه.",
          },
          band: "far",
        },
      ],
    },
    {
      id: "taif",
      name: { en: "Taif", ar: "الطائف" },
      pickupSeed: { en: "Hotel in Taif", ar: "فندق في الطائف" },
      blurb: {
        en: "If you are already up the mountain, the good days are short ones along the escarpment rather than long drives.",
        ar: "إن كنت أصلًا في أعلى الجبل، فالأيام الجيدة قصيرة على امتداد الحافة لا رحلات طويلة.",
      },
      stops: [
        {
          id: "al-hada",
          name: { en: "Al Hada", ar: "الهدا" },
          note: {
            en: "The escarpment road and the viewpoints along it, just outside the city.",
            ar: "طريق الحافة والمطلّات على امتداده، قرب المدينة مباشرة.",
          },
          band: "near",
        },
        {
          id: "shafa-highland",
          name: { en: "Al Shafa", ar: "الشفا" },
          note: {
            en: "The higher ground south of the city, with the orchards and cooler air.",
            ar: "المرتفع جنوب المدينة، وفيه البساتين والهواء الأبرد.",
          },
          band: "near",
        },
      ],
    },
    {
      id: "abha",
      name: { en: "Abha", ar: "أبها" },
      pickupSeed: { en: "Hotel in Abha", ar: "فندق في أبها" },
      blurb: {
        en: "Mountain country, where the distances look short on a map and take longer on the road than people expect.",
        ar: "بلاد جبلية، تبدو مسافاتها قصيرة على الخريطة وتطول على الطريق أكثر مما يتوقّع الناس.",
      },
      stops: [
        {
          id: "abha-viewpoints",
          name: { en: "The Abha viewpoints", ar: "مطلّات أبها" },
          note: {
            en: "The high ground around the city, including the cable car's own arrangements on your date.",
            ar: "المرتفعات حول المدينة، بما فيها ترتيبات التلفريك الخاصة في تاريخك.",
          },
          band: "near",
        },
        {
          id: "khamis",
          name: { en: "Khamis Mushait", ar: "خميس مشيط" },
          note: {
            en: "The neighbouring city east of Abha, a short run across the plateau.",
            ar: "المدينة المجاورة شرق أبها، مسافة قصيرة عبر الهضبة.",
          },
          band: "near",
        },
        {
          id: "soudah",
          name: { en: "Al Soudah", ar: "السودة" },
          note: {
            en: "The highest ground in the country, up the mountain road from the city.",
            ar: "أعلى أرض في البلاد، صعودًا في طريق الجبل من المدينة.",
          },
          band: "out",
        },
      ],
    },
  ] satisfies StartingCity[],

  /** §9 — the lookbook. Only places this project actually has a photograph of. */
  lookbook: {
    heading: {
      en: "Some of the places people ask for",
      ar: "بعض المواضع التي يطلبها الناس",
    },
    lead: {
      en: "A sense of the kind of day that is possible, rather than a catalogue. None of these is a fixed product, and what is practical on your date is settled in the quotation.",
      ar: "إشارة إلى نوع اليوم الممكن، لا فهرس وجهات. فليس أيٌّ منها منتجًا ثابتًا، وما هو عملي في تاريخك يُحسم في عرض السعر.",
    },
    cards: [
      {
        imageKey: "svc-daytrip",
        place: { en: "At-Turaif, Diriyah", ar: "الطريف، الدرعية" },
        from: { en: "From Riyadh", ar: "من الرياض" },
        line: {
          en: "Mudbrick walls on the edge of the capital, and the shortest good day out in the country.",
          ar: "جدران من الطين على أطراف العاصمة، وأقصر يوم جيد خارج المدينة في البلاد.",
        },
        size: "wide",
      },
      {
        imageKey: "guide-edge",
        place: { en: "The Tuwaiq escarpment", ar: "حافة طويق" },
        from: { en: "From Riyadh", ar: "من الرياض" },
        line: {
          en: "The Edge of the World. The last stretch is unpaved, which is why this one is planned rather than added.",
          ar: "حافة العالم. آخر الطريق غير معبّد، ولهذا تُخطَّط هذه مسبقًا ولا تُضاف ارتجالًا.",
        },
        size: "tall",
      },
      {
        imageKey: "shaqra-ushaiqer",
        place: { en: "Ushaiger", ar: "أشيقر" },
        from: { en: "From Riyadh", ar: "من الرياض" },
        line: {
          en: "A restored Najdi village of narrow shaded lanes.",
          ar: "قرية نجدية مرمّمة بأزقة ضيقة مظلّلة.",
        },
        size: "small",
      },
      {
        imageKey: "jeddah-albalad",
        place: { en: "Al-Balad, Jeddah", ar: "البلد، جدة" },
        from: { en: "From Jeddah", ar: "من جدة" },
        line: {
          en: "Coral-stone houses and wooden balconies in the old merchant quarter.",
          ar: "بيوت من الحجر المنقبي ورواشين خشبية في حي التجار القديم.",
        },
        size: "small",
      },
      {
        imageKey: "alahsa-qaysariyah",
        place: { en: "Qaysariyah Souq, Al Ahsa", ar: "سوق القيصرية، الأحساء" },
        from: { en: "From the Eastern Province", ar: "من المنطقة الشرقية" },
        line: {
          en: "The covered market in the oasis, inland from the gulf cities.",
          ar: "السوق المسقوف في الواحة، في الداخل بعيدًا عن مدن الخليج.",
        },
        size: "small",
      },
      {
        imageKey: "abha-cable-car",
        place: { en: "The Abha highlands", ar: "مرتفعات أبها" },
        from: { en: "From Abha", ar: "من أبها" },
        line: {
          en: "Cloud-level country in the south-west, where short map distances take longer than they look.",
          ar: "بلاد في مستوى السحاب جنوب غربًا، تطول فيها المسافات القصيرة على الخريطة أكثر مما تبدو.",
        },
        size: "tall",
      },
      {
        imageKey: "alula-hegra",
        place: { en: "Hegra, AlUla", ar: "الحِجر، العُلا" },
        from: { en: "From Madinah", ar: "من المدينة المنورة" },
        line: {
          en: "Carved tombs in open desert. Far enough north that the distance is the first thing to discuss.",
          ar: "مدافن منحوتة في صحراء مفتوحة. بعيدة شمالًا إلى حد تصبح معه المسافة أول ما يُناقَش.",
        },
        size: "wide",
      },
      {
        imageKey: "taif-al-shafa",
        place: { en: "Al Shafa, above Taif", ar: "الشفا، فوق الطائف" },
        from: { en: "From Jeddah or Taif", ar: "من جدة أو الطائف" },
        line: {
          en: "The escarpment road climbs out of the heat into orchard country.",
          ar: "طريق الحافة يصعد من الحرّ إلى بلاد البساتين.",
        },
        size: "small",
      },
      {
        imageKey: "khobar-corniche",
        place: { en: "Al Khobar Corniche", ar: "كورنيش الخبر" },
        from: { en: "From the Eastern Province", ar: "من المنطقة الشرقية" },
        line: {
          en: "The gulf shore, flat and fast to reach from any of the three cities.",
          ar: "شاطئ الخليج، مستوٍ وسريع الوصول من أيٍّ من المدن الثلاث.",
        },
        size: "small",
      },
      {
        imageKey: "jeddah-corniche",
        place: { en: "The Jeddah Corniche", ar: "كورنيش جدة" },
        from: { en: "From Jeddah", ar: "من جدة" },
        line: {
          en: "The Red Sea waterfront, usually the easy end of a day in the old town.",
          ar: "واجهة البحر الأحمر، وغالبًا الختام اليسير ليوم في البلدة القديمة.",
        },
        size: "small",
      },
    ] satisfies LookbookCard[],
    gap: {
      en: "Some places people ask for — the Qiddiya attractions, Tarout, and others — are not pictured here simply because we do not hold an honest photograph of them. They can still go in your enquiry.",
      ar: "وبعض المواضع التي يسأل عنها الناس — معالم القدية، وتاروت، وغيرها — غير مصوّرة هنا لسبب واحد: أننا لا نملك صورة صادقة لها. ولا يمنع ذلك إدراجها في طلبك.",
    },
  },

  /** §8 — six kinds of outing, as prose rather than six identical cards. */
  kinds: {
    heading: { en: "Six kinds of day out", ar: "ستة أنواع من أيام الخارج" },
    lead: {
      en: "Most enquiries land in one of these. Naming which one you are after tells us more than a list of places does.",
      ar: "معظم الطلبات تقع في أحد هذه الأنواع. وتسمية ما تريده منها تقول لنا أكثر مما تقوله قائمة مواضع.",
    },
    items: [
      {
        label: { en: "Heritage and culture", ar: "التراث والثقافة" },
        body: {
          en: "Old towns, mudbrick quarters, museums and restored districts. Diriyah, Al-Balad and Ushaiger are the ones asked for most.",
          ar: "بلدات قديمة، وأحياء من الطين، ومتاحف، وأحياء مرمّمة. والدرعية والبلد وأشيقر أكثرها طلبًا.",
        },
      },
      {
        label: { en: "Desert and nature", ar: "الصحراء والطبيعة" },
        body: {
          en: "Dune country and escarpment viewpoints. These are the outings where the vehicle and the route matter most, because some approaches leave the paved road.",
          ar: "بلاد الكثبان ومطلّات الحافة. وهذه أكثر الجولات تعلّقًا باختيار المركبة والمسار، لأن بعض الطرق إليها يغادر الإسفلت.",
        },
      },
      {
        label: { en: "Mountain and highland", ar: "الجبل والمرتفعات" },
        body: {
          en: "The escarpment roads above Taif and the high country around Abha, where the drive is much of the point.",
          ar: "طرق الحافة فوق الطائف والمرتفعات حول أبها، حيث الطريق نفسه معظم المقصود.",
        },
      },
      {
        label: { en: "Oasis and countryside", ar: "الواحة والريف" },
        body: {
          en: "Palm groves and the settlements among them, chiefly Al Ahsa and the farm country outside Madinah.",
          ar: "بساتين النخيل والقرى بينها، وأبرزها الأحساء ومزارع أطراف المدينة المنورة.",
        },
      },
      {
        label: { en: "Coastal", ar: "الساحل" },
        body: {
          en: "The Red Sea waterfront at Jeddah and the gulf shore in the east, usually short runs that pair well with something else.",
          ar: "واجهة البحر الأحمر في جدة وشاطئ الخليج في الشرق، وغالبًا تنقلات قصيرة تُضمّ جيدًا إلى غيرها.",
        },
      },
      {
        label: { en: "Family and leisure", ar: "العائلة والترفيه" },
        body: {
          en: "Outings built around what the children will actually sit through. Tell us the ages and we will plan the day around the shortest attention span in the car.",
          ar: "جولات مبنية على ما يحتمله الأطفال فعلًا. أخبرنا بالأعمار ونخطّط اليوم وفق أقصر صبر في السيارة.",
        },
      },
    ],
  },

  /** §11 */
  process: {
    heading: { en: "How the day gets arranged", ar: "كيف يُرتَّب اليوم" },
    lead: {
      en: "Four steps, and none of them is an instant booking.",
      ar: "أربع خطوات، وليست أيٌّ منها حجزًا فوريًا.",
    },
    steps: [
      {
        label: { en: "Tell us where you want to go", ar: "أخبرنا إلى أين تريد الذهاب" },
        body: {
          en: "Your starting point, the date, the places on your list and how many of you there are.",
          ar: "نقطة انطلاقك، والتاريخ، والمواضع في قائمتك، وعددكم.",
        },
      },
      {
        label: { en: "We plan the itinerary", ar: "نخطّط البرنامج" },
        body: {
          en: "We look at the route, the order, the stops you want and how long the driver is needed for, and we say so if the list is more than a day holds.",
          ar: "ننظر في المسار والترتيب والمحطات التي تريدها والمدة التي يُحتاج فيها السائق، ونقول لك إن كانت القائمة أكثر مما يسع اليوم.",
        },
      },
      {
        label: { en: "You receive a written quotation", ar: "تصلك عرض سعر مكتوب" },
        body: {
          en: "The arrangement and the price in writing, including what the day covers and where it ends.",
          ar: "الترتيب والسعر كتابةً، بما في ذلك ما يشمله اليوم وأين ينتهي.",
        },
      },
      {
        label: { en: "The booking is confirmed separately", ar: "ويُؤكَّد الحجز على حدة" },
        body: {
          en: "Once you accept it. Nothing on this website reserves a car by itself.",
          ar: "بعد قبولك له. ولا شيء في هذا الموقع يحجز سيارة من تلقاء نفسه.",
        },
      },
    ],
    driverNote: {
      en: "Through the outing you have agreed, the driver stays with you. That is the part of this service we can state plainly; the length of the day and the stops within it are what the quotation settles.",
      ar: "وطوال الجولة المتفق عليها يبقى السائق معك. هذا هو الجزء الذي نستطيع تأكيده صراحةً من هذه الخدمة؛ أما طول اليوم والمحطات داخله فما يحسمه عرض السعر.",
    },
  },

  /** §12 */
  planning: {
    heading: { en: "What makes a day work, or not", ar: "ما الذي ينجح باليوم أو يفسده" },
    lead: {
      en: "The enquiries that come back with a good quotation first time usually answer most of these without being asked.",
      ar: "الطلبات التي يعود عليها عرض سعر جيد من أول مرة تجيب عادةً عن معظم هذه النقاط دون أن تُسأل.",
    },
    factors: [
      {
        label: { en: "Where the day starts", ar: "من أين يبدأ اليوم" },
        body: {
          en: "A hotel address is more useful than a district, because the first and last legs are measured from it.",
          ar: "عنوان الفندق أنفع من اسم الحي، لأن أول الطريق وآخره يُقاسان منه.",
        },
      },
      {
        label: { en: "How far apart your places sit", ar: "كم تتباعد مواضعك" },
        body: {
          en: "Two places on the same side of a city is a different day from two on opposite sides.",
          ar: "موضعان في جهة واحدة من المدينة يصنعان يومًا غير الذي يصنعه موضعان متقابلان.",
        },
      },
      {
        label: { en: "How long you want at each", ar: "كم تريد البقاء في كل موضع" },
        body: {
          en: "This is the figure only you can supply, and it is the one that decides whether a list is realistic.",
          ar: "هذا رقم لا يملكه غيرك، وهو الذي يحدّد واقعية القائمة من عدمها.",
        },
      },
      {
        label: { en: "Whether the road is paved all the way", ar: "هل الطريق معبّد إلى آخره" },
        body: {
          en: "Some escarpment and dune approaches are not. That changes which vehicle is suitable, so it is checked before the day is agreed.",
          ar: "بعض الطرق إلى الحافات والكثبان ليست كذلك. وهذا يغيّر المركبة المناسبة، فيُتحقَّق منه قبل الاتفاق على اليوم.",
        },
      },
      {
        label: { en: "How many of you, and the bags", ar: "كم عددكم، والحقائب" },
        body: {
          en: "A day out with shopping in the boot is a different vehicle from the same party travelling light.",
          ar: "يوم خارجي مع مشتريات في الصندوق يحتاج مركبة غير التي يحتاجها العدد نفسه بأمتعة خفيفة.",
        },
      },
      {
        label: { en: "Where it should end", ar: "أين ينبغي أن ينتهي" },
        body: {
          en: "Back where you started is the usual arrangement, but it is not the only one — say so if the day should finish somewhere else.",
          ar: "العودة إلى نقطة البداية هي الترتيب المعتاد، لكنها ليست الوحيد — فاذكر إن كان اليوم ينبغي أن ينتهي في مكان آخر.",
        },
      },
    ],
    caution: {
      en: "The commonest way a day trip disappoints is a list with one place too many on it. If what you send is more than the daylight holds, we would rather say so while it can still be changed than keep quiet and let the last stop get cut short.",
      ar: "وأكثر ما يُفسد رحلة يومية قائمةٌ فيها موضع زائد. فإن كان ما ترسله أكثر مما يسعه النهار، نفضّل قول ذلك وهو ما يزال قابلًا للتعديل، بدل السكوت وترك آخر محطة تُختصر.",
    },
  },

  /** §14 */
  vehicles: {
    heading: { en: "Which vehicle for a day out", ar: "أي مركبة ليوم خارجي" },
    lead: {
      en: "The same four categories as the rest of the service. For a day trip the deciding factors are usually the party size and whether the route stays on paved road.",
      ar: "الفئات الأربع نفسها المعتمدة في بقية الخدمة. وفي الرحلة اليومية يكون الفاصل عادةً عدد الركاب وما إذا كان المسار يبقى على طريق معبّد.",
    },
    note: {
      en: "Parties larger than one vehicle's bracket are arranged as more than one car, subject to availability and confirmed with the quotation. Which category suits a particular route is confirmed the same way.",
      ar: "والمجموعات التي تتجاوز سعة مركبة واحدة تُرتَّب بأكثر من سيارة، رهنًا بالتوافر، ويُؤكَّد ذلك مع عرض السعر. وكذلك تُؤكَّد الفئة المناسبة لمسار بعينه.",
    },
  },

  /** §15 */
  agreed: {
    heading: { en: "What is settled before you confirm", ar: "ما الذي يُحسم قبل التأكيد" },
    lead: {
      en: "So that nothing about the day is a surprise on the day.",
      ar: "حتى لا يكون في اليوم مفاجأة يوم وقوعه.",
    },
    items: [
      { en: "The itinerary and the places on it", ar: "البرنامج والمواضع التي فيه" },
      { en: "How long the driver is arranged for", ar: "المدة التي رُتّب السائق لأجلها" },
      { en: "The stops along the way and the waiting between them", ar: "المحطات في الطريق والانتظار بينها" },
      { en: "Where you are collected and where the day ends", ar: "من أين تُستقَبل وأين ينتهي اليوم" },
      { en: "The vehicle category, and whether the route suits it", ar: "فئة المركبة، وملاءمة المسار لها" },
      { en: "Anything your party needs that we should plan around", ar: "أي احتياج لمجموعتك ينبغي التخطيط حوله" },
    ],
  },

  faqHeading: { en: "Common questions", ar: "أسئلة متكررة" },

  faqs: [
    {
      question: {
        en: "What is a private day trip with a driver?",
        ar: "ما الرحلة اليومية الخاصة مع سائق؟",
      },
      answer: {
        en: "A private car and driver arranged for a planned outing rather than a single journey. You set the destinations, the driver stays with you through the arrangement you have agreed, and the day ends where you have agreed it should. It is private to your party — not a shared tour.",
        ar: "سيارة خاصة وسائق يُرتَّبان لجولة مخطَّطة لا لرحلة واحدة. أنت تحدّد الوجهات، ويبقى السائق معك ضمن الترتيب المتفق عليه، وينتهي اليوم حيث اتُّفق. وهي خاصة بمجموعتك وحدها — لا جولة مشتركة.",
      },
    },
    {
      question: { en: "Does the driver stay with us all day?", ar: "هل يبقى السائق معنا طوال اليوم؟" },
      answer: {
        en: "The driver stays with you through the outing that has been agreed. How long that is, is set in the quotation rather than here — we do not publish a fixed number of hours, because the honest answer depends on the itinerary you send.",
        ar: "يبقى السائق معك طوال الجولة المتفق عليها. أما طول تلك المدة فيُحدَّد في عرض السعر لا هنا — فنحن لا ننشر عدد ساعات ثابتًا، لأن الجواب الصادق يعتمد على البرنامج الذي ترسله.",
      },
    },
    {
      question: { en: "Can we choose our own destinations?", ar: "هل نختار وجهاتنا بأنفسنا؟" },
      answer: {
        en: "Yes — that is the point of the service. The places on this page are the ones people ask for most, not a menu you have to pick from. Send the list you actually want and we will tell you honestly how it fits into a day.",
        ar: "نعم — وهذا هو جوهر الخدمة. والمواضع في هذه الصفحة هي الأكثر طلبًا، لا قائمة ملزمة تختار منها. أرسل القائمة التي تريدها فعلًا ونخبرك بصراحة كيف تنتظم في يوم.",
      },
    },
    {
      question: { en: "Can we visit several places in one day?", ar: "هل نزور عدة مواضع في يوم واحد؟" },
      answer: {
        en: "Often, yes, and how many depends far more on how far apart they are than on the number itself. Two or three close to the same city is usually comfortable; one that sits a long way out is usually the whole day. If your list is more than the daylight holds, we will say so before you confirm.",
        ar: "غالبًا نعم، والعدد يعتمد على تباعدها أكثر مما يعتمد على العدد نفسه. فموضعان أو ثلاثة قرب المدينة نفسها مريحة عادةً؛ وموضع بعيد يستغرق اليوم كله عادةً. وإن كانت قائمتك أكثر مما يسعه النهار قلنا لك ذلك قبل التأكيد.",
      },
    },
    {
      question: { en: "Can we be brought back to our hotel?", ar: "هل نُعاد إلى فندقنا؟" },
      answer: {
        en: "Yes, where that has been arranged — returning to the starting point is the usual shape of a day trip. If you would rather finish somewhere else, say so in the enquiry and it is quoted that way.",
        ar: "نعم، حيث يكون ذلك مرتَّبًا — فالعودة إلى نقطة البداية هي الشكل المعتاد للرحلة اليومية. وإن فضّلت الانتهاء في مكان آخر فاذكر ذلك في الطلب ويُسعَّر على هذا الأساس.",
      },
    },
    {
      question: { en: "Can we arrange a half-day instead?", ar: "هل يمكن ترتيب نصف يوم بدلًا من ذلك؟" },
      answer: {
        en: "Yes. A shorter outing is quoted the same way as a longer one — tell us roughly how long you want the car for and what you want to see, and the quotation reflects that.",
        ar: "نعم. تُسعَّر الجولة الأقصر بالطريقة نفسها التي تُسعَّر بها الأطول — أخبرنا تقريبًا بالمدة التي تريد السيارة خلالها وبما تريد رؤيته، ويعكس عرض السعر ذلك.",
      },
    },
    {
      question: { en: "Are attraction tickets included?", ar: "هل تذاكر المعالم مشمولة؟" },
      answer: {
        en: "No. This is private transport with a driver. Entry tickets, permits and any booking a site requires are arranged by you with the site itself, and whether a place is open on your date is set by that site rather than by us.",
        ar: "لا. هذه خدمة نقل خاص مع سائق. أما تذاكر الدخول والتصاريح وأي حجز يشترطه موضع فترتّبها أنت مع الموضع نفسه، وكون الموضع مفتوحًا في تاريخك أمر يحدّده هو لا نحن.",
      },
    },
    {
      question: { en: "Is a tour guide included?", ar: "هل يشمل ذلك مرشدًا سياحيًا؟" },
      answer: {
        en: "No. The driver drives, and is neither engaged as a guide nor presented as one — if you want commentary on what you are seeing, that is a separate arrangement you would make yourself.",
        ar: "لا. السائق يقود. وهو غير متعاقد عليه بصفة مرشد ولا يُقدَّم على أنه كذلك — فإن أردت شرحًا لما تشاهده فذلك ترتيب منفصل تتولاه بنفسك.",
      },
    },
    {
      question: { en: "Which vehicle should we ask for?", ar: "أي مركبة نطلب؟" },
      answer: {
        en: "It follows the party size, the bags and the road. A sedan is the usual answer for two or three on paved routes; an SUV is the one to raise where the approach leaves the asphalt; a van or minibus keeps a larger group in one vehicle. The suitable category is confirmed with the quotation.",
        ar: "يتبع ذلك عدد الركاب والحقائب والطريق. فالسيدان هي الجواب المعتاد لاثنين أو ثلاثة على طرق معبّدة؛ ويُطرح الدفع الرباعي حيث يغادر الطريق الإسفلت؛ ويُبقي الڤان أو الميني باص المجموعة الأكبر في مركبة واحدة. وتُؤكَّد الفئة المناسبة مع عرض السعر.",
      },
    },
    {
      question: { en: "We are a family of nine. One vehicle?", ar: "نحن عائلة من تسعة. مركبة واحدة؟" },
      answer: {
        en: "Nine is beyond a single vehicle's bracket here, so that is arranged as more than one car travelling together, subject to availability on your date. Give the full number in the enquiry and the quotation covers all of you rather than some of you.",
        ar: "تسعة تتجاوز سعة مركبة واحدة لدينا، فيُرتَّب ذلك بأكثر من سيارة تسير معًا، رهنًا بالتوافر في تاريخك. اذكر العدد الكامل في الطلب ليشملكم عرض السعر جميعًا لا بعضكم.",
      },
    },
    {
      question: {
        en: "Can we ask for somewhere not listed here?",
        ar: "هل نطلب موضعًا غير مذكور هنا؟",
      },
      answer: {
        en: "Yes. This page shows the places asked for most often and the ones we hold a photograph of — it is not the limit of where a car can go. Name the place in your enquiry and we will tell you what is practical.",
        ar: "نعم. تعرض هذه الصفحة أكثر المواضع طلبًا وتلك التي نملك صورة لها — وليست حدًّا لما تبلغه السيارة. سمِّ الموضع في طلبك ونخبرك بما هو عملي.",
      },
    },
    {
      question: {
        en: "Can remote desert destinations be included?",
        ar: "هل تُدرَج الوجهات الصحراوية النائية؟",
      },
      answer: {
        en: "They are considered rather than assumed. Some approaches leave the paved road, which affects both the route and which vehicle is suitable, so those are checked before the day is agreed. Where we cannot reach something safely we say so instead of quietly dropping it from the itinerary.",
        ar: "يُنظر فيها ولا تُفترض. فبعض الطرق إليها يغادر الإسفلت، وهذا يؤثر في المسار وفي المركبة المناسبة، فيُتحقَّق منهما قبل الاتفاق على اليوم. وحيث لا نستطيع الوصول بأمان نقول ذلك بدل إسقاطه من البرنامج بصمت.",
      },
    },
    {
      question: {
        en: "Is this different from a city-to-city transfer?",
        ar: "هل يختلف هذا عن النقل بين المدن؟",
      },
      answer: {
        en: "Yes, and they are quoted differently. A city-to-city transfer is one journey to one destination and ends when you arrive. A day trip keeps the car and driver with you through an agreed outing and usually brings you back. If you only need the road between two cities, that service has its own page.",
        ar: "نعم، ويُسعَّران على نحو مختلف. فالنقل بين المدن رحلة واحدة إلى وجهة واحدة وينتهي بوصولك. أما الرحلة اليومية فتبقى السيارة والسائق معك خلال جولة متفق عليها وتعيدك عادةً. وإن كنت تحتاج الطريق بين مدينتين فقط، فلتلك الخدمة صفحتها الخاصة.",
      },
    },
    {
      question: { en: "How do we get a price?", ar: "كيف نحصل على سعر؟" },
      answer: {
        en: "Send the enquiry with your starting point, date, the places you want and how many of you there are. You receive a written quotation covering the arrangement, and nothing is confirmed until you accept it.",
        ar: "أرسل الطلب متضمنًا نقطة انطلاقك والتاريخ والمواضع التي تريدها وعددكم. تصلك عرض سعر مكتوب يغطي الترتيب، ولا يُؤكَّد شيء حتى تقبله.",
      },
    },
    {
      question: {
        en: "Is the booking confirmed as soon as I send the form?",
        ar: "هل يُؤكَّد الحجز فور إرسال النموذج؟",
      },
      answer: {
        en: "No. The form starts a conversation, not a reservation. There is no checkout, no online payment and no instant availability on this website — the quotation comes first and the booking is confirmed separately after you accept it.",
        ar: "لا. النموذج يبدأ محادثة لا حجزًا. فليس في هذا الموقع سلة شراء ولا دفع إلكتروني ولا تأكيد توافر فوري — يأتي عرض السعر أولًا، ويُؤكَّد الحجز على حدة بعد قبولك له.",
      },
    },
  ] satisfies ClusterFaq[],

  cta: {
    eyebrow: { en: "Your day, your list", ar: "يومك، وقائمتك" },
    heading: { en: "Tell us where you want to go", ar: "أخبرنا إلى أين تريد الذهاب" },
    body: {
      en: "Send your starting point, the date and the places you have in mind. We will plan the route, say plainly whether the list fits a day, and come back with a written quotation.",
      ar: "أرسل نقطة انطلاقك والتاريخ والمواضع التي تفكر فيها. سنخطّط المسار، ونقول بصراحة إن كانت القائمة تسع يومًا، ونعود إليك بعرض سعر مكتوب.",
    },
    button: { en: "Request a day-trip quote", ar: "اطلب عرض سعر لرحلة يومية" },
  },

  whatsappMessage: {
    en: "Hello, I would like to arrange a private day trip.",
    ar: "السلام عليكم، أرغب في ترتيب رحلة يومية خاصة.",
  },
  whatsappCta: { en: "Ask on WhatsApp", ar: "اسأل عبر واتساب" },

  relatedHeading: { en: "Related pages", ar: "صفحات ذات صلة" },

  related: [
    {
      routeKey: "cityToCity",
      label: { en: "City-to-city transfers", ar: "النقل بين المدن" },
      note: {
        en: "If you only need the road between two cities, with no return and no waiting, that is the page for it.",
        ar: "إن كنت تحتاج الطريق بين مدينتين فقط، بلا عودة ولا انتظار، فتلك هي صفحته.",
      },
    },
    {
      routeKey: "airportTransfers",
      label: { en: "Airport transfers", ar: "النقل من وإلى المطارات" },
      note: {
        en: "Arrivals and departures, where the timing is set by a flight rather than by you.",
        ar: "الوصول والمغادرة، حيث يحدّد الرحلةَ موعدُ الطيران لا أنت.",
      },
    },
    {
      routeKey: "hotelTransfers",
      label: { en: "Hotel transfers", ar: "النقل من وإلى الفنادق" },
      note: {
        en: "Single runs to and from a hotel address, including changes of hotel mid-stay.",
        ar: "تنقلات مفردة من عنوان فندق وإليه، بما في ذلك تغيير الفندق أثناء الإقامة.",
      },
    },
    {
      routeKey: "ziyaratTransfers",
      label: { en: "Ziyarat transfers", ar: "النقل للزيارة" },
      note: {
        en: "A different service for a different purpose: visits to religious sites around Makkah and Madinah, arranged on their own terms.",
        ar: "خدمة مختلفة لغرض مختلف: زيارة المواضع الدينية حول مكة المكرمة والمدينة المنورة، تُرتَّب وفق اعتباراتها الخاصة.",
      },
    },
    {
      routeKey: "riyadh",
      label: { en: "Riyadh transfers", ar: "خدمات النقل في الرياض" },
      note: {
        en: "The city hub, with the airport, the station and the roads out of the capital.",
        ar: "مركز المدينة، وفيه المطار والمحطة والطرق الخارجة من العاصمة.",
      },
    },
    {
      routeKey: "jeddah",
      label: { en: "Jeddah transfers", ar: "خدمات النقل في جدة" },
      note: {
        en: "The city hub on the Red Sea coast, and the starting point for the mountain road to Taif.",
        ar: "مركز المدينة على ساحل البحر الأحمر، ونقطة الانطلاق في طريق الجبل إلى الطائف.",
      },
    },
  ] satisfies RelatedLink[],
};
