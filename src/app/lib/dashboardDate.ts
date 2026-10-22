export function getCameroonDay(now = new Date()) {
  const parts = new Intl.DateTimeFormat("en-CA", {
    timeZone: "Africa/Douala", year: "numeric", month: "2-digit", day: "2-digit",
  }).formatToParts(now);
  const part = (name: string) => Number(parts.find((item) => item.type === name)?.value);
  const date = new Date(Date.UTC(part("year"), part("month") - 1, part("day"), 12));
  const key = date.toISOString().slice(0, 10);
  return { key, weekday: date.getUTCDay(), date };
}

export function getDemoForecast(now = new Date()) {
  const today = getCameroonDay(now);
  const temperatures = [27, 28, 29, 30, 28, 27, 26];
  return Array.from({ length: 5 }, (_, index) => {
    const date = new Date(today.date);
    date.setUTCDate(date.getUTCDate() + index - 2);
    return {
      key: date.toISOString().slice(0, 10),
      label: new Intl.DateTimeFormat("en", { weekday: "short", timeZone: "UTC" }).format(date),
      dateLabel: new Intl.DateTimeFormat("en", { day: "numeric", month: "short", timeZone: "UTC" }).format(date),
      temperature: temperatures[date.getUTCDay()],
      today: index === 2,
    };
  });
}
