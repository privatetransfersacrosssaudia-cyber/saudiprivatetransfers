import type { BorderGuide, Source } from "./types";

/**
 * Saudi Arabia to Bahrain, by road over the King Fahd Causeway.
 *
 * The pilot for the border-crossing section, and the template for the rest.
 * Two things about it are deliberate and should survive into the other
 * country guides:
 *
 * 1. Every claim carries its own status. The causeway half of this guide is
 *    well sourced because kfca.sa publishes its rules in readable pages. The
 *    visa half largely is not, because the Bahraini portal puts its
 *    eligibility rules behind a JavaScript tool and the national portal
 *    refuses automated requests. Rather than filling that gap from memory or
 *    from blogs, the page says what is unknown and sends the reader to the
 *    tool that knows.
 *
 * 2. The guide used to say we did not cross the causeway, which matched the
 *    rest of the site at the time. The owner has since confirmed that we do:
 *    pickup anywhere in the Kingdom, across the border, on to an address in
 *    Bahrain. `serviceNotice` now says so while keeping the separation that
 *    actually matters — we arrange the driving; the authorities decide entry,
 *    and nothing on this page is a promise about a crossing.
 *
 * Verification pass: 16 November 2026. See docs/research/border/source-matrix.md.
 */

const CHECKED = "2026-11-16";

// --- Sources, declared once and shared ---------------------------------------

const kfcaServices: Source = {
  name: "King Fahd Causeway Authority — e-services",
  url: "https://kfca.sa/ar/eservices/",
  kind: "official",
  checked: CHECKED,
};

const kfcaTrucks: Source = {
  name: "King Fahd Causeway Authority — trucks",
  url: "https://kfca.sa/ar/trucks",
  kind: "official",
  checked: CHECKED,
};

const kfcaPackages: Source = {
  name: "King Fahd Causeway Authority — traveller packages",
  url: "https://kfca.sa/ar/travellerpackages",
  kind: "official",
  checked: CHECKED,
};

const kfcaFacilities: Source = {
  name: "King Fahd Causeway Authority — facilities",
  url: "https://kfca.sa/ar/facilities",
  kind: "official",
  checked: CHECKED,
};

const kfcaEjesr: Source = {
  name: "King Fahd Causeway Authority — E-JESR pass",
  url: "https://kfca.sa/EJesr",
  kind: "official",
  checked: CHECKED,
};

const bhEvisa: Source = {
  name: "Kingdom of Bahrain eVisa portal (NPRA)",
  url: "https://www.evisa.gov.bh/",
  kind: "official",
  checked: CHECKED,
};

const bhEvisaFaq: Source = {
  name: "Bahrain eVisa — frequently asked questions",
  url: "https://www.evisa.gov.bh/VisaBhr7En.html",
  kind: "official",
  checked: CHECKED,
};

const bhEvisaProcess: Source = {
  name: "Bahrain eVisa — process for obtaining a visa",
  url: "https://www.evisa.gov.bh/VisaBhr2En.html",
  kind: "official",
  checked: CHECKED,
};

const bhOnArrivalList: Source = {
  name: "Bahrain eVisa — countries eligible for visa on arrival",
  url: "https://www.evisa.gov.bh/list-of-onarrival-visa-country.html",
  kind: "official",
  checked: CHECKED,
};

// News reporting the 2026 toll change. Published dates matter here: this is
// the one figure on the page that is not officially confirmed.
const tollNews: Source[] = [
  {
    name: "Gulf Insider — causeway crossing fees to increase",
    url: "https://www.gulf-insider.com/king-fahd-causeway-crossing-fees-to-increase/",
    kind: "news",
    checked: CHECKED,
    published: "2026-02",
  },
  {
    name: "What's On Saudi Arabia — causeway crossing fees",
    url: "https://whatsonsaudiarabia.com/2026/02/king-fahd-causeway-crossing-fees/",
    kind: "news",
    checked: CHECKED,
    published: "2026-02",
  },
  {
    name: "Lexis Middle East — causeway toll fees to rise from 18 February",
    url: "https://www.lexismiddleeast.com/news/2026-02-02_43/en",
    kind: "news",
    checked: CHECKED,
    published: "2026-02-02",
  },
];

// --- The guide ----------------------------------------------------------------

export const bahrainGuide: BorderGuide = {
  routeKey: "saudiToBahrain",
  lastVerified: CHECKED,

  title: {
    en: "Saudi Arabia to Bahrain by road",
    ar: "من السعودية إلى البحرين برًّا",
  },
  metaTitle: {
    en: "Saudi Arabia to Bahrain by road: King Fahd Causeway guide",
    ar: "من السعودية إلى البحرين برًّا: دليل جسر الملك فهد",
  },
  metaDescription: {
    en: "What the official authorities actually publish about crossing the King Fahd Causeway: documents, insurance, visas and what is still unconfirmed.",
    ar: "ما تنشره الجهات الرسمية فعليًا عن عبور جسر الملك فهد: الوثائق والتأمين والتأشيرات وما لم يُؤكَّد بعد.",
  },

  standfirst: {
    en: "The King Fahd Causeway is the only road link between Saudi Arabia and Bahrain. This guide sets out what the Causeway Authority and Bahrain's own visa portal publish — and, just as carefully, what they do not. Where an answer could not be confirmed from an official source, it is marked as unverified rather than guessed at.",
    ar: "جسر الملك فهد هو الرابط البري الوحيد بين السعودية والبحرين. يعرض هذا الدليل ما تنشره المؤسسة العامة للجسر وبوابة التأشيرات البحرينية — وكذلك، وبالقدر نفسه من العناية، ما لا تنشره. وحين تعذّر تأكيد إجابة من مصدر رسمي، تُوسم بأنها غير مؤكَّدة بدل تخمينها.",
  },

  serviceNotice: {
    en: "What follows is travel information, gathered from official sources and marked where it could not be confirmed. We do arrange the journey itself — pickup anywhere in the Kingdom, across the causeway, on to an address in Bahrain — but none of that changes the rules below. Entry is decided by the authorities, not by us, and what you read here is for your planning rather than a promise about your crossing.",
    ar: "ما يلي معلومات للسفر، جُمعت من مصادر رسمية ووُسمت حيث تعذّر تأكيدها. ونحن نرتّب الرحلة نفسها — استقبال من أي مكان في المملكة، وعبورًا للجسر، ووصولًا إلى عنوان في البحرين — غير أن ذلك لا يغيّر شيئًا من الأنظمة أدناه. فالدخول تقرّره الجهات الرسمية لا نحن، وما تقرؤه هنا لتخطيطك لا وعدًا بشأن عبورك.",
  },

  sections: [
    {
      heading: {
        en: "Before anything else: two separate permissions",
        ar: "قبل كل شيء: إذنان منفصلان",
      },
      intro: {
        en: "The most expensive mistake on this route is assuming one document covers both ends of it. Leaving Saudi Arabia and entering Bahrain are decided by different authorities, on different grounds, and either can refuse you independently of the other.",
        ar: "أغلى خطأ في هذا المسار هو افتراض أن وثيقة واحدة تغطي طرفيه. فمغادرة السعودية ودخول البحرين تقرّرهما جهتان مختلفتان ولأسباب مختلفة، ويمكن لأي منهما أن ترفضك بمعزل عن الأخرى.",
      },
      claims: [
        {
          text: {
            en: "Holding a Bahraini visa does not guarantee you will be admitted to Bahrain. The portal states that entry remains at the discretion of an immigration officer and that all conditions must be met on arrival.",
            ar: "حيازة تأشيرة بحرينية لا تضمن السماح لك بدخول البحرين. تنص البوابة على أن الدخول يبقى خاضعًا لتقدير ضابط الجوازات، وأن جميع الشروط يجب أن تتحقق عند الوصول.",
          },
          status: "verified",
          sources: [bhEvisaFaq, bhEvisa],
        },
        {
          text: {
            en: "Whether a foreign resident of Saudi Arabia needs a Saudi exit and re-entry permit before leaving by road, and what happens at the Saudi checkpoint without one.",
            ar: "ما إذا كان المقيم الأجنبي في السعودية يحتاج إلى تأشيرة خروج وعودة قبل المغادرة برًّا، وما الذي يحدث عند النقطة السعودية بدونها.",
          },
          status: "unverified",
          sources: [],
          note: {
            en: "No accessible Saudi official source was found stating this rule, and it is not addressed anywhere on the Causeway Authority's site. Travel guidance repeats it widely, but that is not evidence. Confirm your own status through Absher or the Directorate General of Passports (Jawazat) before you drive.",
            ar: "لم يُعثر على مصدر سعودي رسمي متاح ينص على هذه القاعدة، ولا يتناولها موقع المؤسسة العامة للجسر. تكرّر أدلة السفر هذا الأمر كثيرًا، لكن ذلك ليس دليلًا. تحقق من وضعك عبر أبشر أو المديرية العامة للجوازات قبل القيادة.",
          },
        },
      ],
    },

    {
      heading: {
        en: "Bahraini visas: what the official portal does and does not say",
        ar: "التأشيرات البحرينية: ما تقوله البوابة الرسمية وما لا تقوله",
      },
      intro: {
        en: "Bahrain's eVisa portal publishes its process clearly and its rules sparsely. The procedural facts below are quoted from it. The eligibility rules — which nationality gets what, for how long, at what price — sit behind an interactive tool that cannot be read without running it, so this page does not reproduce them.",
        ar: "تنشر بوابة التأشيرات البحرينية إجراءاتها بوضوح وقواعدها بشُحّ. الحقائق الإجرائية أدناه منقولة عنها. أما قواعد الاستحقاق — أي جنسية تحصل على ماذا، ولأي مدة، وبأي سعر — فتقع خلف أداة تفاعلية لا يمكن قراءتها دون تشغيلها، ولذلك لا تعيد هذه الصفحة نشرها.",
      },
      claims: [
        {
          text: {
            en: "evisa.gov.bh is the only official website for applying for a visa to Bahrain. Anything else charging you to apply is an intermediary, not the authority.",
            ar: "موقع evisa.gov.bh هو الموقع الرسمي الوحيد للتقدّم بطلب تأشيرة إلى البحرين. وأي جهة أخرى تتقاضى رسومًا مقابل التقديم هي وسيط لا الجهة الرسمية.",
          },
          status: "verified",
          sources: [bhEvisa],
        },
        {
          text: {
            en: "Applications take approximately 3 to 5 working days to process, and payment is taken by credit card through the Bank of Bahrain and Kuwait payment gateway.",
            ar: "تستغرق معالجة الطلبات نحو 3 إلى 5 أيام عمل، ويتم الدفع ببطاقة ائتمان عبر بوابة بنك البحرين والكويت.",
          },
          status: "verified",
          sources: [bhEvisaFaq],
        },
        {
          text: {
            en: "The processing fee is not refunded if the application is refused. You are paying for the decision, not for the visa.",
            ar: "لا تُردّ رسوم المعالجة في حال رفض الطلب. أنت تدفع مقابل القرار لا مقابل التأشيرة.",
          },
          status: "verified",
          sources: [bhEvisaFaq, bhEvisa],
        },
        {
          text: {
            en: "Each applicant must apply on their own passport, and must enter Bahrain on the same passport used in the application. The visa is not stamped into the passport — a printed copy is carried instead.",
            ar: "يجب أن يتقدّم كل شخص بجواز سفره الخاص، وأن يدخل البحرين بالجواز نفسه المستخدم في الطلب. ولا تُختم التأشيرة في الجواز، بل تُحمل نسخة مطبوعة منها.",
          },
          status: "verified",
          sources: [bhEvisaFaq, bhEvisaProcess],
        },
        {
          text: {
            en: "Bahrain publishes a list of roughly 200 nationalities eligible for a visa on arrival, with per-country terms. A nationality that is not on the list needs a guarantor in Bahrain to apply on the traveller's behalf.",
            ar: "تنشر البحرين قائمة بنحو 200 جنسية مؤهلة لتأشيرة عند الوصول، بشروط تختلف لكل بلد. والجنسية غير المدرجة تحتاج إلى كفيل في البحرين يتقدّم بالطلب نيابة عن المسافر.",
          },
          status: "verified",
          sources: [bhOnArrivalList, bhEvisaFaq],
          note: {
            en: "Being on the list is not the same as qualifying. The portal attaches conditions to each country and says explicitly that terms apply — check your own nationality on the list before relying on it.",
            ar: "الإدراج في القائمة ليس كالاستحقاق. تضع البوابة شروطًا لكل بلد وتنص صراحة على أن الشروط تنطبق — تحقق من جنسيتك في القائمة قبل الاعتماد عليها.",
          },
        },
        {
          text: {
            en: "Whether a visa on arrival can be issued at the King Fahd Causeway itself, as opposed to at the airport.",
            ar: "ما إذا كان يمكن إصدار تأشيرة عند الوصول في جسر الملك فهد نفسه، بخلاف المطار.",
          },
          status: "unverified",
          sources: [bhOnArrivalList],
          note: {
            en: "The official on-arrival page names no entry points at all. Travel sites commonly state that the causeway issues them; the authority does not say so on any page we could read. Treat the land border as unconfirmed and apply online in advance if you have the time.",
            ar: "لا تذكر الصفحة الرسمية لتأشيرة الوصول أي منافذ دخول على الإطلاق. وتذكر مواقع السفر عادةً أن الجسر يصدرها، لكن الجهة الرسمية لا تقول ذلك في أي صفحة أمكننا قراءتها. اعتبر المنفذ البري غير مؤكَّد، وتقدّم بالطلب إلكترونيًا مسبقًا إن كان الوقت يسمح.",
          },
        },
        {
          text: {
            en: "What a holder of a Saudi residence permit (Iqama) needs in order to enter Bahrain — which visa type, what Iqama validity, and whether profession affects eligibility.",
            ar: "ما يحتاجه حامل الإقامة السعودية لدخول البحرين — أي نوع تأشيرة، وأي مدة صلاحية للإقامة، وما إذا كانت المهنة تؤثر على الاستحقاق.",
          },
          status: "unverified",
          sources: [bhEvisa, bhEvisaFaq],
          note: {
            en: "This is the most-asked question on this route and the official portal does not answer it in any page we could read: GCC residence permits and Iqamas are not mentioned at all. The answer lives in the portal's eligibility tool, which has to be run in a browser. Claims that an Iqama needs three months' validity, or that some professions are excluded, come from blogs and forum posts and are not published by the authority. Run the eligibility tool on evisa.gov.bh for your own nationality and profession before you plan the trip.",
            ar: "هذا هو السؤال الأكثر تكرارًا في هذا المسار، ولا تجيب عنه البوابة الرسمية في أي صفحة أمكننا قراءتها: فالإقامات الخليجية غير مذكورة إطلاقًا. والإجابة موجودة في أداة الاستحقاق داخل البوابة، وهي تحتاج إلى تشغيلها في المتصفح. أما ما يُقال عن اشتراط صلاحية ثلاثة أشهر للإقامة، أو استثناء بعض المهن، فمصدره مدونات ومنتديات ولا تنشره الجهة الرسمية. شغّل أداة الاستحقاق في evisa.gov.bh وفق جنسيتك ومهنتك قبل التخطيط للرحلة.",
          },
        },
        {
          text: {
            en: "Visa types, their durations, single or multiple entry, and their fees.",
            ar: "أنواع التأشيرات ومددها، وأحادية أو متعددة الدخول، ورسومها.",
          },
          status: "unverified",
          sources: [bhEvisaFaq],
          note: {
            en: "No fee amount appears anywhere on the readable portal. The FAQ directs applicants to view conditions, validity and period of stay for each type after completing the eligibility page. Figures circulating online disagree with one another — one source says BD 10, another BHD 9 — so none is reproduced here.",
            ar: "لا يظهر أي مبلغ رسوم في أي موضع يمكن قراءته من البوابة. وتوجّه الأسئلة الشائعة المتقدّمين إلى الاطلاع على الشروط والصلاحية ومدة الإقامة لكل نوع بعد إكمال صفحة الاستحقاق. والأرقام المتداولة عبر الإنترنت متعارضة — مصدر يقول 10 دنانير وآخر 9 — ولذلك لا يُعاد نشر أي منها هنا.",
          },
        },
        {
          text: {
            en: "A stay in the airport of under 8 hours needs no visa, provided the traveller does not leave the airport.",
            ar: "الإقامة في المطار لأقل من 8 ساعات لا تحتاج إلى تأشيرة، شريطة ألا يغادر المسافر المطار.",
          },
          status: "verified",
          sources: [bhEvisaFaq],
          note: {
            en: "Included because it is officially stated, though it does not apply to a road crossing.",
            ar: "أُدرجت لأنها منصوص عليها رسميًا، وإن كانت لا تنطبق على العبور البري.",
          },
        },
      ],
    },

    {
      heading: {
        en: "The causeway itself",
        ar: "الجسر نفسه",
      },
      intro: {
        en: "The Causeway Authority publishes more than Bahrain's visa portal does. Its services, its lanes and its truck rules are all documented; what it conspicuously does not publish is a tariff for an ordinary car.",
        ar: "تنشر المؤسسة العامة للجسر أكثر مما تنشره بوابة التأشيرات البحرينية. فخدماتها ومساراتها وقواعد الشاحنات موثّقة كلها؛ أما ما لا تنشره بوضوح فهو تعرفة السيارة العادية.",
      },
      claims: [
        {
          text: {
            en: "E-JESR is a lane that passes the toll gates automatically, without stopping. It is used by buying a crossing ticket in advance through the Jesr app, or through a one-time pass tied to the vehicle's plate number.",
            ar: "مسار E-JESR هو مسار لعبور بوابات الرسوم تلقائيًا دون توقف. ويُستخدم بشراء تذكرة عبور مسبقًا عبر تطبيق جسر، أو عبر تصريح لمرة واحدة مرتبط برقم لوحة المركبة.",
          },
          status: "verified",
          sources: [kfcaServices, kfcaEjesr],
        },
        {
          text: {
            en: "Vehicle insurance can be bought, and an existing policy extended, through the Jesr app before leaving for Bahrain, with a choice of cover periods.",
            ar: "يمكن شراء وثيقة تأمين للمركبة، وتمديد وثيقة قائمة، عبر تطبيق جسر قبل المغادرة إلى البحرين، مع اختيار مدة التغطية.",
          },
          status: "verified",
          sources: [kfcaServices],
          note: {
            en: "Note what this does and does not establish. The Authority describes buying insurance as a service it offers. It does not state on these pages that cover valid in Bahrain is a condition of crossing in a private car — see the unverified entry below.",
            ar: "لاحظ ما يثبته هذا وما لا يثبته. تصف المؤسسة شراء التأمين بوصفه خدمة تقدّمها، لكنها لا تنص في هذه الصفحات على أن التغطية السارية في البحرين شرط للعبور بسيارة خاصة — انظر البند غير المؤكَّد أدناه.",
          },
        },
        {
          text: {
            en: "Whether third-party insurance valid in Bahrain is compulsory for a private car, and what a Saudi policy covers once across.",
            ar: "ما إذا كان تأمين الطرف الثالث الساري في البحرين إلزاميًا للسيارة الخاصة، وما الذي تغطيه الوثيقة السعودية بعد العبور.",
          },
          status: "unverified",
          sources: [kfcaServices],
          note: {
            en: "Widely described online as compulsory, and the Authority sells it — but no page we could read states it as a requirement for cars, and no price is published. Ask your own insurer whether your policy extends to Bahrain, and check the Jesr app for current cover and cost.",
            ar: "يُوصف على نطاق واسع عبر الإنترنت بأنه إلزامي، والمؤسسة تبيعه — لكن لا توجد صفحة أمكننا قراءتها تنص عليه كشرط للسيارات، ولا يُنشر له سعر. اسأل شركة التأمين لديك عمّا إذا كانت وثيقتك تمتد إلى البحرين، وراجع تطبيق جسر للتغطية والتكلفة الحالية.",
          },
        },
        {
          text: {
            en: "A passenger-car toll of SAR 35 each way is reported to have taken effect on 18 February 2026, with minibuses at SAR 55 and large buses at SAR 70.",
            ar: "تفيد تقارير بأن رسم عبور السيارة الخاصة أصبح 35 ريالًا سعوديًا لكل اتجاه اعتبارًا من 18 فبراير 2026، مع 55 ريالًا للحافلات الصغيرة و70 ريالًا للحافلات الكبيرة.",
          },
          status: "reported",
          sources: tollNews,
          note: {
            en: "Reported consistently by several news outlets in February 2026, and not contradicted anywhere — but the Causeway Authority's accessible website publishes no passenger-car tariff at all, so this figure is not officially confirmed here. It is also not guaranteed to be current: tolls change, and older guides still quote SAR 25. Check the current charge in the Jesr app or with the Authority on 800 4000 999 before you travel. This site does not use the figure in any quotation or total.",
            ar: "وردت باستمرار في عدة منافذ إخبارية في فبراير 2026 ولم تُنفَ في أي مكان — لكن الموقع المتاح للمؤسسة العامة للجسر لا ينشر أي تعرفة للسيارات الخاصة، ولذلك فإن هذا الرقم غير مؤكَّد رسميًا هنا. كما أنه ليس مضمونًا أنه محدَّث: فالرسوم تتغير، ولا تزال أدلة أقدم تذكر 25 ريالًا. تحقق من الرسم الحالي في تطبيق جسر أو لدى المؤسسة على 800 4000 999 قبل السفر. ولا يستخدم هذا الموقع هذا الرقم في أي عرض سعر أو إجمالي.",
          },
        },
        {
          text: {
            en: "Disability, student and martyrs'-families packages carry a 50% discount on the crossing fee. The disability card requires a minimum top-up of SAR 25.",
            ar: "تمنح باقات ذوي الإعاقة والطلاب وأسر الشهداء خصمًا بنسبة 50% على رسوم العبور. وتتطلب بطاقة ذوي الإعاقة شحنًا بحدّ أدنى 25 ريالًا.",
          },
          status: "verified",
          sources: [kfcaPackages],
        },
        {
          text: {
            en: "Parking at the causeway is free for the first 15 minutes.",
            ar: "وقوف السيارات في الجسر مجاني لأول 15 دقيقة.",
          },
          status: "verified",
          sources: [kfcaFacilities],
        },
        {
          text: {
            en: "Roadside assistance for running out of fuel or a breakdown is available through a free unified number or the Jesr app.",
            ar: "المساعدة على الطريق عند نفاد الوقود أو تعطّل المركبة متاحة عبر رقم موحّد مجاني أو تطبيق جسر.",
          },
          status: "verified",
          sources: [kfcaServices],
        },
        {
          text: {
            en: "Causeway opening hours, and whether the crossing is currently operating normally.",
            ar: "ساعات عمل الجسر، وما إذا كان العبور يعمل حاليًا بصورة طبيعية.",
          },
          status: "unverified",
          sources: [kfcaFacilities, kfcaServices],
          note: {
            en: "Not stated on any page read. The Authority's customer experience centre is 800 4000 999; the Jesr app publishes an average crossing time.",
            ar: "غير مذكورة في أي صفحة جرت قراءتها. مركز تجربة العميل لدى المؤسسة هو 800 4000 999، ويعرض تطبيق جسر متوسط زمن العبور.",
          },
        },
      ],
    },

    {
      heading: {
        en: "Goods vehicles",
        ar: "مركبات نقل البضائع",
      },
      intro: {
        en: "Trucks are the best-documented traffic on the causeway, because the Authority publishes their rules in full. If you are moving goods rather than travelling, this is the section that applies.",
        ar: "الشاحنات هي الحركة الأفضل توثيقًا على الجسر، لأن المؤسسة تنشر قواعدها كاملة. وإذا كنت تنقل بضائع لا تسافر، فهذا هو القسم الذي ينطبق عليك.",
      },
      claims: [
        {
          text: {
            en: "Customs appointments are booked through FASAH on both sides, after which the vehicle goes to a customs clearance office.",
            ar: "تُحجز مواعيد الجمارك عبر منصة فسح على الجانبين، ثم تتوجّه المركبة إلى مكتب التخليص الجمركي.",
          },
          status: "verified",
          sources: [kfcaTrucks],
        },
        {
          text: {
            en: "Truck insurance is bought through the Jesr app or at the United Insurance offices at the causeway. Trucks arriving from Bahrain use the United Insurance app or its offices there.",
            ar: "يُشترى تأمين الشاحنات عبر تطبيق جسر أو في مكاتب المتحدة للتأمين في الجسر. أما الشاحنات القادمة من البحرين فتستخدم تطبيق المتحدة للتأمين أو مكاتبها هناك.",
          },
          status: "verified",
          sources: [kfcaTrucks],
        },
        {
          text: {
            en: "Overweight surcharges are SAR 300 for each axle above its permitted weight, and SAR 300 for each tonne or part of a tonne above the permitted gross weight. Oversize surcharges by length, width and height run from SAR 500 to SAR 2,000.",
            ar: "رسوم تجاوز الوزن 300 ريال لكل محور يتجاوز وزنه المسموح، و300 ريال لكل طن أو جزء منه يتجاوز الوزن الإجمالي المسموح. وتتراوح رسوم تجاوز الأبعاد طولًا وعرضًا وارتفاعًا بين 500 و2,000 ريال.",
          },
          status: "verified",
          sources: [kfcaTrucks],
          note: {
            en: "These are surcharges on top of a base crossing fee, which the Authority does not publish. The Authority may also refuse entry altogether to a vehicle exceeding maximum weights and lengths.",
            ar: "هذه رسوم إضافية فوق رسم عبور أساسي لا تنشره المؤسسة. وللمؤسسة أيضًا أن ترفض دخول مركبة تتجاوز الأوزان والأطوال القصوى.",
          },
        },
      ],
    },
  ],

  checklists: [
    {
      id: "bahrain-passenger",
      title: {
        en: "Traveller documents",
        ar: "وثائق المسافر",
      },
      intro: {
        en: "What to have ready before you set off. The status on each row tells you how well the requirement itself is evidenced — not every item below is confirmed by an authority, and the ones that are not are marked so you can check them yourself.",
        ar: "ما ينبغي تجهيزه قبل الانطلاق. تبيّن الحالة في كل بند مدى توثيق الاشتراط نفسه — فليست كل البنود أدناه مؤكَّدة من جهة رسمية، وما ليس كذلك موسوم لتتحقق منه بنفسك.",
      },
      items: [
        {
          id: "passport",
          label: { en: "Your own passport", ar: "جواز سفرك الشخصي" },
          requirement: "mandatory",
          status: "verified",
          sources: [bhEvisaFaq],
          note: {
            en: "Each traveller applies on their own passport and must enter on the same one used to apply.",
            ar: "يتقدّم كل مسافر بجواز سفره، ويجب أن يدخل بالجواز نفسه المستخدم في الطلب.",
          },
        },
        {
          id: "printed-visa",
          label: {
            en: "Printed copy of the visa, if you were issued one online",
            ar: "نسخة مطبوعة من التأشيرة إن صدرت لك إلكترونيًا",
          },
          requirement: "conditional",
          appliesWhen: {
            en: "If you applied through evisa.gov.bh rather than seeking a visa on arrival.",
            ar: "إذا تقدّمت عبر evisa.gov.bh بدل طلب تأشيرة عند الوصول.",
          },
          status: "verified",
          sources: [bhEvisaFaq],
          note: {
            en: "Bahrain does not stamp the visa into the passport — the printed visa is what you present.",
            ar: "لا تختم البحرين التأشيرة في الجواز — النسخة المطبوعة هي ما تُبرزه.",
          },
        },
        {
          id: "iqama",
          label: {
            en: "Saudi residence permit (Iqama)",
            ar: "الإقامة السعودية",
          },
          requirement: "conditional",
          appliesWhen: {
            en: "If you are a foreign resident of Saudi Arabia.",
            ar: "إذا كنت مقيمًا أجنبيًا في السعودية.",
          },
          status: "unverified",
          sources: [bhEvisa],
          note: {
            en: "Bahrain's readable pages do not mention GCC residence permits at all, so neither the requirement nor any minimum validity could be confirmed. Run the eligibility tool on evisa.gov.bh.",
            ar: "لا تذكر صفحات البحرين المقروءة الإقامات الخليجية إطلاقًا، ولذلك تعذّر تأكيد الاشتراط ولا أي حدّ أدنى للصلاحية. شغّل أداة الاستحقاق في evisa.gov.bh.",
          },
        },
        {
          id: "exit-reentry",
          label: {
            en: "Saudi exit and re-entry permit",
            ar: "تأشيرة الخروج والعودة السعودية",
          },
          requirement: "conditional",
          appliesWhen: {
            en: "If you are a foreign resident leaving Saudi Arabia and intending to return.",
            ar: "إذا كنت مقيمًا أجنبيًا تغادر السعودية وتنوي العودة.",
          },
          status: "unverified",
          sources: [],
          note: {
            en: "No accessible official Saudi source confirming this was found. Check Absher or Jawazat for your own case — this is a Saudi matter, entirely separate from any Bahraini visa.",
            ar: "لم يُعثر على مصدر سعودي رسمي متاح يؤكد ذلك. تحقق عبر أبشر أو الجوازات بشأن حالتك — فهذه مسألة سعودية منفصلة تمامًا عن أي تأشيرة بحرينية.",
          },
        },
        {
          id: "child-docs",
          label: {
            en: "Separate passport and visa for each child",
            ar: "جواز سفر وتأشيرة منفصلان لكل طفل",
          },
          requirement: "conditional",
          appliesWhen: {
            en: "If children are travelling with you.",
            ar: "إذا كان هناك أطفال مسافرون معك.",
          },
          status: "verified",
          sources: [bhEvisaFaq],
          note: {
            en: "Follows from the portal's rule that each applicant must provide their own passport. Any additional guardian or consent documentation could not be verified.",
            ar: "ينبني على قاعدة البوابة بأن على كل متقدّم تقديم جواز سفره. أما أي مستندات إضافية للوصاية أو الموافقة فتعذّر التحقق منها.",
          },
        },
        {
          id: "guarantor",
          label: {
            en: "A guarantor in Bahrain to apply on your behalf",
            ar: "كفيل في البحرين يتقدّم بالطلب نيابة عنك",
          },
          requirement: "conditional",
          appliesWhen: {
            en: "If your nationality is not on Bahrain's list of eligible countries.",
            ar: "إذا لم تكن جنسيتك ضمن قائمة البحرين للدول المؤهلة.",
          },
          status: "verified",
          sources: [bhEvisaFaq],
        },
      ],
    },

    {
      id: "bahrain-vehicle",
      title: {
        en: "Vehicle documents",
        ar: "وثائق المركبة",
      },
      intro: {
        en: "The Causeway Authority publishes a transit document list for goods vehicles. It does not publish an equivalent list for private cars, which is why several rows below are marked unverified — they are the truck requirements, which may or may not apply to you.",
        ar: "تنشر المؤسسة العامة للجسر قائمة وثائق عبور لمركبات نقل البضائع، ولا تنشر قائمة مماثلة للسيارات الخاصة، ولهذا تُوسم عدة بنود أدناه بأنها غير مؤكَّدة — فهي اشتراطات الشاحنات، وقد تنطبق عليك أو لا.",
      },
      items: [
        {
          id: "istimara",
          label: {
            en: "Valid vehicle ownership registration (istimara)",
            ar: "استمارة ملكية المركبة سارية",
          },
          requirement: "mandatory",
          status: "verified",
          sources: [kfcaTrucks],
          note: {
            en: "Published by the Authority as a goods-vehicle transit document. Carry it regardless — it is the document that proves the car is yours to take.",
            ar: "تنشرها المؤسسة ضمن وثائق عبور مركبات البضائع. واحملها في كل الأحوال — فهي الوثيقة التي تثبت أن السيارة لك.",
          },
        },
        {
          id: "licence",
          label: { en: "Valid driving licence", ar: "رخصة قيادة سارية" },
          requirement: "mandatory",
          status: "verified",
          sources: [kfcaTrucks],
        },
        {
          id: "owner-authorisation",
          label: {
            en: "Authorisation (tafweed) from the vehicle's owner, certified by the competent authorities",
            ar: "تفويض من مالك المركبة مصدَّق من الجهات المختصة",
          },
          requirement: "conditional",
          appliesWhen: {
            en: "If the vehicle is not registered in your own name — a family car, a company car or a rental.",
            ar: "إذا لم تكن المركبة مسجّلة باسمك — كسيارة عائلية أو سيارة شركة أو سيارة مستأجرة.",
          },
          status: "verified",
          sources: [kfcaTrucks],
          note: {
            en: "The Authority publishes this for goods vehicles. Whether it is enforced identically for a private car could not be confirmed, but driving someone else's vehicle across a border without written authority is a predictable problem.",
            ar: "تنشر المؤسسة ذلك لمركبات البضائع. وتعذّر تأكيد ما إذا كان يُطبَّق بالطريقة نفسها على السيارة الخاصة، لكن قيادة مركبة شخص آخر عبر الحدود دون تفويض مكتوب مشكلة متوقَّعة.",
          },
        },
        {
          id: "insurance",
          label: {
            en: "Vehicle insurance valid in Bahrain",
            ar: "تأمين مركبة ساري في البحرين",
          },
          requirement: "conditional",
          appliesWhen: {
            en: "If your existing Saudi policy does not extend across the border — ask your insurer.",
            ar: "إذا كانت وثيقتك السعودية الحالية لا تمتد عبر الحدود — اسأل شركة التأمين.",
          },
          status: "unverified",
          sources: [kfcaServices],
          note: {
            en: "The Authority sells cover through the Jesr app but does not state on its readable pages that it is compulsory for cars, and publishes no price. Confirm with your insurer and in the app.",
            ar: "تبيع المؤسسة التغطية عبر تطبيق جسر لكنها لا تنص في صفحاتها المقروءة على أنها إلزامية للسيارات، ولا تنشر لها سعرًا. تأكد من شركة التأمين ومن التطبيق.",
          },
        },
        {
          id: "rental-authorisation",
          label: {
            en: "Written permission from the rental company to leave the country",
            ar: "إذن خطي من شركة التأجير بمغادرة البلاد",
          },
          requirement: "conditional",
          appliesWhen: {
            en: "If you are driving a rental car.",
            ar: "إذا كنت تقود سيارة مستأجرة.",
          },
          status: "unverified",
          sources: [],
          note: {
            en: "No official source addressing rental vehicles at this crossing was found. Many rental agreements prohibit leaving the country outright. Ask the rental company in writing before you book the trip.",
            ar: "لم يُعثر على مصدر رسمي يتناول السيارات المستأجرة في هذا المنفذ. وكثير من عقود التأجير تمنع مغادرة البلاد تمامًا. اسأل شركة التأجير كتابيًا قبل حجز الرحلة.",
          },
        },
        {
          id: "idp",
          label: {
            en: "International Driving Permit",
            ar: "رخصة قيادة دولية",
          },
          requirement: "conditional",
          appliesWhen: {
            en: "Depending on which licence you hold and whether Bahrain recognises it.",
            ar: "بحسب الرخصة التي تحملها وما إذا كانت البحرين تعترف بها.",
          },
          status: "unverified",
          sources: [],
          note: {
            en: "Not addressed by any official source we could read. Confirm with Bahrain's traffic authority whether your licence is recognised for driving there.",
            ar: "لا يتناولها أي مصدر رسمي أمكننا قراءته. تحقق من الإدارة العامة للمرور البحرينية عمّا إذا كانت رخصتك معترفًا بها للقيادة هناك.",
          },
        },
      ],
    },
  ],

  faqs: [
    {
      question: {
        en: "Can a Saudi Iqama holder travel to Bahrain over the causeway?",
        ar: "هل يمكن لحامل الإقامة السعودية السفر إلى البحرين عبر الجسر؟",
      },
      answer: {
        en: "We cannot confirm this from an official source, and we will not guess at it. Bahrain's visa portal does not mention GCC residence permits on any page we could read; the rules sit inside its eligibility tool. Run that tool on evisa.gov.bh with your own nationality and profession. Remember that it answers only the Bahraini half — leaving Saudi Arabia is a separate matter for Saudi authorities.",
        ar: "لا يمكننا تأكيد ذلك من مصدر رسمي، ولن نخمّنه. فبوابة التأشيرات البحرينية لا تذكر الإقامات الخليجية في أي صفحة أمكننا قراءتها؛ والقواعد موجودة داخل أداة الاستحقاق. شغّل تلك الأداة في evisa.gov.bh بجنسيتك ومهنتك. وتذكّر أنها تجيب عن الشق البحريني فقط — أما مغادرة السعودية فمسألة منفصلة تخص الجهات السعودية.",
      },
      status: "unverified",
      sources: [bhEvisa, bhEvisaFaq],
    },
    {
      question: {
        en: "Does my Saudi car insurance cover me in Bahrain?",
        ar: "هل يغطيني تأمين سيارتي السعودي في البحرين؟",
      },
      answer: {
        en: "Ask your insurer — this depends on your policy, not on the border. The Causeway Authority sells insurance and extensions through the Jesr app, which implies many drivers need to buy cover, but it does not publish a rule making it compulsory for private cars, nor a price.",
        ar: "اسأل شركة التأمين لديك — فالأمر يعتمد على وثيقتك لا على الحدود. تبيع المؤسسة العامة للجسر التأمين والتمديد عبر تطبيق جسر، ما يوحي بأن كثيرًا من السائقين يحتاجون لشراء تغطية، لكنها لا تنشر قاعدة تجعله إلزاميًا للسيارات الخاصة ولا سعرًا له.",
      },
      status: "unverified",
      sources: [kfcaServices],
    },
    {
      question: {
        en: "How much does it cost to cross?",
        ar: "كم تبلغ تكلفة العبور؟",
      },
      answer: {
        en: "News outlets reported SAR 35 each way for a car from 18 February 2026, but the Causeway Authority's own site publishes no passenger-car tariff, so we cannot confirm it and cannot promise it is current. Check the Jesr app or call 800 4000 999. Disability, student and martyrs'-families packages carry a verified 50% discount.",
        ar: "ذكرت منافذ إخبارية 35 ريالًا لكل اتجاه للسيارة اعتبارًا من 18 فبراير 2026، لكن موقع المؤسسة العامة للجسر لا ينشر أي تعرفة للسيارات الخاصة، ولذلك لا يمكننا تأكيدها ولا ضمان أنها محدَّثة. راجع تطبيق جسر أو اتصل على 800 4000 999. وتمنح باقات ذوي الإعاقة والطلاب وأسر الشهداء خصمًا مؤكَّدًا بنسبة 50%.",
      },
      status: "reported",
      sources: [...tollNews, kfcaPackages],
    },
    {
      question: {
        en: "If my visa is approved, am I guaranteed entry?",
        ar: "إذا تمت الموافقة على تأشيرتي، هل دخولي مضمون؟",
      },
      answer: {
        en: "No. Bahrain states this directly: holding a visa does not guarantee entry, all conditions must be met on arrival, and admission remains at the discretion of an immigration officer. This is the clearest officially verified fact on this page.",
        ar: "لا. تنص البحرين على ذلك صراحة: حيازة التأشيرة لا تضمن الدخول، ويجب تحقق جميع الشروط عند الوصول، ويبقى السماح بالدخول خاضعًا لتقدير ضابط الجوازات. وهذه أوضح حقيقة مؤكَّدة رسميًا في هذه الصفحة.",
      },
      status: "verified",
      sources: [bhEvisaFaq],
    },
    {
      question: {
        en: "Can you drive us across to Bahrain?",
        ar: "هل يمكنكم نقلنا إلى البحرين؟",
      },
      answer: {
        en: "Yes. Pickup can be from anywhere in the Kingdom and the journey can carry on across the causeway to an address in Bahrain. Whether the same driver and vehicle make the whole trip, or the journey changes hands after the border, depends on the route and is confirmed in the written quotation. Your documents and your admission to Bahrain remain yours to arrange — a booking with us is not permission to enter.",
        ar: "نعم. يمكن أن يكون الاستقبال من أي مكان في المملكة، وأن تمضي الرحلة عبر الجسر إلى عنوان في البحرين. أما بقاء السائق والمركبة نفسيهما طوال الطريق، أو انتقال الرحلة إلى يد أخرى بعد الحدود، فيعتمد على المسار ويُؤكَّد في عرض السعر المكتوب. وتبقى وثائقك ودخولك إلى البحرين من ترتيبك — فالحجز معنا ليس إذنًا بالدخول.",
      },
      status: "verified",
      sources: [],
    },
  ],

  authorities: [
    {
      name: {
        en: "Kingdom of Bahrain eVisa portal (NPRA)",
        ar: "بوابة التأشيرات الإلكترونية بمملكة البحرين",
      },
      role: {
        en: "The only official place to apply for a Bahraini visa, and the only place the eligibility rules can be read.",
        ar: "الجهة الرسمية الوحيدة لطلب تأشيرة بحرينية، والمكان الوحيد الذي يمكن فيه الاطلاع على قواعد الاستحقاق.",
      },
      url: "https://www.evisa.gov.bh/",
    },
    {
      name: {
        en: "King Fahd Causeway Authority",
        ar: "المؤسسة العامة لجسر الملك فهد",
      },
      role: {
        en: "Operates the crossing. Current tolls, insurance and the Jesr app come from here.",
        ar: "تشغّل الجسر. ومنها تأتي الرسوم الحالية والتأمين وتطبيق جسر.",
      },
      url: "https://kfca.sa/",
      phone: "800 4000 999",
    },
    {
      name: { en: "FASAH", ar: "منصة فسح" },
      role: {
        en: "Customs appointment booking for goods vehicles, on both sides of the crossing.",
        ar: "حجز مواعيد الجمارك لمركبات البضائع على جانبي المنفذ.",
      },
      url: "https://signup.fasah.sa",
    },
  ],
};
