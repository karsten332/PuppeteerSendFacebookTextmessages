const puppeteer = require('puppeteer');
const fs = require('fs');
const CRED = require('./secret.js');
(async () => {
    //console.log(CRED.password)
    const browser = await puppeteer.launch({ headless: false });
    const page = await browser.newPage();
    await page.goto('https://facebook.com', { waitUntil: 'domcontentloaded' });

    await page.waitForSelector("#email");

    await page.type("#email", CRED.username)

    await page.screenshot({ path: 'example.png' });

    await browser.close();
})();