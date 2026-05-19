"use client"

import Link from "next/link"
import { HugeiconsIcon, ArrowRight01Icon } from "@/lib/icons"
import type { IconSvgElement } from "@/lib/icons"
import { AccountSidebar } from "@/components/account/account-sidebar"

interface AccountPageLayoutProps {
  title: string
  icon: IconSvgElement
  breadcrumb?: string
  children: React.ReactNode
  headerRight?: React.ReactNode
}

export function AccountPageLayout({
  title,
  icon,
  breadcrumb,
  children,
  headerRight,
}: AccountPageLayoutProps) {
  return (
    <main className="min-h-screen bg-background-body">
      <div className="border-b border-divider-100 md: md:bg-background-main ">
        <div className="container py-4">
          <div className="grid grid-cols-1 gap-6 md:grid-cols-[220px_1fr] md:items-center">
            <div className="md:flex  items-center gap-3 hidden">
              <div
                className="flex size-12 shrink-0 items-center justify-center rounded-lg text-xl font-bold text-white"
                style={{
                  backgroundImage:
                    "linear-gradient(210deg, rgba(195,13,13,0) 59%, rgb(195,13,13) 108%), radial-gradient(ellipse at 26% 23%, #872aff 0%, #a350ff 25%, #bf75ff 50%, #db9bff 75%, #f6c1ff 100%)",
                }}
              >
                S
              </div>
              <div>
                <p className="text-sm font-semibold text-text-title">salazar42</p>
                <p className="text-xs text-text-subtext">ID: 336605487</p>
              </div>
            </div>

            <div className="flex items-center justify-between gap-4 ">
              <div>
                <div className="flex items-center gap-2">
                    <HugeiconsIcon icon={icon} className="size-5 text-primary" />
                  <h1 className="text-base font-semibold text-text-title">{title}</h1>
                </div>
                <nav className="mt-1 flex items-center gap-1.5  text-xs text-text-subtext">
                  <Link href="/" className="hover:text-primary">Anasayfa</Link>
                  <HugeiconsIcon icon={ArrowRight01Icon} className="size-3" />
                  <span>Profil</span>
                  <HugeiconsIcon icon={ArrowRight01Icon} className="size-3" />
                  <span className="text-text-main">{breadcrumb ?? title}</span>
                </nav>
              </div>
              {headerRight}
            </div>
          </div>
        </div>
      </div>

      <div className="container py-8">
        <div className="grid grid-cols-1 gap-6 md:grid-cols-[220px_1fr]">
          <div className="hidden md:block">
            <AccountSidebar />
          </div>
          <div>{children}</div>
        </div>
      </div>
    </main>
  )
}
