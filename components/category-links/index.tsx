import Image from "next/image"
import Link from "next/link"

const categories = [
  { label: "Casinoyu ulaları", image: "/images/homeCategory/casino.png", href: "/casino-ulalari" },
  { label: "Günün Maçları", image: "/images/homeCategory/dayMatch.png", href: "/gunun-maclari" },
  { label: "Yeni Oyunlar", image: "/images/homeCategory/newGames.png", href: "/yeni-oyunlar" },
  { label: "En Çok Kazananlar", image: "/images/homeCategory/win.png", href: "/en-cok-kazananlar" },
  { label: "Günün Maçları", image: "/images/homeCategory/casino.png", href: "/gunun-maclari-2" },
]

const CategoryLinks = () => {
  return (
    <section className="w-full">
      <div className="container py-6">
        <div className="flex items-center justify-between justify-center gap-0 md:gap-8">
          {categories.map((cat, i) => (
            <Link
              key={i}
              href={cat.href}
              className="group flex flex-col items-center gap-2"
            >
              <div className=" overflow-hidden rounded-full duration-400  transition-transform group-hover:scale-105">
                <Image
                  src={cat.image}
                  alt={cat.label}
                  width={80}
                  height={80}
                  className="size-full  object-contain w-[56px] h-[56px] md:w-[80px] md:h-[80px] "
                />
              </div>
              <span className="text-xs text-text-main text-center duration-400 transition-colors group-hover:text-primary">
                {cat.label}
              </span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}

export default CategoryLinks
