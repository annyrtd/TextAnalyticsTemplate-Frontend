
export class Common{
/**
 * Polling function to wait for the node to appear
 * @param {Boolean} fn - function that returns a Boolean for existing node
 * @param {Function} callback - function to execute when node is found
 * @param {Function} errback - function to execute when timeout is exceeded
 * @param {Number} timeout
 * @param {Number} interval - polling interval to check for `fn` to be true
 */
  poll (fn, callback, errback, timeout, interval) {
  var endTime = Number(new Date()) + (timeout || 2000);
  interval = interval || 100;

  (function p() {
    // If the condition is met, we're done!
    if(fn()) {
      callback();
    }
    // If the condition isn't met but the timeout hasn't elapsed, go again
    else if (Number(new Date()) < endTime) {
      setTimeout(p, interval);
    }
    // Didn't match and too much time, reject!
    else {
      errback(new Error('timed out for ' + fn + ': ' + arguments));
    }
  })();
};
}
