"use client";

import { motion } from "framer-motion";
import Nav from "../../../components/Nav";
import Breadcrumb from "../../../components/Breadcrumb";
import Footer from "../../../components/Footer";
import Contato from "../../../components/Contato";
import FloatingActions from "../../../components/FloatingActions";
import { Reveal, EASE } from "../../../components/ui";
import { A, AirArc, Galeria } from "../_shared";

/* ============================================================
   ANTARCTICA EXPRESS AIR-CRUISE — 6 dias / 5 noites
   Voo + navegação entre Punta Arenas e Ushuaia.
   Fotos reais Antarctica21 em /public/antarctica21.
   Tarifa balcão: site − 15% ÷ 0.75
   Explorer US$ 6.795 · Discoverer US$ 9.628
   ============================================================ */
const F = "/antarctica21";

const STATS = [
  { label: "Duração", value: "6d / 5n" },
  { label: "Hóspedes", value: "76 máx." },
  { label: "Rota", value: "P. Arenas ↔ Ushuaia" },
  { label: "A partir de", value: "US$ 6.795" },
];

const DESTAQUES = [
  { num: "01", t: "Voo + navegação", d: "Você voa um trecho sobre a Drake e navega o outro. A experiência completa da travessia em apenas 6 dias." },
  { num: "02", t: "Cabo Horn", d: "Desembarque de Zodiac na ilha lendária do fim do continente, um privilégio de pouquíssimos viajantes no mundo." },
  { num: "03", t: "Puerto Williams", d: "A cidade mais austral do planeta, no Canal Beagle. Uma escala que quase nenhum roteiro antártico faz." },
  { num: "04", t: "Shetland do Sul", d: "Baías cheias de gelo, icebergs e o primeiro desembarque em uma colônia de pinguins." },
  { num: "05", t: "Fauna da Convergência", d: "Albatrozes, petréis, focas e baleias acompanham a travessia do lounge panorâmico ou dos decks." },
  { num: "06", t: "Luz antártica", d: "Dias longuíssimos do verão polar: a exploração avança noite adentro." },
];

const ROTEIRO = [
  { d: "01", t: "Punta Arenas · Explorers House", s: "Recepção pela equipe Antarctica21, briefing obrigatório na Explorers House e jantar de boas-vindas com menu regional." },
  { d: "02", t: "Voo para a Antártida", s: "Voo fretado de 2h de Punta Arenas a King George Island, nas Shetland do Sul. Embarque no navio de expedição." },
  { d: "03", t: "Explorando a Antártida", s: "Baías de gelo, aves marinhas, focas e baleias. Zodiac até uma colônia de pinguins e exploração até o fim da longa luz polar." },
  { d: "04-05", t: "Passagem de Drake", s: "Navegação rumo ao norte com palestras e observação de fauna: albatrozes, petréis e baleias do lounge envidraçado." },
  { d: "06", t: "Cabo Horn · Puerto Williams · Ushuaia", s: "Se o tempo permitir, Zodiac até o lendário Cabo Horn. Canal Beagle, Puerto Williams e chegada em Ushuaia." },
];

const INCLUSO = [
  "Cruzeiro de expedição + voo entre King George Island e Punta Arenas",
  "Uma noite de hotel com café em Punta Arenas (Cabo de Hornos ou similar)",
  "Café e almoço buffet, jantar à la carte a bordo",
  "Bebidas: vinho, cerveja, sucos, refrigerantes, café, chá e snacks",
  "Todas as excursões guiadas em terra, palestras e entretenimento",
  "Empréstimo de botas impermeáveis para os desembarques",
  "Plano de contingência e taxa de passageiro IAATO",
  "Transfers em grupo e acesso exclusivo à Explorers House",
];

const BORDO = [
  { img: `${F}/suite-penthouse.webp`, t: "Cabines e suítes", d: "Sete categorias no Explorer, a maioria com varanda privativa. No Discoverer, 40 cabines em três decks." },
  { img: `${F}/dining.webp`, t: "Gastronomia a bordo", d: "Restaurante elegante com jantar à la carte, vinhos e o gelo passando pelas janelas." },
  { img: `${F}/view-onboard.webp`, t: "Lounge panorâmico", d: "Observação envidraçada, bar, biblioteca, sauna e academia. O continente branco em conforto de boutique." },
];

const NAVIOS = [
  {
    nome: "Magellan Explorer",
    tarifa: "a partir de US$ 6.795",
    img: `${F}/ship-explorer.webp`,
    d: "Lançado em 2019 sob o Polar Code, para 76 hóspedes. Varandas privativas, lounge de observação, sauna, academia e clínica médica a bordo.",
  },
  {
    nome: "Magellan Discoverer",
    tarifa: "a partir de US$ 9.628",
    img: `${F}/ship-discoverer.webp`,
    d: "O novo navio híbrido diesel-elétrico, classe de gelo PC6. Estética de iate boutique, proa acessível aos hóspedes e estreia na temporada 2026-27.",
  },
];

const GALERIA = [
  { src: `${F}/ship-explorer-ice.webp`, cap: "Magellan Explorer entre os gelos da Península", tag: "Navio" },
  { src: `${F}/cape-horn.webp`, cap: "Cabo Horn: a escadaria do fim do continente", tag: "Cabo Horn" },
  { src: `${F}/zodiac.webp`, cap: "Zodiacs explorando os paredões dos canais", tag: "Zodiac" },
  { src: `${F}/penguins-beach.webp`, cap: "Colônia de pinguins na praia de areia negra", tag: "Pinguins" },
  { src: `${F}/whale.webp`, cap: "Baleia saltando nas águas antárticas", tag: "Fauna" },
  { src: `${F}/icebergs.webp`, cap: "Icebergs gigantes na Passagem de Drake", tag: "Gelo" },
  { src: `${F}/trekking.webp`, cap: "Caminhada guiada na neve antártica", tag: "Trekking" },
  { src: `${F}/chinstrap.avif`, cap: "Pinguim-de-barbicha nas Shetland do Sul", tag: "Fauna" },
  { src: `${F}/damoy-point.webp`, cap: "Desembarque em Damoy Point", tag: "Expedição" },
  { src: `${F}/plane.webp`, cap: "O avião que salta a Passagem de Drake", tag: "Air-Cruise" },
];

export default function ExpressPage() {
  return (
    <main className="relative" style={{ background: A.gelo }}>
      <Nav />

      {/* ===== HERO ===== */}
      <section className="relative flex min-h-[100svh] w-full items-center overflow-hidden"
        style={{ background: A.abismo }}>
        <div className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url('${F}/ship-explorer-ice.webp')`, opacity: 0.42 }} />
        <div className="absolute inset-0"
          style={{ background: `radial-gradient(ellipse at 32% 50%, transparent 20%, ${A.abismo} 78%)` }} />

        <div className="relative z-10 mx-auto grid w-full max-w-[1400px] items-center gap-10 px-6 py-28 md:grid-cols-[1.1fr_0.9fr] md:px-10">
          <div>
            <motion.p
              initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, ease: EASE, delay: 0.2 }}
              className="text-[12px] font-medium uppercase tracking-[0.4em]" style={{ color: A.glacial }}>
              Antártida · Air-Cruise · saindo de Punta Arenas
            </motion.p>
            <motion.h1
              initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.1, ease: EASE, delay: 0.3 }}
              className="mt-5 font-display text-[clamp(2.6rem,6.4vw,5.6rem)] font-light uppercase leading-[0.86] tracking-[-0.02em]"
              style={{ color: A.gelo }}>
              Antarctica<br />Express
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, ease: EASE, delay: 0.5 }}
              className="mt-6 max-w-md text-[15px] font-light leading-relaxed md:text-base"
              style={{ color: A.geloSoft }}>
              Seis dias entre Punta Arenas e Ushuaia: voo sobre a Drake, desembarques na Península e{" "}
              <span style={{ color: A.gelo }}>Cabo Horn, Puerto Williams e o Canal Beagle</span> no caminho.
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, ease: EASE, delay: 0.65 }}
              className="mt-8 flex flex-wrap items-center gap-5">
              <a href="#contato"
                className="inline-flex items-center gap-3 rounded-full px-8 py-4 text-[13px] font-semibold uppercase tracking-[0.16em] transition-transform duration-300 hover:scale-[1.03]"
                style={{ background: A.parka, color: A.gelo }}>
                Quero esta expedição <span>→</span>
              </a>
              <span className="text-[12px] uppercase tracking-[0.16em]" style={{ color: A.geloFaint }}>
                a partir de US$ 6.795
              </span>
            </motion.div>
            <motion.div
              initial={{ opacity: 0 }} animate={{ opacity: 1 }}
              transition={{ duration: 0.8, ease: EASE, delay: 0.85 }}
              className="mt-6">
              <Breadcrumb
                items={[
                  { label: "Navegação", href: "/navegacao" },
                  { label: "Antarctica21", href: "/destinos/antarctica21" },
                  { label: "Antarctica Express" },
                ]}
                tone="dark"
                accent={A.glacial}
              />
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1.2, ease: EASE, delay: 0.3 }}
            className="mx-auto h-[480px] w-full max-w-[440px] md:h-[580px]">
            <AirArc />
          </motion.div>
        </div>
      </section>

      {/* ===== STATS ===== */}
      <section className="px-6 py-14 md:px-10" style={{ background: A.noite }}>
        <div className="mx-auto grid max-w-[1280px] grid-cols-2 gap-6 md:grid-cols-4">
          {STATS.map((s, i) => (
            <Reveal key={s.label} delay={i * 0.06}>
              <div className="border-l pl-4" style={{ borderColor: A.line }}>
                <p className="font-display text-[clamp(1.5rem,2.6vw,2.2rem)] font-light" style={{ color: A.gelo }}>
                  {s.value}
                </p>
                <p className="mt-1 text-[11px] font-semibold uppercase tracking-[0.18em]" style={{ color: A.glacial }}>
                  {s.label}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* ===== DESTAQUES ===== */}
      <section className="px-6 py-24 md:px-10 md:py-28" style={{ background: A.fundo, color: A.gelo }}>
        <div className="mx-auto max-w-[1280px]">
          <Reveal>
            <p className="mb-3 text-[11px] font-semibold uppercase tracking-[0.34em]" style={{ color: A.parkaSoft }}>
              Por que ir
            </p>
          </Reveal>
          <Reveal delay={0.06}>
            <h2 className="mb-12 max-w-2xl font-display text-[clamp(1.8rem,3.6vw,3rem)] font-light leading-[1.1]">
              A travessia completa: voo, gelo, Drake e Cabo Horn
            </h2>
          </Reveal>
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {DESTAQUES.map((d, i) => (
              <Reveal key={d.num} delay={i * 0.06}>
                <div className="border-t pt-6" style={{ borderColor: A.line }}>
                  <span className="font-display text-sm" style={{ color: A.glacial }}>{d.num}</span>
                  <h3 className="mt-3 font-display text-xl font-light md:text-2xl">{d.t}</h3>
                  <p className="mt-3 text-[14px] font-light leading-relaxed" style={{ color: A.geloSoft }}>{d.d}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ===== GALERIA ===== */}
      <section className="px-6 py-24 md:px-10 md:py-32" style={{ background: A.abismo }}>
        <div className="mx-auto max-w-[1280px]">
          <Reveal>
            <p className="mb-8 text-[11px] font-semibold uppercase tracking-[0.32em]" style={{ color: A.glacial }}>
              Galeria · fotos reais da expedição
            </p>
          </Reveal>
          <Reveal delay={0.08}><Galeria images={GALERIA} /></Reveal>
        </div>
      </section>

      {/* ===== ROTEIRO ===== */}
      <section className="px-6 py-24 md:px-10 md:py-32" style={{ background: A.noite, color: A.gelo }}>
        <div className="mx-auto max-w-[1100px]">
          <Reveal>
            <p className="text-[11px] font-semibold uppercase tracking-[0.32em]" style={{ color: A.parkaSoft }}>
              O roteiro em essência
            </p>
          </Reveal>
          <p className="mt-4 max-w-xl text-[14px] font-light leading-relaxed" style={{ color: A.geloSoft }}>
            Sentido voo ao sul e navegação ao norte, de Punta Arenas a Ushuaia. Em algumas datas o
            sentido se inverte: embarque em Ushuaia e voo de volta a Punta Arenas. A essência é a mesma.
          </p>
          <div className="mt-12">
            {ROTEIRO.map((r) => (
              <Reveal key={r.d} delay={0.04}>
                <div className="flex items-baseline gap-6 border-t py-6 md:gap-10" style={{ borderColor: A.line }}>
                  <span className="font-display text-sm whitespace-nowrap" style={{ color: A.glacial }}>{r.d}</span>
                  <div>
                    <h3 className="font-display text-xl font-light md:text-2xl">{r.t}</h3>
                    <p className="mt-1 text-[14px] font-light" style={{ color: A.geloSoft }}>{r.s}</p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ===== VIDA A BORDO ===== */}
      <section className="px-6 py-24 md:px-10 md:py-28" style={{ background: A.fundo, color: A.gelo }}>
        <div className="mx-auto max-w-[1280px]">
          <Reveal>
            <p className="mb-3 text-[11px] font-semibold uppercase tracking-[0.34em]" style={{ color: A.glacial }}>
              Vida a bordo
            </p>
          </Reveal>
          <Reveal delay={0.06}>
            <h2 className="mb-12 max-w-xl font-display text-[clamp(1.8rem,3.4vw,2.8rem)] font-light leading-[1.1]">
              Conforto de boutique no continente mais selvagem
            </h2>
          </Reveal>
          <div className="grid gap-6 md:grid-cols-3 md:gap-8">
            {BORDO.map((b, i) => (
              <Reveal key={b.t} delay={i * 0.08}>
                <div className="overflow-hidden rounded-xl" style={{ background: A.abismo }}>
                  <div className="relative h-52 overflow-hidden md:h-60">
                    <div className="absolute inset-0 bg-cover bg-center transition-transform duration-700 hover:scale-105"
                      style={{ backgroundImage: `url('${b.img}')` }} />
                  </div>
                  <div className="p-6">
                    <h3 className="font-display text-xl font-light">{b.t}</h3>
                    <p className="mt-2 text-[13px] font-light leading-relaxed" style={{ color: A.geloSoft }}>{b.d}</p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ===== ESCOLHA SEU NAVIO ===== */}
      <section className="px-6 py-24 md:px-10 md:py-32" style={{ background: A.gelo, color: A.abismo }}>
        <div className="mx-auto max-w-[1280px]">
          <Reveal>
            <p className="mb-3 text-[11px] font-semibold uppercase tracking-[0.34em]" style={{ color: A.glacialDp }}>
              Escolha seu navio
            </p>
          </Reveal>
          <Reveal delay={0.06}>
            <h2 className="mb-4 max-w-xl font-display text-[clamp(1.8rem,3.6vw,3rem)] font-light leading-[1.1]">
              Dois navios polares, a mesma expedição
            </h2>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="mb-12 max-w-lg text-[14px] font-light leading-relaxed" style={{ color: "rgba(7,21,31,0.6)" }}>
              O Antarctica Express opera nos dois navios boutique da frota. A tarifa varia
              conforme o navio e a categoria de cabine.
            </p>
          </Reveal>
          <div className="grid gap-10 md:grid-cols-2 md:gap-12">
            {NAVIOS.map((n, i) => (
              <Reveal key={n.nome} delay={i * 0.1}>
                <div>
                  <div className="relative h-[300px] overflow-hidden rounded-xl md:h-[340px]">
                    <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: `url('${n.img}')` }} />
                  </div>
                  <div className="mt-6 flex items-baseline justify-between gap-4">
                    <h3 className="font-display text-2xl font-light">{n.nome}</h3>
                    <span className="whitespace-nowrap text-[13px] font-semibold" style={{ color: A.parka }}>{n.tarifa}</span>
                  </div>
                  <p className="mt-3 text-[15px] font-light leading-relaxed" style={{ color: "rgba(7,21,31,0.68)" }}>{n.d}</p>
                </div>
              </Reveal>
            ))}
          </div>
          <Reveal delay={0.16}>
            <p className="mt-10 text-[12px] font-light" style={{ color: "rgba(7,21,31,0.45)" }}>
              Valores por pessoa em ocupação dupla, categoria inicial. Não incluem voos internacionais.
            </p>
          </Reveal>
        </div>
      </section>

      {/* ===== INCLUSO ===== */}
      <section className="px-6 py-24 md:px-10 md:py-28" style={{ background: A.fundo, color: A.gelo }}>
        <div className="mx-auto max-w-[1280px]">
          <Reveal>
            <p className="mb-10 text-[11px] font-semibold uppercase tracking-[0.32em]" style={{ color: A.glacial }}>
              O que está incluído
            </p>
          </Reveal>
          <div className="grid gap-x-10 gap-y-5 sm:grid-cols-2 lg:grid-cols-3">
            {INCLUSO.map((item, i) => (
              <Reveal key={item} delay={i * 0.04}>
                <div className="flex items-start gap-3 border-t pt-4" style={{ borderColor: A.line }}>
                  <span className="mt-1 text-[13px]" style={{ color: A.parka }}>✦</span>
                  <p className="text-[14px] font-light leading-relaxed" style={{ color: A.geloSoft }}>{item}</p>
                </div>
              </Reveal>
            ))}
          </div>
          <Reveal delay={0.2}>
            <p className="mt-10 text-[13px] font-light" style={{ color: A.geloFaint }}>
              Opcional: pacote de hotel e transfer com noite extra em Punta Arenas, café da manhã e traslados dedicados.
            </p>
          </Reveal>
        </div>
      </section>

      {/* ===== PUNTA ARENAS ===== */}
      <section className="px-6 py-24 md:px-10 md:py-28" style={{ background: A.noite, color: A.gelo }}>
        <div className="mx-auto grid max-w-[1280px] items-center gap-12 md:grid-cols-2 md:gap-16">
          <Reveal>
            <div className="relative h-[320px] overflow-hidden rounded-xl md:h-[400px]">
              <div className="absolute inset-0 bg-cover bg-center"
                style={{ backgroundImage: `url('${F}/hotel-puq.webp')` }} />
            </div>
          </Reveal>
          <Reveal delay={0.1}>
            <div>
              <p className="text-[11px] font-semibold uppercase tracking-[0.32em]" style={{ color: A.parkaSoft }}>
                A base da expedição
              </p>
              <h2 className="mt-5 font-display text-[clamp(1.8rem,3.4vw,2.8rem)] font-light leading-[1.1]">
                Punta Arenas e a Explorers House
              </h2>
              <p className="mt-6 text-[15px] font-light leading-relaxed" style={{ color: A.geloSoft }}>
                A jornada inclui uma noite no Hotel Cabo de Hornos (ou similar) e acesso exclusivo
                à Explorers House, o centro de expedições da Antarctica21: briefing, ambientação
                polar e o jantar de boas-vindas com sabores da Patagônia.
              </p>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ===== SAÍDAS / PREÇO ===== */}
      <section className="px-6 py-24 md:px-10 md:py-28" style={{ background: A.fundo, color: A.gelo }}>
        <div className="mx-auto max-w-[860px] text-center">
          <Reveal>
            <p className="text-[11px] font-semibold uppercase tracking-[0.32em]" style={{ color: A.glacial }}>
              Próximas saídas
            </p>
          </Reveal>
          <Reveal delay={0.06}>
            <h2 className="mt-5 font-display text-[clamp(1.8rem,3.6vw,2.8rem)] font-light leading-[1.15]">
              Novembro e março, nos dois navios
            </h2>
          </Reveal>
          <Reveal delay={0.12}>
            <p className="mx-auto mt-5 max-w-md text-[15px] font-light leading-relaxed" style={{ color: A.geloSoft }}>
              O Express abre e fecha a temporada antártica, em múltiplas datas e nos dois sentidos
              da travessia. Consulte a melhor data para a sua viagem.
            </p>
          </Reveal>
          <Reveal delay={0.18}>
            <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
              <a href="#contato"
                className="inline-flex items-center gap-3 rounded-full px-8 py-4 text-[13px] font-semibold uppercase tracking-[0.16em] transition-transform duration-300 hover:scale-[1.03]"
                style={{ background: A.parka, color: A.gelo }}>
                Consultar disponibilidade <span>→</span>
              </a>
              <span className="text-[12px] font-light" style={{ color: A.geloFaint }}>
                a partir de US$ 6.795 por pessoa em ocupação dupla
              </span>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ===== AONIKIA ===== */}
      <section className="px-6 py-20 md:px-10 md:py-24" style={{ background: A.noite }}>
        <div className="mx-auto max-w-[860px] text-center">
          <Reveal>
            <p className="text-[11px] font-semibold uppercase tracking-[0.3em]" style={{ color: A.glacial }}>
              AonikIA · especialista nesta expedição
            </p>
            <h2 className="mt-5 font-display text-[clamp(1.8rem,3.5vw,2.8rem)] font-light leading-[1.15]" style={{ color: A.gelo }}>
              Pergunte tudo sobre o Antarctica Express
            </h2>
            <p className="mx-auto mt-4 max-w-md text-[15px] font-light leading-relaxed" style={{ color: A.geloSoft }}>
              Como funciona o voo, qual navio escolher, o que levar na mala, melhor data.
              A AonikIA conhece esta rota e te conecta com um especialista.
            </p>
            <a href="#contato"
              className="mt-7 inline-flex items-center gap-3 rounded-full border px-7 py-3.5 text-[12px] font-semibold uppercase tracking-[0.16em] transition-all duration-300"
              style={{ borderColor: A.glacial, color: A.glacial }}>
              Conversar com a AonikIA <span>→</span>
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
