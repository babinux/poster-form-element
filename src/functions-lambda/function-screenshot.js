const captureWebsite = require('capture-website');
const chromium = require('chrome-aws-lambda');

exports.handler = async event => {
  console.log(`event.body`);
  console.log(event.body);

  if (true) {
    // const eventPageToScreenshot = JSON.parse(event.body).pageToScreenshot;
    const pageToScreenshot = 'https://starry-poster.netlify.com/?posterPrint=1';

    if (!pageToScreenshot)
      return {
        statusCode: 400,
        body: JSON.stringify({ message: 'Page URL not defined' }),
      };

    const browser = await chromium.puppeteer.launch({
      args: chromium.args,
      defaultViewport: chromium.defaultViewport,
      executablePath: await chromium.executablePath,
      headless: chromium.headless,
    });

    const page = await browser.newPage();

    await page.goto(pageToScreenshot, { waitUntil: 'networkidle2' });

    const screenshot = await page.screenshot({
      fullPage: true,
      quality: 100,
      type: 'jpeg',
      encoding: 'base64',
    });

    await browser.close();

    // return {
    //   statusCode: 200,
    //   headers: {
    //     'Content-type': 'image/jpeg',
    //   },
    //   body: JSON.stringify({
    //     message: `Complete screenshot of ${pageToScreenshot}`,
    //     buffer: screenshot,
    //   }),
    // };

    return {
      statusCode: 200,
      headers: {
        'Content-type': 'image/jpeg',
      },
      body: screenshot,
      isBase64Encoded: true,
    };
  }
  const printBool = event.queryStringParameters.posterPrint || '0';
  const design = event.queryStringParameters.posterDesign || '3';

  console.log(event.queryStringParameters.renderURl);
  const renderURl =
    event.queryStringParameters.renderURl ||
    `https://starry-poster.netlify.com/?posterPrint=${printBool}&posterDesign=${design}&posterDate=2020-Jan-13&posterTitle=Name+Of+Someone+You+Love&posterLocation=Paris%2C+France&posterCoordinates=48.85661%C2%B0N%2C+2.35222%C2%B0W`;

  const CooolmyScreenshot = await captureWebsite.base64(renderURl, {
    fullPage: true,
    delay: 2,
    // scaleFactor: 0.1,
    // waitForElement: 'poster-design-element',
    // element: '#poster-design-element',
    //
  });

  return {
    statusCode: 200,
    headers: {
      'Content-type': 'image/jpeg',
    },
    body: CooolmyScreenshot,
    isBase64Encoded: true,
  };
};
