import { PartnershipFeatures } from "@/components/partnership/partnership-features"
import { PartnershipHero } from "@/components/partnership/partnership-hero"
import { PartnershipLeaderboard } from "@/components/partnership/partnership-leaderboard"
import { PartnershipStats } from "@/components/partnership/partnership-stats"
import { PartnershipSteps } from "@/components/partnership/partnership-steps"

export function PartnershipPageContent() {
  return (
    <>
      <PartnershipHero />
      <PartnershipFeatures />
      <PartnershipLeaderboard />
      <PartnershipStats />
      <PartnershipSteps />
    </>
  )
}
