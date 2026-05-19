import type { Metadata } from "next"
import { VipPageContent } from "@/components/vip/vip-page-content"

export const metadata: Metadata = {
  title: "VIP Club",
  description: "VIP kulüp seviyeleri, özel bonuslar ve kişisel VIP yöneticisi avantajları.",
}

export default function VipClubPage() {
  return (
    <main>
      <VipPageContent />
    </main>
  )
}
