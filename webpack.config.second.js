/* eslint-disable import/no-extraneous-dependencies */
// eslint-disable-next-line one-var
const path = require('path');
const webpack = require('webpack');
// eslint-disable-next-line no-unused-vars
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');
const CompressionPlugin = require('compression-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const WebpackBuildNotifierPlugin = require('webpack-build-notifier');
const WorkboxPlugin = require('workbox-webpack-plugin');
const WebpackPwaManifest = require('webpack-pwa-manifest');

// eslint-disable-next-line no-unused-vars
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');

const PngToIco = require('png-to-ico');
const fs = require('fs-extra');

const dir = './dist';

if (!fs.existsSync(dir)) {
  fs.mkdirSync(dir);
}

// ===================================================
// <> APP CONFIGS
// ===================================================

const domain = 'https://beta.punkpixel.io';

const appName = 'Starry App';
const appDescription = `Create, design personalized map of the solar system for a special occasion.`;
const appKeywords = `${appName} solar system, planets, poster, birthday, anniversary, earth`;
const appAuthor = `Jerome Botcho`;

// const fontsCustom =
//   'https://fonts.googleapis.com/css?family=Barlow+Semi+Condensed|KoHo|Kodchasan:400,500,600|Nova+Slim|Rationale|Satisfy&display=swap';

const themeColor = '#317EFB';
const tileColor = '#317EFB';
const iconsLocation = '';

// eslint-disable-next-line no-unused-vars
const iconsLocationLocal = './app/assets/icons';
// eslint-disable-next-line no-unused-vars
const canonical = 'https://beta.punkpixel.io';

// ===================================================
// </> APP CONFIGS
// ===================================================

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

  let prodPlugins = [];

  if (!localProd) {
    prodPlugins = [
      //   new CleanWebpackPlugin(),
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
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV),
      'process.env.DEBUG': JSON.stringify(process.env.DEBUG),
      __ENV__: JSON.stringify(process.env.NODE_ENV || 'development'),
    }),
    new WebpackPwaManifest({
      name: `${appName}`,
      short_name: `${appName}`,
      description: `${appDescription}`,
      background_color: `${themeColor}`,
      theme_color: `${themeColor}`,
      crossorigin: 'use-credentials', // can be null, use-credentials or anonymous
      start_url: '/?source=pwa',
      display: 'standalone',
      scope: '/',
      icons: [
        {
          src: path.resolve(`${iconsLocationLocal}/Logo Black Large.png`),
          sizes: [96, 128, 192, 256, 384, 512], // multiple sizes
        },
        {
          src: path.resolve(`${iconsLocationLocal}/Logo Black Large.png`),
          size: '1024x1024', // you can also use the specifications pattern
        },
      ],
    }),
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
    new HtmlWebpackPlugin({
      template: './tmp/index.html',
      minify: {
        removeComments: isProd,
        collapseWhitespace: isProd,
        html5: true,
        minifyCSS: isProd,
        minifyJS: isProd,
        minifyURLs: true,
        removeAttributeQuotes: true,
        removeEmptyAttributes: true,
        removeOptionalTags: false,
        removeRedundantAttributes: true,
        removeScriptTypeAttributes: isProd,
        removeStyleLinkTypeAttributese: true,
        useShortDoctype: isProd,
      },
      meta: {
        keywords: `${appKeywords}`,
        author: `${appAuthor}`,
        description: `${appDescription}`,
        viewport:
          'minimum-scale=1, initial-scale=1, shrink-to-fit=no, user-scalable=yes, viewport-fit=cover',
        'application-name': `${appName}`,
        'mobile-web-app-capable': 'yes',
        'theme-color': `${themeColor}`,
        'format-detection': 'telephone=no',
        'apple-mobile-web-app-capable': 'yes',
        'apple-mobile-web-app-status-bar-style': 'default',
        'apple-mobile-web-app-title': `${appName}`,
        'msapplication-config': `${iconsLocation}browserconfig.xml`,
        'msapplication-TileColor': `${tileColor}`,
        'msapplication-tap-highlight': 'no',
        'twitter:card': `${appName}`,
        'twitter:url': `${domain}`,
        'twitter:title': `${appName}`,
        'twitter:description': `Best ${appName} in the world`,
        'twitter:image': `${domain}/${iconsLocation}android-chrome-192x192.png`,
        'twitter:creator': '@babinux',
        'fb:app_id': 'XXXXX',
        'og:url': `${domain}`,
        'og:type': 'website',
        'og:title': `${appName}`,
        'og:image': `${domain}${iconsLocation}/apple-touch-icon.png`,
        'og:description': `${appDescription}`,
        'og:site_name': `${appName}`,
        'og:locale': 'en_US',
        'og:article:author': 'babinux',
      },
      // inlineSource: 'runtime~.+\\.js',
    }),
    // new BundleAnalyzerPlugin(),
    new WebpackBuildNotifierPlugin({
      title: 'Starry App Build',
      logo: path.resolve('./app/assets/icons/favicon.png'),
      suppressSuccess: true,
    }),
  ];

  const commonOptimizations = {
    minimize: isProd,
    runtimeChunk: 'single',
    splitChunks: {
      chunks: 'all',
      maxInitialRequests: Infinity,
      minSize: 0,
      cacheGroups: {
        vendor: {
          test: /[\\/]node_modules[\\/]/,
          name(module) {
            // get the name. E.g. node_modules/packageName/not/this/part.js
            // or node_modules/packageName
            const packageName = module.context.match(/[\\/]node_modules[\\/](.*?)([\\/]|$)/)[1];

            // npm package names are URL-safe, but some servers don't like @ symbols
            return `npm.${packageName.replace('@', '')}`;
          },
        },
      },
    },
  };

  const prodOptimizations = {
    ...commonOptimizations,
    minimize: isProd,
    minimizer: [
      new TerserPlugin({
        extractComments: isProd,
        cache: !isProd,
        sourceMap: !isProd,
        terserOptions: {
          ecma: undefined,
          warnings: !isProd,
          parse: {},
          mangle: isProd, // Note `mangle.properties` is `false` by default.
          module: false,
          output: null,
          toplevel: false,
          nameCache: null,
          ie8: false,
          keep_classnames: undefined,
          keep_fnames: false,
          safari10: false,
          compress: {
            drop_console: true,
          },
          // https://github.com/webpack-contrib/terser-webpack-plugin#terseroptions
        },
      }),
    ],
  };

  const devOptimizations = {
    ...commonOptimizations,
    minimize: isProd,
    minimizer: [
      new TerserPlugin({
        extractComments: isProd,
        cache: !isProd,
        sourceMap: !isProd,
        terserOptions: {
          ecma: undefined,
          warnings: !isProd,
          parse: {},
          mangle: isProd, // Note `mangle.properties` is `false` by default.
          module: false,
          output: null,
          toplevel: false,
          nameCache: null,
          ie8: false,
          keep_classnames: undefined,
          keep_fnames: false,
          safari10: false,
          compress: {
            drop_console: true,
          },
          // https://github.com/webpack-contrib/terser-webpack-plugin#terseroptions
        },
      }),
    ],
  };

  const pluginList = isProd ? [...devPlugins, ...prodPlugins] : devPlugins;
  const optimizationList = isProd ? { ...prodOptimizations } : { ...devOptimizations };

  new PngToIco(path.resolve(__dirname, './app/assets/icons/favicon.png'))
    .then(buf => {
      fs.writeFileSync(path.resolve(__dirname, './dist/favicon.ico'), buf);
    })
    .catch(console.error);

  return {
    // externals: [nodeExternals()],

    // devtool: isProd ? '' : 'inline-source-map',
    devtool: isProd ? '' : 'inline-source-map',

    entry: {
      index: path.resolve(__dirname, './index.js'),
    },
    output: {
      path: path.resolve(__dirname, './dist'),
      filename: isProd ? '[name].js' : '[name].js',
      chunkFilename: '[name].js',
      publicPath: path.resolve(__dirname, '/'),
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
    plugins: pluginList,
    optimization: optimizationList,
  };
};
