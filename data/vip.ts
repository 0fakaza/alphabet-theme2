export const VIP_HERO_IMAGES = {
  
  desktop: "/images/sliders/is.jpg",
  mobile: "/images/sliders/mobil-is.jpg",
} as const

export type VipBenefitCopy = {
  title: string
  description: string
}

export const VIP_BENEFITS: VipBenefitCopy[] = [
  {
    title: "Bonus",
    description:
      "Son zamanlardaki oyun aktivitenize bağlı olarak her hafta ve her ay yeni bir bonus alacaksınız. Daha fazla oynayarak daha fazla bonus alabilirsiniz.",
  },
  {
    title: "Adanmış VIP Yöneticisi",
    description:
      "Görevleri size destek sağlamak ve oyun sorunlarınızı çözmek olan kişisel VIP Yöneticinizi alın.",
  },
  {
    title: "Son Kurşun Bonusları",
    description:
      "Şansınız yaver gitmiyor mu? Alphabe, her yeni seviyeye geçtiğinizde bazı durumlara bağlı olarak kaybettiğiniz paranın iadesini sunar.",
  },
  {
    title: "Seviye Atlama Bonusu",
    description:
      "Bir sonraki seviyeye geçin ve daha çok bonus alın. Ne kadar yüksek seviyelerin kilidini açarsanız bonuslarınız o kadar büyük olur.",
  },
]

export type VipLevelStatus = "claimed" | "completed" | "in_progress" | "locked"


export type VipTierAccent = "emerald" | "diamond"

export type VipLevel = {
  id: string
  name: string
  
  iconSrc: string
  tierAccent: VipTierAccent
  status: VipLevelStatus
  progressFilledSegments: number
  progressTotalSegments: number
  pointsLabel: string
  completionLabel?: string
  transitionReward: string
  betLimit: string
  ctaLabel?: string
}

export type VipFaqItem = {
  id: string
  question: string
  answer: string
}

export const VIP_LEVELS: VipLevel[] = [
  {
    id: "emerald-1",
    name: "Emerald I",
    iconSrc: "/images/vip/emerald-1.svg",
    tierAccent: "emerald",
    status: "claimed",
    progressFilledSegments: 36,
    progressTotalSegments: 36,
    pointsLabel: "1452P",
    completionLabel: "Tamamlandı",
    transitionReward: "$500",
    betLimit: "$500K",
    ctaLabel: "100 TRY Alındı",
  },
  {
    id: "emerald-2",
    name: "Emerald II",
    iconSrc: "/images/vip/emerald-2.svg",
    tierAccent: "emerald",
    status: "completed",
    progressFilledSegments: 36,
    progressTotalSegments: 36,
    pointsLabel: "1452P",
    completionLabel: "Tamamlandı",
    transitionReward: "$500",
    betLimit: "$500K",
    ctaLabel: "100 TRY AL",
  },
  {
    id: "emerald-3",
    name: "Emerald III",
    iconSrc: "/images/vip/emerald-3.svg",
    tierAccent: "emerald",
    status: "locked",
    progressFilledSegments: 0,
    progressTotalSegments: 36,
    pointsLabel: "4000P",
    transitionReward: "$500",
    betLimit: "$500K",
  },
  {
    id: "diamond-1",
    name: "Diamond I",
    iconSrc: "/images/vip/diamond-1.svg",
    tierAccent: "diamond",
    status: "locked",
    progressFilledSegments: 0,
    progressTotalSegments: 36,
    pointsLabel: "4000P",
    transitionReward: "$500",
    betLimit: "$500K",
  },
  {
    id: "diamond-2",
    name: "Diamond II",
    iconSrc: "/images/vip/diamond-2.svg",
    tierAccent: "diamond",
    status: "locked",
    progressFilledSegments: 0,
    progressTotalSegments: 36,
    pointsLabel: "4000P",
    transitionReward: "$500",
    betLimit: "$500K",
  },
  {
    id: "diamond-3",
    name: "Diamond III",
    iconSrc: "/images/vip/diamond-3.svg",
    tierAccent: "diamond",
    status: "locked",
    progressFilledSegments: 0,
    progressTotalSegments: 36,
    pointsLabel: "4000P",
    transitionReward: "$500",
    betLimit: "$500K",
  },
]

export const VIP_FAQ_ITEMS: VipFaqItem[] = [
  {
    id: "faq-1",
    question: "Komisyon oranları yükseltilebilir mi?",
    answer:
      "VIP seviyenize ve hesap geçmişinize bağlı olarak özel komisyon düzenlemeleri değerlendirilebilir. Detaylar için VIP yöneticinizle iletişime geçebilirsiniz.",
  },
  {
    id: "faq-2",
    question: "VIP seviyemi nasıl yükseltirim?",
    answer:
      "Belirli bir süre içindeki oyun ve bahis hacminiz, yatırım düzeniniz ve hesap aktiviteniz seviye hesaplamasında kullanılır. Koşullar kampanya dönemine göre güncellenebilir.",
  },
  {
    id: "faq-3",
    question: "Geçiş ödülü ne zaman hesabıma tanımlanır?",
    answer:
      "Seviye atlama koşulları sağlandığında ödül, sistem tarafından onaylandıktan sonra hesabınıza yansır. Gecikme durumunda destek ekibiyle görüşebilirsiniz.",
  },
  {
    id: "faq-4",
    question: "Bahis limitleri seviyeye göre değişir mi?",
    answer:
      "Evet. Her VIP kademesi için tanımlanan bahis üst limitleri farklılık gösterebilir. Güncel limitler hesap panelinizde veya VIP sözleşmesinde yer alır.",
  },
  {
    id: "faq-5",
    question: "VIP yöneticim kimdir ve nasıl ulaşırım?",
    answer:
      "Uygun seviyeye ulaştığınızda size atanmış bir VIP yöneticisi bildirilir. Mesajlar ve öncelikli destek kanalları üzerinden doğrudan iletişim kurabilirsiniz.",
  },
]
