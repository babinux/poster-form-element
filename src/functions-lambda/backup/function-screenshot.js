// eslint-disable-next-line no-shadow

//* ************************************ */
//           IMPORTANT
//* ************************************ */

/*
      Use URL Params to tweak if you want...
      Full page screenshot = "?fullPage"
      OR
      Screenshot of the poster only (used for small thumbnails)
*/

//* ************************************ */
//* ************************************ */

// const chromium = require('chrome-aws-lambda');
import chromium from 'chrome-aws-lambda';

async function screenshotDOMElement(page, opts = {}) {
  // eslint-disable-next-line prefer-destructuring
  const selector = opts.selector;

  if (!selector) throw Error('Please provide a selector.');

  // eslint-disable-next-line no-shadow
  const rect = await page.evaluate(selector => {
    if (selector) {
      console.log('THIS IS USELESS FOR NOW');
    }

    const element = document
      .querySelector('#poster-design-element')
      .shadowRoot.querySelector('#poster');

    if (!element) return null;
    const { x, y, width, height } = element.getBoundingClientRect();
    return { left: x, top: y, width, height, id: element.id };
  }, selector);

  if (!rect) throw Error(`Could not find element that matches selector: ${selector}.`);

  return page.screenshot({
    fullPage: false,
    encoding: 'base64',
    quality: 100,
    type: 'jpeg',
    clip: {
      x: rect.left,
      y: rect.top,
      width: rect.width,
      height: rect.height,
    },
  });
}

exports.handler = async event => {
  console.log('event');

  console.log(event);

  const baseUrl = 'https://starry-poster.netlify.com';
  const pageToScreenshot = new URL('/', baseUrl);

  pageToScreenshot.searchParams.set('posterPrint', event.queryStringParameters.posterPrint || '0');
  pageToScreenshot.searchParams.set(
    'posterDesign',
    event.queryStringParameters.posterDesign || '3',
  );
  pageToScreenshot.searchParams.set(
    'posterSize',
    event.queryStringParameters.posterSize || '9x12-US',
  );
  pageToScreenshot.searchParams.set(
    'posterDate',
    event.queryStringParameters.posterDate || '2020-Jan-16',
  );
  pageToScreenshot.searchParams.set(
    'posterTitle',
    event.queryStringParameters.posterTitle || 'Name Of Someone You Love',
  );
  pageToScreenshot.searchParams.set(
    'posterLocation',
    event.queryStringParameters.posterLocation || 'Paris',
  );
  pageToScreenshot.searchParams.set(
    'posterCoordinates',
    event.queryStringParameters.posterCoordinates || '00.00000°N -000.00000°W',
  );

  // const pageToScreenshot = new URL('/', baseUrl).toString();

  // console.log('pageToScreenshot');
  // console.log(pageToScreenshot.toString());
  // console.log(pageToScreenshot);

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

  await page.goto(pageToScreenshot.href, { waitUntil: 'networkidle2' });

  let screenshot;

  if (!event.queryStringParameters.fullPage) {
    screenshot = await screenshotDOMElement(page, {
      selector: `document
        .querySelector('#poster-design-element')
        .shadowRoot.querySelector('#poster')`,
    });
  } else {
    screenshot = await page.screenshot({
      fullPage: true,
      quality: 100,
      type: 'jpeg',
      encoding: 'base64',
    });
  }
  await browser.close();

  return {
    statusCode: 200,
    headers: {
      'Content-type': 'image/jpeg',
    },
    body: screenshot,
    isBase64Encoded: true,
  };
};
