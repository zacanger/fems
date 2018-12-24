/* eslint-disable */
function get (url, opts) {
  window.fetch(url, opts)
    .then(function (res) {
      if (!res.ok) {
        throw new Error(res.statusText)
      }
      return res.json()
    })
}

function each (xs, cb) {
  for (var i = 0; i < xs.length; i++) {
    cb(xs[i]).then(function () {})
  }
}

function load (src) {
  try {
    // eslint-disable-next-line
    new Function('import("' + src + '")')()
  } catch (e) {
    var s = document.createElement('script')
    s.src = 'https://unpkg.com/shimport'
    s.dataset.main = src
    document.head.appendChild(s)
  }
}

function fems (manifest) {
  get(manifest)
    .then(function (apps) {
      each(apps)
        .then(function (m) {
          load(m)
            .then(function (n) {
              n.run()
            })
        })
    })
}

/*
const load = (src) => {
  try {
    // eslint-disable-next-line
    new Function('import("' + src + '")')()
  } catch (e) {
    const s = document.createElement('script')
    s.src = 'https://unpkg.com/shimport'
    s.dataset.main = src
    document.head.appendChild(s)
  }
}

const get = async (url, opts) => {
  const res = await window.fetch(url, opts)
  if (!res.ok) throw new Error(res.statusText)
  return res.json()
}

const each = async (xs, cb) => {
  for (let i = 0; i < xs.length; i++) {
    await cb(xs[i])
  }
}

const fems = async (manifest) => {
  const apps = await get(manifest)
  await each(apps, async (m) => {
    const { run } = await load(m)
    run()
  })
}
*/

// UMD-ish + ES modules
if (typeof module !== 'undefined' && typeof exports === 'object') {
  Object.defineProperty(exports, '__esmodule', {
    value: true
  })
  module.exports = fems
  module.exports.default = fems
} else if (typeof window !== 'undefined') {
  window.__fems = fems
} else if (typeof global !== 'undefined' && typeof global === 'object') {
  global.fems = fems
}
