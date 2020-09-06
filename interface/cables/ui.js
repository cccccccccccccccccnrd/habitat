document.addEventListener('CABLES.jsLoaded', (event) => {
  initHtml()

  CABLES.patch = new CABLES.Patch({
    patch: CABLES.exportedPatch,
      prefixAssetPath: '',
      glCanvasId: 'glcanvas',
      glCanvasResizeToWindow: true,
      onError: (error) => console.log(error)
  })

  CABLES.patch.config.showUi = (description, artist, social, workshop, title) => {
    show(description, artist, social, workshop, title)
  }

  CABLES.patch.config.hideUi = (description, artist, social, workshop, title) => {
    hide()
  }
})

function show(description, artist, social, workshop, title) {
  document.querySelector('#ui-desc').innerHTML = description || ''
  document.querySelector('#ui-social').innerHTML = artist || 'Artist'
  document.querySelector('#ui-social').href = social || 'https://www.captcha-mannheim.de/'
  document.querySelector('#ui-workshop').innerHTML = workshop || 'Workshop'
  document.querySelector('#ui-title').innerHTML = title || 'Artwork'

  switch(workshop) {
    case 'Creating Conflicting Spaces':
      document.querySelector('#ui-workshop').href = 'https://www.captcha-mannheim.de/#/workshopleaders/0'
      break
    case 'Personal Archive Narrative':
      document.querySelector('#ui-workshop').href = 'https://www.captcha-mannheim.de/#/workshopleaders/1'
      break
    case 'Infinite Paradise Always Forever And Ever':
      document.querySelector('#ui-workshop').href = 'https://www.captcha-mannheim.de/#/workshopleaders/2'
      break
    case 'Nature Patterns In AR':
      document.querySelector('#ui-workshop').href = 'https://www.captcha-mannheim.de/#/workshopleaders/3'
      break
    default:
      document.querySelector('#ui-workshop').href = 'https://www.captcha-mannheim.de/'
  }
  
  document.querySelector('#ui').style.display = 'flex'
}

function hide () {
  document.querySelector('#ui').style.display = 'none'
}

function initHtml () {
  document.body.insertAdjacentHTML('beforeend', '<div id="ui" class="ui"><section class="info"><div id="ui-desc" class="desc"><p></p></div><div class="upper">By<p class="card name"><a id="ui-social" href="https://www.captcha-mannheim.de/" target="_blank">Artist</a></p> as part of<p class="card workshop"><a id="ui-workshop" href="https://www.captcha-mannheim.de/#/workshopleaders/1" target="_blank">Personal Archive Narrative</a></p></div><div class="lower"><p id="ui-title" class="card title">Earlier cellphones</p></div></section></div>')
}

