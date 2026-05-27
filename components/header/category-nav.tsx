"use client"

import Link from "next/link"
import { HugeiconsIcon, GiftIcon, Menu01Icon, PromotionIcon } from "@/lib/icons"
import { Button, ButtonLink } from "@/components/elements/button"
import { categoryTabs, isCategoryTabActive } from "./data"

type HeaderCategoryNavProps = {
  pathname: string
  scrolled: boolean
  megaMenuOpen: boolean
  onMegaMenuToggle: () => void
}

export function HeaderCategoryNav({
  pathname,
  scrolled,
  megaMenuOpen,
  onMegaMenuToggle,
}: HeaderCategoryNavProps) {
  return (
    <div className="hidden bg-background-header-menu md:block">
      <div
        className={`container flex items-center justify-between transition-[height] duration-300 ${
          scrolled ? "h-[48px]" : "h-[60px]"
        }`}
      >
        <div className="flex items-center gap-1">
          {categoryTabs.map((tab) => {
            const isActive = isCategoryTabActive(pathname, tab.href)
            return (
              <Link
                key={tab.href}
                href={tab.href}
                aria-current={isActive ? "page" : undefined}
                className={`group flex items-center gap-1.5 rounded-md py-1.5 pr-5 text-sm transition-colors duration-400 ${
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

          <Button
            variant="ghost"
            className={`gap-1.5 px-3 py-1.5 text-sm transition-colors duration-400 ${
              megaMenuOpen
                ? "text-header-text-primary"
                : "text-header-text-primary hover:text-primary"
            }`}
            onClick={onMegaMenuToggle}
            iconLeft={
              <span
                className={`flex size-8 items-center justify-center rounded-full transition-colors duration-400 ${
                  megaMenuOpen ? "bg-action-primary-default" : "bg-icon"
                }`}
              >
                <HugeiconsIcon icon={Menu01Icon} className="size-4 text-white" />
              </span>
            }
          >
            Diğer
          </Button>
        </div>

        <div className="flex items-center gap-1">
          <ButtonLink
            href="/account/bonus-request"
            variant="ghost"
            className="text-sm text-header-text-primary hover:text-primary"
            iconLeft={<HugeiconsIcon icon={GiftIcon} className="size-4 text-header-icon" />}
          >
            Bonus Talep
          </ButtonLink>
          <ButtonLink
            href="/promotions"
            variant="ghost"
            className="gap-1.5 px-3 py-1.5 pr-0 text-sm text-header-text-primary hover:text-primary"
            iconLeft={<HugeiconsIcon icon={PromotionIcon} className="size-4 text-header-icon" />}
          >
            Promosyonlar
          </ButtonLink>
        </div>
      </div>
    </div>
  )
}
