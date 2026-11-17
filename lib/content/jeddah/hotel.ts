import type { Bilingual } from "@/lib/i18n/config";
import type {
  ClusterCta,
  ClusterFaq,
  RelatedLink,
} from "@/lib/content/riyadh/types";
import type { RouteKey } from "@/lib/i18n/routes";
import type { SiteImageKey } from "@/lib/site-images";

/**
 * Jeddah hotel transfers.
 *
 * Researched independently of the Riyadh hotel page, and it ends up being a
 * different page about a superficially identical service, for two reasons the
 * research made plain.
 *
 * First, **a Jeddah hotel is usually a staging post rather than a
 * destination**. The site's own Jeddah pages already establish that almost
 * nobody lands here and stays: the journey most arrivals are really making is
 * airport or hotel to a Haram-area address. So this page is not organised by
 * journey type, like Riyadh's, but as the three acts of a stay — arriving,
 * moving around while you are here, and the leg out. That sequence is what a
 * Jeddah hotel actually sits in the middle of.
 *
 * Second, **"a hotel in Jeddah" is not a location.** The city runs a long way
 * up the Red Sea coast; Obhur is variously put 20 to 30 km north of the
 * centre. A hotel there and a hotel by Al-Balad are not interchangeable
 * pickups, which is why the page asks for a district and an address rather
 * than a hotel brand.
 *
 * What the page deliberately does NOT publish is a table of distances or drive
 * times between Jeddah's hotel districts, and `districts.honest` says so in as
 * many words. The published sources contradict each other badly — the same
 * Corniche is given as 4.2 km by one reference work and about 30 km by
 * another, because they are measuring different things under the same name.
 * Any table built on that would look authoritative and be wrong. The site's
 * standing position applies: quote on the address, not on a headline figure.
 *
 * `imageKey` is the corniche rather than the generic hotel image, because that
 * image is the Abraj Al Bait towers in Makkah and would be the wrong city. The
 * same rule as the Riyadh hotel page holds here: no hotel-branded imagery, and
 * no photograph of a property we have no relationship with.
 */

export type StayAct = {
  number: string;
  kicker: Bilingual<string>;
  heading: Bilingual<string>;
  lead: Bilingual<string>;
  points: { title: Bilingual<string>; body: Bilingual<string> }[];
};

export const jeddahHotel = {
  routeKey: "jeddahHotel" as RouteKey,
  imageKey: "jeddah-corniche" as SiteImageKey,

  seo: {
    title: {
      en: "Jeddah hotel transfers — airport, city and the onward leg",
      ar: "النقل من فنادق جدة — المطار والمدينة والرحلة التالية",
    },
    description: {
      en: "Private car to and from your Jeddah hotel: the arrival from the airport, journeys around a city that runs for kilometres, and the leg on to Makkah or Madinah. Quoted on your address.",
      ar: "سيارة خاصة من فندقك في جدة وإليه: الوصول من المطار، والتنقل في مدينة تمتد كيلومترات، والرحلة التالية إلى مكة أو المدينة. ويُسعَّر وفق عنوانك.",
    },
  },

  crumbLabel: { en: "Hotel transfers", ar: "النقل من الفنادق" },

  // --- Hero --------------------------------------------------------------

  eyebrow: { en: "Jeddah", ar: "جدة" },
  title: { en: "Jeddah hotel transfers", ar: "النقل من فنادق جدة وإليها" },
  standfirst: {
    en: "In most cities a hotel is where you are going. In Jeddah it is usually where you pause — between the flight that brought you and the road to Makkah or Madinah. This page follows that sequence, because the transfers people actually need here come in that order.",
    ar: "في معظم المدن يكون الفندق هو وجهتك. أما في جدة فهو غالبًا محطة توقف — بين الرحلة التي أقلّتك والطريق إلى مكة المكرمة أو المدينة المنورة. وتتبع هذه الصفحة ذلك التسلسل، لأن الرحلات التي يحتاجها الناس هنا تأتي بهذا الترتيب.",
  },

  /** The three beats, shown as a sequence strip in the hero. */
  sequence: [
    { label: { en: "Arrive", ar: "الوصول" } },
    { label: { en: "Stay", ar: "الإقامة" } },
    { label: { en: "Move on", ar: "المغادرة" } },
  ],

  primaryCta: { en: "Request a quotation", ar: "اطلب عرض سعر" },
  secondaryCta: { en: "Which district?", ar: "أي حي؟" },

  // --- The three acts -----------------------------------------------------

  acts: [
    {
      number: "01",
      kicker: { en: "Arrive", ar: "الوصول" },
      heading: {
        en: "From King Abdulaziz airport to your hotel",
        ar: "من مطار الملك عبدالعزيز إلى فندقك",
      },
      lead: {
        en: "The first transfer of the trip, and the one most worth getting right — you are tired, possibly arriving at an awkward hour, and you do not yet know the city.",
        ar: "أول رحلة في السفرة، وأجدرها بالضبط — فأنت متعب، وربما وصلت في ساعة غير مريحة، ولا تعرف المدينة بعد.",
      },
      points: [
        {
          title: { en: "Send the flight number", ar: "أرسل رقم الرحلة" },
          body: {
            en: "The pickup follows your aircraft rather than a clock time, so an early landing or a long delay moves it instead of stranding it. Sixty minutes of waiting time is included.",
            ar: "فموعد الاستقبال يتبع طائرتك لا توقيت الساعة، فالهبوط المبكر أو التأخر الطويل يُزيحه بدل أن يتركه عالقًا. ومدة الانتظار المشمولة ستون دقيقة.",
          },
        },
        {
          title: { en: "Name the hotel and the district", ar: "اذكر اسم الفندق والحي" },
          body: {
            en: "Both, not one. Several Jeddah hotels share a brand across different parts of the city, and the difference between them can be most of the length of the city.",
            ar: "كليهما لا أحدهما. فعدة فنادق في جدة تشترك في العلامة التجارية نفسها في أجزاء مختلفة من المدينة، وقد يكون الفارق بينها معظم طول المدينة.",
          },
        },
        {
          title: { en: "And the entrance", ar: "والمدخل كذلك" },
          body: {
            en: "Large hotels have more than one door. The car at one entrance while you wait at another is the single most common way a city transfer goes wrong, and it is avoidable in one line on the form.",
            ar: "فللفنادق الكبيرة أكثر من باب. ووجود السيارة عند مدخل وانتظارك عند آخر هو أكثر أسباب فشل الرحلات داخل المدينة شيوعًا، ويمكن تفاديه بسطر واحد في النموذج.",
          },
        },
      ],
    },
    {
      number: "02",
      kicker: { en: "Stay", ar: "الإقامة" },
      heading: {
        en: "Moving around while you are here",
        ar: "التنقل أثناء وجودك هنا",
      },
      lead: {
        en: "Jeddah runs a long way up the coast, so a journey across it is rarely the short hop a map suggests. Two places need saying more precisely than people expect.",
        ar: "تمتد جدة مسافة طويلة على الساحل، فالرحلة عبرها نادرًا ما تكون التنقّل القصير الذي توحي به الخريطة. وموضعان يحتاجان تحديدًا أدق مما يتوقع الناس.",
      },
      points: [
        {
          title: { en: "Al-Balad: the edge, not the door", ar: "البلد: عند الطرف لا عند الباب" },
          body: {
            en: "The historic district is a UNESCO World Heritage site and its lanes are narrow and largely pedestrian. A car cannot reach most addresses inside it, so the drop-off is at the edge and the last part is on foot. Tell us which side you want and we will name the point in writing.",
            ar: "الحي التاريخي موقع تراث عالمي لليونسكو، وأزقّته ضيّقة ومخصصة للمشي في معظمها. فلا تصل السيارة إلى معظم العناوين داخله، ويكون التوصيل عند الطرف وآخر المسافة سيرًا. فأخبرنا أي جهة تريد ونحدد لك النقطة كتابةً.",
          },
        },
        {
          title: { en: "The corniche: name the stretch", ar: "الكورنيش: حدّد المقطع" },
          body: {
            en: "It runs for kilometres and \"the corniche\" on its own is not an address. A restaurant, a landmark or a stretch is enough to make it one.",
            ar: "فهو يمتد كيلومترات، و«الكورنيش» وحده ليس عنوانًا. ويكفي ذكر مطعم أو معلم أو مقطع لجعله عنوانًا.",
          },
        },
        {
          title: { en: "Hotel to hotel, and errands", ar: "من فندق إلى فندق، والمشاوير" },
          body: {
            en: "Moving properties mid-trip, a journey to Al-Balad for the evening, a run to the Haramain station. Each is quoted as its own journey; if you want the car to wait, say roughly how long and the waiting goes into the price rather than onto the bill afterwards.",
            ar: "الانتقال بين الفنادق في منتصف الرحلة، أو زيارة البلد مساءً، أو التوجه إلى محطة قطار الحرمين. وكل منها يُسعَّر رحلةً مستقلة؛ وإن أردت أن تنتظرك السيارة فاذكر المدة تقريبًا ليُدرَج الانتظار في السعر لا في الفاتورة بعد ذلك.",
          },
        },
      ],
    },
    {
      number: "03",
      kicker: { en: "Move on", ar: "المغادرة" },
      heading: {
        en: "The leg out of Jeddah",
        ar: "الرحلة الخارجة من جدة",
      },
      lead: {
        en: "For most guests this is the journey the stay was arranged around, and it is worth booking at the same time as the arrival rather than on the morning it happens.",
        ar: "بالنسبة لمعظم النزلاء هذه هي الرحلة التي رُتّبت الإقامة من أجلها، ويستحق حجزها مع الوصول في وقت واحد لا صباح يومها.",
      },
      points: [
        {
          title: { en: "On to Makkah", ar: "إلى مكة المكرمة" },
          body: {
            en: "The most requested journey in this city: roughly 80 to 100 km from a Jeddah hotel, an hour to an hour and a half in ordinary traffic. Entry to Makkah is restricted to Muslims and enforced at a checkpoint on the road in, so tell us at the enquiry stage if anyone in your party is not permitted to enter on the travel date.",
            ar: "أكثر الرحلات طلبًا في هذه المدينة: نحو 80 إلى 100 كم من فندق في جدة، وساعة إلى ساعة ونصف في الازدحام المعتاد. والدخول إلى مكة مقصور على المسلمين ويُطبَّق عند نقطة تفتيش على الطريق، فأخبرنا عند إرسال الطلب إن كان في مجموعتك من لا يُسمح له بالدخول في تاريخ السفر.",
          },
        },
        {
          title: { en: "On to Madinah", ar: "إلى المدينة المنورة" },
          body: {
            en: "A long road journey north, or the Haramain train from the city station or the one inside the airport. If the train suits you better we will say so — we provide the road leg either way and sell no rail tickets.",
            ar: "رحلة برية طويلة شمالًا، أو قطار الحرمين من محطة المدينة أو من المحطة داخل المطار. وإن كان القطار أنسب لك قلنا ذلك — فنحن نوفّر المرحلة البرية في الحالين ولا نبيع تذاكر قطار.",
          },
        },
        {
          title: { en: "Back to the airport", ar: "والعودة إلى المطار" },
          body: {
            en: "The arithmetic runs backwards: give us the airline's check-in or bag-drop time and we work back through the drive and the hour of day to a pickup at your door. If checkout is hours before the flight, say so — a later pickup with bags held at the hotel often beats a long wait at the terminal.",
            ar: "هنا يسير الحساب تراجعيًا: أعطنا موعد إجراءات السفر أو تسليم الحقائب ونحسب رجوعًا عبر زمن الطريق وساعة اليوم إلى موعد استقبال عند بابك. وإن كان موعد مغادرة الفندق قبل الرحلة بساعات فاذكر ذلك — فالاستقبال المتأخر مع حفظ الحقائب في الفندق أفضل غالبًا من انتظار طويل في الصالة.",
          },
        },
      ],
    },
  ] satisfies StayAct[],

  // --- The honest block ---------------------------------------------------

  districts: {
    heading: { en: "Which district you are in matters", ar: "الحي الذي تقيم فيه مهم" },
    lead: {
      en: "Jeddah stretches a long way along the Red Sea. Obhur, at the northern end, is variously put twenty to thirty kilometres from the centre, and a hotel there and a hotel beside Al-Balad are not interchangeable pickups. A district plus a street is worth more to us than a brand name.",
      ar: "تمتد جدة مسافة طويلة على البحر الأحمر. فأبحر في طرفها الشمالي تُذكر على نحو عشرين إلى ثلاثين كيلومترًا من المركز، والفندق هناك والفندق المجاور للبلد ليسا نقطتي استقبال متكافئتين. وذِكر الحي مع الشارع أنفع لنا من ذكر اسم العلامة التجارية.",
    },
    honest: {
      heading: {
        en: "The table we are not printing",
        ar: "الجدول الذي لا نطبعه",
      },
      body: [
        {
          en: "You will find Jeddah transfer pages carrying a neat grid of distances and drive times between the hotel districts. We are not publishing one, because the published figures for this city's own geography do not agree with each other.",
          ar: "ستجد صفحات نقل في جدة تحمل جدولًا أنيقًا بالمسافات وأزمنة القيادة بين أحياء الفنادق. ونحن لا ننشر جدولًا كهذا، لأن الأرقام المنشورة عن جغرافية هذه المدينة نفسها لا يتفق بعضها مع بعض.",
        },
        {
          en: "The clearest example is the corniche. One reference work gives it as 4.2 km; another description of the same waterfront gives about 30 km. Both are defensible, because they are measuring different things under one name. A table built on figures like those would look authoritative and mislead you about how long your own journey takes.",
          ar: "وأوضح مثال على ذلك الكورنيش. فأحد المراجع يذكره 4.2 كم؛ ووصف آخر للواجهة البحرية نفسها يذكر نحو 30 كم. وكلاهما قابل للدفاع عنه، لأنهما يقيسان أشياء مختلفة تحت اسم واحد. وجدول مبني على أرقام كهذه سيبدو موثوقًا ويضللك بشأن المدة التي تستغرقها رحلتك أنت.",
        },
        {
          en: "So we quote on the two addresses you actually give us, and the time we work to is the time for your journey on your date — not a figure lifted from a map.",
          ar: "ولذلك نسعّر وفق العنوانين اللذين تعطينا إياهما فعلًا، والزمن الذي نعمل به هو زمن رحلتك أنت في تاريخك — لا رقمًا منقولًا عن خريطة.",
        },
      ],
    },
  },

  // --- What to send -------------------------------------------------------

  sending: {
    heading: { en: "What to send us", ar: "ما ترسله إلينا" },
    lead: {
      en: "Short list, and every line of it changes something on our side.",
      ar: "قائمة قصيرة، وكل سطر فيها يغيّر شيئًا لدينا.",
    },
    items: [
      {
        en: "The hotel by name, its district, and the entrance you will use.",
        ar: "اسم الفندق، وحيّه، والمدخل الذي ستستخدمه.",
      },
      {
        en: "Where you are going — an address, a landmark, or which end of Al-Balad.",
        ar: "وإلى أين تتجه — عنوان أو معلم أو أي طرف من البلد.",
      },
      {
        en: "The date and the time, and the flight number if an airport is involved at either end.",
        ar: "والتاريخ والوقت، ورقم الرحلة إن كان المطار طرفًا في أي من الجهتين.",
      },
      {
        en: "Passengers counted exactly, including children and infants on a lap.",
        ar: "وعدد الركاب بدقة، شاملًا الأطفال والرضّع المحمولين.",
      },
      {
        en: "Luggage counted honestly, with Zamzam containers included — they are the item most often left off and the one most likely not to fit.",
        ar: "وعدد الحقائب بصدق، مع إدراج عبوات ماء زمزم — فهي أكثر ما يُغفل وأكثر ما قد لا يتسع.",
      },
      {
        en: "Whether you want the car to wait, and roughly how long.",
        ar: "وهل تريد أن تنتظرك السيارة، وكم المدة تقريبًا.",
      },
      {
        en: "Anything out of the ordinary: a child seat, a wheelchair, a passenger who cannot manage steps.",
        ar: "وأي أمر غير معتاد: مقعد أطفال، أو كرسي متحرك، أو راكب لا يستطيع صعود الدرج.",
      },
    ] satisfies Bilingual<string>[],
  },

  // --- Scope --------------------------------------------------------------

  scope: {
    heading: { en: "What we do and do not do here", ar: "ما نفعله وما لا نفعله هنا" },
    body: [
      {
        en: "We arrange road transport. Not flights, not rail tickets, not hotels, and not Hajj or Umrah visas, permits or packages. If you need a room we are the wrong people to ask, and we would rather say so than take the enquiry.",
        ar: "نحن نرتّب النقل البري. لا الرحلات الجوية، ولا تذاكر القطار، ولا الفنادق، ولا تأشيرات الحج والعمرة أو تصاريحها أو برامجها. فإن كنت تحتاج غرفة فنحن لسنا الجهة الصحيحة، ونفضّل قول ذلك على استقبال الطلب.",
      },
      {
        en: "We also hold no standing arrangement at any hotel in the city, and we do not publish one. Where a car may wait is set by the property and by whoever is managing the forecourt that day. What you get instead is the entrance and the arrangement confirmed in writing for your booking, and a number to call if the forecourt is closed when you come out.",
        ar: "كما ليس لدينا ترتيب ثابت في أي فندق بالمدينة، ولا ننشر ترتيبًا كهذا. فموضع انتظار السيارة تحدده المنشأة ومن يدير ساحتها ذلك اليوم. وما تحصل عليه بدلًا من ذلك هو المدخل والترتيب مؤكَّدين كتابةً لحجزك، ورقم للاتصال إن كانت الساحة مغلقة حين تخرج.",
      },
    ],
  },

  // --- Vehicles -----------------------------------------------------------

  vehicles: {
    heading: { en: "Which vehicle to ask for", ar: "أي مركبة تطلب" },
    lead: {
      en: "Categories, not a named fleet — we confirm what is available for your date rather than promising a model. For a city run the category follows your party and your bags; for the leg on to Makkah or Madinah it matters more, because you will be in it for hours.",
      ar: "فئات لا أسطول بأسماء — فنحن نؤكد المتاح لتاريخك بدل الوعد بطراز. وفي التنقل داخل المدينة تتبع الفئة عددكم وحقائبكم؛ أما في الرحلة إلى مكة أو المدينة فهي أهم، لأنك ستقضي فيها ساعات.",
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
      en: "Sending an enquiry does not confirm a booking and does not hold a vehicle for your date. We reply with a written price; you decide; and your transfer is confirmed only when we send a booking confirmation saying so. Nothing is reserved and no payment is taken on this website. If your stay includes the leg on to Makkah or Madinah, send both journeys in one enquiry — it is quoted together and it is one less thing to arrange on the morning.",
      ar: "إرسال الطلب لا يؤكد حجزًا ولا يحجز مركبة لتاريخك. ونرد عليك بسعر مكتوب؛ ثم تقرر أنت؛ ولا تتأكد رحلتك إلا عندما نرسل رسالة تأكيد حجز تنص على ذلك. ولا يُحجز شيء ولا يُستوفى أي مبلغ عبر هذا الموقع. وإذا تضمنت إقامتك الرحلة إلى مكة أو المدينة، فأرسل الرحلتين في طلب واحد — فتُسعَّران معًا ويقلّ ما تحتاج ترتيبه صباح ذلك اليوم.",
    },
  },

  // --- FAQs ---------------------------------------------------------------

  faqs: [
    {
      question: {
        en: "Can you collect me from any hotel in Jeddah?",
        ar: "هل يمكنكم استقبالي من أي فندق في جدة؟",
      },
      answer: {
        en: "Yes, anywhere in the city — but give us the hotel by name, its district and the entrance you will come out of. Jeddah runs a long way up the coast and several properties share a brand across different parts of it, so a brand name on its own is not an address. The entrance matters because large hotels have more than one.",
        ar: "نعم، في أي مكان بالمدينة — لكن زوّدنا باسم الفندق وحيّه والمدخل الذي ستخرج منه. فجدة تمتد مسافة طويلة على الساحل، وتشترك عدة منشآت في العلامة نفسها في أجزاء مختلفة منها، فاسم العلامة وحده ليس عنوانًا. والمدخل مهم لأن للفنادق الكبيرة أكثر من مدخل.",
      },
    },
    {
      question: {
        en: "How long does it take to get from my hotel to Al-Balad?",
        ar: "كم تستغرق الرحلة من فندقي إلى البلد؟",
      },
      answer: {
        en: "It depends entirely on which part of the city your hotel is in, and we would rather quote your journey than print a grid. The published figures for Jeddah's own geography disagree with each other — the same corniche is given as 4.2 km by one reference and about 30 km by another — so a tidy table of district drive times would look authoritative and mislead you. Send the hotel and we will give you the time for your journey.",
        ar: "يعتمد كليًا على الجزء الذي يقع فيه فندقك من المدينة، ونفضّل تسعير رحلتك على طباعة جدول. فالأرقام المنشورة عن جغرافية جدة نفسها متباينة — إذ يُذكر الكورنيش نفسه 4.2 كم في مرجع ونحو 30 كم في وصف آخر — فجدول أنيق بأزمنة القيادة بين الأحياء سيبدو موثوقًا ويضللك. أرسل اسم الفندق ونعطيك زمن رحلتك أنت.",
      },
    },
    {
      question: {
        en: "Can the car drop me at my address inside Al-Balad?",
        ar: "هل يمكن أن توصلني السيارة إلى عنواني داخل البلد؟",
      },
      answer: {
        en: "Usually not to the door. Al-Balad is a UNESCO World Heritage site and its lanes are narrow and largely pedestrian, so the drop-off is at the edge of the district and the last stretch is on foot. Tell us which side of it you want and we will name the point in writing before the day, rather than leaving the driver to improvise.",
        ar: "غالبًا ليس إلى الباب. فالبلد موقع تراث عالمي لليونسكو، وأزقّته ضيّقة ومخصصة للمشي في معظمها، فيكون التوصيل عند طرف الحي وآخر المسافة سيرًا. فأخبرنا أي جهة منه تريد ونحدد النقطة كتابةً قبل اليوم المحدد بدل ترك السائق يرتجل.",
      },
    },
    {
      question: {
        en: "Can you take me from my Jeddah hotel to Makkah?",
        ar: "هل يمكنكم نقلي من فندقي في جدة إلى مكة؟",
      },
      answer: {
        en: "Yes, and it is the most requested journey in this city — roughly 80 to 100 km, an hour to an hour and a half in ordinary traffic. Entry to Makkah is restricted to Muslims and enforced at a checkpoint on the road in; we will not carry a passenger who is not permitted to enter on the travel date, so tell us at the enquiry stage if that applies to anyone in your party and we will quote something that works instead.",
        ar: "نعم، وهي أكثر الرحلات طلبًا في هذه المدينة — نحو 80 إلى 100 كم، وساعة إلى ساعة ونصف في الازدحام المعتاد. والدخول إلى مكة مقصور على المسلمين ويُطبَّق عند نقطة تفتيش على الطريق؛ ولن ننقل راكبًا غير مسموح له بالدخول في تاريخ السفر، فأخبرنا عند إرسال الطلب إن كان ذلك ينطبق على أحد في مجموعتك ونسعّر لك بديلًا مناسبًا.",
      },
    },
    {
      question: {
        en: "Can the driver wait while I run an errand?",
        ar: "هل يمكن أن ينتظرني السائق أثناء قضاء حاجة؟",
      },
      answer: {
        en: "Yes — say roughly how long when you enquire, and the waiting goes into the quotation rather than onto a bill afterwards. Sixty minutes of waiting time is included with a transfer; a stay longer than that is better quoted as a booking with waiting built in, which is usually cheaper than two separate journeys.",
        ar: "نعم — اذكر المدة تقريبًا عند إرسال طلبك، ليُدرَج الانتظار في عرض السعر لا في فاتورة بعد ذلك. ومدة الانتظار المشمولة مع الرحلة ستون دقيقة؛ أما البقاء أطول من ذلك فالأفضل تسعيره حجزًا يتضمن الانتظار، وهو غالبًا أرخص من رحلتين منفصلتين.",
      },
    },
    {
      question: {
        en: "Do you have an arrangement with my hotel?",
        ar: "هل لديكم ترتيب مع فندقي؟",
      },
      answer: {
        en: "No, and we do not claim one. Where a car may wait at any given property is decided by the hotel and by whoever is managing its forecourt that day, not by us. What we do instead is confirm the entrance and the meeting arrangement in writing for your booking, and give you a number to call if the forecourt turns out to be closed when you come out.",
        ar: "لا، ولا ندّعي ذلك. فموضع انتظار السيارة في أي منشأة تحدده المنشأة ومن يدير ساحتها ذلك اليوم، لا نحن. وما نفعله بدلًا من ذلك هو تأكيد المدخل وترتيب اللقاء كتابةً لحجزك، وإعطاؤك رقمًا للاتصال إن تبيّن أن الساحة مغلقة حين تخرج.",
      },
    },
    {
      question: {
        en: "Is there a fixed price for a hotel transfer?",
        ar: "هل هناك سعر ثابت لرحلة من الفندق؟",
      },
      answer: {
        en: "No. Every journey is quoted individually, because the price depends on the two addresses, the vehicle category, the date and time, and any waiting you want built in. You get a written price before anything is reserved, and nothing is confirmed until we send a booking confirmation.",
        ar: "لا. فكل رحلة تُسعَّر على حدة، لأن السعر يعتمد على العنوانين وفئة المركبة والتاريخ والوقت وأي انتظار تريد إدراجه. وتحصل على سعر مكتوب قبل حجز أي شيء، ولا يتأكد شيء حتى نرسل رسالة تأكيد الحجز.",
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
      routeKey: "jeddahAirport" as RouteKey,
      label: { en: "Jeddah airport transfers", ar: "النقل من مطار جدة" },
      note: {
        en: "King Abdulaziz in detail: both directions and the Haramain station inside the terminal.",
        ar: "مطار الملك عبدالعزيز بالتفصيل: الاتجاهان ومحطة قطار الحرمين داخل الصالة.",
      },
    },
    {
      routeKey: "jeddahToMakkah" as RouteKey,
      label: { en: "Jeddah to Makkah", ar: "من جدة إلى مكة" },
      note: {
        en: "The onward leg in full: the entry rules, the 80–100 km road and drop-off near the Haram.",
        ar: "الرحلة التالية كاملة: قيود الدخول، وطريق 80–100 كم، والتوصيل قرب الحرم.",
      },
    },
    {
      routeKey: "makkahToMadinah" as RouteKey,
      label: { en: "Makkah to Madinah", ar: "من مكة إلى المدينة" },
      note: {
        en: "The journey after that one, with the Miqat and the checkpoint set out in full.",
        ar: "الرحلة التي تليها، مع بيان الميقات ونقطة التفتيش بالكامل.",
      },
    },
  ] satisfies RelatedLink[],

  cta: {
    eyebrow: { en: "One price, in writing", ar: "سعر واحد، مكتوب" },
    heading: {
      en: "Send the hotel, the district and the door",
      ar: "أرسل الفندق والحي والمدخل",
    },
    body: {
      en: "With where you are going, the date and time, and how many passengers and bags. If the leg on to Makkah or Madinah is part of the trip, send it in the same enquiry. We reply with a written price. Nothing is reserved and no payment is taken until you accept it.",
      ar: "مع وجهتك، والتاريخ والوقت، وعدد الركاب والحقائب. وإن كانت الرحلة إلى مكة أو المدينة جزءًا من السفرة فأرسلها في الطلب نفسه. ونرد عليك بسعر مكتوب. ولا يُحجز شيء ولا يُستوفى أي مبلغ حتى تقبله.",
    },
    button: { en: "Request a quotation", ar: "اطلب عرض سعر" },
  } satisfies ClusterCta,
} as const;
