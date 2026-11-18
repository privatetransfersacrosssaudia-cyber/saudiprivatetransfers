import type { Bilingual } from "@/lib/i18n/config";
import type {
  ClusterCta,
  ClusterFaq,
  RelatedLink,
} from "@/lib/content/riyadh/types";
import type { RouteKey } from "@/lib/i18n/routes";
import type { SiteImageKey } from "@/lib/site-images";

/**
 * Jeddah Haramain railway station transfers.
 *
 * Researched independently of the Riyadh railway page, and it is deliberately
 * a different page about a superficially identical service.
 *
 * **Riyadh's railway page is a departure board.** There the two stations sit
 * on two different lines going to two different places, so "which station do
 * I need?" is answered by asking where you are going. The signature element
 * is a corridor diagram, and it works because the destination really does
 * decide the building.
 *
 * **Jeddah inverts that exactly.** Both Jeddah stations are on the same
 * Haramain line and both serve the same destinations, so the destination
 * cannot tell you which one you want. The only thing that knows is the
 * ticket, which was issued for one specific station when it was bought. So
 * the concept here is *"your ticket already picked the station"*, the
 * signature element is a ticket stub rather than a board, and the page's job
 * is to get the reader to look at one printed line before they tell us where
 * to send a car.
 *
 * Two facts shape the rest:
 *
 * - **The two stations are about 20 km apart** (CNN Travel, on the opening of
 *   the airport station). Getting this wrong is not a short walk; it is most
 *   of the width of the city.
 * - **One of them is inside King Abdulaziz International Airport**, which
 *   makes a railway pickup there *physically* at an airport but
 *   *operationally* nothing like an airport transfer: the anchor is a train
 *   someone is already sitting on, not an aircraft we can watch. The page
 *   says this in as many words, because the site's Jeddah airport page is
 *   built entirely on the flight-number mechanic and a reader arriving from
 *   it would otherwise carry the wrong model across.
 *
 * What this page deliberately does **not** publish, and `limits` says so out
 * loud: train times, journey durations, fares, seat availability, station
 * opening hours, the distance from the city station to the city centre (no
 * source gives one that is measured from a stated point), any description of
 * either station building, and any meeting point, exit, gate or parking area.
 * The city station burned in 2019 and was rebuilt, so a description written
 * from older material would be describing a building that no longer stands.
 *
 * Sources used for the station facts: Saudipedia (Ministry of Media) for the
 * five-station structure of the line and for the two Jeddah stations being
 * separate; CNN Travel for the roughly 20 km between them; Saudi Gazette and
 * Zawya, reporting the Transport Minister, for the city station returning to
 * service in 2021 after the 2019 fire. Those two reports disagree on the day
 * in 2021, so only the year is published here.
 *
 * `imageKey` is the generic Haramain train, verified by eye: a Haramain set
 * in SAR livery on open track, no station and no identifiable city. That is
 * the honest choice — we hold no photograph of either Jeddah station, and
 * every station photograph in the project is of Riyadh.
 */

/** One of the two stations, as a full section. */
export type StationEntry = {
  /** Stable key; also the heading anchor. */
  key: string;
  kicker: Bilingual<string>;
  name: Bilingual<string>;
  /** What the ticket, the app or a taxi driver may call it instead. */
  aka: Bilingual<string>;
  lead: Bilingual<string>;
  facts: { label: Bilingual<string>; value: Bilingual<string> }[];
  paragraphs: Bilingual<string>[];
  /**
   * What goes into the quote form's `pickup` field. Written to name the
   * station unambiguously — including, for the airport station, that this is
   * a train and not a flight, because that is the one the lead desk must not
   * read as an airport job.
   */
  prefill: Bilingual<string>;
  ctaLabel: Bilingual<string>;
};

export const jeddahStation = {
  routeKey: "jeddahStation" as RouteKey,
  imageKey: "makkah-haramain-train" as SiteImageKey,

  seo: {
    title: {
      en: "Jeddah Haramain station transfers — both stations",
      ar: "النقل من محطتي قطار الحرمين في جدة",
    },
    description: {
      en: "Jeddah has two Haramain railway stations, about 20 km apart — one at Al-Sulaymaniyah and one inside King Abdulaziz airport. Your ticket names which. Private car to or from either.",
      ar: "لجدة محطتان لقطار الحرمين تفصل بينهما نحو 20 كم — إحداهما بالسليمانية والأخرى داخل مطار الملك عبدالعزيز. وتذكرتك تحدد أيّهما. سيارة خاصة من أيّ منهما أو إليها.",
    },
  },

  crumbLabel: { en: "Haramain station transfers", ar: "النقل من محطات الحرمين" },

  // --- Hero ---------------------------------------------------------------

  eyebrow: { en: "Jeddah · Haramain High Speed Railway", ar: "جدة · قطار الحرمين السريع" },
  title: {
    en: "Your ticket already picked the station",
    ar: "تذكرتك اختارت المحطة سلفًا",
  },
  standfirst: {
    en: "Jeddah has two Haramain stations and they are about 20 km apart. They are on the same line and they go to the same places, so nothing about your journey tells you which one you want. One printed line on your ticket does. Read it before you book a car.",
    ar: "لجدة محطتان لقطار الحرمين يفصل بينهما نحو 20 كم. وهما على الخط نفسه وتؤدّيان إلى الوجهات نفسها، فلا شيء في رحلتك يدلّك على أيّهما تريد. سطر واحد مطبوع على تذكرتك هو الذي يدلّك. اقرأه قبل أن تحجز سيارة.",
  },

  /**
   * The signature element: a ticket stub in the hero, with the station field
   * pulled out and both possible values shown. Deliberately not a departure
   * board — a board lists destinations, and on this page the destination is
   * precisely the thing that cannot help you.
   */
  ticket: {
    caption: { en: "Haramain High Speed Railway", ar: "قطار الحرمين السريع" },
    subcaption: {
      en: "Passenger ticket · the line that matters",
      ar: "تذكرة راكب · السطر المهم",
    },
    quietFields: [
      { label: { en: "Date", ar: "التاريخ" }, value: { en: "on your ticket", ar: "في تذكرتك" } },
      { label: { en: "Class", ar: "الدرجة" }, value: { en: "on your ticket", ar: "في تذكرتك" } },
    ],
    fieldLabel: { en: "Jeddah station", ar: "محطة جدة" },
    fieldNote: {
      en: "One of these two, never both. It is on the ticket and in the booking confirmation the railway sent you.",
      ar: "واحدة من هاتين لا كلتاهما. وهي على التذكرة وفي تأكيد الحجز الذي أرسله إليك مشغّل القطار.",
    },
    options: [
      {
        name: { en: "Jeddah — Al-Sulaymaniyah", ar: "جدة — السليمانية" },
        hint: { en: "the city station", ar: "محطة المدينة" },
      },
      {
        name: { en: "King Abdulaziz International Airport", ar: "مطار الملك عبدالعزيز الدولي" },
        hint: { en: "inside the airport", ar: "داخل المطار" },
      },
    ],
    stub: {
      en: "That one line decides where the car waits. Send it to us and the rest is easy.",
      ar: "ذلك السطر وحده يحدد أين تنتظر السيارة. أرسله إلينا ويَسهُل الباقي.",
    },
  },

  primaryCta: { en: "Request a quotation", ar: "اطلب عرض سعر" },
  secondaryCta: { en: "Compare the two stations", ar: "قارن بين المحطتين" },

  // --- The inversion: the honest block ------------------------------------

  sameLine: {
    eyebrow: { en: "Why you cannot guess", ar: "لماذا لا يمكنك التخمين" },
    heading: {
      en: "Both stations go to the same places",
      ar: "المحطتان تؤدّيان إلى الوجهات نفسها",
    },
    lead: {
      en: "This is the part people get wrong, and it is worth stating plainly rather than leaving you to work it out.",
      ar: "هذا هو الجزء الذي يخطئ فيه الناس، ويستحق القول صراحةً بدل تركك تستنتجه.",
    },
    paragraphs: [
      {
        en: "In some cities, asking which station you need is the same question as asking where you are going: two stations, two different lines, two different sets of destinations. Our Riyadh railway page is built that way, because in Riyadh it is true.",
        ar: "في بعض المدن، يكون سؤال «أي محطة أحتاج؟» هو نفسه سؤال «إلى أين أنت ذاهب؟»: محطتان وخطّان مختلفان ومجموعتا وجهات مختلفتان. وصفحتنا عن محطات قطار الرياض مبنية على ذلك، لأنه صحيح في الرياض.",
      },
      {
        en: "Jeddah is the opposite case. Both of its stations sit on the single Haramain line that links Makkah and Madinah, and both of them serve the same destinations. Knowing that you are going to Madinah tells you nothing at all about which Jeddah station your train calls at. The choice was made when the ticket was bought, and the ticket is the only record of it.",
        ar: "وجدة هي الحالة المعاكسة. فمحطتاها كلتاهما على خط الحرمين الواحد الذي يربط مكة المكرمة بالمدينة المنورة، وكلتاهما تخدمان الوجهات نفسها. ومعرفتك أنك ذاهب إلى المدينة المنورة لا تدلّك البتّة على المحطة التي يقف عندها قطارك في جدة. فالاختيار جرى لحظة شراء التذكرة، والتذكرة هي السجل الوحيد له.",
      },
      {
        en: "Which is why this page does not try to be clever about it. We are not going to deduce your station from your destination, because it cannot be done. We ask you to read one line, and if reading it is awkward — a booking made by someone else, a screenshot you no longer have — send us the train instead and we will work from that.",
        ar: "ولهذا لا تحاول هذه الصفحة التذاكي في الأمر. فنحن لن نستنتج محطتك من وجهتك، لأن ذلك غير ممكن. نطلب منك قراءة سطر واحد، فإن تعذّرت قراءته — حجزٌ أجراه شخص آخر، أو لقطة شاشة لم تعد لديك — فأرسل لنا القطار بدلًا من ذلك ونعمل منه.",
      },
    ],
    footnote: {
      en: "We sell no rail tickets and take no commission on them. There is nothing in this for us beyond getting the car to the right building.",
      ar: "ونحن لا نبيع تذاكر قطار ولا نأخذ عمولة عليها. فليس لنا في هذا شيء سوى إيصال السيارة إلى المبنى الصحيح.",
    },
  },

  // --- The two stations ---------------------------------------------------

  stations: {
    heading: { en: "The two stations", ar: "المحطتان" },
    lead: {
      en: "Everything below is published fact about where each station is. Nothing below describes a building, an exit, a platform or a place to wait — see the limits further down for why.",
      ar: "كل ما يلي حقائق منشورة عن موقع كل محطة. ولا شيء فيه يصف مبنى أو مخرجًا أو رصيفًا أو مكان انتظار — وانظر حدود النشر أدناه لمعرفة السبب.",
    },
    items: [
      {
        key: "sulaymaniyah",
        kicker: { en: "The city station", ar: "محطة المدينة" },
        name: { en: "Jeddah — Al-Sulaymaniyah", ar: "جدة — السليمانية" },
        aka: {
          en: "Also written Jeddah station, Al-Sulimaniyah, or simply “Jeddah” on a ticket.",
          ar: "وتُكتب أيضًا محطة جدة، أو السليمانية، أو «جدة» وحدها على التذكرة.",
        },
        lead: {
          en: "The station in Jeddah itself, in the Al-Sulaymaniyah neighbourhood within the An Nassim district. If your ticket says Jeddah and does not say airport, this is the one.",
          ar: "المحطة الواقعة في جدة نفسها، في حي السليمانية ضمن نطاق النسيم. فإن كانت تذكرتك تقول جدة ولا تقول المطار، فهذه هي.",
        },
        facts: [
          {
            label: { en: "Where it is", ar: "الموقع" },
            value: {
              en: "Al-Sulaymaniyah, An Nassim district, Jeddah",
              ar: "السليمانية، نطاق النسيم، جدة",
            },
          },
          {
            label: { en: "From the airport station", ar: "من محطة المطار" },
            value: { en: "About 20 km", ar: "نحو 20 كم" },
          },
          {
            label: { en: "On the line", ar: "على الخط" },
            value: {
              en: "Haramain High Speed Railway, Makkah to Madinah",
              ar: "قطار الحرمين السريع، من مكة إلى المدينة",
            },
          },
        ],
        paragraphs: [
          {
            en: "This is the station to want if your business is in Jeddah — a hotel in the city, an address in Al-Balad, anywhere that is not the airport. It is a city station reached by city roads, and the time it takes to get there depends entirely on where in Jeddah you are starting from, which is why we quote on the address rather than on a headline figure.",
            ar: "هذه هي المحطة التي تريدها إن كان شأنك في جدة — فندق في المدينة، أو عنوان في البلد، أو أي مكان ليس المطار. فهي محطة مدينة تُبلَغ بطرق المدينة، والزمن اللازم للوصول إليها يتوقف كليًا على نقطة انطلاقك في جدة، ولهذا نسعّر وفق العنوان لا وفق رقم عام.",
          },
          {
            en: "Two decades of maps and older travel writing will tell you Jeddah trains leave from the airport, and for a stretch that was true: the city station was out of use after a fire in 2019, and the airport station carried the service. The city station returned to service in 2021. We still will not tell you which station your train uses — that is the ticket's job, not ours — but if you are working from older material that rules the city station out, check it against the railway's own booking before you plan around it.",
            ar: "وستجد في خرائط وكتابات سفر أقدم أن قطارات جدة تنطلق من المطار، وقد كان ذلك صحيحًا مدةً: فمحطة المدينة خرجت عن الخدمة إثر حريق عام 2019، وحملت محطة المطار الخدمة. ثم عادت محطة المدينة إلى الخدمة عام 2021. ومع ذلك لن نخبرك بالمحطة التي يستخدمها قطارك — فتلك مهمة التذكرة لا مهمتنا — لكن إن كنت تعتمد على مادة أقدم تستبعد محطة المدينة، فتحقق منها في حجز القطار نفسه قبل أن تبني عليها خطتك.",
          },
        ],
        prefill: {
          en: "Haramain railway station, Jeddah — Al-Sulaymaniyah (city station)",
          ar: "محطة قطار الحرمين، جدة — السليمانية (محطة المدينة)",
        },
        ctaLabel: {
          en: "Quote for the city station",
          ar: "عرض سعر لمحطة المدينة",
        },
      },
      {
        key: "kaia",
        kicker: { en: "The airport station", ar: "محطة المطار" },
        name: {
          en: "King Abdulaziz International Airport",
          ar: "مطار الملك عبدالعزيز الدولي",
        },
        aka: {
          en: "Also written KAIA station, Jeddah airport station, or simply “airport” on a ticket.",
          ar: "وتُكتب أيضًا محطة مطار الملك عبدالعزيز، أو محطة مطار جدة، أو «المطار» وحدها على التذكرة.",
        },
        lead: {
          en: "A Haramain station built into King Abdulaziz International Airport. It is at the airport, which is exactly why it needs saying clearly: a pickup here is a train pickup, not a flight one.",
          ar: "محطة لقطار الحرمين مدمجة في مطار الملك عبدالعزيز الدولي. وهي في المطار، ولهذا تحديدًا يلزم القول بوضوح: الاستقبال هنا استقبال قطار لا استقبال رحلة جوية.",
        },
        facts: [
          {
            label: { en: "Where it is", ar: "الموقع" },
            value: {
              en: "Integrated into King Abdulaziz International Airport",
              ar: "مدمجة في مطار الملك عبدالعزيز الدولي",
            },
          },
          {
            label: { en: "From the city station", ar: "من محطة المدينة" },
            value: { en: "About 20 km", ar: "نحو 20 كم" },
          },
          {
            label: { en: "On the line", ar: "على الخط" },
            value: {
              en: "Haramain High Speed Railway, Makkah to Madinah",
              ar: "قطار الحرمين السريع، من مكة إلى المدينة",
            },
          },
        ],
        paragraphs: [
          {
            en: "This is the station that makes Jeddah unusual, and the one that most often gets booked by mistake. People picking a station by name reach for the airport because they recognise it; people who genuinely want it are usually connecting between a flight and a train, or heading somewhere north of the city, since the airport lies north of Jeddah rather than in it.",
            ar: "هذه هي المحطة التي تجعل جدة حالة غير معتادة، وهي الأكثر وقوعًا في الحجز بالخطأ. فمن يختار محطة بالاسم يميل إلى المطار لأنه يعرفه؛ أما من يريدها فعلًا فغالبًا ما يكون منتقلًا بين رحلة جوية وقطار، أو متجهًا إلى شمال المدينة، لأن المطار يقع شمال جدة لا داخلها.",
          },
          {
            en: "If your day has both a flight and a train in it, say so in the enquiry and say which comes first. A flight landing and then a train, and a train arriving and then a flight, are different jobs with different timings even though they happen at the same airport, and we would rather set that straight in writing beforehand than discover it on the day.",
            ar: "وإن كان يومك يجمع رحلة جوية وقطارًا، فاذكر ذلك في الطلب واذكر أيّهما أولًا. فهبوط طائرة ثم قطار، ووصول قطار ثم طائرة، مهمتان مختلفتان بتوقيتين مختلفين وإن جرتا في المطار نفسه، ونفضّل ضبط ذلك كتابةً مسبقًا على اكتشافه في اليوم ذاته.",
          },
        ],
        prefill: {
          en: "Haramain railway station at King Abdulaziz airport, Jeddah (train, not a flight)",
          ar: "محطة قطار الحرمين في مطار الملك عبدالعزيز بجدة (قطار لا رحلة جوية)",
        },
        ctaLabel: {
          en: "Quote for the airport station",
          ar: "عرض سعر لمحطة المطار",
        },
      },
    ] as StationEntry[],
    footnote: {
      en: "Jeddah holds two of the five stations on the Haramain line; the other three are at Makkah, Madinah and King Abdullah Economic City.",
      ar: "تضم جدة محطتين من محطات خط الحرمين الخمس؛ والثلاث الأخرى في مكة المكرمة والمدينة المنورة ومدينة الملك عبدالله الاقتصادية.",
    },
  },

  // --- Train anchor vs flight anchor --------------------------------------

  anchor: {
    eyebrow: { en: "Two different jobs", ar: "مهمتان مختلفتان" },
    heading: {
      en: "A station transfer is not an airport transfer",
      ar: "النقل من المحطة ليس نقلًا من المطار",
    },
    lead: {
      en: "Even when it happens at the airport. The difference is what the pickup is timed against, and it changes what we need from you.",
      ar: "حتى حين يجري في المطار. فالفرق في الشيء الذي يُضبط عليه موعد الاستقبال، وهو يغيّر ما نحتاجه منك.",
    },
    columns: [
      {
        title: { en: "Meeting a flight", ar: "استقبال رحلة جوية" },
        headline: { en: "Flight number", ar: "رقم الرحلة" },
        points: [
          {
            en: "The pickup follows the aircraft rather than a clock time, so an early landing or a long delay moves it instead of stranding it.",
            ar: "يتبع الاستقبال الطائرة لا توقيت الساعة، فالهبوط المبكر أو التأخر الطويل يُزيحه بدل أن يتركه عالقًا.",
          },
          {
            en: "The sixty minutes of included waiting is doing real work: it covers immigration and the wait at the baggage belt.",
            ar: "وستون دقيقة الانتظار المشمولة تؤدي عملًا حقيقيًا: فهي تغطي الجوازات والانتظار عند سير الأمتعة.",
          },
          {
            en: "Covered in detail on the Jeddah airport page, not here.",
            ar: "وهذا مشروح بالتفصيل في صفحة مطار جدة، لا هنا.",
          },
        ],
      },
      {
        title: { en: "Meeting a train", ar: "استقبال قطار" },
        headline: { en: "Station and arrival time", ar: "المحطة ووقت الوصول" },
        points: [
          {
            en: "We do not track trains, and we will not pretend otherwise. The pickup is set against the arrival time you give us, and the sixty minutes of included waiting runs from there.",
            ar: "نحن لا نتتبّع القطارات، ولن ندّعي غير ذلك. فيُضبط الاستقبال على وقت الوصول الذي تعطينا إياه، وتبدأ منه ستون دقيقة الانتظار المشمولة.",
          },
          {
            en: "So if the train is running late, a message is worth more than a booking reference. Tell us and we move the pickup.",
            ar: "فإن تأخر القطار كانت رسالة منك أنفع من رقم حجز. أخبرنا وننقل موعد الاستقبال.",
          },
          {
            en: "This is the job at both Jeddah stations — including the one inside the airport. Coming off a train there, send the station and the train, not a flight number.",
            ar: "وهذه هي المهمة في محطتي جدة كلتيهما — بما فيها التي داخل المطار. فإن نزلت من قطار هناك، فأرسل المحطة والقطار لا رقم رحلة جوية.",
          },
        ],
      },
    ],
    footnote: {
      en: "One journey, one anchor. If a single day genuinely has both a flight and a train in it, send both and we will quote them as the two legs they are.",
      ar: "لكل رحلة مرجع واحد. فإن جمع يوم واحد فعلًا رحلة جوية وقطارًا، فأرسلهما معًا ونسعّرهما بوصفهما رحلتين كما هما.",
    },
  },

  // --- What to send -------------------------------------------------------

  sending: {
    heading: { en: "What to send with the enquiry", ar: "ما ترسله مع الطلب" },
    lead: {
      en: "Short list, and the first item is the one that matters.",
      ar: "قائمة قصيرة، وأول بند فيها هو المهم.",
    },
    items: [
      {
        en: "Which Jeddah station — Al-Sulaymaniyah or the one at King Abdulaziz airport. If you are not sure, send us the train instead and we will read it from there.",
        ar: "أي محطة في جدة — السليمانية أم التي في مطار الملك عبدالعزيز. وإن لم تكن متأكدًا فأرسل لنا القطار ونقرأها منه.",
      },
      {
        en: "Which direction: are we collecting you from the station, or taking you to it?",
        ar: "وفي أي اتجاه: هل نستقبلك من المحطة أم نوصلك إليها؟",
      },
      {
        en: "The date, and the arrival or departure time your ticket shows.",
        ar: "والتاريخ، ووقت الوصول أو المغادرة الذي تبيّنه تذكرتك.",
      },
      {
        en: "The other end of the journey as a full address, not a district or a hotel brand — several Jeddah hotels share a name across the city.",
        ar: "والطرف الآخر من الرحلة بعنوان كامل، لا حيًّا ولا اسم علامة فندقية — فعدة فنادق في جدة تتشارك الاسم نفسه في أنحاء المدينة.",
      },
      {
        en: "How many of you, and what luggage you are actually carrying.",
        ar: "وعددكم، والأمتعة التي تحملونها فعلًا.",
      },
      {
        en: "If the day also includes a flight, which comes first.",
        ar: "وإن تضمن اليوم رحلة جوية أيضًا، فأيّهما أولًا.",
      },
    ],
  },

  // --- Limits -------------------------------------------------------------

  limits: {
    heading: { en: "What we do not publish", ar: "ما لا ننشره" },
    lead: {
      en: "Not an omission. Each of these is something we could write down and could not stand behind, so it is named here instead.",
      ar: "وليس هذا إغفالًا. فكل بند منها شيء نستطيع كتابته ولا نستطيع ضمانه، فسُمّي هنا بدلًا من ذلك.",
    },
    items: [
      {
        en: "Train times, journey durations, fares and seat availability. We arrange road transport and sell no rail tickets; the railway operator is the live answer and we are not.",
        ar: "مواعيد القطارات ومدد الرحلات والأسعار وتوافر المقاعد. فنحن نرتّب النقل البري ولا نبيع تذاكر قطار؛ والمشغّل هو الجواب الحيّ لا نحن.",
      },
      {
        en: "Station opening hours. Published sources disagree, and a wrong hour on a page like this is worse than no hour at all.",
        ar: "وساعات عمل المحطات. فالمصادر المنشورة متعارضة، وساعة خاطئة في صفحة كهذه أسوأ من غياب الساعة أصلًا.",
      },
      {
        en: "A distance or drive time from “the city centre” to the Al-Sulaymaniyah station. No published figure says which point in Jeddah it was measured from, so the number would look precise and mean nothing. We quote on your address.",
        ar: "ومسافة أو زمن قيادة من «وسط المدينة» إلى محطة السليمانية. فلا رقم منشور يذكر النقطة التي قيس منها في جدة، فيبدو الرقم دقيقًا ولا يعني شيئًا. ونحن نسعّر وفق عنوانك.",
      },
      {
        en: "Any description of either station building, or any meeting point, exit, gate or parking area inside one. Where a car may wait at a railway station is set by the station, not by us — and the city station was rebuilt after the 2019 fire, so older descriptions describe a building that is gone.",
        ar: "وأي وصف لمبنى أيٍّ من المحطتين، أو أي نقطة التقاء أو مخرج أو بوابة أو موقف داخلها. فموضع انتظار السيارة في محطة قطار تحدده المحطة لا نحن — وقد أُعيد بناء محطة المدينة بعد حريق 2019، فالأوصاف القديمة تصف مبنى لم يعد قائمًا.",
      },
    ],
    footnote: {
      en: "What you get instead is the station and the arrangement confirmed in writing for your booking, and a number to call on the day.",
      ar: "وما تحصل عليه بدلًا من ذلك هو المحطة والترتيب مؤكَّدين كتابةً لحجزك، ورقم للاتصال في اليوم نفسه.",
    },
  },

  // --- Vehicles -----------------------------------------------------------

  vehicles: {
    heading: { en: "Vehicles", ar: "المركبات" },
    lead: {
      en: "Chosen on how many of you there are and what you are carrying. A train journey tends to mean less luggage than a flight, but say what you actually have rather than what you expect to need.",
      ar: "تُختار بحسب عددكم وما تحملونه. ورحلة القطار عادةً أقل أمتعة من رحلة الطيران، لكن اذكر ما لديك فعلًا لا ما تتوقع أنك ستحتاجه.",
    },
    slugs: ["sedan", "suv", "van", "minibus"],
    footnote: {
      en: "Vehicle models and makes vary by availability; the class is what is confirmed in your quotation.",
      ar: "وتتفاوت موديلات المركبات وطرزها بحسب التوافر؛ والفئة هي ما يُؤكَّد في عرض السعر.",
    },
  },

  // --- Booking ------------------------------------------------------------

  booking: {
    heading: { en: "How booking works", ar: "كيف يتم الحجز" },
    note: {
      en: "Sending an enquiry does not confirm a booking and does not hold a vehicle for your date. We reply with a written price and the station stated back to you; you decide; and your transfer is confirmed only when we send a booking confirmation saying so. Nothing is reserved and no payment is taken on this website. Check the station on that confirmation — it is the last point at which a wrong one costs you nothing.",
      ar: "إرسال الطلب لا يؤكد حجزًا ولا يحجز مركبة لتاريخك. ونرد بسعر مكتوب وبذكر المحطة إليك؛ ثم تقرر أنت؛ ولا تتأكد رحلتك إلا عندما نرسل رسالة تأكيد حجز تنص على ذلك. ولا يُحجز شيء ولا يُستوفى أي مبلغ عبر هذا الموقع. وراجع المحطة في تلك الرسالة — فهي آخر لحظة لا يكلّفك فيها الخطأ شيئًا.",
    },
  },

  // --- FAQs ---------------------------------------------------------------

  faqHeading: { en: "Common questions", ar: "الأسئلة الشائعة" },

  faqs: [
    {
      question: {
        en: "How do I know which Jeddah station my train uses?",
        ar: "كيف أعرف المحطة التي يستخدمها قطاري في جدة؟",
      },
      answer: {
        en: "It is on the ticket and in the booking confirmation the railway sent you, as either Jeddah — Al-Sulaymaniyah or King Abdulaziz International Airport. It is not something you can work out from your destination, because both stations serve the same ones. If you cannot find it, send us the train you are booked on and we will read it from that rather than guess.",
        ar: "هي على التذكرة وفي تأكيد الحجز الذي أرسله إليك مشغّل القطار، إما «جدة — السليمانية» أو «مطار الملك عبدالعزيز الدولي». وليست شيئًا تستنتجه من وجهتك، لأن المحطتين تخدمان الوجهات نفسها. فإن لم تجدها فأرسل لنا القطار المحجوز عليه ونقرأها منه بدل التخمين.",
      },
    },
    {
      question: {
        en: "How far apart are the two Jeddah stations?",
        ar: "كم تبعد محطتا جدة إحداهما عن الأخرى؟",
      },
      answer: {
        en: "About 20 km. That is not a short hop between two buildings in the same part of town — one is in the city at Al-Sulaymaniyah and the other is at the airport, which lies north of Jeddah. Arriving at the wrong one is a genuine journey to put right, which is the whole reason this page exists.",
        ar: "نحو 20 كم. وليست قفزة قصيرة بين مبنيين في الحي نفسه — فإحداهما في المدينة بالسليمانية والأخرى في المطار الواقع شمال جدة. والوصول إلى الخطأ منهما رحلة حقيقية لتصحيحه، وهذا كل سبب وجود هذه الصفحة.",
      },
    },
    {
      question: {
        en: "The station is inside the airport. Is that an airport transfer?",
        ar: "المحطة داخل المطار. فهل هذا نقل من المطار؟",
      },
      answer: {
        en: "No, and the distinction is practical rather than pedantic. An airport transfer is timed against a flight number, and the sixty minutes of included waiting is there to absorb immigration and baggage. A train pickup is timed against the arrival time you give us; we do not track trains. So at the airport station, send the station and the train rather than a flight number. If your day really does include both, tell us which comes first and we will quote them as two legs.",
        ar: "لا، والفرق عملي لا لفظي. فالنقل من المطار يُضبط على رقم رحلة جوية، وستون دقيقة الانتظار المشمولة موجودة لاستيعاب الجوازات والأمتعة. أما استقبال القطار فيُضبط على وقت الوصول الذي تعطينا إياه؛ ونحن لا نتتبّع القطارات. ففي محطة المطار أرسل المحطة والقطار لا رقم رحلة جوية. وإن جمع يومك الاثنين فعلًا، فأخبرنا أيّهما أولًا ونسعّرهما رحلتين.",
      },
    },
    {
      question: {
        en: "Can you take me from the Haramain station on to Makkah or Madinah?",
        ar: "هل يمكنكم نقلي من محطة الحرمين إلى مكة أو المدينة؟",
      },
      answer: {
        en: "Yes — that is a road journey like any other and it is quoted the same way. Worth a thought first, though: the Haramain line already reaches both holy cities, so if you are at a Jeddah station with a ticket in hand, the train may well be the better leg. We arrange the road journey and sell no rail tickets, so there is nothing in this for us either way.",
        ar: "نعم — فهي رحلة برية كغيرها وتُسعَّر بالطريقة نفسها. لكنها تستحق تفكيرًا أولًا: فخط الحرمين يصل إلى المدينتين المقدستين أصلًا، فإن كنت في محطة بجدة وبيدك تذكرة فقد يكون القطار هو الخيار الأفضل. ونحن نرتّب الرحلة البرية ولا نبيع تذاكر قطار، فلا مصلحة لنا في أي الخيارين.",
      },
    },
    {
      question: {
        en: "What happens if my train is late?",
        ar: "ماذا يحدث إن تأخر قطاري؟",
      },
      answer: {
        en: "Message us. Because we time a station pickup against the arrival time you gave us rather than against a live feed, a delay is something you have to tell us about — and once you do, we move the pickup. Sixty minutes of waiting time is included with your transfer and runs from the agreed time.",
        ar: "راسِلنا. فلأننا نضبط استقبال المحطة على وقت الوصول الذي أعطيتنا إياه لا على بثّ مباشر، فالتأخير شيء ينبغي أن تخبرنا به — وحين تفعل ننقل موعد الاستقبال. ومدة الانتظار المشمولة في رحلتك ستون دقيقة تبدأ من الوقت المتفق عليه.",
      },
    },
    {
      question: {
        en: "Do you sell Haramain train tickets?",
        ar: "هل تبيعون تذاكر قطار الحرمين؟",
      },
      answer: {
        en: "No. We arrange road transport only — not rail tickets, not flights, not hotels, and not Hajj or Umrah visas, permits or packages. Book the train with the operator and book the car with us; the two are independent, and that is also why we publish no train times or fares.",
        ar: "لا. نحن نرتّب النقل البري فقط — لا تذاكر القطار ولا الرحلات الجوية ولا الفنادق ولا تأشيرات الحج والعمرة أو تصاريحها أو برامجها. فاحجز القطار لدى المشغّل واحجز السيارة لدينا؛ فالأمران مستقلان، وهذا أيضًا سبب عدم نشرنا مواعيد القطارات أو أسعارها.",
      },
    },
    {
      question: {
        en: "Where exactly will the car be waiting at the station?",
        ar: "أين تنتظر السيارة بالضبط في المحطة؟",
      },
      answer: {
        en: "Confirmed in writing for your booking rather than published here. Where a car may wait at a railway station is set by the station and by whoever is managing it that day, not by us, and a meeting point printed on a web page is exactly the kind of detail that goes quietly out of date. You get the arrangement in your booking confirmation and a number to call on the day.",
        ar: "يُؤكَّد كتابةً لحجزك لا يُنشر هنا. فموضع انتظار السيارة في محطة قطار تحدده المحطة ومن يديرها ذلك اليوم لا نحن، ونقطة التقاء مطبوعة في صفحة ويب هي بالضبط نوع التفاصيل التي تَقدُم بصمت. وتصلك الترتيبات في رسالة تأكيد الحجز ومعها رقم للاتصال في اليوم نفسه.",
      },
    },
  ] as ClusterFaq[],

  // --- CTA and related ----------------------------------------------------

  cta: {
    eyebrow: { en: "Read the line, then send it", ar: "اقرأ السطر ثم أرسله" },
    heading: {
      en: "Tell us the station and we will do the rest",
      ar: "أخبرنا بالمحطة ونتولّى الباقي",
    },
    body: {
      en: "The station, the direction, the date and time from your ticket, and the full address at the other end. We reply with a written price and the station stated back to you.",
      ar: "المحطة والاتجاه والتاريخ والوقت من تذكرتك والعنوان الكامل في الطرف الآخر. ونرد بسعر مكتوب وبذكر المحطة إليك.",
    },
    button: { en: "Request a quotation", ar: "اطلب عرض سعر" },
  } as ClusterCta,

  relatedHeading: { en: "Related journeys", ar: "رحلات ذات صلة" },

  related: [
    {
      routeKey: "jeddah",
      label: { en: "Private transfers in Jeddah", ar: "توصيل خاص في جدة" },
      note: {
        en: "The city hub: where people go from Jeddah, and the entry rules that apply before they get there.",
        ar: "مركز المدينة: إلى أين يتجه الناس من جدة، وشروط الدخول السارية قبل الوصول.",
      },
    },
    {
      routeKey: "jeddahAirport",
      label: { en: "Jeddah airport transfers", ar: "النقل من مطار جدة" },
      note: {
        en: "For meeting a flight at King Abdulaziz — a different job from meeting a train there, and timed against a flight number.",
        ar: "لاستقبال رحلة جوية في الملك عبدالعزيز — مهمة تختلف عن استقبال قطار هناك، وتُضبط على رقم الرحلة.",
      },
    },
    {
      routeKey: "jeddahHotel",
      label: { en: "Jeddah hotel transfers", ar: "النقل من فنادق جدة" },
      note: {
        en: "The other end of most station journeys: a hotel address in a city that runs for kilometres.",
        ar: "الطرف الآخر لمعظم رحلات المحطة: عنوان فندق في مدينة تمتد كيلومترات.",
      },
    },
    {
      routeKey: "jeddahToMakkah",
      label: { en: "Jeddah to Makkah", ar: "من جدة إلى مكة" },
      note: {
        en: "By road instead of by rail: the entry rules, the 80–100 km drive and drop-off near the Haram.",
        ar: "برًّا بدل القطار: شروط الدخول وطريق 80–100 كم ومكان النزول قرب الحرم.",
      },
    },
    {
      routeKey: "jeddahToMadinah",
      label: { en: "Jeddah to Madinah", ar: "من جدة إلى المدينة" },
      note: {
        en: "The road north, and an honest account of when the Haramain train beats it.",
        ar: "الطريق شمالًا، وبيان صادق لمتى يتفوق عليه قطار الحرمين.",
      },
    },
    {
      routeKey: "riyadhRailway",
      label: { en: "Riyadh railway station transfers", ar: "النقل من محطات قطار الرياض" },
      note: {
        en: "A different railway and the opposite problem: there, two stations on two lines going to two different places.",
        ar: "سكة أخرى ومشكلة معاكسة: فهناك محطتان على خطين يؤديان إلى وجهتين مختلفتين.",
      },
    },
  ] as RelatedLink[],
};
