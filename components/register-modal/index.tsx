"use client"

import { useState, useRef } from "react"
import Image from "next/image"
import { useTheme } from "next-themes"
import {
  Cancel01Icon,
  EyeIcon,
  ViewOffIcon,
  Mail01Icon,
  UserIcon,
  LockPasswordIcon,
  ArrowDown01Icon,
  HugeiconsIcon,
} from "@/lib/icons"
import { cn } from "@/lib/utils"
import { useRegisterModal } from "@/components/providers/register-modal-provider"
import { useLoginModal } from "@/components/providers/login-modal-provider"
import { Button } from "@/components/elements/button"

const CURRENCIES = [
  { value: "TRY", label: "Türk Lirası (TRY)" },
  { value: "USD", label: "Amerikan Doları (USD)" },
  { value: "EUR", label: "Euro (EUR)" },
  { value: "BTC", label: "Bitcoin (BTC)" },
]

export function RegisterModal() {
  const { isOpen, close } = useRegisterModal()
  const { open: openLogin } = useLoginModal()
  const { resolvedTheme } = useTheme()

  const [username, setUsername] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [passwordRepeat, setPasswordRepeat] = useState("")
  const [currency, setCurrency] = useState("TRY")
  const [showPassword, setShowPassword] = useState(false)
  const [showPasswordRepeat, setShowPasswordRepeat] = useState(false)
  const [currencyOpen, setCurrencyOpen] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const currencyBtnRef = useRef<HTMLButtonElement>(null)

  const passwordMismatch =
    passwordRepeat.length > 0 && password !== passwordRepeat

  if (!isOpen) return null

  const handleSwitchToLogin = () => {
    close()
    openLogin()
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (passwordMismatch) return
    setSubmitted(true)
  }

  const handleClose = () => {
    setSubmitted(false)
    close()
  }

  return (
    <div
      className="fixed inset-0 z-[200] flex items-center justify-center bg-black/70 p-4 backdrop-blur-sm"
      onClick={handleClose}
    >
      <div
        className="relative w-full max-w-[410px] rounded-2xl bg-background-modal shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Kapat butonu */}
        <button
          onClick={handleClose}
          className="absolute right-4 top-4 z-10 flex size-9 items-center justify-center rounded-lg bg-background-element text-text-subtext transition-colors hover:bg-neutral-700 hover:text-text-main"
          aria-label="Kapat"
        >
          <HugeiconsIcon icon={Cancel01Icon} className="size-5" />
        </button>

        {/* ─── Başarı ekranı ─── */}
        {submitted ? (
          <>
            {/* Hoşgeldin hero görseli */}
            <div className="pointer-events-none absolute left-1/2 top-6 h-[226px] w-[213px] -translate-x-1/2 -translate-y-1/5">
              <Image
                src="/images/success-icon-dots.png"
                alt=""
                fill
                className="object-contain"
              />
            </div>
            <div className="flex flex-col items-center px-8 pb-10 pt-[120px] text-center">
              <h2 className="mb-2 text-[17px] font-bold tracking-wide text-text-title">
                Hoşgeldin,
              </h2>
              <p className="mb-8 text-xs leading-snug text-text-subtext">
                Hesabınız başarıyla oluşturuldu.
              </p>
              <button
                type="button"
                onClick={handleClose}
                className="flex h-11 w-full items-center justify-center rounded-xl bg-action-secondary-default text-[13px] font-semibold text-white transition-opacity hover:opacity-90"
              >
                Anasayfa
              </button>
            </div>
          </>
        ) : (

        <div className="login-modal-scroll overflow-y-auto px-8 pb-8 pt-10">

          {/* Kayıt formu hero görseli */}
          <div className="pointer-events-none absolute left-1/2 top-4 h-[226px] w-[213px] -translate-x-1/2 -translate-y-1/5">
            <Image
              src="/images/key-icon-dots.png"
              alt=""
              fill
              className="object-contain"
            />
          </div>

          {/* Başlık */}
          <div className="mb-7 pt-16 text-center">
            <h2 className="mb-1.5 text-[17px] font-bold tracking-wide text-text-title">
              Hesap Oluşturun
            </h2>
            <p className="text-xs leading-snug text-text-subtitle">
              Bilgileri doldur, hesabı oluştur ve kazanmaya başla
            </p>
          </div>

          {/* Form */}
          <form
            className="flex flex-col gap-3"
            onSubmit={handleSubmit}
          >
            {/* Kullanıcı adı */}
            <FormField label="Kullanıcı adı" required>
              <div className="relative">
                <FieldIcon>
                  <HugeiconsIcon icon={UserIcon} className="size-[18px]" />
                </FieldIcon>
                <input
                  type="text"
                  autoComplete="username"
                  placeholder="Kullanıcı adı"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                      className={cn(inputCls, " bg-background-elements placeholder:text-text-subtext")}

                />
              </div>
            </FormField>

            {/* E-Posta */}
            <FormField label="E-Posta" required>
              <div className="relative">
                <FieldIcon>
                  <HugeiconsIcon icon={Mail01Icon} className="size-[18px]" />
                </FieldIcon>
                <input
                  type="email"
                  autoComplete="email"
                  placeholder="E-posta adresiniz"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                      className={cn(inputCls, " bg-background-elements placeholder:text-text-subtext")}

                />
              </div>
            </FormField>

            {/* Parola */}
            <FormField label="Parola" required>
              <div className="relative">
                <FieldIcon>
                  <HugeiconsIcon icon={LockPasswordIcon} className="size-[18px]" />
                </FieldIcon>
                <input
                  type={showPassword ? "text" : "password"}
                  autoComplete="new-password"
                  placeholder="E-posta adresiniz"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className={cn(inputCls, "pr-11 bg-background-elements placeholder:text-text-subtext")}

                />
                <button
                  type="button"
                  onClick={() => setShowPassword((v) => !v)}
                  className="absolute inset-y-0 right-3.5 flex items-center text-text-subtext transition-colors hover:text-text-main"
                  aria-label={showPassword ? "Şifreyi gizle" : "Şifreyi göster"}
                >
                  <HugeiconsIcon
                    icon={showPassword ? ViewOffIcon : EyeIcon}
                    className="size-[18px]"
                  />
                </button>
              </div>
            </FormField>

            {/* Parola Tekrar */}
            <FormField
              label="Parola Tekrar"
              required
              error={passwordMismatch ? "Şifreler eşleşmiyor." : undefined}
            >
              <div className="relative">
                <FieldIcon>
                  <HugeiconsIcon icon={LockPasswordIcon} className="size-[18px]" />
                </FieldIcon>
                <input
                  type={showPasswordRepeat ? "text" : "password"}
                  autoComplete="new-password"
                  placeholder="E-posta Tekrar"
                  value={passwordRepeat}
                  onChange={(e) => setPasswordRepeat(e.target.value)}
                  className={cn(
                    inputCls,
                    "pr-11 bg-background-elements placeholder:text-text-subtext",
                    passwordMismatch && "border-red-500 focus:border-red-500 focus:ring-red-500/40",
                  )}

                />
                <button
                  type="button"
                  onClick={() => setShowPasswordRepeat((v) => !v)}
                  className="absolute inset-y-0 right-3.5 flex items-center text-text-subtext transition-colors hover:text-text-main"
                  aria-label={showPasswordRepeat ? "Şifreyi gizle" : "Şifreyi göster"}
                >
                  <HugeiconsIcon
                    icon={showPasswordRepeat ? ViewOffIcon : EyeIcon}
                    className="size-[18px]"
                  />
                </button>
              </div>
            </FormField>

            {/* Para Birimi */}
            <FormField label="Para Birimi">
              <div className="relative ">
                <button
                  ref={currencyBtnRef}
                  type="button"
                  onClick={() => setCurrencyOpen((v) => !v)}
                  className={cn(
                    "flex w-full cursor-pointer items-center justify-between rounded-xl border border-element-border bg-background-elements px-4 py-3 text-sm text-text-main outline-none transition-colors",
                    currencyOpen && "border-primary ring-1 ring-primary/40",
                  )}
                >
                  <span>
                    {CURRENCIES.find((c) => c.value === currency)?.label}
                  </span>
                  <HugeiconsIcon
                    icon={ArrowDown01Icon}
                    className={cn(
                      "size-4 shrink-0 text-text-subtext transition-transform duration-200",
                      currencyOpen && "rotate-180",
                    )}
                  />
                </button>

                {currencyOpen && (
                  <>
                    <div
                      className="fixed inset-0 z-[210]"
                      onClick={() => setCurrencyOpen(false)}
                    />
                    <div className="absolute left-0 right-0 top-[calc(100%+4px)] z-[211] overflow-hidden rounded-xl border border-element-border bg-background-modal shadow-2xl">
                      {CURRENCIES.map((c) => (
                        <button
                          key={c.value}
                          type="button"
                          onClick={() => {
                            setCurrency(c.value)
                            setCurrencyOpen(false)
                          }}
                          className={cn(
                            "flex w-full items-center px-4 py-3 text-left text-sm transition-colors hover:bg-background-element",
                            c.value === currency
                              ? "font-semibold text-primary"
                              : "text-text-main",
                          )}
                        >
                          {c.label}
                        </button>
                      ))}
                    </div>
                  </>
                )}
              </div>
            </FormField>

            <Button
              type="submit"
              variant="secondary"
              size="md"
              className="mt-2 w-full"
              disabled={passwordMismatch}
            >
              Hesap Oluştur
            </Button>
          </form>

          {/* Alt link */}
          <p className="mt-5 text-center text-[13px] text-text-subtitle">
            Kayıtlı hesabınız var mı?{" "}
            <button
              type="button"
              onClick={handleSwitchToLogin}
              className="font-semibold text-text-subtext underline underline-offset-2 transition-colors hover:text-primary"
            >
              Giriş Yap
            </button>
          </p>
        </div>

        )} {/* submitted ? ... : ( ... ) */}

      </div>
    </div>
  )
}

/* ─── Yardımcı alt bileşenler ─── */

function FormField({
  label,
  required,
  error,
  children,
}: {
  label: string
  required?: boolean
  error?: string
  children: React.ReactNode
}) {
  return (
    <div className="flex flex-col gap-1">
      <label className="flex items-center gap-1 pl-1.5 text-[10px] font-medium text-text-subtitle">
        {label}
        {required && <span className="text-red-500">*</span>}
      </label>
      {children}
      {error && (
        <p className="pl-1.5 text-[10px] font-medium text-red-500">{error}</p>
      )}
    </div>
  )
}

function FieldIcon({ children }: { children: React.ReactNode }) {
  return (
    <span className="pointer-events-none absolute inset-y-0 left-3.5 flex items-center text-text-subtext">
      {children}
    </span>
  )
}

const inputCls =
  "w-full rounded-xl border border-element-border bg-background-element py-3 pl-10 pr-4 text-sm text-text-main placeholder:text-text-subtext/60 outline-none transition-colors focus:border-primary focus:ring-1 focus:ring-primary/40"
