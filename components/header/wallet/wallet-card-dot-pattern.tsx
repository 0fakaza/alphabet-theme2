import { cn } from "@/lib/utils"

type WalletCardDotPatternProps = {
  variant?: "mobile" | "desktop"
  className?: string
}

export function WalletCardDotPattern({
  variant = "mobile",
  className,
}: WalletCardDotPatternProps) {
  return (
    <div
      className={cn(
        "pointer-events-none absolute bg-wallet-card-dots opacity-40",
        variant === "mobile"
          ? "left-0 top-0 h-full w-[162px]"
          : "left-1/2 top-0 h-[129px] w-[183px] -translate-x-1/2",
        className
      )}
      aria-hidden
    />
  )
}
