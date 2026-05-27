import Image from "next/image"
import { VIP_BENEFITS } from "@/data/vip"

const BENEFIT_ICON_SRC = [
  "/images/icons/icon-bonus.svg",
  "/images/icons/icon-support.svg",
  "/images/icons/icon-bullet.svg",
  "/images/icons/icon-crow.svg",
] as const

const VIP_INFO_ICON_BG = "/images/vip-info-back.svg"

export function VipBenefits() {
  return (
    <section className="container px-4 pb-12 pt-10 md:px-6 md:pb-16 md:pt-14">
      
      <div className="mx-auto grid w-full max-w-[1401px] grid-cols-1 gap-6 md:grid-cols-2 md:gap-x-6 md:gap-y-6 lg:gap-x-8 lg:gap-y-6">
        {VIP_BENEFITS.map((item, index) => {
          const src = BENEFIT_ICON_SRC[index] ?? BENEFIT_ICON_SRC[0]
          return (
            <div
              key={item.title}
              className="relative flex gap-5 overflow-hidden rounded-2xl bg-background-main p-5 ring-1 ring-white/10 md:min-h-[132px] md:p-5"
            >
              <div
                className="pointer-events-none absolute -left-10 top-1/2 size-[189px] -translate-y-1/2 rounded-full bg-action-primary-alpha blur-3xl"
                aria-hidden
              />
              <div
                className="relative flex size-[92px] shrink-0 items-center justify-center rounded-xl bg-cover bg-center bg-no-repeat ring-1 ring-white/5"
                style={{ backgroundImage: `url(${VIP_INFO_ICON_BG})` }}
              >
                <Image src={src} alt="" width={44} height={44} className="size-11 object-contain" />
              </div>
              <div className="relative flex min-w-0 flex-col justify-center gap-2 pt-1 md:pt-0">
                <h3 className="text-[15px] font-semibold leading-snug tracking-wide text-text-title md:text-base">
                  {item.title}
                </h3>
                <p className="text-[13px] leading-relaxed tracking-wide text-text-subtext md:text-sm md:leading-snug">
                  {item.description}
                </p>
              </div>
            </div>
          )
        })}
      </div>
    </section>
  )
}
