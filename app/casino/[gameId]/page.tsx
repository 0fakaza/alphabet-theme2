import type { Metadata } from "next"
import { notFound } from "next/navigation"
import { getCasinoGameById } from "@/lib/casino-game-detail"
import { getSonOynadiklarimGames } from "@/lib/son-oynadiklarim-games"
import { CasinoGameDetailPage } from "@/components/casino/casino-game-detail-page"

type Props = { params: Promise<{ gameId: string }> }

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { gameId } = await params
  const game = getCasinoGameById(gameId)
  if (!game) {
    return { title: "Oyun bulunamadı" }
  }
  return {
    title: `${game.name} | Casino`,
    description: `${game.name} — ${game.provider} oyun detayı.`,
  }
}

export default async function CasinoGamePage({ params }: Props) {
  const { gameId } = await params
  const game = getCasinoGameById(gameId)
  if (!game) {
    notFound()
  }
  const recentGames = getSonOynadiklarimGames(gameId)
  return (
    <main>
      <CasinoGameDetailPage game={game} recentGames={recentGames} />
    </main>
  )
}
