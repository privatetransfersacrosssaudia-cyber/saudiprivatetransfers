import type { Bilingual } from "@/lib/i18n/config";
import type { RouteKey } from "@/lib/i18n/routes";
import type { SiteImageKey } from "@/lib/site-images";
import type { ClusterCta, ClusterFaq, RelatedLink } from "@/lib/content/riyadh/types";

/**
 * AlUla — destination hub.
 *
 * Intent: transfers at and to AlUla — AlUla International Airport, local
 * journeys between the town and the sites, and the drive from Madinah.
 * Owner-confirmed (8 Nov 2026): AlUla airport pickups, local journeys,
 * Madinah↔AlUla. Riyadh→AlUla keeps its own page and is linked.
 *
 * The page distinguishes three things the plan asks to keep apart: the
 * **governorate**, the **town** and the **individual sites**.
 *
 * Facts (local research folder, madinah-region/02):
 * - The Madinah road leg is ~383 km and four to five hours, through Khaybar.
 *   Source: the Saudi Press Agency, 14 August 2026, as reported by Arab News.
 *   AlUla lies north-west of Madinah.
 *
 *   This replaced an earlier "~300 km (Saudipedia) / 3-hour drive (Visit
 *   Saudi)" pair. The two are not interchangeable: the 300 km figure appears
 *   to describe the separation between the two places rather than the road
 *   route, and nothing found in a later check supported a three-hour drive.
 *   Published road figures for this leg range from about 290 km to 383 km
 *   because they measure between different points, so the page gives the
 *   SPA figure, names it, and says the range exists rather than implying a
 *   single settled number. Do not quietly narrow it back.
 * - AlUla International Airport: domestic 2011, international 2021 —
 *   Saudipedia; regular routes from Riyadh, Jeddah and Dubai — Visit Saudi
 *   (time-sensitive).
 * - Old Town in the centre; Elephant Rock ~11 km north; population ~60,103 —
 *   Saudipedia (2022 census). Known in antiquity as Dadan; citrus and palm
 *   groves; Elephant Rock shaped by water and wind erosion — Saudipedia.
 *   Hegra: UNESCO 2008; ~22 km from central AlUla; "more than 110" tombs
 *   (Saudipedia gives 116 and 131 in different places, so the page uses the
 *   lower bound its AlUla article states).
 * - Local taxis and ride-hailing also operate (Visit Saudi).
 *
 * Deliberately absent: ticket prices, opening hours, tour claims, event
 * dates, any statement that a site is open or accessible at a given time.
 */

type B = Bilingual<string>;

export type AlUlaContent = {
  routeKey: RouteKey;
  imageKey: SiteImageKey;
  elephantImageKey: SiteImageKey;
  seo: { title: B; description: B };
  crumbLabel: B;
  hero: { eyebrow: B; h1: B; lead: B };
  layers: {
    heading: B;
    lead: B;
    governorate: { name: B; detail: B };
    town: { name: B; detail: B };
    sites: { name: B; distance: B; detail: B }[];
  };
  airport: { heading: B; paragraphs: B[] };
  madinah: { heading: B; facts: { label: B; value: B }[]; paragraphs: B[] };
  access: { heading: B; body: B };
  quotation: { heading: B; items: B[] };
  faqHeading: B;
  faqs: ClusterFaq[];
  related: RelatedLink[];
  cta: ClusterCta;
};

export const alula: AlUlaContent = {
  routeKey: "alula",
  imageKey: "alula-hegra",
  elephantImageKey: "alula-elephant-rock",

  seo: {
    title: {
      en: "AlUla Private Transfers | Airport, Old Town and Hegra",
      ar: "التوصيل في العلا | من المطار إلى البلدة القديمة والحِجر",
    },
    description: {
      en: "Private transfers at AlUla: airport pickups, journeys between the town, Old Town, Hegra and Elephant Rock, and the drive from Madinah. Get a written quote.",
      ar: "توصيل خاص في العلا: الاستقبال من مطار العلا الدولي، والتنقل بين البلدة والبلدة القديمة والحِجر وصخرة الفيل، والرحلة من المدينة المنورة. اطلب عرض سعر.",
    },
  },

  crumbLabel: { en: "AlUla", ar: "العلا" },

  hero: {
    eyebrow: { en: "Madinah Region · AlUla", ar: "منطقة المدينة المنورة · العلا" },
    h1: {
      en: "Private transfers at AlUla",
      ar: "التوصيل الخاص في العلا",
    },
    lead: {
      en: "AlUla is an oasis valley in the north-west, about 383 km by road from Madinah, known in antiquity as Dadan. The Old Town is at its centre, and Hegra, among the first Saudi sites on the UNESCO World Heritage List (2008), is nearby. We meet flights at AlUla airport, move you between the town and the sites, and drive the road from Madinah.",
      ar: "العلا وادٍ وواحة في شمال غرب المملكة على بعد نحو 383 كم برًّا من المدينة المنورة، وعُرفت قديمًا باسم دادان. تتوسطها البلدة القديمة، وبالقرب منها الحِجر، من أوائل المواقع السعودية في قائمة التراث العالمي لليونسكو (2008). نستقبلك في مطار العلا، وننقلك بين البلدة والمواقع، ونقطع الطريق من المدينة المنورة.",
    },
  },

  layers: {
    heading: { en: "Governorate, town, sites", ar: "المحافظة والبلدة والمواقع" },
    lead: {
      en: "“AlUla” can mean three different things. Knowing which one you mean is what makes a pickup work.",
      ar: "قد تعني «العلا» ثلاثة أشياء مختلفة، ومعرفة أيّها تقصد هي ما يُنجح موعد الاستقبال.",
    },
    governorate: {
      name: { en: "AlUla Governorate", ar: "محافظة العلا" },
      detail: {
        en: "The wide administrative area in the Madinah Region, about 60,000 people at the 2022 census, with the airport and the heritage sites inside it.",
        ar: "النطاق الإداري الواسع في منطقة المدينة المنورة، ويبلغ عدد سكانه نحو 60 ألف نسمة في تعداد 2022، ويضم المطار والمواقع التراثية.",
      },
    },
    town: {
      name: { en: "AlUla town", ar: "مدينة العلا" },
      detail: {
        en: "The town in the oasis, with the Old Town at its centre and the citrus and palm groves around it.",
        ar: "المدينة داخل الواحة، تتوسطها البلدة القديمة وتحيط بها بساتين الحمضيات والنخيل.",
      },
    },
    sites: [
      {
        name: { en: "Old Town", ar: "البلدة القديمة" },
        distance: { en: "In the town", ar: "داخل المدينة" },
        detail: { en: "The historic centre of the oasis town.", ar: "المركز التاريخي لمدينة الواحة." },
      },
      {
        name: { en: "Elephant Rock", ar: "صخرة الفيل" },
        distance: { en: "~11 km north", ar: "~11 كم شمالًا" },
        detail: { en: "Jabal al-Fil, a rock formation shaped by wind and water.", ar: "جبل الفيل، تكوين صخري نحتته الرياح والمياه." },
      },
      {
        name: { en: "Hegra", ar: "الحِجر" },
        distance: { en: "~22 km", ar: "~22 كم" },
        detail: { en: "UNESCO World Heritage Site since 2008, with more than 110 carved Nabataean tombs.", ar: "موقع تراث عالمي لليونسكو منذ 2008، وفيه أكثر من 110 من المقابر النبطية المنحوتة." },
      },
    ],
  },

  airport: {
    heading: { en: "AlUla International Airport", ar: "مطار العلا الدولي" },
    paragraphs: [
      {
        en: "The airport opened for domestic flights in 2011 and became international in 2021. Visit Saudi lists regular routes from Riyadh, Jeddah and Dubai; check current schedules with the airlines.",
        ar: "افتُتح المطار للرحلات الداخلية عام 2011 وأصبح دوليًا عام 2021، وتذكر روح السعودية رحلات منتظمة من الرياض وجدة ودبي، فتحقق من المواعيد الحالية لدى شركات الطيران.",
      },
      {
        en: "Send the flight number and your hotel or resort. The pickup follows the aircraft rather than a clock time, and for the flight home we work backwards from the airline's check-in time.",
        ar: "أرسل رقم الرحلة واسم الفندق أو المنتجع، ويتبع موعد الاستقبال الطائرة لا توقيت الساعة، ولرحلة العودة نبني الموعد تراجعيًا من موعد إجراءات شركة الطيران.",
      },
    ],
  },

  madinah: {
    heading: { en: "From Madinah to AlUla", ar: "من المدينة المنورة إلى العلا" },
    facts: [
      { label: { en: "Distance", ar: "المسافة" }, value: { en: "~383 km", ar: "~383 كم" } },
      { label: { en: "By road", ar: "برًّا" }, value: { en: "4–5 hours", ar: "4–5 ساعات" } },
      { label: { en: "Direction", ar: "الاتجاه" }, value: { en: "North-west", ar: "شمال غرب" } },
    ],
    paragraphs: [
      {
        en: "About 383 km north-west of Madinah, through Khaybar. The Saudi Press Agency put the drive at four to five hours in August 2026, as reported by Arab News. Published figures for this road vary — some give as little as 290 km — because they measure between different points, so the distance and the time both depend on your pickup, the route taken and conditions on the day.",
        ar: "نحو 383 كم شمال غرب المدينة المنورة، مرورًا بخيبر. وقدّرت وكالة الأنباء السعودية زمن القيادة بأربع إلى خمس ساعات في أغسطس 2026، وفق ما نقلته «عرب نيوز». وتتباين الأرقام المنشورة لهذا الطريق — إذ يذكر بعضها 290 كم فقط — لأنها تقيس بين نقاط مختلفة، فالمسافة والزمن كلاهما يعتمد على نقطة انطلاقك والمسار المسلوك وظروف اليوم.",
      },
      {
        en: "It is a long single leg through open country, so tell us if you want stops, and give us the return date if you are coming back by road.",
        ar: "وهي مرحلة طويلة واحدة عبر أرض مفتوحة، فأخبرنا إن أردت التوقف، وبتاريخ العودة إن كنت راجعًا برًّا.",
      },
    ],
  },

  access: {
    heading: { en: "Tickets and site access", ar: "التذاكر والدخول إلى المواقع" },
    body: {
      en: "We provide the car, not the visit. Entry to Hegra and other sites, tickets, tour slots and opening times are set by AlUla's official operators and change with the season — book those directly first, then send us the times. Events are seasonal; check the official calendar for your dates.",
      ar: "نحن نوفّر السيارة لا الزيارة. فالدخول إلى الحِجر وغيره من المواقع والتذاكر ومواعيد الجولات وأوقات الفتح يحددها المشغّلون الرسميون في العلا وتتغير بحسب الموسم، فاحجزها مباشرة أولًا ثم أرسل إلينا المواعيد. والفعاليات موسمية، فتحقق من التقويم الرسمي لمواعيدك.",
    },
  },

  quotation: {
    heading: { en: "What to send for a quotation", ar: "ما ترسله لطلب عرض السعر" },
    items: [
      {
        en: "The pickup — flight number, hotel or resort, or a Madinah address — and where you are going.",
        ar: "نقطة الانطلاق، سواء رقم الرحلة أو الفندق أو المنتجع أو عنوان في المدينة المنورة، ووجهتك.",
      },
      {
        en: "The date and times, including any booked site visits, and how many passengers and suitcases.",
        ar: "التاريخ والمواعيد، ومنها مواعيد زيارات المواقع المحجوزة، وعدد الركاب والحقائب.",
      },
      {
        en: "We reply with a written price and the vehicle category. Availability and journey details are confirmed before the booking is accepted.",
        ar: "ونرد بسعر مكتوب وفئة المركبة، وتُؤكَّد الإتاحة وتفاصيل الرحلة قبل قبول الحجز.",
      },
    ],
  },

  faqHeading: { en: "AlUla transfers: common questions", ar: "التوصيل في العلا: أسئلة شائعة" },

  faqs: [
    {
      question: { en: "How far is AlUla from Madinah?", ar: "من المدينة إلى العلا كم ساعة؟" },
      answer: {
        en: "About 383 km north-west, through Khaybar. The Saudi Press Agency put the drive at four to five hours in August 2026, as reported by Arab News. Published figures for this road vary, so the actual distance and time depend on your pickup, where you are staying in AlUla, the route taken and conditions on the day.",
        ar: "نحو 383 كم شمال غرب المدينة، مرورًا بخيبر. وقدّرت وكالة الأنباء السعودية زمن القيادة بأربع إلى خمس ساعات في أغسطس 2026، وفق ما نقلته «عرب نيوز». وتتباين الأرقام المنشورة لهذا الطريق، فالمسافة والزمن الفعليان يعتمدان على نقطة انطلاقك ومكان إقامتك في العلا والمسار المسلوك وظروف اليوم.",
      },
    },
    {
      question: { en: "Can you meet me at AlUla airport?", ar: "هل تستقبلونني في مطار العلا؟" },
      answer: {
        en: "Yes. Send the flight number and your hotel or resort, and the pickup follows the aircraft. Availability and details are confirmed before the booking is accepted.",
        ar: "نعم. أرسل رقم الرحلة واسم الفندق أو المنتجع ليتبع موعد الاستقبال الطائرة، وتُؤكَّد الإتاحة والتفاصيل قبل قبول الحجز.",
      },
    },
    {
      question: { en: "How far is Hegra from AlUla town?", ar: "كم تبعد الحِجر عن العلا؟" },
      answer: {
        en: "About 22 km from central AlUla. Entry and tickets are handled by the official operators, so book the visit first and send us the time.",
        ar: "نحو 22 كم من وسط العلا. والدخول والتذاكر من شأن المشغّلين الرسميين، فاحجز الزيارة أولًا ثم أرسل إلينا الموعد.",
      },
    },
    {
      question: { en: "Do you sell Hegra tickets or tours?", ar: "هل تبيعون تذاكر الحِجر أو الجولات؟" },
      answer: {
        en: "No. We provide road transport only. Tickets, tours and opening times come from AlUla's official operators.",
        ar: "لا. نحن نوفّر النقل البري فقط، والتذاكر والجولات وأوقات الفتح من المشغّلين الرسميين في العلا.",
      },
    },
    {
      question: { en: "Can I drive from Riyadh to AlUla instead?", ar: "هل يمكن السفر من الرياض إلى العلا برًّا؟" },
      answer: {
        en: "Yes, though it is around 1,050 km — our Riyadh to AlUla page explains when the drive makes sense and when flying is the better answer.",
        ar: "نعم، لكنها نحو 1,050 كم، وتشرح صفحة الرياض إلى العلا لدينا متى تكون القيادة مناسبة ومتى يكون الطيران الخيار الأفضل.",
      },
    },
  ],

  related: [
    {
      routeKey: "madinah",
      label: { en: "Private transfers in Madinah", ar: "توصيل خاص في المدينة المنورة" },
      note: {
        en: "The starting point for the road to AlUla: airport, station and hotels.",
        ar: "نقطة البداية لطريق العلا: المطار ومحطة القطار والفنادق.",
      },
    },
    {
      routeKey: "riyadhToAlUla",
      label: { en: "Riyadh to AlUla", ar: "الرياض إلى العلا" },
      note: {
        en: "About 1,050 km from the capital — drive or fly, compared honestly.",
        ar: "نحو 1,050 كم من العاصمة، مع مقارنة صادقة بين القيادة والطيران.",
      },
    },
    {
      routeKey: "yanbu",
      label: { en: "Yanbu", ar: "ينبع" },
      note: {
        en: "The Madinah Region's Red Sea coast: town, airport and industrial city.",
        ar: "ساحل منطقة المدينة المنورة على البحر الأحمر: ينبع البحر والمطار والمدينة الصناعية.",
      },
    },
  ],

  cta: {
    eyebrow: { en: "Oasis and heritage", ar: "الواحة والتراث" },
    heading: { en: "Request an AlUla transfer quotation", ar: "اطلب عرض سعر للتوصيل في العلا" },
    body: {
      en: "Your flight or pickup, where you are staying, any booked site times and how many of you. We reply with a written price.",
      ar: "رحلتك أو نقطة انطلاقك، ومكان إقامتك، ومواعيد زيارات المواقع المحجوزة، وعددكم. ونرد بسعر مكتوب.",
    },
    button: { en: "Get an AlUla quote", ar: "اطلب سعر رحلة العلا" },
  },
};
