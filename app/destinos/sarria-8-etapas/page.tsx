"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Nav from "../../components/Nav";
import Breadcrumb from "../../components/Breadcrumb";
import Footer from "../../components/Footer";
import Contato from "../../components/Contato";
import FloatingActions from "../../components/FloatingActions";
import { Reveal, EASE } from "../../components/ui";

/* ================================================================
   CAMINHO FRANCÊS — SARRIA · 8 ETAPAS
   112 km · 8 dias / 7 noites · 6 etapas de caminhada
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

const HERO = wix("2d4f5b_b673e91a63554b5e9fb4a39b74af2728~mv2.jpg");

const GALERIA = [
  { src: wix("2d4f5b_b673e91a63554b5e9fb4a39b74af2728~mv2.jpg", 900, 600), tag: "O Caminho", cap: "Pedra granítica, musgo e silêncio. A estrada medieval que guiou reis e poetas por mil anos." },
  { src: wix("2d4f5b_6fe79078b70b4c4398bd9e601646fcdd~mv2.jpeg", 900, 600), tag: "A Galiza", cap: "Aldeias de granito, hórreos e milheiras. A Galiza rural que o Caminho preservou intacta." },
  { src: wix("2d4f5b_920e9f2265b149e69fcc012023b5026d~mv2.jpg", 900, 600), tag: "A Seta", cap: "A seta amarela: o símbolo mais simples e mais confiável do Caminho. Ela nunca falha." },
  { src: wix("2d4f5b_80e678e6de65425f90c4b56c6f998776~mv2.jpg", 900, 600), tag: "Santiago", cap: "A Praça do Obradoiro. O fim. O começo do que você vai carregar para sempre." },
  { src: wix("2d4f5b_3405d40f96d84d289904dccd31fcba12~mv2.jpg", 900, 600), tag: "Melide", cap: "Melide, capital do polvo à galega. Uma parada obrigatória no dia 4 desta versão do Caminho." },
  { src: wix("2d4f5b_596f7144ab49417692221a0fa9dab404~mv2.jpg", 900, 600), tag: "Os Peregrinos", cap: "Estranhos no primeiro dia, amigos para a vida no terceiro. Isso é o Caminho." },
];

const ETAPAS = [
  { dia: "DIA 1", titulo: "Chegada em Sárria",                 km: "",      desc: "Chegada em Sárria, a cidade que marca o início dos últimos 112 km. Recepção, credencial do peregrino e orientação sobre a rota. Uma boa noite de sono antes do primeiro passo." },
  { dia: "DIA 2", titulo: "Sárria → Portomarín",               km: "22 km", desc: "A estreia. Saída pelas ruas medievais de Sárria e descida para o Rio Miño. Travessia da ponte de Portomarín, a cidade que foi relocada pedra por pedra quando o reservatório foi construído nos anos 1960." },
  { dia: "DIA 3", titulo: "Portomarín → Palas de Rei",          km: "25 km", desc: "A etapa mais longa desta versão. Subidas suaves pelo interior galego, campos de milho e aldeias que parecem saídas de um conto medieval. Palas de Rei era parada obrigatória da realeza que fazia o Caminho." },
  { dia: "DIA 4", titulo: "Palas de Rei → Melide",              km: "16 km", desc: "Etapa curta e recuperadora, exclusiva desta versão de 8 etapas. Chegada cedo em Melide, capital galega do polvo. Tarde livre para explorar o mercado, provar o pulpo e descansar bem." },
  { dia: "DIA 5", titulo: "Melide → Arzúa",                     km: "14 km", desc: "A etapa mais tranquila de todo o percurso. Apenas 14 km pelo interior da Galiza queijeira. Arzúa é famosa pelo queijo de tetilla e pelo seu mercado semanal." },
  { dia: "DIA 6", titulo: "Arzúa → Pedrouzo",                   km: "19 km", desc: "Os peregrinos ficam em silêncio nesta etapa. O bosque de eucaliptos, o cheiro da terra molhada, a sensação de que está quase lá. Pedrouzo é a última parada antes de Santiago." },
  { dia: "DIA 7", titulo: "Pedrouzo → Santiago de Compostela", km: "19 km", desc: "O último dia. 19 km que passam rapidíssimo. A entrada em Santiago pelo Monte do Gozo, onde os peregrinos avistam as torres da Catedral pela primeira vez. A Praça do Obradoiro e a chegada que muda tudo." },
  { dia: "DIA 8", titulo: "Partida",                            km: "",      desc: "Café da manhã em Santiago. Missa do Peregrino na Catedral às 12h (fortemente recomendada). Tempo livre para a Compostela, para o mercado e para uma última olhada na Catedral antes de partir." },
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
  "Transfer de chegada até Sárria e de saída de Santiago",
  "Seguro viagem completo",
  "Almoços e jantares",
  "Bebidas e gorjetas",
  "Despesas pessoais",
];

const TIERS = [
  { label: "Standard", stars: "2★ / 3★",              duplo: "€ 680", single: "€ 980"   },
  { label: "Premium",  stars: "3★ / 4★ · Pousadas",   duplo: "€ 850", single: "€ 1.190" },
];

const TIERS_2027 = [
  { label: "Standard", stars: "2★ / 3★",              duplo: "€ 816",   single: "€ 1.176" },
  { label: "Premium",  stars: "3★ / 4★ · Pousadas",   duplo: "€ 1.020", single: "€ 1.428" },
];

/* ── SVG: Sarria 8 Etapas — 6 waypoints + Melide destaque ── */
function RotaSarria8({ size = 300 }: { size?: number }) {
  const pts: [number, number, string][] = [
    [245, 115, "Sárria"],
    [205,  98, "Portomarín"],
    [165,  84, "Palas de Rei"],
    [125,  72, "Melide"],
    [88,   62, "Arzúa"],
    [52,   54, "Pedrouzo"],
    [18,   46, "Santiago"],
  ];
  const d = pts.map(([x, y], i) => (i === 0 ? `M ${x} ${y}` : `L ${x} ${y}`)).join(" ");

  return (
    <svg viewBox="0 0 265 175" width={size} height={size * (175 / 265)}>
      {/* "DIA EXTRA" badge */}
      <motion.rect x="100" y="6" width="68" height="16" rx="8"
        fill="rgba(242,169,0,0.15)" stroke={S.sun} strokeWidth="0.8"
        initial={{ opacity: 0 }} animate={{ opacity: 1 }}
        transition={{ delay: 1.6, duration: 0.6, ease: EASE }} />
      <motion.text x="134" y="16.5" fontSize="7" fontWeight="700" fill={S.sun}
        textAnchor="middle" fontFamily="sans-serif" letterSpacing="0.12em"
        initial={{ opacity: 0 }} animate={{ opacity: 1 }}
        transition={{ delay: 1.8, duration: 0.5, ease: EASE }}>DIA EXTRA</motion.text>
      {/* Rota */}
      <motion.path d={d} fill="none" stroke="rgba(242,169,0,0.22)" strokeWidth="4" strokeLinecap="round"/>
      <motion.path d={d} fill="none" stroke={S.sun} strokeWidth="2" strokeDasharray="7 4" strokeLinecap="round"
        initial={{ pathLength: 0 }} animate={{ pathLength: 1 }}
        transition={{ duration: 2.4, ease: EASE, delay: 0.4 }} />
      {/* Waypoints */}
      {pts.map(([x, y, label], i) => {
        const isMelide = label === "Melide";
        const isStart = i === 0;
        const isEnd = i === pts.length - 1;
        return (
          <motion.g key={i}
            initial={{ opacity: 0, scale: 0.4 }} animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.4, ease: EASE, delay: 0.7 + i * 0.18 }}>
            <circle cx={x} cy={y}
              r={isStart || isEnd ? 6 : isMelide ? 5 : 3.5}
              fill={isEnd ? S.sun : isMelide ? "rgba(242,169,0,0.35)" : "rgba(242,169,0,0.18)"}
              stroke={S.sun} strokeWidth={isMelide ? "2" : "1.5"} />
            {(isStart || isEnd || isMelide) && (
              <text x={isEnd ? x - 5 : x + 8} y={isMelide ? y - 9 : y - 10}
                fontSize={isEnd ? "8" : "7.5"} fontWeight="700"
                fill={S.white} fontFamily="sans-serif"
                textAnchor={isEnd ? "end" : "start"}>{label}</text>
            )}
          </motion.g>
        );
      })}
      <text x="130" y="170" fontSize="7.5" fill={S.onDarkSoft} fontFamily="sans-serif"
        textAnchor="middle" letterSpacing="0.18em">112 km · 6 ETAPAS · DIA EXTRA</text>
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

export default function Sarria8EtapasPage() {
  const [tier, setTier] = useState(0);
  const [ano, setAno] = useState(0);
  const [etapaAberta, setEtapaAberta] = useState<number | null>(null);
  const tiers = ano === 0 ? TIERS : TIERS_2027;
  const t = tiers[tier];

  return (
    <main className="relative" style={{ backgroundColor: S.sun }}>
      <Nav />

      {/* ── HERO ─────────────────────────────────────────── */}
      <section className="relative flex min-h-[100svh] w-full items-end overflow-hidden" style={{ backgroundColor: S.midnight }}>
        <div className="absolute inset-0">
          <img src={HERO} alt="Caminho Francês, 8 Etapas" className="h-full w-full object-cover"
            style={{ opacity: 0.42 }} />
          <div className="absolute inset-0" style={{ background: `linear-gradient(135deg, ${S.midnight}e8 0%, ${S.midnight}88 55%, transparent 100%)` }} />
        </div>
        <div className="relative z-10 mx-auto w-full max-w-7xl px-6 pb-16 pt-32 md:grid md:grid-cols-2 md:items-end md:gap-12">
          <div>
            <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, ease: EASE }}>
              <span className="inline-flex items-center gap-2 rounded-full px-3 py-1 text-[10px] font-bold uppercase tracking-[0.22em]"
                style={{ backgroundColor: "rgba(242,169,0,0.15)", color: S.sun, border: `1px solid rgba(242,169,0,0.3)` }}>
                Caminho Francês · A Pé · Sarria
              </span>
            </motion.div>
            <motion.h1 className="mt-4 font-display text-[2.8rem] font-light leading-[1.07] md:text-[3.8rem]"
              style={{ color: S.white }}
              initial={{ opacity: 0, y: 28 }} animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, ease: EASE, delay: 0.1 }}>
              Sarria · 8 Etapas
            </motion.h1>
            <motion.p className="mt-3 text-[1.2rem] font-light" style={{ color: S.sand }}
              initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, ease: EASE, delay: 0.2 }}>
              A mesma rota. Um dia a mais. Mais descanso, mais conversa, mais Caminho.
            </motion.p>
            <motion.div className="mt-6 flex flex-wrap gap-4 text-[13px]"
              initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, ease: EASE, delay: 0.3 }}>
              {[["112 km", "Distância"], ["8 dias", "Duração"], ["a partir de € 680", "Preço p.p."]].map(([v, l]) => (
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
            <div className="mt-7">
              <Breadcrumb tone="dark" accent="#F2A900" items={[
                { label: "Home", href: "/" },
                { label: "Caminhadas", href: "/caminhadas" },
                { label: "Caminho de Santiago", href: "/jornada" },
                { label: "Sarria · 8 Etapas" },
              ]} />
            </div>
          </div>
          <motion.div className="mt-12 flex items-center justify-center md:mt-0"
            initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.2, ease: EASE, delay: 0.3 }}>
            <RotaSarria8 size={340} />
          </motion.div>
        </div>
      </section>

      {/* ── SOBRE ─────────────────────────────────────────── */}
      <section className="py-24" style={{ backgroundColor: S.white }}>
        <div className="mx-auto max-w-7xl px-6">
          <div className="md:grid md:grid-cols-2 md:gap-16 md:items-center">
            <Reveal>
              <span className="text-[10px] font-bold uppercase tracking-[0.28em]" style={{ color: S.sky }}>
                O Caminho com mais tempo
              </span>
              <h2 className="mt-3 font-display text-[2.4rem] font-light leading-tight" style={{ color: S.midnight }}>
                Um dia a mais muda a qualidade de tudo.
              </h2>
              <p className="mt-5 text-[15px] font-light leading-relaxed" style={{ color: S.onLightSoft }}>
                A versão de 8 etapas percorre os mesmos 112 km que a versão de 7, mas com uma etapa a mais entre Palas de Rei e Arzúa, passando um dia inteiro em Melide. Isso divide as etapas longas em dois dias mais curtos e dá tempo para explorar a vila, provar o polvo à galega e simplesmente descansar sem pressa.
              </p>
              <p className="mt-4 text-[15px] font-light leading-relaxed" style={{ color: S.onLightSoft }}>
                Para quem quer fazer o Caminho sem se preocupar com ritmo, ou para grupos com pessoas de diferentes condicionamentos físicos, esta é a versão ideal.
              </p>
              <div className="mt-8 grid grid-cols-3 gap-6">
                {[["Média", "Dificuldade"], ["O ano todo", "Época"], ["Autoguiado", "Formato"]].map(([v, l]) => (
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
                  alt="Galiza, Caminho de Santiago" className="h-full w-full object-cover" />
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
              O que muda com um dia a mais
            </h2>
          </Reveal>
          <div className="mt-10 md:grid md:grid-cols-3 md:gap-8">
            {[
              { n: "Melide",    t: "A capital do polvo galego",    d: "Com uma tarde livre em Melide, você tem tempo para provar o pulpo à feira no mercado, visitar a Igreja de San Roque e descansar antes das últimas etapas." },
              { n: "Menos km", t: "Etapas mais curtas nos dias 4 e 5", d: "Em vez de uma etapa de 28 km direto para Arzúa, você divide em 16 km + 14 km. Pernas mais descansadas, mais energia para aproveitar." },
              { n: "O ritmo",  t: "Mais conversa, mais Caminho",    d: "Caminhadas mais curtas significam mais tempo nas esplanadas, mais conversas com outros peregrinos, mais presença. Menos pressa é mais Caminho." },
            ].map((p, i) => (
              <Reveal key={i} delay={i * 0.1}>
                <div className="rounded-2xl p-6" style={{ backgroundColor: "rgba(255,255,255,0.05)", border: `1px solid ${S.wLine}` }}>
                  <span className="text-[1.3rem] font-bold" style={{ color: S.sun }}>{p.n}</span>
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
              8 dias · 6 etapas de caminhada · Sárria até Santiago de Compostela
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
            <h2 className="font-display text-[2.4rem] font-light" style={{ color: S.white }}>Tarifas</h2>
            <p className="mt-2 text-[14px]" style={{ color: S.onDarkSoft }}>Por pessoa · 7 noites incluídas · Cotação em euros</p>
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
              {tiers.map((tier_item, i) => (
                <button key={i} onClick={() => setTier(i)}
                  className="rounded-full px-6 py-2 text-[13px] font-medium transition-all duration-200"
                  style={{ backgroundColor: tier === i ? S.sun : "transparent", color: tier === i ? S.midnight : S.onDarkSoft }}>
                  {tier_item.label}
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
