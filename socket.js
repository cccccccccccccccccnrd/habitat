const server = require('http').createServer()
const io = require('socket.io')(server)

const state = {
  players: {}
}

function Player (id) {
  this.id = id
  this.x = 0
  this.y = 0
  this.z = 0
  this.entity = null
}

function init () {
  io.sockets.on('connection', (socket) => {
    socket.on('initialize', () => {
      const id = socket.id
      const newPlayer = new Player(id)

      state.players[id] = newPlayer

      console.log('client connected', id)

      socket.emit('player-data', { id: id, players: state.players })

      socket.broadcast.emit('player-joined', newPlayer)

      socket.on('position-update', (data) => {
        state.players[data.id].x = data.x
        state.players[data.id].y = data.y
        state.players[data.id].z = data.z

        socket.broadcast.emit('player-moved', data)
      })
    })
  })

  server.listen(3001, () => {
    console.log('socket listening at http://localhost:3001')
  })
}

function getPlayers () {
  return state.players
}

module.exports = {
  init,
  getPlayers
}
