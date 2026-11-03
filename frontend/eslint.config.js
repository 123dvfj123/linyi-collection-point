import js from '@eslint/js'
import pluginVue from 'eslint-plugin-vue'
import globals from 'globals'

// ESLint flat config. `flat/essential` is the smallest rule set that still
// catches real mistakes in a Vue 3 single file component, which is what a
// skeleton needs; a stricter set can be adopted once feature pages exist.
export default [
  { ignores: ['dist/**', 'node_modules/**', 'coverage/**'] },
  js.configs.recommended,
  ...pluginVue.configs['flat/essential'],
  {
    languageOptions: {
      ecmaVersion: 'latest',
      sourceType: 'module',
      globals: { ...globals.browser },
    },
    rules: {
      // App.vue is the application root and is intentionally one word.
      'vue/multi-word-component-names': 'off',
      // A skeleton should not ship debug output; warnings and errors are fine.
      'no-console': ['error', { allow: ['warn', 'error'] }],
    },
  },
]