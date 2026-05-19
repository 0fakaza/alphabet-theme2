import { CasinoLobby } from "@/components/casino/casino-lobby"
import { CASINO_LOBBY_CATALOG } from "@/data/casino-lobby-catalog"
import WinsTable from "@/components/wins-table"
import RecordBreakers from "@/components/record-breakers"

export default function CasinoPage() {
  return (
    <main>
      <CasinoLobby gamesSource={CASINO_LOBBY_CATALOG} />
      <WinsTable />
      <RecordBreakers />
    </main>
  )
}
