import { nextJsConfig } from '@repo/eslint-config/next-js';

/** @type {import("eslint").Linter.Config} */

export default [
  {
    ignores: [
      '.next/**',
      'node_modules/**',
      'dist/**',
      'build/**',
      '**/*.d.ts',
    ],
  },
  ...nextJsConfig,
  {
    rules: {
      'import/no-extraneous-dependencies': 'off',
      'import/extensions': 'off',
      '@typescript-eslint/no-unused-expressions': 'off',
      'no-unused-expressions': 'off',
      'arrow-body-style': 'off',
      'no-console': 'off',
      'object-shorthand': 'off',
      'no-param-reassign': 'off',
      'turbo/no-undeclared-env-vars': 'off',
      '@typescript-eslint/no-unused-vars': 'off',
      'react-hooks/rules-of-hooks': 'off',
      'react/no-unknown-property': 'off',
      'no-underscore-dangle': 'off',
      'no-else-return': 'off',
      'react/no-unescaped-entities': 'off',
      'prefer-destructuring': 'off',
      'no-shadow': 'off',
      'consistent-return': 'off',
      '@typescript-eslint/no-explicit-any': 'off',
      'no-restricted-globals': 'off',
      'no-nested-ternary': 'off',
    },
  },
];
