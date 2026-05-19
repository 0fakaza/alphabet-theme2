import { cn } from "@/lib/utils"

interface ComingSoonBadgeProps {
  children?: React.ReactNode
  className?: string
}

export function ComingSoonBadge({
  children = "Yakında!",
  className,
}: ComingSoonBadgeProps) {
  return (
    <span
      className={cn(
        "relative ml-2 rounded-md bg-orange-600 px-2 py-1 text-[10px] font-semibold text-white",
        "before:absolute before:top-1/2 before:-left-1 before:-translate-y-1/2 before:border-y-4 before:border-r-4 before:border-y-transparent before:border-r-orange-600",
        className
      )}
    >
      {children}
    </span>
  )
}
