"use client"

import { useEffect, useState } from "react"
import Image from "next/image"
import { Copy01Icon, HugeiconsIcon } from "@/lib/icons"
import type { PaymentMethod } from "@/data/wallet"
import {
  buildQrCodeUrl,
  getDepositAddress,
  getDepositMinLabel,
  getNetworkShortName,
} from "@/lib/wallet-deposit"
import {
  DetailPanelShell,
  FormField,
  FormSelect,
  WithdrawDetailHeader,
} from "./shared"

function InfoBadge({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-lg border border-divider-100 px-2 py-2">
      <p className="text-[10px] font-medium leading-none text-text-subtext">
        {label}
      </p>
      <p className="mt-0.5 text-[13px] tracking-wide text-text-main">{value}</p>
    </div>
  )
}

export function DepositDetailPanel({ method }: { method: PaymentMethod }) {
  const networks = method.networks ?? []
  const isCrypto = networks.length > 0
  const [network, setNetwork] = useState(networks[0] ?? "")
  const [copied, setCopied] = useState(false)

  const walletAddress = getDepositAddress(method.id)
  const networkShort = network ? getNetworkShortName(network) : "—"
  const minLabel = getDepositMinLabel(method)
  const qrSrc = buildQrCodeUrl(walletAddress, 124)

  useEffect(() => {
    setNetwork(method.networks?.[0] ?? "")
    setCopied(false)
  }, [method.id])

  useEffect(() => {
    setCopied(false)
  }, [network])

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(walletAddress)
      setCopied(true)
      window.setTimeout(() => setCopied(false), 2000)
    } catch {
      /* clipboard unavailable */
    }
  }

  return (
    <DetailPanelShell>
      <div className="flex w-full flex-col gap-2">
        <WithdrawDetailHeader method={method} mode="deposit" />

        {isCrypto && (
          <FormField label="Ağ seçin" required>
            <FormSelect
              value={network}
              onChange={(e) => setNetwork(e.target.value)}
            >
              {networks.map((n) => (
                <option key={n} value={n}>
                  {n}
                </option>
              ))}
            </FormSelect>
          </FormField>
        )}

        {isCrypto && (
        <div className="relative mx-auto flex w-full max-w-[258px] flex-col items-center py-2">
          <div
            className="pointer-events-none absolute inset-x-4 top-6 h-[182px] opacity-40"
            style={{
              backgroundImage:
                "radial-gradient(circle, rgba(172,150,253,0.35) 1px, transparent 1px)",
              backgroundSize: "10px 10px",
            }}
            aria-hidden
          />
          <div className="relative  flex size-[148px] items-center justify-center rounded-[18px] border border-divider-100 bg-white/10 p-3 backdrop-blur-[2px]">
            <Image
              src={qrSrc}
              alt={`${method.name} yatırım QR kodu`}
              width={124}
              height={124}
              className="size-[124px] rounded-xl bg-white object-contain"
              unoptimized
            />
          </div>
        </div>
        )}

        {isCrypto && (
        <div className="flex flex-wrap justify-center gap-2">
          <InfoBadge label="Network" value={networkShort} />
          <InfoBadge label="Minimum" value={minLabel} />
        </div>
        )}

        {isCrypto ? (
        <FormField label="Cüzdan adresi" required>
          <div className="relative">
            <input
              readOnly
              value={walletAddress}
              className="h-12 w-full truncate rounded-xl border border-element-border bg-background-elements py-2 pl-4 pr-12 text-sm font-medium text-text-main outline-none"
            />
            <button
              type="button"
              onClick={handleCopy}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-text-subtext transition-colors hover:text-primary"
              aria-label="Adresi kopyala"
            >
              <HugeiconsIcon icon={Copy01Icon} className="size-5" />
            </button>
          </div>
          {copied && (
            <p className="pl-1.5 text-[10px] font-medium text-primary">
              Kopyalandı
            </p>
          )}
        </FormField>
        ) : (
          <div className="flex flex-wrap gap-2 py-2">
            <InfoBadge label="Minimum" value={method.min} />
            <InfoBadge label="Süre" value={method.duration} />
          </div>
        )}
      </div>
    </DetailPanelShell>
  )
}
