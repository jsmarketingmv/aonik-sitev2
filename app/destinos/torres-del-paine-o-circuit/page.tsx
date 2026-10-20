"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Nav from "../../components/Nav";
import Breadcrumb from "../../components/Breadcrumb";
import Footer from "../../components/Footer";
import Contato from "../../components/Contato";
import CtaInline from "../../components/CtaInline";
import FloatingActions from "../../components/FloatingActions";
import { Reveal, EASE } from "../../components/ui";
import { GRUPOS } from "../../lib/grupos";

/* ============================================================
   CIRCUITO O · TORRES DEL PAINE — grupo guiado 8D/7N
   Identidade Patagônia Chilena (granito · gelo · ouro do amanhecer,
   o mesmo dourado da capa do catálogo). Assinatura: a VOLTA COMPLETA
   ao maciço (o "O"), com o guia Hendrik Fendel. Saída 21 a 29/Fev/2027, confirmada.
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
const DATA_SAIDA = "20 de fevereiro a 01 de março de 2027";

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
  { label: "Programa", value: "10d · 9n" },
  { label: "Caminhada", value: "8 dias" },
  { label: "Distância", value: "137,3 km" },
  { label: "Elevação", value: "+5.284 m" },
  { label: "Nível", value: "Alto" },
  { label: "Saída 2027", value: "20/Fev" },
];

const MARCOS = [
  { n: "01", nome: "Base Torres", tag: "O ícone", desc: "As três torres de granito erguidas sobre a lagoa glacial, o cartão-postal do parque.", img: PHOTO.baseTorres },
  { n: "02", nome: "Setor Cuernos", tag: "Lago Nordenskjöld", desc: "Os chifres de rocha do Paine sobre o turquesa intenso do lago.", img: PHOTO.cuernos },
  { n: "03", nome: "Vale do Francés", tag: "O circo glacial", desc: "Anfiteatro de gelo entre o Paine Grande e os Cuernos, uma das vistas mais impressionantes do circuito.", img: PHOTO.frances },
  { n: "04", nome: "Glaciar Grey", tag: "Face oculta", desc: "A parede de gelo azul e o Campo de Hielo Sul, vistos do alto do Passo John Gardner.", img: PHOTO.grey },
];

/* Assets da proposta ANK150 (mesmo bucket usado pelo Tour du Mont Blanc) */
const ASSETS = "https://hbiamcsblfoumrxwzryd.supabase.co/storage/v1/object/public/proposta-assets";

type Dia = {
  dia: string;
  data: string;
  titulo: string;
  desc: string;
  stats: { km: string; sobe: string; desce: string } | null;
  itens: string[];
  img: string;
};
const ROTEIRO: Dia[] = [
  {
    dia: "01", data: "20/02",
    titulo: "Chegada em Punta Arenas",
    desc: "Seu voo chega em Punta Arenas e o grupo se reúne ainda no aeroporto para seguirmos juntos de ônibus até Puerto Natales, a cidade base de acesso ao parque. Se o seu horário não permitir, enviamos o ticket e orientamos você a encontrar o grupo lá. À noite temos a reunião de briefing, revisão de mochilas e os alinhamentos finais para o dia seguinte.",
    stats: null,
    itens: ["Transfer regular do aeroporto de Punta Arenas até Puerto Natales", "Hospedagem em hotel, quarto duplo, em Puerto Natales"],
    img: `${ASSETS}/produto/roteiro/dia1/64ccd73f-9397-41bf-89d1-3923c0fd31e1.jpg`,
  },
  {
    dia: "02", data: "21/02",
    titulo: "Centro de Boas-Vindas até o Setor Serón",
    desc: "Encontro no terminal de Puerto Natales entre 6h30 e 6h45, sem atrasos: às 7h seguimos para o parque, cerca de 2h de estrada. Paramos na Laguna Amarga para o check-in no parque e fazemos um segundo check-in no Centro de Boas-Vindas da Las Torres. Dali começa o primeiro dia de caminhada, até o Acampamento Serón.",
    stats: { km: "14,2 km", sobe: "+299 m", desce: "-129 m" },
    itens: ["Café da manhã na hospedagem", "Ônibus da rodoviária de Puerto Natales até o parque", "Pernoite em barracas altas no Acampamento Serón", "Jantar no acampamento"],
    img: `${ASSETS}/roteiro/dia2/9c665320-894c-40dd-b866-054716913e89.png`,
  },
  {
    dia: "03", data: "22/02",
    titulo: "Trekking ao Setor Dickson",
    desc: "Saímos depois do café, pegamos o box lanche e por volta das 8h30 começamos a caminhar rumo ao Setor Dickson. É o dia de acostumar o corpo com mais subida e distância, aproveitando um visual que poucas pessoas têm a oportunidade de conhecer. Paramos na metade do caminho para o lanche e o registro junto aos guarda-parques, e por volta das 15h chegamos ao Dickson.",
    stats: { km: "19,7 km", sobe: "+539 m", desce: "-566 m" },
    itens: ["Café da manhã", "Box lanche de caminhada", "Pernoite em refúgio, quarto compartilhado", "Welcome drink", "Jantar no refúgio"],
    img: `${ASSETS}/produto/roteiro/dia3/e0b5b3b0-38fe-4123-b793-a1e23d5cd2ff.jpg`,
  },
  {
    dia: "04", data: "23/02",
    titulo: "Caminhada até o Acampamento Los Perros",
    desc: "Dia curto em distância e de altimetria média, com pequenos trechos agudos e praticamente todo dentro da floresta. Saímos por volta das 9h, por um trajeto pouco movimentado, com trechos de deck sobre a vegetação e um final junto a uma bela geleira. Los Perros é o setor de estrutura mais simples do circuito: banho gelado e sem internet, mas com tudo montado esperando o grupo.",
    stats: { km: "13,2 km", sobe: "+533 m", desce: "-531 m" },
    itens: ["Café da manhã no refúgio", "Box lanche de caminhada", "Pernoite em barracas duplas em Los Perros", "Welcome drink", "Jantar no refeitório"],
    img: `${ASSETS}/roteiro/dia4/9f3ed518-eae4-441f-8090-a17d96f55b2a.png`,
  },
  {
    dia: "05", data: "24/02",
    titulo: "Passo John Gardner até o Setor Grey",
    desc: "Um dos dias mais longos, menos pela distância e mais pela percepção. É a maior altimetria do Circuito O, com terreno instável, vistas absurdamente bonitas e um percurso fisicamente desafiador, já que boa parte da trilha não fica visível à frente. A saída é programada por volta das 6h30 para garantir segurança e que o grupo chegue bem ao destino.",
    stats: { km: "16,7 km", sobe: "+1.002 m", desce: "-1.490 m" },
    itens: ["Café da manhã no refúgio", "Box lanche de caminhada", "Pernoite em refúgio, quarto compartilhado", "Welcome drink", "Jantar no refúgio"],
    img: `${ASSETS}/produto/roteiro/dia5/d9fd5aee-a284-41b1-a1be-e99bfd1fccd1.jpg`,
  },
  {
    dia: "06", data: "25/02",
    titulo: "Setor Grey até Paine Grande",
    desc: "Praticamente um dia regenerativo depois do cansaço da véspera. Antes de sair, fazemos uma caminhada rápida até a península do Glaciar Grey para ver a geleira de frente. Partimos por volta das 10h rumo ao Paine Grande, um dos refúgios de maior estrutura do parque, com quartos de 6 pessoas, galerias de banheiros, áreas de descanso e um grande bar.",
    stats: { km: "11,1 km", sobe: "+419 m", desce: "-418 m" },
    itens: ["Café da manhã no refúgio", "Box lanche de caminhada", "Pernoite em refúgio, quarto compartilhado", "Welcome drink", "Jantar no refúgio"],
    img: `${ASSETS}/roteiro/dia6/56ff032f-44d0-478f-8a8e-9947d4889c6d.png`,
  },
  {
    dia: "07", data: "26/02",
    titulo: "Paine Grande até o Setor Francés",
    desc: "Novo dia longo e com seus desafios: mais de 20 km com altimetria considerável, incluindo a passagem pelo Vale do Francés. Saímos por volta das 8h e, pouco antes do destino, paramos no Setor Italiano para deixar a cargueira guardada e atacar o Mirador Británico. Quem preferir pode seguir só até o Mirador Francés. A noite é em camping de barracas altas, numa das áreas de maior avistamento de pumas do circuito.",
    stats: { km: "21,5 km", sobe: "+780 m", desce: "-682 m" },
    itens: ["Café da manhã", "Box lanche de caminhada", "Pernoite em barracas altas, em duplas", "Welcome drink", "Jantar no refúgio"],
    img: `${ASSETS}/roteiro/dia7/a5c05d6d-158a-407f-9198-6980f64f182b.png`,
  },
  {
    dia: "08", data: "27/02",
    titulo: "Setor Francés até o Setor Central",
    desc: "Dia também longo, mas sem tanta altimetria: apenas alguns trechos agudos e curtos. Saímos por volta das 8h30, com paradas frequentes, porque é um dia de belas visões e também de bastante vento. A pernoite é no Refúgio Central, que leva esse nome por ser o ponto de partida dos circuitos O e W. Dia de dormir cedo e preparar a aventura seguinte.",
    stats: { km: "18,8 km", sobe: "+583 m", desce: "-576 m" },
    itens: ["Café da manhã", "Box lanche de caminhada", "Pernoite no Refúgio Central", "Welcome drink", "Jantar no refúgio"],
    img: `${ASSETS}/produto/roteiro/dia8/aa1fed91-7e6f-4ce3-b553-b40649f8aa54.jpeg`,
  },
  {
    dia: "09", data: "28/02",
    titulo: "Ataque ao Mirador Las Torres",
    desc: "O horário de despertar e de início da caminhada é definido pela previsão do tempo, para estarmos no topo no melhor momento possível. Não se engane: é longa, com a dificuldade técnica de caminhar sobre pedras, grande altimetria e vento que, em alguns trechos, pode ser o maior desafio de todos. A previsão é estar de volta até as 17h para pegar o transfer a Puerto Natales, chegando por volta das 22h.",
    stats: { km: "22,1 km", sobe: "+1.129 m", desce: "-1.151 m" },
    itens: ["Café da manhã", "Box lanche de caminhada", "Transfer do parque até Puerto Natales", "Hospedagem em hotel, quarto duplo, em Puerto Natales"],
    img: `${ASSETS}/roteiro/dia9/65f12fed-fae8-4096-a613-9083ee72fa54.png`,
  },
  {
    dia: "10", data: "01/03",
    titulo: "Transfer para Punta Arenas · fim dos serviços",
    desc: "Dia de voltar para casa. Depois do café da manhã, seguimos até a rodoviária e pegamos o transfer regular até o aeroporto de Punta Arenas.",
    stats: null,
    itens: ["Café da manhã", "Transfer regular de Puerto Natales até o aeroporto de Punta Arenas"],
    img: `${ASSETS}/roteiro/dia10/e863de5f-b2d7-4889-982b-f11a33cfcb93.png`,
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
  "Café da manhã todos os dias, do 2º dia ao último da viagem",
  "Box lanche em todos os dias de caminhada",
  "Jantar em todos os dias dentro do Parque Nacional Torres del Paine",
  "Kit boas-vindas Torres del Paine",
  "LeaderTrip brasileiro AONIK com treinamento em primeiros socorros em áreas remotas",
  "Monitoramento por rastreador satelital individual para cada integrante do grupo",
];
const NAO_INCLUSO = [
  "Passagem aérea",
  "Bebidas durante as refeições",
  "Serviços de transfer não descritos",
  "Seguro saúde internacional",
];

/* Hospedagem, transporte e condições, conforme a proposta */
const HOSPEDAGEM = [
  "02 noites em hotel em Puerto Natales",
  "03 noites em camping dentro do Parque Nacional Torres del Paine",
  "04 noites em refúgios dentro do Parque Nacional Torres del Paine",
];
const TRANSPORTE = [
  "Transfer regular do aeroporto de Punta Arenas até a rodoviária de Puerto Natales",
  "Transfer de Puerto Natales até o Parque Nacional Torres del Paine",
  "Transfer regular de Puerto Natales até o aeroporto de Punta Arenas",
];
const PAGAMENTO = [
  "Entrada de 30% do valor total, em PIX ou transferência.",
  "Saldo em até 7 vezes sem juros, no cartão.",
];
const OBSERVACOES = [
  "As tarifas em dólar valem exclusivamente para estrangeiros, mediante apresentação do passaporte e do cartão migratório PDI (documento original) no check-in.",
  "Para a isenção de impostos no Chile é preciso apresentar passaporte e cartão de imigração no check-in, pagar em dólares americanos e residir fora do Chile.",
  "A conexão de internet dentro de Torres del Paine é limitada.",
  "No Chile a gorjeta é regulamentada por lei: não é obrigatória, mas é sugerida pelo estabelecimento, com recomendação de no mínimo 10% do valor consumido.",
];
const CANCELAMENTO = [
  "60 dias ou mais antes do início dos serviços: penalidade de 10% do valor total.",
  "Entre 60 e 31 dias antes do início dos serviços: penalidade de 50% do valor total.",
  "30 dias ou menos antes do início dos serviços: penalidade de 100% do valor total.",
];

const GUIA = {
  nome: "Hendrik Fendel",
  origem: "Urubici, Santa Catarina",
  photo: "https://static.wixstatic.com/media/fe55bd_56f62fc99b7c42e6a4a5b0d81ef835c9~mv2.jpg/v1/fill/w_900,h_1200,al_c,q_82,enc_avif,quality_auto/img.jpg",
  bio: "Radicado em Urubici, na Serra Catarinense, Hendrik construiu sua trajetória profundamente conectada às montanhas, trilhas e paisagens do sul do Brasil. Ao longo dos anos, transformou essa vivência em profissão e propósito de vida. Seu estilo de condução é marcado pela atenção aos detalhes, pela leitura cuidadosa do clima e do terreno e pela capacidade de criar experiências autênticas e humanas, sempre com foco na segurança e no respeito ao ritmo do grupo.",
  marcas: [
    "Urubici · Serra Catarinense",
    "Travessias e caminhadas guiadas",
    "Leitura de clima e terreno",
    "Primeiros socorros em áreas remotas",
    "Consciência e educação ambiental",
    "Ritmo do grupo e segurança",
  ],
};

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
              A volta completa ao maciço Paine em 8 dias. <span style={{ color: O.creme }}>A face oculta e mais selvagem de Torres del Paine, em grupo guiado, com o Hendrik Fendel.</span>
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

      <CtaInline
        chamada="Ficou com vontade de conhecer a face oculta do Paine?"
        botao="Falar com especialista"
        href="#reservar"
        cores={{ fundo: O.ink, texto: O.creme, acento: O.ouro, acentoTexto: O.ink, suave: O.line }}
      />

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
          <Reveal delay={0.06}><h2 className="mt-4 mb-4 font-display text-[clamp(1.8rem,3.6vw,3rem)] font-light leading-[1.1]" style={{ color: O.creme }}>10 dias dando a volta no maciço</h2></Reveal>
          <Reveal delay={0.08}><p className="mb-12 max-w-xl text-[14px] font-light leading-relaxed" style={{ color: O.cSoft }}>De Punta Arenas a Punta Arenas, com 8 dias de caminhada. A cada etapa, a distância, o desnível e o que está incluído na diária.</p></Reveal>

          <div className="space-y-10">
            {ROTEIRO.map((r, i) => (
              <Reveal key={r.dia} delay={Math.min(i * 0.03, 0.3)}>
                <div className="grid gap-6 border-t pt-8 md:grid-cols-[280px_1fr]" style={{ borderColor: O.line }}>
                  <div className="relative h-52 overflow-hidden rounded-xl md:h-full">
                    <img src={r.img} alt={`Dia ${r.dia} — ${r.titulo}`} className="h-full w-full object-cover" loading="lazy" />
                    <span className="absolute left-3 top-3 rounded-full px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.16em]"
                      style={{ background: "rgba(12,18,25,0.78)", color: O.creme }}>
                      Dia {r.dia} · {r.data}
                    </span>
                  </div>
                  <div>
                    <h3 className="font-display text-[1.3rem] font-light leading-tight" style={{ color: O.creme }}>{r.titulo}</h3>
                    <p className="mt-3 text-[14px] font-light leading-relaxed" style={{ color: O.cSoft }}>{r.desc}</p>
                    {r.stats && (
                      <div className="mt-4 flex flex-wrap gap-4 text-[12px] font-medium">
                        <span style={{ color: O.creme }}>{r.stats.km}</span>
                        <span style={{ color: O.ouroSoft }}>{r.stats.sobe}</span>
                        <span style={{ color: O.gelo }}>{r.stats.desce}</span>
                      </div>
                    )}
                    <ul className="mt-4 flex flex-wrap gap-x-5 gap-y-1.5">
                      {r.itens.map((it) => (
                        <li key={it} className="text-[12.5px] font-light" style={{ color: O.cFaint }}>· {it}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Pico de desejo da página: quem leu os 8 dias já se imaginou lá. */}
      <CtaInline
        chamada="Oito dias assim combinam com você?"
        apoio={`Saída única · ${DATA_SAIDA}`}
        botao="Quero as datas"
        href="#reservar"
        cores={{ fundo: O.ink, texto: O.creme, acento: O.ouro, acentoTexto: O.ink, suave: O.line }}
      />

      {/* ===== O GUIA DA JORNADA · HENDRIK ===== */}
      <section className="px-6 py-24 md:px-10 md:py-28" style={{ background: O.creme, color: O.ink }}>
        <div className="mx-auto max-w-[1100px]">
          <Reveal><p className="mb-3 text-[11px] font-semibold uppercase tracking-[0.32em]" style={{ color: O.ouroDeep }}>O guia da jornada</p></Reveal>
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
                <p className="text-[12px] uppercase tracking-[0.2em]" style={{ color: O.ouroDeep }}>Condutor de turismo de natureza</p>
                <p className="mt-4 max-w-xl text-[15px] font-light leading-relaxed" style={{ color: "rgba(12,18,25,0.68)" }}>{GUIA.bio}</p>
                <div className="mt-8">
                  <p className="mb-4 text-[11px] font-semibold uppercase tracking-[0.24em]" style={{ color: O.ouroDeep }}>Marcas da condução</p>
                  <div className="flex flex-wrap gap-2">
                    {GUIA.marcas.map((p) => (
                      <span key={p} className="flex items-center gap-2 rounded-full border px-4 py-1.5 text-[12px] font-light"
                        style={{ borderColor: "rgba(27,39,51,0.15)", color: "rgba(12,18,25,0.72)" }}>
                        <span className="h-1.5 w-1.5 shrink-0 rounded-full" style={{ background: O.ouro }} />
                        {p}
                      </span>
                    ))}
                  </div>
                </div>
                <div className="mt-8 rounded-2xl border px-5 py-4 text-[13px] font-light leading-relaxed"
                  style={{ borderColor: O.line, color: "rgba(12,18,25,0.68)" }}>
                  Em campo, o grupo conta com suporte completo de logística entre Puerto Natales e os
                  refúgios do parque, rastreador via satélite individual e{" "}
                  <span style={{ color: O.ouroDeep }}>guia brasileiro com treinamento em primeiros socorros em áreas remotas.</span>
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
                <span className="rounded-full px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.2em]" style={{ background: O.ouro, color: O.ink }}>Saída confirmada</span>
                <span className="text-[11px] uppercase tracking-[0.16em]" style={{ color: O.cFaint }}>8 dias · 7 noites · grupo guiado</span>
              </div>
              <p className="mt-5 font-display text-[clamp(1.7rem,3.4vw,2.6rem)] font-light" style={{ color: O.creme }}>{DATA_SAIDA}</p>
              <p className="mt-1 text-[13px] font-light" style={{ color: O.cSoft }}>Patagônia Chilena · Torres del Paine · com o guia Hendrik Fendel</p>
            </div>
          </Reveal>

          {/* tarifa */}
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
                    {["LeaderTrip AONIK do início ao fim", "9 noites: hotel, camping e refúgios", "Todas as refeições dentro do parque", "Transfers e rastreador satelital individual"].map((x) => (
                      <li key={x} className="flex items-start gap-2 text-[12.5px] font-light leading-relaxed" style={{ color: O.cSoft }}>
                        <span className="mt-0.5 shrink-0" style={{ color: O.ouroSoft }}>✦</span>{x}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
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

      {/* ===== HOSPEDAGEM, TRANSPORTE E CONDIÇÕES (da proposta) ===== */}
      <section className="px-6 py-24 md:px-10 md:py-28" style={{ background: O.granito, color: O.creme }}>
        <div className="mx-auto max-w-[1100px]">
          <Reveal><p className="mb-3 text-[11px] font-semibold uppercase tracking-[0.32em]" style={{ color: O.ouroSoft }}>Como você dorme e se desloca</p></Reveal>
          <Reveal delay={0.05}><h2 className="mb-10 max-w-2xl font-display text-[clamp(1.8rem,3.6vw,2.6rem)] font-light leading-[1.15]">Nove noites, três tipos de abrigo</h2></Reveal>

          <div className="grid gap-6 md:grid-cols-2">
            <Reveal>
              <div className="h-full rounded-2xl border p-6" style={{ borderColor: O.line, background: O.granitoSoft }}>
                <p className="text-[10px] font-semibold uppercase tracking-[0.24em]" style={{ color: O.ouroSoft }}>Hospedagem</p>
                <ul className="mt-4 space-y-2.5">
                  {HOSPEDAGEM.map((h) => (
                    <li key={h} className="flex items-start gap-3 text-[13.5px] font-light leading-relaxed" style={{ color: O.cSoft }}>
                      <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full" style={{ background: O.ouro }} />{h}
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
            <Reveal delay={0.08}>
              <div className="h-full rounded-2xl border p-6" style={{ borderColor: O.line, background: O.granitoSoft }}>
                <p className="text-[10px] font-semibold uppercase tracking-[0.24em]" style={{ color: O.ouroSoft }}>Transporte</p>
                <ul className="mt-4 space-y-2.5">
                  {TRANSPORTE.map((x) => (
                    <li key={x} className="flex items-start gap-3 text-[13.5px] font-light leading-relaxed" style={{ color: O.cSoft }}>
                      <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full" style={{ background: O.gelo }} />{x}
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
          </div>

          <div className="mt-6 grid gap-6 md:grid-cols-3">
            <Reveal>
              <div className="h-full rounded-2xl border p-6" style={{ borderColor: O.line }}>
                <p className="text-[10px] font-semibold uppercase tracking-[0.24em]" style={{ color: O.ouroSoft }}>Formas de pagamento</p>
                <ul className="mt-4 space-y-2.5">
                  {PAGAMENTO.map((p) => (
                    <li key={p} className="text-[13px] font-light leading-relaxed" style={{ color: O.cSoft }}>· {p}</li>
                  ))}
                </ul>
                <p className="mt-4 text-[11.5px] font-light italic" style={{ color: O.cFaint }}>
                  Valor em dólar; no fechamento vale o dólar turismo na cotação do dia.
                </p>
              </div>
            </Reveal>
            <Reveal delay={0.06}>
              <div className="h-full rounded-2xl border p-6" style={{ borderColor: O.line }}>
                <p className="text-[10px] font-semibold uppercase tracking-[0.24em]" style={{ color: O.ouroSoft }}>Cancelamento</p>
                <ul className="mt-4 space-y-2.5">
                  {CANCELAMENTO.map((c) => (
                    <li key={c} className="text-[13px] font-light leading-relaxed" style={{ color: O.cSoft }}>· {c}</li>
                  ))}
                </ul>
              </div>
            </Reveal>
            <Reveal delay={0.12}>
              <div className="h-full rounded-2xl border p-6" style={{ borderColor: O.line }}>
                <p className="text-[10px] font-semibold uppercase tracking-[0.24em]" style={{ color: O.ouroSoft }}>Bom saber</p>
                <ul className="mt-4 space-y-2.5">
                  {OBSERVACOES.map((o) => (
                    <li key={o} className="text-[12.5px] font-light leading-relaxed" style={{ color: O.cSoft }}>· {o}</li>
                  ))}
                </ul>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Última objeção acabou de ser respondida (incluso/não incluso).
          Texto diferente do CTA da tarifa de propósito: ali o convite já é
          "garantir a vaga", aqui é um passo menor pra quem ainda hesita. */}
      <CtaInline
        chamada="Alguma dúvida ainda de pé?"
        botao="Falar com quem guia"
        href="#contato"
        cores={{
          fundo: O.creme,
          texto: O.ink,
          acento: O.granito,
          acentoTexto: O.creme,
          suave: "rgba(12,18,25,0.12)",
        }}
      />

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

      <Contato destino="GRUPOS DE TREKKING - Circuito O · Torres del Paine" />
      <Footer />
      <FloatingActions />
    </main>
  );
}
