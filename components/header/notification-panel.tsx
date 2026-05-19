"use client"

import * as React from "react"
import {
  HugeiconsIcon,
  Cancel01Icon,
  Notification01Icon,
  GiftIcon,
  CrownIcon,
  Shield01Icon,
  CreditCardIcon,
  PromotionIcon,
} from "@/lib/icons"
import type { IconSvgElement } from "@/lib/icons"

type NotificationType = "bonus" | "deposit" | "vip" | "promotion" | "security"

interface NotificationItem {
  id: string
  type: NotificationType
  title: string
  description: string
  time: string
  read: boolean
}

const INITIAL_NOTIFICATIONS: NotificationItem[] = [
  {
    id: "1",
    type: "bonus",
    title: "Hoş Geldin Bonusu Tanımlandı",
    description: "100 TRY hoş geldin bonusu hesabınıza başarıyla tanımlandı.",
    time: "5 dk",
    read: false,
  },
  {
    id: "2",
    type: "deposit",
    title: "Para Yatırma Başarılı",
    description: "500 TRY tutarındaki yatırım işleminiz onaylandı.",
    time: "1 sa",
    read: false,
  },
  {
    id: "3",
    type: "vip",
    title: "VIP Seviyeniz Yükseltildi",
    description: "Tebrikler! Bronze'dan Silver seviyesine yükseldiniz.",
    time: "3 sa",
    read: false,
  },
  {
    id: "4",
    type: "promotion",
    title: "Yeni Promosyon Mevcut",
    description: "Bu hafta sonu geçerli %50 kayıp bonusu fırsatını kaçırmayın.",
    time: "1 gün",
    read: true,
  },
  {
    id: "5",
    type: "security",
    title: "Yeni Giriş Tespit Edildi",
    description: "Hesabınıza İstanbul, TR konumundan yeni bir giriş yapıldı.",
    time: "2 gün",
    read: true,
  },
]

const typeConfig: Record<NotificationType, { icon: IconSvgElement }> = {
  bonus: { icon: GiftIcon },
  deposit: { icon: CreditCardIcon },
  vip: { icon: CrownIcon },
  promotion: { icon: PromotionIcon },
  security: { icon: Shield01Icon },
}

interface NotificationPanelProps {
  onClose: () => void
  showCloseButton?: boolean
}

export function NotificationPanel({ onClose, showCloseButton = false }: NotificationPanelProps) {
  const [activeTab, setActiveTab] = React.useState<"all" | "unread">("all")
  const [notifications, setNotifications] = React.useState(INITIAL_NOTIFICATIONS)

  const unreadCount = notifications.filter((n) => !n.read).length
  const filteredNotifications =
    activeTab === "unread" ? notifications.filter((n) => !n.read) : notifications

  const markAllRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, read: true })))
  }

  return (
    <div className="flex h-full flex-col overflow-hidden">
      {/* Header */}
      <div className="flex shrink-0 items-center justify-between border-b border-divider-100 px-5 py-4">
        <div className="flex items-center gap-2">
          <HugeiconsIcon icon={Notification01Icon} className="size-5 text-text-main" />
          <h3 className="text-[15px] font-semibold text-text-main">Bildirimler</h3>
          {unreadCount > 0 && (
            <span className="flex h-5 min-w-[20px] items-center justify-center rounded-full bg-primary px-1.5 text-[11px] font-bold text-white">
              {unreadCount}
            </span>
          )}
        </div>
        <div className="flex items-center gap-3">
          {unreadCount > 0 && (
            <button
              onClick={markAllRead}
              className="text-[12px] text-primary transition-opacity hover:opacity-80"
            >
              Tümünü oku
            </button>
          )}
          {showCloseButton && (
            <button
              onClick={onClose}
              className="text-text-subtext transition-colors hover:text-text-main"
            >
              <HugeiconsIcon icon={Cancel01Icon} className="size-5" />
            </button>
          )}
        </div>
      </div>

      {/* Tabs */}
      <div className="flex shrink-0 items-center gap-1 px-4 py-2">
        <button
          onClick={() => setActiveTab("all")}
          className={`rounded-full px-3 py-1 text-[13px] font-medium transition-colors ${
            activeTab === "all"
              ? "bg-neutral-200 text-text-main"
              : "text-text-subtext hover:text-text-main"
          }`}
        >
          Tümü
        </button>
        <button
          onClick={() => setActiveTab("unread")}
          className={`flex items-center gap-1.5 rounded-full px-3 py-1 text-[13px] font-medium transition-colors ${
            activeTab === "unread"
              ? "bg-neutral-200 text-text-main"
              : "text-text-subtext hover:text-text-main"
          }`}
        >
          Okunmamış
          {unreadCount > 0 && (
            <span className="flex h-4 min-w-[16px] items-center justify-center rounded-full bg-primary px-1 text-[10px] font-bold text-white">
              {unreadCount}
            </span>
          )}
        </button>
      </div>

      {/* List */}
      <div className="flex-1 overflow-y-auto [&::-webkit-scrollbar]:hidden">
        {filteredNotifications.length === 0 ? (
          <EmptyState />
        ) : (
          <ul>
            {filteredNotifications.map((item) => (
              <NotificationItemRow key={item.id} item={item} />
            ))}
          </ul>
        )}
      </div>
    </div>
  )
}

function NotificationItemRow({ item }: { item: NotificationItem }) {
  const config = typeConfig[item.type]
  return (
    <li className="flex cursor-pointer items-start gap-2 px-5 py-3 transition-colors hover:bg-neutral-200/40">
      <HugeiconsIcon
        icon={config.icon}
        className={`mt-[1px] size-5 shrink-0 ${!item.read ? "text-primary" : "text-icon"}`}
      />
      <div className="min-w-0 flex-1">
        <div className="flex items-start justify-between gap-2">
          <div className="flex items-center gap-1.5">
            {!item.read && <span className="size-1.5 shrink-0 rounded-full bg-primary" />}
            <p
              className={`text-[13px] leading-[1.4] ${
                !item.read ? "font-semibold text-primary" : "font-medium text-text-main"
              }`}
            >
              {item.title}
            </p>
          </div>
          <div className="flex shrink-0 items-center gap-1.5">
            <span className="whitespace-nowrap text-[11px] text-text-subtext">{item.time}</span>
          </div>
        </div>
        <p className="mt-0.5 line-clamp-2 text-[12px] text-text-subtext">{item.description}</p>
      </div>
    </li>
  )
}

function EmptyState() {
  return (
    <div className="flex flex-col items-center justify-center px-8 py-16">
      <div className="mb-4 flex size-16 items-center justify-center rounded-full bg-neutral-200">
        <HugeiconsIcon icon={Notification01Icon} className="size-8 text-text-subtext" />
      </div>
      <h4 className="mb-1 text-[15px] font-semibold text-text-main">Henüz bildirim yok</h4>
      <p className="text-center text-[13px] text-text-subtext">
        Yeni bildirimler burada görünecek
      </p>
    </div>
  )
}
