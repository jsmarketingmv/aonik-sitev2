"use client";

import { motion } from "framer-motion";
import Nav from "../../components/Nav";
import Footer from "../../components/Footer";
import Contato from "../../components/Contato";
import FloatingActions from "../../components/FloatingActions";
import { Reveal, EASE } from "../../components/ui";
import { A, AirArc } from "./_shared";

const CONCEITO = [
  { num: "01", t: "Pule a Passagem de Drake", d: "Um voo fretado de 2h leva você de Punta Arenas direto a King George Island. Sem dois dias de mar agitado." },
  { num: "02", t: "Mais tempo na Antártida", d: "Cada dia economizado no mar vira um dia a mais entre geleiras, icebergs e fauna polar." },
  { num: "03", t: "Navios boutique", d: "Máximo de 76 hóspedes. Íntimo o suficiente para chegar onde os grandes navios não vão." },
  { num: "04", t: "Pioneira do air-cruise", d: "A Antarctica21 inventou o conceito. Mais de uma década levando viajantes ao continente branco." },
];

const AIR_CRUISES = [
  {
    nome: "Antarctica Express",
    sub: "6 dias · voo + navegação",
    desc: "A travessia completa: voo sobre a Drake, Península Antártica, Cabo Horn e Canal Beagle em seis dias.",
    stats: [
      { label: "Duração", value: "6d / 5n" },
      { label: "Rota", value: "P. Arenas ↔ Ushuaia" },
      { label: "Navio", value: "Explorer / Discoverer" },
    ],
    preco: "a partir de US$ 6.795",
    href: "/destinos/antarctica21/express",
    img: "/antarctica21/ship-explorer-ice.webp",
    tag: "Air-Cruise",
    emBreve: false,
  },
  {
    nome: "Classic Antarctica",
    sub: "8 dias · 5 noites no gelo",
    desc: "A expedição mais procurada: Gerlache, Lemaire e Antarctic Sound em cinco noites de imersão na Península.",
    stats: [
      { label: "Duração", value: "8d / 7n" },
      { label: "Saída", value: "Punta Arenas" },
      { label: "Navio", value: "Explorer / Discoverer" },
    ],
    preco: "sob consulta",
    href: "",
    img: "/antarctica21/icebergs.webp",
    tag: "Air-Cruise",
    emBreve: true,
  },
  {
    nome: "Magellan Discoverer Inaugural",
    sub: "10 dias · viagem inaugural",
    desc: "A maiden voyage do novo navio híbrido, do Estreito de Magalhães à Península. Você entra para a história.",
    stats: [
      { label: "Duração", value: "10d / 9n" },
      { label: "Partida", value: "Dez 2026" },
      { label: "Navio", value: "Discoverer" },
    ],
    preco: "sob consulta",
    href: "",
    img: "/antarctica21/ship-discoverer.webp",
    tag: "Inaugural",
    emBreve: true,
  },
];

const SEA_VOYAGES = [
  {
    nome: "Patagônia & Chilean Fjords",
    sub: "9 dias · Puerto Montt ↔ Ushuaia",
    desc: "Navegação pura entre geleiras azuis e os picos dos Andes. San Rafael, Pío XI e a vila de Caleta Tortel.",
    stats: [
      { label: "Duração", value: "9d / 8n" },
      { label: "Rota", value: "Montt ↔ Ushuaia" },
      { label: "Saídas", value: "Set / Abr" },
    ],
    preco: "sob consulta",
    href: "",
    img: "/antarctica21/ship-glacier.webp",
    tag: "Sea Voyage",
    emBreve: true,
  },
  {
    nome: "Falkland Islands",
    sub: "10 dias · Ilhas Malvinas",
    desc: "A maior colônia de albatrozes do mundo, praias de pinguins-rei e vilarejos onde o tempo parou.",
    stats: [
      { label: "Duração", value: "10d / 9n" },
      { label: "Saída", value: "Ushuaia" },
      { label: "Partida", value: "Abr 2028" },
    ],
    preco: "sob consulta",
    href: "",
    img: "/antarctica21/penguins-beach.webp",
    tag: "Sea Voyage",
    emBreve: true,
  },
];

const OUTRAS = [
  { nome: "Polar Circle Air-Cruise", sub: "10 dias · cruzar o Círculo Polar Antártico" },
  { nome: "Antarctica & South Georgia", sub: "18 dias · dois destinos remotos em um" },
  { nome: "Falklands & South Georgia", sub: "Sea Voyage · fauna do Atlântico Sul" },
  { nome: "Falklands, S. Georgia & Antarctica", sub: "Sea Voyage · a grande travessia" },
];

const NAVIOS = [
  {
    nome: "Magellan Explorer",
    desc: "76 hóspedes e 60 tripulantes. Lançado em 2019 sob o Polar Code, com varandas privativas, lounge de observação, sauna e clínica médica. O navio que firmou a Antarctica21 no gelo.",
    img: "/antarctica21/ship-explorer.webp",
  },
  {
    nome: "Magellan Discoverer",
    desc: "O novo navio híbrido diesel-elétrico, classe de gelo PC6, com 76 hóspedes em 40 cabines, estética de iate boutique e proa acessível. Estreia na temporada 2026-27.",
    img: "/antarctica21/ship-discoverer.webp",
  },
];

function ProdutoCard({ r, i }: { r: typeof AIR_CRUISES[number]; i: number }) {
  const Tag = r.emBreve ? "div" : "a";
  return (
    <Reveal delay={i * 0.08}>
      <Tag {...(r.emBreve ? {} : { href: r.href })}
        className={`group block overflow-hidden rounded-2xl transition-transform duration-300 ${r.emBreve ? "" : "hover:-translate-y-1"}`}
        style={{ background: A.abismo }}>
        <div className="relative h-56 overflow-hidden md:h-64">
          <div className={`absolute inset-0 bg-cover bg-center transition-transform duration-[1400ms] ease-[cubic-bezier(0.16,1,0.3,1)] ${r.emBreve ? "" : "group-hover:scale-105"}`}
            style={{ backgroundImage: `url('${r.img}')` }} />
          <div className="absolute inset-0"
            style={{ background: `linear-gradient(to top, ${A.abismo} 0%, transparent 60%)` }} />
          <span className="absolute left-5 top-5 rounded-full px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.16em]"
            style={{ background: A.parka, color: A.gelo }}>
            {r.tag}
          </span>
          {r.emBreve && (
            <span className="absolute right-5 top-5 rounded-full border px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.16em]"
              style={{ borderColor: A.glacial, color: A.glacial, background: "rgba(7,21,31,0.55)" }}>
              Em breve
            </span>
          )}
        </div>
        <div className="p-7 md:p-8">
          <p className="text-[11px] font-semibold uppercase tracking-[0.2em]" style={{ color: A.glacial }}>{r.sub}</p>
          <h3 className="mt-2 font-display text-[clamp(1.5rem,2.4vw,2.1rem)] font-light" style={{ color: A.gelo }}>{r.nome}</h3>
          <p className="mt-3 text-[14px] font-light leading-relaxed" style={{ color: A.geloSoft }}>{r.desc}</p>
          <div className="mt-6 grid grid-cols-3 gap-3 border-t pt-5" style={{ borderColor: A.line }}>
            {r.stats.map((s) => (
              <div key={s.label}>
                <p className="text-[10px] font-semibold uppercase tracking-[0.14em]" style={{ color: A.geloFaint }}>{s.label}</p>
                <p className="mt-1 text-[12px] font-light" style={{ color: A.gelo }}>{s.value}</p>
              </div>
            ))}
          </div>
          <div className="mt-5 flex items-center justify-between">
            <span className="font-display text-lg font-light" style={{ color: A.geloSoft }}>{r.preco}</span>
            {r.emBreve ? (
              <span className="text-[12px] font-semibold uppercase tracking-[0.14em]"
                style={{ color: A.geloFaint }}>
                Em breve
              </span>
            ) : (
              <span className="text-[12px] font-semibold uppercase tracking-[0.14em] transition-transform duration-300 group-hover:translate-x-1"
                style={{ color: A.parkaSoft }}>
                Ver expedição →
              </span>
            )}
          </div>
        </div>
      </Tag>
    </Reveal>
  );
}

export default function Antarctica21HubPage() {
  return (
    <main className="relative" style={{ background: A.gelo }}>
      <Nav />

      {/* ===== HERO ===== */}
      <section className="relative flex min-h-[100svh] w-full items-center overflow-hidden" style={{ background: A.abismo }}>
        <div className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: "url('/antarctica21/explorer-fineart.webp')", opacity: 0.4 }} />
        <div className="absolute inset-0"
          style={{ background: `radial-gradient(ellipse at 32% 50%, transparent 22%, ${A.abismo} 78%)` }} />

        <div className="relative z-10 mx-auto grid w-full max-w-[1400px] items-center gap-10 px-6 py-28 md:grid-cols-[1.1fr_0.9fr] md:px-10">
          <div>
            <motion.p
              initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, ease: EASE, delay: 0.2 }}
              className="flex items-center gap-3 text-[12px] font-medium uppercase tracking-[0.4em]" style={{ color: A.glacial }}>
              <span className="h-px w-8" style={{ background: A.glacial }} />
              Antártida · Air-Cruise Expedition
            </motion.p>
            <motion.h1
              initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.1, ease: EASE, delay: 0.3 }}
              className="mt-5 font-display text-[clamp(2.8rem,8vw,7rem)] font-light uppercase leading-[0.84] tracking-[-0.02em]"
              style={{ color: A.gelo }}>
              Antarctica<span style={{ color: A.glacial }}>21</span>
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, ease: EASE, delay: 0.5 }}
              className="mt-6 max-w-lg text-[16px] font-light leading-relaxed" style={{ color: A.geloSoft }}>
              A pioneira do air-cruise antártico. Você{" "}
              <span style={{ color: A.gelo }}>voa sobre a Passagem de Drake</span> e
              navega a Antártida em navios boutique, saindo de Punta Arenas.
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, ease: EASE, delay: 0.65 }}
              className="mt-8 flex flex-wrap items-center gap-5">
              <a href="#expedicoes"
                className="inline-flex items-center gap-3 rounded-full px-8 py-4 text-[13px] font-semibold uppercase tracking-[0.16em] transition-transform duration-300 hover:scale-[1.03]"
                style={{ background: A.parka, color: A.gelo }}>
                Ver as expedições <span>↓</span>
              </a>
              <a href="/navegacao" className="text-[12px] uppercase tracking-[0.16em] transition-colors hover:text-[#6fa8c9]"
                style={{ color: A.geloFaint }}>
                Navegação AONIK
              </a>
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1.2, ease: EASE, delay: 0.3 }}
            className="mx-auto h-[500px] w-full max-w-[440px] md:h-[600px]">
            <AirArc />
          </motion.div>
        </div>
      </section>

      {/* ===== CONCEITO AIR-CRUISE ===== */}
      <section className="px-6 py-24 md:px-10 md:py-28" style={{ background: A.noite, color: A.gelo }}>
        <div className="mx-auto max-w-[1280px]">
          <Reveal>
            <p className="mb-3 text-[11px] font-semibold uppercase tracking-[0.34em]" style={{ color: A.parkaSoft }}>
              O conceito air-cruise
            </p>
          </Reveal>
          <Reveal delay={0.06}>
            <h2 className="mb-14 max-w-2xl font-display text-[clamp(1.9rem,3.8vw,3.2rem)] font-light leading-[1.1]">
              Voe a parte chata.{" "}
              <span className="italic" style={{ color: A.glacial }}>Navegue a parte inesquecível.</span>
            </h2>
          </Reveal>
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {CONCEITO.map((c, i) => (
              <Reveal key={c.num} delay={i * 0.06}>
                <div className="border-t pt-6" style={{ borderColor: A.line }}>
                  <span className="font-display text-sm" style={{ color: A.glacial }}>{c.num}</span>
                  <h3 className="mt-3 font-display text-xl font-light">{c.t}</h3>
                  <p className="mt-3 text-[14px] font-light leading-relaxed" style={{ color: A.geloSoft }}>{c.d}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ===== AIR-CRUISES ===== */}
      <section id="expedicoes" className="px-6 py-24 md:px-10 md:py-28" style={{ background: A.fundo }}>
        <div className="mx-auto max-w-[1280px]">
          <Reveal>
            <p className="text-[11px] font-semibold uppercase tracking-[0.34em]" style={{ color: A.glacial }}>
              Antarctic Air-Cruises
            </p>
          </Reveal>
          <Reveal delay={0.06}>
            <h2 className="mt-4 mb-12 max-w-xl font-display text-[clamp(1.8rem,3.4vw,2.8rem)] font-light leading-[1.1]"
              style={{ color: A.gelo }}>
              Voe para a Antártida
            </h2>
          </Reveal>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 md:gap-7">
            {AIR_CRUISES.map((r, i) => <ProdutoCard key={r.nome} r={r} i={i} />)}
          </div>
        </div>
      </section>

      {/* ===== SEA VOYAGES ===== */}
      <section className="px-6 py-24 md:px-10 md:py-28" style={{ background: A.noite }}>
        <div className="mx-auto max-w-[1280px]">
          <Reveal>
            <p className="text-[11px] font-semibold uppercase tracking-[0.34em]" style={{ color: A.glacial }}>
              Sea Voyages
            </p>
          </Reveal>
          <Reveal delay={0.06}>
            <h2 className="mt-4 mb-12 max-w-xl font-display text-[clamp(1.8rem,3.4vw,2.8rem)] font-light leading-[1.1]"
              style={{ color: A.gelo }}>
              Navegue os fiordes e as ilhas
            </h2>
          </Reveal>
          <div className="grid gap-6 md:grid-cols-2 md:gap-7">
            {SEA_VOYAGES.map((r, i) => <ProdutoCard key={r.nome} r={r} i={i} />)}
          </div>
        </div>
      </section>

      {/* ===== OUTRAS EXPEDIÇÕES (sob consulta) ===== */}
      <section className="px-6 py-20 md:px-10 md:py-24" style={{ background: A.fundo }}>
        <div className="mx-auto max-w-[1280px]">
          <Reveal>
            <p className="mb-8 text-[11px] font-semibold uppercase tracking-[0.32em]" style={{ color: A.parkaSoft }}>
              Outras expedições · em breve
            </p>
          </Reveal>
          <div className="grid gap-px overflow-hidden rounded-2xl sm:grid-cols-2" style={{ background: A.line }}>
            {OUTRAS.map((o, i) => (
              <Reveal key={o.nome} delay={i * 0.05}>
                <div className="flex items-center justify-between gap-4 p-6 md:p-7"
                  style={{ background: A.abismo }}>
                  <div>
                    <h3 className="font-display text-lg font-light" style={{ color: A.gelo }}>{o.nome}</h3>
                    <p className="mt-1 text-[13px] font-light" style={{ color: A.geloSoft }}>{o.sub}</p>
                  </div>
                  <span className="whitespace-nowrap rounded-full border px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.16em]"
                    style={{ borderColor: A.glacial, color: A.glacial }}>
                    Em breve
                  </span>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ===== OS NAVIOS ===== */}
      <section className="px-6 py-24 md:px-10 md:py-32" style={{ background: A.gelo, color: A.abismo }}>
        <div className="mx-auto max-w-[1280px]">
          <Reveal>
            <p className="mb-3 text-[11px] font-semibold uppercase tracking-[0.34em]" style={{ color: A.glacialDp }}>
              A frota
            </p>
          </Reveal>
          <Reveal delay={0.06}>
            <h2 className="mb-14 max-w-xl font-display text-[clamp(1.8rem,3.6vw,3rem)] font-light leading-[1.1]">
              Dois navios boutique, 76 hóspedes
            </h2>
          </Reveal>
          <div className="grid gap-10 md:grid-cols-2 md:gap-12">
            {NAVIOS.map((n, i) => (
              <Reveal key={n.nome} delay={i * 0.1}>
                <div>
                  <div className="relative h-[300px] overflow-hidden rounded-xl md:h-[340px]">
                    <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: `url('${n.img}')` }} />
                  </div>
                  <h3 className="mt-6 font-display text-2xl font-light">{n.nome}</h3>
                  <p className="mt-3 text-[15px] font-light leading-relaxed" style={{ color: "rgba(7,21,31,0.68)" }}>{n.desc}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ===== SOBRE A OPERADORA ===== */}
      <section className="px-6 py-24 md:px-10 md:py-32" style={{ background: A.abismo, color: A.gelo }}>
        <div className="mx-auto max-w-[860px] text-center">
          <Reveal>
            <p className="text-[11px] font-semibold uppercase tracking-[0.34em]" style={{ color: A.parkaSoft }}>
              Sobre a Antarctica21
            </p>
          </Reveal>
          <Reveal delay={0.08}>
            <h2 className="mt-6 font-display text-[clamp(1.8rem,3.8vw,3rem)] font-light leading-[1.15]">
              A operadora que inventou{" "}
              <span className="italic" style={{ color: A.glacial }}>o air-cruise antártico</span>
            </h2>
          </Reveal>
          <Reveal delay={0.14}>
            <p className="mx-auto mt-6 max-w-xl text-[15px] font-light leading-relaxed" style={{ color: A.geloSoft }}>
              Operando de Punta Arenas, a Antarctica21 foi a primeira a combinar voo e
              navegação para levar viajantes à Antártida sem cruzar a Drake de navio.
              Navios pequenos, guias especialistas e expedições íntimas no continente
              mais selvagem do planeta.
            </p>
          </Reveal>
          <Reveal delay={0.2}>
            <a href="#contato"
              className="mt-8 inline-flex items-center gap-3 rounded-full px-8 py-4 text-[13px] font-semibold uppercase tracking-[0.16em] transition-transform duration-300 hover:scale-[1.03]"
              style={{ background: A.parka, color: A.gelo }}>
              Falar com um especialista <span>→</span>
            </a>
          </Reveal>
        </div>
      </section>

      <Contato />
      <Footer />
      <FloatingActions />
    </main>
  );
}
