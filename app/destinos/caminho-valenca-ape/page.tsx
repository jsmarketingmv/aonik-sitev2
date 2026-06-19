"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Nav from "../../components/Nav";
import Footer from "../../components/Footer";
import Contato from "../../components/Contato";
import FloatingActions from "../../components/FloatingActions";
import { Reveal, EASE } from "../../components/ui";

/* ================================================================
   CAMINHO VALENÇA A PÉ — Valença → Santiago de Compostela
   A versão compacta: começa na fronteira do Rio Minho
   Paleta oficial Santiago
   ================================================================ */
const S = {
  white:       "#FFFFFF",
  sun:         "#F2A900",
  ocean:       "#003087",
  sand:        "#FFE264",
  sky:         "#307FE2",
  midnight:    "#00205B",
  black:       "#050913",
  onDark:      "#FFFFFF",
  onDarkSoft:  "rgba(255,255,255,0.65)",
  onLight:     "#00205B",
  onLightSoft: "rgba(0,32,91,0.60)",
  sunLine:     "rgba(242,169,0,0.22)",
  skyLine:     "rgba(48,127,226,0.18)",
  wLine:       "rgba(255,255,255,0.14)",
};

const wix = (id: string, w = 1920, h = 1080) =>
  `https://static.wixstatic.com/media/${id}/v1/fill/w_${w},h_${h},q_90,enc_avif,quality_auto/${id}`;

const HERO = wix("2d4f5b_596f7144ab49417692221a0fa9dab404~mv2.jpg");

const GALERIA = [
  { src: wix("2d4f5b_596f7144ab49417692221a0fa9dab404~mv2.jpg", 900, 600), tag: "Valença", cap: "A cidadela abaluartada de Valença com vista do Rio Minho e da Galiza logo ali do outro lado." },
  { src: wix("2d4f5b_6fe79078b70b4c4398bd9e601646fcdd~mv2.jpeg", 900, 600), tag: "Galiza", cap: "Do Rio Minho até Santiago, seis dias de caminhada pela Galiza mais autêntica." },
  { src: wix("2d4f5b_80e678e6de65425f90c4b56c6f998776~mv2.jpg", 900, 600), tag: "Santiago de Compostela", cap: "121 quilômetros de jornada culminam na Praça do Obradoiro e na Catedral." },
  { src: wix("2d4f5b_920e9f2265b149e69fcc012023b5026d~mv2.jpg", 900, 600), tag: "O Caminho", cap: "A seta amarela aparece em cada encruzilhada. Basta seguir." },
  { src: wix("2d4f5b_b673e91a63554b5e9fb4a39b74af2728~mv2.jpg", 900, 600), tag: "Portugal", cap: "O trajeto até Valença pode ser combinado com uma estada em Portugal antes da jornada." },
  { src: wix("2d4f5b_3405d40f96d84d289904dccd31fcba12~mv2.jpg", 900, 600), tag: "Norte de Portugal", cap: "A região do Alto Minho, vizinha de Valença, é um dos segredos mais bem guardados da Europa." },
];

const ETAPAS = [
  { dia: "DIA 1", titulo: "Chegada a Valença",          km: "",      desc: "Recepção no hotel, entrega da credencial do peregrino e briefing completo com a equipe AONIK. Tempo livre para conhecer a cidadela histórica." },
  { dia: "DIA 2", titulo: "Valença → O Porriño",        km: "20 km", desc: "Travessia do Rio Minho pela Ponte Internacional. Chegada a Tui, com sua catedral medieval imponente. Descida pelo vale do Louro até O Porriño." },
  { dia: "DIA 3", titulo: "O Porriño → Arcade",         km: "22 km", desc: "Redondela e seus viadutos sobre a Ria de Vigo. Outeiro de Penas e chegada a Arcade, famosa pelas melhores ostras da Galiza." },
  { dia: "DIA 4", titulo: "Arcade → Pontevedra",        km: "13 km", desc: "Ponte medieval de Pontesampaio sobre o Rio Verdugo. Calçada histórica de Cacheiro. Chegada ao centro histórico de Pontevedra, cidade medieval sem carros." },
  { dia: "DIA 5", titulo: "Pontevedra → Caldas de Reis", km: "22 km",desc: "Vale do Rio Granda, cruzeiros esculpidos em granito. Chegada à cidade termal de Caldas de Reis com suas fontes de água quente natural." },
  { dia: "DIA 6", titulo: "Caldas de Reis → Padrón",    km: "19 km", desc: "Ponte medieval sobre o Rio Bermaña. A lenda do Apóstolo e a barca de pedra que aportou há 2.000 anos. Padrão: onde o Caminho ganha profundidade espiritual." },
  { dia: "DIA 7", titulo: "Padrón → Santiago",          km: "25 km", desc: "A etapa final. Entrada pela cidade medieval, Rúa do Vilar e a chegada à Praça do Obradoiro. A Compostela nas mãos. A emoção que não tem palavras." },
  { dia: "DIA 8", titulo: "Partida de Santiago",        km: "",      desc: "Café da manhã no hotel, últimas memórias e deslocamento ao aeroporto." },
];

const INCLUSOS = [
  "7 noites em hotéis 3 estrelas selecionados",
  "Café da manhã em todos os alojamentos",
  "Transporte de bagagem entre cada alojamento (1 mala por pessoa)",
  "Credencial do Peregrino oficial",
  "Roadbook impresso do Caminho Português",
  "Assistência telefônica de emergência 24 horas",
  "Suporte AONIK antes, durante e após a viagem",
];

const NAO_INCLUSOS = [
  "Passagens aéreas internacionais",
  "Transfers aeroportuários",
  "Seguro viagem",
  "Almoços e jantares",
  "Bebidas e gorjetas",
];

const TARIFAS = [
  { temporada: "Média", periodo: "Mar, Abr, Mai e Out", duplo: "€ 810",  single: "+ € 402" },
  { temporada: "Alta",  periodo: "Jun, Jul, Ago e Set", duplo: "€ 861",  single: "+ € 440" },
];

/* ── SVG: Valença → Santiago (rota compacta + ponte Rio Minho) ─ */
function RotaValenca({ size = 280 }: { size?: number }) {
  const pts: [number, number, string][] = [
    [28,  158, "Valença"],
    [88,  122, "O Porriño"],
    [128,  90, "Arcade"],
    [158,  68, "Pontevedra"],
    [185,  48, "Caldas"],
    [204,  32, "Padrón"],
    [228,  18, "Santiago"],
  ];
  const d = pts.map(([x, y], i) => (i === 0 ? `M ${x} ${y}` : `L ${x} ${y}`)).join(" ");
  /* Ponte estilizada sobre o Rio Minho */
  const bridgeX = 48, bridgeY = 142, bridgeW = 26;
  return (
    <svg viewBox="0 0 260 180" width={size} height={size * (180 / 260)} className="drop-shadow-xl">
      {/* Rio Minho — linha azul horizontal */}
      <motion.rect x="0" y={bridgeY - 6} width="260" height="10" rx="2"
        fill={`rgba(48,127,226,0.10)`}
        initial={{ opacity: 0 }} animate={{ opacity: 1 }}
        transition={{ duration: 1, ease: EASE }} />
      <motion.line x1="0" y1={bridgeY - 2} x2="260" y2={bridgeY - 2}
        stroke={S.sky} strokeWidth="1.5" strokeDasharray="4 3"
        initial={{ pathLength: 0 }} animate={{ pathLength: 1 }}
        transition={{ duration: 1.2, ease: EASE }} />
      <text x="200" y={bridgeY + 8} fontSize="7" fill={S.sky}
        fontFamily="sans-serif" opacity={0.6}>Rio Minho</text>
      {/* Ponte */}
      <motion.path d={`M ${bridgeX - bridgeW / 2} ${bridgeY + 2} Q ${bridgeX} ${bridgeY - 10} ${bridgeX + bridgeW / 2} ${bridgeY + 2}`}
        fill="none" stroke={S.sun} strokeWidth="2"
        initial={{ pathLength: 0 }} animate={{ pathLength: 1 }}
        transition={{ duration: 0.8, ease: EASE, delay: 0.5 }} />
      <line x1={bridgeX - bridgeW / 2} y1={bridgeY - 1} x2={bridgeX + bridgeW / 2} y2={bridgeY - 1}
        stroke={S.sun} strokeWidth="0.8" />
      {[3, 9, 15, 21].map(dx => (
        <line key={dx} x1={bridgeX - bridgeW / 2 + dx} y1={bridgeY - 1}
          x2={bridgeX - bridgeW / 2 + dx} y2={bridgeY + 2}
          stroke={S.sun} strokeWidth="0.6" opacity={0.6} />
      ))}
      {/* Rota */}
      <motion.path d={d} fill="none" stroke={S.sunLine} strokeWidth="3.5"
        strokeDasharray="6 4" strokeLinecap="round"
        initial={{ pathLength: 0 }} animate={{ pathLength: 1 }}
        transition={{ duration: 2, ease: EASE, delay: 0.6 }} />
      <motion.path d={d} fill="none" stroke={S.sun} strokeWidth="2"
        strokeDasharray="6 4" strokeLinecap="round"
        initial={{ pathLength: 0 }} animate={{ pathLength: 1 }}
        transition={{ duration: 2, ease: EASE, delay: 0.8 }} />
      {/* Waypoints */}
      {pts.map(([x, y, label], i) => (
        <motion.g key={i}
          initial={{ opacity: 0, scale: 0.6 }} animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, ease: EASE, delay: 0.8 + i * 0.2 }}>
          <circle cx={x} cy={y} r={i === 0 || i === pts.length - 1 ? 6 : 3.5}
            fill={i === pts.length - 1 ? S.sun : i === 0 ? S.sky : "#ffffff22"}
            stroke={i === pts.length - 1 ? S.sand : S.sky}
            strokeWidth="1.5" />
          {i === pts.length - 1 && (
            <text x={x + 9} y={y + 4} fontSize="9" fontWeight="700"
              fill={S.sun} fontFamily="sans-serif" letterSpacing="0.06em">SANTIAGO</text>
          )}
          {i === 0 && (
            <text x={x - 2} y={y + 14} fontSize="8" fill={S.sky}
              fontFamily="sans-serif" textAnchor="middle">Valença</text>
          )}
        </motion.g>
      ))}
      <text x="130" y="174" fontSize="8" fill={S.onDarkSoft}
        fontFamily="sans-serif" textAnchor="middle" letterSpacing="0.2em">
        121 km · COMEÇA NA FRONTEIRA
      </text>
    </svg>
  );
}

/* ── Galeria Interativa ─────────────────────────────────────── */
function GaleriaInterativa() {
  const [idx, setIdx] = useState(0);
  const img = GALERIA[idx];
  return (
    <div className="flex flex-col gap-3">
      <div className="relative overflow-hidden rounded-2xl" style={{ aspectRatio: "16/10" }}>
        <AnimatePresence mode="wait">
          <motion.div key={idx}
            initial={{ opacity: 0.5, scale: 1.03 }} animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }} transition={{ duration: 0.4, ease: EASE }}
            className="absolute inset-0">
            <img src={img.src} alt={img.cap} className="h-full w-full object-cover" />
          </motion.div>
        </AnimatePresence>
        <div className="absolute inset-0" style={{ background: `linear-gradient(to top, ${S.midnight}cc 0%, transparent 55%)` }} />
        <div className="absolute bottom-0 left-0 right-0 p-6">
          <span className="text-[10px] font-semibold uppercase tracking-[0.32em]" style={{ color: S.sun }}>{img.tag}</span>
          <p className="mt-1 text-[14px] font-light" style={{ color: S.onDark }}>{img.cap}</p>
        </div>
        <span className="absolute right-4 top-4 text-[11px] font-medium" style={{ color: "rgba(255,255,255,0.45)" }}>{idx + 1} / {GALERIA.length}</span>
        <button onClick={() => setIdx(i => (i - 1 + GALERIA.length) % GALERIA.length)}
          className="absolute left-4 top-1/2 -translate-y-1/2 flex h-10 w-10 items-center justify-center rounded-full text-base transition-opacity hover:opacity-100"
          style={{ background: "rgba(0,32,91,0.6)", color: S.sun, opacity: 0.8 }}>‹</button>
        <button onClick={() => setIdx(i => (i + 1) % GALERIA.length)}
          className="absolute right-4 top-1/2 -translate-y-1/2 flex h-10 w-10 items-center justify-center rounded-full text-base transition-opacity hover:opacity-100"
          style={{ background: "rgba(0,32,91,0.6)", color: S.sun, opacity: 0.8 }}>›</button>
      </div>
      <div className="grid grid-cols-6 gap-2">
        {GALERIA.map((g, i) => (
          <button key={i} onClick={() => setIdx(i)}
            className="relative overflow-hidden rounded-lg transition-all duration-300"
            style={{ aspectRatio: "16/10", outline: i === idx ? `2px solid ${S.sun}` : "2px solid transparent", outlineOffset: 2 }}>
            <img src={g.src} alt={g.cap} className="h-full w-full object-cover transition-opacity duration-300"
              style={{ opacity: i === idx ? 1 : 0.4 }} />
          </button>
        ))}
      </div>
    </div>
  );
}

export default function CaminhoValencaApePage() {
  const [tarifa, setTarifa] = useState(0);
  const [etapaAberta, setEtapaAberta] = useState<number | null>(null);

  return (
    <main className="relative" style={{ backgroundColor: S.midnight }}>
      <Nav />

      {/* ── HERO ─────────────────────────────────────────────── */}
      <section className="relative flex min-h-[100svh] w-full items-end overflow-hidden" style={{ backgroundColor: S.black }}>
        <div className="absolute inset-0">
          <img src={HERO} alt="Caminho de Valença a Santiago" className="h-full w-full object-cover" style={{ opacity: 0.45 }} />
          <div className="absolute inset-0" style={{ background: `linear-gradient(135deg, ${S.midnight}e0 0%, ${S.black}88 50%, transparent 100%)` }} />
        </div>
        <div className="relative z-10 mx-auto w-full max-w-7xl px-6 pb-16 pt-32 md:grid md:grid-cols-2 md:items-end md:gap-12">
          <div>
            <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, ease: EASE }}>
              <span className="inline-flex items-center gap-2 rounded-full px-3 py-1 text-[10px] font-bold uppercase tracking-[0.22em]"
                style={{ backgroundColor: "rgba(242,169,0,0.15)", color: S.sun, border: `1px solid rgba(242,169,0,0.3)` }}>
                Caminho Português · A Pé
              </span>
            </motion.div>
            <motion.h1 className="mt-4 font-display text-[3rem] font-light leading-[1.07] md:text-[4.2rem]"
              style={{ color: S.white }}
              initial={{ opacity: 0, y: 28 }} animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, ease: EASE, delay: 0.1 }}>
              Caminho Valença
            </motion.h1>
            <motion.p className="mt-3 text-[1.2rem] font-light" style={{ color: S.sand }}
              initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, ease: EASE, delay: 0.2 }}>
              Começa na fronteira do Rio Minho. A versão mais acessível do Caminho Português.
            </motion.p>
            <motion.div className="mt-6 flex flex-wrap gap-4 text-[13px]"
              initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, ease: EASE, delay: 0.3 }}>
              {[["121 km", "Distância total"], ["8 dias", "Duração"], ["a partir de € 810", "Preço p.p."]].map(([v, l]) => (
                <div key={l} className="flex flex-col gap-0.5">
                  <span className="font-semibold" style={{ color: S.sun }}>{v}</span>
                  <span style={{ color: S.onDarkSoft }}>{l}</span>
                </div>
              ))}
            </motion.div>
            <motion.div className="mt-8 flex flex-wrap gap-3"
              initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, ease: EASE, delay: 0.4 }}>
              <a href="#contato" className="rounded-full px-7 py-3 text-[14px] font-semibold transition-all hover:brightness-110"
                style={{ backgroundColor: S.sun, color: S.midnight }}>
                Reservar Minha Vaga
              </a>
              <a href="https://wa.me/5548988160000" target="_blank" rel="noopener noreferrer"
                className="rounded-full px-7 py-3 text-[14px] font-medium transition-all hover:brightness-110"
                style={{ backgroundColor: "rgba(255,255,255,0.1)", color: S.white, border: `1px solid ${S.wLine}` }}>
                Falar no WhatsApp
              </a>
            </motion.div>
          </div>
          <motion.div className="mt-12 flex items-center justify-center md:mt-0"
            initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.2, ease: EASE, delay: 0.3 }}>
            <RotaValenca size={320} />
          </motion.div>
        </div>
      </section>

      {/* ── SOBRE ────────────────────────────────────────────── */}
      <section className="py-24" style={{ backgroundColor: S.white }}>
        <div className="mx-auto max-w-7xl px-6">
          <div className="md:grid md:grid-cols-2 md:gap-16 md:items-center">
            <Reveal>
              <span className="text-[10px] font-bold uppercase tracking-[0.28em]" style={{ color: S.sky }}>
                Começa na fronteira
              </span>
              <h2 className="mt-3 font-display text-[2.4rem] font-light leading-tight" style={{ color: S.midnight }}>
                121 km. O Caminho do seu ritmo.
              </h2>
              <p className="mt-5 text-[15px] font-light leading-relaxed" style={{ color: S.onLightSoft }}>
                O Caminho Valença começa onde Portugal termina e a Espanha começa. Você atravessa a Ponte Internacional sobre o Rio Minho, entra em Tui e percorre os últimos 121 quilômetros do Caminho Português até a Catedral de Santiago.
              </p>
              <p className="mt-4 text-[15px] font-light leading-relaxed" style={{ color: S.onLightSoft }}>
                É a versão mais acessível e compacta do Caminho Português. Ideal para quem tem menos tempo disponível, está realizando o Caminho pela primeira vez, ou quer vivenciar a essência da jornada sem abrir mão da experiência completa de chegada à Catedral.
              </p>
              <div className="mt-8 grid grid-cols-3 gap-6">
                {[["Iniciantes", "Nível ideal"], ["Mar a Out", "Época"], ["6 dias", "Caminhada"]].map(([v, l]) => (
                  <div key={l}>
                    <p className="text-[1.2rem] font-semibold" style={{ color: S.ocean }}>{v}</p>
                    <p className="text-[12px] mt-0.5" style={{ color: S.onLightSoft }}>{l}</p>
                  </div>
                ))}
              </div>
            </Reveal>
            <Reveal delay={0.15}>
              <div className="mt-10 overflow-hidden rounded-2xl md:mt-0" style={{ aspectRatio: "4/3" }}>
                <img src={wix("2d4f5b_6fe79078b70b4c4398bd9e601646fcdd~mv2.jpeg", 800, 600)}
                  alt="Caminho Português na Galiza"
                  className="h-full w-full object-cover" />
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ── DESTAQUES ────────────────────────────────────────── */}
      <section className="py-20" style={{ backgroundColor: S.sky }}>
        <div className="mx-auto max-w-7xl px-6">
          <Reveal>
            <h2 className="font-display text-[2.2rem] font-light" style={{ color: S.midnight }}>
              Por que começar em Valença
            </h2>
          </Reveal>
          <div className="mt-10 grid gap-6 md:grid-cols-3">
            {[
              { n: "01", t: "Apenas 8 dias", d: "6 dias de caminhada + chegada e partida. Compatível com folgas de trabalho ou uma semana de férias." },
              { n: "02", t: "Compostela garantida", d: "121 km é a distância mínima para receber a Compostela. Você caminha o suficiente, sem excessos." },
              { n: "03", t: "Galiza autêntica", d: "Tuy, Pontevedra, Padrón e Santiago. Os pontos mais ricos culturalmente do Caminho Português, concentrados nesta rota." },
            ].map((p, i) => (
              <Reveal key={i} delay={i * 0.1}>
                <div className="rounded-2xl p-6" style={{ backgroundColor: "rgba(0,32,91,0.1)" }}>
                  <span className="text-[2rem] font-light" style={{ color: S.midnight, opacity: 0.25 }}>{p.n}</span>
                  <h3 className="mt-2 font-display text-[1.3rem] font-light" style={{ color: S.midnight }}>{p.t}</h3>
                  <p className="mt-2 text-[14px] font-light leading-relaxed" style={{ color: S.onLight, opacity: 0.7 }}>{p.d}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── ITINERÁRIO ───────────────────────────────────────── */}
      <section className="py-24" style={{ backgroundColor: S.midnight }}>
        <div className="mx-auto max-w-4xl px-6">
          <Reveal>
            <h2 className="font-display text-[2.4rem] font-light" style={{ color: S.white }}>
              Roteiro dia a dia
            </h2>
            <p className="mt-2 text-[14px]" style={{ color: S.onDarkSoft }}>
              8 dias · 6 etapas de caminhada · Valença até Santiago
            </p>
          </Reveal>
          <div className="mt-10 flex flex-col gap-2">
            {ETAPAS.map((e, i) => (
              <Reveal key={i} delay={i * 0.05}>
                <button
                  onClick={() => setEtapaAberta(etapaAberta === i ? null : i)}
                  className="w-full text-left rounded-xl px-5 py-4 transition-all duration-300"
                  style={{
                    backgroundColor: etapaAberta === i ? "rgba(48,127,226,0.12)" : "rgba(255,255,255,0.04)",
                    border: `1px solid ${etapaAberta === i ? S.skyLine : S.wLine}`,
                  }}>
                  <div className="flex items-center justify-between gap-4">
                    <div className="flex items-center gap-4">
                      <span className="text-[10px] font-bold tracking-[0.18em]" style={{ color: S.sky }}>{e.dia}</span>
                      <span className="text-[15px] font-light" style={{ color: S.white }}>{e.titulo}</span>
                    </div>
                    <div className="flex items-center gap-3 shrink-0">
                      {e.km && <span className="text-[12px]" style={{ color: S.sun }}>{e.km}</span>}
                      <span className="text-[18px] font-light transition-transform duration-300"
                        style={{ color: S.sky, transform: etapaAberta === i ? "rotate(45deg)" : "rotate(0deg)" }}>+</span>
                    </div>
                  </div>
                  {etapaAberta === i && (
                    <motion.p className="mt-3 text-[14px] font-light leading-relaxed"
                      style={{ color: S.onDarkSoft }}
                      initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.35, ease: EASE }}>
                      {e.desc}
                    </motion.p>
                  )}
                </button>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── GALERIA ──────────────────────────────────────────── */}
      <section className="py-24" style={{ backgroundColor: S.white }}>
        <div className="mx-auto max-w-5xl px-6">
          <Reveal>
            <h2 className="font-display text-[2.4rem] font-light" style={{ color: S.midnight }}>
              O Caminho em imagens
            </h2>
          </Reveal>
          <div className="mt-10">
            <GaleriaInterativa />
          </div>
        </div>
      </section>

      {/* ── INCLUSO ──────────────────────────────────────────── */}
      <section className="py-24" style={{ backgroundColor: S.ocean }}>
        <div className="mx-auto max-w-7xl px-6">
          <Reveal>
            <h2 className="font-display text-[2.4rem] font-light" style={{ color: S.white }}>
              O que está incluso
            </h2>
          </Reveal>
          <div className="mt-10 md:grid md:grid-cols-2 md:gap-12">
            <Reveal>
              <div>
                <h3 className="text-[12px] font-bold uppercase tracking-[0.22em]" style={{ color: S.sun }}>Incluso</h3>
                <ul className="mt-5 flex flex-col gap-3">
                  {INCLUSOS.map((item, i) => (
                    <li key={i} className="flex items-start gap-3 text-[14px] font-light leading-relaxed" style={{ color: S.onDark }}>
                      <span className="mt-0.5 shrink-0 text-[16px]" style={{ color: S.sun }}>✓</span>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
            <Reveal delay={0.1}>
              <div className="mt-10 md:mt-0">
                <h3 className="text-[12px] font-bold uppercase tracking-[0.22em]" style={{ color: S.sand }}>Não incluso</h3>
                <ul className="mt-5 flex flex-col gap-3">
                  {NAO_INCLUSOS.map((item, i) => (
                    <li key={i} className="flex items-start gap-3 text-[14px] font-light leading-relaxed" style={{ color: "rgba(255,255,255,0.6)" }}>
                      <span className="mt-0.5 shrink-0" style={{ color: "rgba(255,255,255,0.3)" }}>–</span>
                      {item}
                    </li>
                  ))}
                </ul>
                <div className="mt-8 rounded-xl p-5" style={{ backgroundColor: "rgba(255,255,255,0.07)", border: `1px solid ${S.wLine}` }}>
                  <p className="text-[13px] font-light leading-relaxed" style={{ color: S.onDarkSoft }}>
                    Programa 100% autoguiado. Você caminha no seu ritmo, com suporte AONIK disponível a qualquer momento.
                  </p>
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ── TARIFAS ──────────────────────────────────────────── */}
      <section className="py-24" style={{ backgroundColor: S.midnight }}>
        <div className="mx-auto max-w-3xl px-6">
          <Reveal>
            <h2 className="font-display text-[2.4rem] font-light" style={{ color: S.white }}>Tarifas 2026</h2>
            <p className="mt-2 text-[14px]" style={{ color: S.onDarkSoft }}>Por pessoa · Cotação em euros · Parcelamento disponível</p>
          </Reveal>
          <Reveal delay={0.1}>
            <div className="mt-8 inline-flex rounded-full p-1" style={{ backgroundColor: "rgba(255,255,255,0.07)", border: `1px solid ${S.wLine}` }}>
              {TARIFAS.map((t, i) => (
                <button key={i} onClick={() => setTarifa(i)}
                  className="rounded-full px-6 py-2 text-[13px] font-medium transition-all duration-200"
                  style={{
                    backgroundColor: tarifa === i ? S.sun : "transparent",
                    color: tarifa === i ? S.midnight : S.onDarkSoft,
                  }}>
                  {t.temporada}
                </button>
              ))}
            </div>
          </Reveal>
          <Reveal delay={0.15}>
            <div className="mt-6 overflow-hidden rounded-2xl" style={{ border: `1px solid ${S.wLine}` }}>
              <div className="p-4 text-[12px] font-medium uppercase tracking-[0.18em]"
                style={{ backgroundColor: "rgba(242,169,0,0.1)", color: S.sun, borderBottom: `1px solid ${S.wLine}` }}>
                {TARIFAS[tarifa].temporada} · {TARIFAS[tarifa].periodo}
              </div>
              <div className="divide-y" style={{ borderColor: S.wLine }}>
                {[["Quarto duplo / casal", TARIFAS[tarifa].duplo], ["Suplemento quarto individual", TARIFAS[tarifa].single]].map(([label, preco]) => (
                  <div key={label} className="flex items-center justify-between px-5 py-4">
                    <span className="text-[14px] font-light" style={{ color: S.onDark }}>{label}</span>
                    <span className="text-[18px] font-semibold" style={{ color: S.sun }}>{preco}</span>
                  </div>
                ))}
              </div>
              <div className="px-5 py-4 text-[12px] font-light" style={{ color: S.onDarkSoft, borderTop: `1px solid ${S.wLine}` }}>
                Pagamento: 30% entrada + 5 parcelas sem juros · Saldo até 15 dias antes via Pix
              </div>
            </div>
          </Reveal>
          <Reveal delay={0.2}>
            <div className="mt-8 text-center">
              <a href="#contato" className="inline-block rounded-full px-10 py-4 text-[15px] font-semibold transition-all hover:brightness-110"
                style={{ backgroundColor: S.sun, color: S.midnight }}>
                Reservar Minha Vaga
              </a>
            </div>
          </Reveal>
        </div>
      </section>

      <Contato />
      <Footer />
      <FloatingActions />
    </main>
  );
}
