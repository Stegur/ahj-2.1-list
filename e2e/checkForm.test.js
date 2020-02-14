import puppeteer from 'puppeteer';
import childProcces from 'child_process';

const server = childProcces.fork(`${__dirname}/test-server.js`);

jest.setTimeout(60000);

describe('Items list', () => {
  let browser = null;
  let page = null;
  const baseUrl = 'http://localhost:9999';

  beforeAll(async () => {
    await new Promise((resolve, reject) => {
      server.on('error', () => {
        reject();
      });
      server.on('message', (message) => {
        if (message === 'ok') {
          resolve();
        }
      });
    });
    browser = await puppeteer.launch({
      headless: false, // show gui
      slowMo: 50,
      // devtools: true, // show devTools
    });
    page = await browser.newPage();
  });

  afterAll(async () => {
    await browser.close();
    server.kill();
  });

  test('.add button should add new item to the list', async () => {
    await page.goto(baseUrl);
    const $add = await page.$('#add');
    const $title = await page.$('#title');
    const $price = await page.$('#price');
    const $submit = await page.$('#submit');

    $add.click();

    await $title.type('Xiaomi Mi5');
    await Promise.all([
      await $title.type('Xiaomi Mi5'),
      await $price.type('15000'),
    ]);

    $submit.click();

    await page.waitFor(1000);
    const $items = await page.$$('.goods__item');

    expect($items.length).toBe(4);
  });

  test('.del button should remove item from the list', async () => {
    await page.goto(baseUrl);

    const $delBtns = await page.$$('.del');
    await $delBtns[0].click();

    await page.waitFor(1000);
    const $items = await page.$$('.goods__item');

    expect($items.length).toBe(2);
  });

  test('.edit button should edit current item in the list', async () => {
    await page.goto(baseUrl);
    const $edit = await page.$('.edit');
    const $title = await page.$('#title');
    const $price = await page.$('#price');
    const $submit = await page.$('#submit');

    $edit.click();

    await page.click('#title');

    await page.keyboard.down('Control');
    await page.keyboard.press('KeyA');
    await page.keyboard.up('Control');
    await page.keyboard.press('Backspace');

    await $title.type('Xiaomi Mi5');

    await page.click('#price');

    await page.keyboard.down('Control');
    await page.keyboard.press('KeyA');
    await page.keyboard.up('Control');
    await page.keyboard.press('Backspace');

    await $price.type('15000'),

    $submit.click();

    await page.waitFor(1000);

    const $firstItemTitle = await page.$('#product__title');
    const title = await page.evaluate((element) => element.textContent, $firstItemTitle);

    const $firstItemPrice = await page.$('#product__price');
    const price = await page.evaluate((element) => element.textContent, $firstItemPrice);

    expect(title).toBe('Xiaomi Mi5');
    expect(price).toBe('15000');
  });

});
