import type { Metadata } from "next"
import { TurnuvalarContent } from "@/components/turnuvalar/turnuvalar-content"
import { TurnuvalarHero } from "@/components/turnuvalar/turnuvalar-hero"

export const metadata: Metadata = {
  title: "Tournaments",
  description: "Browse active and upcoming casino tournaments, pool prizes, and details.",
}

export default function TournamentsPage() {
  return (
    <main>
      <TurnuvalarHero />
      <TurnuvalarContent />
    </main>
  )
}
