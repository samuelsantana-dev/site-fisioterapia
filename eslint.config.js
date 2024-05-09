import globals from "globals";
import pluginJs from "@eslint/js";
import { recommended as typescriptEslintRecommended } from "@typescript-eslint/eslint-plugin";
import { recommended as reactRecommended } from "eslint-plugin-react";

export default {
  overrides: [
    { files: ["**/*.js"], parserOptions: { sourceType: "script" } },
    { files: ["**/*.ts", "**/*.tsx"], parser: "@typescript-eslint/parser" },
  ],
  globals: globals.browser,
  ...pluginJs.configs.recommended,
  ...typescriptEslintRecommended,
  ...reactRecommended,
};
