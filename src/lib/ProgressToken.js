import eventify from 'ngraph.events';

export default class ProgressToken {
  constructor() {
    this.canceled = false;
    this.progressComplete = false;
    this.events = eventify({});
  }

  cancel() {
    this.canceled = true;
  }

  complete(message) {
    this.progressComplete = true;
    this.update(message);
  }

  onProgress(callback, ctx) {
    this.events.on('progress', callback, ctx);
  }

  update(message) {
    this.events.fire('progress', message);
  }

  isCanceled() {
    return this.canceled;
  }

  isCompleted() {
    return this.progressComplete;
  }
}
