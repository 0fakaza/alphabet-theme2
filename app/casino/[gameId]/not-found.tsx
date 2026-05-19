import { ButtonLink } from "@/components/elements/button"

export default function CasinoGameNotFound() {
  return (
    <div className="container flex min-h-[40vh] flex-col items-center justify-center py-16 text-center">
      <h1 className="text-lg font-semibold text-text-title">Oyun bulunamadı</h1>
      <p className="mt-2 text-sm text-text-subtitle">Aradığınız oyun kataloğumuzda yok veya kaldırıldı.</p>
      <ButtonLink href="/casino" variant="primary" className="mt-6 min-w-[200px]">
        Casinoya dön
      </ButtonLink>
    </div>
  )
}
