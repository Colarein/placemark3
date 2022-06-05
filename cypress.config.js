// eslint-disable-next-line import/no-extraneous-dependencies
const { defineConfig } = require("cypress")

module.exports = defineConfig({
  projectId: "33tycb",
  e2e: {
    baseUrl: "http://localhost:3000"
  }
})