# import-map-externals-webpack-plugin

A plugin that auto-externalizes dependencies that are available in an import map.

## Installation

```sh
npm i -D import-map-externals-webpack-plugin

# or
pnpm i -D import-map-externals-webpack-plugin

# or
yarn add --dev import-map-externals-webpack-plugin
```

## Usage

```js
// webpack.config.js
const { ImportMapExternalsPlugin } = require('import-map-externals-webpack-plugin');

module.exports = {
  plugins: [
    new ImportMapExternalsPlugin({
      importMapUrl: "https://react.microfrontends.app/importmap.json"
    });
  ]
}
```

### Options

The following options can be passed to the ImportMapExternalsPlugin constructor:

- `importMapUrl`: a fully qualified, fetchable URL that contains valid import map json
