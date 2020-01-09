// eslint-disable-next-line one-var
const path = require('path'),
  webpack = require('webpack'),
  WebpackIndexHTMLPlugin = require('@open-wc/webpack-index-html-plugin'),
  { CleanWebpackPlugin } = require('clean-webpack-plugin'),
  TerserPlugin = require('terser-webpack-plugin');

const CompressionPlugin = require('compression-webpack-plugin');

const isProd = process.env.NODE_ENV === 'production';

/**
 * Plugins for dev environment
 */
const devPlugins = [
  new WebpackIndexHTMLPlugin({
    minify: false,
    inject: true,

    chunks: ['vendors~index'],
    template: () => `
      <!DOCTYPE html>
          <html>
            <head>
              <link href="https://fonts.googleapis.com/css?family=Barlow+Semi+Condensed|KoHo|Kodchasan:400,500,600|Nova+Slim|Rationale|Satisfy&display=swap" rel="stylesheet">
              <style>
                body{
                  background-color: #EEE;
                }
              </style>
            </head>
            <body>
                <poster-form-element></poster-form-element>
                <script defer src="vendors~index.js"></script>

            </body>
          </html>
      `,
  }),
  new webpack.DefinePlugin({
    __ENV__: JSON.stringify(process.env.NODE_ENV || 'development'),
  }),
];
/**
 * Plugins for production environment
 */
const prodPlugins = [
  new CleanWebpackPlugin({
    verbose: true,
  }),
  new CompressionPlugin({
    filename: '[path].br[query]',
    algorithm: 'brotliCompress',
    test: /\.(js|css|html|svg)$/,
    compressionOptions: {
      level: 11,
    },
    threshold: 10240,
    minRatio: 0.8,
    deleteOriginalAssets: false,
  }),
  new TerserPlugin({
    extractComments: true,
    cache: true,
    parallel: true,
    sourceMap: true, // Must be set to true if using source-maps in production
    terserOptions: {
      // https://github.com/webpack-contrib/terser-webpack-plugin#terseroptions
    },
  }),
  new WebpackIndexHTMLPlugin({
    minify: true,
  }),
];
/**
 * Merging plugins on the basis of env
 */
const pluginList = isProd ? [...devPlugins, ...prodPlugins] : devPlugins;

module.exports = {
  devtool: isProd ? '' : 'inline-source-map',
  entry: {
    index: path.resolve(__dirname, './index.js'),
    // vendors: path.resolve(__dirname, './dist/vendors.js'),
  },
  output: {
    path: path.resolve(__dirname, './dist'),
    filename: isProd ? '[name].[chunkhash].js' : '[name].js',
    chunkFilename: '[name].js',
    publicPath: path.resolve(__dirname, '/'),
  },
  devServer: {
    contentBase: './dist',
  },
  performance: {
    hints: 'warning',
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        loader: 'babel-loader',
        exclude: /node_modules/,
      },
      {
        test: /\.css|\.s(c|a)ss$/,
        use: [
          {
            loader: 'lit-scss-loader',
            options: {
              minify: false, // defaults to false
            },
          },
          'extract-loader',
          'css-loader',
          'sass-loader',
        ],
      },
      {
        test: /\.svg$/,
        use: [
          {
            loader: 'file-loader',
            // loader: 'svg-url-loader',
            options: {},
          },
          'file-loader',
        ],
      },
      {
        test: /\.(png|jpg|gif)$/,
        use: ['file-loader'],
      },
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/,
        use: ['file-loader'],
      },
    ],
  },
  plugins: pluginList,
  optimization: {
    splitChunks: {
      chunks: 'all',
      cacheGroups: {
        commons: {
          test: /[\\/]node_modules[\\/]/,
          name: 'vendors',
          chunks: 'all',
          minChunks: 2,
        },
      },
    },
  },
};
