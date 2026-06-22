"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Nav from "../../components/Nav";
import Footer from "../../components/Footer";
import Contato from "../../components/Contato";
import FloatingActions from "../../components/FloatingActions";
import { Reveal, EASE } from "../../components/ui";

/* ================================================================
   CAMINHO DA COSTA A PÉ — Porto → Santiago pela costa atlântica
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

const HERO = wix("2d4f5b_3405d40f96d84d289904dccd31fcba12~mv2.jpg");

const GALERIA = [
  { src: wix("2d4f5b_3405d40f96d84d289904dccd31fcba12~mv2.jpg", 900, 600), tag: "Costa Atlântica", cap: "Praias douradas, vilarejos de pescadores e o Atlântico sempre à esquerda." },
  { src: wix("2d4f5b_880aab455e2a4f7b8dff665c9b83717a~mv2.jpg", 900, 600), tag: "Norte de Portugal", cap: "Viana do Castelo, Ponte de Eiffel e o Rio Lima antes da entrada na Galiza." },
  { src: wix("2d4f5b_6fe79078b70b4c4398bd9e601646fcdd~mv2.jpeg", 900, 600), tag: "Galiza", cap: "Após Vigo e Pontevedra, o Caminho da Costa se une ao Central para Santiago." },
  { src: wix("2d4f5b_80e678e6de65425f90c4b56c6f998776~mv2.jpg", 900, 600), tag: "Santiago de Compostela", cap: "Praça do Obradoiro. A emoção de chegada que nenhuma foto consegue capturar por inteiro." },
  { src: wix("2d4f5b_920e9f2265b149e69fcc012023b5026d~mv2.jpg", 900, 600), tag: "O Caminho", cap: "A seta amarela e a concha guiam o peregrino por 260 km de jornada atlântica." },
  { src: wix("2d4f5b_b673e91a63554b5e9fb4a39b74af2728~mv2.jpg", 900, 600), tag: "Portugal", cap: "Entre o mar e o granito, o Caminho da Costa revela uma costa que poucos viajantes conhecem." },
];

const ETAPAS = [
  { dia: "DIA 1",  titulo: "Chegada ao Porto",               km: "",       desc: "Recepção no hotel, entrega da credencial e briefing completo com a equipe AONIK." },
  { dia: "DIA 2",  titulo: "Porto (Matosinhos) → Vila do Conde", km: "20 km", desc: "Início na orla atlântica de Matosinhos. Transfer até a praia e caminhada pela costa com o mar ao lado o tempo todo." },
  { dia: "DIA 3",  titulo: "Vila do Conde → Esposende",      km: "25 km",  desc: "Passagem por Póvoa de Varzim e cruzamento do Rio Cávado. Dunas, praias e o primeiro sabor de liberdade costeira." },
  { dia: "DIA 4",  titulo: "Esposende → Viana do Castelo",   km: "23,5 km",desc: "Chegada a Viana do Castelo pela icônica Ponte de Gustave Eiffel sobre o Rio Lima. Cidade de arquitetura monumental e vistas para o estuário." },
  { dia: "DIA 5",  titulo: "Viana do Castelo → Vila Praia de Âncora", km: "19 km", desc: "Zona balnear de Carreço e Afife. Caminhada tranquila com praias e enseadas ao longo de toda a etapa." },
  { dia: "DIA 6",  titulo: "Vila Praia de Âncora → A Guarda", km: "15 km", desc: "Cruzamento do Rio Minho pela fronteira. Entrada em território galego. Monte Santa Tegra com vista de toda a ria." },
  { dia: "DIA 7",  titulo: "A Guarda → Oia",                 km: "13 km",  desc: "Mosteiro de Santa Maria de Oia, referência do Camino Monacal. Falésias e enseadas da Costa da Morte galega." },
  { dia: "DIA 8",  titulo: "Oia → Baiona",                   km: "17,5 km",desc: "Cabo Silleiro com suas falésias imponentes, vista das Ilhas Cíes ao longe. Chegada a Baiona, vila medieval que recebeu a primeira notícia do Novo Mundo." },
  { dia: "DIA 9",  titulo: "Baiona → Vigo",                  km: "25 km",  desc: "Vista panorâmica das Ilhas Cíes (Patrimônio da Humanidade). Chegada a Vigo, a maior cidade da Galiza." },
  { dia: "DIA 10", titulo: "Vigo → Arcade",                  km: "22 km",  desc: "Travessia da Ponte de Rande sobre a Ria de Vigo. O Caminho da Costa se encontra com o Caminho Central em Redondela." },
  { dia: "DIA 11", titulo: "Arcade → Pontevedra",            km: "13 km",  desc: "Ponte medieval de Pontesampayo e chegada ao centro histórico de Pontevedra, uma das cidades medievais mais bem preservadas da Galiza." },
  { dia: "DIA 12", titulo: "Pontevedra → Caldas de Reis",    km: "22 km",  desc: "Vale do Rio Lérez, primeiros cruzeiros esculpidos em granito. Caldas de Reis com suas fontes de água termal." },
  { dia: "DIA 13", titulo: "Caldas de Reis → Padrón",        km: "19 km",  desc: "Lenda do Apóstolo e da barca que aportou com seus restos. Ponte medieval sobre o Rio Bermaña." },
  { dia: "DIA 14", titulo: "Padrón → Santiago de Compostela", km: "25 km", desc: "A etapa final. Entrada pela Porta do Caminho, Rúa do Vilar e chegada à Praça do Obradoiro. A Compostela nas mãos." },
  { dia: "DIA 15", titulo: "Partida de Santiago",            km: "",       desc: "Café da manhã no hotel, últimas memórias e deslocamento ao aeroporto." },
];

const INCLUSOS = [
  "14 noites em hotéis 3 estrelas selecionados",
  "Café da manhã em todos os alojamentos",
  "Transfer Porto até Matosinhos (início do Caminho)",
  "Transporte de bagagem entre cada alojamento (1 mala por pessoa)",
  "Credencial do Peregrino oficial",
  "Roadbook impresso do Caminho Português",
  "Assistência telefônica de emergência 24 horas",
  "Suporte AONIK antes, durante e após a viagem",
];

const NAO_INCLUSOS = [
  "Passagens aéreas internacionais",
  "Transfer aeroporto Porto até o hotel",
  "Deslocamentos Santiago de Compostela até Porto",
  "Seguro viagem",
  "Almoços e jantares",
  "Bebidas e gorjetas",
];

const TARIFAS = [
  { temporada: "Baixa",  periodo: "Mar, Abr e Out",   duplo: "€ 1.498", single: "+ € 861" },
  { temporada: "Média",  periodo: "Mai, Jun e Set",   duplo: "€ 1.619", single: "+ € 918" },
  { temporada: "Alta",   periodo: "Jul e Ago",         duplo: "€ 1.785", single: "+ € 1.058" },
];

const TARIFAS_2027 = [
  { temporada: "Baixa",  periodo: "Mar, Abr e Out",   duplo: "€ 1.798", single: "+ € 1.033" },
  { temporada: "Média",  periodo: "Mai, Jun e Set",   duplo: "€ 1.943", single: "+ € 1.102" },
  { temporada: "Alta",   periodo: "Jul e Ago",         duplo: "€ 2.142", single: "+ € 1.270" },
];

/* ── SVG: Rota Costa (Porto → Santiago pela orla atlântica) ─── */
function RotaCosta({ size = 280 }: { size?: number }) {
  const pts: [number, number, string][] = [
    [28,  162, "Porto"],
    [22,  130, "Viana"],
    [18,  102, "A Guarda"],
    [30,   78, "Baiona"],
    [65,   60, "Vigo"],
    [110,  42, "Pontevedra"],
    [195,  22, "Santiago"],
  ];
  const d = pts.map(([x, y], i) => (i === 0 ? `M ${x} ${y}` : `L ${x} ${y}`)).join(" ");
  /* Ondas do Atlântico */
  const waves = [40, 65, 95, 125, 148].map(y =>
    `M 0 ${y} Q 6 ${y - 5} 12 ${y} Q 18 ${y + 5} 24 ${y}`
  );
  return (
    <svg viewBox="0 0 260 180" width={size} height={size * (180 / 260)} className="drop-shadow-xl">
      {/* Fundo oceano (esquerda) */}
      <rect x="0" y="0" width="18" height="180" fill={`rgba(48,127,226,0.08)`} />
      {/* Ondas */}
      {waves.map((w, i) => (
        <motion.path key={i} d={w} fill="none" stroke={S.sky} strokeWidth="1.2" opacity={0.4}
          initial={{ x: -6, opacity: 0 }} animate={{ x: 0, opacity: 0.4 }}
          transition={{ duration: 1.5, delay: i * 0.15, ease: EASE }} />
      ))}
      {/* Rota */}
      <motion.path d={d} fill="none" stroke={S.sunLine} strokeWidth="3.5"
        strokeDasharray="6 4" strokeLinecap="round"
        initial={{ pathLength: 0 }} animate={{ pathLength: 1 }}
        transition={{ duration: 2.4, ease: EASE, delay: 0.4 }} />
      <motion.path d={d} fill="none" stroke={S.sun} strokeWidth="2"
        strokeDasharray="6 4" strokeLinecap="round"
        initial={{ pathLength: 0 }} animate={{ pathLength: 1 }}
        transition={{ duration: 2.4, ease: EASE, delay: 0.6 }} />
      {/* Waypoints */}
      {pts.map(([x, y, label], i) => (
        <motion.g key={i}
          initial={{ opacity: 0, scale: 0.6 }} animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, ease: EASE, delay: 0.5 + i * 0.25 }}>
          <circle cx={x} cy={y} r={i === pts.length - 1 ? 7 : 4}
            fill={i === pts.length - 1 ? S.sun : S.sky}
            stroke={i === pts.length - 1 ? S.sand : S.ocean}
            strokeWidth="1.5" />
          {i === pts.length - 1 && (
            <text x={x + 11} y={y + 4} fontSize="9" fontWeight="700"
              fill={S.sun} fontFamily="sans-serif" letterSpacing="0.06em">SANTIAGO</text>
          )}
          {i === 0 && (
            <text x={x + 5} y={y + 12} fontSize="8" fill={S.onDarkSoft}
              fontFamily="sans-serif">Porto</text>
          )}
          {label === "A Guarda" && (
            <>
              <line x1={x + 4} y1={y} x2={x + 16} y2={y - 6} stroke={S.sky} strokeWidth="0.8" />
              <text x={x + 18} y={y - 8} fontSize="7" fill={S.sky} fontFamily="sans-serif">Fronteira</text>
            </>
          )}
        </motion.g>
      ))}
      <text x="8" y="175" fontSize="6.5" fill={S.sky} fontFamily="sans-serif"
        letterSpacing="0.1em" transform="rotate(-90 8 175) translate(-90 0)">
        ATLÂNTICO
      </text>
      <text x="150" y="174" fontSize="8" fill={S.onDarkSoft}
        fontFamily="sans-serif" textAnchor="middle" letterSpacing="0.2em">
        260 km · CAMINHO DA COSTA
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

export default function CaminhoCostaApePage() {
  const [tarifa, setTarifa] = useState(0);
  const [ano, setAno] = useState(0);
  const [etapaAberta, setEtapaAberta] = useState<number | null>(null);
  const tarifas = ano === 0 ? TARIFAS : TARIFAS_2027;

  return (
    <main className="relative" style={{ backgroundColor: S.midnight }}>
      <Nav />

      {/* ── HERO ─────────────────────────────────────────────── */}
      <section className="relative flex min-h-[100svh] w-full items-end overflow-hidden" style={{ backgroundColor: S.black }}>
        <div className="absolute inset-0">
          <img src={HERO} alt="Caminho da Costa Português" className="h-full w-full object-cover" style={{ opacity: 0.45 }} />
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
              Caminho da Costa
            </motion.h1>
            <motion.p className="mt-3 text-[1.2rem] font-light" style={{ color: S.sand }}
              initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, ease: EASE, delay: 0.2 }}>
              Porto até Santiago pela orla atlântica. Praias, dunas e vilarejos de pescadores.
            </motion.p>
            <motion.div className="mt-6 flex flex-wrap gap-4 text-[13px]"
              initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, ease: EASE, delay: 0.3 }}>
              {[["260 km", "Distância total"], ["15 dias", "Duração"], ["a partir de € 1.498", "Preço p.p."]].map(([v, l]) => (
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
            <RotaCosta size={320} />
          </motion.div>
        </div>
      </section>

      {/* ── SOBRE ────────────────────────────────────────────── */}
      <section className="py-24" style={{ backgroundColor: S.white }}>
        <div className="mx-auto max-w-7xl px-6">
          <div className="md:grid md:grid-cols-2 md:gap-16 md:items-center">
            <Reveal>
              <span className="text-[10px] font-bold uppercase tracking-[0.28em]" style={{ color: S.sky }}>
                A rota do Atlântico
              </span>
              <h2 className="mt-3 font-display text-[2.4rem] font-light leading-tight" style={{ color: S.midnight }}>
                260 km de mar, granito e liberdade
              </h2>
              <p className="mt-5 text-[15px] font-light leading-relaxed" style={{ color: S.onLightSoft }}>
                O Caminho da Costa é diferente. Em vez de cortar pelo interior de Portugal, ele abraça o oceano Atlântico. São 260 quilômetros com o mar sempre ao lado, passando por praias desertas, aldeias de pescadores e a fascinante transição de Portugal para a Galiza.
              </p>
              <p className="mt-4 text-[15px] font-light leading-relaxed" style={{ color: S.onLightSoft }}>
                Você atravessa Viana do Castelo pela ponte de Eiffel, entra na Galiza pela fronteira marítima de A Guarda, passa por Baiona onde a notícia do Novo Mundo chegou pela primeira vez, e segue por Vigo e Pontevedra até Santiago.
              </p>
              <div className="mt-8 grid grid-cols-3 gap-6">
                {[["Moderado", "Dificuldade"], ["Mar a Out", "Época"], ["14 dias", "Caminhada"]].map(([v, l]) => (
                  <div key={l}>
                    <p className="text-[1.2rem] font-semibold" style={{ color: S.ocean }}>{v}</p>
                    <p className="text-[12px] mt-0.5" style={{ color: S.onLightSoft }}>{l}</p>
                  </div>
                ))}
              </div>
            </Reveal>
            <Reveal delay={0.15}>
              <div className="mt-10 overflow-hidden rounded-2xl md:mt-0" style={{ aspectRatio: "4/3" }}>
                <img src={wix("2d4f5b_880aab455e2a4f7b8dff665c9b83717a~mv2.jpg", 800, 600)}
                  alt="Caminho da Costa, norte de Portugal"
                  className="h-full w-full object-cover" />
              </div>
            </Reveal>
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
              15 dias · 14 etapas de caminhada · Porto até Santiago pela costa
            </p>
          </Reveal>
          <div className="mt-10 flex flex-col gap-2">
            {ETAPAS.map((e, i) => (
              <Reveal key={i} delay={i * 0.03}>
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
                    Programa 100% autoguiado, no seu ritmo. Suporte AONIK disponível por telefone durante toda a jornada costeira.
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
            <h2 className="font-display text-[2.4rem] font-light" style={{ color: S.white }}>Tarifas</h2>
            <p className="mt-2 text-[14px]" style={{ color: S.onDarkSoft }}>Por pessoa · Cotação em euros · Parcelamento disponível</p>
          </Reveal>
          <Reveal delay={0.07}>
            <div className="mt-6 inline-flex rounded-full p-1" style={{ backgroundColor: "rgba(255,255,255,0.07)", border: `1px solid ${S.wLine}` }}>
              {["2026", "2027"].map((a, i) => (
                <button key={a} onClick={() => setAno(i)}
                  className="rounded-full px-6 py-2 text-[13px] font-medium transition-all duration-200"
                  style={{ backgroundColor: ano === i ? S.sun : "transparent", color: ano === i ? S.midnight : S.onDarkSoft }}>
                  {a}
                </button>
              ))}
            </div>
          </Reveal>
          <Reveal delay={0.1}>
            <div className="mt-4 inline-flex rounded-full p-1" style={{ backgroundColor: "rgba(255,255,255,0.07)", border: `1px solid ${S.wLine}` }}>
              {tarifas.map((t, i) => (
                <button key={i} onClick={() => setTarifa(i)}
                  className="rounded-full px-5 py-2 text-[13px] font-medium transition-all duration-200"
                  style={{ backgroundColor: tarifa === i ? S.sun : "transparent", color: tarifa === i ? S.midnight : S.onDarkSoft }}>
                  {t.temporada}
                </button>
              ))}
            </div>
          </Reveal>
          <Reveal delay={0.15}>
            <div className="mt-6 overflow-hidden rounded-2xl" style={{ border: `1px solid ${S.wLine}` }}>
              <div className="p-4 text-[12px] font-medium uppercase tracking-[0.18em]"
                style={{ backgroundColor: "rgba(242,169,0,0.1)", color: S.sun, borderBottom: `1px solid ${S.wLine}` }}>
                {tarifas[tarifa].temporada} · {tarifas[tarifa].periodo}
              </div>
              <div className="divide-y" style={{ borderColor: S.wLine }}>
                {[["Quarto duplo / casal", tarifas[tarifa].duplo], ["Suplemento quarto individual", tarifas[tarifa].single]].map(([label, preco]) => (
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
          {ano === 1 && (
            <Reveal delay={0.22}>
              <div className="mt-8 overflow-hidden rounded-2xl" style={{ border: `1px solid rgba(242,169,0,0.3)`, backgroundColor: "rgba(242,169,0,0.04)" }}>
                <div className="flex flex-wrap items-center justify-between gap-2 px-6 py-4"
                  style={{ borderBottom: `1px solid rgba(242,169,0,0.2)` }}>
                  <span className="text-[10px] font-bold uppercase tracking-[0.22em]" style={{ color: S.sun }}>Promoção Vigente</span>
                  <span className="text-[10px] font-medium uppercase tracking-[0.14em]" style={{ color: S.onDarkSoft }}>Válida até 30 de Setembro de 2027</span>
                </div>
                <div className="px-6 py-5">
                  <h3 className="font-display text-[1.6rem] font-light" style={{ color: S.white }}>
                    Early Booking{" "}
                    <span className="text-[1rem] font-normal" style={{ color: S.onDarkSoft }}>(reserva antecipada)</span>
                  </h3>
                  <p className="mt-1 text-[13px] font-light" style={{ color: S.onDarkSoft }}>
                    Descontos por forma de pagamento. Escolha a que melhor combina com você.
                  </p>
                  <div className="mt-5 grid grid-cols-1 gap-3 sm:grid-cols-3">
                    {[
                      { titulo: "À vista", badge: "10% OFF", desc: "Pagamento integral à vista, com 10% de desconto.", info: ["PIX ou transferência", "Quitação imediata."] },
                      { titulo: "Parcelado", badge: "5% OFF", desc: "Entrada de 30% + saldo em até 7x sem juros, com 5% de desconto.", info: ["Entrada em PIX/transferência, parcelas no cartão.", "No cartão não há prazo de quitação antes da viagem."] },
                      { titulo: "Em 10x", badge: "Sem Juros", desc: "Saldo em até 10x sem juros, sem desconto adicional.", info: ["Entrada em PIX/transferência, parcelas no cartão.", "No cartão não há prazo de quitação antes da viagem."] },
                    ].map(({ titulo, badge, desc, info }) => (
                      <div key={titulo} className="rounded-xl p-4" style={{ backgroundColor: "rgba(255,255,255,0.04)", border: `1px solid ${S.wLine}` }}>
                        <div className="flex items-start justify-between gap-2">
                          <span className="text-[15px] font-semibold" style={{ color: S.white }}>{titulo}</span>
                          <span className="rounded-full px-2.5 py-0.5 text-[10px] font-bold uppercase" style={{ backgroundColor: "rgba(242,169,0,0.15)", color: S.sun }}>{badge}</span>
                        </div>
                        <p className="mt-2 text-[12px] font-light leading-relaxed" style={{ color: S.onDark }}>{desc}</p>
                        <ul className="mt-3 space-y-0.5">
                          {info.map((item) => <li key={item} className="text-[11px] font-light italic" style={{ color: S.onDarkSoft }}>{item}</li>)}
                        </ul>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </Reveal>
          )}
          <Reveal delay={0.28}>
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
