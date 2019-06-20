# Install

```sh
yarn add @ovh-ux/rollup-plugin-less-inject -D
```

# Usage

```js
import { rollup } from 'rollup';
import lessInject from '@ovh-ux/rollup-plugin-less-inject';

rollup({
  input: 'main.js',
  plugins: [
    lessInject(),
  ],
});
```

# Options

# Include

+ Default: `[ '**/*.less', '**/*.css' ]`
+ Type: `String|Array`

Minimatch pattern or array of minimatch patterns to determine which files will be transpiled by the plugin.

# Exclude

+ Default: `node_modules/**`
+ Type: `String|Array`

Minimatch pattern or array of minimatch patterns to determine which files won't be transpiled by the plugin, takes precedence over the `include` option.

# Option

+ Type: `Object`

Options for [less](http://lesscss.org/usage/#programmatic-usage).
