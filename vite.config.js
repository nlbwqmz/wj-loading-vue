import {defineConfig} from 'vite';
import path from 'path';

export default defineConfig(({mode}) => {
  return {
    build: {
      lib: {
        entry: path.resolve(__dirname, 'src/index.js'),
        fileName: (format) => `wj-loading-vue.${format}.js`,
      },
      rollupOptions: {
        external: ['wj-loading'],
        output: [
          {
            format: 'es'
          }
        ],
      },
    },
    esbuild: {
      drop: mode === 'development' ? [] : ['console', "debugger"]
    }
  }
});