"use client";

import { motion } from "framer-motion";
import Nav from "../components/Nav";
import Footer from "../components/Footer";
import Contato from "../components/Contato";
import FloatingActions from "../components/FloatingActions";
import Breadcrumb from "../components/Breadcrumb";
import { Reveal, Kicker, EASE } from "../components/ui";

const C = {
  porto:    "#220a11",
  noite:    "#130c0e",
  casca:    "#1e141a",
  vinho:    "#3f1521",
  ouro:     "#c4a56a",
  creme:    "#ede6dd",
  sage:     "#7a8f62",
  terracota:"#be6549",
  textSoft: "rgba(237,230,221,0.62)",
};

const wx = (file: string, w: number, h: number) =>
  `https://static.wixstatic.com/media/${file}/v1/fill/w_${w},h_${h},al_c,q_82,enc_avif,quality_auto/img.jpg`;
// PLACEHOLDER Unsplash p/ costa e peregrinação (trocar por fotos reais depois)
const un = (id: string) =>
  `https://images.unsplash.com/photo-${id}?q=80&w=800&h=560&auto=format&fit=crop`;

const HERO = "2d4f5b_edfea84f57b54f589aff44727039c42e~mv2.jpg";

const ROTEIROS = [
  {
    nome: "Douro Experience",
    sub: "Autoguiado",
    src: wx("2d4f5b_7edb87bf58444c00a4e2f0882eaff778~mv2.jpg", 800, 560),
    meta: "6 dias · 58,7 km · mín. 2 pessoas",
    desc: "A travessia clássica do Vale do Douro no seu ritmo, entre vinhas em socalcos, quintas com prova e aldeias vinhateiras.",
    preco: "a partir de € 1.557",
    href: "/caminhos-autoguiados/douro",
  },
  {
    nome: "Douro Luxury",
    sub: "Premium · Estadias em quintas",
    src: wx("2d4f5b_5a366974e9d24c1ab879fcf6eccb3a0c~mv2.jpeg", 800, 560),
    meta: "6 dias · 27,2 km · caminhadas curtas",
    desc: "O Douro em estado de luxo. Hospedagem em quintas históricas, provas de Vinho do Porto Vintage e o roteiro com o maior número de experiências exclusivas.",
    preco: "a partir de € 2.130",
    href: "/caminhos-autoguiados/douro-luxury",
  },
  {
    nome: "Santiago e Douro",
    sub: "Peregrinação + vinhas",
    src: wx("2d4f5b_80e678e6de65425f90c4b56c6f998776~mv2.jpg", 800, 560),
    meta: "13 dias · 133 km · Caminho Português + Douro",
    desc: "Da emoção da chegada à Catedral de Santiago ao silêncio das vinhas do Douro. Duas paisagens Patrimônio UNESCO em uma só jornada.",
    preco: "a partir de € 2.200",
    href: "/caminhos-autoguiados/santiago-e-douro",
  },
  {
    nome: "Rota Vicentina",
    sub: "Costa Atlântica · Alentejo",
    src: un("1505118380757-91f5f5632de0"),
    meta: "8 dias · 91,1 km · Trilho dos Pescadores",
    desc: "A costa mais selvagem da Europa, no sudoeste de Portugal. Falésias, praias desertas e o silêncio do Atlântico, no seu ritmo.",
    preco: "a partir de € 856",
    href: "/caminhos-autoguiados/rota-vicentina",
  },
  {
    nome: "Nazaré a Fátima",
    sub: "Peregrinação · Caminho de Fátima",
    src: un("1490730141103-6cac27aaab94"),
    meta: "6 dias · 56 km · do mar ao santuário",
    desc: "Uma peregrinação pelo coração de Portugal, do oceano de Nazaré aos mosteiros de Alcobaça e Batalha, até o Santuário de Fátima.",
    preco: "a partir de € 870",
    href: "/caminhos-autoguiados/nazare-a-fatima",
  },
];

export default function CaminhosPortugalHub() {
  return (
    <main className="relative" style={{ background: C.creme }}>
      <Nav />

      {/* ===== HERO ===== */}
      <section className="relative flex min-h-[78svh] w-full items-end overflow-hidden" style={{ background: C.noite }}>
        <motion.div className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url('${wx(HERO, 2400, 1400)}')` }}
          initial={{ scale: 1.1 }} animate={{ scale: 1 }} transition={{ duration: 14, ease: "easeOut" }} />
        <div className="absolute inset-0" style={{ background: `linear-gradient(to top, ${C.porto}f2 0%, ${C.porto}80 45%, ${C.porto}40 100%)` }} />

        <div className="relative z-10 mx-auto w-full max-w-[1180px] px-6 pb-16 md:px-10 md:pb-20">
          <motion.div initial={{ opacity: 0, y: 26 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1, ease: EASE, delay: 0.2 }}>
            <Kicker color="text-[#c4a56a]" line="bg-[#c4a56a]/50">
              Portugal · Caminhadas autoguiadas
            </Kicker>
            <h1 className="mt-3 font-display font-light uppercase leading-[0.9] tracking-[-0.02em] text-cream"
              style={{ fontSize: "clamp(2.6rem,9vw,7rem)" }}>
              Caminhos
              <br />
              <span style={{ color: C.ouro }}>de Portugal</span>
            </h1>
            <p className="mt-6 max-w-xl text-base font-light leading-relaxed text-cream/75">
              Das vinhas em socalcos do Douro à chegada na Catedral de Santiago. Roteiros
              desenhados para você caminhar no seu ritmo, com logística, hospedagens, mapas e
              provas de vinho já resolvidos.
            </p>
            <div className="mt-7">
              <Breadcrumb
                tone="dark"
                accent="#c4a56a"
                items={[
                  { label: "Home", href: "/" },
                  { label: "Caminhadas", href: "/caminhadas" },
                  { label: "Caminhos de Portugal" },
                ]}
              />
            </div>
          </motion.div>
        </div>
      </section>

      {/* ===== MANIFESTO ===== */}
      <section className="px-6 pt-24 pb-8 md:px-10 md:pt-32" style={{ background: C.creme }}>
        <div className="mx-auto max-w-[820px] text-center">
          <Reveal>
            <p className="text-[11px] font-semibold uppercase tracking-[0.4em]" style={{ color: C.sage }}>
              O terceiro pilar das caminhadas AONIK
            </p>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="mt-6 font-display text-[clamp(1.5rem,3vw,2.4rem)] font-light leading-[1.25] tracking-[-0.01em]" style={{ color: C.vinho }}>
              Portugal é feito para ser atravessado devagar. A gente cuida da logística para
              sobrar a você apenas{" "}
              <span className="italic" style={{ color: C.terracota }}>o caminho e a paisagem que vira vinho</span>.
            </p>
          </Reveal>
        </div>
      </section>

      {/* ===== ROTEIROS ===== */}
      <section className="px-6 py-16 md:px-10 md:py-24" style={{ background: C.creme }}>
        <div className="mx-auto max-w-[1180px]">
          <div className="grid gap-6 md:grid-cols-3">
            {ROTEIROS.map((r, i) => (
              <Reveal key={r.nome} delay={i * 0.08}>
                <a href={r.href} className="group flex h-full flex-col overflow-hidden rounded-2xl transition-all duration-300 hover:-translate-y-1"
                  style={{ background: C.casca, border: `1px solid rgba(196,165,106,0.18)` }}>
                  <div className="relative h-56 overflow-hidden">
                    <div className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-[1.05]"
                      style={{ backgroundImage: `url('${r.src}')` }} />
                    <div className="absolute inset-0" style={{ background: `linear-gradient(to top, ${C.casca} 4%, transparent 60%)` }} />
                    <span className="absolute left-4 top-4 rounded-full px-3 py-1 text-[9px] font-semibold uppercase tracking-[0.2em]"
                      style={{ background: "rgba(34,10,17,0.7)", color: C.ouro }}>{r.sub}</span>
                  </div>
                  <div className="flex flex-1 flex-col p-7">
                    <h3 className="font-display font-light leading-tight" style={{ fontSize: "1.6rem", color: C.creme }}>{r.nome}</h3>
                    <p className="mt-2 text-[11px] font-semibold uppercase tracking-[0.14em]" style={{ color: C.sage }}>{r.meta}</p>
                    <p className="mt-4 flex-1 text-[14px] font-light leading-relaxed" style={{ color: C.textSoft }}>{r.desc}</p>
                    <div className="mt-6 flex items-center justify-between border-t pt-5" style={{ borderColor: "rgba(196,165,106,0.16)" }}>
                      <span className="text-[13px] font-light" style={{ color: C.ouro }}>{r.preco}</span>
                      <span className="inline-flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.14em]" style={{ color: C.creme }}>
                        Ver roteiro
                        <span className="transition-transform duration-300 group-hover:translate-x-1">→</span>
                      </span>
                    </div>
                  </div>
                </a>
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
