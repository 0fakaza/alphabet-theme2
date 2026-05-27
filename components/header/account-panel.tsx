"use client"

import * as React from "react"
import Link from "next/link"
import {
  Activity01Icon,
  Agreement02Icon,
  BarChartIcon,
  Cancel01Icon,
  GiftIcon,
  HeadphonesIcon,
  HugeiconsIcon,
  Invoice01Icon,
  LimitationIcon,
  Logout01Icon,
  Notification01Icon,
  Shield01Icon,
  UserCheckIcon,
  UserIcon,
  Wallet01Icon,
  type IconSvgElement,
} from "@/lib/icons"
import { useAccountPanel } from "@/components/providers/account-panel-provider"

type MenuItem = {
  href: string
  label: string
  icon: IconSvgElement
  badge?: number
}

type Section = {
  title: string
  items: MenuItem[]
}

const sections: Section[] = [
  {
    title: "HESAP VE GÜVENLİK",
    items: [
      { href: "/account", label: "Hesabım", icon: UserIcon },
      { href: "/account/notifications", label: "Bildirimler", icon: Notification01Icon, badge: 24 },
      { href: "/account/limits", label: "Hesabımı sınırla", icon: LimitationIcon },
    ],
  },
  {
    title: "FİNANSAL İŞLEMLER",
    items: [
      { href: "/account/wallets", label: "Cüzdanlarım", icon: Wallet01Icon },
      { href: "/account/bonuses", label: "Bonuslarım", icon: GiftIcon, badge: 24 },
      { href: "/account/transaction-history", label: "Geçmiş İşlemlerim", icon: Invoice01Icon },
      { href: "/account/account-activity", label: "Hesap Hareketlerim", icon: Activity01Icon },
      { href: "/account/statistics", label: "İstatistikler", icon: BarChartIcon },
      { href: "/account/affiliate", label: "İş Ortaklığım", icon: Agreement02Icon },
    ],
  },
  {
    title: "GÜVENLİK VE KİMLİK DOĞRULAMA",
    items: [
      { href: "/account/kyc", label: "KYC", icon: UserCheckIcon },
      { href: "/account/two-factor-auth", label: "İki Aşamalı Doğrulama", icon: Shield01Icon },
    ],
  },
  {
    title: "DESTEK VE TALEP",
    items: [
      { href: "/account/bonus-request", label: "Bonus Talep Et", icon: GiftIcon },
      { href: "/account/callback-request", label: "Arama Talep Et", icon: HeadphonesIcon },
    ],
  },
]

interface AccountPanelProps {
  showCloseButton?: boolean
}

export function AccountPanel({ showCloseButton = false }: AccountPanelProps) {
  const { close } = useAccountPanel()

  return (
    <div className="flex h-full flex-col overflow-hidden rounded-xxl">
      
      <div className="flex shrink-0 items-center justify-between px-5 py-5">
        <div className="flex items-center gap-3">
          <span
            className="flex size-11 shrink-0 items-center justify-center rounded-[10px] text-lg font-bold text-white"
            style={{
              backgroundImage:
                "linear-gradient(210deg, rgba(195,13,13,0) 59%, rgb(195,13,13) 108%), radial-gradient(ellipse at 26% 23%, #872aff 0%, #a350ff 25%, #bf75ff 50%, #db9bff 75%, #f6c1ff 100%)",
            }}
          >
            C
          </span>
          <div className="flex flex-col gap-0.5">
            <span className="text-[15px] font-semibold text-text-main">cagcreative</span>
            <span className="text-[12px] text-text-subtext">ID: 33895487</span>
          </div>
        </div>
        {showCloseButton && (
          <button
            onClick={close}
            className="flex size-11 items-center justify-center rounded-full bg-neutral-200 text-icon outline-none transition-colors hover:text-text-main"
          >
            <HugeiconsIcon icon={Cancel01Icon} className="size-5" />
          </button>
        )}
      </div>

      
      <div className="flex-1 overflow-y-auto [&::-webkit-scrollbar]:hidden">
        {sections.map((section, si) => (
          <div key={section.title}>
            {si > 0 && <div className="mx-5 border-t border-divider-100" />}
            <div className="px-5 pb-2 pt-4">
              <p className="mb-2 text-[11px] font-semibold uppercase tracking-[0.6px] text-text-subtext">
                {section.title}
              </p>
              <ul>
                {section.items.map((item) => (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      onClick={close}
                      className="flex items-center gap-3 rounded-lg px-2 py-2.5 transition-colors hover:bg-neutral-200/40"
                    >
                      <HugeiconsIcon icon={item.icon} className="size-[18px] shrink-0 text-icon" />
                      <span className="flex-1 text-[13px] font-medium text-text-main">
                        {item.label}
                      </span>
                      {item.badge !== undefined && (
                        <span className="flex h-5 min-w-[22px] items-center justify-center rounded-md bg-action-secondary-default px-1.5 text-[11px] font-bold text-white">
                          {item.badge}
                        </span>
                      )}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        ))}

        
        <div className="px-5 pb-6 pt-4">
          <button
            className="flex items-center gap-3 rounded-lg px-2 py-2.5 outline-none transition-opacity hover:opacity-70"
            onClick={close}
          >
            <HugeiconsIcon icon={Logout01Icon} className="size-[18px] text-red-500" />
            <span className="text-[13px] font-medium text-red-500">Çıkış yap</span>
          </button>
        </div>
      </div>
    </div>
  )
}
