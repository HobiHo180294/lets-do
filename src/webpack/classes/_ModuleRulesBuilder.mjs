import { devMode } from '../variables/_webpack-config-variables.mjs';
import styleLoader from '../objects/styleLoader.mjs';
import { buildCSSLoaders, buildJSLoaders } from '../loaders/_loaders-funcs.mjs';

export default class ModuleRulesBuilder {
  constructor() {
    this.htmlRules = {
      test: /\.html$/i,
      loader: 'html-loader',
    };
    this.styleRules = {
      test: /\.(c|sa|sc)ss$/i,
      use: buildCSSLoaders(
        styleLoader.postCSSLoader,
        styleLoader.groupCSSMediaQueriesLoader,
        styleLoader.resolveURLLoader,
        styleLoader.sassLoader
      ),
    };
    this.fontRules = {
      test: /\.woff2?$/i,
      type: 'asset/resource',
      generator: {
        filename: 'assets/fonts/[name][ext]',
      },
    };
    this.imgRules = {
      test: /\.(jpe?g|png|webp|gif|svg)$/i,
      use: devMode
        ? []
        : [
            {
              loader: 'image-webpack-loader',
              options: {
                mozjpeg: {
                  progressive: true,
                },
                optipng: {
                  enabled: false,
                },
                pngquant: {
                  quality: [0.65, 0.9],
                  speed: 4,
                },
                gifsicle: {
                  interlaced: false,
                },
                webp: {
                  quality: 75,
                },
              },
            },
          ],
      type: 'asset/resource',
      generator: {
        filename: 'assets/images/[name][ext]',
      },
    };
    this.jsRules = {
      test: /\.m?js$/,
      exclude: /(node_modules|bower_components)/,
      use: buildJSLoaders(),
    };
  }
}
