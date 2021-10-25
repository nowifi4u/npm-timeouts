import { SetTimeoutTime } from '../timeouts';

export class SetIntervalTime<TArgs extends readonly unknown[]> extends SetTimeoutTime<TArgs> {
  protected _endtime: number | null = null;

  protected _start(ms = this.ms) {
    if (!this._endtime) this._endtime = Date.now();
    this._endtime += ms;
    this._impl_startDate(() => {
      this._start(ms);
      this.callback(...this.args);
    }, this._endtime);
  }

  public stop() {
    this._endtime = null;
    super.stop();
  }
}
