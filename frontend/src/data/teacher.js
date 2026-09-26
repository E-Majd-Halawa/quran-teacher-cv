// ============================================================
// ملف البيانات المركزي — عدّل سيرتك الذاتية بالكامل من هنا فقط
// Central data file — edit your entire CV from this one place
// ============================================================

const teacher = {
  // ---------- المعلومات الأساسية | Basic info ----------
  name: { ar: "الشيخ  معين النجار", en: "Sheikh Moeen Najjar" },
  title: { ar: "معلّم القرآن الكريم والتجويد", en: "Quran & Tajweed Teacher" },
  photo: "/images/teacher-photo.png",
  tagline: {
    ar: "معلّم قرآن كريم متخصص في تعليم التلاوة والتجويد، أسعى إلى مساعدة الطلاب على قراءة كتاب الله قراءة صحيحة ومتقنة.",
    en: "A dedicated Quran teacher specialized in recitation and Tajweed, helping students read the Book of Allah correctly and beautifully.",
  },
  verse: {
    ar: "﴿ وَرَتِّلِ الْقُرْآنَ تَرْتِيلًا ﴾",
    en: '"…and recite the Qur’an with measured recitation." — Al-Muzzammil 73:4',
  },
  cvFile: "/cv/moeen-najjar-cv.pdf",

  // ---------- نبذة عني | About ----------
  about: {
    bio: {
      ar: "معلّم قرآن كريم حاصل على إجازة في القراءات، عملت لسنوات في تعليم الطلاب من مختلف الأعمار والجنسيات مبادئ التلاوة الصحيحة وأحكام التجويد، وأؤمن بأن لكل طالب أسلوبًا يناسبه، لذلك أضع خطة تعليمية فردية لكل طالب بحسب مستواه وأهدافه.",
      en: "A certified Quran teacher holding an Ijazah in recitation. I have spent years teaching students of different ages and nationalities the correct principles of recitation and Tajweed rules, and I tailor a personal learning plan for every student based on their level and goals.",
    },
    qualifications: {
      ar: [
        "إجازة في رواية حفص عن عاصم",
        "دبلوم في علوم القرآن والتجويد",
        "دورة معلمي القرآن المعتمدين",
      ],
      en: [
        "Ijazah in Hafs an Asim narration",
        "Diploma in Quranic Sciences & Tajweed",
        "Certified Quran Teachers Program",
      ],
    },
    experienceYears: 9,
    ageGroups: {
      ar: "من سن 6 سنوات وحتى الكبار",
      en: "From age 6 through adults",
    },
    languages: { ar: ["العربية", "الإنجليزية"], en: ["Arabic", "English"] },
    teachingStyle: {
      ar: "أسلوب هادئ وتدريجي يعتمد على التكرار المدروس والتشجيع المستمر، مع متابعة دقيقة لأخطاء النطق ومخارج الحروف.",
      en: "A calm, gradual approach built on deliberate repetition and steady encouragement, with close attention to pronunciation and articulation points.",
    },
    online: true,
  },

  // ---------- التخصصات | Specialties ----------
  specialties: [
    {
      icon: "BookOpenText",
      ar: "حفظ القرآن الكريم",
      en: "Quran Memorization (Hifz)",
    },
    { icon: "Mic2", ar: "تصحيح التلاوة", en: "Recitation Correction" },
    { icon: "Sparkles", ar: "أحكام التجويد", en: "Tajweed Rules" },
    {
      icon: "Repeat",
      ar: "التلقين والتحفيظ",
      en: "Talqeen & Memorization Guidance",
    },
    { icon: "ListChecks", ar: "مراجعة المحفوظ", en: "Memorization Review" },
    {
      icon: "Waves",
      ar: "مخارج الحروف وصفاتها",
      en: "Articulation Points (Makharij)",
    },
    {
      icon: "Award",
      ar: "إعداد الطلاب للإجازة القرآنية",
      en: "Ijazah Preparation",
    },
    {
      icon: "CalendarCheck2",
      ar: "خطط حفظ ومراجعة فردية",
      en: "Personalized Study Plans",
    },
  ],

  // ---------- الإجازات والشهادات | Certificates ----------
  certificates: [
    {
      title: { ar: "إجازة السند المتصل", en: "Ijazah of the Connected Sanad" },
      type: { ar: "إجازة سند متصل", en: "Connected-chain Ijazah" },
      image: "/images/certificates/ijaza-sanad.svg",
    },
    {
      title: { ar: "إجازة السند المتصل بالقراءات الصغرى والكبرى", en: "Ijazah of the Connected Sanad in the Minor & Major Qira'at" },
      type: { ar: "إجازة سند متصل", en: "Connected-chain Ijazah" },
      image: "/images/certificates/ijaza-qiraat-sughra-kubra.svg",
    },
    {
      title: { ar: "إجازة السند المتصل بالقراءات الصغرى", en: "Ijazah of the Connected Sanad in the Minor Qira'at" },
      type: { ar: "إجازة سند متصل", en: "Connected-chain Ijazah" },
      image: "/images/certificates/ijaza-qiraat-sughra.svg",
    },
    {
      title: { ar: "شهادة شكر وتقدير", en: "Certificate of Appreciation" },
      type: { ar: "شهادة شكر وتقدير", en: "Appreciation Certificate" },
      image: "/images/certificates/shukr-taqdeer.svg",
    },
  ],

  // ---------- الخبرات | Experience ----------
  experience: [
    {
      place: {
        ar: "أكاديمية النور لتعليم القرآن أونلاين",
        en: "Al-Noor Online Quran Academy",
      },
      role: { ar: "معلّم قرآن كريم أول", en: "Senior Quran Teacher" },
      period: { ar: "2021 — حتى الآن", en: "2021 — Present" },
      tasks: {
        ar: [
          "تدريس أكثر من 100 طالبًا من دول مختلفة",
          "إعداد خطط حفظ ومراجعة فردية",
          "الإشراف على معلمين جدد",
        ],
        en: [
          "Teaching 40+ students from various countries",
          "Designing personal memorization plans",
          "Mentoring new teachers",
        ],
      },
      students: 40,
      mode: { ar: "أونلاين", en: "Online" },
    },
    {
      place: { ar: "مقرأة المسجد الكبير", en: "The Grand Mosque Study Circle" },
      role: { ar: "معلّم تحفيظ", en: "Hifz Teacher" },
      period: { ar: "2018 — 2021", en: "2018 — 2021" },
      tasks: {
        ar: [
          "تحفيظ الأطفال والشباب",
          "متابعة يومية للمحفوظ",
          "تنظيم مسابقات قرآنية",
        ],
        en: [
          "Memorization coaching for children & youth",
          "Daily follow-up on memorized portions",
          "Organizing Quran competitions",
        ],
      },
      students: 60,
      mode: { ar: "حضوري", en: "In-person" },
    },
    {
      place: {
        ar: "مركز تعليم القرآن للجاليات",
        en: "Community Quran Learning Center",
      },
      role: { ar: "معلّم تجويد", en: "Tajweed Teacher" },
      period: { ar: "2016 — 2018", en: "2016 — 2018" },
      tasks: {
        ar: [
          "تعليم أحكام التجويد للمبتدئين",
          "تصحيح مخارج الحروف",
          "إعداد مادة تعليمية مبسطة",
        ],
        en: [
          "Teaching Tajweed fundamentals to beginners",
          "Correcting articulation points",
          "Preparing simplified teaching material",
        ],
      },
      students: 25,
      mode: { ar: "حضوري", en: "In-person" },
    },
  ],

  // ---------- طريقة التدريس | Methodology ----------
  methodology: [
    { ar: "تحديد مستوى الطالب", en: "Assess the student’s level" },
    { ar: "تقييم التلاوة", en: "Evaluate current recitation" },
    { ar: "وضع خطة تعليم مناسبة", en: "Design a tailored learning plan" },
    { ar: "تصحيح الأخطاء مباشرة", en: "Correct mistakes in real time" },
    { ar: "متابعة الحفظ والمراجعة", en: "Track memorization & review" },
    { ar: "تقييم دوري لمستوى الطالب", en: "Periodic progress assessment" },
  ],

  // ---------- الإنجازات | Stats (achievements) ----------
  stats: {
    students: 120,
    experienceYears: 9,
    surahsTaught: 78,
    teachingHours: 6400,
  },

  // ---------- آراء الطلاب | Testimonials ----------
  testimonials: [
    {
      name: { ar: "عبد الله محمد", en: "Abdullah Mohammed" },
      country: { ar: "المملكة العربية السعودية", en: "Saudi Arabia" },
      photo: "https://i.pravatar.cc/100?img=12",
      rating: 5,
      text: {
        ar: "أسلوب الشيخ في التصحيح واضح وصبور جدًا، ساعدني كثيرًا في إتقان أحكام التجويد خلال أشهر قليلة.",
        en: "His correction style is clear and very patient — it helped me master Tajweed rules within a few months.",
      },
    },
    {
      name: { ar: "سارة أحمد", en: "Sarah Ahmed" },
      country: { ar: "المملكة المتحدة", en: "United Kingdom" },
      photo: "https://i.pravatar.cc/100?img=32",
      rating: 5,
      text: {
        ar: "الخطة التي وضعها لي ولأطفالي كانت مرنة ومناسبة تمامًا، والمتابعة مستمرة وجادة.",
        en: "The plan he set for me and my children was flexible and perfectly suited to us, with consistent, serious follow-up.",
      },
    },
    {
      name: { ar: "يوسف الحسن", en: "Yusuf Al-Hassan" },
      country: { ar: "كندا", en: "Canada" },
      photo: "https://i.pravatar.cc/100?img=51",
      rating: 4,
      text: {
        ar: "تعلمت معه من الصفر حتى استطعت حفظ عدة أجزاء، أسلوب تدريسه سهل ومحفّز.",
        en: "I learned with him from zero until I memorized several parts. His teaching style is easy and motivating.",
      },
    },
  ],

  // ---------- الدول | Countries taught ----------
  countries: [
    { ar: "فلسطين", en: "Palestine" },
    { ar: "السعودية", en: "Saudi Arabia" },
    { ar: "مصر", en: "Egypt" },
    { ar: "الأردن", en: "Jordan" },
    { ar: "الإمارات", en: "UAE" },
    { ar: "بريطانيا", en: "UK" },
    { ar: "أمريكا", en: "USA" },
    { ar: "كندا", en: "Canada" },
  ],

  // ---------- اللغات | Communication languages ----------
  languageSkills: [
    {
      lang: { ar: "العربية", en: "Arabic" },
      level: { ar: "متقدم", en: "Advanced" },
      percent: 100,
    },
    {
      lang: { ar: "الإنجليزية", en: "English" },
      level: { ar: "متوسط إلى متقدم", en: "Intermediate–Advanced" },
      percent: 75,
    },
  ],

  // ---------- المهارات | Skills ----------
  skills: [
    { ar: "حفظ القرآن الكريم", en: "Quran Memorization", percent: 98 },
    { ar: "التجويد", en: "Tajweed", percent: 96 },
    { ar: "تصحيح التلاوة", en: "Recitation Correction", percent: 95 },
    { ar: "مخارج الحروف", en: "Articulation Points", percent: 92 },
    { ar: "تعليم القرآن أونلاين", en: "Teaching Quran Online", percent: 94 },
    { ar: "التواصل مع الطلاب", en: "Student Communication", percent: 90 },
    { ar: "إعداد خطط الحفظ والمراجعة", en: "Study Plan Design", percent: 93 },
  ],

  // ---------- التواصل | Contact ----------
  contact: {
    whatsapp: { number: "+970590000000", link: "https://wa.me/970590000000" },
    email: "teacher@example.com",
    telegram: "https://t.me/example",
    facebook: "https://facebook.com/example",
    linkedin: "https://linkedin.com/in/example",
  },

  whatsappMessage: {
    ar: "السلام عليكم، أرغب في الاستفسار عن دروس القرآن الكريم والتجويد.",
    en: "Hello, I would like to ask about Quran & Tajweed lessons.",
  },
};

export default teacher;
