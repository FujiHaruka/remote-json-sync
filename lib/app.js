const app = require('express')()
const http = require('http').Server(app)
const io = require('socket.io')(http)
const port = process.env.PORT || 3001

const ObservableJson = require('./ObservableJson')
const {createRandamObject, randomUpdate} = require('./helpers')

const initData = createRandamObject(4, 6)
const observable = new ObservableJson(initData)

const INTERVAL = 100
setInterval(() => {
  const updated = randomUpdate(observable.data)
  observable.update(updated)
}, INTERVAL)

io.on('connection', function (socket) {
  socket.emit('init', observable.data)
  observable.on('update', (diff) => {
    io.emit('update', diff)
  })
})

http.listen(port, function () {
  console.log('listening on *:' + port)
})
