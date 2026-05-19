"use client"

import { HugeiconsIcon } from "@/lib/icons"
import { HELP_HERO } from "@/data/help"
import { ArrowTurnBackwardIcon } from "@hugeicons-pro/core-solid-sharp"

type HelpMobilePanelHeaderProps = {
  categoryTitle: string
  onBack: () => void
}

export function HelpMobilePanelHeader({ categoryTitle, onBack }: HelpMobilePanelHeaderProps) {
  return (
    <>
      <div className="mb-6 lg:hidden">
        <button type="button" onClick={onBack} className="flex flex-col items-start gap-1 text-left">
          <span className="flex items-center gap-2">
            <HugeiconsIcon icon={ArrowTurnBackwardIcon} className="size-6 shrink-0 text-text-main" aria-hidden />
            <span className="text-base font-semibold text-primary">{HELP_HERO.title}</span>
          </span>
          <span className="pl-8 text-[10px] font-medium tracking-wide text-text-subtext">GERİ DÖN</span>
        </button>
      </div>

      <div className="mb-8 flex flex-col gap-3 text-center lg:hidden">
        <h2 className="text-xl font-bold tracking-wide text-text-title">{categoryTitle}</h2>
        <p className="text-sm font-normal leading-[22px] tracking-wide text-text-subtext">{HELP_HERO.subtitle}</p>
      </div>
    </>
  )
}
