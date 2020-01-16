// import chromium from 'chrome-aws-lambda';
// import puppeteer from 'puppeteer-core';

const chromium = require('chrome-aws-lambda');

exports.handler = async () => {
  const pageToScreenshot = 'https://starry-poster.netlify.com/?posterPrint=0&posterDesign=3';

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

  return {
    statusCode: 200,
    headers: {
      'Content-type': 'image/jpeg',
    },
    body: screenshot,
    isBase64Encoded: true,
  };
};
