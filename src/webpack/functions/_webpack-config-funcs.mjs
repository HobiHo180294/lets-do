import CssMinimizerPlugin from 'css-minimizer-webpack-plugin';
import TerserPlugin from 'terser-webpack-plugin';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import MiniCssExtractPlugin from 'mini-css-extract-plugin';
import ESLintPlugin from 'eslint-webpack-plugin';
import { devMode, prodMode } from '../variables/_webpack-config-variables.mjs';
import moduleRules from '../objects/moduleRules.mjs';

function genFilename(ext) {
  return devMode ? `[name].${ext}` : `[name].[contenthash].${ext}`;
}

function optimization() {
  const config = {
    splitChunks: {
      chunks: 'all',
    },
    runtimeChunk: 'single',
  };

  if (prodMode)
    config.minimizer = [new CssMinimizerPlugin(), new TerserPlugin()];

  return config;
}

function useWebpackPlugins() {
  const base = [
    new HtmlWebpackPlugin({
      template: './pages/login/index.html',
      filename: 'index.html',
      minify: {
        collapseWhitespace: prodMode,
      },
      chunks: ['login'],
    }),
    new HtmlWebpackPlugin({
      template: './pages/main/index.html',
      filename: 'main.html',
      minify: {
        collapseWhitespace: prodMode,
      },
      chunks: ['main'],
    }),
    new MiniCssExtractPlugin({
      filename: genFilename('css'),
    }),
    new ESLintPlugin(),
  ];

  return base;
}

function buildModuleRules() {
  const rules = [
    moduleRules.htmlRules,
    moduleRules.styleRules,
    moduleRules.fontRules,
    moduleRules.imgRules,
    moduleRules.jsRules,
  ];

  return rules;
}

export { genFilename, optimization, useWebpackPlugins, buildModuleRules };
