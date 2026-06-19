"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Nav from "../../components/Nav";
import Footer from "../../components/Footer";
import Contato from "../../components/Contato";
import FloatingActions from "../../components/FloatingActions";
import { Reveal, EASE } from "../../components/ui";

/* ================================================================
   CAMINHO EASY A PÉ — Porto → Santiago, 21 dias, etapas curtas
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
  { src: wix("2d4f5b_3405d40f96d84d289904dccd31fcba12~mv2.jpg", 900, 600), tag: "Costa Portuguesa", cap: "O Easy segue pela costa atlântica em etapas curtas. Tempo para apreciar cada paisagem." },
  { src: wix("2d4f5b_880aab455e2a4f7b8dff665c9b83717a~mv2.jpg", 900, 600), tag: "Norte de Portugal", cap: "Viana do Castelo, Esposende, Vila do Conde. Sem pressa para absorver o norte português." },
  { src: wix("2d4f5b_6fe79078b70b4c4398bd9e601646fcdd~mv2.jpeg", 900, 600), tag: "Galiza", cap: "Depois da fronteira, a Galiza em ritmo Easy: Vigo, Pontevedra, Padrón até Santiago." },
  { src: wix("2d4f5b_b673e91a63554b5e9fb4a39b74af2728~mv2.jpg", 900, 600), tag: "Pontes e Vilas", cap: "As pontes medievais e vilas históricas têm mais tempo para ser vividas no ritmo Easy." },
  { src: wix("2d4f5b_920e9f2265b149e69fcc012023b5026d~mv2.jpg", 900, 600), tag: "O Caminho", cap: "A seta amarela guia, mas no Easy você tem tempo de parar em cada café e cada vista." },
  { src: wix("2d4f5b_80e678e6de65425f90c4b56c6f998776~mv2.jpg", 900, 600), tag: "Santiago de Compostela", cap: "A chegada à Praça do Obradoiro. 21 dias de caminhada leve culminam em um momento inesquecível." },
];

const ETAPAS = [
  { dia: "DIA 1",  titulo: "Chegada ao Porto",                    km: "",      desc: "Recepção no hotel, entrega da credencial e briefing com a equipe AONIK." },
  { dia: "DIA 2",  titulo: "Labruje → Vila do Conde",            km: "16 km", desc: "Transfer do Porto até Labruje. Primeiro dia de caminhada pela costa, chegando a Vila do Conde e sua praia atlântica." },
  { dia: "DIA 3",  titulo: "Vila do Conde → Apúlia",             km: "17 km", desc: "Costa atlântica com praias desertas e dunas. Apúlia, aldeia piscatória onde o mar tem cheiro de história." },
  { dia: "DIA 4",  titulo: "Apúlia → Esposende",                 km: "8 km",  desc: "A etapa mais curta do Easy. Só 8 km para aproveitar Esposende com calma, o estuário do Cávado e as praias deste litoral." },
  { dia: "DIA 5",  titulo: "Esposende → Castelo do Neiva",       km: "12 km", desc: "Paisagens costeiras suaves. Castelo do Neiva em um hotel charmoso à beira do Rio Neiva." },
  { dia: "DIA 6",  titulo: "Castelo do Neiva → Viana do Castelo", km: "13 km",desc: "Chegada a Viana do Castelo pela Ponte de Gustave Eiffel. A capital do Alto Minho com tempo para visitar a Basílica de Santa Luzia." },
  { dia: "DIA 7",  titulo: "Viana do Castelo → Vila Praia de Âncora", km: "18 km", desc: "O trecho mais longo do Easy. Zona balnear de Carreço e Afife com o Atlântico do lado." },
  { dia: "DIA 8",  titulo: "Vila Praia de Âncora → A Guarda",    km: "14 km", desc: "Cruzamento do Rio Minho. Entrada em território espanhol. A Guarda e o Monte Santa Tegra com vista panorâmica." },
  { dia: "DIA 9",  titulo: "A Guarda → Oia",                     km: "14 km", desc: "Mosteiro de Santa Maria de Oia, marco do Camino Monacal. Falésias e enseadas da Costa Galega." },
  { dia: "DIA 10", titulo: "Oia → Baiona",                       km: "17 km", desc: "Cabo Silleiro e as falésias gallegas. Chegada a Baiona, vila medieval onde a notícia do Novo Mundo chegou à Europa em 1493." },
  { dia: "DIA 11", titulo: "Baiona → Corujo → Baiona",           km: "15 km", desc: "Dia especial: saída de Baiona, caminhada pelo interior e retorno. Dia de conhecer a aldeia histórica de Corujo." },
  { dia: "DIA 12", titulo: "Corujo → Vigo",                      km: "11 km", desc: "Etapa curta para chegar a Vigo, com tempo livre para explorar a maior cidade da Galiza e a sua Ria." },
  { dia: "DIA 13", titulo: "Vigo → Redondela",                   km: "15 km", desc: "Viadutos de Redondela sobre a Ria de Vigo. Um dos cenários mais fotogênicos do Caminho Português." },
  { dia: "DIA 14", titulo: "Redondela → Arcade",                 km: "7 km",  desc: "Apenas 7 km, a etapa mais curta em Espanha. Tempo extra para as famosas ostras de Arcade à beira do Rio Verdugo." },
  { dia: "DIA 15", titulo: "Arcade → Pontevedra",                km: "13 km", desc: "Ponte medieval de Pontesampayo e chegada ao centro histórico de Pontevedra. Uma tarde inteira para explorar a cidade." },
  { dia: "DIA 16", titulo: "Pontevedra → San Mauro → Pontevedra", km: "10 km",desc: "Circuito especial saindo e voltando a Pontevedra. Bosques e capelas da periferia galega." },
  { dia: "DIA 17", titulo: "San Mauro → Caldas de Reis",         km: "12 km", desc: "Os primeiros cruzeiros esculpidos em granito. Chegada a Caldas de Reis e suas fontes termais." },
  { dia: "DIA 18", titulo: "Caldas de Reis → Padrón",            km: "18 km", desc: "O penúltimo dia de caminhada. Padrón e a lenda do Apóstolo encerram esta etapa com profundidade espiritual." },
  { dia: "DIA 19", titulo: "Padrón → Teo",                       km: "12 km", desc: "Últimos bosques de carvalhos galegos antes de Santiago. Hotel rural em Teo para uma última noite tranquila." },
  { dia: "DIA 20", titulo: "Teo → Santiago de Compostela",       km: "14 km", desc: "A chegada. Entrada pela cidade velha, Rúa do Vilar e a Praça do Obradoiro. 256 km depois, a Compostela nas mãos." },
  { dia: "DIA 21", titulo: "Partida de Santiago",                 km: "",      desc: "Café da manhã no hotel e deslocamento ao aeroporto. A última manhã na cidade do Apóstolo." },
];

const INCLUSOS = [
  "20 noites em hotéis 3 estrelas selecionados (hotel charmoso em Castelo do Neiva, hotel rural em Teo)",
  "Café da manhã em todos os alojamentos",
  "Transfer Porto até Labruje (início do Caminho)",
  "Transfers específicos entre cidades ao longo da rota",
  "Transporte de bagagem entre cada alojamento (1 mala por pessoa, máx. 15 kg)",
  "Credencial do Peregrino e concha (vieira) oficial",
  "Roadbook impresso com mapas detalhados",
  "Assistência telefônica de emergência 24 horas",
  "Suporte AONIK antes, durante e após a viagem",
];

const NAO_INCLUSOS = [
  "Passagens aéreas internacionais",
  "Transfer aeroporto Porto até o hotel",
  "Deslocamentos Santiago de Compostela até Porto",
  "Seguro viagem",
  "Almoços e jantares",
  "Bebidas, taxas turísticas e gorjetas",
];

const TARIFAS = [
  { temporada: "Baixa",  periodo: "Mar, Abr e Out",   duplo: "€ 2.359", single: "+ € 1.262" },
  { temporada: "Média",  periodo: "Mai, Jun e Set",   duplo: "€ 2.486", single: "+ € 1.273" },
  { temporada: "Alta",   periodo: "Jul e Ago",         duplo: "€ 2.754", single: "+ € 1.517" },
];

/* ── SVG: Rota Easy (lenta, etapas curtas, pela costa) ──────── */
function RotaEasy({ size = 280 }: { size?: number }) {
  /* Mesmo traçado do Costa, mas com "pausas" visuais nos waypoints */
  const pts: [number, number][] = [
    [25, 160], [20, 130], [16, 104], [25, 80],
    [58, 62],  [105, 44], [190, 22],
  ];
  const labels = ["Porto", "Viana", "A Guarda", "Baiona", "Vigo", "Pontevedra", "Santiago"];
  const d = pts.map(([x, y], i) => (i === 0 ? `M ${x} ${y}` : `L ${x} ${y}`)).join(" ");

  return (
    <svg viewBox="0 0 260 180" width={size} height={size * (180 / 260)} className="drop-shadow-xl">
      {/* Linhas guia suaves */}
      {[40, 80, 120, 160].map(y => (
        <line key={y} x1="0" y1={y} x2="260" y2={y} stroke={S.wLine} strokeWidth="0.5" />
      ))}
      {/* Oceano à esquerda */}
      <rect x="0" y="0" width="14" height="180" fill="rgba(48,127,226,0.07)" />
      {/* Rota */}
      <motion.path d={d} fill="none" stroke={S.sunLine} strokeWidth="3"
        strokeDasharray="5 5" strokeLinecap="round"
        initial={{ pathLength: 0 }} animate={{ pathLength: 1 }}
        transition={{ duration: 2.8, ease: EASE, delay: 0.4 }} />
      <motion.path d={d} fill="none" stroke={S.sun} strokeWidth="1.8"
        strokeDasharray="5 5" strokeLinecap="round"
        initial={{ pathLength: 0 }} animate={{ pathLength: 1 }}
        transition={{ duration: 2.8, ease: EASE, delay: 0.7 }} />
      {/* Waypoints — maiores, com "pausa" */}
      {pts.map(([x, y], i) => (
        <motion.g key={i}
          initial={{ opacity: 0, scale: 0.5 }} animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, ease: EASE, delay: 0.8 + i * 0.28 }}>
          {/* Halo suave = pausa */}
          <circle cx={x} cy={y} r={i === pts.length - 1 ? 11 : 8}
            fill={i === pts.length - 1 ? "rgba(242,169,0,0.12)" : "rgba(48,127,226,0.10)"} />
          <circle cx={x} cy={y} r={i === pts.length - 1 ? 6 : 4}
            fill={i === pts.length - 1 ? S.sun : S.sky}
            stroke={i === pts.length - 1 ? S.sand : S.ocean}
            strokeWidth="1.5" />
          {i === pts.length - 1 && (
            <text x={x + 10} y={y + 4} fontSize="8.5" fontWeight="700"
              fill={S.sun} fontFamily="sans-serif" letterSpacing="0.06em">SANTIAGO</text>
          )}
          {i === 0 && (
            <text x={x + 4} y={y + 14} fontSize="7.5" fill={S.onDarkSoft}
              fontFamily="sans-serif">{labels[i]}</text>
          )}
        </motion.g>
      ))}
      {/* Badge EASY */}
      <motion.g initial={{ opacity: 0 }} animate={{ opacity: 1 }}
        transition={{ delay: 1.4, duration: 0.6, ease: EASE }}>
        <rect x="170" y="140" width="58" height="20" rx="10"
          fill="rgba(242,169,0,0.15)" stroke={S.sun} strokeWidth="0.8" />
        <text x="199" y="153" fontSize="8" fontWeight="700" fill={S.sun}
          fontFamily="sans-serif" textAnchor="middle" letterSpacing="0.18em">EASY</text>
      </motion.g>
      <text x="100" y="174" fontSize="7.5" fill={S.onDarkSoft}
        fontFamily="sans-serif" textAnchor="middle" letterSpacing="0.2em">
        256 km · 21 DIAS · ~12 km/DIA
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

export default function CaminhoEasyApePage() {
  const [tarifa, setTarifa] = useState(0);
  const [etapaAberta, setEtapaAberta] = useState<number | null>(null);

  return (
    <main className="relative" style={{ backgroundColor: S.midnight }}>
      <Nav />

      {/* ── HERO ─────────────────────────────────────────────── */}
      <section className="relative flex min-h-[100svh] w-full items-end overflow-hidden" style={{ backgroundColor: S.black }}>
        <div className="absolute inset-0">
          <img src={HERO} alt="Caminho Easy Português" className="h-full w-full object-cover" style={{ opacity: 0.45 }} />
          <div className="absolute inset-0" style={{ background: `linear-gradient(135deg, ${S.midnight}e0 0%, ${S.black}88 50%, transparent 100%)` }} />
        </div>
        <div className="relative z-10 mx-auto w-full max-w-7xl px-6 pb-16 pt-32 md:grid md:grid-cols-2 md:items-end md:gap-12">
          <div>
            <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, ease: EASE }}>
              <span className="inline-flex items-center gap-2 rounded-full px-3 py-1 text-[10px] font-bold uppercase tracking-[0.22em]"
                style={{ backgroundColor: "rgba(242,169,0,0.15)", color: S.sun, border: `1px solid rgba(242,169,0,0.3)` }}>
                Caminho Português · A Pé · Ritmo Suave
              </span>
            </motion.div>
            <motion.h1 className="mt-4 font-display text-[3rem] font-light leading-[1.07] md:text-[4.2rem]"
              style={{ color: S.white }}
              initial={{ opacity: 0, y: 28 }} animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, ease: EASE, delay: 0.1 }}>
              Caminho Easy
            </motion.h1>
            <motion.p className="mt-3 text-[1.2rem] font-light" style={{ color: S.sand }}
              initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, ease: EASE, delay: 0.2 }}>
              256 km em 21 dias. Em média 12 km por dia. O Caminho no seu ritmo, sem forçar.
            </motion.p>
            <motion.div className="mt-6 flex flex-wrap gap-4 text-[13px]"
              initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, ease: EASE, delay: 0.3 }}>
              {[["256 km", "Distância total"], ["21 dias", "Duração"], ["a partir de € 2.359", "Preço p.p."]].map(([v, l]) => (
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
            <RotaEasy size={320} />
          </motion.div>
        </div>
      </section>

      {/* ── POR QUE EASY ─────────────────────────────────────── */}
      <section className="py-20" style={{ backgroundColor: S.sky }}>
        <div className="mx-auto max-w-7xl px-6">
          <Reveal>
            <h2 className="font-display text-[2.2rem] font-light" style={{ color: S.midnight }}>
              Por que o Caminho Easy é diferente
            </h2>
          </Reveal>
          <div className="mt-10 grid gap-6 md:grid-cols-3">
            {[
              { n: "01", t: "Etapas de 7 a 18 km",      d: "Média de 12 km por dia. Você termina cedo, descansa, explora o vilarejo, janta com calma. O Caminho que cabe na vida real." },
              { n: "02", t: "Sempre em hotéis",          d: "Nada de albergues compartilhados. Quarto privativo, banheiro próprio e café da manhã incluído. Descanso de verdade entre as etapas." },
              { n: "03", t: "21 dias de imersão",        d: "Mais tempo para absorver Portugal e a Galiza. Você não está correndo para Santiago, você está vivendo o Caminho." },
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

      {/* ── SOBRE ────────────────────────────────────────────── */}
      <section className="py-24" style={{ backgroundColor: S.white }}>
        <div className="mx-auto max-w-7xl px-6">
          <div className="md:grid md:grid-cols-2 md:gap-16 md:items-center">
            <Reveal>
              <span className="text-[10px] font-bold uppercase tracking-[0.28em]" style={{ color: S.sky }}>O Caminho sem pressa</span>
              <h2 className="mt-3 font-display text-[2.4rem] font-light leading-tight" style={{ color: S.midnight }}>
                256 km em 21 dias. A experiência completa.
              </h2>
              <p className="mt-5 text-[15px] font-light leading-relaxed" style={{ color: S.onLightSoft }}>
                O Caminho Easy percorre a mesma costa atlântica do Caminho da Costa, mas em um ritmo completamente diferente. Em vez de etapas de 20 a 25 km, aqui você caminha entre 7 e 18 km por dia, com média de 12 km. É possível conhecer cada vilarejo, parar em cada café, visitar cada chiesa.
              </p>
              <p className="mt-4 text-[15px] font-light leading-relaxed" style={{ color: S.onLightSoft }}>
                Ideal para quem está fazendo o Caminho pela primeira vez, para quem tem 3 semanas disponíveis ou para quem simplesmente quer viver a jornada com profundidade, sem o desgaste físico das versões mais longas.
              </p>
              <div className="mt-8 grid grid-cols-3 gap-6">
                {[["Fácil", "Dificuldade"], ["Mar a Out", "Época"], ["19 dias", "Caminhada"]].map(([v, l]) => (
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
                  alt="Caminho Easy, costa de Portugal"
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
            <h2 className="font-display text-[2.4rem] font-light" style={{ color: S.white }}>Roteiro dia a dia</h2>
            <p className="mt-2 text-[14px]" style={{ color: S.onDarkSoft }}>
              21 dias · 19 etapas de caminhada · Porto até Santiago pela costa atlântica
            </p>
          </Reveal>
          <div className="mt-10 flex flex-col gap-2">
            {ETAPAS.map((e, i) => (
              <Reveal key={i} delay={i * 0.02}>
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
                      <span className="text-[14px] font-light" style={{ color: S.white }}>{e.titulo}</span>
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
                    Programa 100% autoguiado no seu ritmo. Com 21 dias, você tem tempo para personalizar paradas, dias extras ou upgrades de hospedagem.
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
            <p className="mt-2 text-[14px]" style={{ color: S.onDarkSoft }}>Por pessoa · 20 noites incluídas · Cotação em euros</p>
          </Reveal>
          <Reveal delay={0.1}>
            <div className="mt-8 inline-flex rounded-full p-1" style={{ backgroundColor: "rgba(255,255,255,0.07)", border: `1px solid ${S.wLine}` }}>
              {TARIFAS.map((t, i) => (
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
