"use client"

import { useState } from "react"
import { HugeiconsIcon, GiftIcon, Cancel01Icon } from "@/lib/icons"
import { Coupon01Icon } from "@/lib/icons"
import { AccountPageLayout } from "@/components/account/account-page-layout"
import { AccountModal } from "@/components/account/account-modal"
import { BonusCardItem, bonusCards } from "@/components/account/bonus-card"
import { Button } from "@/components/elements/button"
import { Tabs, TabsContent } from "@/components/ui/tabs"
import { TabList } from "@/components/elements/tab-list"
import Link from "next/link"

const activeCards = bonusCards.slice(0, 2)

export default function BonuslarimPage() {
  const [activeTab, setActiveTab] = useState("active")
  const [limitPopup, setLimitPopup] = useState(false)

  return (
    <>
      <AccountPageLayout
        title="Bonuslarım"
        icon={GiftIcon}
        headerRight={
          <Link href="/account/bonus-request">
            <Button variant="outline" size="sm">
              <HugeiconsIcon icon={Coupon01Icon} className="size-4" />
              Bonus Talep et
            </Button>
          </Link>
        }
      >
        <Tabs value={activeTab} onValueChange={setActiveTab} className="mb-5">
          <TabList
            tabs={[
              { value: "active", label: "Aktif Bonuslar" },
              { value: "past", label: "Geçmiş Bonuslar" },
            ]}
          />
          <TabsContent value="active" className="mt-5">
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {activeCards.map((card) => (
                <BonusCardItem key={card.id} card={card} />
              ))}
            </div>
          </TabsContent>
          <TabsContent value="past" className="mt-5">
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {bonusCards.map((card) => (
                <BonusCardItem key={card.id} card={card} />
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </AccountPageLayout>

      {limitPopup && (
        <AccountModal title="Kupon Detay" onClose={() => setLimitPopup(false)}>
          <div className="flex flex-col items-center gap-4 py-4 text-center">
            <div className="flex size-14 items-center justify-center rounded-full bg-semantic-error/20">
              <span className="text-2xl text-semantic-error">!</span>
            </div>
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
