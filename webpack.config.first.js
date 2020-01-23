/* eslint-disable import/no-extraneous-dependencies */
// eslint-disable-next-line one-var
const path = require('path');
const webpack = require('webpack');
const WebpackIndexHTMLPlugin = require('@open-wc/webpack-index-html-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
// eslint-disable-next-line no-unused-vars
const CopyPlugin = require('copy-webpack-plugin');
const GoogleFontsPlugin = require('@beyonk/google-fonts-webpack-plugin');

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
              <script>LUX=(function(){var a=("undefined"!==typeof(LUX)&&"undefined"!==typeof(LUX.gaMarks)?LUX.gaMarks:[]);var d=("undefined"!==typeof(LUX)&&"undefined"!==typeof(LUX.gaMeasures)?LUX.gaMeasures:[]);var j="LUX_start";var k=window.performance;var l=("undefined"!==typeof(LUX)&&LUX.ns?LUX.ns:(Date.now?Date.now():+(new Date())));if(k&&k.timing&&k.timing.navigationStart){l=k.timing.navigationStart}function f(){if(k&&k.now){return k.now()}var o=Date.now?Date.now():+(new Date());return o-l}function b(n){if(k){if(k.mark){return k.mark(n)}else{if(k.webkitMark){return k.webkitMark(n)}}}a.push({name:n,entryType:"mark",startTime:f(),duration:0});return}function m(p,t,n){if("undefined"===typeof(t)&&h(j)){t=j}if(k){if(k.measure){if(t){if(n){return k.measure(p,t,n)}else{return k.measure(p,t)}}else{return k.measure(p)}}else{if(k.webkitMeasure){return k.webkitMeasure(p,t,n)}}}var r=0,o=f();if(t){var s=h(t);if(s){r=s.startTime}else{if(k&&k.timing&&k.timing[t]){r=k.timing[t]-k.timing.navigationStart}else{return}}}if(n){var q=h(n);if(q){o=q.startTime}else{if(k&&k.timing&&k.timing[n]){o=k.timing[n]-k.timing.navigationStart}else{return}}}d.push({name:p,entryType:"measure",startTime:r,duration:(o-r)});return}function h(n){return c(n,g())}function c(p,o){for(i=o.length-1;i>=0;i--){var n=o[i];if(p===n.name){return n}}return undefined}function g(){if(k){if(k.getEntriesByType){return k.getEntriesByType("mark")}else{if(k.webkitGetEntriesByType){return k.webkitGetEntriesByType("mark")}}}return a}return{mark:b,measure:m,gaMarks:a,gaMeasures:d}})();LUX.ns=(Date.now?Date.now():+(new Date()));LUX.ac=[];LUX.cmd=function(a){LUX.ac.push(a)};LUX.init=function(){LUX.cmd(["init"])};LUX.send=function(){LUX.cmd(["send"])};LUX.addData=function(a,b){LUX.cmd(["addData",a,b])};LUX_ae=[];window.addEventListener("error",function(a){LUX_ae.push(a)});LUX_al=[];if("function"===typeof(PerformanceObserver)&&"function"===typeof(PerformanceLongTaskTiming)){var LongTaskObserver=new PerformanceObserver(function(c){var b=c.getEntries();for(var a=0;a<b.length;a++){var d=b[a];LUX_al.push(d)}});try{LongTaskObserver.observe({type:["longtask"]})}catch(e){}};</script>
              <script src="https://cdn.speedcurve.com/js/lux.js?id=474866225" async defer crossorigin="anonymous"></script>

              <link rel="preconnect" href="https://maps.gstatic.com">

             <!-- <link href="${fontsCustom}" rel="stylesheet"> -->

              <link href="fonts.css" rel="stylesheet">
              <link rel="canonical" href="${canonical}" />
              <link rel="apple-touch-icon" href="/icon_192x192.png">

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
  // eslint-disable-next-line no-unused-vars
  const localProd = argv.local;

  if (process.env.NODE_ENV === 'production') {
    // console.log('Looks like we are in Production mode!');
    isProd = true;
  } else {
    // console.log('Looks like we are in development mode!');
    process.env.NODE_ENV = 'development';
    isProd = false;
  }

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
      new CleanWebpackPlugin(),
      new webpack.DefinePlugin({
        'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV),
        'process.env.DEBUG': JSON.stringify(process.env.DEBUG),
        __ENV__: JSON.stringify(process.env.NODE_ENV || 'development'),
      }),
      new GoogleFontsPlugin({
        fonts: [
          { family: 'Barlow Semi Condensed' },
          { family: 'Nova Slim' },
          { family: 'Rationale' },
          { family: 'Satisfy' },
          { family: 'KoHo', variants: ['400', '700italic'] },
          { family: 'Kodchasan', variants: ['400', '500', '600'] },
        ],
      }),
      new WebpackIndexHTMLPlugin({
        minify: false,
        template: () => htmlTemplate(isProd),
      }),
    ],
    optimization: {},
  };
};
