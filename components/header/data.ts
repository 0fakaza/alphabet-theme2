import {
  FootballIcon,
  DiceIcon,
  Diamond01Icon,
  Tv01Icon,
  FootballPitchIcon,
  WhistleIcon,
  Cards02Icon,
  CherryIcon
} from "@/lib/icons"

export const languages = [
  { code: "TR", label: "Türkçe", flag: "/images/flags/154-turkey.svg" },
  { code: "EN", label: "English", flag: "/images/flags/110-united kingdom.svg" },
  { code: "DE", label: "Deutsch", flag: "/images/flags/208-germany.svg" },
]

export const navLinks = [
  { href: "/help", label: "Yardım" },
  { href: "/vip-club", label: "VIP Club" },
  { href: "/canli-tv", label: "Canlı TV" },
  { href: "/arkadasini-getir", label: "Arkadaşını Getir", highlight: true },
]

export const categoryTabs = [
  { href: "/spor", label: "Spor", icon: FootballPitchIcon },
  { href: "/casino", label: "Casino", icon: CherryIcon },
  { href: "/canli-casino", label: "Canlı Casino", icon: Cards02Icon },
  { href: "/canli-spor", label: "Canlı Spor", icon: WhistleIcon },
  { href: "/tournaments", label: "Turnuvalar", icon: WhistleIcon },
]


export function isCategoryTabActive(pathname: string, href: string): boolean {
  if (pathname === href) return true
  if (href !== "/" && pathname.startsWith(`${href}/`)) return true
  return false
}

export const crashGames = [
  { name: "Wheel", players: 6212, image: "/images/games/wheel.png" },
  { name: "Dice", players: 6212, image: "/images/games/dice.png" },
  { name: "Mines", players: 6212, image: "/images/games/mines.png" },
  { name: "Plinko", players: 6212, image: "/images/games/plinko.png" },
  { name: "Chicken", players: 6212, image: "/images/games/chicken.png" },
  { name: "Crash", players: 6212, image: "/images/games/crash.png" },
  { name: "Limbo", players: 6212, image: "/images/games/limbo.png" },
  { name: "Hilo", players: 6212, image: "/images/games/hilo.png" },
  { name: "Snakes", players: 6212, image: "/images/games/snakes.png" },
  { name: "Darts", players: 6212, image: "/images/games/darts.png" },
  { name: "Bars", players: 6212, image: "/images/games/bars.png" },
  { name: "Cases", players: 6212, image: "/images/games/cases.png" },
]

export type SidebarSubmenuItem = { label: string; href: string; icon: string }

export type SidebarLink =
  | { type?: "link"; label: string; href: string; badge?: string; comingSoon?: boolean }
  | { type: "accordion"; label: string; submenu: SidebarSubmenuItem[] }

export const sidebarLinks: SidebarLink[] = [
  { label: "Sanal Sporlar", href: "/sanal-sporlar" },
  {
    type: "accordion",
    label: "Ödül Merkezi",
    submenu: [
      { label: "Görev Merkezi", href: "/rewards-center/task-center", icon: "task" },
      { label: "Ödül Yağmuru", href: "/rewards-center/reward-rain", icon: "rain" },
      { label: "Şans Çarkı", href: "/rewards-center/lucky-wheel", icon: "wheel" },
      { label: "Market", href: "/rewards-center/market", icon: "market" },
    ],
  },
]
