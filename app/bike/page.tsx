"use client";

import { motion } from "framer-motion";
import Nav from "../components/Nav";
import Breadcrumb from "../components/Breadcrumb";
import Footer from "../components/Footer";
import Contato from "../components/Contato";
import FloatingActions from "../components/FloatingActions";
import { Reveal, Kicker, EASE } from "../components/ui";

/* ── PALETA ──────────────────────────────────────────────────── */
const B = {
  asfalto:  "#0d1e1c",   // Everglade dark
  pedal:    "#c4902a",   // Cornfield golden
  pedalSoft:"#d4a840",
  caminho:  "#152824",   // Everglade medium-dark
  granito:  "#8aaa98",   // muted teal
  areia:    "#b89460",   // Sisal Beige
  creme:    "#f0ece4",   // Beachwood
  cremedp:  "#e6e2d8",
  texto:    "#1a2b28",   // dark Everglade text
};

const HERO_IMG =
  "https://www.portugal-a2z.com/imagegen//client/files/0000000001/2685.jpg/1920x700/2/1920x700/";

/* ── SVG: Rota Costa Portuguesa Porto → Santiago ─────────────── */
function RotaBike() {
  return (
    <svg
      viewBox="0 0 280 400"
      xmlns="http://www.w3.org/2000/svg"
      className="h-full w-full"
      aria-hidden="true"
    >
      <rect x="0" y="0" width="100" height="400" fill="rgba(20,40,60,0.25)" />
      <path
        d="M 88,395 C 82,350 74,310 80,270 C 86,230 78,190 72,155 C 66,118 78,80 82,38"
        fill="none"
        stroke="rgba(100,160,200,0.35)"
        strokeWidth="1.5"
      />
      <path
        d="M 88,395 C 82,350 74,310 80,270 C 86,230 78,190 72,155 C 66,118 78,80 82,38
           L 280,38 L 280,395 Z"
        fill="rgba(18,14,10,0.5)"
      />
      <motion.path
        d="M 140,378 C 135,340 128,295 122,255 C 116,215 118,175 112,138 C 108,105 118,72 122,42"
        fill="none"
        stroke={B.pedal}
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeDasharray="7 5"
        initial={{ pathLength: 0, opacity: 0 }}
        animate={{ pathLength: 1, opacity: 1 }}
        transition={{ duration: 2.2, ease: "easeInOut", delay: 0.6 }}
      />
      <text x="44" y="220" fontSize="8" fill="rgba(120,180,220,0.55)"
        letterSpacing="3" textAnchor="middle" transform="rotate(-90,44,220)">
        ATLÂNTICO
      </text>
      <motion.circle cx="140" cy="378" r="5" fill={B.pedal}
        initial={{ scale: 0 }} animate={{ scale: 1 }}
        transition={{ delay: 0.8, duration: 0.4, ease: "backOut" }} />
      <text x="150" y="382" fontSize="12" fill={B.areia} fontWeight="500">Porto</text>
      <motion.circle cx="125" cy="268" r="3.5" fill={B.pedal} opacity={0.85}
        initial={{ scale: 0 }} animate={{ scale: 1 }}
        transition={{ delay: 1.2, duration: 0.35, ease: "backOut" }} />
      <text x="134" y="272" fontSize="9.5" fill={B.granito}>Viana do Castelo</text>
      <motion.circle cx="115" cy="178" r="3.5" fill={B.pedal} opacity={0.85}
        initial={{ scale: 0 }} animate={{ scale: 1 }}
        transition={{ delay: 1.5, duration: 0.35, ease: "backOut" }} />
      <text x="124" y="182" fontSize="9.5" fill={B.granito}>Caminha · fronteira</text>
      <motion.circle cx="122" cy="42" r="6" fill={B.creme}
        initial={{ scale: 0 }} animate={{ scale: 1 }}
        transition={{ delay: 1.9, duration: 0.4, ease: "backOut" }} />
      <text x="134" y="47" fontSize="12" fill={B.creme} fontWeight="500">Santiago</text>
      <text x="8" y="395" fontSize="9" fill={B.granito}>260 km · 9 dias</text>
    </svg>
  );
}

/* ── CICLOTURISMO — 3 pilares do Juliano ─────────────────────── */
const CICLOTURISMO = [
  {
    n: "01",
    titulo: "Imersao e Vivência",
    desc: "O ritmo desacelerado da bike cria espaco para o que as viagens rapidas não permitem: conversar com moradores, entrar numa padaria local, parar num miradouro sem roteiro. Você não e turista, e protagonista.",
  },
  {
    n: "02",
    titulo: "Saude e Bem-Estar",
    desc: "Cada pedalada fortalece o corpo e acalma a mente. Esporte de baixo impacto, acessivel a diferentes idades e condicionamentos, que combina exercicio fisico com imersao na natureza.",
  },
  {
    n: "03",
    titulo: "Sustentabilidade",
    desc: "Zero emissoes, impacto minimo. A bike passa por onde onibus e carros não chegam, e o dinheiro gasto fica nas maos de pousadas e restaurantes locais. A forma mais etica de explorar um território.",
  },
];

/* ── PRODUTOS PORTUGAL ───────────────────────────────────────── */
const A2Z_PRODUTOS = [
  {
    nome: "Porto · Lisboa",
    subtitulo: "Cicloturismo · Costa Atlantica",
    bandeira: "🇵🇹",
    desc: "306 km pela orla atlantica entre dunas, lagoas e o Pinhal de Leiria do sec. XIV.",
    km: "306 km",
    dias: "8 dias",
    preco: "a partir de € 1.207",
    href: "/destinos/pedal-porto-lisboa",
    img: "https://www.portugal-a2z.com/imagegen//client/files/0000000001/2685.jpg/900x600/1/900x600/",
  },
  {
    nome: "Aldeias Históricas",
    subtitulo: "Cicloturismo · Interior",
    bandeira: "🇵🇹",
    desc: "227 km pelo interior montanhoso. Fortalezas medievais, Serra da Estrela e gravuras pré-históricas UNESCO.",
    km: "227 km",
    dias: "7 dias",
    preco: "a partir de € 1.557",
    href: "/destinos/pedal-aldeias-historicas",
    img: "https://www.portugal-a2z.com/imagegen//client/files/0000000001/1847.jpg/900x600/1/900x600/",
  },
  {
    nome: "Douro e Aldeias",
    subtitulo: "Cicloturismo · Vale do Douro",
    bandeira: "🇵🇹",
    desc: "232 km entre aldeias medievais do planalto e os vinhedos UNESCO do Vale do Douro.",
    km: "232 km",
    dias: "8 dias",
    preco: "a partir de € 1.736",
    href: "/destinos/pedal-douro-aldeias",
    img: "https://www.portugal-a2z.com/imagegen//client/files/0000000001/2648.jpg/900x600/1/900x600/",
  },
];

const SANTIAGO_PRODUTOS = [
  {
    nome: "Caminho da Costa de Bike",
    subtitulo: "Peregrinação · Costa Atlantica",
    bandeira: "🇵🇹 🇪🇸",
    desc: "A beira do Atlantico. Porto até Santiago pela orla de Portugal e pelas Rias Baixas da Galiza.",
    km: "260 km",
    dias: "9 dias",
    preco: "a partir de € 1.390",
    href: "/destinos/caminho-costa-bike",
    img: "https://static.wixstatic.com/media/2d4f5b_2377bcbf693348f282eaf5bd3daa74d2~mv2.jpg/v1/fill/w_900,h_600,q_90,enc_avif,quality_auto/2d4f5b_2377bcbf693348f282eaf5bd3daa74d2~mv2.jpg",
  },
  {
    nome: "Caminho Central de Bike",
    subtitulo: "Peregrinação · Interior",
    bandeira: "🇵🇹 🇪🇸",
    desc: "A rota histórica classica. Porto até Santiago pelo coração de Portugal e da Galiza, de seta em seta amarela.",
    km: "240 km",
    dias: "8 dias",
    preco: "a partir de € 1.262",
    href: "/destinos/caminho-central-bike",
    img: "https://static.wixstatic.com/media/2d4f5b_81c89a7a405a41dda38a215d2fe19d08~mv2.jpg/v1/fill/w_900,h_600,q_90,enc_avif,quality_auto/2d4f5b_81c89a7a405a41dda38a215d2fe19d08~mv2.jpg",
  },
];

/* ── EM BREVE ────────────────────────────────────────────────── */
const EM_BREVE = [
  { nome: "Coxilha Rica de Bike", local: "Serra Catarinense · Brasil", flag: "🇧🇷" },
  { nome: "Caminho Norte de Bike", local: "Costa Cantabrica · Espanha", flag: "🇪🇸" },
  { nome: "Dolomitas de Bike", local: "Alta Via · Italia", flag: "🇮🇹" },
];

/* ── CARD DE PRODUTO ─────────────────────────────────────────── */
function ProdutoCard({
  p,
  delay = 0,
}: {
  p: (typeof A2Z_PRODUTOS)[0];
  delay?: number;
}) {
  return (
    <Reveal delay={delay}>
      <a
        href={p.href}
        className="group relative block overflow-hidden rounded-xl transition-transform duration-500 hover:scale-[1.02]"
        style={{ backgroundColor: B.asfalto }}
      >
        <div className="relative h-[220px] overflow-hidden">
          <div
            className="absolute inset-0 scale-105 bg-cover bg-center transition-transform duration-700 group-hover:scale-110"
            style={{ backgroundImage: `url('${p.img}')` }}
          />
          <div
            className="absolute inset-0"
            style={{ background: `linear-gradient(to top, ${B.asfalto} 0%, transparent 55%)` }}
          />
          <div className="absolute right-4 top-4 text-lg">{p.bandeira}</div>
        </div>
        <div className="px-6 pb-6 pt-4">
          <p className="text-xs font-semibold uppercase tracking-[0.15em]" style={{ color: B.pedal }}>
            {p.subtitulo}
          </p>
          <h3 className="mt-1 font-display text-xl font-light" style={{ color: B.creme }}>
            {p.nome}
          </h3>
          <p className="mt-2 text-[13px] font-light leading-relaxed" style={{ color: B.granito }}>
            {p.desc}
          </p>
          <div className="mt-5 flex items-end justify-between">
            <div className="flex gap-4">
              <span className="text-xs" style={{ color: `${B.areia}cc` }}>{p.km}</span>
              <span className="text-xs" style={{ color: `${B.areia}cc` }}>{p.dias}</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-sm font-semibold" style={{ color: B.pedal }}>{p.preco}</span>
              <span
                className="transition-transform duration-300 group-hover:translate-x-1"
                style={{ color: B.pedal }}
              >
                →
              </span>
            </div>
          </div>
        </div>
      </a>
    </Reveal>
  );
}

/* ── PAGE ────────────────────────────────────────────────────── */
export default function BikePage() {
  return (
    <main className="relative" style={{ backgroundColor: B.creme }}>
      <Nav />

      {/* ── HERO ──────────────────────────────────────────────── */}
      <section className="grain relative min-h-[100svh] w-full overflow-hidden" style={{ backgroundColor: B.asfalto }}>
        <div
          className="absolute inset-0 scale-105 bg-cover bg-center opacity-50"
          style={{ backgroundImage: `url('${HERO_IMG}')` }}
        />
        <div
          className="absolute inset-0"
          style={{
            background: `linear-gradient(to right, ${B.asfalto} 50%, transparent 100%), linear-gradient(to top, ${B.asfalto} 0%, transparent 55%)`,
          }}
        />

        <div className="relative z-10 mx-auto flex min-h-[100svh] max-w-[1200px] flex-col justify-end px-6 pb-20 md:flex-row md:items-center md:pb-0 md:px-10">
          <div className="flex-1 md:pr-10">
            <motion.div
              initial={{ opacity: 0, y: 36 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, ease: EASE, delay: 0.2 }}
            >
              <Kicker color="" line="">
                <span style={{ color: B.pedal }}>—</span>
                <span style={{ color: B.areia }}>Segmento · Cicloturismo</span>
              </Kicker>
              <h1
                className="mt-4 font-display font-light uppercase leading-[0.82] tracking-[-0.02em]"
                style={{ fontSize: "clamp(4rem,13vw,11rem)", color: B.creme }}
              >
                Tours
                <br />
                <span style={{ color: B.pedal }}>de Bike</span>
              </h1>
              <p className="mt-6 max-w-md text-base font-light leading-relaxed md:text-lg" style={{ color: `${B.creme}bb` }}>
                Pedaladas que tem destino, historia e paisagem. Alforjes leves,
                estrada aberta e tudo organizado para você so precisar pedalar.
              </p>
              <div className="mt-3 flex items-center gap-3">
                <span className="text-sm font-light" style={{ color: B.areia }}>a partir de</span>
                <span className="font-display text-2xl font-light" style={{ color: B.creme }}>€ 1.207</span>
              </div>
              <div className="mt-7 flex flex-wrap gap-4">
                <a
                  href="#destinos"
                  className="inline-flex items-center gap-3 rounded-full px-8 py-4 text-[13px] font-semibold uppercase tracking-[0.16em] transition-all duration-300 hover:scale-[1.03]"
                  style={{ backgroundColor: B.pedal, color: B.creme }}
                >
                  Ver destinos →
                </a>
                <a
                  href="#contato"
                  className="inline-flex items-center gap-3 rounded-full border px-8 py-4 text-[13px] font-semibold uppercase tracking-[0.16em] transition-opacity hover:opacity-70"
                  style={{ borderColor: `${B.areia}40`, color: B.creme }}
                >
                  Falar com especialista
                </a>
              </div>
              <div className="mt-7">
                <Breadcrumb tone="dark" accent={B.pedal} items={[
                  { label: "Home", href: "/" },
                  { label: "Bike" },
                ]} />
              </div>
            </motion.div>
          </div>

          <div className="hidden md:flex md:w-[280px] md:items-center lg:w-[300px]">
            <motion.div
              className="w-full"
              style={{ height: 380 }}
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 1.2, ease: EASE, delay: 0.5 }}
            >
              <RotaBike />
            </motion.div>
          </div>
        </div>

        <motion.div
          className="absolute bottom-8 left-1/2 -translate-x-1/2"
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.6 }}
          transition={{ delay: 2, duration: 1 }}
        >
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            style={{ color: B.areia }}
            className="text-xl"
          >
            ↓
          </motion.div>
        </motion.div>
      </section>

      {/* ── MANIFESTO ─────────────────────────────────────────── */}
      <section className="px-6 py-24 md:px-10 md:py-32" style={{ backgroundColor: B.creme, color: B.texto }}>
        <div className="mx-auto max-w-[820px] text-center">
          <Reveal>
            <Kicker>A proposta AONIK</Kicker>
          </Reveal>
          <Reveal delay={0.1}>
            <p
              className="mt-6 font-display font-light leading-[1.25] tracking-[-0.01em]"
              style={{ fontSize: "clamp(1.5rem,3vw,2.4rem)", color: B.texto }}
            >
              A bicicleta tem um jeito de revelar o mundo que nenhum outro
              transporte consegue. Você vai rapido o suficiente para cobrir
              distância, mas lento o suficiente para ver{" "}
              <span className="italic" style={{ color: B.pedal }}>
                o que existe entre os pontos
              </span>
              .
            </p>
          </Reveal>
        </div>
      </section>

      {/* ── CICLOTURISMO — 3 pilares ──────────────────────────── */}
      <section className="px-6 py-24 md:px-10 md:py-28" style={{ backgroundColor: B.cremedp, color: B.texto }}>
        <div className="mx-auto max-w-[1180px]">
          <Reveal>
            <Kicker>Por que cicloturismo</Kicker>
          </Reveal>
          <Reveal delay={0.06}>
            <h2
              className="mt-3 font-display font-light"
              style={{ fontSize: "clamp(1.8rem,4vw,3rem)", color: B.texto }}
            >
              A filosofia da pedalada lenta
            </h2>
          </Reveal>
          <div className="mt-14 grid gap-x-10 gap-y-12 sm:grid-cols-3">
            {CICLOTURISMO.map((p, i) => (
              <Reveal key={p.n} delay={i * 0.08}>
                <div className="border-t pt-6" style={{ borderColor: `${B.pedal}30` }}>
                  <span className="font-display text-sm" style={{ color: B.pedal }}>{p.n}</span>
                  <h3 className="mt-2 font-display text-xl font-light md:text-2xl" style={{ color: B.texto }}>
                    {p.titulo}
                  </h3>
                  <p className="mt-3 text-[14px] font-light leading-relaxed" style={{ color: `${B.texto}88` }}>
                    {p.desc}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── DESTINOS PORTUGAL ─────────────────────────────────── */}
      <section id="destinos" className="px-6 py-24 md:px-10 md:py-28" style={{ backgroundColor: B.caminho }}>
        <div className="mx-auto max-w-[1180px]">

          {/* Header Portugal */}
          <Reveal>
            <div className="mb-3 flex items-center gap-3">
              <span className="text-2xl">🇵🇹</span>
              <Kicker color="" line="">
                <span style={{ color: B.pedal }}>—</span>
                <span style={{ color: B.areia }}>Portugal · Destinos</span>
              </Kicker>
            </div>
          </Reveal>
          <Reveal delay={0.06}>
            <h2
              className="mb-4 font-display font-light"
              style={{ fontSize: "clamp(2rem,5vw,3.8rem)", color: B.creme }}
            >
              Pedale Portugal
            </h2>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="mb-14 max-w-xl text-[15px] font-light leading-relaxed" style={{ color: B.granito }}>
              De norte a sul. Costa atlantica, planaltos medievais e o Vale do Douro. Três rotas de
              cicloturismo autoguiado, cada uma com carater e paisagem própria.
            </p>
          </Reveal>

          {/* A2Z — Cicloturismo (3 cards) */}
          <Reveal delay={0.08}>
            <p className="mb-6 text-[10px] font-bold uppercase tracking-[0.22em]" style={{ color: `${B.areia}88` }}>
              Cicloturismo · Portugal A2Z
            </p>
          </Reveal>
          <div className="grid gap-5 sm:grid-cols-3">
            {A2Z_PRODUTOS.map((p, i) => (
              <ProdutoCard key={p.nome} p={p} delay={i * 0.08} />
            ))}
          </div>

          {/* BuenCamino — Santiago a Pedal (2 cards) */}
          <Reveal delay={0.08}>
            <p className="mb-6 mt-14 text-[10px] font-bold uppercase tracking-[0.22em]" style={{ color: `${B.areia}88` }}>
              Caminhos de Santiago · a Pedal
            </p>
          </Reveal>
          <div className="grid gap-5 sm:grid-cols-2">
            {SANTIAGO_PRODUTOS.map((p, i) => (
              <ProdutoCard key={p.nome} p={p} delay={i * 0.1} />
            ))}
          </div>

          <Reveal delay={0.2}>
            <p className="mt-8 text-center text-sm font-light" style={{ color: B.granito }}>
              Os Caminhos de Santiago também estao disponiveis a pe.{" "}
              <a
                href="/jornada"
                className="underline underline-offset-4 transition-opacity hover:opacity-70"
                style={{ color: B.areia }}
              >
                Ver todos os roteiros de Compostela →
              </a>
            </p>
          </Reveal>
        </div>
      </section>

      {/* ── EM BREVE ──────────────────────────────────────────── */}
      <section className="px-6 py-24 md:px-10 md:py-28" style={{ backgroundColor: B.creme, color: B.texto }}>
        <div className="mx-auto max-w-[1180px]">
          <Reveal>
            <Kicker>Em desenvolvimento</Kicker>
          </Reveal>
          <Reveal delay={0.06}>
            <h2
              className="mt-4 font-display font-light"
              style={{ fontSize: "clamp(1.8rem,4vw,3rem)", color: B.texto }}
            >
              Novos destinos chegando
            </h2>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="mt-3 max-w-lg text-[15px] font-light leading-relaxed" style={{ color: `${B.texto}88` }}>
              Portugal e so o comeco. Estamos mapeando rotas de bike no Brasil, Espanha e Italia.
              Se quiser ser o primeiro a saber, fale com um especialista.
            </p>
          </Reveal>
          <div className="mt-12 grid gap-4 sm:grid-cols-3">
            {EM_BREVE.map((item, i) => (
              <Reveal key={item.nome} delay={i * 0.08}>
                <div
                  className="rounded-xl border p-6 transition-colors duration-300"
                  style={{ borderColor: `${B.pedal}25`, backgroundColor: `${B.pedal}08` }}
                >
                  <span className="text-3xl">{item.flag}</span>
                  <h3 className="mt-4 font-display text-xl font-light leading-tight" style={{ color: B.texto }}>
                    {item.nome}
                  </h3>
                  <p className="mt-1 text-sm font-light" style={{ color: `${B.texto}66` }}>{item.local}</p>
                  <a
                    href="#contato"
                    className="mt-5 inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.14em] transition-opacity hover:opacity-70"
                    style={{ color: B.pedal }}
                  >
                    Quero ser avisado →
                  </a>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <Contato />
      <Footer />
      <FloatingActions />
    </main>
  );
}
