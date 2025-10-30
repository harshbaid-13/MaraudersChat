import tseslint from '@typescript-eslint/eslint-plugin';
import tsparser from '@typescript-eslint/parser';

/** @type {import('eslint').Linter.FlatConfig[]} */
const config = [
  {
    files: ['**/*.ts'],
    ignores: ['node_modules/**', 'dist/**'],
    languageOptions: {
      parser: tsparser,
      sourceType: 'module',
      ecmaVersion: 2022,
    },
    plugins: {
      '@typescript-eslint': tseslint,
    },
    rules: {
      // parity with previous .eslintrc.json
      '@typescript-eslint/no-explicit-any': 'warn',
      '@typescript-eslint/no-unused-vars': [
        'error',
        { argsIgnorePattern: '^_' }
      ],
      // Prettier handled via plugin in editors; avoid forcing as ESLint error here
      'no-console': 'off',
    },
  },
];

export default config;


