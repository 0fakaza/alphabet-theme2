"use client"

import * as React from "react"

interface LoginModalContextType {
  isOpen: boolean
  open: () => void
  close: () => void
}

export const LoginModalContext = React.createContext<LoginModalContextType>({
  isOpen: false,
  open: () => {},
  close: () => {},
})

export function LoginModalProvider({ children }: { children: React.ReactNode }) {
  const [isOpen, setIsOpen] = React.useState(false)

  React.useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : ""
    return () => { document.body.style.overflow = "" }
  }, [isOpen])

  return (
    <LoginModalContext.Provider
      value={{ isOpen, open: () => setIsOpen(true), close: () => setIsOpen(false) }}
    >
      {children}
    </LoginModalContext.Provider>
  )
}

export function useLoginModal() {
  return React.useContext(LoginModalContext)
}
