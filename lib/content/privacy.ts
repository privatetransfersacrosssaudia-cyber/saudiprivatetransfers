import type { Bilingual } from "@/lib/i18n/config";

/**
 * The privacy policy.
 *
 * Written from the code, not from a template. Every field listed below was
 * read out of `lib/inquiry/lead-schema.ts`, every processor out of
 * `lib/crm/`, and every storage key out of the components that write it. A
 * privacy policy that describes a different website than the one it sits on is
 * worse than none, because it is a representation to the reader that happens
 * to be false.
 *
 * Three things are deliberately absent because they do not exist: a registered
 * company identity, a postal address, and a data protection officer. Two more
 * are stated honestly rather than invented: there is no automatic deletion
 * schedule, and there is no response-time promise.
 *
 * What this page cannot settle is who the legal controller is and which law
 * governs. That is the owner's decision and needs their real business details;
 * see the note at the end of the page, which says so to the reader rather than
 * leaving a silent gap.
 */

export type PolicySection = {
  id: string;
  heading: Bilingual<string>;
  /** Paragraphs of prose. */
  body?: Bilingual<string>[];
  /** An optional list, rendered under the prose. */
  list?: { term: Bilingual<string>; detail: Bilingual<string> }[];
  /** Plain bullet points, where a term/detail pair would be overwrought. */
  bullets?: Bilingual<string>[];
};

export const privacy = {
  metaTitle: {
    en: "Privacy policy",
    ar: "سياسة الخصوصية",
  },
  metaDescription: {
    en: "What this site collects when you request a quotation, who processes it, how long it is kept, and how to ask for a copy or deletion.",
    ar: "ما الذي يجمعه هذا الموقع عند طلبك عرض سعر، ومن يعالجه، ومدة الاحتفاظ به، وكيف تطلب نسخة منه أو حذفه.",
  },

  eyebrow: { en: "Privacy", ar: "الخصوصية" },
  title: { en: "Privacy policy", ar: "سياسة الخصوصية" },
  lastUpdated: "2026-11-17",
  lastUpdatedLabel: { en: "Last updated", ar: "آخر تحديث" },

  standfirst: {
    en: "This page describes what actually happens to the details you send us. It was written against the website's own code rather than from a template, so the lists below are the real fields, the real services and the real storage — not a generic summary.",
    ar: "تصف هذه الصفحة ما يحدث فعليًا للبيانات التي ترسلها إلينا. وقد كُتبت استنادًا إلى شيفرة الموقع نفسه لا إلى قالب جاهز، فالقوائم أدناه هي الحقول الحقيقية والخدمات الحقيقية ومواضع التخزين الحقيقية — لا ملخصًا عامًا.",
  },

  contentsHeading: { en: "On this page", ar: "في هذه الصفحة" },

  sections: [
    {
      id: "summary",
      heading: { en: "The short version", ar: "باختصار" },
      bullets: [
        {
          en: "We collect the journey details you type into the quote form, plus how you arrived at the site. Nothing else.",
          ar: "نجمع تفاصيل الرحلة التي تكتبها في نموذج طلب عرض السعر، إضافة إلى كيفية وصولك إلى الموقع. لا شيء غير ذلك.",
        },
        {
          en: "There are no analytics, no advertising pixels and no third-party tracking scripts on this website.",
          ar: "لا توجد أدوات تحليلات ولا بكسلات إعلانية ولا نصوص تتبّع من أطراف ثالثة في هذا الموقع.",
        },
        {
          en: "Browsing the site sets no cookies at all. The only cookie this site can set belongs to the staff sign-in, and you will never receive it.",
          ar: "تصفّح الموقع لا يضع أي ملفات ارتباط إطلاقًا. وملف الارتباط الوحيد الذي يمكن أن يضعه هذا الموقع يخص تسجيل دخول الموظفين، ولن تتلقاه أنت أبدًا.",
        },
        {
          en: "We use your details to answer your enquiry. We do not sell them, and we do not send marketing.",
          ar: "نستخدم بياناتك للرد على طلبك. ولا نبيعها، ولا نرسل رسائل تسويقية.",
        },
        {
          en: "You can ask for a copy of what we hold about you, or ask us to delete it, by emailing us.",
          ar: "يمكنك طلب نسخة مما نحتفظ به عنك، أو طلب حذفه، عبر مراسلتنا بالبريد الإلكتروني.",
        },
      ],
    },

    {
      id: "what-we-collect",
      heading: { en: "What we collect", ar: "ما الذي نجمعه" },
      body: [
        {
          en: "Everything below comes from the quote form. If you never send the form, we hold nothing about you.",
          ar: "كل ما يرد أدناه مصدره نموذج طلب عرض السعر. وإذا لم ترسل النموذج قط، فنحن لا نحتفظ بأي شيء عنك.",
        },
      ],
      list: [
        {
          term: { en: "Contact details", ar: "بيانات التواصل" },
          detail: {
            en: "Your name, email address and phone or WhatsApp number — whichever you choose to give. A phone number is required by the form; an email address is optional, though without one we cannot send you a written acknowledgement.",
            ar: "اسمك وبريدك الإلكتروني ورقم هاتفك أو واتساب — بحسب ما تختار تقديمه. ورقم الهاتف مطلوب في النموذج، أما البريد الإلكتروني فاختياري، وإن لم تقدّمه فلن نتمكن من إرسال إشعار استلام مكتوب إليك.",
          },
        },
        {
          term: { en: "Journey details", ar: "تفاصيل الرحلة" },
          detail: {
            en: "Pick-up and destination, date and time, number of passengers, amount of luggage, vehicle preference, flight number, the kind of service you asked about, and any message you write.",
            ar: "نقطة الانطلاق والوجهة، والتاريخ والوقت، وعدد الركاب، وكمية الحقائب، وتفضيل المركبة، ورقم الرحلة، ونوع الخدمة التي سألت عنها، وأي رسالة تكتبها.",
          },
        },
        {
          term: { en: "How you reached us", ar: "كيف وصلت إلينا" },
          detail: {
            en: "The page you sent the form from, the page you first landed on, the website that referred you, and any campaign tags in the link you followed (utm_source, utm_medium, utm_campaign and a Google click identifier). This tells us which pages generate enquiries. It is never shown to anyone outside our own team and never appears in an email to you.",
            ar: "الصفحة التي أرسلت منها النموذج، وأول صفحة دخلت إليها، والموقع الذي أحالك إلينا، وأي وسوم حملة في الرابط الذي اتبعته (utm_source وutm_medium وutm_campaign ومعرّف نقرة جوجل). ويخبرنا ذلك أي الصفحات تولّد الطلبات. ولا يُعرض هذا لأي جهة خارج فريقنا ولا يظهر في أي رسالة إليك.",
          },
        },
        {
          term: { en: "A reference", ar: "رقم مرجعي" },
          detail: {
            en: "Generated for each enquiry so you and we can refer to the same journey. It is derived from a random value, not from anything about you.",
            ar: "يُنشأ لكل طلب لتتمكن أنت ونحن من الإشارة إلى الرحلة نفسها. وهو مشتق من قيمة عشوائية لا من أي شيء يخصّك.",
          },
        },
      ],
    },

    {
      id: "what-we-dont",
      heading: { en: "What we do not collect", ar: "ما الذي لا نجمعه" },
      bullets: [
        {
          en: "No analytics or statistics service runs on this website. There is no Google Analytics, no Meta pixel, and no third-party script of any kind on the pages you browse.",
          ar: "لا تعمل أي خدمة تحليلات أو إحصاءات في هذا الموقع. فلا يوجد Google Analytics ولا بكسل Meta ولا أي نص برمجي من طرف ثالث في الصفحات التي تتصفحها.",
        },
        {
          en: "We do not build a profile of you, and we do not combine your enquiry with data from anywhere else.",
          ar: "نحن لا نبني ملفًا تعريفيًا عنك، ولا ندمج طلبك ببيانات من أي مصدر آخر.",
        },
        {
          en: "We take no payment on this website, so no card or bank details are ever entered here. Journeys are paid for away from the site, by cash or bank transfer.",
          ar: "لا نستقبل أي مدفوعات عبر هذا الموقع، ولذلك لا تُدخَل فيه إطلاقًا بيانات بطاقات أو حسابات بنكية. ويُسدَّد ثمن الرحلات خارج الموقع، نقدًا أو بتحويل بنكي.",
        },
        {
          en: "We do not ask for passport, Iqama or visa details, and you should not send them through the form. Our border-crossing guides are information only; we do not process visa applications.",
          ar: "لا نطلب بيانات جواز السفر أو الإقامة أو التأشيرة، ولا ينبغي إرسالها عبر النموذج. وأدلة عبور الحدود لدينا للمعلومات فقط؛ فنحن لا نعالج طلبات التأشيرات.",
        },
      ],
    },

    {
      id: "cookies",
      heading: {
        en: "Cookies and browser storage",
        ar: "ملفات الارتباط وتخزين المتصفح",
      },
      body: [
        {
          en: "Browsing this site sets no cookies. The site does use your browser's own local storage for two small things, and neither is sent anywhere on its own.",
          ar: "تصفّح هذا الموقع لا يضع أي ملفات ارتباط. لكن الموقع يستخدم التخزين المحلي في متصفحك لأمرين صغيرين، ولا يُرسل أي منهما إلى أي جهة من تلقاء نفسه.",
        },
      ],
      list: [
        {
          term: { en: "spt_first_touch", ar: "spt_first_touch" },
          detail: {
            en: "Written once, on your first visit, recording the page you landed on, the site that referred you and any campaign tags. It is read only when you send the quote form, and it travels with that enquiry. Clearing your browser's site data removes it.",
            ar: "يُكتب مرة واحدة عند زيارتك الأولى، ويسجّل الصفحة التي دخلت إليها والموقع الذي أحالك وأي وسوم حملة. ولا يُقرأ إلا عند إرسالك نموذج طلب السعر، فينتقل مع ذلك الطلب. ومسح بيانات الموقع من متصفحك يزيله.",
          },
        },
        {
          term: { en: "pts-checklist-…", ar: "pts-checklist-…" },
          detail: {
            en: "Remembers which items you have ticked on a travel checklist, so you do not lose your place. It stays in your browser and is never transmitted to us or to anyone else.",
            ar: "يتذكّر البنود التي وضعت عليها علامة في قائمة التجهيز للسفر، كي لا تفقد موضعك. ويبقى في متصفحك ولا يُرسل إلينا ولا إلى أي جهة أخرى.",
          },
        },
        {
          term: { en: "pts_crm_session", ar: "pts_crm_session" },
          detail: {
            en: "A sign-in cookie for our own staff area. It is only ever issued to someone who signs in at the staff login, so as a visitor you will not receive it.",
            ar: "ملف ارتباط لتسجيل الدخول إلى منطقة الموظفين الخاصة بنا. ولا يُصدر إلا لمن يسجّل الدخول من صفحة دخول الموظفين، فأنت كزائر لن تتلقاه.",
          },
        },
      ],
    },

    {
      id: "why",
      heading: { en: "Why we use it", ar: "لماذا نستخدمها" },
      bullets: [
        {
          en: "To answer your enquiry and send you a written quotation. This is the whole purpose; without your details we cannot reply.",
          ar: "للرد على طلبك وإرسال عرض سعر مكتوب إليك. وهذا هو الغرض كاملًا؛ فبدون بياناتك لا يمكننا الرد.",
        },
        {
          en: "To keep a record of what was quoted and agreed, so a later question about the same journey can be answered.",
          ar: "للاحتفاظ بسجل لما جرى تسعيره والاتفاق عليه، ليتسنى الرد على أي سؤال لاحق عن الرحلة نفسها.",
        },
        {
          en: "To understand which pages produce enquiries, using the campaign and referrer fields. This is aggregate business insight, not profiling.",
          ar: "لفهم أي الصفحات تولّد الطلبات، باستخدام حقول الحملة والإحالة. وهذه رؤية تجارية إجمالية لا تنميط للأشخاص.",
        },
        {
          en: "We do not use your details for marketing, and we do not send newsletters or promotional messages.",
          ar: "لا نستخدم بياناتك لأغراض تسويقية، ولا نرسل نشرات بريدية أو رسائل ترويجية.",
        },
      ],
    },

    {
      id: "who-sees-it",
      heading: { en: "Who else sees it", ar: "من يطّلع عليها غيرنا" },
      body: [
        {
          en: "We use three outside services to run this website. Each one only receives what it needs to do its job, and none of them is permitted to use your details for their own purposes.",
          ar: "نستخدم ثلاث خدمات خارجية لتشغيل هذا الموقع. ولا تتلقى أي منها سوى ما تحتاجه لأداء عملها، ولا يُسمح لأي منها باستخدام بياناتك لأغراضها الخاصة.",
        },
      ],
      list: [
        {
          term: { en: "Database hosting", ar: "استضافة قاعدة البيانات" },
          detail: {
            en: "Your enquiry is stored in a managed Postgres database (Supabase), together with any internal notes our team adds about it and a record of emails sent in connection with it.",
            ar: "يُخزَّن طلبك في قاعدة بيانات Postgres مُدارة (Supabase)، مع أي ملاحظات داخلية يضيفها فريقنا عنه وسجل بالرسائل المرسلة بشأنه.",
          },
        },
        {
          term: { en: "Email delivery", ar: "إرسال البريد الإلكتروني" },
          detail: {
            en: "Acknowledgements and quotations are sent through an email provider (Resend). It receives your email address and the content of the message. We keep a log of what was sent, including the message body, so that a question about whether something arrived can be answered.",
            ar: "تُرسل إشعارات الاستلام وعروض الأسعار عبر مزوّد بريد إلكتروني (Resend). ويتلقى عنوان بريدك ومحتوى الرسالة. ونحتفظ بسجل لما أُرسل، بما في ذلك نص الرسالة، ليتسنى الرد على أي سؤال عمّا إذا كانت الرسالة قد وصلت.",
          },
        },
        {
          term: { en: "Website hosting", ar: "استضافة الموقع" },
          detail: {
            en: "The site runs on Cloudflare's network, which necessarily sees the technical details of every request, including your IP address, as any web host does.",
            ar: "يعمل الموقع على شبكة Cloudflare، التي تطّلع بالضرورة على التفاصيل التقنية لكل طلب، بما في ذلك عنوان IP الخاص بك، كما تفعل أي جهة استضافة.",
          },
        },
      ],
    },

    {
      id: "ip",
      heading: { en: "Your IP address", ar: "عنوان IP الخاص بك" },
      body: [
        {
          en: "We use your IP address briefly, in the server's memory, to limit how many enquiries can be sent from one connection in a short time. It is a defence against automated submissions. It is not written to the database and is not stored against your enquiry.",
          ar: "نستخدم عنوان IP الخاص بك لفترة وجيزة في ذاكرة الخادم للحدّ من عدد الطلبات التي يمكن إرسالها من اتصال واحد خلال وقت قصير. وهو إجراء للحماية من الإرسال الآلي. ولا يُكتب في قاعدة البيانات ولا يُخزَّن مع طلبك.",
        },
      ],
    },

    {
      id: "whatsapp",
      heading: { en: "If you use WhatsApp", ar: "إذا استخدمت واتساب" },
      body: [
        {
          en: "The WhatsApp buttons on this site open a conversation in WhatsApp with a message already written. From that point the conversation takes place inside WhatsApp and is subject to its own privacy terms, not ours. We see what you send us there, as in any chat.",
          ar: "تفتح أزرار واتساب في هذا الموقع محادثة في واتساب برسالة مكتوبة مسبقًا. ومن تلك اللحظة تجري المحادثة داخل واتساب وتخضع لشروط الخصوصية الخاصة به لا لشروطنا. ونحن نطّلع على ما ترسله إلينا هناك، كما في أي محادثة.",
        },
      ],
    },

    {
      id: "retention",
      heading: { en: "How long we keep it", ar: "مدة احتفاظنا بها" },
      body: [
        {
          en: "We will be straightforward about this: there is no automatic deletion schedule. An enquiry stays in our system until someone on our team deletes it, because a journey enquired about today may be asked about again months later.",
          ar: "سنكون صريحين في هذا: لا يوجد جدول حذف تلقائي. فيبقى الطلب في نظامنا حتى يحذفه أحد أفراد فريقنا، لأن رحلة يُسأل عنها اليوم قد يُسأل عنها مجددًا بعد أشهر.",
        },
        {
          en: "When an enquiry is deleted, everything attached to it goes with it in the same action: the internal notes, the activity history and the record of emails sent about it. Nothing is left behind as an orphaned fragment.",
          ar: "وعند حذف الطلب، يُحذف معه كل ما يرتبط به في العملية نفسها: الملاحظات الداخلية وسجل النشاط وسجل الرسائل المرسلة بشأنه. ولا يبقى أي جزء يتيم.",
        },
        {
          en: "If you would like your enquiry removed sooner, ask us and we will delete it.",
          ar: "وإذا رغبت في حذف طلبك قبل ذلك، فاطلب منّا وسنحذفه.",
        },
      ],
    },

    {
      id: "your-choices",
      heading: { en: "Your choices", ar: "خياراتك" },
      body: [
        {
          en: "Email us at the address below and we will act on any of the following. Please write from the email address you used in the enquiry, or quote your reference, so that we can be sure we are giving your details to you.",
          ar: "راسلنا على العنوان أدناه وسنستجيب لأي مما يلي. ويُرجى الكتابة من عنوان البريد الذي استخدمته في الطلب، أو ذكر رقمك المرجعي، حتى نتأكد أننا نسلّم بياناتك إليك أنت.",
        },
      ],
      bullets: [
        {
          en: "Ask for a copy of what we hold about you.",
          ar: "طلب نسخة مما نحتفظ به عنك.",
        },
        {
          en: "Ask us to correct something that is wrong.",
          ar: "طلب تصحيح أي معلومة غير صحيحة.",
        },
        {
          en: "Ask us to delete your enquiry and everything attached to it.",
          ar: "طلب حذف طلبك وكل ما يرتبط به.",
        },
        {
          en: "Ask us to stop contacting you about an enquiry.",
          ar: "طلب التوقف عن التواصل معك بشأن طلب ما.",
        },
        {
          en: "Clear the site's local storage yourself at any time, through your browser's settings, without asking us.",
          ar: "مسح التخزين المحلي للموقع بنفسك في أي وقت من إعدادات متصفحك، دون الرجوع إلينا.",
        },
      ],
    },

    {
      id: "security",
      heading: { en: "How it is protected", ar: "كيف تُحمى بياناتك" },
      bullets: [
        {
          en: "The site is served over HTTPS, so what you type into the form is encrypted in transit.",
          ar: "يُقدَّم الموقع عبر HTTPS، فيكون ما تكتبه في النموذج مشفّرًا أثناء النقل.",
        },
        {
          en: "The database refuses all direct access from browsers. Every read and write goes through our server, and only authenticated staff accounts can reach enquiry records.",
          ar: "ترفض قاعدة البيانات أي وصول مباشر من المتصفحات. فكل قراءة وكتابة تمر عبر خادمنا، ولا يمكن الوصول إلى سجلات الطلبات إلا من حسابات موظفين موثّقة.",
        },
        {
          en: "Staff passwords are stored only as salted hashes, computed inside the database. Nobody, including us, can read a staff password.",
          ar: "تُخزَّن كلمات مرور الموظفين على هيئة بصمات مُملَّحة فقط، تُحسب داخل قاعدة البيانات. ولا يستطيع أحد، بمن في ذلك نحن، قراءة كلمة مرور موظف.",
        },
        {
          en: "Staff access is divided by role, so not everyone who can read an enquiry can delete one.",
          ar: "وصول الموظفين مقسّم بحسب الدور، فليس كل من يستطيع قراءة طلب يستطيع حذفه.",
        },
        {
          en: "No security is absolute, and we will not claim otherwise.",
          ar: "ولا توجد حماية مطلقة، ولن ندّعي غير ذلك.",
        },
      ],
    },

    {
      id: "children",
      heading: { en: "Children", ar: "الأطفال" },
      body: [
        {
          en: "This website is meant for adults arranging travel. We do not knowingly collect details from children. If a booking involves children travelling, we only need the number of passengers, not their personal details.",
          ar: "هذا الموقع موجّه للبالغين الذين يرتّبون رحلات سفر. ولا نجمع عن قصد بيانات من الأطفال. وإذا تضمّن الحجز أطفالًا مسافرين، فنحن نحتاج عدد الركاب فقط لا بياناتهم الشخصية.",
        },
      ],
    },

    {
      id: "changes",
      heading: { en: "Changes to this page", ar: "التغييرات على هذه الصفحة" },
      body: [
        {
          en: "If what we collect or who processes it changes, this page changes with it and the date at the top is updated. We do not keep a public archive of previous versions.",
          ar: "إذا تغيّر ما نجمعه أو مَن يعالجه، تتغيّر هذه الصفحة تبعًا لذلك ويُحدَّث التاريخ في أعلاها. ولا نحتفظ بأرشيف عام للنسخ السابقة.",
        },
      ],
    },
  ] satisfies PolicySection[],

  contactHeading: { en: "Asking us about your data", ar: "التواصل معنا بشأن بياناتك" },
  contactBody: {
    en: "Email is the way to reach us about anything on this page. We do not publish a postal address and we do not have a separate data protection officer; your message comes to the same team that answers transfer enquiries.",
    ar: "البريد الإلكتروني هو وسيلة التواصل معنا بشأن أي أمر في هذه الصفحة. ولا ننشر عنوانًا بريديًا، وليس لدينا مسؤول حماية بيانات منفصل؛ فرسالتك تصل إلى الفريق نفسه الذي يرد على طلبات النقل.",
  },
} as const;
