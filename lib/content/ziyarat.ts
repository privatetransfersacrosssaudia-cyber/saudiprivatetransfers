import type {
  ClusterCta,
  ClusterFaq,
  RelatedLink,
} from "@/lib/content/riyadh/types";
import type { RouteKey } from "@/lib/i18n/routes";
import type { SiteImageKey } from "@/lib/site-images";

/**
 * Ziyarat transfers — the national service page.
 *
 * **Concept: the list is the journey.** Every other transfer this company
 * sells has two fixed ends. Ziyarat is the one where the customer writes the
 * route: the places chosen decide the hours, the hours decide the vehicle,
 * and all of it decides the price. Nothing can be quoted until that list
 * exists. So the page is built around producing it — the planner composes a
 * real enquiry as you tick, rather than printing a checklist to remember.
 *
 * ## Scope, and what this page deliberately does not do
 *
 * It names a small number of well-known sites per city purely so the planner
 * has something to tick. It does **not** describe them, give their history,
 * their opening hours, their religious significance or any access rules —
 * that material belongs to the future Makkah and Madinah Ziyarat pages, and
 * writing it here would make those pages duplicates before they exist.
 *
 * The sites named are drawn from what this project already publishes:
 * Quba Mosque and Mount Uhud appear in `madinah-region/madinah.ts`, and the
 * Makkah and Madinah hubs already carry Ziyarat sections. Nothing new is
 * asserted about any of them.
 *
 * ## Claims
 *
 * **Transport only.** The company is not a religious authority, guide,
 * tour operator or pilgrimage organiser, and `boundaries` says so outright.
 * No guide is offered, no site access is promised, no religious guidance is
 * given.
 *
 * **Journey formats, not packages.** Half-day and full-day are described as
 * shapes a quotation can take, never as products with fixed hours or prices.
 * No duration is published anywhere on this page.
 *
 * **Vehicles** are `lib/content/vehicles.ts` verbatim — four classes, up to
 * 3, 4, 7 and 14. The brief suggested six including "Economy / Comfort /
 * Business sedan"; those do not exist in this project and are not invented
 * here. Fourteen is the confirmed single-vehicle ceiling.
 *
 * **No prices, no fixed durations, no refreshments, no free waiting, no
 * guaranteed access, no 24/7 availability.**
 *
 * ## Images
 *
 * Three genuine photographs, each of the place it is captioned as, each used
 * once: Mount Uhud near Madinah for the hero, the Great Mosque of Makkah for
 * the Makkah card, and Quba Mosque for the Madinah card. No photograph of
 * one city is labelled as another, and no vehicle photography exists in the
 * project so none is implied.
 */

/** A city the planner can build a list in. */
export type ZiyaratCity = {
  id: string;
  en: string;
  ar: string;
  sites: { id: string; en: string; ar: string }[];
};

export const ziyarat = {
  routeKey: "ziyaratTransfers" as RouteKey,
  imageKey: "svc-ziyarat" as SiteImageKey,

  seo: {
    title: {
      en: "Ziyarat Transfers Saudi Arabia | Private Car & Driver",
      ar: "النقل للزيارة في السعودية | سيارة خاصة مع سائق",
    },
    description: {
      en: "Private Ziyarat transport in Makkah, Madinah and beyond — a vehicle reserved for your party, the sites you choose, at your own pace. Send your list and your pickup for a written quotation.",
      ar: "نقل خاص للزيارة في مكة المكرمة والمدينة المنورة وغيرهما — مركبة محجوزة لمجموعتك، والمواضع التي تختارها، وعلى مهلك. أرسل قائمتك ونقطة انطلاقك واحصل على عرض سعر مكتوب.",
    },
  },

  crumbLabel: { en: "Ziyarat transfers", ar: "النقل للزيارة" },

  // --- Hero -----------------------------------------------------------------

  eyebrow: { en: "Ziyarat transport across Saudi Arabia", ar: "النقل للزيارة في أنحاء السعودية" },
  title: {
    en: "Private Ziyarat transfers across Saudi Arabia",
    ar: "نقل خاص للزيارة في أنحاء السعودية",
  },
  standfirst: {
    en: "Most transfers have two ends and a road between them. A Ziyarat journey has a list — the places you have chosen, in the order you want them, with as long as you need at each. That list is the journey, and it is the one thing we need before anything else can be arranged.",
    ar: "لمعظم الرحلات طرفان وطريق بينهما. أما رحلة الزيارة فلها قائمة — المواضع التي اخترتها، بالترتيب الذي تريده، وبالوقت الذي تحتاجه عند كل منها. وتلك القائمة هي الرحلة، وهي أول ما نحتاجه قبل أي ترتيب آخر.",
  },

  primaryCta: { en: "Request a Ziyarat quote", ar: "اطلب عرض سعر للزيارة" },
  secondaryCta: { en: "Plan your journey", ar: "خطّط رحلتك" },

  // --- Who this is for --------------------------------------------------------

  intro: {
    heading: { en: "No two Ziyarat days look the same", ar: "لا يتشابه يوما زيارة" },
    lead: {
      en: "Which is why we quote the journey rather than sell a tour. A few of the shapes it usually takes:",
      ar: "ولهذا نسعّر الرحلة بدل بيع جولة. وهذه بعض الأشكال التي تتخذها عادةً:",
    },
    items: [
      {
        title: { en: "An afternoon from your hotel", ar: "عصريّة من فندقك" },
        body: {
          en: "Two or three places between prayers, with the vehicle waiting rather than you finding another one at each stop.",
          ar: "موضعان أو ثلاثة بين الصلوات، والمركبة تنتظر بدل أن تبحث عن أخرى عند كل محطة.",
        },
      },
      {
        title: { en: "A family across three generations", ar: "عائلة من ثلاثة أجيال" },
        body: {
          en: "Grandparents who need the car close to the entrance, children who need seats, and everyone in one vehicle rather than split across two taxis.",
          ar: "كبار سن يحتاجون السيارة قريبة من المدخل، وأطفال يحتاجون مقاعد، والجميع في مركبة واحدة بدل تقسيمهم على سيارتي أجرة.",
        },
      },
      {
        title: { en: "A day added to an Umrah trip", ar: "يوم يُضاف إلى رحلة عمرة" },
        body: {
          en: "Slotted between the arrival and the road north, which is easier to arrange when both are quoted together.",
          ar: "يُدرَج بين الوصول والطريق شمالًا، وهو أسهر ترتيبًا حين يُسعَّران معًا.",
        },
      },
      {
        title: { en: "A list someone else wrote", ar: "قائمة كتبها غيرك" },
        body: {
          en: "A group organiser, a family elder or a mosque group has set the places. Send the list as you received it and we will work from that.",
          ar: "منظّم مجموعة أو كبير العائلة أو جماعة مسجد حدّد المواضع. أرسل القائمة كما وصلتك ونعمل منها.",
        },
      },
    ],
  },

  // --- The planner ------------------------------------------------------------

  planner: {
    heading: { en: "Build your list", ar: "ابنِ قائمتك" },
    lead: {
      en: "Tick the places you have in mind and the quotation form opens already knowing them. Nothing here is a booking, and you can change any of it in the enquiry.",
      ar: "أشِّر على المواضع التي في ذهنك فيُفتح نموذج عرض السعر وهو يعرفها. ولا شيء هنا حجز، ويمكنك تعديل أي جزء منه في الطلب.",
    },
    cities: [
      {
        id: "makkah",
        en: "Makkah",
        ar: "مكة المكرمة",
        sites: [
          { id: "mk-1", en: "Jabal al-Nour", ar: "جبل النور" },
          { id: "mk-2", en: "Jabal Thawr", ar: "جبل ثور" },
          { id: "mk-3", en: "Hira Cultural District", ar: "حي حراء الثقافي" },
          { id: "mk-4", en: "Jannat al-Mu'alla", ar: "جنة المعلاة" },
          { id: "mk-5", en: "Masjid al-Jinn", ar: "مسجد الجن" },
          { id: "mk-6", en: "Masjid Aisha (Taneem)", ar: "مسجد عائشة (التنعيم)" },
        ],
      },
      {
        id: "madinah",
        en: "Madinah",
        ar: "المدينة المنورة",
        sites: [
          { id: "md-1", en: "Quba Mosque", ar: "مسجد قباء" },
          { id: "md-2", en: "Mount Uhud", ar: "جبل أحد" },
          { id: "md-3", en: "Masjid al-Qiblatain", ar: "مسجد القبلتين" },
          { id: "md-4", en: "The Seven Mosques", ar: "المساجد السبعة" },
          { id: "md-5", en: "Wadi al-Jinn", ar: "وادي الجن" },
          { id: "md-6", en: "Dates market", ar: "سوق التمور" },
        ],
      },
      {
        id: "elsewhere",
        en: "Somewhere else",
        ar: "موضع آخر",
        sites: [],
      },
    ] as ZiyaratCity[],
    notes: [
      { id: "n1", en: "A passenger who cannot manage steps", ar: "راكب لا يستطيع صعود الدرجات" },
      { id: "n2", en: "A wheelchair or pushchair to carry", ar: "كرسي متحرك أو عربة طفل" },
      { id: "n3", en: "Child seats needed", ar: "الحاجة إلى مقاعد أطفال" },
      { id: "n4", en: "A return to the same pickup point", ar: "العودة إلى نقطة الانطلاق نفسها" },
    ],
    copy: {
      cityLabel: { en: "Where are you staying?", ar: "أين تقيم؟" },
      sitesLabel: { en: "Which places?", ar: "أي المواضع؟" },
      sitesHint: {
        en: "A few of the ones people ask for most. If what you want is not here, add it in the enquiry — the list is yours, not ours.",
        ar: "بعض ما يطلبه الناس أكثر. وإن لم يكن ما تريده هنا فأضفه في الطلب — فالقائمة قائمتك لا قائمتنا.",
      },
      passengersLabel: { en: "How many passengers?", ar: "كم عدد الركاب؟" },
      passengersAny: { en: "Not sure yet", ar: "غير محدد بعد" },
      notesLabel: { en: "Worth mentioning in the enquiry", ar: "يستحق الذكر في الطلب" },
      pickupLabel: { en: "Pickup — hotel or address", ar: "الانطلاق — فندق أو عنوان" },
      pickupPlaceholder: { en: "Hotel name and address", ar: "اسم الفندق وعنوانه" },
      summaryLabel: { en: "Your list so far", ar: "قائمتك حتى الآن" },
      emptyState: {
        en: "Nothing ticked yet. Choose a place or two above, or go straight to the form and write your own list.",
        ar: "لم تختر شيئًا بعد. اختر موضعًا أو موضعين أعلاه، أو اذهب مباشرة إلى النموذج واكتب قائمتك.",
      },
      carryOver: {
        en: "Accessibility needs and a return journey cannot be carried into the form automatically — add them in the message box when you get there.",
        ar: "ولا يمكن نقل احتياجات الوصول ورحلة العودة إلى النموذج تلقائيًا — فأضفها في خانة الرسالة حين تصل إليها.",
      },
      cta: { en: "Take this to the quote form", ar: "انقل هذا إلى نموذج عرض السعر" },
    },
  },

  // --- Destination cards --------------------------------------------------------

  destinations: {
    heading: { en: "Where people arrange Ziyarat journeys", ar: "أين يرتّب الناس رحلات الزيارة" },
    lead: {
      en: "Two cities account for almost all of it. Each already has a page describing what we cover there; dedicated Ziyarat pages for both are being written.",
      ar: "مدينتان تستأثران بمعظمها. ولكل منهما صفحة تصف ما نغطيه هناك؛ وتُكتب حاليًا صفحتا زيارة مخصصتان لكلتيهما.",
    },
    items: [
      {
        key: "makkah",
        imageKey: "dest-makkah" as SiteImageKey,
        name: { en: "Ziyarat around Makkah", ar: "الزيارة حول مكة المكرمة" },
        covers: {
          en: "Half-day and full-day journeys from a Haram-area hotel to the sites around the city, with the vehicle staying with you between stops.",
          ar: "رحلات نصف يوم ويوم كامل من فندق في منطقة الحرم إلى المواضع حول المدينة، والمركبة تبقى معك بين المحطات.",
        },
        who: {
          en: "Useful if you are in Makkah for Umrah and want a day that is not spent finding transport at each stop.",
          ar: "مفيدة إن كنت في مكة لأداء العمرة وتريد يومًا لا يُقضى في البحث عن وسيلة نقل عند كل محطة.",
        },
        note: {
          en: "Entry to Makkah is restricted to Muslims, and we accept journeys into the city only for passengers who may legally enter on their travel date.",
          ar: "ودخول مكة المكرمة مقصور على المسلمين، ولا نقبل الرحلات إلى داخل المدينة إلا لركاب يحق لهم الدخول نظامًا في تاريخ سفرهم.",
        },
        link: { routeKey: "makkah" as RouteKey, label: { en: "Transfers in Makkah", ar: "التوصيل في مكة المكرمة" } },
      },
      {
        key: "madinah",
        imageKey: "madinah-quba" as SiteImageKey,
        name: { en: "Ziyarat around Madinah", ar: "الزيارة حول المدينة المنورة" },
        covers: {
          en: "The sites around the city in one arranged journey, set to your pace rather than a timetable, from a hotel in the central area or anywhere else you are staying.",
          ar: "المواضع حول المدينة في رحلة واحدة مرتَّبة، على وتيرتك لا على جدول، من فندق في المنطقة المركزية أو من أي مكان تقيم فيه.",
        },
        who: {
          en: "Useful for families and for anyone travelling with passengers who would rather not walk between stops or wait for transport in the sun.",
          ar: "مفيدة للعائلات ولكل من يسافر مع ركاب يفضّلون ألا يمشوا بين المحطات أو ينتظروا وسيلة نقل تحت الشمس.",
        },
        note: {
          en: "Madinah welcomes visitors from around the world; access to certain sacred areas, including Al Masjid an Nabawi, is restricted to Muslims.",
          ar: "والمدينة المنورة ترحب بالزوار من أنحاء العالم؛ والدخول إلى مواضع مقدسة معينة، ومنها المسجد النبوي، مقصور على المسلمين.",
        },
        link: { routeKey: "madinah" as RouteKey, label: { en: "Transfers in Madinah", ar: "التوصيل في المدينة المنورة" } },
      },
      {
        key: "elsewhere",
        name: { en: "Somewhere else entirely", ar: "موضع آخر تمامًا" },
        covers: {
          en: "Historic mosques and sites elsewhere in the Kingdom can sometimes be arranged as a private journey — but only where we already cover the roads involved.",
          ar: "ويمكن أحيانًا ترتيب زيارة المساجد والمواقع التاريخية في أنحاء أخرى من المملكة كرحلة خاصة — لكن فقط حيث نغطي الطرق المعنية أصلًا.",
        },
        who: {
          en: "Worth asking if your list sits outside the two holy cities. Send it and we will tell you honestly what we can and cannot arrange.",
          ar: "ويستحق السؤال إن كانت قائمتك خارج المدينتين المقدستين. أرسلها ونخبرك بصراحة بما نستطيع ترتيبه وما لا نستطيع.",
        },
        note: {
          en: "We publish no list of sites outside Makkah and Madinah, because a list we have not confirmed we can reach would be a promise we have not made.",
          ar: "ولا ننشر قائمة بمواضع خارج مكة والمدينة، لأن قائمة لم نتأكد من إمكان بلوغها وعدٌ لم نقطعه.",
        },
      },
    ],
  },

  // --- What the arrangement includes ----------------------------------------------

  includes: {
    heading: { en: "What a private Ziyarat transfer is", ar: "ما هو النقل الخاص للزيارة" },
    lead: {
      en: "A vehicle and a driver for your party, for the journey you set out. Plainly, that is the whole of it.",
      ar: "مركبة وسائق لمجموعتك، للرحلة التي تحددها. وبصراحة، هذا كل ما في الأمر.",
    },
    items: [
      {
        en: "The whole vehicle reserved for your party — nobody else is picked up along the way.",
        ar: "المركبة كاملة محجوزة لمجموعتك — ولا يُقلّ معكم أحد في الطريق.",
      },
      {
        en: "Pickup and drop-off at the hotel or address you give us.",
        ar: "الانطلاق والعودة عند الفندق أو العنوان الذي تعطينا إياه.",
      },
      {
        en: "The places you chose, in the order you want them.",
        ar: "المواضع التي اخترتها، بالترتيب الذي تريده.",
      },
      {
        en: "A schedule agreed before the day rather than improvised on it.",
        ar: "جدول متفق عليه قبل اليوم لا مرتجل فيه.",
      },
      {
        en: "A vehicle class chosen for your passenger count and your luggage.",
        ar: "فئة مركبة مختارة وفق عدد ركابك وأمتعتك.",
      },
      {
        en: "Additional stops where they can be arranged — asked for in advance, confirmed in the quotation.",
        ar: "ومحطات إضافية حيث يمكن ترتيبها — تُطلب مسبقًا وتُؤكَّد في عرض السعر.",
      },
    ],
    boundaries: {
      heading: { en: "And what it is not", ar: "وما ليس عليه" },
      items: [
        {
          en: "Not a guided tour. We arrange transport; we are not a religious authority, a guide, a tour operator or a pilgrimage organiser, and the driver is a driver.",
          ar: "ليست جولة مُرشَدة. نحن نرتّب النقل؛ ولسنا مرجعًا دينيًا ولا مرشدًا ولا منظّم جولات ولا منظّم حج وعمرة، والسائق سائق.",
        },
        {
          en: "Not a guarantee of access. Whether any particular site is open, and whether a vehicle may approach it, is decided by that site and not by us.",
          ar: "وليست ضمانًا للدخول. فكون موضع بعينه مفتوحًا وكون المركبة تستطيع الاقتراب منه أمران يحددهما ذلك الموضع لا نحن.",
        },
        {
          en: "Not a fixed package. Half-day and full-day are shapes a quotation can take, not products with a set number of hours or a set price.",
          ar: "وليست برنامجًا ثابتًا. فنصف اليوم واليوم الكامل شكلان يتخذهما عرض السعر، لا منتجان بعدد ساعات محدد أو سعر محدد.",
        },
        {
          en: "Not religious guidance. Questions about what to recite, where to pray or what a site means belong to a scholar or your group organiser.",
          ar: "وليست إرشادًا دينيًا. فأسئلة ما يُقال وأين يُصلّى وما يعنيه موضع مردّها إلى عالم أو إلى منظّم مجموعتك.",
        },
      ],
    },
  },

  // --- Journey formats ---------------------------------------------------------------

  formats: {
    heading: { en: "Shapes a Ziyarat booking can take", ar: "أشكال يمكن أن يتخذها حجز الزيارة" },
    lead: {
      en: "Formats rather than packages. Each is quoted on your list, your date and your group — the duration and the availability are confirmed individually, never assumed from the name.",
      ar: "أشكال لا برامج. ويُسعَّر كلٌّ منها وفق قائمتك وتاريخك ومجموعتك — وتُؤكَّد المدة والتوافر لكل حالة على حدة، ولا تُفترض من الاسم.",
    },
    rows: [
      {
        name: { en: "One place", ar: "موضع واحد" },
        detail: {
          en: "There and back, with the vehicle waiting while you are inside.",
          ar: "ذهابًا وإيابًا، والمركبة تنتظر أثناء وجودك بالداخل.",
        },
      },
      {
        name: { en: "Several places", ar: "عدة مواضع" },
        detail: {
          en: "A list visited in one journey, in an order agreed beforehand.",
          ar: "قائمة تُزار في رحلة واحدة، بترتيب متفق عليه مسبقًا.",
        },
      },
      {
        name: { en: "Half a day", ar: "نصف يوم" },
        detail: {
          en: "A shorter arrangement, usually fitted between prayers.",
          ar: "ترتيب أقصر، يُدرَج عادةً بين الصلوات.",
        },
      },
      {
        name: { en: "A full day", ar: "يوم كامل" },
        detail: {
          en: "A longer list with more stops and more time at each.",
          ar: "قائمة أطول بمحطات أكثر ووقت أطول عند كل منها.",
        },
      },
      {
        name: { en: "Your own route", ar: "مسارك أنت" },
        detail: {
          en: "Anything that does not match the rows above. Send it and we will quote what we can arrange.",
          ar: "أي شيء لا يطابق الصفوف أعلاه. أرسله ونسعّر ما نستطيع ترتيبه.",
        },
      },
    ],
    footnote: {
      en: "We publish no hours against these names on purpose. How long a list takes depends on the places, the traffic and how long your party wants at each — and a number printed here would be wrong for most people reading it.",
      ar: "ولا ننشر ساعات أمام هذه الأسماء عمدًا. فالمدة التي تستغرقها القائمة تعتمد على المواضع والحركة والوقت الذي تريده مجموعتك عند كل موضع — ورقم مطبوع هنا سيكون خاطئًا لمعظم من يقرؤه.",
    },
  },

  // --- Vehicles -------------------------------------------------------------------------

  vehicles: {
    heading: { en: "Which vehicle for a day of stops", ar: "أي مركبة ليوم من المحطات" },
    lead: {
      en: "A Ziyarat day is different from an airport run: lighter luggage, but far more getting in and out. Step height and door access matter more here than boot space does.",
      ar: "يوم الزيارة يختلف عن رحلة المطار: أمتعة أخف، لكن صعودًا ونزولًا أكثر بكثير. فارتفاع العتبة وسهولة الأبواب هنا أهم من سعة الصندوق.",
    },
    slugs: ["sedan", "suv", "van", "minibus"],
    groupNote: {
      en: "Fourteen passengers is the most we seat in a single vehicle. Above that, or where a group wants to stay together across more seats than one vehicle has, more than one can be coordinated — subject to availability on your date, which the quotation checks. If anyone in the party would struggle with a high step, say so and it will be taken into account when the class is proposed.",
      ar: "وأربعة عشر راكبًا أقصى ما نُجلسه في مركبة واحدة. وفوق ذلك، أو حين تريد مجموعة البقاء معًا في مقاعد أكثر مما تتسعه مركبة واحدة، يمكن تنسيق أكثر من مركبة — رهنًا بالتوافر في تاريخك، وهو ما يتحقق منه عرض السعر. وإن كان أحد أفراد المجموعة يصعب عليه صعود عتبة مرتفعة فاذكر ذلك ليؤخذ في الحسبان عند اقتراح الفئة.",
    },
    footnote: {
      en: "Models and makes vary by availability; the class is what is confirmed in your quotation.",
      ar: "وتتفاوت الموديلات والطرز بحسب التوافر؛ والفئة هي ما يُؤكَّد في عرض سعرك.",
    },
  },

  // --- Planning well -----------------------------------------------------------------------

  planning: {
    heading: { en: "Planning a comfortable day", ar: "التخطيط ليوم مريح" },
    lead: {
      en: "Practical things worth settling before you send the enquiry, rather than on the morning.",
      ar: "أمور عملية يُستحسن حسمها قبل إرسال الطلب لا في الصباح.",
    },
    items: [
      {
        title: { en: "Decide the list first", ar: "حدّد القائمة أولًا" },
        body: {
          en: "Everything else follows from it — the hours, the vehicle, the price. A quotation without a list is a guess.",
          ar: "فكل ما عداها يتبعها — الساعات والمركبة والسعر. وعرض سعر بلا قائمة تخمين.",
        },
      },
      {
        title: { en: "Look at how far apart they are", ar: "انظر كم تتباعد المواضع" },
        body: {
          en: "Places that sound close on a list can be a long way apart on the road, and that is time taken from the visits themselves.",
          ar: "فالمواضع التي تبدو متقاربة في قائمة قد تكون متباعدة على الطريق، وذلك وقت يُقتطع من الزيارات نفسها.",
        },
      },
      {
        title: { en: "Leave room for prayers", ar: "اترك متسعًا للصلوات" },
        body: {
          en: "A day built with no slack in it stops being restful somewhere around the third stop. Tell us if prayer times shape your schedule.",
          ar: "فاليوم المبني بلا فسحة يكفّ عن كونه مريحًا عند المحطة الثالثة تقريبًا. أخبرنا إن كانت أوقات الصلاة تشكّل جدولك.",
        },
      },
      {
        title: { en: "Say who is travelling", ar: "اذكر من سيسافر" },
        body: {
          en: "Children, elderly passengers, a wheelchair, anyone who cannot manage a high step — all of it changes the vehicle, and all of it is easier to plan for in advance than on the day.",
          ar: "فالأطفال وكبار السن والكرسي المتحرك ومن لا يستطيع صعود عتبة مرتفعة — كل ذلك يغيّر المركبة، وكله أسهل تخطيطًا مسبقًا منه في اليوم ذاته.",
        },
      },
      {
        title: { en: "Check access separately", ar: "تحقق من الدخول على حدة" },
        body: {
          en: "Whether a site is open on your date, and whether it admits visitors at the time you plan to arrive, is a question for that site. We can carry you there; we cannot open a door.",
          ar: "فكون الموضع مفتوحًا في تاريخك وكونه يستقبل الزوار في الوقت الذي تنوي الوصول فيه سؤال يُوجَّه إلى ذلك الموضع. نستطيع إيصالك إليه؛ ولا نستطيع فتح بابه.",
        },
      },
    ],
  },

  // --- Process ----------------------------------------------------------------------------

  process: {
    heading: { en: "How booking works", ar: "كيف يتم الحجز" },
    steps: [
      {
        title: { en: "Choose your places", ar: "اختر مواضعك" },
        body: { en: "The list is the thing we quote on.", ar: "فالقائمة هي ما نسعّر عليه." },
      },
      {
        title: { en: "Send the details", ar: "أرسل التفاصيل" },
        body: {
          en: "Pickup address, date, time, how many of you and anything about the party we should know.",
          ar: "عنوان الانطلاق والتاريخ والوقت وعددكم وكل ما ينبغي أن نعرفه عن المجموعة.",
        },
      },
      {
        title: { en: "Receive a quotation", ar: "تستلم عرض سعر" },
        body: {
          en: "Written, with the vehicle class and the arrangement set out. You read it and decide.",
          ar: "مكتوبًا، وفيه فئة المركبة والترتيب مبيّنان. تقرؤه ثم تقرر.",
        },
      },
      {
        title: { en: "Confirm your journey", ar: "أكّد رحلتك" },
        body: {
          en: "You accept, and the journey is confirmed only when we send a booking confirmation saying so.",
          ar: "تقبل العرض، ولا تتأكد الرحلة إلا عندما نرسل رسالة تأكيد حجز تنص على ذلك.",
        },
      },
    ],
    note: {
      en: "Sending an enquiry does not confirm a booking and does not hold a vehicle for your date. Nothing is reserved and no payment is taken on this website, and there is no instant price — a Ziyarat journey is quoted after the list has been read.",
      ar: "وإرسال الطلب لا يؤكد حجزًا ولا يحجز مركبة لتاريخك. ولا يُحجز شيء ولا يُستوفى أي مبلغ عبر هذا الموقع، ولا يوجد سعر فوري — فرحلة الزيارة تُسعَّر بعد قراءة القائمة.",
    },
  },

  // --- FAQs ---------------------------------------------------------------------------------

  faqHeading: { en: "Common questions", ar: "الأسئلة الشائعة" },

  faqs: [
    {
      question: { en: "What is a private Ziyarat transfer?", ar: "ما النقل الخاص للزيارة؟" },
      answer: {
        en: "A vehicle and driver reserved for your party alone, for a journey to the places you have chosen. Nobody else is picked up along the way, the order is yours, and the vehicle stays with you between stops rather than leaving you to find transport at each one. It is a transport arrangement — not a guided tour and not a religious programme.",
        ar: "مركبة وسائق محجوزان لمجموعتك وحدها، لرحلة إلى المواضع التي اخترتها. فلا يُقلّ معكم أحد في الطريق، والترتيب ترتيبك، وتبقى المركبة معك بين المحطات بدل أن تتركك تبحث عن وسيلة نقل عند كل واحدة. وهو ترتيب نقل — لا جولة مُرشَدة ولا برنامج ديني.",
      },
    },
    {
      question: { en: "Can I choose my own destinations?", ar: "هل أختار وجهاتي بنفسي؟" },
      answer: {
        en: "Yes — the list is yours, and it is the starting point rather than something we hand you. The planner on this page names a few of the places people ask for most, but anything you add in the enquiry is read the same way. If a place on your list is somewhere we cannot reach, we will say so rather than quietly leave it out.",
        ar: "نعم — فالقائمة قائمتك، وهي نقطة البداية لا شيء نسلّمه إليك. ويذكر المخطِّط في هذه الصفحة بعض ما يطلبه الناس أكثر، لكن ما تضيفه في الطلب يُقرأ بالطريقة نفسها. وإن كان في قائمتك موضع لا نستطيع بلوغه فسنقول ذلك بدل إسقاطه بصمت.",
      },
    },
    {
      question: { en: "Can I visit several places in one journey?", ar: "هل أزور عدة مواضع في رحلة واحدة؟" },
      answer: {
        en: "That is the usual shape of it. Send the places and roughly how long you would like at each, and the quotation covers the journey as one arrangement rather than as separate trips. Bear in mind that places which look close together on a list are not always close on the road.",
        ar: "هذا هو شكلها المعتاد. أرسل المواضع وتقريبًا المدة التي تودّها عند كل منها، فيغطي عرض السعر الرحلة ترتيبًا واحدًا لا رحلات منفصلة. وتذكّر أن المواضع التي تبدو متقاربة في قائمة ليست دائمًا متقاربة على الطريق.",
      },
    },
    {
      question: { en: "Are half-day and full-day arrangements available?", ar: "هل تتوفر ترتيبات نصف يوم ويوم كامل؟" },
      answer: {
        en: "Both are common shapes for a booking, but they are formats rather than packages — we publish no fixed number of hours and no fixed price against either. How long your day actually takes depends on your list, the traffic and how long your party wants at each stop, and that is settled in the quotation.",
        ar: "كلاهما شكل شائع للحجز، لكنهما شكلان لا برنامجان — فلا ننشر عدد ساعات ثابتًا ولا سعرًا ثابتًا لأي منهما. والمدة الفعلية ليومك تعتمد على قائمتك والحركة والوقت الذي تريده مجموعتك عند كل محطة، ويُحسم ذلك في عرض السعر.",
      },
    },
    {
      question: { en: "Do you provide a religious guide?", ar: "هل توفّرون مرشدًا دينيًا؟" },
      answer: {
        en: "No. We arrange road transport, and the driver is a driver. We are not a religious authority, a guide, a tour operator or a pilgrimage organiser, and we would rather be clear about that before you book than disappoint you on the day. Questions about the significance of a place, what to recite or where to pray belong to a scholar or to your group organiser.",
        ar: "لا. نحن نرتّب النقل البري، والسائق سائق. ولسنا مرجعًا دينيًا ولا مرشدًا ولا منظّم جولات ولا منظّم حج وعمرة، ونفضّل توضيح ذلك قبل حجزك على أن نخيّب ظنك في اليوم ذاته. أما أسئلة دلالة الموضع وما يُقال وأين يُصلّى فمردّها إلى عالم أو إلى منظّم مجموعتك.",
      },
    },
    {
      question: { en: "Can a vehicle reach every site?", ar: "هل تستطيع المركبة بلوغ كل موضع؟" },
      answer: {
        en: "Not necessarily, and we will not pretend otherwise. How close a vehicle may get, and whether a site is open at all on your date, is decided by that site rather than by us. Some are reached on foot from the nearest permitted point. We can carry you there; we cannot open a door or promise a parking space.",
        ar: "ليس بالضرورة، ولن ندّعي غير ذلك. فمدى قرب المركبة وكون الموضع مفتوحًا أصلًا في تاريخك أمران يحددهما ذلك الموضع لا نحن. وبعضها لا يُبلَغ إلا مشيًا من أقرب نقطة مسموح بها. نستطيع إيصالك إليه؛ ولا نستطيع فتح باب ولا ضمان موقف.",
      },
    },
    {
      question: { en: "Can elderly passengers travel comfortably?", ar: "هل يسافر كبار السن براحة؟" },
      answer: {
        en: "A Ziyarat day involves far more getting in and out than an airport run, so step height and door access matter more than boot space. Tell us in the enquiry if someone would struggle with a high step, needs a wheelchair carried, or should be set down as close to an entrance as the site allows — it is taken into account when the vehicle class is proposed.",
        ar: "يوم الزيارة فيه صعود ونزول أكثر بكثير من رحلة المطار، فارتفاع العتبة وسهولة الأبواب أهم من سعة الصندوق. أخبرنا في الطلب إن كان أحدهم يصعب عليه صعود عتبة مرتفعة، أو يحتاج حمل كرسي متحرك، أو ينبغي إنزاله أقرب ما يسمح به الموضع من المدخل — فيؤخذ ذلك في الحسبان عند اقتراح فئة المركبة.",
      },
    },
    {
      question: { en: "Can you collect me from my hotel?", ar: "هل تستقبلونني من فندقي؟" },
      answer: {
        en: "Yes, and it is how most Ziyarat journeys start. Send the hotel name with its address rather than the brand alone. Where a car may wait is set by the property rather than by us, so the pickup point is confirmed in writing for your booking.",
        ar: "نعم، وهكذا تبدأ معظم رحلات الزيارة. أرسل اسم الفندق مع عنوانه لا العلامة التجارية وحدها. وموضع انتظار السيارة تحدده المنشأة لا نحن، فتُؤكَّد نقطة الاستقبال كتابةً لحجزك.",
      },
    },
    {
      question: { en: "Can you arrange transport between Makkah and Madinah?", ar: "هل ترتّبون النقل بين مكة والمدينة؟" },
      answer: {
        en: "Yes — that is an intercity journey rather than a Ziyarat one, and it has a page of its own covering the road in both directions, including an honest comparison with the Haramain train. If you want Ziyarat stops in one city and the road to the other on the same trip, send both in one enquiry and they are quoted together.",
        ar: "نعم — وهي رحلة بين المدن لا رحلة زيارة، ولها صفحتها التي تغطي الطريق في الاتجاهين، ومعها مقارنة صادقة بقطار الحرمين. وإن أردت محطات زيارة في مدينة والطريق إلى الأخرى في الرحلة نفسها، فأرسلهما في طلب واحد فيُسعَّران معًا.",
      },
    },
    {
      question: { en: "How do I get a price?", ar: "كيف أحصل على سعر؟" },
      answer: {
        en: "Send your list, your pickup address, the date and how many of you, and we reply with a written quotation. There is no instant price on this site and nothing is charged here — a Ziyarat journey cannot be priced before the list has been read, because the list is what determines the length of the day.",
        ar: "أرسل قائمتك وعنوان انطلاقك والتاريخ وعددكم، فنرد بعرض سعر مكتوب. ولا يوجد سعر فوري في هذا الموقع ولا يُستوفى فيه شيء — فرحلة الزيارة لا تُسعَّر قبل قراءة القائمة، لأن القائمة هي ما يحدد طول اليوم.",
      },
    },
    {
      question: { en: "Is this shared transport?", ar: "هل هذا نقل مشترك؟" },
      answer: {
        en: "No. The whole vehicle is reserved for your party and nobody else is collected along the way. That is the main practical difference from a shared tour: you set the order, you set the pace, and you are not waiting for strangers at each stop.",
        ar: "لا. فالمركبة كاملة محجوزة لمجموعتك ولا يُقلّ معكم أحد في الطريق. وهذا هو الفارق العملي الأهم عن الجولة المشتركة: أنت تحدد الترتيب وأنت تحدد الوتيرة، ولا تنتظر غرباء عند كل محطة.",
      },
    },
    {
      question: { en: "Do you arrange Ziyarat outside Makkah and Madinah?", ar: "هل ترتّبون الزيارة خارج مكة والمدينة؟" },
      answer: {
        en: "Sometimes, where we already cover the roads involved. We deliberately publish no list of sites elsewhere, because naming places we have not confirmed we can reach would read as a promise. Send your list and your dates and we will tell you plainly what we can arrange and what we cannot.",
        ar: "أحيانًا، حيث نغطي الطرق المعنية أصلًا. ولا ننشر عمدًا قائمة بمواضع في أماكن أخرى، لأن ذكر مواضع لم نتأكد من إمكان بلوغها يُقرأ وعدًا. أرسل قائمتك وتواريخك ونخبرك بصراحة بما نستطيع ترتيبه وما لا نستطيع.",
      },
    },
  ] as ClusterFaq[],

  // --- CTA and related ------------------------------------------------------------------------

  cta: {
    eyebrow: { en: "Your list, your pace", ar: "قائمتك ووتيرتك" },
    heading: { en: "Planning your Ziyarat journey?", ar: "تخطّط لرحلة زيارتك؟" },
    body: {
      en: "Send the places you want to visit, where we should collect you, the date and how many of you are travelling. We reply with a written quotation.",
      ar: "أرسل المواضع التي تريد زيارتها، ومن أين نستقبلك، والتاريخ، وعدد المسافرين. ونرد بعرض سعر مكتوب.",
    },
    button: { en: "Request a Ziyarat quote", ar: "اطلب عرض سعر للزيارة" },
  } as ClusterCta,

  whatsappMessage: {
    en: "Hello — I would like a quotation for a private Ziyarat journey.",
    ar: "السلام عليكم — أرغب في عرض سعر لرحلة زيارة خاصة.",
  },
  whatsappCta: { en: "Ask on WhatsApp", ar: "اسأل عبر واتساب" },

  relatedHeading: { en: "Related services", ar: "خدمات ذات صلة" },

  related: [
    {
      routeKey: "makkahZiyarat",
      label: { en: "Makkah Ziyarat transfers", ar: "النقل للزيارة في مكة" },
      note: {
        en: "The Makkah page in full: the places you can pick, and a straight word on what each visit actually asks of you.",
        ar: "صفحة مكة كاملة: المواضع التي يمكنك اختيارها، وكلمة صريحة عما تتطلبه كل زيارة فعلًا.",
      },
    },
    {
      routeKey: "madinahZiyarat",
      label: { en: "Madinah Ziyarat transfers", ar: "النقل للزيارة في المدينة" },
      note: {
        en: "The Madinah page in full: the sites grouped by the direction they lie in, and the one you can simply walk to.",
        ar: "صفحة المدينة كاملة: المواضع مرتَّبة بحسب الجهة التي تقع فيها، والموضع الذي يمكنك بلوغه مشيًا.",
      },
    },
    {
      routeKey: "umrahTransfers",
      label: { en: "Umrah transfers", ar: "نقل العمرة" },
      note: {
        en: "If the Ziyarat day sits inside a pilgrimage trip, this quotes the whole chain — arrival, hotels, the road north and the departure — as one arrangement.",
        ar: "إن كان يوم الزيارة ضمن رحلة عمرة، فهذه تسعّر السلسلة كاملة — الوصول والفنادق والطريق شمالًا والمغادرة — ترتيبًا واحدًا.",
      },
    },
    {
      routeKey: "makkah",
      label: { en: "Private transfers in Makkah", ar: "توصيل خاص في مكة المكرمة" },
      note: {
        en: "The city page: hotel access near the Haram, the Haramain station, and the entry rules that apply before any of it.",
        ar: "صفحة المدينة: الدخول إلى الفنادق قرب الحرم، ومحطة قطار الحرمين، وشروط الدخول السارية قبل ذلك كله.",
      },
    },
    {
      routeKey: "madinah",
      label: { en: "Private transfers in Madinah", ar: "توصيل خاص في المدينة المنورة" },
      note: {
        en: "The city page: the central-area hotels, the airport, the station, and the Ziyarat section this page links out to.",
        ar: "صفحة المدينة: فنادق المنطقة المركزية والمطار والمحطة وقسم الزيارة الذي تحيل إليه هذه الصفحة.",
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
      routeKey: "hotelTransfers",
      label: { en: "Hotel transfers", ar: "النقل من الفنادق" },
      note: {
        en: "Where most Ziyarat journeys begin and end: what we need to collect you, and who decides where the car can wait.",
        ar: "حيث تبدأ معظم رحلات الزيارة وتنتهي: ما نحتاجه لاستقبالك، ومن يحدد أين تنتظر السيارة.",
      },
    },
    {
      routeKey: "airportTransfers",
      label: { en: "Airport transfers", ar: "النقل من المطارات" },
      note: {
        en: "The arrival that comes before all of it, timed against your flight number rather than a clock.",
        ar: "الوصول الذي يسبق ذلك كله، مضبوطًا على رقم رحلتك لا على توقيت الساعة.",
      },
    },
    {
      routeKey: "cityToCity",
      label: { en: "City-to-city transfers", ar: "النقل بين المدن" },
      note: {
        en: "For the longer legs around a Ziyarat trip — twelve intercity journeys with pages of their own.",
        ar: "للمراحل الأطول حول رحلة الزيارة — اثنتا عشرة رحلة بين المدن لها صفحاتها.",
      },
    },
  ] as RelatedLink[],
};
