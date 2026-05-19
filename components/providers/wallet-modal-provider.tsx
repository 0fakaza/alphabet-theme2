"use client"

import * as React from "react"

export type WalletMode = "deposit" | "withdraw"

interface WalletModalContextType {
  isOpen: boolean
  mode: WalletMode
  open: (mode?: WalletMode) => void
  close: () => void
  setMode: (mode: WalletMode) => void
}

export const WalletModalContext = React.createContext<WalletModalContextType>({
  isOpen: false,
  mode: "deposit",
  open: () => {},
  close: () => {},
  setMode: () => {},
})

export function WalletModalProvider({ children }: { children: React.ReactNode }) {
  const [isOpen, setIsOpen] = React.useState(false)
  const [mode, setMode] = React.useState<WalletMode>("deposit")

  React.useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : ""
    return () => { document.body.style.overflow = "" }
  }, [isOpen])

  const open = (m: WalletMode = "deposit") => {
    setMode(m)
    setIsOpen(true)
  }

  return (
    <WalletModalContext.Provider value={{ isOpen, mode, open, close: () => setIsOpen(false), setMode }}>
      {children}
    </WalletModalContext.Provider>
  )
}

export function useWalletModal() {
  return React.useContext(WalletModalContext)
}
