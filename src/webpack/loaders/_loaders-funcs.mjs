import MiniCssExtractPlugin from 'mini-css-extract-plugin';
import styleLoader from '../objects/styleLoader.mjs';

function babelOptions(preset) {
  const opts = {
    presets: ['@babel/preset-env'],
  };

  if (preset) opts.presets.push(preset);

  return opts;
}

function buildCSSLoaders(...extra) {
  const cssLoaders = [MiniCssExtractPlugin.loader, styleLoader.cssLoader];

  if (extra) cssLoaders.push(...extra);

  return cssLoaders;
}

function buildJSLoaders() {
  const jsLoaders = [
    {
      loader: 'babel-loader',
      options: babelOptions(),
    },
  ];

  return jsLoaders;
}

export { buildCSSLoaders, buildJSLoaders };
