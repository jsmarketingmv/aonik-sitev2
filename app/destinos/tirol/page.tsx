"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Nav from "../../components/Nav";
import Footer from "../../components/Footer";
import Contato from "../../components/Contato";
import FloatingActions from "../../components/FloatingActions";
import { Reveal, EASE } from "../../components/ui";
import { GRUPOS, datasDoAno } from "../../lib/grupos";

const GRUPO = GRUPOS.find((g) => g.id === "tirol")!;

// Paleta glacial própria do Tirol: granito-ardósia + gelo de glaciar +
// genciana azul + alpenglow dourado + creme Mother of Pearl.
const T = {
  noite:     "#0a1318",   // noite glacial
  casca:     "#13212a",   // granito molhado, fundos de cabana
  rocha:     "#1b2f38",   // rocha alpina — fundos
  rochaDeep: "#11242c",   // sombra da pedra
  gelo:      "#86c4d0",   // gelo de glaciar — acento principal
  geloDeep:  "#123a44",   // água de degelo profunda
  genciana:  "#356f86",   // azul genciana — acento secundário
  ouro:      "#cda35c",   // alpenglow dourado discreto
  sage:      "#8fae9b",   // prado alpino — acento verde
  pedra:     "#9aa9af",   // granito claro
  creme:     "#ece7dd",   // Mother of Pearl — bloco claro editorial
  line:      "rgba(205,163,92,0.16)",
  textSoft:  "rgba(236,231,221,0.62)",
};

const wx = (file: string, w: number, h: number) =>
  `https://static.wixstatic.com/media/${file}/v1/fill/w_${w},h_${h},al_c,q_82,enc_avif,quality_auto/img.jpg`;

// IDs reais extraídos das galerias do Wix (Stubaier Höhenweg), verificados
// visualmente via contact sheet e distribuídos por tema.
const IMG = {
  hero:        "fe55bd_5f82f5cd2f7a4277856c7a20343c59e4~mv2.jpg",  // dois caminhantes na crista, mar de nuvens
  glaciar:     "fe55bd_486e96323bff411ea9250c2612e70308~mv2.jpg",  // glaciar e picos nevados de Stubai
  refugio:     "fe55bd_d9eee6ea39d54774af739da11734401d~mv2.jpg",  // refúgio com vista glacial entre nuvens
  cristaRidge: "fe55bd_8a45e6e9d50f4c4f907b0784ea8c098b~mv2.jpg",  // caminhante em crista dramática
  quartoHotel: "fe55bd_34aae10b8e374a2c9e4b94a8cc75536b~mv2.jpg",  // lounge de madeira do Explorer Hotel
  guia:        "fe55bd_56f62fc99b7c42e6a4a5b0d81ef835c9~mv2.jpg",  // Hendrik, perfil, mar de nuvens
  // galeria
  cristaPan:   "fe55bd_f094593b4e1945b1aff86421afbbda32~mv2.jpeg", // cristas de Stubai em panorâmica
  lagoTurq:    "fe55bd_2b11d28d04a247ac9b9ab54b9f9233a0~mv2.jpg",  // lago glaciar turquesa entre rochas
  terrenoLunar:"fe55bd_3948f2cb51da46bca96bd586f3eddab4~mv2.jpg",  // Kalkkögel, terreno quase lunar
  bigHut:      "fe55bd_8f02c88e885e47bcafe4cb7f5a1914d2~mv2.jpg",  // refúgio de Stubai em prado verde
  lagoConq:    "fe55bd_7b689c6a20c54fe39aee79849caaeae3~mv2.jpg",  // caminhante de braços abertos junto ao lago
  refugioInt:  "fe55bd_42cb443297ab48d8b03311bf833b07ba~mv2.jpeg", // interior aconchegante de refúgio
  signpost:    "fe55bd_a9a84fafd0374f50990cd4f76e514882~mv2.jpg",  // placa amarela e cairn no caminho
  stoneHut:    "fe55bd_159aae212f9848f291c0fa2ebebdd65a~mv2.jpg",  // refúgio de pedra na encosta
  grupoTrilha: "fe55bd_a9dd86d6b5234f97b98f565977d6bfe3~mv2.jpg",  // grupo na trilha rochosa
};

// ============================================================
// COMPONENTE: StubaiGlaciar — cristas glaciadas + língua de glaciar
// + sol de alpenglow. STROKE aberto, sem retângulo de fundo.
// ============================================================
function StubaiGlaciar() {
  // Linha de cumes glaciados — picos afiados de Stubai
  const skyline =
    "M -30,238 L 36,196 L 96,128 L 152,200 L 196,150 " +
    "L 250,96 L 300,176 L 350,120 L 406,192 L 460,150 L 492,182";

  // Língua de glaciar descendo do cume central
  const glaciar =
    "M 250,96 L 232,170 L 218,250 L 236,300 L 268,300 L 282,170 Z";

  const pontos = [
    { x: 96,  y: 128, label: "Neustift",        sub: "início e fim",       anchor: "middle" as const, c: T.ouro },
    { x: 250, y: 96,  label: "Dresdner Hütte",  sub: "junto ao glaciar",   anchor: "middle" as const, c: T.gelo },
    { x: 350, y: 120, label: "Innsbrucker",     sub: "a cabana mais alta", anchor: "start"  as const, c: T.creme },
    { x: 196, y: 150, label: "Franz Senn",      sub: "refúgio de Stubai",  anchor: "end"    as const, c: T.sage },
  ];

  return (
    <svg viewBox="0 0 460 540" className="h-full w-full" style={{ overflow: "visible" }}>
      {/* Sol de alpenglow — pulsa devagar */}
      <motion.circle cx="372" cy="74" r="28" fill={T.ouro}
        initial={{ opacity: 0 }} animate={{ opacity: [0.12, 0.26, 0.12] }}
        transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }} />
      <motion.circle cx="372" cy="74" r="28" fill="none" stroke={T.ouro} strokeWidth="1.1"
        animate={{ r: [28, 44, 28], opacity: [0.36, 0, 0.36] }}
        transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }} />

      {/* Língua de glaciar — preenchimento gelo translúcido */}
      <motion.path d={glaciar} fill={T.gelo} fillOpacity="0.10" stroke={T.gelo} strokeWidth="1"
        strokeOpacity="0.45" strokeLinejoin="round"
        initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.6, ease: EASE, delay: 1.2 }} />
      {/* Fendas do glaciar */}
      {[[244, 150], [252, 210], [258, 260]].map(([x, y], i) => (
        <motion.line key={i} x1={x - 7} y1={y} x2={x + 7} y2={y} stroke={T.gelo} strokeWidth="0.8"
          strokeOpacity="0.5" initial={{ opacity: 0 }} animate={{ opacity: [0.15, 0.5, 0.15] }}
          transition={{ duration: 3.5 + i, repeat: Infinity, ease: "easeInOut", delay: 1.6 + i * 0.4 }} />
      ))}

      {/* Linha de cumes — desenha */}
      <motion.path d={skyline} fill="none" stroke={T.pedra} strokeWidth="2"
        strokeLinejoin="round" strokeLinecap="round"
        initial={{ pathLength: 0, opacity: 0 }} animate={{ pathLength: 1, opacity: 0.9 }}
        transition={{ duration: 2.6, ease: EASE, delay: 0.3 }} />
      {/* Neve nos cumes — pontos de luz */}
      {[[96, 128], [250, 96], [350, 120]].map(([x, y], i) => (
        <motion.circle key={i} cx={x} cy={y} r="2.4" fill={T.creme}
          initial={{ opacity: 0 }} animate={{ opacity: [0.5, 1, 0.5] }}
          transition={{ duration: 3 + i, repeat: Infinity, ease: "easeInOut", delay: 1 + i * 0.3 }} />
      ))}

      {/* Linha do alto caminho — conecta os refúgios (high traverse) */}
      <motion.path
        d="M 96,138 C 150,150 170,150 196,160 C 230,172 232,108 250,106 C 280,108 320,128 350,130"
        fill="none" stroke={T.gelo} strokeWidth="1.4" strokeOpacity="0.5"
        strokeDasharray="2 5" strokeLinecap="round"
        initial={{ pathLength: 0 }} animate={{ pathLength: 1 }}
        transition={{ duration: 2.8, ease: EASE, delay: 0.9 }} />

      {/* Vale de Stubaital — linha base verde */}
      <motion.line x1="-30" y1="318" x2="492" y2="318" stroke={T.sage} strokeWidth="1.2"
        strokeOpacity="0.4" initial={{ pathLength: 0 }} animate={{ pathLength: 1 }}
        transition={{ duration: 1.6, ease: EASE, delay: 1 }} />

      {/* Pinos da travessia */}
      {pontos.map((p, i) => (
        <motion.g key={p.label}
          initial={{ opacity: 0, scale: 0 }} animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, ease: EASE, delay: 1.4 + i * 0.4 }}>
          <motion.circle cx={p.x} cy={p.y} r="6" fill="none" stroke={p.c} strokeWidth="1.2"
            animate={{ r: [6, 15, 6], opacity: [0.6, 0, 0.6] }}
            transition={{ duration: 2.8, repeat: Infinity, ease: "easeOut", delay: i * 0.5 }} />
          <circle cx={p.x} cy={p.y} r="5" fill={T.noite} stroke={p.c} strokeWidth="2" />
          <circle cx={p.x} cy={p.y} r="1.8" fill={p.c} />
          <text x={p.x + (p.anchor === "start" ? 14 : p.anchor === "end" ? -14 : 0)} y={p.y - 12} fill={T.creme}
            fontSize="13" textAnchor={p.anchor} letterSpacing="0.4"
            style={{ fontFamily: "'Fraunces', Georgia, serif" }}>{p.label}</text>
          <text x={p.x + (p.anchor === "start" ? 14 : p.anchor === "end" ? -14 : 0)} y={p.y + 22}
            fill={p.c} fontSize="8.5" textAnchor={p.anchor} letterSpacing="1.3" opacity="0.9"
            style={{ fontFamily: "sans-serif", textTransform: "uppercase" }}>{p.sub}</text>
        </motion.g>
      ))}

      <motion.text x="426" y="318" fill={T.ouro} fontSize="11" letterSpacing="3"
        textAnchor="end" opacity="0.42"
        initial={{ opacity: 0 }} animate={{ opacity: 0.42 }} transition={{ delay: 2.4, duration: 1 }}
        style={{ fontStyle: "italic" }}>90 km</motion.text>
    </svg>
  );
}

// ============================================================
// COMPONENTE: ElevationProfile — perfil de alta montanha de Stubai
// Picos afiados, do vale ao glaciar e de volta ao vale.
// ============================================================
const HILL_PATH =
  "M 0,212 L 70,150 L 150,96 L 230,150 L 300,120 " +
  "L 380,60 L 450,110 L 520,70 L 600,55 L 670,120 " +
  "L 740,92 L 810,150 L 880,176 L 930,200 L 960,206";

const HILL_FILL = HILL_PATH + " L 960,248 L 0,248 Z";

const PERFIL = [
  { x: 14,  y: 212, label: "Neustift",     sub: "início",            anchor: "start"  as const },
  { x: 150, y: 96,  label: "Starkenburger", sub: "1ª cabana",        anchor: "middle" as const },
  { x: 300, y: 120, label: "Franz Senn",   sub: "Kalkkögel",         anchor: "middle" as const },
  { x: 450, y: 110, label: "Dresdner",     sub: "junto ao glaciar",  anchor: "middle" as const },
  { x: 600, y: 55,  label: "Innsbrucker",  sub: "a mais alta",       anchor: "middle" as const },
  { x: 946, y: 206, label: "Neustift",     sub: "retorno",           anchor: "end"    as const },
];

function ElevationProfile() {
  return (
    <svg viewBox="0 0 960 260" className="w-full" style={{ overflow: "visible" }}>
      <defs>
        <linearGradient id="tirolFill" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={T.gelo} stopOpacity="0.4" />
          <stop offset="50%" stopColor={T.genciana} stopOpacity="0.22" />
          <stop offset="100%" stopColor={T.genciana} stopOpacity="0.04" />
        </linearGradient>
      </defs>
      {[60, 110, 160, 200].map((y) => (
        <line key={y} x1={0} y1={y} x2={960} y2={y} stroke={T.line} strokeWidth="0.5" />
      ))}
      <path d={HILL_FILL} fill="url(#tirolFill)" />
      <motion.path d={HILL_PATH} fill="none" stroke={T.gelo} strokeWidth="2.2"
        strokeLinejoin="round" strokeLinecap="round"
        initial={{ pathLength: 0, opacity: 0 }}
        whileInView={{ pathLength: 1, opacity: 1 }} viewport={{ once: true }}
        transition={{ duration: 4.2, ease: EASE, delay: 0.2 }} />
      <motion.path d={HILL_PATH} fill="none" stroke={T.ouro} strokeWidth="0.8"
        strokeLinejoin="round" strokeLinecap="round" strokeOpacity="0.35"
        initial={{ pathLength: 0, opacity: 0 }}
        whileInView={{ pathLength: 1, opacity: 1 }} viewport={{ once: true }}
        transition={{ duration: 4.8, ease: EASE, delay: 0.5 }} />
      {PERFIL.map((w) => (
        <g key={w.label + w.x}>
          <line x1={w.x} y1={w.y} x2={w.x} y2={228} stroke={T.gelo} strokeWidth="1"
            strokeDasharray="2 4" strokeOpacity="0.4" />
          <circle cx={w.x} cy={w.y} r="4.5" fill={T.casca} stroke={T.gelo} strokeWidth="1.8" />
          <circle cx={w.x} cy={w.y} r="1.8" fill={T.gelo} />
          <text x={w.x} y={w.y - 10} fill={T.creme} fontSize="10" textAnchor={w.anchor}
            letterSpacing="0.4" style={{ fontFamily: "sans-serif" }}>{w.label}</text>
          <text x={w.x} y={w.y - 22} fill={T.gelo} fontSize="8.5" textAnchor={w.anchor}
            letterSpacing="1.1" opacity="0.9"
            style={{ fontFamily: "sans-serif", textTransform: "uppercase" }}>{w.sub}</text>
        </g>
      ))}
    </svg>
  );
}

// ============================================================
// COMPONENTE: GaleriaInterativa
// ============================================================
const GALERIA = [
  { id: IMG.cristaPan,    cap: "As cristas afiadas de Stubai, vistas que se estendem sem fim", tag: "Crista" },
  { id: IMG.lagoTurq,     cap: "Lagos glaciares de um azul profundo, escondidos entre as rochas", tag: "Lagos" },
  { id: IMG.terrenoLunar, cap: "O Kalkkögel, paisagem rochosa que lembra os Dolomitas", tag: "Kalkkögel" },
  { id: IMG.bigHut,       cap: "Refúgios de Stubai, abrigo caloroso no fim de cada etapa", tag: "Refúgio" },
  { id: IMG.lagoConq,     cap: "A conquista de braços abertos, diante do silêncio dos Alpes", tag: "Conquista" },
  { id: IMG.refugioInt,   cap: "O interior aconchegante da cabana, calor depois do esforço", tag: "Calor" },
  { id: IMG.signpost,     cap: "O caminho marcado, placas amarelas e cairns que guiam a travessia", tag: "O caminho" },
  { id: IMG.stoneHut,     cap: "Cabanas de pedra que parecem nascer da própria montanha", tag: "Pedra" },
  { id: IMG.grupoTrilha,  cap: "O grupo em marcha pelos campos rochosos do alto caminho", tag: "Grupo" },
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
          <div className="absolute inset-0" style={{ background: `linear-gradient(to top, ${T.noite}cc 0%, transparent 55%)` }} />
          <div className="absolute bottom-0 left-0 right-0 p-6">
            <span className="text-[10px] font-semibold uppercase tracking-[0.32em]" style={{ color: T.ouro }}>{img.tag}</span>
            <p className="mt-1 text-[14px] font-light" style={{ color: T.creme }}>{img.cap}</p>
          </div>
          <div className="absolute right-4 top-4">
            <span className="text-[11px] font-medium" style={{ color: "rgba(236,231,221,0.55)" }}>{idx + 1}/{GALERIA.length}</span>
          </div>
        </motion.div>
      </AnimatePresence>
      <div className="flex gap-2 overflow-x-auto md:flex-col md:overflow-visible">
        {GALERIA.map((g, i) => (
          <button key={i} onClick={() => setIdx(i)}
            className="relative shrink-0 overflow-hidden rounded-xl transition-all duration-300"
            style={{ width: 210, height: 70, opacity: i === idx ? 1 : 0.42,
              outline: i === idx ? `2px solid ${T.gelo}` : "2px solid transparent", outlineOffset: 2 }}>
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
  { v: "10",     u: "dias",        s: "9 noites" },
  { v: "90",     u: "quilômetros", s: "8 dias de caminhada" },
  { v: "+5.930", u: "metros",      s: "subida acumulada" },
  { v: "7",      u: "refúgios",    s: "pernoites na montanha" },
  { v: "8",      u: "cabanas",     s: "de Stubai, hütte a hütte" },
  { v: "2",      u: "países",      s: "Alemanha e Áustria" },
];

const MARCOS = [
  {
    id: "ti-glaciar",
    kicker: "Dia 5 · O coração glacial da travessia",
    titulo: ["O Glaciar", "de Stubai"],
    texto:
      "É a metade da jornada e a paisagem glacial passa a dominar o horizonte. A etapa entre a Neue Regensburger e a Dresdner Hütte é longa e exigente, mas a recompensa visual é inigualável. Você caminha em direção ao imponente glaciar, testemunhando a força que moldou estas montanhas. A Dresdner Hütte, junto à área de esqui, oferece um contraste fascinante entre a natureza selvagem e o conforto do refúgio.",
    detalhe: "Dresdner Hütte · 13 km · vistas para o glaciar",
    img: IMG.glaciar,
    bg: T.casca,
    imgDireita: true,
    colors: {
      kicker: T.gelo, title: T.creme, titleAccent: T.gelo,
      body: "rgba(236,231,221,0.78)", detalhe: T.gelo, link: T.creme,
    },
  },
  {
    id: "ti-refugios",
    kicker: "A travessia · De cabana em cabana",
    titulo: ["De Refúgio", "em Refúgio"],
    texto:
      "O Stubaier Höhenweg é uma travessia hütte a hütte, no ritmo antigo dos Alpes. Starkenburger, Franz Senn, Neue Regensburger, Dresdner, Nürnberger, Bremer e a Innsbrucker Hütte. Cada cabana surge como um oásis de paz no alto da montanha, com camas e mesas compartilhadas, jantar quente e a camaradagem de quem também escolheu trocar o conforto da cidade pelo silêncio das alturas.",
    detalhe: "8 cabanas de Stubai · pernoites na montanha",
    img: IMG.refugio,
    bg: T.rocha,
    imgDireita: false,
    colors: {
      kicker: T.sage, title: T.creme, titleAccent: T.gelo,
      body: "rgba(236,231,221,0.78)", detalhe: T.creme, link: T.creme,
    },
  },
  {
    id: "ti-innsbrucker",
    kicker: "Dia 8 · A etapa mais técnica e mais alta",
    titulo: ["A Innsbrucker", "Hütte"],
    texto:
      "Da Bremer até a Innsbrucker Hütte, a etapa mais técnica e desafiadora de toda a travessia. O caminho é uma sucessão de subidas e descidas íngremes, que testam a resistência e o passo firme. A recompensa é a sensação de estar no topo do mundo, com vistas de 360 graus. A chegada à cabana mais alta do roteiro é uma celebração da perseverança, brindada com uma cerveja gelada e a alegria do grupo.",
    detalhe: "Innsbrucker Hütte · 360 graus · a cabana mais alta",
    img: IMG.cristaRidge,
    bg: T.geloDeep,
    imgDireita: true,
    colors: {
      kicker: "rgba(236,231,221,0.7)", title: T.creme, titleAccent: T.ouro,
      body: "rgba(236,231,221,0.82)", detalhe: T.creme, link: T.creme,
    },
  },
];

const EXPERIENCIAS = [
  { icon: "glacier",  t: "Glaciares de Stubai",   s: "Caminhar com vistas constantes para as línguas de gelo que moldaram estas montanhas.",   tag: "Alta montanha" },
  { icon: "hut",      t: "8 Cabanas de Stubai",   s: "Da Starkenburger à Innsbrucker Hütte, a travessia clássica hütte a hütte dos Alpes.",    tag: "Hütte a hütte" },
  { icon: "water",    t: "Lagos Glaciares",       s: "Lagos de um azul profundo e formações rochosas polidas pelo gelo ao longo do caminho.",  tag: "Travessia" },
  { icon: "train",    t: "Trem Cênico",           s: "De Munique a Neustift im Stubaital, três horas trocando a cidade pelos picos do Tirol.",  tag: "Munique" },
  { icon: "mountain", t: "Kalkkögel",             s: "Paisagens rochosas que lembram os Dolomitas, no caminho entre Starkenburger e Franz Senn.", tag: "Dia 3" },
  { icon: "summit",   t: "Brinde no Topo",        s: "Na Innsbrucker Hütte, a mais alta, a vitória se celebra com vistas de 360 graus.",        tag: "Dia 8" },
];

const ROTEIRO = [
  { d: "01", icon: "train",    t: "Chegada em Munique e trem para Stubaital",
    s: "A aventura começa na vibrante Munique, mas o chamado da montanha nos guia rapidamente para o sul. O trem até Neustift im Stubaital, já incluso no pacote, é uma transição cênica de cerca de três horas, trocando o horizonte urbano pelas primeiras vistas dos picos nevados do Tirol. Pernoite em quarto duplo no Explorer Hotel." },
  { d: "02", icon: "boot",     t: "Neustift à Starkenburger Hütte",
    s: "O primeiro dia de trilha é um batismo de fogo, uma subida íngreme que deixa o vale para trás. Ao alcançar a Starkenburger Hütte, a sensação de conquista é imensa, com um panorama inesquecível do Vale de Stubai enquanto o sol pinta os picos de dourado e vermelho. 8 km, +1.300 m, dificuldade moderada." },
  { d: "03", icon: "mountain", t: "Starkenburger à Franz Senn Hütte",
    s: "Uma das etapas mais icônicas, no coração da montanha. O caminho serpenteia por paisagens rochosas que lembram os Dolomitas, o Kalkkögel, onde a beleza austera das rochas contrasta com a delicadeza dos pequenos lagos alpinos. 15 km, +530 m, dificuldade difícil." },
  { d: "04", icon: "hut",      t: "Franz Senn à Neue Regensburger Hütte",
    s: "Um dia mais suave, que permite apreciar a grandiosidade ao redor. Você atravessa o cume do Basslerjoch, mirante privilegiado da crista principal de Stubai. A paisagem fica mais verde, com prados alpinos pontilhados de flores selvagens, até o calor da Neue Regensburger Hütte. 9 km, +600 m, dificuldade moderada." },
  { d: "05", icon: "glacier",  t: "Neue Regensburger à Dresdner Hütte",
    s: "Uma travessia épica, em que a paisagem glacial domina o horizonte. Longa e exigente, leva você em direção ao imponente glaciar, marcando a metade da jornada. A Dresdner Hütte, junto à estação de esqui e com vistas para o gelo, une natureza selvagem e conforto. 13 km, +1.033 m, dificuldade difícil." },
  { d: "06", icon: "mountain", t: "Dresdner à Nürnberger Hütte",
    s: "A prova de fogo do preparo, com passagens técnicas pelo desafiador Peiljoch e vistas de perto do Glaciar Sulzenau. Uma parada na Sulzenau Hütte revigora antes do trecho final, que revela lagos glaciais de azul profundo até a Nürnberger Hütte. 9,5 km, +880 m, dificuldade muito difícil." },
  { d: "07", icon: "water",    t: "Nürnberger à Bremer Hütte",
    s: "Uma etapa mais curta e incrivelmente cênica, que muitos chamam de paraíso. O caminho serpenteia por vales suspensos, entre riachos cristalinos e lagos de montanha. A Bremer Hütte, isolada e charmosa, é o lugar perfeito para um pôr do sol silencioso sobre os picos. 6 km, +516 m, dificuldade moderada." },
  { d: "08", icon: "summit",   t: "Bremer à Innsbrucker Hütte",
    s: "A etapa mais técnica e desafiadora, para os verdadeiros amantes da montanha. Uma sucessão de subidas e descidas íngremes leva à sensação de estar no topo do mundo, com vistas de 360 graus. A chegada à Innsbrucker Hütte, a cabana mais alta, é celebrada com uma cerveja gelada. 9,5 km, +840 m, dificuldade difícil." },
  { d: "09", icon: "boot",     t: "Innsbrucker à Neustift",
    s: "O último dia de caminhada é uma descida longa e contemplativa, um adeus gradual à montanha. A paisagem se transforma de volta aos prados verdes e às florestas de pinheiros, um momento para reviver cada passo da jornada. Chegar a Neustift fecha o ciclo. 15 km, dificuldade moderada." },
  { d: "10", icon: "flag",     t: "Último dia, check-out",
    s: "Sem atividades programadas. Após o café da manhã, deslocamento à estação ferroviária para o trem de volta a Munique, cerca de três horas. A viagem de retorno é transição, mas a montanha permanece com você, transformada em memória poderosa. Fim das operações." },
];

const INCLUSO = [
  "2 pernoites em hotel na vila de Neustift (quartos duplos)",
  "7 pernoites em refúgios de montanha (quartos e banheiros compartilhados)",
  "Café da manhã todos os dias",
  "Jantar nos 7 pernoites dos refúgios de montanha",
  "Box lanche para consumo nas caminhadas",
  "Passagens de trem entre Munique e Neustift im Stubaital",
  "Kit boas-vindas TARGET by AONIK",
  "Suporte pré-viagem para preparação e compra de equipamentos",
  "Guia brasileiro com treinamento em primeiros socorros em áreas remotas e proficiente na língua local",
  "Rastreador via satélite individual para cada participante",
];

const NAO_INCLUSO = [
  "Passagens aéreas",
  "Transfer in e out do aeroporto até a estação ferroviária",
  "Seguro viagem internacional (obrigatório)",
  "Jantares dos dias 1, 9 e 10",
  "Bebidas",
  "Gorjetas",
  "Despesas pessoais",
  "Outros serviços não indicados no programa",
];

const HENDRIK_MARCAS = [
  "Urubici · Serra Catarinense",
  "Travessias e caminhadas guiadas",
  "Leitura de clima e terreno",
  "Primeiros socorros em áreas remotas",
  "Consciência e educação ambiental",
  "Ritmo do grupo e segurança",
];

// ============================================================
// ÍCONES SVG MONOCROMÁTICOS — stroke fino, sem emoji
// ============================================================
function Icon({ name, size = 22, color = "currentColor" }: { name: string; size?: number; color?: string }) {
  const s = {
    width: size, height: size,
    stroke: color, fill: "none",
    strokeWidth: 1.5,
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
    display: "block", flexShrink: 0,
  };
  switch (name) {
    case "glacier":
      return <svg viewBox="0 0 24 24" style={s}>
        <path d="M2 19 L8 7 L12 13 L16 5 L22 19 Z" />
        <path d="M8 7 L8.5 11" strokeOpacity="0.5" strokeWidth="1" />
        <path d="M16 5 L15.5 10" strokeOpacity="0.5" strokeWidth="1" />
        <path d="M5 19 C7 17 9 21 12 19 C15 17 17 21 19 19" strokeOpacity="0.55" />
      </svg>;
    case "hut":
      return <svg viewBox="0 0 24 24" style={s}>
        <path d="M3 20 L12 4 L21 20 Z" />
        <path d="M7.5 20 L7.5 13 L16.5 13 L16.5 20" />
        <rect x="10" y="15.5" width="4" height="4.5" />
      </svg>;
    case "water":
      return <svg viewBox="0 0 24 24" style={s}>
        <path d="M7 3 L7 13" />
        <path d="M12 3 L12 15" />
        <path d="M17 3 L17 13" />
        <path d="M4 19 C7 17 9 21 12 19 C15 17 17 21 20 19" strokeOpacity="0.7" />
      </svg>;
    case "train":
      return <svg viewBox="0 0 24 24" style={s}>
        <rect x="5" y="3" width="14" height="13" rx="3" />
        <line x1="5" y1="9.5" x2="19" y2="9.5" />
        <circle cx="9" cy="13" r="0.6" fill={color} />
        <circle cx="15" cy="13" r="0.6" fill={color} />
        <path d="M7 16 L4.5 20" />
        <path d="M17 16 L19.5 20" />
      </svg>;
    case "mountain":
      return <svg viewBox="0 0 24 24" style={s}>
        <path d="M3 20 L10 7 L14 14 L17 9 L21 20 Z" />
        <path d="M8.5 11.5 L12 10 L13 11.5" strokeOpacity="0.5" strokeWidth="1" />
      </svg>;
    case "summit":
      return <svg viewBox="0 0 24 24" style={s}>
        <path d="M3 20 L11 6 L19 20 Z" />
        <path d="M11 6 L11 2" />
        <path d="M11 2 L14 3.5 L11 5" />
        <path d="M8 14 L11 12.5 L14 14" strokeOpacity="0.5" strokeWidth="1" />
      </svg>;
    case "plane":
      return <svg viewBox="0 0 24 24" style={s}>
        <path d="M22 16 L2 9 L5 8 L9 10 L14 3 L16 4 L13 11 L18 13 Z" />
        <line x1="5.5" y1="18" x2="10" y2="15.5" strokeOpacity="0.55" />
      </svg>;
    case "boot":
      return <svg viewBox="0 0 24 24" style={s}>
        <path d="M5 20 L5 7 C5 5.5 6 4 8 4 L8 12 C10 12 14 14 17 16 L19 20 Z" />
        <line x1="4" y1="20" x2="20" y2="20" />
      </svg>;
    case "flag":
      return <svg viewBox="0 0 24 24" style={s}>
        <line x1="5" y1="3" x2="5" y2="21" />
        <path d="M5 3 L19 7 L5 12 Z" />
      </svg>;
    case "pin":
      return <svg viewBox="0 0 24 24" style={s}>
        <path d="M12 2 C8.5 2 5.5 5 5.5 9 C5.5 14.5 12 22 12 22 C12 22 18.5 14.5 18.5 9 C18.5 5 15.5 2 12 2 Z" />
        <circle cx="12" cy="9" r="3" />
      </svg>;
    default:
      return null;
  }
}

// ============================================================
// PAGE
// ============================================================
export default function TirolPage() {
  const datas2027 = datasDoAno(GRUPO, 2027);

  return (
    <main className="relative" style={{ background: T.creme }}>
      <Nav />

      {/* ===== HERO ===== */}
      <section className="relative flex min-h-[100svh] w-full items-center overflow-hidden" style={{ background: T.noite }}>
        <motion.div className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url('${wx(IMG.hero, 2400, 1500)}')` }}
          initial={{ scale: 1.12 }} animate={{ scale: 1 }} transition={{ duration: 14, ease: "easeOut" }} />
        <div className="absolute inset-0"
          style={{ background: `linear-gradient(to right, ${T.noite}f2 0%, ${T.noite}b0 52%, ${T.noite}66 100%)` }} />
        <motion.div className="absolute inset-0 z-[1]" style={{ background: T.noite, pointerEvents: "none" }}
          initial={{ opacity: 1 }} animate={{ opacity: 0 }} transition={{ duration: 0.9, delay: 0.4 }} />

        <div className="relative z-10 mx-auto grid w-full max-w-[1400px] items-center gap-10 px-6 py-28 md:grid-cols-2 md:gap-16 md:px-10">
          <div>
            <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, ease: EASE, delay: 0.2 }} className="mb-4 flex items-center gap-3">
              <Icon name="pin" size={14} color={T.ouro} />
              <span className="text-[11px] font-semibold uppercase tracking-[0.4em]" style={{ color: T.ouro }}>
                Tirol Austríaco · Alpes de Stubai
              </span>
            </motion.div>
            <motion.h1 initial={{ opacity: 0, y: 32 }} animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.1, ease: EASE, delay: 0.3 }}
              className="font-display font-light uppercase leading-[0.86] tracking-[-0.02em]"
              style={{ fontSize: "clamp(3rem, 7.5vw, 7rem)", color: T.creme }}>
              Stubaier
              <br />
              <span style={{ color: T.gelo }}>Höhenweg</span>
            </motion.h1>
            <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, ease: EASE, delay: 0.48 }}
              className="mt-3 font-display font-light italic"
              style={{ fontSize: "clamp(1rem, 2vw, 1.5rem)", color: T.creme, opacity: 0.62 }}>
              Dez dias. Noventa quilômetros. O coração dos Alpes austríacos.
            </motion.p>
            <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, ease: EASE, delay: 0.55 }}
              className="mt-6 max-w-md text-[15px] font-light leading-relaxed md:text-base"
              style={{ color: "rgba(236,231,221,0.74)" }}>
              Uma das travessias de alta montanha mais espetaculares do Tirol, atravessando o
              coração do vale de Stubaital de cabana em cabana. Glaciares, picos afiados, lagos de
              gelo e refúgios tradicionais, onde{" "}
              <span style={{ color: T.creme }}>a montanha pede passagem.</span>
            </motion.p>
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, ease: EASE, delay: 0.7 }} className="mt-8 flex flex-wrap items-center gap-5">
              <a href="#reservar"
                className="inline-flex items-center gap-3 rounded-full px-8 py-4 text-[13px] font-semibold uppercase tracking-[0.16em] transition-transform duration-300 hover:scale-[1.03]"
                style={{ background: T.gelo, color: T.noite }}>
                Reserve sua vaga <span>&#8594;</span>
              </a>
              <span>
                <span className="text-[12px] uppercase tracking-[0.16em]" style={{ color: "rgba(236,231,221,0.5)" }}>a partir de</span>{" "}
                <span className="font-display text-2xl" style={{ color: T.creme }}>€ 4.200</span>
              </span>
            </motion.div>
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1, delay: 0.95 }}
              className="mt-5 inline-flex items-center gap-2 rounded-full border px-4 py-2 text-[11px] uppercase tracking-[0.16em]"
              style={{ borderColor: T.sage, color: T.sage }}>
              <span className="h-1.5 w-1.5 rounded-full animate-pulse" style={{ background: T.sage }} />
              Próxima saída · 03 a 12 Set 2027
            </motion.div>
          </div>

          <motion.div initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1.2, ease: EASE, delay: 0.35 }}
            className="mx-auto hidden w-full max-w-[440px] md:block" style={{ height: 460 }}>
            <StubaiGlaciar />
          </motion.div>
        </div>
      </section>

      {/* ===== STATS BAR ===== */}
      <section className="grid grid-cols-2 gap-px md:grid-cols-3 lg:grid-cols-6"
        style={{ background: T.line, borderTop: `1px solid ${T.line}` }}>
        {STATS.map((s, i) => (
          <Reveal key={i} delay={i * 0.04}>
            <div className="flex flex-col px-6 py-8" style={{ background: T.casca }}>
              <span className="font-display font-light leading-none" style={{ fontSize: "clamp(1.7rem,3vw,2.5rem)", color: T.creme }}>{s.v}</span>
              <span className="mt-1 text-[11px] font-semibold uppercase tracking-[0.2em]" style={{ color: T.gelo }}>{s.u}</span>
              <span className="mt-1 text-[12px] font-light" style={{ color: T.textSoft }}>{s.s}</span>
            </div>
          </Reveal>
        ))}
      </section>

      {/* ===== CENTERPIECE (fundo claro — Mother of Pearl) ===== */}
      <section className="relative w-full overflow-hidden" style={{ background: T.creme }}>
        <div className="pointer-events-none absolute inset-0 flex items-center justify-center overflow-hidden">
          <span className="select-none font-display font-light uppercase"
            style={{ fontSize: "clamp(5rem,18vw,16rem)", color: "rgba(27,47,56,0.06)",
              letterSpacing: "-0.04em", lineHeight: 1, whiteSpace: "nowrap" }}>
            STUBAI
          </span>
        </div>
        <div className="relative z-10 mx-auto max-w-[1000px] px-6 py-32 text-center md:py-44">
          <Reveal>
            <p className="text-[11px] font-semibold uppercase tracking-[0.4em]" style={{ color: T.genciana }}>
              A travessia dos Alpes de Stubai
            </p>
          </Reveal>
          <Reveal delay={0.1}>
            <h2 className="mt-6 font-display font-light leading-[1.05]" style={{ fontSize: "clamp(2.4rem,5.5vw,4.6rem)", color: T.rocha }}>
              Onde a montanha
              <br />
              <span className="italic" style={{ color: T.genciana }}>pede passagem</span>
            </h2>
          </Reveal>
          <Reveal delay={0.18}>
            <p className="mx-auto mt-8 max-w-2xl text-[16px] font-light leading-relaxed" style={{ color: "rgba(17,36,44,0.66)" }}>
              Entre a Alemanha e a Áustria, oito dias de caminhada por trilhas que exigem corpo e
              entregam alma. Glaciares ao alcance dos olhos, lagos de gelo, prados de flores
              selvagens e a sequência de cabanas que dá ritmo aos Alpes.{" "}
              <span style={{ color: T.rocha, fontStyle: "italic" }}>Desafio físico, natureza intocada e a cultura da alta montanha.</span>
            </p>
          </Reveal>
        </div>
      </section>

      {/* ===== PERFIL DE ELEVAÇÃO ===== */}
      <section className="w-full overflow-hidden pb-0 pt-16" style={{ background: T.casca }}>
        <div className="mx-auto px-4 md:px-8">
          <Reveal>
            <p className="mb-8 text-center text-[11px] font-semibold uppercase tracking-[0.4em]" style={{ color: T.ouro, opacity: 0.8 }}>
              Perfil da travessia · 90 km · de Neustift ao alto de Stubai
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

      {/* ===== EXPERIÊNCIAS ===== */}
      <section className="px-6 py-24 md:px-10 md:py-32" style={{ background: T.rocha }}>
        <div className="mx-auto max-w-[1280px]">
          <Reveal>
            <p className="text-[11px] font-semibold uppercase tracking-[0.35em]" style={{ color: T.sage }}>Experiências incluídas</p>
          </Reveal>
          <Reveal delay={0.06}>
            <h2 className="mt-4 font-display font-light leading-[1.05]" style={{ fontSize: "clamp(1.8rem,3.5vw,2.8rem)", color: T.creme }}>
              Gelo, granito
              <br />
              <span className="italic" style={{ color: T.gelo }}>e camaradagem</span>
            </h2>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="mt-4 max-w-xl text-[15px] font-light leading-relaxed" style={{ color: T.textSoft }}>
              Não é só caminhada. É a alta montanha austríaca de ponta a ponta, glaciares, lagos de
              gelo, refúgios tradicionais e o trem cênico que abre e fecha a travessia, guiada por
              quem conhece o terreno.
            </p>
          </Reveal>
          <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {EXPERIENCIAS.map((e, i) => (
              <Reveal key={i} delay={i * 0.06}>
                <div className="group relative rounded-2xl p-7 transition-all duration-300"
                  style={{ background: "rgba(134,196,208,0.08)", border: `1px solid rgba(134,196,208,0.20)` }}>
                  <div className="mb-4 flex items-center justify-between">
                    <Icon name={e.icon} size={22} color={T.gelo} />
                    <span className="rounded-full px-2.5 py-1 text-[9px] font-semibold uppercase tracking-[0.2em]"
                      style={{ background: "rgba(17,36,44,0.6)", color: T.gelo }}>{e.tag}</span>
                  </div>
                  <h3 className="font-display font-light" style={{ fontSize: "1.15rem", color: T.creme }}>{e.t}</h3>
                  <p className="mt-2 text-[13px] font-light leading-relaxed" style={{ color: T.textSoft }}>{e.s}</p>
                  <div className="mt-4 h-px w-0 transition-all duration-500 group-hover:w-full" style={{ background: T.gelo }} />
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ===== HOSPEDAGENS — fundo creme (segundo bloco editorial claro) ===== */}
      <section className="w-full" style={{ background: T.creme }}>
        <div className="grid md:grid-cols-2">
          <div className="relative min-h-[420px] overflow-hidden md:min-h-[560px]">
            <div className="absolute inset-0 bg-cover bg-center transition-transform duration-700 hover:scale-[1.03]"
              style={{ backgroundImage: `url('${wx(IMG.quartoHotel, 1400, 1000)}')` }} />
            <div className="absolute inset-0" style={{ background: `linear-gradient(to bottom, transparent 40%, rgba(10,19,24,0.55) 100%)` }} />
            <div className="absolute bottom-4 left-5">
              <span className="text-[10px] font-semibold uppercase tracking-[0.3em]" style={{ color: T.creme }}>
                Explorer Hotel Stubaital · Neustift im Stubaital
              </span>
            </div>
          </div>
          <div className="flex flex-col justify-center px-8 py-16 md:px-14 md:py-20">
            <Reveal>
              <p className="text-[11px] font-semibold uppercase tracking-[0.35em]" style={{ color: T.genciana }}>Hospedagens</p>
            </Reveal>
            <Reveal delay={0.08}>
              <h2 className="mt-5 font-display font-light uppercase leading-[0.88]" style={{ fontSize: "clamp(2.4rem,4.5vw,4rem)", color: T.rocha }}>
                Conforto no vale,
                <br />
                <span style={{ color: T.genciana }}>cabanas no alto</span>
              </h2>
            </Reveal>
            <Reveal delay={0.14}>
              <p className="mt-6 max-w-sm text-[15px] font-light leading-relaxed" style={{ color: "rgba(17,36,44,0.66)" }}>
                Dois pernoites confortáveis no Explorer Hotel, em Neustift, antes e depois da
                montanha, e sete noites em autênticos refúgios alpinos ao longo da travessia. Cada
                cabana surge como um abrigo caloroso, onde o esforço do dia dá lugar à satisfação.
              </p>
            </Reveal>
            <Reveal delay={0.2}>
              <div className="mt-8 space-y-3">
                {[
                  "2 pernoites em hotel na vila de Neustift (quartos duplos)",
                  "7 pernoites em refúgios de Stubai (Starkenburger, Franz Senn, Neue Regensburger, Dresdner, Nürnberger, Bremer, Innsbrucker)",
                  "Quartos e banheiros compartilhados nos refúgios",
                  "Café da manhã todos os dias e jantar nos refúgios",
                ].map((item) => (
                  <div key={item} className="flex items-start gap-3 text-[13px] font-light" style={{ color: "rgba(17,36,44,0.62)" }}>
                    <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full" style={{ background: T.genciana }} />
                    {item}
                  </div>
                ))}
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ===== GALERIA ===== */}
      <section className="px-6 py-20 md:px-10 md:py-28" style={{ background: T.casca }}>
        <div className="mx-auto max-w-[1280px]">
          <Reveal>
            <p className="text-[11px] font-semibold uppercase tracking-[0.35em]" style={{ color: T.ouro }}>Galeria</p>
            <h2 className="mt-4 font-display font-light" style={{ fontSize: "clamp(1.8rem,3.5vw,2.8rem)", color: T.creme }}>
              O que você vai viver
            </h2>
          </Reveal>
          <Reveal delay={0.1} className="mt-8"><GaleriaInterativa /></Reveal>
        </div>
      </section>

      {/* ===== ROTEIRO — fundo creme (terceiro bloco editorial claro) ===== */}
      <section className="px-6 py-24 md:px-10 md:py-32" style={{ background: T.creme }}>
        <div className="mx-auto max-w-[1100px]">
          <Reveal>
            <p className="text-[11px] font-semibold uppercase tracking-[0.32em]" style={{ color: T.genciana }}>Roteiro dia a dia</p>
          </Reveal>
          <Reveal delay={0.08}>
            <p className="mt-3 max-w-lg text-[14px] font-light leading-relaxed" style={{ color: "rgba(17,36,44,0.55)" }}>
              Dez dias entre Munique e os Alpes de Stubai, com oito dias de travessia de cabana em
              cabana, do batismo na Starkenburger ao topo da Innsbrucker Hütte.
            </p>
          </Reveal>
          <div className="mt-12">
            {ROTEIRO.map((r, i) => (
              <Reveal key={r.d} delay={i * 0.04}>
                <div className="grid grid-cols-[auto_1fr] items-baseline gap-6 border-t py-7 md:gap-10"
                  style={{ borderColor: "rgba(53,111,134,0.22)" }}>
                  <div className="flex items-center gap-4">
                    <span className="font-display text-sm" style={{ color: "rgba(17,36,44,0.32)" }}>{r.d}</span>
                    <Icon name={r.icon} size={18} color={T.genciana} />
                  </div>
                  <div>
                    <h3 className="font-display font-light" style={{ fontSize: "clamp(1.1rem,2vw,1.5rem)", color: T.rocha }}>{r.t}</h3>
                    <p className="mt-1.5 text-[14px] font-light leading-relaxed" style={{ color: "rgba(17,36,44,0.58)" }}>{r.s}</p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ===== O GUIA DA JORNADA · HENDRIK ===== */}
      <section className="px-6 py-24 md:px-10 md:py-32" style={{ background: T.casca, color: T.creme }}>
        <div className="mx-auto max-w-[1280px]">
          <Reveal>
            <p className="flex items-center gap-3 text-[11px] font-semibold uppercase tracking-[0.3em]" style={{ color: T.ouro }}>
              <span className="h-px w-8" style={{ background: T.ouro }} />
              O guia da jornada
            </p>
          </Reveal>

          <div className="mt-10 grid items-start gap-10 md:grid-cols-[420px_1fr] md:gap-16">
            <Reveal>
              <div className="relative overflow-hidden rounded-2xl" style={{ height: 540 }}>
                <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: `url('${wx(IMG.guia, 900, 1200)}')` }} />
                <div className="absolute inset-0" style={{ background: `linear-gradient(to top, ${T.casca}ee 0%, transparent 55%)` }} />
                <div className="absolute inset-x-0 bottom-0 p-7">
                  <p className="font-display text-[1.6rem] font-light leading-tight" style={{ color: T.creme }}>Hendrik Fendel</p>
                  <p className="mt-1 text-[12px] uppercase tracking-[0.18em]" style={{ color: T.ouro }}>Urubici · Santa Catarina</p>
                </div>
              </div>
            </Reveal>

            <Reveal delay={0.1}>
              <div>
                <h2 className="font-display font-light leading-[1.05] tracking-[-0.01em]" style={{ fontSize: "clamp(2rem,3.8vw,3rem)", color: T.creme }}>
                  Hendrik Fendel
                </h2>
                <p className="mt-2 text-[12px] uppercase tracking-[0.2em]" style={{ color: T.ouro }}>Condutor de turismo de natureza</p>
                <p className="mt-6 max-w-xl text-[15px] font-light leading-relaxed" style={{ color: "rgba(236,231,221,0.74)" }}>
                  Radicado em Urubici, na Serra Catarinense, Hendrik construiu sua trajetória
                  profundamente conectada às montanhas, trilhas e paisagens do sul do Brasil. Ao
                  longo dos anos, transformou essa vivência em profissão e propósito de vida.
                </p>
                <p className="mt-4 max-w-xl text-[15px] font-light leading-relaxed" style={{ color: "rgba(236,231,221,0.74)" }}>
                  Seu estilo de condução é marcado pela atenção aos detalhes, pela leitura cuidadosa
                  do clima e do terreno e pela capacidade de criar experiências autênticas e
                  humanas, sempre com foco na segurança e no respeito ao ritmo do grupo. Mais do que
                  guiar caminhos, Hendrik se dedica a conectar pessoas à natureza. Nas horas livres,
                  é artesão de móveis rústicos feitos a partir de resíduos florestais.
                </p>

                <div className="mt-8">
                  <p className="mb-4 text-[11px] font-semibold uppercase tracking-[0.22em]" style={{ color: "rgba(236,231,221,0.4)" }}>
                    Marcas da condução
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {HENDRIK_MARCAS.map((p) => (
                      <span key={p} className="flex items-center gap-2 rounded-full border px-4 py-1.5 text-[12px] font-light"
                        style={{ borderColor: "rgba(205,163,92,0.3)", color: "rgba(236,231,221,0.7)" }}>
                        <Icon name="mountain" size={12} color="rgba(205,163,92,0.55)" />
                        {p}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="mt-8 rounded-2xl border px-5 py-4 text-[13px] font-light leading-relaxed"
                  style={{ borderColor: T.line, color: "rgba(236,231,221,0.66)" }}>
                  Em campo, o grupo conta com suporte completo de logística entre Munique e os
                  refúgios de Stubai, passagens de trem, rastreador via satélite individual e{" "}
                  <span style={{ color: T.ouro }}>guia brasileiro com treinamento em primeiros socorros em áreas remotas e proficiente na língua local.</span>
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ===== RESERVE SUA VAGA + PREÇO ===== */}
      <section id="reservar" className="px-6 py-24 md:px-10 md:py-32" style={{ background: T.geloDeep }}>
        <div className="mx-auto max-w-[1280px]">
          <Reveal>
            <p className="text-[11px] font-semibold uppercase tracking-[0.35em]" style={{ color: T.creme, opacity: 0.6 }}>Saídas disponíveis</p>
          </Reveal>
          <Reveal delay={0.08}>
            <h2 className="mt-5 font-display font-light leading-[1.05]" style={{ fontSize: "clamp(2rem,4.5vw,3.6rem)", color: T.creme }}>
              Quando você quer
              <br />
              <span className="italic" style={{ color: T.ouro }}>atravessar Stubai?</span>
            </h2>
          </Reveal>

          <Reveal delay={0.1}>
            <div className="mt-10 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
              {datas2027.map((d) => (
                <div key={d} className="rounded-2xl p-7" style={{ background: "rgba(53,111,134,0.22)", border: `1px solid rgba(53,111,134,0.5)` }}>
                  <div className="flex items-center justify-between">
                    <span className="rounded-full px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.2em]" style={{ background: T.genciana, color: T.creme }}>2027</span>
                    <span className="text-[11px]" style={{ color: T.textSoft }}>10 dias</span>
                  </div>
                  <p className="mt-6 font-display font-light" style={{ fontSize: "clamp(1.6rem,3vw,2.4rem)", color: T.creme }}>{d}</p>
                  <p className="mt-1 text-[12px] font-light" style={{ color: T.textSoft }}>Alpes de Stubai · Tirol Austríaco · Setembro 2027</p>
                  <a href="#contato" className="mt-6 inline-flex items-center gap-2 text-[12px] font-semibold uppercase tracking-[0.18em] transition-opacity hover:opacity-75" style={{ color: T.ouro }}>
                    Reservar vaga &#8594;
                  </a>
                </div>
              ))}
              <div className="rounded-2xl p-7" style={{ background: "rgba(205,163,92,0.08)", border: `1px solid rgba(205,163,92,0.2)` }}>
                <div className="flex items-center justify-between">
                  <span className="rounded-full px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.2em]" style={{ border: `1px solid ${T.ouro}`, color: T.ouro }}>grupo pequeno</span>
                  <span className="text-[11px]" style={{ color: T.textSoft }}>2 a 5 pessoas</span>
                </div>
                <p className="mt-6 font-display font-light" style={{ fontSize: "clamp(1.3rem,2.5vw,1.9rem)", color: T.creme }}>
                  Liderança brasileira
                </p>
                <p className="mt-1 text-[12px] font-light" style={{ color: T.textSoft }}>
                  Hendrik Fendel + suporte completo de logística alpina
                </p>
              </div>
            </div>
          </Reveal>

          <Reveal delay={0.15}>
            <div className="mt-14 flex flex-col gap-4 border-t pt-10 md:flex-row md:items-center md:justify-between" style={{ borderColor: "rgba(53,111,134,0.35)" }}>
              <div>
                <p className="text-[11px] font-semibold uppercase tracking-[0.2em]" style={{ color: T.textSoft }}>Investimento</p>
                <p className="mt-2 font-display font-light" style={{ fontSize: "clamp(2rem,3.5vw,2.8rem)", color: T.creme }}>
                  € 4.200
                  <span className="ml-3 text-[14px]" style={{ color: T.textSoft }}>por pessoa · habitação dupla</span>
                </p>
                <p className="mt-1 text-[13px] font-light" style={{ color: T.textSoft }}>
                  30% de entrada via Pix ou transferência + 5x sem juros no cartão. Adicional de € 180 para single antes e depois da montanha.
                </p>
                <p className="mt-1 text-[11px] font-light" style={{ color: "rgba(236,231,221,0.4)" }}>
                  Valor em Euro, base Euro Turismo na data do fechamento.
                </p>
              </div>
              <a href="#contato" className="inline-flex shrink-0 items-center gap-3 rounded-full px-8 py-4 text-[13px] font-semibold uppercase tracking-[0.16em] transition-transform duration-300 hover:scale-[1.03]" style={{ background: T.gelo, color: T.noite }}>
                Falar com a equipe &#8594;
              </a>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ===== INCLUSO / NÃO INCLUSO ===== */}
      <section className="px-6 py-24 md:px-10 md:py-32" style={{ background: T.casca, color: T.creme }}>
        <div className="mx-auto grid max-w-[1280px] gap-12 md:grid-cols-2 md:gap-20">
          <Reveal>
            <p className="text-[11px] font-semibold uppercase tracking-[0.32em]" style={{ color: T.ouro }}>Está incluso</p>
            <ul className="mt-8 space-y-4">
              {INCLUSO.map((item) => (
                <li key={item} className="flex items-start gap-4 text-[14px] font-light leading-relaxed" style={{ color: T.creme }}>
                  <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full" style={{ background: T.gelo }} />
                  {item}
                </li>
              ))}
            </ul>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="text-[11px] font-semibold uppercase tracking-[0.32em]" style={{ color: "rgba(53,111,134,0.95)" }}>Não incluso</p>
            <ul className="mt-8 space-y-4">
              {NAO_INCLUSO.map((item) => (
                <li key={item} className="flex items-start gap-4 text-[14px] font-light leading-relaxed" style={{ color: T.textSoft }}>
                  <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full" style={{ background: "rgba(53,111,134,0.6)" }} />
                  {item}
                </li>
              ))}
            </ul>
            <div className="mt-10 rounded-2xl border p-5" style={{ borderColor: T.line }}>
              <p className="text-[11px] font-semibold uppercase tracking-[0.2em]" style={{ color: T.ouro }}>Cancelamento</p>
              <div className="mt-4 space-y-2 text-[13px] font-light" style={{ color: T.textSoft }}>
                <div className="flex justify-between"><span>31 dias ou mais</span><span style={{ color: T.creme }}>10%</span></div>
                <div className="flex justify-between"><span>30 a 21 dias</span><span style={{ color: T.creme }}>50%</span></div>
                <div className="flex justify-between"><span>21 dias ou menos</span><span style={{ color: T.creme }}>100%</span></div>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ===== AONIKIA ===== */}
      <section className="px-6 py-20 md:px-10 md:py-24" style={{ background: T.geloDeep }}>
        <div className="mx-auto max-w-[860px] text-center">
          <Reveal>
            <p className="text-[11px] font-semibold uppercase tracking-[0.3em]" style={{ color: T.creme, opacity: 0.6 }}>
              AonikIA · especialista no Stubaier Höhenweg
            </p>
            <h2 className="mt-5 font-display font-light leading-[1.15]" style={{ fontSize: "clamp(1.8rem,3.5vw,2.8rem)", color: T.creme }}>
              Pergunte tudo sobre a travessia
            </h2>
            <p className="mx-auto mt-4 max-w-md text-[15px] font-light leading-relaxed" style={{ color: "rgba(236,231,221,0.66)" }}>
              Como se preparar para a alta montanha de Stubai, como funcionam os refúgios, o que
              levar na mochila semicargueira, como é setembro no Tirol. A AonikIA conhece este
              programa de ponta a ponta.
            </p>
            <a href="#contato" className="mt-7 inline-flex items-center gap-3 rounded-full border px-7 py-3.5 text-[12px] font-semibold uppercase tracking-[0.16em] transition-all duration-300 hover:opacity-80" style={{ borderColor: T.sage, color: T.sage }}>
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
