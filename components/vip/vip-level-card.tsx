import Image from "next/image"
import { cn } from "@/lib/utils"
import type { VipLevel } from "@/data/vip"
import { Button } from "@/components/ui/button"

type VipLevelCardProps = {
  level: VipLevel
}

const tierGlowBefore =
  "before:pointer-events-none before:absolute before:right-0 before:top-0 before:z-0 before:size-[156px] before:rounded-full before:opacity-30 before:blur-[67px] before:content-['']"

const tierAccentEmerald = "before:bg-[#7cc300]"

const tierAccentDiamond = "before:bg-[#81A3FF]"

const vipMutedCtaButtonClass =
  "h-[38px] w-full rounded-lg border-0 bg-neutral-700 text-[13px] font-medium text-text-main shadow-none hover:bg-neutral-700 disabled:bg-neutral-700 disabled:text-text-main disabled:opacity-100"

const progressStripeImage =
  "repeating-linear-gradient(-45deg, transparent, transparent 5px, rgba(0,0,0,0.1) 5px, rgba(0,0,0,0.1) 8px)"

export function VipLevelCard({ level }: VipLevelCardProps) {
  const { progressFilledSegments, progressTotalSegments } = level
  const progressFillColor = level.tierAccent === "emerald" ? "#7cc300" : "#81A3FF"
  const progressPct =
    progressTotalSegments > 0
      ? Math.min(100, Math.round((100 * progressFilledSegments) / progressTotalSegments))
      : 0

  return (
    <article
      className={cn(
        "relative flex min-h-[379px] w-full md:max-w-[216px] flex-col overflow-hidden rounded-2xl bg-background-main pb-4 pt-3 ring-1 ring-white/5",
        tierGlowBefore,
        level.tierAccent === "emerald" ? tierAccentEmerald : tierAccentDiamond,
        level.status === "claimed" && "pointer-events-none opacity-60",
      )}
    >
      <div className="relative z-[1] mb-2 flex justify-center px-4">
        <div className="relative flex size-[125px] shrink-0 items-center justify-center">
          <Image
            src={level.iconSrc}
            alt=""
            width={125}
            height={125}
            className="size-[125px] object-contain"
          />
        </div>
      </div>

      <h3 className="relative z-[1] mb-3 text-center text-base font-bold tracking-[0.32px] text-text-main">
        {level.name}
      </h3>

      <div className="relative z-[1] mb-3 px-4">
        <div className="mb-1 flex items-center justify-between text-xs font-medium leading-[1.3]">
          <span className="text-text-main">{level.pointsLabel}</span>
          {level.completionLabel ? (
            <span className="font-bold text-semantic-success">{level.completionLabel}</span>
          ) : (
            <span className="text-text-subtext" />
          )}
        </div>
        <div
          className="relative h-2 w-full overflow-hidden rounded-full bg-neutral-500"
          style={{ backgroundImage: progressStripeImage }}
        >
          <div
            className="h-full rounded-full transition-[width] duration-300 ease-out"
            style={{
              width: `${progressPct}%`,
              backgroundColor: progressFillColor,
              backgroundImage: progressStripeImage,
            }}
            aria-hidden
          />
        </div>
      </div>

      <div className="relative z-[1] mb-4 space-y-0 px-4">
        <div className="flex min-h-10 items-center justify-between border-b border-white/5 text-xs font-medium leading-[1.3] text-text-subtext">
          <span>Geçiş Ödülü</span>
          <span className="tabular-nums text-text-main">{level.transitionReward}</span>
        </div>
        <div className="flex min-h-10 items-center justify-between text-xs font-medium leading-[1.3] text-text-subtext">
          <span>Bahis Limiti</span>
          <span className="tabular-nums text-text-main">{level.betLimit}</span>
        </div>
      </div>

      <div className="relative z-[1] mt-auto px-4">
        {level.status === "locked" ? (
          <Button
            type="button"
            disabled
            variant="secondary"
            className={cn(vipMutedCtaButtonClass, "pointer-events-none cursor-default")}
          >
            Tamamlanmadı
          </Button>
        ) : level.status === "claimed" ? (
          <Button type="button" disabled variant="secondary" className={vipMutedCtaButtonClass}>
            {level.ctaLabel ?? "100 TRY Alındı"}
          </Button>
        ) : level.ctaLabel ? (
          <Button type="button" className="h-[38px] w-full cursor-pointer rounded-lg text-[13px] font-semibold">
            {level.ctaLabel}
          </Button>
        ) : null}
      </div>
    </article>
  )
}
