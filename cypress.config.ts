import { defineConfig } from "cypress";

require("dotenv").config();

export default defineConfig({
  e2e: {
    baseUrl: "http://localhost:3000",
    viewportWidth: 1200,
  },
  env: {
    testUserEmail: process.env.FATBOOK_TEST_USER_EMAIL,
    testUserPassword: process.env.FATBOOK_TEST_USER_PASSWORD,
  },
});
