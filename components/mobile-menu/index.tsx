"use client"

import Link from "next/link"
import Image from "next/image"
import { usePathname } from "next/navigation"
import { Agreement02Icon, ArrowUpRight01Icon, GiftIcon, HugeiconsIcon, PromotionIcon } from "@/lib/icons"
import { ComingSoonBadge } from "@/components/elements/coming-soon-badge"
import { ButtonLink } from "@/components/elements/button"
import { categoryTabs, isCategoryTabActive, sidebarLinks, crashGames, navLinks } from "@/components/header/data"
import { useMobileMenu } from "@/components/providers/mobile-menu-provider"

export function MobileMenu() {
  const { isOpen, close } = useMobileMenu()
  const pathname = usePathname()

  if (!isOpen) return null

  return (
    <div className="fixed left-0 right-0 top-[58px] z-[55] h-[calc(100dvh-58px-64px)] overflow-y-auto bg-background-modal [&::-webkit-scrollbar]:hidden md:hidden">
      <div className="flex flex-col">

        
        <div className="pt-4">
          <ul className="flex flex-col">
            {categoryTabs.map((tab) => {
              const isActive = isCategoryTabActive(pathname, tab.href)
              return (
                <li key={tab.href}>
                  <Link
                    href={tab.href}
                    onClick={close}
                    aria-current={isActive ? "page" : undefined}
                    className={`flex items-center gap-3 rounded-lg px-3 py-3 transition-colors ${
                      isActive ? "text-primary" : "text-text-main hover:text-primary"
                    }`}
                  >
                    <HugeiconsIcon
                      icon={tab.icon}
                      className={`size-5 shrink-0 ${isActive ? "text-primary" : "text-icon"}`}
                    />
                    <span className="text-[14px] font-medium">{tab.label}</span>
                  </Link>
                </li>
              )
            })}
          </ul>
        </div>

        
        <div className="pb-3">
          <Link
            href="/bonus-talep"
            onClick={close}
            className="flex items-center gap-3 rounded-lg px-3 py-3 text-text-main transition-colors hover:text-primary"
          >
            <HugeiconsIcon icon={GiftIcon} className="size-5 shrink-0 text-icon" />
            <span className="text-[14px] font-medium">Bonus Talep</span>
          </Link>
          <Link
            href="/promotions"
            onClick={close}
            className="flex items-center gap-3 rounded-lg px-3 py-3 text-text-main transition-colors hover:text-primary"
          >
            <HugeiconsIcon icon={PromotionIcon} className="size-5 shrink-0 text-icon" />
            <span className="text-[14px] font-medium">Promosyonlar</span>
          </Link>
        </div>

        <div className="mx-4 border-t border-divider-100" />

        
        <div className="px-3 py-4">
          {sidebarLinks.map((link, i) => {
            if (link.type === "accordion") {
              return (
                <div key={i}>
                  <span className="flex items-center py-2.5 text-[14px] font-medium text-text-main">{link.label}</span>
                  <div className="pl-3">
                    {link.submenu.map((sub, j) => (
                      <Link key={j} href={sub.href} onClick={close} className="flex items-center py-2 text-[13px] text-text-subtext hover:text-primary">
                        {sub.label}
                      </Link>
                    ))}
                  </div>
                </div>
              )
            }
            const comingSoon = link.comingSoon
            return (
              <Link
                key={i}
                href={link.href}
                onClick={!comingSoon ? close : undefined}
                className={`flex items-center py-2.5 text-[14px] font-medium transition-colors ${
                  comingSoon ? "pointer-events-none text-text-subtext" : "text-text-main hover:text-primary"
                }`}
              >
                <span>{link.label}</span>
                {link.badge ? (
                  <ComingSoonBadge>{link.badge}</ComingSoonBadge>
                ) : (
                  <HugeiconsIcon icon={ArrowUpRight01Icon} className="ml-2 size-4 text-icon" />
                )}
              </Link>
            )
          })}
        </div>

        <div className="mx-4 border-t border-divider-100" />

        
        <div className="py-4">
          <div className="mb-3 flex items-center justify-between px-4">
            <h3 className="text-[15px] font-semibold text-text-title">Crash Games</h3>
            <Link
              href="/crash-games"
              onClick={close}
              className="text-[12px] text-text-subtext underline transition-colors hover:text-primary"
            >
              Tümü ({crashGames.length * 15})
            </Link>
          </div>
          <div className="flex gap-2.5 overflow-x-auto px-4 pb-1 [&::-webkit-scrollbar]:hidden">
            {crashGames.map((game) => (
              <Link
                key={game.name}
                href={`/games/${game.name.toLowerCase()}`}
                onClick={close}
                className="flex shrink-0 flex-col items-center gap-1.5"
              >
                <Image
                  src={game.image}
                  alt={game.name}
                  width={72}
                  height={72}
                  className="size-[72px] rounded-xl object-cover"
                />
                <span className="text-[11px] font-medium text-text-main">{game.name}</span>
                <span className="text-[10px] text-text-subtext">
                  <span className="mr-1 inline-block size-1.5 rounded-full bg-green-400" style={{ verticalAlign: "middle" }} />
                  {game.players.toLocaleString("tr-TR")}
                </span>
              </Link>
            ))}
          </div>
        </div>

        <div className="mx-4 border-t border-divider-100" />

        
        <div className="grid grid-cols-2 gap-x-4 px-7 py-4">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={close}
              className={`py-2 text-[14px] font-medium transition-colors ${
                link.highlight
                  ? "text-primary"
                  : "text-text-main hover:text-primary"
              }`}
            >
              {link.label}
            </Link>
          ))}
        </div>

        <div className="mx-4 border-t border-divider-100" />

        
        <div className="Header-megaMenu-right flex flex-col justify-between px-5 py-8">
          <div className="mb-3 flex items-center gap-2">
            <HugeiconsIcon icon={Agreement02Icon} className="size-5 text-primary" />
            <span className="text-sm text-action-primary-on-primary">İş Ortaklığı</span>
          </div>
          <div>
            <p className="mb-1 text-lg font-semibold tracking-wider" style={{ color: "#BF7DDC" }}>
              AFFILIATE
            </p>
            <p className="mb-2 max-w-[280px] text-[22px] font-semibold leading-7 text-action-primary-on-primary">
              %50&apos;ye varan kazanç oranlarını yakalayın
            </p>
            <ButtonLink
              href="/affiliate"
              onClick={close}
              variant="link"
              className="text-xs text-action-primary-on-primary"
            >
              Detaylı bilgi edin
            </ButtonLink>
          </div>
          <div className="mt-6 flex items-center gap-1.5 text-text-subtext">
            <Image src="/images/logo-light.svg" alt="Alphabe" width={80} height={18} />
            <span className="text-[10px]">X PARTNERS</span>
          </div>
        </div>

      </div>
    </div>
  )
}
