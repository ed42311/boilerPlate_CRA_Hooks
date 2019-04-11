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

  afterAll(async () => {
    await browser.close();
  });
})
