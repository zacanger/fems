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

export default async (manifest) => {
  const apps = await get(manifest)
  await each(apps, async (m) => {
    const { run } = await load(m)
    run()
  })
}
