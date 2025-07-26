import js from '@eslint/js'
import globals from 'globals'
import reactHooks from 'eslint-plugin-react-hooks'
import reactRefresh from 'eslint-plugin-react-refresh'
import tseslint from 'typescript-eslint'
import stylistic from '@stylistic/eslint-plugin'
import imports from 'eslint-plugin-import'

export default tseslint.config(
  js.configs.recommended,
  tseslint.configs.recommended,
  reactHooks.configs['recommended-latest'],
  reactRefresh.configs.vite,
  imports.flatConfigs.recommended,
  {
    name: 'clocks',
    files: ['src/**/*.{ts,tsx}'],
    languageOptions: {
      ecmaVersion: 2020,
      globals: globals.browser,
    },
    plugins: {
      '@stylistic': stylistic
    },
    rules: {
      'semi': ['error', 'never'],
      '@typescript-eslint/semi': 'off',
      'object-curly-spacing': ['error', 'always'],
      'quotes': ['error', 'single'],
      'quote-props': ['error', 'as-needed'],
      'import/extensions': [
        'error',
        'ignorePackages',
        {
          ts: 'never',
          tsx: 'never',
          js: 'never',
          jsx: 'never',
          svg: 'always',
          json: 'always',
          'scss': 'always'
        },
      ]
    },
    ignores: ['**/dist'],
    settings: {
      "import/resolver": {
        typescript: {
          project: './tsconfig.json'
        }
      }
    }
  }
)
