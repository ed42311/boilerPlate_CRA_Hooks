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

  test('user can see landing page', async () => {
    console.log("ROOT URL: ", ROOT_URL)
    await page.goto(ROOT_URL);
    console.log("GOT PAST GOTO URL ", local);
    if (local) {
      await page.screenshot({path: `${SCREEN_DIR}landing.png`});
    }
    const title = await page.$eval('#test-landing-h1', e => e.innerHTML);
    console.log("GOT PAST eval ");
    console.log(title);
    expect(title).toBe('Landing');
  }, 32000);

  test('user can click Sign In link', async () => {
    await page.goto(ROOT_URL);
    await page.click('#test-nav-signin');
    if (local) {
      await page.screenshot({path: `${SCREEN_DIR}signIn.png`});
    }
    const title = await page.$eval('#test-signin-h1', e => e.innerHTML);
    expect(title).toBe('SignIn');
  }, 16000);

  test('user can click Sign Up link', async () => {
    await page.goto(`${ROOT_URL}/signin`);
    await page.click('#test-link-signup');
    if (local) {
      await page.screenshot({path: `${SCREEN_DIR}signUp.png`});
    }
    const title = await page.$eval('#test-title-signup', e => e.innerHTML);
    expect(title).toBe('SignUp');
  }, 16000);

  test('user can signup and be redirected to dream archive', async () => {
    await page.goto(`${ROOT_URL}/signup`);
    await page.type('#test-input-username', testUser.name);
    await page.type('#test-input-email', testUser.email);
    await page.type('#test-input-passwordone', testUser.password);
    await page.type('#test-input-passwordtwo', testUser.password);
    await page.click('#test-button-signup-submit');
    if (local) {
      await page.screenshot({path: `${SCREEN_DIR}signUpSubmit.png`});
    }
    setTimeout(async function(){
      const content = await page.content();
      console.log(content);
    }, 60000)
    await page.waitForSelector('#test-dreamarchive-user-h1', {timeout: 60000});
    const title = await page.$eval('#test-dreamarchive-user-h1', e => e.innerHTML);
    expect(title).toBe(`Dream Archive for ${testUser.email}`);
  }, 64000);

  afterAll(async () => {
    await browser.close();
  });
})
