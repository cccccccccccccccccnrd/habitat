pc.script.createLoadingScreen(function (app) {
  function showLoading () {
    document.body.insertAdjacentHTML('beforeend', `<div id="loading" class="loading"><div id="progress"></div><img id="loading-img" src=""></div>`)

    const url = window.location.hostname === 'localhost' ? 'http://localhost:3000' : 'https://habitat.captcha-mannheim.de'
    const space = window.location.pathname.replaceAll('/', '')

    document.querySelector('#loading-img').src = `${url}/assets/loading-${window.innerWidth > 700 ? 'desktop' : 'mobile'}-${space}.png`
  }

  function hideLoading () {
    const loading = document.getElementById('loading')
    loading.parentElement.removeChild(loading)
  }

  function setProgress (value) {
    const progress = document.querySelector('#progress')
  
    if (progress) {
      value = Math.min(1, Math.max(0, value))
      progress.style.width = `${value * 100}%`
    }
  }

  function initCss () {
    const css = 'html,body{margin:0;padding:0}#loading{position:absolute;z-index:999999;display:flex;width:100%;height:100vh;font-family:\'Arial\',sans-serif;font-size:5vw;background:#000}#loading img{width:100%;height:100%}#loading #progress{position:absolute;background:rgba(21,50,6,.4);height:100vh;width:40%;align-self:baseline}'
    const style = document.createElement('style')
    style.type = 'text/css'

    if (style.styleSheet) {
      style.styleSheet.cssText = css
    } else {
      style.appendChild(document.createTextNode(css))
    }

    document.head.appendChild(style)
  }

  initCss()
  showLoading()
      
  app.on('preload:end', function () {
      app.off('preload:progress')
  })
  app.on('preload:progress', setProgress)
  app.on('start', hideLoading)
})