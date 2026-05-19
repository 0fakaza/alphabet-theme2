"use client"

import * as React from "react"

interface MobileMenuContextType {
  isOpen: boolean
  toggle: () => void
  close: () => void
}

export const MobileMenuContext = React.createContext<MobileMenuContextType>({
  isOpen: false,
  toggle: () => {},
  close: () => {},
})

export function MobileMenuProvider({ children }: { children: React.ReactNode }) {
  const [isOpen, setIsOpen] = React.useState(false)

  React.useEffect(() => {
    const isMobile = window.innerWidth < 768
    if (isMobile) {
      document.body.style.overflow = isOpen ? "hidden" : ""
    }
    return () => { document.body.style.overflow = "" }
  }, [isOpen])

  return (
    <MobileMenuContext.Provider
      value={{
        isOpen,
        toggle: () => setIsOpen((v) => !v),
        close: () => setIsOpen(false),
      }}
    >
      {children}
    </MobileMenuContext.Provider>
  )
}

export function useMobileMenu() {
  return React.useContext(MobileMenuContext)
}
