"use client"

import { useMemo, useState } from "react"
import { cn } from "@/lib/utils"
import { HugeiconsIcon, Notification01Icon, GiftIcon, CreditCardIcon, GameController02Icon, More01Icon } from "@/lib/icons"
import { AccountPageLayout } from "@/components/account/account-page-layout"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

type Category = "all" | "bonus" | "payment" | "new-games" | "other"

const categories = [
  { id: "all" as Category, label: "Tüm Bildirimler" },
  { id: "bonus" as Category, label: "Bonus / Freespin" },
  { id: "payment" as Category, label: "Yatırım / Çekim" },
  { id: "new-games" as Category, label: "Yeni Oyunlar" },
  { id: "other" as Category, label: "Diğer" },
]

function getUnreadCount(list: typeof notifications, category: Category): number {
  if (category === "all") return list.filter((n) => !n.read).length
  return list.filter((n) => n.category === category && !n.read).length
}

const notifications = [
  {
    id: 1,
    category: "bonus" as Category,
    icon: GiftIcon,
    iconBg: "bg-amber-500/20",
    iconColor: "text-amber-500",
    title: "Freespin hesabına tanımlandı",
    desc: "Sweet Bonanza oyununda geçerli 2 5 Ürü 100FS tanımlandı.",
    action: "Detaylar",
    date: "10 Ock 2025 14:30",
    read: false,
  },
  {
    id: 2,
    category: "new-games" as Category,
    icon: GameController02Icon,
    iconBg: "bg-blue-500/20",
    iconColor: "text-blue-500",
    title: "Yeni güncelleme",
    desc: "Artık Pappara ile yatırım yapabilirsiniz.",
    action: null,
    date: "10 Ock 2025 14:30",
    read: false,
  },
  {
    id: 3,
    category: "other" as Category,
    icon: More01Icon,
    iconBg: "bg-neutral-500/30",
    iconColor: "text-icon",
    title: "Fatura belgesi talebi",
    desc: "Hesabınızın onaylanması ve yatırım/çekim işlemleri için belge doğrulanıyor.",
    action: null,
    date: "10 Ock 2025 14:30",
    read: true,
  },
  {
    id: 4,
    category: "payment" as Category,
    icon: CreditCardIcon,
    iconBg: "bg-neutral-500/30",
    iconColor: "text-icon",
    title: "1.500TRY hesabına yatırıldı",
    desc: "Hesabınızın onaylanması ve yatırım/çekim işlemleri için belge doğrulanıyor.",
    action: null,
    date: "10 Ock 2025 14:30",
    read: true,
  },
]

export default function BildirimlerPage() {
  const [activeCategory, setActiveCategory] = useState<Category>("all")

  const unreadByCategory = useMemo(() => {
    return Object.fromEntries(
      categories.map((cat) => [cat.id, getUnreadCount(notifications, cat.id)]),
    ) as Record<Category, number>
  }, [])

  const filtered = activeCategory === "all"
    ? notifications
    : notifications.filter((n) => n.category === activeCategory)

  return (
    <AccountPageLayout title="Bildirimler" icon={Notification01Icon}>
      <div className="flex flex-col gap-4">
        <div className="flex items-center gap-3 md:hidden">
          <span className="shrink-0 text-sm font-medium text-text-subtext">Göster</span>
          <Select value={activeCategory} onValueChange={(v) => setActiveCategory(v as Category)}>
            <SelectTrigger className="h-auto flex-1 rounded-xl border-element-border bg-background-elements px-4 py-2.5 text-sm text-text-main data-[size=default]:h-auto">
              <SelectValue />
            </SelectTrigger>
            <SelectContent className="border-element-border bg-background-elements">
              {categories.map((cat) => {
                const unread = unreadByCategory[cat.id]
                return (
                  <SelectItem key={cat.id} value={cat.id}>
                    <div className="flex w-full items-center justify-between gap-2">
                      <span className="flex items-center gap-1.5">
                        {cat.label}
                        {unread > 0 && <span className="size-1.5 rounded-full bg-primary" aria-hidden />}
                      </span>
                      {unread > 0 && <span className="text-sm font-medium text-primary">({unread})</span>}
                    </div>
                  </SelectItem>
                )
              })}
            </SelectContent>
          </Select>
        </div>

        <div className="grid grid-cols-1 gap-5 md:grid-cols-[225px_1fr]">
          <div className="hidden md:block h-fit rounded-2xl bg-background-main p-5">
            {categories.map((cat) => {
              const isActive = activeCategory === cat.id
              const unread = unreadByCategory[cat.id]
              return (
                <button
                  key={cat.id}
                  onClick={() => setActiveCategory(cat.id)}
                  className={cn(
                    "mb-1 flex w-full cursor-pointer items-center justify-between gap-2 rounded-md pl-4 pr-2  py-3 text-left text-sm transition-colors",
                    isActive
                      ? "bg-background-body text-text-main"
                      : "text-text-main hover:bg-background-elements/50",
                  )}
                >
                  <span className="flex min-w-0 items-center gap-1.5">
                    <span className="truncate">{cat.label}</span>
                    {unread > 0 && <span className="size-1 shrink-0 rounded-full bg-primary" aria-hidden />}
                  </span>
                  {unread > 0 && (
                    <span className="shrink-0 text-sm font-medium text-primary">({unread})</span>
                  )}
                </button>
              )
            })}
          </div>

          <div className="flex flex-1 flex-col divide-y divide-divider-100 md:pl-5">
          {filtered.map((n) => (
            <div key={n.id} className="py-4">
              <span className="mb-2 block text-xs text-text-main md:hidden">{n.date}</span>
              <div className="flex items-start gap-4">
                <HugeiconsIcon icon={n.icon} className={cn("mt-0.5 size-5 shrink-0", !n.read ? "text-primary" : n.iconColor)} />
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-2">
                    <p className={cn("text-sm font-medium", !n.read ? "text-primary" : "text-text-main")}>{n.title}</p>
                    <span className="hidden shrink-0 whitespace-nowrap text-xs text-text-main md:block">{n.date}</span>
                  </div>
                  <p className="mt-0.5 text-xs text-text-subtext">{n.desc}</p>
                  {n.action && (
                    <button className="mt-1.5 text-xs font-medium text-text-subtext cursor-pointer underline hover:text-primary">{n.action}</button>
                  )}
                </div>
              </div>
            </div>
          ))}
          </div>
        </div>
      </div>
    </AccountPageLayout>
  )
}
