Testing out next, storybook, tailwind

## Eslint/Prettier:

`pnpm i -D prettier eslint-config-prettier @typescript-eslint/eslint-plugin @typescript-eslint/parser eslint-import-resolver-typescript eslint-plugin-react eslint-plugin-import prettier-plugin-tailwindcss`

## Setting up `.eslintrc.json`

```json
{
  "extends": [
    "eslint:recommended",
    "plugin:import/errors",
    "plugin:react/recommended",
    "plugin:react-hooks/recommended",
    "plugin:@typescript-eslint/recommended",
    "plugin:@typescript-eslint/recommended-requiring-type-checking",
    "plugin:storybook/recommended",
    "prettier"
  ],
  "rules": {
    "react/prop-types": 0,
    "react/react-in-jsx-scope": 0,
    "@typescript-eslint/no-empty-function": 0
  },
  "plugins": ["react", "import", "jsx-a11y", "@typescript-eslint"],
  "parser": "@typescript-eslint/parser",
  "parserOptions": {
    "ecmaVersion": 2022,
    "sourceType": "module",
    "project": "tsconfig.json",
    "ecmaFeatures": {
      "jsx": true
    }
  },
  "env": {
    "es6": true,
    "browser": true,
    "node": true
  },
  "settings": {
    "react": {
      "version": "detect"
    },
    "import/parsers": {
      "@typescript-eslint/parser": [".ts", ".tsx"]
    },
    "import/resolver": {
      "typescript": {
        "alwaysTryTypes": true,
        "project": "./"
      },
      "case-sensitive": false
    }
  }
}
```

## `npx storybook@latest init`

## With nextjs 13 and storybook 7 there's no need to do stuffs with `next/image`

## Might need `@tailwindcss/forms`:

1. `npm install -D @tailwindcss/forms`

2. in tailwind.config.js:

```js
// tailwind.config.js
module.exports = {
  theme: {
    // ...
  },
  plugins: [
    require("@tailwindcss/forms"),
    // ...
  ],
};
```

## Setting up Jest:

1. `npm install --save-dev jest jest-environment-jsdom @testing-library/react @testing-library/jest-dom`

2. `jest.config.mjs`

```js
const nextJest = require("next/jest");

const createJestConfig = nextJest({
  // Provide the path to your Next.js app to load next.config.js and .env files in your test environment
  dir: "./",
});

// Add any custom config to be passed to Jest
const customJestConfig = {
  setupFilesAfterEnv: ["<rootDir>/jest.setup.js"],
  testEnvironment: "jest-environment-jsdom",
};

// createJestConfig is exported this way to ensure that next/jest can load the Next.js config which is async
module.exports = createJestConfig(customJestConfig);
```

TODO: figure out, why `jest --watch` fails to run

## How to setup Tailwind CSS and Storybook

- Build Tailwind next to Storybook
- Provide Tailwind to stories
- Use Tailwind in your components
- Switch Tailwind themes in a click

1. `npm i -D @storybook/addon-styling` (postcss autoprefixer - already installed)

2. .storybook/main.js:

```js
module.exports = {
  addons: [
    "@storybook/addon-links",
    "@storybook/addon-essentials",
    "@storybook/addon-interactions",
    {
      name: "@storybook/addon-styling",
      options: {
        // Check out https://github.com/storybookjs/addon-styling/blob/main/docs/api.md
        // For more details on this addon's options.
        postCss: true,
      },
    },
  ],
  // snipped for brevity
};
```

3. provide tailwind.css for .storybook/preview.js:

```js
// .storybook/preview.js

import "../src/tailwind.css"; // replace with the name of your tailwind css file
```

4. also, in tailwind.config.js:

- dark mode
- purge

```js
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  // Toggle dark-mode based on data-mode="dark"
  darkMode: ["class", '[data-mode="dark"]'],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
    },
  },
  purge: ["./src/**/*.{js,jsx,ts,tsx}"], // THIS LINE !!!
  plugins: [require("@tailwindcss/forms")],
};
```

5. and then, in .storybook/preview.js:

```js
// .storybook/preview.js
import { withThemeByDataAttribute } from "@storybook/addon-styling";

/* snipped for brevity */

export const decorators = [
  withThemeByDataAttribute({
    themes: {
      light: "light",
      dark: "dark",
    },
    defaultTheme: "light",
    attributeName: "data-mode",
  }),
];
```
