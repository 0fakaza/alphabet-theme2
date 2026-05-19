"use client"

import { useMemo, useState } from "react"
import Image from "next/image"
import { Tabs, TabsContent } from "@/components/ui/tabs"
import { TabList } from "@/components/elements/tab-list"
import { Button } from "@/components/elements/button"
import { filterTournaments, type Tournament, TURNUVALAR } from "@/data/turnuvalar"
import { TournamentDetailModal } from "@/components/turnuvalar/tournament-detail-modal"
import { cn } from "@/lib/utils"

const FILTER_TABS = [
  { value: "all", label: "Hepsi" },
  { value: "ongoing", label: "Devam Ediyor" },
  { value: "planned", label: "Planlanmış" },
  { value: "completed", label: "Tamamlandı" },
] as const

function StatusChip({ state }: { state: Tournament["state"] }) {
  if (state === "planned") {
    return (
      <div className="w-fit flex shrink-0 items-center rounded-[47px] bg-[#2e581a] px-3 py-1">
        <span className="text-sm font-medium tracking-wide text-[#a5e680]">Planlanmış</span>
      </div>
    )
  }
  if (state === "ongoing") {
    return (
      <div className="w-fit flex shrink-0 items-center rounded-full bg-[#3a4a55] px-3 py-1">
        <span className="text-sm font-medium tracking-wide text-sky-200/90">Devam Ediyor</span>
      </div>
    )
  }
  return (
    <div className="w-fit flex shrink-0 items-center rounded-[34px] bg-[#973637] px-3 py-1">
      <span className="text-sm font-medium tracking-wide text-[#f0c2c2]">Tamamlandı</span>
    </div>
  )
}

function TournamentCard({ item, onDetail }: { item: Tournament; onDetail: (t: Tournament) => void }) {
  const isCompleted = item.state === "completed"

  return (
    <article
      className={cn(
        "mx-auto flex w-full max-w-[450px] flex-col gap-3.5 rounded-xl bg-background-main px-4 pb-6 pt-4",
        isCompleted && "opacity-60",
      )}
    >
      <div className="relative aspect-[302/158] w-full shrink-0 overflow-hidden rounded-md">
        <Image
          src={item.image}
          alt=""
          fill
          className="object-cover"
          sizes="(max-width: 768px) 100vw, 450px"
        />
      </div>

      <StatusChip state={item.state} />

      <div className="flex w-full flex-col gap-5 px-2.5">
        <div className="flex flex-col gap-4">
          <h3 className="text-lg font-medium leading-5 tracking-[0.36px] text-text-main">{item.title}</h3>
          <div className="flex flex-wrap gap-x-10 gap-y-2 text-[13px] tracking-[0.26px]">
            <div className="flex min-w-0 items-center gap-1">
              <span className="shrink-0 text-text-main">Başlangıç</span>
              <span className="min-w-0 text-text-subtext">{item.startLabel}</span>
            </div>
            <div className="flex min-w-0 items-center gap-1">
              <span className="shrink-0 text-text-main">Bitiş</span>
              <span className="min-w-0 text-text-subtext">{item.endLabel}</span>
            </div>
          </div>
        </div>

        <div className="h-px w-full shrink-0 bg-divider-100" aria-hidden />

        <div className="flex w-full items-center justify-between gap-3">
          <div className="flex min-w-0 items-center gap-2">
            <div className="relative h-12 w-11 shrink-0" aria-hidden>
              <Image
                src="/images/money-bag.svg"
                alt=""
                width={44}
                height={48}
                className="size-full object-contain object-center"
              />
            </div>
            <div className="flex min-w-0 flex-col gap-0.5 leading-normal">
              <p className="text-[11px] font-medium tracking-[0.22px] text-action-primary-default">
                Havuz Ödülü
              </p>
              <p className="truncate text-xl font-semibold tracking-[0.4px] text-text-main">{item.pool}</p>
            </div>
          </div>
          <Button
            type="button"
            variant="primary"
            size="md"
            className="h-11 shrink-0 justify-center px-4 text-[13px] font-semibold"
            onClick={() => onDetail(item)}
          >
            Detaylı Bilgi
          </Button>
        </div>
      </div>
    </article>
  )
}

function TournamentList({
  filter,
  onOpenDetail,
}: {
  filter: (typeof FILTER_TABS)[number]["value"]
  onOpenDetail: (t: Tournament) => void
}) {
  const rows = useMemo(() => filterTournaments(filter, TURNUVALAR), [filter])
  if (rows.length === 0) {
    return <p className="py-12 text-center text-sm text-text-subtext">Bu kategoride turnuva bulunamadı.</p>
  }
  return (
    <div className="grid grid-cols-1 justify-items-center gap-4 sm:grid-cols-2 xl:grid-cols-3">
      {rows.map((t) => (
        <TournamentCard key={t.id} item={t} onDetail={onOpenDetail} />
      ))}
    </div>
  )
}

export function TurnuvalarContent() {
  const [filter, setFilter] = useState<string>("all")
  const [detailOpen, setDetailOpen] = useState(false)
  const [detailTournament, setDetailTournament] = useState<Tournament | null>(null)

  const openDetail = (t: Tournament) => {
    setDetailTournament(t)
    setDetailOpen(true)
  }

  return (
    <section className="w-full">
      <div className="container py-6 md:py-8">
        <Tabs value={filter} onValueChange={setFilter} className="w-full">
          <div className="mb-6 overflow-x-auto pb-1 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
            <TabList
              className="inline-flex w-max min-w-0"
              tabs={FILTER_TABS.map((t) => ({ value: t.value, label: t.label }))}
            />
          </div>
          {FILTER_TABS.map((t) => (
            <TabsContent key={t.value} value={t.value} className="mt-0 outline-none">
              <TournamentList filter={t.value} onOpenDetail={openDetail} />
            </TabsContent>
          ))}
        </Tabs>
      </div>
      <TournamentDetailModal
        open={detailOpen}
        onOpenChange={(open) => {
          setDetailOpen(open)
          if (!open) setDetailTournament(null)
        }}
        tournament={detailTournament}
      />
    </section>
  )
}
