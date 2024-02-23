const { defineConfig } = require('cypress');

module.exports = defineConfig({
   e2e: {
      baseUrl: 'https://calendarific.com/api/v2',
      viewportHeight: 720,
      viewportWidth: 1280,
      specPattern: ['./cypress/e2e/**/*.cy.js'],
      experimentalRunAllSpecs: true,
      setupNodeEvents(on, config) {
         // put commands here
      },
      env: {
         hello: 'HELLO WORLD!',
      },
   },
});
