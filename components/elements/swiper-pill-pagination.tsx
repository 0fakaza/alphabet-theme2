import type { CSSProperties } from "react"

import { cn } from "@/lib/utils"

/**
 * Swiper kök `className` — `app/style/global.scss` içindeki `.swiper--pill-pagination`
 * (hap bullet stilleri + `data-pagination-visibility` + isteğe bağlı `--swiper-pill-pagination-bottom`).
 */
export const SWIPER_PILL_PAGINATION_ROOT_CLASS = "swiper--pill-pagination"

/** Pagination ne zaman görünsün (Swiper köküne `data-pagination-visibility` olarak yazılır). */
export type SwiperPillPaginationVisibility = "mobile" | "desktop" | "always" | "never"

export type SwiperPillPaginationRootOptions = {
  /**
   * Pagination `bottom` — Swiper kökünde `--swiper-pill-pagination-bottom` (px sayı veya CSS string).
   * Verilmezse global varsayılan (14px, hero).
   */
  bottom?: string | number
  /** Swiper `style` ile birleştirilir (CSS değişkeni üzerine yazar). */
  style?: CSSProperties
}

/** Swiper `pagination` prop’u — bullet görünümü `app/style/global.scss` içinde. */
export const pillPagination = { clickable: true as const }

/** Swiper köküne: görünürlük + isteğe bağlı `bottom` / ek `style`. */
export function swiperPillPaginationRootProps(
  visibility: SwiperPillPaginationVisibility = "mobile",
  options?: SwiperPillPaginationRootOptions,
): {
  "data-pagination-visibility": SwiperPillPaginationVisibility
  style?: CSSProperties
} {
  const bottomVar =
    options?.bottom != null
      ? typeof options.bottom === "number"
        ? `${options.bottom}px`
        : options.bottom
      : undefined

  const style = {
    ...options?.style,
    ...(bottomVar != null ? { "--swiper-pill-pagination-bottom": bottomVar } : {}),
  } as CSSProperties

  return {
    "data-pagination-visibility": visibility,
    ...(Object.keys(style).length > 0 ? { style } : {}),
  }
}

/** Kök sınıf + ek Tailwind. */
export function swiperPillPaginationClassName(...extra: (string | undefined | false)[]) {
  return cn(SWIPER_PILL_PAGINATION_ROOT_CLASS, ...extra)
}
