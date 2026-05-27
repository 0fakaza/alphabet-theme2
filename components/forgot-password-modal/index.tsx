"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import { Cancel01Icon, Mail01Icon, KeyIcon, HugeiconsIcon } from "@/lib/icons"
import { useForgotPasswordModal } from "@/components/providers/forgot-password-modal-provider"
import { useLoginModal } from "@/components/providers/login-modal-provider"

const RESEND_SECONDS = 120

export function ForgotPasswordModal() {
  const { isOpen, close } = useForgotPasswordModal()
  const { open: openLogin } = useLoginModal()

  const [email, setEmail] = useState("")
  const [sent, setSent] = useState(false)
  const [countdown, setCountdown] = useState(RESEND_SECONDS)

  
  useEffect(() => {
    if (!sent) return
    setCountdown(RESEND_SECONDS)
    const id = setInterval(() => {
      setCountdown((v) => {
        if (v <= 1) { clearInterval(id); return 0 }
        return v - 1
      })
    }, 1000)
    return () => clearInterval(id)
  }, [sent])

  if (!isOpen) return null

  const handleClose = () => {
    setSent(false)
    setEmail("")
    close()
  }

  const handleSwitchToLogin = () => {
    handleClose()
    openLogin()
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!email) return
    setSent(true)
  }

  const handleResend = () => {
    if (countdown > 0) return
    setSent(false)
    setTimeout(() => setSent(true), 50)
  }

  return (
    <div
      className="fixed inset-0 z-[200] flex items-center justify-center bg-black/70 p-4 backdrop-blur-sm"
      onClick={handleClose}
    >
      <div
        className="relative w-full max-w-[410px] overflow-hidden rounded-2xl bg-background-modal shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        
        <button
          onClick={handleClose}
          className="absolute right-4 top-4 z-10 flex size-9 items-center justify-center rounded-lg bg-background-element text-text-subtext transition-colors hover:bg-neutral-700 hover:text-text-main"
          aria-label="Kapat"
        >
          <HugeiconsIcon icon={Cancel01Icon} className="size-5" />
        </button>

        
        <div className="pointer-events-none absolute left-1/2 top-2 h-[220px] w-[160px] -translate-x-1/2 -translate-y-1/5">
          <Image
              src="/images/email-icon-dots.png"
              alt=""
              fill
              className="object-contain"
          />
        </div>

        {sent ? (
          
          <div className="px-8 pb-8 pt-10">


            
            <div className="mb-6 pt-13 text-center">
              <h2 className="mb-3 text-[17px] font-bold tracking-wide text-text-title">
                Sıfırlama bağlantısı gönderildi
              </h2>
              <p className="text-xs leading-relaxed text-text-subtext">
                <span className="font-semibold text-text-main">{email}</span>{" "}
                adresinize parola sıfırlama bağlantısı gönderildi. Bağlantıyı takip ederek parolanızı sıfırlayın.
              </p>
            </div>

            
            <div className="mb-4 h-px bg-divider-100" />

            
            <div className="flex items-center justify-between">
              <span className="text-sm text-text-subtext">
                Maili almadınız mı?
              </span>
              <div className="flex items-center gap-1.5">
                <button
                  type="button"
                  onClick={handleResend}
                  disabled={countdown > 0}
                  className="text-[13px] font-semibold text-text-subtext underline underline-offset-2 opacity-50 transition-opacity disabled:cursor-not-allowed disabled:opacity-40 enabled:opacity-100 enabled:hover:text-primary"
                >
                  Tekrar Gönder
                </button>
                {countdown > 0 && (
                  <span className="text-sm font-medium text-primary">
                    ({countdown})
                  </span>
                )}
              </div>
            </div>
          </div>
        ) : (
          
          <div className="px-8 pb-8 pt-10">
            
            <div className="pointer-events-none absolute left-1/2 top-3 h-[183px] w-[129px] -translate-x-1/2 -translate-y-1/5">
              <Image
                src="/images/key-icon-dots.png"
                alt=""
                fill
                className="object-contain"
              />
            </div>



            
            <div className="mb-7 mt-12 text-center">
              <h2 className="mb-1.5 text-[17px] font-bold tracking-wide text-text-title">
                Parola sıfırlayın
              </h2>
              <p className="text-xs leading-snug text-text-subtext">
                Parola sıfırlamak için, kayıtlı e-posta adresinizi girin
              </p>
            </div>

            <form className="flex flex-col gap-5" onSubmit={handleSubmit}>
              <div className="flex flex-col gap-1">
                <label className="flex items-center gap-1 pl-1.5 text-[10px] font-medium text-text-subtitle">
                  E-Posta
                  <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <span className="pointer-events-none absolute inset-y-0 left-3.5 flex items-center text-text-subtext">
                    <HugeiconsIcon icon={Mail01Icon} className="size-[18px]" />
                  </span>
                  <input
                    type="email"
                    autoComplete="email"
                    placeholder="E-posta adresiniz"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className={inputCls}
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={!email}
                className="flex h-11 w-full items-center justify-center rounded-xl bg-action-secondary-default text-[13px] font-semibold text-white transition-opacity hover:opacity-90 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Sıfırlama bağlantısı gönder
              </button>
            </form>

            
            <p className="mt-5 text-center text-[13px] text-text-subtext/70">
              Parolanı hatırladın mı?{" "}
              <button
                type="button"
                onClick={handleSwitchToLogin}
                className="font-semibold text-text-subtext underline underline-offset-2 transition-colors hover:text-primary"
              >
                Giriş Yap
              </button>
            </p>
          </div>
        )}
      </div>
    </div>
  )
}

const inputCls =
  "w-full rounded-xl border border-element-border bg-background-element py-3 pl-10 pr-4 text-sm text-text-main placeholder:text-text-subtext/60 outline-none transition-colors focus:border-primary focus:ring-1 focus:ring-primary/40"
