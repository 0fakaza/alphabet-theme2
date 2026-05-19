interface FormRowProps {
  label: string
  children: React.ReactNode
}

export function FormRow({ label, children }: FormRowProps) {
  return (
    <div className="flex min-h-12 items-center gap-4">
      <span className="w-[104px] shrink-0 text-sm font-medium text-text-main">{label}</span>
      <div className="flex-1">{children}</div>
    </div>
  )
}
