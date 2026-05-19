"use client"

import { useState } from "react"
import { HugeiconsIcon, CancelCircleIcon } from "@/lib/icons"
import { Button } from "@/components/elements/button"

const TopBanner = () => {
  const [visible, setVisible] = useState(true)

  if (!visible) return null

  return (
    <div className="  bg-cover bg-center bg-no-repeat" style={{ backgroundImage: "url('/images/other/notify-back.jpg')" }}>
      <div className=" h-[58px] container flex  items-center justify-between">
        <div />
        <p className="text-center text-xs font-medium text-white">
          Sonraki domain adresimiz <span className="font-bold underline">alphabe412.com</span>
        </p>
        <Button
          variant="ghost"
          onClick={() => setVisible(false)}
          className="text-white/95 hover:text-white"
          iconRight={<HugeiconsIcon icon={CancelCircleIcon} className="size-3.5" />}
        >
          Kapat
        </Button>
      </div>
    </div>
  )
}

export default TopBanner
