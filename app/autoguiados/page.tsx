"use client";

import { motion } from "framer-motion";
import Nav from "../components/Nav";
import Footer from "../components/Footer";
import Contato from "../components/Contato";
import FloatingActions from "../components/FloatingActions";
import Breadcrumb from "../components/Breadcrumb";
import { Reveal, Kicker, EASE } from "../components/ui";

/* ───── NOVA PALETA ───── */
const C = {
  offwhite: "#F1F2EE",   // fundo global
  slate:    "#435058",   // dark teal-slate (hero bg, headings)
  steel:    "#848C8E",   // grey (eyebrows, borders)
  lime:     "#DCF763",   // accent neon-lime (CTAs, destaques)
  taupe:    "#BFB7B6",   // warm grey (soft text)
  ink:      "#1E2A30",   // texto principal
  limeLight:"rgba(220,247,99,0.12)",
  limeEdge: "rgba(220,247,99,0.28)",
  slateEdge:"rgba(67,80,88,0.18)",
};

/* ───── HELPER WIX ───── */
const wx = (id: string, w = 800, h = 560) =>
  `https://static.wixstatic.com/media/${id}/v1/fill/w_${w},h_${h},al_c,q_82,enc_avif,quality_auto/img.jpg`;

/* ───── IMAGENS ───── */
const IMG = {
  /* TDP */
  tdpHero:         "/torres-del-paine/patagonia.jpg",
  wTradicional:    "/torres-del-paine/prod-w-tradicional.jpg",
  wExpress:        "/torres-del-paine/prod-w-express.jpg",
  wPlus:           "/torres-del-paine/prod-w-plus.jpg",
  wJourney:        "/lastorres/exterior.jpg",
  /* Santiago */
  sgHero:          "https://static.wixstatic.com/media/2d4f5b_80e678e6de65425f90c4b56c6f998776~mv2.jpg/v1/fill/w_800,h_560,q_82,enc_avif,quality_auto/img.jpg",
  sgValenca:       wx("2d4f5b_596f7144ab49417692221a0fa9dab404~mv2.jpg"),
  sgCentral:       wx("2d4f5b_920e9f2265b149e69fcc012023b5026d~mv2.jpg"),
  sgCosta:         wx("2d4f5b_b673e91a63554b5e9fb4a39b74af2728~mv2.jpg"),
  /* Portugal */
  ptHero:          wx("2d4f5b_edfea84f57b54f589aff44727039c42e~mv2.jpg"),
  douroExp:        wx("2d4f5b_7edb87bf58444c00a4e2f0882eaff778~mv2.jpg"),
  douroLux:        wx("2d4f5b_5a366974e9d24c1ab879fcf6eccb3a0c~mv2.jpeg"),
  sgDouro:         wx("2d4f5b_80e678e6de65425f90c4b56c6f998776~mv2.jpg"),
  vicentina:       `https://images.unsplash.com/photo-1505118380757-91f5f5632de0?q=80&w=800&h=560&auto=format&fit=crop`,
  fatima:          `https://images.unsplash.com/photo-1490730141103-6cac27aaab94?q=80&w=800&h=560&auto=format&fit=crop`,
};


/* ───── DIFERENCIAIS ───── */
const DIFERENCIAIS = [
  {
    n: "01",
    titulo: "Logística resolvida",
    desc: "Transfers, hospedagens, mapas digitais e caderneta de rota impressa. Tudo entregue antes da partida.",
  },
  {
    n: "02",
    titulo: "Você no comando",
    desc: "Sem grupo fixo, sem guia, sem horário de saída. Você decide o ritmo, as pausas e o quanto caminha por dia.",
  },
  {
    n: "03",
    titulo: "Disponível o ano todo",
    desc: "Partidas flexíveis, sem datas fixas de grupo. Você viaja quando quiser, com quem quiser.",
  },
  {
    n: "04",
    titulo: "Suporte em rota",
    desc: "WhatsApp AONIK ativo durante toda a viagem. Para qualquer imprevisto, a gente está do outro lado.",
  },
];

/* ───── PRODUTOS POR CATEGORIA ───── */
const CAT_PATAGONIA = [
  { nome: "W Tradicional",  sub: "Autoguiado",       meta: "5d · 75,5km", preco: "US$ 1.874", img: IMG.wTradicional, href: "/destinos/torres-del-paine/w-tradicional" },
  { nome: "W Express",      sub: "Autoguiado",       meta: "4d · 69,5km", preco: "US$ 1.657", img: IMG.wExpress,     href: "/destinos/torres-del-paine/w-express" },
  { nome: "W Plus",         sub: "Autoguiado · Hotel",meta:"5d · 69,5km", preco: "US$ 2.126", img: IMG.wPlus,        href: "/destinos/torres-del-paine/w-plus" },
  { nome: "W Journey",      sub: "Com guia host",    meta: "5d · 69,5km", preco: "US$ 3.200", img: IMG.wJourney,     href: "/destinos/torres-del-paine/w-journey" },
];

const CAT_SANTIAGO = [
  { nome: "Caminho Português · Valença", sub: "Autoguiado", meta: "8d · 121km",   preco: "€ 810",   img: IMG.sgValenca, href: "/destinos/caminho-valenca-ape" },
  { nome: "Caminho Central",             sub: "Autoguiado", meta: "14d · 226km",  preco: "€ 1.466", img: IMG.sgCentral, href: "/destinos/caminho-central-ape" },
  { nome: "Caminho da Costa",            sub: "Autoguiado", meta: "15d · 260km",  preco: "€ 1.498", img: IMG.sgCosta,   href: "/destinos/caminho-costa-ape" },
  { nome: "Sarria · 7 Etapas",          sub: "Autoguiado", meta: "7d · 112km",   preco: "€ 580",   img: IMG.sgHero,    href: "/destinos/sarria-7-etapas" },
  { nome: "Caminho Easy",               sub: "Autoguiado", meta: "21d · 256km",  preco: "€ 2.359", img: IMG.sgValenca, href: "/destinos/caminho-easy-ape" },
  { nome: "Santiago a Finisterre",       sub: "Autoguiado", meta: "7d · 90km",    preco: "€ 791",   img: IMG.sgCosta,   href: "/destinos/santiago-finisterre" },
];

const CAT_PORTUGAL = [
  { nome: "Douro Experience",   sub: "Autoguiado",           meta: "6d · 58,7km", preco: "€ 1.557", img: IMG.douroExp,  href: "/caminhos-autoguiados/douro" },
  { nome: "Douro Luxury",       sub: "Premium · quintas",    meta: "6d · 27,2km", preco: "€ 2.130", img: IMG.douroLux,  href: "/caminhos-autoguiados/douro-luxury" },
  { nome: "Santiago e Douro",   sub: "Peregrinação + vinhas",meta:"13d · 133km",  preco: "€ 2.200", img: IMG.sgDouro,   href: "/caminhos-autoguiados/santiago-e-douro" },
  { nome: "Rota Vicentina",     sub: "Costa Atlântica",      meta: "8d · 91km",   preco: "€ 856",   img: IMG.vicentina, href: "/caminhos-autoguiados/rota-vicentina" },
  { nome: "Nazaré a Fátima",    sub: "Peregrinação",         meta: "6d · 56km",   preco: "€ 870",   img: IMG.fatima,    href: "/caminhos-autoguiados/nazare-a-fatima" },
];

/* ───── COMPONENTE CARD ───── */
function ProdCard({
  p, accentBg, accentText, darkBg,
}: {
  p: { nome: string; sub: string; meta: string; preco: string; img: string; href: string };
  accentBg: string; accentText: string; darkBg: string;
}) {
  return (
    <a
      href={p.href}
      className="group flex flex-col overflow-hidden rounded-2xl transition-all duration-300 hover:-translate-y-1"
      style={{ background: darkBg, border: "1px solid rgba(255,255,255,0.08)" }}
    >
      <div className="relative h-48 overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-[1.05]"
          style={{ backgroundImage: `url('${p.img}')` }}
        />
        <div className="absolute inset-0" style={{ background: `linear-gradient(to top, ${darkBg}f0 0%, transparent 55%)` }} />
        <span
          className="absolute left-4 top-4 rounded-full px-3 py-1 text-[9px] font-semibold uppercase tracking-[0.18em]"
          style={{ background: "rgba(0,0,0,0.55)", color: accentText }}
        >
          {p.sub}
        </span>
      </div>
      <div className="flex flex-1 flex-col p-6">
        <h4 className="font-display text-[1.2rem] font-light leading-tight text-white">{p.nome}</h4>
        <p className="mt-1 text-[10px] font-semibold uppercase tracking-[0.14em]" style={{ color: accentText }}>{p.meta}</p>
        <div className="mt-auto flex items-center justify-between border-t pt-4" style={{ borderColor: "rgba(255,255,255,0.1)", marginTop: "1rem" }}>
          <span className="text-[12px] font-light text-white/70">a partir de <strong className="font-display text-[1rem] font-light" style={{ color: accentText }}>{p.preco}</strong></span>
          <span className="text-[10px] font-semibold uppercase tracking-[0.12em] transition-transform duration-300 group-hover:translate-x-1" style={{ color: accentText }}>Ver →</span>
        </div>
      </div>
    </a>
  );
}

/* ───── SEÇÃO CATEGORIA ───── */
function CatSection({
  n, kicker, titulo, sub, desc, accent, darkBg, ctaHref, ctaLabel, children,
}: {
  n: string; kicker: string; titulo: string; sub?: string; desc: string;
  accent: string; darkBg: string; ctaHref: string; ctaLabel: string; children: React.ReactNode;
}) {
  return (
    <section className="px-6 py-20 md:px-10 md:py-28" style={{ background: darkBg }}>
      <div className="mx-auto max-w-[1180px]">
        <Reveal>
          <p className="text-[10px] font-semibold uppercase tracking-[0.35em]" style={{ color: accent, opacity: 0.7 }}>{kicker}</p>
        </Reveal>
        <Reveal delay={0.05}>
          <div className="mt-2 flex items-end gap-4">
            <span className="font-display text-[4rem] font-light leading-none opacity-15 text-white">{n}</span>
            <div>
              <h2 className="font-display text-[clamp(1.9rem,4vw,3rem)] font-light leading-none tracking-[-0.02em] text-white">{titulo}</h2>
              {sub && <p className="mt-1 text-[11px] font-semibold uppercase tracking-[0.14em]" style={{ color: accent }}>{sub}</p>}
            </div>
          </div>
        </Reveal>
        <Reveal delay={0.08}>
          <p className="mt-4 max-w-lg text-[14px] font-light leading-relaxed text-white/60">{desc}</p>
        </Reveal>

        <div className="mt-12">{children}</div>

        <Reveal delay={0.2}>
          <a
            href={ctaHref}
            className="mt-10 inline-flex items-center gap-3 rounded-full border px-8 py-4 text-[11px] font-semibold uppercase tracking-[0.16em] transition-all duration-300 hover:opacity-90"
            style={{ color: "white", borderColor: `${accent}55`, background: `${accent}18` }}
          >
            {ctaLabel} <span>→</span>
          </a>
        </Reveal>
      </div>
    </section>
  );
}

/* ───── PAGE ───── */
export default function AutoguiadosPage() {
  return (
    <main style={{ background: C.offwhite }}>
      <Nav />

      {/* ===== HERO ===== */}
      <section
        className="relative flex min-h-[100svh] w-full items-center overflow-hidden"
        style={{ background: C.slate }}
      >
        {/* Foto de fundo — Torres del Paine */}
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: "url('/torres-del-paine/prod-w-tradicional.jpg')", backgroundPosition: "center 30%" }}
        />
        {/* Gradiente: forte na esquerda para legibilidade, abre na direita para mostrar a foto */}
        <div
          className="absolute inset-0"
          style={{ background: `linear-gradient(100deg, ${C.slate}f8 0%, ${C.slate}e0 38%, ${C.slate}90 62%, ${C.slate}50 80%, transparent 100%)` }}
        />
        <div className="absolute inset-x-0 bottom-0 h-40" style={{ background: `linear-gradient(to top, ${C.slate}, transparent)` }} />

        <div className="relative z-10 mx-auto w-full max-w-[1180px] px-6 py-28 md:px-10">
          <motion.div initial={{ opacity: 0, y: 28 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1, ease: EASE, delay: 0.15 }}>
            <p className="text-[11px] font-semibold uppercase tracking-[0.38em]" style={{ color: C.lime }}>
              Formato Self-Guided · AONIK
            </p>
            <h1
              className="mt-4 font-display font-light uppercase leading-[0.88] tracking-[-0.03em] text-white"
              style={{ fontSize: "clamp(3.6rem,11vw,8rem)" }}
            >
              AUTO
              <br />
              <span style={{ color: C.lime }}>GUIADOS</span>
            </h1>
            <p className="mt-6 max-w-sm text-[15px] font-light leading-relaxed text-white/65">
              Você escolhe o destino, a data e o ritmo. A AONIK resolve toda a logística
              para que sobre apenas o essencial: caminhar.
            </p>

            {/* Stats */}
            <div className="mt-10 flex gap-8 border-t pt-8" style={{ borderColor: "rgba(220,247,99,0.2)" }}>
              {[
                { v: "3", l: "destinos" },
                { v: "15+", l: "roteiros" },
                { v: "6–21", l: "dias" },
              ].map((s) => (
                <div key={s.l}>
                  <div className="font-display text-[2.2rem] font-light leading-none" style={{ color: C.lime }}>{s.v}</div>
                  <div className="mt-1 text-[9px] font-semibold uppercase tracking-[0.18em] text-white/45">{s.l}</div>
                </div>
              ))}
            </div>

            <div className="mt-8 flex flex-wrap gap-4">
              <a
                href="#destinos"
                className="inline-flex items-center gap-3 rounded-full px-8 py-4 text-[12px] font-semibold uppercase tracking-[0.16em] transition-all duration-300 hover:scale-[1.03]"
                style={{ background: C.lime, color: C.slate }}
              >
                Explorar destinos <span>→</span>
              </a>
            </div>

            <div className="mt-8">
              <Breadcrumb tone="dark" accent={C.lime} items={[{ label: "Home", href: "/" }, { label: "Caminhadas", href: "/caminhadas" }, { label: "Autoguiados" }]} />
            </div>
          </motion.div>
        </div>
      </section>

      {/* ===== FRASE ===== */}
      <section className="px-6 py-24 md:px-10 md:py-32" style={{ background: C.offwhite }}>
        <div className="mx-auto max-w-[860px] text-center">
          <Reveal>
            <p className="text-[10px] font-semibold uppercase tracking-[0.38em]" style={{ color: C.steel }}>
              O modelo autoguiado
            </p>
          </Reveal>
          <Reveal delay={0.08}>
            <h2
              className="mt-5 font-display text-[clamp(1.8rem,3.5vw,3rem)] font-light leading-[1.2] tracking-[-0.015em]"
              style={{ color: C.ink }}
            >
              Toda a estrutura de uma viagem organizada,{" "}
              <em className="not-italic" style={{ color: C.slate }}>sem abrir mão da liberdade.</em>
            </h2>
          </Reveal>
          <Reveal delay={0.12}>
            <p className="mx-auto mt-6 max-w-xl text-[15px] font-light leading-relaxed" style={{ color: C.steel }}>
              Você chega, o alojamento está reservado, o mapa está no celular e a caderneta de rota
              está na mochila. O resto é só você, a paisagem e o próximo passo.
            </p>
          </Reveal>
        </div>
      </section>

      {/* ===== DIFERENCIAIS ===== */}
      <section className="px-6 pb-20 md:px-10 md:pb-28" style={{ background: C.offwhite }}>
        <div className="mx-auto max-w-[1180px]">
          <div className="grid items-stretch gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {DIFERENCIAIS.map((d, i) => (
              <Reveal key={d.n} delay={i * 0.07} className="h-full">
                <div
                  className="flex h-full flex-col rounded-2xl p-8"
                  style={{ background: C.slate, border: `1px solid ${C.slateEdge}` }}
                >
                  <span className="font-display text-[2.8rem] font-light leading-none" style={{ color: C.lime, opacity: 0.35 }}>{d.n}</span>
                  <h3 className="mt-4 font-display text-[1.2rem] font-light leading-tight text-white">{d.titulo}</h3>
                  <p className="mt-3 flex-1 text-[13px] font-light leading-relaxed" style={{ color: C.taupe }}>{d.desc}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ===== DESTINOS (CATEGORIAS) ===== */}
      <div id="destinos">

        {/* ── 01 PATAGÔNIA ── */}
        <CatSection
          n="01" kicker="Chile · Patagônia" titulo="Torres del Paine" sub="Circuito W"
          desc="Geleiras, torres de granito e fiordes no fim do mundo. O circuito W em quatro versões, do mais compacto ao mais confortável."
          accent="#7FD4E0" darkBg="#0E2A34"
          ctaHref="/destinos/torres-del-paine" ctaLabel="Conhecer Torres del Paine"
        >
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {CAT_PATAGONIA.map((p, i) => (
              <Reveal key={p.nome} delay={i * 0.07}>
                <ProdCard p={p} accentBg="#7FD4E0" accentText="#7FD4E0" darkBg="rgba(14,42,52,0.7)" />
              </Reveal>
            ))}
          </div>
        </CatSection>

        {/* ── 02 PEREGRINAÇÃO ── */}
        <CatSection
          n="02" kicker="Portugal · Espanha · Galiza" titulo="Caminho de Santiago" sub="Caminho Português"
          desc="A peregrinação mais famosa do mundo, no seu ritmo. Escolha a rota e o número de dias e caminhe até a Catedral de Santiago."
          accent="#6B9FCC" darkBg="#0A1935"
          ctaHref="/jornada" ctaLabel="Ver todos os roteiros de Santiago"
        >
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {CAT_SANTIAGO.map((p, i) => (
              <Reveal key={p.nome} delay={i * 0.06}>
                <ProdCard p={p} accentBg="#6B9FCC" accentText="#6B9FCC" darkBg="rgba(10,25,53,0.7)" />
              </Reveal>
            ))}
          </div>
        </CatSection>

        {/* ── 03 PORTUGAL ── */}
        <CatSection
          n="03" kicker="Portugal · Autoguiado" titulo="Caminhos de Portugal" sub="Norte ao sul"
          desc="Das vinhas em socalcos do Douro às falésias do Alentejo. Cinco roteiros pelo país mais caminhável da Europa."
          accent="#C4A56A" darkBg="#220A11"
          ctaHref="/caminhos-autoguiados" ctaLabel="Ver hub Caminhos de Portugal"
        >
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {CAT_PORTUGAL.map((p, i) => (
              <Reveal key={p.nome} delay={i * 0.07}>
                <ProdCard p={p} accentBg="#C4A56A" accentText="#C4A56A" darkBg="rgba(34,10,17,0.7)" />
              </Reveal>
            ))}
          </div>
        </CatSection>

      </div>

      {/* ===== PREFERE GRUPOS? ===== */}
      <section className="overflow-hidden px-6 py-20 md:px-10 md:py-28" style={{ background: C.ink }}>
        <div className="mx-auto max-w-[1180px]">
          <div className="grid grid-cols-1 gap-8 overflow-hidden rounded-2xl md:grid-cols-[1.1fr_0.9fr]" style={{ border: "1px solid rgba(220,247,99,0.12)" }}>
            {/* Texto */}
            <Reveal>
              <div className="flex flex-col justify-center gap-6 p-10 md:p-12">
                <p className="text-[10px] font-semibold uppercase tracking-[0.32em]" style={{ color: C.lime }}>
                  Prefere companhia?
                </p>
                <h2 className="font-display text-[clamp(1.8rem,4vw,3rem)] font-light leading-[1.1] text-white">
                  Prefere caminhar em grupo?
                </h2>
                <p className="max-w-md text-[14px] font-light leading-relaxed" style={{ color: C.taupe }}>
                  Se você quer a experiência completa com guia, saída confirmada, grupo pequeno e toda
                  a logística na mão de um especialista, os grupos AONIK são para você. TMB, Dolomitas,
                  Bavária, Tirol, Dana a Petra e mais.
                </p>
                <a
                  href="/grupos"
                  className="mt-2 inline-flex w-fit items-center gap-3 rounded-full px-9 py-4 text-[12px] font-semibold uppercase tracking-[0.18em] transition-all duration-300 hover:scale-[1.03]"
                  style={{ background: C.lime, color: C.slate }}
                >
                  Ver grupos com guia <span>→</span>
                </a>
              </div>
            </Reveal>
            {/* Foto igrejinha */}
            <Reveal delay={0.08} className="h-full">
              <div className="relative min-h-[300px] overflow-hidden md:min-h-0 md:rounded-none">
                <div
                  className="absolute inset-0 bg-cover bg-center transition-transform duration-700 hover:scale-[1.04]"
                  style={{ backgroundImage: "url('/images/grupos/dolomitas-igrejinha.jpg')" }}
                />
                <div className="absolute inset-0" style={{ background: "linear-gradient(to right, rgba(30,42,48,0.35), transparent)" }} />
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
