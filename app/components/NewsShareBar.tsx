"use client"

import { useState } from "react"

type Props = {
  titulo: string
  subtitulo: string
  isComercial?: boolean
}

export default function NewsShareBar({ titulo, subtitulo, isComercial }: Props) {
  const [copied, setCopied] = useState<string | null>(null)

  const accent = isComercial ? "#e55812" : "#95c623"
  const accentText = isComercial ? "text-[#e55812]" : "text-[#95c623]"

  function getUrl() {
    return typeof window !== "undefined" ? window.location.href : ""
  }

  async function handleNativeShare() {
    const url = getUrl()
    if (navigator.share) {
      await navigator.share({ title: titulo, text: subtitulo, url })
    } else {
      copyToClipboard("link")
    }
  }

  async function copyToClipboard(key: string) {
    await navigator.clipboard.writeText(getUrl())
    setCopied(key)
    setTimeout(() => setCopied(null), 2500)
  }

  function openWindow(url: string) {
    window.open(url, "_blank", "noopener,noreferrer,width=600,height=500")
  }

  function shareFacebook() {
    openWindow(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(getUrl())}`)
  }

  function shareLinkedIn() {
    openWindow(
      `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(getUrl())}`
    )
  }

  function shareEmail() {
    window.location.href = `mailto:?subject=${encodeURIComponent(titulo)}&body=${encodeURIComponent(
      subtitulo + "\n\n" + getUrl()
    )}`
  }

  const btns = [
    {
      key: "share",
      label: "Compartilhar",
      title: "Compartilhar (mobile)",
      onClick: handleNativeShare,
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
          <circle cx="18" cy="5" r="3" />
          <circle cx="6" cy="12" r="3" />
          <circle cx="18" cy="19" r="3" />
          <line x1="8.59" y1="13.51" x2="15.42" y2="17.49" />
          <line x1="15.41" y1="6.51" x2="8.59" y2="10.49" />
        </svg>
      ),
      mobileOnly: true,
    },
    {
      key: "facebook",
      label: "Facebook",
      onClick: shareFacebook,
      icon: (
        <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
          <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
        </svg>
      ),
    },
    {
      key: "linkedin",
      label: "LinkedIn",
      onClick: shareLinkedIn,
      icon: (
        <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
          <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
          <rect x="2" y="9" width="4" height="12" />
          <circle cx="4" cy="4" r="2" />
        </svg>
      ),
    },
    {
      key: "email",
      label: "E-mail",
      onClick: shareEmail,
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
          <rect x="2" y="4" width="20" height="16" rx="2" />
          <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
        </svg>
      ),
    },
    {
      key: "instagram",
      label: copied === "instagram" ? "Copiado!" : "Instagram",
      onClick: () => copyToClipboard("instagram"),
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
          <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
          <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
          <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
        </svg>
      ),
    },
    {
      key: "link",
      label: copied === "link" ? "Copiado!" : "Copiar link",
      onClick: () => copyToClipboard("link"),
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
          <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71" />
          <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71" />
        </svg>
      ),
    },
  ]

  return (
    <div className="py-8 border-t border-[#efe7da]/10">
      <p className="text-xs text-[#efe7da]/40 text-center mb-5 tracking-wide uppercase">
        Compartilhe com quem vai adorar
      </p>

      {/* Mobile: native share em destaque + grid dos outros */}
      <div className="flex flex-col gap-3">
        {/* Botão nativo (mobile) — destaque */}
        <button
          onClick={handleNativeShare}
          className="md:hidden w-full flex items-center justify-center gap-2 py-3 rounded-full font-semibold text-sm transition-all"
          style={{ background: accent, color: isComercial ? "#fff" : "#002626" }}
        >
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
            <circle cx="18" cy="5" r="3" />
            <circle cx="6" cy="12" r="3" />
            <circle cx="18" cy="19" r="3" />
            <line x1="8.59" y1="13.51" x2="15.42" y2="17.49" />
            <line x1="15.41" y1="6.51" x2="8.59" y2="10.49" />
          </svg>
          Compartilhar
        </button>

        {/* Grid de redes */}
        <div className="grid grid-cols-3 md:grid-cols-5 gap-2">
          {btns
            .filter((b) => !b.mobileOnly)
            .map((btn) => {
              const isActive = copied === btn.key
              return (
                <button
                  key={btn.key}
                  onClick={btn.onClick}
                  title={btn.title}
                  className={`flex flex-col items-center gap-1.5 py-3 px-2 rounded-xl border transition-all text-xs font-medium ${
                    isActive
                      ? "border-[#95c623]/60 bg-[#95c623]/10 text-[#95c623]"
                      : "border-[#efe7da]/10 bg-[#efe7da]/5 text-[#efe7da]/60 hover:border-[#efe7da]/30 hover:text-[#efe7da]/90"
                  }`}
                >
                  {btn.icon}
                  <span className="leading-none">{btn.label}</span>
                </button>
              )
            })}
        </div>
      </div>

      {/* Nota para Instagram */}
      {copied === "instagram" && (
        <p className="mt-3 text-center text-xs text-[#efe7da]/50">
          Link copiado. Cole no Stories ou na bio do Instagram.
        </p>
      )}
    </div>
  )
}
