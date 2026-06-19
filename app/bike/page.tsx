"use client";

import { motion } from "framer-motion";
import Nav from "../components/Nav";
import Footer from "../components/Footer";
import Contato from "../components/Contato";
import FloatingActions from "../components/FloatingActions";
import { Reveal, Kicker, EASE } from "../components/ui";

/* ── PALETA ──────────────────────────────────────────────────── */
const B = {
  asfalto:  "#0c0a07",
  pedal:    "#d45820",  // assinatura laranja
  pedalSoft:"#e87a48",
  caminho:  "#171410",
  granito:  "#9a8a7a",
  areia:    "#c4a080",
  creme:    "#f2ede3",
  cremedp:  "#e8e0d0",
  texto:    "#1a1714",
};

const HERO_IMG =
  "https://images.unsplash.com/photo-1517649763962-0c623066013b?q=80&w=2400&auto=format&fit=crop";

/* ── SVG: Rota Costa Portuguesa Porto → Santiago ─────────────── */
function RotaBike() {
  return (
    <svg
      viewBox="0 0 280 400"
      xmlns="http://www.w3.org/2000/svg"
      className="h-full w-full"
      aria-hidden="true"
    >
      {/* oceano fundo */}
      <rect x="0" y="0" width="100" height="400" fill="rgba(20,40,60,0.25)" />

      {/* linha costeira */}
      <path
        d="M 88,395 C 82,350 74,310 80,270 C 86,230 78,190 72,155 C 66,118 78,80 82,38"
        fill="none"
        stroke="rgba(100,160,200,0.35)"
        strokeWidth="1.5"
      />

      {/* terra continental */}
      <path
        d="M 88,395 C 82,350 74,310 80,270 C 86,230 78,190 72,155 C 66,118 78,80 82,38
           L 280,38 L 280,395 Z"
        fill="rgba(18,14,10,0.5)"
      />

      {/* ROTA principal — animada */}
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

      {/* ATLÂNTICO label vertical */}
      <text
        x="44"
        y="220"
        fontSize="8"
        fill="rgba(120,180,220,0.55)"
        letterSpacing="3"
        textAnchor="middle"
        transform="rotate(-90,44,220)"
      >
        ATLÂNTICO
      </text>

      {/* WAYPOINTS */}
      {/* Porto */}
      <motion.circle
        cx="140" cy="378" r="5"
        fill={B.pedal}
        initial={{ scale: 0 }} animate={{ scale: 1 }}
        transition={{ delay: 0.8, duration: 0.4, ease: "backOut" }}
      />
      <text x="150" y="382" fontSize="12" fill={B.areia} fontWeight="500">Porto</text>

      {/* Viana do Castelo */}
      <motion.circle
        cx="125" cy="268" r="3.5"
        fill={B.pedal} opacity={0.85}
        initial={{ scale: 0 }} animate={{ scale: 1 }}
        transition={{ delay: 1.2, duration: 0.35, ease: "backOut" }}
      />
      <text x="134" y="272" fontSize="9.5" fill={B.granito}>Viana do Castelo</text>

      {/* Caminha */}
      <motion.circle
        cx="115" cy="178" r="3.5"
        fill={B.pedal} opacity={0.85}
        initial={{ scale: 0 }} animate={{ scale: 1 }}
        transition={{ delay: 1.5, duration: 0.35, ease: "backOut" }}
      />
      <text x="124" y="182" fontSize="9.5" fill={B.granito}>Caminha · fronteira</text>

      {/* Santiago */}
      <motion.circle
        cx="122" cy="42" r="6"
        fill={B.creme}
        initial={{ scale: 0 }} animate={{ scale: 1 }}
        transition={{ delay: 1.9, duration: 0.4, ease: "backOut" }}
      />
      <text x="134" y="47" fontSize="12" fill={B.creme} fontWeight="500">Santiago</text>

      {/* distância */}
      <text x="8" y="395" fontSize="9" fill={B.granito}>260 km · 9 dias</text>
    </svg>
  );
}

/* ── PILARES ─────────────────────────────────────────────────── */
const PILARES = [
  {
    n: "01",
    titulo: "Alforjes, não malas",
    desc: "A bagagem vai de pousada em pousada. Você pedala livre, só com o que cabe nas costas.",
  },
  {
    n: "02",
    titulo: "Bike de qualidade",
    desc: "Equipamentos selecionados para o tipo de terreno: asfalto, pedregulho ou terra.",
  },
  {
    n: "03",
    titulo: "Logística completa",
    desc: "Hospedagem reservada, roteiro detalhado e suporte se precisar. Você pedala, a gente resolve o resto.",
  },
  {
    n: "04",
    titulo: "Rotas com caráter",
    desc: "Escolhemos caminhos que têm história, paisagem e uma razão para existir. Não é trilha qualquer.",
  },
];

/* ── PRODUTOS CONFIRMADOS ────────────────────────────────────── */
const PRODUTOS = [
  {
    nome: "Bike Costa",
    subtitulo: "Caminho Português",
    bandeira: "🇵🇹 🇪🇸",
    desc: "A beira do Atlântico. Praias, dunas e aldeias piscatórias de Portugal rumo a Santiago.",
    km: "260 km",
    dias: "9 dias",
    preco: "a partir de € 1.390",
    href: "/jornada",
    img: "https://images.unsplash.com/photo-1500514966906-fe245eea9344?q=80&w=900&auto=format&fit=crop",
  },
  {
    nome: "Bike Central",
    subtitulo: "Caminho Português",
    bandeira: "🇵🇹 🇪🇸",
    desc: "Interior português. Paisagens de vinha, granito e aldeia. Rota histórica pelo coração de Portugal.",
    km: "240 km",
    dias: "8 dias",
    preco: "a partir de € 1.262",
    href: "/jornada",
    img: "https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?q=80&w=900&auto=format&fit=crop",
  },
];

/* ── EM BREVE ────────────────────────────────────────────────── */
const EM_BREVE = [
  { nome: "Coxilha Rica de Bike", local: "Serra Catarinense · Brasil", flag: "🇧🇷" },
  { nome: "Bike Portugal: Porto a Lisboa", local: "Via Atlântica · Portugal", flag: "🇵🇹" },
  { nome: "Bike Portugal: Aldeias Históricas", local: "Interior · Portugal", flag: "🇵🇹" },
];

/* ── PAGE ────────────────────────────────────────────────────── */
export default function BikePage() {
  return (
    <main className="relative" style={{ backgroundColor: B.creme }}>
      <Nav />

      {/* ── HERO ──────────────────────────────────────────────── */}
      <section
        className="grain relative min-h-[100svh] w-full overflow-hidden"
        style={{ backgroundColor: B.asfalto }}
      >
        {/* foto bg */}
        <div
          className="absolute inset-0 scale-105 bg-cover bg-center opacity-40"
          style={{ backgroundImage: `url('${HERO_IMG}')` }}
        />
        <div
          className="absolute inset-0"
          style={{
            background: `linear-gradient(to right, ${B.asfalto} 55%, transparent 100%), linear-gradient(to top, ${B.asfalto} 0%, transparent 60%)`,
          }}
        />

        <div className="relative z-10 mx-auto flex min-h-[100svh] max-w-[1200px] flex-col justify-end px-6 pb-20 md:flex-row md:items-center md:pb-0 md:px-10">
          {/* texto esquerdo */}
          <div className="flex-1 md:pr-10">
            <motion.div
              initial={{ opacity: 0, y: 36 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, ease: EASE, delay: 0.2 }}
            >
              <Kicker color="" line="">
                <span style={{ color: B.pedal }}>— </span>
                <span style={{ color: B.areia }}>Segmento · Tours de Bike</span>
              </Kicker>
              <h1
                className="mt-4 font-display font-light uppercase leading-[0.82] tracking-[-0.02em]"
                style={{
                  fontSize: "clamp(4.5rem,14vw,12rem)",
                  color: B.creme,
                }}
              >
                Tours
                <br />
                <span style={{ color: B.pedal }}>de Bike</span>
              </h1>
              <p
                className="mt-6 max-w-md text-base font-light leading-relaxed md:text-lg"
                style={{ color: `${B.creme}bb` }}
              >
                Pedaladas que têm destino, história e paisagem. Alforjes leves,
                estrada aberta e tudo organizado para que você só precise pedalar.
              </p>
              <div className="mt-4 flex items-center gap-3">
                <span
                  className="text-sm font-light"
                  style={{ color: B.areia }}
                >
                  a partir de
                </span>
                <span
                  className="font-display text-2xl font-light"
                  style={{ color: B.creme }}
                >
                  € 1.262
                </span>
              </div>
              <a
                href="#contato"
                className="mt-8 inline-flex items-center gap-3 rounded-full px-8 py-4 text-[13px] font-semibold uppercase tracking-[0.16em] transition-all duration-300 hover:scale-[1.03]"
                style={{ backgroundColor: B.pedal, color: B.creme }}
              >
                Quero pedalar
                <span>→</span>
              </a>
            </motion.div>
          </div>

          {/* SVG rota direito */}
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

        {/* scroll indicator */}
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
      <section
        className="px-6 py-24 md:px-10 md:py-32"
        style={{ backgroundColor: B.creme, color: B.texto }}
      >
        <div className="mx-auto max-w-[820px] text-center">
          <Reveal>
            <Kicker>Como a AONIK faz bike</Kicker>
          </Reveal>
          <Reveal delay={0.1}>
            <p
              className="mt-6 font-display font-light leading-[1.25] tracking-[-0.01em]"
              style={{
                fontSize: "clamp(1.5rem,3vw,2.4rem)",
                color: B.texto,
              }}
            >
              A bicicleta tem um jeito de revelar o mundo que nenhum outro
              transporte consegue. Você vai rápido o suficiente para cobrir
              distância, mas lento o suficiente para ver{" "}
              <span className="italic" style={{ color: B.pedal }}>
                o que existe entre os pontos
              </span>
              .
            </p>
          </Reveal>
        </div>
      </section>

      {/* ── PILARES ───────────────────────────────────────────── */}
      <section
        className="px-6 py-24 md:px-10 md:py-28"
        style={{ backgroundColor: B.cremedp, color: B.texto }}
      >
        <div className="mx-auto max-w-[1180px]">
          <Reveal>
            <Kicker>O que está incluído</Kicker>
          </Reveal>
          <div className="mt-12 grid gap-x-10 gap-y-12 sm:grid-cols-2">
            {PILARES.map((p, i) => (
              <Reveal key={p.n} delay={i * 0.07}>
                <div
                  className="border-t pt-6"
                  style={{ borderColor: `${B.pedal}30` }}
                >
                  <span
                    className="font-display text-sm"
                    style={{ color: B.pedal }}
                  >
                    {p.n}
                  </span>
                  <h3
                    className="mt-2 font-display text-2xl font-light md:text-3xl"
                    style={{ color: B.texto }}
                  >
                    {p.titulo}
                  </h3>
                  <p
                    className="mt-3 max-w-sm text-[15px] font-light leading-relaxed"
                    style={{ color: `${B.texto}88` }}
                  >
                    {p.desc}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── CAMINHO PORTUGUÊS — PRODUTOS CONFIRMADOS ─────────── */}
      <section
        className="px-6 py-24 md:px-10 md:py-28"
        style={{ backgroundColor: B.caminho }}
      >
        <div className="mx-auto max-w-[1180px]">
          <Reveal>
            <Kicker color="" line="">
              <span style={{ color: B.pedal }}>— </span>
              <span style={{ color: B.areia }}>Caminho Português de Bike</span>
            </Kicker>
          </Reveal>
          <Reveal delay={0.08}>
            <h2
              className="mt-4 font-display text-[clamp(2rem,5vw,3.8rem)] font-light leading-tight"
              style={{ color: B.creme }}
            >
              Porto até Santiago,
              <br />
              de bicicleta
            </h2>
          </Reveal>
          <Reveal delay={0.14}>
            <p
              className="mt-4 max-w-xl text-[15px] font-light leading-relaxed"
              style={{ color: `${B.granito}` }}
            >
              Os caminhos mais históricos da peregrinação europeia agora também a
              pedal. Duas variantes: pela costa atlântica ou pelo interior de
              Portugal. Bagagem transferida, hospedagem reservada e roteiro na
              palma da mão.
            </p>
          </Reveal>

          <div className="mt-14 grid gap-6 sm:grid-cols-2">
            {PRODUTOS.map((p, i) => (
              <Reveal key={p.nome} delay={i * 0.1}>
                <a
                  href={p.href}
                  className="group relative block overflow-hidden rounded-xl transition-transform duration-500 hover:scale-[1.02]"
                  style={{ backgroundColor: "#1e1916" }}
                >
                  {/* foto */}
                  <div className="relative h-[260px] overflow-hidden">
                    <div
                      className="absolute inset-0 scale-105 bg-cover bg-center transition-transform duration-700 group-hover:scale-110"
                      style={{ backgroundImage: `url('${p.img}')` }}
                    />
                    <div
                      className="absolute inset-0"
                      style={{
                        background: `linear-gradient(to top, #1e1916 0%, transparent 55%)`,
                      }}
                    />
                    <div className="absolute right-4 top-4 flex gap-1 text-lg">
                      {p.bandeira}
                    </div>
                  </div>

                  {/* info */}
                  <div className="px-6 pb-7 pt-4">
                    <p
                      className="text-xs font-semibold uppercase tracking-[0.15em]"
                      style={{ color: B.pedal }}
                    >
                      {p.subtitulo}
                    </p>
                    <h3
                      className="mt-1 font-display text-2xl font-light"
                      style={{ color: B.creme }}
                    >
                      {p.nome}
                    </h3>
                    <p
                      className="mt-2 text-[14px] font-light leading-relaxed"
                      style={{ color: B.granito }}
                    >
                      {p.desc}
                    </p>

                    <div className="mt-5 flex items-end justify-between">
                      <div className="flex gap-4">
                        <span
                          className="text-xs"
                          style={{ color: `${B.areia}cc` }}
                        >
                          {p.km}
                        </span>
                        <span
                          className="text-xs"
                          style={{ color: `${B.areia}cc` }}
                        >
                          {p.dias}
                        </span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span
                          className="text-sm font-semibold"
                          style={{ color: B.pedal }}
                        >
                          {p.preco}
                        </span>
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
            ))}
          </div>

          <Reveal delay={0.2}>
            <p
              className="mt-8 text-center text-sm font-light"
              style={{ color: B.granito }}
            >
              Produtos autoguiados. Transfer de bagagem incluído.
              <a
                href="/jornada"
                className="ml-2 underline underline-offset-4 transition-opacity hover:opacity-70"
                style={{ color: B.areia }}
              >
                Ver todos os roteiros de Compostela →
              </a>
            </p>
          </Reveal>
        </div>
      </section>

      {/* ── EM BREVE ──────────────────────────────────────────── */}
      <section
        className="px-6 py-24 md:px-10 md:py-28"
        style={{ backgroundColor: B.creme, color: B.texto }}
      >
        <div className="mx-auto max-w-[1180px]">
          <Reveal>
            <Kicker>Em desenvolvimento</Kicker>
          </Reveal>
          <Reveal delay={0.08}>
            <h2
              className="mt-4 font-display text-[clamp(1.8rem,4vw,3rem)] font-light"
              style={{ color: B.texto }}
            >
              Novos destinos chegando
            </h2>
          </Reveal>
          <Reveal delay={0.12}>
            <p
              className="mt-3 max-w-lg text-[15px] font-light leading-relaxed"
              style={{ color: `${B.texto}88` }}
            >
              Estamos mapeando novas rotas de bike. Se quiser ser avisado quando
              abrir vagas, fale com um especialista.
            </p>
          </Reveal>

          <div className="mt-12 grid gap-4 sm:grid-cols-3">
            {EM_BREVE.map((item, i) => (
              <Reveal key={item.nome} delay={i * 0.08}>
                <div
                  className="group rounded-xl border p-6 transition-colors duration-300"
                  style={{
                    borderColor: `${B.pedal}25`,
                    backgroundColor: `${B.pedal}08`,
                  }}
                >
                  <span className="text-3xl">{item.flag}</span>
                  <h3
                    className="mt-4 font-display text-xl font-light leading-tight"
                    style={{ color: B.texto }}
                  >
                    {item.nome}
                  </h3>
                  <p
                    className="mt-1 text-sm font-light"
                    style={{ color: `${B.texto}66` }}
                  >
                    {item.local}
                  </p>
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
