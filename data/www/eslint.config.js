import js from "@eslint/js";
import configPrettier from "eslint-config-prettier";
import pluginJsxA11y from "eslint-plugin-jsx-a11y";
import pluginPrettier from "eslint-plugin-prettier";
import pluginReact from "eslint-plugin-react";
import pluginReactHooks from "eslint-plugin-react-hooks";
import globals from "globals";

export default [
  {
    files: ["**/*.{js,mjs,cjs,jsx}"],
    languageOptions: {
      ecmaVersion: "latest",
      sourceType: "module",
      globals: {
        ...globals.browser,
        ...globals.es2021,
      },
      parserOptions: {
        ecmaFeatures: {
          jsx: true,
        },
      },
    },
    plugins: {
      react: pluginReact,
      "react-hooks": pluginReactHooks,
      "jsx-a11y": pluginJsxA11y,
      prettier: pluginPrettier,
    },
    rules: {
      // ESLint recommended
      ...js.configs.recommended.rules,
      
      // React recommended
      ...pluginReact.configs.recommended.rules,
      ...pluginReact.configs["jsx-runtime"].rules,
      
      // React Hooks
      ...pluginReactHooks.configs.recommended.rules,
      
      // Accessibility
      ...pluginJsxA11y.configs.recommended.rules,
      
      // Prettier
      ...configPrettier.rules,
      "prettier/prettier": "warn",
      
      // React specific
      "react/react-in-jsx-scope": "off", // Not needed for React 17+
      "react/prop-types": "off", // If using TS or other validation
      "react/jsx-key": "error",
      "react/self-closing-comp": "warn",
      "react/jsx-boolean-value": "warn",
      
      // General cleanup
      "no-console": "warn",
      "no-unused-vars": ["warn", { 
        varsIgnorePattern: "^(React|motion)$",
        argsIgnorePattern: "^_"
      }],
      "no-duplicate-imports": "error",
      "prefer-const": "error",
      "eqeqeq": ["error", "always"],
      
      // React Hooks specific
      "react-hooks/rules-of-hooks": "error",
      "react-hooks/exhaustive-deps": "warn",
    },
    settings: {
      react: {
        version: "detect",
      },
    },
  },
];