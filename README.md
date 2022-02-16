# rollup-plugin-less-inject

> A [Rollup](https://rollupjs.org/) plugin for injecting [Less](http://lesscss.org/) files as CSS into HTML document's head.

[![Downloads](https://badgen.net/npm/dt/@ovh-ux/rollup-plugin-less-inject)](https://npmjs.com/package/@ovh-ux/rollup-plugin-less-inject) [![Dependencies](https://badgen.net/david/dep/ovh/rollup-plugin-less-inject)](https://npmjs.com/package/@ovh-ux/rollup-plugin-less-inject?activeTab=dependencies) [![Dev Dependencies](https://badgen.net/david/dev/ovh/rollup-plugin-less-inject)](https://npmjs.com/package/@ovh-ux/rollup-plugin-less-inject?activeTab=dependencies)

## Install

```sh
$ yarn add -D @ovh-ux/rollup-plugin-less-inject
```

## Usage

```js
// rollup.config.js
import lessInject from '@ovh-ux/rollup-plugin-less-inject';

export default {
  input: 'src/main.js',
  output: {
    file: 'dist/main.js',
    format: 'cjs',
  },
  plugins: [
    lessInject(),
  ],
};
```

### Options

#### Include

+ Default: `[ '**/*.less', '**/*.css' ]`
+ Type: `String|Array`

Minimatch pattern or array of minimatch patterns to determine which files will be transpiled by the plugin.

#### Exclude

+ Default: `node_modules/**`
+ Type: `String|Array`

Minimatch pattern or array of minimatch patterns to determine which files won't be transpiled by the plugin, takes precedence over the `include` option.

#### Option

+ Type: `Object`

Options for [less](http://lesscss.org/usage/#programmatic-usage).

## Test

```sh
$ yarn test
```

## Contributing

Always feel free to help out! Whether it's [filing bugs and feature requests](https://github.com/ovh/rollup-plugin-less-inject/issues/new) or working on some of the [open issues](https://github.com/ovh/rollup-plugin-less-inject/issues), our [contributing guide](CONTRIBUTING.md) will help get you started.

## License

[BSD-3-Clause](LICENSE) © OVH SAS
