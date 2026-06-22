"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Nav from "../../components/Nav";
import Footer from "../../components/Footer";
import Contato from "../../components/Contato";
import FloatingActions from "../../components/FloatingActions";
import { Reveal, EASE } from "../../components/ui";

/* ================================================================
   SANTIAGO A FINISTERRE — Santiago de Compostela → Cabo Finisterre
   Direção OPOSTA: vai do interior para o Atlântico (o "Fim do Mundo")
   7 dias / 6 noites / 90 km · Paleta oficial Santiago
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

const HERO = wix("2d4f5b_80e678e6de65425f90c4b56c6f998776~mv2.jpg");

const GALERIA = [
  { src: wix("2d4f5b_80e678e6de65425f90c4b56c6f998776~mv2.jpg", 900, 600), tag: "Santiago de Compostela", cap: "O ponto de partida. A Catedral às costas, o Atlântico à frente. A jornada ainda não terminou." },
  { src: wix("2d4f5b_6fe79078b70b4c4398bd9e601646fcdd~mv2.jpeg", 900, 600), tag: "Galiza Interior", cap: "De Santiago para o oeste: bosques de carvalhos galegos, aldeias de granito e silêncio." },
  { src: wix("2d4f5b_3405d40f96d84d289904dccd31fcba12~mv2.jpg", 900, 600), tag: "Costa da Morte", cap: "A Costa da Morte galega, famosa pelos seus naufrágios e pela luz dourada do fim de tarde." },
  { src: wix("2d4f5b_920e9f2265b149e69fcc012023b5026d~mv2.jpg", 900, 600), tag: "O Caminho", cap: "A seta amarela aponta para o oeste. Para onde o sol se põe. Para o fim do mundo." },
  { src: wix("2d4f5b_880aab455e2a4f7b8dff665c9b83717a~mv2.jpg", 900, 600), tag: "Atlântico", cap: "O Atlântico em Finisterre. O marco zero. O lugar onde os peregrinos medievais queimavam as botas." },
  { src: wix("2d4f5b_596f7144ab49417692221a0fa9dab404~mv2.jpg", 900, 600), tag: "Fim do Mundo", cap: "Finis Terrae. O ponto mais ocidental da Europa. O horizonte sem terra à vista." },
];

const ETAPAS = [
  { dia: "DIA 1", titulo: "Chegada em Santiago de Compostela", km: "",      desc: "Recepção no hotel, credencial e briefing. Uma última noite em Santiago antes de seguir para o oeste e o oceano." },
  { dia: "DIA 2", titulo: "Santiago → Ponte Maceira",          km: "17 km", desc: "Saída da Catedral de Santiago em direção ao Atlântico. Bosques de carvalhos e eucaliptos. Chegada a Ponte Maceira, com sua ponte medieval sobre o Rio Tambre, uma das mais belas do Caminho." },
  { dia: "DIA 3", titulo: "Ponte Maceira → Santa Mariña",      km: "24 km", desc: "A etapa mais longa. Paisagem galega rural em seu estado mais puro: aldeias de granito, moinhos de vento, fontes d'água. Chegada a Santa Mariña de Brandomil." },
  { dia: "DIA 4", titulo: "Santa Mariña → Olveiroa",           km: "13 km", desc: "Etapa tranquila pelo interior galego. Olveiroa é o ponto de decisão: daqui o Caminho se divide entre Finisterre e Muxía. Você segue para o Fim do Mundo." },
  { dia: "DIA 5", titulo: "Olveiroa → Cee",                    km: "20 km", desc: "Primeiro encontro com o Atlântico. A descida até Cee, na baía de Corcubión, revela o oceano pela primeira vez. A Costa da Morte começa aqui." },
  { dia: "DIA 6", titulo: "Cee → Finisterre",                  km: "16 km", desc: "O último dia. Caminhada pela costa atlântica até o Farol de Finisterre. Km 0,000 do Fim do Mundo. O pôr do sol sobre o Atlântico que os peregrinos medievais acreditavam ser o fim da Terra." },
  { dia: "DIA 7", titulo: "Partida",                           km: "",      desc: "Café da manhã em Finisterre com vista para o Atlântico. Deslocamento de volta a Santiago ou ao aeroporto." },
];

const INCLUSOS = [
  "6 noites em hotéis 2 a 3 estrelas selecionados",
  "Café da manhã em todos os alojamentos",
  "Transporte de bagagem entre cada alojamento (1 mala por pessoa, máx. 15 kg)",
  "Credencial do Peregrino e concha (vieira) oficial",
  "Roadbook impresso com mapas e dicas do Caminho Finisterre",
  "Assistência telefônica de emergência 24 horas",
  "Suporte AONIK antes, durante e após a viagem",
];

const NAO_INCLUSOS = [
  "Passagens aéreas internacionais e transfers aeroportuários",
  "Deslocamentos Santiago até o hotel e retorno de Finisterre",
  "Seguro viagem",
  "Almoços e jantares",
  "Bebidas, taxas turísticas e gorjetas",
];

const TARIFAS = [
  { temporada: "Média", periodo: "Mar, Abr, Mai e Out", duplo: "€ 791",  single: "+ € 370" },
  { temporada: "Alta",  periodo: "Jun, Jul, Ago e Set", duplo: "€ 829",  single: "+ € 408" },
];

const TARIFAS_2027 = [
  { temporada: "Média", periodo: "Mar, Abr, Mai e Out", duplo: "€ 949",  single: "+ € 444" },
  { temporada: "Alta",  periodo: "Jun, Jul, Ago e Set", duplo: "€ 995",  single: "+ € 490" },
];

/* ── SVG: Santiago → Finisterre (direção OESTE, farol no fim) ─ */
function FarolFinisterre({ size = 280 }: { size?: number }) {
  /* Rota vai da DIREITA para a ESQUERDA — Santiago → costa */
  const pts: [number, number, string][] = [
    [230, 100, "Santiago"],
    [180,  90, "P. Maceira"],
    [130,  82, "Olveiroa"],
    [80,   74, "Cee"],
    [30,   68, "Finisterre"],
  ];
  const d = pts.map(([x, y], i) => (i === 0 ? `M ${x} ${y}` : `L ${x} ${y}`)).join(" ");

  return (
    <svg viewBox="0 0 260 180" width={size} height={size * (180 / 260)} className="drop-shadow-xl">
      {/* Oceano Atlântico — esquerda */}
      <motion.rect x="0" y="0" width="38" height="180" rx="2"
        fill="rgba(48,127,226,0.12)"
        initial={{ opacity: 0 }} animate={{ opacity: 1 }}
        transition={{ duration: 1.2, ease: EASE }} />
      {/* Ondas */}
      {[45, 75, 105, 135].map(y => (
        <motion.path key={y}
          d={`M 2 ${y} Q 9 ${y - 5} 17 ${y} Q 25 ${y + 5} 33 ${y}`}
          fill="none" stroke={S.sky} strokeWidth="1.2" opacity={0.35}
          initial={{ x: 4 }} animate={{ x: 0 }}
          transition={{ duration: 1.4, delay: y * 0.006, ease: EASE }} />
      ))}
      {/* Farol */}
      <motion.g initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3, duration: 0.8, ease: EASE }}>
        {/* Torre */}
        <rect x="24" y="42" width="12" height="28" rx="1"
          fill="none" stroke={S.sun} strokeWidth="1.5" />
        {/* Lanterna */}
        <rect x="22" y="36" width="16" height="10" rx="2"
          fill={S.sun} opacity={0.25} stroke={S.sun} strokeWidth="1" />
        {/* Raios de luz */}
        {[-35, -20, -5, 10, 25].map((angle, i) => {
          const rad = (angle * Math.PI) / 180;
          const len = 22 + i * 2;
          return (
            <motion.line key={i}
              x1="30" y1="40"
              x2={30 + Math.cos(rad - Math.PI / 2) * len}
              y2={40 + Math.sin(rad - Math.PI / 2) * len}
              stroke={S.sand} strokeWidth="0.8" opacity={0.45}
              initial={{ opacity: 0 }} animate={{ opacity: [0, 0.45, 0.2, 0.45] }}
              transition={{ delay: 0.8 + i * 0.1, duration: 2, repeat: Infinity, repeatDelay: 1 }} />
          );
        })}
        {/* Base */}
        <line x1="18" y1="70" x2="42" y2="70" stroke={S.sun} strokeWidth="1" />
      </motion.g>
      {/* Rota (direita → esquerda) */}
      <motion.path d={d} fill="none" stroke={S.sunLine} strokeWidth="3.5"
        strokeDasharray="6 4" strokeLinecap="round"
        initial={{ pathLength: 0 }} animate={{ pathLength: 1 }}
        transition={{ duration: 2.0, ease: EASE, delay: 0.5 }} />
      <motion.path d={d} fill="none" stroke={S.sun} strokeWidth="2"
        strokeDasharray="6 4" strokeLinecap="round"
        initial={{ pathLength: 0 }} animate={{ pathLength: 1 }}
        transition={{ duration: 2.0, ease: EASE, delay: 0.7 }} />
      {/* Waypoints */}
      {pts.map(([x, y, label], i) => (
        <motion.g key={i}
          initial={{ opacity: 0, scale: 0.5 }} animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, ease: EASE, delay: 0.8 + i * 0.22 }}>
          <circle cx={x} cy={y} r={i === 0 ? 7 : i === pts.length - 1 ? 6 : 3.5}
            fill={i === 0 ? S.sky : i === pts.length - 1 ? S.sun : "rgba(255,255,255,0.12)"}
            stroke={i === 0 ? S.ocean : i === pts.length - 1 ? S.sand : S.sky}
            strokeWidth="1.5" />
          {i === 0 && (
            <text x={x - 10} y={y + 16} fontSize="7.5" fill={S.sky}
              fontFamily="sans-serif" textAnchor="middle">Santiago</text>
          )}
          {i === pts.length - 1 && (
            <text x={x + 8} y={y - 10} fontSize="7.5" fontWeight="700"
              fill={S.sun} fontFamily="sans-serif">KM 0,000</text>
          )}
        </motion.g>
      ))}
      {/* Seta → oeste */}
      <motion.text x="128" y="115" fontSize="18" fill={S.sun} textAnchor="middle"
        opacity={0.6}
        initial={{ opacity: 0, x: 138 }} animate={{ opacity: 0.6, x: 128 }}
        transition={{ delay: 1.5, duration: 0.8, ease: EASE }}>←</motion.text>
      <text x="130" y="174" fontSize="7.5" fill={S.onDarkSoft}
        fontFamily="sans-serif" textAnchor="middle" letterSpacing="0.2em">
        90 km · SANTIAGO → FIM DO MUNDO
      </text>
      <text x="12" y="175" fontSize="6" fill={S.sky}
        fontFamily="sans-serif" opacity={0.5} textAnchor="middle">OCE-</text>
      <text x="12" y="182" fontSize="6" fill={S.sky}
        fontFamily="sans-serif" opacity={0.5} textAnchor="middle">ANO</text>
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
          className="absolute left-4 top-1/2 -translate-y-1/2 flex h-10 w-10 items-center justify-center rounded-full transition-opacity hover:opacity-100"
          style={{ background: "rgba(0,32,91,0.6)", color: S.sun, opacity: 0.8, fontSize: "1.1rem" }}>‹</button>
        <button onClick={() => setIdx(i => (i + 1) % GALERIA.length)}
          className="absolute right-4 top-1/2 -translate-y-1/2 flex h-10 w-10 items-center justify-center rounded-full transition-opacity hover:opacity-100"
          style={{ background: "rgba(0,32,91,0.6)", color: S.sun, opacity: 0.8, fontSize: "1.1rem" }}>›</button>
      </div>
      <div className="grid grid-cols-6 gap-2">
        {GALERIA.map((g, i) => (
          <button key={i} onClick={() => setIdx(i)}
            className="relative overflow-hidden rounded-lg"
            style={{ aspectRatio: "16/10", outline: i === idx ? `2px solid ${S.sun}` : "2px solid transparent", outlineOffset: 2 }}>
            <img src={g.src} alt={g.cap} className="h-full w-full object-cover"
              style={{ opacity: i === idx ? 1 : 0.4 }} />
          </button>
        ))}
      </div>
    </div>
  );
}

export default function SantiagoFinisterrePage() {
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
          <img src={HERO} alt="Santiago a Finisterre" className="h-full w-full object-cover" style={{ opacity: 0.45 }} />
          <div className="absolute inset-0" style={{ background: `linear-gradient(135deg, ${S.midnight}e0 0%, ${S.black}88 50%, transparent 100%)` }} />
        </div>
        <div className="relative z-10 mx-auto w-full max-w-7xl px-6 pb-16 pt-32 md:grid md:grid-cols-2 md:items-end md:gap-12">
          <div>
            <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, ease: EASE }}>
              <span className="inline-flex items-center gap-2 rounded-full px-3 py-1 text-[10px] font-bold uppercase tracking-[0.22em]"
                style={{ backgroundColor: "rgba(242,169,0,0.15)", color: S.sun, border: `1px solid rgba(242,169,0,0.3)` }}>
                Além do Caminho · A Pé · Finis Terrae
              </span>
            </motion.div>
            <motion.h1 className="mt-4 font-display text-[2.8rem] font-light leading-[1.07] md:text-[3.8rem]"
              style={{ color: S.white }}
              initial={{ opacity: 0, y: 28 }} animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, ease: EASE, delay: 0.1 }}>
              Santiago a Finisterre
            </motion.h1>
            <motion.p className="mt-3 text-[1.2rem] font-light" style={{ color: S.sand }}
              initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, ease: EASE, delay: 0.2 }}>
              A Catedral às costas. O Atlântico à frente. 90 km até o Fim do Mundo.
            </motion.p>
            <motion.div className="mt-6 flex flex-wrap gap-4 text-[13px]"
              initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, ease: EASE, delay: 0.3 }}>
              {[["90 km", "Distância total"], ["7 dias", "Duração"], ["a partir de € 791", "Preço p.p."]].map(([v, l]) => (
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
            <FarolFinisterre size={320} />
          </motion.div>
        </div>
      </section>

      {/* ── SOBRE ────────────────────────────────────────────── */}
      <section className="py-24" style={{ backgroundColor: S.white }}>
        <div className="mx-auto max-w-7xl px-6">
          <div className="md:grid md:grid-cols-2 md:gap-16 md:items-center">
            <Reveal>
              <span className="text-[10px] font-bold uppercase tracking-[0.28em]" style={{ color: S.sky }}>
                Finis Terrae
              </span>
              <h2 className="mt-3 font-display text-[2.4rem] font-light leading-tight" style={{ color: S.midnight }}>
                A Catedral era o meio, não o fim.
              </h2>
              <p className="mt-5 text-[15px] font-light leading-relaxed" style={{ color: S.onLightSoft }}>
                Os peregrinos medievais não paravam em Santiago. Depois de chegar à Catedral, muitos continuavam para oeste, caminhando mais 90 km até Finisterre, o ponto que os romanos chamavam de "Finis Terrae", o fim da terra conhecida.
              </p>
              <p className="mt-4 text-[15px] font-light leading-relaxed" style={{ color: S.onLightSoft }}>
                Lá, no KM 0,000 do farol, eles queimavam as botas e as roupas da jornada. Um ritual de encerramento, de soltar o que não serve mais. Hoje, o Caminho a Finisterre oferece a mesma experiência: menos multidão, mais silêncio, a Costa da Morte galega e o pôr do sol sobre o Atlântico que não tem par.
              </p>
              <div className="mt-8 grid grid-cols-3 gap-6">
                {[["Fácil-Mod.", "Dificuldade"], ["Mar a Out", "Época"], ["5 dias", "Caminhada"]].map(([v, l]) => (
                  <div key={l}>
                    <p className="text-[1.2rem] font-semibold" style={{ color: S.ocean }}>{v}</p>
                    <p className="text-[12px] mt-0.5" style={{ color: S.onLightSoft }}>{l}</p>
                  </div>
                ))}
              </div>
            </Reveal>
            <Reveal delay={0.15}>
              <div className="mt-10 overflow-hidden rounded-2xl md:mt-0" style={{ aspectRatio: "4/3" }}>
                <img src={wix("2d4f5b_3405d40f96d84d289904dccd31fcba12~mv2.jpg", 800, 600)}
                  alt="Costa da Morte, Galiza"
                  className="h-full w-full object-cover" />
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ── DESTAQUE: O KM 0 ─────────────────────────────────── */}
      <section className="py-20" style={{ backgroundColor: S.sky }}>
        <div className="mx-auto max-w-7xl px-6">
          <div className="md:grid md:grid-cols-3 md:gap-8">
            {[
              { n: "KM 0,000", t: "O Marco de Finisterre",    d: "O pedra quilométrica mais famosa do Caminho. O ponto onde a terra termina e o oceano começa. Uma foto que todo peregrino tira." },
              { n: "Costa da Morte", t: "A paisagem mais dramática", d: "A Costa da Morte galega tem esse nome pelos naufrágios históricos. Falésias, faróis e o Atlântico em toda sua força." },
              { n: "O Pôr do Sol", t: "O ritual do Fim do Mundo",   d: "Do Cabo Finisterre, você assiste o sol se pôr no Atlântico. O mesmo espetáculo que os peregrinos medievais acreditavam ser o fim da Terra." },
            ].map((p, i) => (
              <Reveal key={i} delay={i * 0.1}>
                <div className="rounded-2xl p-6" style={{ backgroundColor: "rgba(0,32,91,0.1)" }}>
                  <span className="text-[1.1rem] font-bold" style={{ color: S.midnight }}>{p.n}</span>
                  <h3 className="mt-1 font-display text-[1.2rem] font-light" style={{ color: S.midnight }}>{p.t}</h3>
                  <p className="mt-2 text-[13px] font-light leading-relaxed" style={{ color: S.onLight, opacity: 0.7 }}>{p.d}</p>
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
            <h2 className="font-display text-[2.4rem] font-light" style={{ color: S.white }}>Roteiro dia a dia</h2>
            <p className="mt-2 text-[14px]" style={{ color: S.onDarkSoft }}>
              7 dias · 5 etapas de caminhada · Santiago de Compostela até Finisterre
            </p>
          </Reveal>
          <div className="mt-10 flex flex-col gap-2">
            {ETAPAS.map((e, i) => (
              <Reveal key={i} delay={i * 0.06}>
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
                    <motion.p className="mt-3 text-[14px] font-light leading-relaxed" style={{ color: S.onDarkSoft }}
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
            <h2 className="font-display text-[2.4rem] font-light" style={{ color: S.midnight }}>O Caminho em imagens</h2>
          </Reveal>
          <div className="mt-10"><GaleriaInterativa /></div>
        </div>
      </section>

      {/* ── INCLUSO ──────────────────────────────────────────── */}
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
                    <span className="mt-0.5 shrink-0 text-[16px]" style={{ color: S.sun }}>✓</span>{item}
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
                <div className="mt-8 rounded-xl p-5" style={{ backgroundColor: "rgba(255,255,255,0.07)", border: `1px solid ${S.wLine}` }}>
                  <p className="text-[13px] font-light leading-relaxed" style={{ color: S.onDarkSoft }}>
                    Pode ser combinado com qualquer outro Caminho. Muitos peregrinos fazem o Caminho Central ou o Valença e continuam até Finisterre como extensão da jornada.
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
            <p className="mt-2 text-[14px]" style={{ color: S.onDarkSoft }}>Por pessoa · 6 noites incluídas · Cotação em euros</p>
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
                  className="rounded-full px-6 py-2 text-[13px] font-medium transition-all duration-200"
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
