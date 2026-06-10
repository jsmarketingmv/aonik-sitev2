"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Nav from "../components/Nav";
import Footer from "../components/Footer";
import Contato from "../components/Contato";
import FloatingActions from "../components/FloatingActions";
import { Reveal, EASE } from "../components/ui";

/* ================================================================
   CAMINHOS DE SANTIAGO — Segmento Jornada
   Paleta: pedra (escuro quente) + ambar (seta amarela) + concha
   Assinatura visual: Concha da Vieira radiating fan
   Posicionamento: AUTORIDADE em Compostela no Brasil (desde 2022)
   ================================================================ */

const J = {
  pedra:         "#0e0a05",
  caminhoEscuro: "#1a1008",
  cinzaGalego:   "#211709",
  ambar:         "#c07a2e",
  ocre:          "#d4954a",
  concha:        "#f0e6cc",
  line:          "rgba(192,122,46,0.18)",
  textSoft:      "rgba(240,230,204,0.62)",
};

/* ── Concha da Vieira SVG ─────────────────────────────────────
   Vieira / scallop shell: 9 ribs radiating from hinge at bottom,
   scalloped outer arc connecting the rib tips.
   HX=130, HY=200 (hinge), ribs at angles ±50° from vertical.
   ─────────────────────────────────────────────────────────── */
const HX = 130, HY = 200;
const TIPS: [number, number][] = [
  [15, 104], [39, 81], [67, 64], [98, 54], [130, 50],
  [163, 54], [193, 64], [221, 81], [245, 104],
];
const CPS: [number, number][] = [
  [10, 75], [40, 51], [75, 35], [111, 27],
  [149, 27], [186, 35], [220, 51], [250, 75],
];

let SHELL_PATH = `M ${HX},${HY} L ${TIPS[0][0]},${TIPS[0][1]}`;
for (let i = 0; i < CPS.length; i++) {
  SHELL_PATH += ` Q ${CPS[i][0]},${CPS[i][1]} ${TIPS[i + 1][0]},${TIPS[i + 1][1]}`;
}
SHELL_PATH += ` L ${HX},${HY} Z`;

let ARC_PATH = `M ${TIPS[0][0]},${TIPS[0][1]}`;
for (let i = 0; i < CPS.length; i++) {
  ARC_PATH += ` Q ${CPS[i][0]},${CPS[i][1]} ${TIPS[i + 1][0]},${TIPS[i + 1][1]}`;
}

function ConchaVieira({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 20 260 190" className={className} style={{ overflow: "visible" }}>
      {/* Fill sutil */}
      <motion.path
        d={SHELL_PATH}
        fill={J.ambar}
        fillOpacity={0.07}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.6, ease: EASE, delay: 0.5 }}
      />
      {/* Costelas / ribs */}
      {TIPS.map(([tx, ty], i) => (
        <motion.line
          key={i}
          x1={HX} y1={HY} x2={tx} y2={ty}
          stroke={J.ambar}
          strokeWidth="0.8"
          strokeOpacity="0.3"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ pathLength: 1, opacity: 1 }}
          transition={{ duration: 1.2, ease: EASE, delay: 0.7 + i * 0.07 }}
        />
      ))}
      {/* Borda recortada */}
      <motion.path
        d={ARC_PATH}
        fill="none"
        stroke={J.ocre}
        strokeWidth="1.6"
        strokeOpacity="0.8"
        initial={{ pathLength: 0, opacity: 0 }}
        animate={{ pathLength: 1, opacity: 1 }}
        transition={{ duration: 2.2, ease: EASE, delay: 0.9 }}
      />
      {/* Ponto de charneira */}
      <motion.circle
        cx={HX} cy={HY} r="4"
        fill={J.ambar}
        fillOpacity="0.55"
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ duration: 0.4, ease: EASE, delay: 0.5 }}
      />
      {/* Rótulo Bom Caminho */}
      <motion.text
        x="130" y="218"
        textAnchor="middle"
        fill={J.ocre}
        fillOpacity="0.55"
        fontSize="8"
        letterSpacing="3"
        style={{ fontFamily: "sans-serif", fontWeight: 600, textTransform: "uppercase" }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, ease: EASE, delay: 2.2 }}
      >
        BOM CAMINHO
      </motion.text>
    </svg>
  );
}

/* ── Tipos e dados ─────────────────────────────────────────── */
type TipoProduto = "A Pe" | "Bike" | "Consulta";

type Produto = {
  nome: string;
  tipo: TipoProduto;
  km: string;
  dias: string;
  preco: string;
  desc: string;
};

const PORTUGUES_APE: Produto[] = [
  {
    nome: "Central",
    tipo: "A Pe",
    km: "226 km",
    dias: "14 dias",
    preco: "a partir de € 1.466",
    desc: "Porto para Santiago. A rota historica classica pelo interior de Portugal.",
  },
  {
    nome: "Costa",
    tipo: "A Pe",
    km: "260 km",
    dias: "15 dias",
    preco: "a partir de € 1.498",
    desc: "A beira do Atlantico. Praias, dunas e aldeias piscatorias de Portugal.",
  },
  {
    nome: "Valenca",
    tipo: "A Pe",
    km: "121 km",
    dias: "8 dias",
    preco: "a partir de € 810",
    desc: "Começa na fronteira do Rio Minho. Mais curto e acessivel para iniciantes.",
  },
  {
    nome: "Baiona",
    tipo: "A Pe",
    km: "126,5 km",
    dias: "8 dias",
    preco: "a partir de € 886",
    desc: "Variante espanhola. Vila medieval como ponto de partida na Galiza.",
  },
  {
    nome: "Easy",
    tipo: "A Pe",
    km: "256 km",
    dias: "21 dias",
    preco: "a partir de € 2.359",
    desc: "Etapas curtas, ritmo tranquilo. Ideal para quem caminha pela primeira vez.",
  },
  {
    nome: "Santiago a Finisterre",
    tipo: "A Pe",
    km: "90 km",
    dias: "7 dias",
    preco: "a partir de € 791",
    desc: "Do fim ao fim do mundo. Estender a peregrinacao alem da Catedral.",
  },
];

const PORTUGUES_BIKE: Produto[] = [
  {
    nome: "Bike Costa",
    tipo: "Bike",
    km: "260 km",
    dias: "9 dias",
    preco: "a partir de € 1.390",
    desc: "Costa atlantica de bicicleta. Alforjes, vento e liberdade.",
  },
  {
    nome: "Bike Central",
    tipo: "Bike",
    km: "240 km",
    dias: "8 dias",
    preco: "a partir de € 1.262",
    desc: "Interior portugues. Paisagens de vinha, granito e aldeia.",
  },
];

const FRANCES: Produto[] = [
  {
    nome: "Sarria · 7 Etapas",
    tipo: "A Pe",
    km: "112 km",
    dias: "7 dias",
    preco: "a partir de € 750",
    desc: "O trecho minimo para a Compostela. Galiza a pe, do comeco ao fim.",
  },
  {
    nome: "Sarria · 8 Etapas",
    tipo: "A Pe",
    km: "112 km",
    dias: "8 dias",
    preco: "a partir de € 850",
    desc: "Mesma rota, um dia extra. Mais descanso, mais conversa ao longo do caminho.",
  },
  {
    nome: "O Cebreiro",
    tipo: "A Pe",
    km: "152 km",
    dias: "8 dias",
    preco: "a partir de € 928",
    desc: "Comeca no alto da montanha galega. A descida epica pelo vale da Galiza.",
  },
  {
    nome: "Primitivo",
    tipo: "A Pe",
    km: "102 km",
    dias: "7 dias",
    preco: "a partir de € 750",
    desc: "Variante mais selvagem e menos multidao. Solidao e montanha.",
  },
];

const OUTROS = [
  {
    nome: "Caminho Primitivo",
    desc: "O primeiro caminho historico. Oviedo ate Santiago pelas montanhas asturianas.",
  },
  {
    nome: "Caminho Espiritual",
    desc: "Pontevedra, Padron e Santiago pelo rio Ulla. Historia e liturgia.",
  },
  {
    nome: "Caminho do Norte",
    desc: "Costa cantabrica. De Irun ate Santiago entre mar e montanha.",
  },
];

const INCLUSOS = [
  {
    t: "Transfer de Bagagem",
    d: "Suas malas viajam para o proximo alojamento. Voce caminha so com a mochila.",
  },
  {
    t: "Kit do Peregrino",
    d: "Credencial, guia impresso e acessorios essenciais para a jornada.",
  },
  {
    t: "Hospedagem",
    d: "Pousadas e hoteis selecionados. Quarto duplo ou single, conforme sua escolha.",
  },
  {
    t: "Programas Autoguiados",
    d: "No seu ritmo. Apoio e suporte AONIK do primeiro ate o ultimo dia de caminhada.",
  },
];

/* ── Card de produto ─────────────────────────────────────── */
function ProdutoCard({ p, delay = 0 }: { p: Produto; delay?: number }) {
  return (
    <Reveal delay={delay}>
      <a
        href="#contato"
        className="group flex h-full flex-col gap-3 rounded-xl p-6 transition-all duration-300"
        style={{
          border: `1px solid ${J.line}`,
          backgroundColor: "rgba(26,16,8,0.45)",
        }}
      >
        {/* Header: tag + seta */}
        <div className="flex items-start justify-between gap-2">
          <span
            className="rounded-full px-2.5 py-0.5 text-[9px] font-semibold uppercase tracking-[0.2em]"
            style={{
              backgroundColor:
                p.tipo === "Bike"
                  ? "rgba(192,122,46,0.18)"
                  : "rgba(192,122,46,0.08)",
              color: J.ocre,
              border: `1px solid rgba(212,149,74,0.22)`,
            }}
          >
            {p.tipo === "A Pe" ? "A Pe" : p.tipo}
          </span>
          <span
            className="text-[14px] transition-transform duration-300 group-hover:translate-x-1"
            style={{ color: J.ambar }}
          >
            →
          </span>
        </div>

        {/* Nome + desc */}
        <div>
          <h3
            className="font-display text-[1.35rem] font-light leading-tight"
            style={{ color: J.concha }}
          >
            {p.nome}
          </h3>
          <p
            className="mt-1.5 text-[12px] font-light leading-relaxed"
            style={{ color: J.textSoft }}
          >
            {p.desc}
          </p>
        </div>

        {/* Footer: km / dias / preco */}
        <div className="mt-auto flex items-end justify-between gap-4 border-t pt-4" style={{ borderColor: J.line }}>
          <div className="flex gap-5">
            <div>
              <div className="text-[12px] font-semibold" style={{ color: J.concha }}>
                {p.km}
              </div>
              <div className="text-[9px] uppercase tracking-[0.18em]" style={{ color: J.textSoft }}>
                distancia
              </div>
            </div>
            <div>
              <div className="text-[12px] font-semibold" style={{ color: J.concha }}>
                {p.dias}
              </div>
              <div className="text-[9px] uppercase tracking-[0.18em]" style={{ color: J.textSoft }}>
                duracao
              </div>
            </div>
          </div>
          <div className="text-right">
            <div className="text-[13px] font-semibold" style={{ color: J.ocre }}>
              {p.preco}
            </div>
          </div>
        </div>
      </a>
    </Reveal>
  );
}

/* ── Tab state ──────────────────────────────────────────────── */
type Tab = "pe" | "bike";

/* ================================================================
   PAGE
   ================================================================ */
export default function JornadaPage() {
  const [tab, setTab] = useState<Tab>("pe");

  return (
    <main className="relative" style={{ backgroundColor: J.pedra }}>
      <Nav />

      {/* ══════════════════════════════════════════════════════
          HERO
          ══════════════════════════════════════════════════════ */}
      <section className="relative flex min-h-screen items-center overflow-hidden">
        {/* Foto de fundo */}
        <div
          className="absolute inset-0 scale-110 bg-cover bg-center"
          style={{
            backgroundImage: `url('https://images.unsplash.com/photo-1601581875309-fafbf2d3ed3a?q=80&w=2400&auto=format&fit=crop')`,
          }}
        />
        {/* Gradiente: cobre esquerda totalmente, fade na direita */}
        <div
          className="absolute inset-0"
          style={{
            background: `linear-gradient(105deg, ${J.pedra} 42%, ${J.pedra}cc 58%, ${J.pedra}55 78%, transparent 100%)`,
          }}
        />
        {/* Overlay escuro sutil no topo e no rodape */}
        <div className="absolute inset-x-0 top-0 h-40 bg-gradient-to-b from-[#0e0a05] to-transparent" />
        <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-[#0e0a05] to-transparent" />

        <div className="relative z-10 mx-auto w-full max-w-[1180px] px-6 py-32 md:px-10">
          <div className="grid grid-cols-1 items-center gap-16 md:grid-cols-[1fr_380px]">

            {/* Texto esquerdo */}
            <div>
              <motion.p
                className="mb-5 flex items-center gap-3 text-[11px] font-medium uppercase tracking-[0.32em]"
                style={{ color: J.ocre }}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, ease: EASE, delay: 0.2 }}
              >
                <span className="h-px w-8" style={{ backgroundColor: `${J.ocre}70` }} />
                Peregrinacao · Autoconhecimento
              </motion.p>

              <motion.h1
                className="font-display font-light leading-[1.02] tracking-[-0.025em]"
                style={{ fontSize: "clamp(3.2rem, 7vw, 5.5rem)", color: J.concha }}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, ease: EASE, delay: 0.3 }}
              >
                Caminhos de{" "}
                <span className="italic" style={{ color: J.ocre }}>
                  Santiago
                </span>
              </motion.h1>

              <motion.p
                className="mt-6 max-w-[460px] text-[15px] font-light leading-relaxed"
                style={{ color: J.textSoft }}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.9, ease: EASE, delay: 0.5 }}
              >
                Voce chega buscando uma viagem. Volta transformado. A AONIK opera
                Compostela desde 2022 com mais rotas que qualquer operadora brasileira.
              </motion.p>

              {/* Stats */}
              <motion.div
                className="mt-8 flex flex-wrap gap-8"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.9, ease: EASE, delay: 0.65 }}
              >
                {(
                  [
                    ["2022", "no caminho"],
                    ["+12", "rotas"],
                    ["+200", "peregrinos"],
                  ] as [string, string][]
                ).map(([n, l]) => (
                  <div key={l}>
                    <div
                      className="font-display text-[2rem] font-light leading-none"
                      style={{ color: J.concha }}
                    >
                      {n}
                    </div>
                    <div
                      className="mt-1 text-[9px] font-medium uppercase tracking-[0.22em]"
                      style={{ color: `${J.ocre}90` }}
                    >
                      {l}
                    </div>
                  </div>
                ))}
              </motion.div>

              {/* CTAs */}
              <motion.div
                className="mt-10 flex flex-wrap gap-4"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.9, ease: EASE, delay: 0.8 }}
              >
                <a
                  href="#caminho-portugues"
                  className="rounded-full px-7 py-3 text-[11px] font-semibold uppercase tracking-[0.16em] transition-opacity duration-300 hover:opacity-80"
                  style={{ backgroundColor: J.ambar, color: J.pedra }}
                >
                  Ver Roteiros
                </a>
                <a
                  href="#contato"
                  className="rounded-full border px-7 py-3 text-[11px] font-semibold uppercase tracking-[0.16em] transition-colors duration-300"
                  style={{
                    borderColor: `${J.ambar}50`,
                    color: J.concha,
                  }}
                >
                  Falar com especialista
                </a>
              </motion.div>
            </div>

            {/* Concha SVG direita */}
            <motion.div
              className="hidden md:block"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1.2, ease: EASE, delay: 0.6 }}
            >
              <ConchaVieira className="h-[380px] w-full" />
            </motion.div>
          </div>
        </div>

        {/* Scroll cue */}
        <motion.div
          className="absolute bottom-8 left-1/2 -translate-x-1/2"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 2 }}
        >
          <motion.div
            className="h-10 w-px mx-auto"
            style={{
              background: `linear-gradient(to bottom, transparent, ${J.ambar}80)`,
            }}
            animate={{ scaleY: [1, 1.3, 1] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          />
        </motion.div>
      </section>

      {/* ══════════════════════════════════════════════════════
          CAMINHO PORTUGUES
          ══════════════════════════════════════════════════════ */}
      <section
        id="caminho-portugues"
        className="py-24 md:py-36"
        style={{ backgroundColor: J.caminhoEscuro }}
      >
        <div className="mx-auto max-w-[1180px] px-6 md:px-10">
          <Reveal>
            <p
              className="mb-4 flex items-center gap-3 text-[11px] font-medium uppercase tracking-[0.32em]"
              style={{ color: J.ocre }}
            >
              <span className="h-px w-8" style={{ backgroundColor: `${J.ocre}50` }} />
              Portugal para Santiago · Espanha
            </p>
            <h2
              className="mb-3 font-display font-light leading-[1.04] tracking-[-0.02em]"
              style={{ fontSize: "clamp(2.2rem, 4.5vw, 3.4rem)", color: J.concha }}
            >
              Caminho Portugues
            </h2>
            <p
              className="mb-10 max-w-[520px] text-[14px] font-light leading-relaxed"
              style={{ color: J.textSoft }}
            >
              A rota mais procurada pelos brasileiros. Do Porto ou Lisboa, percorre o
              interior e a costa ate cruzar para a Galiza.
            </p>
          </Reveal>

          {/* Tabs */}
          <Reveal>
            <div
              className="mb-8 flex w-fit gap-1 rounded-full p-1"
              style={{
                backgroundColor: "rgba(192,122,46,0.1)",
                border: `1px solid ${J.line}`,
              }}
            >
              {(
                [
                  ["pe", "A Pe"],
                  ["bike", "Bike"],
                ] as [Tab, string][]
              ).map(([id, label]) => (
                <button
                  key={id}
                  onClick={() => setTab(id)}
                  className="rounded-full px-6 py-2 text-[11px] font-semibold uppercase tracking-[0.18em] transition-all duration-300"
                  style={
                    tab === id
                      ? { backgroundColor: J.ambar, color: J.pedra }
                      : { color: J.textSoft }
                  }
                >
                  {label}
                </button>
              ))}
            </div>
          </Reveal>

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {(tab === "pe" ? PORTUGUES_APE : PORTUGUES_BIKE).map((p, i) => (
              <ProdutoCard key={p.nome} p={p} delay={i * 0.055} />
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════
          CAMINHO FRANCES
          ══════════════════════════════════════════════════════ */}
      <section
        id="caminho-frances"
        className="py-24 md:py-36"
        style={{ backgroundColor: J.cinzaGalego }}
      >
        <div className="mx-auto max-w-[1180px] px-6 md:px-10">
          <Reveal>
            <p
              className="mb-4 flex items-center gap-3 text-[11px] font-medium uppercase tracking-[0.32em]"
              style={{ color: J.ocre }}
            >
              <span className="h-px w-8" style={{ backgroundColor: `${J.ocre}50` }} />
              Pireneus · Meseta · Galiza
            </p>
            <h2
              className="mb-3 font-display font-light leading-[1.04] tracking-[-0.02em]"
              style={{ fontSize: "clamp(2.2rem, 4.5vw, 3.4rem)", color: J.concha }}
            >
              Caminho Frances
            </h2>
            <p
              className="mb-10 max-w-[520px] text-[14px] font-light leading-relaxed"
              style={{ color: J.textSoft }}
            >
              O caminho mais iconico. Cruza os Pireneus e a Meseta espanhola. Os trechos
              a partir de Sarria sao os preferidos dos brasileiros.
            </p>
          </Reveal>

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {FRANCES.map((p, i) => (
              <ProdutoCard key={p.nome} p={p} delay={i * 0.06} />
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════
          OUTROS CAMINHOS
          ══════════════════════════════════════════════════════ */}
      <section className="py-20 md:py-28" style={{ backgroundColor: J.pedra }}>
        <div className="mx-auto max-w-[1180px] px-6 md:px-10">
          <Reveal>
            <p
              className="mb-4 flex items-center gap-3 text-[11px] font-medium uppercase tracking-[0.32em]"
              style={{ color: J.ocre }}
            >
              <span className="h-px w-8" style={{ backgroundColor: `${J.ocre}50` }} />
              Consulta Personalizada
            </p>
            <h2
              className="mb-10 font-display font-light leading-[1.04] tracking-[-0.02em]"
              style={{ fontSize: "clamp(1.8rem, 3.5vw, 2.8rem)", color: J.concha }}
            >
              Outros Caminhos
            </h2>
          </Reveal>

          <div className="grid gap-4 sm:grid-cols-3">
            {OUTROS.map((o, i) => (
              <Reveal key={o.nome} delay={i * 0.07}>
                <a
                  href="#contato"
                  className="group flex h-full flex-col gap-4 rounded-xl p-6 transition-all duration-300"
                  style={{
                    border: `1px solid ${J.line}`,
                    backgroundColor: "rgba(255,255,255,0.02)",
                  }}
                >
                  <div className="flex items-start justify-between">
                    <h3
                      className="font-display text-[1.25rem] font-light leading-tight"
                      style={{ color: J.concha }}
                    >
                      {o.nome}
                    </h3>
                    <span
                      className="text-[14px] transition-transform duration-300 group-hover:translate-x-1"
                      style={{ color: J.ambar }}
                    >
                      →
                    </span>
                  </div>
                  <p
                    className="text-[12px] font-light leading-relaxed"
                    style={{ color: J.textSoft }}
                  >
                    {o.desc}
                  </p>
                  <span
                    className="mt-auto self-start rounded-full border px-3 py-1 text-[9px] font-semibold uppercase tracking-[0.18em]"
                    style={{
                      borderColor: `${J.ambar}28`,
                      color: `${J.ocre}88`,
                    }}
                  >
                    Sob Consulta
                  </span>
                </a>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════
          O QUE ESTA INCLUIDO
          ══════════════════════════════════════════════════════ */}
      <section className="py-24 md:py-32" style={{ backgroundColor: J.caminhoEscuro }}>
        <div className="mx-auto max-w-[1180px] px-6 md:px-10">
          <Reveal>
            <p
              className="mb-4 flex items-center gap-3 text-[11px] font-medium uppercase tracking-[0.32em]"
              style={{ color: J.ocre }}
            >
              <span className="h-px w-8" style={{ backgroundColor: `${J.ocre}50` }} />
              Em todos os roteiros
            </p>
            <h2
              className="mb-12 font-display font-light leading-[1.04] tracking-[-0.02em]"
              style={{ fontSize: "clamp(2rem, 4vw, 3rem)", color: J.concha }}
            >
              O que esta incluido
            </h2>
          </Reveal>

          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {INCLUSOS.map((inc, i) => (
              <Reveal key={inc.t} delay={i * 0.07}>
                <div className="flex flex-col gap-3">
                  <div className="h-px w-10" style={{ backgroundColor: J.ambar }} />
                  <h3
                    className="text-[15px] font-semibold"
                    style={{ color: J.concha }}
                  >
                    {inc.t}
                  </h3>
                  <p
                    className="text-[13px] font-light leading-relaxed"
                    style={{ color: J.textSoft }}
                  >
                    {inc.d}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════
          CONTATO
          ══════════════════════════════════════════════════════ */}
      <div style={{ backgroundColor: J.pedra }}>
        <Contato />
      </div>

      <Footer />
      <FloatingActions />
    </main>
  );
}
