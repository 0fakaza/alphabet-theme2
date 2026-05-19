import Image from "next/image"
import { PROMOTIONS_HERO, PROMOTIONS_SLIDER_IMAGES } from "@/data/promotions"

export function PromotionsHero() {
  return (
    <section className="relative w-full overflow-hidden" aria-label={PROMOTIONS_HERO.title}>
      <div className="relative w-full">
        <Image
          src={PROMOTIONS_SLIDER_IMAGES.desktop}
          alt={PROMOTIONS_HERO.title}
          priority
          width={1920}
          height={1080}
          className="mx-auto hidden object-cover object-center md:block"
          style={{ width: "100%", height: "clamp(240px,27.5vw,390px)", maxWidth: "1850px" }}
        />
        <Image
          src={PROMOTIONS_SLIDER_IMAGES.mobile}
          alt={PROMOTIONS_HERO.title}
          priority
          width={768}
          height={440}
          className="mx-auto block h-[308px] w-full object-cover object-center md:hidden"
        />
      </div>
    </section>
  )
}
