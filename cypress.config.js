const { defineConfig } = require("cypress");
const fs = require("fs");
const path = require("path");

module.exports = defineConfig({
  projectId: "9xmcf9",
  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
      on("task", {
        getLatestFile({ dirPath }) {
          const files = fs
            .readdirSync(dirPath)
            .map((name) => ({
              name,
              time: fs.statSync(path.join(dirPath, name)).mtime.getTime(),
            }))
            .filter(
              (file) =>
                !fs.statSync(path.join(dirPath, file.name)).isDirectory()
            )
            .sort((a, b) => b.time - a.time);
          return files.length ? path.join(dirPath, files[0].name) : null;
        },
      });
      return config;
    },
    chromeWebSecurity: false,
    defaultCommandTimeout: 10000,
    pageLoadTimeout: 50000,
    viewportWidth: 1280,
    viewportHeight: 700,
  },
});
