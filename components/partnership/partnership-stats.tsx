import Image from "next/image"
import { PARTNERSHIP_STATS } from "@/data/partnership"

export function PartnershipStats() {
  return (
    <section className="container px-4 pb-12 md:px-6 md:pb-16">
      <div className="mx-auto flex max-w-[800px] flex-col items-center text-center">
        <div className="relative mb-1 flex  shrink-0 items-center justify-center w-[326px] h-[308px] ">
          <Image
            src="/images/header-icon-dots.png"
            alt=""
fill
            className="w-full h-full pointer-events-none   object-contain "
          />
        </div>
        <p className="text-base leading-relaxed text-text-main md:text-lg md:leading-relaxed -mt-[110px]">
          {PARTNERSHIP_STATS.parts.map((part, i) => (
            <span key={i} className={part.emphasis ? "font-semibold text-semantic-success" : undefined}>
              {part.text}
            </span>
          ))}
        </p>
      </div>
    </section>
  )
}
