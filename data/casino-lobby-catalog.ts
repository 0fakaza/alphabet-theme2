import type { CasinoLobbyGame } from "@/lib/casino-lobby-filters"

const img = (n: number) => `/images/casino/${n}.jpg`


export const CASINO_LOBBY_CATALOG: CasinoLobbyGame[] = [
  { id: "c1", name: "DRAGON GATES", provider: "PRAGMATIC PLAY", image: img(1), players: 105, isNew: true, providerId: "pp", categories: ["slots"], featureTags: ["new", "high"] },
  { id: "c2", name: "5 LIONS MEGAWAYS", provider: "PRAGMATIC PLAY", image: img(2), players: 892, providerId: "pp", categories: ["slots"], featureTags: ["high", "buy"] },
  { id: "c3", name: "LIVE BACCARAT SQUEEZE", provider: "EVOLUTION", image: img(3), players: 456, providerId: "evo", categories: ["baccarat", "live"], featureTags: ["rtp", "trending"] },
  { id: "c4", name: "GATES OF OLYMPUS", provider: "PRAGMATIC PLAY", image: img(4), players: 1204, isNew: true, providerId: "pp", categories: ["slots"], featureTags: ["trending", "high", "new"] },
  { id: "c5", name: "FRENCH ROULETTE", provider: "NETENT", image: img(5), players: 198, providerId: "netent", categories: ["roulette", "live"], featureTags: ["rtp"] },
  { id: "c6", name: "HOLD'EM POKER", provider: "EVOLUTION", image: img(6), players: 321, providerId: "evo", categories: ["poker", "live"], featureTags: ["trending"] },
  { id: "c7", name: "CROWN FLASH", provider: "WAZDAN", image: img(1), players: 78, providerId: "wazdan", categories: ["slots"], featureTags: ["new"] },
  { id: "c8", name: "COUNTRY FARMING", provider: "PRAGMATIC PLAY", image: img(2), players: 333, providerId: "pp", categories: ["slots"], featureTags: ["high"] },
  { id: "c9", name: "BURNING HOT", provider: "EGT", image: img(3), players: 412, providerId: "egt", categories: ["slots"], featureTags: ["buy", "rtp"] },
  { id: "c10", name: "BOOK OF RA", provider: "NOVOMATIC", image: img(4), players: 600, providerId: "novo", categories: ["slots"], featureTags: ["trending", "high"] },
  { id: "c11", name: "HYPER TURBO BLACKJACK", provider: "EVOLUTION", image: img(5), players: 234, providerId: "evo", categories: ["blackjack", "live"], featureTags: ["rtp", "new"] },
  { id: "c12", name: "BACCARAT CONTROL SQUEEZE", provider: "EVOLUTION", image: img(6), players: 88, providerId: "evo", categories: ["baccarat", "live"], featureTags: [] },
  { id: "c13", name: "ELEMENTS: THE AWAKENING", provider: "NETENT", image: img(1), players: 55, providerId: "netent", categories: ["slots"], featureTags: ["feature", "rtp"] },
  { id: "c14", name: "BIG BASS BONANZA", provider: "PRAGMATIC PLAY", image: img(2), players: 2100, providerId: "pp", categories: ["slots"], featureTags: ["trending", "high", "new"] },
  { id: "c15", name: "DYNAMITE RICHES", provider: "QUICKSPIN", image: img(3), players: 145, providerId: "qs", categories: ["slots"], featureTags: ["new"] },
  { id: "c16", name: "FISHING CATCH", provider: "WAZDAN", image: img(4), players: 201, providerId: "wazdan", categories: ["slots"], featureTags: ["high"] },
  { id: "c17", name: "BACCARAT MINI", provider: "EVOLUTION", image: img(5), players: 12, providerId: "evo", categories: ["baccarat", "live"], featureTags: [] },
  { id: "c18", name: "EYE OF HORUS", provider: "EGT", image: img(6), players: 340, providerId: "egt", categories: ["slots"], featureTags: ["buy"] },
  { id: "c19", name: "CASH OR CRASH", provider: "EVOLUTION", image: img(1), players: 500, providerId: "evo", categories: ["roulette", "live"], featureTags: ["trending"] },
  { id: "c20", name: "SUPER 7 BLACKJACK", provider: "NETENT", image: img(2), players: 190, providerId: "netent", categories: ["blackjack", "live"], featureTags: ["new"] },
  { id: "c21", name: "SCARAB FORTUNES", provider: "NOVOMATIC", image: img(3), players: 105, providerId: "novo", categories: ["slots"], featureTags: ["high"] },
  { id: "c22", name: "DWARF & DRAGON", provider: "PRAGMATIC PLAY", image: img(5), players: 105, providerId: "pp", categories: ["slots"], featureTags: ["new", "feature"] },
  { id: "c23", name: "DEAD OR ALIVE 2", provider: "NETENT", image: img(6), players: 105, providerId: "netent", categories: ["slots"], featureTags: ["high", "buy"] },
  { id: "c24", name: "WILD WEST GOLD", provider: "PRAGMATIC PLAY", image: img(1), players: 89, providerId: "pp", categories: ["slots"], featureTags: ["trending", "high"] },
  { id: "c25", name: "BOOK OF DEAD", provider: "PLAY'N GO", image: img(4), players: 72, isNew: true, providerId: "png", categories: ["slots"], featureTags: ["new", "trending"] },
]
