// eslint-disable-next-line one-var
const path = require('path'),
  webpack = require('webpack'),
  WebpackIndexHTMLPlugin = require('@open-wc/webpack-index-html-plugin'),
  { CleanWebpackPlugin } = require('clean-webpack-plugin'),
  TerserPlugin = require('terser-webpack-plugin');

const CompressionPlugin = require('compression-webpack-plugin');

module.exports = (env, argv) => {
  let isProd;

  console.log(argv.mode);
  process.env.NODE_ENV = argv.mode;

  if (process.env.NODE_ENV === 'production') {
    console.log('Looks like we are in Production mode!');
    isProd = true;
  } else {
    console.log('Looks like we are in development mode!');
    process.env.NODE_ENV = 'development';
    isProd = false;
  }

  /**
   * Plugins for dev environment
   */
  const devPlugins = [
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV),
      'process.env.DEBUG': JSON.stringify(process.env.DEBUG),
      __ENV__: JSON.stringify(process.env.NODE_ENV || 'development'),
    }),
    new WebpackIndexHTMLPlugin({
      minify: {
        removeComments: isProd,
        collapseWhitespace: isProd,
        html5: true,
        minifyCSS: true,
        minifyJS: true,
        minifyURLs: false,
        removeAttributeQuotes: true,
        removeEmptyAttributes: true,
        removeOptionalTags: true,
        removeRedundantAttributes: true,
        removeScriptTypeAttributes: true,
        removeStyleLinkTypeAttributese: true,
        useShortDoctype: true,
      },
      template: () => `
      <!DOCTYPE html>
          <html>
            <head>
              <link href="https://fonts.googleapis.com/css?family=Barlow+Semi+Condensed|KoHo|Kodchasan:400,500,600|Nova+Slim|Rationale|Satisfy&display=swap" rel="stylesheet">
              <style>
                body{
                  margin: 0;
                }
              </style>
            </head>
            <body>
                <poster-form-element></poster-form-element>
               ${
                 isProd
                   ? '<script defer src="vendors~index.js?inProd"></script>'
                   : '<script defer src="vendors~index.js?inDev"></script>'
               }

            </body>
          </html>
      `,
    }),
  ];
  /**
   * Plugins for production environment
   */
  const prodPlugins = [
    new CleanWebpackPlugin(),
    new CompressionPlugin({
      filename: '[path].br[query]',
      algorithm: 'brotliCompress',
      test: /\.(js|css|html|svg)$/,
      compressionOptions: {
        level: 11,
      },
      threshold: 10240,
      minRatio: 0.8,
      deleteOriginalAssets: true ? isProd : !isProd,
    }),
  ];

  const commonOptimizations = {
    minimize: isProd,
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
  };

  const devOptimizations = {
    ...commonOptimizations,
    minimizer: [
      new TerserPlugin({
        extractComments: false,
        cache: false,
        sourceMap: true, // Must be set to true if using source-maps in production
        terserOptions: {
          // https://github.com/webpack-contrib/terser-webpack-plugin#terseroptions
        },
      }),
    ],
  };

  const prodOptimizations = {
    ...commonOptimizations,
    minimizer: [
      new TerserPlugin({
        extractComments: 'all',
        cache: true,
        sourceMap: false, // Must be set to true if using source-maps in production
        terserOptions: {
          // https://github.com/webpack-contrib/terser-webpack-plugin#terseroptions
        },
      }),
    ],
  };

  /**
   * Merging plugins on the basis of env
   */
  const pluginList = isProd ? [...devPlugins, ...prodPlugins] : devPlugins;

  const optimizationList = isProd ? { ...prodOptimizations } : { ...devOptimizations };

  console.log('Build Mode:');
  console.log(isProd);

  console.log('Modules:');
  console.log(module.exports);

  console.log('Optimization List:');

  console.log(optimizationList);

  console.log(module.exports.optimization);

  return {
    devtool: isProd ? '' : 'inline-source-map',
    entry: {
      index: path.resolve(__dirname, './index.js'),
      // vendors: path.resolve(__dirname, './dist/vendors.js'),
    },
    output: {
      path: path.resolve(__dirname, './dist'),
      filename: isProd ? '[name].js' : '[name].js',
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
                minify: true, // defaults to false
              },
            },
            'extract-loader',
            'css-loader',
            'sass-loader',
          ],
        },

        {
          test: /\.(png|jpg|gif|svg)$/,
          use: ['file-loader'],
        },
        {
          test: /\.(woff|woff2|eot|ttf|otf)$/,
          use: ['file-loader'],
        },
        // {
        //   test: /\.svg$/,
        //   use: [
        //     {
        //       loader: 'svg-url-loader',
        //       options: {},
        //     },
        //   ],
        // },
      ],
    },
    plugins: pluginList,
    optimization: optimizationList,
  };
};
