import { defineConfig, globalIgnores } from "eslint/config";
import nextTs from "eslint-config-next/typescript";

const eslintConfig = defineConfig([
  ...nextTs,
  // Override default ignores of eslint-config-next.
  globalIgnores([
    // Default ignores of eslint-config-next:
    ".next/**",
    "docs/**",
    "out/**",
    "build/**",
    "archive/**",
    "next-env.d.ts",
    "scripts/.tmp/**",
  ]),
]);

export default eslintConfig;
