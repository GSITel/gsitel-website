/**
 * Next's bundled CSS HMR callback can run after React has removed the old link.
 * Guard only that cleanup; preserve stylesheet loading and all other HMR logic.
 * Applied only in development by next.config.mjs.
 */
module.exports = function cssHmrGuard(source) {
  return source.replace(
    /\b([\w$]+)\.parentNode\.removeChild\(\1\)/g,
    "$1.parentNode?.removeChild($1)",
  );
};
