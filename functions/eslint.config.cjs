module.exports = [
  {
    ignores: [
      "node_modules/**",
      "lib/**",
      ".env",
      ".firebase/**"
    ]
  },
  {
    files: ["**/*.js", "**/*.ts"],
    languageOptions: {
      ecmaVersion: 2021,
      sourceType: "module",
      globals: {
        globalThis: "readonly",
        console: "readonly",
        process: "readonly",
        Buffer: "readonly",
        setTimeout: "readonly",
        clearTimeout: "readonly",
        setInterval: "readonly",
        clearInterval: "readonly",
        URL: "readonly"
      }
    },
    rules: {
      "no-unused-vars": ["error", {
        "argsIgnorePattern": "^_",
        "varsIgnorePattern": "^_",
        "ignoreRestSiblings": true
      }],
      "semi": ["error", "never"],
      "quotes": ["error", "double"],
      "indent": ["error", 4],
      "object-curly-spacing": ["error", "always"],
      "array-bracket-spacing": ["error", "never"],
    }
  }
];