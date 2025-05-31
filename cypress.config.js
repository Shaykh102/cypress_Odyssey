const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
    watchForFileChanges: false,
    projectId: "ogemhn",
    retries: {
      runMode: 2,      // Number of times to retry a failed test in CI
      openMode: 0      // Number of times to retry a failed test in interactive mode
    },
    video: true,       // Record video for CI runs
    screenshotOnRunFailure: true
  },
});
        