"use client"

import type { IconSvgElement } from "@/lib/icons"
import { HugeiconsIcon } from "@/lib/icons"
import { cn } from "@/lib/utils"
import { InformationCircleIcon } from "@hugeicons-pro/core-solid-sharp"
import {
  Tooltip as TooltipRoot,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip"

export type InfoTooltipProps = {
  content: React.ReactNode
  icon?: IconSvgElement
  iconClassName?: string
  contentClassName?: string
  side?: React.ComponentProps<typeof TooltipContent>["side"]
  align?: React.ComponentProps<typeof TooltipContent>["align"]
  sideOffset?: number
}

export function InfoTooltip({
  content,
  icon = InformationCircleIcon,
  iconClassName,
  contentClassName,
  side = "top",
  align = "center",
  sideOffset,
}: InfoTooltipProps) {
  return (
    <TooltipRoot>
      <TooltipTrigger asChild>
        <button
          type="button"
          className="inline-flex shrink-0 cursor-help items-center justify-center rounded-sm outline-none focus-visible:ring-2 focus-visible:ring-primary/50"
          aria-label="Bilgi"
        >
          <HugeiconsIcon className={cn("size-4 text-icon", iconClassName)} icon={icon} />
        </button>
      </TooltipTrigger>
      <TooltipContent side={side} align={align} sideOffset={sideOffset} className={contentClassName}>
        {content}
      </TooltipContent>
    </TooltipRoot>
  )
}
