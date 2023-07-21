# Configuration
**NOTE: you can both read and write some of the configuration properties of the Autoroute object, but it is recommended to avoid changing them after starting Autoroute.**

Some settings can be used to override the router's defaults. You can do so by passing them in an object as second parameter of the `start(routes, settings)` function of the Router, eg. in your `/src/index.js`:
```javascript
import Autoroutes from 'auto-routes-js';
import routes from './routes';
import { checkAuthenticated } from './auth';
import { updateUserData } from './services/user';

// Set the router's settings (none are mandatory), see the "Configuration" section further below
const settings = {
    baseFolder: 'src',
    appPath: process.env.NODE_ENV,
    beforeNavigation: () => {
        if (!checkAuthenticated()) return false;
        udpateUserData();
    }
}

// Start the router
Autoroutes.start({routes, ...settings});
```

## `routes`
Type: `object`

Default: `{}`

**Required**

This is the main entry for Autoroutes, this will generate the paths and display views from the specified routes.

## `beforeNavigation`
Type: `async function | function`

Default: `async () => true`

Parameters: Doesn't take any parameter.

Return value: If the navigation should be prevented, this must return the boolean `false`, otherwise this is not used.

Can be used to run pre-navigation checks for instance such as auth check, if your custom function returns `false` the navigation will be prevented.

## `afterNavigation`
Type: `async function | function`

Default: `async () => true`

Parameters: Doesn't take any parameter.

Return value: `any`, this is not used.

Can be used to run custom code post-navigation, eg. data updates. This will run before the new scripts from the newly added template if you use HTML files, else if you use JS files for templating, this will run after the template is updated

## `debug`
Type: *boolean*

Default: `true`

Will print errors encoutered by Autoroutes in the console if set to `true`, nothing will be printed if `false` making debugging a bit more complicated.

## `appPath`
Type: *string*

Default: `window.location.origin`

The [origin](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Origin) of the web app. Defaults to the current URL's origin.

## `viewsContainerId`
Type: *string*

Default: `autoroutes-view`

The main container's id in which all your views will be rendered, **this setting is not mandatory but having a container with this id in your main HTML file is mandatory**.

## `wildcardChar`
Type: *string*

Default: `:`

**This must be 1 character only!** character used for declaring dynamic routes.

## `tagName`
Type: *string*

Default: `router-link`

**This must be at least two words separated by a single dash! (see [custom elements](https://developer.mozilla.org/en-US/docs/Web/Web_Components/Using_custom_elements))** Tag name of Autoroutes navigation links. *Override only if you know what you're doing*.

## `baseFolder`
Type: *string*

Default: `"/"`

The base path to be prepended to the URL to fetch the view files. Leave blank if you serve all the static content from the same folder as the main HTML file of your application.

Since you should serve your main file (say `/public/index.html`) as a catch-all route from your server, the path to the other view files will usually not resolve, you might then just want to catch all requests to the path `/src` for instance, and forward them to the `src` folder of your frontend application, then you should set `baseFolder` to `/src`. For nested folders: if all your views are under `/src/views` in your folder structure for instance, you might as well set `baseFolder` to `/src/views`.

## `parsers`
Type: `Array` ([ParserObject](#parserobject))

Default: `null`


This array can be filled with custom parsers ([ParserObject](#parserobject)) for file types or template types not supported by Autoroutes.js by default. 

### ParserObject
Each parser has to be an `object` with both the `parse` and `pattern` keys.

**Keys:**

* `parse`: `Function` with one parameter (the content to be parsed) of type string | [Node](https://developer.mozilla.org/en-US/docs/Web/API/Node) | [Element](https://developer.mozilla.org/en-US/docs/Web/API/Element) | [Document](https://developer.mozilla.org/en-US/docs/Web/API/Document) | [DocumentFragment](https://developer.mozilla.org/en-US/docs/Web/API/DocumentFragment)
* `pattern`: `string` | [Regular Expression](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Regular_Expressions)

**Example:**

```javascript
const parsers = [
    {
        parse: mdString => marked.parse(mdString),
        pattern: '.md$'
    },
    {
        parse: mdxString => parseCustomMd(mdxString),
        pattern: '.mdx$|.mdy$'
    }
];
```