import HeroSlider from "@/components/hero-slider"
import CategoryLinks from "@/components/category-links"
import LeagueCards from "@/components/league-cards"
import PromoCards from "@/components/promo-cards"
import GameSlider from "@/components/game-slider"
import type { Game } from "@/components/game-slider"
import { HOME_POPULAR_SLOTS } from "@/data/home-popular-slots"
import WinsTable from "@/components/wins-table"
import RecordBreakers from "@/components/record-breakers"

const newGames: Game[] = [
  { name: "DRAGON GATES", provider: "ONLYPLAY", image: "/images/slot/slot1.jpg", players: 105, isNew: true },
  { name: "5 LIONS MEGAWAYS", provider: "PRAGMATIC PLAY", image: "/images/slot/slot2.jpg", players: 105, isNew: true },
  { name: "SCARAB FORTUNES", provider: "NOVOMATIC", image: "/images/slot/slot3.jpg", players: 105, isNew: true },
  { name: "GATES OF OLYMPUS", provider: "PRAGMATIC PLAY", image: "/images/slot/slot4.jpg", players: 105, isNew: true },
  { name: "DWARF & DRAGON", provider: "PRAGMATIC PLAY", image: "/images/slot/slot5.jpg", players: 105, isNew: true },
  { name: "DEAD OR ALIVE 2", provider: "NETENT", image: "/images/slot/slot6.jpg", players: 105, isNew: true },
  { name: "CROWN FLASH", provider: "LAMBDA GAMING", image: "/images/slot/slot7.jpg", players: 105, isNew: true },
  { name: "COUNTRY FARMING", provider: "PRAGMATIC PLAY", image: "/images/slot/slot8.jpg", players: 105, isNew: true },
  { name: "BOOK OF DEAD", provider: "PLAY'N GO", image: "/images/slot/slot1.jpg", players: 72, isNew: true },
]

const liveGames: Game[] = [
  { name: "Baccarat Live", provider: "PRAGMATIC PLAY", image: "/images/liveGames/1.jpg", players: 105, isNew: true },
  { name: "Monopoly Big Baller", provider: "EVOLUTION", image: "/images/liveGames/2.jpg", players: 105, isNew: true },
  { name: "Mega Roulette", provider: "PRAGMATIC PLAY", image: "/images/liveGames/3.jpg", players: 105 },
  { name: "Baccarat", provider: "EVOLUTION", image: "/images/liveGames/4.jpg", players: 105, isNew: true },
  { name: "Fortune Roulette", provider: "PRAGMATIC PLAY", image: "/images/liveGames/1.jpg", players: 105 },
  { name: "Blackjack", provider: "EVOLUTION", image: "/images/liveGames/2.jpg", players: 105, isNew: true },
  { name: "Monopoly Big Baller 2", provider: "EVOLUTION", image: "/images/liveGames/3.jpg", players: 105 },
  { name: "Mega Roulette 2", provider: "PRAGMATIC PLAY", image: "/images/liveGames/4.jpg", players: 105, isNew: true },
  { name: "Speed Baccarat", provider: "EVOLUTION", image: "/images/liveGames/1.jpg", players: 89 },
]

const crashGames: Game[] = [
  { name: "Dice", provider: "SMARTSOFT", image: "/images/games/dice.png", players: 6212 },
  { name: "Wheel", provider: "SMARTSOFT", image: "/images/games/wheel.png", players: 6212 },
  { name: "Mines", provider: "SMARTSOFT", image: "/images/games/mines.png", players: 6212 },
  { name: "Plinko", provider: "SMARTSOFT", image: "/images/games/plinko.png", players: 6212 },
  { name: "Chicken", provider: "SMARTSOFT", image: "/images/games/chicken.png", players: 6212 },
  { name: "Crash", provider: "SMARTSOFT", image: "/images/games/crash.png", players: 6212 },
  { name: "Hi-Lo", provider: "SMARTSOFT", image: "/images/games/hilo.png", players: 4850 },
  { name: "Bars", provider: "SMARTSOFT", image: "/images/games/bars.png", players: 3920 },
  { name: "Limbo", provider: "SMARTSOFT", image: "/images/games/limbo.png", players: 2715 },
]

export default function PageLogin() {
  return (
    <main>
      <HeroSlider />
      <CategoryLinks />
      <LeagueCards />
      <PromoCards />
      <div className="container"><hr className="border-divider-100" /></div>
      <GameSlider
        id="popular-slots"
        title="Şuan en çok oynanan slotlar"
        totalCount={182}
        allHref="/slotlar"
        games={HOME_POPULAR_SLOTS}
      />
      <div className="container"><hr className="border-divider-100" /></div>
      <GameSlider
        id="new-games"
        title="Yeni eklenen oyunlar"
        totalCount={64}
        allHref="/yeni-oyunlar"
        games={newGames}
      />
      <div className="container"><hr className="border-divider-100" /></div>
      <GameSlider
        id="crash-games"
        title="Crash Games"
        totalCount={182}
        allHref="/crash-games"
        games={crashGames}
        variant="compact"
      />
      <GameSlider
        id="live-games"
        title="Canlı Oyunlar"
        totalCount={182}
        allHref="/canli-oyunlar"
        games={liveGames}
        showName
        showFavorite
      />
      <WinsTable />
      <RecordBreakers />
    </main>
  )
}
