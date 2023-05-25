## just in case:

`pnpm i -D prettier eslint-config-prettier @typescript-eslint/eslint-plugin @typescript-eslint/parser eslint-import-resolver-typescript eslint-plugin-react eslint-plugin-import prettier-plugin-tailwindcss`

## `.eslintrc.json`

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

## with nextjs 13 and storybook 7 there's no need to do stuffs with `next/image`

## we might need `@tailwindcss/forms`:

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

## setting up Jest:

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
