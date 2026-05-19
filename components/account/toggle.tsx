import { cn } from "@/lib/utils"

interface ToggleProps {
  checked: boolean
  onChange: (v: boolean) => void
}

export function Toggle({ checked, onChange }: ToggleProps) {
  return (
    <button
      role="switch"
      aria-checked={checked}
      onClick={() => onChange(!checked)}
      className={cn(
        "relative inline-flex h-[22px] w-12 shrink-0 cursor-pointer items-center rounded-full border-2 border-transparent transition-colors duration-200 focus:outline-none",
        checked ? "bg-secondary" : "bg-neutral-500",
      )}
    >
      <span
        className={cn(
          "pointer-events-none inline-block size-[16px] rounded-full bg-white shadow-lg transition-transform duration-200",
          checked ? "translate-x-[26px]" : "translate-x-[2px]",
        )}
      />
    </button>
  )
}
