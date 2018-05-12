const _window = typeof window === 'object' ? window : typeof global === 'object' ? global : {}

// _window.import =
export default (function (transformer) { // eslint-disable-line no-unused-vars
  // https://gist.github.com/caub/458cfe944f8abcf7b1aec608d0a878cc
  const ROOT = _window.location.origin
  const REQUIRE_CACHE = new Map()
  const RE_EXT = /\.js\w*$/

  // eslint-disable-next-line func-style
  function fqn (url, dirname) {
    const { href } = new URL(url.startsWith('http') ? url : (url.startsWith('/') ? ROOT : dirname) + url)
    const last = href.lastIndexOf('/')
    const dir = href.slice(0, last + 1)
    const name = href.slice(last + 1)
    const filename = name ? (RE_EXT.test(name) ? name : name + '.js') : 'index.js'
    return { dir, abs: dir + filename }
  }

  // eslint-disable-next-line func-style
  function _require (url) {
    if (REQUIRE_CACHE.has(url)) {
      return Promise.resolve(REQUIRE_CACHE.get(url).exports)
    }

    const { dir, abs } = fqn(url, this.__dirname)

    if (REQUIRE_CACHE.has(abs)) {
      return Promise.resolve(REQUIRE_CACHE.get(abs).exports)
    }

    if (abs.endsWith('.json')) {
      return _window.fetch(abs)
        .then((r) => r.json())
        .then((code) => {
          const MODULE = { exports: code }
          REQUIRE_CACHE.set(abs, MODULE)
          return MODULE
        })
    }

    return _window.fetch(abs)
      .then((r) => r.text())
      .then((code) => {
        // eslint-disable-next-line
        const executableCode = Function('module', 'exports', '__dirname', 'require', code + '\n\n//# sourceURL=' + abs)
        const MODULE = {
          __dirname: dir,
          exports: {}
        }
        REQUIRE_CACHE.set(abs, MODULE)
        executableCode.call(MODULE.exports, MODULE, MODULE.exports, dir, _require.bind(MODULE))
        return MODULE.exports
      })
  }

  return Object.assign(_require.bind({ __dirname: ROOT }), { cache: REQUIRE_CACHE })
}())
