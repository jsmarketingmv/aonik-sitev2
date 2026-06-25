"use client";

import { motion } from "framer-motion";
import Nav from "../../components/Nav";
import Footer from "../../components/Footer";
import Contato from "../../components/Contato";
import FloatingActions from "../../components/FloatingActions";
import { Reveal, EASE } from "../../components/ui";
import { GRUPOS } from "../../lib/grupos";

const TMB_GRUPO = GRUPOS.find((g) => g.id === "tour-du-mont-blanc")!;

/* ============================================================
   TOUR DU MONT BLANC — V2 (personalidade nascida do lugar)
   O ANEL · 3 culturas · o gigante de gelo · contraste frio/quente
   ============================================================ */
const C = {
  night: "#0f1c26",
  granite: "#33424d",
  snow: "#eef3f6",
  cool: "#e7edf0",
  fr: "#5b7a99",
  it: "#c2763c",
  ch: "#4f7d4a",
  chRed: "#b8402f",
  wood: "#d98c4a",
  line: "rgba(238,243,246,0.18)",
};

// ---------- O ANEL (rota circular) ----------
const cx = 220, cy = 220, R = 150;
const pt = (deg: number, r = R): [number, number] => {
  const a = (deg * Math.PI) / 180;
  return [cx + r * Math.sin(a), cy - r * Math.cos(a)];
};
const arcPath = (start: number, end: number) => {
  const n = 60;
  let d = "";
  for (let i = 0; i <= n; i++) {
    const deg = start + ((end - start) * i) / n;
    const [x, y] = pt(deg);
    d += (i === 0 ? "M" : "L") + x.toFixed(1) + "," + y.toFixed(1) + " ";
  }
  return d;
};
const SEGMENTS = [
  { d: arcPath(300, 420), color: C.fr },
  { d: arcPath(60, 180),  color: C.it },
  { d: arcPath(180, 300), color: C.ch },
];
const STAGES = [
  { deg: 0,   label: "Chamonix" },
  { deg: 45,  label: "Les Contamines" },
  { deg: 95,  label: "Courmayeur" },
  { deg: 150, label: "Grand Col Ferret" },
  { deg: 215, label: "Champex" },
  { deg: 290, label: "Col de Balme" },
];

function RingMap() {
  return (
    <svg viewBox="-56 -6 552 476" className="h-full w-full">
      <circle cx={cx} cy={cy} r={R} fill="none" stroke={C.line} strokeWidth="1" strokeDasharray="2 5" />
      {SEGMENTS.map((s, i) => (
        <motion.path
          key={i}
          d={s.d}
          fill="none"
          stroke={s.color}
          strokeWidth="3"
          strokeLinecap="round"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ pathLength: 1, opacity: 1 }}
          transition={{ duration: 1.6, ease: EASE, delay: 0.4 + i * 0.25 }}
        />
      ))}
      {STAGES.map((st) => {
        const [x, y] = pt(st.deg);
        const [lx, ly] = pt(st.deg, R + 16);
        const s = Math.sin((st.deg * Math.PI) / 180);
        const anchor = s > 0.3 ? "start" : s < -0.3 ? "end" : "middle";
        return (
          <g key={st.label}>
            <circle cx={x} cy={y} r="4" fill={C.snow} />
            <text x={lx} y={ly} fill="rgba(238,243,246,0.7)" fontSize="11" letterSpacing="1.5"
              textAnchor={anchor} dominantBaseline="middle" style={{ textTransform: "uppercase" }}>
              {st.label}
            </text>
          </g>
        );
      })}
      <path d={`M ${cx-26} ${cy+14} L ${cx} ${cy-30} L ${cx+26} ${cy+14} Z`}
        fill="none" stroke={C.snow} strokeWidth="1.5" />
      <path d={`M ${cx-9} ${cy-7} L ${cx} ${cy-18} L ${cx+9} ${cy-7}`}
        fill="none" stroke={C.snow} strokeWidth="1.5" />
      <text x={cx} y={cy+36} fill={C.snow} fontSize="12" letterSpacing="3" textAnchor="middle"
        style={{ textTransform: "uppercase" }}>Mont Blanc</text>
      <text x={cx} y={cy+52} fill={C.wood} fontSize="11" letterSpacing="2" textAnchor="middle">4.808 m</text>
    </svg>
  );
}

// ---------- PERFIL DE ELEVAÇÃO ----------
const PROFILE: [number, number][] = [
  [0, 170], [70, 70], [150, 150], [225, 40], [300, 150],
  [380, 80], [460, 158], [540, 35], [620, 150], [700, 85],
  [780, 150], [860, 55], [940, 150], [1000, 120],
];
const COLS = [
  { x: 225, y: 40, t: "Col de la Seigne · 2.516m" },
  { x: 540, y: 35, t: "Grand Col Ferret · 2.537m" },
  { x: 860, y: 55, t: "Col de Balme · 2.191m" },
];
function ElevationProfile() {
  const line = PROFILE.map((p, i) => (i ? "L" : "M") + p[0] + "," + p[1]).join(" ");
  const área = line + " L1000,240 L0,240 Z";
  return (
    <svg viewBox="0 0 1000 240" className="w-full" preserveAspectRatio="none" style={{ height: 220 }}>
      <defs>
        <linearGradient id="elev" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={C.fr} stopOpacity="0.35" />
          <stop offset="100%" stopColor={C.fr} stopOpacity="0" />
        </linearGradient>
      </defs>
      <motion.path d={área} fill="url(#elev)"
        initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}
        transition={{ duration: 1.2 }} />
      <motion.path d={line} fill="none" stroke={C.snow} strokeWidth="2" strokeLinejoin="round"
        initial={{ pathLength: 0 }} whileInView={{ pathLength: 1 }} viewport={{ once: true }}
        transition={{ duration: 1.8, ease: EASE }} />
      {COLS.map((c) => (
        <g key={c.t}><circle cx={c.x} cy={c.y} r="3.5" fill={C.wood} /></g>
      ))}
    </svg>
  );
}

// ---------- TRAVESSIA DAS 3 CULTURAS ----------
const CULTURAS = [
  {
    flag: "🇫🇷", pais: "França", cor: C.fr, bg: "#1c2a36",
    titulo: "O berço, no frio do granito",
    texto: "Chamonix e a alta montanha: o nascimento do alpinismo, sob a face branca do Mont Blanc. Geleiras, granito e queijos de altitude regados a vinho da Savoia.",
    nota: "Reblochon · Génépi · alpinismo",
    img: "https://images.unsplash.com/photo-1454496522488-7a8e488e8606?q=80&w=1400&auto=format&fit=crop",
  },
  {
    flag: "🇮🇹", pais: "Itália", cor: C.it, bg: "#2a1d12",
    titulo: "O calor desce no Val Ferret",
    texto: "Cruzar para a Itália é sentir a temperatura mudar. Courmayeur, a dolce vita alpina: polenta fumegante, espresso e o sol batendo nas paredes do maciço.",
    nota: "Polenta · Espresso · Vinho do Valle d'Aosta",
    img: "https://images.unsplash.com/photo-1469474968028-56623f02e42e?q=80&w=1400&auto=format&fit=crop",
  },
  {
    flag: "🇨🇭", pais: "Suíça", cor: C.ch, bg: "#16241a",
    titulo: "A ordem verde dos vilarejos",
    texto: "A Suíça é pasto, lago e chalé. Champex e La Fouly em ordem perfeita, vacas com sinos, raclette derretida e o silêncio limpo do alto.",
    nota: "Raclette · Chocolate · vilarejos de cartão-postal",
    img: "https://images.unsplash.com/photo-1518780664697-55e3ad937233?q=80&w=1400&auto=format&fit=crop",
  },
];

function CulturaPanel({ c, i }: { c: (typeof CULTURAS)[number]; i: number }) {
  const reverse = i % 2 === 1;
  return (
    <section className="px-6 py-20 md:px-10 md:py-28" style={{ background: c.bg, color: C.snow }}>
      <div className={`mx-auto grid max-w-[1280px] items-center gap-10 md:grid-cols-2 md:gap-16 ${
        reverse ? "md:[&>*:first-child]:order-2" : ""}`}>
        <Reveal>
          <div className="relative h-[320px] overflow-hidden rounded-xl md:h-[460px]">
            <div className="absolute inset-0 scale-105 bg-cover bg-center"
              style={{ backgroundImage: `url('${c.img}')` }} />
            <div className="absolute inset-0"
              style={{ background: `linear-gradient(to top, ${c.bg}cc, transparent 60%)` }} />
            <span className="absolute left-5 top-5 text-3xl">{c.flag}</span>
          </div>
        </Reveal>
        <Reveal delay={0.1}>
          <div>
            <p className="flex items-center gap-3 text-[12px] font-semibold uppercase tracking-[0.3em]"
              style={{ color: c.cor }}>
              <span className="h-px w-10" style={{ background: c.cor }} />
              {c.pais}
            </p>
            <h3 className="mt-5 font-display text-[clamp(1.8rem,3.6vw,3rem)] font-light leading-[1.08] tracking-[-0.01em]">
              {c.titulo}
            </h3>
            <p className="mt-5 max-w-md text-[15px] font-light leading-relaxed text-white/70">{c.texto}</p>
            <p className="mt-6 text-[12px] uppercase tracking-[0.16em]" style={{ color: c.cor }}>{c.nota}</p>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

// ---------- GALERIA ----------
const GALLERY_IMGS = [
  {
    src: "https://static.wixstatic.com/media/nsplsh_b1564644fa994e589c62424e365560e9~mv2.jpg",
    caption: "O maciço emerge a cada etapa",
    tag: "Paisagem",
  },
  {
    src: "https://static.wixstatic.com/media/61ab00_70ab5a86382c4bb7825240cc732d08fd~mv2.jpeg",
    caption: "O grupo em expedição nos Alpes",
    tag: "Equipe",
  },
  {
    src: "https://static.wixstatic.com/media/61ab00_5b1a43c0ce41447abdbdb8403c5fecc3~mv2.jpeg",
    caption: "Trilhas por vales alpinos",
    tag: "Trilha",
  },
  {
    src: "https://static.wixstatic.com/media/2d4f5b_2c19dbc8a0ca4eab9c3f93e02a421779~mv2.jpg",
    caption: "Refúgio de montanha, conforto após a trilha",
    tag: "Hospedagem",
  },
  {
    src: "https://static.wixstatic.com/media/2d4f5b_bad1e5d4f34a41109e523804f0216ae7~mv2.jpg",
    caption: "Panorama glacial sobre os Alpes",
    tag: "Vista",
  },
  {
    src: "https://static.wixstatic.com/media/2d4f5b_22579166c00b4c9aabcb71fb4565473e~mv2.jpeg",
    caption: "O anel se fecha em Chamonix",
    tag: "TMB",
  },
];

// ---------- GUIA ----------
const GUIA = {
  nome: "Ivo Léo Schmitz",
  origem: "Brusque, Santa Catarina",
  photo: "https://static.wixstatic.com/media/2d4f5b_04c3cfc3602342daae1f688cf1a1e994~mv2.jpg",
  bio: "Montanhista, peregrino, remador e ciclista. Natural de Brusque (SC), Ivo Leonardo Schmitz transforma trilhas em expedições de vida, desenvolvendo roteiros pelo mundo com segurança, técnica e presença de espírito.",
  credentials: [
    "Certificações Internacionais de Primeiros Socorros e Resgate em Áreas Remotas",
    "Formação em Desenvolvimento de Condutor ao Ar Livre",
    "Formação Técnica em Guia de Turismo",
    "Presidente da FEMESC (Federação de Montanhismo e Escalada de SC)",
    "Co-coordenador do Caminho da Mata Atlântica (trilha de longo curso nacional)",
  ],
  expeditions: [
    { place: "Cerro Plata 5.968m", flag: "🇦🇷" },
    { place: "Circuito Huayhuash", flag: "🇵🇪" },
    { place: "Tour du Mont Blanc", flag: "🇫🇷" },
    { place: "Alta Via 1, Dolomitas", flag: "🇮🇹" },
    { place: "Caminho de Santiago", flag: "🇪🇸" },
    { place: "Cânions do Sul / Lagamar", flag: "🇧🇷" },
  ],
};

// ---------- INCLUÍDO ----------
const INCLUIDO = [
  { icon: "🧭", cat: "Guia especialista", text: "Condutor TARGET certificado em expedições de alta montanha e primeiros socorros em áreas remotas. Ivo Léo Schmitz lidera cada etapa." },
  { icon: "🏨", cat: "Hospedagem completa", text: "Hotéis 2–3★ (quartos duplos), pousadas e refúgios alpinos durante toda a travessia." },
  { icon: "🚌", cat: "Transfer no dia 1", text: "Transfer Genebra–Chamonix (ônibus regular). Você chega ao aeroporto e a gente resolve o restante." },
  { icon: "📡", cat: "Segurança SPOT GPS", text: "Monitoramento em tempo real com dispositivo SPOT GPS e acionamento de resgate se necessário." },
  { icon: "☕", cat: "Café da manhã", text: "Café da manhã incluso nas hospedagens em Chamonix (chegada e retorno do circuito)." },
  { icon: "📋", cat: "Planejamento exclusivo", text: "Grupo pequeno e privado com roteiro adaptado ao perfil e ritmo do grupo." },
];

const NAO_INCLUIDO = [
  "Passagens aéreas (internacionais e conexões)",
  "Mochilas e equipamentos pessoais",
  "Alimentação fora do roteiro programado",
  "Gastos extras e passeios opcionais",
  "Seguro Viagem (obrigatório para esportes de aventura)",
];

const CANCELAMENTO = [
  { prazo: "31+ dias antes",  multa: "10%" },
  { prazo: "30 a 21 dias",    multa: "20%" },
  { prazo: "20 a 8 dias",     multa: "50%" },
  { prazo: "7 dias ou menos", multa: "100%" },
];

// ---------- STATS ----------
const STATS = [
  { val: "14 dias",    label: "duração total" },
  { val: "11 etapas",  label: "de caminhada" },
  { val: "~170 km",    label: "percurso total" },
  { val: "+8.823 m",   label: "desnível acumulado" },
  { val: "3 países",   label: "FR · IT · CH" },
];

// ============================================================
export default function TMBV2Page() {
  return (
    <main className="relative" style={{ background: C.cool }}>
      <Nav />

      {/* ===== HERO — O ANEL ===== */}
      <section className="relative flex min-h-[100svh] w-full items-center overflow-hidden"
        style={{ background: C.night }}>
        <div className="absolute inset-0 bg-cover bg-center opacity-25"
          style={{ backgroundImage: "url('https://images.unsplash.com/photo-1454496522488-7a8e488e8606?q=80&w=2400&auto=format&fit=crop')" }} />
        <div className="absolute inset-0"
          style={{ background: `radial-gradient(ellipse at 65% 50%, transparent 30%, ${C.night} 78%)` }} />

        <div className="relative z-10 mx-auto grid w-full max-w-[1400px] items-center gap-10 px-6 py-28 md:grid-cols-2 md:px-10">
          <div>
            <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, ease: EASE, delay: 0.2 }}
              className="text-[12px] font-medium uppercase tracking-[0.4em]" style={{ color: C.wood }}>
              Alpes · O grande circuito
            </motion.p>
            <motion.h1 initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.1, ease: EASE, delay: 0.3 }}
              className="mt-5 font-display text-[clamp(2.8rem,6.5vw,5.5rem)] font-light uppercase leading-[0.9] tracking-[-0.02em]"
              style={{ color: C.snow }}>
              Tour du<br />Mont Blanc
            </motion.h1>
            <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, ease: EASE, delay: 0.5 }}
              className="mt-6 max-w-md text-[15px] font-light leading-relaxed text-white/70 md:text-base">
              Uma volta completa ao redor do teto da Europa. 14 dias, 170 km e{" "}
              <span style={{ color: C.snow }}>três países</span>, a pé, em círculo, sem nunca refazer o caminho.
            </motion.p>
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, ease: EASE, delay: 0.65 }}
              className="mt-8 flex flex-wrap items-center gap-5">
              <a href="#contato"
                className="inline-flex items-center gap-3 rounded-full px-8 py-4 text-[13px] font-semibold uppercase tracking-[0.16em] transition-transform duration-300 hover:scale-[1.03]"
                style={{ background: C.wood, color: C.night }}>
                Quero esta viagem <span>→</span>
              </a>
              <span className="text-white/85">
                <span className="text-[12px] uppercase tracking-[0.16em] text-white/50">a partir de</span>{" "}
                <span className="font-display text-2xl" style={{ color: C.snow }}>€ 5.450</span>
              </span>
            </motion.div>
            {/* badge saída confirmada */}
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}
              transition={{ duration: 1, delay: 0.9 }}
              className="mt-5 inline-flex items-center gap-2 rounded-full border px-4 py-2 text-[11px] uppercase tracking-[0.16em]"
              style={{ borderColor: C.ch, color: C.ch }}>
              <span className="h-1.5 w-1.5 rounded-full animate-pulse" style={{ background: C.ch }} />
              Saída confirmada · 18–31 Ago 2026
            </motion.div>
          </div>

          <motion.div initial={{ opacity: 0, scale: 0.92 }} animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.2, ease: EASE, delay: 0.3 }}
            className="mx-auto aspect-square w-full max-w-[460px]">
            <RingMap />
          </motion.div>
        </div>

        <div className="absolute bottom-6 left-1/2 z-10 flex -translate-x-1/2 items-center gap-6 text-[11px] uppercase tracking-[0.18em] text-white/60">
          {[["França", C.fr], ["Itália", C.it], ["Suíça", C.ch]].map(([pais, cor]) => (
            <span key={pais as string} className="flex items-center gap-2">
              <span className="h-2 w-2 rounded-full" style={{ background: cor as string }} />
              {pais}
            </span>
          ))}
        </div>
      </section>

      {/* ===== STATS STRIP ===== */}
      <section style={{ background: C.granite }}>
        <div className="mx-auto flex max-w-[1400px] flex-wrap justify-around px-6 py-5 md:px-10">
          {STATS.map(({ val, label }) => (
            <div key={label} className="flex flex-col items-center px-4 py-3">
              <span className="font-display text-[1.35rem] font-light" style={{ color: C.snow }}>{val}</span>
              <span className="mt-1 text-[10px] uppercase tracking-[0.18em]"
                style={{ color: "rgba(238,243,246,0.45)" }}>{label}</span>
            </div>
          ))}
        </div>
      </section>

      {/* ===== PERFIL DE ELEVAÇÃO ===== */}
      <section className="px-6 py-20 md:px-10 md:py-24" style={{ background: C.night, color: C.snow }}>
        <div className="mx-auto max-w-[1280px]">
          <div className="mb-8 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
            <Reveal>
              <h2 className="font-display text-[clamp(1.6rem,3.2vw,2.6rem)] font-light leading-[1.1]">
                Sobe, desce, atravessa
              </h2>
            </Reveal>
            <Reveal delay={0.1}>
              <p className="max-w-sm text-[14px] font-light leading-relaxed text-white/55">
                +8.823 m de desnível acumulado. Cada col vencido abre um vale novo e outro país.
              </p>
            </Reveal>
          </div>
          <Reveal>
            <ElevationProfile />
            <div className="mt-3 grid grid-cols-3 gap-2 text-center text-[10px] uppercase tracking-[0.12em] text-white/45">
              {COLS.map((c) => <span key={c.t}>{c.t}</span>)}
            </div>
          </Reveal>
        </div>
      </section>

      {/* ===== INTRO / O GIGANTE ===== */}
      <section className="px-6 py-24 md:px-10 md:py-36" style={{ background: C.cool, color: C.night }}>
        <div className="mx-auto max-w-[1000px]">
          <Reveal>
            <p className="text-[11px] font-semibold uppercase tracking-[0.32em]" style={{ color: C.it }}>
              Um gigante no meio do caminho
            </p>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="mt-7 font-display text-[clamp(1.8rem,4vw,3.2rem)] font-light leading-[1.18] tracking-[-0.01em]">
              No centro de tudo, imóvel, o{" "}
              <span className="italic" style={{ color: C.fr }}>Mont Blanc</span>.
              Você gira em torno dele por onze dias e, a cada país que cruza,
              a montanha mostra uma face diferente de si mesma.
            </p>
          </Reveal>
        </div>
      </section>

      {/* ===== AS 3 CULTURAS (muda de temperatura) ===== */}
      {CULTURAS.map((c, i) => (
        <CulturaPanel key={c.pais} c={c} i={i} />
      ))}

      {/* ===== GALERIA — A EXPERIÊNCIA NA PRÁTICA ===== */}
      <section className="px-6 py-24 md:px-10 md:py-32" style={{ background: C.night }}>
        <div className="mx-auto max-w-[1400px]">
          <div className="mb-12 flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
            <Reveal>
              <p className="flex items-center gap-3 text-[11px] font-semibold uppercase tracking-[0.3em]"
                style={{ color: C.wood }}>
                <span className="h-px w-8" style={{ background: C.wood }} />
                Galeria
              </p>
              <h2 className="mt-4 font-display text-[clamp(1.8rem,3.6vw,3rem)] font-light leading-[1.1]"
                style={{ color: C.snow }}>
                O que você vai viver
              </h2>
            </Reveal>
            <Reveal delay={0.1}>
              <p className="max-w-xs text-[14px] font-light leading-relaxed text-white/50">
                Hospedagens nos refúgios alpinos, o grupo em campo, vistas que justificam cada passo.
              </p>
            </Reveal>
          </div>

          {/* grid editorial: grande + 2 · depois 3 iguais */}
          <Reveal>
            <div className="grid gap-2" style={{ gridTemplateColumns: "2fr 1fr", gridTemplateRows: "280px 280px" }}>
              {/* imagem grande */}
              <div className="overflow-hidden rounded-xl" style={{ gridRow: "1 / 3" }}>
                <div className="h-full w-full bg-cover bg-center transition-transform duration-700 hover:scale-105"
                  style={{ backgroundImage: `url('${GALLERY_IMGS[0].src}')` }} />
              </div>
              {/* duas stacked direita */}
              {[GALLERY_IMGS[1], GALLERY_IMGS[2]].map((img) => (
                <div key={img.tag} className="group relative overflow-hidden rounded-xl">
                  <div className="h-full w-full bg-cover bg-center transition-transform duration-700 group-hover:scale-105"
                    style={{ backgroundImage: `url('${img.src}')` }} />
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
                  <div className="h-full w-full bg-cover bg-center transition-transform duration-700 group-hover:scale-105"
                    style={{ backgroundImage: `url('${img.src}')` }} />
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

      {/* ===== GUIA — IVO LÉO SCHMITZ ===== */}
      <section className="px-6 py-24 md:px-10 md:py-32" style={{ background: "#091520", color: C.snow }}>
        <div className="mx-auto max-w-[1280px]">
          <Reveal>
            <p className="flex items-center gap-3 text-[11px] font-semibold uppercase tracking-[0.3em]"
              style={{ color: C.wood }}>
              <span className="h-px w-8" style={{ background: C.wood }} />
              O guia da aventura
            </p>
          </Reveal>

          <div className="mt-10 grid items-start gap-10 md:grid-cols-[420px_1fr] md:gap-16">
            {/* foto */}
            <Reveal>
              <div className="relative overflow-hidden rounded-2xl" style={{ height: 520 }}>
                <div className="absolute inset-0 bg-cover bg-center"
                  style={{ backgroundImage: `url('${GUIA.photo}')` }} />
                <div className="absolute inset-0"
                  style={{ background: "linear-gradient(to top, #091520ee 0%, transparent 55%)" }} />
                <div className="absolute inset-x-0 bottom-0 p-7">
                  <p className="font-display text-[1.6rem] font-light leading-tight"
                    style={{ color: C.snow }}>{GUIA.nome}</p>
                  <p className="mt-1 text-[12px] uppercase tracking-[0.18em]"
                    style={{ color: C.wood }}>{GUIA.origem}</p>
                </div>
              </div>
            </Reveal>

            {/* bio + credentials */}
            <Reveal delay={0.1}>
              <div>
                <h2 className="font-display text-[clamp(2rem,3.8vw,3rem)] font-light leading-[1.05] tracking-[-0.01em]">
                  {GUIA.nome}
                </h2>
                <p className="mt-2 text-[12px] uppercase tracking-[0.2em]"
                  style={{ color: C.wood }}>{GUIA.origem}</p>
                <p className="mt-6 text-[15px] font-light leading-relaxed text-white/70 max-w-xl">
                  {GUIA.bio}
                </p>

                {/* credenciais */}
                <div className="mt-8">
                  <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-white/40 mb-4">
                    Formação & Certificações
                  </p>
                  <ul className="space-y-3">
                    {GUIA.credentials.map((c) => (
                      <li key={c} className="flex items-start gap-3 text-[14px] font-light text-white/75">
                        <span className="mt-0.5 h-4 w-4 shrink-0 rounded-full border flex items-center justify-center text-[9px]"
                          style={{ borderColor: C.ch, color: C.ch }}>✓</span>
                        {c}
                      </li>
                    ))}
                  </ul>
                </div>

                {/* expedições */}
                <div className="mt-8">
                  <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-white/40 mb-4">
                    Expedições de referência
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {GUIA.expeditions.map((exp) => (
                      <span key={exp.place}
                        className="rounded-full border px-4 py-1.5 text-[12px] font-light"
                        style={{ borderColor: C.line, color: "rgba(238,243,246,0.65)" }}>
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
      <section className="px-6 py-24 md:px-10 md:py-32" style={{ background: C.cool, color: C.night }}>
        <div className="mx-auto max-w-[1280px]">
          <Reveal>
            <p className="flex items-center gap-3 text-[11px] font-semibold uppercase tracking-[0.3em]"
              style={{ color: C.it }}>
              <span className="h-px w-8" style={{ background: C.it }} />
              O que está incluído
            </p>
            <h2 className="mt-4 font-display text-[clamp(1.8rem,3.6vw,3rem)] font-light leading-[1.1]">
              A AONIK resolve por você
            </h2>
          </Reveal>

          <div className="mt-12 grid gap-8 md:grid-cols-[3fr_2fr]">
            {/* incluído — destaque */}
            <Reveal>
              <div className="grid gap-3 sm:grid-cols-2">
                {INCLUIDO.map((item) => (
                  <div key={item.cat}
                    className="flex gap-4 rounded-2xl bg-white p-5 shadow-[0_2px_16px_rgba(15,28,38,0.06)]">
                    <span className="text-2xl shrink-0">{item.icon}</span>
                    <div>
                      <p className="text-[11px] font-semibold uppercase tracking-[0.14em] mb-1"
                        style={{ color: C.ch }}>{item.cat}</p>
                      <p className="text-[13px] font-light leading-relaxed"
                        style={{ color: "rgba(15,28,38,0.7)" }}>{item.text}</p>
                    </div>
                  </div>
                ))}
              </div>
            </Reveal>

            {/* não incluído + cancelamento */}
            <Reveal delay={0.1}>
              <div className="flex flex-col gap-6">
                {/* não incluído */}
                <div className="rounded-2xl p-6" style={{ background: "rgba(15,28,38,0.05)" }}>
                  <p className="text-[11px] font-semibold uppercase tracking-[0.2em] mb-4"
                    style={{ color: C.it }}>Não está incluído</p>
                  <ul className="space-y-3">
                    {NAO_INCLUIDO.map((item) => (
                      <li key={item} className="flex items-start gap-3 text-[13px] font-light"
                        style={{ color: "rgba(15,28,38,0.65)" }}>
                        <span className="mt-0.5 shrink-0 text-[11px]" style={{ color: C.it }}>—</span>
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>

                {/* cancelamento */}
                <div className="rounded-2xl p-6" style={{ background: "rgba(15,28,38,0.05)" }}>
                  <p className="text-[11px] font-semibold uppercase tracking-[0.2em] mb-4"
                    style={{ color: "rgba(15,28,38,0.4)" }}>Política de cancelamento</p>
                  <div className="space-y-2">
                    {CANCELAMENTO.map((row) => (
                      <div key={row.prazo} className="flex items-center justify-between text-[12px]">
                        <span style={{ color: "rgba(15,28,38,0.55)" }}>{row.prazo}</span>
                        <span className="font-semibold" style={{ color: C.night }}>{row.multa}</span>
                      </div>
                    ))}
                  </div>
                  <p className="mt-4 text-[11px] leading-relaxed"
                    style={{ color: "rgba(15,28,38,0.4)" }}>
                    Cancelamentos por condições climáticas extremas ou força maior oferecem crédito total para outra data ou destino TARGET.
                  </p>
                </div>

                {/* nota seguro */}
                <div className="rounded-2xl border px-5 py-4 text-[12px] font-light leading-relaxed"
                  style={{ borderColor: C.wood, color: "rgba(15,28,38,0.6)" }}>
                  <span className="font-semibold" style={{ color: C.wood }}>Seguro viagem:</span>{" "}
                  obrigatório para esportes de aventura. A TARGET orienta as melhores opções do mercado para este roteiro.
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ===== PRÓXIMAS SAÍDAS (datas + reservar) ===== */}
      <section className="px-6 py-24 md:px-10 md:py-32" style={{ background: C.night, color: C.snow }}>
        <div className="mx-auto max-w-[1100px]">
          <div className="flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
            <Reveal>
              <p className="flex items-center gap-3 text-[11px] font-semibold uppercase tracking-[0.3em]"
                style={{ color: C.it }}>
                <span className="h-px w-8" style={{ background: C.it }} />
                Próximas saídas em grupo
              </p>
              <h2 className="mt-5 font-display text-[clamp(1.8rem,3.6vw,3rem)] font-light leading-[1.1]">
                Reserve sua vaga
              </h2>
              <p className="mt-3 max-w-md text-[14px] font-light leading-relaxed text-white/60">
                Saídas guiadas, grupo pequeno, {TMB_GRUPO.duration}. {TMB_GRUPO.priceFrom}.
              </p>
            </Reveal>
            <Reveal delay={0.1}>
              <a href="#contato"
                className="inline-flex items-center gap-3 rounded-full px-8 py-4 text-[13px] font-semibold uppercase tracking-[0.16em] transition-transform duration-300 hover:scale-[1.03]"
                style={{ background: C.wood, color: C.night }}>
                Reservar minha vaga <span>→</span>
              </a>
            </Reveal>
          </div>

          <div className="mt-12 grid gap-6 sm:grid-cols-2">
            {([2026, 2027] as const).map((ano) => {
              const datas = ano === 2026 ? TMB_GRUPO.dates2026 : TMB_GRUPO.dates2027;
              return (
                <Reveal key={ano} delay={0.05}>
                  <div className="rounded-xl border border-white/10 bg-white/5 p-7">
                    <p className="font-display text-3xl font-light" style={{ color: C.fr }}>{ano}</p>
                    <div className="mt-4 flex flex-wrap gap-2">
                      {(datas ?? []).map((d) => (
                        <span key={d}
                          className="rounded-full border border-white/15 px-4 py-1.5 text-[13px] font-medium"
                          style={{ color: C.snow }}>
                          {d}
                        </span>
                      ))}
                    </div>
                    <div className="mt-4 flex items-center gap-2">
                      <span className="h-1.5 w-1.5 rounded-full animate-pulse" style={{ background: C.ch }} />
                      <p className="text-[12px] font-semibold uppercase tracking-[0.12em]"
                        style={{ color: C.ch }}>Saída confirmada</p>
                    </div>
                  </div>
                </Reveal>
              );
            })}
          </div>

          <Reveal delay={0.15}>
            <div className="mt-10 border-t pt-10" style={{ borderColor: "rgba(217,140,74,0.3)" }}>
              <div className="overflow-hidden rounded-2xl" style={{ border: `1px solid rgba(217,140,74,0.28)`, backgroundColor: "rgba(217,140,74,0.04)" }}>
                <div className="flex flex-wrap items-center justify-between gap-2 px-6 py-4" style={{ borderBottom: `1px solid rgba(217,140,74,0.18)` }}>
                  <span className="text-[10px] font-bold uppercase tracking-[0.22em]" style={{ color: C.wood }}>Tarifas · Temporada 2027</span>
                  <span className="text-[10px] font-medium uppercase tracking-[0.14em]" style={{ color: "rgba(238,243,246,0.55)" }}>Promoção válida até 30 de setembro de 2027</span>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2">
                  <div className="p-6" style={{ borderRight: `1px solid rgba(217,140,74,0.14)`, borderBottom: `1px solid rgba(217,140,74,0.14)` }}>
                    <p className="text-[10px] font-semibold uppercase tracking-[0.22em]" style={{ color: "rgba(238,243,246,0.55)" }}>Tarifa Temporada 2027</p>
                    <p className="mt-4 font-display font-light" style={{ fontSize: "clamp(1.8rem,3vw,2.4rem)", color: C.snow }}>€ 5.900</p>
                    <p className="text-[12px]" style={{ color: "rgba(238,243,246,0.55)" }}>por pessoa · habitação dupla</p>
                    <p className="mt-3 text-[12px] font-light leading-relaxed" style={{ color: "rgba(238,243,246,0.55)" }}>30% de entrada + saldo em parcelas no cartão.</p>
                    <p className="mt-1 text-[11px] font-light italic" style={{ color: "rgba(238,243,246,0.35)" }}>Valor em Euro, base Euro Turismo no fechamento.</p>
                  </div>
                  <div className="p-6" style={{ backgroundColor: "rgba(217,140,74,0.08)" }}>
                    <div className="flex flex-wrap items-center justify-between gap-2">
                      <p className="text-[10px] font-semibold uppercase tracking-[0.22em]" style={{ color: C.wood }}>Early Booking</p>
                      <span className="rounded-full px-2.5 py-0.5 text-[10px] font-bold uppercase" style={{ backgroundColor: "rgba(217,140,74,0.18)", color: C.wood }}>reserva antecipada</span>
                    </div>
                    <p className="mt-4 font-display font-light" style={{ fontSize: "clamp(1.8rem,3vw,2.4rem)", color: C.snow }}>€ 5.450</p>
                    <p className="text-[12px]" style={{ color: "rgba(238,243,246,0.55)" }}>por pessoa · habitação dupla</p>
                    <p className="mt-3 text-[12px] font-light leading-relaxed" style={{ color: "rgba(238,243,246,0.55)" }}>20% de entrada + saldo em 7 parcelas sem juros.</p>
                    <p className="mt-1 text-[11px] font-light italic" style={{ color: "rgba(238,243,246,0.35)" }}>Entrada em Pix/transferência, parcelas no cartão.</p>
                  </div>
                </div>
              </div>
              <div className="mt-6 flex justify-center sm:justify-end">
                <a href="#contato" className="inline-flex items-center gap-3 rounded-full px-8 py-4 text-[13px] font-semibold uppercase tracking-[0.16em] transition-transform duration-300 hover:scale-[1.03]" style={{ background: C.wood, color: C.night }}>
                  Falar com a equipe &#8594;
                </a>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ===== AONIKIA DO PRODUTO ===== */}
      <section className="px-6 py-20 md:px-10 md:py-24" style={{ background: C.granite }}>
        <div className="mx-auto max-w-[860px] text-center">
          <Reveal>
            <p className="text-[11px] font-semibold uppercase tracking-[0.3em]" style={{ color: C.wood }}>
              AonikIA · especialista neste circuito
            </p>
            <h2 className="mt-5 font-display text-[clamp(1.8rem,3.5vw,2.8rem)] font-light leading-[1.15]"
              style={{ color: C.snow }}>
              Da preparação física à melhor época
            </h2>
            <p className="mx-auto mt-4 max-w-md text-[15px] font-light leading-relaxed text-white/65">
              Sentido horário ou anti-horário? Refúgios ou hotéis? A AonikIA
              conhece cada col deste anel e já te conecta com um especialista.
            </p>
            <a href="#contato"
              className="mt-7 inline-flex items-center gap-3 rounded-full border px-7 py-3.5 text-[12px] font-semibold uppercase tracking-[0.16em] transition-all duration-300"
              style={{ borderColor: C.wood, color: C.wood }}>
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
