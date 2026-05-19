"use client"

import * as React from "react"

interface RegisterModalContextType {
  isOpen: boolean
  open: () => void
  close: () => void
}

export const RegisterModalContext = React.createContext<RegisterModalContextType>({
  isOpen: false,
  open: () => {},
  close: () => {},
})

export function RegisterModalProvider({ children }: { children: React.ReactNode }) {
  const [isOpen, setIsOpen] = React.useState(false)

  React.useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : ""
    return () => { document.body.style.overflow = "" }
  }, [isOpen])

  return (
    <RegisterModalContext.Provider
      value={{ isOpen, open: () => setIsOpen(true), close: () => setIsOpen(false) }}
    >
      {children}
    </RegisterModalContext.Provider>
  )
}

export function useRegisterModal() {
  return React.useContext(RegisterModalContext)
}
