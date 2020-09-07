const url = window.location.hostname === 'localhost' ? 'http://localhost:3000' : 'https://habitat.captcha-mannheim.de'

async function init () {
  const response = await fetch(`${url}/meta`)
  const json = await response.json()

  const spaces = json.spaces
  const space = spaces[Math.floor(Math.random() * spaces.length)]
  window.location = `${url}/${space.url}`
}

init()
