const path = require('path')
const express = require('express')
const cors = require('cors')
const socket = require('./socket.js')

const app = express()

app.use(cors())

const spaces = [{
  name: 'Andri Schatz',
  title: 'AGARTHA 5G',
  url: 'agartha5g',
  social: 'https://instagram.com/likebot9kplus',
  website: 'https://www.andrischatz.website/',
  pc: {
    id: 716323,
    name: 'AGARTHA 5G',
    scenes: ['Untitled']
  }
}, {
  name: 'Sandy Richter',
  title: 'Wow cool',
  url: 'sandy',
  social: 'https://www.instagram.com/sandyrichter_',
  website: null,
  pc: {
    id: 717007,
    name: 'sandy',
    scenes: ['Untitled']
  }
}, {
  name: 'Gina Bartzok',
  title: 'yeah yeah not really',
  url: 'yeahyeahnotreally',
  social: 'https://instagram.com/giniiiiiii',
  website: 'https://ginabartzok.de/'
}, {
  name: 'Jonas Anetzberger',
  title: 'spacespace',
  url: 'spacespace',
  social: 'https://www.instagram.com/jonasanetzberger.xyz',
  website: 'https://www.jonasanetzberger.xyz/',
  pc: {
    id: 716172,
    name: 'spacespace',
    scenes: ['Untitled']
  }
}]

spaces.forEach((space) => {
  console.log(space.url)
  app.use(`/${space.url}`, express.static(path.join(__dirname, space.url)))
})

app.use('/', express.static(path.join(__dirname, 'offline')))
app.use('/space', express.static(path.join(__dirname, 'main')))
app.use('/assets', express.static(path.join(__dirname, 'assets')))

app.get('/meta', (req, res) => {
  const players = socket.getPlayers()

  res.json({
    connected: players,
    spaces: spaces
  })
})

app.listen(3000, () => {
  console.log(`server listening at http://localhost:3000`)
})

socket.init()
