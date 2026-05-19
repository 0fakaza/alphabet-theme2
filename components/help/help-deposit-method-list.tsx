"use client"

import Image from "next/image"
import { HugeiconsIcon, ArrowDown01Icon } from "@/lib/icons"
import { cn } from "@/lib/utils"
import type { HelpDepositMethod } from "@/data/help"

type HelpDepositMethodListProps = {
  methods: HelpDepositMethod[]
  onSelectMethod: (method: HelpDepositMethod) => void
}

export function HelpDepositMethodList({ methods, onSelectMethod }: HelpDepositMethodListProps) {
  if (methods.length === 0) {
    return <p className="py-12 text-center text-sm text-text-subtext">Sonuç bulunamadı.</p>
  }

  return (
    <ul className="flex flex-col gap-2 lg:gap-3">
      {methods.map((method) => (
        <li key={method.id}>
          <button
            type="button"
            onClick={() => onSelectMethod(method)}
            className={cn(
              "flex w-full  cursor-pointer items-center rounded-xl bg-neutral-500 text-left transition-colors hover:bg-neutral-600",
              "justify-between px-3 py-3 pr-5 lg:min-h-0 lg:justify-start lg:gap-2 lg:px-4  lg:pr-4",
            )}
          >
            <span className="flex min-w-0 flex-1 items-center gap-3 lg:gap-2">
              <span className="flex size-[52px] shrink-0 items-center justify-center">
                <Image
                  src={method.videoCardIcon}
                  alt=""
                  width={52}
                  height={52}
                  className="object-contain"
                />
              </span>
              <span className="text-sm font-bold tracking-wide text-text-main lg:font-semibold">
                {method.title}
              </span>
            </span>
            <span className="shrink-0 text-[13px] font-semibold text-text-subtext underline lg:hidden">
              Bilgi Edin
            </span>
            <HugeiconsIcon
              icon={ArrowDown01Icon}
              className="hidden size-5 shrink-0 -rotate-90 text-icon lg:block"
              aria-hidden
            />
          </button>
        </li>
      ))}
    </ul>
  )
}
