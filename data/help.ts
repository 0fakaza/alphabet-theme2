export type HelpCategoryId = "deposit" | "bonus" | "membership" | "bets" | "affiliate" | "other"

export type HelpDepositStep = {
  title: string
  body: string
  /** Opsiyonel ekran görüntüsü */
  imageSrc?: string
}

export type HelpDepositMethod = {
  id: string
  title: string
  drawerEyebrow: string
  videoCardTitle: string
  /** Kart başlığının solundaki ikon (ör. /images/payments/payments_1.svg) */
  videoCardIcon: string
  /** YouTube embed veya boş — boşsa kart sadece gösterim */
  videoEmbedUrl: string
  steps: HelpDepositStep[]
}

export type HelpFaqItem = {
  id: string
  title: string
  content: string
}

export const HELP_HERO = {
  title: "Yardım Merkezi",
  subtitle:
    "Yatırım/çekim, bonuslar, ödüller ve daha bir çok konuda aradığınız cevapları hazırladık.",
  searchPlaceholder: "Neyi merak ediyoruz?",
} as const

export const HELP_POPULAR_TAGS = [
  { id: "havale", label: "Havale EFT", query: "havale" },
  { id: "komisyon", label: "Komisyon Oranları", query: "komisyon" },
  { id: "limit", label: "Çekim Limiti", query: "çekim" },
] as const

export const HELP_CATEGORIES: {
  id: HelpCategoryId
  title: string
  subtitle: string
  videoCount?: number
}[] = [
  { id: "deposit", title: "Yatırım / Çekim", subtitle: "Yatırım / çekim işlemleri", videoCount: 5 },
  { id: "bonus", title: "Bonus İşlemleri", subtitle: "Bonus kuralları ve talepler" },
  { id: "membership", title: "Üyelik", subtitle: "Hesap ve doğrulama" },
  { id: "bets", title: "Bahisler", subtitle: "Bahis kuralları ve iptal" },
  { id: "affiliate", title: "Affiliate", subtitle: "Ortaklık programı" },
  { id: "other", title: "Diğer", subtitle: "Genel sorular" },
]

export const HELP_DEPOSIT_METHODS: HelpDepositMethod[] = [
  {
    id: "havale",
    title: "Havale EFT",
    drawerEyebrow: "Nasıl yatırım yapabilirim?",
    videoCardTitle: "Havale EFT ile nasıl yatırım yapabilirim?",
    videoCardIcon: "/images/payments/payments_1.svg",
    videoEmbedUrl: "https://www.youtube-nocookie.com/embed/aqz-KE-bpKQ",
    steps: [
      {
        title: "Adım 1",
        body: "Sitenin üst orta bölgesinde yatırım butonuna tıklayın. Açılan ekranda Havale EFT yöntemini seçin.",
        imageSrc: "/images/payments-step1.jpg",
      },
      {
        title: "Adım 2",
        body: "Açılan pencereden miktarı girin ve size sunulan banka bilgileriyle havaleyi tamamlayın.",
        imageSrc: "/images/payments-step2.jpg",
      },
    ],
  },
  {
    id: "kripto",
    title: "Kripto Paralar",
    drawerEyebrow: "Nasıl yatırım yapabilirim?",
    videoCardTitle: "Kripto ile nasıl yatırım yapabilirim?",
    videoCardIcon: "/images/payments/payments_2.svg",
    videoEmbedUrl: "https://www.youtube-nocookie.com/embed/aqz-KE-bpKQ",
    steps: [
      {
        title: "Adım 1",
        body: "Yatırım menüsünden kripto seçeneğini seçin ve ağınızı doğrulayın.",
        imageSrc: "/images/payments-step1.jpg",
      },
      {
        title: "Adım 2",
        body: "Gösterilen cüzdan adresine transferi yapın; işlem onayından sonra bakiyeniz güncellenir.",
        imageSrc: "/images/payments-step2.jpg",
      },
    ],
  },
  {
    id: "fast",
    title: "Hızlı Havale / Fast",
    drawerEyebrow: "Nasıl yatırım yapabilirim?",
    videoCardTitle: "Hızlı Havale ile nasıl yatırım yapabilirim?",
    videoCardIcon: "/images/payments/payments_3.svg",
    videoEmbedUrl: "https://www.youtube-nocookie.com/embed/aqz-KE-bpKQ",
    steps: [
      {
        title: "Adım 1",
        body: "Fast veya hızlı havale yöntemini seçin; kimlik doğrulamanız tamamlanmış olmalıdır.",
        imageSrc: "/images/payments-step1.jpg",
      },
      {
        title: "Adım 2",
        body: "Yönlendirilen ekranda tutarı onaylayın; işlem genelde dakikalar içinde sonuçlanır.",
        imageSrc: "/images/payments-step2.jpg",
      },
    ],
  },
  {
    id: "peppara",
    title: "Peppara",
    drawerEyebrow: "Nasıl yatırım yapabilirim?",
    videoCardTitle: "Peppara ile nasıl yatırım yapabilirim?",
    videoCardIcon: "/images/payments/payments_4.svg",
    videoEmbedUrl: "https://www.youtube-nocookie.com/embed/aqz-KE-bpKQ",
    steps: [
      {
        title: "Adım 1",
        body: "Sitenin üst orta bölgesinde yatırım butonuna tıklayın. Açılan ekranda Peppara yöntemini seçin.",
        imageSrc: "/images/payments-step1.jpg",
      },
      {
        title: "Adım 2",
        body: "Açılan popup ekranından miktar ve banka seçerek devam edin.",
        imageSrc: "/images/payments-step2.jpg",
      },
    ],
  },
  {
    id: "tosla",
    title: "Tosla",
    drawerEyebrow: "Nasıl yatırım yapabilirim?",
    videoCardTitle: "Tosla ile nasıl yatırım yapabilirim?",
    videoCardIcon: "/images/payments/payments_5.svg",
    videoEmbedUrl: "https://www.youtube-nocookie.com/embed/aqz-KE-bpKQ",
    steps: [
      {
        title: "Adım 1",
        body: "Yatırım alanından Tosla’yı seçin ve uygulama üzerinden ödemeyi başlatın.",
        imageSrc: "/images/payments-step1.jpg",
      },
      {
        title: "Adım 2",
        body: "Onay kodunu veya QR işlemini tamamladıktan sonra bakiyeniz otomatik yansır.",
        imageSrc: "/images/payments-step2.jpg",
      },
    ],
  },
]

export const HELP_FAQ_BY_CATEGORY: Record<Exclude<HelpCategoryId, "deposit">, HelpFaqItem[]> = {
  bonus: [
    {
      id: "b1",
      title: "Çevrim şartı nedir?",
      content:
        "Bonus tutarının belirli bir çarpanla oyunlarda kullanılması istenen tutardır. Her promosyonun çevrim şartı kampanya detayında yazar.",
    },
    {
      id: "b2",
      title: "Bonus talebini nasıl oluştururum?",
      content:
        "Uygun yatırım veya etkinlik sonrası Promosyonlar sayfasından ilgili kampanyayı seçip “Talep Et” adımlarını izleyin.",
    },
    {
      id: "b3",
      title: "Bonus iptal edilebilir mi?",
      content:
        "Çevrim başlamadan önce müşteri hizmetlerinden veya hesap ayarlarından iptal talep edilebilir; başlamış çevrimlerde kampanya kuralları geçerlidir.",
    },
  ],
  membership: [
    {
      id: "m1",
      title: "Hesap doğrulama belgeleri nelerdir?",
      content:
        "Kimlik, ikamet ve ödeme yöntemi doğrulaması için güncel belgeler istenebilir. Yüklemeler güvenli panel üzerinden yapılır.",
    },
    {
      id: "m2",
      title: "Şifremi unuttum",
      content: "Giriş ekranındaki “Şifremi unuttum” bağlantısından e-posta veya telefon ile sıfırlama başlatabilirsiniz.",
    },
  ],
  bets: [
    {
      id: "s1",
      title: "Bahis kuponu nasıl oluşturulur?",
      content: "Oranlara tıklayarak kuponunuza ekleyin; tutarı girerek onaylayın. Canlı bahislerde oran değişebilir.",
    },
    {
      id: "s2",
      title: "Cash out nedir?",
      content:
        "Açık bahsinizi maç bitmeden belirli bir tutarla kapatabilmenizi sağlayan özelliktir; kullanılabilirlik etkinliğe göre değişir.",
    },
  ],
  affiliate: [
    {
      id: "a1",
      title: "Affiliate başvurusu",
      content: "Ortaklık sayfasındaki formu doldurun; ekibimiz başvurunuzu inceleyip dönüş yapar.",
    },
    {
      id: "a2",
      title: "Komisyon ödemeleri",
      content: "Komisyonlar belirlenen dönem sonunda, tanımlı ödeme yönteminize göre ödenir.",
    },
  ],
  other: [
    {
      id: "o1",
      title: "Sorumlu oyun",
      content: "Limitlerinizi profil ayarlarından yönetebilir; destek hattımızdan geçici veya kalıcı kısıtlama talep edebilirsiniz.",
    },
    {
      id: "o2",
      title: "İletişim kanalları",
      content: "Canlı destek ve destek talepleri üzerinden 7/24 bize ulaşabilirsiniz.",
    },
  ],
}
