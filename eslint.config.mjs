import { dirname } from "path";
import { fileURLToPath } from "url";
import { FlatCompat } from "@eslint/eslintrc";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

const eslintConfig = [
  {
    ignores: ["src/http/api.ts"],
  },
  ...compat.extends("next/core-web-vitals", "next/typescript"),
  {
    // ignorePatterns: ["src/http/api.ts"],
    rules: {
     'react-hooks/rules-of-hooks': 'off',
      '@typescript-eslint/no-empty-object-type': 'off',
      'react-refresh/only-export-components': 'off',
      '@typescript-eslint/no-explicit-any': 'off',
      'no-constant-binary-expression': 'off',
      'react/display-name': 'off',
      '@typescript-eslint/ban-ts-comment': 'off',
    }
  }
];

export default eslintConfig;
