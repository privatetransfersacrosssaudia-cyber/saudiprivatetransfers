import type { Bilingual } from "@/lib/i18n/config";
import type {
  ClusterCta,
  ClusterFaq,
  RelatedLink,
} from "@/lib/content/riyadh/types";
import type { RouteKey } from "@/lib/i18n/routes";
import type { SiteImageKey } from "@/lib/site-images";

/**
 * Umrah private transfers.
 *
 * The one page on this site that is organised around a **trip** rather than a
 * place or a road. Every other page owns a single segment competently — the
 * arrival from Jeddah, the road north, the airport at Madinah — and none of
 * them owns the chain. An Umrah journey is four to six road legs that have to
 * line up, and the thing that actually goes wrong is booking them one at a
 * time and discovering a gap on the third day.
 *
 * So the page is built as a **shape picker**: four itineraries that cover
 * almost every Umrah trip, each showing its legs in order, each leg linking to
 * the page that already describes it in full, and each shape carrying its own
 * quotation link with the right pickup and destination prefilled. Someone
 * recognises their own trip in one of the four, and the next click is an
 * enquiry rather than more reading.
 *
 * It is a lead-generation page, not a guide. There is deliberately nothing
 * here about rituals, Ihram, Ziyarat sites or what to pack: those belong to
 * the Ministry of Hajj and Umrah or a group organiser, and a transport company
 * writing them is padding. Every section is meant to move a booking decision
 * along.
 *
 * **Owner-confirmed facts this page rests on**, and nothing beyond them:
 *
 * - An approved transport provider with Nusuk/Masar. Stated plainly and
 *   bounded in the same breath — it is a transport registration, not a Hajj
 *   operator licence, and it does not issue permits, visas or access to
 *   restricted areas. `provider.limits` carries that boundary.
 * - Groups are handled by coordinating more than one vehicle where needed.
 *   No fleet size, no seat ceiling and no ownership claim: the page says what
 *   happens, not what we own.
 * - Eligible transfers can be arranged during the Hajj restriction period,
 *   subject to the official restrictions in force, permits and each
 *   passenger's own eligibility. Written as a conditional, never a promise.
 * - **No Mina, Arafat or Muzdalifah.** Stated outright rather than left to
 *   inference, because that is the single most likely wrong assumption a
 *   reader arrives with.
 *
 * No prices, no availability guarantees, no vehicle specifications, no
 * operating hours, no additional partnerships, and no legal penalties quoted:
 * the regulatory detail on this page is limited to what the site already
 * publishes elsewhere and what the owner has confirmed.
 *
 * `imageKey` is `svc-umrah`, the project's existing Umrah service image.
 */

/** One itinerary shape, with its legs in travel order. */
export type TripShape = {
  /** Stable key; also the anchor id. */
  key: string;
  name: Bilingual<string>;
  /** Who this shape suits, in one line. */
  who: Bilingual<string>;
  legs: {
    from: Bilingual<string>;
    to: Bilingual<string>;
    /** Only where a published page actually covers this leg. */
    routeKey?: RouteKey;
  }[];
  /** Prefills the quotation form for this shape. */
  prefill: { pickup: Bilingual<string>; dropoff: Bilingual<string> };
  ctaLabel: Bilingual<string>;
  /** Visually weighted above the others — at most one. */
  common?: boolean;
};

export const umrah = {
  routeKey: "umrahTransfers" as RouteKey,
  imageKey: "svc-umrah" as SiteImageKey,

  seo: {
    title: {
      en: "Umrah Transfers | Private Car, Jeddah, Makkah, Madinah",
      ar: "نقل العمرة | سيارة خاصة بين جدة ومكة والمدينة",
    },
    description: {
      en: "Private transfers for an Umrah trip, booked as one arrangement: Jeddah airport to your Makkah hotel, the road to Madinah, and the departure run. Send your itinerary for a written quotation.",
      ar: "نقل خاص لرحلة العمرة يُحجز ترتيبًا واحدًا: من مطار جدة إلى فندقك في مكة المكرمة، والطريق إلى المدينة المنورة، ورحلة المغادرة. أرسل برنامج رحلتك واحصل على عرض سعر مكتوب.",
    },
  },

  crumbLabel: { en: "Umrah transfers", ar: "نقل العمرة" },

  // --- Hero ---------------------------------------------------------------

  eyebrow: { en: "Private transport for Umrah", ar: "نقل خاص للعمرة" },
  title: {
    en: "Your Umrah travel, arranged as one journey",
    ar: "تنقّلات عمرتك مُرتَّبة رحلةً واحدة",
  },
  standfirst: {
    en: "Most Umrah trips are four or five separate car journeys — the airport to your Makkah hotel, the road north to Madinah, the run back to a terminal. Booked one at a time, they are four chances for something not to turn up. Send us the whole itinerary and we quote it as one arrangement, with every leg confirmed in writing before you travel.",
    ar: "معظم رحلات العمرة أربع أو خمس رحلات بالسيارة منفصلة — من المطار إلى فندقك في مكة المكرمة، والطريق شمالًا إلى المدينة المنورة، والعودة إلى صالة السفر. وحين تُحجز واحدةً تلو الأخرى تصبح أربع فرص لأن يتخلّف شيء. أرسل لنا البرنامج كاملًا ونسعّره ترتيبًا واحدًا، وكل مرحلة مؤكَّدة كتابةً قبل سفرك.",
  },

  primaryCta: { en: "Request a quotation", ar: "اطلب عرض سعر" },
  secondaryCta: { en: "Find your itinerary", ar: "اعثر على برنامجك" },

  /** Three short proof points under the hero. Facts, not slogans. */
  heroPoints: [
    {
      en: "An approved transport provider with Nusuk/Masar",
      ar: "مزوّد نقل معتمد لدى نسك/مسار",
    },
    {
      en: "Every leg quoted in writing before you travel",
      ar: "كل مرحلة مُسعَّرة كتابةً قبل سفرك",
    },
    {
      en: "Families and groups: more vehicles coordinated together",
      ar: "للعائلات والمجموعات: تنسيق أكثر من مركبة معًا",
    },
  ],

  // --- The signature element: itinerary shapes ----------------------------

  shapes: {
    heading: { en: "Which of these is your trip?", ar: "أيٌّ من هذه رحلتك؟" },
    lead: {
      en: "Nearly every Umrah itinerary is one of four shapes. Find yours, check the legs, and send it — you can change any of it in the enquiry.",
      ar: "تكاد كل برامج العمرة تكون واحدًا من أربعة أشكال. اعثر على شكل رحلتك، وراجع مراحلها، وأرسلها — ويمكنك تعديل أي جزء منها في الطلب.",
    },
    items: [
      {
        key: "jed-jed",
        name: { en: "In and out of Jeddah", ar: "الدخول والخروج من جدة" },
        who: {
          en: "The most common trip. You land at King Abdulaziz, go to Makkah first, then Madinah, then back to the same airport.",
          ar: "الرحلة الأكثر شيوعًا. تهبط في مطار الملك عبدالعزيز، فتتوجه إلى مكة المكرمة أولًا، ثم المدينة المنورة، ثم تعود إلى المطار نفسه.",
        },
        legs: [
          {
            from: { en: "Jeddah airport", ar: "مطار جدة" },
            to: { en: "Makkah hotel", ar: "فندق في مكة" },
            routeKey: "jeddahToMakkah" as RouteKey,
          },
          {
            from: { en: "Makkah", ar: "مكة المكرمة" },
            to: { en: "Madinah", ar: "المدينة المنورة" },
            routeKey: "makkahToMadinah" as RouteKey,
          },
          {
            from: { en: "Madinah", ar: "المدينة المنورة" },
            to: { en: "Jeddah airport", ar: "مطار جدة" },
            routeKey: "jeddahToMadinah" as RouteKey,
          },
        ],
        prefill: {
          pickup: { en: "Jeddah airport (Umrah trip)", ar: "مطار جدة (رحلة عمرة)" },
          dropoff: {
            en: "Makkah hotel, then Madinah, then back to Jeddah airport",
            ar: "فندق في مكة، ثم المدينة المنورة، ثم العودة إلى مطار جدة",
          },
        },
        ctaLabel: { en: "Quote this itinerary", ar: "سعّر هذا البرنامج" },
        common: true,
      },
      {
        key: "jed-med",
        name: { en: "Jeddah in, Madinah out", ar: "الدخول من جدة والخروج من المدينة" },
        who: {
          en: "Makkah first, then north to Madinah, and you fly home from Prince Mohammad bin Abdulaziz rather than returning south.",
          ar: "مكة المكرمة أولًا، ثم شمالًا إلى المدينة المنورة، وتسافر عائدًا من مطار الأمير محمد بن عبدالعزيز بدل الرجوع جنوبًا.",
        },
        legs: [
          {
            from: { en: "Jeddah airport", ar: "مطار جدة" },
            to: { en: "Makkah hotel", ar: "فندق في مكة" },
            routeKey: "jeddahToMakkah" as RouteKey,
          },
          {
            from: { en: "Makkah", ar: "مكة المكرمة" },
            to: { en: "Madinah", ar: "المدينة المنورة" },
            routeKey: "makkahToMadinah" as RouteKey,
          },
          {
            from: { en: "Madinah hotel", ar: "فندق في المدينة" },
            to: { en: "Madinah airport", ar: "مطار المدينة" },
            routeKey: "madinahAirport" as RouteKey,
          },
        ],
        prefill: {
          pickup: { en: "Jeddah airport (Umrah trip)", ar: "مطار جدة (رحلة عمرة)" },
          dropoff: {
            en: "Makkah hotel, then Madinah, departing from Madinah airport",
            ar: "فندق في مكة، ثم المدينة المنورة، والمغادرة من مطار المدينة",
          },
        },
        ctaLabel: { en: "Quote this itinerary", ar: "سعّر هذا البرنامج" },
      },
      {
        key: "med-jed",
        name: { en: "Madinah in, Jeddah out", ar: "الدخول من المدينة والخروج من جدة" },
        who: {
          en: "Madinah first — often the quieter way to start — then south to Makkah, and home from Jeddah.",
          ar: "المدينة المنورة أولًا — وهي غالبًا البداية الأهدأ — ثم جنوبًا إلى مكة المكرمة، والعودة من جدة.",
        },
        legs: [
          {
            from: { en: "Madinah airport", ar: "مطار المدينة" },
            to: { en: "Madinah hotel", ar: "فندق في المدينة" },
            routeKey: "madinahAirport" as RouteKey,
          },
          {
            from: { en: "Madinah", ar: "المدينة المنورة" },
            to: { en: "Makkah", ar: "مكة المكرمة" },
            routeKey: "makkahToMadinah" as RouteKey,
          },
          {
            from: { en: "Makkah", ar: "مكة المكرمة" },
            to: { en: "Jeddah airport", ar: "مطار جدة" },
            routeKey: "jeddahToMakkah" as RouteKey,
          },
        ],
        prefill: {
          pickup: { en: "Madinah airport (Umrah trip)", ar: "مطار المدينة (رحلة عمرة)" },
          dropoff: {
            en: "Madinah hotel, then Makkah, departing from Jeddah airport",
            ar: "فندق في المدينة، ثم مكة المكرمة، والمغادرة من مطار جدة",
          },
        },
        ctaLabel: { en: "Quote this itinerary", ar: "سعّر هذا البرنامج" },
      },
      {
        key: "overland",
        name: { en: "Overland from Riyadh or the east", ar: "برًّا من الرياض أو الشرق" },
        who: {
          en: "No flight at all. Residents and GCC travellers driving in, where the whole trip is road and the distances are long enough to plan properly.",
          ar: "بلا رحلة جوية أصلًا. للمقيمين ومسافري الخليج القادمين برًّا، حيث تكون الرحلة كلها برية والمسافات طويلة بما يستحق تخطيطًا جادًّا.",
        },
        legs: [
          {
            from: { en: "Riyadh", ar: "الرياض" },
            to: { en: "Makkah", ar: "مكة المكرمة" },
            routeKey: "riyadhToMakkah" as RouteKey,
          },
          {
            from: { en: "Makkah", ar: "مكة المكرمة" },
            to: { en: "Madinah", ar: "المدينة المنورة" },
            routeKey: "makkahToMadinah" as RouteKey,
          },
          {
            from: { en: "Madinah", ar: "المدينة المنورة" },
            to: { en: "Riyadh", ar: "الرياض" },
            routeKey: "riyadhToMadinah" as RouteKey,
          },
        ],
        prefill: {
          pickup: { en: "Riyadh (Umrah trip, overland)", ar: "الرياض (رحلة عمرة برًّا)" },
          dropoff: {
            en: "Makkah, then Madinah, then back to Riyadh",
            ar: "مكة المكرمة، ثم المدينة المنورة، ثم العودة إلى الرياض",
          },
        },
        ctaLabel: { en: "Quote this itinerary", ar: "سعّر هذا البرنامج" },
      },
    ] as TripShape[],
    footnote: {
      en: "None of these quite right? Send the itinerary you actually have — extra nights, a different airport, someone joining late. We quote what you send, not a template.",
      ar: "لا يناسبك أيٌّ منها تمامًا؟ أرسل البرنامج الذي لديك فعلًا — ليالٍ إضافية، أو مطار مختلف، أو شخص يلتحق متأخرًا. فنحن نسعّر ما ترسله لا قالبًا جاهزًا.",
    },
  },

  // --- Why one arrangement ------------------------------------------------

  coordinated: {
    heading: {
      en: "Why we quote the whole trip at once",
      ar: "لماذا نسعّر الرحلة كلها دفعةً واحدة",
    },
    lead: {
      en: "It is not a packaging trick. Quoting the legs together changes what we can actually do for you.",
      ar: "ليست حيلة تجارية. فتسعير المراحل معًا يغيّر ما نستطيع فعله لك فعلًا.",
    },
    points: [
      {
        title: { en: "The legs know about each other", ar: "كل مرحلة تعرف ما قبلها" },
        body: {
          en: "Your Madinah departure is set from your flight, and your Makkah pickup is set from when you actually want to leave. When each leg is booked separately by a different person, that is exactly where the gaps appear.",
          ar: "فموعد مغادرتك من المدينة المنورة يُضبط على رحلتك الجوية، وموعد انطلاقك من مكة يُضبط على الوقت الذي تريد المغادرة فيه حقًّا. وحين يحجز كل مرحلة شخص مختلف، فهناك بالضبط تنشأ الفجوات.",
        },
      },
      {
        title: { en: "One written quotation", ar: "عرض سعر مكتوب واحد" },
        body: {
          en: "Every leg, its vehicle and its timing on one document you can read before deciding anything — rather than four conversations and a number at the end of each.",
          ar: "كل مرحلة ومركبتها وتوقيتها في مستند واحد تقرؤه قبل أن تقرر شيئًا — بدل أربع محادثات ورقم في نهاية كل منها.",
        },
      },
      {
        title: { en: "One number to call", ar: "رقم واحد للاتصال" },
        body: {
          en: "If a flight moves or the group splits, you tell us once and we move what needs moving. Changes are confirmed back to you in writing.",
          ar: "وإن تغيّر موعد رحلة أو انقسمت المجموعة، تخبرنا مرة واحدة ونعدّل ما يلزم تعديله. وتُؤكَّد التغييرات إليك كتابةً.",
        },
      },
    ],
  },

  // --- Groups --------------------------------------------------------------

  groups: {
    heading: { en: "Families and larger groups", ar: "العائلات والمجموعات الكبيرة" },
    paragraphs: [
      {
        en: "Umrah parties are rarely two people with cabin bags. They are families with grandparents, children and a month's luggage, or a group travelling together from one mosque or one city.",
        ar: "نادرًا ما تكون مجموعات العمرة شخصين بحقيبتي يد. بل عائلات فيها كبار السن والأطفال وأمتعة شهر، أو مجموعة مسافرة معًا من مسجد واحد أو مدينة واحدة.",
      },
      {
        en: "Where one vehicle will not hold a group, we coordinate more than one so the party travels together and arrives together. Tell us how many of you there are and how much luggage you are genuinely carrying, and the quotation sets out what is being sent. We do not publish a passenger ceiling — what is workable depends on the group, the luggage and the date, and we would rather confirm it for you than print a number that may not hold.",
        ar: "وحين لا تتسع مركبة واحدة للمجموعة، ننسّق أكثر من مركبة ليسافر الجميع معًا ويصلوا معًا. أخبرنا بعددكم وبالأمتعة التي تحملونها فعلًا، ويبيّن عرض السعر ما سيُرسَل. ولا ننشر حدًّا أقصى للركاب — فالممكن يعتمد على المجموعة والأمتعة والتاريخ، ونفضّل تأكيده لك على طباعة رقم قد لا يصمد.",
      },
    ],
  },

  // --- What we are, and what we are not ------------------------------------

  provider: {
    heading: { en: "What we are, and what we are not", ar: "ما نحن عليه وما لسنا عليه" },
    lead: {
      en: "Worth being exact about, because it decides which of your questions we can answer.",
      ar: "ويستحق الأمر دقة، لأنه يحدد أي أسئلتك نستطيع الإجابة عنها.",
    },
    are: {
      heading: { en: "What we are", ar: "ما نحن عليه" },
      items: [
        {
          en: "A private road transport company, approved as a transport provider with Nusuk/Masar.",
          ar: "شركة نقل بري خاص، معتمدة كمزوّد نقل لدى نسك/مسار.",
        },
        {
          en: "The people who move you between airports, hotels and the two holy cities, in a vehicle reserved for your party alone.",
          ar: "من ينقلك بين المطارات والفنادق والمدينتين المقدستين، في مركبة محجوزة لمجموعتك وحدها.",
        },
        {
          en: "Able to arrange eligible transfers during the Hajj restriction period, subject to the official restrictions in force at the time, the required permits, and each passenger's own eligibility to travel.",
          ar: "وقادرون على ترتيب الرحلات المؤهَّلة خلال فترة قيود الحج، رهنًا بالقيود الرسمية السارية حينها، والتصاريح المطلوبة، وأهلية كل راكب للسفر.",
        },
      ],
    },
    areNot: {
      heading: { en: "What we are not", ar: "ما لسنا عليه" },
      items: [
        {
          en: "An Umrah package operator. We do not sell programmes, accommodation or flights.",
          ar: "لسنا مشغّل برامج عمرة. فلا نبيع برامج ولا إقامة ولا تذاكر طيران.",
        },
        {
          en: "A visa or permit service. Umrah permits are issued through Nusuk and are yours to arrange; we do not issue or obtain them.",
          ar: "ولسنا جهة تأشيرات أو تصاريح. فتصاريح العمرة تُصدَر عبر نسك وترتيبها عليك؛ ولا نُصدرها ولا نستخرجها.",
        },
        {
          en: "A source of religious guidance. Questions about Ihram, rites or timing belong to the Ministry of Hajj and Umrah or your group organiser.",
          ar: "ولسنا مرجعًا للإرشاد الديني. فأسئلة الإحرام والمناسك والتوقيت مردّها إلى وزارة الحج والعمرة أو منظّم مجموعتك.",
        },
        {
          en: "A transporter into Mina, Arafat or Muzdalifah. We do not arrange journeys into the holy sites, in any season.",
          ar: "ولسنا ناقلًا إلى منى أو عرفات أو مزدلفة. فلا نرتّب رحلات إلى المشاعر المقدسة في أي موسم.",
        },
      ],
    },
    limits: {
      en: "Our Nusuk/Masar approval is an approval to provide transport, and nothing wider. It is not a Hajj operator licence, it does not issue anyone a permit or a visa, and it does not by itself authorise entry to a restricted area. What applies to your journey is confirmed for your dates before we quote it.",
      ar: "واعتمادنا لدى نسك/مسار اعتماد لتقديم النقل، لا أكثر. فليس ترخيص مشغّل حج، ولا يمنح أحدًا تصريحًا ولا تأشيرة، ولا يُجيز بذاته دخول منطقة مقيَّدة. وما ينطبق على رحلتك يُؤكَّد لتواريخك قبل التسعير.",
    },
  },

  // --- Entry and season ----------------------------------------------------

  access: {
    heading: { en: "Entry, and what changes around Hajj", ar: "الدخول وما يتغير حول موسم الحج" },
    paragraphs: [
      {
        en: "Entry to Makkah is restricted to Muslims, and it is enforced at checkpoints on the roads into the city. We accept journeys into Makkah only for passengers who may legally enter on their travel date. If anyone in your party may not, tell us before you book and we will quote the parts of the trip that are open to you instead.",
        ar: "دخول مكة المكرمة مقصور على المسلمين، ويُطبَّق عند نقاط التفتيش على الطرق المؤدية إلى المدينة. ولا نقبل الرحلات إلى داخل مكة إلا لركاب يحق لهم الدخول نظامًا في تاريخ سفرهم. فإن كان أحد أفراد مجموعتك لا يحق له ذلك، فأخبرنا قبل الحجز ونسعّر لك أجزاء الرحلة المتاحة لك بدلًا من ذلك.",
      },
      {
        en: "Around the Hajj season the authorities announce additional restrictions, and in recent seasons these have included periods when Umrah permits were paused and Makkah entry was limited. Dates follow the Hijri calendar and are announced each year, so there is no fixed window we can print. We can arrange eligible transfers in that period, and what is eligible depends on the restrictions in force on your date — which we check and confirm before quoting rather than after you have booked.",
        ar: "وحول موسم الحج تُعلن الجهات المختصة قيودًا إضافية، وقد شملت في مواسم قريبة فتراتٍ أُوقف فيها إصدار تصاريح العمرة وقُيِّد فيها دخول مكة. وتتبع التواريخ التقويم الهجري وتُعلَن كل عام، فلا نافذة ثابتة نستطيع طباعتها. ونحن نستطيع ترتيب الرحلات المؤهَّلة في تلك الفترة، والمؤهَّل منها يعتمد على القيود السارية في تاريخك — وهو ما نتحقق منه ونؤكده قبل التسعير لا بعد حجزك.",
      },
      {
        en: "The current official announcement for your travel date is the one that counts, not anything written on a transport company's website. Check it, and send us your dates either way.",
        ar: "والإعلان الرسمي الساري لتاريخ سفرك هو المعتبَر، لا ما هو مكتوب في موقع شركة نقل. فتحقق منه، وأرسل إلينا تواريخك في الحالين.",
      },
    ],
  },

  // --- How booking works ---------------------------------------------------

  process: {
    heading: { en: "How a booking actually happens", ar: "كيف يتم الحجز فعليًا" },
    lead: {
      en: "Four steps, and nothing is reserved until the last one.",
      ar: "أربع خطوات، ولا يُحجز شيء إلا عند آخرها.",
    },
    steps: [
      {
        title: { en: "You send the itinerary", ar: "ترسل البرنامج" },
        body: {
          en: "The legs you want, the dates, how many passengers and what luggage. No payment details and no account to create.",
          ar: "المراحل التي تريدها والتواريخ وعدد الركاب والأمتعة. بلا بيانات دفع وبلا حساب تنشئه.",
        },
      },
      {
        title: { en: "We check it", ar: "نتحقق منه" },
        body: {
          en: "Availability for your dates, the vehicles the group needs, and the restrictions that apply to your travel date.",
          ar: "التوافر في تواريخك، والمركبات التي تحتاجها المجموعة، والقيود المنطبقة على تاريخ سفرك.",
        },
      },
      {
        title: { en: "You get a written quotation", ar: "تصلك عرض سعر مكتوب" },
        body: {
          en: "Every leg, its vehicle class and its timing, with a price. You read it and decide — there is no hold on you at this point.",
          ar: "كل مرحلة وفئة مركبتها وتوقيتها، ومعها السعر. تقرؤه وتقرر — ولا التزام عليك في هذه المرحلة.",
        },
      },
      {
        title: { en: "We confirm the booking", ar: "نؤكد الحجز" },
        body: {
          en: "You accept, and your transfers are confirmed only when we send a booking confirmation saying so. Accepting a quotation is not by itself a confirmed booking.",
          ar: "تقبل العرض، ولا تتأكد رحلاتك إلا عندما نرسل رسالة تأكيد حجز تنص على ذلك. فقبول عرض السعر ليس بذاته حجزًا مؤكدًا.",
        },
      },
    ],
    note: {
      en: "Sending an enquiry does not confirm a booking and does not hold a vehicle for your dates. Nothing is reserved and no payment is taken on this website.",
      ar: "وإرسال الطلب لا يؤكد حجزًا ولا يحجز مركبة لتواريخك. ولا يُحجز شيء ولا يُستوفى أي مبلغ عبر هذا الموقع.",
    },
  },

  // --- What to send --------------------------------------------------------

  sending: {
    heading: { en: "What to put in the enquiry", ar: "ما تضعه في الطلب" },
    lead: {
      en: "The more of this you send, the closer the first quotation is to the final one.",
      ar: "وكلما أرسلت أكثر من هذا، اقترب عرض السعر الأول من النهائي.",
    },
    items: [
      {
        en: "Your arrival flight number and the airport, and the same for your departure.",
        ar: "رقم رحلة وصولك والمطار، ومثلها لمغادرتك.",
      },
      {
        en: "The hotel name and address in each city — the brand alone is not enough, since several share a name.",
        ar: "اسم الفندق وعنوانه في كل مدينة — فالعلامة التجارية وحدها لا تكفي، إذ يتشارك عدة فنادق الاسم نفسه.",
      },
      {
        en: "Which day you want to move between the cities, and roughly what time you would like to set off.",
        ar: "اليوم الذي تريد الانتقال فيه بين المدينتين، وتقريبًا الوقت الذي تود الانطلاق فيه.",
      },
      {
        en: "How many passengers, including children, and how many suitcases you are actually travelling with.",
        ar: "عدد الركاب ومنهم الأطفال، وعدد الحقائب التي تسافر بها فعلًا.",
      },
      {
        en: "Anything that changes the vehicle: a wheelchair, a pushchair, a passenger who cannot manage steps.",
        ar: "وكل ما يغيّر نوع المركبة: كرسي متحرك، أو عربة طفل، أو راكب لا يستطيع صعود الدرجات.",
      },
    ],
  },

  // --- Vehicles ------------------------------------------------------------

  vehicles: {
    heading: { en: "Vehicles", ar: "المركبات" },
    lead: {
      en: "Chosen on your party and your luggage, and stated by class in the quotation. For a group that needs more than one, they are coordinated to travel together.",
      ar: "تُختار بحسب مجموعتك وأمتعتك، وتُذكر فئتها في عرض السعر. وللمجموعة التي تحتاج أكثر من واحدة، تُنسَّق المركبات للسفر معًا.",
    },
    slugs: ["sedan", "suv", "van", "minibus"],
    footnote: {
      en: "Models and makes vary by availability; the class is what is confirmed in your quotation.",
      ar: "وتتفاوت الموديلات والطرز بحسب التوافر؛ والفئة هي ما يُؤكَّد في عرض سعرك.",
    },
  },

  // --- FAQs ----------------------------------------------------------------

  faqHeading: { en: "Common questions", ar: "الأسئلة الشائعة" },

  faqs: [
    {
      question: {
        en: "Can you arrange all the transfers for an Umrah trip?",
        ar: "هل يمكنكم ترتيب جميع تنقّلات رحلة العمرة؟",
      },
      answer: {
        en: "Yes — the arrival from Jeddah or Madinah airport, the hotel runs, the road between the two holy cities and the departure leg, quoted as one arrangement. Send the whole itinerary in a single enquiry and you get one written quotation covering every leg, rather than arranging each one separately.",
        ar: "نعم — الوصول من مطار جدة أو المدينة، والتنقل بين الفنادق، والطريق بين المدينتين المقدستين، ورحلة المغادرة، وتُسعَّر ترتيبًا واحدًا. أرسل البرنامج كاملًا في طلب واحد فيصلك عرض سعر مكتوب واحد يغطي كل مرحلة، بدل ترتيب كل منها على حدة.",
      },
    },
    {
      question: {
        en: "Do you arrange Umrah permits, visas or packages?",
        ar: "هل ترتّبون تصاريح العمرة أو التأشيرات أو البرامج؟",
      },
      answer: {
        en: "No. We arrange road transport only. Umrah permits are issued through Nusuk and are yours to arrange, and we sell no programmes, accommodation or flights. We are an approved transport provider with Nusuk/Masar, which is an approval to provide transport — it does not make us a package operator and it does not issue anyone a permit.",
        ar: "لا. نحن نرتّب النقل البري فقط. وتصاريح العمرة تُصدَر عبر نسك وترتيبها عليك، ولا نبيع برامج ولا إقامة ولا تذاكر طيران. ونحن مزوّد نقل معتمد لدى نسك/مسار، وهو اعتماد لتقديم النقل — لا يجعلنا مشغّل برامج ولا يمنح أحدًا تصريحًا.",
      },
    },
    {
      question: {
        en: "We are a family of nine. Can you still take us together?",
        ar: "نحن عائلة من تسعة أفراد. هل يمكنكم نقلنا معًا؟",
      },
      answer: {
        en: "Where one vehicle will not hold the party, we coordinate more than one so you travel together and arrive together. Tell us the number of passengers, including children, and the luggage you are genuinely carrying; the quotation then sets out what is being sent. We do not publish a passenger ceiling, because what works depends on the group, the luggage and the date.",
        ar: "حين لا تتسع مركبة واحدة للمجموعة، ننسّق أكثر من واحدة لتسافروا معًا وتصلوا معًا. أخبرنا بعدد الركاب ومنهم الأطفال، وبالأمتعة التي تحملونها فعلًا؛ فيبيّن عرض السعر ما سيُرسَل. ولا ننشر حدًّا أقصى للركاب، لأن الممكن يعتمد على المجموعة والأمتعة والتاريخ.",
      },
    },
    {
      question: {
        en: "Do you drive to Mina, Arafat or Muzdalifah?",
        ar: "هل تنقلون إلى منى أو عرفات أو مزدلفة؟",
      },
      answer: {
        en: "No. We do not arrange journeys into the holy sites, in any season. What we cover is transport between airports, hotels and the cities — the arrival, the road between Makkah and Madinah, the hotel runs and the departure.",
        ar: "لا. فلا نرتّب رحلات إلى المشاعر المقدسة في أي موسم. وما نغطيه هو النقل بين المطارات والفنادق والمدن — الوصول، والطريق بين مكة والمدينة، والتنقل بين الفنادق، والمغادرة.",
      },
    },
    {
      question: {
        en: "Can you still arrange transfers during the Hajj period?",
        ar: "هل يمكنكم ترتيب النقل خلال فترة الحج؟",
      },
      answer: {
        en: "We can arrange eligible transfers in that period, subject to the official restrictions in force at the time, the required permits and each passenger's own eligibility. Around the Hajj season the authorities announce additional restrictions, and in recent seasons those have included periods when Umrah permits were paused and Makkah entry was limited. Dates follow the Hijri calendar and change each year, so send us your dates and we will confirm what is possible before quoting.",
        ar: "نستطيع ترتيب الرحلات المؤهَّلة في تلك الفترة، رهنًا بالقيود الرسمية السارية حينها والتصاريح المطلوبة وأهلية كل راكب. وحول موسم الحج تُعلن الجهات المختصة قيودًا إضافية، شملت في مواسم قريبة فتراتٍ أُوقف فيها إصدار تصاريح العمرة وقُيِّد دخول مكة. وتتبع التواريخ التقويم الهجري وتتغير كل عام، فأرسل تواريخك ونؤكد ما هو ممكن قبل التسعير.",
      },
    },
    {
      question: {
        en: "Will the car reach our hotel door in Makkah?",
        ar: "هل تصل السيارة إلى باب فندقنا في مكة؟",
      },
      answer: {
        en: "It depends on the hotel. Vehicle access around the Grand Mosque is controlled and it is not the same for every property: some allow a car to the entrance, others are reached on foot from the nearest permitted point. Which applies to yours is confirmed in writing when the journey is arranged, so send the hotel name and its address rather than the brand alone.",
        ar: "يعتمد على الفندق. فدخول المركبات حول المسجد الحرام منظَّم ولا يتساوى فيه كل فندق: بعضها يسمح بوصول السيارة إلى المدخل، وبعضها لا يُوصَل إليه إلا مشيًا من أقرب نقطة مسموح بها. ويُؤكَّد ما ينطبق على فندقك كتابةً عند ترتيب الرحلة، فأرسل اسم الفندق وعنوانه لا العلامة التجارية وحدها.",
      },
    },
    {
      question: {
        en: "Our flight is delayed. What happens to the pickup?",
        ar: "تأخرت رحلتنا. ماذا يحدث لموعد الاستقبال؟",
      },
      answer: {
        en: "Airport pickups are set against your flight number rather than a clock time, so the driver follows the aircraft and a delay moves the pickup instead of stranding it. Send the flight number with your enquiry — it is the single most useful thing in it. For a hotel or city pickup there is no flight to follow, so a message from you is what moves it.",
        ar: "تُضبط مواعيد الاستقبال في المطار على رقم رحلتك لا على توقيت الساعة، فيتبع السائق الطائرة ويُزيح التأخيرُ الموعدَ بدل أن يتركه عالقًا. فأرسل رقم الرحلة مع طلبك — فهو أنفع ما فيه. أما الاستقبال من فندق أو داخل المدينة فلا رحلة جوية تُتبَع، فرسالة منك هي ما يُزيح الموعد.",
      },
    },
    {
      question: {
        en: "Is the Haramain train better than driving between Makkah and Madinah?",
        ar: "هل قطار الحرمين أفضل من السيارة بين مكة والمدينة؟",
      },
      answer: {
        en: "For one or two people travelling light, often yes, and we will say so rather than pretend otherwise — we sell no rail tickets, so there is nothing in it for us either way. The car tends to win for families, for real Umrah luggage, for a hotel that is not near a station, and for anyone who would rather not change mode partway. Our Makkah to Madinah page sets the two side by side honestly.",
        ar: "لشخص أو شخصين بأمتعة خفيفة، نعم غالبًا، ونقولها بدل ادّعاء غير ذلك — فنحن لا نبيع تذاكر قطار، ولا مصلحة لنا في أي الخيارين. أما السيارة فتتفوق عادةً للعائلات، ولأمتعة العمرة الحقيقية، ولفندق بعيد عن محطة، ولمن يفضّل ألا يغيّر وسيلته في منتصف الطريق. وصفحتنا عن الطريق بين مكة والمدينة تضع الخيارين جنبًا إلى جنب بصدق.",
      },
    },
  ] as ClusterFaq[],

  // --- CTA and related ------------------------------------------------------

  cta: {
    eyebrow: { en: "One itinerary, one quotation", ar: "برنامج واحد وعرض سعر واحد" },
    heading: {
      en: "Send us your Umrah itinerary",
      ar: "أرسل إلينا برنامج عمرتك",
    },
    body: {
      en: "The flights, the hotels, the dates and how many of you. We check it against your travel date, then reply with one written quotation covering every leg.",
      ar: "الرحلات الجوية والفنادق والتواريخ وعددكم. نتحقق منها وفق تاريخ سفرك، ثم نرد بعرض سعر مكتوب واحد يغطي كل مرحلة.",
    },
    button: { en: "Request a quotation", ar: "اطلب عرض سعر" },
  } as ClusterCta,

  relatedHeading: { en: "The legs in detail", ar: "المراحل بالتفصيل" },

  related: [
    {
      routeKey: "jeddahToMakkah",
      label: { en: "Jeddah to Makkah", ar: "من جدة إلى مكة" },
      note: {
        en: "The arrival leg in full: the 80–100 km road, the entry rules, and hotel drop-off near the Haram.",
        ar: "رحلة الوصول كاملة: طريق 80–100 كم، وشروط الدخول، والنزول عند الفنادق قرب الحرم.",
      },
    },
    {
      routeKey: "makkahToMadinah",
      label: { en: "Makkah to Madinah", ar: "من مكة إلى المدينة" },
      note: {
        en: "The road between the two holy cities, both directions, with an honest comparison against the Haramain train.",
        ar: "الطريق بين المدينتين المقدستين في الاتجاهين، مع مقارنة صادقة بقطار الحرمين.",
      },
    },
    {
      routeKey: "madinahAirport",
      label: { en: "Madinah airport transfers", ar: "النقل من مطار المدينة" },
      note: {
        en: "Prince Mohammad bin Abdulaziz: arrivals timed to your flight, departures worked back from check-in.",
        ar: "مطار الأمير محمد بن عبدالعزيز: استقبال مضبوط على رحلتك، ومغادرة محسوبة من موعد إجراءات السفر.",
      },
    },
    {
      routeKey: "jeddahAirport",
      label: { en: "Jeddah airport transfers", ar: "النقل من مطار جدة" },
      note: {
        en: "King Abdulaziz in detail: which terminal, how arrivals are met, and the onward road to Makkah.",
        ar: "مطار الملك عبدالعزيز بالتفصيل: أي صالة، وكيف يُستقبل القادمون، والطريق إلى مكة.",
      },
    },
    {
      routeKey: "jeddahHotel",
      label: { en: "Jeddah hotel transfers", ar: "النقل من فنادق جدة" },
      note: {
        en: "If your trip includes a night in Jeddah before or after: the arrival, the city, and the leg onward.",
        ar: "إن تضمنت رحلتك ليلة في جدة قبل أو بعد: الوصول والمدينة والرحلة التالية.",
      },
    },
    {
      routeKey: "jeddahStation",
      label: { en: "Jeddah Haramain station transfers", ar: "النقل من محطات الحرمين بجدة" },
      note: {
        en: "If you take the train for one leg: Jeddah has two stations about 20 km apart, and your ticket names which.",
        ar: "إن استخدمت القطار في إحدى المراحل: لجدة محطتان يفصل بينهما نحو 20 كم، وتذكرتك تحدد أيّهما.",
      },
    },
    {
      routeKey: "makkah",
      label: { en: "Private transfers in Makkah", ar: "توصيل خاص في مكة المكرمة" },
      note: {
        en: "Once you are there: hotel access near the Haram, the Haramain station and journeys onward.",
        ar: "بعد وصولك: الدخول إلى الفنادق قرب الحرم، ومحطة قطار الحرمين، والرحلات التالية.",
      },
    },
    {
      routeKey: "madinah",
      label: { en: "Private transfers in Madinah", ar: "توصيل خاص في المدينة المنورة" },
      note: {
        en: "The central-area hotels, Ziyarat journeys, the airport and the station.",
        ar: "فنادق المنطقة المركزية، ورحلات الزيارة، والمطار والمحطة.",
      },
    },
  ] as RelatedLink[],
};
