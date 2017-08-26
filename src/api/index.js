import { fetch, url } from '@/utils/api.js';

const files = require.context('.', false, /\.js$/)
const modules = {}

function getCamelCaseName (name) {
  if (name.indexOf('-')) {
    const _tempName = name.toLowerCase().split('-')
    for (let i = 1; i < _tempName.length; i++) {
      _tempName[i] = _tempName[i].substring(0, 1).toUpperCase() +
      _tempName[i].substring(1)
    }
    return _tempName.join('')
  } else {
    return name
  }
}

files.keys().forEach(key => {
  if (key === './index.js') return
  const tmpKey = key.replace(/(\.\/|\.js)/g, '')
  const camelCaseName = getCamelCaseName(tmpKey)
  modules[camelCaseName] = files(key)
})

modules['fetch'] = fetch
modules['url'] = url

export default modules
