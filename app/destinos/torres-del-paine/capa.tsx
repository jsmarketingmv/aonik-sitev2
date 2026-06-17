"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Nav from "../../components/Nav";
import Footer from "../../components/Footer";
import Contato from "../../components/Contato";
import FloatingActions from "../../components/FloatingActions";
import { Reveal, EASE } from "../../components/ui";
import { T, PROG, PHOTO, WMap, LocationMaps, HospModal, type HospModalData } from "./_shared";

/* ---------- dados da capa ---------- */
const PROGRAMAS = [
  { key: "journey" as const, slug: "w-journey", selo: "Novo · Guiado", nome: "W Journey Circuit", dn: "5 dias · 4 noites", estilo: "Guiado", dist: "69,5 km", preco: "US$ 2.800", destaque: "Host bilíngue do início ao fim e traslado privativo. Confirmação imediata de vagas.", img: PHOTO.prodPlus },
  { key: "express" as const, slug: "w-express", selo: "Menos dias", nome: "W Express", dn: "4 dias · 3 noites", estilo: "Autoguiado", dist: "69,5 km", preco: "US$ 1.491", destaque: "O W essencial em ritmo compacto: Base Torres, Cuernos, Vale do Francés e Glaciar Grey.", img: PHOTO.prodExpress },
  { key: "plus" as const, slug: "w-plus", selo: "Conforto + hotel", nome: "W+ Express Plus", dn: "5 dias · 4 noites", estilo: "Autoguiado", dist: "69,5 km", preco: "US$ 1.913", destaque: "O W completo, fechando com uma noite de conforto no Hotel Las Torres.", img: "/lastorres/hero.jpg" },
  { key: "tradicional" as const, slug: "w-tradicional", selo: "Clássico", nome: "W Tradicional", dn: "5 dias · 4 noites", estilo: "Autoguiado", dist: "75,5 km", preco: "US$ 1.687", destaque: "O circuito W mais clássico e completo, com a possibilidade de estender para 6 ou 7 dias.", img: PHOTO.prodTradicional },
];

const SETORES = [
  { nome: "Setor Central", desc: "Porta de entrada do parque. Hotel Las Torres, Welcome Center e ponto de partida para o Mirador Base Torres.", img: "/lastorres/sunset.jpg" },
  { nome: "Setor Chileno", desc: "Vale do Ascencio em floresta de lenga, o caminho clássico até o mirante das três torres de granito.", img: "/lastorres/torres.jpg" },
  { nome: "Setor Francês", desc: "O anfiteatro glacial entre o Paine Grande e os Cuernos del Paine, coração selvagem do circuito W.", img: "/lastorres/paisagem.jpg" },
  { nome: "Setor Cuernos", desc: "Margens turquesa do Lago Nordenskjöld, aos pés dos icônicos chifres de rocha do Paine.", img: PHOTO.prodTradicional },
  { nome: "Setor Paine Grande", desc: "Nas margens do Lago Pehoé, com vista privilegiada para os Cuernos. Acesso via catamarã, entrada do Grey.", img: "/torres-del-paine/setor-paine-grande.jpg" },
  { nome: "Setor Grey", desc: "O extremo oeste do W. O Glaciar Grey e seus icebergs azuis, no sopé do Campo de Hielo Sul.", img: "/torres-del-paine/setor-grey.jpg" },
];

const TABELA_ROWS: { label: string; vals: string[] }[] = [
  { label: "Duração", vals: ["5d · 4n", "4d · 3n", "5d · 4n", "5d · 4n"] },
  { label: "Estilo", vals: ["Guiado", "Autoguiado", "Autoguiado", "Autoguiado"] },
  { label: "Hospedagem", vals: ["4n refúgio ou camping", "3n refúgio ou camping", "3n + 1n Hotel Las Torres", "4n refúgio ou camping"] },
  { label: "Traslado", vals: ["Privativo", "Ônibus regular", "Ônibus + van", "Ônibus regular"] },
  { label: "Todas as refeições", vals: ["✓", "✓", "✓", "✓"] },
  { label: "Catamarã no Pehoé", vals: ["✓", "✓", "✓", "✓"] },
  { label: "Entradas do parque", vals: ["✓", "✓", "✓", "✓"] },
  { label: "Welcome kit", vals: ["✓", "✓", "✓", "✓"] },
  { label: "Temporada", vals: ["Out a Abr", "Out a Abr", "Out a Abr", "Out a Abr"] },
  { label: "Distância", vals: ["69,5 km", "69,5 km", "69,5 km", "75,5 km"] },
  { label: "A partir de", vals: ["US$ 2.800", "US$ 1.491", "US$ 1.913", "US$ 1.687"] },
];

const LT = "https://lastorres.com/content/uploads";
const HOSPEDAGENS: (HospModalData & { img: string; padrao: string; pontos: string[] })[] = [
  {
    nome: "Refúgios de montanha",
    tipo: "Padrão clássico do W",
    padrao: "Cama de verdade · banho quente",
    desc: "Dormitórios compartilhados aquecidos, com banho quente e refeições completas. A forma mais tradicional de percorrer o W, nos setores Paine Grande, Grey, Cuernos, Chileno e Central.",
    pontos: ["Dormitórios de 4 a 8 camas", "Banho quente e áreas comuns aquecidas", "Café da manhã, box lunch e jantar"],
    img: "/torres-del-paine/refugio-pg-4.jpg",
    imgs: [
      "/torres-del-paine/refugio-pg-4.jpg",
      `${LT}/1200-x-500-1-1.jpg`,
      `${LT}/1200x1000-1.jpg`,
      `${LT}/700-x-580-2-9.jpg`,
    ],
  },
  {
    nome: "Camping full equipado",
    tipo: "Padrão aventura premium",
    padrao: "Barraca pronta · zero mochila pesada",
    desc: "Tudo montado quando você chega: barraca em plataforma elevada, colchão de alta densidade, travesseiro e saco de dormir. Acampar com a logística resolvida e banho quente ao fim do dia.",
    pontos: ["Barraca em plataforma elevada", "Colchão, travesseiro e saco de dormir", "Banho quente e refeições no refúgio"],
    img: "https://www.vertice.travel/wp-content/uploads/2026/04/Vertice_Refugio_Camping_Paine_Grande_-20.jpg",
    imgs: [
      `${LT}/700-x-580-2-17.jpg`,
      `${LT}/1200-x-1000-14.jpg`,
      "/torres-del-paine/refugio-pg-1.jpg",
      "https://www.vertice.travel/wp-content/uploads/2026/04/Vertice_Refugio_Camping_Paine_Grande_-20.jpg",
    ],
  },
  {
    nome: "Hotel Las Torres",
    tipo: "Padrão conforto total",
    padrao: "Quarto privativo · vista para o maciço",
    desc: "A noite extra de conforto no Setor Central: quarto privativo com vista para o maciço das torres, restaurante e spa. Disponível nos programas W+ Express Plus e W Tradicional.",
    pontos: ["Quarto privativo com vista", "Restaurante e spa no Setor Central", "Última noite antes do retorno"],
    img: "/torres-del-paine/hotel-ext.jpg",
    imgs: [
      "/torres-del-paine/hotel-quarto.jpg",
      "/torres-del-paine/hotel-lounge.jpg",
      "/torres-del-paine/hotel-suite.jpg",
      "/torres-del-paine/hotel-ext.jpg",
      "/torres-del-paine/hotel-banho.jpg",
    ],
  },
];

const STATS = [
  { label: "Parque Nacional", value: "Torres del Paine" },
  { label: "Entre os parques mais visitados do mundo", value: "Top 10" },
  { label: "Circuito W", value: "até 75,5 km" },
  { label: "Temporada", value: "Out → Abr" },
];

export default function Capa() {
  const [hospModal, setHospModal] = useState<HospModalData | null>(null);
  return (
    <main className="relative" style={{ background: T.creme }}>
      <Nav />

      {/* HERO */}
      <section className="relative flex min-h-[100svh] w-full items-center overflow-hidden" style={{ background: T.ink }}>
        {/* Foto de fundo — Cuernos del Paine (torres visíveis) */}
        <motion.div className="absolute inset-0 bg-cover"
          style={{ backgroundImage: `url('${PHOTO.hero}')`, backgroundPosition: "center 30%" }}
          initial={{ scale: 1.08 }} animate={{ scale: 1 }} transition={{ duration: 2.4, ease: EASE }} />
        {/* Degradê para leitura do texto à esquerda, mantendo as torres visíveis à direita */}
        <div className="absolute inset-0" style={{ background: `linear-gradient(100deg, ${T.ink}f2 0%, ${T.ink}d9 32%, ${T.ink}80 55%, transparent 78%)` }} />
        <div className="absolute inset-x-0 bottom-0 h-40" style={{ background: `linear-gradient(to top, ${T.ink}, transparent)` }} />
        <div className="relative z-10 mx-auto w-full max-w-[1400px] px-6 py-28 md:px-10">
          <div className="max-w-xl">
            <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1, ease: EASE, delay: 0.2 }}
              className="text-[12px] font-medium uppercase tracking-[0.4em]" style={{ color: T.gelo }}>
              Caminhadas · Patagônia Chilena
            </motion.p>
            <motion.h1 initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1.1, ease: EASE, delay: 0.3 }}
              className="mt-5 font-display text-[clamp(2.8rem,7vw,6rem)] font-light uppercase leading-[0.86] tracking-[-0.02em]" style={{ color: T.creme }}>
              Torres<br />del Paine
            </motion.h1>
            <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1, ease: EASE, delay: 0.5 }}
              className="mt-6 max-w-md text-[15px] font-light leading-relaxed md:text-base" style={{ color: T.cSoft }}>
              A oitava maravilha do mundo, caminhada em comunidade.{" "}
              <span style={{ color: T.creme }}>Quatro formas de percorrer o lendário circuito W, com a logística toda cuidada pela AONIK.</span>
            </motion.p>
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1, ease: EASE, delay: 0.65 }}
              className="mt-8 flex flex-wrap items-center gap-5">
              <a href="#programas" className="inline-flex items-center gap-3 rounded-full px-8 py-4 text-[13px] font-semibold uppercase tracking-[0.16em] transition-transform duration-300 hover:scale-[1.03]"
                style={{ background: T.ouro, color: T.ink }}>
                Ver os 4 programas <span>→</span>
              </a>
              <a href="#contato" className="text-[12px] uppercase tracking-[0.16em]" style={{ color: T.creme }}>Falar com especialista</a>
            </motion.div>
          </div>
        </div>
      </section>

      {/* PATAGÔNIA CHILENA */}
      <section className="px-6 py-24 md:px-10 md:py-32" style={{ background: T.creme, color: T.ink }}>
        <div className="mx-auto grid max-w-[1180px] items-center gap-12 md:grid-cols-[0.85fr_1.15fr] md:gap-16">
          {/* Foto vertical icônica */}
          <Reveal>
            <div className="relative overflow-hidden rounded-2xl" style={{ aspectRatio: "3/4" }}>
              <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: `url('${PHOTO.patagonia}')` }} />
              <div className="absolute inset-0" style={{ background: `linear-gradient(to top, ${T.ink}b3, transparent 45%)` }} />
              <div className="absolute inset-x-0 bottom-0 p-6">
                <p className="text-[10px] font-semibold uppercase tracking-[0.3em]" style={{ color: T.ouroSoft }}>Cuernos del Paine</p>
                <p className="mt-1 font-display text-xl font-light" style={{ color: T.creme }}>O maciço sobre o Lago Pehoé</p>
              </div>
            </div>
          </Reveal>
          {/* Texto + fatos */}
          <Reveal delay={0.1}>
            <p className="text-[11px] font-semibold uppercase tracking-[0.34em]" style={{ color: T.ouro }}>Patagônia Chilena</p>
            <h2 className="mt-5 font-display text-[clamp(1.8rem,3.6vw,3rem)] font-light leading-[1.15]" style={{ color: T.granito }}>
              A última grande fronteira selvagem do planeta
            </h2>
            <p className="mt-6 text-[15px] font-light leading-relaxed" style={{ color: "rgba(12,18,25,0.66)" }}>
              Torres del Paine protege 227.000 hectares de natureza intocada na extremidade sul do Chile: torres de granito emergindo do altiplano, geleiras milenares, lagos de cor turquesa e fauna em liberdade. Pumas, guanacos, huemules e cóndores.
            </p>
            <p className="mt-4 text-[15px] font-light leading-relaxed" style={{ color: "rgba(12,18,25,0.66)" }}>
              Reserva de Biosfera pela UNESCO e constantemente eleito um dos parques nacionais mais impressionantes do mundo, recebe visitantes de outubro a abril, quando os longos dias da Patagônia revelam sua paleta completa.
            </p>
            <div className="mt-8 grid gap-4 sm:grid-cols-3">
              {[
                { t: "227 mil", d: "hectares protegidos" },
                { t: "Top 10", d: "parques mais visitados do mundo" },
                { t: "Out → Abr", d: "temporada de caminhada" },
              ].map((a) => (
                <div key={a.t} className="rounded-xl border p-5" style={{ borderColor: "rgba(27,39,51,0.14)" }}>
                  <p className="font-display text-2xl font-light" style={{ color: T.granito }}>{a.t}</p>
                  <p className="mt-1 text-[11px] uppercase tracking-[0.12em] leading-snug" style={{ color: T.ouro }}>{a.d}</p>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      {/* STATS */}
      <section className="px-6 py-14 md:px-10" style={{ background: T.granito }}>
        <div className="mx-auto grid max-w-[1280px] grid-cols-2 gap-6 md:grid-cols-4">
          {STATS.map((s, i) => (
            <Reveal key={s.label} delay={i * 0.06}>
              <div className="border-l pl-4" style={{ borderColor: T.line }}>
                <p className="font-display text-[clamp(1.5rem,3vw,2.4rem)] font-light" style={{ color: T.creme }}>{s.value}</p>
                <p className="mt-1 text-[11px] font-semibold uppercase tracking-[0.16em]" style={{ color: T.gelo }}>{s.label}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* LOCALIZAÇÃO */}
      <section className="px-6 py-24 md:px-10 md:py-28" style={{ background: T.ink }}>
        <div className="mx-auto max-w-[1100px]">
          <Reveal><p className="mb-3 text-[11px] font-semibold uppercase tracking-[0.32em]" style={{ color: T.gelo }}>Como chegar</p></Reveal>
          <Reveal delay={0.05}><h2 className="mb-10 max-w-2xl font-display text-[clamp(1.8rem,3.6vw,3rem)] font-light leading-[1.1]" style={{ color: T.creme }}>
            Na ponta sul da América do Sul
          </h2></Reveal>
          <Reveal delay={0.1}><LocationMaps /></Reveal>
          <Reveal delay={0.15}>
            <p className="mt-6 max-w-2xl text-[14px] font-light leading-relaxed" style={{ color: T.cSoft }}>
              Voo até Santiago (SCL) e conexão para Puerto Natales (PNT) ou Punta Arenas (PUQ). De Puerto Natales, a AONIK conduz você até o parque.
            </p>
          </Reveal>
        </div>
      </section>

      {/* MAPA DO W */}
      <section className="px-6 py-24 md:px-10 md:py-28" style={{ background: T.granito }}>
        <div className="mx-auto max-w-[1280px]">
          <Reveal><p className="mb-3 text-[11px] font-semibold uppercase tracking-[0.32em]" style={{ color: T.gelo }}>Mapa interativo</p></Reveal>
          <Reveal delay={0.05}><h2 className="mb-10 max-w-2xl font-display text-[clamp(1.8rem,3.6vw,3rem)] font-light leading-[1.1]" style={{ color: T.creme }}>
            O traçado do circuito W
          </h2></Reveal>
          <Reveal delay={0.1}><WMap accent={T.ouro} /></Reveal>
        </div>
      </section>

      {/* OS 5 SETORES */}
      <section className="px-6 py-24 md:px-10 md:py-28" style={{ background: T.creme, color: T.ink }}>
        <div className="mx-auto max-w-[1280px]">
          <Reveal><p className="mb-3 text-[11px] font-semibold uppercase tracking-[0.32em]" style={{ color: T.ouro }}>Os setores do W</p></Reveal>
          <Reveal delay={0.05}><h2 className="mb-10 max-w-2xl font-display text-[clamp(1.8rem,3.6vw,3rem)] font-light leading-[1.1]" style={{ color: T.granito }}>
            Cada dia, uma paisagem diferente
          </h2></Reveal>
          <div className="grid gap-x-5 gap-y-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6">
            {SETORES.map((s, i) => (
              <Reveal key={s.nome} delay={i * 0.05}>
                <div className="group">
                  <div className="relative h-56 overflow-hidden rounded-xl">
                    <div className="absolute inset-0 scale-105 bg-cover bg-center transition-transform duration-[1200ms] group-hover:scale-100" style={{ backgroundImage: `url('${s.img}')` }} />
                    <div className="absolute inset-0" style={{ background: `linear-gradient(to top, ${T.ink}99, transparent 45%)` }} />
                    <h3 className="absolute inset-x-0 bottom-0 p-4 font-display text-xl font-light" style={{ color: T.creme }}>{s.nome}</h3>
                  </div>
                  <p className="mt-3 text-[13px] font-light leading-relaxed" style={{ color: "rgba(12,18,25,0.6)" }}>{s.desc}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* CARDS DOS PROGRAMAS */}
      <section id="programas" className="scroll-mt-24 px-6 py-24 md:px-10 md:py-28" style={{ background: T.creme, color: T.ink }}>
        <div className="mx-auto max-w-[1280px]">
          <Reveal><p className="mb-3 text-[11px] font-semibold uppercase tracking-[0.32em]" style={{ color: T.ouro }}>Escolha o seu</p></Reveal>
          <Reveal delay={0.05}><h2 className="mb-10 max-w-2xl font-display text-[clamp(1.8rem,3.6vw,3rem)] font-light leading-[1.1]" style={{ color: T.granito }}>
            Quatro programas, um único parque lendário
          </h2></Reveal>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {PROGRAMAS.map((p, i) => (
              <Reveal key={p.slug} delay={i * 0.06}>
                <a href={`/destinos/torres-del-paine/${p.slug}`} className="group flex h-full flex-col overflow-hidden rounded-xl border" style={{ borderColor: "rgba(27,39,51,0.12)" }}>
                  <div className="relative h-52 overflow-hidden">
                    <div className="absolute inset-0 scale-105 bg-cover bg-center transition-transform duration-[1200ms] group-hover:scale-100" style={{ backgroundImage: `url('${p.img}')` }} />
                    <div className="absolute inset-0" style={{ background: `linear-gradient(to top, ${PROG[p.key].dark}f2, transparent 60%)` }} />
                    <span className="absolute left-4 top-4 rounded-full px-2.5 py-1 text-[9px] font-semibold uppercase tracking-[0.14em]" style={{ background: PROG[p.key].accent, color: T.creme }}>{p.selo}</span>
                    <div className="absolute inset-x-0 bottom-0 p-4">
                      <h3 className="font-display text-2xl font-light" style={{ color: T.creme }}>{p.nome}</h3>
                      <p className="text-[11px] uppercase tracking-[0.16em]" style={{ color: PROG[p.key].soft }}>{p.dn} · {p.estilo}</p>
                    </div>
                  </div>
                  <div className="flex flex-1 flex-col p-5">
                    <p className="flex-1 text-[13px] font-light leading-relaxed" style={{ color: "rgba(12,18,25,0.62)" }}>{p.destaque}</p>
                    <div className="mt-5 flex items-center justify-between border-t pt-4" style={{ borderColor: "rgba(27,39,51,0.12)" }}>
                      <span className="text-[12px] font-light" style={{ color: T.granito }}>a partir de <strong className="font-display text-base font-light" style={{ color: PROG[p.key].accent }}>{p.preco}</strong></span>
                      <span className="text-[11px] font-semibold uppercase tracking-[0.14em] transition-transform duration-300 group-hover:translate-x-1" style={{ color: PROG[p.key].accent }}>Ver →</span>
                    </div>
                  </div>
                </a>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* TABELA COMPARATIVA */}
      <section className="px-6 py-24 md:px-10 md:py-28" style={{ background: T.granito, color: T.creme }}>
        <div className="mx-auto max-w-[1280px]">
          <Reveal><p className="mb-3 text-[11px] font-semibold uppercase tracking-[0.32em]" style={{ color: T.gelo }}>Quadro comparativo</p></Reveal>
          <Reveal delay={0.05}><h2 className="mb-10 max-w-2xl font-display text-[clamp(1.8rem,3.6vw,3rem)] font-light leading-[1.1]">
            Conheça as 4 opções de aventura
          </h2></Reveal>
          <Reveal delay={0.1}>
            <div className="overflow-x-auto">
              <table className="w-full min-w-[760px] border-collapse text-left">
                <thead>
                  <tr>
                    <th className="w-[160px] p-3" />
                    {PROGRAMAS.map((p) => (
                      <th key={p.slug} className="p-3 align-bottom">
                        <span className="block rounded-full px-2.5 py-1 text-center text-[9px] font-semibold uppercase tracking-[0.12em]" style={{ background: PROG[p.key].accent, color: T.creme }}>{p.selo}</span>
                        <span className="mt-2 block font-display text-lg font-light" style={{ color: T.creme }}>{p.nome}</span>
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {TABELA_ROWS.map((r) => (
                    <tr key={r.label} style={{ borderTop: `1px solid ${T.line}` }}>
                      <td className="p-3 text-[11px] font-semibold uppercase tracking-[0.1em]" style={{ color: T.gelo }}>{r.label}</td>
                      {r.vals.map((v, i) => (
                        <td key={i} className="p-3 text-[13px] font-light" style={{ color: v === "✓" ? PROG[PROGRAMAS[i].key].soft : T.cInk }}>{v}</td>
                      ))}
                    </tr>
                  ))}
                  {/* CTA por coluna */}
                  <tr style={{ borderTop: `1px solid ${T.line}` }}>
                    <td className="p-3" />
                    {PROGRAMAS.map((p) => (
                      <td key={p.slug} className="p-3">
                        <a href={`/destinos/torres-del-paine/${p.slug}`}
                          className="inline-flex items-center gap-1.5 rounded-full px-4 py-2 text-[10px] font-semibold uppercase tracking-[0.14em] transition-all duration-300 hover:scale-[1.03]"
                          style={{ background: PROG[p.key].accent, color: T.creme }}>
                          Ver programa →
                        </a>
                      </td>
                    ))}
                  </tr>
                </tbody>
              </table>
            </div>
          </Reveal>
          <Reveal delay={0.15}>
            <ul className="mt-5 space-y-2">
              {[
                "Upgrade para cabanas no Setor Cuernos disponível (exceto no W Journey).",
                "Camping full equipado inclui barraca em altura, colchão de alta densidade, travesseiro e saco de dormir.",
              ].map((nota) => (
                <li key={nota} className="flex items-start gap-2 text-[12px] font-light leading-relaxed" style={{ color: T.cFaint }}>
                  <span className="mt-0.5 shrink-0" style={{ color: T.gelo }}>·</span>
                  {nota}
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
      </section>

      {/* HOSPEDAGENS */}
      <section className="px-6 py-24 md:px-10 md:py-28" style={{ background: T.granito, color: T.creme }}>
        <div className="mx-auto max-w-[1280px]">
          <Reveal><p className="mb-3 text-[11px] font-semibold uppercase tracking-[0.32em]" style={{ color: T.gelo }}>Onde você descansa</p></Reveal>
          <Reveal delay={0.05}><h2 className="max-w-2xl font-display text-[clamp(1.8rem,3.6vw,3rem)] font-light leading-[1.1]">
            Três padrões de hospedagem no W
          </h2></Reveal>
          <Reveal delay={0.08}><p className="mt-4 mb-10 max-w-xl text-[14px] font-light leading-relaxed" style={{ color: T.cSoft }}>
            Refúgio, camping equipado ou hotel: cada programa combina um nível de conforto. Toque para ver as fotos de cada padrão.
          </p></Reveal>
          <div className="grid gap-6 md:grid-cols-3">
            {HOSPEDAGENS.map((h, i) => (
              <Reveal key={h.nome} delay={i * 0.06}>
                <button
                  className="group flex h-full w-full flex-col overflow-hidden rounded-2xl border text-left transition-all duration-300 hover:-translate-y-1"
                  style={{ borderColor: T.line, background: T.granitoSoft }}
                  onClick={() => setHospModal({ nome: h.nome, tipo: h.tipo, desc: h.desc, imgs: h.imgs })}
                >
                  <div className="relative h-60 overflow-hidden">
                    <div className="absolute inset-0 scale-105 bg-cover bg-center transition-transform duration-[1200ms] group-hover:scale-110" style={{ backgroundImage: `url('${h.img}')` }} />
                    <div className="absolute inset-0" style={{ background: `linear-gradient(to top, ${T.ink}d9, transparent 55%)` }} />
                    <span className="absolute left-4 top-4 rounded-full px-3 py-1 text-[9px] font-semibold uppercase tracking-[0.16em]" style={{ background: "rgba(12,18,25,0.65)", color: T.gelo }}>{h.tipo}</span>
                    <div className="absolute inset-x-0 bottom-0 p-4">
                      <h3 className="font-display text-2xl font-light" style={{ color: T.creme }}>{h.nome}</h3>
                      <p className="mt-0.5 text-[11px] uppercase tracking-[0.12em]" style={{ color: T.ouroSoft }}>{h.padrao}</p>
                    </div>
                  </div>
                  <div className="flex flex-1 flex-col p-5">
                    <p className="text-[13px] font-light leading-relaxed" style={{ color: T.cSoft }}>{h.desc}</p>
                    <ul className="mt-4 space-y-2">
                      {h.pontos.map((pt) => (
                        <li key={pt} className="flex items-start gap-2 text-[12px] font-light" style={{ color: T.cInk }}>
                          <span className="mt-px shrink-0" style={{ color: T.ouro }}>✦</span>{pt}
                        </li>
                      ))}
                    </ul>
                    <span className="mt-5 inline-flex items-center gap-2 border-t pt-4 text-[11px] font-semibold uppercase tracking-[0.16em] transition-colors group-hover:opacity-90"
                      style={{ borderColor: T.line, color: T.ouro }}>
                      Ver galeria de fotos <span className="transition-transform duration-300 group-hover:translate-x-1">→</span>
                    </span>
                  </div>
                </button>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* AONIKIA */}
      <section className="px-6 py-20 md:px-10 md:py-24" style={{ background: T.ink }}>
        <div className="mx-auto max-w-[860px] text-center">
          <Reveal>
            <p className="text-[11px] font-semibold uppercase tracking-[0.3em]" style={{ color: T.gelo }}>AonikIA · especialista em Torres del Paine</p>
            <h2 className="mt-5 font-display text-[clamp(1.8rem,3.5vw,2.8rem)] font-light leading-[1.15]" style={{ color: T.creme }}>Qual programa combina com você?</h2>
            <p className="mx-auto mt-4 max-w-md text-[15px] font-light leading-relaxed" style={{ color: T.cSoft }}>
              Guiado ou autoguiado, refúgio ou camping, 4 ou 5 dias. Conte seu perfil que a AonikIA ajuda a escolher e te conecta com um especialista.
            </p>
            <a href="#contato" className="mt-7 inline-flex items-center gap-3 rounded-full border px-7 py-3.5 text-[12px] font-semibold uppercase tracking-[0.16em] transition-all duration-300" style={{ borderColor: T.gelo, color: T.gelo }}>
              Conversar com a AonikIA <span>→</span>
            </a>
          </Reveal>
        </div>
      </section>

      <Contato destino="PATAGÔNIA CHILENA - Torres del Paine" />
      <Footer />
      <FloatingActions />

      <HospModal data={hospModal} onClose={() => setHospModal(null)} accent={T.ouro} />
    </main>
  );
}
