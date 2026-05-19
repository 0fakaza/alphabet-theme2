"use client"

import Link from "next/link"
import { HugeiconsIcon, HeadsetIcon } from "@/lib/icons"
import { cn } from "@/lib/utils"
import type { HelpFaqItem } from "@/data/help"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { HelpPanelToolbar } from "@/components/help/help-panel-toolbar"

type HelpFaqSectionProps = {
  categoryTitle: string
  panelSearch: string
  onPanelSearchChange: (v: string) => void
  items: HelpFaqItem[]
}

export function HelpFaqSection({
  categoryTitle,
  panelSearch,
  onPanelSearchChange,
  items,
}: HelpFaqSectionProps) {
  return (
    <>
      <div className="max-lg:[&_h2]:sr-only">
        <HelpPanelToolbar
          title={categoryTitle}
          searchValue={panelSearch}
          onSearchChange={onPanelSearchChange}
          placeholder="Bu bölümde ara..."
          ariaLabel={`${categoryTitle} içinde ara (yalnızca bu sekme)`}
        />
      </div>
      {items.length === 0 ? (
        <p className="py-12 text-center text-sm text-text-subtext">Sonuç bulunamadı.</p>
      ) : (
        <Accordion type="single" collapsible className="flex w-full flex-col gap-3">
          {items.map((item) => (
            <AccordionItem
              key={item.id}
              value={item.id}
              className={cn(
                "group rounded-xl border border-transparent bg-neutral-500 not-last:border-b-0",
                "data-[state=open]:border-primary data-[state=open]:shadow-[0_0_0_1px_hsl(var(--primary)/0.15)]",
              )}
            >
              <AccordionTrigger
                className={cn(
                  "min-h-14 cursor-pointer items-center px-4 py-4 text-left text-sm font-semibold text-text-main hover:no-underline",
                  "focus-visible:ring-offset-0 group-data-[state=open]:text-primary",
                  "[&_[data-slot=accordion-trigger-icon]]:ml-auto [&_[data-slot=accordion-trigger-icon]]:size-5",
                  "[&_[data-slot=accordion-trigger-icon]]:text-icon",
                  "group-data-[state=open]:[&_[data-slot=accordion-trigger-icon]]:text-primary",
                )}
              >
                {item.title}
              </AccordionTrigger>
              <AccordionContent className="px-4 pb-4 pt-0 text-sm font-medium leading-relaxed tracking-wide text-text-subtitle">
                <p>{item.content}</p>
                <Link
                  href="/destek"
                  className="mt-4 flex w-fit items-center gap-3 rounded-lg bg-action-secondary-default px-4 py-3.5 text-primary-foreground transition-colors hover:bg-action-secondary-disable focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
                >
                  <HugeiconsIcon icon={HeadsetIcon} className="size-5 shrink-0" strokeWidth={2} aria-hidden />
                  <span className="text-sm font-medium leading-snug">
                    Bu cevap yeterli gelmedi mi?{" "}
                    <span className="underline underline-offset-2">Canlı Desteğe Bağlanın</span>
                  </span>
                </Link>
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      )}
    </>
  )
}
