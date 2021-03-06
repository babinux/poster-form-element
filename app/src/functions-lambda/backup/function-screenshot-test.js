// import chromium from 'chrome-aws-lambda';
// import puppeteer from 'puppeteer-core';

const chromium = require('chrome-aws-lambda');

exports.handler = async () => {
  const pageToScreenshot = 'https://starry-poster.netlify.com/?posterPrint=1&posterDesign=4';

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

  async function screenshotDOMElement() {
    // eslint-disable-next-line prefer-destructuring

    // eslint-disable-next-line no-unused-vars
    const rect = await page.evaluate(() => {
      // console.log(theSelector);

      const element = document
        .querySelector('#poster-design-element')
        .shadowRoot.querySelector('#poster');

      if (!element) return null;
      const { x, y, width, height } = element.getBoundingClientRect();
      return { left: x, top: y, width, height, id: element.id };
    });

    return page.screenshot({
      fullPage: true,
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

  const screenshot = await screenshotDOMElement({
    selector: 'header aside',
  });

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
