"use client"

import { useState, useEffect, useRef } from "react"
import Link from "next/link"
import Image from "next/image"
import { useTheme } from "next-themes"
import { usePathname } from "next/navigation"
import {
  ArrowDown01Icon,
  HugeiconsIcon,
  MessageMultiple01Icon,
  Notification01Icon,
} from "@/lib/icons"
import { Button } from "@/components/elements/button"
import { CurrencyBadge } from "@/components/elements/currency-badge"
import { WalletActionPopover } from "./wallet-action-popover"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { languages, navLinks } from "./data"
import { NotificationPanel } from "./notification-panel"
import { AccountPanel } from "./account-panel"
import { useAccountPanel } from "@/components/providers/account-panel-provider"
import { PlusSignIcon } from "@hugeicons-pro/core-solid-rounded"
import { useLoginModal } from "@/components/providers/login-modal-provider"
import { useRegisterModal } from "@/components/providers/register-modal-provider"
import { useAuth } from "@/components/providers/auth-provider"
import { HeaderCategoryNav } from "./category-nav"
import { MegaMenu } from "./mega-menu"

const Header = () => {
  const [megaMenuOpen, setMegaMenuOpen] = useState(false)
  const [hideMainBalance, setHideMainBalance] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [notificationOpen, setNotificationOpen] = useState(false)
  const { isOpen: accountPanelOpen, open: openAccountPanel, close: closeAccountPanel } =
    useAccountPanel()
  const { open: openLoginModal } = useLoginModal()
  const { open: openRegisterModal } = useRegisterModal()
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
    return () => {
      document.body.style.overflow = ""
    }
  }, [megaMenuOpen])

  const logoSrc =
    mounted && resolvedTheme === "light" ? "/images/logo-dark.svg" : "/images/logo-light.svg"

  return (
    <header
      ref={headerRef}
      className="Header sticky top-0 z-50 w-full shadow-[0_1px_4px_0_rgba(0,0,0,0.05)] dark:shadow-[0_1px_4px_0_rgba(0,0,0,0.4)]"
    >
      <div className="bg-background-header text-white">
        <div className="container flex h-[58px] items-center justify-between transition-[height] duration-300">
          <div className="flex items-center gap-6">
            <Link href="/">
              <Image
                src={logoSrc}
                alt="Alphabe"
                width={128}
                height={27}
                className="h-[23px] w-auto md:h-[27px]"
              />
            </Link>

            <nav className="hidden items-center gap-4 text-sm text-header-text-secondary md:flex">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`transition-colors duration-400 hover:text-primary ${
                    link.highlight ? "text-primary underline underline-offset-3" : ""
                  }`}
                >
                  {link.label}
                </Link>
              ))}
            </nav>
          </div>

          <div>
            <WalletActionPopover
              hideMain={hideMainBalance}
              onToggleMain={() => setHideMainBalance((v) => !v)}
            >
              <div className="flex h-[40px] w-[163px] cursor-pointer items-center justify-between rounded-full border border-neutral-300 bg-neutral-100 py-[6px] pl-[9px] pr-[6px] md:h-auto md:border-transparent md:bg-header-wallet md:py-1.5 md:pl-1.5 md:pr-1.5">
                <div className="flex items-center gap-1.5">
                  <CurrencyBadge currency="TRY" />
                  <span className="text-[13px] font-medium tracking-[0.26px] text-header-text-primary">
                    {hideMainBalance ? "••••" : "3.520,52"}
                  </span>
                  <HugeiconsIcon
                    icon={ArrowDown01Icon}
                    className="size-4 shrink-0 text-white"
                  />
                </div>
                <span className="flex size-7 items-center justify-center rounded-full bg-deposit text-white transition-colors duration-400 group-hover:brightness-110">
                  <HugeiconsIcon icon={PlusSignIcon} className="size-4" />
                </span>
              </div>
            </WalletActionPopover>
          </div>

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

                {notificationOpen && (
                  <>
                    <div
                      className="fixed inset-0 z-[49]"
                      onClick={() => setNotificationOpen(false)}
                    />
                    <div className="absolute right-0 top-[calc(100%+14px)] z-[50] flex h-[580px] w-[400px] flex-col overflow-hidden rounded-2xl border border-divider-100 bg-background-modal shadow-2xl">
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
                  <span className="text-[13px] font-semibold text-header-text-primary">
                    Hesabım
                  </span>
                </button>

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
              <Link
                href="/destek"
                className="text-header-icon transition-colors duration-400 hover:text-header-icon-hover"
              >
                <HugeiconsIcon icon={MessageMultiple01Icon} className="size-5" />
              </Link>
            </div>

            <Link
              href="/destek"
              className="hidden text-header-icon transition-colors duration-400 hover:text-header-icon-hover md:block"
            >
              <HugeiconsIcon icon={MessageMultiple01Icon} className="size-7" />
            </Link>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <button className="hidden cursor-pointer items-center gap-1.5 outline-none md:flex">
                  <Image
                    src={languages[0].flag}
                    alt={languages[0].code}
                    width={20}
                    height={20}
                    className="size-5 rounded-full object-cover"
                  />
                  <span className="text-sm font-medium text-header-text-secondary opacity-80">
                    {languages[0].code}
                  </span>
                  <HugeiconsIcon icon={ArrowDown01Icon} className="size-3 text-header-text-secondary" />
                </button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="min-w-[160px]">
                {languages.map((lang) => (
                  <DropdownMenuItem key={lang.code} className="cursor-pointer gap-2">
                    <Image
                      src={lang.flag}
                      alt={lang.code}
                      width={16}
                      height={16}
                      className="size-4 rounded-full object-cover"
                    />
                    <span>{lang.label}</span>
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </div>

      <HeaderCategoryNav
        pathname={pathname}
        scrolled={scrolled}
        megaMenuOpen={megaMenuOpen}
        onMegaMenuToggle={() => setMegaMenuOpen((prev) => !prev)}
      />

      {notificationOpen && (
        <div className="fixed bottom-0 left-0 right-0 top-[58px] z-[60] flex flex-col bg-background-modal md:hidden">
          <NotificationPanel onClose={() => setNotificationOpen(false)} showCloseButton />
        </div>
      )}

      {accountPanelOpen && (
        <>
          <div
            className="fixed inset-0 z-[59] bg-black/40 backdrop-blur-xs md:hidden"
            onClick={closeAccountPanel}
          />
          <div className="fixed left-0 right-0 top-[78px] z-[60] h-[calc(100dvh-58px-64px)] overflow-hidden rounded-t-2xl bg-background-modal pb-5 md:hidden md:pb-0">
            <AccountPanel showCloseButton />
          </div>
        </>
      )}

      {megaMenuOpen && (
        <>
          <div
            className="fixed inset-0 z-40 bg-black/50"
            style={{ top: 176 }}
            onClick={() => setMegaMenuOpen(false)}
          />
          <div className="absolute left-0 top-full z-50 w-full border-t border-divider-100 bg-background-modal shadow-2xl">
            <div className="container">
              <MegaMenu close={() => setMegaMenuOpen(false)} />
            </div>
          </div>
        </>
      )}
    </header>
  )
}

export default Header
