export interface CalendarDay {
  date: Date;
  iso: string;
  day: number;
  inCurrentMonth: boolean;
}

/**
 * Builds a Monday-first 6x7 month grid (French convention), padded with
 * the trailing days of the previous/next month so every week is complete.
 */
export function getMonthGrid(year: number, monthIndex0: number): CalendarDay[] {
  const firstOfMonth = new Date(year, monthIndex0, 1);
  // JS getDay(): 0 = Sunday .. 6 = Saturday. Convert to Monday-first offset.
  const isoWeekday = (firstOfMonth.getDay() + 6) % 7;
  const gridStart = new Date(year, monthIndex0, 1 - isoWeekday);

  const days: CalendarDay[] = [];
  for (let i = 0; i < 42; i++) {
    const date = new Date(gridStart);
    date.setDate(gridStart.getDate() + i);
    days.push({
      date,
      iso: date.toISOString().slice(0, 10),
      day: date.getDate(),
      inCurrentMonth: date.getMonth() === monthIndex0,
    });
  }
  return days;
}

export const WEEKDAY_LABELS_FR = ["LUN", "MAR", "MER", "JEU", "VEN", "SAM", "DIM"];

export const MONTH_LABELS_FR = [
  "Janvier",
  "Février",
  "Mars",
  "Avril",
  "Mai",
  "Juin",
  "Juillet",
  "Août",
  "Septembre",
  "Octobre",
  "Novembre",
  "Décembre",
];
