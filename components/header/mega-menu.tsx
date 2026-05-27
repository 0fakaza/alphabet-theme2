"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { cn } from "@/lib/utils"
import {
  Agreement02Icon,
  ArrowDown01Icon,
  ArrowUpRight01Icon,
  HugeiconsIcon,
  PlayIcon,
} from "@/lib/icons"
import { ButtonLink } from "@/components/elements/button"
import { ComingSoonBadge } from "@/components/elements/coming-soon-badge"
import { crashGames, sidebarLinks } from "./data"
import {
  GiftIcon as GiftSolidIcon,
  Task01Icon,
  RainIcon,
  Award01Icon,
  ShoppingCart01Icon,
} from "@hugeicons-pro/core-solid-rounded"
import type { IconSvgElement } from "@/lib/icons"

function submenuIcon(icon: string): IconSvgElement {
  switch (icon) {
    case "task":
      return Task01Icon
    case "pool":
      return GiftSolidIcon
    case "rain":
      return RainIcon
    case "wheel":
      return Award01Icon
    case "market":
      return ShoppingCart01Icon
    default:
      return GiftSolidIcon
  }
}

export function MegaMenu({ close }: { close: () => void }) {
  const [openAccordion, setOpenAccordion] = useState<string | null>("Ödül Merkezi")

  return (
    <div className="flex">
      <div className="flex w-2/3 md:w-3/4 pt-10">
        <div className="flex w-52 shrink-0 flex-col gap-1 border-r border-divider-100 pr-5">
          {sidebarLinks.map((link, i) => {
            if (link.type === "accordion") {
              const isOpen = openAccordion === link.label
              return (
                <div key={i}>
                  <button
                    onClick={() => setOpenAccordion(isOpen ? null : link.label)}
                    className="flex w-full cursor-pointer items-center rounded-md px-2 py-2 text-sm font-medium text-text-main transition-colors duration-400 hover:text-primary"
                  >
                    <span>{link.label}</span>
                    <HugeiconsIcon
                      icon={ArrowDown01Icon}
                      className={cn(
                        "ml-3 size-4 text-icon transition-transform duration-200",
                        isOpen && "rotate-180"
                      )}
                    />
                  </button>
                  {isOpen && (
                    <div className="ml-2 mt-0.5 flex flex-col gap-0.5">
                      {link.submenu.map((sub) => (
                        <Link
                          key={sub.href}
                          href={sub.href}
                          onClick={close}
                          className="group flex items-center gap-2 rounded-md px-2 py-1.5 text-xs text-header-text-primary transition-colors duration-400 hover:text-primary"
                        >
                          <HugeiconsIcon
                            icon={submenuIcon(sub.icon)}
                            className="size-4 shrink-0 text-icon group-hover:text-primary"
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

        <div className="flex-1 pb-10 pl-6 pr-4">
          <div className="mb-4 flex items-center gap-3">
            <h3 className="text-[20px] font-semibold text-text-title">Crash Games</h3>
            <Link
              href="/crash-games"
              className="text-[13px] text-text-subtext underline transition-colors duration-400 hover:text-primary"
            >
              Tümü
            </Link>
          </div>
          <div className="grid grid-cols-3 gap-2">
            {crashGames.map((game) => (
              <Link
                key={game.name}
                href={`/games/${game.name.toLowerCase()}`}
                className="group/game group flex items-center gap-2.5 rounded-lg p-1 transition-colors duration-400 hover:bg-neutral-200"
              >
                <Image
                  src={game.image}
                  alt={game.name}
                  width={56}
                  height={56}
                  className="shrink-0 rounded-lg object-cover"
                />
                <div className="min-w-0">
                  <div className="flex items-center">
                    <span className="inline-flex w-0 shrink-0 overflow-hidden text-primary transition-all duration-400 group-hover/game:w-4.5">
                      <HugeiconsIcon icon={PlayIcon} className="size-3.5 shrink-0 text-primary" />
                    </span>
                    <span className="truncate text-sm font-medium text-text-main">{game.name}</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <span
                      className="size-1.5 shrink-0 rounded-full bg-green-400"
                      style={{ color: "#42BE49" }}
                    />
                    <p className="text-[11px] text-text-main">
                      {game.players.toLocaleString("tr-TR")}{" "}
                      <span className="text-text-subtext transition-colors duration-400 group-hover:text-text-main">
                        kişi oynuyor
                      </span>
                    </p>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>

      <div className="Header-megaMenu-right flex w-1/3 flex-col justify-between py-10 pl-8 md:w-1/4">
        <div className="mb-3 flex items-center gap-2 text-text-subtext">
          <HugeiconsIcon icon={Agreement02Icon} className="size-5 text-primary" />
          <span className="text-sm text-action-primary-on-primary">İş Ortaklığı</span>
        </div>
        <div>
          <p className="mb-1 text-lg font-semibold tracking-wider" style={{ color: "#BF7DDC" }}>
            AFFILIATE
          </p>
          <p className="mb-2 max-w-[320px] text-[26px] font-semibold leading-8 text-action-primary-on-primary md:text-[23px]">
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
