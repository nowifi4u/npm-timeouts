import { BaseSetTimeout, Callback, IRefreshable, IStartable } from './BaseSetTimeout';

export class SetTimeoutTime<TArgs extends readonly unknown[]>
  extends BaseSetTimeout
  implements IStartable, IRefreshable
{
  public readonly callback: Callback<TArgs>;
  public ms: number;
  public readonly args: TArgs;

  public constructor(callback: Callback<TArgs>, ms: number, ...args: TArgs) {
    super();

    this.callback = callback;
    this.ms = ms;
    this.args = args;
  }

  public start(ms = this.ms) {
    if (this.isStopped) {
      this._start(ms);
    }
  }

  protected _start(ms = this.ms) {
    this._impl_start(this.callback, ms, ...this.args);
  }

  public refresh(ms = this.ms) {
    super.stop();
    this._start(ms);
  }
}
