import type { Metadata } from "next"
import { PartnershipPageContent } from "@/components/partnership/partnership-page-content"

export const metadata: Metadata = {
  title: "İş Ortaklığı",
  description: "Avantajlı affiliate programı, yüksek komisyon oranları ve ödeme seçenekleri.",
}

export default function PartnershipPage() {
  return (
    <main>
      <PartnershipPageContent />
    </main>
  )
}
