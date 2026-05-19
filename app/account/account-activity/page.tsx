"use client"

import { useState } from "react"
import { Activity01Icon } from "@/lib/icons"
import { AccountPageLayout } from "@/components/account/account-page-layout"
import { Tabs, TabsContent } from "@/components/ui/tabs"
import { TabList } from "@/components/elements/tab-list"

const rows = [
  {
    id: "Chrome",
    browserIcon: "🟢",
    bolge: "CA, Toronto",
    ip: "192.241.525.15",
    tarih: "14.02.2025 14:30",
    status: "active" as const,
  },
  {
    id: "Safari",
    browserIcon: "🔵",
    bolge: "TR, İstanbul",
    ip: "192.241.525.15",
    tarih: "14.02.2025 14:30",
    status: "past" as const,
  },
  {
    id: "Bilinmiyor",
    browserIcon: "⚫",
    bolge: "TR, İstanbul",
    ip: "192.241.525.15",
    tarih: "14.02.2025 14:30",
    status: "past" as const,
  },
]

const inputCls =
  "rounded-xl border border-element-border bg-background-elements px-3 py-2 text-sm text-text-main focus:outline-none focus:border-primary transition-colors"

function SessionTable() {
  const [startDate, setStartDate] = useState("11 Tem 2025")
  const [endDate, setEndDate] = useState("13 Tem 2025")

  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center gap-2">
        <input type="text" value={startDate} onChange={(e) => setStartDate(e.target.value)} className={inputCls} />
        <input type="text" value={endDate} onChange={(e) => setEndDate(e.target.value)} className={inputCls} />
      </div>
      <div className="overflow-hidden rounded-2xl border border-element-border bg-background-main">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-element-border">
              <th className="px-5 py-3 text-left text-xs font-medium text-text-subtext">ID</th>
              <th className="px-5 py-3 text-left text-xs font-medium text-text-subtext">Bölge</th>
              <th className="px-5 py-3 text-left text-xs font-medium text-text-subtext">IP</th>
              <th className="px-5 py-3 text-left text-xs font-medium text-text-subtext">TARİH</th>
              <th className="px-5 py-3 text-left text-xs font-medium text-text-subtext"></th>
            </tr>
          </thead>
          <tbody className="divide-y divide-element-border">
            {rows.map((row) => (
              <tr key={row.id} className="hover:bg-background-elements/30">
                <td className="px-5 py-4">
                  <div className="flex items-center gap-2">
                    <span>{row.browserIcon}</span>
                    <span className="font-medium text-text-title">{row.id}</span>
                  </div>
                </td>
                <td className="px-5 py-4 text-text-subtext">{row.bolge}</td>
                <td className="px-5 py-4 font-mono text-xs text-text-subtext">{row.ip}</td>
                <td className="px-5 py-4 text-text-subtext">{row.tarih}</td>
                <td className="px-5 py-4">
                  {row.status === "active" ? (
                    <span className="flex items-center gap-1.5 rounded-full border border-green-500/30 bg-green-500/10 px-3 py-1 text-xs font-medium text-green-500">
                      <span className="size-1.5 rounded-full bg-green-500" />
                      Etkin
                    </span>
                  ) : (
                    <span className="flex items-center gap-1.5 text-xs text-text-subtext">
                      <span className="size-2 rounded-full border border-divider-100" />
                      Geçmiş
                    </span>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default function HesapHareketlerimPage() {
  return (
    <AccountPageLayout title="Hesap Hareketlerim" icon={Activity01Icon}>
      <Tabs defaultValue="hareketler">
        <TabList
          tabs={[
            { value: "spor", label: "Spor" },
            { value: "casino", label: "Casino" },
            { value: "hareketler", label: "Hesap Hareketleri" },
          ]}
        />
        <TabsContent value="spor" className="mt-4">
          <SessionTable />
        </TabsContent>
        <TabsContent value="casino" className="mt-4">
          <SessionTable />
        </TabsContent>
        <TabsContent value="hareketler" className="mt-4">
          <SessionTable />
        </TabsContent>
      </Tabs>
    </AccountPageLayout>
  )
}
