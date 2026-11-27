import type { RouteKey } from "@/lib/i18n/routes";
import type { ClusterFaq } from "@/lib/content/riyadh/types";

/**
 * The About page.
 *
 * Written to the hard constraint that nothing here may be invented. This
 * company has no published founding date, no office address, no fleet count,
 * no staff numbers, no awards and no customer testimonials — so the page says
 * none of those things. What it has instead is a specific, checkable account
 * of what it provides, where, and what happens after an enquiry, which is what
 * a traveller deciding whether to trust a transfer company actually needs.
 *
 * The owner has confirmed that the business arranges AND provides the
 * transfer, so the page says "arrange and provide" and never frames itself as
 * an intermediary, a referral platform or a lead-generation site.
 *
 * Two claims remain deliberately absent and should stay absent unless the
 * owner confirms them: that we own vehicles, and that we employ drivers. How
 * vehicles and drivers are sourced is simply not described either way, which
 * is a different thing from describing someone else as providing the service.
 *
 * Service names, coverage and the booking steps are all drawn from data that
 * already exists elsewhere in the project (services.ts, routes.ts), so the
 * page cannot drift away from what the rest of the site offers.
 */

export const about = {
  metaTitle: {
    en: "About Private Transfers Across Saudi",
    ar: "عن نقل خاص عبر السعودية",
  },
  metaDescription: {
    en: "Who we are, what we provide, where we cover, and exactly what happens after you send a journey enquiry.",
    ar: "من نحن، وما الذي نقدّمه، وأين نغطي، وماذا يحدث بالضبط بعد إرسالك طلب رحلة.",
  },

  // --- Hero ------------------------------------------------------------------

  heroImageKey: "coverage" as const,
  eyebrow: { en: "About us", ar: "من نحن" },
  heroTitle: {
    en: "Private transfers across Saudi Arabia",
    ar: "نقل خاص في جميع أنحاء السعودية",
  },
  heroStandfirst: {
    en: "Plan your journey with private ground transportation arranged around your travel requirements — airports, hotels, city journeys and long road routes between Saudi cities.",
    ar: "خطّط لرحلتك مع نقل بري خاص يُرتَّب حول متطلبات سفرك — المطارات والفنادق والتنقلات داخل المدن والرحلات البرية الطويلة بين المدن السعودية.",
  },
  heroPrimaryCta: { en: "Request a quote", ar: "اطلب عرض سعر" },
  heroSecondaryCta: { en: "Explore destinations", ar: "استكشف الوجهات" },

  // --- Who we are ------------------------------------------------------------

  whoHeading: { en: "Who we are", ar: "من نحن" },
  whoBody: [
    {
      en: "Private Transfers Across Saudi arranges and provides private ground transportation for journeys inside the Kingdom. You tell us the journey — where it starts, where it ends, when, and how many people are travelling — and we come back with a written quotation for that specific trip.",
      ar: "يرتّب «نقل خاص عبر السعودية» النقل البري الخاص للرحلات داخل المملكة ويقدّمه. تخبرنا بتفاصيل الرحلة — من أين تبدأ وأين تنتهي ومتى وكم عدد المسافرين — ونعود إليك بعرض سعر مكتوب لتلك الرحلة تحديدًا.",
    },
    {
      en: "What we are not is an instant-booking website. There is no checkout here and no price before we have seen the journey, because a transfer from an airport at two in the morning and the same route at midday are not the same job. Every quotation is written against the details you send.",
      ar: "وما لسنا عليه هو أننا لسنا موقع حجز فوري. فلا يوجد دفع فوري هنا ولا سعر قبل أن نطّلع على الرحلة، لأن النقل من المطار في الثانية فجرًا ليس كالمسار نفسه ظهرًا. وكل عرض سعر يُكتب وفق التفاصيل التي ترسلها.",
    },
    {
      en: "The website is published in English and Arabic, and enquiries are handled in whichever language you write in.",
      ar: "الموقع منشور بالعربية والإنجليزية، وتُعالَج الطلبات باللغة التي تكتب بها.",
    },
  ],

  // --- What we provide -------------------------------------------------------

  servicesHeading: { en: "What we provide", ar: "ما الذي نقدّمه" },
  servicesIntro: {
    en: "Eight kinds of journey, each with its own page explaining what it covers.",
    ar: "ثمانية أنواع من الرحلات، ولكل منها صفحته التي تشرح ما يشمله.",
  },
  /**
   * Linked to the destination or service page that best explains each one.
   * Nothing here is listed that the site does not already cover elsewhere.
   */
  serviceLinks: [
    {
      name: { en: "Airport transfers", ar: "النقل من وإلى المطار" },
      body: {
        en: "Meet-on-arrival pickups and departure runs, timed against the flight number you give us rather than the clock.",
        ar: "استقبال عند الوصول ورحلات مغادرة، تُضبط على رقم الرحلة الذي تعطينا إياه لا على توقيت الساعة.",
      },
      routeKey: "riyadhAirport" as RouteKey,
    },
    {
      name: { en: "Hotel transfers", ar: "النقل من وإلى الفنادق" },
      body: {
        en: "Door-to-door journeys between hotels and airports, stations or other addresses in the same city.",
        ar: "رحلات من الباب إلى الباب بين الفنادق والمطارات أو المحطات أو عناوين أخرى في المدينة نفسها.",
      },
      routeKey: "riyadhHotel" as RouteKey,
    },
    {
      name: { en: "City journeys", ar: "التنقل داخل المدن" },
      body: {
        en: "Local transfers within a city, including railway stations and business districts.",
        ar: "تنقلات محلية داخل المدينة، تشمل محطات القطار ومناطق الأعمال.",
      },
      routeKey: "riyadhRailway" as RouteKey,
    },
    {
      name: { en: "Intercity journeys", ar: "الرحلات بين المدن" },
      body: {
        en: "Long road routes between Saudi cities, planned as a single private vehicle for the whole leg.",
        ar: "مسارات برية طويلة بين المدن السعودية، تُخطَّط بمركبة خاصة واحدة للرحلة كاملة.",
      },
      routeKey: "riyadhToJeddah" as RouteKey,
    },
    {
      name: {
        en: "Umrah and Hajj journeys",
        ar: "رحلات العمرة والحج",
      },
      body: {
        en: "Pilgrimage-related road transport, including the Jeddah airport to Makkah leg and Madinah arrivals.",
        ar: "النقل البري المرتبط بالحج والعمرة، بما في ذلك مرحلة مطار جدة إلى مكة المكرمة والوصول إلى المدينة المنورة.",
      },
      routeKey: "jeddahToMakkah" as RouteKey,
    },
    {
      name: { en: "Journeys to land borders", ar: "الرحلات إلى المنافذ البرية" },
      body: {
        en: "Journeys out of the Kingdom to confirmed neighbouring destinations, including across the King Fahd Causeway to addresses in Bahrain.",
        ar: "رحلات من المملكة إلى وجهات مجاورة مؤكَّدة، منها العبور عبر جسر الملك فهد إلى عناوين في البحرين.",
      },
      routeKey: "saudiToBahrain" as RouteKey,
    },
  ],
  servicesFootnote: {
    en: "We provide transfers inside Saudi Arabia, and cross-border journeys to confirmed neighbouring destinations. We do not issue visas, process border formalities or give immigration advice.",
    ar: "نقدّم رحلات النقل الخاص داخل المملكة العربية السعودية، ورحلات عابرة للحدود إلى وجهات مجاورة مؤكَّدة. ولا نُصدر تأشيرات ولا نُنجز إجراءات الحدود ولا نقدّم استشارات جوازات.",
  },

  // --- Coverage --------------------------------------------------------------

  coverageHeading: { en: "Where we cover", ar: "أين نغطي" },
  coverageIntro: {
    en: "Each city below has its own page describing the journeys we provide there. Coverage is strongest around Riyadh, Jeddah and the Eastern Province; for anywhere not listed, send the journey and we will tell you honestly whether we can arrange it.",
    ar: "لكل مدينة أدناه صفحتها التي تصف الرحلات التي نقدّمها فيها. والتغطية أقوى حول الرياض وجدة والمنطقة الشرقية؛ وبالنسبة لأي مكان غير مدرج، أرسل تفاصيل الرحلة وسنخبرك بصراحة إن كنا نستطيع ترتيبها.",
  },
  /**
   * Grouped by region. Each entry carries its own bilingual label rather than
   * deriving one from the route key: a key like `alula` would render as
   * "Alula" in English and as a Latin string on the Arabic page, which is
   * exactly the kind of detail that makes a bilingual site feel machine-made.
   */
  coverageGroups: [
    {
      region: { en: "Riyadh Region", ar: "منطقة الرياض" },
      places: [
        { routeKey: "riyadh" as RouteKey, label: { en: "Riyadh", ar: "الرياض" } },
        { routeKey: "diriyah" as RouteKey, label: { en: "Diriyah", ar: "الدرعية" } },
        { routeKey: "alKharj" as RouteKey, label: { en: "Al Kharj", ar: "الخرج" } },
        { routeKey: "shaqra" as RouteKey, label: { en: "Shaqra", ar: "شقراء" } },
      ],
    },
    {
      region: { en: "Makkah Region", ar: "منطقة مكة المكرمة" },
      places: [
        { routeKey: "jeddah" as RouteKey, label: { en: "Jeddah", ar: "جدة" } },
        { routeKey: "makkah" as RouteKey, label: { en: "Makkah", ar: "مكة المكرمة" } },
        { routeKey: "taif" as RouteKey, label: { en: "Taif", ar: "الطائف" } },
        { routeKey: "rabigh" as RouteKey, label: { en: "Rabigh", ar: "رابغ" } },
      ],
    },
    {
      region: { en: "Madinah Region", ar: "منطقة المدينة المنورة" },
      places: [
        { routeKey: "madinah" as RouteKey, label: { en: "Madinah", ar: "المدينة المنورة" } },
        { routeKey: "alula" as RouteKey, label: { en: "AlUla", ar: "العُلا" } },
        { routeKey: "yanbu" as RouteKey, label: { en: "Yanbu", ar: "ينبع" } },
      ],
    },
    {
      region: { en: "Eastern Province", ar: "المنطقة الشرقية" },
      places: [
        { routeKey: "dammam" as RouteKey, label: { en: "Dammam", ar: "الدمام" } },
        { routeKey: "jubail" as RouteKey, label: { en: "Jubail", ar: "الجبيل" } },
        { routeKey: "alAhsa" as RouteKey, label: { en: "Al Ahsa", ar: "الأحساء" } },
      ],
    },
    {
      region: { en: "Qassim Region", ar: "منطقة القصيم" },
      places: [
        { routeKey: "buraydah" as RouteKey, label: { en: "Buraydah", ar: "بريدة" } },
        { routeKey: "unaizah" as RouteKey, label: { en: "Unaizah", ar: "عنيزة" } },
      ],
    },
    {
      region: { en: "South and north", ar: "الجنوب والشمال" },
      places: [
        { routeKey: "abha" as RouteKey, label: { en: "Abha", ar: "أبها" } },
        { routeKey: "jazan" as RouteKey, label: { en: "Jazan", ar: "جازان" } },
        { routeKey: "najran" as RouteKey, label: { en: "Najran", ar: "نجران" } },
        { routeKey: "tabuk" as RouteKey, label: { en: "Tabuk", ar: "تبوك" } },
      ],
    },
  ],

  // --- Booking ---------------------------------------------------------------

  bookingHeading: { en: "How booking works", ar: "كيف يتم الحجز" },
  bookingIntro: {
    en: "Sending an enquiry is not a booking. Here is what actually happens, in order.",
    ar: "إرسال الطلب ليس حجزًا. وهذا ما يحدث فعليًا، بالترتيب.",
  },
  bookingSteps: [
    {
      title: { en: "Send your details", ar: "أرسل تفاصيلك" },
      body: {
        en: "Pickup, destination, date, time, passengers and luggage.",
        ar: "نقطة الانطلاق والوجهة والتاريخ والوقت وعدد الركاب والحقائب.",
      },
    },
    {
      title: { en: "We review it", ar: "نراجع الطلب" },
      body: {
        en: "We check the route and whether a vehicle is available for it.",
        ar: "نتحقق من المسار ومن توفر مركبة له.",
      },
    },
    {
      title: { en: "You get a quotation", ar: "تصلك عرض السعر" },
      body: {
        en: "In writing, priced for that journey.",
        ar: "مكتوبًا، ومُسعَّرًا لتلك الرحلة.",
      },
    },
    {
      title: { en: "You confirm", ar: "تؤكّد الحجز" },
      body: {
        en: "Nothing is committed until you say yes.",
        ar: "لا يُلزمك شيء حتى توافق.",
      },
    },
    {
      title: { en: "We coordinate it", ar: "ننسّق الرحلة" },
      body: {
        en: "Vehicle and driver are arranged for the day.",
        ar: "تُرتَّب المركبة والسائق ليوم الرحلة.",
      },
    },
  ],
  bookingNote: {
    en: "Submitting the form does not confirm a booking and takes no payment. If we cannot arrange a journey, we will say so rather than leave you waiting.",
    ar: "إرسال النموذج لا يؤكد الحجز ولا يُحصّل أي مبلغ. وإذا تعذّر علينا ترتيب رحلة، فسنخبرك بذلك بدل أن نتركك في الانتظار.",
  },

  // --- Why us ----------------------------------------------------------------

  whyHeading: {
    en: "What you can expect from us",
    ar: "ما الذي تتوقعه منّا",
  },
  whyIntro: {
    en: "Not a list of superlatives. These are things the way we work actually delivers.",
    ar: "ليست قائمة من عبارات المبالغة. بل أمور يحققها أسلوب عملنا فعلًا.",
  },
  whyPoints: [
    {
      title: { en: "A price for your journey", ar: "سعر لرحلتك أنت" },
      body: {
        en: "Quotations are written against the trip you described, not taken from a generic rate card.",
        ar: "تُكتب عروض الأسعار وفق الرحلة التي وصفتها، لا من قائمة أسعار عامة.",
      },
    },
    {
      title: { en: "Vehicle preferences", ar: "تفضيلات المركبة" },
      body: {
        en: "Tell us the category you want and how much luggage you have, and the quotation reflects it.",
        ar: "أخبرنا بالفئة التي تريدها وحجم أمتعتك، ويعكس عرض السعر ذلك.",
      },
    },
    {
      title: { en: "Flight-aware airport pickups", ar: "استقبال يراعي رحلتك" },
      body: {
        en: "Give us the flight number and the pickup is planned around the aircraft rather than a fixed time.",
        ar: "أعطنا رقم الرحلة ويُخطَّط الاستقبال وفق وصول الطائرة لا وفق وقت ثابت.",
      },
    },
    {
      title: { en: "Both languages", ar: "باللغتين" },
      body: {
        en: "The whole site is published in English and Arabic, and we reply in the language you wrote in.",
        ar: "الموقع كاملًا منشور بالعربية والإنجليزية، ونرد باللغة التي كتبت بها.",
      },
    },
    {
      title: { en: "Straight answers", ar: "إجابات صريحة" },
      body: {
        en: "Where we cannot confirm something — a route, a requirement, a price — we say so instead of guessing.",
        ar: "وحيث لا نستطيع تأكيد أمر ما — مسارًا أو اشتراطًا أو سعرًا — نقول ذلك بدل التخمين.",
      },
    },
    {
      title: { en: "One thread per journey", ar: "متابعة واحدة لكل رحلة" },
      body: {
        en: "Your enquiry carries a reference, so follow-up messages stay attached to the right trip.",
        ar: "يحمل طلبك رقمًا مرجعيًا، فتبقى رسائل المتابعة مرتبطة بالرحلة الصحيحة.",
      },
    },
  ],

  // --- Approach --------------------------------------------------------------

  approachHeading: { en: "How we work", ar: "أسلوب عملنا" },
  approachPoints: [
    {
      title: { en: "Details before prices", ar: "التفاصيل قبل الأسعار" },
      body: {
        en: "We ask for the journey first because the journey is what sets the price.",
        ar: "نسأل عن الرحلة أولًا لأن الرحلة هي ما يحدد السعر.",
      },
    },
    {
      title: { en: "Written quotations", ar: "عروض أسعار مكتوبة" },
      body: {
        en: "So there is a record of what was agreed, for both sides.",
        ar: "ليبقى سجل بما اتُّفق عليه، للطرفين معًا.",
      },
    },
    {
      title: { en: "Plain communication", ar: "تواصل واضح" },
      body: {
        en: "No automated pressure, no countdown timers, no invented scarcity.",
        ar: "بلا ضغط آلي ولا مؤقتات تنازلية ولا ندرة مفتعلة.",
      },
    },
    {
      title: { en: "Accurate information", ar: "معلومات دقيقة" },
      body: {
        en: "Our destination and border guides cite their sources and mark what could not be verified.",
        ar: "تذكر أدلة الوجهات والحدود لدينا مصادرها وتوسم ما لم يمكن التحقق منه.",
      },
    },
  ],

  // --- FAQ -------------------------------------------------------------------

  faqHeading: { en: "Common questions", ar: "أسئلة شائعة" },
  faqs: [
    {
      question: {
        en: "What kinds of journey can I request?",
        ar: "ما أنواع الرحلات التي يمكنني طلبها؟",
      },
      answer: {
        en: "Airport pickups and drop-offs, hotel transfers, journeys within a city, long intercity routes, Umrah and Hajj-related road transport, private day trips, and journeys to Saudi land border crossings. All of them inside Saudi Arabia.",
        ar: "الاستقبال والتوصيل من المطارات، والنقل من وإلى الفنادق، والتنقل داخل المدينة، والمسارات الطويلة بين المدن، والنقل البري المرتبط بالعمرة والحج، والرحلات اليومية الخاصة، والرحلات إلى المنافذ البرية السعودية. وجميعها داخل المملكة.",
      },
    },
    {
      question: { en: "How do I get a quotation?", ar: "كيف أحصل على عرض سعر؟" },
      answer: {
        en: "Send the journey through the quote form: pickup, destination, date, time, passengers, luggage and how to reach you. We reply with a written quotation for that trip. The form takes no payment.",
        ar: "أرسل تفاصيل الرحلة عبر نموذج طلب عرض السعر: نقطة الانطلاق والوجهة والتاريخ والوقت وعدد الركاب والحقائب وطريقة التواصل معك. ونرد عليك بعرض سعر مكتوب لتلك الرحلة. ولا يُحصّل النموذج أي مبلغ.",
      },
    },
    {
      question: {
        en: "Do you provide airport transfers?",
        ar: "هل تقدّمون النقل من وإلى المطارات؟",
      },
      answer: {
        en: "Yes. Give us the flight number and the pickup is planned around the aircraft's arrival rather than a fixed clock time, which matters when a flight lands early or late.",
        ar: "نعم. أعطنا رقم الرحلة ويُخطَّط الاستقبال وفق وصول الطائرة لا وفق وقت ثابت، وهو ما يهم عندما تهبط الرحلة مبكرًا أو متأخرة.",
      },
    },
    {
      question: {
        en: "Can I request an intercity transfer?",
        ar: "هل يمكنني طلب رحلة بين المدن؟",
      },
      answer: {
        en: "Yes — long road routes between Saudi cities are one of the main things we provide. Several corridors have their own pages with distances and what the drive involves.",
        ar: "نعم — المسارات البرية الطويلة بين المدن السعودية من أبرز ما نقدّمه. ولعدة مسارات صفحاتها الخاصة التي تبيّن المسافات وما تتضمنه الرحلة.",
      },
    },
    {
      question: { en: "How do I choose a vehicle?", ar: "كيف أختار المركبة؟" },
      answer: {
        en: "The quote form has a vehicle preference field. Tell us the category you want and how many passengers and bags you have; the quotation is written against that. We confirm what is available for your date rather than promising a specific vehicle in advance.",
        ar: "يحتوي نموذج طلب عرض السعر على حقل لتفضيل المركبة. أخبرنا بالفئة التي تريدها وعدد الركاب والحقائب، ويُكتب عرض السعر وفق ذلك. ونؤكد المتاح لتاريخك بدل الوعد بمركبة بعينها مسبقًا.",
      },
    },
    {
      question: {
        en: "Is my booking confirmed as soon as I send the form?",
        ar: "هل يُؤكَّد حجزي فور إرسال النموذج؟",
      },
      answer: {
        en: "No. The form sends an enquiry. We review it, check availability and reply with a quotation; the booking is confirmed only after you accept it. You will receive an acknowledgement with a reference when the enquiry reaches us.",
        ar: "لا. يرسل النموذج طلبًا. نراجعه ونتحقق من التوافر ونرد بعرض سعر؛ ولا يُؤكَّد الحجز إلا بعد قبولك له. وستصلك رسالة استلام تحمل رقمًا مرجعيًا عند وصول الطلب إلينا.",
      },
    },
    {
      question: {
        en: "Can I contact you on WhatsApp?",
        ar: "هل يمكنني التواصل معكم عبر واتساب؟",
      },
      answer: {
        en: "Yes. There is a WhatsApp button on every page. It opens a message to us with the page you were reading already filled in. A WhatsApp message is an enquiry like any other, and does not by itself confirm a booking.",
        ar: "نعم. يوجد زر واتساب في كل صفحة، ويفتح رسالة إلينا مع ذكر الصفحة التي كنت تقرؤها. ورسالة واتساب طلب كغيره، ولا تؤكد الحجز بذاتها.",
      },
    },
  ] satisfies ClusterFaq[],

  // --- Final CTA -------------------------------------------------------------

  ctaHeading: {
    en: "Planning a journey across Saudi Arabia?",
    ar: "هل تخطط لرحلة في أنحاء السعودية؟",
  },
  ctaBody: {
    en: "Share your pickup location, destination and travel details. Our team will review your enquiry and provide a quotation.",
    ar: "شارِكنا نقطة انطلاقك ووجهتك وتفاصيل سفرك. وسيراجع فريقنا طلبك ويزوّدك بعرض سعر.",
  },
  ctaPrimary: { en: "Request a quote", ar: "اطلب عرض سعر" },
  whatsappMessage: {
    en: "Hello — I would like a quotation for a private transfer in Saudi Arabia.",
    ar: "مرحبًا — أرغب في الحصول على عرض سعر لرحلة نقل خاصة داخل السعودية.",
  },
} as const;
