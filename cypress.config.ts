import { defineConfig } from 'cypress';
// import codeCoverageTask from "@cypress/code-coverage/task";

export default defineConfig({
  env: {
    "cypress-plugin-snapshots": {},
  },
  // env: {
  //   coverage: false,
  //   codeCoverage: {
  //     url: "http://localhost:8080/__coverage__",
  //     exclude: "cypress/**/*.*",
  //   },
  //   component: {
  //     supportFile: "./cypress/support/e2e.js",
  //     setupNodeEvents(on, config) {
  //       // implement node event listeners here
  //       codeCoverageTask(on, config);
  //       return config;
  //     },
  //   }
  // },

  e2e: {
    baseUrl: "http://localhost:8080",
    specPattern: "cypress/e2e/**/*.cy.{js,jsx,ts,tsx}",
    supportFile: "./cypress/support/e2e.js",
    setupNodeEvents(on, config) {
      // implement node event listeners here
      require('@cypress/code-coverage/task')(on, config);
      on("file:preprocessor", require("@cypress/code-coverage/use-babelrc"));
      // codeCoverageTask(on, config);
        return config;
    },
  },
});
