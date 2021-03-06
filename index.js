// const puppeteer = require('puppeteer');

// (async () => {
//   const browser = await puppeteer.launch({headless:false});
//   const page = await browser.newPage();
//   await page.goto('https://google.com');
//   await page.screenshot({path: 'example1.png'});
//   const page2 = await browser.newPage();
//   await page2.goto('http://localhost/demodb_chrome/');
//   await page2.screenshot({path: 'example2.png'});
//   let pages = await browser.pages();
//   console.log(page.tar) 
// })()

const puppeteer = require('puppeteer');

(async () => {
  const browser = await puppeteer.launch({headless:false});
  const page = await browser.newPage();
  let currentURL;
  
  for (currentURL of ['https://facebook.com', 'https://youtube.com', 'https://bbc.com']) {
    await page.goto(currentURL,{waitUntil: 'networkidle0'});
    await page.waitForTimeout(1000)
    .then(() => console.log('Waited a second!'));
    let titulo = await page.title();
    console.log(titulo)
    await page .waitForSelector('a')
    .then(() => console.log('First URL with image: ' + currentURL));
  }
  await browser.close();
})();

https://blog.ramosly.com/how-ive-been-using-puppeteer-b8010e374ff7
https://pptr.dev/#?product=Puppeteer&version=v5.3.1&show=api-pagetitle
https://pptr.dev/#?product=Puppeteer&version=v5.3.1&show=api-class-page
https://pocketadmin.tech/en/puppeteer-popup-window/
https://stackoverflow.com/questions/48218584/tell-puppeteer-to-open-chrome-tab-instead-of-window
https://github.com/jotamon182/node-demodb