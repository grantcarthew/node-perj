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
      const value = obj[propNames[i]]
      const type = typeCheck(value)
      if (type === 'object') {
        if (seen.has(value)) {
          node[propNames[i]] = '[Circular]'
        } else {
          seen.add(value)
          node[propNames[i]] = serializeError(value)
        }
      } else if (type) {
        node[propNames[i]] = value
      }
    }

    tree = tree || node
    currentNode[nodeName] = node
    currentNode = node
  }

  return tree
}

function typeCheck (value) {
  try {
    const type = typeof value
    if (type === 'string' ||
        type === 'number' ||
        type === 'boolean' ||
        Array.isArray(value) ||
        value === null) {
      return true
    }
    if (type === 'object') {
      return 'object'
    }
  } catch (err) { }

  return false
}
