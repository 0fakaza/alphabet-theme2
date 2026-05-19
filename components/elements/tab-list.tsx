import { TabsList, TabsTrigger } from "@/components/ui/tabs"
import { HugeiconsIcon, type IconSvgElement } from "@/lib/icons"
import { cn } from "@/lib/utils"

export type PillTab = {
  value: string
  label: string
  icon?: IconSvgElement
}

type PillTabsProps = {
  tabs: PillTab[]
  className?: string
}

export function TabList({ tabs, className }: PillTabsProps) {
  return (
    <TabsList className={cn("rounded-full bg-neutral-300 p-[3px]", className)}>
      {tabs.map((tab) => (
        <TabsTrigger
          key={tab.value}
          value={tab.value}
          className="h-9 rounded-full border-0 bg-transparent px-3 text-xs text-text-subtitle shadow-none ring-0 transition-colors hover:text-text-main data-[state=active]:border-0 data-[state=active]:bg-background-elements data-[state=active]:text-text-main data-[state=active]:shadow-none"
        >
          {tab.icon && <HugeiconsIcon icon={tab.icon} className="size-5" />}
          {tab.label}
        </TabsTrigger>
      ))}
    </TabsList>
  )
}
