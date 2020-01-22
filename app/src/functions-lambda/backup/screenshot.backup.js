// const captureWebsite = require('capture-website');

// exports.handler = async event => {
//   const printBool = event.queryStringParameters.posterPrint || '0';
//   const design = event.queryStringParameters.posterDesign || '3';

//   console.log(event.queryStringParameters.renderURl);
//   const renderURl =
//     event.queryStringParameters.renderURl ||
//     `https://starry-poster.netlify.com/?posterPrint=${printBool}&posterDesign=${design}&posterDate=2020-Jan-13&posterTitle=Name+Of+Someone+You+Love&posterLocation=Paris%2C+France&posterCoordinates=48.85661%C2%B0N%2C+2.35222%C2%B0W`;

//   const CooolmyScreenshot = await captureWebsite.base64(renderURl, {
//     fullPage: true,
//     delay: 2,
//     // scaleFactor: 0.1,
//     // waitForElement: 'poster-design-element',
//     // element: '#poster-design-element',
//     //
//   });

//   return {
//     statusCode: 200,
//     headers: {
//       'Content-type': 'image/jpeg',
//     },
//     body: CooolmyScreenshot,
//     isBase64Encoded: true,
//   };
// };
