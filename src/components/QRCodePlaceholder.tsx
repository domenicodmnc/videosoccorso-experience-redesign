import { QRCodeSVG } from 'qrcode.react'

export function QRCodePlaceholder({ value = `${window.location.origin}/mobile`, size = 140 }: { value?: string; size?: number }) {
  return <div className="inline-flex rounded-2xl border border-slate-200 bg-white p-3 shadow-sm"><QRCodeSVG value={value} size={size} bgColor="#ffffff" fgColor="#17423f" level="M" /></div>
}
