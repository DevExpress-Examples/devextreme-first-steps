import spellCheck from 'eslint-config-devextreme/spell-check';
import vueConfig from 'eslint-config-devextreme/vue';
import tsParser from '@typescript-eslint/parser';
import vueParser from 'vue-eslint-parser';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export default [
  { ignores: ['node_modules/**', 'dist/**', 'eslint.config.js', 'stylelint.config.mjs', '*.config.ts'] },
  ...spellCheck,
  ...vueConfig,
  {
    files: ['**/*.ts', '**/*.vue'],
    languageOptions: {
      parser: vueParser,
      parserOptions: {
        parser: tsParser,
        project: './tsconfig.app.json',
        tsconfigRootDir: __dirname,
        extraFileExtensions: ['.vue'],
      },
    },
  },
];
