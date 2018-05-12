import i from './shim'

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
    const { mount, app } = await i(m)
    mount(app)
  })
}
