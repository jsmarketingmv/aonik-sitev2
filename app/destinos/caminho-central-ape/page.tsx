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
   CAMINHO CENTRAL A PÉ — Porto → Santiago de Compostela
   Paleta oficial Santiago (mesma da /jornada)
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

const HERO = wix("2d4f5b_920e9f2265b149e69fcc012023b5026d~mv2.jpg");

const GALERIA = [
  { src: wix("2d4f5b_920e9f2265b149e69fcc012023b5026d~mv2.jpg", 900, 600), tag: "O Caminho", cap: "A seta amarela no granito. O sinal que guia meio milhão de peregrinos por ano." },
  { src: wix("2d4f5b_b673e91a63554b5e9fb4a39b74af2728~mv2.jpg", 900, 600), tag: "Ponte de Lima", cap: "A cidade mais antiga de Portugal. A ponte romana, o rio Lima e o vinho verde." },
  { src: wix("2d4f5b_6fe79078b70b4c4398bd9e601646fcdd~mv2.jpeg", 900, 600), tag: "Galiza", cap: "Na Galiza espanhola, os últimos quilômetros te preparam para o choro de chegada." },
  { src: wix("2d4f5b_80e678e6de65425f90c4b56c6f998776~mv2.jpg", 900, 600), tag: "Santiago de Compostela", cap: "Praça do Obradoiro. Catedral. A Compostela nas mãos. Nenhuma foto consegue explicar." },
  { src: wix("2d4f5b_81c89a7a405a41dda38a215d2fe19d08~mv2.jpg", 900, 600), tag: "Interior Português", cap: "Bosques, aldeias de granito e capelas seculares. O Caminho Central pelo coração de Portugal." },
  { src: wix("2d4f5b_3405d40f96d84d289904dccd31fcba12~mv2.jpg", 900, 600), tag: "Norte de Portugal", cap: "Paisagens que atravessam vinhas e pedra. Cada curva revela um Portugal que o tempo preservou." },
];

const ETAPAS = [
  { dia: "DIA 1", titulo: "Chegada ao Porto",             km: "",      desc: "Recepção no hotel, entrega da credencial do peregrino e briefing completo com a equipe AONIK." },
  { dia: "DIA 2", titulo: "Mosteiró → Arcos",             km: "17 km", desc: "Transfer privado do Porto até Mosteiró. Primeiro dia de caminhada pelo interior rural do norte português, em hotel rural típico." },
  { dia: "DIA 3", titulo: "Arcos → Barcelos",             km: "20 km", desc: "Passagem pela Igreja de Rates e a lenda do galo de Barcelos. Vila medieval com mercado centenário às quintas-feiras." },
  { dia: "DIA 4", titulo: "Barcelos → Balugães",          km: "15 km", desc: "Torre Porta Nova, Igreja do Senhor Bom Jesus e a Ponte das Tábuas. Etapa tranquila por paisagem de vinhas e granito." },
  { dia: "DIA 5", titulo: "Balugães → Ponte de Lima",     km: "18 km", desc: "Avenida dos Plátanos, paisagem fluvial e chegada à cidade mais antiga de Portugal pela sua ponte romana ainda intacta." },
  { dia: "DIA 6", titulo: "Ponte de Lima → Cossourado",   km: "22 km", desc: "A etapa mais exigente: Serra da Labruja com os quilômetros mais cansativos do Caminho. Vista única recompensa cada passo." },
  { dia: "DIA 7", titulo: "Cossourado → Valença",         km: "13 km", desc: "São Bento Porta Aberta, Fontoura e a chegada à cidade abaluartada de Valença com vista panorâmica de Tuy, na Espanha." },
  { dia: "DIA 8", titulo: "Valença → O Porriño",          km: "20 km", desc: "Travessia do Rio Minho pela Ponte Internacional. Catedral de Tuy, vale do Louro. Primeiro dia em solo galego." },
  { dia: "DIA 9", titulo: "O Porriño → Arcade",           km: "22 km", desc: "Redondela e seus viadutos sobre a Ria de Vigo. Chegada a Arcade, famosa pelas melhores ostras da Galiza." },
  { dia: "DIA 10", titulo: "Arcade → Pontevedra",         km: "13 km", desc: "Ponte medieval de Pontesampaio e chegada ao centro histórico de Pontevedra, a cidade medieval mais bem preservada da Galiza." },
  { dia: "DIA 11", titulo: "Pontevedra → Caldas de Reis", km: "22 km", desc: "Vale do rio Granda, cruzeiros esculpidos e chegada à cidade termal de Caldas de Reis com suas fontes de água quente." },
  { dia: "DIA 12", titulo: "Caldas de Reis → Padrón",     km: "19 km", desc: "Lenda do Apóstolo, ponte medieval sobre o rio Bermaña. Padrón: onde a barca com os restos do Apóstolo aportou há 2.000 anos." },
  { dia: "DIA 13", titulo: "Padrón → Santiago",           km: "25 km", desc: "A etapa final. Entrada pela porta medieval, Rúa do Vilar e chegada à Praça do Obradoiro. A Compostela nas mãos." },
  { dia: "DIA 14", titulo: "Partida de Santiago",         km: "",      desc: "Café da manhã no hotel, últimas memórias e deslocamento ao aeroporto." },
];

const INCLUSOS = [
  "13 noites em hotéis 3 estrelas e pousadas rurais selecionados",
  "Café da manhã em todos os alojamentos",
  "Transfer privado Porto até Mosteiró (início do Caminho)",
  "Transporte de bagagem entre cada alojamento (1 mala por pessoa)",
  "Credencial do Peregrino oficial",
  "Roadbook impresso do Caminho",
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
  {
    temporada: "Média",
    periodo: "Mar, Abr, Mai e Out",
    duplo: "€ 1.466",
    single: "+ € 765",
  },
  {
    temporada: "Alta",
    periodo: "Jun, Jul, Ago e Set",
    duplo: "€ 1.581",
    single: "+ € 829",
  },
];

const TARIFAS_2027 = [
  {
    temporada: "Média",
    periodo: "Mar, Abr, Mai e Out",
    duplo: "€ 1.759",
    single: "+ € 918",
  },
  {
    temporada: "Alta",
    periodo: "Jun, Jul, Ago e Set",
    duplo: "€ 1.897",
    single: "+ € 995",
  },
];

/* ── SVG: Rota Central (Porto → Santiago via interior) ──────── */
function RotaCentral({ size = 280 }: { size?: number }) {
  const pts: [number, number, string][] = [
    [30,  158, "Porto"],
    [58,  126, "Barcelos"],
    [78,  100, "Ponte de Lima"],
    [105,  70, "Valença"],
    [148,  52, "Pontevedra"],
    [185,  30, "Santiago"],
  ];
  const d = pts.map(([x, y], i) => (i === 0 ? `M ${x} ${y}` : `L ${x} ${y}`)).join(" ");
  return (
    <svg viewBox="0 0 260 180" width={size} height={size * (180 / 260)}
      className="drop-shadow-xl">
      {/* Grid de fundo */}
      {[40, 80, 120, 160].map(y => (
        <line key={y} x1="0" y1={y} x2="260" y2={y} stroke={S.wLine} strokeWidth="0.5" />
      ))}
      {/* Rota */}
      <motion.path d={d} fill="none" stroke={S.sunLine} strokeWidth="3.5"
        strokeDasharray="6 4" strokeLinecap="round"
        initial={{ pathLength: 0 }} animate={{ pathLength: 1 }}
        transition={{ duration: 2.2, ease: EASE, delay: 0.4 }} />
      <motion.path d={d} fill="none" stroke={S.sun} strokeWidth="2"
        strokeDasharray="6 4" strokeLinecap="round"
        initial={{ pathLength: 0 }} animate={{ pathLength: 1 }}
        transition={{ duration: 2.2, ease: EASE, delay: 0.6 }} />
      {/* Waypoints */}
      {pts.map(([x, y, label], i) => (
        <motion.g key={i}
          initial={{ opacity: 0, scale: 0.6 }} animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, ease: EASE, delay: 0.4 + i * 0.25 }}>
          <circle cx={x} cy={y} r={i === pts.length - 1 ? 7 : 4}
            fill={i === pts.length - 1 ? S.sun : S.sky}
            stroke={i === pts.length - 1 ? S.sand : S.ocean}
            strokeWidth="1.5" />
          {i === pts.length - 1 && (
            <text x={x + 11} y={y + 4} fontSize="9" fontWeight="700"
              fill={S.sun} fontFamily="sans-serif" letterSpacing="0.06em">
              SANTIAGO
            </text>
          )}
          {i === 0 && (
            <text x={x - 2} y={y + 14} fontSize="8" fill={S.onDarkSoft}
              fontFamily="sans-serif" textAnchor="middle">Porto</text>
          )}
          {label === "Valença" && (
            <>
              <line x1={x} y1={y - 8} x2={x} y2={y - 18} stroke={S.sky} strokeWidth="0.8" />
              <text x={x + 4} y={y - 20} fontSize="7" fill={S.sky}
                fontFamily="sans-serif">Fronteira</text>
            </>
          )}
        </motion.g>
      ))}
      {/* Rótulo */}
      <text x="130" y="174" fontSize="8" fill={S.onDarkSoft}
        fontFamily="sans-serif" textAnchor="middle" letterSpacing="0.2em">
        226 km · CAMINHO INTERIOR
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

export default function CaminhoCentralApePage() {
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
          <img src={HERO} alt="Caminho Central Português" className="h-full w-full object-cover" style={{ opacity: 0.45 }} />
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
              Caminho Central
            </motion.h1>
            <motion.p className="mt-3 text-[1.2rem] font-light" style={{ color: S.sand }}
              initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, ease: EASE, delay: 0.2 }}>
              Porto até Santiago. A rota histórica clássica pelo coração de Portugal.
            </motion.p>
            <motion.div className="mt-6 flex flex-wrap gap-4 text-[13px]"
              initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, ease: EASE, delay: 0.3 }}>
              {[["226 km", "Distância total"], ["14 dias", "Duração"], ["a partir de € 1.466", "Preço p.p."]].map(([v, l]) => (
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
            <div className="mt-7">
              <Breadcrumb tone="dark" accent="#F2A900" items={[
                { label: "Home", href: "/" },
                { label: "Caminhadas", href: "/caminhadas" },
                { label: "Caminho de Santiago", href: "/jornada" },
                { label: "Caminho Central" },
              ]} />
            </div>
          </div>
          <motion.div className="mt-12 flex items-center justify-center md:mt-0"
            initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.2, ease: EASE, delay: 0.3 }}>
            <RotaCentral size={320} />
          </motion.div>
        </div>
      </section>

      {/* ── SOBRE ────────────────────────────────────────────── */}
      <section className="py-24" style={{ backgroundColor: S.white }}>
        <div className="mx-auto max-w-7xl px-6">
          <div className="md:grid md:grid-cols-2 md:gap-16 md:items-center">
            <Reveal>
              <span className="text-[10px] font-bold uppercase tracking-[0.28em]" style={{ color: S.sky }}>
                A rota clássica
              </span>
              <h2 className="mt-3 font-display text-[2.4rem] font-light leading-tight" style={{ color: S.midnight }}>
                226 quilômetros de história viva
              </h2>
              <p className="mt-5 text-[15px] font-light leading-relaxed" style={{ color: S.onLightSoft }}>
                O Caminho Português Central é a rota que atravessa o coração do norte de Portugal, de Porto até Santiago de Compostela. São 226 quilômetros de granito, vinho verde e pontes medievais que contam histórias de peregrinos que passaram há séculos.
              </p>
              <p className="mt-4 text-[15px] font-light leading-relaxed" style={{ color: S.onLightSoft }}>
                Você passa por Barcelos e sua lenda do Galo, para em Ponte de Lima, a cidade mais antiga de Portugal, cruza a fronteira em Valença com vista de Tuy, e entra na Galiza para os últimos dias que culminam na Praça do Obradoiro.
              </p>
              <div className="mt-8 grid grid-cols-3 gap-6">
                {[["Moderado", "Dificuldade"], ["Mar a Out", "Época"], ["12 dias", "Caminhada"]].map(([v, l]) => (
                  <div key={l}>
                    <p className="text-[1.2rem] font-semibold" style={{ color: S.ocean }}>{v}</p>
                    <p className="text-[12px] mt-0.5" style={{ color: S.onLightSoft }}>{l}</p>
                  </div>
                ))}
              </div>
            </Reveal>
            <Reveal delay={0.15}>
              <div className="mt-10 overflow-hidden rounded-2xl md:mt-0" style={{ aspectRatio: "4/3" }}>
                <img src={wix("2d4f5b_b673e91a63554b5e9fb4a39b74af2728~mv2.jpg", 800, 600)}
                  alt="Ponte de Lima, Caminho Português"
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
              14 dias · 12 etapas de caminhada · Porto até Santiago
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
                    Programas 100% autoguiados, no seu ritmo. Suporte AONIK disponível por telefone durante toda a jornada.
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
          {/* Toggle ano */}
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
          {/* Toggle temporada */}
          <Reveal delay={0.1}>
            <div className="mt-4 inline-flex rounded-full p-1" style={{ backgroundColor: "rgba(255,255,255,0.07)", border: `1px solid ${S.wLine}` }}>
              {tarifas.map((t, i) => (
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
          {/* Early Booking — visível apenas na temporada 2027 */}
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
