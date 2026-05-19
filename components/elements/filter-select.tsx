import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { HugeiconsIcon, type IconSvgElement } from "@/lib/icons"
import { cn } from "@/lib/utils"

export type SelectOption = {
  value: string
  label: string
}

type FilterSelectProps = {
  value: string
  onValueChange: (value: string) => void
  options: SelectOption[]
  label?: string
  hideLabel?: boolean
  icon?: IconSvgElement
  placeholder?: string
  className?: string
}

export function FilterSelect({
  value,
  onValueChange,
  options,
  label,
  hideLabel,
  icon,
  placeholder,
  className,
}: FilterSelectProps) {
  return (
    <Select value={value} onValueChange={onValueChange}>
      <SelectTrigger
        className={cn(
          "rounded-lg border-element-border bg-background-elements px-4 text-sm font-medium text-text-subtext",
          className,
        )}
      >
        {icon && <HugeiconsIcon icon={icon} className="size-5 shrink-0" />}
        {label && !hideLabel ? (
          <span>
            {label} : <span className="text-text-subtext"><SelectValue placeholder={placeholder} /></span>
          </span>
        ) : (
          <SelectValue placeholder={placeholder} />
        )}
      </SelectTrigger>
      <SelectContent className="border-element-border bg-background-elements">
        {options.map((option) => (
          <SelectItem
            key={option.value}
            value={option.value}
            className="text-sm text-text-subtitle"
          >
            {option.label}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  )
}
