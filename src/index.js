import routes from './routes.js';

export const BASE_URL = window.location.origin + '/auto-routes-js-docs';
export const BASE_URL_IDENTIFIER = '$$BASE_URL';
const updateBaseUrlInTemplate = templateStr => templateStr.replaceAll('$$BASE_URL', BASE_URL);
const parsers = [
    {
        // Use Marked to parse stringified content of `.md` files.
        // Marked is added to the window object from the script tags that pulls its CDN version
        parse: mdString => marked.parse(updateBaseUrlInTemplate(mdString)),
        pattern: '.md$'
    },
];

Autoroutes.start({routes, appPath: BASE_URL, baseFolder: './src/views', parsers});
