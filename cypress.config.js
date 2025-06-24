const { defineConfig } = require("Cypress");

module.exports = defineConfig({
  projectId: "9xmcf9",
  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
    chromeWebSecurity: false,
    defaultCommandTimeout: 10000,
    pageLoadTimeout: 50000,
    viewportWidth: 1280,
    viewportHeight: 700,
  },
});
