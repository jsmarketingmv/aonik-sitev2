"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Nav from "../../components/Nav";
import Breadcrumb from "../../components/Breadcrumb";
import Footer from "../../components/Footer";
import Contato from "../../components/Contato";
import FloatingActions from "../../components/FloatingActions";
import { Reveal, EASE } from "../../components/ui";
import { GRUPOS } from "../../lib/grupos";

/* ============================================================
   CIRCUITO O · TORRES DEL PAINE — grupo guiado 8D/7N
   Identidade Patagônia Chilena (granito · gelo · ouro do amanhecer,
   o mesmo dourado da capa do catálogo). Assinatura: a VOLTA COMPLETA
   ao maciço (o "O"), com o guia Ivo Léo. Saída 21 a 28/Fev/2027, confirmada.
   ============================================================ */
const O = {
  ink: "#0c1219",
  granito: "#1b2733",
  granitoSoft: "#26323f",
  ouro: "#c99a52",
  ouroSoft: "#e0b878",
  ouroDeep: "#8a6a2f",
  gelo: "#9cc3d4",
  creme: "#f1ece2",
  cInk: "rgba(241,236,226,0.92)",
  cSoft: "rgba(241,236,226,0.66)",
  cFaint: "rgba(241,236,226,0.42)",
  line: "rgba(156,195,212,0.18)",
};

const GRUPO = GRUPOS.find((g) => g.id === "torres-del-paine-o-circuit")!;
const DATA_SAIDA = "21 a 28 de fevereiro de 2027";
const OBS_ITINERARIO =
  "Itinerário em fase de confirmação, passível de ajustes no modelo de hospedagem.";

const PHOTO = {
  hero: "/torres-del-paine/dsc08327.jpg",
  baseTorres: "/torres-del-paine/hero.jpg",
  // Cards dos marcos pedem foto horizontal: vertical recortada em 16/9 vira
  // um pedaço do meio sem contexto (foi o que aconteceu com Cuernos/Francés).
  cuernos: "/torres-del-paine/patagonia.jpg",
  frances: "/torres-del-paine/prod-w-plus.jpg",
  grey: "/torres-del-paine/dsc09030.jpg",
  dickson: "/torres-del-paine/IMG_2169.JPEG",
  celebracao: "/torres-del-paine/dsc08952.jpg",
};

/* ============================================================
   ASSINATURA "O" — a volta completa ao maciço
   Loop desenhado (pathLength) com os pontos de pernoite ao redor.
   ============================================================ */
function OSignature() {
  const cx = 220, cy = 216, rx = 150, ry = 162;
  /* Sentido ANTI-HORÁRIO, na ordem real do circuito: Serón (topo) segue
     pela esquerda até Base Torres. Ângulos decrescentes = anti-horário
     em coordenadas SVG (eixo y para baixo). */
  const nodes = [
    { label: "Serón", ang: -90 },
    { label: "Dickson", ang: -130 },
    { label: "Los Perros", ang: -170 },
    { label: "J. Gardner", ang: -210 },
    { label: "Grey", ang: -250 },
    { label: "Paine Grande", ang: -290 },
    { label: "Francés", ang: -330 },
    { label: "Central", ang: -370 },
    { label: "Base Torres", ang: -410 },
  ];
  const pos = (a: number) => {
    const r = (a * Math.PI) / 180;
    return { x: cx + rx * Math.cos(r), y: cy + ry * Math.sin(r) };
  };
  /* Seta do sentido: tangente da elipse percorrida no anti-horário. */
  const AA = -150;
  const ap = pos(AA);
  const ar = (AA * Math.PI) / 180;
  const aDeg = (Math.atan2(-ry * Math.cos(ar), rx * Math.sin(ar)) * 180) / Math.PI;
  /* Loop anti-horário: sweep-flag 0 desenha no sentido negativo. */
  const loop = `M ${cx},${cy - ry} A ${rx},${ry} 0 1 0 ${cx},${cy + ry} A ${rx},${ry} 0 1 0 ${cx},${cy - ry}`;

  return (
    <svg viewBox="0 0 440 440" className="h-full w-full" fill="none" role="img">
      <title>Circuito O — a volta completa ao maciço Paine, no sentido anti-horário, com o circuito W na parte sul</title>

      {/* glow central */}
      <motion.circle cx={cx} cy={cy} r="96" fill={O.ouro} opacity="0"
        animate={{ opacity: 0.06 }} transition={{ duration: 2, ease: EASE, delay: 1.6 }} />

      {/* o loop — desenhado no sentido anti-horário */}
      <motion.path d={loop}
        stroke={O.ouroSoft} strokeWidth="2" strokeLinecap="round"
        initial={{ pathLength: 0, opacity: 0 }} animate={{ pathLength: 1, opacity: 1 }}
        transition={{ duration: 3.2, ease: EASE, delay: 0.3 }} />

      {/* trilha pontilhada interna, sutil */}
      <motion.ellipse cx={cx} cy={cy} rx={rx - 9} ry={ry - 9}
        stroke={O.gelo} strokeWidth="1" strokeDasharray="2 6" opacity="0"
        animate={{ opacity: 0.28 }} transition={{ duration: 1.4, ease: EASE, delay: 2.6 }} />

      {/* seta do sentido anti-horário */}
      <motion.path d="M -6,-5 L 5,0 L -6,5"
        stroke={O.ouroSoft} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"
        transform={`translate(${ap.x} ${ap.y}) rotate(${aDeg})`}
        initial={{ opacity: 0 }} animate={{ opacity: 0.95 }}
        transition={{ duration: 0.6, ease: EASE, delay: 3.3 }} />

      {/* nós de pernoite */}
      {nodes.map((n, i) => {
        const p = pos(n.ang);
        const right = p.x >= cx;
        return (
          <motion.g key={n.label}
            initial={{ opacity: 0, scale: 0 }} animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.4, ease: EASE, delay: 1.5 + i * 0.13 }}
            style={{ transformOrigin: `${p.x}px ${p.y}px` }}>
            <circle cx={p.x} cy={p.y} r="4.4" fill={i === 8 ? O.ouro : O.ink}
              stroke={O.ouroSoft} strokeWidth="1.8" />
            <text x={right ? p.x + 9 : p.x - 9} y={p.y + 3}
              fontSize="9.5" fill={O.cSoft} textAnchor={right ? "start" : "end"}
              style={{ fontWeight: 300, letterSpacing: "0.3px" }}>{n.label}</text>
          </motion.g>
        );
      })}

      {/* centro — o maciço encerrado pelo circuito */}
      <motion.text x={cx} y={170} fontSize="13" fill={O.creme} textAnchor="middle"
        initial={{ opacity: 0 }} animate={{ opacity: 1 }}
        transition={{ duration: 1, ease: EASE, delay: 2.9 }}
        style={{ fontWeight: 300, letterSpacing: "3px" }}>MACIÇO</motion.text>
      <motion.text x={cx} y={190} fontSize="13" fill={O.creme} textAnchor="middle"
        initial={{ opacity: 0 }} animate={{ opacity: 1 }}
        transition={{ duration: 1, ease: EASE, delay: 3.05 }}
        style={{ fontWeight: 300, letterSpacing: "3px" }}>PAINE</motion.text>
      <motion.text x={cx} y={212} fontSize="8.5" fill={O.ouroSoft} textAnchor="middle"
        initial={{ opacity: 0 }} animate={{ opacity: 1 }}
        transition={{ duration: 1, ease: EASE, delay: 3.2 }}
        style={{ letterSpacing: "2px", textTransform: "uppercase" }}>a volta completa</motion.text>

      {/* O W dentro do O — quem faz o Circuito O percorre também o W */}
      <motion.path d="M 148,258 L 178,306 L 220,264 L 262,306 L 292,258"
        stroke={O.gelo} strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round"
        initial={{ pathLength: 0, opacity: 0 }} animate={{ pathLength: 1, opacity: 0.75 }}
        transition={{ duration: 1.8, ease: EASE, delay: 3.5 }} />
      {([[148, 258], [220, 264], [292, 258]] as [number, number][]).map(([x, y], i) => (
        <motion.circle key={i} cx={x} cy={y} r="2.6" fill={O.gelo}
          initial={{ opacity: 0 }} animate={{ opacity: 0.85 }}
          transition={{ duration: 0.4, ease: EASE, delay: 5 + i * 0.12 }} />
      ))}
      <motion.text x={cx} y={332} fontSize="8" fill={O.gelo} textAnchor="middle"
        initial={{ opacity: 0 }} animate={{ opacity: 0.75 }}
        transition={{ duration: 0.9, ease: EASE, delay: 5.3 }}
        style={{ letterSpacing: "2.4px", textTransform: "uppercase" }}>inclui o circuito W</motion.text>
    </svg>
  );
}

/* ============================================================
   DADOS
   ============================================================ */
const STATS = [
  { label: "Duração", value: "8d · 7n" },
  { label: "Distância", value: "129 km" },
  { label: "Elevação", value: "3.724 m+" },
  { label: "Nível", value: "Alto" },
  { label: "Formato", value: "Grupo guiado" },
  { label: "Saída 2027", value: "21/Fev" },
];

const MARCOS = [
  { n: "01", nome: "Base Torres", tag: "O ícone", desc: "As três torres de granito erguidas sobre a lagoa glacial, o cartão-postal do parque.", img: PHOTO.baseTorres },
  { n: "02", nome: "Setor Cuernos", tag: "Lago Nordenskjöld", desc: "Os chifres de rocha do Paine sobre o turquesa intenso do lago.", img: PHOTO.cuernos },
  { n: "03", nome: "Vale do Francés", tag: "O circo glacial", desc: "Anfiteatro de gelo entre o Paine Grande e os Cuernos, uma das vistas mais impressionantes do circuito.", img: PHOTO.frances },
  { n: "04", nome: "Glaciar Grey", tag: "Face oculta", desc: "A parede de gelo azul e o Campo de Hielo Sul, vistos do alto do Passo John Gardner.", img: PHOTO.grey },
];

type Dia = { dia: string; titulo: string; desc: string; km: string; horas: string; desnivel: string; nivel: string; pernoite: string; ultimoDia?: boolean };
const ROTEIRO: Dia[] = [
  {
    dia: "Dia 1", titulo: "Puerto Natales a Torres del Paine · Serón",
    desc: "Antes de tudo começar, você recebe por e-mail as orientações técnicas e a equipe coordena a entrega do welcome kit. No dia da saída, o ônibus parte às 07h de Puerto Natales, cerca de 2h30 de viagem. Ao chegar, caminhe pelo Vale Encantado e uma floresta nativa de lengas centenárias, cobertas pela barba de velho, um líquen que só cresce nos ambientes mais puros. Ao som dos pássaros, já surgem as primeiras vistas do maciço.",
    km: "13 km", horas: "4 a 6h", desnivel: "+130 m", nivel: "Moderado", pernoite: "Camping Serón",
  },
  {
    dia: "Dia 2", titulo: "Trekking a Dickson",
    desc: "Um dia longo e inesquecível, subindo e descendo as encostas do maciço. Depois da subida mais íngreme, a vista do vale parece um sonho. A chegada é quase surreal: o refúgio numa ampla área verde à beira de um lago imenso, aos pés das montanhas. Você desce revigorado rumo às margens do Lago Paine, onde passa a noite no Refúgio Dickson.",
    km: "19,5 km", horas: "8 a 10h", desnivel: "+200 m", nivel: "Alto", pernoite: "Refúgio Dickson",
  },
  {
    dia: "Dia 3", titulo: "Trekking a Los Perros",
    desc: "Dia mais curto, para aproveitar o entorno. Acorde cedo e sinta a paz perto do rio, com as nuvens revelando por instantes os picos nevados. O caminho entra numa floresta de lengas, onde você começa a ouvir o bater característico dos pica-paus-magalhânicos. O trecho final surpreende com a vista do Glaciar Los Perros sobre uma lagoa cinza e calma.",
    km: "13,5 km", horas: "4,5 a 6,5h", desnivel: "+340 m", nivel: "Alto", pernoite: "Camping Los Perros",
  },
  {
    dia: "Dia 4", titulo: "Passo John Gardner e Lago Grey",
    desc: "Provavelmente o dia mais desafiador e também um dos mais espetaculares. Saída cedo de Los Perros, atravessando floresta úmida antes de emergir acima da linha das árvores. A metade superior é uma subida íngreme, rochosa e muitas vezes com neve até o Passo John Gardner. No alto, a recompensa: o Campo de Hielo Sul, com picos afiados e fendas de gelo de cores intensas. Na descida, o Glaciar Grey, uma paisagem de outro planeta.",
    km: "18 km", horas: "9 a 12h", desnivel: "+600 m", nivel: "Alto", pernoite: "Refúgio Grey",
  },
  {
    dia: "Dia 5", titulo: "Trekking a Paine Grande",
    desc: "Aqui começa oficialmente o Circuito W, e você passa a explorar os cenários mais icônicos do parque. Depois de dias intensos, hoje a caminhada é mais leve. Você anda por encostas e florestas de ñirre, coigüe e notro, com a presença do Paine Grande, o pico mais alto da região (3.050 m), e suas geleiras suspensas. Ao chegar, descanse ao sol ou caminhe à beira do turquesa Lago Pehoé.",
    km: "11 km", horas: "4h", desnivel: "+280 m", nivel: "Moderado", pernoite: "Refúgio Paine Grande",
  },
  {
    dia: "Dia 6", titulo: "Vale do Francés",
    desc: "Comece a manhã com uma caminhada leve e magnífica até o Campamento Italiano. Cercado de montanhas, você sente uma calma profunda enquanto os sons do lago e da paisagem vibram em meio à vegetação. Passe por uma cachoeira de água pura e gelada. No mirante do Vale do Francés, um dos panoramas mais impressionantes de todo o circuito.",
    km: "20,5 km", horas: "8 a 9h", desnivel: "+712 m", nivel: "Alto", pernoite: "Camping Francés",
  },
  {
    dia: "Dia 7", titulo: "Trekking ao Setor Central",
    desc: "Caminhe pela margem tranquila do Lago Nordenskjöld, sob o imponente Cerro Almirante Nieto e suas geleiras suspensas. O silêncio dos picos sobre o lago turquesa convida a desacelerar; fique de olho nos condores. No mirante mais alto, a vista do lago inteiro e, ao fim do dia, o Glaciar Francés no Cerro Paine Grande. À noite, celebre com uma cerveja bem merecida.",
    km: "14 km", horas: "4 a 5h", desnivel: "+712 m", nivel: "Moderado", pernoite: "Refúgio Central",
  },
  {
    dia: "Dia 8", titulo: "Base Torres e retorno a Puerto Natales",
    desc: "O dia começa com uma subida pela planície patagônica, que fica mais íngreme ao entrar no Vale do Ascencio rumo ao Paso Los Vientos. Você passa pelo Setor Chileno e cruza uma floresta de lengas antes do trecho final, cerca de 1h sobre terreno rochoso. No fim, a vista mais icônica do parque: as três torres sobre a lagoa glacial. Depois, retorno pelo mesmo caminho para pegar o ônibus à tarde de volta a Puerto Natales.",
    km: "19,5 km", horas: "7 a 9h", desnivel: "+750 m", nivel: "Alto", pernoite: "Retorno a Puerto Natales", ultimoDia: true,
  },
];

const GALERIA = [
  { src: PHOTO.hero, cap: "Rumo ao maciço, mochila nas costas", tag: "A jornada" },
  { src: "/torres-del-paine/img_6752.jpg", cap: "A trilha acima dos lagos turquesa", tag: "Patagônia" },
  { src: PHOTO.celebracao, cap: "A conquista, diante do Glaciar Grey", tag: "Grey" },
  { src: "/torres-del-paine/img_6671.jpg", cap: "A Via Láctea sobre o Paine", tag: "Noites remotas" },
  { src: PHOTO.grey, cap: "A parede de gelo azul do Grey", tag: "Face oculta" },
  { src: "/torres-del-paine/IMG_2467.JPEG", cap: "As pontes suspensas do circuito", tag: "O caminho" },
  { src: "/torres-del-paine/dsc09266.jpg", cap: "O mirante sobre o Lago Grey", tag: "Grey" },
  { src: "/torres-del-paine/dsc08362.jpg", cap: "Os Cuernos a cada passo", tag: "Cuernos" },
];

const INCLUSO = [
  "Guia AONIK Ivo Léo Schmitz, do início ao fim da travessia",
  "7 noites em refúgios de montanha ou camping full equipado",
  "Todas as refeições: café da manhã, box lunch e jantar",
  "Ônibus regular Puerto Natales ↔ Torres del Paine, ida e volta",
  "Entrada do Parque Nacional Torres del Paine",
  "Welcome kit: garrafa d'água, liner e toalha",
  "Trekking por Base Torres, Cuernos, Vale do Francés, Glaciar Grey, Passo John Gardner, Glaciar Los Perros e Glaciar Dickson",
];
const NAO_INCLUSO = [
  "Voos nacionais e internacionais",
  "Seguro de viagem e assistência médica",
  "Serviços ou equipamento não mencionados",
  "Bebidas e gorjetas",
  "Jantares especiais de 24/12 e 31/12 (US$ 50 por pessoa, quando aplicável)",
];

const GUIA = {
  nome: "Ivo Léo Schmitz",
  origem: "Brusque, Santa Catarina",
  photo: "/images/tmb/guia.jpg",
  bio: "Montanhista, peregrino, remador e ciclista. Natural de Brusque (SC), Ivo Leonardo Schmitz transforma trilhas em expedições de vida, conduzindo roteiros pelo mundo com segurança, técnica e presença de espírito.",
  credentials: [
    "Certificações Internacionais de Primeiros Socorros e Resgate em Áreas Remotas",
    "Formação em Desenvolvimento de Condutor ao Ar Livre",
    "Formação Técnica em Guia de Turismo",
    "Presidente da FEMESC (Federação de Montanhismo e Escalada de SC)",
  ],
  expeditions: [
    { place: "Cerro Plata 5.968m", flag: "🇦🇷" },
    { place: "Circuito Huayhuash", flag: "🇵🇪" },
    { place: "Tour du Mont Blanc", flag: "🇫🇷" },
    { place: "Alta Via 1, Dolomitas", flag: "🇮🇹" },
    { place: "Caminho de Santiago", flag: "🇪🇸" },
  ],
};

const PROMO = [
  { titulo: "Parcelado", badge: "5% OFF", destaque: true, desc: "Entrada de 30% + saldo em até 7x sem juros, com 5% de desconto.", obs: "Entrada em PIX/transferência · parcelas no cartão." },
  { titulo: "Em 10x", badge: "sem juros", destaque: false, desc: "Saldo em até 10x sem juros, sem desconto adicional.", obs: "No cartão de crédito." },
];

const nivelColor = (n: string) => (n === "Alto" ? O.ouroSoft : O.gelo);

/* ============================================================
   PÁGINA
   ============================================================ */
export default function OCircuitPage() {
  const [gal, setGal] = useState(0);
  const prevGal = () => setGal((i) => (i - 1 + GALERIA.length) % GALERIA.length);
  const nextGal = () => setGal((i) => (i + 1) % GALERIA.length);
  const g = GALERIA[gal];

  return (
    <main className="relative" style={{ background: O.creme }}>
      <Nav />

      {/* ===== HERO ===== */}
      <section className="relative flex min-h-[100svh] w-full items-center overflow-hidden" style={{ background: O.ink }}>
        <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: `url('${PHOTO.hero}')`, opacity: 0.52 }} />
        <div className="absolute inset-0" style={{ background: `linear-gradient(100deg, ${O.ink}f2 0%, ${O.ink}d9 34%, ${O.ink}80 60%, ${O.ink}40 100%)` }} />
        <div className="relative z-10 mx-auto grid w-full max-w-[1400px] items-center gap-10 px-6 py-28 md:grid-cols-[1.12fr_0.88fr] md:px-10">
          <div>
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1, ease: EASE, delay: 0.2 }}
              className="inline-flex items-center gap-3">
              <span className="rounded-full px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.2em]" style={{ background: O.ouro, color: O.ink }}>Novo · Grupo Guiado</span>
              <span className="text-[12px] font-medium uppercase tracking-[0.3em]" style={{ color: O.ouroSoft }}>Patagônia Chilena</span>
            </motion.div>
            <motion.h1 initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1.1, ease: EASE, delay: 0.3 }}
              className="mt-5 font-display text-[clamp(2.6rem,6.4vw,5.4rem)] font-light uppercase leading-[0.88] tracking-[-0.02em]" style={{ color: O.creme }}>
              Circuito<br />O
            </motion.h1>
            <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1, ease: EASE, delay: 0.5 }}
              className="mt-6 max-w-md text-[15px] font-light leading-relaxed md:text-base" style={{ color: O.cSoft }}>
              A volta completa ao maciço Paine em 8 dias. <span style={{ color: O.creme }}>A face oculta e mais selvagem de Torres del Paine, em grupo guiado, com o Ivo Léo.</span>
            </motion.p>
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1, ease: EASE, delay: 0.65 }}
              className="mt-8 flex flex-wrap items-center gap-5">
              <a href="#reservar" className="inline-flex items-center gap-3 rounded-full px-8 py-4 text-[13px] font-semibold uppercase tracking-[0.16em] transition-transform duration-300 hover:scale-[1.03]"
                style={{ background: O.ouro, color: O.ink }}>
                Quero esta viagem <span>→</span>
              </a>
              <a href="#roteiro" className="text-[12px] uppercase tracking-[0.16em] transition-colors" style={{ color: O.cFaint }}>Ver roteiro</a>
            </motion.div>
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.8, ease: EASE, delay: 0.85 }} className="mt-7">
              <Breadcrumb tone="dark" accent={O.ouroSoft} items={[
                { label: "Home", href: "/" },
                { label: "Grupos", href: "/grupos" },
                { label: "Circuito O · Torres del Paine" },
              ]} />
            </motion.div>
          </div>
          <motion.div initial={{ opacity: 0, scale: 0.92 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 1.2, ease: EASE, delay: 0.3 }}
            className="mx-auto hidden h-[380px] w-full max-w-[460px] md:block">
            <OSignature />
          </motion.div>
        </div>
      </section>

      {/* ===== STATS BAR ===== */}
      <section className="px-6 py-14 md:px-10" style={{ background: O.granito }}>
        <div className="mx-auto grid max-w-[1280px] grid-cols-2 gap-6 md:grid-cols-3 lg:grid-cols-6">
          {STATS.map((s, i) => (
            <Reveal key={s.label} delay={i * 0.05}>
              <div className="border-l pl-4" style={{ borderColor: O.line }}>
                <p className="font-display text-[clamp(1.4rem,2.6vw,2rem)] font-light" style={{ color: O.creme }}>{s.value}</p>
                <p className="mt-1 text-[11px] font-semibold uppercase tracking-[0.16em]" style={{ color: O.ouroSoft }}>{s.label}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* ===== NARRATIVA ===== */}
      <section className="px-6 py-24 md:px-10 md:py-28" style={{ background: O.creme, color: O.ink }}>
        <div className="mx-auto max-w-[820px] text-center">
          <Reveal><p className="text-[11px] font-semibold uppercase tracking-[0.34em]" style={{ color: O.ouroDeep }}>8 dias · 7 noites · grupo guiado</p></Reveal>
          <Reveal delay={0.1}>
            <p className="mt-6 font-display text-[clamp(1.4rem,3vw,2.3rem)] font-light leading-[1.3] tracking-[-0.01em]" style={{ color: O.granito }}>
              Ouse viver uma experiência única e apaixone-se pela Patagônia extrema. Em 8 dias intensos, você dá a volta inteira no maciço Paine, das torres de granito ao Vale do Francés, até o Glaciar Grey visto do Passo John Gardner, onde o gelo se funde com as nuvens no horizonte.
            </p>
          </Reveal>
        </div>
      </section>

      {/* ===== A VOLTA COMPLETA (O vs W) ===== */}
      <section className="px-6 py-24 md:px-10 md:py-28" style={{ background: O.ink, color: O.creme }}>
        <div className="mx-auto max-w-[1180px]">
          <Reveal><p className="mb-3 text-[11px] font-semibold uppercase tracking-[0.32em]" style={{ color: O.ouroSoft }}>Por que o Circuito O</p></Reveal>
          <Reveal delay={0.05}>
            <h2 className="mb-6 max-w-2xl font-display text-[clamp(1.8rem,3.6vw,3rem)] font-light leading-[1.1]">
              O W mostra a frente do maciço. O <span className="italic" style={{ color: O.ouroSoft }}>O</span> dá a volta inteira.
            </h2>
          </Reveal>
          <Reveal delay={0.08}>
            <p className="mb-12 max-w-2xl text-[15px] font-light leading-relaxed" style={{ color: O.cSoft }}>
              Enquanto o circuito W percorre só a face conhecida, o Circuito O revela a parte de trás do maciço, mais remota e selvagem, longe das multidões. É a Patagônia que poucos veem.
            </p>
          </Reveal>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {[
              { t: "Serón e Dickson", d: "Os vales verdes do norte, com o refúgio à beira de um lago imenso aos pés das montanhas." },
              { t: "Los Perros", d: "A floresta de lengas e o glaciar suspenso sobre uma lagoa cinza e calma." },
              { t: "Passo John Gardner", d: "O dia mais épico: a travessia acima da linha das árvores até o Campo de Hielo Sul." },
              { t: "Glaciar Grey do alto", d: "A parede de gelo azul vista de cima, uma paisagem que parece de outro planeta." },
            ].map((c, i) => (
              <Reveal key={c.t} delay={i * 0.06}>
                <div className="h-full rounded-xl border p-6" style={{ borderColor: O.line, background: O.granito }}>
                  <span className="font-display text-2xl font-light" style={{ color: O.ouroSoft }}>0{i + 1}</span>
                  <h3 className="mt-3 font-display text-lg font-light" style={{ color: O.creme }}>{c.t}</h3>
                  <p className="mt-2 text-[13px] font-light leading-relaxed" style={{ color: O.cSoft }}>{c.d}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ===== MARCOS ===== */}
      <section className="px-6 py-24 md:px-10 md:py-28" style={{ background: O.granito, color: O.creme }}>
        <div className="mx-auto max-w-[1280px]">
          <Reveal><p className="mb-3 text-[11px] font-semibold uppercase tracking-[0.32em]" style={{ color: O.ouroSoft }}>Os marcos do circuito</p></Reveal>
          <Reveal delay={0.05}><h2 className="mb-12 max-w-2xl font-display text-[clamp(1.8rem,3.6vw,3rem)] font-light leading-[1.1]">Quatro paisagens que ficam para sempre</h2></Reveal>
          <div className="grid gap-6 sm:grid-cols-2">
            {MARCOS.map((m, i) => (
              <Reveal key={m.nome} delay={i * 0.06}>
                <div className="group relative h-[340px] overflow-hidden rounded-2xl">
                  <div className="absolute inset-0 scale-105 bg-cover bg-center transition-transform duration-[1400ms] group-hover:scale-110" style={{ backgroundImage: `url('${m.img}')` }} />
                  <div className="absolute inset-0" style={{ background: `linear-gradient(to top, ${O.ink}f2, ${O.ink}30 60%, transparent)` }} />
                  <div className="absolute bottom-0 left-0 right-0 p-6">
                    <span className="text-[10px] font-semibold uppercase tracking-[0.2em]" style={{ color: O.ouroSoft }}>{m.n} · {m.tag}</span>
                    <h3 className="mt-1 font-display text-2xl font-light" style={{ color: O.creme }}>{m.nome}</h3>
                    <p className="mt-1.5 max-w-md text-[13px] font-light leading-relaxed" style={{ color: O.cSoft }}>{m.desc}</p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ===== ROTEIRO ===== */}
      <section id="roteiro" className="scroll-mt-20 px-6 py-24 md:px-10 md:py-28" style={{ background: O.ink, color: O.creme }}>
        <div className="mx-auto max-w-[1100px]">
          <Reveal><p className="text-[11px] font-semibold uppercase tracking-[0.32em]" style={{ color: O.ouroSoft }}>O roteiro, dia a dia</p></Reveal>
          <Reveal delay={0.06}><h2 className="mt-4 mb-4 font-display text-[clamp(1.8rem,3.6vw,3rem)] font-light leading-[1.1]" style={{ color: O.creme }}>8 dias · 7 noites pela volta completa</h2></Reveal>
          <Reveal delay={0.08}><p className="mb-12 max-w-xl text-[14px] font-light leading-relaxed" style={{ color: O.cSoft }}>Com extensão opcional para 9 dias / 8 noites. A cada dia, o refúgio ou camping da noite e a exigência da etapa.</p></Reveal>
          <div>
            {ROTEIRO.map((r, i) => (
              <Reveal key={r.dia} delay={i * 0.03}>
                <div className="grid gap-4 border-t py-7 md:grid-cols-[110px_1fr_210px] md:gap-8" style={{ borderColor: O.line }}>
                  <span className="font-display text-sm uppercase tracking-[0.1em]" style={{ color: O.ouroSoft }}>{r.dia}</span>
                  <div>
                    <h3 className="font-display text-xl font-light md:text-2xl">{r.titulo}</h3>
                    <p className="mt-2 text-[14px] font-light leading-relaxed" style={{ color: O.cSoft }}>{r.desc}</p>
                  </div>
                  <div className="flex flex-col gap-1 text-[12px] font-light md:items-end md:text-right" style={{ color: O.cFaint }}>
                    <span className="text-[14px] font-bold" style={{ color: O.creme }}>{r.km}</span>
                    <span>{r.horas} · {r.desnivel}</span>
                    <span style={{ color: nivelColor(r.nivel) }}>Nível {r.nivel}</span>
                    {/* a noite de cada etapa, em destaque */}
                    <span className="mt-2 inline-flex items-center gap-2 rounded-full border px-3 py-1.5"
                      style={{ borderColor: O.line, background: "rgba(156,195,212,0.05)" }}>
                      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke={O.ouroSoft} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                        <path d="M3 10.5 12 4l9 6.5" /><path d="M5 10v10h14V10" />
                      </svg>
                      <span className="text-[11.5px]" style={{ color: O.ouroSoft }}>
                        <span style={{ color: O.cFaint }}>{r.ultimoDia ? "Encerramento · " : "Pernoite · "}</span>
                        {r.pernoite}
                      </span>
                    </span>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ===== GUIA — IVO LÉO ===== */}
      <section className="px-6 py-24 md:px-10 md:py-28" style={{ background: O.creme, color: O.ink }}>
        <div className="mx-auto max-w-[1100px]">
          <Reveal><p className="mb-3 text-[11px] font-semibold uppercase tracking-[0.32em]" style={{ color: O.ouroDeep }}>O guia da aventura</p></Reveal>
          <div className="grid gap-10 md:grid-cols-[0.9fr_1.1fr] md:gap-14">
            <Reveal>
              <div className="relative overflow-hidden rounded-2xl" style={{ aspectRatio: "4/5", background: O.granito }}>
                <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: `url('${GUIA.photo}')` }} />
                <div className="absolute inset-0" style={{ background: `linear-gradient(to top, ${O.ink}cc, transparent 55%)` }} />
                <div className="absolute bottom-0 left-0 right-0 p-6">
                  <p className="font-display text-2xl font-light" style={{ color: O.creme }}>{GUIA.nome}</p>
                  <p className="mt-1 text-[12px] font-medium uppercase tracking-[0.18em]" style={{ color: O.ouroSoft }}>{GUIA.origem}</p>
                </div>
              </div>
            </Reveal>
            <Reveal delay={0.1}>
              <div>
                <p className="font-display text-[clamp(1.3rem,2.6vw,1.9rem)] font-light leading-[1.35]" style={{ color: O.granito }}>{GUIA.bio}</p>
                <div className="mt-8">
                  <p className="text-[11px] font-semibold uppercase tracking-[0.24em]" style={{ color: O.ouroDeep }}>Formação e certificações</p>
                  <ul className="mt-4 space-y-2.5">
                    {GUIA.credentials.map((c) => (
                      <li key={c} className="flex items-start gap-3 text-[14px] font-light leading-relaxed" style={{ color: "rgba(12,18,25,0.7)" }}>
                        <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full" style={{ background: O.ouro }} />{c}
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="mt-8">
                  <p className="text-[11px] font-semibold uppercase tracking-[0.24em]" style={{ color: O.ouroDeep }}>Expedições que já conduziu</p>
                  <div className="mt-4 flex flex-wrap gap-2">
                    {GUIA.expeditions.map((e) => (
                      <span key={e.place} className="inline-flex items-center gap-2 rounded-full border px-3 py-1.5 text-[12px] font-light"
                        style={{ borderColor: "rgba(27,39,51,0.15)", color: "rgba(12,18,25,0.72)" }}>
                        <span>{e.flag}</span>{e.place}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ===== GALERIA ===== */}
      <section className="px-6 py-24 md:px-10 md:py-28" style={{ background: O.ink }}>
        <div className="mx-auto max-w-[1280px]">
          <Reveal><p className="mb-8 text-[11px] font-semibold uppercase tracking-[0.32em]" style={{ color: O.ouroSoft }}>Galeria</p></Reveal>
          <Reveal delay={0.08}>
            <div className="flex flex-col gap-3">
              <div className="relative overflow-hidden rounded-2xl" style={{ aspectRatio: "16/10" }}>
                <AnimatePresence mode="wait">
                  <motion.div key={gal} initial={{ opacity: 0.6, scale: 1.02 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0 }}
                    transition={{ duration: 0.4, ease: EASE }} className="absolute inset-0">
                    <img src={g.src} alt={g.cap} className="h-full w-full object-cover" />
                  </motion.div>
                </AnimatePresence>
                <div className="absolute inset-0" style={{ background: `linear-gradient(to top, ${O.ink}cc 0%, transparent 55%)` }} />
                <div className="absolute bottom-0 left-0 right-0 p-6">
                  <span className="text-[10px] font-semibold uppercase tracking-[0.32em]" style={{ color: O.ouroSoft }}>{g.tag}</span>
                  <p className="mt-1 text-[14px] font-light" style={{ color: O.creme }}>{g.cap}</p>
                </div>
                <span className="absolute right-4 top-4 text-[11px] font-medium" style={{ color: O.cFaint }}>{gal + 1} / {GALERIA.length}</span>
                <button onClick={prevGal} aria-label="Anterior" className="absolute left-4 top-1/2 -translate-y-1/2 flex h-10 w-10 items-center justify-center rounded-full text-base" style={{ background: "rgba(12,18,25,0.6)", color: O.ouroSoft }}>‹</button>
                <button onClick={nextGal} aria-label="Próxima" className="absolute right-4 top-1/2 -translate-y-1/2 flex h-10 w-10 items-center justify-center rounded-full text-base" style={{ background: "rgba(12,18,25,0.6)", color: O.ouroSoft }}>›</button>
              </div>
              <div className="grid grid-cols-4 gap-2 sm:grid-cols-8">
                {GALERIA.map((img, i) => (
                  <button key={i} onClick={() => setGal(i)} aria-label={img.cap} className="relative overflow-hidden rounded-lg transition-all duration-300"
                    style={{ aspectRatio: "16/10", outline: i === gal ? `2px solid ${O.ouroSoft}` : "2px solid transparent", outlineOffset: 2 }}>
                    <img src={img.src} alt={img.cap} className="h-full w-full object-cover transition-opacity duration-300" style={{ opacity: i === gal ? 1 : 0.42 }} />
                  </button>
                ))}
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ===== RESERVE SUA VAGA ===== */}
      <section id="reservar" className="scroll-mt-20 px-6 py-24 md:px-10 md:py-28" style={{ background: O.granito, color: O.creme }}>
        <div className="mx-auto max-w-[980px]">
          <Reveal><p className="text-[11px] font-semibold uppercase tracking-[0.32em]" style={{ color: O.ouroSoft }}>Saída confirmada</p></Reveal>
          <Reveal delay={0.06}>
            <h2 className="mt-5 font-display font-light leading-[1.05]" style={{ fontSize: "clamp(2rem,4.5vw,3.4rem)", color: O.creme }}>
              Uma única saída em <span className="italic" style={{ color: O.ouroSoft }}>2027</span>
            </h2>
          </Reveal>

          {/* card da saída */}
          <Reveal delay={0.1}>
            <div className="mt-10 rounded-2xl border p-7 md:p-9" style={{ borderColor: O.line, background: O.granitoSoft }}>
              <div className="flex flex-wrap items-center gap-3">
                <span className="rounded-full px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.2em]" style={{ background: O.ouro, color: O.ink }}>Confirmada</span>
                <span className="text-[11px] uppercase tracking-[0.16em]" style={{ color: O.cFaint }}>8 dias · 7 noites · grupo guiado</span>
              </div>
              <p className="mt-5 font-display text-[clamp(1.7rem,3.4vw,2.6rem)] font-light" style={{ color: O.creme }}>{DATA_SAIDA}</p>
              <p className="mt-1 text-[13px] font-light" style={{ color: O.cSoft }}>Patagônia Chilena · Torres del Paine · com o guia Ivo Léo Schmitz</p>
            </div>
          </Reveal>

          {/* tarifa + early booking */}
          <Reveal delay={0.14}>
            <div className="mt-6 overflow-hidden rounded-2xl border" style={{ borderColor: O.line }}>
              <div className="flex flex-wrap items-center justify-between gap-2 px-6 py-4" style={{ background: O.ouro }}>
                <span className="text-[11px] font-semibold uppercase tracking-[0.2em]" style={{ color: O.ink }}>Tarifa · Temporada 2027</span>
                <span className="text-[11px] font-semibold uppercase tracking-[0.16em]" style={{ color: O.ink }}>Por pessoa · USD</span>
              </div>
              <div className="grid gap-px sm:grid-cols-2" style={{ background: O.line }}>
                <div className="p-7" style={{ background: O.granito }}>
                  <p className="text-[10px] font-semibold uppercase tracking-[0.22em]" style={{ color: O.cSoft }}>Tarifa 2027</p>
                  <p className="mt-3 font-display text-[clamp(2rem,4vw,2.8rem)] font-light" style={{ color: O.creme }}>US$ 5.950</p>
                  <p className="text-[12px] font-light" style={{ color: O.cSoft }}>por pessoa · em grupo guiado</p>
                  <p className="mt-3 text-[12px] font-light leading-relaxed" style={{ color: O.gelo }}>Sem suplemento single.</p>
                </div>
                <div className="p-7" style={{ background: O.granitoSoft }}>
                  <p className="text-[10px] font-semibold uppercase tracking-[0.22em]" style={{ color: O.ouroSoft }}>O que define a tarifa</p>
                  <ul className="mt-3 space-y-2">
                    {["Guia AONIK do início ao fim", "7 noites em refúgio ou camping", "Todas as refeições e transfers regulares", "Entrada do parque e welcome kit"].map((x) => (
                      <li key={x} className="flex items-start gap-2 text-[12.5px] font-light leading-relaxed" style={{ color: O.cSoft }}>
                        <span className="mt-0.5 shrink-0" style={{ color: O.ouroSoft }}>✦</span>{x}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
            {/* Modelo de hospedagem ainda pode ser ajustado pelo parque */}
            <div className="mt-4 flex items-start gap-3 rounded-xl border p-4" style={{ borderColor: O.line, background: "rgba(156,195,212,0.04)" }}>
              <span className="mt-0.5 shrink-0 text-[13px]" style={{ color: O.ouroSoft }}>!</span>
              <p className="text-[12.5px] font-light leading-relaxed" style={{ color: O.cSoft }}>{OBS_ITINERARIO}</p>
            </div>
          </Reveal>

          {/* early booking */}
          <Reveal delay={0.18}>
            <div className="mt-6 rounded-2xl border p-6 md:p-8" style={{ borderColor: O.ouro, background: "rgba(201,154,82,0.06)" }}>
              <div className="flex flex-wrap items-baseline justify-between gap-2">
                <p className="text-[11px] font-semibold uppercase tracking-[0.28em]" style={{ color: O.ouroSoft }}>Early Booking <span style={{ color: O.cFaint }}>· reserva antecipada</span></p>
                <p className="text-[11px] uppercase tracking-[0.16em]" style={{ color: O.cFaint }}>vagas limitadas</p>
              </div>
              <p className="mt-2 text-[13px] font-light" style={{ color: O.cSoft }}>Descontos por forma de pagamento para quem garante cedo. Escolha a que melhor combina com você.</p>
              <div className="mt-6 grid gap-4 md:grid-cols-2">
                {PROMO.map((f) => (
                  <div key={f.titulo} className="rounded-xl border p-5" style={{ borderColor: f.destaque ? O.ouro : O.line, background: f.destaque ? "rgba(201,154,82,0.07)" : "transparent" }}>
                    <div className="flex items-center justify-between">
                      <span className="font-display text-lg font-light" style={{ color: O.creme }}>{f.titulo}</span>
                      <span className="rounded-full px-2.5 py-0.5 text-[10px] font-semibold uppercase tracking-[0.1em]" style={{ background: f.destaque ? O.ouro : O.line, color: f.destaque ? O.ink : O.cSoft }}>{f.badge}</span>
                    </div>
                    <p className="mt-2 text-[12.5px] font-light leading-relaxed" style={{ color: O.cSoft }}>{f.desc}</p>
                    <p className="mt-3 text-[11px] font-light italic" style={{ color: O.cFaint }}>{f.obs}</p>
                  </div>
                ))}
              </div>
              <p className="mt-5 text-[11px] font-light italic" style={{ color: O.cFaint }}>Valores em dólar; conversão para real pelo dólar turismo na cotação do dia do fechamento. Consulte com a equipe a data-limite vigente da promoção.</p>
            </div>
          </Reveal>

          <Reveal delay={0.2}>
            <div className="mt-8 flex justify-center sm:justify-end">
              <a href="#contato" className="inline-flex items-center gap-3 rounded-full px-8 py-4 text-[13px] font-semibold uppercase tracking-[0.16em] transition-transform duration-300 hover:scale-[1.03]" style={{ background: O.ouro, color: O.ink }}>
                Garantir minha vaga <span>→</span>
              </a>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ===== INCLUSO / NÃO INCLUSO ===== */}
      <section className="px-6 py-24 md:px-10 md:py-28" style={{ background: O.creme, color: O.ink }}>
        <div className="mx-auto grid max-w-[1100px] gap-12 md:grid-cols-2">
          <Reveal>
            <p className="mb-8 text-[11px] font-semibold uppercase tracking-[0.32em]" style={{ color: O.ouroDeep }}>O que está incluso</p>
            <div className="space-y-4">
              {INCLUSO.map((item, i) => (
                <div key={item} className="flex items-start gap-3 border-t pt-4" style={{ borderColor: "rgba(27,39,51,0.12)" }}>
                  <span className="mt-0.5 text-[13px]" style={{ color: O.ouroDeep }}>✦</span>
                  <p className="text-[14px] font-light leading-relaxed" style={{ color: "rgba(12,18,25,0.72)" }}>{item}</p>
                </div>
              ))}
            </div>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="mb-8 text-[11px] font-semibold uppercase tracking-[0.32em]" style={{ color: "rgba(12,18,25,0.4)" }}>Não incluso</p>
            <div className="space-y-4">
              {NAO_INCLUSO.map((item) => (
                <div key={item} className="flex items-start gap-3 border-t pt-4" style={{ borderColor: "rgba(27,39,51,0.12)" }}>
                  <span className="mt-0.5 text-[13px]" style={{ color: "rgba(12,18,25,0.35)" }}>×</span>
                  <p className="text-[14px] font-light leading-relaxed" style={{ color: "rgba(12,18,25,0.5)" }}>{item}</p>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      {/* ===== AONIK IA ===== */}
      <section className="px-6 py-20 md:px-10 md:py-24" style={{ background: O.ink }}>
        <div className="mx-auto max-w-[860px] text-center">
          <Reveal>
            <p className="text-[11px] font-semibold uppercase tracking-[0.3em]" style={{ color: O.ouroSoft }}>Aonik <strong className="font-bold">IA</strong> · especialista neste circuito</p>
            <h2 className="mt-5 font-display text-[clamp(1.8rem,3.5vw,2.8rem)] font-light leading-[1.15]" style={{ color: O.creme }}>Pergunte tudo sobre o Circuito O</h2>
            <p className="mx-auto mt-4 max-w-md text-[15px] font-light leading-relaxed" style={{ color: O.cSoft }}>
              Nível da trilha, o Passo John Gardner, preparo físico, o que levar, como chegar a Puerto Natales. A Aonik <strong className="font-semibold" style={{ color: O.creme }}>IA</strong> conhece esta volta de ponta a ponta. Para outros assuntos, te levamos ao WhatsApp do time AONIK.
            </p>
            <button type="button" onClick={() => { if (typeof window !== "undefined") window.dispatchEvent(new Event("open-aonikia")); }}
              className="mt-7 inline-flex items-center gap-3 rounded-full border px-7 py-3.5 text-[12px] font-semibold uppercase tracking-[0.16em] transition-all duration-300 hover:scale-[1.03]" style={{ borderColor: O.ouroSoft, color: O.ouroSoft }}>
              Conversar com a Aonik <strong className="font-bold">IA</strong> <span>→</span>
            </button>
          </Reveal>
        </div>
      </section>

      <Contato
        destino="GRUPOS DE TREKKING - Circuito O · Torres del Paine"
        nota={{
          titulo: "Saída confirmada · vagas limitadas",
          texto:
            "A saída de 21 a 28 de fevereiro de 2027 está confirmada e é a única do ano. O grupo é pequeno e o Circuito O tem controle de acesso restrito no parque, então as vagas acabam cedo. Deixe seus dados aqui e nosso time fala com você para garantir a sua.",
        }}
      />
      <Footer />
      <FloatingActions />
    </main>
  );
}
