"use client";

import { useState, useEffect } from "react";
import { GRUPOS, datasDoAno } from "../lib/grupos";

// ─── Mapeamento de meses PT ───────────────────────────────────────────────────

const PT_MONTHS_MAP: Record<string, number> = {
  jan: 1, fev: 2, mar: 3, abr: 4, mai: 5, jun: 6,
  jul: 7, ago: 8, set: 9, out: 10, nov: 11, dez: 12,
};

const PT_MONTH_NAMES = [
  "",
  "Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho",
  "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro",
];

const PT_WD = ["D", "S", "T", "Q", "Q", "S", "S"];

// ─── Tipos ────────────────────────────────────────────────────────────────────

interface Departure {
  groupId: string;
  groupTitle: string;
  flags: string;
  month: number;
  startDay: number;
  endDay: number;
  href: string;
  status: "confirmada" | "a-confirmar";
}

// ─── Helpers ──────────────────────────────────────────────────────────────────

function parseDeparture(
  dateStr: string,
): { month: number; startDay: number; endDay: number } | null {
  const m = dateStr.match(/^(\d+)\s+a\s+(\d+)\/(\w{3})/i);
  if (!m) return null;
  const month = PT_MONTHS_MAP[m[3].toLowerCase()];
  if (!month) return null;
  return { month, startDay: parseInt(m[1]), endDay: parseInt(m[2]) };
}

function buildDepartures(year: 2026 | 2027): Departure[] {
  const result: Departure[] = [];
  for (const g of GRUPOS) {
    for (const d of datasDoAno(g, year)) {
      const p = parseDeparture(d);
      if (p)
        result.push({
          groupId: g.id,
          groupTitle: g.title,
          flags: g.flags,
          href: g.href,
          status: g.status,
          ...p,
        });
    }
  }
  return result.sort((a, b) =>
    a.month !== b.month ? a.month - b.month : a.startDay - b.startDay,
  );
}

function buildGrid(month: number, year: number): (number | null)[] {
  const firstDay = new Date(year, month - 1, 1).getDay();
  const days = new Date(year, month, 0).getDate();
  const cells: (number | null)[] = [];
  for (let i = 0; i < firstDay; i++) cells.push(null);
  for (let d = 1; d <= days; d++) cells.push(d);
  while (cells.length % 7 !== 0) cells.push(null);
  return cells;
}

// ─── Componente ───────────────────────────────────────────────────────────────

interface CalendarWidgetProps {
  yearFilter: 2026 | 2027;
  onYearChange?: (y: 2026 | 2027) => void;
}

export default function CalendarWidget({ yearFilter, onYearChange }: CalendarWidgetProps) {
  const departures = buildDepartures(yearFilter);
  const activeMonths = [
    ...new Set(departures.map((d) => d.month)),
  ].sort((a, b) => a - b);

  const [viewMonth, setViewMonth] = useState<number>(activeMonths[0] ?? 4);

  useEffect(() => {
    setViewMonth(activeMonths[0] ?? 4);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [yearFilter]);

  const grid = buildGrid(viewMonth, yearFilter);
  const monthDeps = departures.filter((d) => d.month === viewMonth);
  const prevActives = activeMonths.filter((m) => m < viewMonth);
  const nextActives = activeMonths.filter((m) => m > viewMonth);

  function dayInfo(day: number) {
    const isStart = monthDeps.some((d) => d.startDay === day);
    const inRange = monthDeps.some(
      (d) => day >= d.startDay && day <= d.endDay,
    );
    const trips = monthDeps.filter((d) => d.startDay === day);
    return { isStart, inRange, trips };
  }

  return (
    <div className="rounded-2xl border border-forest/[8%] bg-cream/60 p-6 backdrop-blur-sm md:p-8">
      {/* ── Cabeçalho ─── */}
      <div className="mb-5 flex items-start justify-between gap-4">
        <div>
          <p className="mb-1.5 text-[9px] font-medium uppercase tracking-[0.3em] text-gold/55">
            Calendário de saídas
          </p>
          <h4 className="font-display text-[1.4rem] font-light leading-none tracking-[-0.02em] text-forest">
            {PT_MONTH_NAMES[viewMonth]}{" "}
            <span className="text-gold">{yearFilter}</span>
          </h4>
        </div>

        {/* Navegação prev/next */}
        <div className="flex shrink-0 gap-1.5">
          <button
            onClick={() =>
              prevActives.length &&
              setViewMonth(prevActives[prevActives.length - 1])
            }
            disabled={!prevActives.length}
            aria-label="Mês anterior"
            className="flex h-9 w-9 items-center justify-center rounded-full border border-forest/15 text-[13px] text-forest/45 transition-all hover:border-forest/35 hover:text-forest/80 disabled:opacity-20"
          >
            ←
          </button>
          <button
            onClick={() => nextActives.length && setViewMonth(nextActives[0])}
            disabled={!nextActives.length}
            aria-label="Próximo mês"
            className="flex h-9 w-9 items-center justify-center rounded-full border border-forest/15 text-[13px] text-forest/45 transition-all hover:border-forest/35 hover:text-forest/80 disabled:opacity-20"
          >
            →
          </button>
        </div>
      </div>

      {/* ── Pílulas de meses ativos + toggle de ano ─── */}
      <div className="mb-5 flex items-center justify-between gap-3">
        <div className="flex gap-1.5 overflow-x-auto pb-1">
          {activeMonths.map((m) => (
            <button
              key={m}
              onClick={() => setViewMonth(m)}
              className={`shrink-0 rounded-full px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.14em] transition-all duration-200 ${
                m === viewMonth
                  ? "bg-gold text-[#17150f]"
                  : "border border-forest/15 text-forest/40 hover:border-forest/30 hover:text-forest/70"
              }`}
            >
              {PT_MONTH_NAMES[m].slice(0, 3)}
            </button>
          ))}
        </div>

        {onYearChange && (
          <div className="flex shrink-0 rounded-full border border-forest/12 bg-cream p-0.5">
            {([2026, 2027] as const).map((y) => (
              <button
                key={y}
                onClick={() => onYearChange(y)}
                className={`rounded-full px-3 py-1 text-[11px] font-semibold tracking-[0.04em] transition-all duration-200 ${
                  y === yearFilter
                    ? "bg-gold text-[#17150f]"
                    : "text-ink/35 hover:text-ink/60"
                }`}
              >
                {y}
              </button>
            ))}
          </div>
        )}
      </div>

      {/* ── Grid do calendário ─── */}
      <div className="grid grid-cols-7 gap-y-0.5">
        {/* Dias da semana */}
        {PT_WD.map((d, i) => (
          <div
            key={i}
            className="pb-2 text-center text-[9px] font-semibold uppercase tracking-[0.16em] text-ink/22"
          >
            {d}
          </div>
        ))}

        {/* Células */}
        {grid.map((day, i) => {
          if (!day) return <div key={i} className="h-8" />;
          const { isStart, inRange, trips } = dayInfo(day);
          return (
            <div
              key={i}
              title={
                trips.length
                  ? trips.map((t) => t.groupTitle).join(", ")
                  : undefined
              }
              className={`relative flex flex-col items-center justify-center py-0.5 ${
                inRange && !isStart ? "bg-gold/[5%]" : ""
              }`}
            >
              <span
                className={`flex h-7 w-7 items-center justify-center rounded-full text-[11px] leading-none transition-all ${
                  isStart
                    ? "bg-gold font-semibold text-[#17150f] shadow-[0_2px_10px_rgba(201,168,106,0.35)]"
                    : inRange
                      ? "font-medium text-forest/70"
                      : "text-ink/30"
                }`}
              >
                {day}
              </span>
              {/* Pontos para múltiplos grupos no mesmo dia */}
              {isStart && trips.length > 1 && (
                <div className="mt-0.5 flex gap-0.5">
                  {trips.slice(0, 3).map((_, ti) => (
                    <span
                      key={ti}
                      className="h-1 w-1 rounded-full bg-gold/50"
                    />
                  ))}
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* ── Saídas deste mês ─── */}
      {monthDeps.length > 0 ? (
        <div className="mt-5 space-y-1 border-t border-forest/[8%] pt-4">
          {monthDeps.map((dep, i) => (
            <a
              key={i}
              href={dep.href}
              className="group flex items-center gap-3 rounded-lg px-2 py-2 transition-colors hover:bg-forest/[4%]"
            >
              <span className="text-base leading-none">
                {dep.flags.split(" ")[0]}
              </span>
              <div className="min-w-0 flex-1">
                <p className="truncate text-[12px] font-medium leading-tight text-forest">
                  {dep.groupTitle}
                </p>
                <p className="text-[10px] text-ink/35">
                  {dep.startDay}–{dep.endDay}{" "}
                  {PT_MONTH_NAMES[dep.month].slice(0, 3).toLowerCase()}{" "}
                  {yearFilter}
                </p>
              </div>
              {dep.status === "confirmada" && (
                <span className="shrink-0 rounded-full bg-gold/10 px-2 py-0.5 text-[9px] font-semibold uppercase tracking-[0.14em] text-gold">
                  ✓
                </span>
              )}
              <span className="shrink-0 text-[12px] text-gold opacity-0 transition-all duration-200 group-hover:translate-x-0.5 group-hover:opacity-100">
                →
              </span>
            </a>
          ))}
        </div>
      ) : (
        <div className="mt-5 border-t border-forest/[8%] pt-4">
          <p className="text-center text-[11px] font-light text-ink/25">
            Nenhuma saída em{" "}
            {PT_MONTH_NAMES[viewMonth].toLowerCase()} {yearFilter}.
          </p>
        </div>
      )}

      {/* ── Link calendário completo ─── */}
      <div className="mt-5 border-t border-forest/[8%] pt-4 text-center">
        <a
          href="/grupos"
          className="group inline-flex items-center gap-1.5 text-[10px] font-semibold uppercase tracking-[0.18em] text-forest/35 transition-all hover:text-forest/70"
        >
          Ver calendário completo
          <span className="text-gold transition-transform duration-300 group-hover:translate-x-0.5">
            →
          </span>
        </a>
      </div>
    </div>
  );
}
