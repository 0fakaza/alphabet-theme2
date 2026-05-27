import * as React from "react"
import Link from "next/link"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"



const buttonVariants = cva(
  [
    "inline-flex items-center justify-center rounded-lg cursor-pointer",
    "leading-none whitespace-nowrap",
    "transition-colors duration-400 select-none",
    "disabled:pointer-events-none",
  ].join(" "),
  {
    variants: {
      variant: {
        primary: [
          "bg-action-primary-default text-action-primary-on-primary",
          "hover:bg-action-primary-hover",
          "active:bg-action-primary-hover active:ring-1 active:ring-action-primary-default",
          "disabled:opacity-50",
        ].join(" "),
        secondary: [
          "bg-action-secondary-default text-action-secondary-on-secondary",
          "hover:bg-action-secondary-hover",
          "active:bg-action-secondary-hover active:ring-1 active:ring-action-secondary-default",
          "disabled:opacity-50",
        ].join(" "),
        tertiary: [
          "bg-neutral-600 text-text-main",
          "hover:bg-neutral-800",
          "active:ring-1 active:ring-neutral-800",
          "disabled:opacity-50",
        ].join(" "),
        outline: [
          "border border-neutral-700 text-text-subtitle",
          "disabled:opacity-50",
        ].join(" "),
        ghost: [
          "text-text-subtitle",
          "disabled:opacity-40",
        ].join(" "),
        link: [
          "text-text-subtext underline underline-offset-2 justify-start px-0",
          "hover:text-action-primary-hover",
          "disabled:opacity-40",
        ].join(" "),
      },
      size: {
        md: "h-12 px-4 py-3 gap-2 font-semibold text-[13px]",
        sm: "h-[38px] px-4 py-3 gap-2 font-semibold text-[13px]",
      },
    },
    defaultVariants: {
      variant: "primary",
    },
  },
)



const iconButtonVariants = cva(
  [
    "inline-flex items-center justify-center rounded-md cursor-pointer",
    "transition-colors duration-400 select-none",
    "disabled:pointer-events-none",
  ].join(" "),
  {
    variants: {
      variant: {
        primary: [
          "bg-action-primary-default text-action-primary-on-primary",
          "hover:bg-action-primary-hover",
          "active:bg-action-primary-hover active:ring-1 active:ring-action-primary-default",
          "disabled:opacity-50",
        ].join(" "),
        secondary: [
          "bg-action-secondary-default text-action-secondary-on-secondary",
          "hover:bg-action-secondary-hover",
          "active:bg-action-secondary-hover active:ring-1 active:ring-action-secondary-default",
          "disabled:opacity-50",
        ].join(" "),
        tertiary: [
          "bg-action-teritory-default text-text-main",
          "hover:bg-action-teritory-hover",
          "disabled:opacity-50",
        ].join(" "),
        outline: [
          "border border-element-border text-text-subtitle",
          "hover:bg-background-element-hover",
          "disabled:opacity-50",
        ].join(" "),
      },
      size: {
        md: "size-11 p-3",
        sm: "size-8 p-2",
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "md",
    },
  },
)



type ButtonVariant =
  | "primary"
  | "secondary"
  | "tertiary"
  | "outline"
  | "ghost"
  | "link"

type IconButtonVariant = "primary" | "secondary" | "tertiary" | "outline"

type ButtonSize = "sm" | "md"

interface ButtonProps
  extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, "size"> {
  variant?: ButtonVariant
  size?: ButtonSize
  iconLeft?: React.ReactNode
  iconRight?: React.ReactNode
}

interface ButtonLinkProps
  extends Omit<
    React.ComponentPropsWithoutRef<typeof Link>,
    "size"
  > {
  variant?: ButtonVariant
  size?: ButtonSize
  iconLeft?: React.ReactNode
  iconRight?: React.ReactNode
  disabled?: boolean
}

interface IconButtonProps
  extends Omit<
    React.ButtonHTMLAttributes<HTMLButtonElement>,
    "size" | "children"
  > {
  variant?: IconButtonVariant
  size?: ButtonSize
  icon: React.ReactNode
}

interface IconButtonLinkProps
  extends Omit<
    React.ComponentPropsWithoutRef<typeof Link>,
    "size" | "children"
  > {
  variant?: IconButtonVariant
  size?: ButtonSize
  icon: React.ReactNode
  disabled?: boolean
}



const iconSizeClass = (size: ButtonSize) =>
  size === "sm" ? "[&>svg]:size-4" : "[&>svg]:size-5"



const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      variant = "primary",
      size = "md",
      iconLeft,
      iconRight,
      className,
      children,
      ...props
    },
    ref,
  ) => {
    return (
      <button
        ref={ref}
        className={cn(
          buttonVariants({
            variant,
            size: variant === "link" ? null : size,
          }),
          className,
        )}
        {...props}
      >
        {iconLeft && (
          <span className={cn("shrink-0", iconSizeClass(size))}>
            {iconLeft}
          </span>
        )}
        {children}
        {iconRight && (
          <span className={cn("shrink-0", iconSizeClass(size))}>
            {iconRight}
          </span>
        )}
      </button>
    )
  },
)
Button.displayName = "Button"



const ButtonLink = React.forwardRef<HTMLAnchorElement, ButtonLinkProps>(
  (
    {
      variant = "primary",
      size = "md",
      iconLeft,
      iconRight,
      className,
      children,
      disabled,
      ...props
    },
    ref,
  ) => {
    return (
      <Link
        ref={ref}
        aria-disabled={disabled || undefined}
        tabIndex={disabled ? -1 : undefined}
        className={cn(
          buttonVariants({
            variant,
            size: variant === "link" ? null : size,
          }),
          disabled && "pointer-events-none opacity-50",
          className,
        )}
        {...props}
      >
        {iconLeft && (
          <span className={cn("shrink-0", iconSizeClass(size))}>
            {iconLeft}
          </span>
        )}
        {children}
        {iconRight && (
          <span className={cn("shrink-0", iconSizeClass(size))}>
            {iconRight}
          </span>
        )}
      </Link>
    )
  },
)
ButtonLink.displayName = "ButtonLink"



const IconButton = React.forwardRef<HTMLButtonElement, IconButtonProps>(
  ({ variant = "primary", size = "md", icon, className, ...props }, ref) => {
    return (
      <button
        ref={ref}
        className={cn(iconButtonVariants({ variant, size }), className)}
        {...props}
      >
        <span className={cn("shrink-0", iconSizeClass(size))}>{icon}</span>
      </button>
    )
  },
)
IconButton.displayName = "IconButton"



const IconButtonLink = React.forwardRef<
  HTMLAnchorElement,
  IconButtonLinkProps
>(
  (
    { variant = "primary", size = "md", icon, className, disabled, ...props },
    ref,
  ) => {
    return (
      <Link
        ref={ref}
        aria-disabled={disabled || undefined}
        tabIndex={disabled ? -1 : undefined}
        className={cn(
          iconButtonVariants({ variant, size }),
          disabled && "pointer-events-none opacity-50",
          className,
        )}
        {...props}
      >
        <span className={cn("shrink-0", iconSizeClass(size))}>{icon}</span>
      </Link>
    )
  },
)
IconButtonLink.displayName = "IconButtonLink"



export {
  Button,
  ButtonLink,
  IconButton,
  IconButtonLink,
  buttonVariants,
  iconButtonVariants,
  type ButtonProps,
  type ButtonLinkProps,
  type IconButtonProps,
  type IconButtonLinkProps,
  type ButtonVariant,
  type IconButtonVariant,
  type ButtonSize,
}
