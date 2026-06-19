"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Nav from "../../components/Nav";
import Footer from "../../components/Footer";
import Contato from "../../components/Contato";
import FloatingActions from "../../components/FloatingActions";
import { Reveal, EASE } from "../../components/ui";

/* ================================================================
   CAMINHO FRANCÊS — SARRIA · 7 ETAPAS
   112 km · 7 dias / 6 noites · 5 etapas de caminhada
   Paleta SANTIAGO — SUN dominante (distinto do Português)
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
  midLine:     "rgba(0,32,91,0.14)",
};

const wix = (id: string, w = 1920, h = 1080) =>
  `https://static.wixstatic.com/media/${id}/v1/fill/w_${w},h_${h},q_90,enc_avif,quality_auto/${id}`;

const HERO = wix("2d4f5b_6fe79078b70b4c4398bd9e601646fcdd~mv2.jpeg");

const GALERIA = [
  { src: wix("2d4f5b_6fe79078b70b4c4398bd9e601646fcdd~mv2.jpeg", 900, 600), tag: "A Galiza", cap: "Na Galiza, o Caminho fica mais verde, mais íntimo. As aldeias de pedra aparecem a cada curva." },
  { src: wix("2d4f5b_920e9f2265b149e69fcc012023b5026d~mv2.jpg", 900, 600), tag: "A Seta Amarela", cap: "A seta amarela aponta. Você segue. Simples assim. Isso é o Caminho de Santiago." },
  { src: wix("2d4f5b_b673e91a63554b5e9fb4a39b74af2728~mv2.jpg", 900, 600), tag: "O Caminho", cap: "Pedra, granito, musgo e silêncio. A estrada medieval que sobreviveu a tudo." },
  { src: wix("2d4f5b_80e678e6de65425f90c4b56c6f998776~mv2.jpg", 900, 600), tag: "Santiago", cap: "A Catedral de Santiago. O destino. Depois de 112 km a pé, ela aparece e você entende tudo." },
  { src: wix("2d4f5b_3405d40f96d84d289904dccd31fcba12~mv2.jpg", 900, 600), tag: "Portomarín", cap: "Portomarín, a cidade que foi submersa e reconstruída pedra por pedra. A história do Caminho em miniatura." },
  { src: wix("2d4f5b_596f7144ab49417692221a0fa9dab404~mv2.jpg", 900, 600), tag: "A Chegada", cap: "Os últimos quilômetros são os mais silenciosos. Cada passo vale por todos." },
];

const ETAPAS = [
  { dia: "DIA 1", titulo: "Chegada em Sárria",             km: "",      desc: "Chegada na histórica cidade de Sárria, ponto de partida dos últimos 112 km do Caminho Francês. Check-in, credencial do peregrino e briefing sobre a rota. Uma noite para descansar antes de começar." },
  { dia: "DIA 2", titulo: "Sárria → Portomarín",           km: "22 km", desc: "A primeira etapa. Saída de Sárria pelas pedras milenares, cruzando pontes romanas e bosques de carvalhos. Chegada em Portomarín, cidade que foi submersa por um reservatório e reconstruída pedra por pedra nos anos 1960." },
  { dia: "DIA 3", titulo: "Portomarín → Palas de Rei",     km: "25 km", desc: "A etapa mais longa. Subidas suaves, campos de milho e as primeiras aldeias rurais da Galiza interior. Palas de Rei era parada obrigatória dos reis medievais que faziam o Caminho." },
  { dia: "DIA 4", titulo: "Palas de Rei → Arzúa",          km: "28 km", desc: "A etapa mais rica em aldeiashistóricas. Atravessa Melide, famosa pelo polvo à galega (pulpo) que os peregrinos param para comer. Chegada em Arzúa, no coração da Galiza queijeira." },
  { dia: "DIA 5", titulo: "Arzúa → Pedrouzo",              km: "19 km", desc: "Uma das etapas mais tranquilas. Bosques de eucaliptos, aldeias quietas, o ritmo desacelera. Pedrouzo é a última parada antes de Santiago e tem o melhor silêncio do Caminho." },
  { dia: "DIA 6", titulo: "Pedrouzo → Santiago de Compostela", km: "19 km", desc: "O último dia. A chegada à Catedral. 19 km que passam em menos de 5 horas, mas que você vai lembrar por décadas. A Praça do Obradoiro te recebe. Você chegou." },
  { dia: "DIA 7", titulo: "Partida",                       km: "",      desc: "Café da manhã em Santiago. Missa do Peregrino na Catedral (opcional, fortemente recomendada). Tempo livre para explorar o centro histórico antes do deslocamento de volta." },
];

const INCLUSOS = [
  "6 noites em hospedagem selecionada com banheiro privativo",
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
  {
    label: "Standard",
    stars: "2★ / 3★",
    duplo: "€ 580",
    single: "€ 850",
  },
  {
    label: "Premium",
    stars: "3★ / 4★ · Pousadas",
    duplo: "€ 750",
    single: "€ 1.050",
  },
];

/* ── SVG: Rota Sarria → Santiago (com vieira no fundo) ───── */
function RotaSarria7({ size = 300 }: { size?: number }) {
  const pts: [number, number, string][] = [
    [245, 110, "Sárria"],
    [195,  90, "Portomarín"],
    [148,  80, "Palas de Rei"],
    [100,  72, "Arzúa"],
    [54,   62, "Pedrouzo"],
    [18,   52, "Santiago"],
  ];
  const d = pts.map(([x, y], i) => (i === 0 ? `M ${x} ${y}` : `L ${x} ${y}`)).join(" ");

  return (
    <svg viewBox="0 0 265 175" width={size} height={size * (175 / 265)}>
      {/* Vieira (scallop shell) no fundo — símbolo do Caminho */}
      <g opacity={0.18}>
        <path d="M 132 155 L 132 75" stroke={S.sun} strokeWidth="1" fill="none"/>
        {[-40,-25,-10,5,20,35,50].map((offset, i) => {
          const cx = 132 + offset;
          const r = 18 + i * 2;
          return <path key={i} d={`M ${cx} 155 Q ${cx - r/2} ${155 - r} ${cx} ${155 - r * 1.8} Q ${cx + r/2} ${155 - r} ${cx} 155`}
            stroke={S.sun} strokeWidth="0.8" fill="none"/>;
        })}
        <ellipse cx="132" cy="155" rx="55" ry="8" stroke={S.sun} strokeWidth="0.8" fill="none"/>
      </g>
      {/* Rota */}
      <motion.path d={d} fill="none" stroke="rgba(242,169,0,0.22)" strokeWidth="4" strokeLinecap="round"/>
      <motion.path d={d} fill="none" stroke={S.sun} strokeWidth="2" strokeDasharray="7 4" strokeLinecap="round"
        initial={{ pathLength: 0 }} animate={{ pathLength: 1 }}
        transition={{ duration: 2.2, ease: EASE, delay: 0.4 }} />
      {/* Waypoints */}
      {pts.map(([x, y, label], i) => (
        <motion.g key={i}
          initial={{ opacity: 0, scale: 0.4 }} animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.4, ease: EASE, delay: 0.6 + i * 0.2 }}>
          <circle cx={x} cy={y} r={i === 0 || i === pts.length - 1 ? 6.5 : 3.5}
            fill={i === pts.length - 1 ? S.sun : i === 0 ? "rgba(242,169,0,0.35)" : "rgba(242,169,0,0.18)"}
            stroke={S.sun} strokeWidth="1.5" />
          {(i === 0 || i === pts.length - 1) && (
            <text x={i === pts.length - 1 ? x - 6 : x + 10} y={y - 10}
              fontSize={i === pts.length - 1 ? "8" : "7.5"} fontWeight="700"
              fill={S.white} fontFamily="sans-serif" textAnchor={i === pts.length - 1 ? "end" : "start"}>
              {label}
            </text>
          )}
        </motion.g>
      ))}
      {/* Seta → oeste */}
      <motion.text x="130" y="130" fontSize="16" fill={S.sun} textAnchor="middle" opacity={0.35}
        initial={{ opacity: 0 }} animate={{ opacity: 0.35 }}
        transition={{ delay: 1.8, duration: 0.7, ease: EASE }}>←</motion.text>
      {/* Fronteira Galiza */}
      <motion.line x1="220" y1="40" x2="220" y2="130" stroke={S.sand} strokeWidth="0.8"
        strokeDasharray="3 3" opacity={0.3}
        initial={{ opacity: 0 }} animate={{ opacity: 0.3 }}
        transition={{ delay: 1.2, duration: 0.6, ease: EASE }} />
      <text x="222" y="60" fontSize="6" fill={S.sand} fontFamily="sans-serif" opacity={0.5} transform="rotate(90 222 60)">GALIZA</text>
      <text x="130" y="170" fontSize="7.5" fill={S.onDarkSoft} fontFamily="sans-serif"
        textAnchor="middle" letterSpacing="0.18em">112 km · 5 ETAPAS · GALIZA</text>
    </svg>
  );
}

/* ── Galeria Interativa ─────────────────────────────────── */
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
          className="absolute left-4 top-1/2 -translate-y-1/2 flex h-10 w-10 items-center justify-center rounded-full"
          style={{ background: "rgba(0,32,91,0.6)", color: S.sun, fontSize: "1.1rem" }}>‹</button>
        <button onClick={() => setIdx(i => (i + 1) % GALERIA.length)}
          className="absolute right-4 top-1/2 -translate-y-1/2 flex h-10 w-10 items-center justify-center rounded-full"
          style={{ background: "rgba(0,32,91,0.6)", color: S.sun, fontSize: "1.1rem" }}>›</button>
      </div>
      <div className="grid grid-cols-6 gap-2">
        {GALERIA.map((g, i) => (
          <button key={i} onClick={() => setIdx(i)}
            className="relative overflow-hidden rounded-lg" style={{ aspectRatio: "16/10",
              outline: i === idx ? `2px solid ${S.midnight}` : "2px solid transparent", outlineOffset: 2 }}>
            <img src={g.src} alt="" className="h-full w-full object-cover"
              style={{ opacity: i === idx ? 1 : 0.4 }} />
          </button>
        ))}
      </div>
    </div>
  );
}

export default function Sarria7EtapasPage() {
  const [tier, setTier] = useState(0);
  const [etapaAberta, setEtapaAberta] = useState<number | null>(null);
  const t = TIERS[tier];

  return (
    <main className="relative" style={{ backgroundColor: S.sun }}>
      <Nav />

      {/* ── HERO — SUN dominante ──────────────────────────── */}
      <section className="relative flex min-h-[100svh] w-full items-end overflow-hidden" style={{ backgroundColor: S.midnight }}>
        <div className="absolute inset-0">
          <img src={HERO} alt="Caminho Francês, Sarria" className="h-full w-full object-cover"
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
              Sarria · 7 Etapas
            </motion.h1>
            <motion.p className="mt-3 text-[1.2rem] font-light" style={{ color: S.sand }}
              initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, ease: EASE, delay: 0.2 }}>
              O trecho mínimo. A Galiza inteira. 112 km que mudam tudo.
            </motion.p>
            <motion.div className="mt-6 flex flex-wrap gap-4 text-[13px]"
              initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, ease: EASE, delay: 0.3 }}>
              {[["112 km", "Distância"], ["7 dias", "Duração"], ["a partir de € 580", "Preço p.p."]].map(([v, l]) => (
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
            <RotaSarria7 size={340} />
          </motion.div>
        </div>
      </section>

      {/* ── SOBRE ─────────────────────────────────────────── */}
      <section className="py-24" style={{ backgroundColor: S.white }}>
        <div className="mx-auto max-w-7xl px-6">
          <div className="md:grid md:grid-cols-2 md:gap-16 md:items-center">
            <Reveal>
              <span className="text-[10px] font-bold uppercase tracking-[0.28em]" style={{ color: S.sky }}>
                Caminho Francês · Galiza
              </span>
              <h2 className="mt-3 font-display text-[2.4rem] font-light leading-tight" style={{ color: S.midnight }}>
                Sárria: onde o Caminho começa para a maioria dos peregrinos.
              </h2>
              <p className="mt-5 text-[15px] font-light leading-relaxed" style={{ color: S.onLightSoft }}>
                Sárria fica a exatamente 112 km de Santiago, a distância mínima exigida pela Igreja para receber a Compostela, o certificado oficial de conclusão. Por isso, é o ponto de partida mais popular do mundo: cada ano, dezenas de milhares de peregrinos começam aqui.
              </p>
              <p className="mt-4 text-[15px] font-light leading-relaxed" style={{ color: S.onLightSoft }}>
                O percurso corta o coração da Galiza rural: pontes romanas, aldeias de granito, bosques de carvalhos, campos de milho. Cinco etapas, seis noites, e uma chegada à Catedral de Santiago que você vai lembrar para sempre.
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
                <img src={wix("2d4f5b_920e9f2265b149e69fcc012023b5026d~mv2.jpg", 800, 600)}
                  alt="Caminho de Santiago, Galiza"
                  className="h-full w-full object-cover" />
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
              Por que começar em Sárria
            </h2>
          </Reveal>
          <div className="mt-10 md:grid md:grid-cols-3 md:gap-8">
            {[
              { n: "112 km", t: "A distância mínima",    d: "Exatamente o suficiente para receber a Compostela, o certificado oficial emitido pela Igreja Católica. Sárria é o ponto de partida que garante o documento." },
              { n: "A Galiza",  t: "100% em solo galego", d: "Todo o percurso passa pela Galiza espanhola. Granito, hórreos, vinho Albariño, polvo à galega em Melide. Cultura, gastronomia e paisagem concentradas em 5 etapas." },
              { n: "Para todos", t: "O Caminho acessível",  d: "Sem precisar de experiência prévia de trekking. As etapas são moderadas, bem sinalizadas e com infraestrutura de peregrinos em cada vila do percurso." },
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

      {/* ── ITINERÁRIO — SUN bg ─────────────────────────── */}
      <section className="py-24" style={{ backgroundColor: S.sun }}>
        <div className="mx-auto max-w-4xl px-6">
          <Reveal>
            <h2 className="font-display text-[2.4rem] font-light" style={{ color: S.midnight }}>Roteiro dia a dia</h2>
            <p className="mt-2 text-[14px]" style={{ color: "rgba(0,32,91,0.6)" }}>
              7 dias · 5 etapas de caminhada · Sárria até Santiago de Compostela
            </p>
          </Reveal>
          <div className="mt-10 flex flex-col gap-2">
            {ETAPAS.map((e, i) => (
              <Reveal key={i} delay={i * 0.06}>
                <button
                  onClick={() => setEtapaAberta(etapaAberta === i ? null : i)}
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
                <div className="mt-8 rounded-xl p-5" style={{ backgroundColor: "rgba(255,255,255,0.07)", border: `1px solid ${S.wLine}` }}>
                  <p className="text-[13px] font-light leading-relaxed" style={{ color: S.onDarkSoft }}>
                    O programa é autoguiado: você caminha no seu ritmo, sem guia físico. As hospedagens e o transfer de bagagem estão pré-organizados para cada etapa.
                  </p>
                </div>
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
            <p className="mt-2 text-[14px]" style={{ color: S.onDarkSoft }}>Por pessoa · 6 noites incluídas · Cotação em euros</p>
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
