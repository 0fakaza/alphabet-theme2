import Image from "next/image"
import Link from "next/link"
import { VIP_HERO_IMAGES } from "@/data/vip"

type VipHeroProps = {
  /** Varsayılan: VIP Club */
  ariaLabel?: string
  /** Verilirse tüm hero alanı bu adrese gider */
  href?: string
}

export function VipHero({ ariaLabel = "VIP Club", href }: VipHeroProps) {
  const images = (
    <>
      <Image
        src={VIP_HERO_IMAGES.desktop}
        alt=""
        priority
        width={1920}
        height={437}
        className="mx-auto hidden object-cover object-center md:block"
        style={{ width: "100%", height: "clamp(200px, 22.75vw, 437px)", maxWidth: "1920px" }}
      />
      <Image
        src={VIP_HERO_IMAGES.mobile}
        alt=""
        priority
        width={768}
        height={360}
        className="block h-[320px] w-full object-cover object-center md:hidden"
      />
    </>
  )

  return (
    <section className="relative w-full overflow-hidden" aria-label={href ? undefined : ariaLabel}>
      <div className="relative w-full">
        {href ? (
          <Link
            href={href}
            className="block outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
            aria-label={ariaLabel}
          >
            {images}
          </Link>
        ) : (
          images
        )}
      </div>
    </section>
  )
}
