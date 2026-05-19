"use client"

import { useState } from "react"
import { cn } from "@/lib/utils"
import Image from "next/image"
import { HugeiconsIcon, User03Icon, Mail01Icon } from "@/lib/icons"
import { AccountPageLayout } from "@/components/account/account-page-layout"
import { Toggle } from "@/components/account/toggle"
import { FormRow } from "@/components/account/form-row"
import { Button } from "@/components/elements/button"
import { Tabs, TabsContent } from "@/components/ui/tabs"
import { TabList } from "@/components/elements/tab-list"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { LockSync01Icon } from "@hugeicons-pro/core-stroke-rounded"
import { Key01Icon } from "@hugeicons-pro/core-stroke-rounded"

const inputCls =
  "w-full rounded-xl bg-background-elements px-4 py-3 text-sm text-text-main placeholder:text-text-subtext border border-element-border focus:outline-none focus:border-primary transition-colors disabled:opacity-50 disabled:cursor-not-allowed"

const countries = [
  { value: "Türkiye",  label: "Türkiye",  flag: "/images/flags/154-turkey.svg" },
  { value: "Almanya",  label: "Almanya",  flag: "/images/flags/208-germany.svg" },
  { value: "Hollanda", label: "Hollanda", flag: "/images/flags/077-netherlands.svg" },
  { value: "Fransa",   label: "Fransa",   flag: "/images/flags/197-france.svg" },
  { value: "İspanya",  label: "İspanya",  flag: "/images/flags/230-spain.svg" },
  { value: "İtalya",   label: "İtalya",   flag: "/images/flags/263-italy.svg" },
  { value: "Belçika",  label: "Belçika",  flag: "/images/flags/209-belgium.svg" },
  { value: "İsveç",    label: "İsveç",    flag: "/images/flags/190-sweden.svg" },
]

const phoneCodes = [
  { value: "+90",  label: "+90",  flag: "/images/flags/154-turkey.svg",    name: "Türkiye" },
  { value: "+49",  label: "+49",  flag: "/images/flags/208-germany.svg",   name: "Almanya" },
  { value: "+31",  label: "+31",  flag: "/images/flags/077-netherlands.svg",name: "Hollanda" },
  { value: "+33",  label: "+33",  flag: "/images/flags/197-france.svg",    name: "Fransa" },
  { value: "+34",  label: "+34",  flag: "/images/flags/230-spain.svg",     name: "İspanya" },
  { value: "+39",  label: "+39",  flag: "/images/flags/263-italy.svg",     name: "İtalya" },
  { value: "+32",  label: "+32",  flag: "/images/flags/209-belgium.svg",   name: "Belçika" },
  { value: "+46",  label: "+46",  flag: "/images/flags/190-sweden.svg",    name: "İsveç" },
  { value: "+44",  label: "+44",  flag: "/images/flags/155-england.svg",   name: "İngiltere" },
  { value: "+1",   label: "+1",   flag: "/images/flags/186-united states.svg", name: "ABD" },
]

const selectTriggerCls =
  "h-auto data-[size=default]:h-auto w-full rounded-xl border-element-border bg-background-elements px-4 py-3 text-sm text-text-main [&>span]:text-text-main focus:ring-0 focus:border-primary"

/* ─────────────────────────────────────────────────────────
   Kişisel Bilgiler Panel
───────────────────────────────────────────────────────── */
type KisiselProps = {
  form: {
    ad: string; soyad: string; ikinciAd: string; dogumTarihi: string
    dogumYeri: string; tc: string; cinsiyet: string; ulke: string; sehir: string; adres: string
  }
  update: (k: string) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => void
  set: (k: string) => (v: string) => void
}

function KisiselBilgilerPanel({ form, update, set }: KisiselProps) {
  return (
    <div className="rounded-2xl md:bg-background-main md:p-8 p-2">
      <h2 className="mb-6 text-base font-semibold text-text-title hidden md:block">Kişisel Bilgiler</h2>
      <div className="flex flex-col gap-3">
        <FormRow label="Ad">
          <input disabled className={inputCls} placeholder="İsim" value={form.ad} onChange={update("ad")} />
        </FormRow>
        <FormRow label="Soyad">
          <input disabled className={inputCls} placeholder="Soyad" value={form.soyad} onChange={update("soyad")} />
        </FormRow>
        <FormRow label="İkinci ad">
          <input disabled className={inputCls} placeholder="" value={form.ikinciAd} onChange={update("ikinciAd")} />
        </FormRow>
        <FormRow label="Doğum Tarihi">
          <input disabled className={inputCls} placeholder="14/10/24" value={form.dogumTarihi} onChange={update("dogumTarihi")} />
        </FormRow>
        <FormRow label="Doğum Yeri">
          <input disabled className={inputCls} placeholder="İstanbul" value={form.dogumYeri} onChange={update("dogumYeri")} />
        </FormRow>
        <FormRow label="TC">
          <input disabled className={inputCls} placeholder="***********" value={form.tc} onChange={update("tc")} />
        </FormRow>
        <FormRow label="Cinsiyet">
          <div className="opacity-50 pointer-events-none">
            <Select value={form.cinsiyet} onValueChange={set("cinsiyet")} disabled>
              <SelectTrigger className={selectTriggerCls}>
                <SelectValue placeholder="Seçiniz" />
              </SelectTrigger>
              <SelectContent className="border-element-border bg-background-elements">
                <SelectItem value="erkek">Erkek</SelectItem>
                <SelectItem value="kadin">Kadın</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </FormRow>
        <FormRow label="Ülke">
          <Select value={form.ulke} onValueChange={set("ulke")}>
            <SelectTrigger className={cn(selectTriggerCls, "justify-start gap-2")}>
              {(() => {
                const c = countries.find((c) => c.value === form.ulke)
                return (
                  <>
                    {c && <Image src={c.flag} alt={c.label} width={20} height={14} className="shrink-0 rounded-sm object-cover" />}
                    <span className="flex-1 text-left text-sm text-text-main">{c?.label ?? "Seçiniz"}</span>
                  </>
                )
              })()}
            </SelectTrigger>
            <SelectContent className="border-element-border bg-background-elements">
              {countries.map((c) => (
                <SelectItem key={c.value} value={c.value}>
                  <div className="flex items-center gap-2">
                    <Image src={c.flag} alt={c.label} width={18} height={13} className="shrink-0 rounded-sm object-cover" />
                    {c.label}
                  </div>
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </FormRow>
        <FormRow label="Şehir">
          <Select value={form.sehir} onValueChange={set("sehir")}>
            <SelectTrigger className={selectTriggerCls}>
              <SelectValue />
            </SelectTrigger>
            <SelectContent className="border-element-border bg-background-elements">
              <SelectItem value="İstanbul">İstanbul</SelectItem>
              <SelectItem value="Ankara">Ankara</SelectItem>
              <SelectItem value="İzmir">İzmir</SelectItem>
            </SelectContent>
          </Select>
        </FormRow>
        <div className="flex items-start gap-4">
          <span className="w-[104px] shrink-0 pt-3 text-sm font-medium text-text-main">Adres</span>
          <textarea
            className={cn(inputCls, "min-h-[64px] resize-none")}
            value={form.adres}
            onChange={update("adres")}
          />
        </div>
      </div>
    </div>
  )
}

/* ─────────────────────────────────────────────────────────
   Kullanıcı Bilgileri Panel
───────────────────────────────────────────────────────── */
type KullaniciProps = {
  form: { kullaniciAdi: string; eposta: string; telefon: string }
  update: (k: string) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => void
  setForm: React.Dispatch<React.SetStateAction<any>>
  privacy: boolean; setPrivacy: (v: boolean) => void
  emailPerm: boolean; setEmailPerm: (v: boolean) => void
  smsPerm: boolean; setSmsPerm: (v: boolean) => void
}

function KullaniciBilgilerPanel({ form, update, setForm, privacy, setPrivacy, emailPerm, setEmailPerm, smsPerm, setSmsPerm }: KullaniciProps) {
  const [showPassword, setShowPassword] = useState(false)
  const [passwords, setPasswords] = useState({ mevcut: "", yeni: "", tekrar: "" })
  const [phoneCode, setPhoneCode] = useState("+90")

  const passwordInputCls = cn(inputCls, "pl-10")

  return (
    <div className="flex flex-col gap-5">
      <div className="rounded-2xl md:bg-background-main md:p-8 p-2">
        <h2 className="mb-6 text-base font-semibold text-text-title">Kullanıcı Bilgileri</h2>
        <div className="flex flex-col gap-3">
          <FormRow label="Kullanıcı adı">
            <input disabled className={inputCls} value={form.kullaniciAdi} onChange={update("kullaniciAdi")} />
          </FormRow>
          <FormRow label="E-Posta">
            <div className="relative">
              <input disabled className={cn(inputCls, "pl-10")} value={form.eposta} onChange={update("eposta")} />
              <HugeiconsIcon icon={Mail01Icon} className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-icon" />
            </div>
          </FormRow>
          <FormRow label="Cep Telefonu">
            <div className="flex items-center gap-2 opacity-50">
              <Select value={phoneCode} onValueChange={setPhoneCode} disabled>
                <SelectTrigger className={cn(selectTriggerCls, "w-auto shrink-0 justify-start gap-1.5")}>
                  {(() => {
                    const p = phoneCodes.find((p) => p.value === phoneCode)
                    return (
                      <>
                        {p && <Image src={p.flag} alt={p.name} width={20} height={14} className="shrink-0 rounded-sm object-cover" />}
                        <span className="text-sm text-text-main">{p?.label ?? "+90"}</span>
                      </>
                    )
                  })()}
                </SelectTrigger>
                <SelectContent className="border-element-border bg-background-elements">
                  {phoneCodes.map((p) => (
                    <SelectItem key={p.value} value={p.value}>
                      <div className="flex items-center gap-2">
                        <Image src={p.flag} alt={p.name} width={18} height={13} className="shrink-0 rounded-sm object-cover" />
                        <span className="text-text-subtext">{p.name}</span>
                        <span className="font-medium">{p.label}</span>
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <input
                disabled
                className={cn(inputCls, "flex-1")}
                value={form.telefon.replace(phoneCode, "")}
                onChange={(e) => setForm((p: any) => ({ ...p, telefon: phoneCode + e.target.value }))}
                placeholder="5XX XXX XX XX"
              />
            </div>
          </FormRow>
        </div>

        <div className="my-6 h-px w-full bg-divider-100" />

        <div className="flex items-center justify-between">
          <p className="text-sm font-semibold text-text-title flex items-center gap-1.5"><HugeiconsIcon className="text-primary" icon={LockSync01Icon} /> Parola Değiştir</p>
          {!showPassword && (
            <Button variant="outline" size="sm" onClick={() => setShowPassword(true)}>
              <HugeiconsIcon icon={Mail01Icon} className="size-4" />
              Parola değiştir
            </Button>
          )}
        </div>

        {showPassword && (
          <div className="mt-4 flex flex-col gap-3">
            <div className="flex flex-col gap-1">
              <label className="text-xs text-text-subtext">Mevcut Parola</label>
              <div className="relative">
                <input
                  type="password"
                  className={passwordInputCls}
                  value={passwords.mevcut}
                  onChange={(e) => setPasswords((p) => ({ ...p, mevcut: e.target.value }))}
                />
                <HugeiconsIcon icon={Key01Icon} className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-icon" />
              </div>
            </div>
            <div className="flex flex-col gap-1">
              <label className="text-xs text-text-subtext">Parola</label>
              <div className="relative">
                <input
                  type="password"
                  className={passwordInputCls}
                  value={passwords.yeni}
                  onChange={(e) => setPasswords((p) => ({ ...p, yeni: e.target.value }))}
                />
                <HugeiconsIcon icon={Key01Icon} className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-icon" />
              </div>
            </div>
            <div className="flex flex-col gap-1">
              <label className="text-xs text-text-subtext">Parola Tekrar</label>
              <div className="relative">
                <input
                  type="password"
                  className={passwordInputCls}
                  value={passwords.tekrar}
                  onChange={(e) => setPasswords((p) => ({ ...p, tekrar: e.target.value }))}
                />
                <HugeiconsIcon icon={Key01Icon} className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-icon" />
              </div>
            </div>
          </div>
        )}
      </div>

      <div className="rounded-2xl px-7 py-4">
        <p className="mb-4 text-sm font-semibold text-text-title">Gizlilik</p>
        <div className="flex items-start justify-between gap-4">
          <div className="flex-1">
            <p className="text-sm font-medium text-text-main">Tablolarda bilgilerini gizle</p>
            <p className="mt-1 text-xs text-text-subtext">
              Kazananlar tablolarında kullanıcı bilgilerinizi gizleyebilirsiniz.
            </p>
          </div>
          <Toggle checked={privacy} onChange={setPrivacy} />
        </div>

        <div className="my-6 h-px w-full bg-divider-100" />

        <p className="mb-4 text-sm font-semibold text-text-title">İzinler</p>
        <div className="flex flex-col gap-5">
          <div className="flex items-start justify-between gap-4">
            <div className="flex-1">
              <p className="text-sm font-medium text-text-main">Bizden E-posta Yoluyla Teklifler Alın</p>
              <p className="mt-1 text-xs text-text-subtext">
                Bizden e-posta yoluyla haber almak isteyip istemediğinizi seçin
              </p>
            </div>
            <Toggle checked={emailPerm} onChange={setEmailPerm} />
          </div>
          <div className="flex items-start justify-between gap-4">
            <div className="flex-1">
              <p className="text-sm font-medium text-text-main">Bizden SMS Yoluyla Teklifler Alın</p>
              <p className="mt-1 text-xs text-text-subtext">
                Bizden SMS yoluyla haber almak isteyip istemediğinizi seçin
              </p>
            </div>
            <Toggle checked={smsPerm} onChange={setSmsPerm} />
          </div>
        </div>
      </div>
    </div>
  )
}

/* ─────────────────────────────────────────────────────────
   Page
───────────────────────────────────────────────────────── */
export default function HesabimPage() {
  const [form, setForm] = useState({
    ad: "", soyad: "", ikinciAd: "", dogumTarihi: "", dogumYeri: "",
    tc: "", cinsiyet: "", ulke: "Türkiye", sehir: "İstanbul",
    adres: "Ünsalan, Liballey Co. No: 80 G Blok, 34750 Üsküdar/İstanbul",
    kullaniciAdi: "salazar42", eposta: "falihun@gmail.com", telefon: "+90",
  })
  const [privacy, setPrivacy] = useState(true)
  const [emailPerm, setEmailPerm] = useState(true)
  const [smsPerm, setSmsPerm] = useState(false)

  const update =
    (key: string) =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) =>
      setForm((p) => ({ ...p, [key]: e.target.value }))

  const set = (key: string) => (value: string) =>
    setForm((p) => ({ ...p, [key]: value }))

  const kisiselProps: KisiselProps = { form, update, set }
  const kullaniciProps: KullaniciProps = { form, update, setForm, privacy, setPrivacy, emailPerm, setEmailPerm, smsPerm, setSmsPerm }

  return (
    <AccountPageLayout title="Hesabım" icon={User03Icon} breadcrumb="Hesabım">
      <div className="flex flex-col gap-5">

        <Tabs defaultValue="kisisel" className="lg:hidden">
          <TabList
            tabs={[
              { value: "kisisel", label: "Kişisel Bilgiler" },
              { value: "kullanici", label: "Kullanıcı Bilgileri" },
            ]}
            className="w-fit rounded-xl"
          />
          <TabsContent value="kisisel" className="mt-4">
            <KisiselBilgilerPanel {...kisiselProps} />
          </TabsContent>
          <TabsContent value="kullanici" className="mt-4">
            <KullaniciBilgilerPanel {...kullaniciProps} />
          </TabsContent>
        </Tabs>

        <div className="hidden grid-cols-2 gap-5 lg:grid">
          <KisiselBilgilerPanel {...kisiselProps} />
          <KullaniciBilgilerPanel {...kullaniciProps} />
        </div>

        <div className="flex items-center justify-end gap-3">
          <Button variant="outline" size="sm">Vazgeç</Button>
          <Button variant="secondary" size="sm">Değişikleri Kaydet</Button>
        </div>
      </div>
    </AccountPageLayout>
  )
}
