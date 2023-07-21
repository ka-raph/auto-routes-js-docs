# Getting started
*Please note that the paths and folder structure in the examples below are only suggestions, you are free to use your own structure.*

Create a file named `routes.js` in `/src/routes.js`from which you export an object containing routes such as below:
```javascript
export default {
    default: '/views/welcome.html', // Mandatory. Use the full path if the backend doesn't serve this file by default
    'welcome': '/views/welcome.html', // Don't use forward slashes as first character of the route name, i.e. don't use '/welcome'
    'about': '/views/about.html',
    'wildcard': {
        ':id': {
            'nested': {
                ':otherId': '/views/wildcard.html',
            },
        },
    },
    fallback: '/views/404.html'
};
```

In your main HTML file, say `/public/index.html`, add add a tag with the id `autoroutes-view` and call the `index.js` you'll next create as a JavaScript module:

```html
<!doctype html>
<html>
  <head>
    <title>My Awesome SPA</title>
  </head>
  <body>
    <header>Welcome to My Awesome SPA</header>
    <section id="autoroutes-view"></section>
    <script src="https://www.unpkg.com/auto-routes-js@1.2.0/dist/Autoroutes-v1.2.0.min.js" type="module"></script>
    <script src="/src/index.js" type="module"></script>
  </body>
</html>
```

Then create a file named `index.js` in `/src/index.js`, such as:

```javascript
// The import statement for Autoroutes isn't necessary if you use the CDN version
import routes from './routes.js';

// Set the router's settings (none are mandatory), see the "Configuration" section further below
const settings = {
    debug: false, // Setting this value to false will prevent Autoroutes to log anything, useful for production environments
    baseFolder: 'src',
    appPath: 'http://localhost:5000'
}

// Start the router
Autoroutes.start({routes, ...settings});
```

## NPM (no bundler)
**Only if your backend can serve the `node_modules` folder or if serving routes can be configured.**

If your server isn't serving the root folder of your frontend application but you can nonetheless configure it, add a route that serves the `node_modules` folder in your server.

Just add the line below at the beginning of `/src/index.js` (make sure to fix the path):
```javascript
import Autoroutes from '/path/to/node_modules/auto-routes-js/index.js';
```


## NPM (with bundler)
Add an import to the `auto-routes-js` module at the beginning of `/src/index.js` (make sure to fix the path) and for a cleaner code you can as well remove the `.js` extension from the other import, such as:
```javascript
import Autoroutes from 'auto-routes-js';
import routes from './routes';
```