"use client"

import { useState, useEffect, useRef } from "react"
import { cn } from "@/lib/utils"
import Link from "next/link"
import Image from "next/image"
import { useTheme } from "next-themes"
import { usePathname } from "next/navigation"
import {
  Agreement02Icon,
  ArrowDown01Icon,
  ArrowUpRight01Icon,
  GiftIcon,
  HugeiconsIcon,
  MessageMultiple01Icon,
  Menu01Icon,
  Notification01Icon,
  PlayIcon,
  PlusSignIcon,
  PromotionIcon,
} from "@/lib/icons"
import { Button, ButtonLink } from "@/components/elements/button"
import { CurrencyBadge } from "@/components/elements/currency-badge"
import { ComingSoonBadge } from "@/components/elements/coming-soon-badge"
import { WalletDropdown } from "./wallet-dropdown"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { languages, navLinks, categoryTabs, crashGames, sidebarLinks, isCategoryTabActive } from "./data"
import { NotificationPanel } from "./notification-panel"
import { AccountPanel } from "./account-panel"
import { useAccountPanel } from "@/components/providers/account-panel-provider"
import {
  Task01Icon,
  GiftIcon as GiftSolidIcon,
  RainIcon,
  Award01Icon,
  ShoppingCart01Icon,
} from "@hugeicons-pro/core-solid-rounded"
import { useLoginModal } from "@/components/providers/login-modal-provider"
import { useRegisterModal } from "@/components/providers/register-modal-provider"
import { useWalletModal } from "@/components/providers/wallet-modal-provider"
import { useAuth } from "@/components/providers/auth-provider"
const Header = () => {
  const [megaMenuOpen, setMegaMenuOpen] = useState(false)
  const [hideBalances, setHideBalances] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [notificationOpen, setNotificationOpen] = useState(false)
  const { isOpen: accountPanelOpen, open: openAccountPanel, close: closeAccountPanel } = useAccountPanel()
  const { open: openLoginModal } = useLoginModal()
  const { open: openRegisterModal } = useRegisterModal()
  const { open: openWalletModal } = useWalletModal()
  const { isLoggedIn } = useAuth()
  const { resolvedTheme } = useTheme()
  const [mounted, setMounted] = useState(false)
  const headerRef = useRef<HTMLElement>(null)
  const pathname = usePathname()
  useEffect(() => setMounted(true), [])
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10)
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => window.removeEventListener("scroll", onScroll)
  }, [])
  useEffect(() => {
    document.body.style.overflow = megaMenuOpen ? "hidden" : ""
    return () => { document.body.style.overflow = "" }
  }, [megaMenuOpen])
  const logoSrc = mounted && resolvedTheme === "light" ? "/images/logo-dark.svg" : "/images/logo-light.svg"

  return (
    <header ref={headerRef} className="Header sticky top-0 z-50 w-full shadow-[0_1px_4px_0_rgba(0,0,0,0.05)] dark:shadow-[0_1px_4px_0_rgba(0,0,0,0.4)]">
      {/* Üst Satır */}
      <div className=" bg-background-header  text-white">
        <div className="container flex items-center justify-between transition-[height] duration-300  h-[58px]" >
          {/* Sol: Logo + Linkler */}
          <div className="flex items-center gap-6">
            <Link href="/">
              <Image src={logoSrc} alt="Alphabe" width={128} height={27} className="h-[23px] w-auto md:h-[27px]" />
            </Link>

            <nav className="hidden items-center gap-4 text-sm text-header-text-secondary md:flex">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`transition-colors duration-400 hover:text-primary ${
                    link.highlight
                      ? "text-primary underline underline-offset-3"
                      : ""
                  }`}
                >
                  {link.label}
                </Link>
              ))}
            </nav>
          </div>

          <div>
            <WalletDropdown hideBalances={hideBalances} onToggleHide={() => setHideBalances((v) => !v)}>
              <div className="flex h-[40px] cursor-pointer items-center justify-between rounded-full border border-neutral-300 bg-neutral-100 pl-[9px] pr-[6px] py-[6px] w-[163px] md:border-transparent md:bg-header-wallet md:h-auto md:py-1.5 md:pl-1.5 md:pr-1.5">
                <div className="flex items-center gap-1.5">
                  <CurrencyBadge currency="TRY" />
                  <span className="text-[13px] font-medium tracking-[0.26px] text-header-text-primary">
                    {hideBalances ? "••••" : "3.520,52"}
                  </span>
                </div>
                <button
                  onClick={(e) => { e.stopPropagation(); openWalletModal("deposit") }}
                  className="cursor-pointer flex size-7 items-center justify-center rounded-full bg-deposit text-white transition-colors duration-400 hover:brightness-110"
                >
                  <HugeiconsIcon icon={PlusSignIcon} className="size-3" />
                </button>
              </div>
            </WalletDropdown>
          </div>



          {/* Sağ: Auth + Destek + Dil */}
          <div className="flex items-center gap-5">
            {isLoggedIn ? (
              <div className="relative hidden items-center gap-5 md:flex">
                <button
                  onClick={() => setNotificationOpen((v) => !v)}
                  className="relative cursor-pointer p-1 text-header-icon outline-none transition-colors duration-400 hover:text-header-icon-hover"
                >
                  <HugeiconsIcon icon={Notification01Icon} className="size-5" />
                  <span className="absolute right-1 top-1 size-1 rounded-full bg-primary" />
                </button>

                {/* Desktop dropdown panel */}
                {notificationOpen && (
                  <>
                    <div
                      className="fixed inset-0 z-[49]"
                      onClick={() => setNotificationOpen(false)}
                    />
                    <div className="absolute right-0 top-[calc(100%+14px)] z-[50] flex w-[400px] h-[580px] flex-col overflow-hidden rounded-2xl border border-divider-100 bg-background-modal shadow-2xl">
                      <NotificationPanel onClose={() => setNotificationOpen(false)} />
                    </div>
                  </>
                )}
                <button
                  onClick={openAccountPanel}
                  className="flex items-center gap-2 outline-none"
                >
                  <span
                    className="flex size-7 items-center justify-center rounded-[5px] text-base font-bold text-white"
                    style={{
                      backgroundImage:
                        "linear-gradient(210deg, rgba(195,13,13,0) 59%, rgb(195,13,13) 108%), radial-gradient(ellipse at 26% 23%, #872aff 0%, #a350ff 25%, #bf75ff 50%, #db9bff 75%, #f6c1ff 100%)",
                    }}
                  >
                    C
                  </span>
                  <span className="text-[13px] font-semibold text-header-text-primary">Hesabım</span>
                </button>

                {/* Account Panel Desktop Dropdown */}
                {accountPanelOpen && (
                  <>
                    <div className="fixed inset-0 z-[49]" onClick={closeAccountPanel} />
                    <div className="absolute right-0 top-[calc(100%+14px)] z-[50] w-[320px] overflow-hidden rounded-2xl border border-divider-100 bg-background-modal shadow-2xl">
                      <AccountPanel />
                    </div>
                  </>
                )}
              </div>
            ) : (
              <div className="hidden items-center gap-2 md:flex">
                <Button variant="primary" size="sm" onClick={openRegisterModal}>
                  Hesap Oluştur
                </Button>
                <Button variant="tertiary" size="sm" onClick={openLoginModal}>
                  Giriş Yap
                </Button>
              </div>
            )}

            {/* Mobile ikonlar - Figma: gap-[11px], size-[20px] */}
            <div className="flex items-center gap-[11px] md:hidden">
              {isLoggedIn && (
                <button
                  onClick={() => setNotificationOpen((v) => !v)}
                  className="relative cursor-pointer text-header-icon outline-none transition-colors duration-400 hover:text-header-icon-hover"
                >
                  <HugeiconsIcon icon={Notification01Icon} className="size-5" />
                  <span className="absolute -right-0.5 -top-0.5 size-1.5 rounded-full bg-primary" />
                </button>
              )}
              <Link href="/destek" className="text-header-icon transition-colors duration-400 hover:text-header-icon-hover">
                <HugeiconsIcon icon={MessageMultiple01Icon} className="size-5" />
              </Link>
            </div>

            {/* Desktop: message */}
            <Link href="/destek" className="hidden text-header-icon transition-colors duration-400 hover:text-header-icon-hover md:block">
              <HugeiconsIcon icon={MessageMultiple01Icon} className="size-7" />
            </Link>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <button className="hidden cursor-pointer items-center gap-1.5 outline-none md:flex">
                  <Image src={languages[0].flag} alt={languages[0].code} width={20} height={20} className="size-5 rounded-full object-cover" />
                  <span className="text-sm font-medium text-header-text-secondary opacity-80">{languages[0].code}</span>
                  <HugeiconsIcon icon={ArrowDown01Icon} className="size-3 text-header-text-secondary" />
                </button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="min-w-[160px]">
                {languages.map((lang) => (
                  <DropdownMenuItem key={lang.code} className="cursor-pointer gap-2">
                    <Image src={lang.flag} alt={lang.code} width={16} height={16} className="size-4 rounded-full object-cover" />
                    <span>{lang.label}</span>
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </div>

      {/* Alt Satır: Kategori Navigasyonu (desktop only) */}
      <div className="hidden bg-background-header-menu md:block">
        <div className={`container flex items-center justify-between transition-[height] duration-300 ${scrolled ? "h-[48px]" : "h-[60px]"}`}>
          {/* Sol: Kategori Sekmeleri + Diğer */}
          <div className="flex items-center gap-1">
            {categoryTabs.map((tab) => {
              const isActive = isCategoryTabActive(pathname, tab.href)
              return (
                <Link
                  key={tab.href}
                  href={tab.href}
                  aria-current={isActive ? "page" : undefined}
                  className={`flex items-center group gap-1.5 rounded-md pr-5 py-1.5 text-sm transition-colors duration-400 ${
                    isActive
                      ? "text-primary"
                      : "text-header-text-secondary hover:text-primary"
                  }`}
                >
                  <HugeiconsIcon
                    icon={tab.icon}
                    className={`size-5 ${
                      isActive ? "text-primary" : "text-icon group-hover:text-primary"
                    }`}
                  />
                  <span>{tab.label}</span>
                </Link>
              )
            })}

            {/* Diğer Butonu */}
            <Button
              variant="ghost"
              className={`gap-1.5 px-3 py-1.5 text-sm transition-colors duration-400 ${
                megaMenuOpen ? "text-header-text-primary" : "text-header-text-primary hover:text-primary"
              }`}
              onClick={() => setMegaMenuOpen((prev) => !prev)}
              iconLeft={
                <span className={`flex size-8 items-center justify-center rounded-full transition-colors duration-400 ${
                  megaMenuOpen ? "bg-action-primary-default" : "bg-icon"
                }`}>
                  <HugeiconsIcon icon={Menu01Icon} className="size-4 text-white" />
                </span>
              }
            >
              Diğer
            </Button>
          </div>

          {/* Sağ: Bonus + Promosyonlar */}
          <div className="flex items-center gap-1">
            <ButtonLink
              href="/hesabim/bonus-talep"
              variant="ghost"
              className=" text-sm text-header-text-primary hover:text-primary"
              iconLeft={<HugeiconsIcon icon={GiftIcon} className="size-4 text-header-icon" />}
            >
              Bonus Talep
            </ButtonLink>
            <ButtonLink
              href="/promotions"
              variant="ghost"
              className="gap-1.5 px-3 pr-0 py-1.5 text-sm text-header-text-primary hover:text-primary"
              iconLeft={<HugeiconsIcon icon={PromotionIcon} className="size-4 text-header-icon" />}
            >
              Promosyonlar
            </ButtonLink>
          </div>
        </div>
      </div>

      {/* Mobile Bildirim Paneli */}
      {notificationOpen && (
        <div className="fixed top-[58px] bottom-0 left-0 right-0 z-[60] flex flex-col bg-background-modal md:hidden">
          <NotificationPanel onClose={() => setNotificationOpen(false)} showCloseButton />
        </div>
      )}

      {/* Mobile Hesap Paneli */}
      {accountPanelOpen && (
        <>
          <div
            className="fixed inset-0 z-[59] bg-black/40 backdrop-blur-xs md:hidden"
            onClick={closeAccountPanel}
          />
          <div className="fixed left-0 right-0 top-[78px] z-[60] h-[calc(100dvh-58px-64px)] overflow-hidden bg-background-modal rounded-t-2xl md:hidden pb-5 md:pb-0">
            <AccountPanel showCloseButton />
          </div>
        </>
      )}

      {/* Mega Menü */}
      {megaMenuOpen && (
        <>
          <div
            className="fixed inset-0 z-40 bg-black/50"
            style={{ top: 176 }}
            onClick={() => setMegaMenuOpen(false)}
          />
          <div className="absolute top-full left-0 z-50 w-full border-t border-divider-100 bg-background-modal shadow-2xl">
            <div className="container">
              <MegaMenu close={() => setMegaMenuOpen(false)} />
            </div>
          </div>
        </>
      )}
    </header>
  )
}

function submenuIcon(icon: string) {
  switch (icon) {
    case "task":   return Task01Icon
    case "pool":   return GiftSolidIcon
    case "rain":   return RainIcon
    case "wheel":  return Award01Icon
    case "market": return ShoppingCart01Icon
    default:       return GiftSolidIcon
  }
}

function MegaMenu({ close }: { close: () => void }) {
  const [openAccordion, setOpenAccordion] = useState<string | null>("Ödül Merkezi")

  return (
    <div className="flex" >
      {/* Sol: Sidebar + Games */}
      <div className="flex w-2/3 md:w-3/4 pt-10">
        {/* Sidebar */}
        <div className="flex w-52 shrink-0 flex-col gap-1 border-r border-divider-100 pr-5">
          {sidebarLinks.map((link, i) => {
            if (link.type === "accordion") {
              const isOpen = openAccordion === link.label
              return (
                <div key={i}>
                  <button
                    onClick={() => setOpenAccordion(isOpen ? null : link.label)}
                    className="flex w-full cursor-pointer items-center  rounded-md px-2 py-2 text-sm font-medium text-text-main transition-colors duration-400 hover:text-primary"
                  >
                    <span>{link.label}</span>
                    <HugeiconsIcon
                      icon={ArrowDown01Icon}
                      className={cn("size-4 text-icon ml-3 transition-transform duration-200", isOpen && "rotate-180")}
                    />
                  </button>
                  {isOpen && (
                    <div className="ml-2 mt-0.5 flex flex-col gap-0.5  ">
                      {link.submenu.map((sub) => (
                        <Link
                          key={sub.href}
                          href={sub.href}
                          onClick={close}
                          className="flex items-center gap-2 rounded-md px-2 py-1.5 text-xs text-header-text-primary group transition-colors duration-400 hover:text-primary"
                        >
                          <HugeiconsIcon
                            icon={submenuIcon(sub.icon)}
                            className="text-icon size-4 shrink-0 group-hover:text-primary"
                          />
                          {sub.label}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              )
            }

            const href = (link as { href: string }).href
            const badge = (link as { badge?: string }).badge
            const comingSoon = (link as { comingSoon?: boolean }).comingSoon

            return (
              <Link
                key={i}
                href={href}
                onClick={!comingSoon ? close : undefined}
                className={`flex items-center rounded-md px-2 py-2 text-sm transition-colors duration-400 ${
                  comingSoon
                    ? "pointer-events-none text-text-subtext"
                    : "text-text-main hover:text-primary"
                }`}
              >
                <span>{link.label}</span>
                {badge ? (
                  <ComingSoonBadge>{badge}</ComingSoonBadge>
                ) : (
                  <HugeiconsIcon icon={ArrowUpRight01Icon} className="ml-3 size-4.5 text-icon" />
                )}
              </Link>
            )
          })}
        </div>

        {/* Crash Games Grid */}
        <div className="flex-1  pb-10 pr-4 pl-6">
          <div className="mb-4 flex items-center gap-3">
            <h3 className="text-[20px] font-semibold text-text-title">Crash Games</h3>
            <Link href="/crash-games" className="text-[13px] underline text-text-subtext transition-colors duration-400 hover:text-primary">
              Tümü
            </Link>
          </div>
          <div className="grid grid-cols-3 gap-2">
            {crashGames.map((game) => (
              <Link
                key={game.name}
                href={`/games/${game.name.toLowerCase()}`}
                className="group/game flex items-center gap-2.5 group rounded-lg p-1 transition-colors duration-400 hover:bg-neutral-200"
              >
                <Image
                  src={game.image}
                  alt={game.name}
                  width={56}
                  height={56}
                  className=" shrink-0 rounded-lg object-cover"
                />
                <div className="min-w-0">
                  <div className="flex items-center">
                    <span className="inline-flex w-0 shrink-0 overflow-hidden text-primary transition-all duration-400 group-hover/game:w-4.5">
                      <HugeiconsIcon icon={PlayIcon} className="size-3.5 shrink-0 text-primary" />
                    </span>
                    <span className="truncate text-sm font-medium text-text-main">{game.name}</span>
                  </div>
                  <div className="flex items-center gap-1.5 ">
                    <span className="size-1.5 shrink-0 rounded-full bg-green-400" style={{color:"#42BE49"}} />
                  <p className="text-[11px] text-text-main ">  {game.players.toLocaleString("tr-TR")} <span className="text-text-subtext group-hover:text-text-main transition-colors duration-400">kişi oynuyor</span></p>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>

      {/* Sağ: Affiliate */}
      <div className="Header-megaMenu-right flex w-1/3 flex-col justify-between   py-10 pl-8 md:w-1/4 " >
          <div className="mb-3 flex items-center gap-2 text-text-subtext">
            <HugeiconsIcon icon={Agreement02Icon} className="size-5 text-primary" />
            <span className="text-sm text-action-primary-on-primary">İş Ortaklığı</span>
          </div>
         <div>
           <p className="mb-1 text-lg font-semibold tracking-wider " style={{color:'#BF7DDC'}}>
             AFFILIATE
           </p>
           <p className="mb-2 text-[26px] md:text-[23px] max-w-[320px]  font-semibold leading-8 text-action-primary-on-primary">
             %50&apos;ye varan kazanç oranlarını yakalayın
           </p>
           <ButtonLink
               href="/affiliate"
               variant="link"
               className="text-xs text-action-primary-on-primary"
           >
             Detaylı bilgi edin
           </ButtonLink>
         </div>
        <div className="mt-4 flex items-center gap-1.5 text-text-subtext">
          <Image src="/images/logo-light.svg" alt="Alphabe" width={92} height={20} />
          <span className="text-[10px]">X PARTNERS</span>
        </div>
      </div>
    </div>
  )
}

export default Header
