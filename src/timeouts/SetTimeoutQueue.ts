import { BaseSetTimeout, Callback, IRefreshable, IStartable } from './BaseSetTimeout';

export class SetTimeoutQueue<Arg = any> extends BaseSetTimeout implements IStartable, IRefreshable {
  public readonly callback: Callback<[Arg]>;
  public ms: number;
  public readonly queue: Arg[] = [];

  public constructor(callback: Callback<[Arg]>, ms: number) {
    super();

    this.callback = callback;
    this.ms = ms;
  }

  public start() {
    if (this.isStopped) {
      this._start();
    }
  }

  public push(...items: Arg[]) {
    this.queue.push(...items);
    this.start();
  }

  protected _start() {
    if (this.queue.length) {
      this._impl_start(() => {
        this._proc();
      }, this.ms);
    }
  }

  protected _proc() {
    if (this.queue.length) {
      const item = this.queue.shift() as Arg;
      this._start();
      this.callback(item);
    }
  }

  public refresh() {
    super.stop();
    this._start();
  }
}
