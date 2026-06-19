"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Nav from "../../components/Nav";
import Footer from "../../components/Footer";
import Contato from "../../components/Contato";
import FloatingActions from "../../components/FloatingActions";
import { Reveal, EASE } from "../../components/ui";
import { GRUPOS, datasDoAno } from "../../lib/grupos";

const GRUPO = GRUPOS.find((g) => g.id === "dana-petra")!;

/* ============================================================
   DANA ATÉ PETRA — Jordânia · Jordan Trail
   Personalidade: O DESERTO QUE MUDA DE COR. Travessia das
   eco-zonas de Dana ao arenito vermelho de Petra. RotaDesertica
   SVG (dunas em camadas + rota serpenteante), A Cidade Rosa,
   guia Juliano, vídeo Experience Jordan.
   Paleta: noite do deserto · terracota de Petra · areia · arenito.
   ============================================================ */

const D = {
  noite:    "#0c0805",   // noite no deserto
  pedra:    "#17100a",   // arenito escuro
  petra:    "#c1440e",   // vermelho terracota de Petra
  petraDeep:"#7e2407",   // arenito profundo
  areia:    "#c8a96e",   // areia dourada
  sol:      "#e0a85a",   // sol baixo
  creme:    "#f2e9da",   // areia clara
  duna:     "#6e4f2e",   // sombra de duna
  line:     "rgba(200,169,110,0.2)",
  textSoft: "rgba(242,233,218,0.62)",
};

// Helper: monta URL Wix dimensionada (avif, qualidade boa, leve)
const wx = (id: string, w: number, h: number) =>
  `https://static.wixstatic.com/media/${id}~mv2.jpg/v1/fill/w_${w},h_${h},al_c,q_82,enc_avif,quality_auto/img.jpg`;

// IDs reais das fotos da travessia (TARGET · Experience Jordan DMC)
const IMG = {
  hero:    "fe55bd_0280e88d2a6b41be8562852f23bb4ecb",
  petra:   "fe55bd_c77ec2412b624b559c583b1af35d0aa7",
  dana:    "fe55bd_aa115ec96195453f8fdaea0243196721",
  canion:  "fe55bd_452eb82c50204d4a9ea8d7bc76f6aef5",
  deserto: "fe55bd_5cae6520c18146bbaf7d91f165941069",
  trilha:  "fe55bd_4dd2e3376a994a2cb13addaf5464b644",
  vale:    "fe55bd_228281d77d7242af9b3e0d6b81474fcd",
  ridge:   "fe55bd_29c6f853b750427a82731bc1bf2dc0ac",
  vista:   "fe55bd_7b6aca2954c049e1afbe36e4d378b47e",
  ampla:   "fe55bd_e6f0089e810e469dbc4150486d95d90d",
  acamp:   "fe55bd_f32a3febb190432b85cd06c4989bd2bb",
  grupo:   "fe55bd_840cd61740fd4c4b8fb268933888656c",
  tall1:   "fe55bd_2a9b8e9be058459bbef59c172bc2c491",
  tall2:   "fe55bd_76bc2d36e0b54797b1435b182e258b7b",
  tall3:   "fe55bd_e957f3af8c5a4d108ac65b8274285ee9",
};

const GUIA_FOTO =
  "https://static.wixstatic.com/media/2d4f5b_b6d986205fad4580a62df6207a5134c9~mv2.jpg/v1/fill/w_900,h_1200,al_c,q_85,enc_avif,quality_auto/juliano.jpg";

// ============================================================
// COMPONENTE: RotaDesertica
// Dunas em camadas (curvas) + rota serpenteante animada de Dana
// a Petra + Tesouro estilizado. SEM retângulo de fundo. Muito
// movimento: dunas com drift, traço que desenha, sol e estrelas.
// ============================================================
function RotaDesertica() {
  // Cristas de duna — curvas abertas (linhas), sem preenchimento de fundo
  const ridges = [
    { d: "M-30,150 C90,116 200,142 320,122 C400,109 460,130 500,118", c: D.sol,       o: 0.30, w: 1.1 },
    { d: "M-30,214 C100,180 215,206 330,184 C420,168 470,196 500,186", c: D.areia,     o: 0.42, w: 1.3 },
    { d: "M-30,288 C90,260 210,280 345,258 C435,243 470,272 500,262",  c: D.duna,      o: 0.55, w: 1.5 },
    { d: "M-30,366 C120,342 230,360 355,340 C445,326 470,352 500,344", c: D.petraDeep, o: 0.7,  w: 1.7 },
    { d: "M-30,442 C120,422 235,438 360,422 C450,410 470,430 500,426", c: D.petra,     o: 0.5,  w: 1.5 },
  ];

  // Rota serpenteante Dana (topo) -> Petra (base), bem curva
  const rota =
    "M232,70 C300,118 250,150 226,196 C200,246 286,272 268,322 " +
    "C252,368 176,378 196,424 C210,456 244,452 252,468";

  const pontos = [
    { x: 232, y: 70,  label: "Dana",        sub: "1.500 m",        anchor: "middle" as const, c: D.areia },
    { x: 226, y: 196, label: "Wadi Araba",  sub: "deserto baixo",  anchor: "start"  as const, c: D.sol },
    { x: 268, y: 322, label: "Little Petra", sub: "cânions",       anchor: "start"  as const, c: D.areia },
    { x: 252, y: 468, label: "Petra",       sub: "a cidade rosa",  anchor: "middle" as const, c: D.petra },
  ];

  return (
    <svg viewBox="0 0 460 540" className="h-full w-full" style={{ overflow: "visible" }}>
      {/* Sol baixo no deserto — pulsa devagar */}
      <motion.circle cx="350" cy="96" r="34" fill={D.sol}
        initial={{ opacity: 0 }} animate={{ opacity: [0.18, 0.32, 0.18] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }} />
      <motion.circle cx="350" cy="96" r="34" fill="none" stroke={D.sol} strokeWidth="1"
        initial={{ opacity: 0 }} animate={{ opacity: 0.4, r: [34, 46, 34] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }} />

      {/* Estrelas tremeluzentes */}
      {[[60, 60], [120, 40], [410, 150], [90, 110], [380, 60], [30, 170]].map(([x, y], i) => (
        <motion.circle key={i} cx={x} cy={y} r="1.4" fill={D.creme}
          initial={{ opacity: 0 }}
          animate={{ opacity: [0.15, 0.7, 0.15] }}
          transition={{ duration: 3 + i * 0.6, repeat: Infinity, ease: "easeInOut", delay: i * 0.4 }} />
      ))}

      {/* Cristas de duna em camadas — desenham e fazem leve drift contínuo */}
      {ridges.map((l, i) => (
        <motion.path key={i} d={l.d} fill="none" stroke={l.c} strokeWidth={l.w}
          strokeLinecap="round" strokeOpacity={l.o}
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1, x: [0, i % 2 === 0 ? 12 : -12, 0] }}
          transition={{
            pathLength: { duration: 1.8, ease: EASE, delay: 0.2 + i * 0.12 },
            x: { duration: 13 + i * 3, repeat: Infinity, ease: "easeInOut" },
          }} />
      ))}

      {/* Rota: trilha guia + traço pontilhado que desenha */}
      <motion.path d={rota} fill="none" stroke={D.petra} strokeWidth="2.4"
        strokeOpacity="0.18" strokeLinecap="round"
        initial={{ pathLength: 0 }} animate={{ pathLength: 1 }}
        transition={{ duration: 3, ease: EASE, delay: 0.6 }} />
      <motion.path d={rota} fill="none" stroke={D.areia} strokeWidth="2.4"
        strokeDasharray="2 8" strokeLinecap="round"
        initial={{ pathLength: 0, opacity: 0 }} animate={{ pathLength: 1, opacity: 1 }}
        transition={{ duration: 3.4, ease: EASE, delay: 0.9 }} />
      {/* cometa que flui pela rota — strokeDashoffset, sem SMIL */}
      <motion.path d={rota} fill="none" stroke={D.creme} strokeWidth="3"
        strokeLinecap="round" strokeDasharray="14 460"
        initial={{ strokeDashoffset: 474, opacity: 0 }}
        animate={{ strokeDashoffset: [474, 0], opacity: [0, 1, 1, 0] }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: 3.4 }} />

      {/* Pontos da travessia — pino + pulso */}
      {pontos.map((p, i) => (
        <motion.g key={p.label}
          initial={{ opacity: 0, scale: 0 }} animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, ease: EASE, delay: 1.4 + i * 0.4 }}>
          <motion.circle cx={p.x} cy={p.y} r="6" fill="none" stroke={p.c} strokeWidth="1.2"
            animate={{ r: [6, 16, 6], opacity: [0.6, 0, 0.6] }}
            transition={{ duration: 2.6, repeat: Infinity, ease: "easeOut", delay: i * 0.5 }} />
          <circle cx={p.x} cy={p.y} r="5" fill={D.noite} stroke={p.c} strokeWidth="2" />
          <circle cx={p.x} cy={p.y} r="1.8" fill={p.c} />
          <text x={p.x + (p.anchor === "start" ? 14 : 0)} y={p.y - 12} fill={D.creme}
            fontSize="13" textAnchor={p.anchor} letterSpacing="0.5"
            style={{ fontFamily: "'Fraunces', Georgia, serif" }}>{p.label}</text>
          <text x={p.x + (p.anchor === "start" ? 14 : 0)} y={p.y + (p.anchor === "start" ? 4 : 22)}
            fill={p.c} fontSize="8.5" textAnchor={p.anchor} letterSpacing="1.4" opacity="0.9"
            style={{ fontFamily: "sans-serif", textTransform: "uppercase" }}>{p.sub}</text>
        </motion.g>
      ))}

      {/* Tesouro de Petra estilizado, na base — desenha por último */}
      <motion.g initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, ease: EASE, delay: 3 }}>
        <g transform="translate(330, 360)" stroke={D.petra} strokeWidth="1.6" fill="none" strokeLinecap="round">
          {/* frontão + colunas do Al-Khazneh */}
          <path d="M6,90 L6,40 L54,40 L54,90" />
          <path d="M0,40 L30,8 L60,40" />
          <path d="M22,90 L22,48 L38,48 L38,90" stroke={D.areia} />
          <line x1="14" y1="46" x2="14" y2="90" />
          <line x1="46" y1="46" x2="46" y2="90" />
          <circle cx="30" cy="26" r="4" stroke={D.areia} />
        </g>
      </motion.g>

      {/* distância total ao centro */}
      <motion.text x="120" y="300" fill={D.areia} fontSize="11" letterSpacing="3"
        textAnchor="middle" opacity="0.5"
        initial={{ opacity: 0 }} animate={{ opacity: 0.5 }} transition={{ delay: 2.4, duration: 1 }}
        style={{ fontStyle: "italic" }}>77 km</motion.text>
    </svg>
  );
}

// ============================================================
// COMPONENTE: VideoFilme — thumb -> iframe YouTube inline
// ============================================================
function VideoFilme({ videoId }: { videoId: string }) {
  const [playing, setPlaying] = useState(false);
  const thumb = `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`;
  const src =
    `https://www.youtube.com/embed/${videoId}` +
    `?autoplay=1&rel=0&modestbranding=1&controls=1&playsinline=1`;

  return (
    <div className="relative w-full cursor-pointer overflow-hidden rounded-2xl"
      style={{ aspectRatio: "16/9" }} onClick={() => setPlaying(true)}>
      <AnimatePresence mode="wait">
        {!playing ? (
          <motion.div key="thumb" initial={{ opacity: 0 }} animate={{ opacity: 1 }}
            exit={{ opacity: 0 }} transition={{ duration: 0.3 }} className="group h-full w-full">
            <img src={thumb} alt="A travessia Dana até Petra em vídeo"
              className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.04]" />
            <div className="absolute inset-0"
              style={{ background: `linear-gradient(to bottom, transparent 35%, ${D.noite}cc)` }} />
            <div className="absolute inset-0 rounded-2xl" style={{ boxShadow: `inset 0 0 0 1px ${D.line}` }} />
            <div className="absolute inset-0 flex items-center justify-center">
              <motion.div whileHover={{ scale: 1.1 }}
                className="flex h-16 w-16 items-center justify-center rounded-full"
                style={{ background: "rgba(193,68,14,0.92)", backdropFilter: "blur(8px)" }}>
                <svg className="ml-1 h-6 w-6" viewBox="0 0 24 24" fill={D.creme}>
                  <path d="M8 5v14l11-7z" />
                </svg>
              </motion.div>
            </div>
            <div className="absolute bottom-4 left-5 right-5 flex items-end justify-between">
              <span className="text-[11px] font-semibold uppercase tracking-[0.22em]" style={{ color: D.areia }}>
                Assistir à travessia
              </span>
              <span className="text-[11px]" style={{ color: "rgba(242,233,218,0.6)" }}>
                Experience Jordan
              </span>
            </div>
          </motion.div>
        ) : (
          <motion.div key="iframe" initial={{ opacity: 0 }} animate={{ opacity: 1 }}
            transition={{ duration: 0.3 }} className="absolute inset-0">
            <iframe src={src} allow="autoplay; encrypted-media; picture-in-picture"
              allowFullScreen className="h-full w-full border-0" />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

// ============================================================
// COMPONENTE: ElevationProfile — Dana alto -> Wadi Araba baixo -> Petra
// ============================================================
const HILL_PATH =
  "M 0,70 C 60,66 110,60 150,78 C 196,98 232,176 286,196 " +
  "C 330,212 372,206 414,200 C 470,192 512,150 560,150 " +
  "C 612,150 648,176 700,168 C 748,160 786,120 836,112 " +
  "C 884,104 922,128 960,150";
const HILL_FILL = HILL_PATH + " L 960,240 L 0,240 Z";

const PERFIL = [
  { x: 14,  y: 70,  label: "Dana",        sub: "1.500 m",  anchor: "start"  as const },
  { x: 286, y: 196, label: "Wadi Araba",  sub: "ponto baixo", anchor: "middle" as const },
  { x: 560, y: 150, label: "Ras al Feid", sub: "cânions",  anchor: "middle" as const },
  { x: 836, y: 112, label: "Little Petra", sub: "dia 6",   anchor: "middle" as const },
  { x: 946, y: 150, label: "Petra",       sub: "chegada",  anchor: "end"    as const },
];

function ElevationProfile() {
  return (
    <svg viewBox="0 0 960 260" className="w-full" style={{ overflow: "visible" }}>
      <defs>
        <linearGradient id="dpFill" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={D.petra} stopOpacity="0.32" />
          <stop offset="100%" stopColor={D.petra} stopOpacity="0.03" />
        </linearGradient>
      </defs>
      {[60, 100, 140, 180].map((y) => (
        <line key={y} x1={0} y1={y} x2={960} y2={y} stroke={D.line} strokeWidth="0.6" />
      ))}
      <path d={HILL_FILL} fill="url(#dpFill)" />
      <motion.path d={HILL_PATH} fill="none" stroke={D.areia} strokeWidth="2.2" strokeLinecap="round"
        initial={{ pathLength: 0, opacity: 0 }}
        whileInView={{ pathLength: 1, opacity: 1 }} viewport={{ once: true }}
        transition={{ duration: 3.6, ease: EASE, delay: 0.2 }} />
      {PERFIL.map((w) => (
        <g key={w.label}>
          <line x1={w.x} y1={w.y} x2={w.x} y2={218} stroke={D.petra} strokeWidth="1"
            strokeDasharray="2 3" strokeOpacity="0.45" />
          <circle cx={w.x} cy={w.y} r="4.5" fill={D.noite} stroke={D.petra} strokeWidth="1.8" />
          <text x={w.x} y={w.y - 10} fill={D.creme} fontSize="10" textAnchor={w.anchor}
            letterSpacing="0.5" style={{ fontFamily: "sans-serif" }}>{w.label}</text>
          <text x={w.x} y={w.y - 22} fill={D.areia} fontSize="8.5" textAnchor={w.anchor}
            letterSpacing="1.2" opacity="0.85"
            style={{ fontFamily: "sans-serif", textTransform: "uppercase" }}>{w.sub}</text>
        </g>
      ))}
    </svg>
  );
}

// ============================================================
// COMPONENTE: GaleriaInterativa — galeria completa real
// ============================================================
const GALERIA = [
  { id: IMG.hero,    cap: "Wadi Araba, o deserto que muda de cor a cada hora", tag: "Deserto" },
  { id: IMG.dana,    cap: "Reserva da Biosfera de Dana, a partida da travessia", tag: "Dana" },
  { id: IMG.canion,  cap: "Cânions labirínticos de arenito vermelho", tag: "Cânion" },
  { id: IMG.acamp,   cap: "Acampamento selvagem sob o céu da Jordânia", tag: "Acampamento" },
  { id: IMG.trilha,  cap: "Trilha entre paredes de rocha esculpida pelo vento", tag: "Trilha" },
  { id: IMG.grupo,   cap: "O grupo em expedição pelo Jordan Trail", tag: "Grupo" },
  { id: IMG.ridge,   cap: "Ridges e vales que cruzam zonas climáticas", tag: "Travessia" },
  { id: IMG.vale,    cap: "Descida dramática rumo ao Wadi Araba", tag: "Vale" },
  { id: IMG.petra,   cap: "Little Petra até Petra, a chegada à cidade rosa", tag: "Petra" },
];

function GaleriaInterativa() {
  const [idx, setIdx] = useState(0);
  const img = GALERIA[idx];
  return (
    <div className="grid gap-3 md:grid-cols-[1fr_210px]">
      <AnimatePresence mode="wait">
        <motion.div key={idx} initial={{ opacity: 0.5, scale: 1.02 }} animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0 }} transition={{ duration: 0.45, ease: EASE }}
          className="relative overflow-hidden rounded-2xl" style={{ aspectRatio: "16/10" }}>
          <img src={wx(img.id, 1280, 800)} alt={img.cap} className="absolute inset-0 h-full w-full object-cover" />
          <div className="absolute inset-0" style={{ background: `linear-gradient(to top, ${D.noite}cc 0%, transparent 55%)` }} />
          <div className="absolute bottom-0 left-0 right-0 p-6">
            <span className="text-[10px] font-semibold uppercase tracking-[0.32em]" style={{ color: D.areia }}>{img.tag}</span>
            <p className="mt-1 text-[14px] font-light" style={{ color: D.creme }}>{img.cap}</p>
          </div>
          <div className="absolute right-4 top-4">
            <span className="text-[11px] font-medium" style={{ color: "rgba(242,233,218,0.55)" }}>{idx + 1}/{GALERIA.length}</span>
          </div>
        </motion.div>
      </AnimatePresence>
      <div className="flex gap-2 overflow-x-auto md:flex-col md:overflow-visible">
        {GALERIA.map((g, i) => (
          <button key={i} onClick={() => setIdx(i)}
            className="relative shrink-0 overflow-hidden rounded-xl transition-all duration-300"
            style={{ width: 210, height: 70, opacity: i === idx ? 1 : 0.42,
              outline: i === idx ? `2px solid ${D.petra}` : "2px solid transparent", outlineOffset: 2 }}>
            <img src={wx(g.id, 420, 140)} alt={g.tag}
              className="h-full w-full object-cover transition-transform duration-300 hover:scale-[1.05]" />
          </button>
        ))}
      </div>
    </div>
  );
}

// ============================================================
// DADOS
// ============================================================
const STATS = [
  { v: "10",      u: "dias",        s: "9 noites" },
  { v: "77",      u: "quilômetros", s: "5 dias de caminhada" },
  { v: "+2.679",  u: "metros",      s: "positivo acumulado" },
  { v: "-2.859",  u: "metros",      s: "descida acumulada" },
  { v: "4",       u: "eco-zonas",   s: "Reserva de Dana" },
  { v: "1 de 15", u: "no mundo",    s: "trilha · National Geographic" },
];

// 3 marcos da travessia — imagens reais alternando esq/dir
const MARCOS = [
  {
    id: "dana",
    kicker: "Dia 2 · A porta da expedição",
    titulo: ["Reserva de", "Dana"],
    texto:
      "A maior reserva natural da Jordânia, com quatro eco-zonas distintas num só horizonte. A 1.500 m de altitude, o ar ainda é fresco e o verde resiste. Daqui a travessia desce, dia após dia, rumo ao deserto. O primeiro acampamento selvagem fica em Mansoura.",
    detalhe: "1.500 m · 15 km · +260 m / -690 m",
    img: IMG.dana,
    bg: D.pedra,
    imgDireita: true,
    colors: { kicker: D.areia, title: D.creme, titleAccent: D.areia, body: "rgba(242,233,218,0.78)", detalhe: D.areia, link: D.creme },
  },
  {
    id: "wadi-araba",
    kicker: "Dias 3 a 5 · O deserto muda tudo",
    titulo: ["Wadi", "Araba"],
    texto:
      "A descida para um dos desertos mais baixos do planeta. Paredes de arenito que vão do rosa ao ocre profundo, cânions labirínticos e noites de silêncio absoluto sob um céu de estrelas. Cada passo cruza uma zona climática diferente. É aqui que a Jordânia mostra sua face mais selvagem.",
    detalhe: "Cânions · acampamentos selvagens · Ras al Feid",
    img: IMG.canion,
    bg: D.petraDeep,
    imgDireita: false,
    colors: { kicker: "rgba(242,233,218,0.7)", title: D.creme, titleAccent: D.areia, body: "rgba(242,233,218,0.78)", detalhe: D.creme, link: D.creme },
  },
  {
    id: "petra",
    kicker: "Dia 6 · A obra-prima nabateia",
    titulo: ["A cidade", "de Petra"],
    texto:
      "A chegada acontece pela porta dos fundos, descendo de Little Petra direto ao coração da cidade rosa. Fachadas cinzeladas no arenito vermelho, o Mosteiro, o Tesouro, o Siq. National Geographic elegeu este trecho uma das quinze melhores trilhas do mundo. Você entende o porquê quando a rocha se abre.",
    detalhe: "Little Petra a Petra · Patrimônio da Humanidade",
    img: IMG.petra,
    bg: D.petra,
    imgDireita: true,
    colors: { kicker: "rgba(242,233,218,0.7)", title: D.creme, titleAccent: D.creme, body: "rgba(242,233,218,0.82)", detalhe: D.creme, link: D.creme },
  },
];

const ROTEIRO = [
  { d: "01", icon: "✈", t: "Chegada a Amman",
    s: "Recepção no Aeroporto Rainha Alia e transfer privado ao hotel em Amman. Briefing da expedição e primeira noite na capital jordaniana." },
  { d: "02", icon: "🏜", t: "Amman · Dana · Mansoura",
    s: "15 km · +260 m / -690 m. Transfer até a Reserva da Biosfera de Dana. Início da caminhada pelas quatro eco-zonas até o acampamento selvagem de Mansoura. Café, almoço de trilha e jantar inclusos." },
  { d: "03", icon: "⛰", t: "Mansoura · Ras al Feid",
    s: "Etapa desafiadora e recompensadora. Vistas das Montanhas Sharah e do Deserto de Wadi Araba. Travessia de cânions até o acampamento de Al Furon." },
  { d: "04", icon: "🪨", t: "Ras al Feid · Wadi Araba",
    s: "Descida rumo ao deserto baixo, entre formações de arenito e paredões esculpidos pelo vento. Acampamento estruturado em pleno deserto, sob o céu estrelado." },
  { d: "05", icon: "🧭", t: "Os cânions de Shkaret Msaied",
    s: "Travessia pelos cânions labirínticos que antecedem Petra. Geologia que muda de cor a cada curva, do branco ao vermelho intenso. Última noite de acampamento na trilha." },
  { d: "06", icon: "🏛", t: "Little Petra · Petra",
    s: "O grande dia. Entrada em Petra pela rota dos fundos, descendo de Little Petra ao Mosteiro e ao coração da cidade rosa. Chegada e hospedagem em hotel em Petra." },
  { d: "07", icon: "🌅", t: "Petra, dia completo",
    s: "Exploração da cidade nabateia: o Siq, o Tesouro de Al-Khazneh, o Teatro, as Tumbas Reais. Tempo para sentir, sem pressa, um dos lugares mais impressionantes do mundo." },
  { d: "08", icon: "🐪", t: "Petra · Amman",
    s: "Manhã livre em Petra e retorno a Amman pela Estrada do Rei. Paradas em mirantes históricos ao longo do caminho. Noite na capital." },
  { d: "09", icon: "🕌", t: "Amman cultural",
    s: "Dia para conhecer a Amman antiga: a Cidadela, o Teatro Romano e os mercados. Jantar de despedida do grupo." },
  { d: "10", icon: "🏁", t: "Partida",
    s: "Café da manhã no hotel e transfer para o Aeroporto Rainha Alia, conforme o horário do voo. Fim dos serviços." },
];

const INCLUSO = [
  "Transfer privado aeroporto · hotel em Amman (chegada e partida)",
  "Hospedagem em hotel em Amman e em Petra (quartos duplos)",
  "Acampamentos totalmente estruturados no deserto",
  "Todas as refeições da travessia (café, box lunch e jantar)",
  "Guia local especializado da Experience Jordan (DMC parceira)",
  "Liderança e acompanhamento de Juliano P. Sant'ana (TARGET)",
  "Transfer de bagagem entre os acampamentos",
  "Acesso à Reserva da Biosfera de Dana e áreas protegidas",
  "Mochila de ataque e suporte de segurança em campo",
];

const NAO_INCLUSO = [
  "Passagem aérea internacional e conexões",
  "Visto de entrada na Jordânia",
  "Seguro viagem para esportes de aventura (obrigatório)",
  "Equipamentos pessoais (saco de dormir, bastões, botas)",
  "Bebidas alcoólicas e refeições fora do programa",
  "Passeios opcionais e gastos pessoais",
];

// ============================================================
// PAGE
// ============================================================
export default function DanaPetraPage() {
  const datas2027 = datasDoAno(GRUPO, 2027);

  return (
    <main className="relative" style={{ background: D.creme }}>
      <Nav />

      {/* ===== HERO ===== */}
      <section className="relative flex min-h-[100svh] w-full items-center overflow-hidden" style={{ background: D.noite }}>
        {/* foto real da galeria + leve ken burns */}
        <motion.div className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url('${wx(IMG.hero, 2400, 1500)}')` }}
          initial={{ scale: 1.12 }} animate={{ scale: 1 }} transition={{ duration: 14, ease: "easeOut" }} />
        <div className="absolute inset-0"
          style={{ background: `linear-gradient(to right, ${D.noite}f2 0%, ${D.noite}b0 52%, ${D.noite}66 100%)` }} />
        <motion.div className="absolute inset-0 z-[1]" style={{ background: D.noite, pointerEvents: "none" }}
          initial={{ opacity: 1 }} animate={{ opacity: 0 }} transition={{ duration: 0.9, delay: 0.4 }} />

        <div className="relative z-10 mx-auto grid w-full max-w-[1400px] items-center gap-10 px-6 py-28 md:grid-cols-2 md:gap-16 md:px-10">
          <div>
            <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, ease: EASE, delay: 0.2 }} className="mb-4 flex items-center gap-3">
              <span className="text-2xl">🇯🇴</span>
              <span className="text-[11px] font-semibold uppercase tracking-[0.4em]" style={{ color: D.areia }}>
                Jordânia · Jordan Trail
              </span>
            </motion.div>
            <motion.h1 initial={{ opacity: 0, y: 32 }} animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.1, ease: EASE, delay: 0.3 }}
              className="font-display font-light uppercase leading-[0.86] tracking-[-0.02em]"
              style={{ fontSize: "clamp(3.2rem, 8vw, 7.5rem)", color: D.creme }}>
              Dana até
              <br />
              <span style={{ color: D.petra }}>Petra</span>
            </motion.h1>
            <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, ease: EASE, delay: 0.48 }}
              className="mt-3 font-display font-light italic"
              style={{ fontSize: "clamp(1rem, 2vw, 1.5rem)", color: D.creme, opacity: 0.62 }}>
              Dez dias. Setenta e sete quilômetros. Um deserto que muda de cor.
            </motion.p>
            <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, ease: EASE, delay: 0.55 }}
              className="mt-6 max-w-md text-[15px] font-light leading-relaxed md:text-base"
              style={{ color: "rgba(242,233,218,0.74)" }}>
              A travessia mais célebre do Jordan Trail liga a Reserva de Dana à cidade
              rosa de Petra, atravessando cânions, planaltos e o deserto de Wadi Araba.{" "}
              <span style={{ color: D.creme }}>Uma das quinze melhores trilhas do mundo.</span>
            </motion.p>
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, ease: EASE, delay: 0.7 }} className="mt-8 flex flex-wrap items-center gap-5">
              <a href="#reservar"
                className="inline-flex items-center gap-3 rounded-full px-8 py-4 text-[13px] font-semibold uppercase tracking-[0.16em] transition-transform duration-300 hover:scale-[1.03]"
                style={{ background: D.petra, color: D.creme }}>
                Reserve sua vaga <span>&#8594;</span>
              </a>
              <span>
                <span className="text-[12px] uppercase tracking-[0.16em]" style={{ color: "rgba(242,233,218,0.5)" }}>a partir de</span>{" "}
                <span className="font-display text-2xl" style={{ color: D.creme }}>US$ 5.250</span>
              </span>
            </motion.div>
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1, delay: 0.95 }}
              className="mt-5 inline-flex items-center gap-2 rounded-full border px-4 py-2 text-[11px] uppercase tracking-[0.16em]"
              style={{ borderColor: D.petra, color: D.areia }}>
              <span className="h-1.5 w-1.5 rounded-full animate-pulse" style={{ background: D.petra }} />
              Saída confirmada · 18 a 27 Out 2027
            </motion.div>
          </div>

          <motion.div initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1.2, ease: EASE, delay: 0.35 }}
            className="mx-auto hidden w-full max-w-[440px] md:block" style={{ height: 460 }}>
            <RotaDesertica />
          </motion.div>
        </div>
      </section>

      {/* ===== STATS BAR ===== */}
      <section className="grid grid-cols-2 gap-px md:grid-cols-3 lg:grid-cols-6"
        style={{ background: D.line, borderTop: `1px solid ${D.line}` }}>
        {STATS.map((s, i) => (
          <Reveal key={i} delay={i * 0.04}>
            <div className="flex flex-col px-6 py-8" style={{ background: D.pedra }}>
              <span className="font-display font-light leading-none" style={{ fontSize: "clamp(1.7rem,3vw,2.5rem)", color: D.creme }}>{s.v}</span>
              <span className="mt-1 text-[11px] font-semibold uppercase tracking-[0.2em]" style={{ color: D.petra }}>{s.u}</span>
              <span className="mt-1 text-[12px] font-light" style={{ color: D.textSoft }}>{s.s}</span>
            </div>
          </Reveal>
        ))}
      </section>

      {/* ===== A CIDADE ROSA (centerpiece) ===== */}
      <section className="relative w-full overflow-hidden" style={{ background: D.petraDeep }}>
        <div className="pointer-events-none absolute inset-0 flex items-center justify-center overflow-hidden">
          <span className="select-none font-display font-light uppercase"
            style={{ fontSize: "clamp(5rem,18vw,16rem)", color: "rgba(242,233,218,0.05)",
              letterSpacing: "-0.04em", lineHeight: 1, whiteSpace: "nowrap" }}>
            PETRA
          </span>
        </div>
        <div className="relative z-10 mx-auto max-w-[1000px] px-6 py-32 text-center md:py-44">
          <Reveal>
            <p className="text-[11px] font-semibold uppercase tracking-[0.4em]" style={{ color: D.creme, opacity: 0.6 }}>
              O fenômeno do arenito
            </p>
          </Reveal>
          <Reveal delay={0.1}>
            <h2 className="mt-6 font-display font-light leading-[1.05]" style={{ fontSize: "clamp(2.4rem,5.5vw,4.6rem)", color: D.creme }}>
              A pedra que
              <br />
              <span className="italic" style={{ color: D.areia }}>guarda a luz</span>
            </h2>
          </Reveal>
          <Reveal delay={0.18}>
            <p className="mx-auto mt-8 max-w-2xl text-[16px] font-light leading-relaxed" style={{ color: "rgba(242,233,218,0.74)" }}>
              Os nabateus escolheram o arenito por um motivo. Ao amanhecer e no fim
              da tarde, a rocha absorve o sol e devolve um vermelho que parece vir de
              dentro dela. Petra não é rosa por acaso, é rosa porque a luz fica presa
              ali.{" "}
              <span style={{ color: D.creme, fontStyle: "italic" }}>Você precisa estar lá na hora certa.</span>
            </p>
          </Reveal>
        </div>
      </section>

      {/* ===== PERFIL DE ELEVAÇÃO ===== */}
      <section className="w-full overflow-hidden pb-0 pt-16" style={{ background: D.pedra }}>
        <div className="mx-auto px-4 md:px-8">
          <Reveal>
            <p className="mb-8 text-center text-[11px] font-semibold uppercase tracking-[0.4em]" style={{ color: D.areia, opacity: 0.8 }}>
              Perfil da travessia · 77 km · do alto de Dana ao deserto
            </p>
          </Reveal>
          <Reveal delay={0.05}><ElevationProfile /></Reveal>
        </div>
      </section>

      {/* ===== 3 MARCOS ===== */}
      {MARCOS.map((m) => (
        <section key={m.id} className="w-full" style={{ background: m.bg }}>
          <div className={`grid md:grid-cols-2 ${m.imgDireita ? "" : "md:[direction:rtl]"}`}>
            <div className="relative min-h-[420px] overflow-hidden md:min-h-[560px]" style={{ direction: "ltr" }}>
              <div className="absolute inset-0 bg-cover bg-center transition-transform duration-700 hover:scale-[1.03]"
                style={{ backgroundImage: `url('${wx(m.img, 1400, 1000)}')` }} />
              <div className="absolute inset-0" style={{ background: `linear-gradient(to bottom, transparent 35%, ${m.bg}cc 100%)` }} />
              <div className="absolute bottom-4 left-5">
                <span className="text-[10px] font-semibold uppercase tracking-[0.3em]" style={{ color: m.colors.detalhe }}>{m.detalhe}</span>
              </div>
            </div>
            <div className="flex flex-col justify-center px-8 py-16 md:px-14 md:py-20" style={{ direction: "ltr" }}>
              <Reveal>
                <p className="text-[11px] font-semibold uppercase tracking-[0.35em]" style={{ color: m.colors.kicker }}>{m.kicker}</p>
              </Reveal>
              <Reveal delay={0.08}>
                <h2 className="mt-5 font-display font-light uppercase leading-[0.88]" style={{ fontSize: "clamp(2.4rem,4.5vw,4rem)", color: m.colors.title }}>
                  {m.titulo[0]}
                  <br />
                  <span style={{ color: m.colors.titleAccent }}>{m.titulo[1]}</span>
                </h2>
              </Reveal>
              <Reveal delay={0.14}>
                <p className="mt-6 max-w-sm text-[15px] font-light leading-relaxed" style={{ color: m.colors.body }}>{m.texto}</p>
              </Reveal>
              <Reveal delay={0.2}>
                <a href="#reservar" className="mt-8 inline-flex w-fit items-center gap-2 text-[12px] font-semibold uppercase tracking-[0.18em] transition-opacity hover:opacity-70" style={{ color: m.colors.link }}>
                  Quero vivenciar <span>&#8594;</span>
                </a>
              </Reveal>
            </div>
          </div>
        </section>
      ))}

      {/* ===== VÍDEO ===== */}
      <section className="px-6 py-24 md:px-10 md:py-32" style={{ background: D.noite }}>
        <div className="mx-auto grid max-w-[1280px] items-center gap-12 md:grid-cols-2 md:gap-16">
          <div>
            <Reveal>
              <p className="text-[11px] font-semibold uppercase tracking-[0.35em]" style={{ color: D.areia }}>O filme da travessia</p>
            </Reveal>
            <Reveal delay={0.08}>
              <h2 className="mt-5 font-display font-light leading-[1.0]" style={{ fontSize: "clamp(2.4rem, 5vw, 4.2rem)", color: D.creme }}>
                Veja antes
                <br />
                de <span className="italic" style={{ color: D.areia }}>caminhar</span>
              </h2>
            </Reveal>
            <Reveal delay={0.14}>
              <p className="mt-5 max-w-sm text-[15px] font-light leading-relaxed" style={{ color: D.textSoft }}>
                Imagens reais da Experience Jordan, nossa parceira local nesta
                expedição. Cada trilha revela um novo capítulo do deserto, dos cânions
                de Dana às fachadas de Petra.
              </p>
            </Reveal>
          </div>
          <Reveal delay={0.1}>
            <VideoFilme videoId="0ySghDGwlhU" />
          </Reveal>
        </div>
      </section>

      {/* ===== GALERIA ===== */}
      <section className="px-6 py-20 md:px-10 md:py-28" style={{ background: D.pedra }}>
        <div className="mx-auto max-w-[1280px]">
          <Reveal>
            <p className="text-[11px] font-semibold uppercase tracking-[0.35em]" style={{ color: D.areia }}>Galeria</p>
            <h2 className="mt-4 font-display font-light" style={{ fontSize: "clamp(1.8rem,3.5vw,2.8rem)", color: D.creme }}>
              O que você vai viver
            </h2>
          </Reveal>
          <Reveal delay={0.1} className="mt-8"><GaleriaInterativa /></Reveal>
        </div>
      </section>

      {/* ===== ROTEIRO ===== */}
      <section className="px-6 py-24 md:px-10 md:py-32" style={{ background: D.noite }}>
        <div className="mx-auto max-w-[1100px]">
          <Reveal>
            <p className="text-[11px] font-semibold uppercase tracking-[0.32em]" style={{ color: D.areia }}>Roteiro dia a dia</p>
          </Reveal>
          <Reveal delay={0.08}>
            <p className="mt-3 max-w-lg text-[14px] font-light leading-relaxed" style={{ color: D.textSoft }}>
              Cinco dias de caminhada real entre acampamentos selvagens, mais Amman e
              Petra para começar e fechar a jornada com tempo de sobra.
            </p>
          </Reveal>
          <div className="mt-12">
            {ROTEIRO.map((r, i) => (
              <Reveal key={r.d} delay={i * 0.04}>
                <div className="grid grid-cols-[auto_1fr] items-baseline gap-6 border-t py-7 md:gap-10" style={{ borderColor: D.line }}>
                  <div className="flex items-center gap-4">
                    <span className="font-display text-sm" style={{ color: D.petra }}>{r.d}</span>
                    <span className="text-lg">{r.icon}</span>
                  </div>
                  <div>
                    <h3 className="font-display font-light" style={{ fontSize: "clamp(1.1rem,2vw,1.5rem)", color: D.creme }}>{r.t}</h3>
                    <p className="mt-1.5 text-[14px] font-light leading-relaxed" style={{ color: D.textSoft }}>{r.s}</p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ===== O LÍDER DA JORNADA · JULIANO ===== */}
      <section className="px-6 py-24 md:px-10 md:py-32" style={{ background: D.pedra, color: D.creme }}>
        <div className="mx-auto max-w-[1280px]">
          <Reveal>
            <p className="flex items-center gap-3 text-[11px] font-semibold uppercase tracking-[0.3em]" style={{ color: D.areia }}>
              <span className="h-px w-8" style={{ background: D.areia }} />
              O líder da jornada
            </p>
          </Reveal>

          <div className="mt-10 grid items-start gap-10 md:grid-cols-[420px_1fr] md:gap-16">
            <Reveal>
              <div className="relative overflow-hidden rounded-2xl" style={{ height: 540 }}>
                <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: `url('${GUIA_FOTO}')` }} />
                <div className="absolute inset-0" style={{ background: `linear-gradient(to top, ${D.pedra}ee 0%, transparent 55%)` }} />
                <div className="absolute inset-x-0 bottom-0 p-7">
                  <p className="font-display text-[1.6rem] font-light leading-tight" style={{ color: D.creme }}>Juliano P. Sant'ana</p>
                  <p className="mt-1 text-[12px] uppercase tracking-[0.18em]" style={{ color: D.areia }}>Blumenau · Santa Catarina</p>
                </div>
              </div>
            </Reveal>

            <Reveal delay={0.1}>
              <div>
                <h2 className="font-display font-light leading-[1.05] tracking-[-0.01em]" style={{ fontSize: "clamp(2rem,3.8vw,3rem)", color: D.creme }}>
                  Juliano P. Sant'ana
                </h2>
                <p className="mt-2 text-[12px] uppercase tracking-[0.2em]" style={{ color: D.areia }}>Sócio-fundador da TARGET Trekking</p>
                <p className="mt-6 max-w-xl text-[15px] font-light leading-relaxed" style={{ color: "rgba(242,233,218,0.74)" }}>
                  Apaixonado pelos esportes de natureza, do salto de paraquedas ao
                  mergulho. Montanhista por paixão, peregrino e amante de trilhas e
                  viagens de caminhada que promovam transformação e encontros humanos.
                  Especialista em gestão e marketing, tem como missão de vida conectar
                  pessoas à natureza e a si mesmas através das caminhadas.
                </p>

                <div className="mt-8">
                  <p className="mb-4 text-[11px] font-semibold uppercase tracking-[0.22em]" style={{ color: "rgba(242,233,218,0.4)" }}>
                    Expedições de referência
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {[
                      { p: "Salkantay a Machu Picchu · 4.600 m", f: "🇵🇪" },
                      { p: "Aconcágua · 6.962 m", f: "🇦🇷" },
                      { p: "Kilimanjaro · 5.895 m", f: "🇹🇿" },
                      { p: "Huayna Potosí · 6.088 m", f: "🇧🇴" },
                      { p: "Monte Roraima · 3 anos", f: "🇻🇪" },
                      { p: "Tour du Mont Blanc", f: "🇫🇷" },
                      { p: "Alta Via 1 · Dolomitas", f: "🇮🇹" },
                      { p: "Caminho de Santiago · 515 km", f: "🇪🇸" },
                    ].map((e) => (
                      <span key={e.p} className="rounded-full border px-4 py-1.5 text-[12px] font-light"
                        style={{ borderColor: "rgba(200,169,110,0.3)", color: "rgba(242,233,218,0.7)" }}>
                        {e.f} {e.p}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="mt-8 rounded-2xl border px-5 py-4 text-[13px] font-light leading-relaxed"
                  style={{ borderColor: D.line, color: "rgba(242,233,218,0.66)" }}>
                  Em campo, a TARGET caminha ao lado da{" "}
                  <span style={{ color: D.areia }}>Experience Jordan</span>, nossa parceira
                  local (DMC) com guias beduínos e suporte completo de acampamento e logística.
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ===== RESERVE SUA VAGA + PREÇO ===== */}
      <section id="reservar" className="px-6 py-24 md:px-10 md:py-32" style={{ background: D.petraDeep }}>
        <div className="mx-auto max-w-[1280px]">
          <Reveal>
            <p className="text-[11px] font-semibold uppercase tracking-[0.35em]" style={{ color: D.creme, opacity: 0.6 }}>Saída confirmada</p>
          </Reveal>
          <Reveal delay={0.08}>
            <h2 className="mt-5 font-display font-light leading-[1.05]" style={{ fontSize: "clamp(2rem,4.5vw,3.6rem)", color: D.creme }}>
              Quando você quer
              <br />
              <span className="italic" style={{ color: D.areia }}>caminhar até Petra?</span>
            </h2>
          </Reveal>

          <Reveal delay={0.1}>
            <div className="mt-10 grid gap-5 md:grid-cols-2">
              {datas2027.map((d) => (
                <div key={d} className="rounded-2xl p-7" style={{ background: "rgba(193,68,14,0.18)", border: `1px solid rgba(193,68,14,0.4)` }}>
                  <div className="flex items-center justify-between">
                    <span className="rounded-full px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.2em]" style={{ background: D.petra, color: D.creme }}>confirmada</span>
                    <span className="text-[11px]" style={{ color: D.textSoft }}>10 dias</span>
                  </div>
                  <p className="mt-6 font-display font-light" style={{ fontSize: "clamp(1.6rem,3vw,2.4rem)", color: D.creme }}>{d}</p>
                  <p className="mt-1 text-[12px] font-light" style={{ color: D.textSoft }}>Deserto da Jordânia · Outubro 2027</p>
                  <a href="#contato" className="mt-6 inline-flex items-center gap-2 text-[12px] font-semibold uppercase tracking-[0.18em] transition-opacity hover:opacity-75" style={{ color: D.areia }}>
                    Reservar vaga &#8594;
                  </a>
                </div>
              ))}
              {/* card de garantia/grupo */}
              <div className="rounded-2xl p-7" style={{ background: "rgba(200,169,110,0.08)", border: `1px solid rgba(200,169,110,0.2)` }}>
                <div className="flex items-center justify-between">
                  <span className="rounded-full px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.2em]" style={{ border: `1px solid ${D.areia}`, color: D.areia }}>grupo pequeno</span>
                  <span className="text-[11px]" style={{ color: D.textSoft }}>mín. 5 pessoas</span>
                </div>
                <p className="mt-6 font-display font-light" style={{ fontSize: "clamp(1.3rem,2.5vw,1.9rem)", color: D.creme }}>
                  Liderança brasileira
                </p>
                <p className="mt-1 text-[12px] font-light" style={{ color: D.textSoft }}>
                  Juliano (TARGET) + guia local Experience Jordan
                </p>
              </div>
            </div>
          </Reveal>

          <Reveal delay={0.15}>
            <div className="mt-14 flex flex-col gap-4 border-t pt-10 md:flex-row md:items-center md:justify-between" style={{ borderColor: "rgba(193,68,14,0.3)" }}>
              <div>
                <p className="text-[11px] font-semibold uppercase tracking-[0.2em]" style={{ color: D.textSoft }}>Investimento</p>
                <p className="mt-2 font-display font-light" style={{ fontSize: "clamp(2rem,3.5vw,2.8rem)", color: D.creme }}>
                  US$ 5.250
                  <span className="ml-3 text-[14px]" style={{ color: D.textSoft }}>por pessoa · quarto duplo</span>
                </p>
                <p className="mt-1 text-[13px] font-light" style={{ color: D.textSoft }}>
                  30% de entrada via Pix ou transferência. Saldo parcelado. Vagas limitadas.
                </p>
              </div>
              <a href="#contato" className="inline-flex shrink-0 items-center gap-3 rounded-full px-8 py-4 text-[13px] font-semibold uppercase tracking-[0.16em] transition-transform duration-300 hover:scale-[1.03]" style={{ background: D.petra, color: D.creme }}>
                Falar com a equipe &#8594;
              </a>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ===== INCLUSO / NÃO INCLUSO ===== */}
      <section className="px-6 py-24 md:px-10 md:py-32" style={{ background: D.pedra, color: D.creme }}>
        <div className="mx-auto grid max-w-[1280px] gap-12 md:grid-cols-2 md:gap-20">
          <Reveal>
            <p className="text-[11px] font-semibold uppercase tracking-[0.32em]" style={{ color: D.areia }}>Está incluso</p>
            <ul className="mt-8 space-y-4">
              {INCLUSO.map((item) => (
                <li key={item} className="flex items-start gap-4 text-[14px] font-light leading-relaxed" style={{ color: D.creme }}>
                  <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full" style={{ background: D.petra }} />
                  {item}
                </li>
              ))}
            </ul>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="text-[11px] font-semibold uppercase tracking-[0.32em]" style={{ color: "rgba(193,68,14,0.6)" }}>Não incluso</p>
            <ul className="mt-8 space-y-4">
              {NAO_INCLUSO.map((item) => (
                <li key={item} className="flex items-start gap-4 text-[14px] font-light leading-relaxed" style={{ color: D.textSoft }}>
                  <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full" style={{ background: "rgba(193,68,14,0.4)" }} />
                  {item}
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
      </section>

      {/* ===== AONIKIA ===== */}
      <section className="px-6 py-20 md:px-10 md:py-24" style={{ background: D.petraDeep }}>
        <div className="mx-auto max-w-[860px] text-center">
          <Reveal>
            <p className="text-[11px] font-semibold uppercase tracking-[0.3em]" style={{ color: D.creme, opacity: 0.6 }}>
              AonikIA · especialista nesta travessia
            </p>
            <h2 className="mt-5 font-display font-light leading-[1.15]" style={{ fontSize: "clamp(1.8rem,3.5vw,2.8rem)", color: D.creme }}>
              Pergunte tudo sobre Dana e Petra
            </h2>
            <p className="mx-auto mt-4 max-w-md text-[15px] font-light leading-relaxed" style={{ color: "rgba(242,233,218,0.66)" }}>
              Como se preparar para o deserto, qual a melhor época, o que levar na
              mochila de ataque, como funciona o visto. A AonikIA conhece esta
              travessia de ponta a ponta.
            </p>
            <a href="#contato" className="mt-7 inline-flex items-center gap-3 rounded-full border px-7 py-3.5 text-[12px] font-semibold uppercase tracking-[0.16em] transition-all duration-300 hover:opacity-80" style={{ borderColor: D.areia, color: D.areia }}>
              Conversar com a AonikIA <span>&#8594;</span>
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
