import { DateResolvable } from '../utils';
import { BaseSetTimeout, Callback } from './BaseSetTimeout';

export class SetTimeoutDate<TArgs extends readonly unknown[]> extends BaseSetTimeout {
  public readonly callback: Callback<TArgs>;
  public readonly args: TArgs;

  public constructor(callback: Callback<TArgs>, ...args: TArgs) {
    super();

    this.callback = callback;
    this.args = args;
  }

  public start(date: DateResolvable) {
    if (this.isStopped) {
      this._impl_startDate(this.callback, date, ...this.args);
    }
  }
}
