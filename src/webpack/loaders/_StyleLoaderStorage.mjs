import postcssPresetEnv from 'postcss-preset-env';

export default class StyleLoaderStorage {
  constructor() {
    this.styleLoader = 'style-loader';
    this.cssLoader = 'css-loader';
    this.postCSSLoader = {
      loader: 'postcss-loader',
      options: {
        postcssOptions: {
          plugins: [postcssPresetEnv],
        },
      },
    };
    this.groupCSSMediaQueriesLoader = 'group-css-media-queries-loader';
    this.resolveURLLoader = 'resolve-url-loader';
    this.sassLoader = {
      loader: 'sass-loader',
      options: {
        sourceMap: true,
      },
    };
  }
}
