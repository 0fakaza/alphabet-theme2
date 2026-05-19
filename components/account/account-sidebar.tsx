"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { HugeiconsIcon } from "@/lib/icons"
import {
  Notification01Icon,
  Wallet01Icon,
  GiftIcon,
  Activity01Icon,
  Analytics01Icon,
  Agreement02Icon,
  Logout01Icon,
} from "@/lib/icons"
import { useAuth } from "@/components/providers/auth-provider"
import {
  Calling02Icon,
  FaceIdIcon,
  FileClockIcon,
  GiftCardIcon,
  Hold03Icon,
  SecurityLockIcon,
  User03Icon
} from "@hugeicons-pro/core-stroke-rounded";

const sections = [
  {
    title: "HESAP VE GÜVENLİK",
    items: [
      { label: "Hesabım", href: "/hesabim", icon: User03Icon },
      { label: "Bildirimler", href: "/hesabim/bildirimler", icon: Notification01Icon, badge: 24 },
      { label: "Hesabımı sınırla", href: "/hesabim/sinirlar", icon: Hold03Icon },
    ],
  },
  {
    title: "FİNANSAL İŞLEMLER",
    items: [
      { label: "Cüzdanlarım", href: "/hesabim/cuzdanlarim", icon: Wallet01Icon },
      { label: "Bonuslarım", href: "/hesabim/bonuslarim", icon: GiftIcon, badge: 24 },
      { label: "Geçmiş İşlemlerim", href: "/hesabim/gecmis-islemlerim", icon: FileClockIcon },
      { label: "Hesap Hareketlerim", href: "/hesabim/hesap-hareketlerim", icon: Activity01Icon },
      { label: "İstatistikler", href: "/hesabim/istatistikler", icon: Analytics01Icon },
      { label: "İş Ortaklığım", href: "/hesabim/is-ortakligi", icon: Agreement02Icon },
    ],
  },
  {
    title: "GÜVENLİK VE KİMLİK DOĞRULAMA",
    items: [
      { label: "KYC", href: "/hesabim/kyc", icon: FaceIdIcon },
      { label: "İki Aşamalı Doğrulama", href: "/hesabim/iki-asimali-dogrulama", icon: SecurityLockIcon },
    ],
  },
  {
    title: "DESTEK VE TALEP",
    items: [
      { label: "Bonus Talep Et", href: "/hesabim/bonus-talep", icon: GiftCardIcon },
      { label: "Arama Talep Et", href: "/hesabim/arama-talep", icon: Calling02Icon },
    ],
  },
]

export function AccountSidebar() {
  const pathname = usePathname()
  const { logout } = useAuth()

  return (
    <aside className="flex w-full flex-col gap-5">
      {sections.map((section, si) => (
        <div key={si} className="flex flex-col gap-3">
          <p className="px-0 text-[10px] font-medium uppercase tracking-wider text-text-subtext">
            {section.title}
          </p>
          <div className="flex flex-col">
            {section.items.map((item) => {
              const isActive = pathname === item.href
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    "flex h-11 items-center justify-between rounded-lg px-3.5 mb-1 transition-colors hover:bg-background-elements",
                    isActive && "bg-background-elements",
                  )}
                >
                  <div className="flex items-center gap-2">
                    <HugeiconsIcon
                      icon={item.icon}
                      className={cn("size-5 text-icon", isActive && "text-primary")}
                    />
                    <span className={cn("text-sm font-medium text-text-main", isActive && "text-primary")}>
                      {item.label}
                    </span>
                  </div>
                  {"badge" in item && item.badge && (
                    <span className="flex h-5 items-center justify-center rounded px-1.5 bg-secondary text-[10px] font-bold text-white">
                      {item.badge}
                    </span>
                  )}
                </Link>
              )
            })}
          </div>
          {si < sections.length - 1 && (
            <div className="h-px w-full bg-divider-100" />
          )}
        </div>
      ))}

      <button
        onClick={logout}
        className="flex h-12 items-center gap-2 rounded-lg px-3.5 transition-colors hover:bg-background-elements"
      >
        <HugeiconsIcon icon={Logout01Icon} className="size-5 text-semantic-error" />
        <span className="text-sm font-medium text-semantic-error">Çıkış yap</span>
      </button>
    </aside>
  )
}
