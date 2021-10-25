import { BaseSetTimeout, Callback, IRefreshable, IStartable } from './BaseSetTimeout';

export class SetTimeoutThrottle<TArgs extends readonly unknown[]>
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

  public start(ms = this.ms, args = this.args) {
    if (this.isStopped) {
      this._start(ms);
      this.callback(...args);
    }
  }

  protected _start(ms = this.ms) {
    // eslint-disable-next-line @typescript-eslint/no-empty-function
    this._impl_start(() => {}, ms);
  }

  public refresh(ms = this.ms, args = this.args) {
    const wasStopped = this.isStopped;
    super.stop();
    this._start(ms);
    if (wasStopped) {
      this.callback(...args);
    }
  }
}
