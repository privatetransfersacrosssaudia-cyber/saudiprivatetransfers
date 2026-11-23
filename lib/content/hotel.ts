import type { Bilingual } from "@/lib/i18n/config";
import type {
  ClusterCta,
  ClusterFaq,
  RelatedLink,
} from "@/lib/content/riyadh/types";
import type { RouteKey } from "@/lib/i18n/routes";
import type { SiteImageKey } from "@/lib/site-images";

/**
 * Hotel transfers — the service page above the two city hotel pages.
 *
 * **Concept: which end is the hotel on?** Every hotel enquiry is one of four
 * shapes, and the shape decides what we need from you far more than the city
 * does. A hotel at the far end means a flight number matters; a hotel at the
 * near end means a departure time does; a hotel at both ends means luggage
 * and two addresses; a hotel as a starting point for something longer means
 * the journey belongs to another page. So the page opens on the shape, not
 * on the city.
 *
 * ## Why this does not collide with the two city pages
 *
 * `riyadh/hotel.ts` owns **"the meeting point"** — which of a large hotel's
 * several doors the car should use. `jeddah/hotel.ts` owns **"the pause
 * between two journeys"** — where a stay sits in the sequence of a trip
 * through Jeddah. Both are local insights about one city.
 *
 * This page owns neither. It takes the one question that is the same at
 * every hotel in the country — what shape is this journey — and hands the
 * city-specific detail to the pages that already carry it. It states no
 * distances, no drive times and no city geography, which is what would
 * otherwise put it in competition with them.
 *
 * ## Claims
 *
 * **No hotel is named, anywhere.** No partnership, no preferred-provider
 * relationship, no arrangement with any property, and nothing about any
 * named hotel's entrances. `access` says plainly that where a car may wait
 * is set by the property and confirmed per booking.
 *
 * **Vehicles** are `lib/content/vehicles.ts` verbatim: up to 3, 4, 7 and 14.
 * Fourteen is the confirmed single-vehicle ceiling; beyond it the page says
 * more than one vehicle is coordinated *subject to availability*, with no
 * total ceiling, fleet size, ownership or amenity claimed.
 *
 * **No prices, no instant booking, no lead times, no journey durations.**
 *
 * ## Images
 *
 * **No photographic hero, deliberately — and this is a precedent, not an
 * omission.** `riyadh/hotel.ts` is already the one page in the project with
 * no hero photograph, for exactly this reason: any hotel photograph would be
 * a property we have no relationship with, and putting one at the top of a
 * page selling hotel transfers implies the relationship. The project holds a
 * single hotel exterior, `svc-hotel`, and it is the Makkah Royal Clock Tower
 * — one identifiable branded property, and the wrong city for a national
 * page besides. It stays on the home service card where it reads as a
 * landmark and nothing more.
 *
 * `imageKey` is `cta`, a satellite view of a Saudi oasis settlement, used for
 * the social card and once in the coverage section where it genuinely carries
 * the point about reach across the Kingdom. It shows no property and no
 * vehicle.
 */

/** One of the four journey shapes. */
export type HotelShape = {
  key: string;
  name: Bilingual<string>;
  /** The two ends, in travel order. `hotel: true` marks the highlighted node. */
  nodes: { label: Bilingual<string>; hotel?: boolean; open?: boolean }[];
  who: Bilingual<string>;
  needs: Bilingual<string>[];
  prefill: { pickup: Bilingual<string>; dropoff?: Bilingual<string> };
  ctaLabel: Bilingual<string>;
  /** Where the detail for this shape already lives. */
  link?: { routeKey: RouteKey; label: Bilingual<string> };
};

export const hotel = {
  routeKey: "hotelTransfers" as RouteKey,
  imageKey: "cta" as SiteImageKey,

  seo: {
    title: {
      en: "Hotel Transfers Saudi Arabia | Private Car & Driver",
      ar: "النقل من الفنادق في السعودية | سيارة خاصة مع سائق",
    },
    description: {
      en: "Private transfers to, from and between Saudi hotels — the airport run, the departure pickup, a move to another property, or the start of a longer journey. Send the hotel and the destination for a written quotation.",
      ar: "نقل خاص من فنادق السعودية وإليها وبينها — رحلة المطار، واستقبال المغادرة، والانتقال إلى فندق آخر، أو بداية رحلة أطول. أرسل الفندق والوجهة واحصل على عرض سعر مكتوب.",
    },
  },

  crumbLabel: { en: "Hotel transfers", ar: "النقل من الفنادق" },

  // --- Hero -----------------------------------------------------------------

  eyebrow: { en: "Hotel transfers across Saudi Arabia", ar: "النقل من الفنادق في أنحاء السعودية" },
  title: {
    en: "Your hotel is one end of the journey. Sometimes both.",
    ar: "فندقك أحد طرفي الرحلة. وأحيانًا كلاهما.",
  },
  standfirst: {
    en: "Almost every hotel enquiry is one of four shapes, and the shape matters more than the city. Whether the hotel is where you are going, where you are leaving from, or both, what we need from you changes — so pick the shape that matches your trip and the rest follows.",
    ar: "يكاد كل طلب فندقي يكون واحدًا من أربعة أشكال، والشكل أهم من المدينة. فسواء كان الفندق وجهتك أو نقطة انطلاقك أو كليهما، يتغيّر ما نحتاجه منك — فاختر الشكل الذي يطابق رحلتك ويتبعه الباقي.",
  },

  primaryCta: { en: "Request a quotation", ar: "اطلب عرض سعر" },
  secondaryCta: { en: "Find your journey", ar: "اعثر على رحلتك" },

  // --- The four shapes --------------------------------------------------------

  shapes: {
    heading: { en: "Four shapes, one address", ar: "أربعة أشكال وعنوان واحد" },
    lead: {
      en: "Each one needs something slightly different in the enquiry. The quotation link under each is prefilled for that shape.",
      ar: "ويحتاج كلٌّ منها شيئًا مختلفًا قليلًا في الطلب. ورابط عرض السعر تحت كلٍّ منها مهيّأ لذلك الشكل.",
    },
    items: [
      {
        key: "airport-hotel",
        name: { en: "Airport to your hotel", ar: "من المطار إلى فندقك" },
        nodes: [
          { label: { en: "Airport", ar: "المطار" } },
          { label: { en: "Hotel", ar: "الفندق" }, hotel: true },
        ],
        who: {
          en: "The first journey of the trip, and the one most worth getting right — you are tired, possibly landing at an awkward hour, and you do not yet know the city.",
          ar: "أول رحلة في السفرة وأجدرها بالضبط — فأنت متعب، وربما تهبط في ساعة غير مريحة، ولا تعرف المدينة بعد.",
        },
        needs: [
          { en: "Your airline and flight number", ar: "شركة الطيران ورقم الرحلة" },
          { en: "The hotel name and its full address", ar: "اسم الفندق وعنوانه الكامل" },
          { en: "Passengers and suitcases", ar: "الركاب والحقائب" },
        ],
        prefill: {
          pickup: { en: "Saudi airport (flight number in the message)", ar: "مطار في السعودية (رقم الرحلة في الرسالة)" },
          dropoff: { en: "Hotel name and address", ar: "اسم الفندق وعنوانه" },
        },
        ctaLabel: { en: "Quote an arrival transfer", ar: "سعّر رحلة وصول" },
        link: {
          routeKey: "airportTransfers" as RouteKey,
          label: { en: "How airport pickups are coordinated", ar: "كيف يُنسَّق الاستقبال في المطار" },
        },
      },
      {
        key: "hotel-airport",
        name: { en: "Your hotel to the airport", ar: "من فندقك إلى المطار" },
        nodes: [
          { label: { en: "Hotel", ar: "الفندق" }, hotel: true },
          { label: { en: "Airport", ar: "المطار" } },
        ],
        who: {
          en: "No aircraft to follow this time — only a desk that closes. You tell us when you need to be at the terminal and the pickup is built backwards from it.",
          ar: "لا طائرة تُتبَع هذه المرة — بل كاونتر يُغلق. فتخبرنا متى يلزم أن تكون في الصالة، ويُبنى موعد الاستقبال تراجعيًا من ذلك.",
        },
        needs: [
          { en: "The hotel name, address and the entrance if you know it", ar: "اسم الفندق وعنوانه والمدخل إن كنت تعرفه" },
          { en: "Which airport, and your flight date and time", ar: "أي مطار، وتاريخ رحلتك وموعدها" },
          { en: "The pickup time you want, or the time you want to arrive", ar: "موعد الانطلاق الذي تريده، أو وقت وصولك المطلوب" },
        ],
        prefill: {
          pickup: { en: "Hotel name and address", ar: "اسم الفندق وعنوانه" },
          dropoff: { en: "Saudi airport (flight details in the message)", ar: "مطار في السعودية (تفاصيل الرحلة في الرسالة)" },
        },
        ctaLabel: { en: "Quote a departure pickup", ar: "سعّر استقبال مغادرة" },
        link: {
          routeKey: "airportTransfers" as RouteKey,
          label: { en: "Why we publish no lead time", ar: "لماذا لا ننشر مدة تبكير" },
        },
      },
      {
        key: "hotel-hotel",
        name: { en: "One hotel to another", ar: "من فندق إلى آخر" },
        nodes: [
          { label: { en: "Hotel", ar: "الفندق" }, hotel: true },
          { label: { en: "Hotel", ar: "الفندق" }, hotel: true },
        ],
        who: {
          en: "Changing property mid-stay, splitting a trip between two cities, or moving a family and a week of luggage across town. Two addresses, and the bags are usually what decides the vehicle.",
          ar: "تغيير الفندق في منتصف الإقامة، أو تقسيم الرحلة بين مدينتين، أو نقل عائلة وأمتعة أسبوع عبر المدينة. عنوانان، والحقائب عادةً هي ما يحدد المركبة.",
        },
        needs: [
          { en: "Both hotel names with their addresses — the brand alone is not enough", ar: "اسما الفندقين وعنواناهما — فالعلامة التجارية وحدها لا تكفي" },
          { en: "The date and the time you want to move", ar: "التاريخ والوقت الذي تريد الانتقال فيه" },
          { en: "Passengers and the real number of suitcases", ar: "الركاب والعدد الحقيقي للحقائب" },
        ],
        prefill: {
          pickup: { en: "First hotel — name and address", ar: "الفندق الأول — الاسم والعنوان" },
          dropoff: { en: "Second hotel — name and address", ar: "الفندق الثاني — الاسم والعنوان" },
        },
        ctaLabel: { en: "Quote a hotel-to-hotel move", ar: "سعّر انتقالًا بين فندقين" },
      },
      {
        key: "hotel-onward",
        name: { en: "Your hotel to somewhere else", ar: "من فندقك إلى مكان آخر" },
        nodes: [
          { label: { en: "Hotel", ar: "الفندق" }, hotel: true },
          { label: { en: "Anywhere", ar: "أي وجهة" }, open: true },
        ],
        who: {
          en: "A meeting across the city, an office, a family address — or the start of a long intercity drive, where the hotel is simply where the day begins.",
          ar: "اجتماع في طرف المدينة، أو مكتب، أو عنوان أهل — أو بداية رحلة طويلة بين المدن، حيث يكون الفندق مجرد موضع يبدأ منه اليوم.",
        },
        needs: [
          { en: "The hotel name and address", ar: "اسم الفندق وعنوانه" },
          { en: "A full destination address, not a district or a landmark", ar: "عنوان وجهة كامل، لا حيًّا ولا معلمًا" },
          { en: "The date, the time, and whether you want the return", ar: "التاريخ والوقت، وهل تريد رحلة العودة" },
        ],
        prefill: {
          pickup: { en: "Hotel name and address", ar: "اسم الفندق وعنوانه" },
        },
        ctaLabel: { en: "Quote an onward journey", ar: "سعّر رحلة تالية" },
        link: {
          routeKey: "cityToCity" as RouteKey,
          label: { en: "Intercity journeys from a hotel", ar: "الرحلات بين المدن انطلاقًا من فندق" },
        },
      },
    ] as HotelShape[],
  },

  // --- Pickup coordination -------------------------------------------------------

  access: {
    heading: { en: "Where the car can actually stop", ar: "أين تستطيع السيارة التوقف فعلًا" },
    lead: {
      en: "The part of a hotel transfer that most often goes wrong, and the part we are most careful not to overpromise.",
      ar: "الجزء الذي يخطئ فيه الناس أكثر من غيره في النقل الفندقي، وأكثر جزء نحرص على ألا نبالغ في الوعد بشأنه.",
    },
    paragraphs: [
      {
        en: "Where a vehicle may wait at a hotel is decided by the property and by whoever is managing its forecourt that day — not by us. Some hotels let a car come to the door. Some have a separate lane for pickups. Some, particularly in dense central areas, are reached on foot from the nearest point a vehicle is permitted. All three are normal, and which one applies to yours is a fact about that building rather than about the service you are buying.",
        ar: "موضع انتظار المركبة عند الفندق تحدده المنشأة ومن يدير ساحتها ذلك اليوم — لا نحن. فبعض الفنادق يسمح بوصول السيارة إلى الباب. وبعضها له مسار منفصل للاستقبال. وبعضها، خاصة في المناطق المركزية المزدحمة، لا يُوصَل إليه إلا مشيًا من أقرب نقطة يُسمح للمركبات بالوصول إليها. والثلاثة أمر معتاد، وأيّها ينطبق على فندقك حقيقةٌ عن ذلك المبنى لا عن الخدمة التي تشتريها.",
      },
      {
        en: "So we confirm the arrangement in writing for your booking rather than printing a promise here. If you already know your hotel has a particular pickup point, a side entrance or a barrier, put it in the enquiry — it saves a phone call on the morning. If you do not know, say so and we will settle it before the day.",
        ar: "ولذلك نؤكد الترتيب كتابةً لحجزك بدل طباعة وعد هنا. فإن كنت تعرف أن لفندقك نقطة استقبال معينة أو مدخلًا جانبيًا أو بوابة، فاذكر ذلك في الطلب — يوفّر عليك مكالمة صباح ذلك اليوم. وإن كنت لا تعرف فقل ذلك ونحسمه قبل الموعد.",
      },
    ],
    limits: {
      heading: { en: "What we do not claim", ar: "ما لا ندّعيه" },
      items: [
        {
          en: "No arrangement, partnership or preferred-provider relationship with any hotel, anywhere. We are a transport company you book directly.",
          ar: "لا ترتيب ولا شراكة ولا علاقة تفضيلية مع أي فندق في أي مكان. نحن شركة نقل تحجز لديها مباشرةً.",
        },
        {
          en: "No concierge or reception coordination on your behalf. Your booking confirmation goes to you, not to the front desk.",
          ar: "ولا تنسيق مع الكونسيرج أو الاستقبال نيابةً عنك. فتأكيد حجزك يصلك أنت لا مكتب الاستقبال.",
        },
        {
          en: "No guarantee of access to any particular entrance, forecourt or waiting area. That is the property's decision on the day.",
          ar: "ولا ضمان للوصول إلى مدخل بعينه أو ساحة أو منطقة انتظار. فذلك قرار المنشأة في ذلك اليوم.",
        },
      ],
    },
  },

  // --- Coverage -------------------------------------------------------------------

  coverage: {
    heading: { en: "Where we already have the local detail", ar: "أين لدينا التفاصيل المحلية أصلًا" },
    lead: {
      en: "Two cities have a hotel page of their own, each written around the thing that actually goes wrong there.",
      ar: "لمدينتين صفحة فنادق خاصة بكل منهما، كُتبت كلٌّ منهما حول ما يخطئ فيه الناس هناك فعلًا.",
    },
    items: [
      {
        routeKey: "riyadhHotel" as RouteKey,
        city: { en: "Riyadh", ar: "الرياض" },
        note: {
          en: "Large Riyadh hotels often have several entrances, and naming the right one is where transfers here actually go wrong. That page is about the door.",
          ar: "لفنادق الرياض الكبيرة مداخل عدة غالبًا، وتحديد المدخل الصحيح هو ما يخطئ فيه النقل هنا فعلًا. وتلك الصفحة عن الباب.",
        },
      },
      {
        routeKey: "jeddahHotel" as RouteKey,
        city: { en: "Jeddah", ar: "جدة" },
        note: {
          en: "In Jeddah a hotel is usually a pause rather than a destination — between the flight that brought you and the road to Makkah or Madinah. That page follows the sequence.",
          ar: "في جدة يكون الفندق محطة توقف غالبًا لا وجهة — بين الرحلة التي أقلّتك والطريق إلى مكة أو المدينة. وتلك الصفحة تتبع ذلك التسلسل.",
        },
      },
    ],
    hubs: {
      heading: { en: "And in the holy cities", ar: "وفي المدينتين المقدستين" },
      body: {
        en: "Makkah and Madinah hotel journeys are covered on each city's own page, where the access rules around the Haram and the central area are set out properly — those are not details to summarise in a paragraph.",
        ar: "رحلات فنادق مكة المكرمة والمدينة المنورة مشمولة في صفحة كل مدينة، حيث تُبيَّن قواعد الدخول حول الحرم والمنطقة المركزية كما ينبغي — فهذه تفاصيل لا تُختصر في فقرة.",
      },
      links: [
        { routeKey: "makkah" as RouteKey, label: { en: "Makkah", ar: "مكة المكرمة" } },
        { routeKey: "madinah" as RouteKey, label: { en: "Madinah", ar: "المدينة المنورة" } },
        { routeKey: "riyadh" as RouteKey, label: { en: "Riyadh", ar: "الرياض" } },
        { routeKey: "jeddah" as RouteKey, label: { en: "Jeddah", ar: "جدة" } },
      ],
    },
    elsewhere: {
      heading: { en: "Staying at a hotel elsewhere in Saudi Arabia?", ar: "تقيم في فندق في مكان آخر بالسعودية؟" },
      body: {
        en: "Share the hotel name, your destination and the travel date. We can check the arrangements and provide a quotation — or tell you plainly if we cannot cover it. A city without a hotel page is not a city we have ruled out; it is one we have not written up.",
        ar: "شاركنا اسم الفندق ووجهتك وتاريخ السفر. فنتحقق من الترتيبات ونقدّم عرض سعر — أو نخبرك بصراحة إن كنا لا نستطيع التغطية. والمدينة التي لا صفحة فنادق لها ليست مدينة استبعدناها، بل مدينة لم نكتبها بعد.",
      },
    },
  },

  // --- Vehicles ---------------------------------------------------------------------

  vehicles: {
    heading: { en: "Passengers, suitcases, and which vehicle", ar: "الركاب والحقائب وأي مركبة" },
    lead: {
      en: "Hotel journeys are the ones where luggage decides the vehicle most often. A couple checking out after two weeks can need more room than four people going to a meeting.",
      ar: "رحلات الفنادق هي الأكثر حسمًا للمركبة بالأمتعة. فزوجان يغادران بعد أسبوعين قد يحتاجان مساحة أكبر من أربعة أشخاص ذاهبين إلى اجتماع.",
    },
    slugs: ["sedan", "suv", "van", "minibus"],
    groupNote: {
      en: "Fourteen passengers is the most we seat in a single vehicle. Above that, or where the bags will not fit whatever the headcount, more than one vehicle can be coordinated so the party travels together and arrives together — subject to availability on your date, which is one of the things the quotation checks. Tell us the numbers and the luggage and the quotation sets out what is being sent.",
      ar: "وأربعة عشر راكبًا أقصى ما نُجلسه في مركبة واحدة. وفوق ذلك، أو حين لا تتسع الحقائب مهما كان العدد، يمكن تنسيق أكثر من مركبة ليسافر الجميع معًا ويصلوا معًا — رهنًا بالتوافر في تاريخك، وهو أحد ما يتحقق منه عرض السعر. أخبرنا بالأعداد والأمتعة ويبيّن العرض ما سيُرسَل.",
    },
    footnote: {
      en: "Models and makes vary by availability; the class is what is confirmed in your quotation.",
      ar: "وتتفاوت الموديلات والطرز بحسب التوافر؛ والفئة هي ما يُؤكَّد في عرض سعرك.",
    },
  },

  // --- Process -------------------------------------------------------------------------

  process: {
    heading: { en: "What happens after you send it", ar: "ماذا يحدث بعد إرسالك الطلب" },
    steps: [
      {
        title: { en: "You send the journey", ar: "ترسل الرحلة" },
        body: { en: "No payment details and no account to create.", ar: "بلا بيانات دفع وبلا حساب تنشئه." },
      },
      {
        title: { en: "We check it", ar: "نتحقق منها" },
        body: {
          en: "Availability for your date, the vehicle the party and the luggage need, and the pickup arrangement at the property.",
          ar: "التوافر في تاريخك، والمركبة التي تحتاجها المجموعة والأمتعة، وترتيب الاستقبال عند المنشأة.",
        },
      },
      {
        title: { en: "You get a written quotation", ar: "يصلك عرض سعر مكتوب" },
        body: { en: "With the vehicle class and the timing set out. You read it and decide.", ar: "مبيّنًا فئة المركبة والتوقيت. تقرؤه ثم تقرر." },
      },
      {
        title: { en: "The booking is confirmed separately", ar: "ويُؤكَّد الحجز منفصلًا" },
        body: {
          en: "You accept, and the transfer is confirmed only when we send a booking confirmation — which is also where the pickup point is stated.",
          ar: "تقبل العرض، ولا تتأكد الرحلة إلا عندما نرسل رسالة تأكيد حجز — وفيها أيضًا تُذكر نقطة الاستقبال.",
        },
      },
    ],
    note: {
      en: "Sending an enquiry does not confirm a booking and does not hold a vehicle for your date. Nothing is reserved and no payment is taken on this website, and there is no instant price — a hotel transfer is quoted after it has been checked.",
      ar: "وإرسال الطلب لا يؤكد حجزًا ولا يحجز مركبة لتاريخك. ولا يُحجز شيء ولا يُستوفى أي مبلغ عبر هذا الموقع، ولا يوجد سعر فوري — فالنقل الفندقي يُسعَّر بعد التحقق منه.",
    },
  },

  // --- FAQs -----------------------------------------------------------------------------

  faqHeading: { en: "Common questions", ar: "الأسئلة الشائعة" },

  faqs: [
    {
      question: { en: "Do you have an arrangement with my hotel?", ar: "هل لديكم ترتيب مع فندقي؟" },
      answer: {
        en: "No, and we hold no arrangement, partnership or preferred-provider relationship with any hotel anywhere. You book us directly and your confirmation comes to you, not to the front desk. What that means in practice is that the pickup point is agreed with you rather than assumed — which is usually better, because you are the one who knows which door you will walk out of.",
        ar: "لا، وليس لدينا ترتيب ولا شراكة ولا علاقة تفضيلية مع أي فندق في أي مكان. فأنت تحجز لدينا مباشرةً ويصلك التأكيد أنت لا مكتب الاستقبال. ومعنى ذلك عمليًا أن نقطة الاستقبال يُتفق عليها معك لا تُفترض — وهو أفضل عادةً، لأنك أنت من يعرف من أي باب ستخرج.",
      },
    },
    {
      question: { en: "Will the car come to the hotel door?", ar: "هل تصل السيارة إلى باب الفندق؟" },
      answer: {
        en: "It depends on the property. Some hotels allow a vehicle to the entrance, some have a separate pickup lane, and some — particularly in dense central areas — are reached on foot from the nearest permitted point. That is the building's rule rather than ours, so we confirm the arrangement in writing for your booking instead of promising a door here. If you already know your hotel's pickup point, put it in the enquiry.",
        ar: "يعتمد على المنشأة. فبعض الفنادق يسمح بوصول المركبة إلى المدخل، وبعضها له مسار استقبال منفصل، وبعضها — خاصة في المناطق المركزية المزدحمة — لا يُوصَل إليه إلا مشيًا من أقرب نقطة مسموح بها. وتلك قاعدة المبنى لا قاعدتنا، فنؤكد الترتيب كتابةً لحجزك بدل الوعد بباب هنا. وإن كنت تعرف نقطة استقبال فندقك فاذكرها في الطلب.",
      },
    },
    {
      question: { en: "Can you move us between two hotels with all our luggage?", ar: "هل يمكنكم نقلنا بين فندقين بكل أمتعتنا؟" },
      answer: {
        en: "Yes, and it is a common request mid-stay. Send both hotel names with their full addresses — the brand alone is not enough, since several share a name across different parts of a city and sometimes across cities. Tell us the real number of suitcases too: on a hotel move the bags decide the vehicle more often than the headcount does.",
        ar: "نعم، وهو طلب شائع في منتصف الإقامة. أرسل اسمي الفندقين وعنوانيهما الكاملين — فالعلامة التجارية وحدها لا تكفي، إذ يتشارك عدة فنادق الاسم في أجزاء مختلفة من المدينة وأحيانًا بين المدن. واذكر العدد الحقيقي للحقائب أيضًا: ففي الانتقال بين الفنادق تحسم الحقائب المركبة أكثر مما يحسمها عدد الركاب.",
      },
    },
    {
      question: { en: "We are a family of twelve at the same hotel.", ar: "نحن عائلة من اثني عشر فردًا في الفندق نفسه." },
      answer: {
        en: "Fourteen passengers is the most we seat in a single vehicle, so twelve may fit one depending on the luggage. If the bags will not fit, more than one vehicle can be coordinated so you travel together and arrive together, subject to availability on your date. Send the passenger count including children and the number of suitcases, and the quotation sets out what is being sent.",
        ar: "أربعة عشر راكبًا أقصى ما نُجلسه في مركبة واحدة، فقد يتسع اثنا عشر في واحدة بحسب الأمتعة. وإن لم تتسع الحقائب، أمكن تنسيق أكثر من مركبة لتسافروا معًا وتصلوا معًا، رهنًا بالتوافر في تاريخكم. أرسل عدد الركاب ومنهم الأطفال وعدد الحقائب، ويبيّن عرض السعر ما سيُرسَل.",
      },
    },
    {
      question: { en: "Can I book a car from my hotel to a meeting and back?", ar: "هل أحجز سيارة من فندقي إلى اجتماع والعودة؟" },
      answer: {
        en: "Send both legs in one enquiry rather than two separate ones. A known return is easier to plan the same vehicle and driver around, and it is quoted together. Give a full destination address rather than a building name or a district — an office tower can have several entrances for the same reason a hotel does.",
        ar: "أرسل الرحلتين في طلب واحد لا في طلبين منفصلين. فالعودة المعلومة أسهل في تخطيط المركبة والسائق نفسهما حولها، وتُسعَّر معًا. وأعطِ عنوان وجهة كاملًا لا اسم مبنى ولا حيًّا — فبرج المكاتب قد يكون له مداخل عدة للسبب نفسه الذي يجعل للفندق مداخل.",
      },
    },
    {
      question: { en: "How early will the car arrive for my airport departure?", ar: "كم تصل السيارة مبكرًا قبل مغادرتي من المطار؟" },
      answer: {
        en: "Tell us the time you want to be at the terminal and we build the pickup backwards from it. How early you need to be at the desk is your airline's rule — it changes by carrier, destination and season — so ask them rather than us, and we will work to the time you give. We deliberately publish no lead time of our own.",
        ar: "أخبرنا بالوقت الذي تريد أن تكون فيه في الصالة ونبني موعد الاستقبال تراجعيًا منه. ومدى التبكير اللازم للوصول إلى الكاونتر قاعدة شركة طيرانك — وتختلف بحسب الناقل والوجهة والموسم — فاسألهم لا نحن، ونعمل وفق الوقت الذي تعطيه. ولا ننشر مدة تبكير من عندنا عمدًا.",
      },
    },
  ] as ClusterFaq[],

  // --- CTA and related ---------------------------------------------------------------------

  cta: {
    eyebrow: { en: "Hotel, destination, date", ar: "الفندق والوجهة والتاريخ" },
    heading: { en: "Tell us the hotel and where you are going", ar: "أخبرنا بالفندق وإلى أين تتجه" },
    body: {
      en: "The hotel name and address, the other end of the journey, the date and how many of you. We check it and reply with a written price.",
      ar: "اسم الفندق وعنوانه، والطرف الآخر من الرحلة، والتاريخ وعددكم. نتحقق منها ونرد بسعر مكتوب.",
    },
    button: { en: "Request a quotation", ar: "اطلب عرض سعر" },
  } as ClusterCta,

  relatedHeading: { en: "Related services", ar: "خدمات ذات صلة" },

  related: [
    {
      routeKey: "riyadhHotel",
      label: { en: "Riyadh hotel transfers", ar: "النقل من فنادق الرياض" },
      note: {
        en: "The entrance question in full: why a large Riyadh hotel can have several doors, and how to name the right one.",
        ar: "سؤال المدخل كاملًا: لماذا قد يكون لفندق كبير في الرياض أبواب عدة، وكيف تحدد الصحيح منها.",
      },
    },
    {
      routeKey: "jeddahHotel",
      label: { en: "Jeddah hotel transfers", ar: "النقل من فنادق جدة" },
      note: {
        en: "The arrival, the city, and the leg on to Makkah or Madinah — a Jeddah hotel is usually a pause rather than a destination.",
        ar: "الوصول والمدينة والرحلة إلى مكة أو المدينة — ففندق جدة محطة توقف غالبًا لا وجهة.",
      },
    },
    {
      routeKey: "airportTransfers",
      label: { en: "Airport transfers", ar: "النقل من المطارات" },
      note: {
        en: "When the other end is a terminal: how arrivals and departures differ, and what your flight number does.",
        ar: "حين يكون الطرف الآخر صالة مطار: كيف يختلف الوصول عن المغادرة، وما الذي يفعله رقم رحلتك.",
      },
    },
    {
      routeKey: "cityToCity",
      label: { en: "City-to-city transfers", ar: "النقل بين المدن" },
      note: {
        en: "When the hotel is simply where a long drive begins — twelve intercity journeys with pages of their own.",
        ar: "حين يكون الفندق مجرد موضع تبدأ منه رحلة طويلة — اثنتا عشرة رحلة بين المدن لها صفحاتها.",
      },
    },
    {
      routeKey: "umrahTransfers",
      label: { en: "Umrah transfers", ar: "نقل العمرة" },
      note: {
        en: "Hotel legs in Makkah and Madinah as part of one arrangement rather than booked one at a time.",
        ar: "مراحل الفنادق في مكة والمدينة ضمن ترتيب واحد بدل حجزها واحدة تلو الأخرى.",
      },
    },
  ] as RelatedLink[],
};
