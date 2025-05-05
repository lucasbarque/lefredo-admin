import coverage from '@cypress/code-coverage/task';
import { defineConfig } from 'cypress';

export default defineConfig({
  env: {
    codeCoverage: {
      exclude: 'cypress/**/*.*',
    },
  },
  e2e: {
    baseUrl: 'http://localhost:3000',
    specPattern: 'cypress/e2e/**/*.cy.{js,jsx,ts,tsx}',
    setupNodeEvents(on, config) {
      coverage(on, config);
      on('before:browser:launch', (_, launchOptions) => {
        launchOptions.preferences.width = 1920;
        launchOptions.preferences.height = 1080;
        return launchOptions;
      });
    },
  },
  viewportHeight: 900,
  viewportWidth: 1400,
});
