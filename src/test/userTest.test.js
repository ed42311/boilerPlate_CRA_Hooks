const puppeteer = require('puppeteer');
const faker = require('faker');

const testUser = {
  name: faker.name.firstName(),
  email: faker.internet.email().toLowerCase(),
  password: faker.internet.password(),
}
const debug = false;
const local = process.env.REACT_APP_TESTING_ENV === "local" ? true : false
const options = debug ? {headless: false, slowMo: 150} : {};
const ROOT_URL = `http://localhost:${process.env.REACT_APP_TESTING_PORT}`;
const SCREEN_DIR = 'src/test/screenshots/';
let browser;
let page;

describe('user signup test', () => {
  beforeAll(async () => {
    browser = await puppeteer.launch(options);
    page = await browser.newPage();
  });

  test('user should land on sign-in page', async () => {
    await page.goto(ROOT_URL);
    if (local) {
      await page.screenshot({path: `${SCREEN_DIR}signIn.png`});
    }
    const title = await page.$eval('#test-signin-h1', e => e.innerHTML);
    expect(title).toBe('Sign In');
  }, 32000);

  test('user can sign in', async () => {
    await page.goto(ROOT_URL);
    await page.type('#test-input-email', "jeff@jeff.com");
    await page.type('#test-input-password', "jeffrey");
    await page.click('#test-button-signin-submit');
    await page.waitForSelector('#DreamText');
    const title = await page.$eval('#DreamText', e => e.placeholder);
    console.log(title)
    expect(title).toBe('Enter Dream Text (required)');
  }, 16000);

  xtest('user can generate images', async () => {
    await page.goto(ROOT_URL);
    await page.type('#test-input-email', "jeff@jeff.com");
    await page.type('#test-input-password', "jeffrey");
    await page.click('#test-button-signin-submit');
    await page.waitForSelector('#DreamText');
    await page.type('#DreamText', 'cow horse');
    await page.click('#archButton');
    await page.waitForSelector('.imageGenerated');
    const url = await page.$eval('.imageGenerated', e => e.src);
    expect(url).toBe('https://cdn.pixabay.com/photo/2014/11/06/15/14/grandpa-519246_150.jpg');
  }, 32000);

  afterAll(async () => {
    await browser.close();
  });
})
