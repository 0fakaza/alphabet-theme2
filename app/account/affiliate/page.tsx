"use client"

import { useState } from "react"
import Image from "next/image"
import { cn } from "@/lib/utils"
import { HugeiconsIcon, Agreement02Icon, Add01Icon, ArrowRight01Icon } from "@/lib/icons"
import { AccountPageLayout } from "@/components/account/account-page-layout"
import { Button } from "@/components/elements/button"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { PencilEdit02Icon, UserGroupIcon } from "@/lib/icons"

const campaigns = [
  { name: "CANLIYIN", commission: "%75", referans: 18, kazanc: 4520 },
  { name: "ATT50", commission: "%75", referans: 18, kazanc: 4520 },
  { name: "TELEGRAM", commission: "%75", referans: 16, kazanc: 4520 },
  { name: "Chrome", commission: "%75", referans: 18, kazanc: 4520 },
]

const faqItems = [
  {
    id: "1",
    q: "Komisyon oranları yükseltilebilir mi?",
    a: "There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words which don't look even slightly believable. If you are going to use a passage of Lorem Ipsum, you need to be sure there isn't anything embarrassing.",
  },
  { id: "2", q: "Komisyon oranları yükseltilebilir mi?", a: "" },
  { id: "3", q: "Komisyon oranları yükseltilebilir mi?", a: "" },
  { id: "4", q: "Komisyon oranları yükseltilebilir mi?", a: "" },
  { id: "5", q: "Komisyon oranları yükseltilebilir mi?", a: "" },
]

export default function IsOrtakligiPage() {
  return (
    <AccountPageLayout title="İş Ortaklığım" icon={Agreement02Icon}>
      <div className="flex flex-col gap-5">

        <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-purple-900 to-purple-700 p-6">
          <div className="relative z-10 max-w-xs">
            <p className="mb-1 text-xs font-medium text-purple-300">VIP Ortaklığı ile</p>
            <h2 className="mb-2 text-xl font-bold text-white">Seviye atla, $5,000&apos;a varan ödüller kazan</h2>
            <p className="text-xs text-purple-200">Seviye atlayarak, bölümler topla. Toplam $5.000&apos;a varan ödüller toplayın.</p>
          </div>
          <div className="pointer-events-none absolute right-0 top-0 h-full w-[260px] opacity-80">
            <Image src="/images/hero/affiliate-hero.png" alt="" fill className="object-cover object-left" onError={() => {}} />
          </div>
        </div>

        <div className="rounded-2xl bg-background-main p-6">
          <div className="mb-4 flex items-center justify-between">
            <h3 className="text-sm font-semibold text-text-title">İstatistikler</h3>
            <div className="flex items-center gap-4 text-xs text-text-subtext">
              <span>Toplam Ödül</span>
              <span>Referansınız</span>
              <span>Yatırım/aktif Aktif</span>
            </div>
          </div>
          <div className="mb-4 flex items-center justify-between">
            <span />
            <div className="flex items-center gap-8">
              <div className="flex items-center gap-1">
                <span className="text-amber-400">🪙</span>
                <span className="font-semibold text-text-title">20.125</span>
              </div>
              <div className="flex items-center gap-1">
                <span className="text-icon">👤</span>
                <span className="font-semibold text-text-title">18</span>
              </div>
              <div className="flex items-center gap-1">
                <span className="text-amber-400">🪙</span>
                <span className="font-semibold text-text-title">162.320</span>
              </div>
            </div>
          </div>

          <div className="flex items-center justify-between rounded-xl bg-green-500/15 px-5 py-3">
            <div className="flex items-center gap-2">
              <div className="flex size-8 items-center justify-center rounded-full bg-green-500/30">
                <span className="text-sm text-green-400">🪙</span>
              </div>
              <span className="font-semibold text-text-title">4.520,21</span>
            </div>
            <Button variant="secondary" size="sm">Paraya Çek</Button>
          </div>
        </div>

        <div className="rounded-2xl bg-background-main p-6">
          <div className="mb-4 flex items-center justify-between">
            <h3 className="text-sm font-semibold text-text-title">Kampanyalar</h3>
            <Button variant="secondary" size="sm">
              <HugeiconsIcon icon={Add01Icon} className="size-4" />
              Yeni Kampanya
            </Button>
          </div>

          <div className="overflow-hidden rounded-xl border border-element-border">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-element-border bg-background-elements">
                  <th className="px-4 py-3 text-left text-xs font-medium text-text-subtext">AD</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-text-subtext">KOMİSYON</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-text-subtext">REFERANS</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-text-subtext">KAZANÇ</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-element-border">
                {campaigns.map((c, i) => (
                  <tr key={i} className="hover:bg-background-elements/40">
                    <td className="px-4 py-3 font-medium text-text-title">{c.name}</td>
                    <td className="px-4 py-3 text-text-subtext">{c.commission}</td>
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-1 text-text-subtext">
                        <span className="text-icon">👤</span>
                        {c.referans}
                      </div>
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-1">
                        <span className="text-amber-400">🪙</span>
                        <span className="text-text-main">-{c.kazanc.toLocaleString()}</span>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="rounded-2xl bg-background-main p-6">
          <h3 className="mb-4 text-sm font-semibold text-text-title">Merak edilenler</h3>
          <Accordion type="single" collapsible className="flex flex-col gap-2">
            {faqItems.map((faq) => (
              <AccordionItem
                key={faq.id}
                value={faq.id}
                className="rounded-xl border border-transparent bg-background-elements data-[state=open]:border-primary"
              >
                <AccordionTrigger className="px-4 py-3 text-sm font-medium text-text-main hover:no-underline [&>svg]:text-icon">
                  {faq.q}
                </AccordionTrigger>
                <AccordionContent className="px-4 pb-4">
                  {faq.a ? (
                    <div>
                      <p className="text-sm text-text-subtext">{faq.a}</p>
                      <button className="mt-3 flex items-center gap-1 text-xs font-medium text-primary hover:underline">
                        <span className="size-4 rounded bg-primary/20 text-center text-primary">i</span>
                        Bu cevap yeterli gelmedi mi? Canlı Desteğe Bağlanın
                      </button>
                    </div>
                  ) : (
                    <p className="text-sm text-text-subtext">İçerik yükleniyor...</p>
                  )}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    </AccountPageLayout>
  )
}
