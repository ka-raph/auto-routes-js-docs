## API
All of the following properties and methods can be accessed from the global object `Autoroutes` once Autoroutes is started. For instance you can call `Autoroutes.route` to get the current route.

### `setData(data)`
Type: `function`

*readonly*

Parameters:
 * `data` (*any*): Data to be passed to next view, can be retrieved in *current* view using `Autoroutes.draftData` and can be retrieved in next view by using `Autoroutes.getData()`.

Returns: `undefined`

### `getData()`
Type: `function`

*readonly*

Parameters: none

Returns: The data you set in the previous view using `setData(data)`. As the data is saved in the [History](https://developer.mozilla.org/en-US/docs/Web/API/History/state), it can be retrieved when the user navigates through their current session's history as well.

### `draftData`
Type: `string`

Default value: `null`

Returns the current data that will be sent to the next view. *To be honest you could just override this value instead of using `setData(data)` but it's cooler to call a function, thank you React...*

### `route`
Type: `string`

Default value: `""`

Returns the current route as declared in your routes configuration with a `/` separator between each level.

### `wildcards`
Type: Array of objects `{name: string, value: string}`

Default: `[]`

Returns a list of all the wilcards on the current route with their value. For example for a URL path `/user/1234/transactions/abc123` corresponding to the route `/user/:id/transactions/:transactionId`, this would return `[{name: ':id', value: '1234'}, {name: ':transactionId', value: 'abc123'}]`. **You should avoid mutating that value.**

### `originPath`
Type: `string`

*readonly*

Returns the base path of your app that excludes the origin.

### `name`
Type: `string`

*readonly*

Default: `Autoroutes`

Returns the name of the router.

### `version`
Type: `string`

*readonly*

Returns the version number of this library.


[npm-badge]: https://img.shields.io/npm/v/auto-routes-js.svg?style=flat
[npm-url]: https://www.npmjs.com/package/auto-routes-js