import path from 'path';
import { fileURLToPath } from 'url';
import {
  mode,
  target,
  devtool,
} from './src/webpack/variables/_webpack-config-variables.mjs';
import {
  genFilename,
  optimization,
  useWebpackPlugins,
  buildModuleRules,
} from './src/webpack/functions/_webpack-config-funcs.mjs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export default {
  mode,
  target,
  devtool,
  devServer: {
    port: 8080,
    compress: true,
    open: true,
    hot: true,
    historyApiFallback: true,
  },
  context: path.resolve(__dirname, 'src'),

  entry: {
    login: ['@babel/polyfill', '@login/script.mjs'],
    main: ['@babel/polyfill', '@main/script.mjs'],
  },

  experiments: {
    topLevelAwait: true,
  },

  output: {
    path: path.resolve(__dirname, 'dist'),
    clean: true,
    filename: genFilename('js'),
  },

  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'),
      '@main': path.resolve(__dirname, 'src/pages/main'),
      '@login': path.resolve(__dirname, 'src/pages/login'),
      '@scss-modules': path.resolve(__dirname, 'src/scss/modules'),
      '@js-modules': path.resolve(__dirname, 'src/js/modules'),
      '@images': path.resolve(__dirname, 'src/assets/images'),
    },
  },

  optimization: optimization(),

  plugins: useWebpackPlugins(),

  module: {
    rules: buildModuleRules(),
  },
};
