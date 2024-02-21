const { defineConfig } = require('cypress');

module.exports = defineConfig({
   e2e: {
      baseUrl: 'https://demoblaze.com/',
      viewportHeight: 720,
      viewportWidth: 1280,
      specPattern: ['./cypress/e2e/**/*.cy.js'],
      experimentalRunAllSpecs: true,
      setupNodeEvents(on, config) {
         // implement node event listeners here
      },
   },
});
