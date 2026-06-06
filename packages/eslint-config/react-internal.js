import { FlatCompat } from '@eslint/eslintrc';
import pluginReact from 'eslint-plugin-react';
import pluginReactHooks from 'eslint-plugin-react-hooks';
import globals from 'globals';
import path from 'path';
import { fileURLToPath } from 'url';

import { config as baseConfig } from './base.js';

const filename = fileURLToPath(import.meta.url);
const dirname = path.dirname(filename);

const compat = new FlatCompat({
  baseDirectory: dirname,
});

export const reactConfig = [
  ...baseConfig,

  ...compat.extends('airbnb'),

  {
    ...pluginReact.configs.flat.recommended,

    languageOptions: {
      ...pluginReact.configs.flat.recommended.languageOptions,
      globals: {
        ...globals.browser,
      },
    },

    plugins: {
      react: pluginReact,
      'react-hooks': pluginReactHooks,
    },

    settings: {
      react: {
        version: 'detect',
      },
    },

    rules: {
      ...pluginReactHooks.configs.recommended.rules,

      'react/react-in-jsx-scope': 'off',

      'react/jsx-filename-extension': [
        'error',
        {
          extensions: ['.jsx', '.tsx'],
        },
      ],

      'react/jsx-props-no-spreading': 'off',

      'react/require-default-props': 'off',

      'react/prop-types': 'off',

      'import/extensions': [
        'error',
        'ignorePackages',
        {
          jsx: 'never',
          tsx: 'never',
        },
      ],
    },
  },
];