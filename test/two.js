export const run = () => {
  const node = document.getElementById('two')
  const el = document.createElement('span')
  el.innerText = 'I am app two'
  node.appendChild(el)
}
