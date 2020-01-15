const Pageres = require('pageres');

(async () => {
  await new Pageres({ delay: 4 })
    .src(
      'https://starry-poster.netlify.com/?posterPrint=1&posterDesign=7&posterDate=2020-Jan-13&posterTitle=Name+Of+Someone+You+Love&posterLocation=Paris%2C+France&posterCoordinates=48.85661%C2%B0N%2C+2.35222%C2%B0W',
      ['800x900'],
      {
        crop: false,
        format: 'jpg',
        scale: 2,
        // selector: "body",
        incrementalName: true,
      },
    )
    // .src(
    //   "https://starry-poster.netlify.com/?posterPrint=1&posterDesign=3&posterDate=2020-Jan-13&posterTitle=Name+Of+Someone+You+Love&posterLocation=Paris%2C+France&posterCoordinates=48.85661%C2%B0N%2C+2.35222%C2%B0W",
    //   ["8000x768"],
    //   { crop: false }
    // )
    // .src(
    //   "https://github.com/sindresorhus/pageres",
    //   ["480x320", "1024x768", "iphone 5s"],
    //   { crop: true }
    // )
    // .src("https://sindresorhus.com", ["1280x1024", "1920x1080"])
    // .src("data:text/html,<h1>Awesome!</h1>", ["1024x768"])
    .dest(`${__dirname}/screenshots-img`)
    .run();

  console.log('Finished generating screenshots!');
})();
