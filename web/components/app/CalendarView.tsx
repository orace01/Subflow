"use client";

import { useMemo, useState } from "react";
import { ChevronLeftIcon, ChevronRightIcon } from "@/components/icons";
import { Card } from "@/components/ui/Card";
import { cn } from "@/lib/cn";
import { formatAmount, dayOfMonth } from "@/lib/format";
import { getMonthGrid, WEEKDAY_LABELS_FR, MONTH_LABELS_FR } from "@/lib/calendar";
import { computeUpcomingCharges, isCurrentlyCharging } from "@/lib/subscriptions";
import type { Subscription } from "@/lib/types";

export function CalendarView({ subscriptions }: { subscriptions: Subscription[] }) {
  const [year, setYear] = useState(2026);
  const [monthIndex0, setMonthIndex0] = useState(8); // September (0-indexed)

  const chargesByDay = useMemo(() => {
    const map = new Map<string, Subscription[]>();
    for (const s of subscriptions.filter(isCurrentlyCharging)) {
      const list = map.get(s.nextChargeDate) ?? [];
      list.push(s);
      map.set(s.nextChargeDate, list);
    }
    return map;
  }, [subscriptions]);

  const grid = useMemo(() => getMonthGrid(year, monthIndex0), [year, monthIndex0]);
  const upcoming = computeUpcomingCharges(subscriptions, 6);

  function goPrev() {
    if (monthIndex0 === 0) {
      setMonthIndex0(11);
      setYear((y) => y - 1);
    } else {
      setMonthIndex0((m) => m - 1);
    }
  }

  function goNext() {
    if (monthIndex0 === 11) {
      setMonthIndex0(0);
      setYear((y) => y + 1);
    } else {
      setMonthIndex0((m) => m + 1);
    }
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-[2.4fr_1fr] gap-5 items-start">
      <Card className="overflow-hidden">
        <div className="flex items-center justify-between px-5 py-4 border-b-[2.5px] border-ink">
          <button
            onClick={goPrev}
            className="hard-xs w-8 h-8 bg-surface flex items-center justify-center cursor-pointer"
            aria-label="Mois précédent"
          >
            <ChevronLeftIcon className="w-[15px] h-[15px]" />
          </button>
          <h2 className="text-[17px] font-bold">
            {MONTH_LABELS_FR[monthIndex0]} {year}
          </h2>
          <button
            onClick={goNext}
            className="hard-xs w-8 h-8 bg-surface flex items-center justify-center cursor-pointer"
            aria-label="Mois suivant"
          >
            <ChevronRightIcon className="w-[15px] h-[15px]" />
          </button>
        </div>

        <div className="grid grid-cols-7 border-t-[2.5px] border-ink">
          {WEEKDAY_LABELS_FR.map((label, i) => (
            <div
              key={label}
              className={cn(
                "text-center font-mono text-[10px] font-bold text-text-faint py-2",
                i < 6 && "border-r-[1.5px] border-paper-alt"
              )}
            >
              {label}
            </div>
          ))}
        </div>

        <div className="grid grid-cols-7">
          {grid.map((cell, i) => {
            const charges = chargesByDay.get(cell.iso) ?? [];
            const hasHike = charges.some((c) => c.previousAmount !== undefined);
            const hasCancel = charges.some((c) => c.status === "a-resilier");
            return (
              <div
                key={cell.iso}
                className={cn(
                  "min-h-[92px] p-2 border-r-[1.5px] border-b-[1.5px] border-paper-alt",
                  (i + 1) % 7 === 0 && "border-r-0",
                  i >= 35 && "border-b-0",
                  !cell.inCurrentMonth && "opacity-35",
                  charges.length > 0 && hasHike && "bg-yellow",
                  charges.length > 0 && hasCancel && "bg-pink",
                  charges.length > 0 && !hasHike && !hasCancel && "bg-blue"
                )}
              >
                <span
                  className={cn(
                    "text-[12px] font-semibold",
                    charges.length > 0 &&
                      (hasHike ? "text-yellow-ink" : hasCancel ? "text-pink-ink" : "text-blue-ink")
                  )}
                >
                  {cell.day}
                </span>
                {charges.map((c) => (
                  <div
                    key={c.id}
                    className={cn(
                      "font-mono text-[8.5px] font-bold leading-tight mt-1.5",
                      hasHike ? "text-yellow-ink" : hasCancel ? "text-pink-ink" : "text-blue-ink"
                    )}
                  >
                    {c.name.toUpperCase()} {formatAmount(c.amount)}
                  </div>
                ))}
              </div>
            );
          })}
        </div>
      </Card>

      <Card className="p-5.5">
        <h3 className="text-[15px] font-bold mb-3.5">À venir</h3>
        <div className="flex flex-col gap-2.5">
          {upcoming.map((s) => {
            const hasHike = s.previousAmount !== undefined;
            const isCancel = s.status === "a-resilier";
            return (
              <div
                key={s.id}
                className={cn(
                  "flex items-center gap-2.5 p-2.5",
                  hasHike ? "bg-yellow" : isCancel ? "bg-pink" : "bg-paper-alt"
                )}
              >
                <div className="hard-sm w-8 h-8 bg-surface flex flex-col items-center justify-center shrink-0">
                  <span className="text-[9px] font-bold">{dayOfMonth(s.nextChargeDate)}</span>
                </div>
                <div className="flex-grow min-w-0">
                  <div
                    className={cn(
                      "text-[12.5px] font-semibold",
                      hasHike ? "text-yellow-ink" : isCancel ? "text-pink-ink" : ""
                    )}
                  >
                    {s.name}
                    {hasHike ? " ↑" : isCancel ? " · à résilier" : ""}
                  </div>
                </div>
                <span
                  className={cn(
                    "text-[12.5px] font-bold",
                    hasHike ? "text-yellow-ink" : isCancel ? "text-pink-ink" : ""
                  )}
                >
                  {formatAmount(s.amount)}
                </span>
              </div>
            );
          })}
        </div>
      </Card>
    </div>
  );
}
