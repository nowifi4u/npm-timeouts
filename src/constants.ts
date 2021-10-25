export const MILLISECOND = 1;

export function milliseconds(milliseconds = 1): number {
  return Math.floor(milliseconds);
}

export const SECOND = MILLISECOND * 1000;

export function seconds(s = 1): number {
  return Math.floor(s) * SECOND;
}

export function moreSeconds(s = 1, ...args: number[]) {
  const result = seconds(s);
  return args.length ? result + milliseconds(...args) : result;
}

export const MINUTE = SECOND * 60;

export function minutes(m = 1): number {
  return Math.floor(m) * MINUTE;
}

export function moreMinutes(m = 1, ...args: number[]) {
  const result = minutes(m);
  return args.length ? result + seconds(...args) : result;
}

export const HOUR = MINUTE * 60;

export function hours(h = 1): number {
  return Math.floor(h) * HOUR;
}

export function moreHours(h = 1, ...args: number[]) {
  const result = hours(h);
  return args.length ? result + minutes(...args) : result;
}

export const DAY = HOUR * 24;

export function days(d = 1): number {
  return Math.floor(d) * DAY;
}

export function moreDays(d = 1, ...args: number[]) {
  const result = days(d);
  return args.length ? result + hours(...args) : result;
}

export const WEEK = DAY * 7;

export function weeks(w = 1): number {
  return Math.floor(w) * WEEK;
}

export function moreWeeks(w = 1, ...args: number[]) {
  const result = weeks(w);
  return args.length ? result + days(...args) : result;
}

export const SET_TIMEOUT_LIMIT = 0x7fffffff;

export enum WEEKDAYS {
  MONDAY = 0,
  TUESDAY = 1,
  WEDNESDAY = 2,
  THURSDAY = 3,
  FRIDAY = 4,
  SATURDAY = 5,
  SUNDAY = 6,
}
