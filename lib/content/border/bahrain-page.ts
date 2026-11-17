import type { Bilingual } from "@/lib/i18n/config";
import type { RouteKey } from "@/lib/i18n/routes";
import type { CostRow, TimelineStep } from "@/components/border/guide-extras";

/**
 * Presentation content for the Saudi–Bahrain guide.
 *
 * Deliberately separate from `bahrain.ts`, which holds the research: the
 * claims, their statuses, their sources and the dates they were checked.
 * Nothing in that file changed when this page was redesigned, and nothing in
 * this file is evidence. Keeping the two apart means the design can be
 * reworked again without touching a single sourced claim — and that a claim
 * can be re-verified without touching the layout.
 *
 * Every figure quoted below is already carried, with its sources, in
 * `bahrain.ts`. Where a number appears here it is because it also belongs in
 * a table; the table says plainly which group it sits in.
 */

export interface RelatedRoute {
  routeKey: RouteKey;
  label: Bilingual<string>;
  description: Bilingual<string>;
}

export const bahrainPage = {
  eyebrow: {
    en: "Border crossing guide",
    ar: "دليل عبور الحدود",
  },

  heroImageKey: "khobar-corniche" as const,

  primaryCta: {
    en: "Request a transfer quote",
    ar: "اطلب عرض سعر للنقل",
  },
  secondaryCta: {
    en: "Read the guide",
    ar: "اقرأ الدليل",
  },

  contents: {
    en: "What this guide covers",
    ar: "ما يغطيه هذا الدليل",
  },

  // --- At a glance -----------------------------------------------------------

  overviewHeading: { en: "At a glance", ar: "نظرة سريعة" },

  overviewRows: [
    {
      label: { en: "Destination", ar: "الوجهة" },
      value: { en: "Kingdom of Bahrain", ar: "مملكة البحرين" },
    },
    {
      label: { en: "Crossing", ar: "المنفذ" },
      value: {
        en: "King Fahd Causeway — the only road link between the two countries",
        ar: "جسر الملك فهد — الرابط البري الوحيد بين البلدين",
      },
    },
    {
      label: { en: "Travel mode", ar: "وسيلة السفر" },
      value: {
        en: "Private vehicle, taxi or bus across the causeway",
        ar: "مركبة خاصة أو سيارة أجرة أو حافلة عبر الجسر",
      },
    },
    {
      label: { en: "Saudi approach", ar: "الطريق من الجانب السعودي" },
      value: {
        en: "From Al Khobar, on the Eastern Province coast south of Dammam",
        ar: "من الخبر على ساحل المنطقة الشرقية جنوب الدمام",
      },
    },
    {
      label: { en: "Visas", ar: "التأشيرات" },
      value: {
        en: "Applied for at evisa.gov.bh, the only official Bahraini visa site",
        ar: "تُطلب عبر evisa.gov.bh، الموقع الرسمي الوحيد للتأشيرات البحرينية",
      },
    },
    {
      label: { en: "Before you go", ar: "قبل أن تسافر" },
      value: {
        en: "Leaving Saudi Arabia and entering Bahrain are decided separately. Check both.",
        ar: "مغادرة السعودية ودخول البحرين يُبتّان بشكل منفصل. تحقق من الأمرين.",
      },
    },
  ] satisfies { label: Bilingual<string>; value: Bilingual<string> }[],

  overviewFootnote: {
    en: "We have not included a journey time or a crossing fee here, because neither is published by the authorities in a form we could confirm. Both are covered honestly further down.",
    ar: "لم ندرج هنا زمن الرحلة ولا رسوم العبور، لأن أيًّا منهما غير منشور من الجهات الرسمية بصورة أمكننا تأكيدها. ويتناولهما الدليل أدناه بصراحة.",
  },

  // --- Crossing process ------------------------------------------------------

  processHeading: {
    en: "How the crossing works",
    ar: "كيف يجري العبور",
  },
  processIntro: {
    en: "Neither authority publishes a step-by-step procedure for passengers, so the sequence below describes what a road border of this kind generally involves. Treat it as orientation, not as a published process — the only part confirmed in official guidance is the customs booking that goods vehicles must make.",
    ar: "لا تنشر أي من الجهتين إجراءً تفصيليًا للمسافرين، ولذلك يصف التسلسل أدناه ما ينطوي عليه عادةً منفذ بري من هذا النوع. اعتبره توجيهًا عامًا لا إجراءً منشورًا — فالجزء الوحيد المؤكَّد في الإرشادات الرسمية هو حجز موعد الجمارك المطلوب من مركبات البضائع.",
  },

  processSteps: [
    {
      title: {
        en: "Prepare your documents before you leave",
        ar: "جهّز وثائقك قبل المغادرة",
      },
      body: {
        en: "Passports for everyone travelling, any Bahraini visa already issued printed on paper, and the vehicle's registration and your licence. Check your own Saudi exit position separately.",
        ar: "جوازات سفر لكل المسافرين، وأي تأشيرة بحرينية صدرت مسبقًا مطبوعة ورقيًا، واستمارة المركبة ورخصة القيادة. وتحقق من وضع خروجك من السعودية بشكل منفصل.",
      },
      unconfirmed: true,
    },
    {
      title: {
        en: "Arrive at the Saudi side of the causeway",
        ar: "الوصول إلى الجانب السعودي من الجسر",
      },
      body: {
        en: "The causeway begins just outside Al Khobar. Toll gates are passed here; the E-JESR lanes let a vehicle through automatically if a crossing ticket was bought in advance through the Jesr app.",
        ar: "يبدأ الجسر من خارج الخبر مباشرة. وتُعبر بوابات الرسوم هنا؛ وتتيح مسارات E-JESR مرور المركبة تلقائيًا إذا اشتُريت تذكرة العبور مسبقًا عبر تطبيق جسر.",
      },
    },
    {
      title: {
        en: "Complete Saudi exit formalities",
        ar: "إنهاء إجراءات الخروج السعودية",
      },
      body: {
        en: "Saudi authorities decide whether you may leave. This is independent of any Bahraini visa you hold, and a visa gives you no standing here.",
        ar: "تقرر الجهات السعودية ما إذا كان يحق لك المغادرة. وهذا مستقل عن أي تأشيرة بحرينية تحملها، ولا تمنحك التأشيرة أي صفة هنا.",
      },
      unconfirmed: true,
    },
    {
      title: {
        en: "Cross to the Bahraini checkpoint",
        ar: "العبور إلى نقطة التفتيش البحرينية",
      },
      body: {
        en: "The causeway runs to a midway point and on to the Bahraini side, where entry is processed.",
        ar: "يمتد الجسر إلى نقطة وسطية ثم إلى الجانب البحريني، حيث تُنجز إجراءات الدخول.",
      },
      unconfirmed: true,
    },
    {
      title: {
        en: "Complete Bahraini entry",
        ar: "إنهاء إجراءات الدخول البحرينية",
      },
      body: {
        en: "Present the passport you applied on, with your printed visa if one was issued. Bahrain states plainly that a visa does not guarantee entry: admission is at the immigration officer's discretion and all conditions must be met on arrival.",
        ar: "قدّم الجواز الذي تقدّمت به، مع تأشيرتك المطبوعة إن صدرت. وتنص البحرين صراحة على أن التأشيرة لا تضمن الدخول: فالسماح بالدخول خاضع لتقدير ضابط الجوازات، ويجب تحقق جميع الشروط عند الوصول.",
      },
    },
    {
      title: {
        en: "Vehicle, insurance and customs",
        ar: "المركبة والتأمين والجمارك",
      },
      body: {
        en: "Goods vehicles book customs appointments through FASAH on both sides and buy insurance through the Jesr app or United Insurance at the causeway. For a private car, confirm with your own insurer whether your policy extends across.",
        ar: "تحجز مركبات البضائع مواعيد الجمارك عبر منصة فسح على الجانبين، وتشتري التأمين عبر تطبيق جسر أو من المتحدة للتأمين في الجسر. أما السيارة الخاصة فتأكد من شركة التأمين لديك عمّا إذا كانت وثيقتك تمتد عبر الحدود.",
      },
    },
  ] satisfies TimelineStep[],

  // --- Costs -----------------------------------------------------------------

  costsHeading: { en: "What it costs", ar: "التكاليف" },
  costsIntro: {
    en: "Grouped by how well each figure is established. We have not filled in the gaps: where no amount is published anywhere we could reach, the table says so rather than guessing.",
    ar: "مُجمَّعة بحسب مدى توثيق كل رقم. ولم نملأ الفجوات: فحيث لا يوجد مبلغ منشور في أي مصدر أمكننا الوصول إليه، يذكر الجدول ذلك بدل التخمين.",
  },

  costRows: [
    {
      item: {
        en: "Disability, student and martyrs'-families packages",
        ar: "باقات ذوي الإعاقة والطلاب وأسر الشهداء",
      },
      amount: { en: "50% off the crossing fee", ar: "خصم 50% من رسوم العبور" },
      basis: "official",
      detail: {
        en: "Published by the Causeway Authority. The disability card needs a minimum top-up of SAR 25.",
        ar: "منشور من المؤسسة العامة للجسر. وتتطلب بطاقة ذوي الإعاقة شحنًا بحد أدنى 25 ريالًا.",
      },
    },
    {
      item: { en: "Parking at the causeway", ar: "وقوف السيارات في الجسر" },
      amount: { en: "Free for 15 minutes", ar: "مجاني لمدة 15 دقيقة" },
      basis: "official",
      detail: {
        en: "Published by the Causeway Authority.",
        ar: "منشور من المؤسسة العامة للجسر.",
      },
    },
    {
      item: {
        en: "Truck overweight surcharge",
        ar: "رسوم تجاوز وزن الشاحنات",
      },
      amount: { en: "SAR 300", ar: "300 ريال" },
      basis: "official",
      detail: {
        en: "Per axle over its permitted weight, and per tonne or part tonne over the permitted gross weight. Oversize surcharges run from SAR 500 to SAR 2,000.",
        ar: "لكل محور يتجاوز وزنه المسموح، ولكل طن أو جزء منه يتجاوز الوزن الإجمالي المسموح. وتتراوح رسوم تجاوز الأبعاد بين 500 و2,000 ريال.",
      },
    },
    {
      item: { en: "Passenger-car toll, each way", ar: "رسم عبور السيارة لكل اتجاه" },
      amount: { en: "SAR 35", ar: "35 ريالًا" },
      basis: "reported",
      detail: {
        en: "Several news outlets reported in February 2026 that this took effect on 18 February 2026, with minibuses at SAR 55 and large buses at SAR 70. The Causeway Authority's accessible website publishes no passenger-car tariff at all, so we cannot confirm the figure and cannot promise it is current — older guides still quote SAR 25. Check the Jesr app or call 800 4000 999.",
        ar: "ذكرت عدة منافذ إخبارية في فبراير 2026 أن هذا سرى اعتبارًا من 18 فبراير 2026، مع 55 ريالًا للحافلات الصغيرة و70 ريالًا للحافلات الكبيرة. ولا ينشر موقع المؤسسة المتاح أي تعرفة للسيارات الخاصة، فلا يمكننا تأكيد الرقم ولا ضمان أنه محدَّث — ولا تزال أدلة أقدم تذكر 25 ريالًا. راجع تطبيق جسر أو اتصل على 800 4000 999.",
      },
    },
    {
      item: { en: "Bahraini visa fee", ar: "رسوم التأشيرة البحرينية" },
      amount: { en: "Not published", ar: "غير منشورة" },
      basis: "unknown",
      detail: {
        en: "No amount appears anywhere on the readable parts of the official portal. Figures circulating online disagree with each other, so none is reproduced here. The fee is shown in the portal's own eligibility tool, and is not refunded if the application is refused.",
        ar: "لا يظهر أي مبلغ في الأجزاء المقروءة من البوابة الرسمية. والأرقام المتداولة عبر الإنترنت متعارضة، فلا يُعاد نشر أي منها هنا. وتظهر الرسوم في أداة الاستحقاق داخل البوابة، ولا تُردّ في حال رفض الطلب.",
      },
    },
    {
      item: { en: "Vehicle insurance for Bahrain", ar: "تأمين المركبة للبحرين" },
      amount: { en: "Not published", ar: "غير منشور" },
      basis: "unknown",
      detail: {
        en: "The Causeway Authority sells cover and extensions through the Jesr app but publishes no price, and does not state on its readable pages that cover is compulsory for a private car. Ask your own insurer whether your policy extends to Bahrain.",
        ar: "تبيع المؤسسة التغطية والتمديد عبر تطبيق جسر لكنها لا تنشر سعرًا، ولا تنص في صفحاتها المقروءة على أن التغطية إلزامية للسيارة الخاصة. اسأل شركة التأمين لديك عمّا إذا كانت وثيقتك تمتد إلى البحرين.",
      },
    },
  ] satisfies CostRow[],

  // --- Conversion ------------------------------------------------------------

  routesHeading: {
    en: "Getting to the Saudi side",
    ar: "الوصول إلى الجانب السعودي",
  },
  routesIntro: {
    en: "The causeway starts just outside Al Khobar, and most people reach it by road from elsewhere in the Kingdom. These are the journeys we do run — all of them ending on the Saudi side.",
    ar: "يبدأ الجسر من خارج الخبر مباشرة، ويصل إليه معظم الناس برًّا من مناطق أخرى في المملكة. وهذه هي الرحلات التي نشغّلها فعلًا — وجميعها تنتهي على الجانب السعودي.",
  },
  routesFootnote: {
    en: "We do not cross the causeway and we do not provide transport inside Bahrain. The crossing itself, and anything beyond it, is yours to arrange.",
    ar: "نحن لا نعبر الجسر ولا نقدّم النقل داخل البحرين. أما العبور نفسه وما بعده فهو من ترتيبك.",
  },

  relatedRoutes: [
    {
      routeKey: "riyadhToAlKhobar",
      label: { en: "Riyadh to Al Khobar", ar: "الرياض إلى الخبر" },
      description: {
        en: "The long eastward run to the Gulf coast, ending at the city where the causeway begins.",
        ar: "الرحلة الطويلة شرقًا إلى ساحل الخليج، وتنتهي عند المدينة التي يبدأ منها الجسر.",
      },
    },
    {
      routeKey: "riyadhToDammam",
      label: { en: "Riyadh to Dammam", ar: "الرياض إلى الدمام" },
      description: {
        en: "The Eastern Province's main city, a short drive north of Al Khobar.",
        ar: "المدينة الرئيسية في المنطقة الشرقية، على مسافة قصيرة شمال الخبر.",
      },
    },
    {
      routeKey: "dammam",
      label: { en: "Transfers around Dammam", ar: "التنقلات في الدمام" },
      description: {
        en: "Airport pickups and hotel transfers across Dammam, Al Khobar and Dhahran.",
        ar: "الاستقبال من المطار والتنقل بين الفنادق في الدمام والخبر والظهران.",
      },
    },
    {
      routeKey: "alAhsa",
      label: { en: "Al Ahsa", ar: "الأحساء" },
      description: {
        en: "The oasis region inland, with its own airport and hotels in Hofuf and Al-Mubarraz.",
        ar: "منطقة الواحة في الداخل، ولها مطارها وفنادقها في الهفوف والمبرز.",
      },
    },
  ] satisfies RelatedRoute[],

  ctaAfterOverview: {
    heading: {
      en: "Travelling to Al Khobar before your crossing?",
      ar: "هل تسافر إلى الخبر قبل عبورك؟",
    },
    body: {
      en: "Send us your journey details and we will come back with a written quotation for the Saudi-side leg. Nothing is booked and no payment is taken.",
      ar: "أرسل لنا تفاصيل رحلتك ونعود إليك بعرض سعر مكتوب للجزء السعودي من الطريق. لا يُحجز شيء ولا يُدفع أي مبلغ.",
    },
    cta: { en: "Request a quotation", ar: "اطلب عرض سعر" },
  },

  ctaClosing: {
    heading: {
      en: "Planning the Saudi-side journey?",
      ar: "هل تخطط للجزء السعودي من الرحلة؟",
    },
    body: {
      en: "Tell us where you are starting from and when, and we will reply with a written quotation. Our journeys end on the Saudi side of the causeway — the crossing is yours to make.",
      ar: "أخبرنا من أين تنطلق ومتى، ونرد عليك بعرض سعر مكتوب. تنتهي رحلاتنا عند الجانب السعودي من الجسر — أما العبور فمن ترتيبك.",
    },
    cta: { en: "Request a quotation", ar: "اطلب عرض سعر" },
  },

  whatsappMessage: {
    en: "Hello — I am planning a journey towards the King Fahd Causeway and would like a quotation for transport on the Saudi side.",
    ar: "مرحبًا — أخطط لرحلة باتجاه جسر الملك فهد وأرغب في عرض سعر للنقل على الجانب السعودي.",
  },

  bookingHeading: { en: "How an enquiry works", ar: "كيف يسير الطلب" },
  bookingIntro: {
    en: "There is no instant booking here, and no price before we have seen the journey. This is what actually happens after you send the form.",
    ar: "لا يوجد حجز فوري هنا، ولا سعر قبل أن نطّلع على الرحلة. وهذا ما يحدث فعليًا بعد إرسالك النموذج.",
  },
  bookingSteps: [
    {
      title: { en: "Send your details", ar: "أرسل تفاصيلك" },
      body: {
        en: "Route, date, time, passengers and how to reach you.",
        ar: "المسار والتاريخ والوقت وعدد الركاب وطريقة التواصل معك.",
      },
    },
    {
      title: { en: "We check availability", ar: "نتحقق من التوافر" },
      body: {
        en: "Against the vehicle and the date you asked for.",
        ar: "وفق المركبة والتاريخ الذي طلبته.",
      },
    },
    {
      title: { en: "You get a quotation", ar: "تصلك عروض السعر" },
      body: {
        en: "In writing, with the price for that journey.",
        ar: "مكتوبًا، وفيه سعر تلك الرحلة.",
      },
    },
    {
      title: { en: "You decide", ar: "القرار لك" },
      body: {
        en: "Nothing is committed until you confirm.",
        ar: "لا يُلزمك شيء حتى تؤكد.",
      },
    },
    {
      title: { en: "We arrange it", ar: "نرتّب الرحلة" },
      body: {
        en: "Vehicle and driver are coordinated for the day.",
        ar: "تُنسَّق المركبة والسائق ليوم الرحلة.",
      },
    },
  ] satisfies { title: Bilingual<string>; body: Bilingual<string> }[],

  // --- Remaining headings ----------------------------------------------------

  checklistsHeading: { en: "What to take with you", ar: "ما تصطحبه معك" },
  checklistsIntro: {
    en: "Two lists: one for the people travelling, one for the vehicle. Tick as you pack — the page remembers where you got to.",
    ar: "قائمتان: واحدة للمسافرين وأخرى للمركبة. ضع علامة أثناء التجهيز — وتحتفظ الصفحة بما وصلت إليه.",
  },

  faqHeading: { en: "Questions people ask", ar: "أسئلة يطرحها الناس" },

  resourcesHeading: { en: "Official resources", ar: "المصادر الرسمية" },
  resourcesIntro: {
    en: "Where this guide says something could not be confirmed, these are the bodies that can answer it. We are a transport company, not an immigration authority, and nothing here is a substitute for asking them.",
    ar: "حيث يذكر هذا الدليل أن أمرًا لم يُؤكَّد، فهذه هي الجهات القادرة على الإجابة. نحن شركة نقل لا جهة هجرة، ولا شيء هنا يغني عن سؤالهم.",
  },
} as const;
