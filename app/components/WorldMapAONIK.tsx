"use client";

import { useState, useRef, useEffect, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { geoMercator, geoPath } from "d3-geo";
import { feature } from "topojson-client";

// ─── Tipos ────────────────────────────────────────────────────────────────────

interface Destination {
  id: string;
  name: string;
  region: string;
  tagline: string;
  taglines: Partial<Record<number, string>>;
  years: number[];
  lat: number;
  lng: number;
  labelOffsetX: number;
  labelOffsetY: number;
  type: "aventura" | "cultural";
  description: string;
  href?: string;
}

// ─── Dados ────────────────────────────────────────────────────────────────────

const DESTINATIONS: Destination[] = [
  {
    id: "tour-mont-blanc",
    name: "Tour du Mont Blanc",
    region: "Alpes · 3 países",
    tagline: "18–31 Ago 2026",
    taglines: { 2026: "18–31 Ago 2026", 2027: "17–30 Ago 2027" },
    years: [2026, 2027],
    lat: 45.83,
    lng: 6.86,
    labelOffsetX: 0,
    labelOffsetY: -52,
    type: "aventura",
    description:
      "Trilha icônica que atravessa França, Itália e Suíça em 170 km pelos Alpes. 14 dias, 8.823 m de desnível. Saída confirmada.",
    href: "/destinos/tour-du-mont-blanc",
  },
  {
    id: "dolomitas-bavaria",
    name: "Dolomitas · Bavária",
    region: "Europa Central",
    tagline: "Set 2026 + Set 2027",
    taglines: { 2026: "03–12 Set 2026", 2027: "02 Set + Bavária 2027" },
    years: [2026, 2027],
    lat: 46.9,
    lng: 12.5,
    labelOffsetX: 68,
    labelOffsetY: -20,
    type: "aventura",
    description:
      "Alta Via 1 nos Dolomitas italianos (10 dias, Set 2026) e Bavária Alemã pelos Alpes bávaros (9 dias, Set 2027).",
  },
  {
    id: "douro-experience",
    name: "Douro Experience",
    region: "Vale do Douro · Portugal",
    tagline: "14–21 Set 2026",
    taglines: { 2026: "14–21 Set 2026", 2027: "20–28 Set 2027" },
    years: [2026, 2027],
    lat: 41.1,
    lng: -7.8,
    labelOffsetX: -68,
    labelOffsetY: -20,
    type: "cultural",
    description:
      "8 dias de caminhada pelo Vale do Douro, entre quintas históricas, vinhas e aldeias de xisto. 58,7 km, 2.051 m+.",
    href: "/destinos/douro",
  },
  {
    id: "coxilha-rica",
    name: "Coxilha Rica",
    region: "Serra Catarinense · Brasil",
    tagline: "3 saídas em 2026",
    taglines: { 2026: "3 saídas · Abr/Jun/Set", 2027: "3 saídas · Abr/Jun/Ago" },
    years: [2026, 2027],
    lat: -28.4,
    lng: -50.8,
    labelOffsetX: 64,
    labelOffsetY: -18,
    type: "aventura",
    description:
      "55 km pela Serra Catarinense, um dos trekkings mais bonitos do Brasil. Abril, Junho e Setembro. Saída confirmada.",
  },
  {
    id: "dana-petra",
    name: "Dana → Petra",
    region: "Deserto da Jordânia",
    tagline: "Out 2027",
    taglines: { 2027: "18–27 Out 2027" },
    years: [2027],
    lat: 30.7,
    lng: 35.5,
    labelOffsetX: 62,
    labelOffsetY: -18,
    type: "aventura",
    description:
      "77 km pelo deserto da Jordânia, da Reserva de Dana até a cidade rosa de Petra. 10 dias de expedição.",
    href: "/destinos/dana-ate-petra",
  },
];

// ─── Filtros por região/tipo ───────────────────────────────────────────────────

const FILTERS = [
  { id: "todos",    label: "Todos" },
  { id: "europa",   label: "Europa" },
  { id: "brasil",   label: "Brasil" },
  { id: "aventura", label: "Aventura" },
  { id: "cultural", label: "Cultural" },
];

const EUROPE_REGIONS = [
  "Alpes · 3 países",
  "Europa Central",
  "Vale do Douro · Portugal",
];

function isVisible(dest: Destination, filter: string, yearFilter: number): boolean {
  if (!dest.years.includes(yearFilter)) return false;
  if (filter === "todos")    return true;
  if (filter === "europa")   return EUROPE_REGIONS.includes(dest.region);
  if (filter === "brasil")   return dest.region.includes("Brasil");
  return dest.type === filter;
}

// ─── Constantes de cor ────────────────────────────────────────────────────────

const GOLD   = "#c9a86a";
const FOREST = "#27684b";
const CREAM  = "#f5f1e8";

// ─── Props ────────────────────────────────────────────────────────────────────

interface WorldMapAONIKProps {
  yearFilter?: 2026 | 2027;
  onYearChange?: (y: 2026 | 2027) => void;
}

// ─── Componente ───────────────────────────────────────────────────────────────

export default function WorldMapAONIK({
  yearFilter: extYear,
  onYearChange,
}: WorldMapAONIKProps = {}) {
  const containerRef = useRef<HTMLDivElement>(null);
  const svgRef       = useRef<SVGSVGElement>(null);

  const [dims,      setDims]      = useState({ w: 900, h: 480 });
  const [countries, setCountries] = useState<GeoJSON.Feature[]>([]);
  const [loaded,    setLoaded]    = useState(false);
  const [hovered,   setHovered]   = useState<string | null>(null);
  const [selected,  setSelected]  = useState<Destination | null>(null);
  const [filter,    setFilter]    = useState("todos");

  // Estado de ano: externo (controlado) ou interno (standalone)
  const [localYear, setLocalYear] = useState<2026 | 2027>(2026);
  const yearFilter  = extYear ?? localYear;
  const setYear = (y: 2026 | 2027) => {
    setLocalYear(y);
    onYearChange?.(y);
  };

  // Carrega TopoJSON → GeoJSON
  useEffect(() => {
    import("world-atlas/countries-110m.json").then((mod) => {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const data = mod.default as any;
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const geo  = feature(data, data.objects.countries) as any;
      setCountries(geo.features);
      setLoaded(true);
    });
  }, []);

  // Responsividade: atualiza dims quando o container redimensiona
  useEffect(() => {
    if (!containerRef.current) return;
    const ro = new ResizeObserver((entries) => {
      const w = entries[0].contentRect.width;
      // ── FIX 1: altura aumentada para mostrar Patagônia + Islândia ──
      setDims({ w, h: Math.min(Math.round(w * 0.62), 620) });
    });
    ro.observe(containerRef.current);
    return () => ro.disconnect();
  }, []);

  // Projeção Mercator — FIX 1: escala reduzida + centro mais ao sul
  const { proj, pathGen } = useMemo(() => {
    const p = geoMercator()
      .scale(dims.w / 7.0)          // era /6.6 → zoom out ligeiro
      .center([10, 8])               // era [12, 22] → centro mais equatorial
      .translate([dims.w / 2, dims.h / 2]);
    return { proj: p, pathGen: geoPath(p) };
  }, [dims]);

  // ESC fecha modal
  useEffect(() => {
    const fn = (e: KeyboardEvent) => { if (e.key === "Escape") setSelected(null); };
    window.addEventListener("keydown", fn);
    return () => window.removeEventListener("keydown", fn);
  }, []);

  // Export SVG
  function exportSVG() {
    if (!svgRef.current) return;
    const blob = new Blob(
      [new XMLSerializer().serializeToString(svgRef.current)],
      { type: "image/svg+xml" },
    );
    const a = Object.assign(document.createElement("a"), {
      href: URL.createObjectURL(blob),
      download: "aonik-mapa-destinos.svg",
    });
    a.click();
  }

  return (
    <div className="relative w-full">
      {/* ── Filtros + Export ──────────────────────────────── */}
      <div
        className="mb-4 flex flex-wrap items-center gap-2"
        role="group"
        aria-label="Filtrar destinos"
      >
        {FILTERS.map((f) => (
          <button
            key={f.id}
            onClick={() => setFilter(f.id)}
            aria-pressed={filter === f.id}
            className={`rounded-full px-4 py-1.5 text-[11px] font-medium uppercase tracking-[0.16em] transition-all duration-200 ${
              filter === f.id
                ? "bg-forest text-cream"
                : "border border-forest/20 text-forest/50 hover:border-forest/40 hover:text-forest/80"
            }`}
          >
            {f.label}
          </button>
        ))}
        <button
          onClick={exportSVG}
          aria-label="Exportar mapa como SVG"
          className="ml-auto rounded-full border border-gold/25 px-4 py-1.5 text-[11px] font-medium uppercase tracking-[0.14em] text-gold/55 transition-all hover:border-gold/50 hover:text-gold/90"
        >
          ↓ SVG
        </button>
      </div>

      {/* ── Container do mapa ─────────────────────────────── */}
      <div
        ref={containerRef}
        className="relative w-full overflow-hidden rounded-2xl"
        style={{ height: dims.h || 480, backgroundColor: CREAM }}
      >
        {/* ── FIX 3: Toggle de ano — overlay top-right ─── */}
        <div className="absolute right-4 top-4 z-10 flex overflow-hidden rounded-full border border-forest/15 bg-cream/90 shadow-sm backdrop-blur-sm">
          {([2026, 2027] as const).map((y) => (
            <button
              key={y}
              onClick={() => setYear(y)}
              aria-pressed={yearFilter === y}
              className={`px-4 py-1.5 text-[12px] font-semibold uppercase tracking-[0.12em] transition-colors duration-200 ${
                yearFilter === y
                  ? "bg-gold text-[#17150f]"
                  : "text-forest/50 hover:text-forest"
              }`}
            >
              {y}
            </button>
          ))}
        </div>

        {/* Estado de loading */}
        {!loaded && (
          <div className="absolute inset-0 flex items-center justify-center">
            <p className="text-[11px] uppercase tracking-[0.24em] text-forest/35">
              Carregando mapa…
            </p>
          </div>
        )}

        <motion.svg
          ref={svgRef}
          width={dims.w}
          height={dims.h}
          viewBox={`0 0 ${dims.w} ${dims.h}`}
          initial={{ opacity: 0 }}
          animate={{ opacity: loaded ? 1 : 0 }}
          transition={{ duration: 0.9 }}
          aria-label="Mapa mundi — destinos AONIK Natural Experiences"
          role="img"
        >
          <defs>
            <filter id="aon-glow" x="-60%" y="-60%" width="220%" height="220%">
              <feGaussianBlur in="SourceGraphic" stdDeviation="4" result="blur" />
              <feMerge>
                <feMergeNode in="blur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
            {/* FIX 2: halo ampliado para labels maiores */}
            <filter id="aon-halo" x="-30%" y="-60%" width="160%" height="220%">
              <feGaussianBlur in="SourceAlpha" stdDeviation="3.5" result="blur" />
              <feFlood floodColor={CREAM} floodOpacity="0.97" result="bg" />
              <feComposite in="bg" in2="blur" operator="in" result="halo" />
              <feMerge>
                <feMergeNode in="halo" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>

          {/* ── Países ────────────────────────────────────── */}
          <motion.g
            initial={{ opacity: 0 }}
            animate={{ opacity: loaded ? 1 : 0 }}
            transition={{ duration: 0.8, delay: 0.1 }}
          >
            {countries.map((c, i) => (
              <path
                key={
                  (c as GeoJSON.Feature & { id?: string | number }).id ?? i
                }
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                d={pathGen(c as any) ?? ""}
                fill="#eae7e0"
                stroke="#d2cfc8"
                strokeWidth="0.55"
                strokeLinejoin="round"
              />
            ))}
          </motion.g>

          {/* ── Destinos ──────────────────────────────────── */}
          {loaded &&
            DESTINATIONS.map((dest, i) => {
              const coords = proj([dest.lng, dest.lat]);
              if (!coords) return null;
              const [x, y] = coords;
              const isVis  = isVisible(dest, filter, yearFilter);
              const isHov  = hovered === dest.id;
              const lx     = x + dest.labelOffsetX;
              const ly     = y + dest.labelOffsetY;
              const tag    = dest.taglines[yearFilter] ?? dest.tagline;

              return (
                <motion.g
                  key={dest.id}
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{
                    opacity: isVis ? 1 : 0.12,
                    scale:   isVis ? 1 : 0.35,
                  }}
                  transition={{ duration: 0.38, delay: 0.8 + i * 0.12 }}
                  style={{
                    transformOrigin: `${x}px ${y}px`,
                    cursor: isVis ? "pointer" : "default",
                  }}
                  onMouseEnter={() => isVis && setHovered(dest.id)}
                  onMouseLeave={() => setHovered(null)}
                  onClick={() => isVis && setSelected(dest)}
                  role={isVis ? "button" : undefined}
                  tabIndex={isVis ? 0 : -1}
                  aria-label={isVis ? `${dest.name} — ${tag}` : undefined}
                  onKeyDown={(e) =>
                    e.key === "Enter" && isVis && setSelected(dest)
                  }
                >
                  {/* Conector — FIX 2: strokeWidth 1.5 */}
                  {(dest.labelOffsetX !== 0 || dest.labelOffsetY !== 0) && (
                    <line
                      x1={x}
                      y1={y}
                      x2={lx}
                      y2={ly + 16}
                      stroke={GOLD}
                      strokeWidth="1.5"
                      strokeDasharray={isHov ? undefined : "4,3"}
                      opacity={isHov ? 0.8 : 0.5}
                    />
                  )}

                  {/* Pulso hover — SMIL nativo, sem Framer Motion */}
                  {isHov && (
                    <circle cx={x} cy={y} r={10} fill="none" stroke={GOLD} strokeWidth="1.2">
                      <animate attributeName="r" from="10" to="32" dur="1.8s" repeatCount="indefinite" />
                      <animate attributeName="opacity" from="0.85" to="0" dur="1.8s" repeatCount="indefinite" />
                    </circle>
                  )}

                  {/* Pin — FIX 2: r 10/14, CSS transition em atributo SVG */}
                  <circle
                    cx={x} cy={y}
                    r={isHov ? 14 : 10}
                    fill={GOLD}
                    filter={isHov ? "url(#aon-glow)" : undefined}
                    style={{ transition: "r 0.18s ease" }}
                  />
                  <circle cx={x} cy={y} r={3.5} fill={CREAM} pointerEvents="none" />

                  {/* Label — FIX 2: fontSize 13/14 + tagline 10 */}
                  <g transform={`translate(${lx}, ${ly})`}>
                    <text
                      textAnchor="middle"
                      fill={FOREST}
                      fontSize={isHov ? "14" : "13"}
                      fontFamily="'Fraunces', Georgia, serif"
                      fontWeight={isHov ? "400" : "300"}
                      filter="url(#aon-halo)"
                    >
                      {dest.name}
                    </text>
                    <text
                      y="17"
                      textAnchor="middle"
                      fill={GOLD}
                      fontSize="10"
                      fontFamily="'Inter', sans-serif"
                      fontWeight="500"
                      letterSpacing="0.05em"
                      filter="url(#aon-halo)"
                    >
                      {tag}
                    </text>
                  </g>
                </motion.g>
              );
            })}
        </motion.svg>

        {/* ── Tooltip hover ──────────────────────────────── */}
        <AnimatePresence>
          {hovered &&
            (() => {
              const d = DESTINATIONS.find((x) => x.id === hovered);
              if (!d || !isVisible(d, filter, yearFilter)) return null;
              const c = proj([d.lng, d.lat]);
              if (!c) return null;
              const [x, y] = c;
              const rightSide = x / dims.w > 0.65;
              return (
                <motion.div
                  key={hovered}
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 4 }}
                  transition={{ duration: 0.14 }}
                  className="pointer-events-none absolute z-20 max-w-[200px] rounded-xl bg-forest px-4 py-3 shadow-xl"
                  style={{
                    top: y - 12,
                    ...(rightSide
                      ? { right: dims.w - x + 18 }
                      : { left: x + 18 }),
                  }}
                >
                  <p className="text-[12px] font-semibold leading-snug text-cream">
                    {d.name}
                  </p>
                  <p className="mt-0.5 text-[10px] leading-tight text-cream/50">
                    {d.region}
                  </p>
                  <p className="mt-1 text-[11px] font-medium text-gold">
                    {d.taglines[yearFilter] ?? d.tagline}
                  </p>
                </motion.div>
              );
            })()}
        </AnimatePresence>
      </div>

      {/* ── Modal (click) ─────────────────────────────────── */}
      <AnimatePresence>
        {selected && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-ink/40 p-4 backdrop-blur-sm"
            onClick={() => setSelected(null)}
            role="dialog"
            aria-modal="true"
            aria-label={`Detalhes: ${selected.name}`}
          >
            <motion.div
              initial={{ scale: 0.93, y: 28, opacity: 0 }}
              animate={{ scale: 1, y: 0, opacity: 1 }}
              exit={{ scale: 0.93, y: 28, opacity: 0 }}
              transition={{ duration: 0.26, ease: [0.16, 1, 0.3, 1] }}
              className="w-full max-w-sm rounded-2xl bg-cream p-8 shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              <p className="mb-1 text-[10px] font-medium uppercase tracking-[0.28em] text-gold">
                {selected.region}
              </p>
              <h3 className="font-display text-[2rem] font-light leading-tight tracking-[-0.02em] text-forest">
                {selected.name}
              </h3>
              <p className="mt-4 text-[13px] font-light leading-relaxed text-ink/60">
                {selected.description}
              </p>
              <span className="mt-4 inline-flex rounded-full bg-gold/10 px-3 py-1 text-[11px] font-medium text-gold">
                {selected.taglines[yearFilter] ?? selected.tagline}
              </span>
              <div className="mt-7 flex gap-3">
                <a
                  href={selected.href ?? "/grupos"}
                  className="flex-1 rounded-full bg-forest py-3 text-center text-[11px] font-semibold uppercase tracking-[0.16em] text-cream transition-colors hover:bg-forest/85"
                >
                  Ver saídas →
                </a>
                <button
                  onClick={() => setSelected(null)}
                  aria-label="Fechar"
                  className="rounded-full border border-forest/20 px-5 py-3 text-[11px] font-semibold uppercase tracking-[0.14em] text-forest/50 transition-all hover:border-forest/40 hover:text-forest/75"
                >
                  Fechar
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
