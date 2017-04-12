/**
 * This class provides a "progress token". Each token can be `in progress`, `completred`
 * or `cancelled`. Consumers can subscribe to progress event via `onProgress()` callback.
 * The event producers update consumers by calling `update()` method.
 */
import eventify from 'ngraph.events';

export default class ProgressToken {
  constructor() {
    this.canceled = false;
    this.progressComplete = false;

    // Use simple bus from ngraph.events.
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
