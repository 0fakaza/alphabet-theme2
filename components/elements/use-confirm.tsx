"use client"

import { useCallback, useRef, useState } from "react"
import { ConfirmDialog } from "@/components/elements/confirm-dialog"
import type { ConfirmOptions } from "@/components/elements/confirm-dialog"

const defaultOptions: ConfirmOptions = {
  title: "Emin misiniz?",
  confirmLabel: "Evet",
  cancelLabel: "Vazgeç",
}

export function useConfirm() {
  const resolveRef = useRef<((value: boolean) => void) | null>(null)
  const [open, setOpen] = useState(false)
  const [options, setOptions] = useState<ConfirmOptions>(defaultOptions)

  const confirm = useCallback((next: ConfirmOptions = {}) => {
    return new Promise<boolean>((resolve) => {
      resolveRef.current = resolve
      setOptions({ ...defaultOptions, ...next })
      setOpen(true)
    })
  }, [])

  const close = useCallback((result: boolean) => {
    resolveRef.current?.(result)
    resolveRef.current = null
    setOpen(false)
    setOptions(defaultOptions)
  }, [])

  function ConfirmDialogHost() {
    return (
      <ConfirmDialog
        open={open}
        title={options.title}
        description={options.description}
        confirmLabel={options.confirmLabel}
        cancelLabel={options.cancelLabel}
        onConfirm={() => close(true)}
        onCancel={() => close(false)}
      />
    )
  }

  return { confirm, ConfirmDialog: ConfirmDialogHost }
}
