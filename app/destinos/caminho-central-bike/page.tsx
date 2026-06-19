"use client";

import { motion } from "framer-motion";
import Nav from "../../components/Nav";
import Footer from "../../components/Footer";
import Contato from "../../components/Contato";
import FloatingActions from "../../components/FloatingActions";
import { Reveal, Kicker, EASE } from "../../components/ui";

const C = {
  bg:      "#0d1e1c",   // Everglade dark
  dark:    "#152824",
  pedal:   "#c4902a",   // Cornfield dourado
  amar:    "#d9a800",   // mantém amarelo do Caminho
  granito: "#8aaa90",
  areia:   "#b89460",   // Sisal Beige
  creme:   "#f0ece4",   // Beachwood
  cremeDp: "#e6e2d8",
};

const HERO_IMG =
  "https://static.wixstatic.com/media/2d4f5b_81c89a7a405a41dda38a215d2fe19d08~mv2.jpg/v1/fill/w_1920,h_1080,q_90,enc_avif,quality_auto/2d4f5b_81c89a7a405a41dda38a215d2fe19d08~mv2.jpg";

const ETAPAS = [
  { dia: "DIA 1", titulo: "Porto → Rates",          km: "45 km", desc: "Saida do Porto pelo centro historico e Ribeira. Pedalada pelo interior norte portugues ate Rates, vila com basilica romanica do sec. XII." },
  { dia: "DIA 2", titulo: "Rates → Barcelos",        km: "32 km", desc: "Chegada a Barcelos, a cidade do Galo, simbolo de Portugal. Mercado medieval as quintas-feiras. Ponte medieval sobre o Rio Cavado." },
  { dia: "DIA 3", titulo: "Barcelos → Ponte de Lima", km: "43 km", desc: "Pedalada entre vinhas e aldeias de granito. Chegada a Ponte de Lima, a cidade mais antiga de Portugal, pela ponte romana ainda intacta." },
  { dia: "DIA 4", titulo: "Ponte de Lima → Valenca", km: "45 km", desc: "Ascensao suave pelo Alto Minho. Valenca: cidadela abaluartada do sec. XVII com vista para a Espanha. Passagem para Tui pela Ponte Internacional." },
  { dia: "DIA 5", titulo: "Tui → Redondela",         km: "30 km", desc: "Entrada definitiva na Galiza. Setas amarelas no granito guiam ate Redondela, conhecida pelos seus viaductos sobre a Ria de Vigo." },
  { dia: "DIA 6", titulo: "Redondela → Pontevedra",  km: "20 km", desc: "Etapa curta pelo litoral galego. Pontevedra, cidade medieval sem carros no centro, e um dos tesouros do Caminho Frances." },
  { dia: "DIA 7", titulo: "Pontevedra → Padron",     km: "38 km", desc: "Trecho por bosques de carvalhos galegos, aldeias de pedra e cruzeiros seculares. Padron: onde a barca com o corpo de Sao Tiago aportou." },
  { dia: "DIA 8", titulo: "Padron → Santiago de Compostela", km: "25 km", desc: "A ultima etapa. Entrada pela Porta do Caminho na cidade velha. Chegada a Praca do Obradoiro, a Catedral e a emocao da Compostela em maos." },
];

const INCLUSOS = [
  "7 noites em hoteis e pousadas selecionados (quarto duplo)",
  "7 cafes da manha",
  "Bicicleta hibrida de qualidade (tamanho customizavel)",
  "Transferencia de bagagem diaria entre hospedagens",
  "Aplicativo GPS com rota e pontos do Caminho",
  "Credencial do Peregrino e Kit Caminho",
  "Suporte AONIK por telefone durante todo o roteiro",
];

const NAO_INCLUSOS = [
  "Voos internacionais",
  "Almoco e jantar",
  "Bebidas",
  "Seguro cancelamento (recomendado)",
  "Gorjetas",
];

export default function CaminhoCentralBikePage() {
  return (
    <main className="relative" style={{ backgroundColor: C.creme }}>
      <Nav />

      {/* HERO */}
      <section
        className="grain relative flex min-h-[100svh] w-full items-end overflow-hidden"
        style={{ backgroundColor: C.bg }}
      >
        <div
          className="absolute inset-0 scale-105 bg-cover bg-center opacity-50"
          style={{ backgroundImage: `url('${HERO_IMG}')` }}
        />
        <div
          className="absolute inset-0"
          style={{
            background: `linear-gradient(to top, ${C.bg} 0%, ${C.bg}aa 35%, transparent 70%)`,
          }}
        />
        <div className="relative z-10 mx-auto w-full max-w-[1180px] px-6 pb-20 md:px-10 md:pb-24">
          <motion.div
            initial={{ opacity: 0, y: 36 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: EASE, delay: 0.2 }}
          >
            <Kicker color="" line="">
              <span style={{ color: C.pedal }}>—</span>
              <span style={{ color: C.areia }}>Caminho Portugues · Central · Bike</span>
            </Kicker>
            <h1
              className="mt-3 font-display font-light uppercase leading-[0.85] tracking-[-0.02em]"
              style={{ fontSize: "clamp(3rem,10vw,8rem)", color: C.creme }}
            >
              Caminho
              <br />
              <span style={{ color: C.pedal }}>Central de Bike</span>
            </h1>

            <div className="mt-5 flex flex-wrap gap-7">
              {[["240 km", "distancia"], ["8 dias", "duracao"], ["7 etapas", "pedais"], ["Porto → Santiago", "rota"]].map(
                ([v, l]) => (
                  <div key={l}>
                    <p className="font-display text-xl font-light" style={{ color: C.creme }}>{v}</p>
                    <p className="text-[10px] uppercase tracking-[0.14em]" style={{ color: C.granito }}>{l}</p>
                  </div>
                )
              )}
            </div>

            <div className="mt-7 flex flex-wrap items-center gap-4">
              <div>
                <span className="mr-1 text-sm" style={{ color: C.granito }}>a partir de</span>
                <span className="font-display text-2xl font-light" style={{ color: C.creme }}>€ 1.262</span>
              </div>
              <a
                href="#contato"
                className="rounded-full px-7 py-3 text-[12px] font-semibold uppercase tracking-[0.16em] transition-transform hover:scale-[1.03]"
                style={{ backgroundColor: C.pedal, color: C.creme }}
              >
                Solicitar proposta →
              </a>
              <a
                href="/jornada"
                className="rounded-full border px-7 py-3 text-[12px] font-semibold uppercase tracking-[0.16em] transition-opacity hover:opacity-80"
                style={{ borderColor: `${C.amar}40`, color: C.creme }}
              >
                Ver opcao a pe →
              </a>
            </div>
          </motion.div>
        </div>
      </section>

      {/* DESCRICAO */}
      <section className="px-6 py-24 md:px-10 md:py-32" style={{ backgroundColor: C.creme }}>
        <div className="mx-auto max-w-[860px]">
          <Reveal>
            <Kicker>Portugal e Galiza · Autoguiado · Bike</Kicker>
          </Reveal>
          <Reveal delay={0.08}>
            <p
              className="mt-6 font-display font-light leading-[1.3] tracking-[-0.01em]"
              style={{ fontSize: "clamp(1.4rem,2.8vw,2.1rem)", color: "#1a1714" }}
            >
              O coracao de Portugal de norte a sul, pedalada a pedalada. Granito,
              vinho verde e a rota historica que peregrinos percorrem ha mais de mil anos.
            </p>
          </Reveal>
          <Reveal delay={0.14}>
            <p
              className="mt-5 max-w-2xl text-[15px] font-light leading-relaxed"
              style={{ color: "rgba(26,23,20,0.58)" }}
            >
              O Caminho Central e a rota historica classica do Caminho Portugues. A bike
              permite cobrir 30-50 km por dia sem perder a essencia da peregrinacao: as
              setas amarelas, as aldeias de granito, os mosteiros e a comunidade unica
              que se forma ao longo do Caminho. O roteiro mais acessivel para quem faz
              Compostela pela primeira vez.
            </p>
          </Reveal>
        </div>
      </section>

      {/* ETAPAS */}
      <section className="px-6 py-24 md:px-10 md:py-28" style={{ backgroundColor: C.dark }}>
        <div className="mx-auto max-w-[1180px]">
          <Reveal>
            <Kicker color="" line="">
              <span style={{ color: C.pedal }}>—</span>
              <span style={{ color: C.granito }}>Dia a dia</span>
            </Kicker>
          </Reveal>
          <Reveal delay={0.06}>
            <h2
              className="mt-3 font-display font-light"
              style={{ fontSize: "clamp(1.8rem,4vw,3rem)", color: C.creme }}
            >
              Itinerario
            </h2>
          </Reveal>
          <div className="mt-10 divide-y" style={{ borderColor: `${C.pedal}20` }}>
            {ETAPAS.map((e, i) => (
              <Reveal key={e.dia} delay={Math.min(i * 0.04, 0.3)}>
                <div className="grid grid-cols-[90px_1fr] gap-5 py-5 md:grid-cols-[130px_1fr]">
                  <div>
                    <p className="text-[10px] font-bold uppercase tracking-[0.15em]" style={{ color: C.pedal }}>
                      {e.dia}
                    </p>
                    {e.km && (
                      <p className="mt-0.5 text-[11px]" style={{ color: C.granito }}>
                        {e.km}
                      </p>
                    )}
                  </div>
                  <div>
                    <h3 className="font-display text-[1.05rem] font-light leading-tight" style={{ color: C.creme }}>
                      {e.titulo}
                    </h3>
                    <p className="mt-1.5 text-[13px] font-light leading-relaxed" style={{ color: C.granito }}>
                      {e.desc}
                    </p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* INCLUSO */}
      <section className="px-6 py-24 md:px-10 md:py-28" style={{ backgroundColor: C.cremeDp }}>
        <div className="mx-auto max-w-[1180px]">
          <Reveal>
            <Kicker>O que esta incluido</Kicker>
          </Reveal>
          <div className="mt-10 grid gap-10 md:grid-cols-2">
            <Reveal delay={0.06}>
              <div>
                <h3 className="font-display text-xl font-light" style={{ color: "#1a1714" }}>
                  Incluso
                </h3>
                <ul className="mt-5 space-y-2.5">
                  {INCLUSOS.map((item) => (
                    <li
                      key={item}
                      className="flex items-start gap-3 text-[14px] font-light"
                      style={{ color: "rgba(26,23,20,0.65)" }}
                    >
                      <span className="mt-0.5 shrink-0 font-bold" style={{ color: C.pedal }}>✓</span>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
            <Reveal delay={0.1}>
              <div>
                <h3 className="font-display text-xl font-light" style={{ color: "#1a1714" }}>
                  Nao incluso
                </h3>
                <ul className="mt-5 space-y-2.5">
                  {NAO_INCLUSOS.map((item) => (
                    <li
                      key={item}
                      className="flex items-start gap-3 text-[14px] font-light"
                      style={{ color: "rgba(26,23,20,0.65)" }}
                    >
                      <span className="mt-0.5 shrink-0 opacity-40">✕</span>
                      {item}
                    </li>
                  ))}
                </ul>
                <div
                  className="mt-8 rounded-xl border p-5"
                  style={{ borderColor: `${C.amar}30`, backgroundColor: `${C.amar}08` }}
                >
                  <p className="text-[11px] font-semibold uppercase tracking-[0.16em]" style={{ color: C.amar }}>
                    Prefere fazer a pe?
                  </p>
                  <p className="mt-2 text-[13px] font-light" style={{ color: "rgba(26,23,20,0.65)" }}>
                    O Caminho Central tambem esta disponivel na versao peregrinacao a pe, com 14 dias e etapas de 15-20 km.
                  </p>
                  <a
                    href="/jornada"
                    className="mt-3 inline-block text-[11px] font-semibold uppercase tracking-[0.14em] underline underline-offset-4"
                    style={{ color: C.amar }}
                  >
                    Ver todos os Caminhos de Santiago →
                  </a>
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* TARIFA */}
      <section className="px-6 py-24 md:px-10 md:py-28" style={{ backgroundColor: C.dark }}>
        <div className="mx-auto max-w-[900px]">
          <Reveal>
            <Kicker color="" line="">
              <span style={{ color: C.pedal }}>—</span>
              <span style={{ color: C.granito }}>Valores 2026</span>
            </Kicker>
          </Reveal>
          <Reveal delay={0.06}>
            <h2
              className="mt-3 font-display font-light"
              style={{ fontSize: "clamp(1.8rem,3.5vw,2.8rem)", color: C.creme }}
            >
              Tarifas
            </h2>
          </Reveal>
          <Reveal delay={0.1}>
            <div
              className="mt-8 rounded-xl border p-7 md:p-9"
              style={{ borderColor: `${C.pedal}22`, backgroundColor: `${C.pedal}09` }}
            >
              <div className="flex flex-wrap items-end gap-10">
                <div>
                  <p className="mb-1 text-sm" style={{ color: C.granito }}>Por pessoa (quarto duplo)</p>
                  <p
                    className="font-display font-light"
                    style={{ fontSize: "clamp(2.2rem,5vw,3.5rem)", color: C.creme }}
                  >
                    € 1.262
                  </p>
                </div>
                <div>
                  <p className="mb-1 text-sm" style={{ color: C.granito }}>Alta Temporada</p>
                  <p className="font-display text-2xl font-light" style={{ color: C.creme }}>
                    € 1.326
                  </p>
                </div>
              </div>
              <div
                className="mt-6 flex flex-wrap gap-8 border-t pt-6"
                style={{ borderColor: `${C.pedal}18` }}
              >
                <div>
                  <p className="text-[10px] uppercase tracking-[0.14em]" style={{ color: C.granito }}>Partidas</p>
                  <p className="mt-1 text-sm font-light" style={{ color: `${C.creme}cc` }}>Sextas e Segundas</p>
                </div>
                <div>
                  <p className="text-[10px] uppercase tracking-[0.14em]" style={{ color: C.granito }}>Minimo</p>
                  <p className="mt-1 text-sm font-light" style={{ color: `${C.creme}cc` }}>2 participantes</p>
                </div>
              </div>
            </div>
          </Reveal>
          <Reveal delay={0.16}>
            <p className="mt-4 text-xs font-light" style={{ color: `${C.granito}77` }}>
              Precos por pessoa em quarto duplo. Bicicleta hibrida, bagagem transferida e credencial do peregrino inclusos.
            </p>
          </Reveal>
          <Reveal delay={0.2}>
            <a
              href="#contato"
              className="mt-8 inline-flex items-center gap-3 rounded-full px-7 py-3.5 text-[12px] font-semibold uppercase tracking-[0.16em] transition-all hover:scale-[1.03]"
              style={{ backgroundColor: C.pedal, color: C.creme }}
            >
              Solicitar proposta →
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
