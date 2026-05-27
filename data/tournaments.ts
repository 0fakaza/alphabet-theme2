import type { CasinoLobbyGame } from "@/lib/casino-lobby-filters"
import { CASINO_LOBBY_CATALOG } from "@/data/casino-lobby-catalog"

export type TournamentState = "ongoing" | "planned" | "completed"

export type LeaderboardRow = {
  rank: number
  user: string
  points: string
  reward: string
  dimmed?: boolean
}

export type TournamentDetail = {
  description: string
  bullets: string[]
  leaderboard: LeaderboardRow[]
  
  eligibleGames: CasinoLobbyGame[]
}

export type Tournament = {
  id: string
  title: string
  image: string
  startLabel: string
  endLabel: string
  pool: string
  state: TournamentState
  href: string
  
  detail?: TournamentDetail
}

export const DEFAULT_TOURNAMENT_DETAIL: TournamentDetail = {
  description:
    "Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old. Richard McClintock, a Latin professor at Hampden-Sydney College in Virginia, looked up one of the more obscure Latin words, consectetur, from a Lorem Ipsum passage, and going through the cites of the word in classical literature, discovered the undoubtable source. Lorem Ipsum comes from sections 1.10.32 and 1.10.33 of \"de Finibus Bonorum et Malorum\" (The Extremes of Good and Evil) by Cicero, written in 45 BC. This book is a treatise on the theory of ethics, very popular during the Renaissance. The first line of Lorem Ipsum, \"Lorem ipsum dolor sit amet..\", comes from a line in section 1.10.32.",
  bullets: [
    "The undoubtable source. Lorem Ipsum comes from sections 1.10.32 and 1.10.33 of \"de Finibus Bonorum et Malorum\".",
    "This book is a treatise on the theory of ethics, very popular during the Renaissance.",
    "The first line of Lorem Ipsum, \"Lorem ipsum dolor sit amet..\", comes from a line in section 1.10.32.",
  ],
  leaderboard: [
    { rank: 1, user: "Filizakc", points: "1052P", reward: "10.000.000" },
    { rank: 2, user: "demirr", points: "1012P", reward: "5.000.000" },
    { rank: 3, user: "alpersagdam", points: "982P", reward: "3.000.000" },
    { rank: 4, user: "Chrome", points: "952P", reward: "1.000.000" },
    { rank: 5, user: "Chrome", points: "811P", reward: "500.000" },
    { rank: 6, user: "Chrome", points: "732P", reward: "250.000", dimmed: true },
    { rank: 7, user: "Chrome", points: "357P", reward: "100.000", dimmed: true },
  ],
  eligibleGames: CASINO_LOBBY_CATALOG.slice(0, 8).map((g) => ({ ...g })),
}

export function getTournamentDetail(t: Tournament): TournamentDetail {
  return t.detail ?? DEFAULT_TOURNAMENT_DETAIL
}

export const TOURNAMENTS: Tournament[] = [
  {
    id: "1",
    title: "35.000.000₺ Ödüllü 2-8 Haziran Haftalık Slot Turnuvası",
    image: "/images/turnuva.jpg",
    startLabel: "14 Ağu 2025 23:59",
    endLabel: "21 Ağu 2025 23:59",
    pool: "₺21.000.000",
    state: "planned",
    href: "/promo",
  },
  {
    id: "2",
    title: "35.000.000₺ Ödüllü 2-8 Haziran Haftalık Slot Turnuvası",
    image: "/images/turnuva.jpg",
    startLabel: "10 Haz 2025 12:00",
    endLabel: "16 Haz 2025 12:00",
    pool: "₺21.000.000",
    state: "ongoing",
    href: "/promo",
  },
  {
    id: "3",
    title: "35.000.000₺ Ödüllü 2-8 Haziran Haftalık Slot Turnuvası",
    image: "/images/turnuva.jpg",
    startLabel: "1 Haz 2025 00:00",
    endLabel: "7 Haz 2025 23:59",
    pool: "₺21.000.000",
    state: "ongoing",
    href: "/promo",
  },
  {
    id: "4",
    title: "35.000.000₺ Ödüllü 2-8 Haziran Haftalık Slot Turnuvası",
    image: "/images/turnuva.jpg",
    startLabel: "1 May 2025 00:00",
    endLabel: "5 May 2025 23:59",
    pool: "₺21.000.000",
    state: "completed",
    href: "/promo",
  },
  {
    id: "5",
    title: "Pragmatic Drops & Wins Ağustos Serisi",
    image: "/images/turnuva.jpg",
    startLabel: "1 Ağu 2025 10:00",
    endLabel: "31 Ağu 2025 23:59",
    pool: "₺5.000.000",
    state: "planned",
    href: "/promo",
  },
  {
    id: "6",
    title: "Canlı Casino Rakeback Yarışması",
    image: "/images/turnuva.jpg",
    startLabel: "20 Tem 2025 00:00",
    endLabel: "30 Tem 2025 23:59",
    pool: "₺1.200.000",
    state: "completed",
    href: "/promo",
  },
]

export function filterTournaments(filter: string, list: Tournament[]): Tournament[] {
  if (filter === "all") return list
  if (filter === "ongoing") return list.filter((t) => t.state === "ongoing")
  if (filter === "planned") return list.filter((t) => t.state === "planned")
  if (filter === "completed") return list.filter((t) => t.state === "completed")
  return list
}
