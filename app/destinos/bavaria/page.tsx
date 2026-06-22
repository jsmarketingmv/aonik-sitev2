"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Nav from "../../components/Nav";
import Footer from "../../components/Footer";
import Contato from "../../components/Contato";
import FloatingActions from "../../components/FloatingActions";
import { Reveal, EASE } from "../../components/ui";
import { GRUPOS, datasDoAno } from "../../lib/grupos";

const GRUPO = GRUPOS.find((g) => g.id === "bavaria")!;

// Paleta alpina própria: verde-abeto + azul-lago Königssee + creme Mother of Pearl
const B = {
  noite:     "#0d1411",   // escuro de floresta
  casca:     "#15201b",   // madeira de refúgio
  abeto:     "#1e3a2c",   // verde-abeto profundo — fundos
  abetoDeep: "#142a20",   // sombra da mata
  lago:      "#3b7d80",   // azul-verde do Königssee (acento)
  lagoDeep:  "#16383a",   // água profunda
  ouro:      "#c7a35c",   // dourado alpino discreto
  sage:      "#8aa483",   // verde alpino claro — acento
  pedra:     "#9ba49f",   // granito
  creme:     "#ece6da",   // Mother of Pearl — bloco claro editorial
  line:      "rgba(199,163,92,0.16)",
  textSoft:  "rgba(236,230,218,0.62)",
};

const wx = (file: string, w: number, h: number) =>
  `https://static.wixstatic.com/media/${file}/v1/fill/w_${w},h_${h},al_c,q_82,enc_avif,quality_auto/img.jpg`;

const IMG = {
  pano:    "fe55bd_eb1690c8ee144811a83b7f9f9f3c70ec~mv2.jpg",
  ninho:   "fe55bd_6e5598684d5d40f5b5d11ba30a3cf62c~mv2.jpg",
  lago:    "fe55bd_d9f026c7039a47c4ac41969f2488d4f6~mv2.jpg",
  salzburg:"fe55bd_26361cdaa4674a25baa8f0f1a6180f92~mv2.jpg",
  trilha:  "fe55bd_2c9d1bca6129414a80d52169c3c8643a~mv2.jpg",
  cume:    "fe55bd_3eedc749dec4448ba0f8c9e281ed49ba~mv2.jpg",
  refugio: "fe55bd_6348357277f94da98e02380b1afdf5dc~mv2.jpg",
  vale:    "fe55bd_a2e8ae8972d643869a233757243c1c18~mv2.jpg",
  g1:      "fe55bd_c9d49e29a7d847879d0ce19f4278e1b7~mv2.jpg",
  g2:      "fe55bd_85c3c1b577af425991d00286925641e1~mv2.jpg",
  g3:      "fe55bd_9efef68f016e4cc68769830669111056~mv2.jpg",
  g4:      "fe55bd_6955c18ec721411890bbd072a576e0f0~mv2.jpg",
  g5:      "fe55bd_d7499d2aee3f4a03813ded0d137eade1~mv2.jpg",
  g6:      "fe55bd_af207968faa841d4a705235050098d91~mv2.jpg",
  quarto:  "fe55bd_4f7d15b55c8444d880498304243af7b8~mv2.jpg",
};

// ============================================================
// COMPONENTE: AlpesEspelho — cumes alpinos refletidos no Königssee
// + catamarã + sol. STROKE aberto, sem retângulo de fundo.
// ============================================================
function AlpesEspelho() {
  // Linha de cumes (céu) — picos pontiagudos alpinos
  const skyline =
    "M -30,250 L 40,202 L 92,150 L 150,212 L 198,172 " +
    "L 250,118 L 300,188 L 352,142 L 408,206 L 460,166 L 492,192";

  const pontos = [
    { x: 92,  y: 150, label: "Salzburg",        sub: "início e fim",      anchor: "middle" as const, c: B.ouro },
    { x: 250, y: 118, label: "Ninho da Águia",  sub: "1.800 m",           anchor: "middle" as const, c: B.creme },
    { x: 352, y: 142, label: "Riemannhaus",     sub: "refúgio mais alto", anchor: "start"  as const, c: B.sage },
    { x: 182, y: 300, label: "Königssee",       sub: "águas-espelho",     anchor: "middle" as const, c: B.lago },
  ];

  return (
    <svg viewBox="0 0 460 540" className="h-full w-full" style={{ overflow: "visible" }}>
      {/* Sol alpino — pulsa devagar */}
      <motion.circle cx="372" cy="78" r="28" fill={B.ouro}
        initial={{ opacity: 0 }} animate={{ opacity: [0.12, 0.26, 0.12] }}
        transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }} />
      <motion.circle cx="372" cy="78" r="28" fill="none" stroke={B.ouro} strokeWidth="1.1"
        animate={{ r: [28, 44, 28], opacity: [0.36, 0, 0.36] }}
        transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }} />

      {/* Cúpula barroca de Salzburg — silhueta sutil à esquerda */}
      <motion.g initial={{ opacity: 0, y: 8 }} animate={{ opacity: 0.55, y: 0 }}
        transition={{ duration: 1, ease: EASE, delay: 2.4 }}>
        <g transform="translate(70, 196)" stroke={B.ouro} strokeWidth="1.2" fill="none" strokeLinecap="round">
          <path d="M -10,18 C -10,2 10,2 10,18" />
          <path d="M 0,2 C 4,2 4,-4 0,-6 C -4,-4 -4,2 0,2 Z" />
          <line x1="0" y1="-6" x2="0" y2="-12" />
          <line x1="-10" y1="18" x2="10" y2="18" />
        </g>
      </motion.g>

      {/* Linha de cumes — desenha */}
      <motion.path d={skyline} fill="none" stroke={B.pedra} strokeWidth="2"
        strokeLinejoin="round" strokeLinecap="round"
        initial={{ pathLength: 0, opacity: 0 }} animate={{ pathLength: 1, opacity: 0.9 }}
        transition={{ duration: 2.6, ease: EASE, delay: 0.3 }} />
      {/* Neve nos cumes — pontos de luz */}
      {[[92, 150], [250, 118], [352, 142]].map(([x, y], i) => (
        <motion.circle key={i} cx={x} cy={y} r="2.4" fill={B.creme}
          initial={{ opacity: 0 }} animate={{ opacity: [0.5, 1, 0.5] }}
          transition={{ duration: 3 + i, repeat: Infinity, ease: "easeInOut", delay: 1 + i * 0.3 }} />
      ))}

      {/* Superfície do lago */}
      <motion.line x1="-30" y1="300" x2="492" y2="300" stroke={B.lago} strokeWidth="1.4"
        strokeOpacity="0.5" initial={{ pathLength: 0 }} animate={{ pathLength: 1 }}
        transition={{ duration: 1.6, ease: EASE, delay: 1 }} />

      {/* Reflexo dos cumes no lago — espelho (flip vertical em y=300) */}
      <motion.path d={skyline} fill="none" stroke={B.lago} strokeWidth="1.6"
        strokeLinejoin="round" strokeLinecap="round"
        transform="translate(0,600) scale(1,-1)"
        initial={{ pathLength: 0, opacity: 0 }} animate={{ pathLength: 1, opacity: 0.26 }}
        transition={{ duration: 2.8, ease: EASE, delay: 0.9 }} />

      {/* Shimmer — brilhos na água */}
      {[[60, 330], [140, 360], [320, 340], [400, 372], [220, 318]].map(([x, y], i) => (
        <motion.line key={i} x1={x - 9} y1={y} x2={x + 9} y2={y} stroke={B.creme} strokeWidth="1"
          strokeLinecap="round" initial={{ opacity: 0 }}
          animate={{ opacity: [0.06, 0.34, 0.06], x: [0, i % 2 ? 5 : -5, 0] }}
          transition={{ duration: 3.4 + i * 0.5, repeat: Infinity, ease: "easeInOut", delay: i * 0.4 }} />
      ))}

      {/* Catamarã do Königssee — boia suavemente */}
      <motion.g animate={{ y: [0, -3, 0] }}
        transition={{ duration: 3.6, repeat: Infinity, ease: "easeInOut" }}>
        <g transform="translate(214, 318)">
          <path d="M -20,0 C -14,7 14,7 20,0 L 17,-4 L -17,-4 Z"
            fill="none" stroke={B.ouro} strokeWidth="1.3" strokeLinecap="round" />
          <line x1="-12" y1="-4" x2="-12" y2="-12" stroke={B.ouro} strokeWidth="0.9" />
          <line x1="0" y1="-4" x2="0" y2="-12" stroke={B.ouro} strokeWidth="0.9" />
          <line x1="12" y1="-4" x2="12" y2="-12" stroke={B.ouro} strokeWidth="0.9" />
          <line x1="-15" y1="-12" x2="15" y2="-12" stroke={B.ouro} strokeWidth="0.9" />
        </g>
      </motion.g>

      {/* Pinos da travessia */}
      {pontos.map((p, i) => (
        <motion.g key={p.label}
          initial={{ opacity: 0, scale: 0 }} animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, ease: EASE, delay: 1.4 + i * 0.4 }}>
          <motion.circle cx={p.x} cy={p.y} r="6" fill="none" stroke={p.c} strokeWidth="1.2"
            animate={{ r: [6, 15, 6], opacity: [0.6, 0, 0.6] }}
            transition={{ duration: 2.8, repeat: Infinity, ease: "easeOut", delay: i * 0.5 }} />
          <circle cx={p.x} cy={p.y} r="5" fill={B.noite} stroke={p.c} strokeWidth="2" />
          <circle cx={p.x} cy={p.y} r="1.8" fill={p.c} />
          <text x={p.x + (p.anchor === "start" ? 14 : 0)} y={p.y - 12} fill={B.creme}
            fontSize="13" textAnchor={p.anchor} letterSpacing="0.4"
            style={{ fontFamily: "'Fraunces', Georgia, serif" }}>{p.label}</text>
          <text x={p.x + (p.anchor === "start" ? 14 : 0)} y={p.y + (p.anchor === "start" ? 4 : 22)}
            fill={p.c} fontSize="8.5" textAnchor={p.anchor} letterSpacing="1.3" opacity="0.9"
            style={{ fontFamily: "sans-serif", textTransform: "uppercase" }}>{p.sub}</text>
        </motion.g>
      ))}

      <motion.text x="426" y="300" fill={B.ouro} fontSize="11" letterSpacing="3"
        textAnchor="end" opacity="0.42"
        initial={{ opacity: 0 }} animate={{ opacity: 0.42 }} transition={{ delay: 2.4, duration: 1 }}
        style={{ fontStyle: "italic" }}>65,4 km</motion.text>
    </svg>
  );
}

// ============================================================
// COMPONENTE: ElevationProfile — cumes alpinos pontiagudos
// Picos afiados conectados por vales: o perfil de uma travessia
// de alta montanha (refúgio a refúgio).
// ============================================================
const HILL_PATH =
  "M 0,200 L 80,150 L 175,72 L 255,135 L 335,150 " +
  "L 405,100 L 470,115 L 540,70 L 600,55 L 665,118 " +
  "L 720,100 L 800,158 L 858,170 L 920,180 L 960,188";

const HILL_FILL = HILL_PATH + " L 960,248 L 0,248 Z";

const PERFIL = [
  { x: 14,  y: 200, label: "Salzburg",       sub: "início",          anchor: "start"  as const },
  { x: 175, y: 72,  label: "Ninho da Águia", sub: "1.800 m",         anchor: "middle" as const },
  { x: 335, y: 150, label: "Königssee",      sub: "navegação",       anchor: "middle" as const },
  { x: 600, y: 55,  label: "Riemannhaus",    sub: "refúgio mais alto", anchor: "middle" as const },
  { x: 858, y: 170, label: "Weißbach",       sub: "fim da travessia", anchor: "middle" as const },
  { x: 946, y: 188, label: "Salzburg",       sub: "retorno",         anchor: "end"    as const },
];

function ElevationProfile() {
  return (
    <svg viewBox="0 0 960 260" className="w-full" style={{ overflow: "visible" }}>
      <defs>
        <linearGradient id="bvFill" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={B.sage} stopOpacity="0.4" />
          <stop offset="50%" stopColor={B.lago} stopOpacity="0.24" />
          <stop offset="100%" stopColor={B.lago} stopOpacity="0.04" />
        </linearGradient>
      </defs>
      {[70, 110, 150, 190].map((y) => (
        <line key={y} x1={0} y1={y} x2={960} y2={y} stroke={B.line} strokeWidth="0.5" />
      ))}
      <path d={HILL_FILL} fill="url(#bvFill)" />
      <motion.path d={HILL_PATH} fill="none" stroke={B.sage} strokeWidth="2.2"
        strokeLinejoin="round" strokeLinecap="round"
        initial={{ pathLength: 0, opacity: 0 }}
        whileInView={{ pathLength: 1, opacity: 1 }} viewport={{ once: true }}
        transition={{ duration: 4.2, ease: EASE, delay: 0.2 }} />
      <motion.path d={HILL_PATH} fill="none" stroke={B.ouro} strokeWidth="0.8"
        strokeLinejoin="round" strokeLinecap="round" strokeOpacity="0.35"
        initial={{ pathLength: 0, opacity: 0 }}
        whileInView={{ pathLength: 1, opacity: 1 }} viewport={{ once: true }}
        transition={{ duration: 4.8, ease: EASE, delay: 0.5 }} />
      {PERFIL.map((w) => (
        <g key={w.label}>
          <line x1={w.x} y1={w.y} x2={w.x} y2={228} stroke={B.sage} strokeWidth="1"
            strokeDasharray="2 4" strokeOpacity="0.4" />
          <circle cx={w.x} cy={w.y} r="4.5" fill={B.casca} stroke={B.sage} strokeWidth="1.8" />
          <circle cx={w.x} cy={w.y} r="1.8" fill={B.sage} />
          <text x={w.x} y={w.y - 10} fill={B.creme} fontSize="10" textAnchor={w.anchor}
            letterSpacing="0.4" style={{ fontFamily: "sans-serif" }}>{w.label}</text>
          <text x={w.x} y={w.y - 22} fill={B.sage} fontSize="8.5" textAnchor={w.anchor}
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
  { id: IMG.pano,    cap: "Refúgio alpino nos Alpes Bávaros, entre a rocha e o céu", tag: "Travessia" },
  { id: IMG.lago,    cap: "O Lago Königssee, águas que refletem as paredes de rocha", tag: "Königssee" },
  { id: IMG.ninho,   cap: "O Ninho da Águia, mirante a 1.800 metros de altitude", tag: "Berchtesgaden" },
  { id: IMG.cume,    cap: "A crista dos Alpes Bávaros, terreno lunar sobre as pedras", tag: "Cumes" },
  { id: IMG.trilha,  cap: "Trilhas que serpenteiam entre campos verdes e encostas", tag: "Trilha" },
  { id: IMG.vale,    cap: "Vales profundos e mirantes naturais ao longo do caminho", tag: "Vale" },
  { id: IMG.salzburg,cap: "Salzburg barroca, onde a música de Mozart ainda ecoa", tag: "Salzburg" },
  { id: IMG.g3,      cap: "Refúgios de montanha, abrigo caloroso ao fim do dia", tag: "Refúgio" },
  { id: IMG.g4,      cap: "Setembro nos Alpes, a estação ideal para a travessia", tag: "Setembro" },
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
          <div className="absolute inset-0" style={{ background: `linear-gradient(to top, ${B.noite}cc 0%, transparent 55%)` }} />
          <div className="absolute bottom-0 left-0 right-0 p-6">
            <span className="text-[10px] font-semibold uppercase tracking-[0.32em]" style={{ color: B.ouro }}>{img.tag}</span>
            <p className="mt-1 text-[14px] font-light" style={{ color: B.creme }}>{img.cap}</p>
          </div>
          <div className="absolute right-4 top-4">
            <span className="text-[11px] font-medium" style={{ color: "rgba(236,230,218,0.55)" }}>{idx + 1}/{GALERIA.length}</span>
          </div>
        </motion.div>
      </AnimatePresence>
      <div className="flex gap-2 overflow-x-auto md:flex-col md:overflow-visible">
        {GALERIA.map((g, i) => (
          <button key={i} onClick={() => setIdx(i)}
            className="relative shrink-0 overflow-hidden rounded-xl transition-all duration-300"
            style={{ width: 210, height: 70, opacity: i === idx ? 1 : 0.42,
              outline: i === idx ? `2px solid ${B.lago}` : "2px solid transparent", outlineOffset: 2 }}>
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
  { v: "9",      u: "dias",        s: "8 noites" },
  { v: "65,4",   u: "quilômetros", s: "7 dias de caminhada" },
  { v: "+3.446", u: "metros",      s: "positivo acumulado" },
  { v: "1.800",  u: "metros",      s: "Ninho da Águia" },
  { v: "4",      u: "refúgios",    s: "pernoites na montanha" },
  { v: "2",      u: "países",      s: "Áustria e Alemanha" },
];

const MARCOS = [
  {
    id: "bv-ninho",
    kicker: "Dia 2 · A história no alto dos Alpes",
    titulo: ["O Ninho", "da Águia"],
    texto:
      "A mais de 1.800 metros de altitude, o Kehlsteinhaus foi construído nos anos 1930 e dado como presente de aniversário a Adolf Hitler. Hoje é símbolo de reflexão histórica e contemplação da natureza, um dos mirantes mais impressionantes dos Alpes Bávaros. Do topo, a vista alcança montanhas, vales e lagos, e revela exatamente o território que você vai atravessar nos próximos dias.",
    detalhe: "Kehlsteinhaus · 1.800 m · Berchtesgaden",
    img: IMG.ninho,
    bg: B.casca,
    imgDireita: true,
    colors: {
      kicker: B.ouro, title: B.creme, titleAccent: B.ouro,
      body: "rgba(236,230,218,0.78)", detalhe: B.ouro, link: B.creme,
    },
  },
  {
    id: "bv-lago",
    kicker: "Dia 3 · O espelho dos Alpes",
    titulo: ["O Königssee", "e a Röthbach"],
    texto:
      "Uma navegação serena pelo Lago Königssee, de águas tão claras que refletem o céu e as paredes de rocha como um espelho, com o trompete ecoando entre os paredões. É assim que começa a travessia a pé. Mais adiante, no Parque Nacional de Berchtesgaden, a cachoeira Röthbach despenca 470 metros em dois estágios, a mais alta de toda a Alemanha.",
    detalhe: "Königssee · Röthbach 470 m · Parque Nacional",
    img: IMG.lago,
    bg: B.abeto,
    imgDireita: false,
    colors: {
      kicker: B.sage, title: B.creme, titleAccent: B.lago,
      body: "rgba(236,230,221,0.78)", detalhe: B.creme, link: B.creme,
    },
  },
  {
    id: "bv-salzburg",
    kicker: "Dia 8 · Mozart, cúpulas e a fortaleza",
    titulo: ["Salzburg", "Barroca"],
    texto:
      "Para fechar a travessia, um dia inteiro em Salzburg sem pressa. A Praça Mirabell e seus jardins geométricos, a Casa de Mozart, a trilha histórica da Basteiweg sobre a muralha do Kapuzinerberg e, de funicular, a Fortaleza Hohensalzburg, um dos maiores e mais bem preservados castelos medievais da Europa. A alma absorve tudo o que foi vivido na montanha.",
    detalhe: "Altstadt · Mozart · Fortaleza Hohensalzburg",
    img: IMG.salzburg,
    bg: B.lagoDeep,
    imgDireita: true,
    colors: {
      kicker: "rgba(236,230,218,0.7)", title: B.creme, titleAccent: B.ouro,
      body: "rgba(236,230,218,0.82)", detalhe: B.creme, link: B.creme,
    },
  },
];

const EXPERIENCIAS = [
  { icon: "eagle",    t: "Ninho da Águia",      s: "Subida ao Kehlsteinhaus a 1.800 m, mirante histórico sobre os Alpes Bávaros.",        tag: "Berchtesgaden" },
  { icon: "boat",     t: "Lago Königssee",      s: "Navegação de catamarã em águas-espelho, ao som do trompete que ecoa nos paredões.",   tag: "Águas-espelho" },
  { icon: "water",    t: "Cachoeira Röthbach",  s: "A mais alta da Alemanha, 470 m em dois estágios, no Parque Nacional de Berchtesgaden.", tag: "470 m" },
  { icon: "hut",      t: "Refúgios Alpinos",    s: "Wasseralm, Kärlingerhaus, Riemannhaus e Ingolstädterhaus: dormir no coração da montanha.", tag: "Travessia" },
  { icon: "music",    t: "Salzburg de Mozart",  s: "A Casa de Mozart e o centro barroco onde a música ainda ecoa nas ruas de pedra.",     tag: "Altstadt" },
  { icon: "castle",   t: "Fortaleza Hohensalzburg", s: "Funicular a um dos maiores castelos medievais da Europa, com vista total do vale.", tag: "Hohensalzburg" },
];

const ROTEIRO = [
  { d: "01", icon: "plane",    t: "Chegada em Salzburg, Áustria",
    s: "Encontro em hotel ao lado da Estação Ferroviária. Reunião de briefing às 15h, com a apresentação dos detalhes da viagem e a conferência dos equipamentos. À tarde, caminhada a pé até o centro histórico e jantar compartilhado para celebrar o início da jornada." },
  { d: "02", icon: "eagle",    t: "Berchtesgaden e o Ninho da Águia",
    s: "Café da manhã às 8h e transfer privado a Berchtesgaden, já na Alemanha. Trilha de acesso ao Ninho da Águia (Kehlsteinhaus), a 1.800 m. Almoço livre no topo e descida de transporte público até a hospedagem em Schönau. 8,6 km e 913 m positivos." },
  { d: "03", icon: "boat",     t: "1º dia de travessia: Königssee a Wasseralm",
    s: "Navegação pelo Königssee até a extremidade sul do lago. Trilha ao restaurante de montanha Saletalm, depois ao longo do Obersee até o Fischunkelalm e a cachoeira Röthbach, a mais alta da Alemanha com 470 m. Pernoite no refúgio Wasseralm." },
  { d: "04", icon: "hut",      t: "2º dia de travessia: Wasseralm a Kärlingerhaus",
    s: "Trilhas que serpenteiam pelos Alpes Bávaros, entre campos verdes, encostas rochosas e o silêncio quebrado pelos sinos das vacas ao longe. Mirantes naturais e vales profundos até o Kärlingerhaus, às margens do belíssimo Lago Funtensee." },
  { d: "05", icon: "mountain", t: "3º dia de travessia: Kärlingerhaus a Riemannhaus",
    s: "O Funtensee espelhado pela luz suave da manhã. A trilha ganha altitude aos poucos, revelando paisagens cada vez mais amplas e selvagens, entre campos alpinos e trechos rochosos, até o Riemannhaus, um dos refúgios mais altos da região." },
  { d: "06", icon: "mountain", t: "4º dia de travessia: Riemannhaus a Ingolstädterhaus",
    s: "A caminhada percorre a crista dos Alpes Bávaros, com vistas abertas para vales profundos e picos imponentes, quase um terreno lunar sobre as pedras. Passagens técnicas, mas com trilhas bem marcadas, até o acolhedor Ingolstädterhaus." },
  { d: "07", icon: "boot",     t: "5º dia de travessia: Ingolstädterhaus a Weißbach",
    s: "O último dia de caminhada desce gradualmente das altas montanhas para os vales verdejantes, por florestas, riachos cristalinos e pastagens alpinas. Fim da travessia em Weißbach bei Lofer e transfer de volta a Salzburg." },
  { d: "08", icon: "music",    t: "Dia livre em Salzburg",
    s: "Caminhada pelo centro antigo: Praça Mirabell e seus jardins, Casa de Mozart e a trilha histórica da Basteiweg sobre a muralha do Kapuzinerberg. Almoço e, de funicular, subida à Fortaleza Hohensalzburg, um dos maiores castelos medievais da Europa." },
  { d: "09", icon: "flag",     t: "Último dia, check-out",
    s: "Sem atividades programadas. Após o café da manhã, liberdade total para seguir viagem ou retornar ao Brasil. Fim das operações." },
];

const INCLUSO = [
  "3 pernoites em hotel na cidade de Salzburg",
  "4 pernoites em refúgios de montanha (quartos e banheiros compartilhados)",
  "Café da manhã todos os dias",
  "Jantar nos 4 pernoites dos refúgios de montanha",
  "Transfer privado de Salzburg para Berchtesgaden",
  "Tickets de ônibus para deslocamentos em Berchtesgaden",
  "Ingressos e tickets de transporte para a visita ao Ninho da Águia",
  "Ticket de catamarã no Lago Königssee",
  "Ticket do funicular e ingresso para a Fortaleza Hohensalzburg",
  "Kit boas-vindas TARGET by AONIK",
  "Suporte pré-viagem para preparação e compra de equipamentos",
  "Guia brasileiro com treinamento em primeiros socorros em áreas remotas",
  "Rastreador via satélite individual para cada participante",
];

const NAO_INCLUSO = [
  "Passagens aéreas",
  "Transfer in e out do aeroporto até o hotel em Salzburg",
  "Seguro viagem internacional (obrigatório)",
  "Jantares dos dias 1, 2, 8 e 9",
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
    case "eagle":
      return <svg viewBox="0 0 24 24" style={s}>
        <path d="M2 13 C6 8 9.5 11.5 12 9 C14.5 11.5 18 8 22 13" />
        <path d="M12 9 L12 6" />
        <path d="M12 6 L14 4.5" />
        <path d="M9.5 15 C10.5 17 13.5 17 14.5 15" strokeOpacity="0.55" />
      </svg>;
    case "boat":
      return <svg viewBox="0 0 24 24" style={s}>
        <path d="M3 16 C7 13 10 13 12 13 C14 13 17 13 21 16" />
        <line x1="6" y1="14" x2="6" y2="8" />
        <line x1="12" y1="13" x2="12" y2="8" />
        <line x1="18" y1="14" x2="18" y2="8" />
        <line x1="5" y1="8" x2="19" y2="8" />
        <path d="M4 19 C8 17 16 17 20 19" strokeOpacity="0.5" />
      </svg>;
    case "water":
      return <svg viewBox="0 0 24 24" style={s}>
        <path d="M7 3 L7 13" />
        <path d="M12 3 L12 15" />
        <path d="M17 3 L17 13" />
        <path d="M4 19 C7 17 9 21 12 19 C15 17 17 21 20 19" strokeOpacity="0.7" />
      </svg>;
    case "hut":
      return <svg viewBox="0 0 24 24" style={s}>
        <path d="M3 20 L12 4 L21 20 Z" />
        <path d="M7.5 20 L7.5 13 L16.5 13 L16.5 20" />
        <rect x="10" y="15.5" width="4" height="4.5" />
      </svg>;
    case "music":
      return <svg viewBox="0 0 24 24" style={s}>
        <circle cx="7" cy="18" r="2.4" />
        <circle cx="17" cy="16" r="2.4" />
        <path d="M9.4 18 L9.4 6 L19.4 4 L19.4 16" />
        <path d="M9.4 9 L19.4 7" strokeOpacity="0.6" />
      </svg>;
    case "castle":
      return <svg viewBox="0 0 24 24" style={s}>
        <path d="M4 20 L4 9 L6 9 L6 7 L8 7 L8 9 L11 9 L11 7 L13 7 L13 9 L16 9 L16 7 L18 7 L18 9 L20 9 L20 20 Z" />
        <line x1="4" y1="20" x2="20" y2="20" />
        <path d="M10 20 L10 15 L14 15 L14 20" />
      </svg>;
    case "mountain":
      return <svg viewBox="0 0 24 24" style={s}>
        <path d="M3 20 L10 7 L14 14 L17 9 L21 20 Z" />
        <path d="M8.5 11.5 L12 10 L13 11.5" strokeOpacity="0.5" strokeWidth="1" />
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
export default function BavariaPage() {
  const datas2027 = datasDoAno(GRUPO, 2027);

  return (
    <main className="relative" style={{ background: B.creme }}>
      <Nav />

      {/* ===== HERO ===== */}
      <section className="relative flex min-h-[100svh] w-full items-center overflow-hidden" style={{ background: B.noite }}>
        <motion.div className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url('${wx(IMG.pano, 2400, 1500)}')` }}
          initial={{ scale: 1.12 }} animate={{ scale: 1 }} transition={{ duration: 14, ease: "easeOut" }} />
        <div className="absolute inset-0"
          style={{ background: `linear-gradient(to right, ${B.noite}f2 0%, ${B.noite}b0 52%, ${B.noite}66 100%)` }} />
        <motion.div className="absolute inset-0 z-[1]" style={{ background: B.noite, pointerEvents: "none" }}
          initial={{ opacity: 1 }} animate={{ opacity: 0 }} transition={{ duration: 0.9, delay: 0.4 }} />

        <div className="relative z-10 mx-auto grid w-full max-w-[1400px] items-center gap-10 px-6 py-28 md:grid-cols-2 md:gap-16 md:px-10">
          <div>
            <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, ease: EASE, delay: 0.2 }} className="mb-4 flex items-center gap-3">
              <Icon name="pin" size={14} color={B.ouro} />
              <span className="text-[11px] font-semibold uppercase tracking-[0.4em]" style={{ color: B.ouro }}>
                Áustria e Alemanha · Alpes Bávaros
              </span>
            </motion.div>
            <motion.h1 initial={{ opacity: 0, y: 32 }} animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.1, ease: EASE, delay: 0.3 }}
              className="font-display font-light uppercase leading-[0.86] tracking-[-0.02em]"
              style={{ fontSize: "clamp(3.2rem, 8vw, 7.5rem)", color: B.creme }}>
              Bavária
              <br />
              <span style={{ color: B.lago }}>Alemã</span>
            </motion.h1>
            <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, ease: EASE, delay: 0.48 }}
              className="mt-3 font-display font-light italic"
              style={{ fontSize: "clamp(1rem, 2vw, 1.5rem)", color: B.creme, opacity: 0.62 }}>
              Nove dias. Sessenta e cinco quilômetros. O silêncio dos Alpes.
            </motion.p>
            <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, ease: EASE, delay: 0.55 }}
              className="mt-6 max-w-md text-[15px] font-light leading-relaxed md:text-base"
              style={{ color: "rgba(236,230,218,0.74)" }}>
              Uma travessia que começa e termina em Salzburg, entre cúpulas barrocas e montanhas
              eternas. Do Ninho da Águia ao Königssee, cinco dias de caminhada por trilhas alpinas,
              vales escondidos e refúgios de montanha, onde{" "}
              <span style={{ color: B.creme }}>o silêncio fala mais alto.</span>
            </motion.p>
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, ease: EASE, delay: 0.7 }} className="mt-8 flex flex-wrap items-center gap-5">
              <a href="#reservar"
                className="inline-flex items-center gap-3 rounded-full px-8 py-4 text-[13px] font-semibold uppercase tracking-[0.16em] transition-transform duration-300 hover:scale-[1.03]"
                style={{ background: B.lago, color: B.creme }}>
                Reserve sua vaga <span>&#8594;</span>
              </a>
              <span>
                <span className="text-[12px] uppercase tracking-[0.16em]" style={{ color: "rgba(236,230,218,0.5)" }}>a partir de</span>{" "}
                <span className="font-display text-2xl" style={{ color: B.creme }}>€ 4.950</span>
              </span>
            </motion.div>
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1, delay: 0.95 }}
              className="mt-5 inline-flex items-center gap-2 rounded-full border px-4 py-2 text-[11px] uppercase tracking-[0.16em]"
              style={{ borderColor: B.sage, color: B.sage }}>
              <span className="h-1.5 w-1.5 rounded-full animate-pulse" style={{ background: B.sage }} />
              Próxima saída · 14 a 24 Set 2027
            </motion.div>
          </div>

          <motion.div initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1.2, ease: EASE, delay: 0.35 }}
            className="mx-auto hidden w-full max-w-[440px] md:block" style={{ height: 460 }}>
            <AlpesEspelho />
          </motion.div>
        </div>
      </section>

      {/* ===== STATS BAR ===== */}
      <section className="grid grid-cols-2 gap-px md:grid-cols-3 lg:grid-cols-6"
        style={{ background: B.line, borderTop: `1px solid ${B.line}` }}>
        {STATS.map((s, i) => (
          <Reveal key={i} delay={i * 0.04}>
            <div className="flex flex-col px-6 py-8" style={{ background: B.casca }}>
              <span className="font-display font-light leading-none" style={{ fontSize: "clamp(1.7rem,3vw,2.5rem)", color: B.creme }}>{s.v}</span>
              <span className="mt-1 text-[11px] font-semibold uppercase tracking-[0.2em]" style={{ color: B.sage }}>{s.u}</span>
              <span className="mt-1 text-[12px] font-light" style={{ color: B.textSoft }}>{s.s}</span>
            </div>
          </Reveal>
        ))}
      </section>

      {/* ===== CENTERPIECE (fundo claro — Mother of Pearl) ===== */}
      <section className="relative w-full overflow-hidden" style={{ background: B.creme }}>
        <div className="pointer-events-none absolute inset-0 flex items-center justify-center overflow-hidden">
          <span className="select-none font-display font-light uppercase"
            style={{ fontSize: "clamp(5rem,18vw,16rem)", color: "rgba(30,58,44,0.06)",
              letterSpacing: "-0.04em", lineHeight: 1, whiteSpace: "nowrap" }}>
            ALPES
          </span>
        </div>
        <div className="relative z-10 mx-auto max-w-[1000px] px-6 py-32 text-center md:py-44">
          <Reveal>
            <p className="text-[11px] font-semibold uppercase tracking-[0.4em]" style={{ color: B.sage }}>
              A travessia dos Alpes Bávaros
            </p>
          </Reveal>
          <Reveal delay={0.1}>
            <h2 className="mt-6 font-display font-light leading-[1.05]" style={{ fontSize: "clamp(2.4rem,5.5vw,4.6rem)", color: B.abeto }}>
              Onde a montanha
              <br />
              <span className="italic" style={{ color: B.lago }}>fala mais alto</span>
            </h2>
          </Reveal>
          <Reveal delay={0.18}>
            <p className="mx-auto mt-8 max-w-2xl text-[16px] font-light leading-relaxed" style={{ color: "rgba(20,42,32,0.66)" }}>
              Entre a Áustria e a Alemanha, a cada passo o tempo desacelera e a paisagem se torna
              poesia. Cúpulas barrocas, lagos que refletem o céu como espelhos e refúgios de
              montanha onde o cansaço dá lugar à satisfação.{" "}
              <span style={{ color: B.abeto, fontStyle: "italic" }}>Montanhas, silêncio e cultura em perfeita harmonia.</span>
            </p>
          </Reveal>
        </div>
      </section>

      {/* ===== PERFIL DE ELEVAÇÃO ===== */}
      <section className="w-full overflow-hidden pb-0 pt-16" style={{ background: B.casca }}>
        <div className="mx-auto px-4 md:px-8">
          <Reveal>
            <p className="mb-8 text-center text-[11px] font-semibold uppercase tracking-[0.4em]" style={{ color: B.ouro, opacity: 0.8 }}>
              Perfil da travessia · 65,4 km · Salzburg ao coração dos Alpes
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
      <section className="px-6 py-24 md:px-10 md:py-32" style={{ background: B.abeto }}>
        <div className="mx-auto max-w-[1280px]">
          <Reveal>
            <p className="text-[11px] font-semibold uppercase tracking-[0.35em]" style={{ color: B.sage }}>Experiências incluídas</p>
          </Reveal>
          <Reveal delay={0.06}>
            <h2 className="mt-4 font-display font-light leading-[1.05]" style={{ fontSize: "clamp(1.8rem,3.5vw,2.8rem)", color: B.creme }}>
              História, montanha
              <br />
              <span className="italic" style={{ color: B.lago }}>e contemplação</span>
            </h2>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="mt-4 max-w-xl text-[15px] font-light leading-relaxed" style={{ color: B.textSoft }}>
              Não é só caminhada. É a história de Mozart e dos Alpes, lagos-espelho, a cachoeira
              mais alta da Alemanha e refúgios de montanha, tudo guiado por quem conhece a terra.
            </p>
          </Reveal>
          <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {EXPERIENCIAS.map((e, i) => (
              <Reveal key={i} delay={i * 0.06}>
                <div className="group relative rounded-2xl p-7 transition-all duration-300"
                  style={{ background: "rgba(138,164,131,0.10)", border: `1px solid rgba(138,164,131,0.22)` }}>
                  <div className="mb-4 flex items-center justify-between">
                    <Icon name={e.icon} size={22} color={B.sage} />
                    <span className="rounded-full px-2.5 py-1 text-[9px] font-semibold uppercase tracking-[0.2em]"
                      style={{ background: "rgba(20,42,32,0.6)", color: B.sage }}>{e.tag}</span>
                  </div>
                  <h3 className="font-display font-light" style={{ fontSize: "1.15rem", color: B.creme }}>{e.t}</h3>
                  <p className="mt-2 text-[13px] font-light leading-relaxed" style={{ color: B.textSoft }}>{e.s}</p>
                  <div className="mt-4 h-px w-0 transition-all duration-500 group-hover:w-full" style={{ background: B.lago }} />
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ===== HOSPEDAGENS — fundo creme (segundo bloco editorial claro) ===== */}
      <section className="w-full" style={{ background: B.creme }}>
        <div className="grid md:grid-cols-2">
          <div className="relative min-h-[420px] overflow-hidden md:min-h-[560px]">
            <div className="absolute inset-0 bg-cover bg-center transition-transform duration-700 hover:scale-[1.03]"
              style={{ backgroundImage: `url('${wx(IMG.refugio, 1400, 1000)}')` }} />
            <div className="absolute inset-0" style={{ background: `linear-gradient(to bottom, transparent 40%, rgba(13,20,17,0.55) 100%)` }} />
            <div className="absolute bottom-4 left-5">
              <span className="text-[10px] font-semibold uppercase tracking-[0.3em]" style={{ color: B.creme }}>
                Hotéis em Salzburg e refúgios de montanha
              </span>
            </div>
          </div>
          <div className="flex flex-col justify-center px-8 py-16 md:px-14 md:py-20">
            <Reveal>
              <p className="text-[11px] font-semibold uppercase tracking-[0.35em]" style={{ color: B.sage }}>Hospedagens</p>
            </Reveal>
            <Reveal delay={0.08}>
              <h2 className="mt-5 font-display font-light uppercase leading-[0.88]" style={{ fontSize: "clamp(2.4rem,4.5vw,4rem)", color: B.abeto }}>
                Dormir no
                <br />
                <span style={{ color: B.lago }}>coração dos Alpes</span>
              </h2>
            </Reveal>
            <Reveal delay={0.14}>
              <p className="mt-6 max-w-sm text-[15px] font-light leading-relaxed" style={{ color: "rgba(20,42,32,0.66)" }}>
                Hotéis confortáveis em Salzburg e Schönau, antes e depois da montanha, e quatro
                pernoites em autênticos refúgios alpinos no meio da travessia. Cada refúgio surge
                como um abrigo caloroso, onde o cansaço dá lugar à satisfação.
              </p>
            </Reveal>
            <Reveal delay={0.2}>
              <div className="mt-8 space-y-3">
                {[
                  "3 pernoites em hotel na cidade de Salzburg",
                  "4 pernoites em refúgios de montanha (Wasseralm, Kärlingerhaus, Riemannhaus, Ingolstädterhaus)",
                  "Quartos e banheiros compartilhados nos refúgios",
                  "Café da manhã todos os dias e jantar nos refúgios",
                ].map((item) => (
                  <div key={item} className="flex items-start gap-3 text-[13px] font-light" style={{ color: "rgba(20,42,32,0.62)" }}>
                    <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full" style={{ background: B.lago }} />
                    {item}
                  </div>
                ))}
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ===== GALERIA ===== */}
      <section className="px-6 py-20 md:px-10 md:py-28" style={{ background: B.casca }}>
        <div className="mx-auto max-w-[1280px]">
          <Reveal>
            <p className="text-[11px] font-semibold uppercase tracking-[0.35em]" style={{ color: B.ouro }}>Galeria</p>
            <h2 className="mt-4 font-display font-light" style={{ fontSize: "clamp(1.8rem,3.5vw,2.8rem)", color: B.creme }}>
              O que você vai viver
            </h2>
          </Reveal>
          <Reveal delay={0.1} className="mt-8"><GaleriaInterativa /></Reveal>
        </div>
      </section>

      {/* ===== ROTEIRO — fundo creme (terceiro bloco editorial claro) ===== */}
      <section className="px-6 py-24 md:px-10 md:py-32" style={{ background: B.creme }}>
        <div className="mx-auto max-w-[1100px]">
          <Reveal>
            <p className="text-[11px] font-semibold uppercase tracking-[0.32em]" style={{ color: B.sage }}>Roteiro dia a dia</p>
          </Reveal>
          <Reveal delay={0.08}>
            <p className="mt-3 max-w-lg text-[14px] font-light leading-relaxed" style={{ color: "rgba(20,42,32,0.55)" }}>
              Nove dias entre Áustria e Alemanha, com cinco dias de travessia alpina de refúgio em
              refúgio, abertura no Ninho da Águia e encerramento na Salzburg de Mozart.
            </p>
          </Reveal>
          <div className="mt-12">
            {ROTEIRO.map((r, i) => (
              <Reveal key={r.d} delay={i * 0.04}>
                <div className="grid grid-cols-[auto_1fr] items-baseline gap-6 border-t py-7 md:gap-10"
                  style={{ borderColor: "rgba(138,164,131,0.22)" }}>
                  <div className="flex items-center gap-4">
                    <span className="font-display text-sm" style={{ color: "rgba(20,42,32,0.32)" }}>{r.d}</span>
                    <Icon name={r.icon} size={18} color={B.lago} />
                  </div>
                  <div>
                    <h3 className="font-display font-light" style={{ fontSize: "clamp(1.1rem,2vw,1.5rem)", color: B.abeto }}>{r.t}</h3>
                    <p className="mt-1.5 text-[14px] font-light leading-relaxed" style={{ color: "rgba(20,42,32,0.58)" }}>{r.s}</p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ===== O LÍDER DA JORNADA · HENDRIK ===== */}
      <section className="px-6 py-24 md:px-10 md:py-32" style={{ background: B.casca, color: B.creme }}>
        <div className="mx-auto max-w-[1280px]">
          <Reveal>
            <p className="flex items-center gap-3 text-[11px] font-semibold uppercase tracking-[0.3em]" style={{ color: B.ouro }}>
              <span className="h-px w-8" style={{ background: B.ouro }} />
              O guia da jornada
            </p>
          </Reveal>

          <div className="mt-10 grid items-start gap-10 md:grid-cols-[420px_1fr] md:gap-16">
            <Reveal>
              <div className="relative overflow-hidden rounded-2xl" style={{ height: 540 }}>
                <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: `url('${wx(IMG.trilha, 900, 1200)}')` }} />
                <div className="absolute inset-0" style={{ background: `linear-gradient(to top, ${B.casca}ee 0%, transparent 55%)` }} />
                <div className="absolute inset-x-0 bottom-0 p-7">
                  <p className="font-display text-[1.6rem] font-light leading-tight" style={{ color: B.creme }}>Hendrik Fendel</p>
                  <p className="mt-1 text-[12px] uppercase tracking-[0.18em]" style={{ color: B.ouro }}>Urubici · Santa Catarina</p>
                </div>
              </div>
            </Reveal>

            <Reveal delay={0.1}>
              <div>
                <h2 className="font-display font-light leading-[1.05] tracking-[-0.01em]" style={{ fontSize: "clamp(2rem,3.8vw,3rem)", color: B.creme }}>
                  Hendrik Fendel
                </h2>
                <p className="mt-2 text-[12px] uppercase tracking-[0.2em]" style={{ color: B.ouro }}>Condutor de turismo de natureza</p>
                <p className="mt-6 max-w-xl text-[15px] font-light leading-relaxed" style={{ color: "rgba(236,230,218,0.74)" }}>
                  Radicado em Urubici, na Serra Catarinense, Hendrik construiu sua trajetória
                  profundamente conectada às montanhas, trilhas e paisagens do sul do Brasil. Ao
                  longo dos anos, transformou essa vivência em profissão e propósito de vida.
                </p>
                <p className="mt-4 max-w-xl text-[15px] font-light leading-relaxed" style={{ color: "rgba(236,230,218,0.74)" }}>
                  Seu estilo de condução é marcado pela atenção aos detalhes, pela leitura cuidadosa
                  do clima e do terreno e pela capacidade de criar experiências autênticas e
                  humanas, sempre com foco na segurança e no respeito ao ritmo do grupo. Mais do que
                  guiar caminhos, Hendrik se dedica a conectar pessoas à natureza. Nas horas livres,
                  é artesão de móveis rústicos feitos a partir de resíduos florestais.
                </p>

                <div className="mt-8">
                  <p className="mb-4 text-[11px] font-semibold uppercase tracking-[0.22em]" style={{ color: "rgba(236,230,218,0.4)" }}>
                    Marcas da condução
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {HENDRIK_MARCAS.map((p) => (
                      <span key={p} className="flex items-center gap-2 rounded-full border px-4 py-1.5 text-[12px] font-light"
                        style={{ borderColor: "rgba(199,163,92,0.3)", color: "rgba(236,230,218,0.7)" }}>
                        <Icon name="mountain" size={12} color="rgba(199,163,92,0.55)" />
                        {p}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="mt-8 rounded-2xl border px-5 py-4 text-[13px] font-light leading-relaxed"
                  style={{ borderColor: B.line, color: "rgba(236,230,218,0.66)" }}>
                  Em campo, o grupo conta com suporte completo de logística entre Salzburg e os
                  refúgios, transfers privados, rastreador via satélite individual e{" "}
                  <span style={{ color: B.ouro }}>guia brasileiro com treinamento em primeiros socorros em áreas remotas.</span>
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ===== RESERVE SUA VAGA + PREÇO ===== */}
      <section id="reservar" className="px-6 py-24 md:px-10 md:py-32" style={{ background: B.lagoDeep }}>
        <div className="mx-auto max-w-[1280px]">
          <Reveal>
            <p className="text-[11px] font-semibold uppercase tracking-[0.35em]" style={{ color: B.creme, opacity: 0.6 }}>Saídas disponíveis</p>
          </Reveal>
          <Reveal delay={0.08}>
            <h2 className="mt-5 font-display font-light leading-[1.05]" style={{ fontSize: "clamp(2rem,4.5vw,3.6rem)", color: B.creme }}>
              Quando você quer
              <br />
              <span className="italic" style={{ color: B.ouro }}>atravessar os Alpes?</span>
            </h2>
          </Reveal>

          <Reveal delay={0.1}>
            <div className="mt-10 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
              {datas2027.map((d) => (
                <div key={d} className="rounded-2xl p-7" style={{ background: "rgba(59,125,128,0.22)", border: `1px solid rgba(59,125,128,0.5)` }}>
                  <div className="flex items-center justify-between">
                    <span className="rounded-full px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.2em]" style={{ background: B.lago, color: B.creme }}>2027</span>
                    <span className="text-[11px]" style={{ color: B.textSoft }}>9 dias</span>
                  </div>
                  <p className="mt-6 font-display font-light" style={{ fontSize: "clamp(1.6rem,3vw,2.4rem)", color: B.creme }}>{d}</p>
                  <p className="mt-1 text-[12px] font-light" style={{ color: B.textSoft }}>Alpes Bávaros · Áustria e Alemanha · Setembro 2027</p>
                  <a href="#contato" className="mt-6 inline-flex items-center gap-2 text-[12px] font-semibold uppercase tracking-[0.18em] transition-opacity hover:opacity-75" style={{ color: B.ouro }}>
                    Reservar vaga &#8594;
                  </a>
                </div>
              ))}
              <div className="rounded-2xl p-7" style={{ background: "rgba(199,163,92,0.08)", border: `1px solid rgba(199,163,92,0.2)` }}>
                <div className="flex items-center justify-between">
                  <span className="rounded-full px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.2em]" style={{ border: `1px solid ${B.ouro}`, color: B.ouro }}>grupo pequeno</span>
                  <span className="text-[11px]" style={{ color: B.textSoft }}>mín. 3 pessoas</span>
                </div>
                <p className="mt-6 font-display font-light" style={{ fontSize: "clamp(1.3rem,2.5vw,1.9rem)", color: B.creme }}>
                  Liderança brasileira
                </p>
                <p className="mt-1 text-[12px] font-light" style={{ color: B.textSoft }}>
                  Hendrik Fendel + suporte completo de logística alpina
                </p>
              </div>
            </div>
          </Reveal>

          <Reveal delay={0.15}>
            <div className="mt-14 flex flex-col gap-4 border-t pt-10 md:flex-row md:items-center md:justify-between" style={{ borderColor: "rgba(59,125,128,0.35)" }}>
              <div>
                <p className="text-[11px] font-semibold uppercase tracking-[0.2em]" style={{ color: B.textSoft }}>Investimento</p>
                <p className="mt-2 font-display font-light" style={{ fontSize: "clamp(2rem,3.5vw,2.8rem)", color: B.creme }}>
                  € 4.950
                  <span className="ml-3 text-[14px]" style={{ color: B.textSoft }}>por pessoa · habitação dupla</span>
                </p>
                <p className="mt-1 text-[13px] font-light" style={{ color: B.textSoft }}>
                  30% de entrada via Pix ou transferência + 5x sem juros no cartão. Consulte tarifa single.
                </p>
                <p className="mt-1 text-[11px] font-light" style={{ color: "rgba(236,230,218,0.4)" }}>
                  Valor em Euro, base Euro Turismo na data do fechamento.
                </p>
              </div>
              <a href="#contato" className="inline-flex shrink-0 items-center gap-3 rounded-full px-8 py-4 text-[13px] font-semibold uppercase tracking-[0.16em] transition-transform duration-300 hover:scale-[1.03]" style={{ background: B.lago, color: B.creme }}>
                Falar com a equipe &#8594;
              </a>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ===== INCLUSO / NÃO INCLUSO ===== */}
      <section className="px-6 py-24 md:px-10 md:py-32" style={{ background: B.casca, color: B.creme }}>
        <div className="mx-auto grid max-w-[1280px] gap-12 md:grid-cols-2 md:gap-20">
          <Reveal>
            <p className="text-[11px] font-semibold uppercase tracking-[0.32em]" style={{ color: B.ouro }}>Está incluso</p>
            <ul className="mt-8 space-y-4">
              {INCLUSO.map((item) => (
                <li key={item} className="flex items-start gap-4 text-[14px] font-light leading-relaxed" style={{ color: B.creme }}>
                  <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full" style={{ background: B.lago }} />
                  {item}
                </li>
              ))}
            </ul>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="text-[11px] font-semibold uppercase tracking-[0.32em]" style={{ color: "rgba(59,125,128,0.85)" }}>Não incluso</p>
            <ul className="mt-8 space-y-4">
              {NAO_INCLUSO.map((item) => (
                <li key={item} className="flex items-start gap-4 text-[14px] font-light leading-relaxed" style={{ color: B.textSoft }}>
                  <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full" style={{ background: "rgba(59,125,128,0.5)" }} />
                  {item}
                </li>
              ))}
            </ul>
            <div className="mt-10 rounded-2xl border p-5" style={{ borderColor: B.line }}>
              <p className="text-[11px] font-semibold uppercase tracking-[0.2em]" style={{ color: B.ouro }}>Cancelamento</p>
              <div className="mt-4 space-y-2 text-[13px] font-light" style={{ color: B.textSoft }}>
                <div className="flex justify-between"><span>31 dias ou mais</span><span style={{ color: B.creme }}>10%</span></div>
                <div className="flex justify-between"><span>30 a 21 dias</span><span style={{ color: B.creme }}>20%</span></div>
                <div className="flex justify-between"><span>20 a 8 dias</span><span style={{ color: B.creme }}>50%</span></div>
                <div className="flex justify-between"><span>7 dias ou menos</span><span style={{ color: B.creme }}>100%</span></div>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ===== AONIKIA ===== */}
      <section className="px-6 py-20 md:px-10 md:py-24" style={{ background: B.lagoDeep }}>
        <div className="mx-auto max-w-[860px] text-center">
          <Reveal>
            <p className="text-[11px] font-semibold uppercase tracking-[0.3em]" style={{ color: B.creme, opacity: 0.6 }}>
              AonikIA · especialista na Bavária Alemã
            </p>
            <h2 className="mt-5 font-display font-light leading-[1.15]" style={{ fontSize: "clamp(1.8rem,3.5vw,2.8rem)", color: B.creme }}>
              Pergunte tudo sobre a travessia
            </h2>
            <p className="mx-auto mt-4 max-w-md text-[15px] font-light leading-relaxed" style={{ color: "rgba(236,230,218,0.66)" }}>
              Como se preparar para a travessia alpina, como funcionam os refúgios de montanha, o
              que levar na mochila, como é setembro nos Alpes Bávaros. A AonikIA conhece este
              programa de ponta a ponta.
            </p>
            <a href="#contato" className="mt-7 inline-flex items-center gap-3 rounded-full border px-7 py-3.5 text-[12px] font-semibold uppercase tracking-[0.16em] transition-all duration-300 hover:opacity-80" style={{ borderColor: B.sage, color: B.sage }}>
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
