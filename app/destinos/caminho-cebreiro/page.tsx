"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Nav from "../../components/Nav";
import Footer from "../../components/Footer";
import Contato from "../../components/Contato";
import FloatingActions from "../../components/FloatingActions";
import { Reveal, EASE } from "../../components/ui";

/* ================================================================
   CAMINHO FRANCÊS — O CEBREIRO
   152 km · 8 dias / 7 noites · 6 etapas de caminhada
   Inicia no alto da montanha galega e desce para o vale
   Paleta SANTIAGO — SUN dominante
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
  wLine:       "rgba(255,255,255,0.14)",
};

const wix = (id: string, w = 1920, h = 1080) =>
  `https://static.wixstatic.com/media/${id}/v1/fill/w_${w},h_${h},q_90,enc_avif,quality_auto/${id}`;

const HERO = wix("2d4f5b_920e9f2265b149e69fcc012023b5026d~mv2.jpg");

const GALERIA = [
  { src: wix("2d4f5b_920e9f2265b149e69fcc012023b5026d~mv2.jpg", 900, 600), tag: "O Pico", cap: "O Cebreiro, a 1.300 metros de altitude. A vista do alto da Galiza. O começo de tudo." },
  { src: wix("2d4f5b_6fe79078b70b4c4398bd9e601646fcdd~mv2.jpeg", 900, 600), tag: "A Descida", cap: "A descida de O Cebreiro para Triacastela é uma das paisagens mais dramáticas de todo o Caminho Francês." },
  { src: wix("2d4f5b_b673e91a63554b5e9fb4a39b74af2728~mv2.jpg", 900, 600), tag: "A Rota", cap: "152 km pela Galiza mais profunda, do alto das montanhas até o coração urbano de Santiago." },
  { src: wix("2d4f5b_80e678e6de65425f90c4b56c6f998776~mv2.jpg", 900, 600), tag: "Santiago", cap: "A Catedral. O destino que justificou cada metro de subida na primeira etapa." },
  { src: wix("2d4f5b_3405d40f96d84d289904dccd31fcba12~mv2.jpg", 900, 600), tag: "O Vale", cap: "Do pico ao vale, O Cebreiro oferece a maior variedade de paisagem de qualquer versão do Caminho." },
  { src: wix("2d4f5b_596f7144ab49417692221a0fa9dab404~mv2.jpg", 900, 600), tag: "A Galiza", cap: "A Galiza rural, longe das cidades. Aldeia de xisto, hórreos de granito, silêncio." },
];

const ETAPAS = [
  { dia: "DIA 1", titulo: "Chegada em O Cebreiro",            km: "",      desc: "Chegada em O Cebreiro, a 1.300 metros de altitude no alto da Serra dos Ancares. Credencial do peregrino, briefing e uma noite num dos pontos mais bonitos e históricos de toda a rota." },
  { dia: "DIA 2", titulo: "O Cebreiro → Triacastela",         km: "21 km", desc: "A etapa mais épica do percurso. Saída do alto da montanha e descida dramática pela serra galega até Triacastela. Vistas panorâmicas da Galiza, do Bierzo e, em dias claros, do Atlântico ao longe. Uma das experiências mais marcantes de todo o Caminho." },
  { dia: "DIA 3", titulo: "Triacastela → Sárria",             km: "18 km", desc: "Etapa suave pelo vale do Rio Oribio. Aldeias de xisto e granito, hórreos perfeitos, vacas no caminho. Chegada em Sárria, onde começa o 'trecho mínimo' e o movimento de peregrinos aumenta visualmente." },
  { dia: "DIA 4", titulo: "Sárria → Portomarín",              km: "22 km", desc: "A rota desce para o Rio Miño e cruza a famosa ponte de Portomarín. A cidade foi literalmente desmontada e reconstruída num local mais alto quando o vale foi inundado pelo reservatório nos anos 1960." },
  { dia: "DIA 5", titulo: "Portomarín → Palas de Rei",        km: "25 km", desc: "Subidas e descidas moderadas pelo interior galego. Os bosques de carvalhos alternam com campos abertos e vistas para os vales. Palas de Rei, mencionada nos textos medievais como parada real, fecha esta etapa." },
  { dia: "DIA 6", titulo: "Palas de Rei → Arzúa",             km: "28 km", desc: "A etapa mais longa do percurso, mas com boa infraestrutura em cada aldeia. Melide fica no meio do caminho, com polvo à galega obrigatório. Arzúa é a capital do queijo de tetilla, com mercado e animação." },
  { dia: "DIA 7", titulo: "Arzúa → Santiago de Compostela",   km: "38 km", desc: "A grande jornada final. Arzúa para Pedrouzo (19 km) e depois Pedrouzo para Santiago (19 km). Um dia de dois tempos: a calma dos bosques pela manhã e a emoção da chegada à Praça do Obradoiro no fim da tarde." },
  { dia: "DIA 8", titulo: "Partida",                          km: "",      desc: "Café da manhã em Santiago. Missa do Peregrino às 12h na Catedral. Tempo para a Compostela, para fotografar a fachada barroca e para carregar tudo que o Caminho colocou dentro de você." },
];

const INCLUSOS = [
  "7 noites em hospedagem selecionada com banheiro privativo",
  "Café da manhã em todos os alojamentos",
  "Transporte de bagagem entre cada etapa (1 mala por pessoa, máx. 15 kg)",
  "Credencial do Peregrino oficial",
  "Guia do Caminho em PDF com mapas e dicas de cada etapa",
  "Assistência telefônica de emergência 24 horas",
  "Seguro de viagem para o período de caminhada",
];

const NAO_INCLUSOS = [
  "Passagens aéreas internacionais",
  "Transfer de chegada até O Cebreiro e de saída de Santiago",
  "Seguro viagem completo",
  "Almoços e jantares",
  "Bebidas e gorjetas",
  "Despesas pessoais",
];

const TIERS = [
  { label: "Standard", stars: "2★ / 3★",            duplo: "€ 750", single: "€ 1.071" },
  { label: "Premium",  stars: "3★ / 4★ · Pousadas", duplo: "€ 928", single: "€ 1.278" },
];

/* ── SVG: O Cebreiro — rota desce da montanha ───────────── */
function RotaCebreiro({ size = 300 }: { size?: number }) {
  /* Rota começa no alto à direita (montanha) e desce até Santiago à esquerda */
  const pts: [number, number, string][] = [
    [245,  38, "O Cebreiro"],
    [205,  65, "Triacastela"],
    [168,  80, "Sárria"],
    [130,  90, "Portomarín"],
    [95,   96, "Palas de Rei"],
    [55,  102, "Arzúa"],
    [18,  108, "Santiago"],
  ];
  const d = pts.map(([x, y], i) => (i === 0 ? `M ${x} ${y}` : `L ${x} ${y}`)).join(" ");

  return (
    <svg viewBox="0 0 265 175" width={size} height={size * (175 / 265)}>
      {/* Pico da montanha */}
      <motion.path d="M 242 38 L 228 18 L 214 38 Z" fill="none" stroke={S.sun} strokeWidth="1.8"
        strokeLinejoin="round"
        initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3, duration: 0.7, ease: EASE }} />
      {/* Neve no pico */}
      <motion.path d="M 231 22 L 228 18 L 225 22 L 228 21 Z" fill={S.white} opacity={0.6}
        initial={{ opacity: 0 }} animate={{ opacity: 0.35 }}
        transition={{ delay: 0.5, duration: 0.5, ease: EASE }} />
      {/* Altitude label */}
      <motion.text x="250" y="30" fontSize="7" fill={S.sand} opacity={0.7}
        fontFamily="sans-serif" textAnchor="start"
        initial={{ opacity: 0 }} animate={{ opacity: 0.5 }}
        transition={{ delay: 0.7, duration: 0.5, ease: EASE }}>1.300m</motion.text>
      {/* Linha do horizonte / planície */}
      <motion.path d="M 8 108 L 240 40" fill="none" stroke="rgba(0,32,91,0.06)" strokeWidth="40"
        strokeLinecap="round"
        initial={{ opacity: 0 }} animate={{ opacity: 1 }}
        transition={{ delay: 0.2, duration: 0.8, ease: EASE }} />
      {/* Rota principal */}
      <motion.path d={d} fill="none" stroke="rgba(242,169,0,0.22)" strokeWidth="4" strokeLinecap="round"/>
      <motion.path d={d} fill="none" stroke={S.sun} strokeWidth="2" strokeDasharray="7 4" strokeLinecap="round"
        initial={{ pathLength: 0 }} animate={{ pathLength: 1 }}
        transition={{ duration: 2.5, ease: EASE, delay: 0.5 }} />
      {/* Waypoints */}
      {pts.map(([x, y, label], i) => (
        <motion.g key={i}
          initial={{ opacity: 0, scale: 0.4 }} animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.4, ease: EASE, delay: 0.8 + i * 0.2 }}>
          <circle cx={x} cy={y}
            r={i === 0 ? 7 : i === pts.length - 1 ? 6 : 3.5}
            fill={i === 0 ? "rgba(242,169,0,0.3)" : i === pts.length - 1 ? S.sun : "rgba(242,169,0,0.18)"}
            stroke={S.sun} strokeWidth="1.5" />
          {i === 0 && (
            <text x={x - 6} y={y + 16} fontSize="7.5" fontWeight="700"
              fill={S.white} fontFamily="sans-serif" textAnchor="middle">O Cebreiro</text>
          )}
          {i === pts.length - 1 && (
            <text x={x - 5} y={y - 10} fontSize="8" fontWeight="700"
              fill={S.white} fontFamily="sans-serif" textAnchor="end">Santiago</text>
          )}
        </motion.g>
      ))}
      {/* "Descida épica" label */}
      <motion.text x="226" y="58" fontSize="6.5" fill={S.sand} opacity={0.6}
        fontFamily="sans-serif" transform="rotate(-22 226 58)"
        initial={{ opacity: 0 }} animate={{ opacity: 0.6 }}
        transition={{ delay: 1.8, duration: 0.6, ease: EASE }}>DESCIDA ÉPICA</motion.text>
      <text x="130" y="170" fontSize="7.5" fill={S.onDarkSoft} fontFamily="sans-serif"
        textAnchor="middle" letterSpacing="0.18em">152 km · COMEÇA NO ALTO</text>
    </svg>
  );
}

/* ── Galeria ─────────────────────────────────────────────── */
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
        <span className="absolute right-4 top-4 text-[11px]" style={{ color: "rgba(255,255,255,0.45)" }}>{idx + 1} / {GALERIA.length}</span>
        <button onClick={() => setIdx(i => (i - 1 + GALERIA.length) % GALERIA.length)}
          className="absolute left-4 top-1/2 -translate-y-1/2 flex h-10 w-10 items-center justify-center rounded-full"
          style={{ background: "rgba(0,32,91,0.6)", color: S.sun, fontSize: "1.1rem" }}>‹</button>
        <button onClick={() => setIdx(i => (i + 1) % GALERIA.length)}
          className="absolute right-4 top-1/2 -translate-y-1/2 flex h-10 w-10 items-center justify-center rounded-full"
          style={{ background: "rgba(0,32,91,0.6)", color: S.sun, fontSize: "1.1rem" }}>›</button>
      </div>
      <div className="grid grid-cols-6 gap-2">
        {GALERIA.map((g, i) => (
          <button key={i} onClick={() => setIdx(i)} className="relative overflow-hidden rounded-lg"
            style={{ aspectRatio: "16/10", outline: i === idx ? `2px solid ${S.midnight}` : "2px solid transparent", outlineOffset: 2 }}>
            <img src={g.src} alt="" className="h-full w-full object-cover" style={{ opacity: i === idx ? 1 : 0.4 }} />
          </button>
        ))}
      </div>
    </div>
  );
}

export default function CaminhoCreireiroPage() {
  const [tier, setTier] = useState(0);
  const [etapaAberta, setEtapaAberta] = useState<number | null>(null);
  const t = TIERS[tier];

  return (
    <main className="relative" style={{ backgroundColor: S.sun }}>
      <Nav />

      {/* ── HERO ─────────────────────────────────────────── */}
      <section className="relative flex min-h-[100svh] w-full items-end overflow-hidden" style={{ backgroundColor: S.midnight }}>
        <div className="absolute inset-0">
          <img src={HERO} alt="O Cebreiro, Galiza" className="h-full w-full object-cover"
            style={{ opacity: 0.42 }} />
          <div className="absolute inset-0" style={{ background: `linear-gradient(135deg, ${S.midnight}e8 0%, ${S.midnight}88 55%, transparent 100%)` }} />
        </div>
        <div className="relative z-10 mx-auto w-full max-w-7xl px-6 pb-16 pt-32 md:grid md:grid-cols-2 md:items-end md:gap-12">
          <div>
            <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, ease: EASE }}>
              <span className="inline-flex items-center gap-2 rounded-full px-3 py-1 text-[10px] font-bold uppercase tracking-[0.22em]"
                style={{ backgroundColor: "rgba(242,169,0,0.15)", color: S.sun, border: `1px solid rgba(242,169,0,0.3)` }}>
                Caminho Francês · A Pé · O Cebreiro
              </span>
            </motion.div>
            <motion.h1 className="mt-4 font-display text-[2.8rem] font-light leading-[1.07] md:text-[3.8rem]"
              style={{ color: S.white }}
              initial={{ opacity: 0, y: 28 }} animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, ease: EASE, delay: 0.1 }}>
              O Cebreiro
            </motion.h1>
            <motion.p className="mt-3 text-[1.2rem] font-light" style={{ color: S.sand }}
              initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, ease: EASE, delay: 0.2 }}>
              Começa no alto da montanha galega. Desce em épica. Chega em Santiago.
            </motion.p>
            <motion.div className="mt-6 flex flex-wrap gap-4 text-[13px]"
              initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, ease: EASE, delay: 0.3 }}>
              {[["152 km", "Distância"], ["8 dias", "Duração"], ["a partir de € 750", "Preço p.p."]].map(([v, l]) => (
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
                className="rounded-full px-7 py-3 text-[14px] font-medium"
                style={{ backgroundColor: "rgba(255,255,255,0.1)", color: S.white, border: `1px solid ${S.wLine}` }}>
                Falar no WhatsApp
              </a>
            </motion.div>
          </div>
          <motion.div className="mt-12 flex items-center justify-center md:mt-0"
            initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.2, ease: EASE, delay: 0.3 }}>
            <RotaCebreiro size={340} />
          </motion.div>
        </div>
      </section>

      {/* ── SOBRE ─────────────────────────────────────────── */}
      <section className="py-24" style={{ backgroundColor: S.white }}>
        <div className="mx-auto max-w-7xl px-6">
          <div className="md:grid md:grid-cols-2 md:gap-16 md:items-center">
            <Reveal>
              <span className="text-[10px] font-bold uppercase tracking-[0.28em]" style={{ color: S.sky }}>
                Ponto de partida · 1.300 m de altitude
              </span>
              <h2 className="mt-3 font-display text-[2.4rem] font-light leading-tight" style={{ color: S.midnight }}>
                O Cebreiro: onde a Galiza começa a fazer sentido.
              </h2>
              <p className="mt-5 text-[15px] font-light leading-relaxed" style={{ color: S.onLightSoft }}>
                O Cebreiro é um dos pontos mais sagrados de todo o Caminho. A 1.300 metros de altitude, foi o primeiro lugar na Galiza a oferecer abrigo aos peregrinos medievais. A Igreja de Santa María o Real, do século IX, ainda está de pé. O nevoeiro e o frio fazem parte do ritual.
              </p>
              <p className="mt-4 text-[15px] font-light leading-relaxed" style={{ color: S.onLightSoft }}>
                A saída de O Cebreiro é a etapa mais espetacular do Caminho Francês: uma descida dramática pela Serra dos Ancares, com vistas sobre toda a Galiza. Nenhuma versão que começa em Sárria oferece isso. São 40 km a mais, mas são os 40 km mais bonitos.
              </p>
              <div className="mt-8 grid grid-cols-3 gap-6">
                {[["Média", "Dificuldade"], ["O ano todo", "Época"], ["152 km", "Distância total"]].map(([v, l]) => (
                  <div key={l}>
                    <p className="text-[1.1rem] font-semibold" style={{ color: S.ocean }}>{v}</p>
                    <p className="text-[12px] mt-0.5" style={{ color: S.onLightSoft }}>{l}</p>
                  </div>
                ))}
              </div>
            </Reveal>
            <Reveal delay={0.15}>
              <div className="mt-10 overflow-hidden rounded-2xl md:mt-0" style={{ aspectRatio: "4/3" }}>
                <img src={wix("2d4f5b_6fe79078b70b4c4398bd9e601646fcdd~mv2.jpeg", 800, 600)}
                  alt="Descida de O Cebreiro" className="h-full w-full object-cover" />
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ── DESTAQUES — MIDNIGHT ─────────────────────────── */}
      <section className="py-20" style={{ backgroundColor: S.midnight }}>
        <div className="mx-auto max-w-7xl px-6">
          <Reveal>
            <h2 className="font-display text-[2rem] font-light text-center" style={{ color: S.white }}>
              O que só O Cebreiro oferece
            </h2>
          </Reveal>
          <div className="mt-10 md:grid md:grid-cols-3 md:gap-8">
            {[
              { n: "1.300 m", t: "A altitude de partida",         d: "O Cebreiro fica a 1.300 metros de altitude, no topo da serra que divide o Bierzo galego da Galiza. Começas pelo pico. É uma experiência completamente diferente de começar em Sárria." },
              { n: "152 km", t: "40 km a mais que Sárria",        d: "São 40 quilômetros a mais que qualquer versão que parte de Sárria. Esses 40 km contêm as etapas mais dramáticas: O Cebreiro, Triacastela e a chegada em Sárria com perspectiva diferente." },
              { n: "A descida", t: "Uma das etapas mais épicas",  d: "A descida de O Cebreiro para Triacastela é a etapa mais visualmente impactante do Caminho Francês. Vistas panorâmicas da Galiza inteira, do Bierzo e, em dias claros, do oceano." },
            ].map((p, i) => (
              <Reveal key={i} delay={i * 0.1}>
                <div className="rounded-2xl p-6" style={{ backgroundColor: "rgba(255,255,255,0.05)", border: `1px solid ${S.wLine}` }}>
                  <span className="text-[1.4rem] font-bold" style={{ color: S.sun }}>{p.n}</span>
                  <h3 className="mt-1 font-display text-[1.1rem] font-light" style={{ color: S.white }}>{p.t}</h3>
                  <p className="mt-2 text-[13px] font-light leading-relaxed" style={{ color: S.onDarkSoft }}>{p.d}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── ITINERÁRIO — SUN ─────────────────────────────── */}
      <section className="py-24" style={{ backgroundColor: S.sun }}>
        <div className="mx-auto max-w-4xl px-6">
          <Reveal>
            <h2 className="font-display text-[2.4rem] font-light" style={{ color: S.midnight }}>Roteiro dia a dia</h2>
            <p className="mt-2 text-[14px]" style={{ color: "rgba(0,32,91,0.6)" }}>
              8 dias · 6 etapas de caminhada · O Cebreiro até Santiago de Compostela
            </p>
          </Reveal>
          <div className="mt-10 flex flex-col gap-2">
            {ETAPAS.map((e, i) => (
              <Reveal key={i} delay={i * 0.05}>
                <button onClick={() => setEtapaAberta(etapaAberta === i ? null : i)}
                  className="w-full text-left rounded-xl px-5 py-4 transition-all duration-300"
                  style={{
                    backgroundColor: etapaAberta === i ? "rgba(0,32,91,0.1)" : "rgba(0,32,91,0.06)",
                    border: `1px solid ${etapaAberta === i ? "rgba(0,32,91,0.25)" : "rgba(0,32,91,0.12)"}`,
                  }}>
                  <div className="flex items-center justify-between gap-4">
                    <div className="flex items-center gap-4">
                      <span className="text-[10px] font-bold tracking-[0.18em]" style={{ color: S.ocean }}>{e.dia}</span>
                      <span className="text-[15px] font-light" style={{ color: S.midnight }}>{e.titulo}</span>
                    </div>
                    <div className="flex items-center gap-3 shrink-0">
                      {e.km && <span className="text-[12px] font-semibold" style={{ color: S.ocean }}>{e.km}</span>}
                      <span className="text-[18px] font-light transition-transform duration-300"
                        style={{ color: S.midnight, transform: etapaAberta === i ? "rotate(45deg)" : "rotate(0deg)" }}>+</span>
                    </div>
                  </div>
                  {etapaAberta === i && (
                    <motion.p className="mt-3 text-[14px] font-light leading-relaxed" style={{ color: "rgba(0,32,91,0.7)" }}
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

      {/* ── GALERIA ─────────────────────────────────────── */}
      <section className="py-24" style={{ backgroundColor: S.white }}>
        <div className="mx-auto max-w-5xl px-6">
          <Reveal>
            <h2 className="font-display text-[2.4rem] font-light" style={{ color: S.midnight }}>O Caminho em imagens</h2>
          </Reveal>
          <div className="mt-10"><GaleriaInterativa /></div>
        </div>
      </section>

      {/* ── INCLUSO — OCEAN ─────────────────────────────── */}
      <section className="py-24" style={{ backgroundColor: S.ocean }}>
        <div className="mx-auto max-w-7xl px-6">
          <Reveal>
            <h2 className="font-display text-[2.4rem] font-light" style={{ color: S.white }}>O que está incluso</h2>
          </Reveal>
          <div className="mt-10 md:grid md:grid-cols-2 md:gap-12">
            <Reveal>
              <h3 className="text-[12px] font-bold uppercase tracking-[0.22em]" style={{ color: S.sun }}>Incluso</h3>
              <ul className="mt-5 flex flex-col gap-3">
                {INCLUSOS.map((item, i) => (
                  <li key={i} className="flex items-start gap-3 text-[14px] font-light leading-relaxed" style={{ color: S.onDark }}>
                    <span className="mt-0.5 shrink-0" style={{ color: S.sun }}>✓</span>{item}
                  </li>
                ))}
              </ul>
            </Reveal>
            <Reveal delay={0.1}>
              <div className="mt-10 md:mt-0">
                <h3 className="text-[12px] font-bold uppercase tracking-[0.22em]" style={{ color: S.sand }}>Não incluso</h3>
                <ul className="mt-5 flex flex-col gap-3">
                  {NAO_INCLUSOS.map((item, i) => (
                    <li key={i} className="flex items-start gap-3 text-[14px] font-light leading-relaxed" style={{ color: "rgba(255,255,255,0.6)" }}>
                      <span className="mt-0.5 shrink-0" style={{ color: "rgba(255,255,255,0.3)" }}>–</span>{item}
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ── TARIFAS — MIDNIGHT ──────────────────────────── */}
      <section className="py-24" style={{ backgroundColor: S.midnight }}>
        <div className="mx-auto max-w-3xl px-6">
          <Reveal>
            <h2 className="font-display text-[2.4rem] font-light" style={{ color: S.white }}>Tarifas 2026</h2>
            <p className="mt-2 text-[14px]" style={{ color: S.onDarkSoft }}>Por pessoa · 7 noites incluídas · Cotação em euros</p>
          </Reveal>
          <Reveal delay={0.1}>
            <div className="mt-8 inline-flex rounded-full p-1" style={{ backgroundColor: "rgba(255,255,255,0.07)", border: `1px solid ${S.wLine}` }}>
              {TIERS.map((t, i) => (
                <button key={i} onClick={() => setTier(i)}
                  className="rounded-full px-6 py-2 text-[13px] font-medium transition-all duration-200"
                  style={{ backgroundColor: tier === i ? S.sun : "transparent", color: tier === i ? S.midnight : S.onDarkSoft }}>
                  {t.label}
                </button>
              ))}
            </div>
            <p className="mt-3 text-[12px]" style={{ color: S.onDarkSoft }}>{t.stars}</p>
          </Reveal>
          <Reveal delay={0.15}>
            <div className="mt-6 overflow-hidden rounded-2xl" style={{ border: `1px solid ${S.wLine}` }}>
              <div className="p-4 text-[12px] font-medium uppercase tracking-[0.18em]"
                style={{ backgroundColor: "rgba(242,169,0,0.1)", color: S.sun, borderBottom: `1px solid ${S.wLine}` }}>
                Hospedagem {t.stars}
              </div>
              <div className="divide-y" style={{ borderColor: S.wLine }}>
                {[["Quarto duplo / casal", t.duplo], ["Quarto individual (single)", t.single]].map(([label, preco]) => (
                  <div key={label} className="flex items-center justify-between px-5 py-4">
                    <span className="text-[14px] font-light" style={{ color: S.onDark }}>{label}</span>
                    <span className="text-[18px] font-semibold" style={{ color: S.sun }}>{preco}</span>
                  </div>
                ))}
              </div>
              <div className="px-5 py-4" style={{ borderTop: `1px solid ${S.wLine}` }}>
                <p className="text-[12px] font-semibold uppercase tracking-[0.14em] mb-2" style={{ color: S.sand }}>
                  Suplemento por época
                </p>
                <div className="flex flex-wrap gap-4">
                  {[["Jul, Ago, Set", "+ € 80"], ["Semana Santa", "+ € 45"]].map(([epoca, val]) => (
                    <div key={epoca} className="flex items-center gap-2">
                      <span className="text-[12px] font-light" style={{ color: S.onDarkSoft }}>{epoca}</span>
                      <span className="text-[13px] font-semibold" style={{ color: S.sun }}>{val}</span>
                    </div>
                  ))}
                </div>
              </div>
              <div className="px-5 py-3 text-[12px] font-light" style={{ color: S.onDarkSoft, borderTop: `1px solid ${S.wLine}` }}>
                Pagamento: 30% entrada (Pix) + 5 parcelas sem juros no cartão
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
