import type { Bilingual } from "@/lib/i18n/config";
import type {
  ClusterCta,
  ClusterFaq,
  RelatedLink,
} from "@/lib/content/riyadh/types";
import type { RouteKey } from "@/lib/i18n/routes";
import type { SiteImageKey } from "@/lib/site-images";

/**
 * City-to-city private transfers — the service page above the route pages.
 *
 * **Concept: two ends of one line.** An intercity enquiry is two facts and
 * nothing else — where you start and where you need to be. So the page opens
 * on exactly that question and answers it interactively, then organises
 * everything below it by departure city, which is how people actually look:
 * nobody searches "Riyadh–Jeddah corridor", they think "I'm in Riyadh and I
 * need to get to Jeddah".
 *
 * **It restates no distances and no driving times.** Those belong to the
 * twelve route pages and are linked, never copied — the fastest way to make
 * this page compete with the pages it exists to feed would be to repeat
 * their figures. The board carries city names and nothing numeric.
 *
 * ## What is verified, and what is not
 *
 * Every route named here was checked against the route registry **and**
 * against the existence of its page directory before being listed. All
 * twelve exist. Nothing else is named as an available route.
 *
 * `pairs` deliberately covers only those twelve. The picker matches a pair in
 * either direction, because a page written Riyadh → Jeddah is the right
 * reading for someone travelling the other way, and several of those pages
 * say so themselves — `riyadh/jeddah.ts` and `riyadh/dammam.ts` both describe
 * the return as its own quoted journey, and `makkah-region/madinah.ts` is
 * written for both directions outright. For any other pair the picker says
 * the journey has to be checked. It never says it is available.
 *
 * `cities` is longer than the route list on purpose. Offering a city as an
 * endpoint is not a claim that we run it: choosing an unlisted pair produces
 * the "send it and we will check" answer, which is the approved wording and
 * the honest one.
 *
 * **Vehicles** are `lib/content/vehicles.ts` verbatim — up to 3, 4, 7 and 14.
 * Fourteen is the confirmed single-vehicle ceiling; beyond it the page says
 * more than one vehicle is coordinated, with no total ceiling, no fleet size,
 * no ownership and no amenity claimed.
 *
 * **No prices, no durations, no availability guarantees, and no invented
 * journey detail** — no fuel stops, no rest stops, no road conditions, no
 * "scenic" anything. That material would be a road-trip guide, which is the
 * one thing this page is not.
 *
 * `imageKey` is `svc-intercity`, an open Saudi highway between cities, used
 * as the hero; `coverage` carries the board. Neither shows a vehicle, because
 * the project holds no vehicle photography and a stock car beside a service
 * claim would imply a fleet nobody has confirmed.
 */

/** A city offered as an endpoint in the picker. */
export type CityOption = { id: string; en: string; ar: string };

/** A city pair that has a published route page. */
export type RoutePair = { cities: [string, string]; routeKey: RouteKey };

/** One departure city on the board, with the journeys that have pages. */
export type DepartureGroup = {
  city: Bilingual<string>;
  note: Bilingual<string>;
  journeys: { to: Bilingual<string>; routeKey: RouteKey }[];
};

export const cityToCity = {
  routeKey: "cityToCity" as RouteKey,
  imageKey: "svc-intercity" as SiteImageKey,
  boardImageKey: "coverage" as SiteImageKey,

  seo: {
    title: {
      en: "City to City Transfers Saudi Arabia | Private Car",
      ar: "النقل بين المدن في السعودية | سيارة خاصة",
    },
    description: {
      en: "Private car and driver between Saudi cities — Riyadh, Jeddah, Makkah, Madinah, Dammam and beyond. One vehicle reserved for your party, door to door. Send both ends of the journey for a written quotation.",
      ar: "سيارة خاصة مع سائق بين مدن السعودية — الرياض وجدة ومكة والمدينة والدمام وغيرها. مركبة محجوزة لمجموعتك وحدها، من الباب إلى الباب. أرسل طرفَي الرحلة واحصل على عرض سعر مكتوب.",
    },
  },

  crumbLabel: { en: "City-to-city transfers", ar: "النقل بين المدن" },

  // --- Hero -----------------------------------------------------------------

  eyebrow: { en: "Private transfers between Saudi cities", ar: "نقل خاص بين المدن السعودية" },
  title: {
    en: "Two cities, one car, no changes in between",
    ar: "مدينتان وسيارة واحدة بلا تبديل بينهما",
  },
  standfirst: {
    en: "An intercity enquiry comes down to two facts: where you start, and where you need to be. Everything else — the vehicle, the timing, the luggage — follows from those. Name both ends below and we will tell you what we already cover and what we need to check.",
    ar: "ينحصر طلب النقل بين المدن في حقيقتين: من أين تبدأ، وإلى أين تريد الوصول. وما عدا ذلك — المركبة والتوقيت والأمتعة — يتبعهما. حدّد الطرفين أدناه ونخبرك بما نغطيه أصلًا وما نحتاج إلى التحقق منه.",
  },

  primaryCta: { en: "Request a quotation", ar: "اطلب عرض سعر" },
  secondaryCta: { en: "Find your journey", ar: "اعثر على رحلتك" },

  // --- The picker -------------------------------------------------------------

  picker: {
    heading: { en: "Where are you travelling?", ar: "إلى أين تسافر؟" },
    lead: {
      en: "Pick both ends. If we have a page for that journey you will get it, and either way the quotation form opens already knowing where you are going.",
      ar: "اختر الطرفين. فإن كانت لدينا صفحة لتلك الرحلة ظهرت لك، وفي الحالين يُفتح نموذج عرض السعر وهو يعرف وجهتك سلفًا.",
    },
    cities: [
      { id: "riyadh", en: "Riyadh", ar: "الرياض" },
      { id: "jeddah", en: "Jeddah", ar: "جدة" },
      { id: "makkah", en: "Makkah", ar: "مكة المكرمة" },
      { id: "madinah", en: "Madinah", ar: "المدينة المنورة" },
      { id: "dammam", en: "Dammam", ar: "الدمام" },
      { id: "al-khobar", en: "Al Khobar", ar: "الخبر" },
      { id: "taif", en: "Taif", ar: "الطائف" },
      { id: "buraydah", en: "Buraydah", ar: "بريدة" },
      { id: "unaizah", en: "Unaizah", ar: "عنيزة" },
      { id: "hail", en: "Hail", ar: "حائل" },
      { id: "alula", en: "AlUla", ar: "العُلا" },
      { id: "yanbu", en: "Yanbu", ar: "ينبع" },
      { id: "rabigh", en: "Rabigh", ar: "رابغ" },
      { id: "al-ahsa", en: "Al Ahsa", ar: "الأحساء" },
      { id: "jubail", en: "Jubail", ar: "الجبيل" },
      { id: "tabuk", en: "Tabuk", ar: "تبوك" },
      { id: "abha", en: "Abha", ar: "أبها" },
      { id: "jazan", en: "Jazan", ar: "جازان" },
      { id: "najran", en: "Najran", ar: "نجران" },
      { id: "al-kharj", en: "Al Kharj", ar: "الخرج" },
    ] as CityOption[],
    /** Only pairs with a published page. Verified against the route registry. */
    pairs: [
      { cities: ["riyadh", "jeddah"], routeKey: "riyadhToJeddah" },
      { cities: ["riyadh", "makkah"], routeKey: "riyadhToMakkah" },
      { cities: ["riyadh", "madinah"], routeKey: "riyadhToMadinah" },
      { cities: ["riyadh", "dammam"], routeKey: "riyadhToDammam" },
      { cities: ["riyadh", "al-khobar"], routeKey: "riyadhToAlKhobar" },
      { cities: ["riyadh", "buraydah"], routeKey: "riyadhToBuraydah" },
      { cities: ["riyadh", "taif"], routeKey: "riyadhToTaif" },
      { cities: ["riyadh", "hail"], routeKey: "riyadhToHail" },
      { cities: ["riyadh", "alula"], routeKey: "riyadhToAlUla" },
      { cities: ["jeddah", "makkah"], routeKey: "jeddahToMakkah" },
      { cities: ["jeddah", "madinah"], routeKey: "jeddahToMadinah" },
      { cities: ["makkah", "madinah"], routeKey: "makkahToMadinah" },
    ] as RoutePair[],
    copy: {
      fromLabel: { en: "Travelling from", ar: "السفر من" },
      toLabel: { en: "Travelling to", ar: "السفر إلى" },
      sameCity: {
        en: "Choose two different cities. For journeys inside one city, the city's own page covers hotel and local transfers.",
        ar: "اختر مدينتين مختلفتين. أما التنقل داخل المدينة الواحدة فتغطيه صفحة المدينة نفسها للفنادق والتنقلات المحلية.",
      },
      hasPageLabel: { en: "We have a page for this one", ar: "لدينا صفحة لهذه الرحلة" },
      hasPageBody: {
        en: "The route page sets out the road, the distance and a realistic driving time, and says honestly where the train or a flight beats the car. Quote it from here, or read it first.",
        ar: "تبيّن صفحة المسار الطريق والمسافة وزمن قيادة واقعيًا، وتذكر بصدق متى يتفوق القطار أو الطائرة على السيارة. سعّرها من هنا، أو اقرأها أولًا.",
      },
      noPageLabel: { en: "This one we check for you", ar: "هذه نتحقق منها لك" },
      noPageBody: {
        en: "We have no page written for this pair yet, which is not the same as not covering it. Send the journey with your dates and we will check the arrangements and come back with a quotation — or tell you plainly if we cannot.",
        ar: "لم نكتب صفحة لهذا الزوج بعد، وهذا لا يعني أننا لا نغطيه. أرسل الرحلة مع تواريخك فنتحقق من الترتيبات ونعود بعرض سعر — أو نخبرك بصراحة إن كنا لا نستطيع.",
      },
      quoteCta: { en: "Quote this journey", ar: "سعّر هذه الرحلة" },
      routeCta: { en: "Read the route page", ar: "اقرأ صفحة المسار" },
    },
  },

  // --- The board ---------------------------------------------------------------

  board: {
    heading: { en: "Journeys with a page of their own", ar: "رحلات لها صفحاتها" },
    lead: {
      en: "Twelve so far, grouped by where you set off. Each one has the road, the distance and the driving time written out — none of which is repeated here, because that is what those pages are for.",
      ar: "اثنتا عشرة حتى الآن، مرتّبة بحسب نقطة الانطلاق. ولكل منها طريقها ومسافتها وزمن قيادتها مكتوبة — ولا يتكرر شيء منها هنا، فلهذا وُجدت تلك الصفحات.",
    },
    groups: [
      {
        city: { en: "From Riyadh", ar: "من الرياض" },
        note: {
          en: "The capital reaches further than anywhere else on this site — the Red Sea coast, the Gulf, the holy cities and the north-west.",
          ar: "تصل العاصمة أبعد من أي نقطة أخرى في هذا الموقع — ساحل البحر الأحمر والخليج والمدينتين المقدستين والشمال الغربي.",
        },
        journeys: [
          { to: { en: "Jeddah", ar: "جدة" }, routeKey: "riyadhToJeddah" },
          { to: { en: "Makkah", ar: "مكة المكرمة" }, routeKey: "riyadhToMakkah" },
          { to: { en: "Madinah", ar: "المدينة المنورة" }, routeKey: "riyadhToMadinah" },
          { to: { en: "Dammam", ar: "الدمام" }, routeKey: "riyadhToDammam" },
          { to: { en: "Al Khobar", ar: "الخبر" }, routeKey: "riyadhToAlKhobar" },
          { to: { en: "Buraydah", ar: "بريدة" }, routeKey: "riyadhToBuraydah" },
          { to: { en: "Taif", ar: "الطائف" }, routeKey: "riyadhToTaif" },
          { to: { en: "Hail", ar: "حائل" }, routeKey: "riyadhToHail" },
          { to: { en: "AlUla", ar: "العُلا" }, routeKey: "riyadhToAlUla" },
        ],
      },
      {
        city: { en: "From Jeddah", ar: "من جدة" },
        note: {
          en: "The doorway for most arrivals into the west, and the start of the two journeys almost everyone landing there is making.",
          ar: "بوابة معظم القادمين إلى الغرب، وبداية الرحلتين اللتين يقوم بهما كل واصل إليها تقريبًا.",
        },
        journeys: [
          { to: { en: "Makkah", ar: "مكة المكرمة" }, routeKey: "jeddahToMakkah" },
          { to: { en: "Madinah", ar: "المدينة المنورة" }, routeKey: "jeddahToMadinah" },
        ],
      },
      {
        city: { en: "Between the holy cities", ar: "بين المدينتين المقدستين" },
        note: {
          en: "The most requested intercity journey on the site, written for both directions on one page — including an honest account of when the Haramain train is the better answer.",
          ar: "أكثر الرحلات بين المدن طلبًا في الموقع، مكتوبة للاتجاهين في صفحة واحدة — ومعها بيان صادق لمتى يكون قطار الحرمين هو الأفضل.",
        },
        journeys: [
          { to: { en: "Makkah ↔ Madinah", ar: "مكة ↔ المدينة" }, routeKey: "makkahToMadinah" },
        ],
      },
    ] as DepartureGroup[],
    elsewhere: {
      heading: { en: "Travelling between two cities not listed here?", ar: "تسافر بين مدينتين غير مدرجتين هنا؟" },
      body: {
        en: "Send us your pickup city, your destination and your travel details. We can check the arrangements and provide a quotation. A journey without a page is not a journey we have ruled out — it is one we have not written up yet, and the only way to know is to ask.",
        ar: "أرسل إلينا مدينة الانطلاق والوجهة وتفاصيل سفرك. فنتحقق من الترتيبات ونقدّم عرض سعر. والرحلة التي لا صفحة لها ليست رحلة استبعدناها — بل رحلة لم نكتبها بعد، والسبيل الوحيد لمعرفة ذلك هو السؤال.",
      },
    },
  },

  // --- Journeys that are not city-to-city in a straight line ----------------------

  shapes: {
    heading: { en: "Not every intercity journey is city to city", ar: "ليست كل رحلة بين المدن من مدينة إلى مدينة" },
    lead: {
      en: "Most enquiries have an airport or a hotel at one end rather than a city centre, and that changes what we need from you more than the distance does.",
      ar: "معظم الطلبات يكون في أحد طرفيها مطار أو فندق لا وسط مدينة، وهذا يغيّر ما نحتاجه منك أكثر مما تغيّره المسافة.",
    },
    items: [
      {
        title: { en: "Airport in one city, hotel in another", ar: "مطار في مدينة وفندق في أخرى" },
        body: {
          en: "The commonest shape of all. Send the flight number with it — the pickup then follows the aircraft rather than a clock time, which matters more on a long drive than on a short one.",
          ar: "أكثر الأشكال شيوعًا. أرسل رقم الرحلة معه — فيتبع الاستقبال الطائرة لا توقيت الساعة، وهذا أهم في رحلة طويلة منه في قصيرة.",
        },
      },
      {
        title: { en: "Hotel to hotel", ar: "من فندق إلى فندق" },
        body: {
          en: "Give both hotel names with their addresses, not the brand alone — several share a name across different cities, and that is a long way to go wrong.",
          ar: "اذكر اسمي الفندقين وعنوانيهما لا العلامة التجارية وحدها — فعدة فنادق تتشارك الاسم في مدن مختلفة، وهذا خطأ تُقطع بسببه مسافة طويلة.",
        },
      },
      {
        title: { en: "A home or office address", ar: "عنوان منزل أو مكتب" },
        body: {
          en: "Fine at either end. A full address, and the entrance if the building has more than one.",
          ar: "مقبول في أي من الطرفين. عنوان كامل، والمدخل إن كان للمبنى أكثر من مدخل.",
        },
      },
      {
        title: { en: "Both directions on one trip", ar: "الاتجاهان في رحلة واحدة" },
        body: {
          en: "Ask for the return in the same enquiry rather than weeks later. The same vehicle and driver can be planned around a known return, which is harder once the outbound is already booked.",
          ar: "اطلب رحلة العودة في الطلب نفسه لا بعد أسابيع. فالمركبة والسائق نفسهما يمكن تخطيطهما حول عودة معلومة، وهو أصعب بعد تثبيت رحلة الذهاب.",
        },
      },
    ],
  },

  // --- Vehicles ---------------------------------------------------------------------

  vehicles: {
    heading: { en: "Which vehicle for a long drive", ar: "أي مركبة لرحلة طويلة" },
    lead: {
      en: "On a run across the city an awkward fit is twenty minutes of discomfort. On a six-hour drive it is the whole day, so the vehicle is worth getting right — and it is the luggage, not the headcount, that usually decides it.",
      ar: "في جولة داخل المدينة يكون الاختيار غير المريح عشرين دقيقة من الضيق. أما في رحلة من ست ساعات فهو اليوم كله، فيستحق اختيار المركبة عناية — والأمتعة لا العدد هي التي تحسمه عادةً.",
    },
    slugs: ["sedan", "suv", "van", "minibus"],
    groupNote: {
      en: "Fourteen passengers is the most we seat in a single vehicle. Above that, or where the bags will not fit whatever the headcount, we coordinate more than one vehicle so the party travels together and arrives together. Tell us the numbers and the luggage, and the quotation sets out what is being sent.",
      ar: "وأربعة عشر راكبًا أقصى ما نُجلسه في مركبة واحدة. وفوق ذلك، أو حين لا تتسع الحقائب مهما كان العدد، ننسّق أكثر من مركبة ليسافر الجميع معًا ويصلوا معًا. أخبرنا بالأعداد والأمتعة، ويبيّن عرض السعر ما سيُرسَل.",
    },
    footnote: {
      en: "Models and makes vary by availability; the class is what is confirmed in your quotation.",
      ar: "وتتفاوت الموديلات والطرز بحسب التوافر؛ والفئة هي ما يُؤكَّد في عرض سعرك.",
    },
  },

  // --- What to send + process -------------------------------------------------------

  sending: {
    heading: { en: "What an intercity quotation needs", ar: "ما يحتاجه عرض سعر بين المدن" },
    lead: {
      en: "Send these and the first quotation is usually the final one.",
      ar: "أرسل هذه فيكون عرض السعر الأول هو النهائي عادةً.",
    },
    items: [
      { en: "The pickup city and a full address in it.", ar: "مدينة الانطلاق وعنوان كامل فيها." },
      { en: "The destination city and a full address in it.", ar: "مدينة الوجهة وعنوان كامل فيها." },
      { en: "The travel date, and the pickup time you want.", ar: "تاريخ السفر، وموعد الانطلاق الذي تريده." },
      { en: "How many passengers, counting children.", ar: "عدد الركاب، مع احتساب الأطفال." },
      { en: "How many suitcases you are actually carrying.", ar: "عدد الحقائب التي تحملها فعلًا." },
      { en: "A vehicle class if you have a preference — and if not, we suggest one.", ar: "فئة مركبة إن كان لديك تفضيل — وإن لم يكن، نقترح واحدة." },
      { en: "A flight number if either end is an airport, and whether you want the return.", ar: "ورقم الرحلة إن كان أحد الطرفين مطارًا، وهل تريد رحلة العودة." },
    ],
  },

  process: {
    heading: { en: "What happens next", ar: "ماذا يحدث بعد ذلك" },
    steps: [
      {
        title: { en: "You send the journey", ar: "ترسل الرحلة" },
        body: { en: "No payment details and no account to create.", ar: "بلا بيانات دفع وبلا حساب تنشئه." },
      },
      {
        title: { en: "We check it", ar: "نتحقق منها" },
        body: {
          en: "The route, availability for your date, and the vehicle the party and the luggage need.",
          ar: "المسار، والتوافر في تاريخك، والمركبة التي تحتاجها المجموعة والأمتعة.",
        },
      },
      {
        title: { en: "You get a written quotation", ar: "يصلك عرض سعر مكتوب" },
        body: {
          en: "With the vehicle class and the timing set out. You read it and decide.",
          ar: "مبيّنًا فئة المركبة والتوقيت. تقرؤه ثم تقرر.",
        },
      },
      {
        title: { en: "The booking is confirmed separately", ar: "ويُؤكَّد الحجز منفصلًا" },
        body: {
          en: "You accept, and the journey is confirmed only when we send a booking confirmation saying so.",
          ar: "تقبل العرض، ولا تتأكد الرحلة إلا عندما نرسل رسالة تأكيد حجز تنص على ذلك.",
        },
      },
    ],
    note: {
      en: "Sending an enquiry does not confirm a booking and does not hold a vehicle for your date. Nothing is reserved and no payment is taken on this website, and there is no instant price — an intercity journey is quoted after it has been checked, not before.",
      ar: "وإرسال الطلب لا يؤكد حجزًا ولا يحجز مركبة لتاريخك. ولا يُحجز شيء ولا يُستوفى أي مبلغ عبر هذا الموقع، ولا يوجد سعر فوري — فالرحلة بين المدن تُسعَّر بعد التحقق منها لا قبله.",
    },
  },

  // --- FAQs ---------------------------------------------------------------------------

  faqHeading: { en: "Common questions", ar: "الأسئلة الشائعة" },

  faqs: [
    {
      question: { en: "Do you cover a route that has no page here?", ar: "هل تغطون مسارًا لا صفحة له هنا؟" },
      answer: {
        en: "Possibly — a missing page means we have not written that journey up, not that we have ruled it out. Twelve journeys have their own page because they are the ones asked for most. Send your pickup city, your destination and your dates, and we will check the arrangements and come back with a quotation, or tell you plainly if we cannot cover it.",
        ar: "ربما — فغياب الصفحة يعني أننا لم نكتب تلك الرحلة، لا أننا استبعدناها. ولاثنتي عشرة رحلة صفحاتها لأنها الأكثر طلبًا. أرسل مدينة الانطلاق والوجهة وتواريخك، فنتحقق من الترتيبات ونعود بعرض سعر، أو نخبرك بصراحة إن كنا لا نستطيع تغطيتها.",
      },
    },
    {
      question: { en: "Can I get a price straight away?", ar: "هل أحصل على سعر فورًا؟" },
      answer: {
        en: "No, and we would rather explain why than show you a number that changes later. An intercity price depends on the exact addresses, the date, the vehicle the party and the luggage need, and whether you want the return. We check those first and then send a written quotation. There is no instant booking on this site and no payment is taken here.",
        ar: "لا، ونفضّل شرح السبب على عرض رقم يتغير لاحقًا. فسعر الرحلة بين المدن يعتمد على العنوانين بدقة والتاريخ والمركبة التي تحتاجها المجموعة والأمتعة، وهل تريد العودة. نتحقق من ذلك أولًا ثم نرسل عرض سعر مكتوب. ولا يوجد حجز فوري في هذا الموقع ولا يُستوفى فيه أي مبلغ.",
      },
    },
    {
      question: { en: "Is the return journey booked separately?", ar: "هل تُحجز رحلة العودة منفصلة؟" },
      answer: {
        en: "It is quoted as its own journey, but ask for both directions in one enquiry rather than weeks apart. The same vehicle and driver can be planned around a known return, which gets harder once the outbound is already fixed. Several of our route pages say the same thing from the other end.",
        ar: "تُسعَّر بوصفها رحلة قائمة بذاتها، لكن اطلب الاتجاهين في طلب واحد لا بفارق أسابيع. فالمركبة والسائق نفسهما يمكن تخطيطهما حول عودة معلومة، وهو ما يصعب بعد تثبيت رحلة الذهاب. وعدة من صفحات مساراتنا تقول الشيء نفسه من الطرف الآخر.",
      },
    },
    {
      question: { en: "We are eleven people with a lot of luggage.", ar: "نحن أحد عشر شخصًا بأمتعة كثيرة." },
      answer: {
        en: "Fourteen passengers is the most we seat in a single vehicle, so eleven may fit one depending on the bags — and on a long drive the bags are usually what decides it. If they will not fit, we coordinate a second vehicle so the party travels together and arrives together. Send the passenger count including children and the number of suitcases, and the quotation sets out what is being sent.",
        ar: "أربعة عشر راكبًا أقصى ما نُجلسه في مركبة واحدة، فقد يتسع أحد عشر في واحدة بحسب الحقائب — وفي رحلة طويلة تكون الحقائب هي الحاسمة عادةً. وإن لم تتسع، ننسّق مركبة ثانية لتسافر المجموعة معًا وتصل معًا. أرسل عدد الركاب ومنهم الأطفال وعدد الحقائب، ويبيّن عرض السعر ما سيُرسَل.",
      },
    },
    {
      question: { en: "Can you collect from an airport in one city and drive to another?", ar: "هل تستقبلون من مطار في مدينة وتنقلون إلى أخرى؟" },
      answer: {
        en: "Yes, and it is one of the commonest intercity shapes — Jeddah airport to Makkah, Madinah airport onward, Dammam airport across the Eastern Province. Send the flight number with the enquiry so the pickup follows the aircraft rather than a clock time. Our airport transfers page covers how that coordination works.",
        ar: "نعم، وهو من أكثر أشكال الرحلات بين المدن شيوعًا — من مطار جدة إلى مكة، ومن مطار المدينة إلى ما بعدها، ومن مطار الدمام عبر المنطقة الشرقية. أرسل رقم الرحلة مع الطلب ليتبع الاستقبال الطائرة لا توقيت الساعة. وصفحة النقل من المطارات لدينا تشرح كيف يجري ذلك التنسيق.",
      },
    },
    {
      question: { en: "Is a private car better than the train or a flight?", ar: "هل السيارة الخاصة أفضل من القطار أو الطائرة؟" },
      answer: {
        en: "Not always, and our route pages say so where it is true — the Makkah–Madinah page sets the car against the Haramain train openly, and the Riyadh routes do the same against a domestic flight. The car tends to win for families, for real luggage, for door-to-door travel and for an address away from a station. We sell no rail or air tickets, so there is nothing in it for us either way.",
        ar: "ليس دائمًا، وصفحات مساراتنا تقول ذلك حيث يصح — فصفحة مكة والمدينة تضع السيارة في مواجهة قطار الحرمين صراحةً، ومسارات الرياض تفعل المثل مع الرحلات الداخلية. وتتفوق السيارة عادةً للعائلات وللأمتعة الحقيقية وللتنقل من الباب إلى الباب ولعنوان بعيد عن محطة. ونحن لا نبيع تذاكر قطار ولا طيران، فلا مصلحة لنا في أي الخيارين.",
      },
    },
  ] as ClusterFaq[],

  // --- CTA and related -----------------------------------------------------------------

  cta: {
    eyebrow: { en: "Both ends, one enquiry", ar: "الطرفان في طلب واحد" },
    heading: { en: "Tell us where you are going", ar: "أخبرنا إلى أين تتجه" },
    body: {
      en: "The two cities, the two addresses, the date and how many of you. We check the journey and reply with a written price.",
      ar: "المدينتان والعنوانان والتاريخ وعددكم. نتحقق من الرحلة ونرد بسعر مكتوب.",
    },
    button: { en: "Request a quotation", ar: "اطلب عرض سعر" },
  } as ClusterCta,

  relatedHeading: { en: "Related services", ar: "خدمات ذات صلة" },

  related: [
    {
      routeKey: "airportTransfers",
      label: { en: "Airport transfers", ar: "النقل من المطارات" },
      note: {
        en: "When one end of the journey is a terminal: how arrivals and departures differ, and what your flight number does.",
        ar: "حين يكون أحد طرفي الرحلة صالة مطار: كيف يختلف الوصول عن المغادرة، وما الذي يفعله رقم رحلتك.",
      },
    },
    {
      routeKey: "umrahTransfers",
      label: { en: "Umrah transfers", ar: "نقل العمرة" },
      note: {
        en: "Several intercity legs booked as one arrangement, for a pilgrimage trip rather than a single journey.",
        ar: "عدة مراحل بين المدن تُحجز ترتيبًا واحدًا، لرحلة عمرة لا لرحلة مفردة.",
      },
    },
    {
      routeKey: "riyadh",
      label: { en: "Private transfers in Riyadh", ar: "توصيل خاص في الرياض" },
      note: {
        en: "The capital hub: the airport, the stations, hotels and every route out of the city.",
        ar: "مركز العاصمة: المطار والمحطات والفنادق وكل مسار خارج المدينة.",
      },
    },
    {
      routeKey: "jeddah",
      label: { en: "Private transfers in Jeddah", ar: "توصيل خاص في جدة" },
      note: {
        en: "The western doorway: King Abdulaziz airport, the Haramain stations and the road to Makkah.",
        ar: "البوابة الغربية: مطار الملك عبدالعزيز ومحطتا الحرمين والطريق إلى مكة.",
      },
    },
    {
      routeKey: "saudiToBahrain",
      label: { en: "Saudi to Bahrain by road", ar: "من السعودية إلى البحرين برًّا" },
      note: {
        en: "An intercity journey that ends at a border: the King Fahd Causeway, on the Saudi side only.",
        ar: "رحلة بين المدن تنتهي عند حدود: جسر الملك فهد، في الجانب السعودي فقط.",
      },
    },
  ] as RelatedLink[],
};
