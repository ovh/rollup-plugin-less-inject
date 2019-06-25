import less from 'less';
import { createFilter } from 'rollup-pluginutils';
import { randomBytes } from 'crypto';
import { walk } from 'estree-walker';

// random string identifier to avoid function name collision inside a chunk
const uid = randomBytes(8).toString('hex');

const lessRender = (code = '', option = {}) => {
  let result = '';
  return less.render(code, option).then((output) => {
    result = output.css;
    if (option.sourceMap && output.map) {
      const inlineSourceMapBase64 = Buffer.from(output.map).toString('base64');
      result += `\n/*# sourceMappingURL=data:application/json;base64,${inlineSourceMapBase64} */`;
    }
    return result;
  });
};

// style injector function
function rollupPluginLessCssInject(css) {
  if (!css || typeof document === 'undefined') return '';
  const head = document.head || document.getElementsByTagName('head')[0];
  const style = document.createElement('style');
  style.type = 'text/css';
  head.appendChild(style);
  style.appendChild(document.createTextNode(css));
  return css;
}

export default function plugin(options = {}) {
  const { include, exclude } = options;
  const filter = createFilter(include || ['**/*.less', '**/*.css'], exclude || 'node_modules/**');

  return {
    name: 'less-inject',
    renderChunk(code) {
      let addInjectFunction = false;
      // check if the injector function is called
      walk(this.parse(code), {
        enter: (node) => {
          if (node.type === 'CallExpression'
            && node.callee
            && node.callee.name === `cssInject${uid}`) {
            addInjectFunction = true;
          }
        },
      });
      // if it's called then inject the declaration
      if (addInjectFunction) {
        const result = `${rollupPluginLessCssInject.toString()
          .replace(rollupPluginLessCssInject.name, `cssInject${uid}`)}\n${code}`;
        // ensure generated code is still valid
        this.parse(result);
        return result;
      }
      return null;
    },
    async transform(code, id) {
      if (!filter(id)) return null;
      const css = await lessRender(code, options.option);
      return {
        code: `export default cssInject${uid}(${JSON.stringify(css.toString())});`,
        map: null, // sourcemap must be inlined since it's style injection
      };
    },
  };
}
