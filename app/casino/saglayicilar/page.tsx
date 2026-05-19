import { CasinoLobby } from "@/components/casino/casino-lobby"
import { CASINO_LOBBY_CATALOG } from "@/data/casino-lobby-catalog"
import RecordBreakers from "@/components/record-breakers"
import WinsTable from "@/components/wins-table"

/** Figma 5102:23660 — /casino ile aynı iskelet: promos, sekmeler (Sağlayıcılar aktif), sağlayıcı araması, grid; ardından Son kazananlar + Rekor. */
export default function CasinoSaglayicilarPage() {
  return (
    <main>
      <CasinoLobby gamesSource={CASINO_LOBBY_CATALOG} variant="providers" />
      <WinsTable />
      <RecordBreakers />
    </main>
  )
}
