import { defineConfig } from "cypress";

export default defineConfig({
  projectId: "nikmk7",
  reporter: "cypress-multi-reporters",
  reporterOptions: {
    configFile: "reporter-config.json",
  },
  retries: {
    runMode: 2,
    openMode: 0,
  },
  viewportHeight: 1080,
  viewportWidth: 1920,
  e2e: {
    baseUrl: "http://localhost:4200/",
    specPattern: "cypress/e2e/**/*.{js,jsx,ts,tsx}",
    excludeSpecPattern: ["**/1-getting-started/*", "**/2-advanced-examples/*"],
    video: false,
  },
  env: {
    email: "artem.bondar16@gmail.com",
    password: "CypressTest1",
    apiUrl: "https://api.realworld.io",
  },
  setupNodeEvents(on, config) {
    const username = process.env["DB_USERNAME"];
    const password = process.env["PASSWORD"];

    if (!password) {
      throw new Error("missing PASSWORD env variable");
    } else if (!username) {
      throw new Error("missing DB_USERNAME env variable");
    }

    config.env = {
      username,
      password,
    };

    return config;
  },
});
