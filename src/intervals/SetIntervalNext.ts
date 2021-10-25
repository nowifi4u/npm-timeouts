import { SetTimeoutNext } from '../timeouts';

export class SetIntervalNext<TArgs extends readonly unknown[]> extends SetTimeoutNext<TArgs> {
  public start() {
    if (this.isStopped) {
      this._impl_startDate(() => {
        this.start();
        this.callback(...this.args);
      }, this.nextFunction(new Date()));
    }
  }
}
