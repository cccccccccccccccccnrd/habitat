const path = require('path')
const express = require('express')
const socket = require('./socket.js')

const app = express()

app.use('/', express.static(path.join(__dirname, 'offline')))

app.get('/players', (req, res) => {
  const players = socket.getPlayers()
  res.json(players)
})

app.listen(3000, () => {
  console.log(`server listening at http://localhost:3000`)
})

socket.init()
