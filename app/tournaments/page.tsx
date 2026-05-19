import type { Metadata } from "next"
import { TournamentsContent } from "@/components/tournaments/tournaments-content"
import { TournamentsHero } from "@/components/tournaments/tournaments-hero"

export const metadata: Metadata = {
  title: "Tournaments",
  description: "Browse active and upcoming casino tournaments, pool prizes, and details.",
}

export default function TournamentsPage() {
  return (
    <main>
      <TournamentsHero />
      <TournamentsContent />
    </main>
  )
}
