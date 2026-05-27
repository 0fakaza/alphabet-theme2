import { CasinoLobby } from "@/components/casino/casino-lobby"
import { CASINO_LOBBY_CATALOG } from "@/data/casino-lobby-catalog"
import RecordBreakers from "@/components/record-breakers"
import WinsTable from "@/components/wins-table"


export default function CasinoSaglayicilarPage() {
  return (
    <main>
      <CasinoLobby gamesSource={CASINO_LOBBY_CATALOG} variant="providers" />
      <WinsTable />
      <RecordBreakers />
    </main>
  )
}
