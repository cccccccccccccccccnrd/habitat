/*jshint esversion: 6 */

var Ui = pc.createScript('ui')

Ui.attributes.add('styles', { type: 'asset', assetType: 'css' })

// initialize code called once per entity
Ui.prototype.initialize = function() {
    var self = this
    
    this.initStyles()
    this.initHtml()
    
    this.app.on('ui:show', function(description, artist, social, workshop, title, link) {
        self.show(description, artist, social, workshop, title, link)
    });
    
    this.app.on('ui:hide', function() {
        self.hide()
    });
}

Ui.prototype.show = function(description, artist, social, workshop, title, link) {
    document.querySelector('#ui-desc').innerHTML = description || ''
    document.querySelector('#ui-social').innerHTML = artist || 'Artist'
    document.querySelector('#ui-social').href = social || 'https://www.captcha-mannheim.de/'
    document.querySelector('#ui-workshop').innerHTML = workshop || 'Workshop'
    document.querySelector('#ui-title').innerHTML = link ? `${title} <a id="ui-target-blank" href="${link}" target="_blank">&nearr;</a>` : title
    
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
    
    document.querySelector('#ui-bottom').style.display = 'flex'
}

Ui.prototype.hide = function() {
    document.querySelector('#ui-bottom').style.display = 'none'
}

Ui.prototype.initStyles = function() {
    var style = pc.createStyle(this.styles.resource || '')
    document.head.appendChild(style)
    this.app.assets.load(this.styles)
}

Ui.prototype.initHtml = async function() {
    var url = window.location.hostname === 'localhost' ? 'http://localhost:3000' : 'https://habitat.captcha-mannheim.de'
    var response = await fetch(`${url}/meta`)
    var json = await response.json()
    var spaces = json.spaces

    var space = window.location.pathname.replace('/', '')
    var links = spaces.map(function(space) { return `<a href="${url}/${space.url}"></a>`}).join('')

    document.body.insertAdjacentHTML('beforeend', `<div id="ui-top" class="ui"><div class="container"><div class="links">${links}</div><img src="${url}/assets/ui-top-${space}.png"/></div></div><div id="ui-bottom" class="ui"><section class="info"><div id="ui-desc" class="desc"><p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque accumsan justo eget turpis placerat sagittis id et quam. Nullam nec ultricies lacus. Nam fringilla maximus vestibulum. Nullam lobortis pretium risus at aliquet. Sed lacinia eu ante a faucibus. Maecenas pulvinar augue a odio commodo scelerisque.</p></div><div class="upper">By<p class="card name"><a id="ui-social" href="http://instagram.com" target="_blank">Artist</a></p> as part of<p class="card workshop"><a id="ui-workshop" href="https://www.captcha-mannheim.de" target="_blank">Workshop</a></p></div><div class="lower"><p id="ui-title" class="card title">Title <a id="ui-target-blank" href="#" target="_blank">&nearr;</a></p></div></section></div>`)
}

// update code called every frame
Ui.prototype.update = function(dt) {
    
}

// swap method called for script hot-reloading
// inherit your script state here
// Ui.prototype.swap = function(old) { };

// to learn more about script anatomy, please read:
// http://developer.playcanvas.com/en/user-manual/scripting/