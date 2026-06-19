"use client";

import { motion } from "framer-motion";
import Nav from "../../components/Nav";
import Footer from "../../components/Footer";
import Contato from "../../components/Contato";
import FloatingActions from "../../components/FloatingActions";
import { Reveal, EASE } from "../../components/ui";
import { GRUPOS } from "../../lib/grupos";

const DANA_PETRA_GRUPO = GRUPOS.find((g) => g.id === "dana-petra")!;

/* ============================================================
   DANA ATÉ PETRA — Paleta desertica
   Transição do verde montanhoso ao vermelho de Petra
   ============================================================ */
const D = {
  sand: "#c8a96e",     // areia do deserto
  petra: "#c1440e",    // vermelho-terracota
  night: "#0e0a06",    // noite no deserto
  stone: "#1c1309",    // pedra escura
  dust: "#7a5c3a",     // pó de caminho
  sky: "#e8d5b0",      // céu ao amanhecer
  cream: "#f2ece0",    // areia clara
  petra2: "#8b2a0a",   // vermelho mais escuro
};

// ─────── MAPA DA ROTA (Dana → Petra, vertical) ─────────
function RotaMap() {
  return (
    <svg viewBox="0 0 300 500" className="h-full w-full">
      {/* fundo degradado deserto */}
      <defs>
        <linearGradient id="desertGradient" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor={D.sky} stopOpacity="0.3" />
          <stop offset="100%" stopColor={D.sand} stopOpacity="0.15" />
        </linearGradient>
      </defs>
      <rect width="300" height="500" fill="url(#desertGradient)" />

      {/* mapa simplificado da Jordânia (esquerda) */}
      <g transform="translate(30, 50)">
        <path
          d="M 0 0 L 80 0 L 85 30 L 70 70 L 40 75 L 0 50 Z"
          fill="none"
          stroke={D.dust}
          strokeWidth="1.5"
          opacity="0.4"
        />
        <text
          x="35"
          y="45"
          textAnchor="middle"
          fill={D.dust}
          fontSize="10"
          letterSpacing="1"
          opacity="0.6"
        >
          Jordânia
        </text>
      </g>

      {/* rota pontilhada Dana → Petra (centro) */}
      <motion.path
        d="M 150 100 Q 160 200 150 350"
        fill="none"
        stroke={D.petra}
        strokeWidth="2.5"
        strokeDasharray="5 4"
        initial={{ pathLength: 0, opacity: 0 }}
        animate={{ pathLength: 1, opacity: 1 }}
        transition={{ duration: 1.8, ease: EASE, delay: 0.3 }}
      />

      {/* Dana (norte) — ponto verde */}
      <g transform="translate(150, 100)">
        <circle cx="0" cy="0" r="6" fill={D.dust} />
        <circle cx="0" cy="0" r="3" fill={D.cream} />
        <text
          x="0"
          y="-18"
          textAnchor="middle"
          fill={D.dust}
          fontSize="12"
          fontWeight="500"
          letterSpacing="1"
        >
          Dana
        </text>
        <text
          x="0"
          y="24"
          textAnchor="middle"
          fill={D.dust}
          fontSize="9"
          opacity="0.6"
          letterSpacing="0.5"
        >
          Reserva Biosfera
        </text>
      </g>

      {/* cânion icon (meio) */}
      <g transform="translate(150, 220)">
        <path
          d="M 0 -12 L -8 -4 L -6 4 L 0 8 L 6 4 L 8 -4 Z"
          fill="none"
          stroke={D.sand}
          strokeWidth="1.5"
          opacity="0.5"
        />
      </g>

      {/* Petra (sul) — tesouros de coluna */}
      <g transform="translate(150, 350)">
        <circle cx="0" cy="0" r="8" fill={D.petra} />
        <circle cx="0" cy="0" r="4" fill={D.cream} />
        {/* colunas estilizadas */}
        <line x1="-3" y1="-8" x2="-3" y2="8" stroke={D.petra} strokeWidth="1" />
        <line x1="0" y1="-8" x2="0" y2="8" stroke={D.petra} strokeWidth="1" />
        <line x1="3" y1="-8" x2="3" y2="8" stroke={D.petra} strokeWidth="1" />
        <text
          x="0"
          y="-20"
          textAnchor="middle"
          fill={D.petra}
          fontSize="12"
          fontWeight="500"
          letterSpacing="1"
        >
          Petra
        </text>
        <text
          x="0"
          y="28"
          textAnchor="middle"
          fill={D.petra}
          fontSize="9"
          opacity="0.6"
          letterSpacing="0.5"
        >
          A Cidade Rosa
        </text>
      </g>

      {/* distância central */}
      <text
        x="150"
        y="240"
        textAnchor="middle"
        fill={D.sand}
        fontSize="11"
        letterSpacing="2"
        opacity="0.5"
        fontStyle="italic"
      >
        77 km
      </text>
    </svg>
  );
}

// ─────── PERFIL DE ELEVAÇÃO (Dana → Wadi Araba → Petra) ─────────
const PROFILE: [number, number][] = [
  [0, 80],
  [100, 200],
  [180, 60],
  [260, 140],
  [340, 50],
  [420, 180],
  [500, 90],
  [580, 130],
  [660, 40],
  [740, 160],
  [820, 55],
  [900, 120],
];

const PICOS = [
  { x: 100, y: 200, t: "Dana · 1.500m" },
  { x: 420, y: 180, t: "Cânion Al Furon · 1.200m" },
  { x: 740, y: 160, t: "Planalto Petra · 800m" },
];

function ElevationProfile() {
  const line = PROFILE.map((p, i) => (i ? "L" : "M") + p[0] + "," + p[1]).join(" ");
  const area = line + " L900,240 L0,240 Z";
  return (
    <svg viewBox="0 0 900 240" className="w-full" preserveAspectRatio="none" style={{ height: 220 }}>
      <defs>
        <linearGradient id="elevDesert" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={D.petra} stopOpacity="0.3" />
          <stop offset="100%" stopColor={D.petra} stopOpacity="0" />
        </linearGradient>
      </defs>
      <motion.path
        d={area}
        fill="url(#elevDesert)"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1.2 }}
      />
      <motion.path
        d={line}
        fill="none"
        stroke={D.cream}
        strokeWidth="2"
        strokeLinejoin="round"
        initial={{ pathLength: 0 }}
        whileInView={{ pathLength: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1.8, ease: EASE }}
      />
      {PICOS.map((p) => (
        <g key={p.t}>
          <circle cx={p.x} cy={p.y} r="3.5" fill={D.petra2} />
        </g>
      ))}
    </svg>
  );
}

// ─────── ZONAS ECOLÓGICAS ─────────
const ZONAS = [
  {
    flag: "🌄",
    nome: "Planaltos de Dana",
    cor: D.dust,
    bg: "#1a1410",
    titulo: "A porta da expedição",
    texto: "A Reserva da Biosfera de Dana é onde o verde muda de cor. Planaltos rochosos, flores desérticas e ar cristalino marcam a partida. 1.500 m de altitude, o mundo ainda tem verde.",
    nota: "Flor-de-areia · Gazelas · ar fresco",
    img: "https://images.unsplash.com/photo-1469474968028-56623f02e42e?q=80&w=1400&auto=format&fit=crop",
  },
  {
    flag: "🏜️",
    nome: "Wadi Araba",
    cor: D.sand,
    bg: "#15120b",
    titulo: "O deserto muda tudo",
    texto: "Descida dramática para o Wadi Araba, o deserto mais baixo do planeta. Paredes de arenito em todas as cores, de rosa a ocre profundo. Cada passo é uma travessia de zona climática. Noites no deserto, silêncio absoluto.",
    nota: "Arenito · Cânions labirínticos · noites estreladas",
    img: "https://images.unsplash.com/photo-1518780664697-55e3ad937233?q=80&w=1400&auto=format&fit=crop",
  },
  {
    flag: "🏛️",
    nome: "Petra",
    cor: D.petra,
    bg: "#1a0f07",
    titulo: "A obra-prima nabateia",
    texto: "Chegada à Petra. A cidade rosa emerge da rocha. Fachadas cinzeladas em arenito vermelho, câmaras subterrâneas, inscrições de mercadores antigos. Nomeada uma das 15 melhores trilhas do mundo pela National Geographic.",
    nota: "Al-Khazneh · Teatro antigo · Siq (desfiladeiro)",
    img: "https://images.unsplash.com/photo-1469474968028-56623f02e42e?q=80&w=1400&auto=format&fit=crop",
  },
];

function ZonaPanel({ z, i }: { z: (typeof ZONAS)[number]; i: number }) {
  const reverse = i % 2 === 1;
  return (
    <section className="px-6 py-20 md:px-10 md:py-28" style={{ background: z.bg, color: D.cream }}>
      <div
        className={`mx-auto grid max-w-[1280px] items-center gap-10 md:grid-cols-2 md:gap-16 ${
          reverse ? "md:[&>*:first-child]:order-2" : ""
        }`}
      >
        <Reveal>
          <div className="relative h-[320px] overflow-hidden rounded-xl md:h-[460px]">
            <div
              className="absolute inset-0 scale-105 bg-cover bg-center"
              style={{ backgroundImage: `url('${z.img}')` }}
            />
            <div
              className="absolute inset-0"
              style={{ background: `linear-gradient(to top, ${z.bg}cc, transparent 60%)` }}
            />
            <span className="absolute left-5 top-5 text-3xl">{z.flag}</span>
          </div>
        </Reveal>
        <Reveal delay={0.1}>
          <div>
            <p
              className="flex items-center gap-3 text-[12px] font-semibold uppercase tracking-[0.3em]"
              style={{ color: z.cor }}
            >
              <span className="h-px w-10" style={{ background: z.cor }} />
              {z.nome}
            </p>
            <h3 className="mt-5 font-display text-[clamp(1.8rem,3.6vw,3rem)] font-light leading-[1.08] tracking-[-0.01em]">
              {z.titulo}
            </h3>
            <p className="mt-5 max-w-md text-[15px] font-light leading-relaxed text-white/70">{z.texto}</p>
            <p className="mt-6 text-[12px] uppercase tracking-[0.16em]" style={{ color: z.cor }}>
              {z.nota}
            </p>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

// ─────── GALERIA ─────────
const GALLERY_IMGS = [
  {
    src: "https://images.unsplash.com/photo-1469474968028-56623f02e42e?q=80&w=1400&auto=format&fit=crop",
    caption: "Reserva de Dana ao amanhecer",
    tag: "Partida",
  },
  {
    src: "https://images.unsplash.com/photo-1454496522488-7a8e488e8606?q=80&w=1400&auto=format&fit=crop",
    caption: "Cânion Al Furon, profundidade e cores",
    tag: "Cânion",
  },
  {
    src: "https://images.unsplash.com/photo-1518780664697-55e3ad937233?q=80&w=1400&auto=format&fit=crop",
    caption: "Trilha pelo deserto de Wadi Araba",
    tag: "Trilha",
  },
  {
    src: "https://images.unsplash.com/photo-1469474968028-56623f02e42e?q=80&w=1400&auto=format&fit=crop",
    caption: "Acampamento sob as estrelas",
    tag: "Noite",
  },
  {
    src: "https://images.unsplash.com/photo-1454496522488-7a8e488e8606?q=80&w=1400&auto=format&fit=crop",
    caption: "Al-Khazneh, o Tesouro de Petra",
    tag: "Chegada",
  },
  {
    src: "https://images.unsplash.com/photo-1518780664697-55e3ad937233?q=80&w=1400&auto=format&fit=crop",
    caption: "Siq, o desfiladeiro que leva ao coração",
    tag: "Petra",
  },
];

// ─────── GUIA ─────────
const GUIA = {
  nome: "Experience Jordan · DMC Local",
  origem: "Amman, Jordânia",
  photo: "https://static.wixstatic.com/media/2d4f5b_04c3cfc3602342daae1f688cf1a1e994~mv2.jpg",
  bio: "Parceira local de expedições na Jordânia há mais de 15 anos. Conhecimento profundo de Dana, Wadi Araba e Petra. Guias certificados, equipamento seguro, suporte em emergências.",
  credentials: [
    "Certificação em Guia de Expedição do Deserto (JATA)",
    "Primeiros Socorros Avançados em Áreas Remotas",
    "Especialista em Biodiversidade de Dana",
    "Aprovação Oficial de Petra e Reservas de Dana",
    "15+ anos em trekking desértico na Jordânia",
  ],
  expeditions: [
    { place: "Reserva de Dana", flag: "🇯🇴" },
    { place: "Wadi Rum 4x4", flag: "🇯🇴" },
    { place: "Wadi Mujib Canyoning", flag: "🇯🇴" },
    { place: "Petra à noite (Al-Khazneh)", flag: "🇯🇴" },
    { place: "Mar Morto e caminhada", flag: "🇯🇴" },
    { place: "Jerash e ruínas romanas", flag: "🇯🇴" },
  ],
};

// ─────── INCLUÍDO ─────────
const INCLUIDO = [
  {
    icon: "🧭",
    cat: "Guia especialista",
    text: "Guia local certificado de Experience Jordan com conhecimento profundo de Dana, Wadi Araba e Petra. Acompanhamento em todas as etapas.",
  },
  {
    icon: "🏕️",
    cat: "Hospedagem + acampamento",
    text: "Hotel 3★ em Amman (chegada/partida), acampamentos estruturados no deserto, hotel 3★ em Petra.",
  },
  {
    icon: "🚐",
    cat: "Transporte completo",
    text: "Transfer aeroporto-hotel Amman, transporte para Dana, transfer de bagagem entre acampamentos, saída de Petra.",
  },
  {
    icon: "🍽️",
    cat: "Todas as refeições",
    text: "Café da manhã, almoço (box lunch em trilha), jantar nos acampamentos e hotéis. Água ilimitada.",
  },
  {
    icon: "🎒",
    cat: "Equipamento de suporte",
    text: "Mochila de ataque, tenda compartilhada, colchonete. Acesso à Reserva de Dana e áreas protegidas.",
  },
  {
    icon: "📡",
    cat: "Comunicação + segurança",
    text: "Rádio de emergência, primeira resposta médica, seguro de resgate em área remota.",
  },
];

const NAO_INCLUIDO = [
  "Voos internacionais e conexões",
  "Visto de entrada na Jordânia",
  "Equipamentos pessoais (sacos de dormir, mochilas, botas)",
  "Bebidas alcoólicas e refeições fora do programa",
  "Passeios opcionais em Petra (além do incluído)",
  "Seguro viagem (obrigatório)",
];

const CANCELAMENTO = [
  { prazo: "60+ dias antes", multa: "10%" },
  { prazo: "59 a 30 dias", multa: "25%" },
  { prazo: "29 a 14 dias", multa: "50%" },
  { prazo: "13 dias ou menos", multa: "100%" },
];

// ─────── STATS ─────────
const STATS = [
  { val: "10 dias", label: "duração total" },
  { val: "5 dias", label: "de caminhada" },
  { val: "~77 km", label: "percurso total" },
  { val: "+2.679m", label: "desnível acumulado" },
  { val: "Grupo mín. 5", label: "pessoas" },
];

// ============================================================
export default function DanaPetraPage() {
  return (
    <main className="relative" style={{ background: D.cream }}>
      <Nav />

      {/* ===== HERO — A ROTA ===== */}
      <section
        className="relative flex min-h-[100svh] w-full items-center overflow-hidden"
        style={{ background: D.night }}
      >
        <div
          className="absolute inset-0 bg-cover bg-center opacity-20"
          style={{
            backgroundImage:
              "url('https://images.unsplash.com/photo-1469474968028-56623f02e42e?q=80&w=2400&auto=format&fit=crop')",
          }}
        />
        <div
          className="absolute inset-0"
          style={{
            background: `radial-gradient(ellipse at 65% 50%, transparent 30%, ${D.night} 78%)`,
          }}
        />

        <div className="relative z-10 mx-auto grid w-full max-w-[1400px] items-center gap-10 px-6 py-28 md:grid-cols-2 md:px-10">
          <div>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, ease: EASE, delay: 0.2 }}
              className="text-[12px] font-medium uppercase tracking-[0.4em]"
              style={{ color: D.sand }}
            >
              Jordânia · Deserto antigo
            </motion.p>
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.1, ease: EASE, delay: 0.3 }}
              className="mt-5 font-display text-[clamp(2.8rem,6.5vw,5.5rem)] font-light uppercase leading-[0.9] tracking-[-0.02em]"
              style={{ color: D.cream }}
            >
              Dana até<br />Petra
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, ease: EASE, delay: 0.5 }}
              className="mt-6 max-w-md text-[15px] font-light leading-relaxed text-white/70 md:text-base"
            >
              77 km pelo deserto da Jordânia. Cinco dias de caminhada por cânions labirínticos, da{" "}
              <span style={{ color: D.cream }}>Reserva de Dana</span> até a cidade rosa de{" "}
              <span style={{ color: D.cream }}>Petra</span>.
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, ease: EASE, delay: 0.65 }}
              className="mt-8 flex flex-wrap items-center gap-5"
            >
              <a
                href="#contato"
                className="inline-flex items-center gap-3 rounded-full px-8 py-4 text-[13px] font-semibold uppercase tracking-[0.16em] transition-transform duration-300 hover:scale-[1.03]"
                style={{ background: D.sand, color: D.night }}
              >
                Quero esta viagem <span>→</span>
              </a>
              <span className="text-white/85">
                <span className="text-[12px] uppercase tracking-[0.16em] text-white/50">a partir de</span>{" "}
                <span className="font-display text-2xl" style={{ color: D.cream }}>
                  US$ 5.250
                </span>
              </span>
            </motion.div>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1, delay: 0.9 }}
              className="mt-5 inline-flex items-center gap-2 rounded-full border px-4 py-2 text-[11px] uppercase tracking-[0.16em]"
              style={{ borderColor: D.petra, color: D.petra }}
            >
              <span className="h-1.5 w-1.5 rounded-full animate-pulse" style={{ background: D.petra }} />
              Saída confirmada · 18–27 Out 2027
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, scale: 0.92 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.2, ease: EASE, delay: 0.3 }}
            className="mx-auto aspect-square w-full max-w-[460px]"
          >
            <RotaMap />
          </motion.div>
        </div>
      </section>

      {/* ===== STATS STRIP ===== */}
      <section style={{ background: D.stone }}>
        <div className="mx-auto flex max-w-[1400px] flex-wrap justify-around px-6 py-5 md:px-10">
          {STATS.map(({ val, label }) => (
            <div key={label} className="flex flex-col items-center px-4 py-3">
              <span className="font-display text-[1.35rem] font-light" style={{ color: D.cream }}>
                {val}
              </span>
              <span
                className="mt-1 text-[10px] uppercase tracking-[0.18em]"
                style={{ color: "rgba(242,236,224,0.45)" }}
              >
                {label}
              </span>
            </div>
          ))}
        </div>
      </section>

      {/* ===== PERFIL DE ELEVAÇÃO ===== */}
      <section className="px-6 py-20 md:px-10 md:py-24" style={{ background: D.night, color: D.cream }}>
        <div className="mx-auto max-w-[1280px]">
          <div className="mb-8 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
            <Reveal>
              <h2 className="font-display text-[clamp(1.6rem,3.2vw,2.6rem)] font-light leading-[1.1]">
                Cada dia é uma nova altitude
              </h2>
            </Reveal>
            <Reveal delay={0.1}>
              <p className="max-w-sm text-[14px] font-light leading-relaxed text-white/55">
                +2.679 m de desnível acumulado. Cada passo desce as zonas de Dana até os cânions de Petra.
              </p>
            </Reveal>
          </div>
          <Reveal>
            <ElevationProfile />
            <div className="mt-3 grid grid-cols-3 gap-2 text-center text-[10px] uppercase tracking-[0.12em] text-white/45">
              {PICOS.map((p) => (
                <span key={p.t}>{p.t}</span>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      {/* ===== INTRO / O DESERTO ===== */}
      <section className="px-6 py-24 md:px-10 md:py-36" style={{ background: D.cream, color: D.night }}>
        <div className="mx-auto max-w-[1000px]">
          <Reveal>
            <p className="text-[11px] font-semibold uppercase tracking-[0.32em]" style={{ color: D.petra }}>
              Uma jornada entre duas paisagens
            </p>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="mt-7 font-display text-[clamp(1.8rem,4vw,3.2rem)] font-light leading-[1.18] tracking-[-0.01em]">
              Você começa nos planaltos verdes de Dana e termina nas fachadas gravadas em arenito vermelho de{" "}
              <span className="italic" style={{ color: D.petra }}>Petra</span>. No meio, o deserto muda tudo.
              Cada zona climática revela um segredo diferente.
            </p>
          </Reveal>
        </div>
      </section>

      {/* ===== AS 3 ZONAS ===== */}
      {ZONAS.map((z, i) => (
        <ZonaPanel key={z.nome} z={z} i={i} />
      ))}

      {/* ===== GALERIA ===== */}
      <section className="px-6 py-24 md:px-10 md:py-32" style={{ background: D.night }}>
        <div className="mx-auto max-w-[1400px]">
          <div className="mb-12 flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
            <Reveal>
              <p
                className="flex items-center gap-3 text-[11px] font-semibold uppercase tracking-[0.3em]"
                style={{ color: D.sand }}
              >
                <span className="h-px w-8" style={{ background: D.sand }} />
                Galeria
              </p>
              <h2
                className="mt-4 font-display text-[clamp(1.8rem,3.6vw,3rem)] font-light leading-[1.1]"
                style={{ color: D.cream }}
              >
                O deserto em detalhes
              </h2>
            </Reveal>
            <Reveal delay={0.1}>
              <p className="max-w-xs text-[14px] font-light leading-relaxed text-white/50">
                Amanheceres nos planaltos, noites sob as estrelas, a chegada ao Tesouro de Petra.
              </p>
            </Reveal>
          </div>

          <Reveal>
            <div className="grid gap-2" style={{ gridTemplateColumns: "2fr 1fr", gridTemplateRows: "280px 280px" }}>
              <div className="overflow-hidden rounded-xl" style={{ gridRow: "1 / 3" }}>
                <div
                  className="h-full w-full bg-cover bg-center transition-transform duration-700 hover:scale-105"
                  style={{ backgroundImage: `url('${GALLERY_IMGS[0].src}')` }}
                />
              </div>
              {[GALLERY_IMGS[1], GALLERY_IMGS[2]].map((img) => (
                <div key={img.tag} className="group relative overflow-hidden rounded-xl">
                  <div
                    className="h-full w-full bg-cover bg-center transition-transform duration-700 group-hover:scale-105"
                    style={{ backgroundImage: `url('${img.src}')` }}
                  />
                  <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/70 to-transparent px-4 pb-4 pt-8">
                    <span className="block text-[10px] uppercase tracking-[0.18em] text-white/60">{img.tag}</span>
                    <span className="block text-[13px] font-light text-white/90">{img.caption}</span>
                  </div>
                </div>
              ))}
            </div>
          </Reveal>

          <Reveal delay={0.15}>
            <div className="mt-2 grid grid-cols-3 gap-2" style={{ height: 240 }}>
              {[GALLERY_IMGS[3], GALLERY_IMGS[4], GALLERY_IMGS[5]].map((img) => (
                <div key={img.tag} className="group relative overflow-hidden rounded-xl">
                  <div
                    className="h-full w-full bg-cover bg-center transition-transform duration-700 group-hover:scale-105"
                    style={{ backgroundImage: `url('${img.src}')` }}
                  />
                  <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/70 to-transparent px-4 pb-4 pt-8">
                    <span className="block text-[10px] uppercase tracking-[0.18em] text-white/60">{img.tag}</span>
                    <span className="block text-[13px] font-light text-white/90">{img.caption}</span>
                  </div>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      {/* ===== GUIA ===== */}
      <section className="px-6 py-24 md:px-10 md:py-32" style={{ background: "#0f0a06", color: D.cream }}>
        <div className="mx-auto max-w-[1280px]">
          <Reveal>
            <p
              className="flex items-center gap-3 text-[11px] font-semibold uppercase tracking-[0.3em]"
              style={{ color: D.sand }}
            >
              <span className="h-px w-8" style={{ background: D.sand }} />
              O especialista local
            </p>
          </Reveal>

          <div className="mt-10 grid items-start gap-10 md:grid-cols-[420px_1fr] md:gap-16">
            <Reveal>
              <div className="relative overflow-hidden rounded-2xl" style={{ height: 520 }}>
                <div
                  className="absolute inset-0 bg-cover bg-center"
                  style={{ backgroundImage: `url('${GUIA.photo}')` }}
                />
                <div
                  className="absolute inset-0"
                  style={{ background: "linear-gradient(to top, #0f0a06ee 0%, transparent 55%)" }}
                />
                <div className="absolute inset-x-0 bottom-0 p-7">
                  <p className="font-display text-[1.6rem] font-light leading-tight" style={{ color: D.cream }}>
                    {GUIA.nome}
                  </p>
                  <p className="mt-1 text-[12px] uppercase tracking-[0.18em]" style={{ color: D.sand }}>
                    {GUIA.origem}
                  </p>
                </div>
              </div>
            </Reveal>

            <Reveal delay={0.1}>
              <div>
                <h2 className="font-display text-[clamp(2rem,3.8vw,3rem)] font-light leading-[1.05] tracking-[-0.01em]">
                  {GUIA.nome}
                </h2>
                <p className="mt-2 text-[12px] uppercase tracking-[0.2em]" style={{ color: D.sand }}>
                  {GUIA.origem}
                </p>
                <p className="mt-6 text-[15px] font-light leading-relaxed text-white/70 max-w-xl">{GUIA.bio}</p>

                <div className="mt-8">
                  <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-white/40 mb-4">
                    Certificações
                  </p>
                  <ul className="space-y-3">
                    {GUIA.credentials.map((c) => (
                      <li key={c} className="flex items-start gap-3 text-[14px] font-light text-white/75">
                        <span
                          className="mt-0.5 h-4 w-4 shrink-0 rounded-full border flex items-center justify-center text-[9px]"
                          style={{ borderColor: D.petra, color: D.petra }}
                        >
                          ✓
                        </span>
                        {c}
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="mt-8">
                  <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-white/40 mb-4">
                    Experiências
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {GUIA.expeditions.map((exp) => (
                      <span
                        key={exp.place}
                        className="rounded-full border px-4 py-1.5 text-[12px] font-light"
                        style={{ borderColor: "rgba(200,169,110,0.3)", color: "rgba(242,236,224,0.65)" }}
                      >
                        {exp.flag} {exp.place}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ===== INCLUÍDO / NÃO INCLUÍDO ===== */}
      <section className="px-6 py-24 md:px-10 md:py-32" style={{ background: D.cream, color: D.night }}>
        <div className="mx-auto max-w-[1280px]">
          <Reveal>
            <p className="flex items-center gap-3 text-[11px] font-semibold uppercase tracking-[0.3em]" style={{ color: D.petra }}>
              <span className="h-px w-8" style={{ background: D.petra }} />
              O que está incluído
            </p>
            <h2 className="mt-4 font-display text-[clamp(1.8rem,3.6vw,3rem)] font-light leading-[1.1]">
              AONIK resolve por você
            </h2>
          </Reveal>

          <div className="mt-12 grid gap-8 md:grid-cols-[3fr_2fr]">
            <Reveal>
              <div className="grid gap-3 sm:grid-cols-2">
                {INCLUIDO.map((item) => (
                  <div
                    key={item.cat}
                    className="flex gap-4 rounded-2xl bg-white p-5 shadow-[0_2px_16px_rgba(15,28,38,0.06)]"
                  >
                    <span className="text-2xl shrink-0">{item.icon}</span>
                    <div>
                      <p
                        className="text-[11px] font-semibold uppercase tracking-[0.14em] mb-1"
                        style={{ color: D.petra }}
                      >
                        {item.cat}
                      </p>
                      <p className="text-[13px] font-light leading-relaxed" style={{ color: "rgba(15,28,38,0.7)" }}>
                        {item.text}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </Reveal>

            <Reveal delay={0.1}>
              <div className="flex flex-col gap-6">
                <div className="rounded-2xl p-6" style={{ background: "rgba(15,28,38,0.05)" }}>
                  <p className="text-[11px] font-semibold uppercase tracking-[0.2em] mb-4" style={{ color: D.petra }}>
                    Não está incluído
                  </p>
                  <ul className="space-y-3">
                    {NAO_INCLUIDO.map((item) => (
                      <li
                        key={item}
                        className="flex items-start gap-3 text-[13px] font-light"
                        style={{ color: "rgba(15,28,38,0.65)" }}
                      >
                        <span className="mt-0.5 shrink-0 text-[11px]" style={{ color: D.petra }}>
                          ·
                        </span>
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="rounded-2xl p-6" style={{ background: "rgba(15,28,38,0.05)" }}>
                  <p
                    className="text-[11px] font-semibold uppercase tracking-[0.2em] mb-4"
                    style={{ color: "rgba(15,28,38,0.4)" }}
                  >
                    Política de cancelamento
                  </p>
                  <div className="space-y-2">
                    {CANCELAMENTO.map((row) => (
                      <div key={row.prazo} className="flex items-center justify-between text-[12px]">
                        <span style={{ color: "rgba(15,28,38,0.55)" }}>{row.prazo}</span>
                        <span className="font-semibold" style={{ color: D.night }}>
                          {row.multa}
                        </span>
                      </div>
                    ))}
                  </div>
                  <p
                    className="mt-4 text-[11px] leading-relaxed"
                    style={{ color: "rgba(15,28,38,0.4)" }}
                  >
                    Cancelamentos por condições extremas ou força maior oferecem crédito total para outra data.
                  </p>
                </div>

                <div
                  className="rounded-2xl border px-5 py-4 text-[12px] font-light leading-relaxed"
                  style={{ borderColor: D.sand, color: "rgba(15,28,38,0.6)" }}
                >
                  <span className="font-semibold" style={{ color: D.sand }}>
                    Seguro viagem:
                  </span>{" "}
                  obrigatório. A AONIK orienta as melhores opções para trekking desértico.
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ===== PRÓXIMAS SAÍDAS ===== */}
      <section className="px-6 py-24 md:px-10 md:py-32" style={{ background: D.night, color: D.cream }}>
        <div className="mx-auto max-w-[1100px]">
          <div className="flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
            <Reveal>
              <p className="flex items-center gap-3 text-[11px] font-semibold uppercase tracking-[0.3em]" style={{ color: D.petra }}>
                <span className="h-px w-8" style={{ background: D.petra }} />
                Próximas saídas em grupo
              </p>
              <h2 className="mt-5 font-display text-[clamp(1.8rem,3.6vw,3rem)] font-light leading-[1.1]">
                Reserve sua vaga
              </h2>
              <p className="mt-3 max-w-md text-[14px] font-light leading-relaxed text-white/60">
                Saídas guiadas, grupo pequeno, {DANA_PETRA_GRUPO.duration}. {DANA_PETRA_GRUPO.priceFrom}.
              </p>
            </Reveal>
            <Reveal delay={0.1}>
              <a
                href="#contato"
                className="inline-flex items-center gap-3 rounded-full px-8 py-4 text-[13px] font-semibold uppercase tracking-[0.16em] transition-transform duration-300 hover:scale-[1.03]"
                style={{ background: D.sand, color: D.night }}
              >
                Reservar minha vaga <span>→</span>
              </a>
            </Reveal>
          </div>

          <div className="mt-12 grid gap-6 sm:grid-cols-2">
            {([2027] as const).map((ano) => {
              const datas = DANA_PETRA_GRUPO.dates2027;
              return (
                <Reveal key={ano} delay={0.05}>
                  <div className="rounded-xl border border-white/10 bg-white/5 p-7">
                    <p className="font-display text-3xl font-light" style={{ color: D.sand }}>
                      {ano}
                    </p>
                    <div className="mt-4 flex flex-wrap gap-2">
                      {(datas ?? []).map((d) => (
                        <span
                          key={d}
                          className="rounded-full border border-white/15 px-4 py-1.5 text-[13px] font-medium"
                          style={{ color: D.cream }}
                        >
                          {d}
                        </span>
                      ))}
                    </div>
                    <div className="mt-4 flex items-center gap-2">
                      <span
                        className="h-1.5 w-1.5 rounded-full animate-pulse"
                        style={{ background: D.petra }}
                      />
                      <p
                        className="text-[12px] font-semibold uppercase tracking-[0.12em]"
                        style={{ color: D.petra }}
                      >
                        Saída confirmada
                      </p>
                    </div>
                    <p className="mt-2 text-[12px] font-light" style={{ color: "rgba(242,236,224,0.45)" }}>
                      Entrada: 30% via Pix · 5 vezes sem juros
                    </p>
                  </div>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* ===== AONIKIA ===== */}
      <section className="px-6 py-20 md:px-10 md:py-24" style={{ background: D.stone }}>
        <div className="mx-auto max-w-[860px] text-center">
          <Reveal>
            <p className="text-[11px] font-semibold uppercase tracking-[0.3em]" style={{ color: D.sand }}>
              AonikIA · especialista neste circuito
            </p>
            <h2
              className="mt-5 font-display text-[clamp(1.8rem,3.5vw,2.8rem)] font-light leading-[1.15]"
              style={{ color: D.cream }}
            >
              Do deserto ao coração de Petra
            </h2>
            <p className="mx-auto mt-4 max-w-md text-[15px] font-light leading-relaxed text-white/65">
              Qual é o melhor ritmo? Quando ir? Como se preparar para o deserto? A AonikIA conhece cada
              cânion e te conecta com especialistas.
            </p>
            <a
              href="#contato"
              className="mt-7 inline-flex items-center gap-3 rounded-full border px-7 py-3.5 text-[12px] font-semibold uppercase tracking-[0.16em] transition-all duration-300"
              style={{ borderColor: D.sand, color: D.sand }}
            >
              Conversar com a AonikIA <span>→</span>
            </a>
          </Reveal>
        </div>
      </section>

      <Contato />
      <Footer />
      <FloatingActions />
    </main>
  );
}
