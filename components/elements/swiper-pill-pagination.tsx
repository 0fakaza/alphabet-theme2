import type { CSSProperties } from "react"

import { cn } from "@/lib/utils"


export const SWIPER_PILL_PAGINATION_ROOT_CLASS = "swiper--pill-pagination"


export type SwiperPillPaginationVisibility = "mobile" | "desktop" | "always" | "never"

export type SwiperPillPaginationRootOptions = {
  
  bottom?: string | number
  
  style?: CSSProperties
}


export const pillPagination = { clickable: true as const }


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


export function swiperPillPaginationClassName(...extra: (string | undefined | false)[]) {
  return cn(SWIPER_PILL_PAGINATION_ROOT_CLASS, ...extra)
}
