const objPath = require('object-path')
const clone = require('clone')

const randomStr = () => Math.random().toString(36).slice(-4)
const createRandamObject = (width, depth) => {
  const obj = depth === 0 ? randomStr() : {}
  for (let dep = 0; dep < depth; dep++) {
    const key = randomStr()
    obj[key] = createRandamObject(width, depth - 1)
  }
  return obj
}

const randInt = (min, max) => Math.floor(Math.random() * max - min) + min
const randomPathOf = (obj) => {
  const keys = Object.keys(obj)
  const index = randInt(0, keys.length)
  const subPath = keys[index]
  const subObj = obj[subPath]
  if (typeof subObj === 'object') {
    return subPath + '.' + randomPathOf(subObj)
  } else {
    return subPath
  }
}

const randomUpdate = (obj) => {
  const copy = clone(obj)
  const path = randomPathOf(obj)
  objPath.set(copy, path, randomStr())
  return copy
}

module.exports = {
  createRandamObject,
  randomUpdate
}
