/** Virgül/nokta ve para birimi sembolleri ile sayı parse */
export function parseAmountInput(value: string): number | null {
  let t = value.trim().replace(/[₺€£$]/g, "").replace(/\s/g, "")
  if (!t) return null
  if (t.includes(",") && t.includes(".")) {
    t = t.replace(/\./g, "").replace(",", ".")
  } else {
    t = t.replace(",", ".")
  }
  const num = Number(t)
  return Number.isFinite(num) ? num : null
}

export function formatCryptoAmount(value: number): string {
  const s = value.toFixed(6).replace(/\.?0+$/, "")
  return s || "0"
}

export function formatFiatAmount(value: number, symbol: string): string {
  const formatted = value.toLocaleString("tr-TR", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })
  return `${formatted} ${symbol}`
}
