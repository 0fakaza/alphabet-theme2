"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { FootballIcon, HugeiconsIcon, MenuCollapseIcon } from "@/lib/icons"

import { Cards02Icon } from "@hugeicons-pro/core-solid-standard"
import { GiftIcon, User03Icon } from "@hugeicons-pro/core-bulk-rounded"
import { useAccountPanel } from "@/components/providers/account-panel-provider"
import { useMobileMenu } from "@/components/providers/mobile-menu-provider"

const navItems = [
  { href: "/menu", label: "Menü", icon: MenuCollapseIcon, isMenu: true },
  { href: "/casino", label: "Casino", icon: Cards02Icon },
  { href: "/spor", label: "Spor", icon: FootballIcon },
  { href: "/promotions", label: "Promosyonlar", icon: GiftIcon },
  { href: "/account", label: "Profil", icon: User03Icon, isProfile: true },
]


const duotoneBarPaths = new Set<string>(["/casino", "/promotions", "/account"])

const duotoneColors = (active: boolean) =>
  active
    ? {
        primaryColor: "color-mix(in oklab, var(--primary) 42%, #b9a6f0 58%)",
        secondaryColor: "color-mix(in oklab, var(--primary) 70%, #14111f 30%)",
        disableSecondaryOpacity: true,
      }
    : {
        primaryColor: "var(--icon)",
        secondaryColor: "var(--text-subText)",
        disableSecondaryOpacity: true,
      }

const BottomBar = () => {
  const pathname = usePathname()
  const { open: openAccountPanel, close: closeAccountPanel, isOpen: accountPanelOpen } = useAccountPanel()
  const { toggle: toggleMenu, close: closeMenu, isOpen: menuOpen } = useMobileMenu()

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 md:hidden">
      <div className="flex items-center justify-around border-t border-divider-100 bg-background-header-menu px-2 pb-safe">
        {navItems.map((item) => {
          const isActive = !menuOpen && !accountPanelOpen && pathname.startsWith(item.href)
          const isDuotone = duotoneBarPaths.has(item.href)
          const duotoneActive = isDuotone && (item.isProfile ? accountPanelOpen : isActive)
          const duotoneProps = isDuotone ? duotoneColors(duotoneActive) : null

          if (item.isMenu) {
            return (
              <button
                key={item.href}
                onClick={() => { closeAccountPanel(); toggleMenu() }}
                className="flex flex-col items-center gap-1 py-3 outline-none"
              >
                <HugeiconsIcon
                  icon={item.icon}
                  className={`size-[28px] transition-colors ${menuOpen ? "text-primary" : "text-icon"}`}
                />
                <span
                  className={`text-[10px] font-medium transition-colors ${
                    menuOpen ? "text-primary" : "text-text-subtext"
                  }`}
                >
                  {item.label}
                </span>
              </button>
            )
          }

          if (item.isProfile) {
            return (
              <button
                key={item.href}
                onClick={() => { closeMenu(); openAccountPanel() }}
                className="flex flex-col items-center gap-1 py-3 outline-none"
              >
                <HugeiconsIcon
                  icon={item.icon}
                  className={duotoneProps ? "size-[28px]" : `size-[28px] transition-colors ${accountPanelOpen ? "text-primary" : "text-icon"}`}
                  {...(duotoneProps ?? {})}
                />
                <span
                  className={`text-[10px] font-medium transition-colors ${
                    accountPanelOpen ? "text-primary" : "text-text-subtext"
                  }`}
                >
                  {item.label}
                </span>
              </button>
            )
          }

          return (
            <Link
              key={item.href}
              href={item.href}
              onClick={() => { closeMenu(); closeAccountPanel() }}
              className="flex flex-col items-center gap-1 py-3"
            >
              <HugeiconsIcon
                icon={item.icon}
                className={duotoneProps ? "size-[28px]" : `size-[28px] transition-colors ${isActive ? "text-primary" : "text-icon"}`}
                {...(duotoneProps ?? {})}
              />
              <span
                className={`text-[11px] font-medium transition-colors ${
                  isActive ? "text-primary" : "text-text-subtext"
                }`}
              >
                {item.label}
              </span>
            </Link>
          )
        })}
      </div>
    </nav>
  )
}

export default BottomBar
