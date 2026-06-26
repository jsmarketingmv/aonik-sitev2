"use client";

import { motion } from "framer-motion";
import Nav from "../components/Nav";
import Footer from "../components/Footer";
import Contato from "../components/Contato";
import FloatingActions from "../components/FloatingActions";
import Breadcrumb from "../components/Breadcrumb";
import { Reveal, Kicker, EASE } from "../components/ui";

/* ───── PALETTE ───── */
const A = {
  bg:        "#F0EAE0",   // cream global
  dark:      "#1C1409",   // deep earth
  accent:    "#C07040",   // burnt amber
  accentSoft:"#F0A868",   // soft amber
  text:      "#1C1409",
  textSoft:  "rgba(28,20,9,0.62)",
  cream:     "#F0EAE0",
  line:      "rgba(192,112,64,0.18)",
};

/* ───── PALETTES POR DESTINO ───── */
const S = { bg: "#0A1935", acc: "#6B9FCC", soft: "rgba(107,159,204,0.15)", cream: "#EEF3FA" };   // Santiago
const T = { bg: "#0E2A34", acc: "#7FD4E0", soft: "rgba(127,212,224,0.12)", cream: "#EAF6F8" };   // TDP
const P = { bg: "#220A11", acc: "#C4A56A", soft: "rgba(196,165,106,0.15)", cream: "#F0EAE0" };   // Portugal

/* ───── SVG ROTAS LIVRES ───── */
function RotasLivres() {
  return (
    <svg
      viewBox="0 0 420 380"
      xmlns="http://www.w3.org/2000/svg"
      aria-label="Três rotas autoguiadas: Santiago, Torres del Paine e Portugal"
      style={{ width: "100%", maxWidth: 440, height: "auto" }}
    >
      <title>Rotas autoguiadas AONIK pelo mundo</title>

      {/* Fundo circular suave */}
      <circle cx="210" cy="190" r="170" fill="rgba(192,112,64,0.06)" />
      <circle cx="210" cy="190" r="120" fill="rgba(192,112,64,0.05)" />

      {/* Ponto central — o viajante */}
      <circle cx="210" cy="190" r="10" fill={A.accent} />
      <circle cx="210" cy="190" r="16" fill="none" stroke={A.accent} strokeWidth="1.5" strokeDasharray="3 3" />
      <text x="210" y="216" textAnchor="middle" fontSize="8" fill={A.accentSoft} fontFamily="inherit" letterSpacing="0.08em">
        VOCÊ AQUI
      </text>

      {/* Rota 1: Santiago (cima-esquerda) */}
      <path
        d="M 204 175 Q 140 110 80 72"
        fill="none"
        stroke={S.acc}
        strokeWidth="1.8"
        strokeDasharray="6 4"
        strokeLinecap="round"
      />
      {/* Ponto Santiago */}
      <circle cx="80" cy="72" r="8" fill={S.acc} fillOpacity="0.85" />
      {/* Concha pequena */}
      <path d="M76,68 Q80,63 84,68 L80,72 Z" fill={S.cream} fillOpacity="0.9" />
      <text x="80" y="58" textAnchor="middle" fontSize="9.5" fontWeight="600" fill={S.cream} fontFamily="inherit" letterSpacing="0.06em">
        SANTIAGO
      </text>
      <text x="80" y="49" textAnchor="middle" fontSize="8" fill={S.acc} fontFamily="inherit">
        Espanha · Galiza
      </text>

      {/* Rota 2: Torres del Paine (cima-direita) */}
      <path
        d="M 216 175 Q 290 110 348 72"
        fill="none"
        stroke={T.acc}
        strokeWidth="1.8"
        strokeDasharray="6 4"
        strokeLinecap="round"
      />
      {/* Ponto TDP */}
      <circle cx="348" cy="72" r="8" fill={T.acc} fillOpacity="0.85" />
      {/* Pico pequeno */}
      <path d="M343,76 L348,64 L353,76 Z" fill={T.cream} fillOpacity="0.9" />
      <text x="348" y="58" textAnchor="middle" fontSize="9.5" fontWeight="600" fill={T.cream} fontFamily="inherit" letterSpacing="0.06em">
        PATAGÔNIA
      </text>
      <text x="348" y="49" textAnchor="middle" fontSize="8" fill={T.acc} fontFamily="inherit">
        Torres del Paine
      </text>

      {/* Rota 3: Portugal (baixo) */}
      <path
        d="M 210 200 Q 210 270 210 318"
        fill="none"
        stroke={P.acc}
        strokeWidth="1.8"
        strokeDasharray="6 4"
        strokeLinecap="round"
      />
      {/* Ponto Portugal */}
      <circle cx="210" cy="318" r="8" fill={P.acc} fillOpacity="0.85" />
      {/* Uva / socalco pequeno */}
      <path d="M206,319 Q210,313 214,319 Q210,322 206,319Z" fill={P.bg} fillOpacity="0.7" />
      <text x="210" y="339" textAnchor="middle" fontSize="9.5" fontWeight="600" fill={A.dark} fontFamily="inherit" letterSpacing="0.06em">
        PORTUGAL
      </text>
      <text x="210" y="350" textAnchor="middle" fontSize="8" fill={P.acc} fontFamily="inherit">
        Douro · Vicentina · Fátima
      </text>

      {/* Linhas de latitude suaves */}
      <ellipse cx="210" cy="190" rx="165" ry="50" fill="none" stroke="rgba(192,112,64,0.08)" strokeWidth="1" />
      <ellipse cx="210" cy="190" rx="165" ry="95" fill="none" stroke="rgba(192,112,64,0.06)" strokeWidth="1" />
    </svg>
  );
}

/* ───── DADOS ───── */
const PILARES = [
  {
    n: "01",
    titulo: "Logística resolvida",
    desc: "Transfers, hospedagens, mapas digitais e caderneta de rota impressa. Tudo entregue antes da partida.",
  },
  {
    n: "02",
    titulo: "Seu ritmo, seu horário",
    desc: "Sem grupo, sem guia. Você decide quando acordar, quando parar e quantos km faz por dia.",
  },
  {
    n: "03",
    titulo: "Disponibilidade ampla",
    desc: "Partidas ao longo do ano, sem datas fixas. Você viaja quando quiser, com quem quiser.",
  },
  {
    n: "04",
    titulo: "Suporte AONIK disponível",
    desc: "WhatsApp de suporte ativo durante toda a viagem para qualquer imprevisto no caminho.",
  },
];

const SANTIAGO = [
  { nome: "Valença · Rota Clássica", km: "121 km", dias: "8 dias", preco: "a partir de € 810", href: "/destinos/caminho-valenca-ape" },
  { nome: "Caminho Central", km: "226 km", dias: "14 dias", preco: "a partir de € 1.466", href: "/destinos/caminho-central-ape" },
  { nome: "Caminho da Costa", km: "260 km", dias: "15 dias", preco: "a partir de € 1.498", href: "/destinos/caminho-costa-ape" },
  { nome: "Sarria · 7 Etapas", km: "112 km", dias: "7 dias", preco: "a partir de € 580", href: "/destinos/sarria-7-etapas" },
  { nome: "Caminho Easy", km: "256 km", dias: "21 dias", preco: "a partir de € 2.359", href: "/destinos/caminho-easy-ape" },
  { nome: "Santiago a Finisterre", km: "90 km", dias: "7 dias", preco: "a partir de € 791", href: "/destinos/santiago-finisterre" },
];

const TDP = [
  {
    nome: "W Tradicional",
    sub: "Autoguiado",
    meta: "5 dias · 75,5 km",
    desc: "O circuito W clássico e completo. Torres de granito, Vale do Francés e Glaciar Grey.",
    preco: "a partir de US$ 1.874",
    href: "/destinos/torres-del-paine/w-tradicional",
  },
  {
    nome: "W Express",
    sub: "Autoguiado",
    meta: "4 dias · 69,5 km",
    desc: "O W essencial em menos tempo. Todos os ícones, sem abrir mão de nada.",
    preco: "a partir de US$ 1.657",
    href: "/destinos/torres-del-paine/w-express",
  },
  {
    nome: "W Plus",
    sub: "Autoguiado · com hotel",
    meta: "5 dias · 69,5 km",
    desc: "O W completo fechando no Hotel Las Torres. Mais conforto, mesmo emoção.",
    preco: "a partir de US$ 2.126",
    href: "/destinos/torres-del-paine/w-plus",
  },
  {
    nome: "W Journey",
    sub: "Com guia host",
    meta: "5 dias · 69,5 km",
    desc: "Um host acompanha do início ao fim. Para quem prefere boa companhia no caminho.",
    preco: "a partir de US$ 3.200",
    href: "/destinos/torres-del-paine/w-journey",
  },
];

const PORTUGAL = [
  { nome: "Douro Experience", meta: "6 dias · 58,7 km", preco: "a partir de € 1.557", href: "/caminhos-autoguiados/douro" },
  { nome: "Douro Luxury", meta: "6 dias · 27,2 km", preco: "a partir de € 2.130", href: "/caminhos-autoguiados/douro-luxury" },
  { nome: "Santiago e Douro", meta: "13 dias · 133 km", preco: "a partir de € 2.200", href: "/caminhos-autoguiados/santiago-e-douro" },
  { nome: "Rota Vicentina", meta: "8 dias · 91,1 km", preco: "a partir de € 856", href: "/caminhos-autoguiados/rota-vicentina" },
  { nome: "Nazaré a Fátima", meta: "6 dias · 56 km", preco: "a partir de € 870", href: "/caminhos-autoguiados/nazare-a-fatima" },
];

/* ───── COMPONENTES ───── */
function SecTitle({ n, titulo, accent }: { n: string; titulo: string; accent: string }) {
  return (
    <div className="flex items-end gap-5">
      <span className="font-display text-[4.5rem] font-light leading-none opacity-20" style={{ color: accent }}>
        {n}
      </span>
      <h2 className="mb-1 font-display text-[clamp(1.9rem,4vw,3.2rem)] font-light leading-none tracking-[-0.02em]" style={{ color: accent }}>
        {titulo}
      </h2>
    </div>
  );
}

/* ───── PAGE ───── */
export default function AutoguiadosPage() {
  return (
    <main className="relative" style={{ background: A.bg }}>
      <Nav />

      {/* ========== HERO ========== */}
      <section
        className="relative flex min-h-[90svh] w-full items-center overflow-hidden"
        style={{ background: A.dark }}
      >
        <div className="relative z-10 mx-auto grid w-full max-w-[1180px] grid-cols-1 gap-12 px-6 py-28 md:grid-cols-2 md:items-center md:px-10">
          {/* Texto */}
          <motion.div
            initial={{ opacity: 0, y: 28 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: EASE, delay: 0.15 }}
          >
            <Kicker color="text-[#C07040]" line="bg-[#C07040]/40">
              Logística AONIK · Liberdade sua
            </Kicker>
            <h1
              className="mt-4 font-display font-light uppercase leading-[0.88] tracking-[-0.03em]"
              style={{ fontSize: "clamp(3.2rem,10vw,7.5rem)", color: A.cream }}
            >
              AUTO
              <br />
              <span style={{ color: A.accent }}>GUIADOS</span>
            </h1>
            <p className="mt-6 max-w-sm text-[15px] font-light leading-relaxed" style={{ color: "rgba(240,234,224,0.7)" }}>
              Você escolhe o destino. A gente resolve os detalhes e libera você para só caminhar.
            </p>

            {/* Stats */}
            <div className="mt-10 flex gap-8 border-t pt-8" style={{ borderColor: "rgba(192,112,64,0.25)" }}>
              {[
                { v: "3", l: "destinos" },
                { v: "20+", l: "roteiros" },
                { v: "4–21", l: "dias" },
              ].map((s) => (
                <div key={s.l}>
                  <div className="font-display text-[2rem] font-light leading-none" style={{ color: A.accent }}>
                    {s.v}
                  </div>
                  <div className="mt-1 text-[10px] font-semibold uppercase tracking-[0.15em]" style={{ color: "rgba(240,234,224,0.5)" }}>
                    {s.l}
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-8">
              <Breadcrumb
                tone="dark"
                accent={A.accent}
                items={[
                  { label: "Home", href: "/" },
                  { label: "Caminhadas", href: "/caminhadas" },
                  { label: "Autoguiados" },
                ]}
              />
            </div>
          </motion.div>

          {/* SVG */}
          <motion.div
            className="flex items-center justify-center"
            initial={{ opacity: 0, scale: 0.94 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.2, ease: EASE, delay: 0.35 }}
          >
            <RotasLivres />
          </motion.div>
        </div>
      </section>

      {/* ========== COMO FUNCIONA ========== */}
      <section className="px-6 py-24 md:px-10 md:py-32">
        <div className="mx-auto max-w-[1180px]">
          <Reveal>
            <Kicker color="text-[#C07040]" line="bg-[#C07040]/40">
              O que é viajar autoguiado com a AONIK
            </Kicker>
          </Reveal>
          <Reveal delay={0.08}>
            <h2
              className="mt-4 max-w-xl font-display text-[clamp(1.6rem,3vw,2.5rem)] font-light leading-[1.2] tracking-[-0.01em]"
              style={{ color: A.text }}
            >
              Toda a estrutura de uma viagem organizada,{" "}
              <span className="italic">sem abrir mão da sua liberdade</span>.
            </h2>
          </Reveal>

          <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {PILARES.map((p, i) => (
              <Reveal key={p.n} delay={i * 0.07}>
                <div
                  className="rounded-2xl p-8"
                  style={{ background: "rgba(192,112,64,0.06)", border: `1px solid ${A.line}` }}
                >
                  <span
                    className="font-display text-[2.8rem] font-light leading-none"
                    style={{ color: A.accent, opacity: 0.4 }}
                  >
                    {p.n}
                  </span>
                  <h3
                    className="mt-4 font-display text-[1.3rem] font-light leading-tight"
                    style={{ color: A.text }}
                  >
                    {p.titulo}
                  </h3>
                  <p className="mt-3 text-[13px] font-light leading-relaxed" style={{ color: A.textSoft }}>
                    {p.desc}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ========== CAMINHO DE SANTIAGO ========== */}
      <section className="px-6 py-20 md:px-10 md:py-28" style={{ background: S.bg }}>
        <div className="mx-auto max-w-[1180px]">
          <Reveal>
            <Kicker color="text-[#6B9FCC]" line="bg-[#6B9FCC]/40">
              Espanha · Galiza · Portugal
            </Kicker>
          </Reveal>
          <Reveal delay={0.06}>
            <SecTitle n="01" titulo="Caminho de Santiago" accent={S.acc} />
          </Reveal>
          <Reveal delay={0.1}>
            <p className="mt-4 max-w-lg text-[14px] font-light leading-relaxed" style={{ color: "rgba(238,243,250,0.65)" }}>
              A peregrinação mais famosa do mundo, no seu ritmo. Escolha a rota, o número de dias e
              caminhe até a Catedral de Santiago de Compostela.
            </p>
          </Reveal>

          {/* Grid de roteiros */}
          <div className="mt-12 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {SANTIAGO.map((r, i) => (
              <Reveal key={r.nome} delay={i * 0.06}>
                <a
                  href={r.href}
                  className="group flex flex-col gap-2 rounded-xl p-6 transition-all duration-300 hover:-translate-y-[2px]"
                  style={{ background: S.soft, border: "1px solid rgba(107,159,204,0.18)" }}
                >
                  <h3
                    className="font-display text-[1.2rem] font-light leading-tight"
                    style={{ color: S.cream }}
                  >
                    {r.nome}
                  </h3>
                  <p className="text-[11px] font-semibold uppercase tracking-[0.12em]" style={{ color: S.acc }}>
                    {r.km} · {r.dias}
                  </p>
                  <div
                    className="mt-3 flex items-center justify-between border-t pt-4"
                    style={{ borderColor: "rgba(107,159,204,0.15)" }}
                  >
                    <span className="text-[12px] font-light" style={{ color: "rgba(238,243,250,0.65)" }}>
                      {r.preco}
                    </span>
                    <span
                      className="text-[10px] font-semibold uppercase tracking-[0.12em] transition-transform duration-300 group-hover:translate-x-1"
                      style={{ color: S.acc }}
                    >
                      Ver →
                    </span>
                  </div>
                </a>
              </Reveal>
            ))}
          </div>

          <Reveal delay={0.2}>
            <div className="mt-10">
              <a
                href="/jornada"
                className="inline-flex items-center gap-3 rounded-full border px-8 py-4 text-[12px] font-semibold uppercase tracking-[0.15em] transition-all duration-300 hover:bg-[#6B9FCC]/10"
                style={{ color: S.cream, borderColor: "rgba(107,159,204,0.4)" }}
              >
                Ver todos os roteiros de Santiago
                <span className="transition-transform duration-300 group-hover:translate-x-1">→</span>
              </a>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ========== TORRES DEL PAINE ========== */}
      <section className="px-6 py-20 md:px-10 md:py-28" style={{ background: T.bg }}>
        <div className="mx-auto max-w-[1180px]">
          <Reveal>
            <Kicker color="text-[#7FD4E0]" line="bg-[#7FD4E0]/40">
              Patagônia · Chile
            </Kicker>
          </Reveal>
          <Reveal delay={0.06}>
            <SecTitle n="02" titulo="Torres del Paine" accent={T.acc} />
          </Reveal>
          <Reveal delay={0.1}>
            <p className="mt-4 max-w-lg text-[14px] font-light leading-relaxed" style={{ color: "rgba(234,246,248,0.65)" }}>
              O circuito W em quatro versões, do mais compacto ao mais confortável. Geleiras, torres
              de granito e fiordes no fim do mundo.
            </p>
          </Reveal>

          <div className="mt-12 grid gap-6 sm:grid-cols-2">
            {TDP.map((r, i) => (
              <Reveal key={r.nome} delay={i * 0.07}>
                <a
                  href={r.href}
                  className="group flex flex-col rounded-2xl p-8 transition-all duration-300 hover:-translate-y-1"
                  style={{ background: T.soft, border: "1px solid rgba(127,212,224,0.18)" }}
                >
                  <div className="flex items-start justify-between gap-4">
                    <h3
                      className="font-display text-[1.5rem] font-light leading-tight"
                      style={{ color: T.cream }}
                    >
                      {r.nome}
                    </h3>
                    <span
                      className="shrink-0 rounded-full px-3 py-1 text-[9px] font-semibold uppercase tracking-[0.15em]"
                      style={{ background: "rgba(127,212,224,0.12)", color: T.acc }}
                    >
                      {r.sub}
                    </span>
                  </div>
                  <p className="mt-1 text-[11px] font-semibold uppercase tracking-[0.12em]" style={{ color: T.acc }}>
                    {r.meta}
                  </p>
                  <p className="mt-4 flex-1 text-[13px] font-light leading-relaxed" style={{ color: "rgba(234,246,248,0.65)" }}>
                    {r.desc}
                  </p>
                  <div
                    className="mt-6 flex items-center justify-between border-t pt-5"
                    style={{ borderColor: "rgba(127,212,224,0.15)" }}
                  >
                    <span className="text-[13px] font-light" style={{ color: T.acc }}>{r.preco}</span>
                    <span
                      className="text-[10px] font-semibold uppercase tracking-[0.12em] transition-transform duration-300 group-hover:translate-x-1"
                      style={{ color: T.cream }}
                    >
                      Ver circuito →
                    </span>
                  </div>
                </a>
              </Reveal>
            ))}
          </div>

          <Reveal delay={0.2}>
            <div className="mt-10">
              <a
                href="/destinos/torres-del-paine"
                className="inline-flex items-center gap-3 rounded-full border px-8 py-4 text-[12px] font-semibold uppercase tracking-[0.15em] transition-all duration-300 hover:bg-[#7FD4E0]/10"
                style={{ color: T.cream, borderColor: "rgba(127,212,224,0.35)" }}
              >
                Conheça Torres del Paine
                <span>→</span>
              </a>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ========== CAMINHOS DE PORTUGAL ========== */}
      <section className="px-6 py-20 md:px-10 md:py-28" style={{ background: P.bg }}>
        <div className="mx-auto max-w-[1180px]">
          <Reveal>
            <Kicker color="text-[#C4A56A]" line="bg-[#C4A56A]/40">
              Portugal · Autoguiado
            </Kicker>
          </Reveal>
          <Reveal delay={0.06}>
            <SecTitle n="03" titulo="Caminhos de Portugal" accent={P.acc} />
          </Reveal>
          <Reveal delay={0.1}>
            <p className="mt-4 max-w-lg text-[14px] font-light leading-relaxed" style={{ color: "rgba(240,234,224,0.65)" }}>
              Das vinhas em socalcos do Douro às falésias do Alentejo. Cinco roteiros pelo país mais
              caminhável da Europa, todos no seu ritmo.
            </p>
          </Reveal>

          <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {PORTUGAL.map((r, i) => (
              <Reveal key={r.nome} delay={i * 0.07}>
                <a
                  href={r.href}
                  className="group flex flex-col gap-3 rounded-xl p-7 transition-all duration-300 hover:-translate-y-[2px]"
                  style={{ background: P.soft, border: "1px solid rgba(196,165,106,0.2)" }}
                >
                  <h3
                    className="font-display text-[1.3rem] font-light leading-tight"
                    style={{ color: P.cream }}
                  >
                    {r.nome}
                  </h3>
                  <p className="text-[11px] font-semibold uppercase tracking-[0.12em]" style={{ color: P.acc }}>
                    {r.meta}
                  </p>
                  <div
                    className="mt-auto flex items-center justify-between border-t pt-4"
                    style={{ borderColor: "rgba(196,165,106,0.15)" }}
                  >
                    <span className="text-[12px] font-light" style={{ color: "rgba(240,234,224,0.7)" }}>
                      {r.preco}
                    </span>
                    <span
                      className="text-[10px] font-semibold uppercase tracking-[0.12em] transition-transform duration-300 group-hover:translate-x-1"
                      style={{ color: P.acc }}
                    >
                      Ver →
                    </span>
                  </div>
                </a>
              </Reveal>
            ))}
          </div>

          <Reveal delay={0.22}>
            <div className="mt-10">
              <a
                href="/caminhos-autoguiados"
                className="inline-flex items-center gap-3 rounded-full border px-8 py-4 text-[12px] font-semibold uppercase tracking-[0.15em] transition-all duration-300 hover:bg-[#C4A56A]/10"
                style={{ color: P.cream, borderColor: "rgba(196,165,106,0.4)" }}
              >
                Ver hub Caminhos de Portugal
                <span>→</span>
              </a>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ========== SOBRE DUAS RODAS ========== */}
      <section
        className="px-6 py-16 md:px-10 md:py-20"
        style={{ background: "rgba(192,112,64,0.06)", borderTop: `1px solid ${A.line}` }}
      >
        <div className="mx-auto max-w-[1180px]">
          <div className="flex flex-col gap-8 md:flex-row md:items-center md:justify-between">
            <Reveal>
              <div>
                <p className="text-[10px] font-semibold uppercase tracking-[0.3em]" style={{ color: A.accent }}>
                  Também autoguiado
                </p>
                <h3
                  className="mt-2 font-display text-[clamp(1.4rem,2.5vw,2rem)] font-light"
                  style={{ color: A.text }}
                >
                  Cicloturismo em Portugal
                </h3>
                <p className="mt-2 max-w-sm text-[13px] font-light leading-relaxed" style={{ color: A.textSoft }}>
                  Porto, Douro, Aldeias Históricas e os Caminhos de Santiago de bike. Mesma
                  liberdade, sobre duas rodas.
                </p>
              </div>
            </Reveal>
            <Reveal delay={0.1}>
              <div className="flex flex-wrap gap-4">
                {[
                  { n: "Porto · Lisboa", km: "306 km", dias: "8 dias", href: "/destinos/pedal-porto-lisboa" },
                  { n: "Aldeias Históricas", km: "227 km", dias: "7 dias", href: "/destinos/pedal-aldeias-historicas" },
                  { n: "Douro e Aldeias", km: "232 km", dias: "8 dias", href: "/destinos/pedal-douro-aldeias" },
                ].map((b) => (
                  <a
                    key={b.n}
                    href={b.href}
                    className="group flex flex-col gap-1 rounded-xl px-6 py-5 transition-all duration-300 hover:-translate-y-[2px]"
                    style={{ background: A.bg, border: `1px solid ${A.line}`, minWidth: 160 }}
                  >
                    <span className="text-[13px] font-light" style={{ color: A.text }}>{b.n}</span>
                    <span className="text-[10px] font-semibold uppercase tracking-[0.1em]" style={{ color: A.accent }}>
                      {b.km} · {b.dias}
                    </span>
                  </a>
                ))}
                <a
                  href="/bike"
                  className="self-center rounded-full border px-6 py-3 text-[11px] font-semibold uppercase tracking-[0.14em] transition-all duration-300 hover:bg-[#C07040]/10"
                  style={{ color: A.text, borderColor: A.line }}
                >
                  Ver cicloturismo →
                </a>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      <Contato />
      <Footer />
      <FloatingActions />
    </main>
  );
}
