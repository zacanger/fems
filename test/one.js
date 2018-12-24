export const run = () => {
  const node = document.getElementById('one')
  const el = document.createElement('span')
  el.innerText = 'I am app one'
  node.appendChild(el)
}
