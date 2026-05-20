"use client"

import { HugeiconsIcon, Cancel01Icon } from "@/lib/icons"

interface AccountModalProps {
  title: string
  onClose: () => void
  children: React.ReactNode
  maxWidth?: string
}

export function AccountModal({ title, onClose, children, maxWidth = "max-w-sm" }: AccountModalProps) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60">
      <div
        className={`relative w-full ${maxWidth} rounded-2xl border border-element-border bg-background-modal p-6 shadow-2xl`}
      >
        <button
          onClick={onClose}
          className="absolute right-4 top-4 flex size-8 items-center justify-center rounded-lg bg-background-elements hover:bg-neutral-400"
        >
          <HugeiconsIcon icon={Cancel01Icon} className="size-4 text-text-main" />
        </button>
        <h3 className="mb-5 text-base font-semibold text-text-title">{title}</h3>
        {children}
      </div>
    </div>
  )
}
