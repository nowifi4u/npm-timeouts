import { SET_TIMEOUT_LIMIT } from '../constants';
import { DateResolvable, resolveTime } from '../utils';

export type Callback<TArgs extends readonly unknown[]> = (...args: TArgs) => void;

export abstract class BaseSetTimeout {
  protected _timeout: ReturnType<typeof setTimeout> | null = null;

  public get isStopped(): boolean {
    return this._timeout === null;
  }

  public get isRunning(): boolean {
    return this._timeout !== null;
  }

  /**
   * Starts a SetTimeout with a duration of ms disregarding the state of this._timeout
   */
  protected _impl_start<_TArgs extends readonly unknown[]>(
    callback: Callback<_TArgs>,
    ms: number,
    ...args: _TArgs
  ): void {
    return this._impl_startDate(callback, Date.now() + ms, ...args);
  }

  /**
   * Starts a SetTimeout until the date disregarding the state of this._timeout
   */
  protected _impl_startDate<_TArgs extends readonly unknown[]>(
    callback: Callback<_TArgs>,
    date: DateResolvable,
    ...args: _TArgs
  ): void {
    const ms = resolveTime(date) - Date.now();
    if (ms > SET_TIMEOUT_LIMIT) {
      this._timeout = setTimeout(() => {
        this._impl_startDate(callback, new Date(ms), ...args);
      }, SET_TIMEOUT_LIMIT);
    } else {
      this._timeout = setTimeout(() => {
        this._timeout = null;
        callback(...args);
      }, ms);
    }
  }

  public stop(): void {
    if (this._timeout !== null) {
      clearTimeout(this._timeout);
      this._timeout = null;
    }
  }
}

export interface IStartable {
  start: () => void;
}

export interface IRefreshable {
  refresh: () => void;
}
