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

Or

```html
<script type="module" src="https://unpkg.com/fems"></script>
<script type="javascript">
  window.__fems('/manifest.json')
</script>
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

This module doesn't really work yet. It's based on ES Modules and dynamic
import, and uses [shimport](https://github.com/Rich-Harris/shimport).

## License

[MIT](./LICENSE.md)
