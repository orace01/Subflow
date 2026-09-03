const currencyFormatter = new Intl.NumberFormat("fr-FR", {
  style: "currency",
  currency: "EUR",
});

export function formatAmount(value: number): string {
  return currencyFormatter.format(value);
}

const dateFormatter = new Intl.DateTimeFormat("fr-FR", {
  day: "numeric",
  month: "short",
  year: "numeric",
});

export function formatDate(iso: string): string {
  return dateFormatter.format(new Date(`${iso}T00:00:00`));
}

const shortDateFormatter = new Intl.DateTimeFormat("fr-FR", {
  day: "numeric",
  month: "short",
});

export function formatShortDate(iso: string): string {
  return shortDateFormatter.format(new Date(`${iso}T00:00:00`));
}

export function dayOfMonth(iso: string): number {
  return new Date(`${iso}T00:00:00`).getDate();
}

export function monthLabel3(iso: string): string {
  return new Intl.DateTimeFormat("fr-FR", { month: "short" })
    .format(new Date(`${iso}T00:00:00`))
    .toUpperCase()
    .replace(".", "");
}
