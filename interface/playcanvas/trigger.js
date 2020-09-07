var Trigger = pc.createScript('trigger');

Trigger.attributes.add('description', {
    type: 'string',
    default: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque accumsan justo eget turpis placerat sagittis id et quam. Nullam nec ultricies lacus. Nam fringilla maximus vestibulum. Nullam lobortis pretium risus at aliquet. Sed lacinia eu ante a faucibus. Maecenas pulvinar augue a odio commodo scelerisque.'
});

Trigger.attributes.add('artist', {
    type: 'string',
    default: 'Finn Tontsch'
});

Trigger.attributes.add('social', {
    type: 'string',
    default: 'http://instagram.com/cool'
});

Trigger.attributes.add('workshop', {
    type: 'string',
    default: 'Personal Archive Narrative'
});

Trigger.attributes.add('title', {
    type: 'string',
    default: 'Earlier cellphones'
});

Trigger.attributes.add('link', {
    type: 'string',
    default: 'http://vimeo.com'
});

// initialize code called once per entity
Trigger.prototype.initialize = function() {
    this.entity.collision.on('triggerenter', this.onTriggerEnter, this);
    this.entity.collision.on('triggerleave', this.onTriggerLeave, this);
};

Trigger.prototype.onTriggerEnter = function(entity) {
    this.app.fire('ui:show', this.description, this.artist, this.social, this.workshop, this.title, this.link);
};

Trigger.prototype.onTriggerLeave = function(entity) {
    this.app.fire('ui:hide');
};
