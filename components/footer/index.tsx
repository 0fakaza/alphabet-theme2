"use client"

import * as React from "react"
import Link from "next/link"
import Image from "next/image"
import { ButtonLink } from "@/components/elements/button"
import { useTheme } from "next-themes"
import {
  HugeiconsIcon,
  TwitterIcon,
  InstagramIcon,
  Facebook01Icon,
  YoutubeIcon,
  TelegramIcon,
  Sun01Icon,
  Moon02Icon,
  ArrowDown01Icon,
} from "@/lib/icons"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

const providers = [
  { name: "Pragmatic Play", logo: "/images/providers/pp.svg", games: 45 },
  { name: "Novomatic", logo: "/images/providers/novo.svg", games: 45 },
  { name: "Netent", logo: "/images/providers/netent.svg", games: 45 },
  { name: "EGT", logo: "/images/providers/egt.svg", games: 45 },
  { name: "Wazdan", logo: "/images/providers/wazdan.svg", games: 45 },
  { name: "Amatic", logo: "/images/providers/amatic.svg", games: 45 },
  { name: "Quickspin", logo: "/images/providers/quickspin.svg", games: 45 },
]

const casinoLinks = [
  { href: "/casino-oyunlari", label: "Casino oyunları" },
  { href: "/slotlar", label: "Slotlar" },
  { href: "/canli-casino", label: "Canlı Casino" },
  { href: "/rulet", label: "Rulet" },
  { href: "/blackjack", label: "Blackjack" },
  { href: "/poker", label: "Poker" },
  { href: "/saglayicilar", label: "Sağlayıcılar" },
]

const sporLinks = [
  { href: "/spor-bahisleri", label: "Spor Bahisleri" },
  { href: "/canli-musabakalar", label: "Canlı Müsabakalar" },
  { href: "/futbol", label: "Futbol" },
  { href: "/basketbol", label: "Basketbol" },
  { href: "/tenis", label: "Tenis" },
  { href: "/poker-spor", label: "Poker" },
]

const vipLinks = [
  { href: "/vip-club", label: "VIP Kulübü" },
  { href: "/is-ortakligi", label: "İş Ortaklığı" },
  { href: "/ayin-mvpleri", label: "Ayın MVP'leri" },
]

const paymentMethods = [
  { name: "Kripto Paralar", logo: "/images/payments/payments_1.svg" },
  { name: "Bank Transfer", logo: "/images/payments/payments_2.svg" },
  { name: "Tether(USDT)", logo: "/images/payments/payments_3.svg" },
  { name: "PayFix", logo: "/images/payments/payments_4.svg" },
  { name: "Hızlı QR", logo: "/images/payments/payments_5.svg" },
  { name: "Kredi Kartı", logo: "/images/payments/payments_6.svg" },
  { name: "Anında Papara", logo: "/images/payments/payments_7.svg" },
  { name: "Toda", logo: "/images/payments/payments_8.svg" },
  { name: "Paycell", logo: "/images/payments/payments_9.svg" },
  { name: "Peppara", logo: "/images/payments/payments_10.svg" },
  { name: "MEFETE", logo: "/images/payments/payments_11.svg" },
  { name: "Hızlı Paralar", logo: "/images/payments/payments_12.svg" },
]

const systemLanguages = [
  { code: "UA", label: "Ukraine", flag: "/images/flags/198-ukraine.svg" },
  { code: "TR", label: "Türkçe", flag: "/images/flags/154-turkey.svg" },
  { code: "EN", label: "English", flag: "/images/flags/110-united kingdom.svg" },
  { code: "DE", label: "Deutsch", flag: "/images/flags/208-germany.svg" },
  { code: "RU", label: "Русский", flag: "/images/flags/044-russia.svg" },
]

const socialLinks = [
  { icon: TwitterIcon, href: "#", label: "Twitter" },
  { icon: InstagramIcon, href: "#", label: "Instagram" },
  { icon: Facebook01Icon, href: "#", label: "Facebook" },
  { icon: YoutubeIcon, href: "#", label: "YouTube" },
  { icon: TelegramIcon, href: "#", label: "Telegram" },
]

const Footer = () => {
  const { resolvedTheme, setTheme } = useTheme()
  const [mounted, setMounted] = React.useState(false)
  const [openAccordion, setOpenAccordion] = React.useState<string | null>(null)
  React.useEffect(() => setMounted(true), [])

  const toggleAccordion = (section: string) => {
    setOpenAccordion((prev) => (prev === section ? null : section))
  }

  return (
    <footer className="w-full bg-background-footer text-white">
      {/* Sağlayıcılar */}
      <div className="border-b border-divider-100">
        <div className="container py-8">
          <div className="mb-5 flex items-center justify-between">
            <h3 className="text-[18px] font-bold tracking-[0.4px] text-text-title md:text-[20px]">Sağlayıcılar</h3>
            <ButtonLink
              href="/saglayicilar"
              variant="link"
              className="text-[13px] text-[#999dac] md:text-[14px]"
            >
              See all Providers
            </ButtonLink>
          </div>
          <div className="flex items-center gap-3 overflow-x-auto pb-1 md:overflow-hidden md:pb-0 [&::-webkit-scrollbar]:hidden">
            {providers.map((provider) => (
              <Link
                key={provider.name}
                href={`/provider/${provider.name.toLowerCase().replace(/\s/g, "-")}`}
                className="flex h-[64px] w-[160px] shrink-0 items-center gap-2.5 rounded-lg border border-divider-100 px-3 py-2.5 transition-colors hover:border-zinc-500 md:h-[74px] md:w-[190px] md:px-5 md:py-3"
              >
                <Image
                  src={provider.logo}
                  alt={provider.name}
                  width={28}
                  height={28}
                  className="size-7 shrink-0 object-contain md:size-8"
                />
                <div className="flex flex-col">
                  <span className="whitespace-nowrap text-[13px] font-medium tracking-[0.3px] text-text-main md:text-[15px]">{provider.name}</span>
                  <span className="text-[10px] text-text-subtext underline">{provider.games} games</span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>

      {/* Ana Footer İçeriği */}
      <div className="md: border-b border-divider-100 ">
        <div className="container  flex flex-col gap-8 py-8 md:flex-row md:gap-16 md:py-10">
          {/* Sol: Bilgi Alanı */}
          <div className="flex w-full shrink-0 flex-col gap-6 md:w-[424px] md:gap-9">
            <div className="flex flex-col gap-4 md:gap-[22px]">
              <h2 className="text-[16px] font-medium leading-normal tracking-[0.4px] text-center md:text-left text-text-main md:text-[20px] max-w-[375px] mx-auto md:mx-0" >
                Yüksek oranların tadını çıkar, büyük kazançlara yelken aç
              </h2>
              <p className="text-[12px] font-medium leading-[1.3] text-text-subtext text-center md:text-left">
                Contrary to popular belief, Lorem Ipsum is not simply random text. It has
                roots in a piece of classical Latin literature from 45 BC, making it
              </p>
              <Image
                src={mounted && resolvedTheme === "light" ? "/images/logo-dark.svg" : "/images/logo-light.svg"}
                alt="Alphabe"
                width={156}
                height={28}
                className="h-6 w-auto md:h-7 mt-4 md:mt-0 object-contain md:object-left"
              />
            </div>

            <div className=" flex flex-col md:flex-row items-center gap-3 mt-1 md:mt-0 md:gap-5">
              <span className="text-[13px] font-medium tracking-[0.28px] text-text-main md:w-[84px] md:text-right md:text-[14px]">Community</span>
              <div className="flex items-center gap-2">
                {socialLinks.map((social) => (
                  <Link
                    key={social.label}
                    href={social.href}
                    className="flex items-center rounded-[8px] bg-neutral-600 p-3 text-white transition-colors hover:bg-neutral-500 md:p-[14px]"
                  >
                    <HugeiconsIcon icon={social.icon} className="size-4" />
                  </Link>
                ))}
              </div>
            </div>

            <div
              onClick={() => setTheme(resolvedTheme === "dark" ? "light" : "dark")}
              className="flex w-fit cursor-pointer items-center gap-1.5 rounded-[12px] bg-background-body p-[5px] mx-auto md:mx-0 mt-2 md:mt-0"
            >
              <div
                className={`flex items-center gap-1.5 rounded-[8px] p-2 transition-all ${
                  mounted && resolvedTheme === "light"
                    ? "bg-primary text-white"
                    : "text-icon"
                }`}
              >
                <HugeiconsIcon icon={Sun01Icon} className="size-[20px] md:size-[22px]" />
                {mounted && resolvedTheme === "light" && (
                  <span className="text-[13px] font-medium tracking-[0.26px]">Light</span>
                )}
              </div>
              <div
                className={`flex items-center gap-1.5 rounded-[8px] p-2 transition-all ${
                  !mounted || resolvedTheme === "dark"
                    ? "bg-primary text-white"
                    : "text-icon"
                }`}
              >
                <HugeiconsIcon icon={Moon02Icon} className="size-[20px] md:size-[22px]" fill="currentColor" />
                {(!mounted || resolvedTheme === "dark") && (
                  <span className="text-[13px] font-medium tracking-[0.26px]">Dark</span>
                )}
              </div>
            </div>
          </div>

          <div className="flex flex-col md:flex md:flex-row md:gap-[74px]">
            {/* CASINO */}
            <div className="">
              <button
                className="flex w-full items-center justify-between py-3 md:hidden"
                onClick={() => toggleAccordion("casino")}
              >
                <span className="text-[13px] font-medium leading-[20px] tracking-[0.28px] text-text-title">CASINO</span>
                <HugeiconsIcon
                  icon={ArrowDown01Icon}
                  className={`size-4 text-text-title transition-transform duration-200 ${openAccordion === "casino" ? "rotate-180" : ""}`}
                />
              </button>
              <h4 className="hidden md:block mb-[18px] text-[14px] font-medium leading-[20px] tracking-[0.28px] text-text-title">CASINO</h4>
              <ul className={`flex-col gap-2.5 pb-3 md:flex md:gap-[14px] md:pb-0 ${openAccordion === "casino" ? "flex" : "hidden"}`}>
                {casinoLinks.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-[13px] font-medium leading-[20px] tracking-[0.28px] text-text-subtitle transition-colors hover:text-primary md:text-[14px]"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* SPOR */}
            <div className="">
              <button
                className="flex w-full items-center justify-between py-3 md:hidden"
                onClick={() => toggleAccordion("spor")}
              >
                <span className="text-[13px] font-medium leading-[20px] tracking-[0.28px] text-text-title">SPOR</span>
                <HugeiconsIcon
                  icon={ArrowDown01Icon}
                  className={`size-4 text-text-title transition-transform duration-200 ${openAccordion === "spor" ? "rotate-180" : ""}`}
                />
              </button>
              <h4 className="hidden md:block mb-[18px] text-[14px] font-medium leading-[20px] tracking-[0.28px] text-text-title">SPOR</h4>
              <ul className={`flex-col gap-2.5 pb-3 md:flex md:gap-[14px] md:pb-0 ${openAccordion === "spor" ? "flex" : "hidden"}`}>
                {sporLinks.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-[13px] font-medium leading-[20px] tracking-[0.28px] text-text-subtitle transition-colors hover:text-primary md:text-[14px]"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* VIP */}
            <div className="">
              <button
                className="flex w-full items-center justify-between py-3 md:hidden"
                onClick={() => toggleAccordion("vip")}
              >
                <span className="text-[13px] font-medium leading-[20px] tracking-[0.28px] text-text-title">VIP</span>
                <HugeiconsIcon
                  icon={ArrowDown01Icon}
                  className={`size-4 text-text-title transition-transform duration-200 ${openAccordion === "vip" ? "rotate-180" : ""}`}
                />
              </button>
              <h4 className="hidden md:block mb-[18px] text-[14px] font-medium leading-[20px] tracking-[0.28px] text-text-title">VIP</h4>
              <ul className={`flex-col gap-2.5 pb-3 md:flex md:gap-[14px] md:pb-0 ${openAccordion === "vip" ? "flex" : "hidden"}`}>
                {vipLinks.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-[13px] font-medium leading-[20px] tracking-[0.28px] text-text-subtitle transition-colors hover:text-primary md:text-[14px]"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* Ödeme Yöntemleri */}
      <div>
        <div className="container py-4 md:py-6">
          <div className="rounded-[16px] md:bg-neutral-400 bg-transparent px-4 py-0 md:rounded-[20px] md:px-8 md:py-8">
            <h3 className="mb-4 text-center text-[16px] font-medium tracking-[0.4px] text-text-subtext md:mb-6 md:text-[20px]">
              Geçerli ödeme yöntemleri
            </h3>
            <div className="grid grid-cols-2 gap-2 sm:grid-cols-3 md:flex md:flex-wrap md:items-center md:justify-center -mx-2 ">
              {paymentMethods.map((method) => (
                <div
                  key={method.name}
                  className="flex h-[55px] items-center gap-2 rounded-[12px] bg-neutral-100 px-2.5 py-1.5  md:w-[179px] md:rounded-[14px] md:px-3"
                >
                  <Image
                    src={method.logo}
                    alt={method.name}
                    width={32}
                    height={32}
                    className="size-8 shrink-0 rounded-full object-contain md:size-9"
                  />
                  <div className="flex flex-col min-w-0">
                    <span className="truncate text-[12px] font-medium text-text-main md:text-[13px]">{method.name}</span>
                    <span className="text-[10px] text-text-subtext opacity-70">İLE YATIR</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Yasal Bilgi */}
      <div className="md:border-b  border-divider-100">
        <div className="container py-6">
          <p className="mx-auto max-w-[1008px] text-left md:text-center text-[12px] font-medium leading-[1.3] text-text-subtext">
            ybahis.com, 148526 Şirket Numarası ile Curaçao&apos;da şirketleşmiş olan Halcyon Super Holdings BV (Abraham Mendez Chumaceiro Boulevard 03, Willemstad, Curaçao) tarafından
            işletilmektedir ve Curaçao Gaming Authority tarafından OGL/2024/328/0599 oyun lisansı altında lisanslıdır. Bazı ödeme yöntemleri, şirketin yüzde yüz iştiraki olan Solas
            Technologies Limited (25 Voukourestiou Street, 3045 Limasol, Kıbrıs) tarafından yönetilmektedir.
          </p>
        </div>
      </div>

      {/* Alt Bar */}
      <div className="container flex  items-center gap-4 py-5  justify-between md:py-6">
        <div className="flex items-center gap-2">
          <Image
            src="/images/gcb.png"
            alt="GCB"
            width={48}
            height={48}
            className="size-10 object-contain md:size-12"
          />
        </div>

        <div className="flex items-center gap-2">
          <Image src="/images/onsekiz.svg" alt="18+" width={24} height={24} className="size-6" />
          <span className="text-[11px] font-bold uppercase leading-tight text-text-subtext">Responsible<br />gaming</span>
        </div>

        <div className="flex items-center gap-3 md:gap-[23px]">
          <span className="text-[12px] font-medium leading-[1.3] text-text-subtext hidden md:block">Sistem Dili</span>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <button className="flex h-[44px] w-[180px] cursor-pointer items-center gap-1.5 rounded-[12px] border border-element-border pl-3 pr-3 outline-none md:h-[48px] md:w-[246px] md:pl-4">
                <Image src={systemLanguages[0].flag} alt={systemLanguages[0].code} width={20} height={20} className="size-5 rounded-full object-cover" />
                <span className="flex-1 text-left text-[13px] font-medium tracking-[0.28px] text-text-subtext md:text-[14px]">{systemLanguages[0].code}</span>
                <HugeiconsIcon icon={ArrowDown01Icon} className="size-4 text-text-subtext" />
              </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="min-w-[160px]">
              {systemLanguages.map((lang) => (
                <DropdownMenuItem key={lang.code} className="cursor-pointer gap-2">
                  <Image src={lang.flag} alt={lang.code} width={16} height={16} className="size-4 rounded-full object-cover" />
                  <span>{lang.label}</span>
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </footer>
  )
}

export default Footer
