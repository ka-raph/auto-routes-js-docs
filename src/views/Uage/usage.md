# Usage
You can use HTML and JS to create the template to be rendered for any route out of the box, but it is also possible to configure Autoroutes.js to parse other file types. Whichever you choose, it doesn't exclude the possibility to mix the templating source types, therefore you may have some routes that use a HTML file for the template while some other may have a JavaScript file or a Markdown file for that purpose.

*Autoroutes.js is very lightweight & fast, modern browsers usually lazy-load files if they've been previously fetched and that the content hasn't changed, therefore the views that the user has already visited will be loaded from memory on their browser by default. But this also means that extremely heavy template files might take a noticeable amount of time to load the first time your users's browser fetches them or if their connection or device aren't fast, especially if you use custom parsers. The [beforeNavigation](#beforenavigation) and [afterNavigation](#afterNavigation) hooks allow you to add for instance a loading screen to cover these scenarios.*

**Feel free to check out the [source code](https://github.com/ka-raph/auto-routes-js-docs) of these docs to get an example on how to use AutoroutesJs and how to use a parser (for `.md` files) with it. More examples will be published soon.**


## Routing links
To navigate to another route, use the `<router-link></router-link>` element, it takes one attribute: `to`.

`to` must be provided the target route's name (works with leading `\` and without it).

**HTML example:**

```html
<router-link to="/cart"><button>View Cart</button></router-link>
```

**JavaScript example:**
```javascript
const routerLink = document.createElement('router-link');
routerLink.setAttribute('to', '/cart');
routerLink.innerHTML = '<button>View Cart</button>';

const selector = document.querySelector('#modal-footer');
selector.appendChild(routerLink); // Make sure you use a working selector
```

## Templating

You can use HTML and/or JavaScript out of the box with this router for templating your views. It is also possible to use any other file type such as `.md` but with some extra configuration as explained [further below](#other-file-types).


### HTML
Let's say you want to add a new route such as `/counter`, you can create a file named `counter.html` with basic logics in a `<script></script>` tag to keep it in a single file.

It is not needed to add the whole boilerplate from a usual HTML file, instead you can directly use the template you want to be added to the view.

```html
<!-- Note that HTML files don't need to have only one top-level node, unlike the JavaScript alternative -->
<p>
    Click count: <span id="count">0</span>
</p>
<button id="clickMe" onclick="incrementCount">Click Me!</button>
<script> // You could refer to a script from a JavaScript file as well for a better separation of concerns
    const counter = document.getElementById('count');
    const btn = document.getElementById('clickMe');
    let count = 0;

    function incrementCount() {
        count++;
        counter.textContent = counter;
    }
</script>
```

Then add it to your `routes.js` file:

```javascript
export default {
    'counter': '/views/counter.html',
    ...otherRoutes
};
```

### JavaScript
**You can export views as a `string` containing a HTML template such as `"<p><g>Hello!</g></p>"` or as an Array containing valid HTML template string | [Node](https://developer.mozilla.org/en-US/docs/Web/API/Node) | [Element](https://developer.mozilla.org/en-US/docs/Web/API/Element) | [Document](https://developer.mozilla.org/en-US/docs/Web/API/Document) | [DocumentFragment](https://developer.mozilla.org/en-US/docs/Web/API/DocumentFragment).**
One way to implement the same counter as above in a JavaScript file, for that you can create `counter.js`:

```javascript
const container = document.createElement('div');
const counterParag = document.createElement('p');
const btn = document.createElement('button');
let count = 0;

counterParag.innerHTML = `Click count: <span id="count">${counter}</span>`;
btn.textContent = 'Click Me!';

container.append(counterParag, btn);

btn.onclick = () => {
    count++;
    document.getElementById('counter').textContent = counter;
}

// The container will be appended by the Router
export default container;
```

Then add it to your `routes.js` file:

```javascript
export default {
    'counter': '/views/counter.js',
    ...otherRoutes
};
```

### Other file types
You will need to provide the parser(s) for other file types to Autoroutes.js, here is an example Autoroutes.js configuration to create your views template from `.md` files using [Marked](https://marked.js.org/) (CDN import):

```javascript
import Autoroutes from 'auto-routes-js';
import routes from './routes.js';

const parsers = [ // This should always be an array, this allows you to use as many file parsers as you want
    {
        // `parse` must be a function with one parameter that returns a valid HTML string | Node | Element | Document | DocumentFragment
        parse: mdString => marked.parse(mdString),
        // `pattern` must be a valid Regular Expression (RegExp or string)
        pattern: '.md$'
    },
];

Autoroutes.start({routes, baseFolder: '/src', parsers});
```

Non-JavaScript file types are usually loaded as a string when the user's browser fetches them, make sure your parser takes a single string as an input.