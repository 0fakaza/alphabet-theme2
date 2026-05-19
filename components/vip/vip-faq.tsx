import { VIP_FAQ_ITEMS } from "@/data/vip"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { cn } from "@/lib/utils"

export function VipFaq() {
  return (
    <section className="container px-4 pb-16 md:px-6 md:pb-24">
      <div className="mx-auto max-w-[1058px]">
        <h2 className="mb-4 text-lg font-semibold tracking-wide text-text-title md:mb-6 md:text-xl">
          Merak edilenler
        </h2>
        <Accordion type="single" collapsible className="flex w-full flex-col gap-2.5 md:gap-3">
          {VIP_FAQ_ITEMS.map((item) => (
            <AccordionItem
              key={item.id}
              value={item.id}
              className="overflow-hidden rounded-lg border border-neutral-200/80 bg-neutral-100 border-b-0"
            >
              <AccordionTrigger
                className={cn(
                  "cursor-pointer px-4 py-4 text-left text-sm font-medium text-text-main hover:no-underline data-[state=open]:text-primary md:px-6",
                  "[&_[data-slot=accordion-trigger-icon]]:size-4 [&_[data-slot=accordion-trigger-icon]]:text-text-subtext data-[state=open]:[&_[data-slot=accordion-trigger-icon]]:text-primary",
                )}
              >
                {item.question}
              </AccordionTrigger>
              <AccordionContent className="px-4 pb-4 pt-2 text-[13px] leading-relaxed text-text-subtext md:px-6 md:text-sm [&_p:last-child]:mb-0">
                <p>{item.answer}</p>
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  )
}
