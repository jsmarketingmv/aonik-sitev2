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
   Paleta: pedra/escuro + azul (sinalização oficial) + amarelo + creme
   Azul #003d7a e Amarelo #d9a800 = cores dos totens de sinalização
   Alternancia de bg: escuro → creme → azulDeep → creme → pedra → azul → escuro → creme
   ================================================================ */

const J = {
  escuro:    "#13100c",
  pedra:     "#1e1810",
  azul:      "#003d7a",
  azulDeep:  "#002652",
  amar:      "#d9a800",
  amarVivo:  "#f0be00",
  creme:     "#f5ede0",
  cremeDeep: "#ede3d0",
  concha:    "#f0e6cc",
  textDark:  "#1a1410",
  textMid:   "#5a4e3e",
  textSoft:  "rgba(240,230,204,0.65)",
  azulLine:  "rgba(0,61,122,0.18)",
  amarLine:  "rgba(217,168,0,0.2)",
};

// Foto real do Caminho — BuenCamino Brasil (produto AONIK)
const HERO_IMG =
  "https://static.wixstatic.com/media/2d4f5b_80e678e6de65425f90c4b56c6f998776~mv2.jpg/v1/fit/w_1920,h_1539,q_90,enc_avif,quality_auto/2d4f5b_80e678e6de65425f90c4b56c6f998776~mv2.jpg";

/* ── Concha da Vieira SVG ─────────────────────────────────────
   Costelas em azul, borda exterior em amarelo
   (espelha as cores do totem de sinalização do Camino)
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
    <svg viewBox="0 20 260 200" className={className} style={{ overflow: "visible" }}>
      {/* Fill azul sutil */}
      <motion.path d={SHELL_PATH} fill={J.azul} fillOpacity={0.12}
        initial={{ opacity: 0 }} animate={{ opacity: 1 }}
        transition={{ duration: 1.6, ease: EASE, delay: 0.5 }} />
      {/* Costelas azul */}
      {TIPS.map(([tx, ty], i) => (
        <motion.line key={i} x1={HX} y1={HY} x2={tx} y2={ty}
          stroke={J.azul} strokeWidth="0.9" strokeOpacity="0.35"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ pathLength: 1, opacity: 1 }}
          transition={{ duration: 1.2, ease: EASE, delay: 0.7 + i * 0.07 }} />
      ))}
      {/* Borda amarela — a concha */}
      <motion.path d={ARC_PATH} fill="none" stroke={J.amarVivo} strokeWidth="2"
        initial={{ pathLength: 0, opacity: 0 }} animate={{ pathLength: 1, opacity: 1 }}
        transition={{ duration: 2.2, ease: EASE, delay: 0.9 }} />
      {/* Charneira */}
      <motion.circle cx={HX} cy={HY} r="4.5" fill={J.amar} fillOpacity="0.7"
        initial={{ scale: 0 }} animate={{ scale: 1 }}
        transition={{ duration: 0.4, ease: EASE, delay: 0.6 }} />
      {/* Rótulo */}
      <motion.text x="130" y="222" textAnchor="middle"
        fill={J.amarVivo} fillOpacity="0.55" fontSize="7.5" letterSpacing="3.5"
        style={{ fontFamily: "sans-serif", fontWeight: 700 }}
        initial={{ opacity: 0 }} animate={{ opacity: 1 }}
        transition={{ duration: 1, ease: EASE, delay: 2.4 }}>
        BOM CAMINHO
      </motion.text>
    </svg>
  );
}

/* ── Dados de produto ─────────────────────────────────────── */
type TipoProduto = "A Pe" | "Bike";
type Produto = { nome: string; tipo: TipoProduto; km: string; dias: string; preco: string; desc: string };

const PORTUGUES_APE: Produto[] = [
  { nome: "Central",                tipo: "A Pe", km: "226 km", dias: "14 dias", preco: "a partir de € 1.466", desc: "Porto para Santiago. A rota historica classica pelo interior de Portugal." },
  { nome: "Costa",                   tipo: "A Pe", km: "260 km", dias: "15 dias", preco: "a partir de € 1.498", desc: "A beira do Atlantico. Praias, dunas e aldeias piscatorias de Portugal." },
  { nome: "Valenca",                 tipo: "A Pe", km: "121 km", dias: "8 dias",  preco: "a partir de € 810",   desc: "Comeca na fronteira do Rio Minho. Mais curto e acessivel para iniciantes." },
  { nome: "Baiona",                  tipo: "A Pe", km: "126,5 km", dias: "8 dias", preco: "a partir de € 886",  desc: "Variante espanhola. Vila medieval como ponto de partida na Galiza." },
  { nome: "Easy",                    tipo: "A Pe", km: "256 km", dias: "21 dias", preco: "a partir de € 2.359", desc: "Etapas curtas, ritmo tranquilo. Ideal para quem caminha pela primeira vez." },
  { nome: "Santiago a Finisterre",   tipo: "A Pe", km: "90 km",  dias: "7 dias",  preco: "a partir de € 791",   desc: "Do fim ao fim do mundo. Estender a peregrinacao alem da Catedral." },
];

const PORTUGUES_BIKE: Produto[] = [
  { nome: "Bike Costa",    tipo: "Bike", km: "260 km", dias: "9 dias", preco: "a partir de € 1.390", desc: "Costa atlantica de bicicleta. Alforjes, vento e liberdade." },
  { nome: "Bike Central",  tipo: "Bike", km: "240 km", dias: "8 dias", preco: "a partir de € 1.262", desc: "Interior portugues. Paisagens de vinha, granito e aldeia." },
];

const FRANCES: Produto[] = [
  { nome: "Sarria · 7 Etapas", tipo: "A Pe", km: "112 km", dias: "7 dias", preco: "a partir de € 750", desc: "O trecho minimo para a Compostela. Galiza a pe, do comeco ao fim." },
  { nome: "Sarria · 8 Etapas", tipo: "A Pe", km: "112 km", dias: "8 dias", preco: "a partir de € 850", desc: "Mesma rota, um dia extra. Mais descanso, mais conversa no caminho." },
  { nome: "O Cebreiro",         tipo: "A Pe", km: "152 km", dias: "8 dias", preco: "a partir de € 928", desc: "Comeca no alto da montanha galega. Descida epica pelo vale." },
  { nome: "Primitivo",          tipo: "A Pe", km: "102 km", dias: "7 dias", preco: "a partir de € 750", desc: "Variante mais selvagem e menos multidao. Solidao e montanha." },
];

const OUTROS = [
  { nome: "Caminho Primitivo",   desc: "O primeiro caminho historico. Oviedo ate Santiago pelas montanhas asturianas." },
  { nome: "Caminho Espiritual",  desc: "Pontevedra, Padron e Santiago pelo rio Ulla. Historia e liturgia." },
  { nome: "Caminho do Norte",    desc: "Costa cantabrica. De Irun ate Santiago entre mar e montanha." },
];

const PILARES = [
  {
    n: "01",
    t: "Autoconhecimento",
    d: "O silencio de 200 km te diz coisas que nenhum retiro consegue. O Caminho cria espaco para ouvir a si mesmo sem ruido, sem agenda, sem pressa.",
  },
  {
    n: "02",
    t: "1.000 Anos de Historia",
    d: "A rota europeia mais antiga ainda em uso. Voce caminha nos mesmos passos de peregrinos medievais, reis, poetas e gente comum em busca de algo maior.",
  },
  {
    n: "03",
    t: "A Comunidade do Caminho",
    d: "Comeca sozinho. Em tres dias voce tem uma turma pra vida. Tem algo no Caminho que faz estranhos virarem amigos antes do jantar.",
  },
  {
    n: "04",
    t: "Portugal e Espanha",
    d: "Granito e calcario. Vinho verde e Rioja. Igreja rural e Catedral. Dois paises, dois idiomas que se entendem, uma experiencia inesquecivel.",
  },
];

const GALERIA = [
  {
    img: "https://static.wixstatic.com/media/2d4f5b_920e9f2265b149e69fcc012023b5026d~mv2.jpg/v1/fill/w_900,h_600,q_90,enc_avif,quality_auto/2d4f5b_920e9f2265b149e69fcc012023b5026d~mv2.jpg",
    tag: "O Caminho",
    label: "A seta amarela. A concha. O granito. Tres simbolos que guiam 300.000 peregrinos por ano.",
  },
  {
    img: "https://static.wixstatic.com/media/2d4f5b_b673e91a63554b5e9fb4a39b74af2728~mv2.jpg/v1/fill/w_900,h_600,q_90,enc_avif,quality_auto/2d4f5b_b673e91a63554b5e9fb4a39b74af2728~mv2.jpg",
    tag: "Portugal",
    label: "Ponte de Lima, vinho verde, granito e aldeias medievais. O Caminho Portugues atravessa o coracao do pais.",
  },
  {
    img: "https://static.wixstatic.com/media/2d4f5b_6fe79078b70b4c4398bd9e601646fcdd~mv2.jpeg/v1/fill/w_900,h_600,q_90,enc_avif,quality_auto/2d4f5b_6fe79078b70b4c4398bd9e601646fcdd~mv2.jpeg",
    tag: "Galiza",
    label: "Na Galiza espanhola, os ultimos km te preparam para o choro de chegada a Catedral de Santiago.",
  },
  {
    img: "https://static.wixstatic.com/media/2d4f5b_80e678e6de65425f90c4b56c6f998776~mv2.jpg/v1/fill/w_900,h_600,q_90,enc_avif,quality_auto/2d4f5b_80e678e6de65425f90c4b56c6f998776~mv2.jpg",
    tag: "A Jornada",
    label: "Fazendas, aldeias, mosteiros. Cada etapa e uma imersao na Europa que sobreviveu ao tempo.",
  },
];

const INCLUSOS = [
  { t: "Transfer de Bagagem", d: "Suas malas viajam para o proximo alojamento. Voce caminha so com a mochila." },
  { t: "Kit do Peregrino",    d: "Credencial, guia impresso e acessorios essenciais para a jornada." },
  { t: "Hospedagem",          d: "Pousadas e hoteis selecionados. Quarto duplo ou single, conforme sua escolha." },
  { t: "Programas Autoguiados", d: "No seu ritmo. Apoio e suporte AONIK do primeiro ate o ultimo dia de caminhada." },
];

/* ── Card de produto — versao dark (pedra bg) ──────────────── */
function ProdutoCardDark({ p, delay = 0 }: { p: Produto; delay?: number }) {
  return (
    <Reveal delay={delay}>
      <a href="#contato" className="group flex h-full flex-col gap-3 rounded-xl p-6 transition-all duration-300"
        style={{ border: `1px solid ${J.amarLine}`, backgroundColor: "rgba(255,255,255,0.03)" }}>
        <div className="flex items-start justify-between gap-2">
          <span className="rounded-full px-2.5 py-0.5 text-[9px] font-semibold uppercase tracking-[0.2em]"
            style={{ backgroundColor: p.tipo === "Bike" ? "rgba(217,168,0,0.18)" : "rgba(217,168,0,0.08)",
              color: J.amar, border: `1px solid rgba(217,168,0,0.22)` }}>
            {p.tipo === "A Pe" ? "A Pe" : "Bike"}
          </span>
          <span className="text-[14px] transition-transform duration-300 group-hover:translate-x-1" style={{ color: J.amar }}>→</span>
        </div>
        <div>
          <h3 className="font-display text-[1.35rem] font-light leading-tight" style={{ color: J.concha }}>{p.nome}</h3>
          <p className="mt-1.5 text-[12px] font-light leading-relaxed" style={{ color: J.textSoft }}>{p.desc}</p>
        </div>
        <div className="mt-auto flex items-end justify-between gap-4 border-t pt-4" style={{ borderColor: J.amarLine }}>
          <div className="flex gap-5">
            <div>
              <div className="text-[12px] font-semibold" style={{ color: J.concha }}>{p.km}</div>
              <div className="text-[9px] uppercase tracking-[0.18em]" style={{ color: J.textSoft }}>distancia</div>
            </div>
            <div>
              <div className="text-[12px] font-semibold" style={{ color: J.concha }}>{p.dias}</div>
              <div className="text-[9px] uppercase tracking-[0.18em]" style={{ color: J.textSoft }}>duracao</div>
            </div>
          </div>
          <div className="text-[13px] font-semibold" style={{ color: J.amar }}>{p.preco}</div>
        </div>
      </a>
    </Reveal>
  );
}

/* ── Card de produto — versao azul ─────────────────────────── */
function ProdutoCardAzul({ p, delay = 0 }: { p: Produto; delay?: number }) {
  return (
    <Reveal delay={delay}>
      <a href="#contato" className="group flex h-full flex-col gap-3 rounded-xl p-6 transition-all duration-300"
        style={{ border: `1px solid rgba(240,190,0,0.2)`, backgroundColor: "rgba(0,38,82,0.5)" }}>
        <div className="flex items-start justify-between gap-2">
          <span className="rounded-full px-2.5 py-0.5 text-[9px] font-semibold uppercase tracking-[0.2em]"
            style={{ backgroundColor: "rgba(240,190,0,0.15)", color: J.amarVivo, border: "1px solid rgba(240,190,0,0.25)" }}>
            A Pe
          </span>
          <span className="text-[14px] transition-transform duration-300 group-hover:translate-x-1" style={{ color: J.amarVivo }}>→</span>
        </div>
        <div>
          <h3 className="font-display text-[1.35rem] font-light leading-tight" style={{ color: "#f0e6cc" }}>{p.nome}</h3>
          <p className="mt-1.5 text-[12px] font-light leading-relaxed" style={{ color: "rgba(240,230,204,0.62)" }}>{p.desc}</p>
        </div>
        <div className="mt-auto flex items-end justify-between gap-4 border-t pt-4" style={{ borderColor: "rgba(240,190,0,0.15)" }}>
          <div className="flex gap-5">
            <div>
              <div className="text-[12px] font-semibold" style={{ color: "#f0e6cc" }}>{p.km}</div>
              <div className="text-[9px] uppercase tracking-[0.18em]" style={{ color: "rgba(240,230,204,0.50)" }}>distancia</div>
            </div>
            <div>
              <div className="text-[12px] font-semibold" style={{ color: "#f0e6cc" }}>{p.dias}</div>
              <div className="text-[9px] uppercase tracking-[0.18em]" style={{ color: "rgba(240,230,204,0.50)" }}>duracao</div>
            </div>
          </div>
          <div className="text-[13px] font-semibold" style={{ color: J.amarVivo }}>{p.preco}</div>
        </div>
      </a>
    </Reveal>
  );
}

type Tab = "pe" | "bike";

/* ================================================================
   PAGE
   ================================================================ */
export default function JornadaPage() {
  const [tab, setTab] = useState<Tab>("pe");

  return (
    <main className="relative" style={{ backgroundColor: J.escuro }}>
      <Nav />

      {/* ══════════════════════════════════════════════════════
          HERO — foto real do Caminho Portugues
          ══════════════════════════════════════════════════════ */}
      <section className="relative flex min-h-screen items-center overflow-hidden">
        <div className="absolute inset-0 scale-110 bg-cover bg-center"
          style={{ backgroundImage: `url('${HERO_IMG}')` }} />
        {/* Gradiente: escuro na esquerda, fade na direita */}
        <div className="absolute inset-0"
          style={{ background: `linear-gradient(105deg, ${J.escuro} 40%, ${J.escuro}cc 56%, ${J.escuro}55 74%, transparent 100%)` }} />
        <div className="absolute inset-x-0 top-0 h-40 bg-gradient-to-b from-[#13100c] to-transparent" />
        <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-[#13100c] to-transparent" />

        <div className="relative z-10 mx-auto w-full max-w-[1180px] px-6 py-32 md:px-10">
          <div className="grid grid-cols-1 items-center gap-16 md:grid-cols-[1fr_360px]">

            {/* Texto */}
            <div>
              <motion.p className="mb-2 text-[10px] font-semibold uppercase tracking-[0.38em]"
                style={{ color: J.amarVivo }}
                initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, ease: EASE, delay: 0.15 }}>
                Jornada · Peregrinacao
              </motion.p>

              <motion.h1 className="font-display font-light leading-[1.02] tracking-[-0.025em]"
                style={{ fontSize: "clamp(3.2rem, 7vw, 5.5rem)", color: J.concha }}
                initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, ease: EASE, delay: 0.28 }}>
                Caminhos de{" "}
                <span className="italic" style={{ color: J.amarVivo }}>Santiago</span>
              </motion.h1>

              <motion.p className="mt-5 max-w-[460px] text-[15px] font-light leading-relaxed"
                style={{ color: J.textSoft }}
                initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.9, ease: EASE, delay: 0.45 }}>
                Voce chega buscando uma viagem. Volta transformado. A AONIK opera
                Compostela desde 2022 com mais rotas que qualquer operadora brasileira.
              </motion.p>

              {/* Stats */}
              <motion.div className="mt-8 flex flex-wrap gap-8"
                initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.9, ease: EASE, delay: 0.6 }}>
                {([["2022", "no caminho"], ["+12", "rotas"], ["+200", "peregrinos"]] as [string,string][]).map(([n, l]) => (
                  <div key={l}>
                    <div className="font-display text-[2rem] font-light leading-none" style={{ color: J.concha }}>{n}</div>
                    <div className="mt-1 text-[9px] font-medium uppercase tracking-[0.22em]" style={{ color: `${J.amar}99` }}>{l}</div>
                  </div>
                ))}
              </motion.div>

              {/* CTAs */}
              <motion.div className="mt-10 flex flex-wrap gap-4"
                initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.9, ease: EASE, delay: 0.75 }}>
                <a href="#caminho-portugues"
                  className="rounded-full px-7 py-3 text-[11px] font-semibold uppercase tracking-[0.16em] transition-opacity duration-300 hover:opacity-80"
                  style={{ backgroundColor: J.amar, color: J.escuro }}>
                  Ver Roteiros
                </a>
                <a href="#contato"
                  className="rounded-full border px-7 py-3 text-[11px] font-semibold uppercase tracking-[0.16em]"
                  style={{ borderColor: `${J.amar}50`, color: J.concha }}>
                  Falar com especialista
                </a>
              </motion.div>
            </div>

            {/* Concha SVG */}
            <motion.div className="hidden md:block"
              initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1.2, ease: EASE, delay: 0.6 }}>
              <ConchaVieira className="h-[380px] w-full" />
            </motion.div>
          </div>
        </div>

        {/* Scroll cue */}
        <motion.div className="absolute bottom-8 left-1/2 -translate-x-1/2"
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1, delay: 2 }}>
          <motion.div className="h-10 w-px mx-auto"
            style={{ background: `linear-gradient(to bottom, transparent, ${J.amar}80)` }}
            animate={{ scaleY: [1, 1.3, 1] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }} />
        </motion.div>
      </section>

      {/* ══════════════════════════════════════════════════════
          A JORNADA — mensagem poetica (creme bg, light)
          ══════════════════════════════════════════════════════ */}
      <section className="px-6 py-24 md:px-10 md:py-36" style={{ backgroundColor: J.creme }}>
        <div className="mx-auto max-w-[860px] text-center">
          <Reveal>
            <p className="mb-4 text-[10px] font-semibold uppercase tracking-[0.36em]"
              style={{ color: J.azul }}>
              A Jornada
            </p>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="font-display font-light leading-[1.22] tracking-[-0.015em]"
              style={{ fontSize: "clamp(1.6rem, 3.2vw, 2.6rem)", color: J.textDark }}>
              Milhares de pessoas por ano partem de Lisboa, do Porto, dos Pireneus.
              Cada uma com uma mochila nas costas e uma{" "}
              <span className="italic" style={{ color: J.azul }}>pergunta sem nome no peito</span>.
            </p>
          </Reveal>
          <Reveal delay={0.2}>
            <p className="mt-6 font-display text-[clamp(1.6rem,3.2vw,2.6rem)] font-light leading-[1.22] tracking-[-0.015em]"
              style={{ color: J.textDark }}>
              Ninguem volta a mesma.
            </p>
          </Reveal>
          <Reveal delay={0.32}>
            <p className="mx-auto mt-10 max-w-[540px] text-[15px] font-light leading-relaxed"
              style={{ color: J.textMid }}>
              O Caminho de Santiago nao e so uma trilha. E uma das experiencias mais
              transformadoras que um ser humano pode ter. Silencio, esforco fisico,
              comunidade, historia e fe se misturam num percurso que existe ha mais
              de mil anos.
            </p>
          </Reveal>

          {/* Decorativo: seta amarela + linha */}
          <Reveal delay={0.42}>
            <div className="mt-12 flex items-center justify-center gap-4">
              <div className="h-px flex-1 max-w-[80px]" style={{ backgroundColor: `${J.azul}30` }} />
              <span className="text-[22px] font-bold" style={{ color: J.amar }}>→</span>
              <div className="h-px flex-1 max-w-[80px]" style={{ backgroundColor: `${J.azul}30` }} />
            </div>
          </Reveal>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════
          O CAMINHO TE TRANSFORMA — 4 pilares (azulDeep bg)
          ══════════════════════════════════════════════════════ */}
      <section className="px-6 py-24 md:px-10 md:py-32" style={{ backgroundColor: J.azulDeep }}>
        <div className="mx-auto max-w-[1180px]">
          <Reveal>
            <p className="mb-3 flex items-center gap-3 text-[10px] font-semibold uppercase tracking-[0.36em]"
              style={{ color: J.amarVivo }}>
              <span className="h-px w-8" style={{ backgroundColor: `${J.amarVivo}60` }} />
              Por que caminhar
            </p>
            <h2 className="mb-14 font-display font-light leading-[1.04] tracking-[-0.02em]"
              style={{ fontSize: "clamp(2rem, 4vw, 3.2rem)", color: J.concha }}>
              O que o Caminho te{" "}
              <span className="italic" style={{ color: J.amarVivo }}>transforma</span>
            </h2>
          </Reveal>

          <div className="grid gap-x-10 gap-y-10 sm:grid-cols-2">
            {PILARES.map((p, i) => (
              <Reveal key={p.n} delay={i * 0.07}>
                <div className="border-t pt-6" style={{ borderColor: `${J.amarVivo}25` }}>
                  <span className="font-display text-[13px]" style={{ color: J.amarVivo }}>{p.n}</span>
                  <h3 className="mt-2 font-display text-[1.5rem] font-light md:text-[1.75rem]"
                    style={{ color: J.concha }}>{p.t}</h3>
                  <p className="mt-3 max-w-sm text-[14px] font-light leading-relaxed"
                    style={{ color: J.textSoft }}>{p.d}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════
          GALERIA EDITORIAL — dois paises, uma travessia (creme bg)
          ══════════════════════════════════════════════════════ */}
      <section className="py-24 md:py-32" style={{ backgroundColor: J.cremeDeep }}>
        <div className="mx-auto max-w-[1180px] px-6 md:px-10">
          <Reveal>
            <p className="mb-3 flex items-center gap-3 text-[10px] font-semibold uppercase tracking-[0.36em]"
              style={{ color: J.azul }}>
              <span className="h-px w-8" style={{ backgroundColor: `${J.azul}40` }} />
              Portugal · Espanha · Galiza
            </p>
            <h2 className="mb-12 font-display font-light leading-[1.04] tracking-[-0.02em]"
              style={{ fontSize: "clamp(2rem, 4vw, 3rem)", color: J.textDark }}>
              Dois paises,{" "}
              <span className="italic" style={{ color: J.azul }}>uma travessia</span>
            </h2>
          </Reveal>

          {/* Grid: 4 paineis (2+2 no mobile, 4 no desktop) */}
          <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
            {GALERIA.map((g, i) => (
              <Reveal key={i} delay={i * 0.07}>
                <div className="group relative overflow-hidden rounded-xl aspect-[3/4]">
                  <div className="absolute inset-0 scale-105 bg-cover bg-center transition-transform duration-[1400ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-100"
                    style={{ backgroundImage: `url('${g.img}')` }} />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#13100c]/80 via-transparent to-transparent" />
                  <div className="absolute inset-x-0 bottom-0 p-4">
                    <p className="mb-1 text-[9px] font-semibold uppercase tracking-[0.22em]"
                      style={{ color: J.amarVivo }}>{g.tag}</p>
                    <p className="text-[11px] font-light leading-snug"
                      style={{ color: "rgba(240,230,204,0.88)" }}>{g.label}</p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════
          CAMINHO PORTUGUES (pedra bg, dark)
          ══════════════════════════════════════════════════════ */}
      <section id="caminho-portugues" className="py-24 md:py-36" style={{ backgroundColor: J.pedra }}>
        <div className="mx-auto max-w-[1180px] px-6 md:px-10">
          <Reveal>
            <p className="mb-4 flex items-center gap-3 text-[10px] font-semibold uppercase tracking-[0.34em]"
              style={{ color: J.amar }}>
              <span className="h-px w-8" style={{ backgroundColor: `${J.amar}50` }} />
              Portugal para Santiago · Espanha
            </p>
            <h2 className="mb-3 font-display font-light leading-[1.04] tracking-[-0.02em]"
              style={{ fontSize: "clamp(2.2rem, 4.5vw, 3.4rem)", color: J.concha }}>
              Caminho Portugues
            </h2>
            <p className="mb-10 max-w-[520px] text-[14px] font-light leading-relaxed"
              style={{ color: J.textSoft }}>
              A rota mais procurada pelos brasileiros. Do Porto ou Lisboa, percorre o
              interior e a costa ate cruzar para a Galiza.
            </p>
          </Reveal>

          {/* Tabs */}
          <Reveal>
            <div className="mb-8 flex w-fit gap-1 rounded-full p-1"
              style={{ backgroundColor: "rgba(217,168,0,0.1)", border: `1px solid ${J.amarLine}` }}>
              {([["pe", "A Pe"], ["bike", "Bike"]] as [Tab, string][]).map(([id, label]) => (
                <button key={id} onClick={() => setTab(id)}
                  className="rounded-full px-6 py-2 text-[11px] font-semibold uppercase tracking-[0.18em] transition-all duration-300"
                  style={tab === id ? { backgroundColor: J.amar, color: J.escuro } : { color: J.textSoft }}>
                  {label}
                </button>
              ))}
            </div>
          </Reveal>

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {(tab === "pe" ? PORTUGUES_APE : PORTUGUES_BIKE).map((p, i) => (
              <ProdutoCardDark key={p.nome} p={p} delay={i * 0.055} />
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════
          CAMINHO FRANCES (azul bg — identidade forte)
          ══════════════════════════════════════════════════════ */}
      <section id="caminho-frances" className="py-24 md:py-36" style={{ backgroundColor: J.azul }}>
        <div className="mx-auto max-w-[1180px] px-6 md:px-10">
          <Reveal>
            <p className="mb-4 flex items-center gap-3 text-[10px] font-semibold uppercase tracking-[0.34em]"
              style={{ color: J.amarVivo }}>
              <span className="h-px w-8" style={{ backgroundColor: `${J.amarVivo}50` }} />
              Pireneus · Meseta · Galiza
            </p>
            <h2 className="mb-3 font-display font-light leading-[1.04] tracking-[-0.02em]"
              style={{ fontSize: "clamp(2.2rem, 4.5vw, 3.4rem)", color: J.concha }}>
              Caminho Frances
            </h2>
            <p className="mb-10 max-w-[520px] text-[14px] font-light leading-relaxed"
              style={{ color: "rgba(240,230,204,0.65)" }}>
              O caminho mais iconico. Cruza os Pireneus e a Meseta espanhola. Os trechos
              a partir de Sarria sao os preferidos dos brasileiros.
            </p>
          </Reveal>

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {FRANCES.map((p, i) => (
              <ProdutoCardAzul key={p.nome} p={p} delay={i * 0.065} />
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════
          OUTROS CAMINHOS (escuro bg)
          ══════════════════════════════════════════════════════ */}
      <section className="py-20 md:py-28" style={{ backgroundColor: J.escuro }}>
        <div className="mx-auto max-w-[1180px] px-6 md:px-10">
          <Reveal>
            <p className="mb-4 flex items-center gap-3 text-[10px] font-semibold uppercase tracking-[0.34em]"
              style={{ color: J.amar }}>
              <span className="h-px w-8" style={{ backgroundColor: `${J.amar}50` }} />
              Consulta Personalizada
            </p>
            <h2 className="mb-10 font-display font-light leading-[1.04] tracking-[-0.02em]"
              style={{ fontSize: "clamp(1.8rem, 3.5vw, 2.8rem)", color: J.concha }}>
              Outros Caminhos
            </h2>
          </Reveal>

          <div className="grid gap-4 sm:grid-cols-3">
            {OUTROS.map((o, i) => (
              <Reveal key={o.nome} delay={i * 0.07}>
                <a href="#contato" className="group flex h-full flex-col gap-4 rounded-xl p-6 transition-all duration-300"
                  style={{ border: `1px solid ${J.azulLine}`, backgroundColor: "rgba(255,255,255,0.02)" }}>
                  <div className="flex items-start justify-between">
                    <h3 className="font-display text-[1.25rem] font-light leading-tight"
                      style={{ color: J.concha }}>{o.nome}</h3>
                    <span className="text-[14px] transition-transform duration-300 group-hover:translate-x-1"
                      style={{ color: J.amar }}>→</span>
                  </div>
                  <p className="text-[12px] font-light leading-relaxed" style={{ color: J.textSoft }}>{o.desc}</p>
                  <span className="mt-auto self-start rounded-full border px-3 py-1 text-[9px] font-semibold uppercase tracking-[0.18em]"
                    style={{ borderColor: `${J.amar}28`, color: `${J.amar}88` }}>
                    Sob Consulta
                  </span>
                </a>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════
          O QUE ESTA INCLUIDO (creme bg — respiracao)
          ══════════════════════════════════════════════════════ */}
      <section className="py-24 md:py-32" style={{ backgroundColor: J.creme }}>
        <div className="mx-auto max-w-[1180px] px-6 md:px-10">
          <Reveal>
            <p className="mb-4 flex items-center gap-3 text-[10px] font-semibold uppercase tracking-[0.36em]"
              style={{ color: J.azul }}>
              <span className="h-px w-8" style={{ backgroundColor: `${J.azul}40` }} />
              Em todos os roteiros
            </p>
            <h2 className="mb-12 font-display font-light leading-[1.04] tracking-[-0.02em]"
              style={{ fontSize: "clamp(2rem, 4vw, 3rem)", color: J.textDark }}>
              O que esta incluido
            </h2>
          </Reveal>

          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {INCLUSOS.map((inc, i) => (
              <Reveal key={inc.t} delay={i * 0.07}>
                <div className="flex flex-col gap-3">
                  <div className="h-px w-10" style={{ backgroundColor: J.azul }} />
                  <h3 className="text-[15px] font-semibold" style={{ color: J.textDark }}>{inc.t}</h3>
                  <p className="text-[13px] font-light leading-relaxed" style={{ color: J.textMid }}>{inc.d}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════
          CONTATO + FOOTER
          ══════════════════════════════════════════════════════ */}
      <div style={{ backgroundColor: J.pedra }}>
        <Contato />
      </div>
      <Footer />
      <FloatingActions />
    </main>
  );
}
