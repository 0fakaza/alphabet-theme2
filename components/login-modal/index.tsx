"use client"

import { useState } from "react"
import Image from "next/image"
import {
  Cancel01Icon,
  EyeIcon,
  ViewOffIcon,
  Mail01Icon,
  SmartPhone01Icon,
  LockPasswordIcon,
  HugeiconsIcon,
} from "@/lib/icons"
import { cn } from "@/lib/utils"
import { useLoginModal } from "@/components/providers/login-modal-provider"
import { useRegisterModal } from "@/components/providers/register-modal-provider"
import { useForgotPasswordModal } from "@/components/providers/forgot-password-modal-provider"
import { useAuth } from "@/components/providers/auth-provider"
import { useRouter } from "next/navigation"
import {Key01Icon} from "@hugeicons-pro/core-solid-sharp";

type LoginTab = "email" | "sms"

export function LoginModal() {
  const { isOpen, close } = useLoginModal()
  const { open: openRegister } = useRegisterModal()
  const { open: openForgotPassword } = useForgotPasswordModal()
  const { login } = useAuth()
  const router = useRouter()

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault()
    login()
    close()
    router.push("/")
  }

  const [tab, setTab] = useState<LoginTab>("email")
  const [showPassword, setShowPassword] = useState(false)
  const [email, setEmail] = useState("")
  const [phone, setPhone] = useState("")
  const [password, setPassword] = useState("")
  const [smsCode, setSmsCode] = useState("")
  const [rememberMe, setRememberMe] = useState(false)

  if (!isOpen) return null

  return (
    <div
      className="fixed inset-0 z-[200] flex items-center justify-center bg-black/70 p-6 backdrop-blur-sm"
      onClick={close}
    >
      <div
        className="relative flex h-full max-h-[650px] w-full max-w-[1273px] overflow-hidden rounded-2xl shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        {/* ─── Sol: Form Alanı ─── */}
        <div className="login-modal-scroll relative flex w-full flex-col justify-between overflow-y-auto bg-background-modal px-8 py-10 md:w-[420px] md:shrink-0 md:px-10">

          {/* Kapat butonu (mobil) */}
          <button
            onClick={close}
            className="absolute right-4 top-4 flex size-8 items-center justify-center rounded-full bg-neutral-700/60 text-text-subtext transition-colors hover:bg-neutral-700 hover:text-text-main md:hidden"
            aria-label="Kapat"
          >
            <HugeiconsIcon icon={Cancel01Icon} className="size-4" />
          </button>

          {/* Hero görseli */}
          <div className="pointer-events-none absolute left-1/2 top-0 h-[270px] w-[326px] -translate-x-1/2 -translate-y-1/5">
            <Image
              src="/images/header-icon-dots.png"
              alt=""
              fill
              className="object-contain"
            />
          </div>

          {/* Üst Blok */}
          <div>
            {/* Başlık */}
            <div className="mb-8 mt-16 text-center">
              <h2 className="mb-1.5 text-[17px] font-bold tracking-wide text-text-title">
                Tekrar hoşgeldin,
              </h2>
              <p className="text-xs leading-snug text-text-subtext">
                Giriş yap, cömert bonuslar ile kazanmaya devam et
              </p>
            </div>

            {/* Tabs — underline stili */}
            <div className="mb-5 flex w-full">
              <button
                onClick={() => setTab("email")}
                className={cn(
                  "flex flex-1 items-center justify-center gap-1.5 border-b pb-3 text-sm font-medium transition-colors duration-200",
                  tab === "email"
                    ? "border-primary text-primary"
                    : "border-divider-100 text-text-subtext hover:text-text-main",
                )}
              >

                E-Posta ile giriş yap
              </button>
              <button
                onClick={() => setTab("sms")}
                className={cn(
                  "flex flex-1 items-center justify-center gap-1.5 border-b pb-3 text-sm font-medium transition-colors duration-200",
                  tab === "sms"
                    ? "border-primary text-primary"
                    : "border-divider-100 text-text-subtext hover:text-text-main",
                )}
              >

                SMS ile giriş yap
              </button>
            </div>

            {/* E-posta Formu */}
            {tab === "email" && (
              <form className="flex flex-col gap-3" onSubmit={handleLogin}>
                {/* E-posta */}
                <div className="flex flex-col gap-1">
                  <label className="flex items-center gap-1 pl-1.5 text-[10px] font-medium text-text-subtitle">
                    E-Posta <span className="text-red-500">*</span>
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
                      className={cn(inputCls, " bg-background-elements placeholder:text-text-subtext")}

                    />
                  </div>
                </div>

                {/* Parola */}
                <div className="flex flex-col gap-1">
                  <label className="flex items-center gap-1 pl-1.5 text-[10px] font-medium text-text-subtitle">
                    Parola <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <span className="pointer-events-none absolute inset-y-0 left-3.5 flex items-center text-text-subtext">
                      <HugeiconsIcon icon={Key01Icon} className="size-[18px]" />
                    </span>
                    <input
                      type={showPassword ? "text" : "password"}
                      autoComplete="current-password"
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
                </div>

                {/* Parolamı Unuttum + Beni Hatırla */}
                <div className="flex items-center justify-between py-0.5">
                  <button
                    type="button"
                    onClick={() => { close(); openForgotPassword() }}
                    className="text-xs font-semibold text-text-subtext underline underline-offset-2 transition-colors hover:text-primary"
                  >
                    Parolamı Unuttum
                  </button>
                  <label className="flex cursor-pointer items-center gap-2 text-sm text-text-subtext">
                    <span
                      onClick={() => setRememberMe((v) => !v)}
                      className={cn(
                        "flex size-5 shrink-0 items-center justify-center rounded border-2 transition-colors",
                        rememberMe
                          ? "border-primary bg-primary"
                          : "border-element-border bg-background-element",
                      )}
                    >
                      {rememberMe && (
                        <svg viewBox="0 0 10 10" className="size-2.5 text-white" fill="none" stroke="currentColor" strokeWidth="2">
                          <polyline points="1.5,5 4,7.5 8.5,2.5" />
                        </svg>
                      )}
                    </span>
                    Beni Hatırla
                  </label>
                </div>

                <button
                  type="submit"
                  className="mt-1 flex h-11 w-full items-center justify-center rounded-xl bg-semantic-success text-[13px] font-semibold text-white transition-opacity hover:opacity-90 active:opacity-80"
                >
                  Giriş Yap
                </button>
              </form>
            )}

            {/* SMS Formu */}
            {tab === "sms" && (
              <form className="flex flex-col gap-3" onSubmit={handleLogin}>
                <div className="flex flex-col gap-1">
                  <label className="flex items-center gap-1 pl-1.5 text-[10px] font-medium text-text-subtitle">
                    Telefon Numarası <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <span className="pointer-events-none absolute inset-y-0 left-3.5 flex items-center text-text-subtext">
                      <HugeiconsIcon icon={SmartPhone01Icon} className="size-[18px]" />
                    </span>
                    <input
                      type="tel"
                      autoComplete="tel"
                      placeholder="+90 5xx xxx xx xx"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      className={cn(inputCls, " bg-background-elements placeholder:text-text-subtext")}

                    />
                  </div>
                </div>

                <div className="flex flex-col gap-1">
                  <div className="flex items-center justify-between pl-1.5">
                    <label className="text-[10px] font-medium text-text-subtitle">SMS Kodu</label>
                    <button type="button" className="text-[10px] font-semibold text-primary hover:underline">
                      Kod Gönder
                    </button>
                  </div>
                  <input
                    type="text"
                    inputMode="numeric"
                    maxLength={6}
                    placeholder="123456"
                    value={smsCode}
                    onChange={(e) => setSmsCode(e.target.value.replace(/\D/g, ""))}
                    className={cn(inputCls, " bg-background-elements placeholder:text-text-subtext tracking-[0.3em]")}

                  />
                </div>

                <button
                  type="submit"
                  className="mt-2 flex h-11 w-full items-center justify-center rounded-xl bg-semantic-success text-[13px] font-semibold text-white transition-opacity hover:opacity-90 active:opacity-80"
                >
                  Giriş Yap
                </button>
              </form>
            )}

            {/* veya + Sosyal Giriş */}
            <div className="mt-4 flex flex-col gap-3">
              <p className="text-center text-[13px] text-white/30">veya</p>
              <div className="flex gap-2">
                {/* Google */}
                <button
                  type="button"
                  className="flex flex-1 items-center justify-center rounded-lg bg-background-main py-2.5 transition-opacity hover:opacity-80"
                  aria-label="Google ile giriş yap"
                >
                  <svg viewBox="0 0 24 24" className="size-6 text-icon" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                    <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                    <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                    <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z"/>
                    <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                  </svg>
                </button>
                {/* Facebook */}
                <button
                  type="button"
                  className="flex flex-1 items-center justify-center rounded-lg bg-background-main py-2.5 transition-opacity hover:opacity-80"
                  aria-label="Facebook ile giriş yap"
                >
                  <svg viewBox="0 0 24 24" className="size-6 text-icon" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                    <path d="M24 12.073C24 5.405 18.627 0 12 0S0 5.405 0 12.073C0 18.1 4.388 23.094 10.125 24v-8.437H7.078v-3.49h3.047V9.41c0-3.025 1.792-4.697 4.533-4.697 1.312 0 2.686.236 2.686.236v2.97h-1.513c-1.491 0-1.956.93-1.956 1.886v2.267h3.328l-.532 3.49h-2.796V24C19.612 23.094 24 18.1 24 12.073z"/>
                  </svg>
                </button>
                {/* Apple */}
                <button
                  type="button"
                  className="flex flex-1 items-center justify-center rounded-lg bg-background-main py-2.5 transition-opacity hover:opacity-80"
                  aria-label="Apple ile giriş yap"
                >
                  <svg viewBox="0 0 24 24" className="size-6 text-icon" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                    <path d="M17.05 20.28c-.98.95-2.05.8-3.08.35-1.09-.46-2.09-.48-3.24 0-1.44.62-2.2.44-3.06-.35C2.79 15.25 3.51 7.7 9.05 7.4c1.29.07 2.18.73 2.93.75.99-.2 1.93-.8 3.05-.75 1.3.07 2.28.56 2.93 1.44-2.73 1.62-2.08 5.16.56 6.16-.57 1.45-1.29 2.87-2.47 4.28zM12.03 7.25c-.15-2.23 1.66-4.07 3.74-4.25.29 2.58-2.34 4.5-3.74 4.25z"/>
                  </svg>
                </button>
              </div>
            </div>
          </div>

          {/* Alt link */}
          <p className="mt-4 text-center text-[13px] text-white/60">
            Hesabınız yok mu?{" "}
            <button
              type="button"
              className="font-semibold text-white/80 underline underline-offset-2 transition-colors hover:text-primary"
              onClick={() => { close(); openRegister() }}
            >
              Hesap Oluştur
            </button>
          </p>
        </div>

        {/* ─── Sağ: Görsel ─── */}
        <div className="relative hidden flex-1  md:block">
          <Image
            src="/images/login-back.jpg"
            alt="Giriş görseli"
            fill
            className="object-cover object-center"
            priority
          />

          {/* Alttan gradient */}
          <div className="pointer-events-none absolute inset-x-0 bottom-0 h-56 bg-gradient-to-t from-black/70 to-transparent" />

          {/* Kapat butonu */}
          <button
            onClick={close}
            className="absolute right-4 top-4 flex size-9 items-center justify-center rounded-lg bg-[#191d1f] text-white transition-colors hover:bg-black/70"
            aria-label="Kapat"
          >
            <HugeiconsIcon icon={Cancel01Icon} className="size-4" />
          </button>

          {/* Üst metin */}
          <div className="absolute left-10 top-[90px] flex max-w-[347px] flex-col gap-3.5">
            <p className="text-[21px] font-light leading-snug text-white/60">
              Cömert bonuslar, Kayıplarınız için discountlar ve spor&apos;da en yüksek oranlar
            </p>
            <p className="text-[29px] font-semibold leading-snug text-white">
              Hepsi bir arada yalnızca Alphabe&apos;de
            </p>
          </div>

          {/* Alt sosyal linkler */}
          <div className="absolute bottom-24 left-10 flex flex-col gap-3">
            <p className="text-[13px] font-medium text-white">
              Temasta kalın, <br/> Bonusları kaçırmayın
            </p>
            <div className="flex items-center gap-2.5">
              {/* Twitter / X */}
              <a href="#" aria-label="Twitter" className="flex size-10 items-center justify-center rounded-full bg-white text-black transition-opacity hover:opacity-80">
                <svg viewBox="0 0 16 16" className="size-4" fill="currentColor">
                  <path d="M12.6 0h2.454l-5.36 6.131L16 16h-4.937l-3.867-5.055L2.771 16H.316l5.733-6.554L0 0h5.063l3.495 4.633L12.601 0zm-.86 14.376h1.36L4.323 1.394H2.865l8.875 12.982z"/>
                </svg>
              </a>
              {/* Instagram */}
              <a href="#" aria-label="Instagram" className="flex size-10 items-center justify-center rounded-full bg-white text-black transition-opacity hover:opacity-80">
                <svg viewBox="0 0 16 16" className="size-4" fill="currentColor">
                  <path d="M8 0C5.829 0 5.556.01 4.703.048 3.85.088 3.269.222 2.76.42a3.917 3.917 0 0 0-1.417.923A3.927 3.927 0 0 0 .42 2.76C.222 3.268.087 3.85.048 4.7.01 5.555 0 5.827 0 8.001c0 2.172.01 2.444.048 3.297.04.852.174 1.433.372 1.942.205.526.478.972.923 1.417.444.445.89.719 1.416.923.51.198 1.09.333 1.942.372C5.555 15.99 5.827 16 8 16s2.444-.01 3.298-.048c.851-.04 1.434-.174 1.943-.372a3.916 3.916 0 0 0 1.416-.923c.445-.445.718-.891.923-1.417.197-.509.332-1.09.372-1.942C15.99 10.445 16 10.173 16 8s-.01-2.445-.048-3.299c-.04-.851-.175-1.433-.372-1.941a3.926 3.926 0 0 0-.923-1.417A3.911 3.911 0 0 0 13.24.42c-.51-.198-1.092-.333-1.943-.372C10.443.01 10.172 0 7.998 0H8zm-.717 1.442h.718c2.136 0 2.389.007 3.232.046.78.035 1.204.166 1.486.275.373.145.64.319.92.599.28.28.453.546.598.92.11.281.24.705.275 1.485.039.843.047 1.096.047 3.231s-.008 2.389-.047 3.232c-.035.78-.166 1.203-.275 1.485a2.47 2.47 0 0 1-.599.919c-.28.28-.546.453-.92.598-.28.11-.704.24-1.485.276-.843.038-1.096.047-3.232.047s-2.39-.009-3.233-.047c-.78-.036-1.203-.166-1.485-.276a2.478 2.478 0 0 1-.92-.598 2.48 2.48 0 0 1-.6-.92c-.109-.281-.24-.705-.275-1.485-.038-.843-.046-1.096-.046-3.233 0-2.136.008-2.388.046-3.231.036-.78.166-1.204.276-1.486.145-.373.319-.64.599-.92.28-.28.546-.453.92-.598.282-.11.705-.24 1.485-.276.738-.034 1.024-.044 2.515-.045v.002zm4.988 1.328a.96.96 0 1 0 0 1.92.96.96 0 0 0 0-1.92zm-4.27 1.122a4.109 4.109 0 1 0 0 8.217 4.109 4.109 0 0 0 0-8.217zm0 1.441a2.667 2.667 0 1 1 0 5.334 2.667 2.667 0 0 1 0-5.334z"/>
                </svg>
              </a>
              {/* YouTube */}
              <a href="#" aria-label="YouTube" className="flex size-10 items-center justify-center rounded-full bg-white text-black transition-opacity hover:opacity-80">
                <svg viewBox="0 0 16 16" className="size-4" fill="currentColor">
                  <path d="M8.051 1.999h.089c.822.003 4.987.033 6.11.335a2.01 2.01 0 0 1 1.415 1.42c.101.38.172.883.22 1.402l.01.104.022.26.008.104c.065.914.073 1.77.074 1.957v.075c-.001.194-.01 1.108-.082 2.06l-.008.105-.009.104c-.05.572-.124 1.14-.235 1.558a2.007 2.007 0 0 1-1.415 1.42c-1.16.312-5.569.334-6.18.335h-.142c-.309 0-1.587-.006-2.927-.052l-.17-.006-.087-.004-.171-.007-.171-.007c-1.11-.049-2.167-.128-2.654-.26a2.007 2.007 0 0 1-1.415-1.419c-.111-.417-.185-.986-.235-1.558L.09 9.82l-.008-.104A31.4 31.4 0 0 1 0 7.68v-.123c.002-.215.01-.958.064-1.778l.007-.103.003-.052.008-.104.022-.26.01-.104c.048-.519.119-1.023.22-1.402a2.007 2.007 0 0 1 1.415-1.42c.487-.13 1.544-.21 2.654-.26l.17-.007.172-.006.086-.003.171-.007A99.788 99.788 0 0 1 7.858 2h.193zM6.4 5.209v4.818l4.157-2.408L6.4 5.209z"/>
                </svg>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

const inputCls =
  "w-full rounded-xl border border-element-border bg-background-element py-3 pl-10 pr-4 text-sm text-text-main placeholder:text-text-subtext/60 outline-none transition-colors focus:border-primary focus:ring-1 focus:ring-primary/40"
