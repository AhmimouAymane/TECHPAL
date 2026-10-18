export function cn(...classes: Array<string | false | null | undefined>): string {
  return classes.filter(Boolean).join(" ");
}

export function pad(n: number, size = 2): string {
  return String(n).padStart(size, "0");
}
