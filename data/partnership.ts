export type PartnershipFeatureCard = {
  id: string
  title: string
  description: string
  
  imageSrc: string
}

export const PARTNERSHIP_FEATURE_CARDS: PartnershipFeatureCard[] = [
  {
    id: "commission",
    title: "%40'a varan Yüksek Komisyon Oranları",
    description: "%20 ile başlayan serüveniniz; her an yükselecek.",
    imageSrc: "/images/partnership1.png",
  },
  {
    id: "bonuses",
    title: "Avantajlı Bonuslar",
    description: "%20 ile başlayan serüveniniz; her an yükselecek.",
    imageSrc: "/images/partnership2.png",
  },
  {
    id: "withdraw",
    title: "Dilediğin yöntem ile çekim yap",
    description: "%20 ile başlayan serüveniniz; her an yükselecek.",
    imageSrc: "/images/partnership3.png",
  },
]

export type PartnershipLeaderRow = {
  rank: 1 | 2 | 3
  couponId: string
  played: string
  members: string
  rate: string
  earnings: string
}

export const PARTNERSHIP_LEADERBOARD: PartnershipLeaderRow[] = [
  {
    rank: 1,
    couponId: "Te*********",
    played: "4.980.125",
    members: "18",
    rate: "%25",
    earnings: "10.000",
  },
  {
    rank: 2,
    couponId: "Z1****",
    played: "4.526.125",
    members: "18",
    rate: "%25",
    earnings: "10.000",
  },
  {
    rank: 3,
    couponId: "Mi******",
    played: "3.912.521",
    members: "18",
    rate: "%25",
    earnings: "10.000",
  },
]

export const PARTNERSHIP_STATS = {
  parts: [
    { text: "1052 üyemiz, toplamda ", emphasis: false },
    { text: "14.520 kişiye", emphasis: true },
    { text: " referans oldu ve ortalama ", emphasis: false },
    { text: "%21,62", emphasis: true },
    { text: " oran ile kayıplardan ", emphasis: false },
    { text: "$15.520.512,42", emphasis: true },
    { text: " kazandı.", emphasis: false },
  ] as const,
}

export const PARTNERSHIP_STEPS = {
  title: "Hemen başlayın, adım adım yükselin.",
  subtitle: "%20 ile başlayan serüveniniz; her an yükselecek.",
  items: [
    { id: "1", label: "Referans kampanyanızı oluşturun", highlight: false },
    { id: "2", label: "Referans bağlantısını paylaşın", highlight: true },
    { id: "3", label: "Kazanın ve Komisyonunuzu paylaşın", highlight: false },
  ] as const,
  ctaLabel: "Hemen başlayın",
  ctaHref: "/page-login",
} as const
