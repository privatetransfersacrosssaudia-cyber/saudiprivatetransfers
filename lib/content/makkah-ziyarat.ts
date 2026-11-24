import type {
  ClusterCta,
  ClusterFaq,
  RelatedLink,
} from "@/lib/content/riyadh/types";
import type { RouteKey } from "@/lib/i18n/routes";
import type { SiteImageKey } from "@/lib/site-images";

/**
 * Makkah Ziyarat transfers.
 *
 * **Concept: the drive and the visit are two different things.** Every
 * competitor page lists the same places and implies the car delivers you to
 * all of them equally. It does not. Jabal Thawr ends in a steep climb that
 * takes most people over an hour; Jabal al-Nour is the same again; Masjid
 * Aisha is a doorway you walk through. The transport is identical in each
 * case and the *visit* is nothing like it — and the single most useful thing
 * this page can do for someone travelling with a grandparent is say so
 * before they book, not after.
 *
 * So every stop in the planner carries a one-line note about what the place
 * actually asks of you. That note is about the site, not a promise about
 * where the vehicle stops, which is the property of the site rather than
 * ours.
 *
 * ## Which places, and why only these
 *
 * Eight, all verified outside the Mashaer. The owner has excluded **Mina,
 * Arafat, Muzdalifah and Jabal Rahmah** outright, and none of them appears
 * anywhere on this page — not in the planner, not in a card, not in a
 * prefill, not in an example itinerary. The same two were removed from
 * `lib/content/ziyarat.ts` in the same change; that page had not shipped.
 *
 * The Kiswah complex and Al-Hudaybiyyah were held back on the first pass and
 * added once the owner confirmed both are served. The wording is theirs: we
 * drive there, and the pickup and the arrangement are confirmed at
 * quotation and booking. Neither entry says we obtain anyone an appointment
 * — published visiting hours for the Kiswah complex contradict each other
 * between Visit Saudi and other sources, and entry is the complex’s to
 * grant, so the page promises the journey and not the door.
 *
 * A short accurate list still beats a long one that cannot be stood behind;
 * eight is where it stops.
 *
 * ## Claims
 *
 * **No durations, no distances except one sourced figure, no prices, no
 * opening hours, no guaranteed access, no guide.** Jabal al-Nour's rough
 * distance from the Grand Mosque is the only measurement published, and it
 * is given as "about 4 km" with the hedge intact.
 *
 * **Vehicles** are `lib/content/vehicles.ts` verbatim: Private Sedan, SUV,
 * Passenger Van, Minibus — up to 3, 4, 7 and 14. Fourteen is the confirmed
 * single-vehicle ceiling; above it, more than one vehicle is coordinated
 * subject to availability.
 *
 * **Entry to Makkah is restricted to Muslims**, stated in the site's
 * established wording, and we accept journeys into the city only for
 * passengers who may legally enter on their travel date.
 *
 * Sources consulted for the sites and their character: Saudipedia's list of
 * Islamic historical sites in Makkah; The National on the Hira Cultural
 * District; Visit Saudi and Accor for the Kiswah factory (which is why it is
 * excluded rather than listed).
 */

/** One selectable stop. `effort` is about the place, not about our service. */
export type MakkahStop = {
  id: string;
  en: string;
  ar: string;
  /** What the place asks of a visitor once the car has arrived. */
  effort: { en: string; ar: string };
  /** Shown as a quiet tag on the card. */
  tag: { en: string; ar: string };
};

export const makkahZiyarat = {
  routeKey: "makkahZiyarat" as RouteKey,
  imageKey: "makkah-region-night" as SiteImageKey,

  seo: {
    title: {
      en: "Makkah Ziyarat Transfers | Private Car for Your Visits",
      ar: "النقل للزيارة في مكة | سيارة خاصة لزياراتك",
    },
    description: {
      en: "Private transport for Ziyarat visits around Makkah — choose your places, we quote the journey. Hotel pickup, a vehicle kept for your party, and an honest note on what each stop involves.",
      ar: "نقل خاص لزيارات مكة المكرمة — اختر مواضعك ونسعّر الرحلة. استقبال من الفندق، ومركبة محجوزة لمجموعتك، وبيان صادق لما يتطلبه كل موضع.",
    },
  },

  crumbLabel: { en: "Makkah Ziyarat transfers", ar: "النقل للزيارة في مكة" },

  // --- Hero ------------------------------------------------------------------

  eyebrow: { en: "Ziyarat · Makkah", ar: "الزيارة · مكة المكرمة" },
  title: {
    en: "Build your Makkah Ziyarat journey",
    ar: "ابنِ رحلة زيارتك في مكة المكرمة",
  },
  standfirst: {
    en: "Pick the places you want to see and we will quote the driving as one journey — collected from your hotel, the vehicle kept for your party between stops, back when you are finished. And beside each place, a straight word about what the visit itself involves, because a car can reach the foot of a mountain but it cannot climb it for you.",
    ar: "اختر المواضع التي تريد رؤيتها ونسعّر القيادة رحلةً واحدة — استقبال من فندقك، ومركبة تبقى لمجموعتك بين المحطات، وعودة حين تنتهي. وبجانب كل موضع كلمة صريحة عما تتطلبه الزيارة نفسها، فالسيارة تبلغ سفح الجبل ولا تصعده عنك.",
  },

  primaryCta: { en: "Plan your Makkah Ziyarat transfer", ar: "خطّط نقل زيارتك في مكة" },
  secondaryCta: { en: "See the places", ar: "اطّلع على المواضع" },

  // --- The planner -------------------------------------------------------------

  planner: {
    heading: { en: "Choose your stops", ar: "اختر محطاتك" },
    lead: {
      en: "Tick what you want to include and the quotation form opens knowing your list. Nothing here is a booking, and the order and the detail are settled when the journey is checked.",
      ar: "أشِّر على ما تريد إدراجه فيُفتح نموذج عرض السعر وهو يعرف قائمتك. ولا شيء هنا حجز، ويُحسم الترتيب والتفاصيل عند مراجعة الرحلة.",
    },
    stops: [
      {
        id: "nour",
        en: "Jabal al-Nour",
        ar: "جبل النور",
        tag: { en: "About 4 km from the Grand Mosque", ar: "نحو 4 كم من المسجد الحرام" },
        effort: {
          en: "The mountain holding the Cave of Hira. The climb is long and steep and is not manageable for everyone — plenty of visitors come to look from the foot of it instead, which is a perfectly ordinary way to make the visit.",
          ar: "الجبل الذي فيه غار حراء. والصعود طويل وشديد الانحدار ولا يقدر عليه الجميع — وكثير من الزوار يأتون للنظر من سفحه، وهي طريقة معتادة تمامًا لأداء الزيارة.",
        },
      },
      {
        id: "hira",
        en: "Hira Cultural District",
        ar: "حي حراء الثقافي",
        tag: { en: "At the foot of Jabal al-Nour", ar: "عند سفح جبل النور" },
        effort: {
          en: "A built visitor district at the base of the mountain, on level ground. Often paired with Jabal al-Nour by people who would rather not attempt the climb.",
          ar: "حي زوّار مبني عند سفح الجبل على أرض مستوية. وكثيرًا ما يُقرَن بجبل النور عند من لا يرغب في محاولة الصعود.",
        },
      },
      {
        id: "thawr",
        en: "Jabal Thawr",
        ar: "جبل ثور",
        tag: { en: "South of the city", ar: "جنوب المدينة" },
        effort: {
          en: "The mountain holding the Cave of Thawr. The hardest of these on foot — published guidance puts the climb well over an hour and recommends it only for those who are fit for it.",
          ar: "الجبل الذي فيه غار ثور. وهو أشقّها سيرًا — وتذكر الإرشادات المنشورة أن الصعود يتجاوز الساعة بكثير ولا يُنصح به إلا لمن هو قادر عليه.",
        },
      },
      {
        id: "taneem",
        en: "Masjid Aisha (Taneem)",
        ar: "مسجد عائشة (التنعيم)",
        tag: { en: "A Miqat for Umrah", ar: "ميقات للعمرة" },
        effort: {
          en: "The usual Miqat for anyone already in Makkah who intends another Umrah, which makes it a practical stop rather than a sightseeing one. People often ask to be collected again afterwards.",
          ar: "الميقات المعتاد لمن كان في مكة وأراد عمرة أخرى، فهو محطة عملية لا جولة نظر. ويطلب الناس غالبًا أن يُستقبلوا منه بعد ذلك.",
        },
      },
      {
        id: "jinn",
        en: "Masjid al-Jinn",
        ar: "مسجد الجن",
        tag: { en: "Near the central area", ar: "قرب المنطقة المركزية" },
        effort: {
          en: "Close in to the city centre and level to reach, which makes it one of the easier stops to fit into a short list.",
          ar: "قريب من وسط المدينة ويُبلَغ على أرض مستوية، فهو من أيسر المحطات إدراجًا في قائمة قصيرة.",
        },
      },
      {
        id: "kiswah",
        en: "The Kiswah complex",
        ar: "مجمع كسوة الكعبة",
        tag: { en: "Umm Al-Joud, west of the city", ar: "أم الجود، غرب المدينة" },
        effort: {
          en: "The King Abdulaziz Complex, where the Kaaba’s covering is made. We drive there; entry is arranged by the complex itself and visits are generally by appointment, so what is possible on your date is confirmed with your quotation rather than assumed here.",
          ar: "مجمع الملك عبدالعزيز لكسوة الكعبة المشرفة. ونحن نوصلك إليه؛ أما الدخول فيرتّبه المجمع نفسه والزيارات عادةً بموعد مسبق، فيُؤكَّد ما هو ممكن في تاريخك مع عرض سعرك لا يُفترض هنا.",
        },
      },
      {
        id: "hudaybiyyah",
        en: "Al-Hudaybiyyah",
        ar: "الحديبية",
        tag: { en: "Outside the city, to the west", ar: "خارج المدينة، إلى الغرب" },
        effort: {
          en: "The furthest of these from the centre, which makes it a stop to decide on early rather than add at the end of a list. The arrangement at the site is confirmed with your quotation.",
          ar: "أبعد هذه المواضع عن المركز، فهو محطة تُقرَّر مبكرًا لا تُضاف في آخر القائمة. ويُؤكَّد الترتيب عند الموضع مع عرض سعرك.",
        },
      },
      {
        id: "mualla",
        en: "Jannat al-Mu'alla",
        ar: "جنة المعلاة",
        tag: { en: "Near the central area", ar: "قرب المنطقة المركزية" },
        effort: {
          en: "The historic cemetery, reached from the road. Visiting arrangements and times are set by the site itself and are worth checking for your date.",
          ar: "المقبرة التاريخية، وتُبلَغ من الطريق. وترتيبات الزيارة وأوقاتها يحددها الموضع نفسه، ويستحق التحقق منها لتاريخك.",
        },
      },
    ] as MakkahStop[],
    copy: {
      pickupLabel: { en: "Where should we collect you?", ar: "من أين نستقبلك؟" },
      pickupPlaceholder: { en: "Hotel name and address in Makkah", ar: "اسم الفندق وعنوانه في مكة" },
      passengersLabel: { en: "How many travelling?", ar: "كم عدد المسافرين؟" },
      passengersAny: { en: "Not sure yet", ar: "غير محدد بعد" },
      stopsLabel: { en: "Places to include", ar: "المواضع المطلوبة" },
      summaryLabel: { en: "Your journey so far", ar: "رحلتك حتى الآن" },
      emptyState: {
        en: "Nothing selected yet. Tick a place above, or go straight to the form and write your own list.",
        ar: "لم تختر شيئًا بعد. أشِّر على موضع أعلاه، أو اذهب مباشرة إلى النموذج واكتب قائمتك.",
      },
      orderNote: {
        en: "Shown in the order you ticked them. We do not calculate a route here — the practical order and what fits in your day are settled when the quotation is prepared.",
        ar: "تظهر بالترتيب الذي أشّرت به. ولا نحسب مسارًا هنا — فالترتيب العملي وما يتسع له يومك يُحسمان عند إعداد عرض السعر.",
      },
      carryOver: {
        en: "Travel date, luggage, mobility needs and anything else go in the message box on the form — those cannot be carried across automatically.",
        ar: "أما تاريخ السفر والأمتعة واحتياجات الحركة وغيرها فتُكتب في خانة الرسالة بالنموذج — فهذه لا تُنقل تلقائيًا.",
      },
      cta: { en: "Send your selected places", ar: "أرسل المواضع التي اخترتها" },
    },
  },

  // --- Access ---------------------------------------------------------------------

  access: {
    heading: { en: "Before anything else: who can enter Makkah", ar: "قبل كل شيء: من يحق له دخول مكة" },
    body: {
      en: "Entry to Makkah is restricted to Muslims, and it is enforced at checkpoints on the roads into the city. We accept journeys into Makkah only for passengers who may legally enter on their travel date. If anyone in your party may not, tell us before you book and we will quote the parts of your trip that are open to you instead.",
      ar: "دخول مكة المكرمة مقصور على المسلمين، ويُطبَّق عند نقاط التفتيش على الطرق المؤدية إلى المدينة. ولا نقبل الرحلات إلى داخل مكة إلا لركاب يحق لهم الدخول نظامًا في تاريخ سفرهم. فإن كان أحد أفراد مجموعتك لا يحق له ذلك فأخبرنا قبل الحجز، ونسعّر لك بدلًا من ذلك أجزاء رحلتك المتاحة.",
    },
    seasonal: {
      en: "Around the Hajj season the authorities announce additional restrictions, and they are announced afresh each year. The current official announcement for your travel date is the one that counts — not anything written on a transport company's website.",
      ar: "وحول موسم الحج تُعلن الجهات المختصة قيودًا إضافية، وتُعلَن من جديد كل عام. والإعلان الرسمي الساري لتاريخ سفرك هو المعتبَر — لا ما هو مكتوب في موقع شركة نقل.",
    },
    excluded: {
      heading: { en: "Where we do not drive", ar: "إلى أين لا نقود" },
      body: {
        en: "We do not arrange transport into Mina, Arafat or Muzdalifah, in any season. Those are not stops we offer and they are not on the list above. What this page covers is the driving between your hotel and the places you have chosen outside them.",
        ar: "لا نرتّب النقل إلى منى أو عرفات أو مزدلفة في أي موسم. فهذه ليست محطات نقدّمها وليست في القائمة أعلاه. وما تغطيه هذه الصفحة هو القيادة بين فندقك والمواضع التي اخترتها خارجها.",
      },
    },
  },

  // --- Comparisons ------------------------------------------------------------------

  comparisons: {
    heading: { en: "Three decisions worth making before you send it", ar: "ثلاثة قرارات تستحق الحسم قبل الإرسال" },
    lead: {
      en: "None of them needs a number from us. All of them change the quotation.",
      ar: "ولا يحتاج أيٌّ منها رقمًا منا. وكلها تغيّر عرض السعر.",
    },
    blocks: [
      {
        title: { en: "A short list or a long one", ar: "قائمة قصيرة أم طويلة" },
        rows: [
          {
            name: { en: "One or two stops", ar: "محطة أو محطتان" },
            detail: {
              en: "Fits between prayers without the day being built around it. Usually the central-area places.",
              ar: "تتّسع بين الصلوات دون أن يُبنى اليوم حولها. وغالبًا ما تكون مواضع المنطقة المركزية.",
            },
          },
          {
            name: { en: "Several stops", ar: "عدة محطات" },
            detail: {
              en: "Needs the order thinking about, because the places are not all on one side of the city.",
              ar: "تحتاج تفكيرًا في الترتيب، فالمواضع ليست كلها في جهة واحدة من المدينة.",
            },
          },
          {
            name: { en: "Your own list", ar: "قائمتك أنت" },
            detail: {
              en: "Somewhere not shown above. Send it and we will say what we can reach and what we cannot.",
              ar: "موضع غير معروض أعلاه. أرسله ونخبرك بما نستطيع بلوغه وما لا نستطيع.",
            },
          },
        ],
      },
      {
        title: { en: "One vehicle or more than one", ar: "مركبة واحدة أم أكثر" },
        rows: [
          {
            name: { en: "Up to 14 passengers", ar: "حتى 14 راكبًا" },
            detail: {
              en: "The most we seat in a single vehicle, luggage allowing.",
              ar: "أقصى ما نُجلسه في مركبة واحدة، إن سمحت الأمتعة.",
            },
          },
          {
            name: { en: "More than 14", ar: "أكثر من 14" },
            detail: {
              en: "More than one vehicle coordinated so the party travels together — subject to availability on your date, which the quotation checks.",
              ar: "تنسيق أكثر من مركبة ليسافر الجميع معًا — رهنًا بالتوافر في تاريخك، وهو ما يتحقق منه عرض السعر.",
            },
          },
          {
            name: { en: "Mobility in the party", ar: "القدرة على الحركة في المجموعة" },
            detail: {
              en: "Step height matters more than seat count on a day of getting in and out. Say if someone cannot manage a high step.",
              ar: "ارتفاع العتبة أهم من عدد المقاعد في يوم كثير الصعود والنزول. فاذكر إن كان أحدهم لا يقدر على عتبة مرتفعة.",
            },
          },
        ],
      },
      {
        title: { en: "Hotel pickup or somewhere else", ar: "الاستقبال من الفندق أم من مكان آخر" },
        rows: [
          {
            name: { en: "From your hotel", ar: "من فندقك" },
            detail: {
              en: "Send the hotel name and its address, not the brand alone. Where a car may wait is the property's decision and is confirmed for your booking.",
              ar: "أرسل اسم الفندق وعنوانه لا العلامة التجارية وحدها. وموضع انتظار السيارة قرار المنشأة ويُؤكَّد لحجزك.",
            },
          },
          {
            name: { en: "From another address", ar: "من عنوان آخر" },
            detail: {
              en: "A full address, and the entrance if the building has more than one.",
              ar: "عنوان كامل، والمدخل إن كان للمبنى أكثر من مدخل.",
            },
          },
          {
            name: { en: "Straight from arrival", ar: "مباشرة عند الوصول" },
            detail: {
              en: "If you are coming in from Jeddah the same day, send that leg in the same enquiry and the two are quoted together.",
              ar: "إن كنت قادمًا من جدة في اليوم نفسه، فأرسل تلك المرحلة في الطلب نفسه فيُسعَّران معًا.",
            },
          },
        ],
      },
    ],
  },

  // --- Vehicles ---------------------------------------------------------------------

  vehicles: {
    heading: { en: "Which vehicle for a day of stops", ar: "أي مركبة ليوم من المحطات" },
    lead: {
      en: "A Ziyarat day is light on luggage and heavy on getting in and out, so door access and step height matter more here than boot space does.",
      ar: "يوم الزيارة خفيف الأمتعة كثير الصعود والنزول، فسهولة الأبواب وارتفاع العتبة هنا أهم من سعة الصندوق.",
    },
    slugs: ["sedan", "suv", "van", "minibus"],
    groupNote: {
      en: "Fourteen passengers is the most we seat in a single vehicle. Above that, more than one vehicle can be coordinated so the party travels together — subject to availability on your date. If anyone would struggle with a high step, say so and it is taken into account when the class is proposed.",
      ar: "وأربعة عشر راكبًا أقصى ما نُجلسه في مركبة واحدة. وفوق ذلك يمكن تنسيق أكثر من مركبة ليسافر الجميع معًا — رهنًا بالتوافر في تاريخك. وإن كان أحدهم يصعب عليه صعود عتبة مرتفعة فاذكر ذلك ليؤخذ في الحسبان عند اقتراح الفئة.",
    },
    footnote: {
      en: "Models and makes vary by availability; the class is what is confirmed in your quotation.",
      ar: "وتتفاوت الموديلات والطرز بحسب التوافر؛ والفئة هي ما يُؤكَّد في عرض سعرك.",
    },
  },

  // --- Process ------------------------------------------------------------------------

  process: {
    heading: { en: "From your list to a confirmed journey", ar: "من قائمتك إلى رحلة مؤكدة" },
    steps: [
      {
        title: { en: "Send your itinerary", ar: "أرسل برنامجك" },
        body: {
          en: "The places, the pickup, the date and how many of you. No payment details and no account.",
          ar: "المواضع ونقطة الانطلاق والتاريخ وعددكم. بلا بيانات دفع وبلا حساب.",
        },
      },
      {
        title: { en: "We check it", ar: "نتحقق منه" },
        body: {
          en: "The journey, the order, availability for your date and the vehicle the party needs.",
          ar: "الرحلة والترتيب والتوافر في تاريخك والمركبة التي تحتاجها المجموعة.",
        },
      },
      {
        title: { en: "A written quotation", ar: "عرض سعر مكتوب" },
        body: {
          en: "With the vehicle class and the arrangement set out. You read it and decide.",
          ar: "وفيه فئة المركبة والترتيب مبيّنان. تقرؤه ثم تقرر.",
        },
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
      en: "Sending an enquiry does not confirm a booking and does not hold a vehicle. Nothing is reserved and no payment is taken on this website, and there is no instant price — a Ziyarat journey is quoted after the list has been read.",
      ar: "وإرسال الطلب لا يؤكد حجزًا ولا يحجز مركبة. ولا يُحجز شيء ولا يُستوفى أي مبلغ عبر هذا الموقع، ولا يوجد سعر فوري — فرحلة الزيارة تُسعَّر بعد قراءة القائمة.",
    },
  },

  // --- FAQs -----------------------------------------------------------------------------

  faqHeading: { en: "Common questions", ar: "الأسئلة الشائعة" },

  faqs: [
    {
      question: { en: "Can I choose which places to visit?", ar: "هل أختار المواضع التي أزورها؟" },
      answer: {
        en: "Yes — the list is the starting point rather than something we hand you. The planner names eight places people ask for most, and anything you add in the enquiry is read the same way. If somewhere on your list is a place we cannot reach, we will say so rather than quietly drop it.",
        ar: "نعم — فالقائمة نقطة البداية لا شيء نسلّمه إليك. ويذكر المخطِّط ثمانية مواضع يطلبها الناس أكثر، وما تضيفه في الطلب يُقرأ بالطريقة نفسها. وإن كان في قائمتك موضع لا نستطيع بلوغه فسنقول ذلك بدل إسقاطه بصمت.",
      },
    },
    {
      question: { en: "Do you drive to Mina, Arafat or Muzdalifah?", ar: "هل تقودون إلى منى أو عرفات أو مزدلفة؟" },
      answer: {
        en: "No, in any season. We do not arrange transport into the Mashaer, and those places are not on the list on this page. What we cover is the driving between your hotel in Makkah and the places you have chosen outside them.",
        ar: "لا، في أي موسم. فلا نرتّب النقل إلى المشاعر، وتلك المواضع ليست في القائمة في هذه الصفحة. وما نغطيه هو القيادة بين فندقك في مكة والمواضع التي اخترتها خارجها.",
      },
    },
    {
      question: { en: "Will the car take us up Jabal al-Nour or Jabal Thawr?", ar: "هل تصعد بنا السيارة جبل النور أو جبل ثور؟" },
      answer: {
        en: "No — and this is the thing most worth knowing before you book. Both are mountains with a climb on foot at the end, and published guidance puts the Thawr climb well over an hour and recommends it only for those who are fit for it. The car reaches the area; the climb is yours. Many visitors look from the foot instead, and the Hira Cultural District at the base of Jabal al-Nour is on level ground.",
        ar: "لا — وهذا أجدر ما يُعرف قبل الحجز. فكلاهما جبل ينتهي بصعود على الأقدام، وتذكر الإرشادات المنشورة أن صعود ثور يتجاوز الساعة بكثير ولا يُنصح به إلا لمن هو قادر عليه. فالسيارة تبلغ المنطقة، والصعود عليك. وكثير من الزوار ينظرون من السفح بدلًا من ذلك، وحي حراء الثقافي عند سفح جبل النور على أرض مستوية.",
      },
    },
    {
      question: {
        en: "Can we visit the Kiswah complex?",
        ar: "هل يمكننا زيارة مجمع كسوة الكعبة؟",
      },
      answer: {
        en: "We will drive you there, and it is on the list above. The visit itself is the complex’s to arrange rather than ours — entry is generally by appointment, and the visiting hours published in different places do not agree, so we will not print one here. Put it in your enquiry and the pickup and the arrangement are confirmed with your quotation and again at booking.",
        ar: "سنوصلك إليه، وهو مدرج في القائمة أعلاه. أما الزيارة نفسها فيرتّبها المجمع لا نحن — والدخول عادةً بموعد مسبق، وساعات الزيارة المنشورة في مواضع مختلفة لا تتفق، فلن نطبع واحدة هنا. أدرجه في طلبك ويُؤكَّد الاستقبال والترتيب مع عرض سعرك ثم عند الحجز.",
      },
    },
    {
      question: { en: "Do you provide a guide?", ar: "هل توفّرون مرشدًا؟" },
      answer: {
        en: "No. We arrange road transport and the driver is a driver — we are not a religious authority, a guide, a tour operator or a pilgrimage organiser. Questions about what a place means, what to recite or where to pray belong to a scholar or your group organiser.",
        ar: "لا. نحن نرتّب النقل البري والسائق سائق — ولسنا مرجعًا دينيًا ولا مرشدًا ولا منظّم جولات ولا منظّم حج وعمرة. وأسئلة دلالة الموضع وما يُقال وأين يُصلّى مردّها إلى عالم أو إلى منظّم مجموعتك.",
      },
    },
    {
      question: { en: "How long will the journey take?", ar: "كم تستغرق الرحلة؟" },
      answer: {
        en: "We do not publish a figure, because it would be wrong for most people reading it. How long a list takes depends on which places are on it, the traffic that day and how long your party wants at each — and at two of them, whether anyone climbs. Send the list and the timing is set out in the quotation.",
        ar: "لا ننشر رقمًا، لأنه سيكون خاطئًا لمعظم من يقرؤه. فالمدة تعتمد على المواضع التي في القائمة وحركة ذلك اليوم والوقت الذي تريده مجموعتك عند كل موضع — وعند اثنين منها، على صعود أحدكم من عدمه. أرسل القائمة ويُبيَّن التوقيت في عرض السعر.",
      },
    },
    {
      question: { en: "Can you collect us from our hotel?", ar: "هل تستقبلوننا من فندقنا؟" },
      answer: {
        en: "Yes, and that is how most of these journeys start. Send the hotel name with its address rather than the brand alone — several Makkah hotels share a name. Where a car may wait is set by the property, so the pickup point is confirmed in writing for your booking rather than promised here.",
        ar: "نعم، وهكذا تبدأ معظم هذه الرحلات. أرسل اسم الفندق مع عنوانه لا العلامة التجارية وحدها — فعدة فنادق في مكة تتشارك الاسم. وموضع انتظار السيارة تحدده المنشأة، فتُؤكَّد نقطة الاستقبال كتابةً لحجزك لا تُوعَد هنا.",
      },
    },
    {
      question: { en: "We are a family of twelve. One vehicle?", ar: "نحن عائلة من اثني عشر. مركبة واحدة؟" },
      answer: {
        en: "Probably, since fourteen is the most we seat in one vehicle — though a Ziyarat day is light on luggage, so twelve usually fits. If it does not, or if the party would rather spread out, more than one vehicle can be coordinated subject to availability on your date. Tell us the count including children, and mention anyone who would struggle with a high step.",
        ar: "على الأرجح، فأربعة عشر أقصى ما نُجلسه في مركبة واحدة — ويوم الزيارة خفيف الأمتعة، فاثنا عشر يتّسعون عادةً. وإن لم يتّسعوا أو فضّلت المجموعة التوسّع، أمكن تنسيق أكثر من مركبة رهنًا بالتوافر في تاريخكم. أخبرنا بالعدد ومنه الأطفال، واذكر من يصعب عليه صعود عتبة مرتفعة.",
      },
    },
    {
      question: { en: "Can we add the road to Madinah afterwards?", ar: "هل نضيف الطريق إلى المدينة بعدها؟" },
      answer: {
        en: "Yes, and it is worth sending in the same enquiry rather than separately — the two are quoted together and the timing can be planned around each other. That road has a page of its own covering both directions, including an honest comparison with the Haramain train.",
        ar: "نعم، ويستحق الإرسال في الطلب نفسه لا منفصلًا — فيُسعَّران معًا ويمكن تخطيط التوقيت لكلٍّ حول الآخر. ولذلك الطريق صفحته التي تغطي الاتجاهين، ومعها مقارنة صادقة بقطار الحرمين.",
      },
    },
    {
      question: { en: "Is this a tour with other people?", ar: "هل هذه جولة مع آخرين؟" },
      answer: {
        en: "No. The whole vehicle is reserved for your party and nobody else is collected along the way. You set the list, you set the pace, and you are not waiting for strangers at each stop. It is a transport arrangement, not a group tour.",
        ar: "لا. فالمركبة كاملة محجوزة لمجموعتك ولا يُقلّ معكم أحد في الطريق. أنت تحدد القائمة وأنت تحدد الوتيرة، ولا تنتظر غرباء عند كل محطة. وهو ترتيب نقل لا جولة جماعية.",
      },
    },
    {
      question: { en: "How do I get a price?", ar: "كيف أحصل على سعر؟" },
      answer: {
        en: "Send your list, the pickup address, the date and how many of you, and we reply with a written quotation. There is no instant price on this site and nothing is charged here — the journey is priced after the list has been read, because the list is what determines the day.",
        ar: "أرسل قائمتك وعنوان الانطلاق والتاريخ وعددكم، فنرد بعرض سعر مكتوب. ولا يوجد سعر فوري في هذا الموقع ولا يُستوفى فيه شيء — فالرحلة تُسعَّر بعد قراءة القائمة، لأن القائمة هي ما يحدد اليوم.",
      },
    },
  ] as ClusterFaq[],

  // --- CTA and related -------------------------------------------------------------------

  cta: {
    eyebrow: { en: "Your places, your pace", ar: "مواضعك ووتيرتك" },
    heading: { en: "Send your selected places", ar: "أرسل المواضع التي اخترتها" },
    body: {
      en: "The list, where we collect you, the date and how many are travelling. We check the journey and reply with a written quotation.",
      ar: "القائمة، ومن أين نستقبلك، والتاريخ، وعدد المسافرين. نتحقق من الرحلة ونرد بعرض سعر مكتوب.",
    },
    button: { en: "Request a private Ziyarat quote", ar: "اطلب عرض سعر زيارة خاصة" },
  } as ClusterCta,

  whatsappMessage: {
    en: "Hello — I would like a quotation for a private Ziyarat journey in Makkah.",
    ar: "السلام عليكم — أرغب في عرض سعر لرحلة زيارة خاصة في مكة المكرمة.",
  },
  whatsappCta: { en: "Ask on WhatsApp", ar: "اسأل عبر واتساب" },

  relatedHeading: { en: "Related pages", ar: "صفحات ذات صلة" },

  related: [
    {
      routeKey: "ziyaratTransfers",
      label: { en: "Ziyarat transfers across Saudi Arabia", ar: "النقل للزيارة في أنحاء السعودية" },
      note: {
        en: "The service page above this one, covering Madinah and elsewhere as well as Makkah.",
        ar: "الصفحة الأعم فوق هذه، وتغطي المدينة المنورة وغيرها إلى جانب مكة.",
      },
    },
    {
      routeKey: "makkah",
      label: { en: "Private transfers in Makkah", ar: "توصيل خاص في مكة المكرمة" },
      note: {
        en: "The city page: hotel access near the Haram, the Haramain station, and journeys on from the city.",
        ar: "صفحة المدينة: الدخول إلى الفنادق قرب الحرم، ومحطة قطار الحرمين، والسفر من المدينة.",
      },
    },
    {
      routeKey: "jeddahToMakkah",
      label: { en: "Jeddah to Makkah", ar: "من جدة إلى مكة" },
      note: {
        en: "The arrival leg: the 80–100 km road from King Abdulaziz airport or the city, and the entry rules in full.",
        ar: "رحلة الوصول: طريق 80–100 كم من مطار الملك عبدالعزيز أو من المدينة، وشروط الدخول كاملة.",
      },
    },
    {
      routeKey: "makkahToMadinah",
      label: { en: "Makkah to Madinah", ar: "من مكة إلى المدينة" },
      note: {
        en: "If the Ziyarat day is followed by the road north — both directions, with the train compared honestly.",
        ar: "إن تلا يومَ الزيارة الطريقُ شمالًا — في الاتجاهين، مع مقارنة صادقة بالقطار.",
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
    {
      routeKey: "hotelTransfers",
      label: { en: "Hotel transfers", ar: "النقل من الفنادق" },
      note: {
        en: "Where these journeys begin and end: what we need to collect you, and who decides where the car waits.",
        ar: "حيث تبدأ هذه الرحلات وتنتهي: ما نحتاجه لاستقبالك، ومن يحدد أين تنتظر السيارة.",
      },
    },
  ] as RelatedLink[],
};
