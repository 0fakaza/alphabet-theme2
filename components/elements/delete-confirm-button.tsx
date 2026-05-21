"use client"

import { useConfirm } from "@/components/elements/use-confirm"
import type { ConfirmOptions } from "@/components/elements/confirm-dialog"

type DeleteConfirmButtonProps = {
  onConfirm: () => void
  confirmOptions?: ConfirmOptions
  children: React.ReactNode
} & Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, "onClick" | "children">

const defaultDeleteConfirm: ConfirmOptions = {
  title: "Emin misiniz?",
  description: "Bu işlemi geri alamazsınız.",
  confirmLabel: "Evet, sil",
  cancelLabel: "Vazgeç",
}

export function DeleteConfirmButton({
  onConfirm,
  confirmOptions,
  children,
  type = "button",
  ...props
}: DeleteConfirmButtonProps) {
  const { confirm, ConfirmDialog } = useConfirm()

  async function handleClick(e: React.MouseEvent<HTMLButtonElement>) {
    e.stopPropagation()
    const ok = await confirm({ ...defaultDeleteConfirm, ...confirmOptions })
    if (ok) onConfirm()
  }

  return (
    <>
      <button type={type} onClick={handleClick} {...props}>
        {children}
      </button>
      <ConfirmDialog />
    </>
  )
}
