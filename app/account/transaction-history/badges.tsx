import Image from "next/image"
import { cn } from "@/lib/utils"
import type { KuponStatus, KuponType, OdemeStatus } from "./types"

const historyTableCellNowrap = "max-md:whitespace-nowrap"

export function KuponStatusBadge({ s }: { s: KuponStatus }) {
  const map: Record<
    KuponStatus,
    { label: string; cls: string; dotCls: string }
  > = {
    beklemede: {
      label: "Beklemede",
      cls: "bg-amber-500/15 text-amber-400",
      dotCls: "bg-amber-400",
    },
    kazandi: {
      label: "Kazandı",
      cls: "bg-green-500/15 text-green-400",
      dotCls: "bg-green-400",
    },
    kaybetti: {
      label: "Kaybetti",
      cls: "bg-red-500/15 text-red-400",
      dotCls: "bg-red-400",
    },
    satildi: {
      label: "Satıldı",
      cls: "bg-orange-500/15 text-orange-400",
      dotCls: "bg-orange-400",
    },
    freebet: {
      label: "Freebet",
      cls: "bg-blue-500/15 text-blue-400",
      dotCls: "bg-blue-400",
    },
    iptal: {
      label: "İptal",
      cls: "bg-neutral-500/30 text-text-subtext",
      dotCls: "bg-text-subtext",
    },
  }
  const { label, cls, dotCls } = map[s]
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-[7px] px-2 py-1 text-[11px] font-semibold",
        historyTableCellNowrap,
        cls
      )}
    >
      <span
        className={cn("size-1.5 shrink-0 rounded-full", dotCls)}
        aria-hidden
      />
      {label}
    </span>
  )
}

export function KuponTypeBadge({ t }: { t: KuponType }) {
  const map: Record<KuponType, { label: string; cls: string }> = {
    tekli: { label: "Tekli Bahis", cls: "bg-primary/20 text-primary" },
    kombine: { label: "Kombine", cls: "bg-orange-500/20 text-orange-400" },
    coklu: { label: "Çoklu", cls: "bg-teal-500/20 text-teal-400" },
  }
  const { label, cls } = map[t]
  return (
    <span className={cn("rounded-md px-2 py-0.5 text-[11px] font-medium", cls)}>
      {label}
    </span>
  )
}

const kuponTypeCellConfig: Record<
  KuponType,
  { label: string; icon?: string }
> = {
  tekli: {
    label: "Tekli Bahis",
    icon: "/images/icons/kuponTipi-tekli.svg",
  },
  kombine: {
    label: "Kombine",
    icon: "/images/icons/kuponTipi-kombine.svg",
  },
  coklu: {
    label: "Çoklu",
    icon: "/images/icons/kuponTipi-multi.svg",
  },
}

export function KuponTypeCell({ t }: { t: KuponType }) {
  const { label, icon } = kuponTypeCellConfig[t]
  return (
    <div
      className={cn(
        "flex items-center gap-1.5 text-xs font-medium text-text-main",
        historyTableCellNowrap
      )}
    >
      {icon && (
        <Image src={icon} alt="" width={24} height={24} className="shrink-0" />
      )}
      <span>{label}</span>
    </div>
  )
}

export function OdemeBadge({ s }: { s: OdemeStatus }) {
  const map: Record<OdemeStatus, { label: string; cls: string }> = {
    onaylandi: { label: "✓ Onaylandı", cls: "bg-green-500/15 text-green-400" },
    reddedildi: { label: "Reddedildi", cls: "bg-red-500/15 text-red-400" },
    bekliyor: { label: "Onay bekliyor", cls: "bg-amber-500/15 text-amber-400" },
    kyc: { label: "KYC İzlendi", cls: "bg-primary/15 text-primary" },
  }
  const { label, cls } = map[s]
  return (
    <span
      className={cn(
        "rounded-md px-2.5 text-nowrap py-1 text-[11px] font-medium",
        cls
      )}
    >
      {label}
    </span>
  )
}
