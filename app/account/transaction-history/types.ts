export type MainTab = "spor" | "casino" | "odeme"
export type OdemeSubTab = "yatirimlar" | "cekinler"
export type KuponStatus =
  | "beklemede"
  | "kazandi"
  | "kaybetti"
  | "satildi"
  | "freebet"
  | "iptal"
export type KuponType = "tekli" | "kombine" | "coklu"
export type OdemeStatus = "onaylandi" | "reddedildi" | "bekliyor" | "kyc"

export type SelectedKupon = {
  id: string
  tarih: string
  isActive: boolean
  type: KuponType
  status: KuponStatus
  game?: string
  bahis?: number
  oran?: number
  maxKazanc?: number
}
