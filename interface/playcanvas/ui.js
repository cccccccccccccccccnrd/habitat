var Ui = pc.createScript('ui');

// initialize code called once per entity
Ui.prototype.initialize = function() {
    var self = this;
    
    this.initStyles();
    this.initHtml();
    
    this.app.on('ui:show', function(description, artist, social, workshop, title) {
        self.show(description, artist, social, workshop, title);
    });
    
    this.app.on('ui:hide', function(description, artist, social, workshop, title) {
        self.hide();
    });
};

Ui.prototype.show = function(description, artist, social, workshop, title) {
    document.querySelector('#ui-desc').innerHTML = description || '';
    document.querySelector('#ui-social').innerHTML = artist || 'Artist';
    document.querySelector('#ui-social').href = social || 'https://www.captcha-mannheim.de/';
    document.querySelector('#ui-workshop').innerHTML = workshop || 'Workshop';
    document.querySelector('#ui-title').innerHTML = title || 'Artwork';
    
    switch(workshop) {
        case 'Creating Conflicting Spaces':
            document.querySelector('#ui-workshop').href = 'https://www.captcha-mannheim.de/#/workshopleaders/0';
            break;
        case 'Personal Archive Narrative':
            document.querySelector('#ui-workshop').href = 'https://www.captcha-mannheim.de/#/workshopleaders/1';
            break;
        case 'Infinite Paradise Always Forever And Ever':
            document.querySelector('#ui-workshop').href = 'https://www.captcha-mannheim.de/#/workshopleaders/2';
            break;
        case 'Nature Patterns In AR':
            document.querySelector('#ui-workshop').href = 'https://www.captcha-mannheim.de/#/workshopleaders/3';
            break;
        default:
            document.querySelector('#ui-workshop').href = 'https://www.captcha-mannheim.de/';
    }
    
    document.querySelector('#ui').style.display = 'flex';
};

Ui.prototype.hide = function() {
    document.querySelector('#ui').style.display = 'none';
};

Ui.prototype.initStyles = function() {
    var styles = this.app.assets.get(34944986);
    var style = pc.createStyle(styles.resource || '');
    document.head.appendChild(style);
    this.app.assets.load(styles);
};

Ui.prototype.initHtml = function() {
    document.body.insertAdjacentHTML('beforeend', '<div id="ui" class="ui"><section class="info"><div id="ui-desc" class="desc"><p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque accumsan justo eget turpis placerat sagittis id et quam. Nullam nec ultricies lacus. Nam fringilla maximus vestibulum. Nullam lobortis pretium risus at aliquet. Sed lacinia eu ante a faucibus. Maecenas pulvinar augue a odio commodo scelerisque.</p></div><div class="upper">By<p class="card name"><a id="ui-social" href="http://instagram.com" target="_blank">sahika_______x</a></p> as part of<p class="card workshop"><a id="ui-workshop" href="https://www.captcha-mannheim.de/#/workshopleaders/1" target="_blank">Personal Archive Narrative</a></p></div><div class="lower"><p id="ui-title" class="card title">Earlier cellphones</p></div></section></div>');
};

// update code called every frame
Ui.prototype.update = function(dt) {
    
};

// swap method called for script hot-reloading
// inherit your script state here
// Ui.prototype.swap = function(old) { };

// to learn more about script anatomy, please read:
// http://developer.playcanvas.com/en/user-manual/scripting/