import js from '@eslint/js';
import { FlatCompat } from '@eslint/eslintrc';
import eslintConfigPrettier from 'eslint-config-prettier';
import turboPlugin from 'eslint-plugin-turbo';
import importPlugin from 'eslint-plugin-import';
import tseslint from 'typescript-eslint';
import path from 'path';
import { fileURLToPath } from 'url';

const filename = fileURLToPath(import.meta.url);
const dirname = path.dirname(filename);

const compat = new FlatCompat({
  baseDirectory: dirname,
});

export const config = [
  js.configs.recommended,

  ...compat.extends('airbnb-base'),

  {
    plugins: {
      turbo: turboPlugin,
      import: importPlugin,
    },
    rules: {
      'turbo/no-undeclared-env-vars': 'warn',
      'import/prefer-default-export': 'off',
      'import/no-unresolved': 'off',
      'arrow-body-style': 'off',
      quotes: [
        'error',
        'single',
        {
          avoidEscape: true,
          allowTemplateLiterals: true,
        },
      ],
      'jsx-quotes': ['error', 'prefer-double'],
    },
  },

  {
    files: ['**/*.ts', '**/*.tsx'],
    languageOptions: {
      parser: tseslint.parser,
    },
    plugins: {
      '@typescript-eslint': tseslint.plugin,
    },
    rules: {
      ...tseslint.configs.recommended.rules,
      'no-unused-vars': 'off',
      '@typescript-eslint/no-unused-vars': [
        'error',
        {
          argsIgnorePattern: '^_',
          varsIgnorePattern: '^_',
        },
      ],
      'import/extensions': [
        'error',
        'ignorePackages',
        {
          ts: 'never',
          tsx: 'never',
          jsx: 'never',
        },
      ],
    },
  },

  eslintConfigPrettier,

  {
    ignores: [
      'dist/**',
      'node_modules/**',
      '**/*.js',
      '**/*.jsx',
      'JS/**',
    ],
  },
];