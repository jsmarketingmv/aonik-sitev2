"use client";

import { motion } from "framer-motion";
import Nav from "../components/Nav";
import Footer from "../components/Footer";
import Contato from "../components/Contato";
import FloatingActions from "../components/FloatingActions";
import Breadcrumb from "../components/Breadcrumb";
import { Reveal, EASE } from "../components/ui";

/* ───── PALETA ───── */
const C = {
  porto:    "#220a11",
  noite:    "#130c0e",
  casca:    "#1e141a",
  vinho:    "#3f1521",
  ouro:     "#c4a56a",
  ouroSoft: "#d8bc8c",
  creme:    "#ede6dd",
  creOpa:   "rgba(237,230,221,0.65)",
  sage:     "#7a8f62",
  sageDeep: "#1e2c1a",
  terracota:"#be6549",
  ink:      "rgba(237,230,221,0.55)",
  line:     "rgba(237,230,221,0.14)",
};

/* ───── HELPERS ───── */
const wx = (file: string, w = 800, h = 560) =>
  `https://static.wixstatic.com/media/${file}/v1/fill/w_${w},h_${h},al_c,q_82,enc_avif,quality_auto/img.jpg`;
const un = (id: string, w = 800, h = 560) =>
  `https://images.unsplash.com/photo-${id}?q=80&w=${w}&h=${h}&auto=format&fit=crop`;

/* ───── IMAGENS ───── */
const HERO  = wx("2d4f5b_edfea84f57b54f589aff44727039c42e~mv2.jpg", 2400, 1400);
const RIO   = wx("2d4f5b_7edb87bf58444c00a4e2f0882eaff778~mv2.jpg", 900, 1200);
const VILA  = wx("2d4f5b_01a03621c9fe4cd9812047b9543c423f~mv2.jpg", 900, 600);

/* ───── STATS DO PAÍS ───── */
const STATS = [
  { v: "5",         l: "roteiros" },
  { v: "2",         l: "Patrimônios UNESCO" },
  { v: "6 a 13",   l: "dias de caminhada" },
  { v: "ano todo",  l: "temporada" },
];

/* ───── DIFERENCIAIS ───── */
const DIFERENCIAIS = [
  {
    n:     "01",
    titulo:"Dois Patrimônios UNESCO",
    desc:  "O Vale do Douro Vinhateiro e o Caminho de Santiago de Compostela são dois dos bens mais reconhecidos da humanidade. Portugal reúne ambos a menos de 200 km de distância.",
  },
  {
    n:     "02",
    titulo:"Portugal de norte a sul",
    desc:  "Das vinhas em socalcos do norte às falésias do sudoeste e ao santuário no centro do país. Cinco roteiros que mostram Portugual em toda a sua diversidade.",
  },
  {
    n:     "03",
    titulo:"Vinha, mar e fé",
    desc:  "Três paisagens radicalmente diferentes em um país compacto: o interior milenar do Douro, a costa selvagem atlântica da Vicentina e os caminhos de peregrinação rumo a Fátima.",
  },
  {
    n:     "04",
    titulo:"Logística completa",
    desc:  "Alojamentos reservados, transfers entre etapas, mapa digital e caderneta de rota impressa. Você só precisa colocar um pé à frente do outro.",
  },
];

/* ───── PRODUTOS ───── */
const DOURO_ROTEIROS = [
  {
    nome: "Douro Experience",
    sub:  "Autoguiado",
    meta: "6 dias · 58,7 km · mín. 2 pessoas",
    desc: "A travessia clássica do Vale do Douro entre vinhas em socalcos, quintas com prova e aldeias vinhateiras no seu ritmo.",
    preco: "€ 1.557",
    img: wx("2d4f5b_7edb87bf58444c00a4e2f0882eaff778~mv2.jpg"),
    href: "/caminhos-autoguiados/douro",
    selo: "Clássico",
  },
  {
    nome: "Douro Luxury",
    sub:  "Premium · Estadias em quintas",
    meta: "6 dias · 27,2 km · caminhadas curtas",
    desc: "O Douro em estado de luxo. Quintas históricas, provas de Vinho do Porto Vintage e o maior número de experiências exclusivas.",
    preco: "€ 2.130",
    img: wx("2d4f5b_5a366974e9d24c1ab879fcf6eccb3a0c~mv2.jpeg"),
    href: "/caminhos-autoguiados/douro-luxury",
    selo: "Premium",
  },
  {
    nome: "Santiago e Douro",
    sub:  "Peregrinação + vinhas",
    meta: "13 dias · 133 km · dois Patrimônios UNESCO",
    desc: "Da emoção da Catedral de Santiago ao silêncio das vinhas do Douro. Dois Patrimônios UNESCO em uma só jornada.",
    preco: "€ 2.200",
    img: wx("2d4f5b_80e678e6de65425f90c4b56c6f998776~mv2.jpg"),
    href: "/caminhos-autoguiados/santiago-e-douro",
    selo: "Combinado",
  },
];

const COSTA_ROTEIROS = [
  {
    nome: "Rota Vicentina",
    sub:  "Costa Atlântica · Alentejo",
    meta: "8 dias · 91,1 km · Trilho dos Pescadores",
    desc: "A costa mais selvagem da Europa, no sudoeste de Portugal. Falésias, praias desertas e o silêncio do Atlântico.",
    preco: "€ 856",
    img: un("1505118380757-91f5f5632de0"),
    href: "/caminhos-autoguiados/rota-vicentina",
    selo: "Costa Selvagem",
  },
  {
    nome: "Nazaré a Fátima",
    sub:  "Peregrinação · Caminho de Fátima",
    meta: "6 dias · 56 km · do mar ao santuário",
    desc: "De Nazaré, passando pelos mosteiros de Alcobaça e Batalha, até o Santuário de Fátima. Do oceano ao coração de Portugal.",
    preco: "€ 870",
    img: un("1490730141103-6cac27aaab94"),
    href: "/caminhos-autoguiados/nazare-a-fatima",
    selo: "Peregrinação",
  },
];

/* ───── CARD ───── */
function Card({ p }: { p: typeof DOURO_ROTEIROS[number] }) {
  return (
    <a
      href={p.href}
      className="group flex flex-col overflow-hidden rounded-2xl transition-all duration-300 hover:-translate-y-1"
      style={{ border: "1px solid rgba(237,230,221,0.1)", background: C.casca }}
    >
      <div className="relative h-52 overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-[1.05]"
          style={{ backgroundImage: `url('${p.img}')` }}
        />
        <div className="absolute inset-0" style={{ background: `linear-gradient(to top, ${C.porto}f0, transparent 55%)` }} />
        <span
          className="absolute left-4 top-4 rounded-full px-3 py-1 text-[9px] font-semibold uppercase tracking-[0.2em]"
          style={{ background: "rgba(0,0,0,0.55)", color: C.ouro }}
        >
          {p.selo}
        </span>
        <div className="absolute inset-x-0 bottom-0 p-4">
          <h3 className="font-display text-[1.3rem] font-light leading-tight" style={{ color: C.creme }}>{p.nome}</h3>
          <p className="mt-0.5 text-[10px] font-semibold uppercase tracking-[0.14em]" style={{ color: C.ouro }}>{p.sub}</p>
        </div>
      </div>
      <div className="flex flex-1 flex-col p-6">
        <p className="text-[11px] font-semibold uppercase tracking-[0.12em]" style={{ color: C.ouroSoft }}>{p.meta}</p>
        <p className="mt-3 flex-1 text-[13px] font-light leading-relaxed" style={{ color: C.ink }}>{p.desc}</p>
        <div className="mt-5 flex items-center justify-between border-t pt-4" style={{ borderColor: C.line }}>
          <span className="text-[12px] font-light" style={{ color: C.creme }}>
            a partir de{" "}
            <strong className="font-display text-[1.05rem] font-light" style={{ color: C.ouro }}>{p.preco}</strong>
          </span>
          <span
            className="text-[10px] font-semibold uppercase tracking-[0.14em] transition-transform duration-300 group-hover:translate-x-1"
            style={{ color: C.ouro }}
          >
            Ver →
          </span>
        </div>
      </div>
    </a>
  );
}

/* ───── PAGE ───── */
export default function CaminhosPortugalHub() {
  return (
    <main className="relative" style={{ background: C.creme }}>
      <Nav />

      {/* ===== HERO ===== */}
      <section
        className="relative flex min-h-[100svh] w-full items-center overflow-hidden"
        style={{ background: C.porto }}
      >
        <motion.div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url('${HERO}')`, backgroundPosition: "center 40%" }}
          initial={{ scale: 1.07 }}
          animate={{ scale: 1 }}
          transition={{ duration: 2.6, ease: EASE }}
        />
        <div
          className="absolute inset-0"
          style={{ background: `linear-gradient(105deg, ${C.porto}f2 0%, ${C.porto}cc 35%, ${C.porto}80 60%, transparent 85%)` }}
        />
        <div className="absolute inset-x-0 bottom-0 h-48" style={{ background: `linear-gradient(to top, ${C.porto}, transparent)` }} />

        <div className="relative z-10 mx-auto w-full max-w-[1400px] px-6 py-28 md:px-10">
          <div className="max-w-2xl">
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, ease: EASE, delay: 0.2 }}
              className="text-[12px] font-semibold uppercase tracking-[0.4em]"
              style={{ color: C.ouro }}
            >
              Caminhadas · Portugal · Autoguiado
            </motion.p>

            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.1, ease: EASE, delay: 0.3 }}
              className="mt-4 font-display font-light uppercase leading-[0.88] tracking-[-0.025em]"
              style={{ color: C.creme, fontSize: "clamp(3rem,9vw,7.5rem)" }}
            >
              Caminhos<br />
              <span style={{ color: C.ouro }}>de Portugal</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, ease: EASE, delay: 0.5 }}
              className="mt-6 max-w-lg text-[15px] font-light leading-relaxed"
              style={{ color: C.creOpa }}
            >
              Das vinhas em socalcos do Douro às falésias da costa atlântica.{" "}
              <span style={{ color: C.creme }}>Cinco roteiros pelo país mais caminhável da Europa, com logística toda cuidada pela AONIK.</span>
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, ease: EASE, delay: 0.65 }}
              className="mt-8 flex flex-wrap items-center gap-5"
            >
              <a
                href="#roteiros"
                className="inline-flex items-center gap-3 rounded-full px-8 py-4 text-[13px] font-semibold uppercase tracking-[0.16em] transition-transform duration-300 hover:scale-[1.03]"
                style={{ background: C.ouro, color: C.noite }}
              >
                Ver os roteiros <span>→</span>
              </a>
              <a href="#contato" className="text-[12px] uppercase tracking-[0.16em]" style={{ color: C.creme }}>
                Falar com especialista
              </a>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1, ease: EASE, delay: 0.8 }}
              className="mt-10"
            >
              <Breadcrumb
                tone="dark"
                accent={C.ouro}
                items={[
                  { label: "Home", href: "/" },
                  { label: "Caminhadas", href: "/caminhadas" },
                  { label: "Caminhos de Portugal" },
                ]}
              />
            </motion.div>
          </div>
        </div>
      </section>

      {/* ===== PORTUGAL — DESCRIÇÃO ===== */}
      <section className="px-6 py-24 md:px-10 md:py-32" style={{ background: C.creme, color: C.porto }}>
        <div className="mx-auto grid max-w-[1180px] items-center gap-12 md:grid-cols-[0.85fr_1.15fr] md:gap-16">
          {/* Foto vertical */}
          <Reveal>
            <div className="relative overflow-hidden rounded-2xl" style={{ aspectRatio: "3/4" }}>
              <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: `url('${RIO}')` }} />
              <div className="absolute inset-0" style={{ background: `linear-gradient(to top, ${C.porto}cc, transparent 45%)` }} />
              <div className="absolute inset-x-0 bottom-0 p-6">
                <p className="text-[10px] font-semibold uppercase tracking-[0.3em]" style={{ color: C.ouroSoft }}>Vale do Douro Vinhateiro</p>
                <p className="mt-1 font-display text-xl font-light" style={{ color: C.creme }}>O rio que criou o vinho do Porto</p>
              </div>
            </div>
          </Reveal>

          {/* Texto + fatos */}
          <Reveal delay={0.1}>
            <p className="text-[11px] font-semibold uppercase tracking-[0.34em]" style={{ color: C.ouro }}>
              Por que Portugal?
            </p>
            <h2 className="mt-5 font-display font-light leading-[1.15]" style={{ color: C.porto, fontSize: "clamp(1.9rem,3.6vw,3rem)" }}>
              Portugal é feito para ser<br />atravessado devagar
            </h2>
            <p className="mt-6 text-[15px] font-light leading-relaxed" style={{ color: "rgba(34,10,17,0.65)" }}>
              Em um país com menos de 90.000 km², coexistem dois Patrimônios UNESCO caminhável: o Vale do
              Douro Vinhateiro, escavado em socalcos de pedra ao longo de milênios, e o Caminho de Santiago
              de Compostela, que atravessa Portugal do Porto à Galiza pela rota mais antiga de peregrinação da Europa.
            </p>
            <p className="mt-4 text-[15px] font-light leading-relaxed" style={{ color: "rgba(34,10,17,0.65)" }}>
              Ao sul, a Costa Vicentina guarda a faixa mais selvagem do litoral europeu. No centro, os
              mosteiros medievais e o Santuário de Fátima guardam séculos de história e fé. Cada roteiro
              é uma Portugal diferente.
            </p>

            {/* 3 fatos */}
            <div className="mt-8 grid gap-4 sm:grid-cols-3">
              {[
                { t: "2",         d: "Patrimônios UNESCO" },
                { t: "5",         d: "roteiros exclusivos" },
                { t: "ano todo",  d: "temporada aberta" },
              ].map((a) => (
                <div key={a.t} className="rounded-xl border p-5" style={{ borderColor: "rgba(34,10,17,0.14)" }}>
                  <p className="font-display text-2xl font-light" style={{ color: C.porto }}>{a.t}</p>
                  <p className="mt-1 text-[10px] uppercase tracking-[0.12em] leading-snug" style={{ color: C.ouro }}>{a.d}</p>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      {/* ===== FRASE ===== */}
      <section className="px-6 py-16 md:px-10 md:py-20" style={{ background: C.vinho }}>
        <div className="mx-auto max-w-[880px] text-center">
          <Reveal>
            <p className="font-display text-[clamp(1.5rem,3.2vw,2.6rem)] font-light leading-[1.25] tracking-[-0.01em]" style={{ color: C.creme }}>
              A gente cuida da logística para sobrar a você apenas{" "}
              <em className="not-italic" style={{ color: C.ouro }}>o caminho e a paisagem que vira vinho.</em>
            </p>
          </Reveal>
        </div>
      </section>

      {/* ===== STATS BAR ===== */}
      <section className="px-6 py-14 md:px-10" style={{ background: C.noite }}>
        <div className="mx-auto grid max-w-[1280px] grid-cols-2 gap-6 md:grid-cols-4">
          {STATS.map((s, i) => (
            <Reveal key={s.l} delay={i * 0.06}>
              <div className="border-l pl-4" style={{ borderColor: C.line }}>
                <p className="font-display font-light" style={{ color: C.creme, fontSize: "clamp(1.6rem,3vw,2.5rem)" }}>{s.v}</p>
                <p className="mt-1 text-[11px] font-semibold uppercase tracking-[0.16em]" style={{ color: C.ouroSoft }}>{s.l}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* ===== DIFERENCIAIS ===== */}
      <section className="px-6 py-24 md:px-10 md:py-32" style={{ background: C.porto }}>
        <div className="mx-auto max-w-[1180px]">
          <Reveal>
            <p className="mb-3 text-[11px] font-semibold uppercase tracking-[0.34em]" style={{ color: C.ouro }}>
              Por que escolher
            </p>
          </Reveal>
          <Reveal delay={0.05}>
            <h2 className="mb-12 max-w-xl font-display font-light leading-[1.1]" style={{ color: C.creme, fontSize: "clamp(1.9rem,3.6vw,3rem)" }}>
              O que faz dos Caminhos de Portugal uma experiência única
            </h2>
          </Reveal>

          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {DIFERENCIAIS.map((d, i) => (
              <Reveal key={d.n} delay={i * 0.07}>
                <div
                  className="rounded-2xl p-8"
                  style={{ background: C.casca, border: `1px solid ${C.line}` }}
                >
                  <span
                    className="font-display text-[3rem] font-light leading-none"
                    style={{ color: C.ouro, opacity: 0.3 }}
                  >
                    {d.n}
                  </span>
                  <h3 className="mt-4 font-display text-[1.2rem] font-light leading-tight" style={{ color: C.creme }}>{d.titulo}</h3>
                  <p className="mt-3 text-[13px] font-light leading-relaxed" style={{ color: C.ink }}>{d.desc}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ===== VALE DO DOURO ===== */}
      <section id="roteiros" className="scroll-mt-24 px-6 py-24 md:px-10 md:py-32" style={{ background: C.noite }}>
        <div className="mx-auto max-w-[1180px]">
          <Reveal>
            <p className="mb-2 text-[11px] font-semibold uppercase tracking-[0.34em]" style={{ color: C.ouro }}>
              Destino · Norte de Portugal
            </p>
          </Reveal>
          <Reveal delay={0.05}>
            <h2 className="mb-3 font-display text-[clamp(1.9rem,4vw,3.2rem)] font-light leading-[1.1]" style={{ color: C.creme }}>
              Vale do Douro
            </h2>
          </Reveal>
          <Reveal delay={0.08}>
            <p className="mb-12 max-w-lg text-[14px] font-light leading-relaxed" style={{ color: C.ink }}>
              Patrimônio Mundial da UNESCO. Socalcos de pedra a perder de vista, o Rio Douro serpenteando
              entre vinhas e quintas com história de séculos. A caminhada mais bonita de Portugal.
            </p>
          </Reveal>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {DOURO_ROTEIROS.map((p, i) => (
              <Reveal key={p.nome} delay={i * 0.07}>
                <Card p={p} />
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ===== COSTA + PEREGRINAÇÃO ===== */}
      <section className="px-6 py-24 md:px-10 md:py-32" style={{ background: C.sageDeep }}>
        <div className="mx-auto max-w-[1180px]">
          <Reveal>
            <p className="mb-2 text-[11px] font-semibold uppercase tracking-[0.34em]" style={{ color: C.ouroSoft }}>
              Costa e Peregrinação
            </p>
          </Reveal>
          <Reveal delay={0.05}>
            <h2 className="mb-3 font-display text-[clamp(1.9rem,4vw,3.2rem)] font-light leading-[1.1]" style={{ color: C.creme }}>
              Costa Atlântica e Caminhos de Fé
            </h2>
          </Reveal>
          <Reveal delay={0.08}>
            <p className="mb-12 max-w-lg text-[14px] font-light leading-relaxed" style={{ color: C.creOpa }}>
              Do Alentejo selvagem ao coração de Portugal. A Rota Vicentina e o caminho de Nazaré a Fátima
              mostram um Portugal que poucos turistas conhecem.
            </p>
          </Reveal>

          <div className="grid gap-6 sm:grid-cols-2">
            {COSTA_ROTEIROS.map((p, i) => (
              <Reveal key={p.nome} delay={i * 0.07}>
                <Card p={p} />
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ===== IMAGEM DIVISÓRIA ===== */}
      <div
        className="relative h-56 w-full bg-cover bg-center md:h-72"
        style={{ backgroundImage: `url('${VILA}')` }}
      >
        <div className="absolute inset-0" style={{ background: `linear-gradient(to top, ${C.porto}e0 0%, ${C.porto}60 60%, transparent 100%)` }} />
        <div className="absolute inset-x-0 bottom-0 px-6 py-8 md:px-10">
          <p className="font-display text-[clamp(1.2rem,2.5vw,2rem)] font-light italic" style={{ color: C.creme }}>
            "Portugal cabe no passo."
          </p>
        </div>
      </div>

      {/* ===== PREFERE GRUPOS? ===== */}
      <section className="px-6 py-20 md:px-10 md:py-28" style={{ background: C.vinho }}>
        <div className="mx-auto max-w-[1180px]">
          <div className="flex flex-col gap-8 md:flex-row md:items-center md:justify-between">
            <Reveal>
              <div className="max-w-xl">
                <p className="text-[10px] font-semibold uppercase tracking-[0.32em]" style={{ color: C.ouro }}>
                  Prefere companhia?
                </p>
                <h2 className="mt-3 font-display text-[clamp(1.8rem,4vw,3rem)] font-light leading-[1.1]" style={{ color: C.creme }}>
                  Prefere caminhar em grupo?
                </h2>
                <p className="mt-4 max-w-md text-[14px] font-light leading-relaxed" style={{ color: C.ink }}>
                  Se você quer guia especializado, grupo pequeno e a experiência completa com saída
                  confirmada, a AONIK também tem programas em grupo para Douro, Dolomitas, Bavária, Tirol e muito mais.
                </p>
              </div>
            </Reveal>
            <Reveal delay={0.1}>
              <a
                href="/grupos"
                className="inline-flex items-center gap-3 rounded-full px-10 py-5 text-[12px] font-semibold uppercase tracking-[0.18em] transition-all duration-300 hover:scale-[1.03]"
                style={{ background: C.ouro, color: C.noite }}
              >
                Ver grupos com guia <span>→</span>
              </a>
            </Reveal>
          </div>
        </div>
      </section>

      <Contato destino="PORTUGAL — Caminhos Autoguiados" />
      <Footer />
      <FloatingActions />
    </main>
  );
}
