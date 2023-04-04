module.exports = {
    root: true,
    env: {
      node: true,
      browser: true
    },
    extends: [
      "plugin:vue/recommended",
      "eslint:recommended",
      "plugin:prettier/recommended",
      'plugin:@intlify/vue-i18n/recommended'
    ],
    rules: {
      "prettier/prettier": "error",
      "vue/component-name-in-template-casing": ["error", "PascalCase"],
      "no-console": process.env.NODE_ENV === "production" ? "error" : "off",
      "no-debugger": process.env.NODE_ENV === "production" ? "error" : "off",
      '@intlify/vue-i18n/no-dynamic-keys': 'error',
        '@intlify/vue-i18n/no-unused-keys': [
        'error',
        {
            extensions: ['.js', '.vue']
        }
        ],
        "@intlify/vue-i18n/no-missing-keys-in-other-locales": [
            "error",
            {
              "ignoreLocales": ['en', 'pt-BR']
            }
          ],
    },
    globals: {
      $nuxt: true
    },
    parserOptions: {
      parser: "@babel/eslint-parser",
      requireConfigFile: false
    },
    settings: {
      'vue-i18n': {
          localeDir: './src/locales/*.{json,json5,yaml,yml}', 
      }
  }
  };