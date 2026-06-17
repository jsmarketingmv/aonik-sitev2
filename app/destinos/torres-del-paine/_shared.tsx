"use client";

import { useState, useEffect, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { geoMercator, geoPath } from "d3-geo";
import { feature } from "topojson-client";
import Nav from "../../components/Nav";
import Footer from "../../components/Footer";
import Contato from "../../components/Contato";
import FloatingActions from "../../components/FloatingActions";
import { Reveal, EASE } from "../../components/ui";

/* ============================================================
   TORRES DEL PAINE — identidade compartilhada
   Capa coesa do destino (paleta granito + gelo + amanhecer)
   + 4 programas, cada um com sua cor-accent e fauna-símbolo.
   Assinatura: as três torres de granito + o traçado do W.
   Tom: comunidade + conforto.
   ============================================================ */
export const T = {
  ink: "#0c1219", // quase preto, heros
  granito: "#1b2733", // seções escuras
  granitoSoft: "#26323f",
  gelo: "#9cc3d4", // azul-gelo (assinatura fria)
  geloDp: "#6c9bb0",
  ouro: "#cf9a4e", // amanhecer nas torres / CTA (token AONIK)
  ouroSoft: "#e3b574",
  creme: "#f1ece2", // fundo claro
  cremeDeep: "#e6ddcd",
  cInk: "rgba(241,236,226,0.92)",
  cSoft: "rgba(241,236,226,0.66)",
  cFaint: "rgba(241,236,226,0.42)",
  line: "rgba(156,195,212,0.18)",
  lime: "#bfe34a", // verde-limão dos pinos do mapa W
};

/* Cada programa herda sua cor do catálogo + um animal-assinatura */
export type AccentKey = "journey" | "express" | "plus" | "tradicional";
export const PROG: Record<
  AccentKey,
  { accent: string; soft: string; dark: string; fauna: string }
> = {
  journey: { accent: "#6a763f", soft: "#94a063", dark: "#161c0e", fauna: "O host" },
  express: { accent: "#b0533a", soft: "#cd7f68", dark: "#1f0f0a", fauna: "Caracara" },
  plus: { accent: "#557f9c", soft: "#84a8be", dark: "#0d1c25", fauna: "Huemul" },
  tradicional: { accent: "#bd5e2b", soft: "#dd8b5b", dark: "#1f0f06", fauna: "Guanaco" },
};

const U = "https://images.unsplash.com/photo-";
const Q = "?q=80&w=1800&auto=format&fit=crop";
/* Pool de imagens — placeholders Unsplash já validados no projeto.
   "Mixto": trocar pelas high-res reais da AONIK depois. */
export const IMG = {
  torres: `${U}1531794343237-93e7e6e25b3f${Q}`,
  lago: `${U}1486911278844-a81c5267e227${Q}`,
  cuernos: `${U}1469474968028-56623f02e42e${Q}`,
  vale: `${U}1601581875309-fafbf2d3ed3a${Q}`,
  grey: `${U}1454496522488-7a8e488e8606${Q}`,
  trilha: `${U}1551632811-561732d1e306${Q}`,
  guanaco: `${U}1518709268805-4e9042af9f23${Q}`,
  refugio: `${U}1518780664697-55e3ad937233${Q}`,
  camping: `${U}1504280390367-361c6d9f38f4${Q}`,
  hotel: `${U}1566073771259-6a8506099945${Q}`,
  amanhecer: `${U}1483728642387-6c3bdd6c93e5${Q}`,
  rio: `${U}1500534623283-312aade485b7${Q}`,
};

/* Fotos reais AONIK / parque — locais em /public/torres-del-paine */
const L = "/torres-del-paine";
export const PHOTO = {
  hero: `${L}/hero.jpg`,            // Cuernos sobre o lago (trocar pela Base Torres do Juliano)
  patagonia: `${L}/patagonia.jpg`, // Cuernos icônico (foto vertical do Juliano vai aqui)
  prodExpress: `${L}/prod-w-express.jpg`,
  prodPlus: `${L}/prod-w-plus.jpg`,
  prodTradicional: `${L}/prod-w-tradicional.jpg`,
};

/* ============================================================
   ASSINATURA — AS TRÊS TORRES
   Torre Norte · Torre Central · Torre Grande, com o amanhecer
   (a luz dourada que sobe pela rocha) e a lagoa glacial.
   ============================================================ */
export function TorresSilhueta({
  glow = T.ouro,
  snow = T.gelo,
}: {
  glow?: string;
  rock?: string;
  snow?: string;
}) {
  /* Linha única — silhueta real das três torres de granito.
     Torre Norte (esq) · Torre Central (a mais alta) · Torre Sul (dir)
     Traçado como line-art: stroke animado + face de luz dourada.     */
  return (
    <svg viewBox="0 0 420 440" className="h-full w-full" fill="none" role="img">
      <title>Silhueta das três torres de granito — Torres del Paine</title>

      {/* Lagoa glacial ao fundo */}
      <motion.ellipse cx="210" cy="415" rx="148" ry="10"
        fill={snow} opacity="0.14"
        initial={{ scaleX: 0 }} animate={{ scaleX: 1 }}
        transition={{ duration: 2.2, ease: EASE, delay: 2.2 }}
        style={{ transformOrigin: "210px 415px" }}
      />

      {/* Reflexo suave na lagoa */}
      <motion.g opacity="0.1"
        initial={{ opacity: 0 }} animate={{ opacity: 0.1 }}
        transition={{ duration: 1.5, ease: EASE, delay: 3 }}>
        <line x1="196" y1="418" x2="196" y2="432" stroke={glow} strokeWidth="1" />
        <line x1="210" y1="416" x2="210" y2="434" stroke={glow} strokeWidth="1.2" />
        <line x1="224" y1="418" x2="224" y2="430" stroke={glow} strokeWidth="1" />
      </motion.g>

      {/* ── TORRE NORTE (esquerda, levemente mais baixa) ── */}
      <motion.path
        d="M 106,348 L 108,314 L 109,278 L 110,240 L 110,202 L 109,166
           L 108,134 L 107,106 L 107,82 L 107,62 L 108,48 L 110,37
           L 113,28 L 118,22 L 124,18 L 130,17 L 135,19 L 140,24
           L 143,32 L 144,43 L 143,57 L 141,74 L 139,95 L 138,118
           L 137,144 L 137,172 L 138,202 L 139,232 L 141,262
           L 144,290 L 147,316 L 149,340 L 150,348"
        stroke="rgba(241,236,226,0.72)"
        strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round"
        initial={{ pathLength: 0, opacity: 0 }}
        animate={{ pathLength: 1, opacity: 1 }}
        transition={{ duration: 2.6, ease: EASE, delay: 0.4 }}
      />
      <motion.path
        d="M 130,17 L 135,19 L 140,24 L 143,32 L 144,43 L 143,57
           L 141,74 L 139,95 L 138,118 L 137,144 L 137,172 L 138,202
           L 139,232 L 141,262 L 144,290 L 147,316 L 140,318
           L 137,292 L 135,264 L 134,234 L 133,204 L 133,174
           L 132,144 L 132,118 L 131,95 L 130,74 L 129,57
           L 128,43 L 127,32 L 127,24 L 128,19 Z"
        fill={glow} opacity="0"
        animate={{ opacity: 0.26 }}
        transition={{ duration: 2, ease: EASE, delay: 2 }}
      />

      {/* ── TORRE CENTRAL (a mais alta) ── */}
      <motion.path
        d="M 172,348 L 174,314 L 176,276 L 177,238 L 178,200
           L 177,164 L 176,130 L 175,100 L 174,74 L 173,52
           L 172,36 L 172,23 L 173,13 L 176,6 L 180,2
           L 185,0 L 191,0 L 196,3 L 200,9 L 202,18
           L 202,30 L 200,46 L 197,66 L 195,90 L 194,116
           L 193,145 L 193,176 L 194,208 L 196,240
           L 199,270 L 203,298 L 207,322 L 210,342 L 211,348"
        stroke="rgba(241,236,226,0.90)"
        strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"
        initial={{ pathLength: 0, opacity: 0 }}
        animate={{ pathLength: 1, opacity: 1 }}
        transition={{ duration: 3.2, ease: EASE, delay: 0.15 }}
      />
      <motion.path
        d="M 185,0 L 191,0 L 196,3 L 200,9 L 202,18 L 202,30
           L 200,46 L 197,66 L 195,90 L 194,116 L 193,145
           L 193,176 L 194,208 L 196,240 L 199,270 L 203,298
           L 207,322 L 200,324 L 197,300 L 195,272
           L 193,242 L 192,210 L 191,178 L 191,147
           L 191,116 L 190,90 L 189,66 L 188,46 L 187,30
           L 187,18 L 187,9 L 187,3 Z"
        fill={glow} opacity="0"
        animate={{ opacity: 0.38 }}
        transition={{ duration: 2, ease: EASE, delay: 1.9 }}
      />

      {/* ── TORRE SUL (direita, altura intermediária) ── */}
      <motion.path
        d="M 258,348 L 261,318 L 265,286 L 268,254 L 271,222
           L 272,190 L 272,160 L 271,132 L 269,106 L 267,84
           L 265,66 L 264,51 L 263,39 L 264,29 L 267,21
           L 271,15 L 276,12 L 282,11 L 287,13 L 292,18
           L 295,26 L 296,37 L 295,51 L 293,68 L 291,89
           L 289,112 L 288,138 L 288,167 L 289,198
           L 291,230 L 294,260 L 298,288 L 302,314
           L 305,336 L 306,348"
        stroke="rgba(241,236,226,0.68)"
        strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round"
        initial={{ pathLength: 0, opacity: 0 }}
        animate={{ pathLength: 1, opacity: 1 }}
        transition={{ duration: 2.6, ease: EASE, delay: 0.55 }}
      />
      <motion.path
        d="M 276,12 L 282,11 L 287,13 L 292,18 L 295,26
           L 296,37 L 295,51 L 293,68 L 291,89 L 289,112
           L 288,138 L 288,167 L 289,198 L 291,230
           L 294,260 L 298,288 L 292,290 L 289,262
           L 287,232 L 286,200 L 285,169 L 285,140
           L 285,113 L 284,90 L 283,69 L 282,52
           L 281,38 L 281,27 L 281,18 Z"
        fill={glow} opacity="0"
        animate={{ opacity: 0.22 }}
        transition={{ duration: 2, ease: EASE, delay: 2.1 }}
      />

      {/* Neve nos picos */}
      <motion.g fill={snow}
        initial={{ opacity: 0 }} animate={{ opacity: 1 }}
        transition={{ duration: 0.8, ease: EASE, delay: 3.2 }}>
        <circle cx="130" cy="17" r="3.5" opacity="0.8" />
        <circle cx="185" cy="0" r="4.5" opacity="0.9" />
        <circle cx="276" cy="11" r="3" opacity="0.75" />
      </motion.g>
    </svg>
  );
}

/* ============================================================
   ASSINATURA "W" — animação minimalista do circuito
   Traço único desenhando um W + pontos de luz nos cumes.
   ============================================================ */
export function WSignature({ stroke = T.creme, accent = T.ouro }: { stroke?: string; accent?: string }) {
  return (
    <svg viewBox="0 0 420 340" className="h-full w-full" fill="none" role="img">
      <title>Circuito W — Torres del Paine</title>
      {/* base sutil */}
      <motion.line x1="40" y1="312" x2="380" y2="312" stroke={stroke} strokeWidth="1" opacity="0.12"
        initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 1.4, ease: EASE, delay: 2.2 }} />
      {/* o W */}
      <motion.path
        d="M 44,70 L 140,288 L 210,150 L 280,288 L 376,70"
        stroke={stroke} strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round"
        initial={{ pathLength: 0, opacity: 0 }} animate={{ pathLength: 1, opacity: 1 }}
        transition={{ duration: 2.6, ease: EASE, delay: 0.3 }}
      />
      {/* pontos de luz nos cumes e vales */}
      {([[44, 70], [140, 288], [210, 150], [280, 288], [376, 70]] as [number, number][]).map(([x, y], i) => (
        <motion.circle key={i} cx={x} cy={y} r={y > 200 ? 4 : 5.5} fill={accent}
          initial={{ scale: 0, opacity: 0 }} animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5, ease: EASE, delay: 1.9 + i * 0.18 }}
          style={{ transformOrigin: `${x}px ${y}px` }} />
      ))}
    </svg>
  );
}

/* ============================================================
   MAPA DO W — INTERATIVO (a assinatura da navegação)
   Traçado do circuito animado + 4 pins que sincronizam com
   os cards de highlight ao passar o cursor.
   ============================================================ */
/* mx/my = posição do pino sobre o mapa (fração 0-1 do container da imagem) */
export type WPin = { mx: number; my: number; nome: string; dia: string; desc: string; img: string };
export const WMAP_HL: WPin[] = [
  { mx: 0.683, my: 0.228, nome: "Mirador Base Torres", dia: "O coração do parque", desc: "As três torres de granito e a lagoa glacial ao amanhecer.", img: "/lastorres/torres.jpg" },
  { mx: 0.545, my: 0.585, nome: "Setor Cuernos", dia: "Lago Nordenskjöld", desc: "A trilha beira o lago turquesa aos pés dos Cuernos del Paine.", img: "/torres-del-paine/prod-w-tradicional.jpg" },
  { mx: 0.415, my: 0.375, nome: "Vale do Francés · Británico", dia: "O circo glacial", desc: "Anfiteatro de gelo cercado por Paine Grande e os Cuernos.", img: "/lastorres/paisagem.jpg" },
  { mx: 0.108, my: 0.535, nome: "Glaciar Grey", dia: "Campo de Hielo Sul", desc: "Icebergs à deriva no lago e o catamarã sobre o Pehoé.", img: "/torres-del-paine/setor-grey.jpg" },
];

export function WMap({ accent = T.ouro }: { accent?: string }) {
  const [active, setActive] = useState(0);
  return (
    <div className="grid items-center gap-8 lg:grid-cols-[1.15fr_0.85fr]">
      {/* MAPA REAL DO CIRCUITO W + pinos interativos */}
      <div className="relative overflow-hidden rounded-2xl border" style={{ borderColor: T.line, background: "#cfcabf" }}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/torres-del-paine/w-trail-map.png"
          alt="Mapa do circuito W em Torres del Paine, com os pontos de Mirador Base Torres, Cuernos, Vale do Francés e Glaciar Grey"
          className="w-full"
        />
        {WMAP_HL.map((p, i) => {
          const on = i === active;
          return (
            <button
              key={p.nome}
              onMouseEnter={() => setActive(i)}
              onFocus={() => setActive(i)}
              onClick={() => setActive(i)}
              aria-label={p.nome}
              className="absolute flex h-10 w-10 -translate-x-1/2 -translate-y-1/2 items-center justify-center"
              style={{ left: `${p.mx * 100}%`, top: `${p.my * 100}%` }}
            >
              {/* anel pulsante quando ativo */}
              {on && (
                <motion.span
                  className="absolute rounded-full"
                  style={{ border: `2px solid ${T.lime}` }}
                  initial={{ width: 16, height: 16, opacity: 0.8 }}
                  animate={{ width: 42, height: 42, opacity: 0 }}
                  transition={{ duration: 1.6, repeat: Infinity, ease: "easeOut" }}
                />
              )}
              {/* anel-marcador padrão (lime), preenche quando ativo */}
              <span className="relative flex items-center justify-center rounded-full transition-all duration-200"
                style={{
                  width: on ? 20 : 15, height: on ? 20 : 15,
                  background: on ? T.lime : "rgba(12,18,25,0.55)",
                  border: `2px solid ${T.lime}`,
                  boxShadow: on ? `0 0 12px ${T.lime}` : "none",
                }}>
                <span className="rounded-full" style={{ width: 5, height: 5, background: on ? T.ink : T.lime }} />
              </span>
            </button>
          );
        })}
      </div>

      {/* CARDS */}
      <div className="flex flex-col gap-3">
        {WMAP_HL.map((p, i) => {
          const on = i === active;
          return (
            <button
              key={p.nome}
              onMouseEnter={() => setActive(i)}
              onClick={() => setActive(i)}
              className="flex items-center gap-4 rounded-xl border p-3 text-left transition-all duration-300"
              style={{
                borderColor: on ? accent : T.line,
                background: on ? "rgba(156,195,212,0.06)" : "transparent",
              }}
            >
              <div className="h-16 w-20 shrink-0 overflow-hidden rounded-lg">
                <img src={p.img} alt={p.nome} className="h-full w-full object-cover"
                  style={{ opacity: on ? 1 : 0.5, transition: "opacity .3s" }} />
              </div>
              <div>
                <span className="text-[10px] font-semibold uppercase tracking-[0.2em]"
                  style={{ color: accent }}>{p.dia}</span>
                <h4 className="font-display text-base font-light leading-tight"
                  style={{ color: T.creme }}>{p.nome}</h4>
                <p className="mt-0.5 text-[12px] font-light leading-snug" style={{ color: T.cSoft }}>
                  {p.desc}
                </p>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}

/* ============================================================
   MAPAS DE LOCALIZAÇÃO (referência do catálogo)
   Chile na América do Sul + zoom na Patagônia Chilena
   com os aeroportos SCL · PNT · PUQ.
   ============================================================ */
/* Nomes (world-atlas / properties.name) usados para filtrar a América do Sul */
const SA_NAMES = [
  "Argentina", "Bolivia", "Brazil", "Chile", "Colombia", "Ecuador",
  "Guyana", "Paraguay", "Peru", "Suriname", "Uruguay", "Venezuela",
  "Falkland Is.", "French Guiana",
];

/* lx/ly = posição do rótulo em coords SVG do painel (com traço conector até o pino) */
type Marker = { lng: number; lat: number; nome: string; sub?: string; main?: boolean; lx: number; ly: number };

export function LocationMaps() {
  const [countries, setCountries] = useState<GeoJSON.Feature[]>([]);
  useEffect(() => {
    import("world-atlas/countries-50m.json").then((mod) => {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const data = mod.default as any;
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const geo = feature(data, data.objects.countries) as any;
      setCountries(geo.features);
    });
  }, []);

  return (
    <div className="grid gap-5 sm:grid-cols-2">
      {/* Painel 1 — Chile na América do Sul */}
      <div className="rounded-2xl border p-6" style={{ borderColor: T.line, background: T.granito }}>
        <p className="mb-4 text-[10px] font-semibold uppercase tracking-[0.3em]" style={{ color: T.ouro }}>
          Chile · América do Sul
        </p>
        <GeoMap
          countries={countries}
          w={300} h={360} pad={16}
          regionNames={SA_NAMES}
          fitBox={[[-82, 13], [-34, -56]]}
          markers={[
            { lng: -70.66, lat: -33.45, nome: "Santiago", sub: "SCL", lx: 150, ly: 200 },
            { lng: -72.98, lat: -50.94, nome: "Torres del Paine", sub: "Patagônia", main: true, lx: 146, ly: 300 },
          ]}
        />
      </div>

      {/* Painel 2 — Patagônia Chilena (zoom) */}
      <div className="rounded-2xl border p-6" style={{ borderColor: T.line, background: T.granito }}>
        <p className="mb-4 text-[10px] font-semibold uppercase tracking-[0.3em]" style={{ color: T.ouro }}>
          Patagônia Chilena
        </p>
        <GeoMap
          countries={countries}
          w={300} h={330} pad={14}
          fitBox={[[-78, -46], [-65, -56]]}
          markers={[
            { lng: -72.98, lat: -50.94, nome: "Torres del Paine", sub: "Parque Nacional", main: true, lx: 178, ly: 122 },
            { lng: -72.51, lat: -51.73, nome: "Puerto Natales", sub: "PNT · 115 km", lx: 186, ly: 182 },
            { lng: -70.91, lat: -53.16, nome: "Punta Arenas", sub: "PUQ", lx: 198, ly: 246 },
          ]}
        />
        <p className="mt-4 text-[12px] font-light leading-relaxed" style={{ color: T.cSoft }}>
          Voo para Punta Arenas (PUQ) ou Puerto Natales (PNT). A AONIK conduz você até o parque.
        </p>
      </div>
    </div>
  );
}

/* Mapa geográfico real — projeção Mercator, país-destaque, marcadores */
function GeoMap({
  countries, w, h, pad, regionNames, fitBox, markers,
}: {
  countries: GeoJSON.Feature[];
  w: number; h: number; pad: number;
  regionNames?: string[];
  fitBox: [[number, number], [number, number]]; // [[lngW, latN], [lngE, latS]]
  markers: Marker[];
}) {
  const { pathGen, proj, feats } = useMemo(() => {
    // Recorte de bounds via polígono (fitExtent)
    const [[lw, ln], [le, ls]] = fitBox;
    const box: GeoJSON.Feature = {
      type: "Feature", properties: {},
      geometry: { type: "Polygon", coordinates: [[[lw, ln], [le, ln], [le, ls], [lw, ls], [lw, ln]]] },
    };
    const p = geoMercator().fitExtent([[pad, pad], [w - pad, h - pad]], box);
    const list = regionNames
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      ? countries.filter((c) => regionNames.includes((c.properties as any)?.name))
      : countries;
    return { pathGen: geoPath(p), proj: p, feats: list };
  }, [countries, w, h, pad, regionNames, fitBox]);

  const isChile = (c: GeoJSON.Feature) =>
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (c.properties as any)?.name === "Chile";

  return (
    <svg viewBox={`0 0 ${w} ${h}`} className="w-full" role="img">
      <title>{`Mapa de localização: ${markers.find((m) => m.main)?.nome ?? "Torres del Paine"}`}</title>
      <defs>
        <clipPath id={`clip-${w}-${h}`}>
          <rect x="0" y="0" width={w} height={h} rx="10" />
        </clipPath>
      </defs>
      <g clipPath={`url(#clip-${w}-${h})`}>
        {/* Países */}
        {feats.map((c, i) => {
          const chile = isChile(c);
          return (
            <motion.path
              key={i}
              // eslint-disable-next-line @typescript-eslint/no-explicit-any
              d={pathGen(c as any) ?? ""}
              fill={chile ? T.ouro : T.granitoSoft}
              stroke={chile ? T.ouroSoft : "rgba(156,195,212,0.22)"}
              strokeWidth={chile ? 0.8 : 0.5}
              strokeLinejoin="round"
              initial={{ opacity: 0 }}
              animate={{ opacity: chile ? 0.92 : 0.55 }}
              transition={{ duration: 0.8, ease: EASE, delay: chile ? 0.4 : 0.1 }}
            />
          );
        })}
        {/* Marcadores com traço conector + pílula de rótulo */}
        {feats.length > 0 && markers.map((m, i) => {
          const c = proj([m.lng, m.lat]);
          if (!c) return null;
          const [x, y] = c;
          const fs = m.main ? 10.5 : 9.5;
          const chars = Math.max(m.nome.length, (m.sub?.length ?? 0));
          const pillW = Math.round(chars * fs * 0.56) + 16;
          const pillH = m.sub ? 30 : 19;
          const pillY = m.ly - pillH / 2;
          // ponto da pílula mais próximo do pino, para o traço encostar limpo
          const connX = m.lx > x ? m.lx : m.lx + pillW;
          return (
            <motion.g key={m.nome}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, ease: EASE, delay: 0.9 + i * 0.18 }}>
              {/* traço conector */}
              <line x1={x} y1={y} x2={connX} y2={m.ly}
                stroke={m.main ? T.ouro : T.gelo} strokeWidth="0.8"
                strokeDasharray="2 3" opacity="0.55" />
              {/* pino */}
              {m.main && <circle cx={x} cy={y} r={9} fill={T.ouro} opacity="0.22" />}
              <circle cx={x} cy={y} r={m.main ? 4.5 : 3} fill={m.main ? T.ouro : T.gelo}
                stroke={T.ink} strokeWidth="1" />
              {/* pílula de fundo */}
              <rect x={m.lx} y={pillY} width={pillW} height={pillH} rx="5"
                fill="rgba(12,18,25,0.82)" stroke={m.main ? T.ouro : T.line} strokeWidth="0.7" />
              {/* textos */}
              <text x={m.lx + 8} y={m.sub ? pillY + 13 : m.ly + 3.5} fontSize={fs}
                fill={m.main ? T.creme : T.cInk} style={{ fontWeight: 300 }}>{m.nome}</text>
              {m.sub && (
                <text x={m.lx + 8} y={pillY + 24} fontSize="8"
                  fill={m.main ? T.ouroSoft : T.cFaint} style={{ letterSpacing: "0.4px" }}>{m.sub}</text>
              )}
            </motion.g>
          );
        })}
      </g>
    </svg>
  );
}

/* ============================================================
   GALERIA INTERATIVA (featured + miniaturas)
   ============================================================ */
export type GalImg = { src: string; cap: string; tag: string };
export function Galeria({ images, accent = T.ouro }: { images: GalImg[]; accent?: string }) {
  const [idx, setIdx] = useState(0);
  const prev = () => setIdx((i) => (i - 1 + images.length) % images.length);
  const next = () => setIdx((i) => (i + 1) % images.length);
  const img = images[idx];
  return (
    <div className="flex flex-col gap-3">
      <div className="relative overflow-hidden rounded-2xl" style={{ aspectRatio: "16/10" }}>
        <AnimatePresence mode="wait">
          <motion.div key={idx}
            initial={{ opacity: 0.6, scale: 1.02 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0 }}
            transition={{ duration: 0.4, ease: EASE }} className="absolute inset-0">
            <img src={img.src} alt={img.cap} className="h-full w-full object-cover" />
          </motion.div>
        </AnimatePresence>
        <div className="absolute inset-0" style={{ background: `linear-gradient(to top, ${T.ink}cc 0%, transparent 55%)` }} />
        <div className="absolute bottom-0 left-0 right-0 p-6">
          <span className="text-[10px] font-semibold uppercase tracking-[0.32em]" style={{ color: accent }}>{img.tag}</span>
          <p className="mt-1 text-[14px] font-light" style={{ color: T.creme }}>{img.cap}</p>
        </div>
        <span className="absolute right-4 top-4 text-[11px] font-medium" style={{ color: T.cFaint }}>{idx + 1} / {images.length}</span>
        <button onClick={prev} aria-label="Anterior"
          className="absolute left-4 top-1/2 -translate-y-1/2 flex h-10 w-10 items-center justify-center rounded-full text-base transition-all"
          style={{ background: "rgba(12,18,25,0.6)", color: accent }}>‹</button>
        <button onClick={next} aria-label="Próxima"
          className="absolute right-4 top-1/2 -translate-y-1/2 flex h-10 w-10 items-center justify-center rounded-full text-base transition-all"
          style={{ background: "rgba(12,18,25,0.6)", color: accent }}>›</button>
      </div>
      <div className="grid grid-cols-4 gap-2 sm:grid-cols-6">
        {images.map((g, i) => (
          <button key={i} onClick={() => setIdx(i)} aria-label={g.cap}
            className="relative overflow-hidden rounded-lg transition-all duration-300"
            style={{ aspectRatio: "16/10", outline: i === idx ? `2px solid ${accent}` : "2px solid transparent", outlineOffset: 2 }}>
            <img src={g.src} alt={g.cap} className="h-full w-full object-cover transition-opacity duration-300"
              style={{ opacity: i === idx ? 1 : 0.42 }} />
          </button>
        ))}
      </div>
    </div>
  );
}

/* ============================================================
   TARIFAS — Temporada 2026/2027
   Badges = PERFIL DE HOSPEDAGEM (Camping / Refúgio / Hotel + Refúgio).
   Linhas = tarifa por pessoa, suplemento single, jantares especiais.
   + Informações importantes + Promoção vigente (Early Booking).
   ============================================================ */
export type TarifaPerfil = {
  key: string;
  label: string;
  tarifa: number;
  base2pax: boolean;
  single: number | null;
  jantar: number;
  nota: string;
  inclui?: string[];
};

const INFO_IMPORTANTES = [
  "O valor desta publicação é apresentado em DÓLAR. No ato do fechamento, a base referencial de conversão para o REAL é o DÓLAR TURISMO, na cotação do dia da negociação.",
  "Consulte a disponibilidade com antecedência. Normalmente levamos de 48h a 72h para validar as hospedagens no destino, conferindo cada oportunidade em detalhe, pois a demanda é extremamente alta.",
  "O Parque Nacional Torres del Paine é um dos 10 mais visitados do mundo e a capacidade de hospedagem é limitada por temporada.",
];
const INFO_AVISO =
  "Avisos de fechamento do parque ou alterações de datas na temporada podem ocorrer a qualquer momento e sem aviso prévio, sob responsabilidade da gestão do Parque Nacional, por variáveis climáticas e outras situações imprevistas, além do nosso controle e por força maior.";

const PROMO = {
  validade: "31 de julho de 2027",
  formas: [
    { titulo: "À vista", badge: "10% OFF", destaque: true, desc: "Pagamento integral à vista, com 10% de desconto.", entrada: "PIX ou transferência", obs: "Quitação imediata." },
    { titulo: "Parcelado", badge: "5% OFF", destaque: true, desc: "Entrada de 30% + saldo em até 7x sem juros, com 5% de desconto.", entrada: "Entrada em PIX/transferência · parcelas no cartão", obs: "No cartão de crédito não há prazo de quitação antes da viagem." },
    { titulo: "Em 10x", badge: "sem juros", destaque: false, desc: "Saldo em até 10x sem juros, sem desconto adicional.", entrada: "Entrada em PIX/transferência · parcelas no cartão", obs: "No cartão de crédito não há prazo de quitação antes da viagem." },
  ],
};

export function Tarifas({ accent, perfis, naoInclui }: { accent: string; perfis: TarifaPerfil[]; naoInclui?: string[] }) {
  const [sel, setSel] = useState(0);
  const p = perfis[sel];
  const fmt = (n: number) => `U$ ${n.toLocaleString("pt-BR")}`;
  const linhas: { label: string; valor: number }[] = [
    { label: p.base2pax ? "Tarifa por pessoa · base 2 pax" : "Tarifa por pessoa", valor: p.tarifa },
    ...(p.single != null ? [{ label: "Suplemento single", valor: p.single }] : []),
    { label: "Jantares especiais *", valor: p.jantar },
  ];
  return (
    <div>
      {/* badges = perfil de hospedagem */}
      <div className="mb-6 flex flex-wrap gap-2">
        {perfis.map((pf, i) => {
          const on = i === sel;
          return (
            <button key={pf.key} onClick={() => setSel(i)}
              className="rounded-full border px-5 py-2.5 text-[12px] font-semibold uppercase tracking-[0.12em] transition-all duration-300"
              style={{ borderColor: on ? accent : T.line, background: on ? accent : "transparent", color: on ? T.ink : T.cSoft }}>
              {pf.label}
            </button>
          );
        })}
      </div>

      {/* tabela do perfil selecionado */}
      <div className="overflow-hidden rounded-2xl border" style={{ borderColor: T.line }}>
        <div className="flex items-center justify-between px-6 py-3" style={{ background: accent }}>
          <span className="text-[11px] font-semibold uppercase tracking-[0.2em]" style={{ color: T.ink }}>{p.label}</span>
          <span className="text-[11px] font-semibold uppercase tracking-[0.2em]" style={{ color: T.ink }}>Por pessoa · USD</span>
        </div>
        {linhas.map((l, i) => (
          <div key={l.label} className="flex items-center justify-between px-6 py-4"
            style={{ borderTop: i === 0 ? "none" : `1px solid ${T.line}`, background: i % 2 ? "rgba(156,195,212,0.03)" : "transparent" }}>
            <span className="pr-4 text-[14px] font-light" style={{ color: T.cInk }}>{l.label}</span>
            <span className="font-display text-[clamp(1.1rem,2.4vw,1.5rem)] font-light whitespace-nowrap" style={{ color: T.creme }}>{fmt(l.valor)}</span>
          </div>
        ))}

        {/* INCLUI — por perfil (extensão da tabela) */}
        {p.inclui && p.inclui.length > 0 && (
          <div style={{ borderTop: `1px solid ${T.line}` }}>
            <div className="px-6 pt-5 pb-2">
              <span className="text-[10px] font-semibold uppercase tracking-[0.26em]" style={{ color: accent }}>O que está incluído</span>
            </div>
            <ul className="px-6 pb-5 space-y-2">
              {p.inclui.map((item) => (
                <li key={item} className="flex items-start gap-2 text-[12.5px] font-light leading-relaxed" style={{ color: T.cSoft }}>
                  <span className="mt-0.5 shrink-0" style={{ color: accent }}>✦</span>{item}
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* NÃO INCLUI */}
        {naoInclui && naoInclui.length > 0 && (
          <div style={{ borderTop: `1px solid ${T.line}`, background: "rgba(156,195,212,0.02)" }}>
            <div className="px-6 pt-5 pb-2">
              <span className="text-[10px] font-semibold uppercase tracking-[0.26em]" style={{ color: "rgba(156,195,212,0.45)" }}>Não incluído</span>
            </div>
            <ul className="px-6 pb-5 space-y-2">
              {naoInclui.map((item) => (
                <li key={item} className="flex items-start gap-2 text-[12.5px] font-light leading-relaxed" style={{ color: T.cFaint }}>
                  <span className="mt-0.5 shrink-0" style={{ color: "rgba(156,195,212,0.35)" }}>×</span>{item}
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>

      {/* legendas do perfil */}
      <ul className="mt-5 space-y-2">
        {[p.nota, "* Jantares especiais aplicados em períodos festivos: 24/12 e 31/12."].map((n) => (
          <li key={n} className="flex items-start gap-2 text-[12px] font-light leading-relaxed" style={{ color: T.cSoft }}>
            <span className="mt-0.5 shrink-0" style={{ color: accent }}>·</span>{n}
          </li>
        ))}
      </ul>

      {/* INFORMAÇÕES IMPORTANTES */}
      <div className="mt-10">
        <p className="mb-3 text-[11px] font-semibold uppercase tracking-[0.28em]" style={{ color: T.gelo }}>Informações importantes</p>
        <ul className="space-y-2.5">
          {INFO_IMPORTANTES.map((n) => (
            <li key={n} className="flex items-start gap-2 text-[12.5px] font-light leading-relaxed" style={{ color: T.cSoft }}>
              <span className="mt-0.5 shrink-0" style={{ color: T.gelo }}>·</span>{n}
            </li>
          ))}
          <li className="flex items-start gap-2 text-[12.5px] font-semibold leading-relaxed" style={{ color: T.creme }}>
            <span className="mt-0.5 shrink-0" style={{ color: T.creme }}>·</span>{INFO_AVISO}
          </li>
        </ul>
      </div>

      {/* PROMOÇÃO VIGENTE — Early Booking */}
      <div className="mt-10 rounded-2xl border p-6 md:p-8" style={{ borderColor: accent, background: "rgba(156,195,212,0.04)" }}>
        <div className="flex flex-wrap items-baseline justify-between gap-2">
          <p className="text-[11px] font-semibold uppercase tracking-[0.28em]" style={{ color: accent }}>Promoção vigente</p>
          <p className="text-[11px] uppercase tracking-[0.16em]" style={{ color: T.cFaint }}>válida até {PROMO.validade}</p>
        </div>
        <h3 className="mt-2 font-display text-2xl font-light" style={{ color: T.creme }}>
          Early Booking <span className="text-lg" style={{ color: T.cSoft }}>(reserva antecipada)</span>
        </h3>
        <p className="mt-1 text-[13px] font-light" style={{ color: T.cSoft }}>Descontos por forma de pagamento. Escolha a que melhor combina com você.</p>
        <div className="mt-6 grid gap-4 md:grid-cols-3">
          {PROMO.formas.map((f) => (
            <div key={f.titulo} className="rounded-xl border p-5"
              style={{ borderColor: f.destaque ? accent : T.line, background: f.destaque ? "rgba(207,154,78,0.06)" : "transparent" }}>
              <div className="flex items-center justify-between">
                <span className="font-display text-lg font-light" style={{ color: T.creme }}>{f.titulo}</span>
                <span className="rounded-full px-2.5 py-0.5 text-[10px] font-semibold uppercase tracking-[0.1em]"
                  style={{ background: f.destaque ? accent : T.line, color: f.destaque ? T.ink : T.cSoft }}>{f.badge}</span>
              </div>
              <p className="mt-2 text-[12.5px] font-light leading-relaxed" style={{ color: T.cSoft }}>{f.desc}</p>
              <p className="mt-3 text-[11px] font-light" style={{ color: T.cFaint }}>{f.entrada}</p>
              <p className="mt-1 text-[11px] font-light italic" style={{ color: T.cFaint }}>{f.obs}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ============================================================
   POPUP DE HOSPEDAGEM — galeria de fotos por tipo
   ============================================================ */
export type HospModalData = { nome: string; tipo: string; desc: string; imgs: string[] };

export function HospModal({
  data,
  onClose,
  accent = T.ouro,
}: {
  data: HospModalData | null;
  onClose: () => void;
  accent?: string;
}) {
  const [idx, setIdx] = useState(0);
  if (!data) return null;
  const prev = () => setIdx((i) => (i - 1 + data.imgs.length) % data.imgs.length);
  const next = () => setIdx((i) => (i + 1) % data.imgs.length);
  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 z-50 flex items-center justify-center p-4"
        style={{ background: "rgba(12,18,25,0.90)" }}
        initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
        onClick={onClose}
      >
        <motion.div
          className="relative w-full max-w-2xl overflow-hidden rounded-2xl"
          style={{ background: T.granito }}
          initial={{ opacity: 0, scale: 0.96, y: 16 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.96 }}
          transition={{ duration: 0.32, ease: EASE }}
          onClick={(e) => e.stopPropagation()}
        >
          {/* Imagem */}
          <div className="relative overflow-hidden" style={{ aspectRatio: "16/9" }}>
            <AnimatePresence mode="wait">
              <motion.img
                key={idx} src={data.imgs[idx]} alt={`${data.nome} ${idx + 1}`}
                className="absolute inset-0 h-full w-full object-cover"
                initial={{ opacity: 0.5 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
              />
            </AnimatePresence>
            <div className="absolute inset-0 pointer-events-none"
              style={{ background: `linear-gradient(to top, ${T.ink}99, transparent 50%)` }} />
            {/* Setas */}
            {data.imgs.length > 1 && (
              <>
                <button onClick={prev} aria-label="Anterior"
                  className="absolute left-3 top-1/2 -translate-y-1/2 flex h-10 w-10 items-center justify-center rounded-full text-xl transition-opacity hover:opacity-80"
                  style={{ background: "rgba(12,18,25,0.65)", color: accent }}>‹</button>
                <button onClick={next} aria-label="Próxima"
                  className="absolute right-3 top-1/2 -translate-y-1/2 flex h-10 w-10 items-center justify-center rounded-full text-xl transition-opacity hover:opacity-80"
                  style={{ background: "rgba(12,18,25,0.65)", color: accent }}>›</button>
              </>
            )}
            {/* Fechar */}
            <button onClick={onClose} aria-label="Fechar"
              className="absolute right-4 top-4 flex h-8 w-8 items-center justify-center rounded-full text-sm font-medium transition-opacity hover:opacity-70"
              style={{ background: "rgba(12,18,25,0.7)", color: T.creme }}>✕</button>
            <span className="absolute right-4 bottom-4 text-[11px]" style={{ color: T.cFaint }}>
              {idx + 1} / {data.imgs.length}
            </span>
          </div>
          {/* Dots */}
          {data.imgs.length > 1 && (
            <div className="flex justify-center gap-2 pt-4 pb-1">
              {data.imgs.map((_, i) => (
                <button key={i} onClick={() => setIdx(i)} aria-label={`Foto ${i + 1}`}
                  className="h-1.5 rounded-full transition-all duration-300"
                  style={{ width: i === idx ? 22 : 7, background: i === idx ? accent : T.cFaint }} />
              ))}
            </div>
          )}
          {/* Texto */}
          <div className="px-6 py-5">
            <p className="text-[10px] font-semibold uppercase tracking-[0.22em]" style={{ color: accent }}>{data.tipo}</p>
            <h3 className="mt-1 font-display text-2xl font-light" style={{ color: T.creme }}>{data.nome}</h3>
            <p className="mt-2 text-[13px] font-light leading-relaxed" style={{ color: T.cSoft }}>{data.desc}</p>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}

/* ============================================================
   PROGRAMAPAGE — página de produto data-driven
   ============================================================ */
export type RoteiroDia = { dia: string; titulo: string; desc: string; km?: string; horas?: string; desnivel?: string; pernoite?: string };
export type Hospedagem = { nome: string; tipo: string; desc: string; img: string; imgs?: string[] };
export type Programa = {
  slug: string;
  accentKey: AccentKey;
  selo: string;
  kicker: string;
  nome: string;
  titulo: [string, string];
  taglineLead: string;
  tagline: string;
  heroImg: string;
  resumoTitulo: string;
  resumo: string;
  stats: { label: string; value: string }[];
  roteiroNote: string;
  roteiro: RoteiroDia[];
  inclui: string[];
  naoInclui: string[];
  hospedagens: Hospedagem[];
  tarifaPerfis: TarifaPerfil[];
  galeria: GalImg[];
};

export function ProgramaPage({ data }: { data: Programa }) {
  const p = PROG[data.accentKey];
  const A = p.accent, AS = p.soft, AD = p.dark;
  const [hospModal, setHospModal] = useState<HospModalData | null>(null);
  return (
    <main className="relative" style={{ background: T.creme }}>
      <Nav />

      {/* HERO */}
      <section className="relative flex min-h-[100svh] w-full items-center overflow-hidden" style={{ background: AD }}>
        <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: `url('${data.heroImg}')`, opacity: 0.5 }} />
        <div className="absolute inset-0" style={{ background: `linear-gradient(100deg, ${AD}f2 0%, ${AD}d9 34%, ${AD}80 58%, ${AD}40 100%)` }} />
        <div className="relative z-10 mx-auto grid w-full max-w-[1400px] items-center gap-10 px-6 py-28 md:grid-cols-[1.15fr_0.85fr] md:px-10">
          <div>
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1, ease: EASE, delay: 0.2 }}
              className="inline-flex items-center gap-3">
              <span className="rounded-full px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.2em]" style={{ background: A, color: T.creme }}>{data.selo}</span>
              <span className="text-[12px] font-medium uppercase tracking-[0.3em]" style={{ color: AS }}>{data.kicker}</span>
            </motion.div>
            <motion.h1 initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1.1, ease: EASE, delay: 0.3 }}
              className="mt-5 font-display text-[clamp(2.6rem,6.4vw,5.4rem)] font-light uppercase leading-[0.88] tracking-[-0.02em]" style={{ color: T.creme }}>
              {data.titulo[0]}<br />{data.titulo[1]}
            </motion.h1>
            <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1, ease: EASE, delay: 0.5 }}
              className="mt-6 max-w-md text-[15px] font-light leading-relaxed md:text-base" style={{ color: T.cSoft }}>
              {data.taglineLead} <span style={{ color: T.creme }}>{data.tagline}</span>
            </motion.p>
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1, ease: EASE, delay: 0.65 }}
              className="mt-8 flex flex-wrap items-center gap-5">
              <a href="#contato" className="inline-flex items-center gap-3 rounded-full px-8 py-4 text-[13px] font-semibold uppercase tracking-[0.16em] transition-transform duration-300 hover:scale-[1.03]"
                style={{ background: A, color: T.creme }}>
                Quero esta viagem <span>→</span>
              </a>
              <a href="#tarifas" className="text-[12px] uppercase tracking-[0.16em] transition-colors" style={{ color: T.cFaint }}>Ver tarifas</a>
            </motion.div>
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.8, ease: EASE, delay: 0.85 }}
              className="mt-6 flex items-center gap-2 text-[11px] font-medium uppercase tracking-[0.18em]" style={{ color: T.cFaint }}>
              <a href="/destinos/torres-del-paine" className="transition-colors hover:opacity-80">Torres del Paine</a>
              <span>/</span><span style={{ color: AS }}>{data.nome}</span>
            </motion.div>
          </div>
          <motion.div initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 1.2, ease: EASE, delay: 0.3 }}
            className="mx-auto hidden h-[300px] w-full max-w-[420px] md:block md:h-[360px]">
            <WSignature stroke={T.creme} accent={AS} />
          </motion.div>
        </div>
      </section>

      {/* RESUMO / STATS */}
      <section className="px-6 py-14 md:px-10" style={{ background: T.granito }}>
        <div className="mx-auto grid max-w-[1280px] grid-cols-2 gap-6 md:grid-cols-4 lg:grid-cols-5">
          {data.stats.map((s, i) => (
            <Reveal key={s.label} delay={i * 0.05}>
              <div className="border-l pl-4" style={{ borderColor: T.line }}>
                <p className="font-display text-[clamp(1.5rem,2.8vw,2.2rem)] font-light" style={{ color: T.creme }}>{s.value}</p>
                <p className="mt-1 text-[11px] font-semibold uppercase tracking-[0.16em]" style={{ color: AS }}>{s.label}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* NARRATIVA */}
      <section className="px-6 py-24 md:px-10 md:py-28" style={{ background: T.creme, color: T.ink }}>
        <div className="mx-auto max-w-[820px] text-center">
          <Reveal><p className="text-[11px] font-semibold uppercase tracking-[0.34em]" style={{ color: A }}>{data.resumoTitulo}</p></Reveal>
          <Reveal delay={0.1}>
            <p className="mt-6 font-display text-[clamp(1.4rem,3vw,2.3rem)] font-light leading-[1.3] tracking-[-0.01em]" style={{ color: T.granito }}>{data.resumo}</p>
          </Reveal>
        </div>
      </section>

      {/* ROTEIRO DIA A DIA */}
      <section className="px-6 py-24 md:px-10 md:py-28" style={{ background: T.granito, color: T.creme }}>
        <div className="mx-auto max-w-[1100px]">
          <Reveal><p className="text-[11px] font-semibold uppercase tracking-[0.32em]" style={{ color: AS }}>O roteiro, dia a dia</p></Reveal>
          <Reveal delay={0.06}><p className="mt-4 max-w-xl text-[14px] font-light leading-relaxed" style={{ color: T.cSoft }}>{data.roteiroNote}</p></Reveal>
          <div className="mt-12">
            {data.roteiro.map((r, i) => (
              <Reveal key={r.dia} delay={i * 0.04}>
                <div className="grid gap-4 border-t py-7 md:grid-cols-[120px_1fr_200px] md:gap-8" style={{ borderColor: T.line }}>
                  <span className="font-display text-sm uppercase tracking-[0.1em]" style={{ color: AS }}>{r.dia}</span>
                  <div>
                    <h3 className="font-display text-xl font-light md:text-2xl">{r.titulo}</h3>
                    <p className="mt-2 text-[14px] font-light leading-relaxed" style={{ color: T.cSoft }}>{r.desc}</p>
                  </div>
                  <div className="flex flex-col gap-1 text-[12px] font-light md:text-right" style={{ color: T.cFaint }}>
                    {r.km && <span className="text-[14px] font-bold" style={{ color: T.creme }}>{r.km}</span>}
                    {r.horas && <span>{r.horas}</span>}
                    {r.desnivel && <span>{r.desnivel}</span>}
                    {r.pernoite && <span style={{ color: AS }}>{r.pernoite}</span>}
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* MAPA DO W */}
      <section className="px-6 py-24 md:px-10 md:py-28" style={{ background: T.ink }}>
        <div className="mx-auto max-w-[1280px]">
          <Reveal><p className="mb-3 text-[11px] font-semibold uppercase tracking-[0.32em]" style={{ color: AS }}>Mapa do programa</p></Reveal>
          <Reveal delay={0.05}><h2 className="mb-10 max-w-2xl font-display text-[clamp(1.8rem,3.6vw,3rem)] font-light leading-[1.1]" style={{ color: T.creme }}>Os marcos que você vai conquistar</h2></Reveal>
          <Reveal delay={0.1}><WMap accent={A} /></Reveal>
        </div>
      </section>

      {/* HOSPEDAGENS */}
      <section className="px-6 py-24 md:px-10 md:py-28" style={{ background: T.creme, color: T.ink }}>
        <div className="mx-auto max-w-[1280px]">
          <Reveal><p className="mb-3 text-[11px] font-semibold uppercase tracking-[0.32em]" style={{ color: A }}>Onde você descansa</p></Reveal>
          <Reveal delay={0.05}><h2 className="mb-10 max-w-2xl font-display text-[clamp(1.8rem,3.6vw,3rem)] font-light leading-[1.1]" style={{ color: T.granito }}>Conforto no fim de cada caminhada</h2></Reveal>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {data.hospedagens.map((h, i) => (
              <Reveal key={h.nome} delay={i * 0.06}>
                <button
                  className="group w-full overflow-hidden rounded-xl border text-left transition-transform duration-300 hover:-translate-y-1"
                  style={{ borderColor: "rgba(27,39,51,0.12)", background: "#fff" }}
                  onClick={() => setHospModal({ nome: h.nome, tipo: h.tipo, desc: h.desc, imgs: h.imgs ?? [h.img] })}
                >
                  <div className="relative h-52 overflow-hidden">
                    <div className="absolute inset-0 scale-105 bg-cover bg-center transition-transform duration-[1200ms] group-hover:scale-110" style={{ backgroundImage: `url('${h.img}')` }} />
                    <div className="absolute inset-0" style={{ background: `linear-gradient(to top, ${T.ink}d9, transparent 60%)` }} />
                    <span className="absolute bottom-3 left-4 text-[10px] font-semibold uppercase tracking-[0.18em]" style={{ color: AS }}>{h.tipo}</span>
                    <span className="absolute right-3 top-3 rounded-full px-2.5 py-1 text-[9px] font-semibold uppercase tracking-[0.14em] opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                      style={{ background: "rgba(12,18,25,0.7)", color: AS }}>Ver fotos →</span>
                  </div>
                  <div className="p-5">
                    <h3 className="font-display text-xl font-light" style={{ color: T.granito }}>{h.nome}</h3>
                    <p className="mt-2 text-[13px] font-light leading-relaxed" style={{ color: "rgba(12,18,25,0.6)" }}>{h.desc}</p>
                  </div>
                </button>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* GALERIA */}
      <section className="px-6 py-24 md:px-10 md:py-28" style={{ background: T.ink }}>
        <div className="mx-auto max-w-[1280px]">
          <Reveal><p className="mb-8 text-[11px] font-semibold uppercase tracking-[0.32em]" style={{ color: AS }}>Galeria</p></Reveal>
          <Reveal delay={0.08}><Galeria images={data.galeria} accent={A} /></Reveal>
        </div>
      </section>

      {/* TARIFAS */}
      <section id="tarifas" className="scroll-mt-24 px-6 py-24 md:px-10 md:py-28" style={{ background: T.granito, color: T.creme }}>
        <div className="mx-auto max-w-[860px]">
          <Reveal><p className="text-[11px] font-semibold uppercase tracking-[0.32em]" style={{ color: AS }}>Tarifas · Temporada 2026/2027</p></Reveal>
          <Reveal delay={0.05}><h2 className="mt-4 mb-8 font-display text-[clamp(1.8rem,3.6vw,2.8rem)] font-light leading-[1.15]">Defina abaixo o seu perfil de hospedagem ideal</h2></Reveal>
          <Reveal delay={0.1}><Tarifas accent={A} perfis={data.tarifaPerfis} naoInclui={data.naoInclui} /></Reveal>
        </div>
      </section>

      {/* AONIKIA */}
      <section className="px-6 py-20 md:px-10 md:py-24" style={{ background: T.ink }}>
        <div className="mx-auto max-w-[860px] text-center">
          <Reveal>
            <p className="text-[11px] font-semibold uppercase tracking-[0.3em]" style={{ color: AS }}>Aonik <strong className="font-bold">IA</strong> · especialista nesta página</p>
            <h2 className="mt-5 font-display text-[clamp(1.8rem,3.5vw,2.8rem)] font-light leading-[1.15]" style={{ color: T.creme }}>Dúvidas sobre o {data.nome}?</h2>
            <p className="mx-auto mt-4 max-w-md text-[15px] font-light leading-relaxed" style={{ color: T.cSoft }}>
              Nível da trilha, melhor época, o que levar, refúgio ou camping, tarifas. A Aonik <strong className="font-semibold" style={{ color: T.creme }}>IA</strong> responde sobre este circuito. Para outros assuntos, te levamos ao WhatsApp do time AONIK.
            </p>
            <button
              onClick={() => { if (typeof window !== "undefined") window.dispatchEvent(new CustomEvent("open-aonikia", { detail: { slug: data.slug } })); }}
              className="mt-7 inline-flex items-center gap-3 rounded-full border px-7 py-3.5 text-[12px] font-semibold uppercase tracking-[0.16em] transition-all duration-300 hover:scale-[1.03]" style={{ borderColor: AS, color: AS }}>
              Conversar com a Aonik <strong className="font-bold">IA</strong> <span>→</span>
            </button>
          </Reveal>
        </div>
      </section>

      <Contato destino={`PATAGÔNIA CHILENA - Torres del Paine · ${data.nome}`} />
      <Footer />
      <FloatingActions />

      <HospModal data={hospModal} onClose={() => setHospModal(null)} accent={A} />
    </main>
  );
}
