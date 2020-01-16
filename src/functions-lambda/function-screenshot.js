import Chromium from 'chrome-aws-lambda';

exports.handler = async () => {
  // console.log(`event.body`);
  // console.log(event.body);

  // const eventPageToScreenshot = JSON.parse(event.body).pageToScreenshot;
  const pageToScreenshot = 'https://starry-poster.netlify.com/?posterPrint=1';

  if (!pageToScreenshot)
    return {
      statusCode: 400,
      body: JSON.stringify({ message: 'Page URL not defined' }),
    };

  const browser = await Chromium.puppeteer.launch({
    args: Chromium.args,
    defaultViewport: Chromium.defaultViewport,
    executablePath: await Chromium.executablePath,
    headless: Chromium.headless,
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
