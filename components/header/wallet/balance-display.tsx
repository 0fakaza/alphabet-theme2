"use client"

import { cn } from "@/lib/utils"
import { HugeiconsIcon, Cancel01Icon } from "@/lib/icons"
import { ViewIcon, ViewOffIcon } from "@hugeicons-pro/core-solid-rounded"

export const WALLET_POPOVER_BALANCES = [
  { key: "main" as const, label: "Bakiye", value: "₺15.520.125,52" },
  { key: "bonus" as const, label: "Bonus Bakiye", value: "₺100" },
  {
    key: "freebet" as const,
    label: "Freebet Bakiye",
    shortLabel: "Freebet",
    value: "₺100",
  },
]

export const WALLET_TRANSFER_HEADER_BALANCES = [
  { key: "main" as const, label: "Bakiye", value: "₺15.520.125,52" },
  { key: "bonus" as const, label: "Bonus Bakiye", value: "₺100" },
]

export function BalanceValue({
  value,
  hidden,
  className,
}: {
  value: string
  hidden: boolean
  className?: string
}) {
  return (
    <span
      className={cn(
        "relative block text-sm font-bold leading-5 text-text-main md:text-text-title",
        className
      )}
    >
      <span aria-hidden={hidden} className={cn(hidden && "invisible select-none")}>
        {value}
      </span>
      {hidden && (
        <span className="absolute left-0 top-0 whitespace-nowrap">••••••</span>
      )}
    </span>
  )
}

type BalanceItem = {
  key: string
  label: string
  value: string
  shortLabel?: string
}

export function WalletBalanceHeader({
  items,
  hiddenByKey,
  onToggle,
  onClose,
  showDesktopClose = true,
  gapClassName = "gap-x-8 md:gap-x-[61px]",
}: {
  items: readonly BalanceItem[]
  hiddenByKey: Record<string, boolean>
  onToggle: (key: string) => void
  onClose?: () => void
  showDesktopClose?: boolean
  gapClassName?: string
}) {
  return (
    <div className="relative bg-neutral-200 p-3 md:px-10 md:py-6">
      <div className={cn("flex flex-wrap gap-y-3 md:pr-10", gapClassName)}>
        {items.map((item) => {
          const hidden = hiddenByKey[item.key]
          return (
            <div key={item.key} className="flex min-w-0 flex-col gap-0.5">
              <div className="flex items-center gap-2">
                <span className="text-xs font-medium text-text-subtext">
                  <span className="md:hidden">
                    {item.shortLabel ?? item.label}
                  </span>
                  <span className="hidden md:inline">{item.label}</span>
                </span>
                <button
                  type="button"
                  onClick={() => onToggle(item.key)}
                  className="text-text-subtext transition-colors hover:text-text-main"
                  aria-label={hidden ? `${item.label} göster` : `${item.label} gizle`}
                >
                  <HugeiconsIcon
                    icon={hidden ? ViewOffIcon : ViewIcon}
                    className="size-4"
                  />
                </button>
              </div>
              <BalanceValue value={item.value} hidden={hidden} />
            </div>
          )
        })}
      </div>
      {onClose && showDesktopClose && (
        <button
          type="button"
          onClick={onClose}
          className="absolute top-3 right-3 hidden size-8 items-center justify-center rounded-lg border border-element-border bg-background-elements text-icon transition-colors hover:border-primary hover:text-text-main md:top-6 md:right-6 md:flex"
          aria-label="Kapat"
        >
          <HugeiconsIcon icon={Cancel01Icon} className="size-4" />
        </button>
      )}
    </div>
  )
}
