// eslint-disable-next-line one-var
const path = require('path');
const webpack = require('webpack');
const WebpackIndexHTMLPlugin = require('@open-wc/webpack-index-html-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');
const CompressionPlugin = require('compression-webpack-plugin');
const WorkboxPlugin = require('workbox-webpack-plugin');
const WebpackBuildNotifierPlugin = require('webpack-build-notifier');

const WriteFilePlugin = require('write-file-webpack-plugin');

const {BundleAnalyzerPlugin} = require('webpack-bundle-analyzer');

const HtmlWebpackPlugin = require('html-webpack-plugin');
const InlineSourcePlugin = require('html-webpack-inline-source-plugin');

// const createDefaultConfig = require('@open-wc/building-webpack');

const WebpackPwaManifest = require('webpack-pwa-manifest');

// const { InjectManifest } = require('workbox-webpack-plugin');

// const fs = require('fs');
const PngToIco = require('png-to-ico');
const fs = require('fs-extra');
// console.log(favicons);
// console.log(`favicons.config.html.favicons`);

// console.log(JSON.stringify(favicons.config.icons.html));

// eslint-disable-next-line no-unused-vars
// const nodeExternals = require('webpack-node-externals');

// fs.emptyDir(path.resolve(__dirname, './dist'), err => {
//   if (err) return console.error(err);
//   console.log('success!');
// });

const domain = 'https://beta.punkpixel.io';

const appName = 'Starry App';
const appDescription = `Create, design personalized map of the solar system for a special occasion.`;
const appKeywords = `${appName} solar system, planets, poster, birthday, anniversary, earth`;
const appAuthor = `Jerome Botcho`;

const fontsCustom =
  'https://fonts.googleapis.com/css?family=Barlow+Semi+Condensed|KoHo|Kodchasan:400,500,600|Nova+Slim|Rationale|Satisfy&display=swap';
const themeColor = '#317EFB';
const tileColor = '#317EFB';

const iconsLocationLocal = './app/assets/icons';
const iconsLocation = '';
const canonical = 'https://beta.punkpixel.io';

// eslint-disable-next-line no-unused-vars
const htmlTemplate = isProduction => `
      <!DOCTYPE html>
          <html lang="en">
            <head>

              <link href="${fontsCustom}" rel="stylesheet">

              <title>${appName}</title>
              <meta charset="UTF-8">
              <meta name="keywords" content="${appKeywords}">
              <meta name="author" content="${appAuthor}">
              <link rel="shortcut icon" href="favicon.ico" type="image/x-icon">

              <!--
                  <link rel="manifest" href="/manifest.json">
              -->
<!--
              <meta name="theme-color" content="${themeColor}"/>
              <link rel="canonical" href="${canonical}"/>
              <meta name="viewport" content="width=device-width, initial-scale=1">
              <link rel="apple-touch-icon" href="/Logo Black Small.png">

              <meta name='application-name' content='${appName}' />
              <meta name='apple-mobile-web-app-capable' content='yes' />
              <meta name='apple-mobile-web-app-status-bar-style' content='default' />
              <meta name='apple-mobile-web-app-title' content='${appName}' />
              <meta name='description' content='${appDescription}' />
              <meta name='format-detection' content='telephone=no' />
              <meta name='mobile-web-app-capable' content='yes' />
              <meta name='msapplication-config' content='${iconsLocation}browserconfig.xml' />
              <meta name='msapplication-TileColor' content='${tileColor}' />
              <meta name='msapplication-tap-highlight' content='no' />
              <meta name='theme-color' content='${themeColor}' />
              <meta name='viewport' content='minimum-scale=1, initial-scale=1, width=device-width, shrink-to-fit=no, user-scalable=yes, viewport-fit=cover' />

              <link rel='apple-touch-icon' sizes='180x180' href='${iconsLocation}/apple-touch-icon.png' />
              <link rel='icon' type='image/png' sizes='32x32' href='${iconsLocation}/favicon-32x32.png' />
              <link rel='icon' type='image/png' sizes='16x16' href='${iconsLocation}/favicon-16x16.png' />
              <link rel='mask-icon' href='${iconsLocation}/safari-pinned-tab.svg' color='#5bbad5' />
              <link rel='shortcut icon' href='${iconsLocation}/favicon.ico' />
              <link rel='stylesheet' href='https://fonts.googleapis.com/css?family=Roboto:300,400,500' />

              <meta name='twitter:card' content='${appName}' />
              <meta name='twitter:url' content='${domain}' />
              <meta name='twitter:title' content='${appName}' />
              <meta name='twitter:description' content='Best ${appName} in the world' />
              <meta name='twitter:image' content='${domain}/${iconsLocation}android-chrome-192x192.png' />
              <meta name='twitter:creator' content='@babinux' />
              <meta property='og:type' content='website' />
              <meta property='og:title' content='${appName}' />
              <meta property='og:description' content='Best ${appName} in the world' />
              <meta property='og:site_name' content='${appName}' />
              <meta property='og:url' content='${domain}' />
              <meta property='og:image' content='${domain}${iconsLocation}/apple-touch-icon.png' />
-->
              <!--
                  <link rel="preload" href=npm.webcomponents.js as="script">
                  <link rel="preload" href=npm.lit-element.js as="script">
                  <link rel="preload" href=npm.lit-html.js as="script">
                  <link rel="preload" href=npm.planet-clock-element.js as="script">
                  <link rel="preload" href=npm.poster-design-element.js as="script">
                  <link rel="preload" href=npm.vaadin.js as="script">
                  <link rel="preload" href=npm.process.js as="script">
                  <link rel="preload" href=npm.setimmediate.js as="script">
                  <link rel="preload" href=npm.timers-browserify.js as="script">
                  <link rel="preload" href=npm.google-maps.js as="script">
                  <link rel="preload" href=npm.polymer.js as="script">
                  <link rel="preload" href=npm.webpack.js as="script">
              -->

            </head>
            <body>

              <poster-form-element></poster-form-element>

              <noscript>Your browser does not support JavaScript!</noscript>

            <!-- <script>!function () { function e(e, n) { return new Promise((function (t, o) { document.head.appendChild(Object.assign(document.createElement("script"), { src: e, onload: t, onerror: o }, n ? { type: "module" } : void 0)) })) } var n = []; function t() { ["snipcart.js", "index.js"].forEach((function (n) { e(n) })) } "IntersectionObserver" in window && "IntersectionObserverEntry" in window && "intersectionRatio" in window.IntersectionObserverEntry.prototype || n.push(e("polyfills/intersection-observer.e74248e871a636a1e4053930daa62784.js", !1)), n.length ? Promise.all(n).then(t) : t() }();</script> -->


            <!--
                <script src=npm.polymer.js></script>
                <script src=npm.webcomponents.js></script>
                <script src=npm.lit-element.js></script>
                <script src=npm.lit-html.js></script>
                <script src=npm.vaadin.js></script>
                <script src=npm.google-maps.js></script>
                <script src=npm.planet-clock-element.js></script>
                <script src=npm.poster-design-element.js></script>
            -->

            <!--
                <script src=npm.process.js></script>
                <script src=npm.setimmediate.js></script>
                <script src=npm.timers-browserify.js></script>
                <script src=npm.webpack.js></script>
            -->

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

                <script src=vendors~index.js></script>

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
  let prodPlugins = [];
  // eslint-disable-next-line no-unused-vars
  const cleanPlugin = [new CleanWebpackPlugin()];

  if (!localProd) {
    prodPlugins = [
      ...prodPlugins,
      new CompressionPlugin({
        filename: '[path].br[query]',
        algorithm: 'brotliCompress',
        test: /\.(js|css|html|svg)$/,
        compressionOptions: {
          level: 11,
        },
        threshold: 10240,
        minRatio: 0.8,
        // deleteOriginalAssets: false ? isProd : !isProd,
      }),
    ];
  }

  /**
   * Plugins for dev environment
   */
  const devPlugins = [
    // ...cleanPlugin,
    new BundleAnalyzerPlugin(),
    new WebpackBuildNotifierPlugin({
      title: 'My Project Webpack Build',
      logo: path.resolve('./app/assets/icons/favicon.png'),
      suppressSuccess: true,
    }),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV),
      'process.env.DEBUG': JSON.stringify(process.env.DEBUG),
      __ENV__: JSON.stringify(process.env.NODE_ENV || 'development'),
    }),
    // new WorkboxPlugin.InjectManifest({
    //   swSrc: './app/service-worker.js',
    // }),
    new WorkboxPlugin.GenerateSW({
      swDest: 'service-worker.js',
      importWorkboxFrom: 'cdn',
      cleanupOutdatedCaches: true,

      // Do not precache images
      // exclude: [/\.(?:png|jpg|jpeg|svg)$/],

      // Define runtime caching rules.
      runtimeCaching: [
        {
          // Match any request that ends with .png, .jpg, .jpeg or .svg.
          urlPattern: /\.(?:png|jpg|jpeg|svg)$/,

          // Apply a cache-first strategy.
          handler: 'CacheFirst',

          options: {
            // Use a custom cache name.
            cacheName: 'images',
          },
        },
      ],
    }),
    new webpack.LoaderOptionsPlugin({
      debug: true,
    }),
    new webpack.HashedModuleIdsPlugin(), // so that file hashes don't change unexpectedly
    // new HtmlWebpackPlugin({
    //   // Inline all files which names start with “runtime~” and end with “.js”.
    //   // That’s the default naming of runtime chunks
    //   //template: './dist/index.html',
    //   meta: {
    //     viewport: 'width=device-width, initial-scale=1, shrink-to-fit=no',
    //     // Will generate: <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
    //     'theme-color': '#4285f4',
    //     // Will generate: <meta name="theme-color" content="#4285f4">
    //   },
    //   // inlineSource: 'runtime~.+\\.js',
    // }),
    new WebpackIndexHTMLPlugin({
      // multiBuild: true,
      // polyfills: {
      //   coreJs: true,
      //   regeneratorRuntime: true,
      //   webcomponents: true,
      // },
      // multiBuild: true,

      // polyfills: {
      //   fetch: false,
      //   intersectionObserver: true,
      //   // customPolyfills: [
      //   //   {
      //   //     name: 'vendors',
      //   //     test: "'vendors' in window",
      //   //     // path: path.resolve(__dirname, './dist/vendors.js'),
      //   //   },
      //   // ],
      // },
      minify: {
        removeComments: isProd,
        collapseWhitespace: isProd,
        html5: true,
        minifyCSS: isProd,
        minifyJS: isProd,
        minifyURLs: false,
        removeAttributeQuotes: true,
        removeEmptyAttributes: true,
        removeOptionalTags: false,
        removeRedundantAttributes: true,
        removeScriptTypeAttributes: false,
        removeStyleLinkTypeAttributese: true,
        useShortDoctype: false,
      },
      template: () => htmlTemplate(isProd),
      // template: './dist/index.html',
    }),
    new WriteFilePlugin(),

    // This plugin enables the “inlineSource” option
    // new InlineSourcePlugin(),
    // new WebpackPwaManifest({
    //   name: `${appName}`,
    //   short_name: `${wappName}`,
    //   description: `${appDescription}`,
    //   background_color: `${themeColor}`,
    //   theme_color: `${themeColor}`,
    //   crossorigin: 'use-credentials', // can be null, use-credentials or anonymous
    //   start_url: '.',
    //   icons: [
    //     {
    //       src: path.resolve(`${iconsLocationLocal}/Logo Black Large.png`),
    //       sizes: [96, 128, 192, 256, 384, 512], // multiple sizes
    //     },
    //     {
    //       src: path.resolve(`${iconsLocationLocal}/Logo Black Large.png`),
    //       size: '1024x1024', // you can also use the specifications pattern
    //     },
    //   ],
    // }),

    // new InjectManifest({
    //   // swSrc: path.join('src', 'service-worker.js'),
    //   swDest: path.join('dist', 'service-worker.js'),
    //   // Other configuration options...
    // }),
    // new InjectManifest({
    //   swSrc: './dist/service-worker.js',
    //   globDirectory: '.',
    //   globPatterns: ['.dist/manifest.*.json'],
    // }),
  ];

  /**
   * Common Optimization for all environment
   */
  const commonOptimizations = {
    // const commonOptimizationsBackup = {
    // minimize: isProd,
    runtimeChunk: true,
    splitChunks: {
      chunks: 'all',
      maxInitialRequests: Infinity,
      minSize: 0,
      cacheGroups: {
        // commons: {
        //   test: /[\\/]node_modules[\\/]/,
        //   // name: 'vendors-bundle',
        //   chunks: 'all',
        // },
        // vendor: {
        //   test: /[\\/]node_modules[\\/]/,
        //   name(module) {
        //     // get the name. E.g. node_modules/packageName/not/this/part.js
        //     // or node_modules/packageName
        //     const packageName = module.context.match(/[\\/]node_modules[\\/](.*?)([\\/]|$)/)[1];
        //     // console.log(packageName);
        //     // npm package names are URL-safe, but some servers don't like @ symbols
        //     return `npm.${packageName.replace('@', '')}`;
        //   },
        // },
      },
    },
  };

  // const commonOptimizationsBackup = {
  //   // const commonOptimizations = {
  //   minimize: isProd,
  //   splitChunks: {
  //     chunks: 'all',
  //     cacheGroups: {
  //       commons: {
  //         test: /[\\/]node_modules[\\/]/,
  //         name: 'vendors',
  //         chunks: 'all',
  //         minChunks: 2,
  //       },
  //     },
  //   },
  // };

  /**
   * Production Optimization for Prod environment
   */
  const prodOptimizations = {
    ...commonOptimizations,
    minimizer: [
      // new UglifyJsPlugin(),
      new TerserPlugin({
        extractComments: 'all',
        cache: !isProd,
        sourceMap: !isProd,
        terserOptions: {
          // https://github.com/webpack-contrib/terser-webpack-plugin#terseroptions
        },
      }),
    ],
  };

  /**
   * Default|Development Optimization for Dev environment
   */
  const devOptimizations = {
    ...commonOptimizations,
    minimizer: [
      new TerserPlugin({
        extractComments: !isProd,
        cache: !isProd,
        sourceMap: !isProd,
        terserOptions: {
          // https://github.com/webpack-contrib/terser-webpack-plugin#terseroptions
        },
      }),
    ],
  };

  /**
   * Merging plugins and Optimization on the basis of env
   */
  const pluginList = isProd ? [...devPlugins, ...prodPlugins] : devPlugins;
  const optimizationList = isProd ? { ...prodOptimizations } : { ...devOptimizations };

  // console.log('Build Mode:');
  // console.log(isProd);
  // console.log('Modules:');
  // console.log(module.exports);
  // console.log('Optimization List:');
  // console.log(optimizationList);
  // console.log(module.exports.optimization);

  new PngToIco(path.resolve(__dirname, './app/assets/icons/favicon.png'))
    .then(buf => {
      fs.writeFileSync(path.resolve(__dirname, './tmp/favicon.ico'), buf);
    })
    .catch(console.error);

  return [
    {
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
        filename: isProd ? '[name].js' : '[name].js',
        chunkFilename: '[name].[chunkhash].js',
        publicPath: path.resolve(__dirname, '/tmp'),
      },
      devServer: {
        contentBase: './tmp',
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
                  minify: true,
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
    },

    {
      entry: { index: './tmp/index.html' },
      output: {
        path: path.resolve(__dirname, './dist'),
        filename: isProd ? '[name].bundle.[chunkhash].js' : '[name].bundle.[chunkhash].js',
        // chunkFilename: '[name].[chunkhash].js',
        // publicPath: path.resolve(__dirname, '/'),
      },
      module: {
        rules: [
          {
            test: /\.html$/i,
            loader: 'html-loader',
          },
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
                  minify: true,
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
        ],
      },

      // module: {
      //   rules: [
      //     // Note: You will probably also want to configure babel for the legacy build.
      //     // this is not a complete example, you will need to add more configuration for babel
      //     // { test: /\.js/, use: { loader: 'babel-loader' } },
      //   ],
      // },
      plugins: [
        // () => {
        //   console.log("path.resolve(__dirname, './dist/index.html')");
        //   console.log(path.resolve(__dirname, './dist/index.html'));
        // },
        new HtmlWebpackPlugin({
          // Inline all files which names start with “runtime~” and end with “.js”.
          // That’s the default naming of runtime chunks
          template: path.resolve(__dirname, './tmp/index.html'),
          meta: {
            viewport: 'width=device-width, initial-scale=1, shrink-to-fit=no',
            // Will generate: <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
            'theme-color': '#4285f4',
            // Will generate: <meta name="theme-color" content="#4285f4">
          },
          // inlineSource: 'runtime~.+\\.js',
        }),
      ],
    },
  ];
};
