"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Nav from "../components/Nav";
import Footer from "../components/Footer";
import Contato from "../components/Contato";
import FloatingActions from "../components/FloatingActions";
import { Reveal, EASE } from "../components/ui";

/* ================================================================
   CAMINHOS DE SANTIAGO — Paleta Oficial
   PRIMARY:   WHITE #FFF  ·  SUN #F2A900  ·  OCEAN #003087
   SECONDARY: SAND #FFE264 · SKY #307FE2  ·  MIDNIGHT #00205B
   ZERO tons quentes / marrom. Apenas blues, amarelos e branco.
   Flow: black → white → midnight → white → midnight → sky → midnight → sand → midnight
   ================================================================ */

const S = {
  // Primárias
  white:    "#FFFFFF",
  sun:      "#F2A900",
  ocean:    "#003087",
  // Secundárias
  sand:     "#FFE264",
  sky:      "#307FE2",
  midnight: "#00205B",
  // Bg hero (azul-preto — sem marrom)
  black:    "#050913",
  // Texto sobre fundos escuros
  onDark:     "#FFFFFF",
  onDarkSoft: "rgba(255,255,255,0.65)",
  // Texto sobre sky (azul médio) → midnight
  onSky:      "#00205B",
  onSkySoft:  "rgba(0,32,91,0.70)",
  // Texto sobre sand e white → midnight
  onLight:    "#00205B",
  onLightSoft:"rgba(0,32,91,0.60)",
  // Linhas
  sunLine:  "rgba(242,169,0,0.22)",
  skyLine:  "rgba(48,127,226,0.18)",
  wLine:    "rgba(255,255,255,0.14)",
  mLine:    "rgba(0,32,91,0.16)",
};

// Foto real da Catedral de Santiago — BuenCamino Brasil (produto AONIK)
const HERO_IMG =
  "https://static.wixstatic.com/media/2d4f5b_80e678e6de65425f90c4b56c6f998776~mv2.jpg/v1/fit/w_1920,h_1539,q_90,enc_avif,quality_auto/2d4f5b_80e678e6de65425f90c4b56c6f998776~mv2.jpg";

/* ── Concha da Vieira SVG — paleta oficial ───────────────────
   Costelas SKY, borda exterior SUN (espelha o totem de sinalização)
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
      <motion.path d={SHELL_PATH} fill={S.sky} fillOpacity={0.1}
        initial={{ opacity: 0 }} animate={{ opacity: 1 }}
        transition={{ duration: 1.6, ease: EASE, delay: 0.5 }} />
      {TIPS.map(([tx, ty], i) => (
        <motion.line key={i} x1={HX} y1={HY} x2={tx} y2={ty}
          stroke={S.sky} strokeWidth="0.9" strokeOpacity="0.38"
          initial={{ pathLength: 0, opacity: 0 }} animate={{ pathLength: 1, opacity: 1 }}
          transition={{ duration: 1.2, ease: EASE, delay: 0.7 + i * 0.07 }} />
      ))}
      {/* Borda SUN — a concha dourada */}
      <motion.path d={ARC_PATH} fill="none" stroke={S.sun} strokeWidth="2.2"
        initial={{ pathLength: 0, opacity: 0 }} animate={{ pathLength: 1, opacity: 1 }}
        transition={{ duration: 2.2, ease: EASE, delay: 0.9 }} />
      <motion.circle cx={HX} cy={HY} r="4.5" fill={S.sun} fillOpacity="0.75"
        initial={{ scale: 0 }} animate={{ scale: 1 }}
        transition={{ duration: 0.4, ease: EASE, delay: 0.6 }} />
      <motion.text x="130" y="222" textAnchor="middle"
        fill={S.sun} fillOpacity="0.55" fontSize="7.5" letterSpacing="3.5"
        style={{ fontFamily: "sans-serif", fontWeight: 700 }}
        initial={{ opacity: 0 }} animate={{ opacity: 1 }}
        transition={{ duration: 1, ease: EASE, delay: 2.4 }}>
        BOM CAMINHO
      </motion.text>
    </svg>
  );
}

/* ── Dados ────────────────────────────────────────────────── */
type TipoProduto = "A Pe" | "Bike";
type Produto = { nome: string; tipo: TipoProduto; km: string; dias: string; preco: string; desc: string; href?: string };

const PORTUGUES_APE: Produto[] = [
  { nome: "Central",              tipo: "A Pe", km: "226 km",   dias: "14 dias", preco: "a partir de € 1.466", desc: "Porto para Santiago. A rota historica classica pelo interior de Portugal.", href: "/destinos/caminho-central-ape" },
  { nome: "Costa",                tipo: "A Pe", km: "260 km",   dias: "15 dias", preco: "a partir de € 1.498", desc: "A beira do Atlantico. Praias, dunas e aldeias piscatorias de Portugal.", href: "/destinos/caminho-costa-ape" },
  { nome: "Valenca",              tipo: "A Pe", km: "121 km",   dias: "8 dias",  preco: "a partir de € 810",   desc: "Comeca na fronteira do Rio Minho. Mais curto e acessivel para iniciantes.", href: "/destinos/caminho-valenca-ape" },
  { nome: "Baiona",               tipo: "A Pe", km: "126,5 km", dias: "8 dias",  preco: "a partir de € 886",   desc: "Variante espanhola. Vila medieval como ponto de partida na Galiza." },
  { nome: "Easy",                 tipo: "A Pe", km: "256 km",   dias: "21 dias", preco: "a partir de € 2.359", desc: "Etapas curtas, ritmo tranquilo. Ideal para quem caminha pela primeira vez." },
  { nome: "Santiago a Finisterre",tipo: "A Pe", km: "90 km",    dias: "7 dias",  preco: "a partir de € 791",   desc: "Do fim ao fim do mundo. Estender a peregrinacao alem da Catedral." },
];
const PORTUGUES_BIKE: Produto[] = [
  { nome: "Bike Costa",   tipo: "Bike", km: "260 km", dias: "9 dias", preco: "a partir de € 1.390", desc: "Costa atlantica de bicicleta. Alforjes, vento e liberdade." },
  { nome: "Bike Central", tipo: "Bike", km: "240 km", dias: "8 dias", preco: "a partir de € 1.262", desc: "Interior portugues. Paisagens de vinha, granito e aldeia." },
];
const FRANCES: Produto[] = [
  { nome: "Sarria · 7 Etapas", tipo: "A Pe", km: "112 km", dias: "7 dias", preco: "a partir de € 750", desc: "O trecho minimo para a Compostela. Galiza a pe, do comeco ao fim." },
  { nome: "Sarria · 8 Etapas", tipo: "A Pe", km: "112 km", dias: "8 dias", preco: "a partir de € 850", desc: "Mesma rota, um dia extra. Mais descanso, mais conversa no caminho." },
  { nome: "O Cebreiro",         tipo: "A Pe", km: "152 km", dias: "8 dias", preco: "a partir de € 928", desc: "Comeca no alto da montanha galega. Descida epica pelo vale." },
  { nome: "Primitivo",          tipo: "A Pe", km: "102 km", dias: "7 dias", preco: "a partir de € 750", desc: "Variante mais selvagem e menos multidao. Solidao e montanha." },
];
const OUTROS = [
  { nome: "Caminho Primitivo",  desc: "O primeiro caminho historico. Oviedo ate Santiago pelas montanhas asturianas." },
  { nome: "Caminho Espiritual", desc: "Pontevedra, Padron e Santiago pelo rio Ulla. Historia e liturgia." },
  { nome: "Caminho do Norte",   desc: "Costa cantabrica. De Irun ate Santiago entre mar e montanha." },
];
const PILARES = [
  { n: "01", t: "Autoconhecimento",       d: "O silencio de 200 km te diz coisas que nenhum retiro consegue. O Caminho cria espaco para ouvir a si mesmo sem ruido, sem agenda, sem pressa." },
  { n: "02", t: "1.000 Anos de Historia", d: "A rota europeia mais antiga ainda em uso. Voce caminha nos mesmos passos de peregrinos medievais, reis, poetas e gente comum em busca de algo maior." },
  { n: "03", t: "A Comunidade",           d: "Comeca sozinho. Em tres dias voce tem uma turma pra vida. Tem algo no Caminho que faz estranhos virarem amigos antes do jantar." },
  { n: "04", t: "Portugal e Espanha",     d: "Granito e calcario. Vinho verde e Rioja. Igreja rural e Catedral. Dois paises, dois idiomas que se entendem, uma experiencia inesquecivel." },
];
const GALERIA = [
  { img: "https://static.wixstatic.com/media/2d4f5b_920e9f2265b149e69fcc012023b5026d~mv2.jpg/v1/fill/w_900,h_600,q_90,enc_avif,quality_auto/2d4f5b_920e9f2265b149e69fcc012023b5026d~mv2.jpg", tag: "O Caminho", label: "A seta amarela. A concha. O granito. Tres simbolos que guiam 300.000 peregrinos por ano." },
  { img: "https://static.wixstatic.com/media/2d4f5b_b673e91a63554b5e9fb4a39b74af2728~mv2.jpg/v1/fill/w_900,h_600,q_90,enc_avif,quality_auto/2d4f5b_b673e91a63554b5e9fb4a39b74af2728~mv2.jpg", tag: "Portugal", label: "Ponte de Lima, vinho verde, granito. O Caminho Portugues atravessa o coracao do pais." },
  { img: "https://static.wixstatic.com/media/2d4f5b_6fe79078b70b4c4398bd9e601646fcdd~mv2.jpeg/v1/fill/w_900,h_600,q_90,enc_avif,quality_auto/2d4f5b_6fe79078b70b4c4398bd9e601646fcdd~mv2.jpeg", tag: "Galiza", label: "Na Galiza espanhola, os ultimos km te preparam para o choro de chegada a Catedral." },
  { img: "https://static.wixstatic.com/media/2d4f5b_80e678e6de65425f90c4b56c6f998776~mv2.jpg/v1/fill/w_900,h_600,q_90,enc_avif,quality_auto/2d4f5b_80e678e6de65425f90c4b56c6f998776~mv2.jpg", tag: "A Jornada", label: "Cada etapa e uma imersao na Europa que sobreviveu ao tempo." },
];
const INCLUSOS = [
  { t: "Transfer de Bagagem",   d: "Suas malas viajam para o proximo alojamento. Voce caminha so com a mochila." },
  { t: "Kit do Peregrino",      d: "Credencial, guia impresso e acessorios essenciais para a jornada." },
  { t: "Hospedagem",            d: "Pousadas e hoteis selecionados. Quarto duplo ou single, conforme sua escolha." },
  { t: "Programas Autoguiados", d: "No seu ritmo. Apoio e suporte AONIK do primeiro ate o ultimo dia de caminhada." },
];

/* ── Card — sobre fundo escuro (midnight / ocean) ─────────── */
function CardDark({ p, delay = 0 }: { p: Produto; delay?: number }) {
  return (
    <Reveal delay={delay}>
      <a href={p.href ?? "#contato"} className="group flex h-full flex-col gap-3 rounded-2xl p-6 transition-all duration-300"
        style={{ border: `1px solid ${S.sunLine}`, backgroundColor: "rgba(255,255,255,0.05)" }}>
        <div className="flex items-start justify-between gap-2">
          <span className="rounded-full px-2.5 py-0.5 text-[9px] font-bold uppercase tracking-[0.22em]"
            style={{ backgroundColor: "rgba(242,169,0,0.15)", color: S.sun, border: `1px solid rgba(242,169,0,0.25)` }}>
            {p.tipo === "A Pe" ? "A Pe" : "Bike"}
          </span>
          <span className="text-[16px] transition-transform duration-300 group-hover:translate-x-1" style={{ color: S.sun }}>→</span>
        </div>
        <div>
          <h3 className="font-display text-[1.35rem] font-light leading-tight" style={{ color: S.onDark }}>{p.nome}</h3>
          <p className="mt-1.5 text-[12px] font-light leading-relaxed" style={{ color: S.onDarkSoft }}>{p.desc}</p>
        </div>
        <div className="mt-auto flex items-end justify-between gap-4 border-t pt-4" style={{ borderColor: S.sunLine }}>
          <div className="flex gap-5">
            <div>
              <div className="text-[12px] font-semibold" style={{ color: S.onDark }}>{p.km}</div>
              <div className="text-[9px] uppercase tracking-[0.18em]" style={{ color: S.onDarkSoft }}>distancia</div>
            </div>
            <div>
              <div className="text-[12px] font-semibold" style={{ color: S.onDark }}>{p.dias}</div>
              <div className="text-[9px] uppercase tracking-[0.18em]" style={{ color: S.onDarkSoft }}>duracao</div>
            </div>
          </div>
          <div className="text-[13px] font-bold" style={{ color: S.sun }}>{p.preco}</div>
        </div>
      </a>
    </Reveal>
  );
}

/* ── Card — sobre fundo SKY (azul claro → texto midnight) ─── */
function CardSky({ p, delay = 0 }: { p: Produto; delay?: number }) {
  return (
    <Reveal delay={delay}>
      <a href="#contato" className="group flex h-full flex-col gap-3 rounded-2xl p-6 transition-all duration-300"
        style={{ border: `1px solid rgba(0,32,91,0.18)`, backgroundColor: "rgba(0,32,91,0.12)" }}>
        <div className="flex items-start justify-between gap-2">
          <span className="rounded-full px-2.5 py-0.5 text-[9px] font-bold uppercase tracking-[0.22em]"
            style={{ backgroundColor: "rgba(0,32,91,0.12)", color: S.midnight, border: `1px solid rgba(0,32,91,0.2)` }}>
            A Pe
          </span>
          <span className="text-[16px] transition-transform duration-300 group-hover:translate-x-1" style={{ color: S.midnight }}>→</span>
        </div>
        <div>
          <h3 className="font-display text-[1.35rem] font-light leading-tight" style={{ color: S.midnight }}>{p.nome}</h3>
          <p className="mt-1.5 text-[12px] font-light leading-relaxed" style={{ color: S.onSkySoft }}>{p.desc}</p>
        </div>
        <div className="mt-auto flex items-end justify-between gap-4 border-t pt-4" style={{ borderColor: "rgba(0,32,91,0.15)" }}>
          <div className="flex gap-5">
            <div>
              <div className="text-[12px] font-semibold" style={{ color: S.midnight }}>{p.km}</div>
              <div className="text-[9px] uppercase tracking-[0.18em]" style={{ color: S.onSkySoft }}>distancia</div>
            </div>
            <div>
              <div className="text-[12px] font-semibold" style={{ color: S.midnight }}>{p.dias}</div>
              <div className="text-[9px] uppercase tracking-[0.18em]" style={{ color: S.onSkySoft }}>duracao</div>
            </div>
          </div>
          <div className="text-[13px] font-bold" style={{ color: S.midnight }}>{p.preco}</div>
        </div>
      </a>
    </Reveal>
  );
}

/* ── Card — sobre fundo SUN (amarelo vivo → detalhes SKY + OCEAN) */
function CardSand({ p, delay = 0 }: { p: Produto; delay?: number }) {
  return (
    <Reveal delay={delay}>
      <a href="#contato" className="group flex h-full flex-col gap-3 rounded-2xl p-6 transition-all duration-300"
        style={{ border: `1px solid rgba(48,127,226,0.28)`, backgroundColor: "rgba(0,32,91,0.09)" }}>
        <div className="flex items-start justify-between gap-2">
          {/* badge SKY */}
          <span className="rounded-full px-2.5 py-0.5 text-[9px] font-bold uppercase tracking-[0.22em]"
            style={{ backgroundColor: "rgba(48,127,226,0.18)", color: S.midnight, border: `1px solid rgba(48,127,226,0.32)` }}>
            A Pe
          </span>
          {/* seta OCEAN */}
          <span className="text-[16px] transition-transform duration-300 group-hover:translate-x-1" style={{ color: S.ocean }}>→</span>
        </div>
        <div>
          <h3 className="font-display text-[1.35rem] font-light leading-tight" style={{ color: S.midnight }}>{p.nome}</h3>
          <p className="mt-1.5 text-[12px] font-light leading-relaxed" style={{ color: "rgba(0,32,91,0.62)" }}>{p.desc}</p>
        </div>
        <div className="mt-auto flex items-end justify-between gap-4 border-t pt-4"
          style={{ borderColor: "rgba(48,127,226,0.22)" }}>
          <div className="flex gap-5">
            <div>
              <div className="text-[12px] font-semibold" style={{ color: S.midnight }}>{p.km}</div>
              <div className="text-[9px] uppercase tracking-[0.18em]" style={{ color: "rgba(0,32,91,0.55)" }}>distancia</div>
            </div>
            <div>
              <div className="text-[12px] font-semibold" style={{ color: S.midnight }}>{p.dias}</div>
              <div className="text-[9px] uppercase tracking-[0.18em]" style={{ color: "rgba(0,32,91,0.55)" }}>duracao</div>
            </div>
          </div>
          {/* preço OCEAN — destaca sem gritar */}
          <div className="text-[13px] font-bold" style={{ color: S.ocean }}>{p.preco}</div>
        </div>
      </a>
    </Reveal>
  );
}

/* ── Kicker helper ──────────────────────────────────────────── */
function Kicker({ children, color, lineColor }: { children: React.ReactNode; color: string; lineColor: string }) {
  return (
    <p className="mb-3 flex items-center gap-3 text-[10px] font-bold uppercase tracking-[0.36em]" style={{ color }}>
      <span className="h-px w-8" style={{ backgroundColor: lineColor }} />
      {children}
    </p>
  );
}

type Tab = "pe" | "bike";

/* ================================================================
   PAGE
   ================================================================ */
export default function JornadaPage() {
  const [tab, setTab] = useState<Tab>("pe");

  return (
    <main className="relative" style={{ backgroundColor: S.midnight }}>
      <Nav />

      {/* ══════════════════════════════════════════════════════
          HERO — black bg, foto real da Catedral
          ══════════════════════════════════════════════════════ */}
      <section className="relative flex min-h-screen items-center overflow-hidden" style={{ backgroundColor: S.black }}>
        <div className="absolute inset-0 scale-110 bg-cover bg-center"
          style={{ backgroundImage: `url('${HERO_IMG}')` }} />
        {/* Gradiente azul-preto: sem marrom */}
        <div className="absolute inset-0"
          style={{ background: `linear-gradient(105deg, ${S.black} 38%, rgba(5,9,19,0.88) 55%, rgba(5,9,19,0.50) 75%, transparent 100%)` }} />
        <div className="absolute inset-x-0 top-0 h-40" style={{ background: `linear-gradient(to bottom, ${S.black}, transparent)` }} />
        <div className="absolute inset-x-0 bottom-0 h-40" style={{ background: `linear-gradient(to top, ${S.black}, transparent)` }} />

        <div className="relative z-10 mx-auto w-full max-w-[1180px] px-6 py-32 md:px-10">
          <div className="grid grid-cols-1 items-center gap-16 md:grid-cols-[1fr_360px]">
            <div>
              <motion.p className="mb-2 text-[10px] font-bold uppercase tracking-[0.4em]"
                style={{ color: S.sun }}
                initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, ease: EASE, delay: 0.15 }}>
                Jornada · Peregrinacao
              </motion.p>
              <motion.h1 className="font-display font-light leading-[1.02] tracking-[-0.025em]"
                style={{ fontSize: "clamp(3.2rem, 7vw, 5.5rem)", color: S.onDark }}
                initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, ease: EASE, delay: 0.28 }}>
                Caminhos de{" "}
                <span className="italic" style={{ color: S.sun }}>Santiago</span>
              </motion.h1>
              <motion.p className="mt-5 max-w-[460px] text-[15px] font-light leading-relaxed"
                style={{ color: S.onDarkSoft }}
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
                    <div className="font-display text-[2rem] font-light leading-none" style={{ color: S.onDark }}>{n}</div>
                    <div className="mt-1 text-[9px] font-bold uppercase tracking-[0.22em]" style={{ color: `${S.sun}99` }}>{l}</div>
                  </div>
                ))}
              </motion.div>
              {/* CTAs */}
              <motion.div className="mt-10 flex flex-wrap gap-4"
                initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.9, ease: EASE, delay: 0.75 }}>
                <a href="#caminho-portugues"
                  className="rounded-full px-7 py-3 text-[11px] font-bold uppercase tracking-[0.18em] transition-opacity duration-300 hover:opacity-85"
                  style={{ backgroundColor: S.sun, color: S.midnight }}>
                  Ver Roteiros
                </a>
                <a href="#contato"
                  className="rounded-full border px-7 py-3 text-[11px] font-bold uppercase tracking-[0.18em]"
                  style={{ borderColor: `${S.sun}55`, color: S.onDark }}>
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
            style={{ background: `linear-gradient(to bottom, transparent, ${S.sun}80)` }}
            animate={{ scaleY: [1, 1.3, 1] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }} />
        </motion.div>
      </section>

      {/* ══════════════════════════════════════════════════════
          A JORNADA — manifesto poetico (WHITE bg)
          ══════════════════════════════════════════════════════ */}
      <section className="px-6 py-24 md:px-10 md:py-36" style={{ backgroundColor: S.white }}>
        <div className="mx-auto max-w-[860px] text-center">
          <Reveal>
            <p className="mb-4 text-[10px] font-bold uppercase tracking-[0.38em]" style={{ color: S.sky }}>
              A Jornada
            </p>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="font-display font-light leading-[1.22] tracking-[-0.015em]"
              style={{ fontSize: "clamp(1.7rem, 3.4vw, 2.7rem)", color: S.midnight }}>
              Milhares de pessoas por ano partem de Lisboa, do Porto, dos Pireneus.
              Cada uma com uma mochila nas costas e uma{" "}
              <span className="italic" style={{ color: S.ocean }}>pergunta sem nome no peito</span>.
            </p>
          </Reveal>
          <Reveal delay={0.2}>
            <p className="mt-5 font-display font-light leading-[1.22] tracking-[-0.015em]"
              style={{ fontSize: "clamp(1.7rem, 3.4vw, 2.7rem)", color: S.midnight }}>
              Ninguem volta a mesma.
            </p>
          </Reveal>
          <Reveal delay={0.32}>
            <p className="mx-auto mt-10 max-w-[540px] text-[15px] font-light leading-relaxed"
              style={{ color: S.onLightSoft }}>
              O Caminho de Santiago nao e so uma trilha. E uma das experiencias mais
              transformadoras que um ser humano pode ter. Silencio, esforco fisico,
              comunidade, historia e fe se misturam num percurso que existe ha mais de mil anos.
            </p>
          </Reveal>
          <Reveal delay={0.42}>
            <div className="mt-12 flex items-center justify-center gap-4">
              <div className="h-px flex-1 max-w-[80px]" style={{ backgroundColor: `${S.ocean}30` }} />
              <span className="text-[24px] font-black" style={{ color: S.sun }}>→</span>
              <div className="h-px flex-1 max-w-[80px]" style={{ backgroundColor: `${S.ocean}30` }} />
            </div>
          </Reveal>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════
          O CAMINHO TE TRANSFORMA — pilares (MIDNIGHT bg) PERFEITO
          ══════════════════════════════════════════════════════ */}
      <section className="px-6 py-24 md:px-10 md:py-32" style={{ backgroundColor: S.midnight }}>
        <div className="mx-auto max-w-[1180px]">
          <Reveal>
            <Kicker color={S.sun} lineColor={`${S.sun}60`}>Por que caminhar</Kicker>
            <h2 className="mb-14 font-display font-light leading-[1.04] tracking-[-0.02em]"
              style={{ fontSize: "clamp(2rem, 4vw, 3.2rem)", color: S.onDark }}>
              O que o Caminho te{" "}
              <span className="italic" style={{ color: S.sun }}>transforma</span>
            </h2>
          </Reveal>
          <div className="grid gap-x-10 gap-y-10 sm:grid-cols-2">
            {PILARES.map((p, i) => (
              <Reveal key={p.n} delay={i * 0.07}>
                <div className="border-t pt-6" style={{ borderColor: `${S.sun}25` }}>
                  <span className="font-display text-[13px] font-bold" style={{ color: S.sun }}>{p.n}</span>
                  <h3 className="mt-2 font-display text-[1.5rem] font-light md:text-[1.75rem]"
                    style={{ color: S.onDark }}>{p.t}</h3>
                  <p className="mt-3 max-w-sm text-[14px] font-light leading-relaxed"
                    style={{ color: S.onDarkSoft }}>{p.d}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════
          GALERIA — dois paises, uma travessia (WHITE bg)
          ══════════════════════════════════════════════════════ */}
      <section className="py-24 md:py-32" style={{ backgroundColor: S.white }}>
        <div className="mx-auto max-w-[1180px] px-6 md:px-10">
          <Reveal>
            <Kicker color={S.ocean} lineColor={`${S.ocean}40`}>Portugal · Espanha · Galiza</Kicker>
            <h2 className="mb-12 font-display font-light leading-[1.04] tracking-[-0.02em]"
              style={{ fontSize: "clamp(2rem, 4vw, 3rem)", color: S.midnight }}>
              Dois paises,{" "}
              <span className="italic" style={{ color: S.ocean }}>uma travessia</span>
            </h2>
          </Reveal>
          <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
            {GALERIA.map((g, i) => (
              <Reveal key={i} delay={i * 0.07}>
                <div className="group relative overflow-hidden rounded-2xl aspect-[3/4]">
                  <div className="absolute inset-0 scale-105 bg-cover bg-center transition-transform duration-[1400ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-100"
                    style={{ backgroundImage: `url('${g.img}')` }} />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#00205B]/85 via-transparent to-transparent" />
                  <div className="absolute inset-x-0 bottom-0 p-4">
                    <p className="mb-1 text-[9px] font-bold uppercase tracking-[0.24em]" style={{ color: S.sun }}>{g.tag}</p>
                    <p className="text-[11px] font-light leading-snug" style={{ color: "rgba(255,255,255,0.88)" }}>{g.label}</p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════
          CAMINHO PORTUGUES (MIDNIGHT bg)
          ══════════════════════════════════════════════════════ */}
      <section id="caminho-portugues" className="py-24 md:py-36" style={{ backgroundColor: S.midnight }}>
        <div className="mx-auto max-w-[1180px] px-6 md:px-10">
          <Reveal>
            <Kicker color={S.sun} lineColor={`${S.sun}50`}>Portugal para Santiago · Espanha</Kicker>
            <h2 className="mb-3 font-display font-light leading-[1.04] tracking-[-0.02em]"
              style={{ fontSize: "clamp(2.2rem, 4.5vw, 3.4rem)", color: S.onDark }}>
              Caminho Portugues
            </h2>
            <p className="mb-10 max-w-[520px] text-[14px] font-light leading-relaxed" style={{ color: S.onDarkSoft }}>
              A rota mais procurada pelos brasileiros. Do Porto ou Lisboa, percorre o
              interior e a costa ate cruzar para a Galiza.
            </p>
          </Reveal>
          {/* Tabs */}
          <Reveal>
            <div className="mb-8 flex w-fit gap-1 rounded-full p-1"
              style={{ backgroundColor: "rgba(242,169,0,0.12)", border: `1px solid ${S.sunLine}` }}>
              {([["pe", "A Pe"], ["bike", "Bike"]] as [Tab, string][]).map(([id, label]) => (
                <button key={id} onClick={() => setTab(id)}
                  className="rounded-full px-6 py-2 text-[11px] font-bold uppercase tracking-[0.18em] transition-all duration-300"
                  style={tab === id ? { backgroundColor: S.sun, color: S.midnight } : { color: S.onDarkSoft }}>
                  {label}
                </button>
              ))}
            </div>
          </Reveal>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {(tab === "pe" ? PORTUGUES_APE : PORTUGUES_BIKE).map((p, i) => (
              <CardDark key={p.nome} p={p} delay={i * 0.055} />
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════
          CAMINHO FRANCES (SUN bg — amarelo vivo, detalhes SKY/OCEAN)
          ══════════════════════════════════════════════════════ */}
      <section id="caminho-frances" className="py-24 md:py-36" style={{ backgroundColor: S.sun }}>
        <div className="mx-auto max-w-[1180px] px-6 md:px-10">
          <Reveal>
            {/* kicker: texto midnight, linha OCEAN */}
            <Kicker color={S.midnight} lineColor={S.ocean}>Pireneus · Meseta · Galiza</Kicker>
            <h2 className="mb-3 font-display font-light leading-[1.04] tracking-[-0.02em]"
              style={{ fontSize: "clamp(2.2rem, 4.5vw, 3.4rem)", color: S.midnight }}>
              Caminho Frances
            </h2>
            <p className="mb-10 max-w-[520px] text-[14px] font-light leading-relaxed" style={{ color: "rgba(0,32,91,0.62)" }}>
              O caminho mais iconico. Cruza os Pireneus e a Meseta espanhola. Os trechos
              a partir de Sarria sao os preferidos dos brasileiros.
            </p>
          </Reveal>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {FRANCES.map((p, i) => <CardSand key={p.nome} p={p} delay={i * 0.065} />)}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════
          OUTROS CAMINHOS (OCEAN bg)
          ══════════════════════════════════════════════════════ */}
      <section className="py-20 md:py-28" style={{ backgroundColor: S.ocean }}>
        <div className="mx-auto max-w-[1180px] px-6 md:px-10">
          <Reveal>
            <Kicker color={S.sun} lineColor={`${S.sun}50`}>Consulta Personalizada</Kicker>
            <h2 className="mb-10 font-display font-light leading-[1.04] tracking-[-0.02em]"
              style={{ fontSize: "clamp(1.8rem, 3.5vw, 2.8rem)", color: S.onDark }}>
              Outros Caminhos
            </h2>
          </Reveal>
          <div className="grid gap-4 sm:grid-cols-3">
            {OUTROS.map((o, i) => (
              <Reveal key={o.nome} delay={i * 0.07}>
                <a href="#contato" className="group flex h-full flex-col gap-4 rounded-2xl p-6 transition-all duration-300"
                  style={{ border: `1px solid ${S.wLine}`, backgroundColor: "rgba(255,255,255,0.06)" }}>
                  <div className="flex items-start justify-between">
                    <h3 className="font-display text-[1.25rem] font-light leading-tight" style={{ color: S.onDark }}>{o.nome}</h3>
                    <span className="text-[16px] transition-transform duration-300 group-hover:translate-x-1" style={{ color: S.sun }}>→</span>
                  </div>
                  <p className="text-[12px] font-light leading-relaxed" style={{ color: S.onDarkSoft }}>{o.desc}</p>
                  <span className="mt-auto self-start rounded-full border px-3 py-1 text-[9px] font-bold uppercase tracking-[0.2em]"
                    style={{ borderColor: `${S.sun}35`, color: `${S.sun}90` }}>
                    Sob Consulta
                  </span>
                </a>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════
          O QUE ESTA INCLUIDO (SKY bg — azul claro, detalhes amarelo)
          ══════════════════════════════════════════════════════ */}
      <section className="py-24 md:py-32" style={{ backgroundColor: S.sky }}>
        <div className="mx-auto max-w-[1180px] px-6 md:px-10">
          <Reveal>
            <Kicker color={S.sand} lineColor={`${S.sand}70`}>Em todos os roteiros</Kicker>
            <h2 className="mb-12 font-display font-light leading-[1.04] tracking-[-0.02em]"
              style={{ fontSize: "clamp(2rem, 4vw, 3rem)", color: S.midnight }}>
              O que esta incluido
            </h2>
          </Reveal>
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {INCLUSOS.map((inc, i) => (
              <Reveal key={inc.t} delay={i * 0.07}>
                <div className="flex flex-col gap-3">
                  {/* linha amarela — detalhe da sinalização */}
                  <div className="h-px w-10" style={{ backgroundColor: S.sun }} />
                  <h3 className="text-[15px] font-bold" style={{ color: S.midnight }}>{inc.t}</h3>
                  <p className="text-[13px] font-light leading-relaxed" style={{ color: S.onSkySoft }}>{inc.d}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Contato + Footer */}
      <div style={{ backgroundColor: S.midnight }}>
        <Contato />
      </div>
      <Footer />
      <FloatingActions />
    </main>
  );
}
