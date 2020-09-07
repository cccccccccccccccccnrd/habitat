const path = require('path')
const express = require('express')
const socket = require('./socket.js')

const app = express()

const spaces = [{
  name: 'Andri Schatz',
  title: '5G Agartha',
  url: '5gagartha',
  social: 'https://instagram.com/likebot9kplus',
  website: 'https://www.andrischatz.website/'
}, {
  name: 'Sandy Richter',
  title: 'Wow cool',
  url: 'sandy',
  social: 'https://www.instagram.com/sandyrichter_',
  website: null
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
  website: 'https://www.jonasanetzberger.xyz/'
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
