pc.script.createLoadingScreen(function (app) {
  function showLoading () {
    document.body.insertAdjacentHTML('beforeend', `<div id="ui-top" class="ui"><div class="container"><div class="links">${links}</div><img src="${url}/assets/ui-top-${space}.png"/></div></div><div id="ui-bottom" class="ui"><section class="info"><div id="ui-desc" class="desc"><p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque accumsan justo eget turpis placerat sagittis id et quam. Nullam nec ultricies lacus. Nam fringilla maximus vestibulum. Nullam lobortis pretium risus at aliquet. Sed lacinia eu ante a faucibus. Maecenas pulvinar augue a odio commodo scelerisque.</p></div><div class="upper">By<p class="card name"><a id="ui-social" href="http://instagram.com" target="_blank">Artist</a></p> as part of<p class="card workshop"><a id="ui-workshop" href="https://www.captcha-mannheim.de" target="_blank">Workshop</a></p></div><div class="lower"><p id="ui-title" class="card title">Title <a id="ui-target-blank" href="#" target="_blank">&nearr;</a></p></div></section></div>`)
  }

  function hideLoading () {
    const loading = document.getElementById('loading')
    loading.parentElement.removeChild(loading)
  }

  function setProgress (value) {
    const progress = document.getElementById('progress')
    if (progress) {
        value = Math.min(1, Math.max(0, value))
        progress.style.width = `${value * 100}%`
    }
  }

  function initCss () {

  }

  initCss()
  showLoading()
      
  app.on('preload:end', function () {
      app.off('preload:progress')
  })
  app.on('preload:progress', setProgress)
  app.on('start', hideLoading)
})