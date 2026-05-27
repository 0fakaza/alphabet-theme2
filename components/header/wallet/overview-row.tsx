"use client"

import { cn } from "@/lib/utils"
import { HugeiconsIcon, ArrowRight01Icon } from "@/lib/icons"

function WalletSafeIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 40 40"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden
    >
      <path
        d="M9.5 16.5V12.25C9.5 8.79822 12.2982 6 15.75 6H24.25C27.7018 6 30.5 8.79822 30.5 12.25V16.5"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
      <rect x="6.5" y="16.5" width="27" height="17" rx="2" stroke="currentColor" strokeWidth="1.5" />
      <circle cx="20" cy="25" r="4.25" stroke="currentColor" strokeWidth="1.5" />
      <path d="M20 22.75V27.25" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      <circle cx="20" cy="22.75" r="0.75" fill="currentColor" />
      <path d="M14 10.5H26" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  )
}

export function WalletOverviewRow({ onOpenTransfer }: { onOpenTransfer: () => void }) {
  return (
    <button
      type="button"
      onClick={onOpenTransfer}
      className={cn(
        "flex w-full cursor-pointer items-center justify-between gap-3 rounded-xl border border-divider-100 p-4 text-left outline-none transition-colors",
        "hover:border-primary/50 focus-visible:ring-2 focus-visible:ring-primary"
      )}
    >
      <div className="flex min-w-0 flex-1 items-center gap-[15px]">
        <WalletSafeIcon className="size-10 shrink-0 text-text-title" />
        <div className="flex min-w-0 flex-col gap-1.5">
          <p className="text-[15px] font-medium leading-[17px] tracking-[0.3px] text-text-title">
            Cüzdanımı görüntüle
          </p>
          <p className="text-xs font-medium leading-[1.3] text-text-subtext">
            Cüzdanım; sistemin size sunduğu ikinci bir cüzdandır. Bu cüzdandaki bakiye ile
            bahis yapılamaz. Cüzdana bakiye aktarabilir, dilediğinizde oynamak için
            çıkartabilirsiniz.
          </p>
        </div>
      </div>
      <HugeiconsIcon icon={ArrowRight01Icon} className="size-4 shrink-0 text-icon" />
    </button>
  )
}
