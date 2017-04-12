/**
 * Unified click and tap (for touch devices) events handler.
 */
const maxSingleTouchTime = 300; // ms
const singleTapDistanceSquared = 25; // within 5px we consider it a tap.

/**
 * @param {DOMElement} el element to which we listen
 * @param {Function} handler event handler.
 * @param {Boolean} capture - whether `addEventListener` should capture event (standard
 * argument)
 */
export default function clap(el, handler, capture) {
  let touchStartTime;
  let startPos;

  el.addEventListener('click', invokeHandler, capture);

  el.addEventListener('touchend', handleTouchEnd, capture);
  el.addEventListener('touchstart', handleTouchStart, capture);

  return dispose();

  function invokeHandler(e) {
    return handler(e);
  }

  function dispose() {
    el.removeEventListener('click', invokeHandler);
    el.removeEventListener('touchend', handleTouchEnd);
    el.removeEventListener('touchstart', handleTouchStart);
  }

  function handleTouchEnd(e) {
    // multitouch - ignore
    if (e.touches.length > 1) return;

    // single touch - use time diference to determine if it was a touch or
    // a swipe
    const dt = new Date() - touchStartTime;

    // To long - ignore
    if (dt > maxSingleTouchTime) return;

    const touch = e.changedTouches[0];
    const dx = touch.pageX - startPos.x;
    const dy = touch.pageY - startPos.y;

    if (dx * dx + dy * dy < singleTapDistanceSquared) {
      // if they didn't move the finger...
      invokeHandler(e);
    }
  }

  function handleTouchStart(e) {
    const { touches } = e;

    if (touches.length === 1) {
      touchStartTime = new Date();
      startPos = {
        x: e.touches[0].pageX,
        y: e.touches[0].pageY
      };
    }
  }
}
