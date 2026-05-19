"use client"

import * as React from "react"

interface ForgotPasswordModalContextType {
  isOpen: boolean
  open: () => void
  close: () => void
}

export const ForgotPasswordModalContext = React.createContext<ForgotPasswordModalContextType>({
  isOpen: false,
  open: () => {},
  close: () => {},
})

export function ForgotPasswordModalProvider({ children }: { children: React.ReactNode }) {
  const [isOpen, setIsOpen] = React.useState(false)

  React.useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : ""
    return () => { document.body.style.overflow = "" }
  }, [isOpen])

  return (
    <ForgotPasswordModalContext.Provider
      value={{ isOpen, open: () => setIsOpen(true), close: () => setIsOpen(false) }}
    >
      {children}
    </ForgotPasswordModalContext.Provider>
  )
}

export function useForgotPasswordModal() {
  return React.useContext(ForgotPasswordModalContext)
}
