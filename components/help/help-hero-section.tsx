"use client"

import Image from "next/image"
import { HugeiconsIcon, Search01Icon } from "@/lib/icons"
import { cn } from "@/lib/utils"
import { HELP_HERO, HELP_POPULAR_TAGS } from "@/data/help"

type HelpHeroSectionProps = {
  globalSearch: string
  onGlobalSearchChange: (v: string) => void
  /** Mobilde kategori içi görünümde hero gizlenir */
  hideOnMobile: boolean
}

export function HelpHeroSection({ globalSearch, onGlobalSearchChange, hideOnMobile }: HelpHeroSectionProps) {
  return (
    <section className="relative overflow-hidden pb-4 pt-3 md:pb-14 md:pt-16">
      <div
        className={cn(
          "pointer-events-none absolute left-1/2 top-0 h-[220px] w-[320px] -translate-x-1/2 rounded-full bg-[url('/images/dots.png')] bg-center bg-no-repeat opacity-30",
          hideOnMobile && "max-lg:hidden",
        )}
        aria-hidden
      />
      <div
        className={cn(
          "container relative flex flex-col items-center text-center",
          hideOnMobile && "max-lg:hidden",
        )}
      >
        <div className="mb-4 flex justify-center">
          <Image src="/images/icons/icon-help.svg" alt="" width={72} height={72} className="object-contain" />
        </div>
        <h1 className="text-xl font-semibold tracking-wide text-text-title md:text-2xl">{HELP_HERO.title}</h1>
        <p className="mt-2 max-w-[600px] text-sm font-medium leading-relaxed tracking-wide text-text-subtext md:text-base">
          {HELP_HERO.subtitle}
        </p>

        <div className="mt-8 w-full max-w-[824px]">
          <div className="flex h-16 items-center gap-3 rounded-[90px] bg-background-elements px-4 drop-shadow-[0px_12px_11.5px_rgba(0,0,0,0.05)] md:px-7">
            <HugeiconsIcon icon={Search01Icon} className="size-5 shrink-0 text-text-subtitle" aria-hidden />
            <input
              type="search"
              value={globalSearch}
              onChange={(e) => onGlobalSearchChange(e.target.value)}
              placeholder={HELP_HERO.searchPlaceholder}
              className="min-w-0 flex-1 bg-transparent text-sm font-medium text-text-main outline-none placeholder:text-text-subtext"
              aria-label="Tüm yardım içeriğinde ara"
            />
          </div>
          <div className="mt-5 flex flex-wrap items-center justify-center gap-2 md:gap-3">
            <span className="text-sm font-medium text-text-subtitle">Popüler</span>
            <div className="flex flex-wrap justify-center gap-2">
              {HELP_POPULAR_TAGS.map((tag) => (
                <button
                  key={tag.id}
                  type="button"
                  onClick={() => onGlobalSearchChange(tag.query)}
                  className="cursor-pointer rounded-full border border-element-border bg-background-elements px-3 py-1.5 text-xs font-medium text-text-main transition-colors hover:border-primary/50 hover:bg-background-element-hover"
                >
                  {tag.label}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
