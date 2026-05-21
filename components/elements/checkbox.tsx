"use client"

import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { HugeiconsIcon, Tick02Icon } from "@/lib/icons"
import { cn } from "@/lib/utils"

const checkboxVariants = cva(
  [
    "inline-flex shrink-0 cursor-pointer items-center justify-center rounded border-2",
    "transition-colors duration-200",
    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-background-modal",
    "disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50",
  ].join(" "),
  {
    variants: {
      color: {
        primary: "",
        secondary: "",
      },
      appearance: {
        fill: "",
        ghost: "",
      },
      checked: {
        true: "",
        false: "",
      },
      size: {
        md: "size-5",
        lg: "size-[22px]",
      },
    },
    compoundVariants: [
      {
        checked: false,
        appearance: "fill",
        className: "border-element-border bg-background-elements",
      },
      {
        checked: false,
        appearance: "ghost",
        className: "border-element-border bg-transparent",
      },
      {
        checked: true,
        color: "primary",
        appearance: "fill",
        className:
          "border-primary bg-primary text-action-primary-on-primary focus-visible:ring-primary",
      },
      {
        checked: true,
        color: "secondary",
        appearance: "fill",
        className:
          "border-action-secondary-default bg-action-secondary-default text-action-secondary-on-secondary focus-visible:ring-action-secondary-default",
      },
      {
        checked: true,
        color: "primary",
        appearance: "ghost",
        className:
          "border-primary bg-action-primary-alpha text-primary focus-visible:ring-primary",
      },
      {
        checked: true,
        color: "secondary",
        appearance: "ghost",
        className:
          "border-action-secondary-default bg-action-secondary-alpha text-action-secondary-default focus-visible:ring-action-secondary-default",
      },
    ],
    defaultVariants: {
      color: "primary",
      appearance: "fill",
      checked: false,
      size: "md",
    },
  }
)

const tickSizeVariants = cva("", {
  variants: {
    size: {
      md: "size-2.5",
      lg: "size-2.5",
    },
  },
  defaultVariants: {
    size: "md",
  },
})

export type CheckboxProps = Omit<
  React.ButtonHTMLAttributes<HTMLButtonElement>,
  "checked" | "onChange"
> &
  VariantProps<typeof checkboxVariants> & {
    checked: boolean
    onCheckedChange?: (checked: boolean) => void
  }

export function Checkbox({
  checked,
  onCheckedChange,
  color = "primary",
  appearance = "fill",
  size = "md",
  className,
  disabled,
  onClick,
  ...props
}: CheckboxProps) {
  return (
    <button
      type="button"
      role="checkbox"
      aria-checked={checked}
      disabled={disabled}
      onClick={(e) => {
        onClick?.(e)
        if (!e.defaultPrevented && onCheckedChange) {
          onCheckedChange(!checked)
        }
      }}
      className={cn(
        checkboxVariants({ color, appearance, checked, size }),
        className
      )}
      {...props}
    >
      {checked && (
        <HugeiconsIcon
          icon={Tick02Icon}
          className={tickSizeVariants({ size })}
          strokeWidth={2.5}
        />
      )}
    </button>
  )
}

export type CheckboxFieldProps = {
  label: React.ReactNode
  labelClassName?: string
  className?: string
} & Omit<CheckboxProps, "id">

export function CheckboxField({
  label,
  labelClassName,
  className,
  ...checkboxProps
}: CheckboxFieldProps) {
  return (
    <label
      className={cn(
        "flex cursor-pointer items-start gap-2",
        checkboxProps.disabled && "cursor-not-allowed opacity-50",
        className
      )}
    >
      <Checkbox className="mt-0.5" {...checkboxProps} />
      <span
        className={cn(
          "pt-0.5 text-sm font-medium leading-5 tracking-wide text-text-subtext",
          labelClassName
        )}
      >
        {label}
      </span>
    </label>
  )
}
