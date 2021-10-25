import { BaseSetTimeout, Callback, IStartable } from './BaseSetTimeout';

export type NextDateFunction = (date: Date) => Date;

export class SetTimeoutNext<TArgs extends readonly unknown[]> extends BaseSetTimeout implements IStartable {
  public readonly callback: Callback<TArgs>;
  public readonly nextFunction: NextDateFunction;
  public readonly args: TArgs;

  public constructor(callback: Callback<TArgs>, nextFunction: NextDateFunction, ...args: TArgs) {
    super();

    this.callback = callback;
    this.nextFunction = nextFunction;
    this.args = args;
  }

  public start() {
    if (this.isStopped) {
      this._impl_startDate(() => {
        this.callback(...this.args);
      }, this.nextFunction(new Date()));
    }
  }
}
