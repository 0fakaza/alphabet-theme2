import Image from "next/image"
import { PARTNERSHIP_FEATURE_CARDS } from "@/data/partnership"

const imageBottomShade =
  "linear-gradient(0deg, var(--partnership-image-shade, rgba(0, 0, 0, 0.2)) 0%, transparent 100%)"

const imageSideShadeLeft =
  "linear-gradient(90deg, var(--background-main, #23282C) 0.38%, var(--background-mainAlpha, rgba(35, 40, 44, 0)) 99.55%)"

const imageSideShadeRight =
  "linear-gradient(90deg, var(--background-mainAlpha, rgba(35, 40, 44, 0)) 0.38%, var(--background-main, #23282C) 99.55%)"

export function PartnershipFeatures() {
  return (
    <section className="container px-4 pb-12 pt-8 md:px-6 md:pb-16 md:pt-10">
      <div className="partnership-features-grid mx-auto grid max-w-[1146px] grid-cols-1 gap-4 md:grid-cols-3 md:gap-5">
        {PARTNERSHIP_FEATURE_CARDS.map((card, index) => (
          <article
            key={card.id}
            className="relative flex flex-col overflow-hidden rounded-2xl bg-background-main ring-1 ring-white/10 md:min-h-[344px]"
          >
            <div className="relative mb-4 h-[190px] w-full shrink-0 overflow-hidden rounded-t-xl bg-background-main">
              <Image
                src={card.imageSrc}
                alt=""
                fill
                className="partnership-feature-image object-contain object-center"
                sizes="(max-width: 768px) 100vw, 360px"
              />
              {index !== 0 ? (
                <div
                  className="pointer-events-none absolute inset-y-0 left-0 z-[1] w-[min(32%,160px)]"
                  style={{ background: imageSideShadeLeft }}
                  aria-hidden
                />
              ) : null}
              <div
                className="pointer-events-none absolute inset-y-0 right-0 z-[1] w-[min(32%,160px)]"
                style={{ background: imageSideShadeRight }}
                aria-hidden
              />
              <div
                className="pointer-events-none absolute inset-x-0 bottom-0 z-[2] h-[45%] rounded-none"
                style={{ background: imageBottomShade }}
                aria-hidden
              />
            </div>
            <div className="relative px-6 pb-7 md:px-7 md:pb-6">
              <h2 className="text-lg font-bold leading-snug text-text-title md:text-xl">{card.title}</h2>
              <p className="mt-2 text-sm leading-relaxed text-text-subtext">{card.description}</p>
            </div>
          </article>
        ))}
      </div>
    </section>
  )
}
