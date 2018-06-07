module.exports = serializeError

function serializeError (obj) {
  if (obj == null) { return {} }

  const seen = new WeakSet([obj])
  let tree = null
  let currentNode = {}

  for (;obj != null; obj = Object.getPrototypeOf(obj)) {
    const constructor = obj.constructor.name || ''
    const name = obj.name || ''
    const node = { constructor, name }
    const nodeName = node.constructor || node.name || ((new Date()).getTime().toString())
    const propNames = Object.getOwnPropertyNames(obj)

    for (let i = 0; i < propNames.length; i++) {
      let type = getJSONType(obj[propNames[i]])
      if (type === 'error' || type === 'object') {
        if (seen.has(obj[propNames[i]])) {
          node[propNames[i]] = '[Circular]'
        } else {
          seen.add(obj[propNames[i]])
          node[propNames[i]] = serializeError(obj[propNames[i]])
        }
      } else if (type) {
        node[propNames[i]] = obj[propNames[i]]
      }
    }

    tree = tree || node
    currentNode[nodeName] = node
    currentNode = node
  }

  return tree
}

function getJSONType (value) {
  try {
    const type = typeof value
    if (type === 'string') { return 'string' }
    if (type === 'number') { return 'number' }
    if (type === 'boolean') { return 'boolean' }
    if (Array.isArray(value)) { return 'array' }
    if (value === null) { return 'null' }
    if (value instanceof Error) { return 'error' }
    if (Object.prototype.toString.call(value) === '[object Object]') { return 'object' }
  } catch (err) { }

  return false
}
