import { defineConfig, globalIgnores } from "eslint/config";
import nextCoreWebVitals from "eslint-config-next/core-web-vitals";
import prettierConfig from "eslint-config-prettier";

const eslintConfig = defineConfig([
  ...nextCoreWebVitals,
  prettierConfig,
  globalIgnores([".next/**", "out/**", "build/**", "next-env.d.ts"]),
]);

export default eslintConfig;
