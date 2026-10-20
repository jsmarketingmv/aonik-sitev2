"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Nav from "../../components/Nav";
import Breadcrumb from "../../components/Breadcrumb";
import Footer from "../../components/Footer";
import Contato from "../../components/Contato";
import FloatingActions from "../../components/FloatingActions";
import { Reveal, EASE } from "../../components/ui";
import SaidasGrupo from "../../components/SaidasGrupo";
import { GRUPOS } from "../../lib/grupos";

const TMB_GRUPO = GRUPOS.find((g) => g.id === "tour-du-mont-blanc")!;

/* ============================================================
   TOUR DU MONT BLANC — V2 (personalidade nascida do lugar)
   O ANEL · 3 culturas · o gigante de gelo · contraste frio/quente
   ============================================================ */
const C = {
  night: "#0f1c26",
  granite: "#33424d",
  snow: "#eef3f6",
  cool: "#e7edf0",
  fr: "#5b7a99",
  it: "#c2763c",
  ch: "#4f7d4a",
  chRed: "#b8402f",
  wood: "#d98c4a",
  frRed: "#c0392b",
  line: "rgba(238,243,246,0.18)",
};

// ---------- O ANEL (rota circular) ----------
const cx = 220, cy = 220, R = 150;
const pt = (deg: number, r = R): [number, number] => {
  const a = (deg * Math.PI) / 180;
  return [cx + r * Math.sin(a), cy - r * Math.cos(a)];
};
const arcPath = (start: number, end: number) => {
  const n = 60;
  let d = "";
  for (let i = 0; i <= n; i++) {
    const deg = start + ((end - start) * i) / n;
    const [x, y] = pt(deg);
    d += (i === 0 ? "M" : "L") + x.toFixed(1) + "," + y.toFixed(1) + " ";
  }
  return d;
};
const SEGMENTS = [
  { d: arcPath(300, 420), color: C.fr },
  { d: arcPath(60, 180),  color: C.it },
  { d: arcPath(180, 300), color: C.ch },
];
const STAGES = [
  { deg: 0,   label: "Chamonix" },
  { deg: 45,  label: "Les Contamines" },
  { deg: 95,  label: "Courmayeur" },
  { deg: 150, label: "Grand Col Ferret" },
  { deg: 215, label: "Champex" },
  { deg: 290, label: "Col de Balme" },
];

function RingMap() {
  return (
    <svg viewBox="-56 -6 552 476" className="h-full w-full">
      <circle cx={cx} cy={cy} r={R} fill="none" stroke={C.line} strokeWidth="1" strokeDasharray="2 5" />
      {SEGMENTS.map((s, i) => (
        <motion.path
          key={i}
          d={s.d}
          fill="none"
          stroke={s.color}
          strokeWidth="3"
          strokeLinecap="round"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ pathLength: 1, opacity: 1 }}
          transition={{ duration: 1.6, ease: EASE, delay: 0.4 + i * 0.25 }}
        />
      ))}
      {STAGES.map((st) => {
        const [x, y] = pt(st.deg);
        const [lx, ly] = pt(st.deg, R + 16);
        const s = Math.sin((st.deg * Math.PI) / 180);
        const anchor = s > 0.3 ? "start" : s < -0.3 ? "end" : "middle";
        return (
          <g key={st.label}>
            <circle cx={x} cy={y} r="4" fill={C.snow} />
            <text x={lx} y={ly} fill="rgba(238,243,246,0.7)" fontSize="11" letterSpacing="1.5"
              textAnchor={anchor} dominantBaseline="middle" style={{ textTransform: "uppercase" }}>
              {st.label}
            </text>
          </g>
        );
      })}
      <path d={`M ${cx-26} ${cy+14} L ${cx} ${cy-30} L ${cx+26} ${cy+14} Z`}
        fill="none" stroke={C.snow} strokeWidth="1.5" />
      <path d={`M ${cx-9} ${cy-7} L ${cx} ${cy-18} L ${cx+9} ${cy-7}`}
        fill="none" stroke={C.snow} strokeWidth="1.5" />
      <text x={cx} y={cy+36} fill={C.snow} fontSize="12" letterSpacing="3" textAnchor="middle"
        style={{ textTransform: "uppercase" }}>Mont Blanc</text>
      <text x={cx} y={cy+52} fill={C.wood} fontSize="11" letterSpacing="2" textAnchor="middle">4.808 m</text>
    </svg>
  );
}

// ---------- PERFIL DE ELEVAÇÃO ----------
const PROFILE: [number, number][] = [
  [0, 170], [70, 70], [150, 150], [225, 40], [300, 150],
  [380, 80], [460, 158], [540, 35], [620, 150], [700, 85],
  [780, 150], [860, 55], [940, 150], [1000, 120],
];
const COLS = [
  { x: 225, y: 40, t: "Col de la Seigne · 2.516m" },
  { x: 540, y: 35, t: "Grand Col Ferret · 2.537m" },
  { x: 860, y: 55, t: "Col de Balme · 2.191m" },
];
function ElevationProfile() {
  const line = PROFILE.map((p, i) => (i ? "L" : "M") + p[0] + "," + p[1]).join(" ");
  const área = line + " L1000,240 L0,240 Z";
  return (
    <svg viewBox="0 0 1000 240" className="w-full" preserveAspectRatio="none" style={{ height: 220 }}>
      <defs>
        <linearGradient id="elev" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={C.fr} stopOpacity="0.35" />
          <stop offset="100%" stopColor={C.fr} stopOpacity="0" />
        </linearGradient>
      </defs>
      <motion.path d={área} fill="url(#elev)"
        initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}
        transition={{ duration: 1.2 }} />
      <motion.path d={line} fill="none" stroke={C.snow} strokeWidth="2" strokeLinejoin="round"
        initial={{ pathLength: 0 }} whileInView={{ pathLength: 1 }} viewport={{ once: true }}
        transition={{ duration: 1.8, ease: EASE }} />
      {COLS.map((c) => (
        <g key={c.t}><circle cx={c.x} cy={c.y} r="3.5" fill={C.wood} /></g>
      ))}
    </svg>
  );
}

// ---------- TRAVESSIA DAS 3 CULTURAS ----------
const CULTURAS = [
  {
    flag: "🇫🇷", pais: "França", cor: C.fr, bg: "#1c2a36",
    titulo: "O berço, no frio do granito",
    texto: "Chamonix e a alta montanha: o nascimento do alpinismo, sob a face branca do Mont Blanc. Geleiras, granito e queijos de altitude regados a vinho da Savoia.",
    nota: "Reblochon · Génépi · alpinismo",
    img: "/images/tmb/franca.jpg",
  },
  {
    flag: "🇮🇹", pais: "Itália", cor: C.it, bg: "#2a1d12",
    titulo: "O calor desce no Val Ferret",
    texto: "Cruzar para a Itália é sentir a temperatura mudar. Courmayeur, a dolce vita alpina: polenta fumegante, espresso e o sol batendo nas paredes do maciço.",
    nota: "Polenta · Espresso · Vinho do Valle d'Aosta",
    img: "/images/tmb/italia.jpg",
  },
  {
    flag: "🇨🇭", pais: "Suíça", cor: C.ch, bg: "#16241a",
    titulo: "A ordem verde dos vilarejos",
    texto: "A Suíça é pasto, lago e chalé. Champex e La Fouly em ordem perfeita, vacas com sinos, raclette derretida e o silêncio limpo do alto.",
    nota: "Raclette · Chocolate · vilarejos de cartão-postal",
    img: "/images/tmb/suica.jpg",
  },
];

function CulturaPanel({ c, i }: { c: (typeof CULTURAS)[number]; i: number }) {
  const reverse = i % 2 === 1;
  return (
    <section className="px-6 py-20 md:px-10 md:py-28" style={{ background: c.bg, color: C.snow }}>
      <div className={`mx-auto grid max-w-[1280px] items-center gap-10 md:grid-cols-2 md:gap-16 ${
        reverse ? "md:[&>*:first-child]:order-2" : ""}`}>
        <Reveal>
          <div className="relative h-[320px] overflow-hidden rounded-xl md:h-[460px]">
            <div className="absolute inset-0 scale-105 bg-cover bg-center"
              style={{ backgroundImage: `url('${c.img}')` }} />
            <div className="absolute inset-0"
              style={{ background: `linear-gradient(to top, ${c.bg}cc, transparent 60%)` }} />
            <span className="absolute left-5 top-5 text-3xl">{c.flag}</span>
          </div>
        </Reveal>
        <Reveal delay={0.1}>
          <div>
            <p className="flex items-center gap-3 text-[12px] font-semibold uppercase tracking-[0.3em]"
              style={{ color: c.cor }}>
              <span className="h-px w-10" style={{ background: c.cor }} />
              {c.pais}
            </p>
            <h3 className="mt-5 font-display text-[clamp(1.8rem,3.6vw,3rem)] font-light leading-[1.08] tracking-[-0.01em]">
              {c.titulo}
            </h3>
            <p className="mt-5 max-w-md text-[15px] font-light leading-relaxed text-white/70">{c.texto}</p>
            <p className="mt-6 text-[12px] uppercase tracking-[0.16em]" style={{ color: c.cor }}>{c.nota}</p>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

// ---------- GALERIA ----------
const GALLERY_IMGS = [
  "/images/tmb/trail-peaks.jpg",
  "/images/tmb/gallery-val-ferret.jpg",
  "/images/tmb/gallery-glacier.jpg",
  "/images/tmb/gallery-goats.jpg",
  "/images/tmb/gallery-trekkers-valley.jpg",
  "/images/tmb/gallery-trekkers-rocky.jpg",
  "/images/tmb/gallery-chamonix-statue.jpg",
  "/images/tmb/gallery-climber.jpg",
  "/images/tmb/grupo.jpg",
  "/images/tmb/gallery-selfie.jpg",
  "/images/tmb/gallery-group-forest.jpg",
  "/images/tmb/refugio-edelweiss-la-fouly.webp",
];

// ---------- HOSPEDAGENS ----------
const ROCKY_POP_IMGS = [
  "/images/tmb/hotel-rocky-ext.jpg",
  "/images/tmb/hotel-rocky-room.jpg",
  "/images/tmb/hotel-rocky-bar.jpg",
  "/images/tmb/hotel-rocky-breakfast.jpg",
  "/images/tmb/hotel-rocky-terrace.jpg",
  "/images/tmb/hotel-rocky-lounge.jpg",
];
const REFUGIO_IMGS = [
  "/images/tmb/refugio-raclette.jpg",
  "/images/tmb/refugio-terrace.jpg",
  "/images/tmb/refugio-dorm1.jpg",
  "/images/tmb/refugio-dorm2.jpg",
];
const HOSPEDAGENS_IMGS = [...ROCKY_POP_IMGS, ...REFUGIO_IMGS];

// ---------- ROTEIRO, DIA A DIA ----------
const PROPOSTA_ASSETS = "https://hbiamcsblfoumrxwzryd.supabase.co/storage/v1/object/public/proposta-assets/roteiro";
const ROTEIRO = [
  {
    dia: "01", pais: "🇨🇭",
    titulo: "Chegada em Genebra e transfer para Les Houches/Chamonix",
    desc: "Chegada em Genebra antes das 10h30, com encontro às 11h no aeroporto para embarcar no transfer até Les Houches, cerca de 1h40 de viagem. Check-in, tarde livre em Chamonix e, às 19h, jantar no hotel para o grupo se conhecer e o briefing geral da travessia.",
    stats: null,
    itens: ["Transfer do aeroporto de Genebra até Les Houches", "Hospedagem em hotel, quarto duplo com WC privado", "Ticket de transporte público na cidade"],
    img: `${PROPOSTA_ASSETS}/dia1/39adb30e-cbc5-4bcf-b523-e5699b3cf04f.jpg`,
  },
  {
    dia: "02", pais: "🇫🇷",
    titulo: "Les Houches até Les Contamines",
    desc: "Saída do hotel a pé: em 3 km já se encontra o portal de início do Tour du Mont Blanc. Teleférico até os 1.780 m e 19 km de caminhada, grande parte em descida, por florestas, vilarejos e casas de campo até Les Contamines, primeira noite em refúgio.",
    stats: { km: "19,1 km", sobe: "+320 m", desce: "-852 m" },
    itens: ["Café da manhã", "Caminhada com mochila de ataque", "Hospedagem em refúgio, quarto duplo/triplo com WC privado", "Transfer de bagagem", "Jantar na hospedagem"],
    img: `${PROPOSTA_ASSETS}/dia2/b3c815d9-bf59-4f9f-b7b6-124af317eaaf.jpg`,
  },
  {
    dia: "03", pais: "🇫🇷",
    titulo: "Les Contamines até Les Chapieux",
    desc: "Dia longo e exigente, com muita subida no início e descida no final — e visual recompensador. Duas paradas estratégicas de descanso, no Refúgio de La Balme (km 8) e no Refúgio du Col de la Croix du Bonhomme (km 14), até Les Chapieux.",
    stats: { km: "17,1 km", sobe: "+1.397 m", desce: "-916 m" },
    itens: ["Café da manhã", "Caminhada com mochila de ataque", "Transfer ao final da caminhada para a hospedagem", "Hospedagem em quartos duplos com WC privado", "Transfer de bagagem", "Jantar na hospedagem"],
    img: `${PROPOSTA_ASSETS}/dia3/dc0febe9-f417-4df3-9106-5d4cd35f782e.jpg`,
  },
  {
    dia: "04", pais: "🇫🇷 → 🇮🇹",
    titulo: "Les Chapieux até Lex Blanche",
    desc: "Deslocamento até o ponto de partida, no Estacionamento do Les Mottets, rumo à primeira fronteira: o Col de la Seigne, a 2.420 m, divisa entre França e Itália.",
    stats: { km: "9,2 km", sobe: "+747 m", desce: "-357 m" },
    itens: ["Café da manhã", "Transfer da hospedagem até o ponto inicial da caminhada", "Caminhada com mochila com itens de pernoite/higiene", "Hospedagem em refúgio de montanha, quarto e WC compartilhados", "Jantar na hospedagem"],
    img: `${PROPOSTA_ASSETS}/dia4/4af9d9a8-54f6-4014-a14a-8b8628d34167.jpg`,
  },
  {
    dia: "05", pais: "🇮🇹",
    titulo: "Lex Blanche até Courmayeur",
    desc: "Dia mais leve fisicamente, que permite chegar cedo à charmosa Courmayeur e aproveitar a tarde inteira para passear pela cidade, visitar as lojas e saborear um jantar à parte, não incluso neste dia.",
    stats: { km: "10,4 km", sobe: "+462 m", desce: "-673 m" },
    itens: ["Café da manhã", "Caminhada com mochila com itens de pernoite/higiene", "Descida para Courmayeur de teleférico", "Hospedagem em hotel 5★ com piscina térmica", "Transfer de bagagem"],
    img: `${PROPOSTA_ASSETS}/dia5/9d088dd5-997b-44cb-9af9-2d2bfb22d8ad.jpg`,
  },
  {
    dia: "06", pais: "🇮🇹",
    titulo: "Courmayeur até Val Ferret",
    desc: "Um dos dias mais belos da travessia: saída do centro de Courmayeur subindo o vale entre casas de campo e estradas estreitas, floresta e um zigue-zague de 5 km até o Refúgio Bertone, seguindo por um falso plano com o Grand Jorasses sempre à esquerda. Retorno de transfer para pernoite em Courmayeur.",
    stats: { km: "19,4 km", sobe: "+1.348 m", desce: "-563 m" },
    itens: ["Café da manhã", "Caminhada com mochila leve", "Hospedagem em refúgio de montanha, quarto e WC compartilhados", "Transfer de bagagem", "Jantar incluso"],
    img: `${PROPOSTA_ASSETS}/dia6/58642d30-9164-4ce0-af62-9d69170d0e4d.jpg`,
  },
  {
    dia: "07", pais: "🇮🇹 → 🇨🇭",
    titulo: "Val Ferret até La Fouly",
    desc: "Transfer privado de Courmayeur até Val Ferret, onde começa a caminhada. Os primeiros 3 km aquecem o corpo até o Refúgio Elena; a subida fica mais exigente até o Grand Col de Ferret, divisa entre França e Suíça, seguida de 11 km de descida com parada no Alpage de la Peule.",
    stats: { km: "13,2 km", sobe: "+476 m", desce: "-926 m" },
    itens: ["Café da manhã", "Caminhada com mochila leve", "Hospedagem em hotel 4★, quartos duplos/triplos com WC privado", "Transfer de bagagem", "Jantar incluso"],
    img: `${PROPOSTA_ASSETS}/dia7/6f2230aa-5564-41bf-9f05-bca6d94fc90e.jpg`,
  },
  {
    dia: "08", pais: "🇨🇭",
    titulo: "La Fouly até Champex Lac",
    desc: "Dia totalmente em solo suíço: bosques, campos verdes e montanhas ao fundo, com o charme das casas de campo floridas até o Lago de Champex. A parte final é de subida, de volta à floresta, acompanhando um córrego de águas límpidas até Arpette.",
    stats: { km: "15,2 km", sobe: "+505 m", desce: "-620 m" },
    itens: ["Café da manhã", "Caminhada com mochila leve", "Hospedagem em refúgio na cidade, quartos de 8 pessoas com WC compartilhado", "Transfer de bagagem", "Jantar incluso"],
    img: `${PROPOSTA_ASSETS}/dia8/55a54e18-db44-4d87-a7a3-ac07248752ed.jpg`,
  },
  {
    dia: "09", pais: "🇨🇭",
    titulo: "Champex Lac até Trient",
    desc: "Descida de Arpette até Champex e 6 km de subida até o Alpage du Bovine, parada de montanha com vista espetacular. Logo depois, o Col de Portalo e uma descida de 7,5 km por passarelas e vegetação intensa até Trient, tradicional vila suíça.",
    stats: { km: "15 km", sobe: "+738 m", desce: "-941 m" },
    itens: ["Café da manhã", "Caminhada com mochila leve", "Hospedagem em refúgio na vila, quartos e WC compartilhados", "Transfer de bagagem", "Jantar incluso"],
    img: `${PROPOSTA_ASSETS}/dia9/8f6420bb-e5d1-4972-ae6c-598daa40be63.jpg`,
  },
  {
    dia: "10", pais: "🇨🇭 → 🇫🇷",
    titulo: "Trient até Le Tour",
    desc: "De volta à França: início curto e plano por Trient, seguido de subida contínua de 8 km até o Col de Balme, bem na divisa dos dois países, e descida até Le Tour — com opção de teleférico para poupar os joelhos.",
    stats: { km: "11,5 km", sobe: "+1.203 m", desce: "-724 m" },
    itens: ["Café da manhã", "Caminhada com mochila leve", "Opção de descer o trecho final de teleférico", "Hospedagem em refúgio, quartos de 6 camas com WC compartilhado", "Transfer de bagagem", "Jantar incluso"],
    img: `${PROPOSTA_ASSETS}/dia10/e58f0f3e-9bf9-41e6-bb43-a67ad1e41233.jpg`,
  },
  {
    dia: "11", pais: "🇫🇷",
    titulo: "Le Tour até La Flégère",
    desc: "1,5 km de asfalto até Montroc e entrada na trilha até Tré-le-Champ, de onde começa a subida até o ponto mais alto do dia, no km 7. Depois, falso plano entre vegetação rasteira e riachos até o refúgio.",
    stats: { km: "10,4 km", sobe: "+794 m", desce: "-405 m" },
    itens: ["Café da manhã", "Caminhada com mochila com itens de pernoite e higiene", "Hospedagem em refúgio de montanha, quartos grandes com WC compartilhado", "Jantar incluso"],
    img: `${PROPOSTA_ASSETS}/dia11/da4f53d4-8cec-4c83-8da4-61347215bef5.jpg`,
  },
  {
    dia: "12", pais: "🇫🇷",
    titulo: "La Flégère até Chamonix / Les Houches",
    desc: "Descida de teleférico até Les Praz de Chamonix e caminhada até o centro de Chamonix — com chance de acompanhar a chegada dos primeiros colocados da UTMB, se a data coincidir. Trecho final até Les Houches, o portal de término do Tour du Mont Blanc.",
    stats: { km: "11,7 km", sobe: "+140 m", desce: "-206 m" },
    itens: ["Café da manhã", "Caminhada com mochila com itens de pernoite e higiene", "Descida de teleférico no início do dia", "Hospedagem em hotel, quartos duplos com WC privado", "Transfer de bagagem"],
    img: `${PROPOSTA_ASSETS}/dia12/9fd705cd-8120-4b73-8d93-5e0ea14277ff.jpg`,
  },
  {
    dia: "13", pais: "🇫🇷",
    titulo: "Dia livre em Les Houches / Chamonix",
    desc: "Depois de 11 dias de caminhada, um dia livre para descansar ou aproveitar Chamonix: rafting pelo centro urbano, voo duplo de parapente, a Aiguille du Midi — o guia AONIK segue disponível para ajudar no que for preciso.",
    stats: null,
    itens: ["Café da manhã incluso", "Ticket de ônibus urbano incluso", "Hospedagem em hotel, quartos duplos com WC privado"],
    img: `${PROPOSTA_ASSETS}/dia13/61ad4d03-85ff-4a68-b07d-51a755f732d5.jpeg`,
  },
  {
    dia: "14", pais: "🇨🇭",
    titulo: "Translado para Genebra e fim das operações",
    desc: "Manhã tranquila para o café da manhã com calma e o checkout, antes do transfer às 10h rumo ao Aeroporto de Genebra.",
    stats: null,
    itens: ["Café da manhã incluso", "Transfer para o Aeroporto de Genebra"],
    img: `${PROPOSTA_ASSETS}/dia14/7e05274e-7567-4ccb-8325-a3bc1617471f.jpg`,
  },
];

// ---------- GUIA ----------
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

// ---------- ÍCONES ----------
const ICONS: Record<string, React.JSX.Element> = {
  guide: (
    <svg className="h-6 w-6 shrink-0 mt-0.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="10"/>
      <polygon points="16.24 7.76 14.12 14.12 7.76 16.24 9.88 9.88 16.24 7.76"/>
    </svg>
  ),
  hotel: (
    <svg className="h-6 w-6 shrink-0 mt-0.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M2 4v16"/><path d="M2 8h18a2 2 0 0 1 2 2v10"/>
      <path d="M2 17h20"/><path d="M6 8v9"/>
    </svg>
  ),
  transfer: (
    <svg className="h-6 w-6 shrink-0 mt-0.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <rect x="1" y="3" width="15" height="13" rx="2"/>
      <polygon points="16 8 20 8 23 11 23 16 16 16 16 8"/>
      <circle cx="5.5" cy="18.5" r="2.5"/><circle cx="18.5" cy="18.5" r="2.5"/>
    </svg>
  ),
  gps: (
    <svg className="h-6 w-6 shrink-0 mt-0.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M4.9 19.1C1 15.2 1 8.8 4.9 4.9"/>
      <path d="M7.8 16.2c-2.3-2.3-2.3-6.1 0-8.5"/>
      <circle cx="12" cy="12" r="2"/>
      <path d="M16.2 7.8c2.3 2.3 2.3 6.1 0 8.5"/>
      <path d="M19.1 4.9C23 8.8 23 15.1 19.1 19"/>
    </svg>
  ),
  coffee: (
    <svg className="h-6 w-6 shrink-0 mt-0.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M17 8h1a4 4 0 1 1 0 8h-1"/>
      <path d="M3 8h14v9a4 4 0 0 1-4 4H7a4 4 0 0 1-4-4V8z"/>
      <line x1="6" y1="1" x2="6" y2="4"/><line x1="10" y1="1" x2="10" y2="4"/><line x1="14" y1="1" x2="14" y2="4"/>
    </svg>
  ),
  plan: (
    <svg className="h-6 w-6 shrink-0 mt-0.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M9 5H7a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2h-2"/>
      <rect x="9" y="3" width="6" height="4" rx="2"/>
      <line x1="9" y1="12" x2="15" y2="12"/><line x1="9" y1="16" x2="11" y2="16"/>
    </svg>
  ),
};

// ---------- INCLUÍDO ----------
const INCLUIDO = [
  { icon: "guide",    cat: "Guia especialista",     text: "Condutor AONIK certificado em expedições de alta montanha e primeiros socorros em áreas remotas. Hendrik Fendel lidera cada etapa." },
  { icon: "hotel",    cat: "Hospedagem completa",    text: "Hotéis 2–3★ (quartos duplos), pousadas e refúgios alpinos durante toda a travessia." },
  { icon: "transfer", cat: "Transfer no dia 1",      text: "Transfer Genebra–Chamonix (ônibus regular). Você chega ao aeroporto e a gente resolve o restante." },
  { icon: "gps",      cat: "Segurança SPOT GPS",     text: "Monitoramento em tempo real com dispositivo SPOT GPS e acionamento de resgate se necessário." },
  { icon: "coffee",   cat: "Café da manhã",          text: "Café da manhã incluso nas hospedagens em Chamonix (chegada e retorno do circuito)." },
  { icon: "plan",     cat: "Planejamento exclusivo", text: "Grupo pequeno e privado com roteiro adaptado ao perfil e ritmo do grupo." },
];

const NAO_INCLUIDO = [
  "Passagens aéreas (internacionais e conexões)",
  "Mochilas e equipamentos pessoais",
  "Alimentação fora do roteiro programado",
  "Gastos extras e passeios opcionais",
  "Seguro Viagem (obrigatório para esportes de aventura)",
];

const CANCELAMENTO = [
  { prazo: "31+ dias antes",  multa: "10%" },
  { prazo: "30 a 21 dias",    multa: "20%" },
  { prazo: "20 a 8 dias",     multa: "50%" },
  { prazo: "7 dias ou menos", multa: "100%" },
];

// ---------- STATS ----------
const STATS = [
  { val: "14 dias",    label: "duração total" },
  { val: "11 etapas",  label: "de caminhada" },
  { val: "~170 km",    label: "percurso total" },
  { val: "+8.823 m",   label: "desnível acumulado" },
  { val: "3 países",   label: "FR · IT · CH" },
];

// ============================================================
export default function TMBV2Page() {
  const [lightboxIdx, setLightboxIdx] = useState<number | null>(null);
  const [hospedalightboxIdx, setHospedalightboxIdx] = useState<number | null>(null);
  return (
    <main className="relative" style={{ background: C.cool }}>
      <Nav />

      {/* ===== HERO — O ANEL ===== */}
      <section className="relative flex min-h-[100svh] w-full items-center overflow-hidden"
        style={{ background: C.night }}>
        <div className="absolute inset-0 bg-cover bg-center opacity-40"
          style={{ backgroundImage: "url('/images/tmb/hero.jpg')" }} />
        <div className="absolute inset-0"
          style={{ background: `radial-gradient(ellipse at 65% 50%, transparent 30%, ${C.night} 78%)` }} />

        <div className="relative z-10 mx-auto grid w-full max-w-[1400px] items-center gap-10 px-6 py-28 md:grid-cols-2 md:px-10">
          <div>
            <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, ease: EASE, delay: 0.2 }}
              className="text-[12px] font-medium uppercase tracking-[0.4em]" style={{ color: C.frRed }}>
              Alpes · O grande circuito
            </motion.p>
            <motion.h1 initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.1, ease: EASE, delay: 0.3 }}
              className="mt-5 font-display text-[clamp(2.8rem,6.5vw,5.5rem)] font-light uppercase leading-[0.9] tracking-[-0.02em]"
              style={{ color: C.snow }}>
              Tour du<br />Mont Blanc
            </motion.h1>
            <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, ease: EASE, delay: 0.5 }}
              className="mt-6 max-w-md text-[15px] font-light leading-relaxed text-white/70 md:text-base">
              Uma volta completa ao redor do teto da Europa. 14 dias, 170 km e{" "}
              <span style={{ color: C.snow }}>três países</span>, a pé, em círculo, sem nunca refazer o caminho.
            </motion.p>
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, ease: EASE, delay: 0.65 }}
              className="mt-8 flex flex-wrap items-center gap-5">
              <a href="#contato"
                className="inline-flex items-center gap-3 rounded-full px-8 py-4 text-[13px] font-semibold uppercase tracking-[0.16em] transition-transform duration-300 hover:scale-[1.03]"
                style={{ background: C.wood, color: C.night }}>
                Quero esta viagem <span>→</span>
              </a>
              <span className="text-white/85">
                <span className="text-[12px] uppercase tracking-[0.16em] text-white/50">a partir de</span>{" "}
                <span className="font-display text-2xl" style={{ color: C.snow }}>€ 5.900</span>
              </span>
            </motion.div>
            {/* badge saída confirmada */}
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}
              transition={{ duration: 1, delay: 0.9 }}
              className="mt-5 inline-flex items-center gap-2 rounded-full border px-4 py-2 text-[11px] uppercase tracking-[0.16em]"
              style={{ borderColor: C.ch, color: C.ch }}>
              <span className="h-1.5 w-1.5 rounded-full animate-pulse" style={{ background: C.ch }} />
              Saída confirmada · 17–30 Ago 2027
            </motion.div>
            <div className="mt-7">
              <Breadcrumb tone="dark" accent={C.ch} items={[
                { label: "Home", href: "/" },
                { label: "Grupos", href: "/grupos" },
                { label: "Tour du Mont Blanc" },
              ]} />
            </div>
          </div>

          <motion.div initial={{ opacity: 0, scale: 0.92 }} animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.2, ease: EASE, delay: 0.3 }}
            className="mx-auto aspect-square w-full max-w-[460px]">
            <RingMap />
          </motion.div>
        </div>

        <div className="absolute bottom-6 left-1/2 z-10 flex -translate-x-1/2 items-center gap-6 text-[11px] uppercase tracking-[0.18em] text-white/60">
          {[["França", C.fr], ["Itália", C.it], ["Suíça", C.ch]].map(([pais, cor]) => (
            <span key={pais as string} className="flex items-center gap-2">
              <span className="h-2 w-2 rounded-full" style={{ background: cor as string }} />
              {pais}
            </span>
          ))}
        </div>
      </section>

      {/* ===== STATS STRIP ===== */}
      <section style={{ background: C.granite }}>
        <div className="mx-auto flex max-w-[1400px] flex-wrap justify-around px-6 py-5 md:px-10">
          {STATS.map(({ val, label }) => (
            <div key={label} className="flex flex-col items-center px-4 py-3">
              <span className="font-display text-[1.35rem] font-light" style={{ color: C.snow }}>{val}</span>
              <span className="mt-1 text-[10px] uppercase tracking-[0.18em]"
                style={{ color: "rgba(238,243,246,0.45)" }}>{label}</span>
            </div>
          ))}
        </div>
      </section>

      {/* ===== PERFIL DE ELEVAÇÃO ===== */}
      <section className="px-6 py-20 md:px-10 md:py-24" style={{ background: C.night, color: C.snow }}>
        <div className="mx-auto max-w-[1280px]">
          <div className="mb-8 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
            <Reveal>
              <h2 className="font-display text-[clamp(1.6rem,3.2vw,2.6rem)] font-light leading-[1.1]">
                Sobe, desce, atravessa
              </h2>
            </Reveal>
            <Reveal delay={0.1}>
              <p className="max-w-sm text-[14px] font-light leading-relaxed text-white/55">
                +8.823 m de desnível acumulado. Cada col vencido abre um vale novo e outro país.
              </p>
            </Reveal>
          </div>
          <Reveal>
            <ElevationProfile />
            <div className="mt-3 grid grid-cols-3 gap-2 text-center text-[10px] uppercase tracking-[0.12em] text-white/45">
              {COLS.map((c) => <span key={c.t}>{c.t}</span>)}
            </div>
          </Reveal>
        </div>
      </section>

      {/* ===== INTRO / O GIGANTE ===== */}
      <section className="px-6 py-24 md:px-10 md:py-36" style={{ background: C.cool, color: C.night }}>
        <div className="mx-auto max-w-[1000px]">
          <Reveal>
            <p className="text-[11px] font-semibold uppercase tracking-[0.32em]" style={{ color: C.frRed }}>
              Um gigante no meio do caminho
            </p>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="mt-7 font-display text-[clamp(1.8rem,4vw,3.2rem)] font-light leading-[1.18] tracking-[-0.01em]">
              No centro de tudo, imóvel, o{" "}
              <span className="italic" style={{ color: C.fr }}>Mont Blanc</span>.
              Você gira em torno dele por onze dias e, a cada país que cruza,
              a montanha mostra uma face diferente de si mesma.
            </p>
          </Reveal>
        </div>
      </section>

      {/* ===== AS 3 CULTURAS (muda de temperatura) ===== */}
      {CULTURAS.map((c, i) => (
        <CulturaPanel key={c.pais} c={c} i={i} />
      ))}

      {/* ===== HOSPEDAGENS ===== */}
      <section className="py-24 md:py-32" style={{ background: C.night }}>
        <div className="mx-auto max-w-[1400px] px-6 md:px-10">
          <Reveal>
            <p className="flex items-center gap-3 text-[11px] font-semibold uppercase tracking-[0.3em]"
              style={{ color: C.frRed }}>
              <span className="h-px w-8" style={{ background: C.frRed }} />
              Onde você vai dormir
            </p>
            <h2 className="mt-4 font-display text-[clamp(1.8rem,3.6vw,3rem)] font-light leading-[1.1]"
              style={{ color: C.snow }}>
              As hospedagens do TMB
            </h2>
            <p className="mt-3 max-w-xl text-[15px] font-light leading-relaxed text-white/55">
              Do design irreverente de Chamonix às noites de altitude nos refúgios alpinos — cada hospedagem é parte da experiência.
            </p>
          </Reveal>

          {/* Bloco unificado Rocky Pop + Refúgios */}
          <Reveal>
            <div className="mt-12 overflow-hidden rounded-3xl" style={{ background: "#0c1e2c" }}>

              {/* ── Rocky Pop Hotel ── */}
              <div className="flex items-center gap-4 px-7 py-5">
                <span className="shrink-0 rounded-full border px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.16em]"
                  style={{ borderColor: C.wood, color: C.wood }}>★ Premium</span>
                <div>
                  <p className="font-display text-lg font-light leading-none" style={{ color: C.snow }}>Rocky Pop Hotel</p>
                  <p className="text-[11px] text-white/40">Chamonix-Mont-Blanc, França</p>
                </div>
              </div>

              {/* Grid 3×2 das 6 fotos do Rocky Pop */}
              <div className="grid grid-cols-3 gap-px" style={{ background: "#1a2c3a" }}>
                {ROCKY_POP_IMGS.map((src, i) => (
                  <button
                    key={i}
                    onClick={() => setHospedalightboxIdx(i)}
                    className="group relative h-36 overflow-hidden focus:outline-none md:h-44"
                  >
                    <img src={src} alt=""
                      className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110" />
                    <div className="absolute inset-0 flex items-center justify-center opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                      style={{ background: "rgba(0,0,0,0.28)" }}>
                      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="1.5">
                        <circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/>
                        <line x1="11" y1="8" x2="11" y2="14"/><line x1="8" y1="11" x2="14" y2="11"/>
                      </svg>
                    </div>
                  </button>
                ))}
              </div>

              {/* Divider */}
              <div style={{ height: 1, background: "rgba(255,255,255,0.07)" }} />

              {/* ── Refúgios Alpinos ── */}
              <div className="px-7 py-5">
                <p className="font-display text-lg font-light leading-none" style={{ color: C.snow }}>Refúgios Alpinos</p>
                <p className="mt-1 text-[12px] font-light text-white/40">
                  Noites de altitude — jantares comunitários, raclette e o amanhecer com vista para os cumes.
                </p>
              </div>

              {/* Grid 2×2 (md: 4 col) das 4 fotos de refúgio */}
              <div className="grid grid-cols-2 gap-px md:grid-cols-4" style={{ background: "#1a2c3a" }}>
                {REFUGIO_IMGS.map((src, i) => (
                  <button
                    key={i}
                    onClick={() => setHospedalightboxIdx(ROCKY_POP_IMGS.length + i)}
                    className="group relative h-44 overflow-hidden focus:outline-none md:h-52"
                  >
                    <img src={src} alt=""
                      className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110" />
                    <div className="absolute inset-0 flex items-center justify-center opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                      style={{ background: "rgba(0,0,0,0.28)" }}>
                      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="1.5">
                        <circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/>
                        <line x1="11" y1="8" x2="11" y2="14"/><line x1="8" y1="11" x2="14" y2="11"/>
                      </svg>
                    </div>
                  </button>
                ))}
              </div>

            </div>
          </Reveal>
        </div>
      </section>

      {/* ===== ROTEIRO, DIA A DIA ===== */}
      <section className="px-6 py-24 md:px-10 md:py-32" style={{ background: C.cool, color: C.night }}>
        <div className="mx-auto max-w-[1100px]">
          <Reveal>
            <p className="flex items-center gap-3 text-[11px] font-semibold uppercase tracking-[0.3em]"
              style={{ color: C.frRed }}>
              <span className="h-px w-8" style={{ background: C.frRed }} />
              O roteiro, dia a dia
            </p>
            <h2 className="mt-4 font-display text-[clamp(1.8rem,3.6vw,3rem)] font-light leading-[1.1]">
              14 dias ao redor do teto da Europa
            </h2>
          </Reveal>

          <div className="mt-12 space-y-10">
            {ROTEIRO.map((r, i) => (
              <Reveal key={r.dia} delay={Math.min(i * 0.03, 0.3)}>
                <div className="grid gap-6 border-t pt-8 md:grid-cols-[280px_1fr]" style={{ borderColor: "rgba(15,28,38,0.12)" }}>
                  <div className="relative h-52 overflow-hidden rounded-xl md:h-full">
                    <img src={r.img} alt={`Dia ${r.dia} — ${r.titulo}`} className="h-full w-full object-cover" />
                    <span className="absolute left-3 top-3 rounded-full px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.16em]"
                      style={{ background: "rgba(9,21,32,0.75)", color: C.snow }}>
                      Dia {r.dia} · {r.pais}
                    </span>
                  </div>
                  <div>
                    <h3 className="font-display text-[1.3rem] font-light leading-tight">{r.titulo}</h3>
                    <p className="mt-3 text-[14px] font-light leading-relaxed" style={{ color: "rgba(15,28,38,0.68)" }}>
                      {r.desc}
                    </p>
                    {r.stats && (
                      <div className="mt-4 flex flex-wrap gap-4 text-[12px] font-medium" style={{ color: C.night }}>
                        <span>{r.stats.km}</span>
                        <span style={{ color: C.ch }}>{r.stats.sobe}</span>
                        <span style={{ color: C.chRed }}>{r.stats.desce}</span>
                      </div>
                    )}
                    <ul className="mt-4 flex flex-wrap gap-x-5 gap-y-1.5">
                      {r.itens.map((it) => (
                        <li key={it} className="text-[12.5px] font-light" style={{ color: "rgba(15,28,38,0.55)" }}>
                          · {it}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>

          <Reveal delay={0.1}>
            <p className="mt-12 rounded-xl border px-5 py-4 text-[13px] font-light leading-relaxed"
              style={{ borderColor: "rgba(15,28,38,0.14)", color: "rgba(15,28,38,0.6)" }}>
              Este roteiro é uma referência da última temporada operada. Nas validações de reserva para a
              próxima saída, hospedagens e pequenos detalhes do dia a dia podem sofrer alterações.
            </p>
          </Reveal>
        </div>
      </section>

      {/* ===== GALERIA ===== */}
      <section className="px-6 py-24 md:px-10 md:py-32" style={{ background: "#091520" }}>
        <div className="mx-auto max-w-[1400px]">
          <Reveal>
            <p className="flex items-center gap-3 text-[11px] font-semibold uppercase tracking-[0.3em]"
              style={{ color: C.frRed }}>
              <span className="h-px w-8" style={{ background: C.frRed }} />
              Galeria
            </p>
            <h2 className="mt-4 font-display text-[clamp(1.8rem,3.6vw,3rem)] font-light leading-[1.1]"
              style={{ color: C.snow }}>
              O que você vai viver
            </h2>
          </Reveal>

          <Reveal>
            <div className="mt-10 grid grid-cols-3 gap-1.5 sm:grid-cols-4">
              {GALLERY_IMGS.map((src, i) => (
                <button
                  key={i}
                  onClick={() => setLightboxIdx(i)}
                  className="group relative aspect-square overflow-hidden rounded-lg focus:outline-none"
                >
                  <img
                    src={src}
                    alt=""
                    className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-110"
                  />
                  <div
                    className="absolute inset-0 flex items-center justify-center opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                    style={{ background: "rgba(0,0,0,0.28)" }}
                  >
                    <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="1.5">
                      <circle cx="11" cy="11" r="8" />
                      <line x1="21" y1="21" x2="16.65" y2="16.65" />
                      <line x1="11" y1="8" x2="11" y2="14" />
                      <line x1="8" y1="11" x2="14" y2="11" />
                    </svg>
                  </div>
                </button>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      {/* ===== O GUIA DA JORNADA · HENDRIK ===== */}
      <section className="px-6 py-24 md:px-10 md:py-32" style={{ background: "#091520", color: C.snow }}>
        <div className="mx-auto max-w-[1280px]">
          <Reveal>
            <p className="flex items-center gap-3 text-[11px] font-semibold uppercase tracking-[0.3em]"
              style={{ color: C.frRed }}>
              <span className="h-px w-8" style={{ background: C.frRed }} />
              O guia da jornada
            </p>
          </Reveal>

          <div className="mt-10 grid items-start gap-10 md:grid-cols-[420px_1fr] md:gap-16">
            {/* foto */}
            <Reveal>
              <div className="relative overflow-hidden rounded-2xl" style={{ height: 520 }}>
                <div className="absolute inset-0 bg-cover bg-center"
                  style={{ backgroundImage: `url('${GUIA.photo}')` }} />
                <div className="absolute inset-0"
                  style={{ background: "linear-gradient(to top, #091520ee 0%, transparent 55%)" }} />
                <div className="absolute inset-x-0 bottom-0 p-7">
                  <p className="font-display text-[1.6rem] font-light leading-tight"
                    style={{ color: C.snow }}>{GUIA.nome}</p>
                  <p className="mt-1 text-[12px] uppercase tracking-[0.18em]"
                    style={{ color: C.wood }}>{GUIA.origem}</p>
                </div>
              </div>
            </Reveal>

            {/* bio + marcas */}
            <Reveal delay={0.1}>
              <div>
                <h2 className="font-display text-[clamp(2rem,3.8vw,3rem)] font-light leading-[1.05] tracking-[-0.01em]">
                  {GUIA.nome}
                </h2>
                <p className="mt-2 text-[12px] uppercase tracking-[0.2em]"
                  style={{ color: C.wood }}>Condutor de turismo de natureza</p>
                <p className="mt-6 text-[15px] font-light leading-relaxed text-white/70 max-w-xl">
                  {GUIA.bio}
                </p>

                {/* marcas da condução */}
                <div className="mt-8">
                  <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-white/40 mb-4">
                    Marcas da condução
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {GUIA.marcas.map((p) => (
                      <span key={p}
                        className="flex items-center gap-2 rounded-full border px-4 py-1.5 text-[12px] font-light"
                        style={{ borderColor: C.line, color: "rgba(238,243,246,0.7)" }}>
                        <span className="h-1.5 w-1.5 shrink-0 rounded-full" style={{ background: C.wood }} />
                        {p}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="mt-8 rounded-2xl border px-5 py-4 text-[13px] font-light leading-relaxed"
                  style={{ borderColor: C.line, color: "rgba(238,243,246,0.66)" }}>
                  Em campo, o grupo conta com suporte completo de logística entre Chamonix e os
                  refúgios alpinos, rastreador via satélite individual e{" "}
                  <span style={{ color: C.wood }}>guia brasileiro com treinamento em primeiros socorros em áreas remotas e proficiente na língua local.</span>
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ===== INCLUÍDO / NÃO INCLUÍDO ===== */}
      <section className="px-6 py-24 md:px-10 md:py-32" style={{ background: C.cool, color: C.night }}>
        <div className="mx-auto max-w-[1280px]">
          <Reveal>
            <p className="flex items-center gap-3 text-[11px] font-semibold uppercase tracking-[0.3em]"
              style={{ color: C.frRed }}>
              <span className="h-px w-8" style={{ background: C.frRed }} />
              O que está incluído
            </p>
            <h2 className="mt-4 font-display text-[clamp(1.8rem,3.6vw,3rem)] font-light leading-[1.1]">
              A AONIK resolve por você
            </h2>
          </Reveal>

          <div className="mt-12 grid items-stretch gap-8 md:grid-cols-[3fr_2fr]">
            {/* incluído — destaque */}
            <Reveal>
              <div className="grid h-full gap-3 sm:grid-cols-2" style={{ gridAutoRows: "1fr" }}>
                {INCLUIDO.map((item) => (
                  <div key={item.cat}
                    className="flex gap-4 rounded-2xl bg-white p-6 shadow-[0_2px_16px_rgba(15,28,38,0.06)]">
                    <span style={{ color: C.granite }}>{ICONS[item.icon]}</span>
                    <div>
                      <p className="text-[11px] font-semibold uppercase tracking-[0.14em] mb-1.5"
                        style={{ color: C.ch }}>{item.cat}</p>
                      <p className="text-[13px] font-light leading-relaxed"
                        style={{ color: "rgba(15,28,38,0.7)" }}>{item.text}</p>
                    </div>
                  </div>
                ))}
              </div>
            </Reveal>

            {/* não incluído + cancelamento */}
            <Reveal delay={0.1}>
              <div className="flex flex-col gap-6">
                {/* não incluído */}
                <div className="rounded-2xl p-6" style={{ background: "rgba(15,28,38,0.05)" }}>
                  <p className="text-[11px] font-semibold uppercase tracking-[0.2em] mb-4"
                    style={{ color: C.frRed }}>Não está incluído</p>
                  <ul className="space-y-3">
                    {NAO_INCLUIDO.map((item) => (
                      <li key={item} className="flex items-start gap-3 text-[13px] font-light"
                        style={{ color: "rgba(15,28,38,0.65)" }}>
                        <span className="mt-0.5 shrink-0 text-[11px]" style={{ color: C.it }}>—</span>
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>

                {/* cancelamento */}
                <div className="rounded-2xl p-6" style={{ background: "rgba(15,28,38,0.05)" }}>
                  <p className="text-[11px] font-semibold uppercase tracking-[0.2em] mb-4"
                    style={{ color: "rgba(15,28,38,0.4)" }}>Política de cancelamento</p>
                  <div className="space-y-2">
                    {CANCELAMENTO.map((row) => (
                      <div key={row.prazo} className="flex items-center justify-between text-[12px]">
                        <span style={{ color: "rgba(15,28,38,0.55)" }}>{row.prazo}</span>
                        <span className="font-semibold" style={{ color: C.night }}>{row.multa}</span>
                      </div>
                    ))}
                  </div>
                  <p className="mt-4 text-[11px] leading-relaxed"
                    style={{ color: "rgba(15,28,38,0.4)" }}>
                    Cancelamentos por condições climáticas extremas ou força maior oferecem crédito total para outra data ou destino AONIK.
                  </p>
                </div>

                {/* nota seguro */}
                <div className="rounded-2xl border px-5 py-4 text-[12px] font-light leading-relaxed"
                  style={{ borderColor: C.wood, color: "rgba(15,28,38,0.6)" }}>
                  <span className="font-semibold" style={{ color: C.wood }}>Seguro viagem:</span>{" "}
                  obrigatório para esportes de aventura. A AONIK orienta as melhores opções do mercado para este roteiro.
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ===== PRÓXIMAS SAÍDAS (datas + reservar) ===== */}
      <section className="px-6 py-24 md:px-10 md:py-32" style={{ background: C.night, color: C.snow }}>
        <div className="mx-auto max-w-[1100px]">
          <div className="flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
            <Reveal>
              <p className="flex items-center gap-3 text-[11px] font-semibold uppercase tracking-[0.3em]"
                style={{ color: C.frRed }}>
                <span className="h-px w-8" style={{ background: C.frRed }} />
                Próximas saídas em grupo
              </p>
              <h2 className="mt-5 font-display text-[clamp(1.8rem,3.6vw,3rem)] font-light leading-[1.1]">
                Reserve sua vaga
              </h2>
              <p className="mt-3 max-w-md text-[14px] font-light leading-relaxed text-white/60">
                Saídas guiadas, grupo pequeno, {TMB_GRUPO.duration}. {TMB_GRUPO.priceFrom}.
              </p>
            </Reveal>
            <Reveal delay={0.1}>
              <a href="#contato"
                className="inline-flex items-center gap-3 rounded-full px-8 py-4 text-[13px] font-semibold uppercase tracking-[0.16em] transition-transform duration-300 hover:scale-[1.03]"
                style={{ background: C.wood, color: C.night }}>
                Reservar minha vaga <span>→</span>
              </a>
            </Reveal>
          </div>

          {/* Data (esquerda) e tarifa (direita) na mesma linha, mesma altura */}
          <div className="mt-12 grid items-stretch gap-6 md:grid-cols-2">
            {/* Saídas ao vivo (gestão de Grupos do SaaS); o bloco estático é o fallback */}
            <SaidasGrupo
              slug="tour-du-mont-blanc"
              className=""
              cores={{ ano: C.fr, confirmada: C.ch, alerta: C.wood, texto: C.snow }}
              fallback={
                <div className="h-full rounded-xl border border-white/10 bg-white/5 p-7">
                  <p className="font-display text-3xl font-light" style={{ color: C.fr }}>2027</p>
                  <div className="mt-4 flex flex-wrap gap-2">
                    {(TMB_GRUPO.dates2027 ?? []).map((d) => (
                      <span key={d}
                        className="rounded-full border border-white/15 px-4 py-1.5 text-[13px] font-medium"
                        style={{ color: C.snow }}>
                        {d}
                      </span>
                    ))}
                  </div>
                  <div className="mt-4 flex items-center gap-2">
                    <span className="h-1.5 w-1.5 rounded-full animate-pulse" style={{ background: C.ch }} />
                    <p className="text-[12px] font-semibold uppercase tracking-[0.12em]"
                      style={{ color: C.ch }}>Saída confirmada</p>
                  </div>
                </div>
              }
            />

            <div className="h-full overflow-hidden rounded-xl" style={{ border: `1px solid rgba(217,140,74,0.28)`, backgroundColor: "rgba(217,140,74,0.04)" }}>
              <div className="px-7 py-4" style={{ borderBottom: `1px solid rgba(217,140,74,0.18)` }}>
                <span className="text-[10px] font-bold uppercase tracking-[0.22em]" style={{ color: C.wood }}>Tarifa · Temporada 2027</span>
              </div>
              <div className="p-7">
                <p className="font-display font-light leading-none" style={{ fontSize: "clamp(1.8rem,3vw,2.4rem)", color: C.snow }}>€ 5.900</p>
                <p className="mt-2 text-[12px]" style={{ color: "rgba(238,243,246,0.55)" }}>por pessoa · dupla (cidades) e compartilhada (montanhas)</p>
                <p className="mt-3 text-[12px] font-light leading-relaxed" style={{ color: "rgba(238,243,246,0.55)" }}>30% de entrada + saldo em parcelas no cartão.</p>
                <p className="mt-1 text-[11px] font-light italic" style={{ color: "rgba(238,243,246,0.35)" }}>Valor em Euro, base Euro Turismo no fechamento.</p>
              </div>
            </div>
          </div>

          <div className="mt-8 flex justify-center sm:justify-end">
            <a href="#contato" className="inline-flex items-center gap-3 rounded-full px-8 py-4 text-[13px] font-semibold uppercase tracking-[0.16em] transition-transform duration-300 hover:scale-[1.03]" style={{ background: C.wood, color: C.night }}>
              Falar com a equipe &#8594;
            </a>
          </div>
        </div>
      </section>

      {/* ===== AONIKIA DO PRODUTO ===== */}
      <section className="px-6 py-20 md:px-10 md:py-24" style={{ background: C.granite }}>
        <div className="mx-auto max-w-[860px] text-center">
          <Reveal>
            <p className="text-[11px] font-semibold uppercase tracking-[0.3em]" style={{ color: C.frRed }}>
              AonikIA · especialista neste circuito
            </p>
            <h2 className="mt-5 font-display text-[clamp(1.8rem,3.5vw,2.8rem)] font-light leading-[1.15]"
              style={{ color: C.snow }}>
              Da preparação física à melhor época
            </h2>
            <p className="mx-auto mt-4 max-w-md text-[15px] font-light leading-relaxed text-white/65">
              A AonikIA (Nossa Agente / Inteligência Artificial) conhece cada detalhe
              deste roteiro incrível. Clique abaixo e te conectamos à nossa especialista.
            </p>
            <button type="button"
              onClick={() => window.dispatchEvent(new CustomEvent("open-aonikia"))}
              className="mt-7 inline-flex items-center gap-3 rounded-full border px-7 py-3.5 text-[12px] font-semibold uppercase tracking-[0.16em] transition-all duration-300"
              style={{ borderColor: C.wood, color: C.wood }}>
              Conversar com a AonikIA <span>→</span>
            </button>
          </Reveal>
        </div>
      </section>

      <Contato />
      <Footer />
      <FloatingActions />

      {/* Lightbox — Hospedagens */}
      {hospedalightboxIdx !== null && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center"
          style={{ background: "rgba(0,0,0,0.95)" }}
          onClick={() => setHospedalightboxIdx(null)}
        >
          <button
            className="absolute left-3 top-1/2 -translate-y-1/2 rounded-full p-3 text-white transition-colors hover:bg-white/15 md:left-6"
            onClick={(e) => { e.stopPropagation(); setHospedalightboxIdx((n) => ((n ?? 0) - 1 + HOSPEDAGENS_IMGS.length) % HOSPEDAGENS_IMGS.length); }}
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="15 18 9 12 15 6" /></svg>
          </button>
          <img
            src={HOSPEDAGENS_IMGS[hospedalightboxIdx]}
            alt=""
            className="max-h-[85vh] max-w-[85vw] object-contain"
            onClick={(e) => e.stopPropagation()}
          />
          <button
            className="absolute right-3 top-1/2 -translate-y-1/2 rounded-full p-3 text-white transition-colors hover:bg-white/15 md:right-6"
            onClick={(e) => { e.stopPropagation(); setHospedalightboxIdx((n) => ((n ?? 0) + 1) % HOSPEDAGENS_IMGS.length); }}
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="9 18 15 12 9 6" /></svg>
          </button>
          <button
            className="absolute right-4 top-4 rounded-full p-2 text-white transition-colors hover:bg-white/15"
            onClick={() => setHospedalightboxIdx(null)}
          >
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" /></svg>
          </button>
          <p className="absolute bottom-5 left-1/2 -translate-x-1/2 text-[12px] font-light text-white/40">
            {hospedalightboxIdx + 1} / {HOSPEDAGENS_IMGS.length}
          </p>
        </div>
      )}

      {/* Lightbox — Galeria */}
      {lightboxIdx !== null && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center"
          style={{ background: "rgba(0,0,0,0.95)" }}
          onClick={() => setLightboxIdx(null)}
        >
          <button
            className="absolute left-3 top-1/2 -translate-y-1/2 rounded-full p-3 text-white transition-colors hover:bg-white/15 md:left-6"
            onClick={(e) => { e.stopPropagation(); setLightboxIdx((n) => ((n ?? 0) - 1 + GALLERY_IMGS.length) % GALLERY_IMGS.length); }}
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <polyline points="15 18 9 12 15 6" />
            </svg>
          </button>

          <img
            src={GALLERY_IMGS[lightboxIdx]}
            alt=""
            className="max-h-[85vh] max-w-[85vw] object-contain"
            onClick={(e) => e.stopPropagation()}
          />

          <button
            className="absolute right-3 top-1/2 -translate-y-1/2 rounded-full p-3 text-white transition-colors hover:bg-white/15 md:right-6"
            onClick={(e) => { e.stopPropagation(); setLightboxIdx((n) => ((n ?? 0) + 1) % GALLERY_IMGS.length); }}
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <polyline points="9 18 15 12 9 6" />
            </svg>
          </button>

          <button
            className="absolute right-4 top-4 rounded-full p-2 text-white transition-colors hover:bg-white/15"
            onClick={() => setLightboxIdx(null)}
          >
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>

          <p className="absolute bottom-5 left-1/2 -translate-x-1/2 text-[12px] font-light text-white/40">
            {lightboxIdx + 1} / {GALLERY_IMGS.length}
          </p>
        </div>
      )}
    </main>
  );
}
