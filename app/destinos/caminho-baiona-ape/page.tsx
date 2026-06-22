"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Nav from "../../components/Nav";
import Footer from "../../components/Footer";
import Contato from "../../components/Contato";
import FloatingActions from "../../components/FloatingActions";
import { Reveal, EASE } from "../../components/ui";

/* ================================================================
   CAMINHO BAIONA A PÉ — Baiona (Galiza) → Santiago de Compostela
   Variante espanhola: começa em solo galego, 126,5 km
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

const HERO = wix("2d4f5b_880aab455e2a4f7b8dff665c9b83717a~mv2.jpg");

const GALERIA = [
  { src: wix("2d4f5b_880aab455e2a4f7b8dff665c9b83717a~mv2.jpg", 900, 600), tag: "Baiona", cap: "Baiona: vila medieval galega onde a notícia do Novo Mundo chegou pela primeira vez em 1493." },
  { src: wix("2d4f5b_6fe79078b70b4c4398bd9e601646fcdd~mv2.jpeg", 900, 600), tag: "Galiza", cap: "100% em solo galego. Do castelo de Baiona até a Catedral de Santiago, paisagem única." },
  { src: wix("2d4f5b_3405d40f96d84d289904dccd31fcba12~mv2.jpg", 900, 600), tag: "Costa Galega", cap: "A costa galega entre Baiona e Vigo guarda enseadas, faróis e aldeias de pescadores." },
  { src: wix("2d4f5b_80e678e6de65425f90c4b56c6f998776~mv2.jpg", 900, 600), tag: "Santiago de Compostela", cap: "A chegada à Praça do Obradoiro, a 126,5 quilômetros de onde você começou." },
  { src: wix("2d4f5b_920e9f2265b149e69fcc012023b5026d~mv2.jpg", 900, 600), tag: "O Caminho", cap: "Na Galiza a seta amarela está em cada encruzilhada. Basta seguir." },
  { src: wix("2d4f5b_b673e91a63554b5e9fb4a39b74af2728~mv2.jpg", 900, 600), tag: "Pontevedra", cap: "Pontevedra, a cidade medieval mais bem preservada da Galiza. Coração do Caminho Português." },
];

const ETAPAS = [
  { dia: "DIA 1", titulo: "Chegada em Baiona",              km: "",       desc: "Recepção no hotel, entrega da credencial do peregrino e briefing completo. Tempo livre para explorar o Castelo de Monterreal e a orla histórica de Baiona." },
  { dia: "DIA 2", titulo: "Baiona → Vigo",                  km: "25,5 km",desc: "Início do Caminho pela costa galega. Vista das Ilhas Cíes e chegada a Vigo, a maior cidade da Galiza, às margens da Ria de Vigo." },
  { dia: "DIA 3", titulo: "Vigo → Arcade",                  km: "22 km",  desc: "Travessia pela Ponte de Rande sobre a Ria de Vigo. Redondela e seus viadutos. Chegada a Arcade, famosa pelas melhores ostras da Galiza." },
  { dia: "DIA 4", titulo: "Arcade → Pontevedra",            km: "13 km",  desc: "Ponte medieval de Pontesampaio sobre o Rio Verdugo. Chegada ao centro histórico de Pontevedra, cidade medieval sem carros e patrimônio indiscutível do Caminho." },
  { dia: "DIA 5", titulo: "Pontevedra → Caldas de Reis",   km: "22 km",  desc: "Vale do Rio Granda, cruzeiros esculpidos em granito. Chegada à cidade termal de Caldas de Reis com suas fontes de água quente natural." },
  { dia: "DIA 6", titulo: "Caldas de Reis → Padrón",        km: "19 km",  desc: "Ponte medieval sobre o Rio Bermaña. Padrón: onde a lenda do Apóstolo ganhou forma, 2.000 anos atrás. A espiritualidade do Caminho em sua forma mais pura." },
  { dia: "DIA 7", titulo: "Padrón → Santiago de Compostela", km: "25 km", desc: "A etapa final. Entrada pela cidade velha, Rúa do Vilar e a chegada à Praça do Obradoiro com a Catedral à frente. A Compostela nas mãos." },
  { dia: "DIA 8", titulo: "Partida de Santiago",            km: "",       desc: "Café da manhã no hotel, últimas memórias da Praça do Obradoiro e deslocamento ao aeroporto." },
];

const INCLUSOS = [
  "7 noites em hotéis 2 a 3 estrelas selecionados",
  "Café da manhã em todos os alojamentos",
  "Transporte de bagagem entre cada alojamento (1 mala por pessoa, máx. 15 kg)",
  "Credencial do Peregrino e concha (vieira) oficial",
  "Roadbook impresso com mapas detalhados",
  "Assistência telefônica de emergência 24 horas",
  "Suporte AONIK antes, durante e após a viagem",
];

const NAO_INCLUSOS = [
  "Passagens aéreas e transfers aeroportuários",
  "Deslocamentos até Baiona",
  "Seguro viagem",
  "Almoços e jantares",
  "Bebidas, taxas turísticas e gorjetas",
];

const TARIFAS = [
  { temporada: "Baixa",  periodo: "Mar, Abr e Out",     duplo: "€ 886",  single: "+ € 427" },
  { temporada: "Média",  periodo: "Mai, Jun e Set",     duplo: "€ 937",  single: "+ € 440" },
  { temporada: "Alta",   periodo: "Jul e Ago",           duplo: "€ 982",  single: "+ € 510" },
];

const TARIFAS_2027 = [
  { temporada: "Baixa",  periodo: "Mar, Abr e Out",     duplo: "€ 1.063", single: "+ € 512" },
  { temporada: "Média",  periodo: "Mai, Jun e Set",     duplo: "€ 1.124", single: "+ € 528" },
  { temporada: "Alta",   periodo: "Jul e Ago",           duplo: "€ 1.178", single: "+ € 612" },
];

/* ── SVG: Rota Baiona (Galiza → Santiago, 100% espanhola) ──── */
function RotaBaiona({ size = 280 }: { size?: number }) {
  const pts: [number, number, string][] = [
    [22,  152, "Baiona"],
    [55,  122, "Vigo"],
    [95,   90, "Arcade"],
    [128,  68, "Pontevedra"],
    [168,  46, "Caldas"],
    [196,  28, "Padrón"],
    [230,  14, "Santiago"],
  ];
  const d = pts.map(([x, y], i) => (i === 0 ? `M ${x} ${y}` : `L ${x} ${y}`)).join(" ");
  /* Castelo estilizado em Baiona */
  const bx = 22, by = 152;
  return (
    <svg viewBox="0 0 260 175" width={size} height={size * (175 / 260)} className="drop-shadow-xl">
      {/* Label Galiza */}
      <text x="130" y="14" fontSize="7.5" fill={S.sky} fontFamily="sans-serif"
        textAnchor="middle" letterSpacing="0.25em" opacity={0.5}>GALIZA · ESPANHA</text>
      {/* Rota */}
      <motion.path d={d} fill="none" stroke={S.sunLine} strokeWidth="3.5"
        strokeDasharray="6 4" strokeLinecap="round"
        initial={{ pathLength: 0 }} animate={{ pathLength: 1 }}
        transition={{ duration: 1.9, ease: EASE, delay: 0.4 }} />
      <motion.path d={d} fill="none" stroke={S.sun} strokeWidth="2"
        strokeDasharray="6 4" strokeLinecap="round"
        initial={{ pathLength: 0 }} animate={{ pathLength: 1 }}
        transition={{ duration: 1.9, ease: EASE, delay: 0.6 }} />
      {/* Castelo em Baiona */}
      <motion.g initial={{ opacity: 0 }} animate={{ opacity: 1 }}
        transition={{ delay: 0.3, duration: 0.6, ease: EASE }}>
        <rect x={bx - 9} y={by - 20} width="18" height="14" rx="1"
          fill="none" stroke={S.sky} strokeWidth="1.2" />
        {[-5, 0, 5].map(dx => (
          <rect key={dx} x={bx + dx - 2} y={by - 24} width="4" height="6" rx="0.5"
            fill={S.sky} opacity={0.5} />
        ))}
        <line x1={bx} y1={by - 6} x2={bx} y2={by - 2} stroke={S.sun} strokeWidth="0.8" />
      </motion.g>
      {/* Waypoints */}
      {pts.map(([x, y, label], i) => (
        <motion.g key={i}
          initial={{ opacity: 0, scale: 0.6 }} animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, ease: EASE, delay: 0.5 + i * 0.22 }}>
          <circle cx={x} cy={y} r={i === pts.length - 1 ? 7 : i === 0 ? 5 : 3.5}
            fill={i === pts.length - 1 ? S.sun : i === 0 ? S.sky : "rgba(255,255,255,0.15)"}
            stroke={i === pts.length - 1 ? S.sand : S.sky}
            strokeWidth="1.5" />
          {i === pts.length - 1 && (
            <text x={x + 10} y={y + 4} fontSize="9" fontWeight="700"
              fill={S.sun} fontFamily="sans-serif" letterSpacing="0.06em">SANTIAGO</text>
          )}
          {i === 0 && (
            <text x={x + 4} y={y + 14} fontSize="8" fill={S.sky}
              fontFamily="sans-serif">Baiona</text>
          )}
        </motion.g>
      ))}
      <text x="110" y="170" fontSize="7.5" fill={S.onDarkSoft}
        fontFamily="sans-serif" textAnchor="middle" letterSpacing="0.2em">
        126,5 km · VARIANTE ESPANHOLA
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

export default function CaminhoBaionaApePage() {
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
          <img src={HERO} alt="Caminho Baiona a Santiago" className="h-full w-full object-cover" style={{ opacity: 0.45 }} />
          <div className="absolute inset-0" style={{ background: `linear-gradient(135deg, ${S.midnight}e0 0%, ${S.black}88 50%, transparent 100%)` }} />
        </div>
        <div className="relative z-10 mx-auto w-full max-w-7xl px-6 pb-16 pt-32 md:grid md:grid-cols-2 md:items-end md:gap-12">
          <div>
            <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, ease: EASE }}>
              <span className="inline-flex items-center gap-2 rounded-full px-3 py-1 text-[10px] font-bold uppercase tracking-[0.22em]"
                style={{ backgroundColor: "rgba(242,169,0,0.15)", color: S.sun, border: `1px solid rgba(242,169,0,0.3)` }}>
                Caminho Português · A Pé · Variante Espanhola
              </span>
            </motion.div>
            <motion.h1 className="mt-4 font-display text-[3rem] font-light leading-[1.07] md:text-[4.2rem]"
              style={{ color: S.white }}
              initial={{ opacity: 0, y: 28 }} animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, ease: EASE, delay: 0.1 }}>
              Caminho Baiona
            </motion.h1>
            <motion.p className="mt-3 text-[1.2rem] font-light" style={{ color: S.sand }}
              initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, ease: EASE, delay: 0.2 }}>
              Começa na vila medieval galega e percorre 126,5 km inteiramente em solo espanhol.
            </motion.p>
            <motion.div className="mt-6 flex flex-wrap gap-4 text-[13px]"
              initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, ease: EASE, delay: 0.3 }}>
              {[["126,5 km", "Distância total"], ["8 dias", "Duração"], ["a partir de € 886", "Preço p.p."]].map(([v, l]) => (
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
            <RotaBaiona size={320} />
          </motion.div>
        </div>
      </section>

      {/* ── SOBRE ────────────────────────────────────────────── */}
      <section className="py-24" style={{ backgroundColor: S.white }}>
        <div className="mx-auto max-w-7xl px-6">
          <div className="md:grid md:grid-cols-2 md:gap-16 md:items-center">
            <Reveal>
              <span className="text-[10px] font-bold uppercase tracking-[0.28em]" style={{ color: S.sky }}>
                A variante espanhola
              </span>
              <h2 className="mt-3 font-display text-[2.4rem] font-light leading-tight" style={{ color: S.midnight }}>
                100% Galiza. Do castelo medieval à Catedral.
              </h2>
              <p className="mt-5 text-[15px] font-light leading-relaxed" style={{ color: S.onLightSoft }}>
                O Caminho Baiona é a variante espanhola do Caminho Português. Em vez de começar no Porto, você parte de Baiona, a vila medieval galega onde a caravela "La Pinta" ancorou em 1493 trazendo a primeira notícia do Novo Mundo à Europa.
              </p>
              <p className="mt-4 text-[15px] font-light leading-relaxed" style={{ color: S.onLightSoft }}>
                São 126,5 km inteiramente em solo galego, passando por Vigo, Pontevedra e Padrón. Ideal para quem já conhece Portugal e quer uma experiência 100% na Galiza espanhola, ou para quem combina uma etapa anterior com a chegada em Baiona.
              </p>
              <div className="mt-8 grid grid-cols-3 gap-6">
                {[["Moderado", "Dificuldade"], ["Mar a Out", "Época"], ["6 dias", "Caminhada"]].map(([v, l]) => (
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
                  alt="Galiza, Caminho Português"
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
              8 dias · 6 etapas · Baiona até Santiago, todo em solo galego
            </p>
          </Reveal>
          <div className="mt-10 flex flex-col gap-2">
            {ETAPAS.map((e, i) => (
              <Reveal key={i} delay={i * 0.04}>
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
                    Programa autoguiado. Suporte AONIK disponível por telefone durante toda a jornada galega.
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
