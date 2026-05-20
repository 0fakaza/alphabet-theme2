"use client"

import { useState } from "react"
import Image from "next/image"
import { Coupon01Icon } from "@/lib/icons"
import { AccountPageLayout } from "@/components/account/account-page-layout"
import { AccountModal } from "@/components/account/account-modal"
import { BonusCardItem, bonusCards } from "@/components/account/bonus-card"
import { Button } from "@/components/elements/button"

export default function BonusTalepPage() {
  const [limitPopup, setLimitPopup] = useState(false)

  return (
    <>
      <AccountPageLayout title="Bonus Talep Et" icon={Coupon01Icon}>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {bonusCards.map((card) => (
            <BonusCardItem
              key={card.id}
              card={card}
              onRequest={() => {
                if (card.status === "requested") setLimitPopup(true)
              }}
            />
          ))}
        </div>
      </AccountPageLayout>

      {limitPopup && (
        <AccountModal title="Kupon Detay" onClose={() => setLimitPopup(false)}>
          <div className="flex flex-col items-center gap-4 py-4 text-center">
            <span className="inline-flex rounded-full shadow-[0_24px_54px_0_rgba(255,159,152,0.45)]">
              <Image src="/images/icons/danger.svg" alt="" width={68} height={68} />
            </span>
            <div>
              <p className="font-semibold text-text-title">Talep alınmadı</p>
              <p className="mt-1 text-sm text-text-subtext">Aynı anda en fazla 1 bonus talep edebilirsiniz.</p>
            </div>
            <Button variant="outline" className="w-full" onClick={() => setLimitPopup(false)}>
              Kapat
            </Button>
          </div>
        </AccountModal>
      )}
    </>
  )
}
