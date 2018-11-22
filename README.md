# fems

Front End Micro Services [WIP]

--------

## Installation

`npm i fems`

## Usage

```javascript
import f from 'fems'

f('/manifest.json')
```

The argument passed should be the URL of a piece of JSON with a list of other
urls to dynamically import. Your modules should export a `run` named function,
which could attach apps to DOM nodes, or whatever.

```javascript
export const run = () => {
  ReactDOM.render(
    <App />
    document.getElementById('app-root')
  ) 
}
```

## Important

This module uses ES Modules and dynamic import. It will break in any even slightly old browsers.

## License

[MIT](./LICENSE.md)
