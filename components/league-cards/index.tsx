import Image from "next/image"
import Link from "next/link"

const leagues = [
  { country: "Almanya", name: "Bundesliga", logo: "/images/league/bundesliga.svg", href: "/spor/bundesliga" },
  { country: "İtalya", name: "Serie A", logo: "/images/league/seriea.svg", href: "/spor/serie-a" },
  { country: "Türkiye", name: "Süper Lig", logo: "/images/league/superlig.svg", href: "/spor/super-lig" },
  { country: "İngiltere", name: "Premier Lig", logo: "/images/league/premier.svg", href: "/spor/premier-lig" },
  { country: "İspanya", name: "LaLiga", logo: "/images/league/laliga.svg", href: "/spor/laliga" },
  { country: "Avrupa", name: "Şamp. Ligi", logo: "/images/league/champions.svg", href: "/spor/sampiyonlar-ligi" },
  { country: "Avrupa", name: "Avrupa Ligi", logo: "/images/league/europa.svg", href: "/spor/avrupa-ligi" },
]

const LeagueCards = () => {
  return (
    <section className="w-full">
      <div className="container py-4">
        <div className="flex items-center gap-2 overflow-x-auto md:overflow-x-hidden">
          {leagues.map((league) => (
            <Link
              key={league.name}
              href={league.href}
              className=" flex flex-1  items-center gap-3 min-w-[160px] md:min-w-[auto] rounded-[10px] bg-neutral-100 px-5 py-3 duration-400 transition-colors hover:bg-neutral-300"
              style={{height:"clamp(72px,6vw,95px)"}}
            >
              <Image
                src={league.logo}
                alt={league.name}
                width={56}
                height={56}
                className=" object-contain"
                style={{width:"clamp(36px,3vw,56px)",height:"clamp(36px,3vw,56px)"}}
              />
              <div>
                {league.country && (
                  <p className="text-[10px] text-text-main opacity-50">{league.country}</p>
                )}
                <p className="text-sm font-medium text-text-main text-nowrap ">{league.name}</p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}

export default LeagueCards
