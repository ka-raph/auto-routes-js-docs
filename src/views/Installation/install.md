# Install
## CDN

In your main HTML file, say `/public/index.html`, add the CDN script before you main JavaScript file, such as:

```html
<!doctype html>
<html>
  <head>
    <title>My Awesome SPA</title>
  </head>
  <body>
    <header>Welcome to My Awesome SPA</header>
    <section id="autoroutes-view"></section>
    <!-- You can use unpkg or any other NPM to CDN service -->
    <script src="https://www.unpkg.com/auto-routes-js@1.2.0/dist/Autoroutes-v1.2.0.min.js" type="module"></script>
    <script src="/src/index.js" type="module"></script>
  </body>
</html>
```


## NPM
Run:
```
npm install auto-routes-js
```