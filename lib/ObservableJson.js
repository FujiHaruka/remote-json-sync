const {updatedDiff} = require('deep-object-diff')
const EventEmitter = require('events')

class ObservableJson extends EventEmitter {
  constructor (jsonObject) {
    super()
    this.data = jsonObject
  }

  update (nextObject) {
    const original = this.data
    this.data = nextObject
    const diff = updatedDiff(original, nextObject)
    this.emit('update', diff)
  }
}

module.exports = ObservableJson
