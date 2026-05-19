"use client"

import * as React from "react"

interface AccountPanelContextType {
  isOpen: boolean
  open: () => void
  close: () => void
}

export const AccountPanelContext = React.createContext<AccountPanelContextType>({
  isOpen: false,
  open: () => {},
  close: () => {},
})

export function AccountPanelProvider({ children }: { children: React.ReactNode }) {
  const [isOpen, setIsOpen] = React.useState(false)

  React.useEffect(() => {
    const isMobile = window.innerWidth < 768
    if (isMobile) {
      document.body.style.overflow = isOpen ? "hidden" : ""
    }
    return () => { document.body.style.overflow = "" }
  }, [isOpen])

  return (
    <AccountPanelContext.Provider
      value={{ isOpen, open: () => setIsOpen(true), close: () => setIsOpen(false) }}
    >
      {children}
    </AccountPanelContext.Provider>
  )
}

export function useAccountPanel() {
  return React.useContext(AccountPanelContext)
}
