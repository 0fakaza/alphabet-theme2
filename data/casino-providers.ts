/**
 * Figma 4624:41027 — Tüm sağlayıcılar: üst sekmelere göre filtrelenen tek, tekrar etmeyen liste.
 * Logo yolları `public/images/providers/`.
 */
export type CasinoProviderRow = {
  id: string
  name: string
  games: number
  logo: string
  /** “Slot” sekmesinde listelensin */
  slot: boolean
  /** “Canlı Casino” sekmesinde listelensin */
  live: boolean
  /** “Crash” sekmesinde listelensin */
  crash: boolean
}

export const casinoProviderRows: readonly CasinoProviderRow[] = [
  {
    id: "pp",
    name: "Pragmatic Play",
    games: 45,
    logo: "/images/providers/pp.svg",
    slot: true,
    live: true,
    crash: true,
  },
  {
    id: "netent",
    name: "NetEnt",
    games: 45,
    logo: "/images/providers/netent.svg",
    slot: true,
    live: true,
    crash: false,
  },
  {
    id: "evo",
    name: "Evolution",
    games: 45,
    logo: "/images/providers/amatic.svg",
    slot: false,
    live: true,
    crash: false,
  },
  {
    id: "egt",
    name: "EGT",
    games: 45,
    logo: "/images/providers/egt.svg",
    slot: true,
    live: true,
    crash: false,
  },
  {
    id: "novo",
    name: "Novomatic",
    games: 45,
    logo: "/images/providers/novo.svg",
    slot: true,
    live: false,
    crash: false,
  },
  {
    id: "qs",
    name: "Quickspin",
    games: 45,
    logo: "/images/providers/quickspin.svg",
    slot: true,
    live: false,
    crash: false,
  },
  {
    id: "wazdan",
    name: "Wazdan",
    games: 45,
    logo: "/images/providers/wazdan.svg",
    slot: true,
    live: false,
    crash: true,
  },
  // Aşağısı: yer tutucu veri; logolar 7 adet @public/images/providers SVG ile dönüştürülüyor
  { id: "1x2", name: "1x2 gaming", games: 128, logo: "/images/providers/pp.svg", slot: true, live: true, crash: true },
  { id: "3oaks", name: "3 Oaks Gaming", games: 62, logo: "/images/providers/netent.svg", slot: true, live: false, crash: true },
  { id: "7mojos", name: "7Mojos", games: 34, logo: "/images/providers/egt.svg", slot: true, live: true, crash: false },
  { id: "amigo", name: "AmigoGaming", games: 88, logo: "/images/providers/novo.svg", slot: true, live: true, crash: false },
  { id: "amusnet", name: "Amusnet", games: 201, logo: "/images/providers/quickspin.svg", slot: true, live: false, crash: true },
  { id: "belatra", name: "Belatra", games: 51, logo: "/images/providers/wazdan.svg", slot: true, live: true, crash: true },
  { id: "betsoft", name: "Betsoft", games: 164, logo: "/images/providers/amatic.svg", slot: true, live: true, crash: false },
  { id: "bgaming", name: "BGaming", games: 95, logo: "/images/providers/pp.svg", slot: true, live: false, crash: true },
  { id: "caleta", name: "Caleta", games: 40, logo: "/images/providers/netent.svg", slot: true, live: false, crash: false },
  { id: "hacksaw", name: "Hacksaw", games: 73, logo: "/images/providers/egt.svg", slot: true, live: true, crash: true },
  { id: "1spin4win", name: "1spin4win", games: 25, logo: "/images/providers/novo.svg", slot: true, live: true, crash: true },
  { id: "platipus", name: "Platipus", games: 112, logo: "/images/providers/quickspin.svg", slot: true, live: false, crash: false },
  { id: "nolimit", name: "Nolimit City", games: 89, logo: "/images/providers/wazdan.svg", slot: true, live: false, crash: true },
  { id: "push", name: "Push Gaming", games: 55, logo: "/images/providers/amatic.svg", slot: true, live: true, crash: false },
  { id: "thunder", name: "Thunderkick", games: 66, logo: "/images/providers/pp.svg", slot: true, live: false, crash: true },
  { id: "ygg", name: "Yggdrasil", games: 140, logo: "/images/providers/netent.svg", slot: true, live: true, crash: false },
  { id: "elk", name: "ELK Studios", games: 48, logo: "/images/providers/egt.svg", slot: true, live: true, crash: true },
  { id: "playson", name: "Playson", games: 92, logo: "/images/providers/novo.svg", slot: true, live: false, crash: true },
  { id: "spinomenal", name: "Spinomenal", games: 300, logo: "/images/providers/quickspin.svg", slot: true, live: true, crash: false },
  { id: "booongo", name: "Booongo", games: 78, logo: "/images/providers/wazdan.svg", slot: true, live: true, crash: true },
] as const

/** Figma sağlayıcı arama placeholder: “N sağlayıcı içinden ara” (toplam katalog) */
export const CASINO_PROVIDERS_PLACEHOLDER_TOTAL = 1425
