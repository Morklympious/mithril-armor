# Mithril Armor

..._because everyone loves some top-tier armor_.

Mithril Armor is this fun little idea I had to make reusable Mithril calls via partial application.

## How can I use it?

This script exposes itself both as a commonjs module you can use via `require` and as an object on the `window`.

Mithril Armor will respect anything that currently exists on the window object.
it currently attaches itself to `window.a` (also `window.armor`) if there's nothing there. Otherwise it doesn't attach itself at all.

I'm still debating whether or not to attach it to the `window.m` object.

### Developing
1. `npm install`
2. `npm run build` to output a minified and unminified script into `/dist`
3. `npm run tests` to run tests, of course.

## Actual usage

Mithril armor is fairly simple to use. The idea is based on setting up base Mithril objects as high order functions and extending them on a per-instance basis. Let's say we want a button.

````js
var button = a('button');
````

Great! Now Mithril Armor returns a function that we can further call things on.
You can use the `button` variable to add a `danger` class to an instance of `m('button', ...)`.

````js
var danger = button({class: 'danger'}) // This is one parameter short
````

And now we can make several danger buttons:

````js
var perilous  = danger('This is perilous');
var arduous   = danger('This is arduous');
var upsetting = danger('This is upsetting');
````

At the end of the day, these parameters will be called via mithril, so mixing and matching with mithril calls isn't a problem.

````js
var component = {
  view: function() {
    return m('div', [
      perilous,
      arduous,
      upsetting,
      m('button', 'Not very upsetting')
    ])
  }
}
````

## Void Elements

Mithril handles things like `input` or `img` (and a handful of others) differently, in that they're self-closing elements that don't have child content, these are referenced internally as `voids`, or void elements. So where other elements will return a function for further extending, this handful of tags that will return a mithril object after the `tag` and `attrs` properties have been filled.

````js
var input = a('input')
var text = input({type: 'text'});
var button = input({type: 'button', value: 'Click me!'})

var image = a('img')
var horse = image({src: 'fake/path'})
var cat   = image({src: 'different/fake/path'})
````

## Structuring your armor

I've still been working on the way to best setup families of armor functions. So far I think an object-per-HTML-element approach works well. Not only does it make sense from a grouping perspective, writing the armor extensions in mithril code makes more sense

Assuming we have corresponding styling in place:

````js
var paragraph = {
  base: a('p');
}
// <p class="strong"></p>
paragraph.bold      = paragraph.base({class: 'strong'});

// <p class="emphasis"></p>
paragraph.italic    = paragraph.base({class: 'emphasis'});

// <p class="obnoxious"></p>
paragraph.obnoxious = paragraph.base({class: 'obnoxious'});
````

As a result, you can reference these easily in mithril calls:

````js
var p = paragraph;

m('div', [
  p.bold('This is some ridiculously bolded text');
  p.italic('Spooky italic text. Boo!');
  p.obnoxious('You get the idea');
])
````

This approach works especially well if you're like me and you enjoy decoupling EVERYTHING and using `require` via commonjs. So if you end up having a folder for each of your individual elements (I like to call them iotas), you can easily export the initial object after adding all of your armor extensions to that object.

## Notes

### What this tool is for
This tool is meant for you to group together and create small pieces of mithril calls (thematically, I like to call them fragments) that you will eventually group together to create Mithril objects.

### What this tool is _not_ for
This is not a catch-all tool for every element you're going to run into when you're coding your virtual dom tree, it's meant as a utility to make crafting Mithril calls based on a single established variable. If it doesn't work for your use case, you should ask yourself "Could I just call Mithril directly here?", and most of the time the answer will be YES. that'll be just fine!

## Thanks!

Thanks for checking out the repo!
Thanks to [@lhorie](https://github.com/lhorie) for creating mithril, [@tivac](https://github.com/tivac) for introducing me to mithril, and the [Mithril gitter chatroom](https://gitter.im/lhorie/mithril.js) for being awesome people!
