"use client"

import { useState } from "react"
import { cn } from "@/lib/utils"
import { HugeiconsIcon, CallIcon } from "@/lib/icons"
import { AccountPageLayout } from "@/components/account/account-page-layout"
import { Button } from "@/components/elements/button"

type Channel = "whatsapp" | "telegram" | "telefon"

const channels: { id: Channel; label: string; icon: string }[] = [
  { id: "whatsapp", label: "Whatsapp ile iletişime geç", icon: "💬" },
  { id: "telegram", label: "Telegram ile iletişime geç", icon: "✈️" },
  { id: "telefon", label: "Telefon ile iletişime geç", icon: "📱" },
]

const channelLabels: Record<Channel, string> = {
  whatsapp: "Whatsapp",
  telegram: "Telegram",
  telefon: "Telefon",
}

const inputCls = "w-full rounded-xl border border-element-border bg-background-elements px-4 py-3 text-sm text-text-main placeholder:text-text-subtext focus:outline-none focus:border-primary transition-colors"

export default function AramaTalepPage() {
  const [channel, setChannel] = useState<Channel>("whatsapp")
  const [phone, setPhone] = useState("")
  const [date, setDate] = useState("8 Ekim 2025")
  const [time, setTime] = useState("14:30")
  const [address, setAddress] = useState("Ünsalan, Libadiye Co. No: 80 G Blok, 34700 Üsküdar/ İstanbulasldmasjdlaksjdlkasjdlkjasldjkasldjkasjdlkasjdkljasldjkasjdlkasjdkljasldj djasldjasldjas")

  return (
    <AccountPageLayout title="Arama Talep Et" icon={CallIcon}>
      <div className="grid grid-cols-1 gap-5 md:grid-cols-[280px_1fr]">

        <div className="rounded-2xl bg-background-main border border-element-border p-5">
          <p className="mb-4 text-sm font-semibold text-text-title">İletişim kanalı seçin</p>
          <div className="flex flex-col gap-2">
            {channels.map((ch) => (
              <button
                key={ch.id}
                onClick={() => setChannel(ch.id)}
                className={cn(
                  "flex items-center justify-between rounded-xl px-4 py-3 text-sm font-medium transition-colors",
                  channel === ch.id
                    ? "bg-background-elements text-text-title"
                    : "text-text-subtext hover:bg-background-elements/50",
                )}
              >
                <div className="flex items-center gap-3">
                  <span>{ch.icon}</span>
                  <span>{ch.label}</span>
                </div>
                {channel === ch.id && (
                  <div className="size-2.5 rounded-full bg-green-400" />
                )}
              </button>
            ))}
          </div>
        </div>

        <div className="rounded-2xl bg-background-main border border-element-border p-5">
          <p className="mb-5 text-sm font-semibold text-text-title">
            {channelLabels[channel]} için iletişim bilgileri
          </p>
          <div className="flex flex-col gap-4">
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-medium text-text-subtext">Telefon *</label>
                <div className="flex items-center gap-2">
                  <span className="flex h-12 shrink-0 items-center gap-1 rounded-xl border border-element-border bg-background-elements px-3 text-sm">
                    🇹🇷 +90
                  </span>
                  <input
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className={inputCls}
                    placeholder="5XX XXX XX XX"
                  />
                </div>
              </div>
              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-medium text-text-subtext">Tarih *</label>
                <input
                  type="text"
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                  className={inputCls}
                  placeholder="GG/AA/YYYY"
                />
              </div>
              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-medium text-text-subtext">Saat *</label>
                <input
                  type="text"
                  value={time}
                  onChange={(e) => setTime(e.target.value)}
                  className={inputCls}
                  placeholder="HH:MM"
                />
              </div>
            </div>

            <div className="flex flex-col gap-1.5">
              <textarea
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                rows={4}
                className={cn(inputCls, "resize-none")}
              />
            </div>

            <div>
              <Button variant="secondary" size="sm">Talep Gönder</Button>
            </div>
          </div>
        </div>
      </div>
    </AccountPageLayout>
  )
}
