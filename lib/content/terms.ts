import type { PolicySection } from "@/lib/content/privacy";

/**
 * Terms and conditions.
 *
 * Written from the implementation, the same way the privacy policy was. Every
 * statement below traces to something the code actually does:
 *
 * - the enquiry fields and the single server-side requirement come from
 *   `lib/inquiry/schema.ts` and `lib/inquiry/lead-schema.ts`;
 * - the reference format, the acknowledgement and its "this is not a booking
 *   confirmation" line come from `app/actions/inquiry.ts` and
 *   `lib/crm/email.ts`;
 * - the quotation's shape — line items, currency, total, validity date,
 *   payment terms and cancellation policy — comes from `Quotation` in
 *   `lib/crm/types.ts`, where the last two are free text written per
 *   quotation, not site-wide policy;
 * - accept/decline comes from `decideOnQuotation`, and the fact that accepting
 *   is *not* a confirmation comes from `sendBookingConfirmation`, which is
 *   deliberately a separate manual action;
 * - "no payment on this website" is literally true: there is no gateway, no
 *   card field and no checkout anywhere in the codebase.
 *
 * The business arranges AND provides the transfer. It is not an intermediary,
 * a referral platform or a lead-generation site, and nothing here should imply
 * otherwise. What the page does not do is describe how vehicles or drivers are
 * sourced — ownership, employment, licensing and insurance are unestablished,
 * so they are simply not mentioned either way.
 *
 * Three policies are the owner's, not the code's, and were supplied directly:
 * payment is by cash or bank transfer; sixty minutes of waiting time is
 * included; and cancellation refunds follow a 48/24-hour schedule with a
 * 4-hour deadline for asking, with a no-show chargeable in full. These are the
 * only clauses here that do not come from the implementation, and they must
 * not be edited without the owner. `docs/terms-open-decisions.md` records them
 * and the wording they were given in.
 *
 * The 4-hour deadline and the refund schedule are two different things and a
 * reader will conflate them if allowed to: the deadline governs whether a
 * cancellation can be processed at all, the schedule governs what comes back.
 * A cancellation 4–24 hours out is accepted and refunds nothing, so the third
 * refund bullet says that in as many words rather than leaving it to be
 * inferred from the boundaries.
 *
 * Still undecided, and deliberately absent rather than guessed: governing law
 * and jurisdiction, the registered identity and address, and insurance and
 * limits of responsibility. The owner has instructed that these must not block
 * the page, so nothing here mentions them in either direction.
 */

export const terms = {
  metaTitle: {
    en: "Terms and conditions",
    ar: "الشروط والأحكام",
  },
  metaDescription: {
    en: "How enquiries, quotations and booking confirmations work on this site, what your quotation decides, and what these terms deliberately do not claim.",
    ar: "كيف تعمل الطلبات وعروض الأسعار وتأكيدات الحجز في هذا الموقع، وما الذي يحدده عرض سعرك، وما الذي لا تدّعيه هذه الشروط عمدًا.",
  },

  eyebrow: { en: "Terms", ar: "الشروط" },
  title: { en: "Terms and conditions", ar: "الشروط والأحكام" },
  lastUpdated: "2026-11-17",
  lastUpdatedLabel: { en: "Last updated", ar: "آخر تحديث" },

  standfirst: {
    en: "These terms describe how this website actually works: what happens when you send an enquiry, what a quotation is, and the single moment at which a transfer becomes a confirmed booking. They were written against the site's own code, so they do not promise a process that does not exist — and where a term has not been settled, they say so instead of inventing one.",
    ar: "تصف هذه الشروط كيف يعمل هذا الموقع فعليًا: ماذا يحدث عند إرسالك طلبًا، وما هو عرض السعر، واللحظة الوحيدة التي تتحول فيها الرحلة إلى حجز مؤكد. وقد كُتبت استنادًا إلى شيفرة الموقع نفسه، فهي لا تَعِد بإجراء غير موجود — وحيثما لم يُحسم بند، تقول ذلك صراحةً بدل أن تختلقه.",
  },

  contentsHeading: { en: "On this page", ar: "في هذه الصفحة" },

  sections: [
    {
      id: "summary",
      heading: { en: "The short version", ar: "باختصار" },
      body: [
        {
          en: "This website takes enquiries. It does not take bookings and it does not take money. You send us the details of a journey, we reply with a written quotation for that journey, and you decide. Nothing is reserved while you are deciding.",
          ar: "يستقبل هذا الموقع الطلبات. وهو لا يُجري حجوزات ولا يستقبل مدفوعات. ترسل إلينا تفاصيل رحلتك، فنرد عليك بعرض سعر مكتوب لتلك الرحلة، ثم تقرر أنت. ولا يُحجز شيء أثناء تفكيرك.",
        },
        {
          en: "Your transfer is a confirmed booking only when we have sent you a booking confirmation saying so. Accepting a quotation is the step before that, not the same thing.",
          ar: "ولا تصبح رحلتك حجزًا مؤكدًا إلا عندما نرسل إليك رسالة تأكيد حجز تنص على ذلك. وقبول عرض السعر هو الخطوة السابقة لذلك، لا الشيء نفسه.",
        },
        {
          en: "The headline terms are short: you pay by cash or bank transfer, sixty minutes of waiting time is included, a cancellation more than 48 hours before pickup is refunded in full, and a journey nobody turns up for is charged in full. Each of those is set out below.",
          ar: "والشروط الأساسية قصيرة: الدفع نقدًا أو بتحويل بنكي، ومدة الانتظار المشمولة ستون دقيقة، والإلغاء قبل أكثر من 48 ساعة من موعد الانطلاق يُسترد بالكامل، والرحلة التي لا يحضر لها أحد تُحتسب كاملة. وكل بند من ذلك مفصَّل أدناه.",
        },
      ],
    },

    {
      id: "scope",
      heading: {
        en: "What this website is, and what it covers",
        ar: "ما هذا الموقع، وما الذي يشمله",
      },
      body: [
        {
          en: "These terms apply to your use of this website and to the private transfer services we provide for you. By sending an enquiry you accept them.",
          ar: "تنطبق هذه الشروط على استخدامك لهذا الموقع وعلى خدمات النقل الخاص التي نقدّمها لك. وبإرسالك طلبًا فإنك تقبلها.",
        },
        {
          en: "We provide private ground transport for journeys inside Saudi Arabia — airports, hotels, journeys within a city and long road routes between cities — and cross-border journeys from Saudi Arabia to confirmed neighbouring destinations, arranged individually and subject to a written quotation. We do not issue visas, process border formalities or give immigration advice, and entry to any country is decided by its authorities rather than by us.",
          ar: "نحن نقدّم النقل البري الخاص للرحلات داخل المملكة العربية السعودية — المطارات والفنادق والتنقل داخل المدينة والمسارات البرية الطويلة بين المدن — وكذلك الرحلات العابرة للحدود من السعودية إلى وجهات مجاورة مؤكَّدة، تُرتَّب كلٌّ على حدة وتخضع لعرض سعر مكتوب. ولا نُصدر تأشيرات ولا نُنجز إجراءات الحدود ولا نقدّم استشارات جوازات، والدخول إلى أي بلد تقرّره سلطاته لا نحن.",
        },
        {
          en: "Some pages on this site are travel information rather than a service we sell. The border-crossing guide is the clearest example: it describes a journey we do not operate, and it exists to be useful, not to be booked.",
          ar: "وبعض صفحات هذا الموقع معلومات سفر لا خدمة نبيعها. وأوضح مثال على ذلك دليل عبور الحدود: فهو يصف رحلة لا نشغّلها، ووُجد ليكون مفيدًا لا ليُحجز.",
        },
      ],
    },

    {
      id: "enquiry",
      heading: {
        en: "Enquiries are not bookings",
        ar: "الطلبات ليست حجوزات",
      },
      body: [
        {
          en: "Every form on this site sends an enquiry. There is no instant booking, no checkout and no confirmation at the moment you press the button — the button sends your journey details to our team and nothing more.",
          ar: "كل نموذج في هذا الموقع يرسل طلبًا. فلا حجز فوري، ولا صفحة دفع، ولا تأكيد لحظة ضغطك الزر — فالزر يرسل تفاصيل رحلتك إلى فريقنا، لا أكثر.",
        },
        {
          en: "The form asks for your name, a phone number, an email address, pickup and destination, date and time, passenger and luggage numbers, a vehicle preference, a flight number and anything else you want to tell us. In practice only a way to reach you is strictly required; the rest is what lets us quote without a round of questions first.",
          ar: "يطلب النموذج اسمك، ورقم هاتف، وبريدًا إلكترونيًا، ونقطة الانطلاق والوجهة، والتاريخ والوقت، وعدد الركاب والحقائب، وتفضيل المركبة، ورقم الرحلة الجوية، وأي أمر آخر تود إخبارنا به. وعمليًا فإن المطلوب حتمًا هو وسيلة للتواصل معك فحسب؛ أما البقية فهي ما يتيح لنا التسعير دون جولة أسئلة مسبقة.",
        },
        {
          en: "If you send us an email address, you receive an acknowledgement with a reference number beginning SPT-. That message confirms that your enquiry reached us, repeats the details we hold, and says in its own words that it is not a booking confirmation. Quote the reference in anything you send us afterwards.",
          ar: "وإذا أرسلت إلينا بريدًا إلكترونيًا، يصلك إشعار استلام يحمل رقمًا مرجعيًا يبدأ بـ SPT-. وتؤكد تلك الرسالة وصول طلبك، وتكرّر التفاصيل المسجلة لدينا، وتنص بنفسها على أنها ليست تأكيدًا للحجز. واذكر الرقم المرجعي في كل ما ترسله إلينا بعد ذلك.",
        },
        {
          en: "An enquiry sent by email or WhatsApp is an enquiry like any other. It does not confirm a booking on its own, and we will still need the journey details before we can quote.",
          ar: "والطلب المرسل عبر البريد الإلكتروني أو واتساب طلبٌ كغيره. فهو لا يؤكد حجزًا بذاته، وسنظل بحاجة إلى تفاصيل الرحلة قبل أن نتمكن من التسعير.",
        },
      ],
    },

    {
      id: "availability",
      heading: {
        en: "Availability",
        ar: "التوافر",
      },
      body: [
        {
          en: "Sending an enquiry does not hold a vehicle for your date. We check the route and whether a vehicle can be arranged for it before we quote, and we quote only for journeys we believe we can cover.",
          ar: "إرسال الطلب لا يحجز مركبة لتاريخك. فنحن نتحقق من المسار ومن إمكانية تدبير مركبة له قبل التسعير، ولا نسعّر إلا الرحلات التي نعتقد أن بوسعنا تغطيتها.",
        },
        {
          en: "If we cannot arrange a journey, we will tell you so rather than leave you waiting. We do not publish a response time, so if your journey is time-critical, say so in the message.",
          ar: "وإذا تعذّر علينا ترتيب رحلة، فسنخبرك بذلك بدل أن نتركك في الانتظار. ولا نعلن زمن استجابة محددًا، فإذا كانت رحلتك حساسة للوقت فاذكر ذلك في رسالتك.",
        },
        {
          en: "Very occasionally we may be unable to carry out a journey we have already confirmed. If that happens we will tell you as soon as we know and will not leave you to discover it at the pickup point.",
          ar: "وقد يتعذّر علينا في حالات نادرة تنفيذ رحلة سبق أن أكدناها. وإن حدث ذلك فسنخبرك فور علمنا به، ولن نتركك تكتشفه عند نقطة الانطلاق.",
        },
      ],
    },

    {
      id: "quotation",
      heading: {
        en: "What a quotation is",
        ar: "ما هو عرض السعر",
      },
      body: [
        {
          en: "A quotation is a written price for one described journey. It sets out the journey itself, the vehicle category, the items that make up the price, the total and the currency. It carries its own number and reaches you by email, with a private link to your own copy.",
          ar: "عرض السعر هو سعر مكتوب لرحلة واحدة موصوفة. يبيّن الرحلة نفسها، وفئة المركبة، والبنود المكوِّنة للسعر، والإجمالي والعملة. ويحمل رقمه الخاص، ويصلك عبر البريد الإلكتروني مع رابط خاص لنسختك منه.",
        },
        {
          en: "A quotation may also state a date until which it is valid, and may repeat the payment and cancellation terms that apply to the journey. Those terms are the ones set out on this page. If anything on your quotation differs from this page, ask before you accept it and we will confirm in writing which applies.",
          ar: "وقد ينص عرض السعر كذلك على تاريخ صلاحيته، وقد يكرّر شروط الدفع والإلغاء المنطبقة على الرحلة. وتلك الشروط هي المبيّنة في هذه الصفحة. وإذا اختلف شيء في عرض سعرك عمّا في هذه الصفحة، فاسأل قبل قبوله وسنؤكد لك كتابةً أيهما ينطبق.",
        },
        {
          en: "A quotation is written against the journey you described. If the journey changes — a different pickup point, a later date, more passengers — the price may change with it, and we would issue a new quotation rather than silently adjust the old one.",
          ar: "ويُكتب عرض السعر وفق الرحلة التي وصفتها. فإذا تغيّرت الرحلة — نقطة انطلاق مختلفة، أو تاريخ لاحق، أو ركاب أكثر — فقد يتغيّر السعر تبعًا لها، وسنصدر عرض سعر جديدًا بدل تعديل القديم في صمت.",
        },
        {
          en: "Prices and journey times given elsewhere on this site, including on the destination and route pages, are general descriptions written to help you plan. They are not quotations and they are not offers.",
          ar: "أما الأسعار وأزمنة الرحلات الواردة في مواضع أخرى من الموقع، بما فيها صفحات الوجهات والمسارات، فهي أوصاف عامة كُتبت لمساعدتك على التخطيط. وهي ليست عروض أسعار وليست إيجابًا تعاقديًا.",
        },
      ],
    },

    {
      id: "acceptance",
      heading: {
        en: "Accepting a quotation, and what actually confirms a booking",
        ar: "قبول عرض السعر، وما الذي يؤكد الحجز فعليًا",
      },
      body: [
        {
          en: "Your quotation's private link lets you accept or decline it online. Accepting records your decision and tells our team at once. Declining closes it.",
          ar: "يتيح لك الرابط الخاص بعرض سعرك قبوله أو رفضه عبر الإنترنت. والقبول يسجّل قرارك ويُبلغ فريقنا فورًا. والرفض يُغلقه.",
        },
        {
          en: "A quotation can be answered once. One that has already been accepted or declined, or that has expired, can no longer be decided through the link — if you think that is wrong, reply to the email and we will check.",
          ar: "ويمكن الرد على عرض السعر مرة واحدة. أما الذي سبق قبوله أو رفضه، أو الذي انتهت صلاحيته، فلم يعد يُحسم عبر الرابط — فإن رأيت في ذلك خطأً، فردّ على الرسالة وسنتحقق.",
        },
        {
          en: "Accepting a quotation is not, by itself, a confirmed booking. It tells us you want the journey at that price. Your transfer is confirmed when we send you a booking confirmation, which is a separate message, sent by a person, once a vehicle has actually been arranged for your journey.",
          ar: "وقبول عرض السعر ليس بذاته حجزًا مؤكدًا. فهو يخبرنا أنك تريد الرحلة بذلك السعر. ولا تتأكد رحلتك إلا عندما نرسل إليك رسالة تأكيد الحجز، وهي رسالة منفصلة يرسلها شخص بعد أن تُدبَّر مركبة فعلًا لرحلتك.",
        },
        {
          en: "Until that confirmation arrives, please do not treat the journey as arranged. If you have accepted a quotation and have heard nothing, ask us — quoting your reference — rather than assume.",
          ar: "وإلى أن يصلك ذلك التأكيد، يُرجى ألا تعدّ الرحلة مرتَّبة. وإن كنت قد قبلت عرض سعر ولم يصلك شيء، فاسألنا — مع ذكر رقمك المرجعي — بدل الافتراض.",
        },
      ],
    },

    {
      id: "your-details",
      heading: {
        en: "The details you give us",
        ar: "التفاصيل التي تزوّدنا بها",
      },
      body: [
        {
          en: "We quote and plan against exactly what you tell us. A wrong address, a wrong date or a terminal we were not given produces a correctly executed journey that is the wrong journey, so it is worth checking the acknowledgement email when it arrives.",
          ar: "نحن نسعّر ونخطط وفق ما تخبرنا به حرفيًا. فالعنوان الخطأ أو التاريخ الخطأ أو صالة المطار التي لم تُذكر لنا تُنتج رحلة منفّذة تنفيذًا سليمًا لكنها الرحلة الخطأ، ولذلك يستحق الأمر مراجعة رسالة إشعار الاستلام حين تصلك.",
        },
        {
          en: "If anything in it is wrong, reply with the correction and quote your reference. Corrections before we quote cost nothing; corrections after a vehicle has been arranged may not always be possible.",
          ar: "وإذا كان فيها خطأ، فردّ بالتصحيح مع ذكر رقمك المرجعي. فالتصحيحات قبل التسعير لا تكلّف شيئًا؛ أما بعد تدبير المركبة فقد لا تكون ممكنة دائمًا.",
        },
        {
          en: "Tell us in advance about anything out of the ordinary — a child seat, a wheelchair, an extra stop, an unusually early start, an oversized item. These are arranged for your journey when we know about them beforehand, not produced on the day.",
          ar: "وأخبرنا مسبقًا بأي أمر غير معتاد — مقعد أطفال، أو كرسي متحرك، أو توقف إضافي، أو انطلاقة مبكرة جدًا، أو غرض كبير الحجم. فهذه تُدبَّر لرحلتك متى عرفناها سلفًا، لا أن تُستحضر يوم الرحلة.",
        },
        {
          en: "Where you give us another person's details — someone you are booking for — please make sure they are content for you to do so. How we handle what you send is set out in the privacy policy.",
          ar: "وحين تزوّدنا ببيانات شخص آخر — شخص تحجز له — فتأكد من رضاه بذلك. وكيفية تعاملنا مع ما ترسله موضَّحة في سياسة الخصوصية.",
        },
      ],
    },

    {
      id: "vehicle",
      heading: {
        en: "Vehicle, passengers and luggage",
        ar: "المركبة والركاب والحقائب",
      },
      body: [
        {
          en: "You choose a vehicle category, not an individual vehicle. We confirm in writing what is available for your date rather than promising a particular model or a named driver in advance.",
          ar: "أنت تختار فئة مركبة، لا مركبة بعينها. ونؤكد كتابةً ما هو متاح لتاريخك بدل الوعد مسبقًا بطراز بعينه أو سائق باسمه.",
        },
        {
          en: "Passenger and luggage numbers decide that category, which is the single largest factor in the price. If more people or more bags arrive than the quotation covers, the vehicle may not lawfully or physically be able to take them — so count carefully when you ask.",
          ar: "وعدد الركاب والحقائب هو ما يحدد تلك الفئة، وهي العامل الأكبر في السعر. فإذا حضر أشخاص أكثر أو حقائب أكثر مما يغطيه عرض السعر، فقد لا تتمكن المركبة نظامًا أو حيّزًا من استيعابهم — فأحصِ بدقة عند الطلب.",
        },
        {
          en: "Journeys take place on Saudi roads and under Saudi road traffic rules. Seat belts, child restraints and the number of people a vehicle may carry are governed by those rules and by the driver's instructions on the day, not by what was asked for in the form.",
          ar: "وتجري الرحلات على الطرق السعودية ووفق أنظمة المرور السعودية. فأحزمة الأمان ومقاعد الأطفال وعدد من يجوز للمركبة حملهم تحكمها تلك الأنظمة وتعليمات السائق يوم الرحلة، لا ما طُلب في النموذج.",
        },
      ],
    },

    {
      id: "price-payment",
      heading: {
        en: "Price and payment",
        ar: "السعر والدفع",
      },
      body: [
        {
          en: "No payment is taken on this website. There is no checkout and no payment page anywhere on it, and no card or bank details are ever entered here. Journeys are paid for away from the site.",
          ar: "لا يُستوفى أي مبلغ عبر هذا الموقع. فليست فيه صفحة دفع ولا بوابة سداد في أي موضع، ولا تُدخَل فيه إطلاقًا بيانات بطاقات أو حسابات بنكية. ويُسدَّد ثمن الرحلات خارج الموقع.",
        },
        {
          en: "The price for your journey is the total shown on your quotation, in the currency shown there.",
          ar: "وسعر رحلتك هو الإجمالي المبيّن في عرض سعرك، بالعملة المبيّنة فيه.",
        },
        {
          en: "We accept payment by cash or by bank transfer. The payment arrangement for your journey, and any instructions you need in order to pay, are confirmed with you directly.",
          ar: "ونقبل الدفع نقدًا أو بتحويل بنكي. ويُؤكَّد لك مباشرةً ترتيب الدفع الخاص برحلتك وأي تعليمات تحتاجها للسداد.",
        },
        {
          en: "We may issue an invoice for a confirmed or completed journey. An invoice records what is owed and whether it has been settled; like the quotation, it is a document, not a payment page.",
          ar: "وقد نصدر فاتورة لرحلة مؤكدة أو منفّذة. والفاتورة تسجّل المستحق وما إذا كان قد سُدِّد؛ وهي، كعرض السعر، مستند لا صفحة دفع.",
        },
        {
          en: "If the journey changes on the day — an added stop, a different destination, a longer wait — the price may need to change with it. We will tell you rather than add anything silently.",
          ar: "وإذا تغيّرت الرحلة يوم تنفيذها — توقف إضافي، أو وجهة مختلفة، أو انتظار أطول — فقد يحتاج السعر إلى التغير تبعًا لها. وسنخبرك بذلك بدل إضافة أي شيء في صمت.",
        },
      ],
    },

    {
      id: "changes",
      heading: {
        en: "Changes, cancellations and refunds",
        ar: "التعديلات والإلغاء والاسترداد",
      },
      body: [
        {
          en: "If you need to change or cancel a journey, tell us as early as you can, by email or WhatsApp, quoting your reference. The earlier we know, the more likely a change can be made at all.",
          ar: "إذا احتجت إلى تعديل رحلة أو إلغائها، فأخبرنا في أقرب وقت ممكن، عبر البريد الإلكتروني أو واتساب، مع ذكر رقمك المرجعي. فكلما عرفنا مبكرًا، زاد احتمال إمكانية التعديل أصلًا.",
        },
        {
          en: "A cancellation request must reach us at least 4 hours before the scheduled pickup time. A request sent later than that cannot be processed as a cancellation.",
          ar: "ويجب أن يصلنا طلب الإلغاء قبل 4 ساعات على الأقل من موعد الانطلاق المحدد. والطلب المرسل بعد ذلك لا يمكن معالجته بوصفه إلغاءً.",
        },
        {
          en: "What you are refunded depends on how much notice you give, measured against the scheduled pickup time:",
          ar: "ويعتمد المبلغ المسترد على مقدار المهلة التي تمنحنا إياها، محسوبةً إلى موعد الانطلاق المحدد:",
        },
      ],
      bullets: [
        {
          en: "More than 48 hours before pickup — 100% refund.",
          ar: "قبل أكثر من 48 ساعة من موعد الانطلاق — استرداد 100%.",
        },
        {
          en: "24 hours or more, but no more than 48 hours, before pickup — 50% refund.",
          ar: "قبل 24 ساعة أو أكثر، على ألا تتجاوز 48 ساعة، من موعد الانطلاق — استرداد 50%.",
        },
        {
          en: "Less than 24 hours before pickup — no refund. Note that this band includes the 4-to-24-hour window: a cancellation made in that window is accepted, but it is not refunded.",
          ar: "قبل أقل من 24 ساعة من موعد الانطلاق — لا استرداد. ولاحظ أن هذه الفئة تشمل المدة من 4 إلى 24 ساعة: فالإلغاء ضمن تلك المدة مقبول، لكنه غير قابل للاسترداد.",
        },
      ],
    },

    {
      id: "no-show",
      heading: {
        en: "If nobody is there",
        ar: "إذا لم يحضر أحد",
      },
      body: [
        {
          en: "If nobody appears for a scheduled pickup and we cannot reach you, the journey is treated as a no-show. A no-show is chargeable in full: 100% of the transfer amount.",
          ar: "إذا لم يحضر أحد للاستقبال في موعده المحدد وتعذّر الوصول إليك، عُدّت الرحلة حالة عدم حضور. وحالة عدم الحضور مستحقة بالكامل: 100% من قيمة الرحلة.",
        },
        {
          en: "That is why the contact number you give us matters. If you are running late, call before the pickup time rather than after it — a journey that can still be rearranged is a far better outcome for you than one that was missed in silence.",
          ar: "ولهذا يهمّ رقم التواصل الذي تزوّدنا به. فإذا تأخرت، فاتصل قبل موعد الانطلاق لا بعده — فالرحلة التي لا يزال يمكن إعادة ترتيبها نتيجة أفضل لك بكثير من رحلة فاتت في صمت.",
        },
      ],
    },

    {
      id: "timing",
      heading: {
        en: "Timing, delays and waiting",
        ar: "التوقيت والتأخير والانتظار",
      },
      body: [
        {
          en: "Pickups are planned around your schedule rather than a fixed timetable. For an airport, give us the flight number: it lets the pickup follow the aircraft when a flight lands early or late, instead of a clock time that has stopped being true.",
          ar: "تُخطَّط عمليات الاستقبال وفق جدولك لا وفق توقيت ثابت. وفي المطارات، زوّدنا برقم الرحلة الجوية: فهو يتيح أن يتبع الاستقبال وصول الطائرة عندما تهبط مبكرة أو متأخرة، بدل توقيت ثابت لم يعد صحيحًا.",
        },
        {
          en: "Journey times given anywhere on this site are estimates. Traffic, weather, roadworks, checkpoints and prayer times all affect a road journey in Saudi Arabia, and none of them is within anyone's control. We do not guarantee an arrival time.",
          ar: "وأزمنة الرحلات المذكورة في أي موضع من هذا الموقع تقديرية. فحركة المرور والطقس وأعمال الطرق ونقاط التفتيش وأوقات الصلاة كلها تؤثر في الرحلة البرية داخل المملكة، وليس أي منها تحت سيطرة أحد. ونحن لا نضمن وقت وصول.",
        },
        {
          en: "Sixty minutes of waiting time is included with your transfer. For an airport pickup the time is set from your flight rather than from a clock time, so a late landing does not by itself use up that hour.",
          ar: "ومدة الانتظار المشمولة مع رحلتك ستون دقيقة. وفي الاستقبال من المطار يُضبط الموعد وفق رحلتك الجوية لا وفق توقيت ثابت، فالهبوط المتأخر لا يستهلك تلك الساعة بذاته.",
        },
        {
          en: "If you are delayed on the day, tell us as soon as you know, on the number we gave you.",
          ar: "وإذا تأخرت يوم الرحلة، فأخبرنا فور علمك، على الرقم الذي زوّدناك به.",
        },
      ],
    },

    {
      id: "the-journey",
      heading: {
        en: "The transport service",
        ar: "خدمة النقل",
      },
      body: [
        {
          en: "We arrange and provide private transfer services. You describe a journey; we check the route and availability, price it in writing, and provide the transport on the day once you have accepted and we have confirmed. Your agreement for the transfer is with us.",
          ar: "نحن نرتّب خدمات النقل الخاص ونقدّمها. فأنت تصف رحلة؛ ونحن نتحقق من المسار والتوافر، ونسعّرها كتابةً، ونقدّم النقل يوم الرحلة بعد قبولك وتأكيدنا. وتعاقدك على الرحلة معنا نحن.",
        },
        {
          en: "What this website is not is an instant-booking site. There is no checkout and no price before we have seen the journey, because a transfer from an airport at two in the morning and the same route at midday are not the same job.",
          ar: "وما ليس عليه هذا الموقع هو أنه ليس موقع حجز فوري. فليست فيه صفحة دفع ولا سعر قبل أن نطّلع على الرحلة، لأن النقل من المطار في الثانية فجرًا ليس كالمسار نفسه ظهرًا.",
        },
        {
          en: "We describe what we can confirm for your journey — the vehicle category, the meeting arrangement, the route — rather than publishing a list of inclusions we have not checked. What your journey includes is what your quotation and booking confirmation say it includes.",
          ar: "ونصف ما يمكننا تأكيده لرحلتك — فئة المركبة، وترتيب اللقاء، والمسار — بدل نشر قائمة مزايا لم نتحقق منها. فما تشمله رحلتك هو ما ينص عليه عرض سعرك ورسالة تأكيد حجزك.",
        },
        {
          en: "If something goes wrong with a journey you booked with us, we are the people to tell. You do not have to take it up with anyone else.",
          ar: "وإذا حدث خلل في رحلة حجزتها معنا، فنحن الجهة التي تُبلغها. ولا يلزمك أن تراجع أي طرف آخر.",
        },
      ],
    },

    {
      id: "your-responsibilities",
      heading: {
        en: "What we ask of you",
        ar: "ما نطلبه منك",
      },
      bullets: [
        {
          en: "Give accurate journey details, and correct them as soon as you notice an error.",
          ar: "أن تقدّم تفاصيل رحلة دقيقة، وأن تصححها فور ملاحظتك خطأً.",
        },
        {
          en: "Be at the agreed pickup point at the agreed time, and be reachable on the number you gave us.",
          ar: "أن تكون في نقطة الانطلاق المتفق عليها في الوقت المتفق عليه، وأن يمكن الوصول إليك على الرقم الذي زوّدتنا به.",
        },
        {
          en: "Carry whatever identification or travel documents your journey requires. Documents are yours to arrange; we do not check or hold them.",
          ar: "أن تحمل ما تتطلبه رحلتك من هوية أو وثائق سفر. فالوثائق مسؤوليتك أنت؛ ونحن لا نفحصها ولا نحتفظ بها.",
        },
        {
          en: "Travel safely and lawfully: follow the driver's instructions, wear a seat belt, and do not carry anything unlawful.",
          ar: "أن تسافر بأمان وبما يوافق النظام: تتبع تعليمات السائق، وتربط حزام الأمان، ولا تحمل شيئًا مخالفًا للنظام.",
        },
        {
          en: "Tell us in advance about special requirements rather than on the day.",
          ar: "أن تخبرنا مسبقًا بالاحتياجات الخاصة لا يوم الرحلة.",
        },
      ],
    },

    {
      id: "complaints",
      heading: {
        en: "If something goes wrong",
        ar: "إذا حدث خطأ ما",
      },
      body: [
        {
          en: "Tell us. Email is the best route, because it leaves both of us a record: describe what happened, quote your reference, and include the date of the journey.",
          ar: "أخبرنا. والبريد الإلكتروني أفضل وسيلة، لأنه يترك لكلينا سجلًا: صِف ما حدث، واذكر رقمك المرجعي، وأدرج تاريخ الرحلة.",
        },
        {
          en: "We do not publish a response-time guarantee, so we will not pretend to one here. What we will do is read it, answer it, and say plainly where we were at fault.",
          ar: "ولا نعلن ضمانًا لزمن الاستجابة، فلن ندّعي ذلك هنا. أما ما سنفعله فهو أن نقرأ شكواك، ونردّ عليها، ونقول بصراحة أين كان الخطأ منا.",
        },
      ],
    },

    {
      id: "content",
      heading: {
        en: "This website's content",
        ar: "محتوى هذا الموقع",
      },
      body: [
        {
          en: "The text, page structure and original material on this site are ours. Please do not republish them wholesale as your own.",
          ar: "النصوص وبنية الصفحات والمواد الأصلية في هذا الموقع ملك لنا. فيُرجى عدم إعادة نشرها جملةً بوصفها من إنتاجك.",
        },
        {
          en: "Most of the photographs are not ours. They are used under Creative Commons licences and remain the property of the photographers who made them. The credits page lists every image with its author, its source and its licence, and it is those licence terms — not this page — that govern what you may do with a photograph.",
          ar: "أما معظم الصور فليست لنا. فهي مستخدمة بموجب رخص المشاع الإبداعي وتبقى ملكًا لمصوّريها. وتسرد صفحة الاعتمادات كل صورة مع مؤلفها ومصدرها ورخصتها، وشروط تلك الرخص — لا هذه الصفحة — هي ما يحكم ما يجوز لك فعله بالصورة.",
        },
        {
          en: "Travel information on this site is general information, not advice. Official requirements change, and where something could not be verified against an official source we say so on the page rather than filling the gap. Check anything that matters with the relevant authority before you travel.",
          ar: "ومعلومات السفر في هذا الموقع معلومات عامة لا استشارة. فالمتطلبات الرسمية تتغير، وحيثما تعذّر التحقق من أمر عبر مصدر رسمي قلنا ذلك في الصفحة بدل سدّ الفراغ. فتحقق مما يهمك لدى الجهة المختصة قبل السفر.",
        },
      ],
    },

    {
      id: "acceptable-use",
      heading: {
        en: "Using this website",
        ar: "استخدام هذا الموقع",
      },
      bullets: [
        {
          en: "Send enquiries you actually mean. Automated and junk submissions are filtered and discarded.",
          ar: "أرسل طلبات تقصدها فعلًا. فالطلبات الآلية والعبثية تُصفّى وتُهمل.",
        },
        {
          en: "Do not try to reach the staff area, or anyone else's quotation or invoice. Those documents are addressed by a private link; a link that is not yours is not an invitation.",
          ar: "لا تحاول الوصول إلى منطقة الموظفين، ولا إلى عرض سعر شخص آخر أو فاتورته. فتلك المستندات مُعنوَنة برابط خاص؛ والرابط الذي ليس لك ليس دعوة.",
        },
        {
          en: "Do not attempt to disrupt the site, overload its forms, or probe it for weaknesses.",
          ar: "لا تحاول تعطيل الموقع، أو إغراق نماذجه، أو تتبّع ثغراته.",
        },
        {
          en: "Do not misrepresent who you are when you contact us.",
          ar: "لا تنتحل هوية غير هويتك عند التواصل معنا.",
        },
      ],
    },

    {
      id: "changes-to-terms",
      heading: {
        en: "Changes to these terms",
        ar: "التغييرات على هذه الشروط",
      },
      body: [
        {
          en: "These terms change as the service changes, and the date at the top is updated when they do. The terms that apply to a journey are the ones in force when you accepted its quotation. We do not keep a public archive of earlier versions.",
          ar: "تتغير هذه الشروط بتغيّر الخدمة، ويُحدَّث التاريخ في أعلاها عند ذلك. والشروط المنطبقة على رحلة هي السارية وقت قبولك عرض سعرها. ولا نحتفظ بأرشيف عام للنسخ السابقة.",
        },
      ],
    },
  ] satisfies PolicySection[],

  contactHeading: { en: "Asking about these terms", ar: "الاستفسار عن هذه الشروط" },
  contactBody: {
    en: "If anything here is unclear, or you want a term confirmed in writing before you accept a quotation, email us and ask. Your message reaches the same team that answers transfer enquiries.",
    ar: "إذا كان أي مما هنا غير واضح، أو أردت تأكيد بند كتابةً قبل قبول عرض سعر، فراسلنا واسأل. فرسالتك تصل إلى الفريق نفسه الذي يرد على طلبات النقل.",
  },
} as const;
