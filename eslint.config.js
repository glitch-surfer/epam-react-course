import js from "@eslint/js";
import globals from "globals";
import reactHooks from "eslint-plugin-react-hooks";
import reactRefresh from "eslint-plugin-react-refresh";
import tseslint from "typescript-eslint";
import reactx from "eslint-plugin-react-x";
import reactDom from "eslint-plugin-react-dom";
import react from "eslint-plugin-react";
import eslintConfigPrettier from "eslint-config-prettier/flat";
import pluginJest from "eslint-plugin-jest";

export default tseslint.config(
  {
    ignores: [
      "dist",
      "**/*.test.{ts,tsx,js,jsx}",
      "**/*.stories.{ts,tsx,js,jsx}",
      ".storybook/**/*",
      "setupTests.ts",
    ],
  },
  {
    extends: [
      js.configs.recommended,
      ...tseslint.configs.strictTypeChecked,
      ...tseslint.configs.stylisticTypeChecked,
      reactx.configs.recommended,
      reactDom.configs.recommended,
      eslintConfigPrettier,
    ],
    files: ["**/*.{ts,tsx}"],
    languageOptions: {
      ecmaVersion: 2020,
      globals: globals.browser,
      parserOptions: {
        project: ["./tsconfig.node.json", "./tsconfig.app.json"],
        tsconfigRootDir: import.meta.dirname,
      },
    },
    plugins: {
      "react-hooks": reactHooks,
      "react-refresh": reactRefresh,
      react,
      pluginJest,
    },
    rules: {
      ...reactHooks.configs.recommended.rules,
      "@typescript-eslint/no-confusing-void-expression": "off",
      "@typescript-eslint/no-non-null-assertion": "off",
      ...react.configs.recommended.rules,
      ...react.configs["jsx-runtime"].rules,
      "react/no-unescaped-entities": "off",
      "@typescript-eslint/consistent-type-definitions": "off",
      "react-dom/no-missing-button-type": "off",
    },
    settings: { react: { version: "19.0" } },
  },
);
