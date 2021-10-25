import * as constants from './constants';
import { DateResolvable, nextMultiple, resolveDate, resolveTime } from './utils';

export function nextMillisecond(date: DateResolvable, m = 1): Date {
  const time = resolveTime(date);
  return new Date(time + Math.floor(m));
}

export function nextSecond(date: DateResolvable, s = 1): Date {
  const time = resolveTime(date);
  return new Date(nextMultiple(time, constants.seconds(s)));
}

export function moreNextSecond(date: DateResolvable, s = 1, ...args: number[]): Date {
  const result = nextSecond(date, s);
  return args.length ? nextMillisecond(result, ...args) : result;
}

export function nextMinute(date: DateResolvable, m = 1): Date {
  const time = resolveTime(date);
  return nextMillisecond(time, constants.minutes(m));
}

export function moreNextMinute(date: DateResolvable, m = 1, ...args: number[]): Date {
  const result = nextMinute(date, m);
  return args.length ? moreNextSecond(result, ...args) : result;
}

export function nextHour(date: DateResolvable, h = 1): Date {
  const time = resolveTime(date);
  return new Date(nextMultiple(time, constants.hours(h)));
}

export function moreNextHour(date: DateResolvable, h = 1, ...args: number[]): Date {
  const result = nextHour(date, h);
  return args.length ? moreNextMinute(result, ...args) : result;
}

export function nextDay(date: DateResolvable, d = 1): Date {
  const time = resolveTime(date);
  return new Date(nextMillisecond(time, constants.days(d)));
}

export function moreNextDay(date: DateResolvable, d = 1, ...args: number[]): Date {
  const result = nextDay(date, d);
  return args.length ? moreNextHour(result, ...args) : result;
}

export function nextWeek(date: DateResolvable, weekStart: constants.WEEKDAYS = constants.WEEKDAYS.MONDAY, w = 1): Date {
  const tdate = resolveDate(date);
  return new Date(
    tdate.getFullYear(),
    tdate.getMonth(),
    tdate.getDate() - tdate.getDay() + weekStart + 7 * Math.floor(w),
  );
}

export function moreNextWeek(
  date: DateResolvable,
  weekStart: constants.WEEKDAYS = constants.WEEKDAYS.MONDAY,
  w = 1,
  ...args: number[]
): Date {
  const result = nextWeek(date, weekStart, w);
  return args.length ? moreNextDay(result, ...args) : result;
}

export function nextMonth(date: DateResolvable, mo = 1): Date {
  const tdate = resolveDate(date);
  return new Date(tdate.getFullYear(), tdate.getMonth() + Math.floor(mo));
}

export function moreNextMonth(date: DateResolvable, mo = 1, ...args: number[]): Date {
  const result = nextMonth(date, mo);
  return args.length ? moreNextDay(result, ...args) : result;
}

export function nextYear(date: DateResolvable, y = 1): Date {
  const tdate = resolveDate(date);
  return new Date(tdate.getFullYear() + Math.floor(y), 0);
}

export function moreNextYear(date: DateResolvable, y = 1, ...args: number[]) {
  const result = nextYear(date, y);
  return args.length ? moreNextMonth(result, ...args) : result;
}
