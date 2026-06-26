"use client";

import { motion } from "framer-motion";
import Nav from "../components/Nav";
import Footer from "../components/Footer";
import Contato from "../components/Contato";
import FloatingActions from "../components/FloatingActions";
import Breadcrumb from "../components/Breadcrumb";
import { Reveal, Kicker, EASE } from "../components/ui";

/* ───── NOVA PALETA ───── */
const C = {
  offwhite: "#F1F2EE",   // fundo global
  slate:    "#435058",   // dark teal-slate (hero bg, headings)
  steel:    "#848C8E",   // grey (eyebrows, borders)
  lime:     "#DCF763",   // accent neon-lime (CTAs, destaques)
  taupe:    "#BFB7B6",   // warm grey (soft text)
  ink:      "#1E2A30",   // texto principal
  limeLight:"rgba(220,247,99,0.12)",
  limeEdge: "rgba(220,247,99,0.28)",
  slateEdge:"rgba(67,80,88,0.18)",
};

/* ───── HELPER WIX ───── */
const wx = (id: string, w = 800, h = 560) =>
  `https://static.wixstatic.com/media/${id}/v1/fill/w_${w},h_${h},al_c,q_82,enc_avif,quality_auto/img.jpg`;

/* ───── IMAGENS ───── */
const IMG = {
  /* TDP */
  tdpHero:         "/torres-del-paine/patagonia.jpg",
  wTradicional:    "/torres-del-paine/prod-w-tradicional.jpg",
  wExpress:        "/torres-del-paine/prod-w-express.jpg",
  wPlus:           "/torres-del-paine/prod-w-plus.jpg",
  wJourney:        "/lastorres/exterior.jpg",
  /* Santiago */
  sgHero:          "https://static.wixstatic.com/media/2d4f5b_80e678e6de65425f90c4b56c6f998776~mv2.jpg/v1/fill/w_800,h_560,q_82,enc_avif,quality_auto/img.jpg",
  sgValenca:       wx("2d4f5b_596f7144ab49417692221a0fa9dab404~mv2.jpg"),
  sgCentral:       wx("2d4f5b_920e9f2265b149e69fcc012023b5026d~mv2.jpg"),
  sgCosta:         wx("2d4f5b_b673e91a63554b5e9fb4a39b74af2728~mv2.jpg"),
  /* Portugal */
  ptHero:          wx("2d4f5b_edfea84f57b54f589aff44727039c42e~mv2.jpg"),
  douroExp:        wx("2d4f5b_7edb87bf58444c00a4e2f0882eaff778~mv2.jpg"),
  douroLux:        wx("2d4f5b_5a366974e9d24c1ab879fcf6eccb3a0c~mv2.jpeg"),
  sgDouro:         wx("2d4f5b_80e678e6de65425f90c4b56c6f998776~mv2.jpg"),
  vicentina:       `https://images.unsplash.com/photo-1505118380757-91f5f5632de0?q=80&w=800&h=560&auto=format&fit=crop`,
  fatima:          `https://images.unsplash.com/photo-1490730141103-6cac27aaab94?q=80&w=800&h=560&auto=format&fit=crop`,
};

/* ───── SVG GPS NAVIGATOR ───── */
function GPSNavigator() {
  return (
    <svg
      viewBox="0 0 420 460"
      xmlns="http://www.w3.org/2000/svg"
      aria-label="Mapa GPS interativo — navegue no seu próprio ritmo"
      style={{ width: "100%", maxWidth: 420, height: "auto" }}
    >
      <title>GPS Autoguiado — escolha seu destino</title>

      {/* ── Fundo: tela de GPS ── */}
      <rect x="30" y="20" width="360" height="420" rx="24" fill="#2e3c44" />
      <rect x="30" y="20" width="360" height="420" rx="24" fill="none" stroke={C.lime} strokeWidth="1.5" strokeOpacity="0.35" />

      {/* ── Header bar do GPS ── */}
      <rect x="30" y="20" width="360" height="52" rx="24" fill="#1E2A30" />
      <rect x="30" y="50" width="360" height="22" fill="#1E2A30" />
      <text x="210" y="51" textAnchor="middle" fontSize="11" fontWeight="600" fill={C.lime} fontFamily="inherit" letterSpacing="0.2em">NAVEGAÇÃO AONIK</text>

      {/* ── Grade do mapa ── */}
      {[100,140,180,220,260,300,340,380].map(y => (
        <line key={y} x1="30" y1={y} x2="390" y2={y} stroke="rgba(255,255,255,0.04)" strokeWidth="1" />
      ))}
      {[90,150,210,270,330].map(x => (
        <line key={x} x1={x} y1="72" x2={x} y2="440" stroke="rgba(255,255,255,0.04)" strokeWidth="1" />
      ))}

      {/* ── Continentes estilizados (patches) ── */}
      {/* Europa */}
      <path d="M 155 145 Q 180 130 220 138 Q 245 142 250 162 Q 248 178 228 184 Q 205 188 180 180 Q 158 172 155 145 Z" fill="rgba(132,140,142,0.22)" />
      {/* América do Sul */}
      <path d="M 95 230 Q 118 215 138 225 Q 150 240 148 280 Q 145 310 125 320 Q 100 315 88 290 Q 78 260 95 230 Z" fill="rgba(132,140,142,0.22)" />
      {/* América do Norte outline suave */}
      <path d="M 68 155 Q 100 140 140 148 Q 148 172 128 192 Q 100 200 72 186 Q 58 170 68 155 Z" fill="rgba(132,140,142,0.14)" />

      {/* ── ROTA GPS ── dashed line conectando os 3 destinos ── */}
      {/* Portugal → Santiago */}
      <path
        d="M 173 175 Q 190 155 207 148"
        fill="none" stroke={C.lime} strokeWidth="2" strokeDasharray="5 3" strokeLinecap="round"
      />
      {/* Santiago → TDP (longa rota transatlântica) */}
      <path
        d="M 215 145 Q 200 200 190 250 Q 178 280 118 290"
        fill="none" stroke={C.lime} strokeWidth="2" strokeDasharray="5 3" strokeLinecap="round"
      />
      {/* Pulsação: current position (Portugal Douro) */}
      <motion.circle
        cx="173" cy="178"
        r="12"
        fill="none"
        stroke={C.lime}
        strokeWidth="1.5"
        initial={{ r: 12, opacity: 0.7 }}
        animate={{ r: 22, opacity: 0 }}
        transition={{ duration: 2, repeat: Infinity, ease: "easeOut" }}
      />

      {/* ── PIN 1: Portugal ── */}
      <circle cx="173" cy="178" r="7" fill={C.lime} />
      <path d="M173,171 L173,164 L178,168 Z" fill={C.lime} />
      {/* pin shadow */}
      <ellipse cx="173" cy="180" rx="5" ry="2" fill="rgba(220,247,99,0.25)" />
      <rect x="118" y="186" width="82" height="26" rx="6" fill="#1E2A30" fillOpacity="0.92" />
      <text x="159" y="198" textAnchor="middle" fontSize="8" fontWeight="700" fill={C.lime} fontFamily="inherit" letterSpacing="0.06em">PORTUGAL</text>
      <text x="159" y="208" textAnchor="middle" fontSize="6.5" fill={C.taupe} fontFamily="inherit">Douro · Vicentina · Fátima</text>

      {/* ── PIN 2: Santiago ── */}
      <circle cx="210" cy="148" r="7" fill="#6B9FCC" />
      <path d="M210,141 L210,134 L215,138 Z" fill="#6B9FCC" />
      <ellipse cx="210" cy="150" rx="5" ry="2" fill="rgba(107,159,204,0.25)" />
      <rect x="154" y="112" width="84" height="26" rx="6" fill="#1E2A30" fillOpacity="0.92" />
      <text x="196" y="124" textAnchor="middle" fontSize="8" fontWeight="700" fill="#6B9FCC" fontFamily="inherit" letterSpacing="0.06em">SANTIAGO</text>
      <text x="196" y="134" textAnchor="middle" fontSize="6.5" fill={C.taupe} fontFamily="inherit">Portugal · Espanha · Galiza</text>

      {/* ── PIN 3: Torres del Paine ── */}
      <circle cx="115" cy="290" r="7" fill="#7FD4E0" />
      <path d="M115,283 L115,276 L120,280 Z" fill="#7FD4E0" />
      <ellipse cx="115" cy="292" rx="5" ry="2" fill="rgba(127,212,224,0.25)" />
      <rect x="120" y="278" width="100" height="26" rx="6" fill="#1E2A30" fillOpacity="0.92" />
      <text x="170" y="290" textAnchor="middle" fontSize="8" fontWeight="700" fill="#7FD4E0" fontFamily="inherit" letterSpacing="0.06em">PATAGÔNIA</text>
      <text x="170" y="300" textAnchor="middle" fontSize="6.5" fill={C.taupe} fontFamily="inherit">Torres del Paine · Chile</text>

      {/* ── VOCÊ AQUI: ponto de partida ── */}
      <circle cx="210" cy="370" r="9" fill={C.slate} stroke={C.lime} strokeWidth="2" />
      <circle cx="210" cy="370" r="4" fill={C.lime} />
      <motion.circle cx="210" cy="370" r="9" fill="none" stroke={C.lime} strokeWidth="1"
        initial={{ r: 9, opacity: 1 }} animate={{ r: 20, opacity: 0 }}
        transition={{ duration: 1.8, repeat: Infinity, ease: "easeOut", delay: 0.5 }}
      />
      <rect x="163" y="383" width="94" height="22" rx="6" fill={C.lime} />
      <text x="210" y="397" textAnchor="middle" fontSize="8.5" fontWeight="700" fill={C.slate} fontFamily="inherit" letterSpacing="0.1em">VOCÊ AQUI</text>

      {/* ── Rota do VOCÊ para Portugal ── */}
      <path d="M 210 362 Q 200 290 180 210" fill="none" stroke="rgba(220,247,99,0.45)" strokeWidth="1.5" strokeDasharray="4 3" />

      {/* ── Status bar ── */}
      <rect x="30" y="420" width="360" height="20" rx="0" fill="#1E2A30" />
      <rect x="30" y="420" width="360" height="20" rx="24" fill="#1E2A30" />
      <text x="80" y="432" fontSize="7" fill={C.taupe} fontFamily="inherit">3 destinos disponíveis</text>
      <text x="340" y="432" textAnchor="end" fontSize="7" fill={C.lime} fontFamily="inherit">● conectado</text>
    </svg>
  );
}

/* ───── DIFERENCIAIS ───── */
const DIFERENCIAIS = [
  {
    n: "01",
    titulo: "Logística resolvida",
    desc: "Transfers, hospedagens, mapas digitais e caderneta de rota impressa. Tudo entregue antes da partida.",
  },
  {
    n: "02",
    titulo: "Você no comando",
    desc: "Sem grupo fixo, sem guia, sem horário de saída. Você decide o ritmo, as pausas e o quanto caminha por dia.",
  },
  {
    n: "03",
    titulo: "Disponível o ano todo",
    desc: "Partidas flexíveis, sem datas fixas de grupo. Você viaja quando quiser, com quem quiser.",
  },
  {
    n: "04",
    titulo: "Suporte em rota",
    desc: "WhatsApp AONIK ativo durante toda a viagem. Para qualquer imprevisto, a gente está do outro lado.",
  },
];

/* ───── PRODUTOS POR CATEGORIA ───── */
const CAT_PATAGONIA = [
  { nome: "W Tradicional",  sub: "Autoguiado",       meta: "5d · 75,5km", preco: "US$ 1.874", img: IMG.wTradicional, href: "/destinos/torres-del-paine/w-tradicional" },
  { nome: "W Express",      sub: "Autoguiado",       meta: "4d · 69,5km", preco: "US$ 1.657", img: IMG.wExpress,     href: "/destinos/torres-del-paine/w-express" },
  { nome: "W Plus",         sub: "Autoguiado · Hotel",meta:"5d · 69,5km", preco: "US$ 2.126", img: IMG.wPlus,        href: "/destinos/torres-del-paine/w-plus" },
  { nome: "W Journey",      sub: "Com guia host",    meta: "5d · 69,5km", preco: "US$ 3.200", img: IMG.wJourney,     href: "/destinos/torres-del-paine/w-journey" },
];

const CAT_SANTIAGO = [
  { nome: "Caminho Português · Valença", sub: "Autoguiado", meta: "8d · 121km",   preco: "€ 810",   img: IMG.sgValenca, href: "/destinos/caminho-valenca-ape" },
  { nome: "Caminho Central",             sub: "Autoguiado", meta: "14d · 226km",  preco: "€ 1.466", img: IMG.sgCentral, href: "/destinos/caminho-central-ape" },
  { nome: "Caminho da Costa",            sub: "Autoguiado", meta: "15d · 260km",  preco: "€ 1.498", img: IMG.sgCosta,   href: "/destinos/caminho-costa-ape" },
  { nome: "Sarria · 7 Etapas",          sub: "Autoguiado", meta: "7d · 112km",   preco: "€ 580",   img: IMG.sgHero,    href: "/destinos/sarria-7-etapas" },
  { nome: "Caminho Easy",               sub: "Autoguiado", meta: "21d · 256km",  preco: "€ 2.359", img: IMG.sgValenca, href: "/destinos/caminho-easy-ape" },
  { nome: "Santiago a Finisterre",       sub: "Autoguiado", meta: "7d · 90km",    preco: "€ 791",   img: IMG.sgCosta,   href: "/destinos/santiago-finisterre" },
];

const CAT_PORTUGAL = [
  { nome: "Douro Experience",   sub: "Autoguiado",           meta: "6d · 58,7km", preco: "€ 1.557", img: IMG.douroExp,  href: "/caminhos-autoguiados/douro" },
  { nome: "Douro Luxury",       sub: "Premium · quintas",    meta: "6d · 27,2km", preco: "€ 2.130", img: IMG.douroLux,  href: "/caminhos-autoguiados/douro-luxury" },
  { nome: "Santiago e Douro",   sub: "Peregrinação + vinhas",meta:"13d · 133km",  preco: "€ 2.200", img: IMG.sgDouro,   href: "/caminhos-autoguiados/santiago-e-douro" },
  { nome: "Rota Vicentina",     sub: "Costa Atlântica",      meta: "8d · 91km",   preco: "€ 856",   img: IMG.vicentina, href: "/caminhos-autoguiados/rota-vicentina" },
  { nome: "Nazaré a Fátima",    sub: "Peregrinação",         meta: "6d · 56km",   preco: "€ 870",   img: IMG.fatima,    href: "/caminhos-autoguiados/nazare-a-fatima" },
];

/* ───── COMPONENTE CARD ───── */
function ProdCard({
  p, accentBg, accentText, darkBg,
}: {
  p: { nome: string; sub: string; meta: string; preco: string; img: string; href: string };
  accentBg: string; accentText: string; darkBg: string;
}) {
  return (
    <a
      href={p.href}
      className="group flex flex-col overflow-hidden rounded-2xl transition-all duration-300 hover:-translate-y-1"
      style={{ background: darkBg, border: "1px solid rgba(255,255,255,0.08)" }}
    >
      <div className="relative h-48 overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-[1.05]"
          style={{ backgroundImage: `url('${p.img}')` }}
        />
        <div className="absolute inset-0" style={{ background: `linear-gradient(to top, ${darkBg}f0 0%, transparent 55%)` }} />
        <span
          className="absolute left-4 top-4 rounded-full px-3 py-1 text-[9px] font-semibold uppercase tracking-[0.18em]"
          style={{ background: "rgba(0,0,0,0.55)", color: accentText }}
        >
          {p.sub}
        </span>
      </div>
      <div className="flex flex-1 flex-col p-6">
        <h4 className="font-display text-[1.2rem] font-light leading-tight text-white">{p.nome}</h4>
        <p className="mt-1 text-[10px] font-semibold uppercase tracking-[0.14em]" style={{ color: accentText }}>{p.meta}</p>
        <div className="mt-auto flex items-center justify-between border-t pt-4" style={{ borderColor: "rgba(255,255,255,0.1)", marginTop: "1rem" }}>
          <span className="text-[12px] font-light text-white/70">a partir de <strong className="font-display text-[1rem] font-light" style={{ color: accentText }}>{p.preco}</strong></span>
          <span className="text-[10px] font-semibold uppercase tracking-[0.12em] transition-transform duration-300 group-hover:translate-x-1" style={{ color: accentText }}>Ver →</span>
        </div>
      </div>
    </a>
  );
}

/* ───── SEÇÃO CATEGORIA ───── */
function CatSection({
  n, kicker, titulo, sub, desc, accent, darkBg, ctaHref, ctaLabel, children,
}: {
  n: string; kicker: string; titulo: string; sub?: string; desc: string;
  accent: string; darkBg: string; ctaHref: string; ctaLabel: string; children: React.ReactNode;
}) {
  return (
    <section className="px-6 py-20 md:px-10 md:py-28" style={{ background: darkBg }}>
      <div className="mx-auto max-w-[1180px]">
        <Reveal>
          <p className="text-[10px] font-semibold uppercase tracking-[0.35em]" style={{ color: accent, opacity: 0.7 }}>{kicker}</p>
        </Reveal>
        <Reveal delay={0.05}>
          <div className="mt-2 flex items-end gap-4">
            <span className="font-display text-[4rem] font-light leading-none opacity-15 text-white">{n}</span>
            <div>
              <h2 className="font-display text-[clamp(1.9rem,4vw,3rem)] font-light leading-none tracking-[-0.02em] text-white">{titulo}</h2>
              {sub && <p className="mt-1 text-[11px] font-semibold uppercase tracking-[0.14em]" style={{ color: accent }}>{sub}</p>}
            </div>
          </div>
        </Reveal>
        <Reveal delay={0.08}>
          <p className="mt-4 max-w-lg text-[14px] font-light leading-relaxed text-white/60">{desc}</p>
        </Reveal>

        <div className="mt-12">{children}</div>

        <Reveal delay={0.2}>
          <a
            href={ctaHref}
            className="mt-10 inline-flex items-center gap-3 rounded-full border px-8 py-4 text-[11px] font-semibold uppercase tracking-[0.16em] transition-all duration-300 hover:opacity-90"
            style={{ color: "white", borderColor: `${accent}55`, background: `${accent}18` }}
          >
            {ctaLabel} <span>→</span>
          </a>
        </Reveal>
      </div>
    </section>
  );
}

/* ───── PAGE ───── */
export default function AutoguiadosPage() {
  return (
    <main style={{ background: C.offwhite }}>
      <Nav />

      {/* ===== HERO ===== */}
      <section
        className="relative flex min-h-[92svh] w-full items-center overflow-hidden"
        style={{ background: C.slate }}
      >
        {/* Grain */}
        <div className="pointer-events-none absolute inset-0 opacity-[0.035]"
          style={{ backgroundImage: "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 512 512' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.75' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")", backgroundSize: "200px" }} />

        <div className="relative z-10 mx-auto grid w-full max-w-[1180px] grid-cols-1 gap-10 px-6 py-28 md:grid-cols-[1.1fr_0.9fr] md:items-center md:gap-16 md:px-10">
          {/* Texto */}
          <motion.div initial={{ opacity: 0, y: 28 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1, ease: EASE, delay: 0.15 }}>
            <Kicker color={`text-[${C.lime}]`} line={`bg-[${C.lime}]/40`}>
              <span style={{ color: C.lime }}>Formato Self-Guided · AONIK</span>
            </Kicker>
            <h1
              className="mt-4 font-display font-light uppercase leading-[0.88] tracking-[-0.03em] text-white"
              style={{ fontSize: "clamp(3.6rem,11vw,8rem)" }}
            >
              AUTO
              <br />
              <span style={{ color: C.lime }}>GUIADOS</span>
            </h1>
            <p className="mt-6 max-w-sm text-[15px] font-light leading-relaxed text-white/65">
              Você escolhe o destino, a data e o ritmo. A AONIK resolve toda a logística
              para que sobre apenas o essencial: caminhar.
            </p>

            {/* Stats */}
            <div className="mt-10 flex gap-8 border-t pt-8" style={{ borderColor: "rgba(220,247,99,0.2)" }}>
              {[
                { v: "3", l: "destinos" },
                { v: "15+", l: "roteiros" },
                { v: "6–21", l: "dias" },
              ].map((s) => (
                <div key={s.l}>
                  <div className="font-display text-[2.2rem] font-light leading-none" style={{ color: C.lime }}>{s.v}</div>
                  <div className="mt-1 text-[9px] font-semibold uppercase tracking-[0.18em] text-white/45">{s.l}</div>
                </div>
              ))}
            </div>

            <div className="mt-8 flex flex-wrap gap-4">
              <a
                href="#destinos"
                className="inline-flex items-center gap-3 rounded-full px-8 py-4 text-[12px] font-semibold uppercase tracking-[0.16em] transition-all duration-300 hover:scale-[1.03]"
                style={{ background: C.lime, color: C.slate }}
              >
                Explorar destinos <span>→</span>
              </a>
            </div>

            <div className="mt-8">
              <Breadcrumb tone="dark" accent={C.lime} items={[{ label: "Home", href: "/" }, { label: "Caminhadas", href: "/caminhadas" }, { label: "Autoguiados" }]} />
            </div>
          </motion.div>

          {/* GPS SVG */}
          <motion.div
            className="flex items-center justify-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, ease: EASE, delay: 0.4 }}
          >
            <GPSNavigator />
          </motion.div>
        </div>
      </section>

      {/* ===== FRASE ===== */}
      <section className="px-6 py-24 md:px-10 md:py-32" style={{ background: C.offwhite }}>
        <div className="mx-auto max-w-[860px] text-center">
          <Reveal>
            <p className="text-[10px] font-semibold uppercase tracking-[0.38em]" style={{ color: C.steel }}>
              O modelo autoguiado
            </p>
          </Reveal>
          <Reveal delay={0.08}>
            <h2
              className="mt-5 font-display text-[clamp(1.8rem,3.5vw,3rem)] font-light leading-[1.2] tracking-[-0.015em]"
              style={{ color: C.ink }}
            >
              Toda a estrutura de uma viagem organizada,{" "}
              <em className="not-italic" style={{ color: C.slate }}>sem abrir mão da liberdade.</em>
            </h2>
          </Reveal>
          <Reveal delay={0.12}>
            <p className="mx-auto mt-6 max-w-xl text-[15px] font-light leading-relaxed" style={{ color: C.steel }}>
              Você chega, o alojamento está reservado, o mapa está no celular e a caderneta de rota
              está na mochila. O resto é só você, a paisagem e o próximo passo.
            </p>
          </Reveal>
        </div>
      </section>

      {/* ===== DIFERENCIAIS ===== */}
      <section className="px-6 pb-20 md:px-10 md:pb-28" style={{ background: C.offwhite }}>
        <div className="mx-auto max-w-[1180px]">
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {DIFERENCIAIS.map((d, i) => (
              <Reveal key={d.n} delay={i * 0.07}>
                <div
                  className="rounded-2xl p-8"
                  style={{ background: C.slate, border: `1px solid ${C.slateEdge}` }}
                >
                  <span className="font-display text-[2.8rem] font-light leading-none" style={{ color: C.lime, opacity: 0.35 }}>{d.n}</span>
                  <h3 className="mt-4 font-display text-[1.2rem] font-light leading-tight text-white">{d.titulo}</h3>
                  <p className="mt-3 text-[13px] font-light leading-relaxed" style={{ color: C.taupe }}>{d.desc}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ===== DESTINOS (CATEGORIAS) ===== */}
      <div id="destinos">

        {/* ── 01 PATAGÔNIA ── */}
        <CatSection
          n="01" kicker="Chile · Patagônia" titulo="Torres del Paine" sub="Circuito W"
          desc="Geleiras, torres de granito e fiordes no fim do mundo. O circuito W em quatro versões, do mais compacto ao mais confortável."
          accent="#7FD4E0" darkBg="#0E2A34"
          ctaHref="/destinos/torres-del-paine" ctaLabel="Conhecer Torres del Paine"
        >
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {CAT_PATAGONIA.map((p, i) => (
              <Reveal key={p.nome} delay={i * 0.07}>
                <ProdCard p={p} accentBg="#7FD4E0" accentText="#7FD4E0" darkBg="rgba(14,42,52,0.7)" />
              </Reveal>
            ))}
          </div>
        </CatSection>

        {/* ── 02 PEREGRINAÇÃO ── */}
        <CatSection
          n="02" kicker="Portugal · Espanha · Galiza" titulo="Caminho de Santiago" sub="Caminho Português"
          desc="A peregrinação mais famosa do mundo, no seu ritmo. Escolha a rota e o número de dias e caminhe até a Catedral de Santiago."
          accent="#6B9FCC" darkBg="#0A1935"
          ctaHref="/jornada" ctaLabel="Ver todos os roteiros de Santiago"
        >
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {CAT_SANTIAGO.map((p, i) => (
              <Reveal key={p.nome} delay={i * 0.06}>
                <ProdCard p={p} accentBg="#6B9FCC" accentText="#6B9FCC" darkBg="rgba(10,25,53,0.7)" />
              </Reveal>
            ))}
          </div>
        </CatSection>

        {/* ── 03 PORTUGAL ── */}
        <CatSection
          n="03" kicker="Portugal · Autoguiado" titulo="Caminhos de Portugal" sub="Norte ao sul"
          desc="Das vinhas em socalcos do Douro às falésias do Alentejo. Cinco roteiros pelo país mais caminhável da Europa."
          accent="#C4A56A" darkBg="#220A11"
          ctaHref="/caminhos-autoguiados" ctaLabel="Ver hub Caminhos de Portugal"
        >
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {CAT_PORTUGAL.map((p, i) => (
              <Reveal key={p.nome} delay={i * 0.07}>
                <ProdCard p={p} accentBg="#C4A56A" accentText="#C4A56A" darkBg="rgba(34,10,17,0.7)" />
              </Reveal>
            ))}
          </div>
        </CatSection>

      </div>

      {/* ===== PREFERE GRUPOS? ===== */}
      <section className="px-6 py-20 md:px-10 md:py-28" style={{ background: C.slate }}>
        <div className="mx-auto max-w-[1180px]">
          <div className="flex flex-col gap-8 md:flex-row md:items-center md:justify-between">
            <Reveal>
              <div className="max-w-xl">
                <p className="text-[10px] font-semibold uppercase tracking-[0.32em]" style={{ color: C.lime }}>
                  Prefere companhia?
                </p>
                <h2 className="mt-3 font-display text-[clamp(1.8rem,4vw,3rem)] font-light leading-[1.1] text-white">
                  Prefere caminhar em grupo?
                </h2>
                <p className="mt-4 max-w-md text-[14px] font-light leading-relaxed" style={{ color: C.taupe }}>
                  Se você quer a experiência completa com guia, saída confirmada, grupo pequeno e toda
                  a logística na mão de um especialista, os grupos AONIK são para você. TMB, Dolomitas,
                  Bavária, Tirol, Dana a Petra e mais.
                </p>
              </div>
            </Reveal>
            <Reveal delay={0.1}>
              <a
                href="/grupos"
                className="inline-flex items-center gap-3 rounded-full px-10 py-5 text-[12px] font-semibold uppercase tracking-[0.18em] transition-all duration-300 hover:scale-[1.03]"
                style={{ background: C.lime, color: C.slate }}
              >
                Ver grupos com guia <span>→</span>
              </a>
            </Reveal>
          </div>
        </div>
      </section>

      <Contato />
      <Footer />
      <FloatingActions />
    </main>
  );
}
