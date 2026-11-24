import type {
  ClusterCta,
  ClusterFaq,
  RelatedLink,
} from "@/lib/content/riyadh/types";
import type { RouteKey } from "@/lib/i18n/routes";
import type { SiteImageKey } from "@/lib/site-images";

/**
 * Madinah Ziyarat transfers.
 *
 * **Concept: three directions, and one you can walk to.** Makkah's Ziyarat
 * sites differ by *effort* — two of them end in a long climb — so that page
 * is a route sheet annotated with what each visit asks of you. Madinah's are
 * nothing like that. They are mostly level, mostly drive-up, and what
 * actually varies is **where they are**: Quba to the south, Uhud to the
 * north, Qiblatain and the Seven Mosques out to the west. Picking two in one
 * direction is a short outing; picking one from each is a different day
 * altogether.
 *
 * So this page groups by compass heading rather than listing flat, and the
 * summary counts the directions you have touched. That is an honest proxy
 * for "how big is this day" without inventing a duration we cannot know.
 *
 * **The honest moment is Jannat al-Baqi.** It sits immediately beside the
 * Prophet's Mosque and nearly everyone walks there. It is listed separately
 * and the page says plainly that a car is usually unnecessary for it — a
 * stop we decline to sell is more use to the reader than one we pad the list
 * with.
 *
 * ## Locations, and what is left out
 *
 * Five selectable, plus Baqi noted separately. Directions come from
 * published planning guidance; the only distance published is Uhud's "about
 * 4 km", which is the figure this project already uses in
 * `madinah-region/madinah.ts`. Sources disagree on Qiblatain's distance —
 * one puts it about 4 km north-west, another "just west" — so no figure is
 * given for it, only the heading.
 *
 * **Masjid al-Ghamama is deliberately not listed.** It is a real mosque by
 * the Prophet's Mosque, but research returned nothing reliable on its
 * current visitor arrangements, so it goes to the owner as a question rather
 * than onto the page as a tick-box.
 *
 * ## Claims
 *
 * **Madinah's access rule is not Makkah's, and this page does not borrow
 * it.** Visit Saudi's wording, already used in `madinah-region/madinah.ts`,
 * is that Madinah welcomes visitors from around the world and that access to
 * certain sacred areas, including Al Masjid an Nabawi, is restricted to
 * Muslims. There is no city-entry restriction here and the page must never
 * imply one.
 *
 * **No opening hours, no visiting rules, no dress guidance, no durations,
 * no prices, no guaranteed entry, no guide.** Where a site sets its own
 * arrangements — Baqi most of all — the page says so and stops.
 *
 * **Vehicles** are `lib/content/vehicles.ts` verbatim: Private Sedan, SUV,
 * Passenger Van, Minibus — up to 3, 4, 7 and 14. Fourteen is the confirmed
 * single-vehicle ceiling; beyond it, more than one vehicle is coordinated
 * subject to availability.
 *
 * Sources: HalalBooking's Madinah Ziyarat guide for the directions and the
 * approximate distances; this project's own Madinah hub for Uhud's figure
 * and for the Visit Saudi access wording.
 */

/** One compass group of stops. */
export type MadinahDirection = {
  id: string;
  heading: { en: string; ar: string };
  /** Where it lies relative to the Prophet's Mosque. */
  bearing: { en: string; ar: string };
  stops: {
    id: string;
    en: string;
    ar: string;
    note: { en: string; ar: string };
  }[];
  imageKey?: SiteImageKey;
};

export const madinahZiyarat = {
  routeKey: "madinahZiyarat" as RouteKey,
  imageKey: "dest-madinah" as SiteImageKey,

  seo: {
    title: {
      en: "Madinah Ziyarat Transfers | Private Car for Your Visits",
      ar: "النقل للزيارة في المدينة المنورة | سيارة خاصة",
    },
    description: {
      en: "Private transport for Ziyarat visits around Madinah — Quba to the south, Uhud to the north, Qiblatain and the Seven Mosques west. Choose your stops and send one itinerary for a written quotation.",
      ar: "نقل خاص لزيارات المدينة المنورة — قباء جنوبًا، وأحد شمالًا، والقبلتين والمساجد السبعة غربًا. اختر محطاتك وأرسل برنامجًا واحدًا للحصول على عرض سعر مكتوب.",
    },
  },

  crumbLabel: { en: "Madinah Ziyarat transfers", ar: "النقل للزيارة في المدينة" },

  // --- Hero -------------------------------------------------------------------

  eyebrow: { en: "Ziyarat · Madinah", ar: "الزيارة · المدينة المنورة" },
  title: {
    en: "Madinah's Ziyarat sites sit in three directions",
    ar: "مزارات المدينة المنورة في ثلاث جهات",
  },
  standfirst: {
    en: "Quba to the south, Uhud to the north, Qiblatain and the Seven Mosques out to the west. None of them is far, and almost all are level ground — so the question here is not whether you can manage the visit. It is which directions you want to cover, because that is what decides the shape of the day. Pick yours below and we will quote the driving as one journey.",
    ar: "قباء جنوبًا، وأحد شمالًا، والقبلتين والمساجد السبعة غربًا. ولا شيء منها بعيد، وأغلبها على أرض مستوية — فالسؤال هنا ليس هل تقدر على الزيارة. بل أي الجهات تريد تغطيتها، فذلك ما يحدد شكل اليوم. اختر جهاتك أدناه ونسعّر القيادة رحلةً واحدة.",
  },

  primaryCta: { en: "Select your destinations", ar: "اختر وجهاتك" },
  secondaryCta: { en: "Request a private transfer quote", ar: "اطلب عرض سعر نقل خاص" },

  // --- The planner --------------------------------------------------------------

  planner: {
    heading: { en: "Choose your directions", ar: "اختر جهاتك" },
    lead: {
      en: "Tick what you want to include. The summary counts the directions rather than the hours, because the hours depend on the day, the traffic and how long you stay — and those are settled when the quotation is prepared.",
      ar: "أشِّر على ما تريد إدراجه. ويحصي الملخص الجهات لا الساعات، فالساعات تعتمد على اليوم والحركة ومدة بقائك — وتُحسم عند إعداد عرض السعر.",
    },
    directions: [
      {
        id: "south",
        heading: { en: "South", ar: "جنوبًا" },
        bearing: {
          en: "About 3–4 km from the Prophet's Mosque",
          ar: "نحو 3–4 كم من المسجد النبوي",
        },
        imageKey: "madinah-quba" as SiteImageKey,
        stops: [
          {
            id: "quba",
            en: "Quba Mosque",
            ar: "مسجد قباء",
            note: {
              en: "The first mosque built in Islam, and the stop most people put first. Level ground and a short drive out of the centre.",
              ar: "أول مسجد بُني في الإسلام، وهو المحطة التي يضعها معظم الناس أولًا. أرض مستوية ومسافة قصيرة من المركز.",
            },
          },
        ],
      },
      {
        id: "north",
        heading: { en: "North", ar: "شمالًا" },
        bearing: {
          en: "About 4 km from the Prophet's Mosque",
          ar: "نحو 4 كم من المسجد النبوي",
        },
        imageKey: "svc-ziyarat" as SiteImageKey,
        stops: [
          {
            id: "uhud",
            en: "Mount Uhud",
            ar: "جبل أحد",
            note: {
              en: "The site of the Battle of Uhud. Visitors generally stay on the lower ground rather than climbing, which makes it an easier stop than its size suggests.",
              ar: "موقع غزوة أحد. ويبقى الزوار عادةً في الأرض المنخفضة دون صعود، فهو محطة أيسر مما يوحي حجمه.",
            },
          },
          {
            id: "shuhada",
            en: "Uhud Martyrs' Cemetery",
            ar: "مقبرة شهداء أحد",
            note: {
              en: "Beside Mount Uhud, so the two are nearly always taken together rather than as separate trips.",
              ar: "بجوار جبل أحد، فيُؤخذان معًا في الغالب لا كرحلتين منفصلتين.",
            },
          },
        ],
      },
      {
        id: "west",
        heading: { en: "West and north-west", ar: "غربًا وشمالًا غربًا" },
        bearing: {
          en: "Published distances for these two disagree; both are a short drive out",
          ar: "تتعارض المسافات المنشورة لهذين؛ وكلاهما على مسافة قصيرة بالسيارة",
        },
        stops: [
          {
            id: "qiblatain",
            en: "Masjid al-Qiblatain",
            ar: "مسجد القبلتين",
            note: {
              en: "The mosque associated with the change of prayer direction. Sources place it variously west and north-west of the centre, which is why we give the heading rather than a figure.",
              ar: "المسجد المرتبط بتحويل القبلة. وتضعه المصادر غربًا وشمالًا غربًا من المركز، ولهذا نذكر الجهة لا الرقم.",
            },
          },
          {
            id: "seven",
            en: "The Seven Mosques",
            ar: "المساجد السبعة",
            note: {
              en: "The cluster on the ground of the Battle of the Trench. Close enough to Qiblatain that most people take the two in one leg.",
              ar: "المجموعة في أرض غزوة الخندق. وهي قريبة من القبلتين بما يجعل معظم الناس يأخذونهما في مرحلة واحدة.",
            },
          },
        ],
      },
    ] as MadinahDirection[],
    walkable: {
      heading: { en: "One you probably do not need us for", ar: "واحد لا تحتاجنا له غالبًا" },
      body: {
        en: "Jannat al-Baqi sits immediately beside the Prophet's Mosque, and nearly everyone reaches it on foot from the Haram. We have left it off the list above rather than sell you a car for a walk. Its visiting arrangements are set by the site itself and are worth checking for your date. If you want it included as part of a longer journey, say so in the enquiry and we will plan around it.",
        ar: "تقع جنة البقيع ملاصقة للمسجد النبوي، ويبلغها الجميع تقريبًا مشيًا من الحرم. وقد تركناها خارج القائمة أعلاه بدل أن نبيعك سيارة لمسافة تُمشى. وترتيبات زيارتها يحددها الموضع نفسه، ويستحق التحقق منها لتاريخك. وإن أردت إدراجها ضمن رحلة أطول فاذكر ذلك في الطلب ونخطط حولها.",
      },
    },
    copy: {
      pickupLabel: { en: "Where does the journey start?", ar: "من أين تبدأ الرحلة؟" },
      pickupPlaceholder: { en: "Hotel name and address in Madinah", ar: "اسم الفندق وعنوانه في المدينة" },
      passengersLabel: { en: "How many travelling?", ar: "كم عدد المسافرين؟" },
      passengersAny: { en: "Not sure yet", ar: "غير محدد بعد" },
      summaryLabel: { en: "Your journey so far", ar: "رحلتك حتى الآن" },
      emptyState: {
        en: "Nothing selected yet. Tick a place above, or go straight to the form and write your own list.",
        ar: "لم تختر شيئًا بعد. أشِّر على موضع أعلاه، أو اذهب مباشرة إلى النموذج واكتب قائمتك.",
      },
      oneDirection: { en: "One direction — the shorter shape of a Madinah visit.", ar: "جهة واحدة — الشكل الأقصر لزيارة المدينة." },
      twoDirections: { en: "Two directions — a fuller outing, and worth starting earlier.", ar: "جهتان — جولة أوسع، ويُستحسن البدء مبكرًا." },
      threeDirections: { en: "All three directions — the longest of these, and best planned as the main thing you do that day.", ar: "الجهات الثلاث — أطولها، ويُخطَّط لها بوصفها شغل اليوم الأساسي." },
      carryOver: {
        en: "Travel date, luggage, mobility needs and a return pickup go in the message box on the form — those cannot be carried across automatically.",
        ar: "أما تاريخ السفر والأمتعة واحتياجات الحركة والعودة فتُكتب في خانة الرسالة بالنموذج — فهذه لا تُنقل تلقائيًا.",
      },
      cta: { en: "Send your journey details", ar: "أرسل تفاصيل رحلتك" },
    },
  },

  // --- Access -----------------------------------------------------------------------

  access: {
    heading: { en: "Who can visit, and what we can promise", ar: "من يستطيع الزيارة وما نستطيع ضمانه" },
    body: {
      en: "Visit Saudi says Madinah welcomes visitors from around the world, and that access to certain sacred areas, including Al Masjid an Nabawi, is restricted to Muslims. That is a different rule from the one that applies to Makkah, where entry to the city itself is restricted, and we state each as it is rather than carrying one across to the other.",
      ar: "تذكر «روح السعودية» أن المدينة المنورة ترحب بالزوار من أنحاء العالم، وأن الدخول إلى مواضع مقدسة معينة، ومنها المسجد النبوي، مقصور على المسلمين. وهذا حكم يختلف عن المطبَّق في مكة المكرمة حيث يُقيَّد دخول المدينة نفسها، ونذكر كلًّا منهما كما هو لا ننقل أحدهما إلى الآخر.",
    },
    limit: {
      en: "What we arrange is the driving. Whether a particular site is open on your date, who it admits and how long you may stay are matters for that site, not for a transport company — and we would rather say so than imply an access we cannot give. Check current official guidance for your own dates.",
      ar: "وما نرتّبه هو القيادة. أما كون موضع بعينه مفتوحًا في تاريخك ومن يَقبله ومدة بقائك فيه فأمور تخص ذلك الموضع لا شركة نقل — ونفضّل قول ذلك على الإيحاء بدخول لا نملكه. فتحقق من الإرشادات الرسمية السارية لتواريخك.",
    },
    noGuide: {
      en: "We are not a religious authority, a guide, a tour operator or a pilgrimage organiser. The driver is a driver.",
      ar: "ولسنا مرجعًا دينيًا ولا مرشدًا ولا منظّم جولات ولا منظّم حج وعمرة. والسائق سائق.",
    },
  },

  // --- Shapes ------------------------------------------------------------------------

  shapes: {
    heading: { en: "Three ways people put a Madinah visit together", ar: "ثلاث طرق لترتيب زيارة المدينة" },
    lead: {
      en: "Approaches to planning, not packages. None of them has a fixed length or a fixed price, and the real arrangement depends on your stops, your pickup, your date and what is available.",
      ar: "طرائق تخطيط لا برامج. ولا لأيٍّ منها طول ثابت ولا سعر ثابت، والترتيب الفعلي يعتمد على محطاتك ونقطة انطلاقك وتاريخك وما هو متاح.",
    },
    rows: [
      {
        name: { en: "One direction", ar: "جهة واحدة" },
        who: { en: "Quba on its own, or Uhud with its cemetery.", ar: "قباء وحده، أو أحد مع مقبرته." },
        detail: {
          en: "The shorter shape. Fits around prayers without the day being built around it, and the usual choice for a first visit or for a party that tires easily.",
          ar: "الشكل الأقصر. يتّسع حول الصلوات دون أن يُبنى اليوم حوله، وهو الخيار المعتاد لزيارة أولى أو لمجموعة يتعبها الطول.",
        },
      },
      {
        name: { en: "Two directions", ar: "جهتان" },
        who: { en: "Typically the west cluster plus either Quba or Uhud.", ar: "عادةً المجموعة الغربية مع قباء أو أحد." },
        detail: {
          en: "A fuller outing that crosses the city once. Worth starting earlier in the day than people expect.",
          ar: "جولة أوسع تعبر المدينة مرة. ويستحق البدء فيها أبكر مما يتوقع الناس.",
        },
      },
      {
        name: { en: "Your own list", ar: "قائمتك أنت" },
        who: { en: "Somewhere not shown here, or a particular order.", ar: "موضع غير معروض هنا، أو ترتيب بعينه." },
        detail: {
          en: "Send it as you have it. We will say what we can reach and what we cannot, rather than quietly reshaping your list.",
          ar: "أرسلها كما هي. وسنخبرك بما نستطيع بلوغه وما لا نستطيع، بدل إعادة تشكيل قائمتك بصمت.",
        },
      },
    ],
  },

  // --- Pickup and return ----------------------------------------------------------------

  pickup: {
    heading: { en: "Pickup, the stops, and getting back", ar: "الاستقبال والمحطات والعودة" },
    lead: {
      en: "A Ziyarat journey is a loop rather than a line, and the return is the part people most often forget to mention.",
      ar: "رحلة الزيارة دائرة لا خط مستقيم، والعودة هي الجزء الذي ينسى الناس ذكره أكثر من غيره.",
    },
    items: [
      {
        title: { en: "From your hotel", ar: "من فندقك" },
        body: {
          en: "Send the hotel name with its full address, not the brand alone — several Madinah hotels share a name. Where a car may wait is the property's decision rather than ours, and the pickup point is confirmed in writing for your booking.",
          ar: "أرسل اسم الفندق مع عنوانه الكامل لا العلامة التجارية وحدها — فعدة فنادق في المدينة تتشارك الاسم. وموضع انتظار السيارة قرار المنشأة لا قرارنا، وتُؤكَّد نقطة الاستقبال كتابةً لحجزك.",
        },
      },
      {
        title: { en: "From another address", ar: "من عنوان آخر" },
        body: {
          en: "A full address rather than a district or a landmark, and the entrance if the building has more than one.",
          ar: "عنوان كامل لا حيًّا ولا معلمًا، والمدخل إن كان للمبنى أكثر من مدخل.",
        },
      },
      {
        title: { en: "Between the stops", ar: "بين المحطات" },
        body: {
          en: "The vehicle stays with your party for the journey rather than leaving you to find transport at each place. The order is agreed beforehand; we do not calculate a route here.",
          ar: "تبقى المركبة مع مجموعتك طوال الرحلة بدل أن تتركك تبحث عن وسيلة نقل عند كل موضع. ويُتفق على الترتيب مسبقًا؛ ولا نحسب مسارًا هنا.",
        },
      },
      {
        title: { en: "And back again", ar: "ثم العودة" },
        body: {
          en: "Say where you want to finish — your hotel, the Haram, or somewhere else. Put the return in the same enquiry so it is quoted with the rest and confirmed as part of the booking rather than agreed at the roadside.",
          ar: "اذكر أين تريد أن تنتهي — فندقك أو الحرم أو مكان آخر. وضع العودة في الطلب نفسه لتُسعَّر مع الباقي وتُؤكَّد ضمن الحجز لا عند قارعة الطريق.",
        },
      },
    ],
  },

  // --- Vehicles ----------------------------------------------------------------------------

  vehicles: {
    heading: { en: "Passengers, suitcases and the right vehicle", ar: "الركاب والحقائب والمركبة المناسبة" },
    lead: {
      en: "A Ziyarat day carries almost no luggage but a great deal of getting in and out, so door access and step height matter more here than boot space does.",
      ar: "يوم الزيارة يحمل أمتعة تكاد تنعدم وصعودًا ونزولًا كثيرًا، فسهولة الأبواب وارتفاع العتبة هنا أهم من سعة الصندوق.",
    },
    slugs: ["sedan", "suv", "van", "minibus"],
    groupNote: {
      en: "Fourteen passengers is the most we seat in a single vehicle. Above that, more than one vehicle can be coordinated so the party travels together — subject to availability on your date, which the quotation checks. If anyone would struggle with a high step, say so and it is taken into account when the class is proposed.",
      ar: "وأربعة عشر راكبًا أقصى ما نُجلسه في مركبة واحدة. وفوق ذلك يمكن تنسيق أكثر من مركبة ليسافر الجميع معًا — رهنًا بالتوافر في تاريخك، وهو ما يتحقق منه عرض السعر. وإن كان أحدهم يصعب عليه صعود عتبة مرتفعة فاذكر ذلك ليؤخذ في الحسبان عند اقتراح الفئة.",
    },
    footnote: {
      en: "Models and makes vary by availability; the class is what is confirmed in your quotation.",
      ar: "وتتفاوت الموديلات والطرز بحسب التوافر؛ والفئة هي ما يُؤكَّد في عرض سعرك.",
    },
  },

  // --- Process -------------------------------------------------------------------------------

  process: {
    heading: { en: "From your list to a confirmed journey", ar: "من قائمتك إلى رحلة مؤكدة" },
    steps: [
      {
        title: { en: "Send your journey", ar: "أرسل رحلتك" },
        body: { en: "The stops, the pickup, the date and how many of you.", ar: "المحطات ونقطة الانطلاق والتاريخ وعددكم." },
      },
      {
        title: { en: "We check it", ar: "نتحقق منها" },
        body: {
          en: "The places, the order, availability for your date and the vehicle the party needs.",
          ar: "المواضع والترتيب والتوافر في تاريخك والمركبة التي تحتاجها المجموعة.",
        },
      },
      {
        title: { en: "A written quotation", ar: "عرض سعر مكتوب" },
        body: { en: "With the vehicle class and the arrangement set out. You read it and decide.", ar: "وفيه فئة المركبة والترتيب مبيّنان. تقرؤه ثم تقرر." },
      },
      {
        title: { en: "Confirmed separately", ar: "ويُؤكَّد منفصلًا" },
        body: {
          en: "You accept, and the journey is confirmed only when we send a booking confirmation saying so.",
          ar: "تقبل العرض، ولا تتأكد الرحلة إلا عندما نرسل رسالة تأكيد حجز تنص على ذلك.",
        },
      },
    ],
    note: {
      en: "Sending an enquiry does not confirm a booking and does not hold a vehicle. Nothing is reserved and no payment is taken on this website, and there is no instant price — the journey is quoted after the list has been read.",
      ar: "وإرسال الطلب لا يؤكد حجزًا ولا يحجز مركبة. ولا يُحجز شيء ولا يُستوفى أي مبلغ عبر هذا الموقع، ولا يوجد سعر فوري — فالرحلة تُسعَّر بعد قراءة القائمة.",
    },
  },

  // --- FAQs ------------------------------------------------------------------------------------

  faqHeading: { en: "Common questions", ar: "الأسئلة الشائعة" },

  faqs: [
    {
      question: { en: "Which places can I include?", ar: "أي المواضع يمكنني إدراجها؟" },
      answer: {
        en: "The planner lists five that people ask for most — Quba to the south, Mount Uhud and the Martyrs' Cemetery to the north, and Masjid al-Qiblatain with the Seven Mosques to the west. Anything you add in the enquiry is read the same way. If somewhere on your list is a place we cannot reach, we will say so rather than quietly drop it.",
        ar: "يذكر المخطِّط خمسة مواضع يطلبها الناس أكثر — قباء جنوبًا، وجبل أحد ومقبرة الشهداء شمالًا، ومسجد القبلتين مع المساجد السبعة غربًا. وما تضيفه في الطلب يُقرأ بالطريقة نفسها. وإن كان في قائمتك موضع لا نستطيع بلوغه فسنقول ذلك بدل إسقاطه بصمت.",
      },
    },
    {
      question: { en: "Do I need a car for Jannat al-Baqi?", ar: "هل أحتاج سيارة لجنة البقيع؟" },
      answer: {
        en: "Usually not. It is immediately beside the Prophet's Mosque and nearly everyone walks there from the Haram, which is why we have left it off the selectable list rather than sell you a car for a walk. Its visiting arrangements are set by the site and worth checking for your date. If you want it worked into a longer journey, mention it in the enquiry.",
        ar: "غالبًا لا. فهي ملاصقة للمسجد النبوي ويبلغها الجميع تقريبًا مشيًا من الحرم، ولهذا تركناها خارج القائمة القابلة للاختيار بدل أن نبيعك سيارة لمسافة تُمشى. وترتيبات زيارتها يحددها الموضع ويستحق التحقق منها لتاريخك. وإن أردت إدراجها ضمن رحلة أطول فاذكرها في الطلب.",
      },
    },
    {
      question: { en: "How many places fit in one journey?", ar: "كم موضعًا يتّسع في رحلة واحدة؟" },
      answer: {
        en: "It depends less on the number than on the directions. Two stops in the same direction is a short outing; one from each of the three is a different day. That is why the planner counts directions rather than hours — we cannot know in advance how long your party will want at each place, and a figure printed here would be wrong for most people reading it.",
        ar: "يعتمد ذلك على الجهات أكثر من العدد. فمحطتان في جهة واحدة جولة قصيرة؛ وواحدة من كل جهة من الثلاث يوم مختلف. ولهذا يحصي المخطِّط الجهات لا الساعات — فلا نعرف مسبقًا كم تريد مجموعتك البقاء عند كل موضع، ورقم مطبوع هنا سيكون خاطئًا لمعظم من يقرؤه.",
      },
    },
    {
      question: { en: "Can non-Muslims visit Madinah?", ar: "هل يمكن لغير المسلمين زيارة المدينة المنورة؟" },
      answer: {
        en: "Visit Saudi says Madinah welcomes visitors from around the world, and that access to certain sacred areas, including Al Masjid an Nabawi, is restricted to Muslims. That is not the same rule as Makkah's, where entry to the city itself is restricted. Check current official guidance for your dates, and tell us your destinations so we can say plainly what we can and cannot drive you to.",
        ar: "تذكر «روح السعودية» أن المدينة المنورة ترحب بالزوار من أنحاء العالم، وأن الدخول إلى مواضع مقدسة معينة، ومنها المسجد النبوي، مقصور على المسلمين. وليس هذا حكم مكة المكرمة حيث يُقيَّد دخول المدينة نفسها. فتحقق من الإرشادات الرسمية السارية لتواريخك، وأخبرنا بوجهاتك لنوضح بصراحة إلى أين نستطيع إيصالك وإلى أين لا.",
      },
    },
    {
      question: { en: "Do you provide a guide?", ar: "هل توفّرون مرشدًا؟" },
      answer: {
        en: "No. We arrange road transport and the driver is a driver — we are not a religious authority, a guide, a tour operator or a pilgrimage organiser. Questions about what a place means or what to recite belong to a scholar or your group organiser.",
        ar: "لا. نحن نرتّب النقل البري والسائق سائق — ولسنا مرجعًا دينيًا ولا مرشدًا ولا منظّم جولات ولا منظّم حج وعمرة. وأسئلة دلالة الموضع وما يُقال مردّها إلى عالم أو إلى منظّم مجموعتك.",
      },
    },
    {
      question: { en: "Will the car wait while we are inside?", ar: "هل تنتظر السيارة أثناء وجودنا بالداخل؟" },
      answer: {
        en: "The vehicle stays with your party for the journey rather than leaving between stops — that is the point of booking it privately. How long you spend at each place is yours to set, and it is agreed in the quotation rather than left open, because it is what determines the length of the day.",
        ar: "تبقى المركبة مع مجموعتك طوال الرحلة ولا تغادر بين المحطات — وهذا هو جوهر حجزها خاصةً. ومدة بقائك عند كل موضع تحددها أنت، ويُتفق عليها في عرض السعر لا تُترك مفتوحة، لأنها هي ما يحدد طول اليوم.",
      },
    },
    {
      question: { en: "Can you collect us again at the end?", ar: "هل تستقبلوننا مرة أخرى في النهاية؟" },
      answer: {
        en: "Yes, and it is worth putting in the same enquiry rather than arranging on the day. Say where you want to finish — your hotel, the Haram or somewhere else — and the return is quoted with the rest and confirmed as part of the booking.",
        ar: "نعم، ويستحق وضعه في الطلب نفسه لا ترتيبه في اليوم ذاته. اذكر أين تريد أن تنتهي — فندقك أو الحرم أو مكان آخر — فتُسعَّر العودة مع الباقي وتُؤكَّد ضمن الحجز.",
      },
    },
    {
      question: { en: "We are a family of eleven. One vehicle?", ar: "نحن عائلة من أحد عشر. مركبة واحدة؟" },
      answer: {
        en: "Probably, since fourteen is the most we seat in one vehicle and a Ziyarat day carries almost no luggage. If the party would rather spread out, or the numbers go higher, more than one vehicle can be coordinated subject to availability on your date. Tell us the count including children, and mention anyone who would struggle with a high step.",
        ar: "على الأرجح، فأربعة عشر أقصى ما نُجلسه في مركبة واحدة ويوم الزيارة يكاد يخلو من الأمتعة. وإن فضّلت المجموعة التوسّع أو زاد العدد، أمكن تنسيق أكثر من مركبة رهنًا بالتوافر في تاريخكم. أخبرنا بالعدد ومنه الأطفال، واذكر من يصعب عليه صعود عتبة مرتفعة.",
      },
    },
    {
      question: { en: "Can we add the road to Makkah afterwards?", ar: "هل نضيف الطريق إلى مكة بعدها؟" },
      answer: {
        en: "Yes, and send it in the same enquiry rather than separately — the two are quoted together and the timing can be planned around each other. That road has a page of its own covering both directions, including an honest comparison with the Haramain train.",
        ar: "نعم، وأرسله في الطلب نفسه لا منفصلًا — فيُسعَّران معًا ويمكن تخطيط التوقيت لكلٍّ حول الآخر. ولذلك الطريق صفحته التي تغطي الاتجاهين، ومعها مقارنة صادقة بقطار الحرمين.",
      },
    },
    {
      question: { en: "How do I get a price?", ar: "كيف أحصل على سعر؟" },
      answer: {
        en: "Send your stops, the pickup address, the date and how many of you, and we reply with a written quotation. There is no instant price on this site and nothing is charged here — the journey is priced after the list has been read.",
        ar: "أرسل محطاتك وعنوان الانطلاق والتاريخ وعددكم، فنرد بعرض سعر مكتوب. ولا يوجد سعر فوري في هذا الموقع ولا يُستوفى فيه شيء — فالرحلة تُسعَّر بعد قراءة القائمة.",
      },
    },
  ] as ClusterFaq[],

  // --- CTA and related -------------------------------------------------------------------------

  cta: {
    eyebrow: { en: "Your stops, your order", ar: "محطاتك وترتيبك" },
    heading: { en: "Plan your Madinah Ziyarat", ar: "خطّط زيارتك في المدينة المنورة" },
    body: {
      en: "The places, where we collect you, the date and how many are travelling. We check the journey and reply with a written quotation.",
      ar: "المواضع، ومن أين نستقبلك، والتاريخ، وعدد المسافرين. نتحقق من الرحلة ونرد بعرض سعر مكتوب.",
    },
    button: { en: "Send your journey details", ar: "أرسل تفاصيل رحلتك" },
  } as ClusterCta,

  whatsappMessage: {
    en: "Hello — I would like a quotation for a private Ziyarat journey in Madinah.",
    ar: "السلام عليكم — أرغب في عرض سعر لرحلة زيارة خاصة في المدينة المنورة.",
  },
  whatsappCta: { en: "Ask on WhatsApp", ar: "اسأل عبر واتساب" },

  relatedHeading: { en: "Related pages", ar: "صفحات ذات صلة" },

  related: [
    {
      routeKey: "ziyaratTransfers",
      label: { en: "Ziyarat transfers across Saudi Arabia", ar: "النقل للزيارة في أنحاء السعودية" },
      note: {
        en: "The service page above this one, covering Makkah and elsewhere as well as Madinah.",
        ar: "الصفحة الأعم فوق هذه، وتغطي مكة المكرمة وغيرها إلى جانب المدينة.",
      },
    },
    {
      routeKey: "makkahZiyarat",
      label: { en: "Makkah Ziyarat transfers", ar: "النقل للزيارة في مكة" },
      note: {
        en: "The other half of the cluster — where the sites differ by effort rather than direction, and two of them end in a climb.",
        ar: "النصف الآخر من المجموعة — حيث تختلف المواضع بالجهد لا بالجهة، واثنان منها ينتهيان بصعود.",
      },
    },
    {
      routeKey: "madinah",
      label: { en: "Private transfers in Madinah", ar: "توصيل خاص في المدينة المنورة" },
      note: {
        en: "The city page: the central-area hotels, the airport, the Haramain station and journeys onward.",
        ar: "صفحة المدينة: فنادق المنطقة المركزية والمطار ومحطة قطار الحرمين والرحلات التالية.",
      },
    },
    {
      routeKey: "madinahAirport",
      label: { en: "Madinah airport transfers", ar: "النقل من مطار المدينة" },
      note: {
        en: "Prince Mohammad bin Abdulaziz: arrivals timed to your flight, and the short road leg to a central hotel.",
        ar: "مطار الأمير محمد بن عبدالعزيز: استقبال مضبوط على رحلتك، والمرحلة البرية القصيرة إلى فندق مركزي.",
      },
    },
    {
      routeKey: "makkahToMadinah",
      label: { en: "Makkah to Madinah", ar: "من مكة إلى المدينة" },
      note: {
        en: "The road between the two holy cities, both directions, with the Haramain train compared honestly.",
        ar: "الطريق بين المدينتين المقدستين في الاتجاهين، مع مقارنة صادقة بقطار الحرمين.",
      },
    },
    {
      routeKey: "umrahTransfers",
      label: { en: "Umrah transfers", ar: "نقل العمرة" },
      note: {
        en: "If the Ziyarat day sits inside a pilgrimage trip, this quotes the whole chain as one arrangement.",
        ar: "إن كان يوم الزيارة ضمن رحلة عمرة، فهذه تسعّر السلسلة كاملة ترتيبًا واحدًا.",
      },
    },
  ] as RelatedLink[],
};
