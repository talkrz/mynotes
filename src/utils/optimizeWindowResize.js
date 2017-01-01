/**
 * Optimize frequency of emitting window resize event by emitting cusom event
 * only once per frame redraw
 *
 * This is not true however, and event is emitted twice with small timout.
 * I made it as a quick&dirty solution to the problem of remaining space after
 * the scrollbar on the right egde of the window which was visible sometimes.
 *
 * This should be solved better.
 */
function optimizeWindowResize() {
  const throttle = (type, name, obj) => {
    let running = false;
    const func = () => {
      if (running) { return; }
      running = true;
      requestAnimationFrame(() => {
        obj.dispatchEvent(new CustomEvent(name));
        running = false;
        // scrollbar hack
        setTimeout(() => {
          obj.dispatchEvent(new CustomEvent(name));
        }, 50);
      });
    };
    obj.addEventListener(type, func);
  };

  throttle('resize', 'optimizedResize', window);
}

export default optimizeWindowResize;
