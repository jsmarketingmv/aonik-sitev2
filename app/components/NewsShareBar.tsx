"use client"

import { useState } from "react"

type Props = {
  titulo: string
  subtitulo: string
  isComercial?: boolean
}

const ICONS = {
  facebook: (
    <svg viewBox="0 0 24 24" fill="currentColor" className="h-4 w-4">
      <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
    </svg>
  ),
  linkedin: (
    <svg viewBox="0 0 24 24" fill="currentColor" className="h-4 w-4">
      <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
      <rect x="2" y="9" width="4" height="12" />
      <circle cx="4" cy="4" r="2" />
    </svg>
  ),
  email: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4">
      <rect x="2" y="4" width="20" height="16" rx="2" />
      <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
    </svg>
  ),
  instagram: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4">
      <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
      <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
    </svg>
  ),
  link: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4">
      <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71" />
      <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71" />
    </svg>
  ),
  share: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4">
      <circle cx="18" cy="5" r="3" />
      <circle cx="6" cy="12" r="3" />
      <circle cx="18" cy="19" r="3" />
      <line x1="8.59" y1="13.51" x2="15.42" y2="17.49" />
      <line x1="15.41" y1="6.51" x2="8.59" y2="10.49" />
    </svg>
  ),
}

export default function NewsShareBar({ titulo, subtitulo, isComercial }: Props) {
  const [copied, setCopied] = useState<string | null>(null)

  function getUrl() {
    return typeof window !== "undefined" ? window.location.href : ""
  }

  async function copyToClipboard(key: string) {
    await navigator.clipboard.writeText(getUrl())
    setCopied(key)
    setTimeout(() => setCopied(null), 2500)
  }

  async function handleNativeShare() {
    const url = getUrl()
    if (navigator.share) {
      await navigator.share({ title: titulo, text: subtitulo, url })
    } else {
      copyToClipboard("link")
    }
  }

  function openWindow(url: string) {
    window.open(url, "_blank", "noopener,noreferrer,width=600,height=500")
  }

  // Cores conforme template
  const accentClass = isComercial ? "text-gold hover:text-gold-soft" : "text-neon hover:text-cream"
  const lineClass = isComercial ? "bg-cream/10" : "bg-ink/10"
  const labelClass = isComercial ? "text-cream/35" : "text-ink/35"
  const itemClass = isComercial
    ? "text-cream/45 hover:text-cream"
    : "text-ink/45 hover:text-ink"

  const btns = [
    {
      key: "facebook",
      label: "Facebook",
      icon: ICONS.facebook,
      onClick: () => openWindow(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(getUrl())}`),
    },
    {
      key: "linkedin",
      label: "LinkedIn",
      icon: ICONS.linkedin,
      onClick: () => openWindow(`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(getUrl())}`),
    },
    {
      key: "email",
      label: "E-mail",
      icon: ICONS.email,
      onClick: () => { window.location.href = `mailto:?subject=${encodeURIComponent(titulo)}&body=${encodeURIComponent(subtitulo + "\n\n" + getUrl())}` },
    },
    {
      key: "instagram",
      label: copied === "instagram" ? "Copiado!" : "Instagram",
      icon: ICONS.instagram,
      onClick: () => copyToClipboard("instagram"),
    },
    {
      key: "link",
      label: copied === "link" ? "Copiado!" : "Copiar link",
      icon: ICONS.link,
      onClick: () => copyToClipboard("link"),
    },
  ]

  return (
    <div className={`px-6 py-14 md:px-10 ${isComercial ? "bg-forest" : "bg-cream"}`}>
      <div className="mx-auto max-w-[780px]">
        <div className={`mb-8 h-px w-full ${lineClass}`} />

        <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
          {/* Label */}
          <p className={`text-[11px] font-medium uppercase tracking-[0.28em] ${labelClass}`}>
            Compartilhe com quem vai adorar
          </p>

          {/* Botão nativo mobile */}
          <button
            onClick={handleNativeShare}
            className={`md:hidden inline-flex items-center gap-2 text-[12px] font-semibold uppercase tracking-[0.16em] transition-colors duration-300 ${accentClass}`}
          >
            {ICONS.share}
            Compartilhar
          </button>

          {/* Links de redes */}
          <div className="flex flex-wrap items-center gap-6 md:gap-8">
            {btns.map((btn) => (
              <button
                key={btn.key}
                onClick={btn.onClick}
                className={`inline-flex items-center gap-2 text-[12px] font-medium uppercase tracking-[0.16em] transition-colors duration-300 ${
                  copied === btn.key ? accentClass : itemClass
                }`}
              >
                {btn.icon}
                {btn.label}
              </button>
            ))}
          </div>
        </div>

        {copied === "instagram" && (
          <p className={`mt-4 text-[11px] ${labelClass}`}>
            Cole no Stories ou na bio do Instagram.
          </p>
        )}

        <div className={`mt-8 h-px w-full ${lineClass}`} />
      </div>
    </div>
  )
}
