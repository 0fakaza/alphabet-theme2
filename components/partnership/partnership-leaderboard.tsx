import Image from "next/image"
import { HugeiconsIcon, CrownIcon } from "@/lib/icons"
import { PARTNERSHIP_LEADERBOARD } from "@/data/partnership"
import { cn } from "@/lib/utils"

const rankStyles: Record<1 | 2 | 3, string> = {
  1: "bg-primary text-primary-foreground ring-2 ring-primary/40",
  2: "bg-[#5b73e8] text-white ring-2 ring-[#81A3FF]/40",
  3: "bg-amber-600 text-white ring-2 ring-amber-400/40",
}

export function PartnershipLeaderboard() {
  return (
    <section className="container px-4  md:px-6 ">
      <div className="mx-auto max-w-[1146px] overflow-hidden rounded-2xl bg-background-main ">
        <h2 className=" px-6 py-6  text-base font-bold text-text-title md:px-8 md:py-5 md:text-lg">
          TOP 3 Affiliate Ustaları
        </h2>
        <div className="overflow-x-auto md:px-5 md:pb-5 p-4 py-0">
          <table className="w-full min-w-[720px] border-collapse text-left text-sm">
            <thead>
              <tr className=" text-xs font-semibold text-text-subtext">
                <th className="px-3 py-2.5 pl-4 md:px-4">KUPON ID</th>
                <th className="px-3 py-2.5 md:px-4">OYNATILAN</th>
                <th className="px-3 py-2.5 md:px-4">ÜYE SAYISI</th>
                <th className="px-3 py-2.5 md:px-4">ORAN</th>
                <th className="px-3 py-2.5 pr-4 md:px-4">KAZANÇ</th>
              </tr>
            </thead>
            <tbody>
              {PARTNERSHIP_LEADERBOARD.map((row) => (
                <tr key={row.rank} className="border-t " style={{borderColor:"rgba(255, 255, 255, 0.08)"}}>
                  <td className="px-3 py-4 pl-4 align-middle md:px-4">
                    <div className="flex items-center gap-2">
                      <span
                        className={cn(
                          "flex size-6 shrink-0 items-center justify-center rounded-full text-xs font-bold",
                          rankStyles[row.rank],
                        )}
                      >
                        {row.rank}
                      </span>
                      {row.rank === 1 ? (
                        <HugeiconsIcon icon={CrownIcon} className="size-5 text-primary" strokeWidth={2} />
                      ) : null}
                      <span className="font-medium text-text-main">{row.couponId}</span>
                    </div>
                  </td>
                  <td className="px-3 py-4 align-middle md:px-4">
                    <span className="inline-flex items-center gap-1.5 tabular-nums font-medium text-text-main">
                      <Image src="/images/money-bag.svg" alt="" width={20} height={20} className="size-5 object-contain" />
                      {row.played}
                    </span>
                  </td>
                  <td className="px-3 py-4 align-middle tabular-nums text-text-main md:px-4">{row.members}</td>
                  <td className="px-3 py-4 align-middle font-medium text-text-main md:px-4">{row.rate}</td>
                  <td className="px-3 py-4 pr-4 align-middle md:px-4">
                    <span className="inline-flex items-center gap-1.5 tabular-nums font-medium text-text-main">
                      <Image src="/images/money-bag.svg" alt="" width={20} height={20} className="size-5 object-contain" />
                      {row.earnings}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  )
}
