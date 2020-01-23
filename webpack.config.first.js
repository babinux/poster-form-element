/* eslint-disable import/no-extraneous-dependencies */
// eslint-disable-next-line one-var
const path = require('path');
const webpack = require('webpack');
const WebpackIndexHTMLPlugin = require('@open-wc/webpack-index-html-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
// eslint-disable-next-line no-unused-vars
const CopyPlugin = require('copy-webpack-plugin');

// const createDefaultConfig = require('@open-wc/building-webpack');

const fontsCustom =
  'https://fonts.googleapis.com/css?family=Barlow+Semi+Condensed|KoHo|Kodchasan:400,500,600|Nova+Slim|Rationale|Satisfy&display=swap';

const canonical = 'https://beta.punkpixel.io';

const appName = 'Starry App';

// eslint-disable-next-line no-unused-vars
const htmlTemplate = isProduction => `
        <!DOCTYPE html>
          <html lang="en">
            <head>
              <link href="${fontsCustom}" rel="stylesheet">
              <link rel="canonical" href="${canonical}" />
              <link rel="apple-touch-icon" href="/icon_192x192.b85f732afd047b469bc878c77e2503af.png">

              <title>${appName}</title>
              <meta charset="UTF-8">

            </head>
            <body>
              <poster-form-element></poster-form-element>
              <noscript>Your browser does not support JavaScript!</noscript>

              <script>
                if ('serviceWorker' in navigator) {
                  window.addEventListener('load', function() {
                    navigator.serviceWorker.register('/service-worker.js').then(function(registration) {
                      // Registration was successful
                      console.log('ServiceWorker registration successful with scope: ', registration.scope);

                    }, function(err) {
                      // registration failed :(
                      console.log('ServiceWorker registration failed: ', err);
                    });
                  });
                }</script>

            </body>
          </html>
      `;

module.exports = (env, argv) => {
  let isProd;

  // console.log(argv.mode);
  process.env.NODE_ENV = argv.mode;

  // console.log(argv.local);
  const localProd = argv.local;

  if (process.env.NODE_ENV === 'production') {
    // console.log('Looks like we are in Production mode!');
    isProd = true;
  } else {
    // console.log('Looks like we are in development mode!');
    process.env.NODE_ENV = 'development';
    isProd = false;
  }

  /**
   * Plugins for production environment
   */
  // eslint-disable-next-line no-unused-vars
  let prodPlugins = [];
  // eslint-disable-next-line no-unused-vars

  if (!localProd) {
    prodPlugins = [];
  }

  // eslint-disable-next-line no-unused-vars
  const devPlugins = [
    new CleanWebpackPlugin(),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV),
      'process.env.DEBUG': JSON.stringify(process.env.DEBUG),
      __ENV__: JSON.stringify(process.env.NODE_ENV || 'development'),
    }),
    new WebpackIndexHTMLPlugin({
      minify: false,
      template: () => htmlTemplate(isProd),
    }),
  ];

  const commonOptimizations = {};

  const prodOptimizations = {
    ...commonOptimizations,
  };

  const devOptimizations = {
    ...commonOptimizations,
  };

  const optimizationList = isProd ? { ...prodOptimizations } : { ...devOptimizations };

  return {
    // externals: [nodeExternals()],

    // devtool: isProd ? '' : 'inline-source-map',
    devtool: isProd ? '' : 'inline-source-map',

    entry: {
      index: path.resolve(__dirname, './index.js'),
      // polyfills: path.resolve(__dirname, './app/src/polyfills.js'),
      // snipcart: path.resolve(__dirname, './app/src/lib/snipcart.js'),
      // serviceWorker: path.resolve(__dirname, './app/src/service-worker.js'),
      // vendors: ['lit-html'],
    },
    output: {
      path: path.resolve(__dirname, './tmp'),
      // filename: isProd ? '[name].js' : '[name].js',
      // chunkFilename: '[name].js',
      // publicPath: path.resolve(__dirname, '/'),
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
          test: /\.svg$/,
          use: 'raw-loader',
        },
        {
          test: /\.css|\.s(c|a)ss$/,
          use: [
            {
              loader: 'lit-scss-loader',
              options: {
                minify: isProd,
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
      ],
    },
    plugins: [
      // new CopyPlugin([{ from: 'app/', to: './' }]),
      new WebpackIndexHTMLPlugin({
        minify: {
          removeComments: isProd,
          collapseWhitespace: isProd,
          html5: true,
          minifyCSS: false,
          minifyJS: false,
          minifyURLs: false,
          removeAttributeQuotes: false,
          removeEmptyAttributes: false,
          removeOptionalTags: false,
          removeRedundantAttributes: false,
          removeScriptTypeAttributes: false,
          removeStyleLinkTypeAttributese: false,
          useShortDoctype: false,
        },
        template: () => htmlTemplate(isProd),
      }),
    ],
    optimization: optimizationList,
  };
};
