const puppeteer = require('puppeteer');
const fs = require('fs');
const CRED = require('./secret.js');



(async () => {
    //console.log(CRED.password)

    const sleep = async (ms) => {
        return new Promise((res, rej) => {
            setTimeout(() => {
                res();
            }, ms)
        });
    }


    const browser = await puppeteer.launch({ headless: false });
    const page = await browser.newPage();
    await page.goto('https://facebook.com', { waitUntil: 'domcontentloaded' });

    await page.waitForSelector("#email");
    // username
    await page.type("#email", CRED.username)
    // password
    await page.type("#pass", CRED.password)

    await sleep(500);

    await page.click("#loginbutton")

    await sleep(5000);
    await page.screenshot({ path: 'example.png' });


    await browser.close();
})();