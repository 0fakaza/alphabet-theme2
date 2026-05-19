import { HugeiconsIcon, ArrowLeft02Icon, ArrowRight02Icon, type IconSvgElement } from "@/lib/icons"
import { cn } from "@/lib/utils"

type SliderNavProps = {
  id: string
  prevIcon?: IconSvgElement
  nextIcon?: IconSvgElement
  className?: string
  iconClassName?: string
  style?: React.CSSProperties
  /** Ok düğmeleri arası boşluk (varsayılan: gap-2.5) */
  buttonGapClassName?: string
}

const defaultClass =
  "flex size-8 items-center justify-center rounded-md bg-action-teritory-default text-icon transition-colors hover:text-white"

export function SliderNav({
  id,
  prevIcon = ArrowLeft02Icon,
  nextIcon = ArrowRight02Icon,
  className,
  iconClassName = "size-4",
  style,
  buttonGapClassName = "gap-2.5",
}: SliderNavProps) {
  const btnClass = className ?? defaultClass

  return (
    <div className={cn("inline-flex shrink-0 items-center", buttonGapClassName)}>
      <button
        type="button"
        className={cn(`${id}-prev`, btnClass, "cursor-pointer")}
        style={style}
      >
        <HugeiconsIcon icon={prevIcon} className={iconClassName} />
      </button>
      <button
        type="button"
        className={cn(`${id}-next`, btnClass, "cursor-pointer")}
        style={style}
      >
        <HugeiconsIcon icon={nextIcon} className={iconClassName} />
      </button>
    </div>
  )
}
