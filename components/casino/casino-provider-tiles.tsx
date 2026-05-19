import Image from "next/image"
import Link from "next/link"
import { cn } from "@/lib/utils"
import type { CasinoProviderRow } from "@/data/casino-providers"

const CASINO_HREF = "/casino" as const

/** Figma 5102:25795 — 74px hücre, 12px gap, px-5, rounded-lg, bg-background-main, logo 32, isim 15px, oyun 10px (alttan çizgisiz) */
export function CasinoProviderTile({ p }: { p: CasinoProviderRow }) {
  return (
    <Link
      href={CASINO_HREF}
      className={cn(
        "flex h-[74px] min-w-0 items-center gap-3 rounded-lg bg-background-main px-5 py-3",
        "ring-1 ring-transparent transition-colors",
        "hover:ring-primary/30 hover:bg-white/5",
      )}
    >
      <div className="relative size-8 shrink-0 overflow-hidden rounded-full border border-white/10 bg-white">
        <Image src={p.logo} alt="" width={32} height={32} className="size-full object-contain p-0.5" />
      </div>
      <div className="flex min-w-0 flex-1 flex-col items-start text-left">
        <span className="w-full min-w-0 truncate text-[15px] font-medium leading-[1.1] tracking-[0.3px] text-text-main">
          {p.name}
        </span>
        <span className="w-full min-w-0 text-[10px] font-normal leading-normal text-text-subtext">
          {p.games} oyun
        </span>
      </div>
    </Link>
  )
}
