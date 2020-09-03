const server = require('http').createServer()
const io = require('socket.io')(server)

const players = {}

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
  
      players[id] = newPlayer
      
      console.log('player connected', id)
  
      socket.emit('player-data', { id: id, players: players })
  
      socket.broadcast.emit('player-joined', newPlayer)
  
      socket.on('position-update', (data) => {
        players[data.id].x = data.x
        players[data.id].y = data.y
        players[data.id].z = data.z
  
        socket.broadcast.emit('player-moved', data)
      })
    })
  })

  console.log('socket listening at http://localhost:3001')
  server.listen(3001)
}

function getPlayers () {
  return players
}

module.exports = {
  init,
  getPlayers
}
