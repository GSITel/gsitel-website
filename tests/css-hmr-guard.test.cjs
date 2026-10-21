const assert = require("node:assert/strict");
const { readFileSync } = require("node:fs");
const { test } = require("node:test");
const { runInNewContext } = require("node:vm");
const guard = require("../scripts/webpack/css-hmr-guard.cjs");

const original = readFileSync(
  require.resolve("next/dist/compiled/mini-css-extract-plugin/hmr/hotModuleReplacement.js"),
  "utf8",
);

function prepareReload(source) {
  const timers = [];
  const callbacks = {};
  let removed = 0;
  const parent = {
    appendChild() {},
    removeChild(link) { removed++; link.parentNode = null; },
  };
  const link = {
    href: "http://localhost/app.css",
    parentNode: parent,
    cloneNode() { return { addEventListener(event, callback) { callbacks[event] = callback; } }; },
  };
  const fixtureModule = { exports: {} };
  runInNewContext(source, {
    module: fixtureModule,
    __dirname,
    console: { log() {} },
    document: { currentScript: { src: "http://localhost/app.js" }, querySelectorAll: () => [link] },
    setTimeout: (callback) => { timers.push(callback); return timers.length; },
    clearTimeout() {},
  });
  fixtureModule.exports(1, { locals: true })();
  timers.shift()();
  return { callbacks, detach: () => { link.parentNode = null; }, removed: () => removed };
}

test("reproduces Next CSS HMR failure when the old link was detached", () => {
  const reload = prepareReload(original);
  reload.detach();
  assert.throws(() => reload.callbacks.load(), /removeChild/);
});

for (const event of ["load", "error"]) {
  test(`guarded ${event} tolerates an already detached stylesheet`, () => {
    const reload = prepareReload(guard(original));
    reload.detach();
    assert.doesNotThrow(() => reload.callbacks[event]());
    assert.equal(reload.removed(), 0);
  });
  test(`guarded ${event} still removes an attached old stylesheet once`, () => {
    const reload = prepareReload(guard(original));
    reload.callbacks[event]();
    reload.callbacks[event]();
    assert.equal(reload.removed(), 1);
  });
}

test("does not modify unrelated application source", () => {
  const source = "const style = document.createElement('link');";
  assert.equal(guard(source), source);
});
