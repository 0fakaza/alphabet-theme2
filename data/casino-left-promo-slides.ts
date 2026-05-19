/**
 * Casino sol “Promosyonlar” slider — statik varsayılan; ileride API/CMS’den beslenebilir.
 * Görseller: `public/images/promo/` altına koyun (ör. promo-card-1.jpg …).
 */
export type CasinoLeftPromoSlide = {
  id: string
  href: string
  image: string
  /** next/image alt; yoksa genel metin kullanılır */
  alt?: string
}

export const defaultCasinoLeftPromoSlides: CasinoLeftPromoSlide[] = [
  { id: "l1", href: "/promotions", image: "/images/promo/promo-card.jpg", alt: "Promosyon" },
  { id: "l2", href: "/promotions", image: "/images/promo/promo-card.jpg", alt: "Promosyon" },
  { id: "l3", href: "/promotions", image: "/images/promo/promo-card.jpg", alt: "Promosyon" },
  { id: "l4", href: "/promotions", image: "/images/promo/promo-card.jpg", alt: "Promosyon" },
]
