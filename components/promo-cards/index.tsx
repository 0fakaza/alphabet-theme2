import Image from "next/image"
import Link from "next/link"

const promoCards = [
  { image: "/images/type/spor.png", href: "/spor", alt: "Spor" },
  { image: "/images/type/slot.png", href: "/slotlar", alt: "Slot" },
  { image: "/images/type/liveCasino.png", href: "/canli-casino", alt: "Canlı Casino" },
  { image: "/images/type/liveSpor.png", href: "/canli-spor", alt: "Canlı Spor" },
]

const PromoCards = () => {
  return (
    <section className="w-full">
      <div className="py-1 md:py-10">
        <div className="flex gap-3 overflow-x-auto px-3 pb-1 md:container md:grid md:grid-cols-4 md:gap-4 md:px-4 md:pb-0 [&::-webkit-scrollbar]:hidden">
          {promoCards.map((card) => (
            <Link
              key={card.alt}
              href={card.href}
              className="group shrink-0 w-[175px] rounded-2xl md:w-auto"
            >
              <Image
                src={card.image}
                alt={card.alt}
                width={340}
                height={200}
                className="h-auto w-full object-cover transition-all duration-400 group-hover:-translate-y-1 group-hover:brightness-120 group-hover:drop-shadow-[0_8px_20px_rgba(0,0,0,0.3)]"
              />
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}

export default PromoCards
