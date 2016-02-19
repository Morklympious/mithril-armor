# Composing
This is just a simple example of using 'families' of tags stored into objects.

````js
 var container = {
   base: a('.container')
 };

 container.padded = container.base({class: 'padded'});
 container.custom = container.base({class: 'custom', 'data-custom': true});

 var button = {
   base: a('button')
 };

 button.info    = button.base({class: 'button button-info'});
 button.danger  = button.base({class: 'button button-danger'});
 button.warning = button.base({class: 'button button warning'});

 var component = {
   controller: function() {

   },

   view: function() {
    return container.base([
      container.padded([
        m('h2', 'Look at that!')
        button.info('This is an info-button.')
      ]),
      container.padded([
        m('h2', 'These buttons extended from button.base')
        button.warning('Highway to the...'),
        button.danger('Danger zone')
      ]),
      container.custom([
        m('h2', 'All four button armor elements.')
        button.base({class: 'button button-base'}, 'Base Button'),
        button.info('knowledge is power')
        button.warning('Careful!'),
        button.danger('WHY DID YOU DO THIS?')
      ])
    ])
   }
 }

 m.mount(document.body, component)
````
