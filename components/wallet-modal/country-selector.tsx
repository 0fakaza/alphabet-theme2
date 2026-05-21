"use client"

import { useEffect, useRef, useState } from "react"
import Image from "next/image"
import { ArrowDown01Icon, HugeiconsIcon } from "@/lib/icons"
import { cn } from "@/lib/utils"
import type { WalletCountry } from "@/data/wallet-countries"

export function CountrySelector({
  countries,
  selected,
  onSelect,
}: {
  countries: WalletCountry[]
  selected: WalletCountry
  onSelect: (country: WalletCountry) => void
}) {
  const [open, setOpen] = useState(false)
  const rootRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!open) return
    const onPointerDown = (e: MouseEvent) => {
      if (!rootRef.current?.contains(e.target as Node)) setOpen(false)
    }
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false)
    }
    document.addEventListener("mousedown", onPointerDown)
    document.addEventListener("keydown", onKey)
    return () => {
      document.removeEventListener("mousedown", onPointerDown)
      document.removeEventListener("keydown", onKey)
    }
  }, [open])

  return (
    <div ref={rootRef} className="relative shrink-0">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className="flex items-center gap-1.5 rounded-lg py-1 text-text-main transition-colors hover:text-text-title"
        aria-expanded={open}
        aria-haspopup="listbox"
        aria-label="Ülke seç"
      >
        <Image
          src={selected.flag}
          alt=""
          width={18}
          height={18}
          className="size-[18px] rounded-full object-cover"
        />
        <span className="text-xs font-medium">{selected.name}</span>
        <HugeiconsIcon
          icon={ArrowDown01Icon}
          className={cn(
            "size-2 text-text-subtext transition-transform",
            open && "rotate-180"
          )}
        />
      </button>

      {open && (
        <ul
          role="listbox"
          className="absolute right-0 top-[calc(100%+6px)] z-50 max-h-[220px] min-w-[160px] overflow-y-auto rounded-xl border border-element-border bg-background-modal shadow-xl [&::-webkit-scrollbar]:w-1 [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-thumb]:bg-element-border"
        >
          {countries.map((country) => (
            <li key={country.id} role="option" aria-selected={country.id === selected.id}>
              <button
                type="button"
                onClick={() => {
                  onSelect(country)
                  setOpen(false)
                }}
                className={cn(
                  "flex w-full items-center gap-2 px-3 py-2.5 text-left text-xs font-medium transition-colors hover:bg-background-elements",
                  country.id === selected.id
                    ? "text-primary"
                    : "text-text-main"
                )}
              >
                <Image
                  src={country.flag}
                  alt=""
                  width={18}
                  height={18}
                  className="size-[18px] shrink-0 rounded-full object-cover"
                />
                {country.name}
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}
