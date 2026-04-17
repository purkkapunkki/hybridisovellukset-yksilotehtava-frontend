import { defineConfig } from 'i18next-cli'

export default defineConfig({
  locales: [
    "fi",
    "se",
    "is",
    "da",
    "no"
  ],
  extract: {
    input: "src/**/*.{js,jsx,ts,tsx}",
    output: "public/locales/{{language}}/{{namespace}}.json"
  }
})