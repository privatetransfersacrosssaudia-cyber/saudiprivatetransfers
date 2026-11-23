import type { Bilingual } from "@/lib/i18n/config";
import type {
  ClusterCta,
  ClusterFaq,
  RelatedLink,
} from "@/lib/content/riyadh/types";
import type { RouteKey } from "@/lib/i18n/routes";
import type { SiteImageKey } from "@/lib/site-images";

/**
 * Airport transfers — the service page above the four airport pages.
 *
 * **Concept: the handover.** Everything on this page is about one moment —
 * where a flight stops being a flight and becomes a car journey — and what
 * has to be true for that moment to work. It runs in both directions, and
 * the page is built as two facing pathways rather than one list of features:
 * an arrival is a flight you are waiting on, a departure is a clock you are
 * working back from, and they need different things from the traveller.
 *
 * This page does not repeat the airport pages. Those carry the terminal
 * detail, the local distances and the city's own quirks. This one carries
 * what is true at every Saudi airport — the handover, the flight number, the
 * vehicle question — and hands off to them by name.
 *
 * ## Claims, and what each rests on
 *
 * **Flight coordination is described as manual, because it is.** The
 * repository has no flight-tracking integration: `flight` is a free-text
 * field in `lib/inquiry/schema.ts` that is forwarded to the lead desk and
 * into the notification email, and nothing reads it automatically. The owner
 * confirmed the intent to watch flights and make contact before a transfer,
 * so the page says a person does that. It does not say "live tracking",
 * "real-time", "automatic" or "24/7", and it does not promise unlimited
 * waiting or that any pickup can be rescued — `coordination.limits` states
 * the opposite outright.
 *
 * **Sixty minutes of included waiting** is an existing published policy
 * across this site, so it is repeated here rather than invented.
 *
 * **Vehicles** come from `lib/content/vehicles.ts` verbatim: up to 3, 4, 7
 * and 14 passengers. Fourteen is the confirmed ceiling for one vehicle;
 * above that the page says more than one vehicle is coordinated, with no
 * total ceiling claimed and no fleet size, ownership or amenity implied.
 *
 * **No lead times, no journey durations and no prices.** How early to reach
 * an airport is the airline's rule, not ours, and the page says to ask them.
 *
 * ## Images
 *
 * Only genuine Saudi airport photography the project already holds, each
 * used once and captioned as the airport it actually shows: Jeddah's King
 * Abdulaziz terminal for the hero, King Khalid's concourse for arrivals and
 * its domestic departures hall for departures. The project holds no
 * photographs of vehicles, drivers or travellers, so none are implied —
 * showing a car we do not own beside a service claim would be the one kind
 * of image this page must not carry.
 */

/** One side of the handover: arrival or departure. */
export type Pathway = {
  key: "arrivals" | "departures";
  eyebrow: Bilingual<string>;
  heading: Bilingual<string>;
  lead: Bilingual<string>;
  imageKey: SiteImageKey;
  /** What a reader can ask for in this direction. */
  requests: Bilingual<string>[];
  /** What the enquiry needs from them, in this direction. */
  needs: { label: Bilingual<string>; detail: Bilingual<string> }[];
  /** The one thing that most often goes wrong, and the answer to it. */
  pivot: { heading: Bilingual<string>; body: Bilingual<string> };
  prefill: { pickup: Bilingual<string>; dropoff: Bilingual<string> };
  ctaLabel: Bilingual<string>;
};

export const airport = {
  routeKey: "airportTransfers" as RouteKey,
  imageKey: "svc-airport" as SiteImageKey,

  seo: {
    title: {
      en: "Airport Transfers Saudi Arabia | Private Car & Driver",
      ar: "النقل من المطارات في السعودية | سيارة خاصة مع سائق",
    },
    description: {
      en: "Private airport transfers across Saudi Arabia — arrivals met from your flight number, departures timed back from check-in, and one vehicle reserved for your party. Send your flight and address for a written quotation.",
      ar: "نقل خاص من مطارات السعودية وإليها — استقبال القادمين وفق رقم رحلتك، ومغادرة محسوبة من موعد إجراءات السفر، ومركبة محجوزة لمجموعتك وحدها. أرسل رحلتك وعنوانك واحصل على عرض سعر مكتوب.",
    },
  },

  crumbLabel: { en: "Airport transfers", ar: "النقل من المطارات" },

  // --- Hero ----------------------------------------------------------------

  eyebrow: { en: "Airport transfers across Saudi Arabia", ar: "النقل من المطارات في أنحاء السعودية" },
  title: {
    en: "The moment a flight becomes a car journey",
    ar: "اللحظة التي تتحول فيها الرحلة الجوية إلى رحلة بالسيارة",
  },
  standfirst: {
    en: "Everything about an airport transfer happens in one narrow window — you walk out with your bags, and either a car is there or it is not. This page is about making that window work: what we need from you, how your flight number is used, and what happens when the schedule moves.",
    ar: "كل ما في نقل المطار يحدث في نافذة ضيقة واحدة — تخرج بأمتعتك، فإما أن تجد السيارة أو لا. وهذه الصفحة عن إنجاح تلك النافذة: ما نحتاجه منك، وكيف يُستعمل رقم رحلتك، وماذا يحدث إذا تغيّر الموعد.",
  },

  primaryCta: { en: "Request a quotation", ar: "اطلب عرض سعر" },
  secondaryCta: { en: "Arriving or departing?", ar: "وصول أم مغادرة؟" },

  /** Quick entry to the four airports that have their own page. */
  heroAirports: {
    label: { en: "Airports with their own page", ar: "مطارات لها صفحاتها" },
    items: [
      { routeKey: "riyadhAirport" as RouteKey, name: { en: "Riyadh · RUH", ar: "الرياض · RUH" } },
      { routeKey: "jeddahAirport" as RouteKey, name: { en: "Jeddah · JED", ar: "جدة · JED" } },
      { routeKey: "madinahAirport" as RouteKey, name: { en: "Madinah · MED", ar: "المدينة · MED" } },
      { routeKey: "dammamAirport" as RouteKey, name: { en: "Dammam · DMM", ar: "الدمام · DMM" } },
    ],
  },

  // --- The two pathways -----------------------------------------------------

  pathways: {
    heading: { en: "Two directions, two different jobs", ar: "اتجاهان ومهمتان مختلفتان" },
    lead: {
      en: "An arrival and a departure look like the same transfer written backwards. They are not. One is timed off an aircraft we are waiting for; the other is timed off a clock you cannot miss, and they need different things from you.",
      ar: "يبدو الوصول والمغادرة رحلةً واحدة مكتوبة بالعكس. وليسا كذلك. فأحدهما يُضبط على طائرة ننتظرها، والآخر على موعد لا يمكنك تفويته، وكلٌّ منهما يحتاج منك أشياء مختلفة.",
    },
    items: [
      {
        key: "arrivals",
        eyebrow: { en: "Arrivals", ar: "الوصول" },
        heading: { en: "You land, and the car is already waiting", ar: "تهبط فتجد السيارة بانتظارك" },
        lead: {
          en: "The pickup is set against your flight rather than a clock time, so the car follows the aircraft. Land two hours late and the pickup moves with you; land early and it is already there.",
          ar: "يُضبط موعد الاستقبال على رحلتك لا على توقيت الساعة، فتتبع السيارة الطائرة. فإن هبطت متأخرًا ساعتين انتقل الموعد معك، وإن هبطت مبكرًا كانت السيارة موجودة.",
        },
        imageKey: "kkia-central" as SiteImageKey,
        requests: [
          { en: "Airport to your hotel", ar: "من المطار إلى فندقك" },
          { en: "Airport to a home, office or business address", ar: "من المطار إلى منزل أو مكتب أو عنوان عمل" },
          { en: "Airport straight on to another city, where we cover that route", ar: "من المطار مباشرة إلى مدينة أخرى، حيث نغطي ذلك المسار" },
          { en: "Several vehicles together, when one will not hold the party", ar: "عدة مركبات معًا حين لا تكفي واحدة للمجموعة" },
        ],
        needs: [
          {
            label: { en: "Airline and flight number", ar: "شركة الطيران ورقم الرحلة" },
            detail: {
              en: "The single most useful line in the whole enquiry. It is what lets the pickup follow the aircraft instead of a guess.",
              ar: "أنفع سطر في الطلب كله. فهو ما يجعل الاستقبال يتبع الطائرة بدل التخمين.",
            },
          },
          {
            label: { en: "Arrival airport and date", ar: "مطار الوصول والتاريخ" },
            detail: {
              en: "And the scheduled arrival time in Saudi local time — the converter further down this page exists for exactly that.",
              ar: "ووقت الوصول المجدول بالتوقيت المحلي السعودي — ومحوّل التوقيت أسفل هذه الصفحة موجود لهذا تحديدًا.",
            },
          },
          {
            label: { en: "Where you are going", ar: "إلى أين تتجه" },
            detail: {
              en: "The hotel name and its address, or a full street address. A brand name alone is not enough — several share one.",
              ar: "اسم الفندق وعنوانه، أو عنوان كامل. فاسم العلامة التجارية وحده لا يكفي — إذ يتشاركه أكثر من فندق.",
            },
          },
          {
            label: { en: "Passengers and luggage", ar: "الركاب والأمتعة" },
            detail: {
              en: "Count the children, and count the bags honestly. Both decide the vehicle.",
              ar: "احسب الأطفال، واحسب الحقائب بصدق. فكلاهما يحدد المركبة.",
            },
          },
          {
            label: { en: "Anything that changes the vehicle", ar: "وكل ما يغيّر المركبة" },
            detail: {
              en: "A wheelchair, a pushchair, a child seat, a passenger who cannot manage steps.",
              ar: "كرسي متحرك، أو عربة طفل، أو مقعد أطفال، أو راكب لا يستطيع صعود الدرجات.",
            },
          },
        ],
        pivot: {
          heading: { en: "Sixty minutes of waiting is included", ar: "ستون دقيقة انتظار مشمولة" },
          body: {
            en: "That hour is there to absorb immigration and the baggage belt, which is where arrival time actually goes. It is included with your transfer, and it is counted from the point your flight is recorded as arrived rather than from its scheduled time.",
            ar: "وُجدت تلك الساعة لاستيعاب الجوازات وسير الأمتعة، وهناك يذهب وقت الوصول فعلًا. وهي مشمولة في رحلتك، وتُحسب من لحظة تسجيل وصول رحلتك لا من موعدها المجدول.",
          },
        },
        prefill: {
          pickup: { en: "Airport arrival (see flight number below)", ar: "وصول إلى المطار (انظر رقم الرحلة أدناه)" },
          dropoff: { en: "Hotel or address in Saudi Arabia", ar: "فندق أو عنوان في السعودية" },
        },
        ctaLabel: { en: "Request an arrival transfer", ar: "اطلب نقلًا عند الوصول" },
      },
      {
        key: "departures",
        eyebrow: { en: "Departures", ar: "المغادرة" },
        heading: { en: "Working backwards from a time you cannot miss", ar: "الحساب تراجعيًا من موعد لا يمكن تفويته" },
        lead: {
          en: "A departure has no aircraft to follow — only a desk that closes. So you tell us when you need to be at the terminal, and the pickup is built backwards from that.",
          ar: "ليس للمغادرة طائرة تُتبَع — بل كاونتر يُغلق. فتخبرنا متى يلزم أن تكون في الصالة، ويُبنى موعد الاستقبال تراجعيًا من ذلك.",
        },
        imageKey: "kkia-departures" as SiteImageKey,
        requests: [
          { en: "Hotel to the airport", ar: "من الفندق إلى المطار" },
          { en: "Home or office to the airport", ar: "من المنزل أو المكتب إلى المطار" },
          { en: "Another city to the airport, where we cover that route", ar: "من مدينة أخرى إلى المطار، حيث نغطي ذلك المسار" },
          { en: "An early-morning departure, agreed in advance", ar: "مغادرة في الصباح الباكر، متفق عليها مسبقًا" },
        ],
        needs: [
          {
            label: { en: "Where we collect you", ar: "من أين نستقبلك" },
            detail: {
              en: "A full address, and the entrance if the building has more than one.",
              ar: "عنوان كامل، والمدخل إن كان للمبنى أكثر من مدخل.",
            },
          },
          {
            label: { en: "Airport, and the terminal if you know it", ar: "المطار، والصالة إن كنت تعرفها" },
            detail: {
              en: "If you do not, your airline's confirmation does. We would rather read it from there than guess.",
              ar: "وإن لم تكن تعرفها فتأكيد شركة الطيران يعرفها. ونفضّل قراءتها منه على التخمين.",
            },
          },
          {
            label: { en: "Flight date and departure time", ar: "تاريخ الرحلة وموعد الإقلاع" },
            detail: {
              en: "In Saudi local time, which is the one the airport runs on.",
              ar: "بالتوقيت المحلي السعودي، وهو التوقيت الذي يعمل عليه المطار.",
            },
          },
          {
            label: { en: "The pickup time you want", ar: "موعد الاستقبال الذي تريده" },
            detail: {
              en: "Or tell us when you want to be at the terminal and we work back from that instead.",
              ar: "أو أخبرنا متى تريد أن تكون في الصالة ونحسب تراجعيًا من ذلك.",
            },
          },
          {
            label: { en: "Passengers and luggage", ar: "الركاب والأمتعة" },
            detail: {
              en: "Departure luggage is often heavier than arrival luggage. Say what you will actually be carrying out.",
              ar: "وأمتعة المغادرة غالبًا أثقل من أمتعة الوصول. فاذكر ما ستحمله فعلًا عند الخروج.",
            },
          },
        ],
        pivot: {
          heading: { en: "We do not invent a lead time", ar: "لا نخترع مدة وصول مسبقة" },
          body: {
            en: "How early you need to be at the desk is your airline's rule, and it changes by carrier, destination and season. Ask them, tell us the time you want to be there, and we build the journey to it. Publishing a number of our own would just be a guess with our name on it.",
            ar: "فمدى التبكير اللازم للوصول إلى الكاونتر قاعدة شركة طيرانك، وتختلف بحسب الناقل والوجهة والموسم. اسألهم، وأخبرنا بالوقت الذي تريد أن تكون فيه هناك، ونبني الرحلة عليه. أما نشر رقم من عندنا فليس إلا تخمينًا يحمل اسمنا.",
          },
        },
        prefill: {
          pickup: { en: "Hotel or address in Saudi Arabia", ar: "فندق أو عنوان في السعودية" },
          dropoff: { en: "Airport departure (see flight details below)", ar: "مغادرة من المطار (انظر تفاصيل الرحلة أدناه)" },
        },
        ctaLabel: { en: "Request a departure transfer", ar: "اطلب نقلًا عند المغادرة" },
      },
    ] as Pathway[],
  },

  // --- Flight coordination --------------------------------------------------

  coordination: {
    eyebrow: { en: "What your flight number actually does", ar: "ما الذي يفعله رقم رحلتك فعلًا" },
    heading: { en: "How the pickup is coordinated", ar: "كيف يُنسَّق الاستقبال" },
    lead: {
      en: "Worth describing plainly, because plenty of transfer sites imply more automation than they have.",
      ar: "ويستحق وصفًا صريحًا، لأن مواقع نقل كثيرة توحي بأتمتة أكثر مما لديها.",
    },
    steps: [
      {
        title: { en: "You send the flight number", ar: "ترسل رقم الرحلة" },
        body: {
          en: "With the airline and the scheduled arrival. It goes into the enquiry form and straight to the person handling your booking.",
          ar: "مع شركة الطيران والوصول المجدول. ويذهب في نموذج الطلب مباشرة إلى من يتولى حجزك.",
        },
      },
      {
        title: { en: "A person checks it", ar: "يتحقق منه شخص" },
        body: {
          en: "We watch the flight against public schedule information before your transfer. This is done by a person, not by an automated feed wired into this website.",
          ar: "نتابع الرحلة وفق معلومات الجداول العامة قبل موعد نقلك. ويقوم بذلك شخص، لا تغذية آلية موصولة بهذا الموقع.",
        },
      },
      {
        title: { en: "We make contact before the transfer", ar: "نتواصل قبل الرحلة" },
        body: {
          en: "To confirm the arrangement with you. If the schedule has moved, that is the conversation where the pickup is adjusted.",
          ar: "لتأكيد الترتيب معك. وإن تغيّر الموعد فتلك هي المحادثة التي يُعدَّل فيها الاستقبال.",
        },
      },
      {
        title: { en: "The final details are in your confirmation", ar: "التفاصيل النهائية في تأكيد حجزك" },
        body: {
          en: "Where you meet the driver and how to reach them is set out in writing for your booking, not printed on a web page where it can go quietly out of date.",
          ar: "فموضع لقائك بالسائق وكيفية الوصول إليه مبيّنان كتابةً في حجزك، لا مطبوعين في صفحة ويب قد تَقدُم بصمت.",
        },
      },
    ],
    limits: {
      heading: { en: "What this is not", ar: "وما ليس عليه الأمر" },
      items: [
        {
          en: "Not automated live tracking. There is no flight-data integration behind this website; your flight number reaches a person, and a person acts on it.",
          ar: "ليس تتبعًا مباشرًا آليًا. فلا تكامل بيانات طيران خلف هذا الموقع؛ بل يصل رقم رحلتك إلى شخص، وشخص يتصرف بناءً عليه.",
        },
        {
          en: "Not unlimited waiting. Sixty minutes is included; beyond that the arrangement has to be agreed rather than assumed.",
          ar: "وليس انتظارًا غير محدود. فستون دقيقة مشمولة، وما بعدها يُتفق عليه لا يُفترض.",
        },
        {
          en: "Not a guarantee that any delay can be absorbed. A flight that moves by many hours, or to another day, may need the pickup reconfirmed — and occasionally requoted.",
          ar: "وليس ضمانًا باستيعاب أي تأخير. فالرحلة التي تتغير ساعاتٍ طويلة أو إلى يوم آخر قد تستلزم إعادة تأكيد الاستقبال، وأحيانًا إعادة تسعيره.",
        },
        {
          en: "Not control over the airport itself. Where a vehicle may wait is set by the airport, and we confirm the arrangement rather than promise a spot.",
          ar: "وليس تحكمًا بالمطار نفسه. فموضع انتظار المركبة يحدده المطار، ونحن نؤكد الترتيب لا نَعِد بموقف بعينه.",
        },
      ],
    },
  },

  // --- Time-zone converter --------------------------------------------------

  timezone: {
    eyebrow: { en: "For travellers coming a long way", ar: "للقادمين من مسافات بعيدة" },
    heading: { en: "What time is that in Saudi Arabia?", ar: "كم تكون الساعة في السعودية؟" },
    lead: {
      en: "If you booked a flight in Sydney or London, you know your schedule in your own time. The enquiry form needs it in Saudi time, and the date sometimes changes on the way. This converts one to the other.",
      ar: "إن حجزت رحلتك في سيدني أو لندن فأنت تعرف مواعيدك بتوقيتك. ونموذج الطلب يحتاجها بالتوقيت السعودي، وقد يتغير التاريخ في الطريق. وهذا يحوّل أحدهما إلى الآخر.",
    },
    disclaimer: {
      en: "This converts a clock time between two places. It does not know any flight's schedule and cannot tell you when an aircraft will actually land — your airline's confirmation is the only source for that. Saudi Arabia does not observe daylight saving; many departure countries do, which is why the answer can shift by an hour depending on the date you pick.",
      ar: "هذه الأداة تحوّل توقيت الساعة بين مكانين. ولا تعرف جدول أي رحلة ولا تستطيع إخبارك بموعد هبوط الطائرة فعلًا — فتأكيد شركة طيرانك هو المصدر الوحيد لذلك. والسعودية لا تطبّق التوقيت الصيفي، بينما تطبّقه دول مغادرة كثيرة، ولهذا قد يتغير الجواب ساعةً بحسب التاريخ الذي تختاره.",
    },
    copy: {
      fromLabel: { en: "Your local time in", ar: "توقيتك المحلي في" },
      toLabel: { en: "Show me the time in", ar: "أرني التوقيت في" },
      dateLabel: { en: "Date", ar: "التاريخ" },
      timeLabel: { en: "Time (24-hour)", ar: "الوقت (24 ساعة)" },
      resultLabel: { en: "The same moment", ar: "اللحظة نفسها" },
      emptyState: { en: "Choose a date and a time to see the comparison.", ar: "اختر تاريخًا ووقتًا لعرض المقارنة." },
      sameDay: { en: "Same calendar day in both places.", ar: "اليوم نفسه في كلا المكانين." },
      nextDay: { en: "This lands on the next calendar day at the destination.", ar: "يقع هذا في اليوم التالي في الوجهة." },
      previousDay: { en: "This lands on the previous calendar day at the destination.", ar: "يقع هذا في اليوم السابق في الوجهة." },
    },
  },

  // --- Airport coverage -----------------------------------------------------

  coverage: {
    heading: { en: "Which airports", ar: "أي المطارات" },
    lead: {
      en: "Four have a page of their own, with the terminal detail and the local distances this page deliberately leaves out.",
      ar: "أربعة منها لها صفحاتها الخاصة، وفيها تفاصيل الصالات والمسافات المحلية التي تتركها هذه الصفحة عمدًا.",
    },
    items: [
      {
        routeKey: "riyadhAirport" as RouteKey,
        name: { en: "King Khalid International", ar: "مطار الملك خالد الدولي" },
        city: { en: "Riyadh · RUH", ar: "الرياض · RUH" },
        note: {
          en: "The capital's gateway, north of the city. Arrivals met inside the terminal, departures worked back from your flight, and onward routes to half the Kingdom.",
          ar: "بوابة العاصمة، شمال المدينة. استقبال داخل الصالة، ومغادرة محسوبة من رحلتك، ومسارات إلى نصف المملكة.",
        },
      },
      {
        routeKey: "jeddahAirport" as RouteKey,
        name: { en: "King Abdulaziz International", ar: "مطار الملك عبدالعزيز الدولي" },
        city: { en: "Jeddah · JED", ar: "جدة · JED" },
        note: {
          en: "The busiest arrival in the country for pilgrimage travel, and the start of the road to Makkah. It also holds a Haramain railway station, which is a different kind of pickup.",
          ar: "أكثر مطارات البلاد ازدحامًا بالقادمين لرحلات الحج والعمرة، وبداية الطريق إلى مكة. وفيه أيضًا محطة لقطار الحرمين، وهي نوع آخر من الاستقبال.",
        },
      },
      {
        routeKey: "madinahAirport" as RouteKey,
        name: { en: "Prince Mohammad bin Abdulaziz", ar: "مطار الأمير محمد بن عبدالعزيز" },
        city: { en: "Madinah · MED", ar: "المدينة · MED" },
        note: {
          en: "About 20 km from the central area, so almost every arrival here ends with a short road leg to a hotel near the Prophet's Mosque.",
          ar: "على نحو 20 كم من المنطقة المركزية، فتنتهي كل رحلة وصول هنا تقريبًا بمرحلة برية قصيرة إلى فندق قرب المسجد النبوي.",
        },
      },
      {
        routeKey: "dammamAirport" as RouteKey,
        name: { en: "King Fahd International", ar: "مطار الملك فهد الدولي" },
        city: { en: "Dammam · DMM", ar: "الدمام · DMM" },
        note: {
          en: "Serving Dammam, Al Khobar and Dhahran, which are three cities people often call one. The address decides the journey here more than the airport does.",
          ar: "يخدم الدمام والخبر والظهران، وهي ثلاث مدن يسميها الناس غالبًا واحدة. والعنوان هنا يحدد الرحلة أكثر مما يحددها المطار.",
        },
      },
    ],
    elsewhere: {
      heading: { en: "Travelling through another Saudi airport?", ar: "مسافر عبر مطار سعودي آخر؟" },
      body: {
        en: "We also meet flights at the regional airports serving Taif, AlUla, Yanbu, Al Ahsa, Tabuk, Buraydah, Unaizah, Abha, Jazan and Najran, and each of those cities has its own page setting out what is covered there. Send your airport, your destination and your travel details and we will check the arrangements and come back with a quotation — or tell you plainly if we cannot cover it.",
        ar: "ونستقبل الرحلات أيضًا في المطارات الإقليمية التي تخدم الطائف والعُلا وينبع والأحساء وتبوك وبريدة وعنيزة وأبها وجازان ونجران، ولكل من تلك المدن صفحتها التي تبيّن ما تشمله الخدمة هناك. أرسل مطارك ووجهتك وتفاصيل سفرك، فنتحقق من الترتيبات ونعود إليك بعرض سعر — أو نخبرك بصراحة إن كنا لا نستطيع تغطيتها.",
      },
    },
  },

  // --- Vehicles --------------------------------------------------------------

  vehicles: {
    heading: { en: "Which vehicle, and why luggage decides it", ar: "أي مركبة، ولماذا تحسمها الأمتعة" },
    lead: {
      en: "Passenger count is the obvious half of the question and usually not the half that goes wrong. Four people returning from a month abroad can need more room than seven on a weekend trip.",
      ar: "عدد الركاب هو النصف الظاهر من السؤال، وليس عادةً النصف الذي يُخطئ فيه الناس. فأربعة عائدون من شهر في الخارج قد يحتاجون مساحة أكبر من سبعة في رحلة نهاية أسبوع.",
    },
    slugs: ["sedan", "suv", "van", "minibus"],
    groupNote: {
      en: "Fourteen passengers is the most we seat in a single vehicle. Above that, or where the luggage will not fit whatever the headcount, we coordinate more than one vehicle so the party travels together and arrives together. Tell us the numbers and the bags, and the quotation sets out what is being sent.",
      ar: "وأربعة عشر راكبًا أقصى ما نُجلسه في مركبة واحدة. وفوق ذلك، أو حين لا تتسع الأمتعة مهما كان العدد، ننسّق أكثر من مركبة ليسافر الجميع معًا ويصلوا معًا. أخبرنا بالأعداد والحقائب، ويبيّن عرض السعر ما سيُرسَل.",
    },
    footnote: {
      en: "Models and makes vary by availability; the class is what is confirmed in your quotation.",
      ar: "وتتفاوت الموديلات والطرز بحسب التوافر؛ والفئة هي ما يُؤكَّد في عرض سعرك.",
    },
  },

  // --- After you enquire ------------------------------------------------------

  process: {
    heading: { en: "What happens after you send it", ar: "ماذا يحدث بعد إرسالك الطلب" },
    lead: { en: "Four steps, and nothing is held until the last one.", ar: "أربع خطوات، ولا يُحجز شيء إلا عند آخرها." },
    steps: [
      {
        title: { en: "Your enquiry arrives", ar: "يصلنا طلبك" },
        body: {
          en: "No payment details, no account. Just the journey.",
          ar: "بلا بيانات دفع وبلا حساب. الرحلة فقط.",
        },
      },
      {
        title: { en: "We check it", ar: "نتحقق منه" },
        body: {
          en: "Availability for your date, the vehicle the party and the bags need, and the flight if you sent one.",
          ar: "التوافر في تاريخك، والمركبة التي تحتاجها المجموعة والأمتعة، والرحلة الجوية إن أرسلتها.",
        },
      },
      {
        title: { en: "You get a written quotation", ar: "يصلك عرض سعر مكتوب" },
        body: {
          en: "With the vehicle class and the timing set out, so you can read it before deciding anything.",
          ar: "مبيّنًا فئة المركبة والتوقيت، لتقرأه قبل أن تقرر شيئًا.",
        },
      },
      {
        title: { en: "The booking is confirmed separately", ar: "ويُؤكَّد الحجز منفصلًا" },
        body: {
          en: "You accept, and your transfer is confirmed only when we send a booking confirmation saying so.",
          ar: "تقبل العرض، ولا تتأكد رحلتك إلا عندما نرسل رسالة تأكيد حجز تنص على ذلك.",
        },
      },
    ],
    note: {
      en: "Sending an enquiry does not confirm a booking and does not hold a vehicle for your date. Nothing is reserved and no payment is taken on this website.",
      ar: "وإرسال الطلب لا يؤكد حجزًا ولا يحجز مركبة لتاريخك. ولا يُحجز شيء ولا يُستوفى أي مبلغ عبر هذا الموقع.",
    },
  },

  // --- FAQs --------------------------------------------------------------------

  faqHeading: { en: "Common questions", ar: "الأسئلة الشائعة" },

  faqs: [
    {
      question: { en: "What happens if my flight is delayed?", ar: "ماذا يحدث إن تأخرت رحلتي؟" },
      answer: {
        en: "An airport pickup is set against your flight number rather than a clock time, so a delay moves the pickup instead of stranding it, and sixty minutes of waiting is included from the point your flight is recorded as arrived. We watch the flight before your transfer and contact you to confirm. A delay of many hours, or one that pushes you to another day, may need the pickup reconfirmed and occasionally requoted — we would rather say that than promise a delay of any size is absorbed.",
        ar: "يُضبط استقبال المطار على رقم رحلتك لا على توقيت الساعة، فيُزيح التأخيرُ الموعدَ بدل أن يتركه عالقًا، وستون دقيقة انتظار مشمولة من لحظة تسجيل وصول رحلتك. ونتابع الرحلة قبل موعد نقلك ونتواصل معك للتأكيد. أما التأخير لساعات طويلة أو الذي يدفعك إلى يوم آخر فقد يستلزم إعادة تأكيد الاستقبال وأحيانًا إعادة تسعيره — ونفضّل قول ذلك على الوعد باستيعاب أي قدر من التأخير.",
      },
    },
    {
      question: { en: "Do you track flights automatically?", ar: "هل تتتبعون الرحلات آليًا؟" },
      answer: {
        en: "No, and we would rather be straight about it than imply a system we do not run. There is no flight-data integration behind this website. Your flight number reaches the person handling your booking, they check it against public schedule information before the transfer, and they contact you to confirm. In practice that is what matters on the day — but it is a person doing it, not a feed.",
        ar: "لا، ونفضّل الصراحة على الإيحاء بنظام لا نشغّله. فلا يوجد تكامل بيانات طيران خلف هذا الموقع. يصل رقم رحلتك إلى من يتولى حجزك، فيتحقق منه وفق معلومات الجداول العامة قبل موعد النقل، ويتواصل معك للتأكيد. وهذا عمليًا هو المهم في اليوم ذاته — لكن يؤديه شخص لا تغذية آلية.",
      },
    },
    {
      question: { en: "How early should the car collect me for my departure?", ar: "كم يجب أن تستقبلني السيارة مبكرًا قبل مغادرتي؟" },
      answer: {
        en: "Ask your airline how early you need to be at the desk — it changes by carrier, destination and season, and it is their rule rather than ours. Tell us the time you want to be at the terminal and we build the pickup backwards from it. We deliberately do not publish a lead time of our own, because it would be a guess with our name attached.",
        ar: "اسأل شركة طيرانك عن مدى التبكير اللازم للوصول إلى الكاونتر — فهو يختلف بحسب الناقل والوجهة والموسم، وهو قاعدتهم لا قاعدتنا. أخبرنا بالوقت الذي تريد أن تكون فيه في الصالة ونبني موعد الاستقبال تراجعيًا منه. ونحن لا ننشر مدة تبكير من عندنا عمدًا، لأنها ستكون تخمينًا يحمل اسمنا.",
      },
    },
    {
      question: { en: "We are a family of nine arriving together. Is that one booking?", ar: "نحن عائلة من تسعة نصل معًا. هل هذا حجز واحد؟" },
      answer: {
        en: "One enquiry, yes. Fourteen passengers is the most we seat in a single vehicle, so nine may fit one depending on the luggage — and if the bags will not, we coordinate a second vehicle so you travel together and arrive together. Send the passenger count including children and the number of suitcases, and the quotation sets out what is being sent.",
        ar: "طلب واحد، نعم. وأربعة عشر راكبًا أقصى ما نُجلسه في مركبة واحدة، فقد يتسع تسعة في واحدة بحسب الأمتعة — وإن لم تتسع الحقائب ننسّق مركبة ثانية لتسافروا معًا وتصلوا معًا. أرسل عدد الركاب ومنهم الأطفال وعدد الحقائب، ويبيّن عرض السعر ما سيُرسَل.",
      },
    },
    {
      question: { en: "I only know my arrival time in my own time zone.", ar: "لا أعرف وقت وصولي إلا بتوقيت بلدي." },
      answer: {
        en: "Use the converter on this page to turn it into Saudi local time, and check whether the date changes on the way — travelling from Australia it usually does. Then send the Saudi date and time with your flight number, and we will read the rest from the flight. Saudi Arabia does not observe daylight saving, so the Saudi side of the answer stays put all year even when yours does not.",
        ar: "استخدم المحوّل في هذه الصفحة لتحويله إلى التوقيت المحلي السعودي، وتحقق إن كان التاريخ يتغير في الطريق — وهو ما يحدث عادةً عند السفر من أستراليا. ثم أرسل التاريخ والوقت السعوديين مع رقم رحلتك، ونقرأ الباقي من الرحلة. والسعودية لا تطبّق التوقيت الصيفي، فيبقى الطرف السعودي من الجواب ثابتًا طوال العام حتى حين لا يثبت طرفك.",
      },
    },
    {
      question: { en: "Can you take me straight from the airport to another city?", ar: "هل يمكنكم نقلي من المطار مباشرة إلى مدينة أخرى؟" },
      answer: {
        en: "On the routes we cover, yes, and it is a common request — Jeddah airport to Makkah, Madinah airport to a central hotel, Dammam airport across to Al Khobar. Longer intercity runs have pages of their own with the distances and driving times on them. Send the airport and the destination and we will quote the whole journey as one.",
        ar: "على المسارات التي نغطيها، نعم، وهو طلب شائع — من مطار جدة إلى مكة، ومن مطار المدينة إلى فندق مركزي، ومن مطار الدمام إلى الخبر. وللرحلات الأطول بين المدن صفحاتها الخاصة وفيها المسافات وأزمنة القيادة. أرسل المطار والوجهة ونسعّر الرحلة كاملة دفعةً واحدة.",
      },
    },
    {
      question: { en: "Where exactly will I meet the driver?", ar: "أين ألتقي السائق بالضبط؟" },
      answer: {
        en: "Confirmed in writing for your booking rather than published here. Where a vehicle may wait is set by the airport and by whoever is managing the forecourt that day, not by us, and a meeting point printed on a web page is exactly the detail that goes quietly out of date. You get the arrangement in your booking confirmation and a number to call on the day.",
        ar: "يُؤكَّد كتابةً لحجزك لا يُنشر هنا. فموضع انتظار المركبة يحدده المطار ومن يدير الساحة ذلك اليوم لا نحن، ونقطة التقاء مطبوعة في صفحة ويب هي بالضبط التفصيل الذي يَقدُم بصمت. وتصلك الترتيبات في رسالة تأكيد الحجز ومعها رقم للاتصال في اليوم نفسه.",
      },
    },
    {
      question: { en: "Is the quotation the booking?", ar: "هل عرض السعر هو الحجز؟" },
      answer: {
        en: "No. Sending an enquiry does not hold a vehicle, and accepting a quotation is not by itself a confirmed booking either. Your transfer is confirmed when we send a booking confirmation saying so. Nothing is reserved and no payment is taken on this website.",
        ar: "لا. فإرسال الطلب لا يحجز مركبة، وقبول عرض السعر ليس بذاته حجزًا مؤكدًا كذلك. وتتأكد رحلتك حين نرسل رسالة تأكيد حجز تنص على ذلك. ولا يُحجز شيء ولا يُستوفى أي مبلغ عبر هذا الموقع.",
      },
    },
  ] as ClusterFaq[],

  // --- CTA and related ----------------------------------------------------------

  cta: {
    eyebrow: { en: "Flight, address, date", ar: "الرحلة والعنوان والتاريخ" },
    heading: { en: "Send the flight and we will do the rest", ar: "أرسل الرحلة ونتولّى الباقي" },
    body: {
      en: "Your airport, your flight number, where you are going and how many of you. We reply with a written price and the arrangement set out.",
      ar: "مطارك ورقم رحلتك ووجهتك وعددكم. ونرد بسعر مكتوب وبيان الترتيب.",
    },
    button: { en: "Request a quotation", ar: "اطلب عرض سعر" },
  } as ClusterCta,

  relatedHeading: { en: "Airports and onward journeys", ar: "المطارات والرحلات التالية" },

  related: [
    {
      routeKey: "riyadhAirport",
      label: { en: "Riyadh airport transfers", ar: "النقل من مطار الرياض" },
      note: {
        en: "King Khalid International in detail: arrivals, departures, hotel connections and the routes out of the capital.",
        ar: "مطار الملك خالد الدولي بالتفصيل: الوصول والمغادرة والفنادق والمسارات من العاصمة.",
      },
    },
    {
      routeKey: "jeddahAirport",
      label: { en: "Jeddah airport transfers", ar: "النقل من مطار جدة" },
      note: {
        en: "King Abdulaziz in detail: the terminal question, and the road on to Makkah.",
        ar: "مطار الملك عبدالعزيز بالتفصيل: سؤال الصالات، والطريق إلى مكة.",
      },
    },
    {
      routeKey: "madinahAirport",
      label: { en: "Madinah airport transfers", ar: "النقل من مطار المدينة" },
      note: {
        en: "Prince Mohammad bin Abdulaziz: about 20 km in, and the hotels at the other end.",
        ar: "مطار الأمير محمد بن عبدالعزيز: نحو 20 كم، والفنادق في الطرف الآخر.",
      },
    },
    {
      routeKey: "dammamAirport",
      label: { en: "Dammam airport transfers", ar: "النقل من مطار الدمام" },
      note: {
        en: "King Fahd International, and the three coastal cities it actually serves.",
        ar: "مطار الملك فهد الدولي، والمدن الساحلية الثلاث التي يخدمها فعلًا.",
      },
    },
    {
      routeKey: "umrahTransfers",
      label: { en: "Umrah transfers", ar: "نقل العمرة" },
      note: {
        en: "If the airport run is one leg of a pilgrimage trip, this quotes the whole chain as one arrangement.",
        ar: "إن كانت رحلة المطار مرحلة من رحلة عمرة، فهذه تسعّر السلسلة كاملة ترتيبًا واحدًا.",
      },
    },
    {
      routeKey: "jeddahStation",
      label: { en: "Jeddah Haramain station transfers", ar: "النقل من محطات الحرمين بجدة" },
      note: {
        en: "One of Jeddah's two Haramain stations sits inside the airport — but meeting a train is a different job from meeting a flight.",
        ar: "إحدى محطتي الحرمين في جدة داخل المطار — لكن استقبال قطار مهمة تختلف عن استقبال رحلة جوية.",
      },
    },
  ] as RelatedLink[],
};
