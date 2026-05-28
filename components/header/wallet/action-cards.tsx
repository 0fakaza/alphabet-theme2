"use client"

import Image from "next/image"
import { cn } from "@/lib/utils"
import type { WalletMode } from "@/components/providers/wallet-modal-provider"
import { WalletCardDotPattern } from "./wallet-card-dot-pattern"

const DEPOSIT_ACTION_ICON = "/images/icons/depozit.svg"
const WITHDRAW_ACTION_ICON = "/images/icons/withdrawal.svg"

const walletActionCardSurface =
  "border border-wallet-action-card-border bg-wallet-action-card shadow-[inset_1px_1px_1px_var(--wallet-action-card-inset)]"

type WalletActionCardProps = {
  mode: WalletMode
  onSelect: () => void
}

function CardIconDecor({ isDeposit }: { isDeposit: boolean }) {
  const accent = isDeposit ? "#9bbc14" : "#f40000"
  const shadow = isDeposit
    ? "rgba(155,188,20,0.45)"
    : "rgba(244,0,0,0.45)"

  return (
    <div className="relative size-[52px] shrink-0 md:size-[80px]">
      <span
        className="absolute -top-1.5 -right-1 size-8 rounded-full opacity-60 blur-md md:size-10"
        style={{ backgroundColor: accent }}
        aria-hidden
      />
      <span
        className="absolute bottom-0 left-1 size-8 rounded-full opacity-50 blur-md md:size-10"
        style={{ backgroundColor: accent }}
        aria-hidden
      />
      <div
        className="relative flex size-[52px] items-center justify-center rounded-full md:size-[80px]"
        style={{
          backgroundColor: accent,
          boxShadow: `0 12px 32px ${shadow}`,
        }}
      >
        <Image
          src={isDeposit ? DEPOSIT_ACTION_ICON : WITHDRAW_ACTION_ICON}
          alt=""
          width={40}
          height={40}
          className="size-10 object-contain md:size-10"
        />
      </div>
    </div>
  )
}

function WalletActionCardMobile({ mode, onSelect }: WalletActionCardProps) {
  const isDeposit = mode === "deposit"

  return (
    <button
      type="button"
      onClick={onSelect}
      className={cn(
        "relative flex min-h-[97px] w-full items-center overflow-hidden rounded-lg text-left outline-none transition-all md:hidden",
        walletActionCardSurface,
        "ring-0 ring-transparent focus-visible:ring-0",
        "hover:ring-2",
        isDeposit ? "hover:ring-[#9bbc14]" : "hover:ring-[#f40000]"
      )}
    >
      <WalletCardDotPattern variant="mobile" />
      <div
        className={cn(
          "pointer-events-none absolute inset-0 opacity-20",
          isDeposit
            ? "bg-[radial-gradient(ellipse_at_0%_50%,#9bbc14_0%,transparent_60%)]"
            : "bg-[radial-gradient(ellipse_at_0%_50%,#e94b4b_0%,transparent_60%)]"
        )}
        aria-hidden
      />

      <div className="relative z-10 flex shrink-0 items-center pl-[17px] pr-3">
        <CardIconDecor isDeposit={isDeposit} />
      </div>

      <div className="relative z-10 flex min-w-0 flex-1 flex-col justify-center gap-1 py-4 pr-4">
        <p className="text-[15px] font-medium leading-snug text-text-title">
          {isDeposit ? "Para yatırmak istiyorum" : "Para çekmek istiyorum"}
        </p>
        <p className="text-xs leading-4 text-text-subtext">
          {isDeposit
            ? "20sn'ye varan yatırım süreleri ile hemen yatır bonuslar ile kazançları katlayarak başla."
            : "Hızlı, kolay, zahmetsiz çekim yapın."}
        </p>
      </div>
    </button>
  )
}

function WalletActionCardDesktop({ mode, onSelect }: WalletActionCardProps) {
  const isDeposit = mode === "deposit"

  return (
    <button
      type="button"
      onClick={onSelect}
      className={cn(
        "relative hidden min-h-[227px] min-w-0 flex-1 cursor-pointer flex-col items-center overflow-hidden rounded-2xl px-4 pb-5 pt-1.5 text-center outline-none transition-all md:flex md:max-w-[341px]",
        walletActionCardSurface,
        "before:pointer-events-none before:absolute before:inset-0 before:rounded-2xl before:opacity-20",
        "ring-0 ring-transparent focus-visible:ring-0",
        isDeposit
          ? "before:bg-[radial-gradient(ellipse_at_20%_0%,#9bbc14_0%,transparent_55%)] hover:ring-2 hover:ring-[#9bbc14]"
          : "before:bg-[radial-gradient(ellipse_at_20%_0%,#e94b4b_0%,transparent_55%)] hover:ring-2 hover:ring-[#f40000]"
      )}
    >
      <WalletCardDotPattern variant="desktop" />

      {!isDeposit && (
        <p className="absolute right-3 top-3 text-[11px] tracking-wide text-text-subtext">
          Tahmini süreler <span className="text-text-title">5dk</span>
        </p>
      )}

      <div className="relative z-10 mt-6">
        <CardIconDecor isDeposit={isDeposit} />
      </div>

      <div className="relative z-10 mt-6 flex max-w-[270px] flex-col gap-1.5">
        <p className="text-[15px] font-medium tracking-wide text-text-title">
          {isDeposit ? "Para yatırmak istiyorum" : "Para çekmek istiyorum"}
        </p>
        <p className="text-xs leading-[17px] tracking-wide text-text-subtext">
          {isDeposit ? (
            <>
              20sn&apos;ye varan yatırım süreleri ile hemen yatır
              <br />
              bonuslar ile kazançları katlayarak başla.
            </>
          ) : (
            "Hızlı, kolay, zahmetsiz çekim yapın."
          )}
        </p>
      </div>
    </button>
  )
}

export function WalletActionCard(props: WalletActionCardProps) {
  return (
    <>
      <WalletActionCardMobile {...props} />
      <WalletActionCardDesktop {...props} />
    </>
  )
}
