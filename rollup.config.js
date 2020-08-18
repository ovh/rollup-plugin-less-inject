import babel from 'rollup-plugin-babel';

export default {
  input: 'src/index.js',
  plugins: [
    babel({
      babelrc: false,
      exclude: 'node_modules/**',
      presets: [
        ['@babel/preset-env', {
          targets: {
            node: true,
          },
        }],
      ],
      runtimeHelpers: true,
    }),
  ],
  output: [{
    format: 'cjs',
    dir: './dist/cjs',
    exports: 'auto',
  }, {
    format: 'es',
    dir: './dist/esm',
  }],
  external: [
    'crypto',
    'estree-walker',
    'fs',
    'lodash/assign',
    'less',
    'path',
    'rollup-pluginutils',
    'url',
    'util',
  ],
};
