import { VipBenefits } from "@/components/vip/vip-benefits"
import { VipFaq } from "@/components/vip/vip-faq"
import { VipHero } from "@/components/vip/vip-hero"
import { VipLevelsSection } from "@/components/vip/vip-levels-section"

export function VipPageContent() {
  return (
    <>
      <VipHero />
      <VipBenefits />
      <VipLevelsSection />
      <VipFaq />
    </>
  )
}
