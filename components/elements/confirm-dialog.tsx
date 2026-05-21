"use client"

import { createPortal } from "react-dom"
import { useEffect, useState } from "react"
import { HugeiconsIcon, Cancel01Icon } from "@/lib/icons"
import { Button } from "@/components/elements/button"
import { cn } from "@/lib/utils"

export type ConfirmOptions = {
  title?: string
  description?: string
  confirmLabel?: string
  cancelLabel?: string
}

export type ConfirmDialogProps = {
  open: boolean
  title?: string
  description?: string
  confirmLabel?: string
  cancelLabel?: string
  onConfirm: () => void
  onCancel: () => void
  className?: string
}

export function ConfirmDialog({
  open,
  title = "Emin misiniz?",
  description,
  confirmLabel = "Evet",
  cancelLabel = "Vazgeç",
  onConfirm,
  onCancel,
  className,
}: ConfirmDialogProps) {
  const [mounted, setMounted] = useState(false)

  useEffect(() => setMounted(true), [])

  useEffect(() => {
    if (!open) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onCancel()
    }
    window.addEventListener("keydown", onKey)
    return () => window.removeEventListener("keydown", onKey)
  }, [open, onCancel])

  if (!mounted || !open) return null

  return createPortal(
    <div className="fixed inset-0 z-[200] flex items-center justify-center bg-black/60 p-4">
      <div
        role="alertdialog"
        aria-modal="true"
        aria-labelledby="confirm-dialog-title"
        className={cn(
          "relative w-full max-w-sm rounded-2xl border border-element-border bg-background-modal p-6 shadow-2xl",
          className,
        )}
      >
        <button
          type="button"
          onClick={onCancel}
          className="absolute right-4 top-4 flex size-8 items-center justify-center rounded-lg bg-background-elements hover:bg-neutral-400"
          aria-label="Kapat"
        >
          <HugeiconsIcon icon={Cancel01Icon} className="size-4 text-text-main" />
        </button>
        <h3 id="confirm-dialog-title" className="pr-8 text-base font-semibold text-text-title">
          {title}
        </h3>
        {description && <p className="mt-2 text-sm text-text-subtext">{description}</p>}
        <div className="mt-6 flex gap-3">
          <Button variant="outline" className="flex-1" onClick={onCancel}>
            {cancelLabel}
          </Button>
          <Button variant="secondary" className="flex-1" onClick={onConfirm}>
            {confirmLabel}
          </Button>
        </div>
      </div>
    </div>,
    document.body,
  )
}
