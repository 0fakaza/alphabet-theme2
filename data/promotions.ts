export type PromotionCategoryId = "all" | "casino" | "sport" | "deposit" | "event"

export const PROMOTIONS_HERO = {
  title: "Promosyonlar",
} as const

/** Hero slider görselleri (`components/promotions/promotions-hero.tsx`). */
export const PROMOTIONS_SLIDER_IMAGES = {
  desktop: "/images/sliders/promosyonlar.jpg",
  mobile: "/images/sliders/mobil-promosyonlar.jpg",
} as const

export const PROMOTION_FILTERS: {
  id: PromotionCategoryId
  label: string
  countLabel: string
}[] = [
  { id: "all", label: "Tüm Bonuslar", countLabel: "Bonus içeriyor" },
  { id: "casino", label: "Casino Bonusları", countLabel: "Bonus içeriyor" },
  { id: "sport", label: "Spor Bonusları", countLabel: "Bonus içeriyor" },
  { id: "deposit", label: "Yatırım Bonusu", countLabel: "Bonus içeriyor" },
  { id: "event", label: "Etkinlik Bonusları", countLabel: "Bonus içeriyor" },
]

export type PromotionDetail = {
  /** Modal başlığı; verilmezse kart başlığı kullanılır (Figma örneği gibi uzun başlık için). */
  modalTitle?: string
  sections: { title: string; paragraphs: string[] }[]
  gamesSection?: { title: string; body: string }
}

export type PromotionListItem = {
  id: string
  categoryId: Exclude<PromotionCategoryId, "all">
  categoryLabel: string
  deadlineLabel: string
  title: string
  imageSrc: string
  detail: PromotionDetail
}

const LOREM =
  "Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old."

export function formatPromotionDeadline(deadlineLabel: string): string {
  return deadlineLabel.replace(/^Son Tarih:\s*/i, "").trim()
}

export const PROMOTION_ITEMS: PromotionListItem[] = [
  {
    id: "p1",
    categoryId: "casino",
    categoryLabel: "Casino Bonusları",
    deadlineLabel: "Son Tarih: 14 Ağu 2025 23:59",
    title: "Arkadaşını getir, %20 discount kazan",
    imageSrc: "/images/promo/promo-card.jpg",
    detail: {
      sections: [
        {
          title: "Katılım şartları",
          paragraphs: [
            LOREM,
            "Bu promosyona yalnızca davet bağlantısı ile kayıt olan arkadaşların ilk yatırımı tamamlaması sonrasında hak kazanılır.",
          ],
        },
        {
          title: "Kimler faydalanabilir?",
          paragraphs: [
            "Bonus yalnızca doğrulanmış hesaplara tanımlanır. Çoklu hesap ve kötüye kullanım tespitinde iptal edilir.",
          ],
        },
        {
          title: "Bonus Detayları",
          paragraphs: [
            "İndirim tutarı çevrim şartına tabidir. Genel bonus kuralları geçerlidir.",
          ],
        },
      ],
      gamesSection: {
        title: "Geçerli oyunlar",
        body: "Pragmatic Play, NetEnt ve listedeki seçili slot sağlayıcılarında geçerlidir; canlı casino ve masa oyunları hariçtir.",
      },
    },
  },
  {
    id: "p2",
    categoryId: "casino",
    categoryLabel: "Casino Bonusları",
    deadlineLabel: "Son Tarih: 14 Ağu 2025 23:59",
    title: "%100 hoş geldin bonusu — ilk yatırımda",
    imageSrc: "/images/promo/promo-card.jpg",
    detail: {
      modalTitle: "Casinoda 350 Hoşgeldin Bonusu",
      sections: [
        {
          title: "Katılım şartları",
          paragraphs: [LOREM],
        },
        {
          title: "Kimler faydalanabilir?",
          paragraphs: ["İlk kez yatırım yapan yeni üyeler için geçerlidir."],
        },
        {
          title: "Bonus Detayları",
          paragraphs: ["Bonus miktarı ilk yatırımın %100’ü kadardır; üst limit kampanya sayfasında duyurulur."],
        },
      ],
      gamesSection: {
        title: "Geçerli oyunlar",
        body: "Belirtilen slot ve RNG casino oyunlarında çevrime dahildir.",
      },
    },
  },
  {
    id: "p3",
    categoryId: "sport",
    categoryLabel: "Spor Bonusları",
    deadlineLabel: "Son Tarih: 30 Haz 2025 23:59",
    title: "Kombine bahiste ekstra oran",
    imageSrc: "/images/promo/promo-card.jpg",
    detail: {
      sections: [
        {
          title: "Katılım şartları",
          paragraphs: [LOREM],
        },
        {
          title: "Kimler faydalanabilir?",
          paragraphs: ["Tüm doğrulanmış üyeler katılabilir."],
        },
        {
          title: "Bonus Detayları",
          paragraphs: ["Minimum kombine sayısı ve oran eşiği kampanya şartlarında yer alır."],
        },
      ],
      gamesSection: {
        title: "Geçerli oyunlar",
        body: "Yalnızca spor bahisleri ve belirtilen ligler / marketler için geçerlidir.",
      },
    },
  },
  {
    id: "p4",
    categoryId: "deposit",
    categoryLabel: "Yatırım Bonusu",
    deadlineLabel: "Son Tarih: Süresiz",
    title: "Haftalık %15 yatırım bonusu",
    imageSrc: "/images/promo/promo-card.jpg",
    detail: {
      sections: [
        {
          title: "Katılım şartları",
          paragraphs: [LOREM],
        },
        {
          title: "Kimler faydalanabilir?",
          paragraphs: ["Haftalık yatırım yapan tüm üyeler talep edebilir."],
        },
        {
          title: "Bonus Detayları",
          paragraphs: ["Haftalık yatırım tutarına göre oran değişebilir."],
        },
      ],
    },
  },
  {
    id: "p5",
    categoryId: "event",
    categoryLabel: "Etkinlik Bonusları",
    deadlineLabel: "Son Tarih: 1 Oca 2026 23:59",
    title: "Yılbaşı çekilişi — büyük ödül havuzu",
    imageSrc: "/images/promo/promo-card.jpg",
    detail: {
      sections: [
        {
          title: "Katılım şartları",
          paragraphs: [LOREM],
        },
        {
          title: "Kimler faydalanabilir?",
          paragraphs: ["Çekiliş döneminde belirtilen minimum bahis / yatırımı yapan üyeler."],
        },
        {
          title: "Bonus Detayları",
          paragraphs: ["Ödüller çekiliş sonunda hesaplara tanımlanır; nakit veya bonus olarak duyurulur."],
        },
      ],
      gamesSection: {
        title: "Geçerli oyunlar",
        body: "Kampanya kapsamındaki tüm casino ve spor ürünlerinde geçerli olabilir; detaylar duyuruda belirtilir.",
      },
    },
  },
  {
    id: "p6",
    categoryId: "casino",
    categoryLabel: "Casino Bonusları",
    deadlineLabel: "Son Tarih: 20 Tem 2025 23:59",
    title: "Freespin yağmuru — seçili slotlarda",
    imageSrc: "/images/promo/promo-card.jpg",
    detail: {
      sections: [
        {
          title: "Katılım şartları",
          paragraphs: [LOREM],
        },
        {
          title: "Kimler faydalanabilir?",
          paragraphs: ["Promosyon günlerinde giriş yapan ve şartı sağlayan üyeler."],
        },
        {
          title: "Bonus Detayları",
          paragraphs: ["Freespin tutarı ve geçerlilik süresi hesaba özel tanımlanabilir."],
        },
      ],
      gamesSection: {
        title: "Geçerli oyunlar",
        body: "Yalnızca kampanyada listelenen slot başlıklarında kullanılabilir.",
      },
    },
  },
]

export function countPromotionsByCategory(categoryId: PromotionCategoryId): number {
  if (categoryId === "all") return PROMOTION_ITEMS.length
  return PROMOTION_ITEMS.filter((p) => p.categoryId === categoryId).length
}
