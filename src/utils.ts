export type DateResolvable = Date | number | string;

export function resolveDate(date: DateResolvable): Date {
  return new Date(date);
}

export function resolveTime(date: DateResolvable): number {
  if (typeof date === 'number') return date;
  return resolveDate(date).getTime();
}

export function nextMultiple(num: number, mult: number) {
  return Math.floor(num / mult + 1) * mult;
}
