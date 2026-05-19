import { PARTNERSHIP_STEPS } from "@/data/partnership"
import { ButtonLink } from "@/components/elements/button"
import { cn } from "@/lib/utils"

export function PartnershipSteps() {
  return (

    <section className="container  pb-4 px-0 md:pb-16">
      <div className="mx-auto max-w-[1146px] border-t border-white/10 pt-4 md:pt-12">
        <div className="mx-auto mb-8 max-w-[442px] text-center md:mb-10">
          <h2 className="text-lg font-bold text-text-title md:text-xl">{PARTNERSHIP_STEPS.title}</h2>
          <p className="mt-2 text-sm text-text-subtext">{PARTNERSHIP_STEPS.subtitle}</p>
        </div>
        <div className="partnership-steps-grid mx-auto mb-8 flex md:grid max-w-[780px]  grid-cols-3 md:mb-10 overflow-scroll md:overflow-hidden   ">
          {PARTNERSHIP_STEPS.items.map((step) => (
            <div
              key={step.id}
              className={cn(
                "partnership-step-card flex min-h-[100px] items-center justify-center overfdlow-hidden   text-center min-w-[260px] ",
                step.highlight ? " partnership-step-card--highlight" : " partnership-step-card--default",
              )}
            >
              <p className="relative z-[1] max-w-[198px] text-sm font-semibold leading-snug text-text-main md:text-[15px]">
                {step.label}
              </p>
            </div>
          ))}
        </div>
        <div className="flex justify-center">
          <ButtonLink href={PARTNERSHIP_STEPS.ctaHref} variant="primary" size="md">
            {PARTNERSHIP_STEPS.ctaLabel}
          </ButtonLink>
        </div>
      </div>
    </section>

  )
}
