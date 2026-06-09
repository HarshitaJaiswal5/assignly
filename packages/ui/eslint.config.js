import { config } from '@repo/eslint-config/base';

/** @type {import("eslint").Linter.Config} */
export default [
  ...config,
  {
    rules: {
      'import/extensions': 'off',
      'arrow-body-style': 'off',
      'import/no-extraneous-dependencies': 'off',
      'no-use-before-define': 'off',
      '@typescript-eslint/no-unused-vars': 'off',
    },
  },
];
