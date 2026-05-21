"use client"

import Image from "next/image"
import {
  Cancel01Icon,
  ViewIcon,
  ViewOffIcon,
  ArrowDown01Icon,
  Tick02Icon,
  HugeiconsIcon,
} from "@/lib/icons"
import { PlayCircleIcon } from "@hugeicons-pro/core-solid-sharp"
import type { PaymentMethod } from "@/data/wallet"
import type { WalletMode } from "@/components/providers/wallet-modal-provider"
import { cn } from "@/lib/utils"

export const WALLET_BALANCE = "₺15.520.125,52"
export const WALLET_BONUS = "₺100"

function BalanceColumn({
  label,
  value,
  hidden,
  onToggleHide,
}: {
  label: string
  value: string
  hidden: boolean
  onToggleHide: () => void
}) {
  return (
    <div className="flex shrink-0 flex-col">
      <div className="flex items-center gap-2">
        <span className="text-xs font-medium leading-[1.3] text-text-subtext">
          {label}
        </span>
        <button
          type="button"
          onClick={onToggleHide}
          className="text-text-subtext transition-colors hover:text-text-main"
          aria-label={hidden ? `${label} göster` : `${label} gizle`}
        >
          <HugeiconsIcon
            icon={hidden ? ViewOffIcon : ViewIcon}
            className="size-4"
          />
        </button>
      </div>
      <span className="relative block text-sm font-bold leading-5 tracking-wide text-text-main">
        <span
          aria-hidden={hidden}
          className={cn(hidden && "invisible select-none")}
        >
          {value}
        </span>
        {hidden && (
          <span className="absolute left-0 top-0 whitespace-nowrap">
            ••••••
          </span>
        )}
      </span>
    </div>
  )
}

export function WalletModalHeader({
  hideMain,
  hideBonus,
  onToggleMain,
  onToggleBonus,
  onClose,
}: {
  hideMain: boolean
  hideBonus: boolean
  onToggleMain: () => void
  onToggleBonus: () => void
  onClose: () => void
}) {
  return (
    <div className="relative h-[90px] shrink-0  bg-neutral-100">
      <div className="flex gap-[61px] pl-[39px] pt-[27px]">
        <BalanceColumn
          label="Bakiye"
          value={WALLET_BALANCE}
          hidden={hideMain}
          onToggleHide={onToggleMain}
        />
        <BalanceColumn
          label="Bonus Bakiye"
          value={WALLET_BONUS}
          hidden={hideBonus}
          onToggleHide={onToggleBonus}
        />
      </div>
      <button
        type="button"
        onClick={onClose}
        className="absolute right-[23px] top-[29px] flex size-8 items-center justify-center rounded-lg border border-element-border p-2 text-text-subtext transition-colors hover:text-text-main"
        aria-label="Kapat"
      >
        <HugeiconsIcon icon={Cancel01Icon} className="size-4" />
      </button>
    </div>
  )
}

export function MethodChip({
  method,
  selected,
  dimmed,
  onSelect,
}: {
  method: {
    id: string
    name: string
    iconSrc: string
    disabled?: boolean
    comingSoon?: boolean
    iconBg?: string
  }
  selected: boolean
  dimmed?: boolean
  onSelect: () => void
}) {
  const disabled = method.disabled || method.comingSoon

  return (
    <button
      type="button"
      disabled={disabled}
      onClick={onSelect}
      className={cn(
        "relative flex h-12 flex-1 min-w-0 items-center gap-3 rounded-lg border border-transparent bg-background-modal-100 px-4 py-2 text-left transition-colors",
        selected && "border-primary",
        dimmed && !selected && "opacity-50",
        disabled && "cursor-not-allowed"
      )}
    >
      <div
        className={cn(
          "flex size-8 shrink-0 items-center justify-center overflow-hidden",
          method.iconBg && "rounded-full"
        )}
        style={method.iconBg ? { backgroundColor: method.iconBg } : undefined}
      >
        <Image
          src={method.iconSrc}
          alt=""
          width={32}
          height={32}
          className={cn(
            "size-8 object-contain",
            method.comingSoon && "opacity-20"
          )}
        />
      </div>
      <span
        className={cn(
          "truncate text-[13px] text-text-main",
          method.comingSoon && "opacity-20"
        )}
      >
        {method.name}
      </span>
      {method.comingSoon && (
        <span className="absolute right-2 top-1 rounded-[3px] bg-[#25c450] px-1 py-0.5 text-[9px] font-medium text-white">
          Yakında
        </span>
      )}
    </button>
  )
}

/** Figma sağ panel: 313px içerik + ~21px sol padding */
export function DetailPanelShell({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex w-[350px] shrink-0 flex-col border-l border-divider-100">
      <div className="flex flex-col overflow-y-auto pl-5 pr-4 py-3 [&::-webkit-scrollbar]:w-1 [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-thumb]:bg-element-border">
        {children}
      </div>
    </div>
  )
}

export function WalletConfirmCheckbox({
  checked,
  onChange,
  label,
}: {
  checked: boolean
  onChange: (checked: boolean) => void
  label: string
}) {
  return (
    <label className="flex cursor-pointer items-start gap-2">
      <button
        type="button"
        role="checkbox"
        aria-checked={checked}
        onClick={() => onChange(!checked)}
        className={cn(
          "flex size-[22px] shrink-0 items-center justify-center rounded border-2 border-element-border bg-background-elements p-1.5 transition-colors",
          checked && "border-primary"
        )}
      >
        <HugeiconsIcon
          icon={Tick02Icon}
          className={cn(
            "size-2.5 text-primary transition-opacity",
            checked ? "opacity-100" : "opacity-0"
          )}
          strokeWidth={2.5}
        />
      </button>
      <span className="pt-0.5 text-sm font-medium leading-5 tracking-wide text-text-subtext">
        {label}
      </span>
    </label>
  )
}

export function WithdrawDetailHeader({
  method,
  mode,
}: {
  method: PaymentMethod
  mode: WalletMode
}) {
  const title =
    mode === "withdraw" ? `${method.name} Çek` : `${method.name} yatır`

  return (
    <div className="flex items-start justify-between gap-3 py-3">
      <div className="flex min-w-0 items-center gap-3">
        <div
          className="flex size-8 shrink-0 items-center justify-center overflow-hidden rounded-full"
          style={method.iconBg ? { backgroundColor: method.iconBg } : undefined}
        >
          <Image
            src={method.iconSrc}
            alt=""
            width={32}
            height={32}
            className="size-8 object-contain"
          />
        </div>
        <div className="flex min-w-0 flex-col gap-0.5">
          <h2 className="text-base font-bold tracking-wide text-text-main">
            {title}
          </h2>
          <p className="text-[10px] font-medium text-text-subtext">
            {method.categoryLabel}
          </p>
        </div>
      </div>
      <button
        type="button"
        className="flex shrink-0 items-center gap-1 py-2 text-[10px] font-medium text-text-subtext transition-colors hover:text-primary"
      >
        {mode === "withdraw"
          ? "Nasıl çekim yapılır?"
          : "Nasıl yatırım yapılır?"}
        <HugeiconsIcon icon={PlayCircleIcon} className="size-4" />
      </button>
    </div>
  )
}

export function FormFieldLabel({
  children,
  required,
}: {
  children: React.ReactNode
  required?: boolean
}) {
  return (
    <div className="flex h-[17px] items-center gap-1 pl-1.5">
      <span className="text-[10px] font-medium leading-none text-text-subtitle">
        {children}
      </span>
      {required && (
        <span className="text-[10px] font-medium leading-none text-[#b64343]">
          *
        </span>
      )}
    </div>
  )
}

export function FormField({
  label,
  required,
  children,
  className,
}: {
  label: string
  required?: boolean
  children: React.ReactNode
  className?: string
}) {
  return (
    <div className={cn("flex w-full flex-col gap-0.5", className)}>
      <FormFieldLabel required={required}>{label}</FormFieldLabel>
      {children}
    </div>
  )
}

export function FormSelect({
  className,
  children,
  ...props
}: React.SelectHTMLAttributes<HTMLSelectElement>) {
  return (
    <div className="relative w-full">
      <select
        className={cn(
          "h-12 w-full appearance-none rounded-xl border border-element-border bg-background-elements py-2 pl-4 pr-10 text-sm font-medium text-text-main outline-none focus:border-primary",
          className
        )}
        {...props}
      >
        {children}
      </select>
      <HugeiconsIcon
        icon={ArrowDown01Icon}
        className="pointer-events-none absolute right-3 top-1/2 size-4 -translate-y-1/2 text-text-subtext"
      />
    </div>
  )
}

export function DetailFieldLabel({ children }: { children: React.ReactNode }) {
  return (
    <span className="text-xs font-medium text-text-subtitle">{children}</span>
  )
}

export function DetailInput({
  className,
  ...props
}: React.InputHTMLAttributes<HTMLInputElement>) {
  return (
    <input
      className={cn(
        "h-12 w-full rounded-xl border border-element-border bg-background-elements px-4 text-sm text-text-main outline-none placeholder:text-text-subtext focus:border-primary",
        className
      )}
      {...props}
    />
  )
}

export function DetailSelect({
  className,
  children,
  ...props
}: React.SelectHTMLAttributes<HTMLSelectElement>) {
  return (
    <select
      className={cn(
        "h-12 w-full appearance-none rounded-xl border border-element-border bg-background-elements px-4 text-sm text-text-main outline-none focus:border-primary",
        className
      )}
      {...props}
    >
      {children}
    </select>
  )
}

export function AmountPercentChips({
  onSelect,
}: {
  onSelect: (pct: number) => void
}) {
  const chips = [20, 50, 75, 100] as const
  return (
    <div className="flex gap-2">
      {chips.map((pct) => (
        <button
          key={pct}
          type="button"
          onClick={() => onSelect(pct)}
          className="h-8 flex-1 rounded-lg border border-element-border bg-background-elements text-xs font-medium text-text-subtext transition-colors hover:border-primary hover:text-text-main"
        >
          %{pct}
        </button>
      ))}
    </div>
  )
}

export function DetailSubmitButton({
  children,
  disabled,
}: {
  children: React.ReactNode
  disabled?: boolean
}) {
  return (
    <button
      type="button"
      disabled={disabled}
      className="mt-2 flex h-11 w-full shrink-0 items-center justify-center rounded-xl bg-action-secondary-default text-[13px] font-semibold text-white transition-opacity hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-50"
    >
      {children}
    </button>
  )
}
