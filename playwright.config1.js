// @ts-check
import { defineConfig, devices } from '@playwright/test';
import { permission } from 'node:process';

/**
 * Read environment variables from file.
 * https://github.com/motdotla/dotenv
 */
// import dotenv from 'dotenv';
// import path from 'path';
// dotenv.config({ path: path.resolve(__dirname, '.env') });

/**
 * @see https://playwright.dev/docs/test-configuration
 */
const config=({
  testDir: './tests',
  retries: 2,
  workers:2,
  timeout: 40 * 1000,
  expect:{
    timeout: 5 * 1000
  },
  reporter: 'html',
  projects : [
    {
      name:"firefox",
      use: {
        browserName: 'firefox',
        headless: false,
        actionTimeout: 10 * 1000,
        navigationTimeout: 30 * 1000,
        screenshot:'on',// off/ on/ only-on-failure
        video: 'on', // off/ on/ retain-on-failure / on-first-retry
        trace: 'on',
        ignoreHttpsErrors: true,
        permissions: ['geolocation'],
        //viewport: {width:1320, height:780}
        //...devices['iPhone 17 Pro Max']
      }
    },

    {
      name:"Chrome",
      use: {
        browserName: 'chromium',
        headless: true,
        actionTimeout: 10 * 1000,
        navigationTimeout: 30 * 1000,
        screenshot:'on',
        trace: 'on'
      }
    }

  ]

  

});
module.exports = config;

