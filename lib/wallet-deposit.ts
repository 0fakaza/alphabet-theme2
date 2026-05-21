import type { PaymentMethod } from "@/data/wallet"

const DEPOSIT_ADDRESSES: Record<string, string> = {
  tether: "TJYeasTPWNnUejKnVwPPLMVhwPtDwVqKqJ8xK9mN2pQr4sTuVwXyZ",
  usdc: "0x742d35Cc6634C0532925a3b844Bc9e7595f0EbE1",
  tron: "TJYeasTPWNnUejKnVwPPLMVhwPtDwVqKqJ8xK9mN2pQr4sTuVwXyZ",
  bitcoin: "bc1qxy2kgdygjrsqtzq2n0yrf2493p83kkfjhx0wlh",
  ethereum: "0x742d35Cc6634C0532925a3b844Bc9e7595f0EbE1",
  ton: "UQCD39VS5jcptHL8vMjEXrzGaRcCVYto7kBWqgC28uBlqY",
  matic: "0x742d35Cc6634C0532925a3b844Bc9e7595f0EbE1",
}

export function getNetworkShortName(network: string): string {
  const dash = network.indexOf(" - ")
  if (dash > 0) return network.slice(0, dash).trim()
  if (network.includes("TRC20")) return "TRC20"
  if (network.includes("ERC20")) return "ERC20"
  if (network.includes("BEP20")) return "BEP20"
  return network.split(" ")[0] ?? network
}

export function getDepositAddress(methodId: string): string {
  return (
    DEPOSIT_ADDRESSES[methodId] ??
    "TXyz9kLmN2pQr4sTuVwXyZ1aBcDeFgHiJkLmNoPqRsTuVwXyZ"
  )
}

export function getDepositMinLabel(method: PaymentMethod): string {
  if (method.min.toLowerCase().includes(method.name.toLowerCase())) {
    return method.min
  }
  return `10 ${method.name} (10$)`
}

export function buildQrCodeUrl(data: string, size = 124): string {
  return `https://api.qrserver.com/v1/create-qr-code/?size=${size}x${size}&data=${encodeURIComponent(data)}`
}
