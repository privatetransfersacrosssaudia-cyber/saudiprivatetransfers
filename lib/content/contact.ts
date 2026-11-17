import type { RouteKey } from "@/lib/i18n/routes";

/**
 * The Contact page.
 *
 * Written under the same rule as the About page: nothing invented. This
 * business has no published street address, no office, no landline and no
 * registration number, so none appears here. It also has no measured response
 * time, so the page never promises one — "we reply" is as far as the evidence
 * goes, and a page that invents "within 2 hours" is a page that breaks its
 * first promise to every customer who waits three.
 *
 * The page's job is to route an enquiry to the channel that will actually
 * answer it, and to make the quote form the obvious default — a filled form
 * carries the journey details, which an email saying "how much to Jeddah?"
 * does not.
 */

export const contact = {
  metaTitle: {
    en: "Contact Private Transfers Across Saudi",
    ar: "تواصل مع نقل خاص عبر السعودية",
  },
  metaDescription: {
    en: "Send your journey details for a written quotation, or reach us by email or WhatsApp.",
    ar: "أرسل تفاصيل رحلتك للحصول على عرض سعر مكتوب، أو تواصل معنا عبر البريد الإلكتروني أو واتساب.",
  },

  // --- Hero ------------------------------------------------------------------

  heroImageKey: "svc-intercity" as const,
  eyebrow: { en: "Contact", ar: "تواصل معنا" },
  heroTitle: {
    en: "Tell us about your journey",
    ar: "أخبرنا عن رحلتك",
  },
  heroStandfirst: {
    en: "The fastest way to get a price is the quote form below — it asks for the details we need to answer properly. Email and WhatsApp are here too, if you would rather just ask a question first.",
    ar: "أسرع طريقة للحصول على سعر هي نموذج طلب عرض السعر أدناه — فهو يطلب التفاصيل التي نحتاجها للرد بشكل صحيح. والبريد الإلكتروني وواتساب متاحان أيضًا إن كنت تفضّل طرح سؤال أولًا.",
  },
  heroPrimaryCta: { en: "Go to the form", ar: "انتقل إلى النموذج" },

  // --- Channels --------------------------------------------------------------

  channelsHeading: { en: "How to reach us", ar: "كيف تصل إلينا" },
  channelsIntro: {
    en: "Three routes to the same team. Which one you pick mostly decides how quickly we can give you a number rather than a conversation.",
    ar: "ثلاث طرق توصل إلى الفريق نفسه. واختيارك بينها يحدد غالبًا سرعة حصولك على سعر بدل محادثة.",
  },

  channelForm: {
    title: { en: "The quote form", ar: "نموذج طلب عرض السعر" },
    body: {
      en: "Best for a price. It asks for pickup, destination, date, time, passengers and luggage, which is everything we need to quote without a round of questions first.",
      ar: "الأنسب للحصول على سعر. يطلب نقطة الانطلاق والوجهة والتاريخ والوقت وعدد الركاب والحقائب، وهي كل ما نحتاجه للتسعير دون جولة أسئلة مسبقة.",
    },
    action: { en: "Use the form below", ar: "استخدم النموذج أدناه" },
  },

  channelEmail: {
    title: { en: "Email", ar: "البريد الإلكتروني" },
    body: {
      en: "Good for questions, changes to an enquiry you already sent, or anything with an attachment. If you have a reference from an earlier enquiry, quote it and we can pick up the same thread.",
      ar: "مناسب للأسئلة، أو تعديل طلب سبق أن أرسلته، أو أي شيء يحتاج مرفقًا. وإذا كان لديك رقم مرجعي من طلب سابق، فاذكره لنتابع الموضوع نفسه.",
    },
  },

  channelWhatsapp: {
    title: { en: "WhatsApp", ar: "واتساب" },
    body: {
      en: "Good for a quick question while you are planning. A WhatsApp message is an enquiry like any other — it does not confirm a booking on its own, and we will still need the journey details before quoting.",
      ar: "مناسب لسؤال سريع أثناء التخطيط. ورسالة واتساب طلب كغيره — فهي لا تؤكد الحجز بذاتها، وسنظل بحاجة إلى تفاصيل الرحلة قبل التسعير.",
    },
    action: { en: "Open WhatsApp", ar: "افتح واتساب" },
  },

  // --- The form --------------------------------------------------------------

  formHeading: { en: "Request a quotation", ar: "اطلب عرض سعر" },
  formIntro: {
    en: "Nothing is booked and no payment is taken on this page. We reply with a written quotation for the journey you describe.",
    ar: "لا يُحجز شيء ولا يُدفع أي مبلغ في هذه الصفحة. ونرد عليك بعرض سعر مكتوب للرحلة التي تصفها.",
  },

  // --- What to include -------------------------------------------------------

  includeHeading: {
    en: "What to tell us",
    ar: "ما الذي تخبرنا به",
  },
  includeIntro: {
    en: "The form asks for all of this, but it is worth knowing why — each one changes the answer.",
    ar: "يطلب النموذج كل هذا، لكن من المفيد معرفة السبب — فكل بند يغيّر الإجابة.",
  },
  includePoints: [
    {
      title: { en: "Where it starts and ends", ar: "من أين تبدأ وأين تنتهي" },
      body: {
        en: "An address, a hotel name or an airport is enough. Terminal-level detail helps at airports.",
        ar: "يكفي عنوان أو اسم فندق أو مطار. وتفاصيل الصالة مفيدة في المطارات.",
      },
    },
    {
      title: { en: "Date and time", ar: "التاريخ والوقت" },
      body: {
        en: "The same route costs differently at 2am than at midday, and availability varies by date.",
        ar: "المسار نفسه تختلف تكلفته في الثانية فجرًا عنها ظهرًا، ويختلف التوافر بحسب التاريخ.",
      },
    },
    {
      title: { en: "Flight number, for airports", ar: "رقم الرحلة للمطارات" },
      body: {
        en: "It lets the pickup follow the aircraft rather than a fixed clock time when a flight lands early or late.",
        ar: "يتيح أن يتبع الاستقبال وصول الطائرة لا توقيتًا ثابتًا عندما تهبط الرحلة مبكرًا أو متأخرة.",
      },
    },
    {
      title: { en: "Passengers and luggage", ar: "عدد الركاب والحقائب" },
      body: {
        en: "These decide the vehicle category, which is the single biggest factor in the price.",
        ar: "يحددان فئة المركبة، وهي العامل الأكبر في السعر.",
      },
    },
    {
      title: { en: "Anything unusual", ar: "أي أمر غير معتاد" },
      body: {
        en: "A child seat, a wheelchair, an extra stop, a very early start — tell us up front rather than on the day.",
        ar: "مقعد أطفال أو كرسي متحرك أو توقف إضافي أو انطلاقة مبكرة جدًا — أخبرنا مسبقًا لا في يوم الرحلة.",
      },
    },
  ],

  // --- What happens next -----------------------------------------------------

  nextHeading: { en: "What happens next", ar: "ماذا يحدث بعد ذلك" },
  nextIntro: {
    en: "The same process whichever channel you use.",
    ar: "العملية نفسها مهما كانت القناة التي تستخدمها.",
  },
  nextSteps: [
    {
      title: { en: "You send the details", ar: "ترسل التفاصيل" },
      body: {
        en: "By form, email or WhatsApp.",
        ar: "عبر النموذج أو البريد أو واتساب.",
      },
    },
    {
      title: { en: "You get an acknowledgement", ar: "يصلك إشعار استلام" },
      body: {
        en: "With a reference, if you sent an email address.",
        ar: "مع رقم مرجعي، إذا أرسلت بريدًا إلكترونيًا.",
      },
    },
    {
      title: { en: "We review it", ar: "نراجع الطلب" },
      body: {
        en: "Route and availability for your date.",
        ar: "المسار والتوافر في تاريخك.",
      },
    },
    {
      title: { en: "We quote", ar: "نرسل عرض السعر" },
      body: {
        en: "In writing, for that journey.",
        ar: "مكتوبًا، لتلك الرحلة.",
      },
    },
    {
      title: { en: "You decide", ar: "القرار لك" },
      body: {
        en: "Nothing is committed until you confirm.",
        ar: "لا يُلزمك شيء حتى تؤكد.",
      },
    },
  ],
  nextNote: {
    en: "We do not publish a response time, because we would rather not promise one we cannot hold to on every enquiry. If a journey is time-critical, say so in the message and send it by WhatsApp as well as the form.",
    ar: "لا نعلن زمن استجابة محددًا، لأننا نفضّل ألا نعد بما قد لا نلتزم به في كل طلب. وإذا كانت الرحلة حساسة للوقت، فاذكر ذلك في رسالتك وأرسلها عبر واتساب إلى جانب النموذج.",
  },

  // --- Links -----------------------------------------------------------------

  linksHeading: {
    en: "Before you write",
    ar: "قبل أن تكتب",
  },
  linksIntro: {
    en: "Some questions are already answered on the site, and the destination pages often have the distances and route detail people write in to ask about.",
    ar: "بعض الأسئلة مجاب عنها في الموقع، وغالبًا ما تتضمن صفحات الوجهات المسافات وتفاصيل المسار التي يسأل عنها الناس.",
  },
  links: [
    {
      routeKey: "about" as RouteKey,
      label: { en: "About us", ar: "من نحن" },
      body: {
        en: "What we arrange, where we cover and how booking works.",
        ar: "ما الذي نرتّبه، وأين نغطي، وكيف يتم الحجز.",
      },
    },
    {
      routeKey: "riyadhAirport" as RouteKey,
      label: { en: "Airport transfers", ar: "النقل من وإلى المطار" },
      body: {
        en: "How airport pickups are timed against a flight number.",
        ar: "كيف يُضبط الاستقبال من المطار وفق رقم الرحلة.",
      },
    },
    {
      routeKey: "riyadhToJeddah" as RouteKey,
      label: { en: "Intercity routes", ar: "المسارات بين المدن" },
      body: {
        en: "Distances and what the long road journeys involve.",
        ar: "المسافات وما تتضمنه الرحلات البرية الطويلة.",
      },
    },
    {
      routeKey: "saudiToBahrain" as RouteKey,
      label: { en: "Border crossing guide", ar: "دليل عبور الحدود" },
      body: {
        en: "Travel information for the King Fahd Causeway. We do not cross it.",
        ar: "معلومات سفر عن جسر الملك فهد. ونحن لا نعبره.",
      },
    },
  ],

  // --- Closing ---------------------------------------------------------------

  whatsappMessage: {
    en: "Hello — I would like to ask about a private transfer in Saudi Arabia.",
    ar: "مرحبًا — أود الاستفسار عن رحلة نقل خاصة داخل السعودية.",
  },
} as const;
