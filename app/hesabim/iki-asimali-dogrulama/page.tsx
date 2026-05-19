"use client"

import { useState, useRef } from "react"
import { cn } from "@/lib/utils"
import { HugeiconsIcon, ShieldKeyIcon, Cancel01Icon, SmartPhone01Icon, CheckmarkCircle02Icon } from "@/lib/icons"
import { AccountPageLayout } from "@/components/account/account-page-layout"
import { Button } from "@/components/elements/button"
import { QrCodeIcon, SecurityLockIcon } from "@/lib/icons"
import Image from "next/image"

const inputCls = "w-full rounded-xl border border-element-border bg-background-elements px-4 py-3 text-sm text-text-main placeholder:text-text-subtext focus:outline-none focus:border-primary transition-colors"

type ModalStep = null | "qr" | "otp" | "success"

export default function IkiAsamaliDogrulamaPage() {
  const [step, setStep] = useState<ModalStep>(null)
  const [otpValues, setOtpValues] = useState(["", "", "", "", "", ""])
  const otpRefs = useRef<(HTMLInputElement | null)[]>([])

  function handleOtpChange(i: number, val: string) {
    if (!/^\d*$/.test(val)) return
    const next = [...otpValues]
    next[i] = val.slice(-1)
    setOtpValues(next)
    if (val && i < 5) otpRefs.current[i + 1]?.focus()
  }

  function handleOtpKeyDown(i: number, e: React.KeyboardEvent) {
    if (e.key === "Backspace" && !otpValues[i] && i > 0) {
      otpRefs.current[i - 1]?.focus()
    }
  }

  function closeModal() {
    setStep(null)
    setOtpValues(["", "", "", "", "", ""])
  }

  return (
    <>
      <AccountPageLayout title="İki Aşamalı Doğrulama" icon={ShieldKeyIcon}>
        <div className="mb-5 flex items-start gap-3 rounded-xl border border-element-border bg-background-main px-5 py-4">
          <div className="mt-0.5 shrink-0 text-primary">💡</div>
          <div>
            <p className="mb-1 text-sm font-semibold text-text-title">İki aşamalı doğrulama nedir?</p>
            <p className="text-xs text-text-subtext">
              Hesabınız korumak için şifreye ek olarak ikinci bir güvenlik adımı kullanılır. Bu sayede, sadece şifrenizi bilen biri hesabınıza erişemez.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <div className="rounded-2xl bg-background-main p-5 border border-element-border">
            <div className="mb-4 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <HugeiconsIcon icon={SecurityLockIcon} className="size-5 text-icon" />
                <span className="text-sm font-semibold text-text-title">Authenticator</span>
              </div>
              <span className="rounded-full bg-background-elements px-2.5 py-0.5 text-xs text-text-subtext">Pasif</span>
            </div>
            <p className="mb-5 text-sm text-text-subtext">Authenticor Uygulaması kullanarak hesabı güvende tut</p>
            <Button variant="secondary" size="sm" onClick={() => setStep("qr")}>
              Kur
            </Button>
          </div>

          <div className="rounded-2xl bg-background-main p-5 border border-element-border">
            <div className="mb-4 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <HugeiconsIcon icon={SmartPhone01Icon} className="size-5 text-icon" />
                <span className="text-sm font-semibold text-text-title">SMS</span>
              </div>
              <span className="rounded-full bg-green-500/15 px-2.5 py-0.5 text-xs font-medium text-green-500">Aktif</span>
            </div>
            <p className="mb-5 text-sm text-text-subtext">SMS kullanarak hesabı güvende tut</p>
            <Button variant="outline" size="sm">
              İptal et
            </Button>
          </div>
        </div>
      </AccountPageLayout>

      {step && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 px-4">
          <div className="relative w-full max-w-md rounded-2xl bg-background-main border border-element-border p-6 shadow-2xl">
            <button
              onClick={closeModal}
              className="absolute right-4 top-4 flex size-8 items-center justify-center rounded-lg bg-background-elements hover:bg-neutral-500/30"
            >
              <HugeiconsIcon icon={Cancel01Icon} className="size-4 text-text-main" />
            </button>

            {step === "qr" && (
              <>
                <h3 className="mb-5 text-base font-semibold text-text-title">2 Aşamalı Doğrulama Kurulumu</h3>
                <div className="flex justify-center mb-5">
                  <div className="size-36 rounded-xl bg-white p-2">
                    <div className="size-full bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTAwIiBoZWlnaHQ9IjEwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTAwIiBoZWlnaHQ9IjEwMCIgZmlsbD0id2hpdGUiLz48cmVjdCB4PSI1IiB5PSI1IiB3aWR0aD0iMzAiIGhlaWdodD0iMzAiIGZpbGw9ImJsYWNrIi8+PHJlY3QgeD0iNjUiIHk9IjUiIHdpZHRoPSIzMCIgaGVpZ2h0PSIzMCIgZmlsbD0iYmxhY2siLz48cmVjdCB4PSI1IiB5PSI2NSIgd2lkdGg9IjMwIiBoZWlnaHQ9IjMwIiBmaWxsPSJibGFjayIvPjxyZWN0IHg9IjQwIiB5PSI1IiB3aWR0aD0iMjAiIGhlaWdodD0iMTAiIGZpbGw9ImJsYWNrIi8+PHJlY3QgeD0iNDAiIHk9IjQwIiB3aWR0aD0iMjAiIGhlaWdodD0iMjAiIGZpbGw9ImJsYWNrIi8+PHJlY3QgeD0iNDAiIHk9Ijc1IiB3aWR0aD0iNTUiIGhlaWdodD0iMTAiIGZpbGw9ImJsYWNrIi8+PHJlY3QgeD0iNzUiIHk9IjQwIiB3aWR0aD0iMjAiIGhlaWdodD0iMjAiIGZpbGw9ImJsYWNrIi8+PC9zdmc+')] bg-cover" />
                  </div>
                </div>
                <p className="mb-4 text-center text-xs text-text-subtext">
                  Eğer QR Kodunu taramakta problem yaşıyorsanız Kurulum Anahtarını manuel olarak girin.
                </p>
                <div className="mb-4 flex flex-col gap-1.5">
                  <label className="text-xs font-medium text-text-subtext">Kurulum Anahtarı</label>
                  <input className={inputCls} defaultValue="salazar42" readOnly />
                </div>
                <Button variant="secondary" className="w-full" onClick={() => setStep("otp")}>Tamam</Button>
                <p className="mt-4 text-center text-[11px] text-text-subtext">
                  App Store veya Google Play&apos;den Google Authenticator indirin. QR Kodu taratarak veya 2FA Kurulum anahtarını girerek hesabınızı güvene alın.
                </p>
              </>
            )}

            {step === "otp" && (
              <>
                <div className="mb-4 flex justify-center">
                  <div className="flex size-12 items-center justify-center rounded-xl bg-primary/20">
                    <HugeiconsIcon icon={ShieldKeyIcon} className="size-6 text-primary" />
                  </div>
                </div>
                <h3 className="mb-2 text-center text-base font-semibold text-text-title">2 Aşamalı Doğrulama Kurulumu</h3>
                <p className="mb-6 text-center text-sm text-text-subtext">Lütfen doğrulama kodunu giriniz</p>
                <div className="mb-6 flex justify-center gap-2">
                  {otpValues.map((v, i) => (
                    <input
                      key={i}
                      ref={(el) => { otpRefs.current[i] = el }}
                      value={v}
                      onChange={(e) => handleOtpChange(i, e.target.value)}
                      onKeyDown={(e) => handleOtpKeyDown(i, e)}
                      maxLength={1}
                      className={cn(
                        "flex size-11 rounded-xl border text-center text-base font-semibold text-text-title bg-background-elements focus:outline-none transition-colors",
                        v ? "border-primary" : "border-element-border",
                      )}
                    />
                  ))}
                </div>
                <Button variant="secondary" className="w-full" onClick={() => setStep("success")}>Doğrula</Button>
                <p className="mt-4 text-center text-[11px] text-text-subtext">
                  App Store veya Google Play&apos;den Google Authenticator indirin. QR Kodu taratarak veya 2FA Kurulum anahtarını girerek hesabınızı güvene alın.
                </p>
              </>
            )}

            {step === "success" && (
              <div className="flex flex-col items-center gap-4 py-4 text-center">
                <div className="flex size-16 items-center justify-center rounded-full bg-primary/20">
                  <HugeiconsIcon icon={CheckmarkCircle02Icon} className="size-9 text-primary" />
                </div>
                <div>
                  <p className="text-base font-semibold text-text-title">Hesabınız artık güvende!</p>
                  <p className="mt-1 text-sm text-text-subtext">Tebrikler, Kurulum başarıyla gerçekleştirdiniz.</p>
                </div>
                <Button variant="secondary" className="w-full mt-2" onClick={closeModal}>Bitti</Button>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  )
}
