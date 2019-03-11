const puppeteer = require('puppeteer');
const faker = require('faker');

const testUser = {
  name: faker.name.firstName(),
  email: faker.internet.email(),
  password: faker.internet.password(),
}
const debug = false;
const options = debug ? {headless: false, slowMo: 350} : {};
const ROOT_URL = 'http://localhost:3000';
const SCREEN_DIR = 'src/test/screenshots/';
let browser;
let page;

describe('user signup test', () => {
  beforeAll(async () => {
    browser = await puppeteer.launch(options);
    page = await browser.newPage();
  })

  test('user can see landing page', async () => {
    await page.goto(ROOT_URL);
    await page.screenshot({path: `${SCREEN_DIR}landing.png`});
    const title = await page.$eval('#root > div > div:nth-child(3) > h1', e => e.innerHTML);
    expect(title).toBe('Landing')
  }, 16000)

  test('user can click Sign In link', async () => {
    await page.goto(ROOT_URL);
    await page.click('#root > div > div:nth-child(1) > ul > li:nth-child(2) > a');
    await page.screenshot({path: `${SCREEN_DIR}signIn.png`});
    const title = await page.$eval('#root > div > div:nth-child(3) > h1', e => e.innerHTML);
    expect(title).toBe('SignIn') 
  }, 16000)

  test('user can click Sign Up link', async () => {
    await page.goto(`${ROOT_URL}/signin`);
    await page.click('#root > div > div:nth-child(3) > p:nth-child(4) > a');
    await page.screenshot({path: `${SCREEN_DIR}signUp.png`});
    const title = await page.$eval('#root > div > div:nth-child(3) > h1', e => e.innerHTML);
    expect(title).toBe('SignUp') 
  }, 16000)

  afterAll(async () => {
    await browser.close();
  }) 
})


//   // Do the sign up form
//   await page.type(`#root > div > div:nth-child(3) > form > input[type="text"]:nth-child(1)`, testUser.name);
//   await page.type(`#root > div > div:nth-child(3) > form > input[type="text"]:nth-child(2)`, testUser.email);
//   await page.type(`#root > div > div:nth-child(3) > form > input[type="password"]:nth-child(3)`, testUser.password);
//   await page.type(`#root > div > div:nth-child(3) > form > input[type="password"]:nth-child(4)`, testUser.password);
//   await page.click('#root > div > div:nth-child(3) > form > button');
//   await page.screenshot({path: 'test/screenshots/signedUp.png'});

//   await browser.close();
// })();

