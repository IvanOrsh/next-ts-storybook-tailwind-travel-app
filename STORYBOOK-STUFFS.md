Storybook and TS: How to write stories

# 1. Overview

- Story captures the rendered state of a UI component
- Example: `Button.stories.js | ts | jsx | tsx`

# 2 Component Story Format (CSF)

- Recommended way to write stories
- Every component story file consists of a required default export and one or more named exports.

## 2.1 Default Export

- The default export defines metadata about your component, including the **component** itself, its **title** (where it will show up in the navigation UI story hierarchy), **decorators** and **parameters**.
  - The **component** field is REQUIRED and used by addons for automatic props table generation and display of other component metadata.
  - The **title** field is OPTIONAL and should be unique

```tsx
import type { Meta } from '@storybook/your-framework';

import { MyComponent } from './MyComponent';

const meta: Meta<typeof MyComponent> = {
  title: 'Path/To/MyComponent',
  component: MyComponent,
  decorators: [ ... ],
  parameters: { ... },
};

export default meta;
```

## 2.2 Named Story Exports

- With CSF, every named export in the file represents a story object by default.

```tsx
import type { Meta, StoryObj } from "@storybook/react";

import { MyComponent } from "./MyComponent";

const meta: Meta<typeof MyComponent> = {
  title: "Path/To/MyComponent",
  component: MyComponent,
};

export default meta;
type Story = StoryObj<typeof MyComponent>;

export const Basic: Story = {};

export const WithProp: Story = {
  render: () => <MyComponent prop="value" />,
};
```

- It's recommended to start all export names with a capital letter

---

```jsx
import type { Meta, StoryObj } from "@storybook/react";

import { action } from "@storybook/addon-actions";

import { Button } from "./Button";

const meta: Meta<typeof Button> = {
  title: "Button",
  component: Button,
};

export default meta;
type Story = StoryObj<typeof Button>;

export const Text = {
  args: {
    label: "Hello",
    onClick: action("clicked"),
  },
  render: ({ label, onClick }) => <Button label={label} onClick={onClick} />,
};
```

## 2.3 Play Function

- Play functions are small snippets of code executed when the story renders in the UI.
- A good use case - a **form container**.

```tsx
import type { Meta, StoryObj } from "@storybook/react";

import { within, userEvent } from "@storybook/testing-library";

import { expect } from "@storybook/jest";

import { LoginForm } from "./LoginForm";

const meta: Meta<typeof LoginForm> = {
  title: "Form",
  component: LoginForm,
};

export default meta;
type Story = StoryObj<typeof LoginForm>;

export const EmptyForm: Story = {};

export const FilledForm: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // 👇 Simulate interactions with the component
    await userEvent.type(canvas.getByTestId("email"), "email@provider.com");

    await userEvent.type(canvas.getByTestId("password"), "a-random-password");

    // See https://storybook.js.org/docs/react/essentials/actions#automatically-matching-args to learn how to setup logging in the Actions panel
    await userEvent.click(canvas.getByRole("button"));

    // 👇 Assert DOM structure
    await expect(
      canvas.getByText(
        "Everything is perfect. Your account is ready and we should probably get you started!"
      )
    ).toBeInTheDocument();
  },
};
```

## 2.4 Custom `render` Function

- `render` functions are helpful methods to give us additional control over how the story renders.

```tsx
import type { Meta, StoryObj } from "@storybook/react";

import { Layout } from "./Layout";

import { MyComponent } from "./MyComponent";

const meta: Meta<typeof MyComponent> = {
  title: "MyComponent",
  component: MyComponent,
};

export default meta;
type Story = StoryObj<typeof MyComponent>;

// This story uses a render function to fully control how the component renders.
export const Example: Story = {
  render: () => (
    <Layout>
      <header>
        <h1>Example</h1>
      </header>
      <article>
        <MyComponent />
      </article>
    </Layout>
  ),
};
```

## 2.5 Storybook export vs. name handling

- Storybook handles named exports and the name option slightly differently. When should you use one vs. the other?

- Storybook will **always use the named export to determine the story ID and URL**.

- If you specify the name option, it will be used as the story display name in the UI. Otherwise, it defaults to the named export, processed through Storybook's storyNameFromExport and lodash.startCase functions.

```js
it("should format CSF exports with sensible defaults", () => {
  const testCases = {
    name: "Name",
    someName: "Some Name",
    someNAME: "Some NAME",
    some_custom_NAME: "Some Custom NAME",
    someName1234: "Some Name 1234",
    someName1_2_3_4: "Some Name 1 2 3 4",
  };
  Object.entries(testCases).forEach(([key, val]) => {
    expect(storyNameFromExport(key)).toBe(val);
  });
});
```

- When you want to change the name of your story, rename the CSF export. It will change the name of the story and also change the story's ID and URL.

- It would be best if you used the name configuration element in the following cases:
  - You want the name to show up in the Storybook UI in a way that's not possible with a named export, e.g., reserved keywords like "default", special characters like emoji, spacing/capitalization other than what's provided by storyNameFromExport.
  - You want to preserve the Story ID independently from changing how it's displayed. Having stable Story IDs is helpful for integration with third-party tools.

## 2.6 Non-story Exports

- In some cases, you may want to export a mixture of stories and non-stories (e.g., mocked data).

- You can use the optional configuration fields includeStories and `excludeStories` in the default export to make this possible. You can define them as an array of strings or regular expressions.

```tsx
import type { Meta, StoryObj } from "@storybook/react";

import { MyComponent } from "./MyComponent";

import someData from "./data.json";

const meta: Meta<typeof MyComponent> = {
  title: "MyComponent",
  component: MyComponent,
  includeStories: ["SimpleStory", "ComplexStory"], // 👈 Storybook loads these stories
  excludeStories: /.*Data$/, // 👈 Storybook ignores anything that contains Data
};

export default meta;
type Story = StoryObj<typeof MyComponent>;

export const simpleData = { foo: 1, bar: "baz" };
export const complexData = { foo: 1, foobar: { bar: "baz", baz: someData } };

export const SimpleStory: Story = {
  args: {
    data: simpleData,
  },
};

export const ComplexStory: Story = {
  args: {
    data: complexData,
  },
};
```

- For this particular example, you could achieve the same result in different ways, depending on what's convenient:

- `includeStories: /^[A-Z]/`
- `includeStories: /.*Story$/`
- `includeStories: ['SimpleStory', 'ComplexStory']`
- `excludeStories: /^[a-z]/`
- `excludeStories: /.*Data$/`
- `excludeStories: ['simpleData', 'complexData']`

## 2.7 Upgrading from CSF 2 to CSF 3

- In CSF 2, the named exports are always functions that instantiate a component, and those functions can be annotated with configuration options. For example:

```tsx
// CSF 2
import { ComponentStory, ComponentMeta } from "@storybook/react";

import { Button } from "./Button";

export default {
  title: "Button",
  component: Button,
} as ComponentMeta<typeof Button>;

export const Primary: ComponentStory<typeof Button> = (args) => (
  <Button {...args} />
);
Primary.args = { primary: true };
```

- This declares a Primary story for a Button that renders itself by spreading `{ primary: true }` into the component. The `default.title` metadata says where to place the story in a navigation hierarchy.

---

```tsx
// CSF 3
import type { Meta, StoryObj } from "@storybook/react";

import { Button } from "./Button";

const meta: Meta<typeof Button> = { component: Button };
export default meta;

type Story = StoryObj<typeof Button>;

export const Primary: Story = { args: { primary: true } };
```

Let's go through the changes individually to understand what's going on.

### 2.7.1 Spreadable story objects

- In CSF 3, the named exports are objects, not functions. This allows us to reuse stories more efficiently with the JS spread operator.

- Consider the following addition to the intro example, which creates a `PrimaryOnDark` story that renders against a dark background:

```tsx
// CSF 2
export const PrimaryOnDark = Primary.bind({});
PrimaryOnDark.args = Primary.args;
PrimaryOnDark.parameters = { background: { default: "dark" } };
```

- `Primary.bind({})` copies the story function, but it doesn't copy the annotations hanging off the function, so we must add `PrimaryOnDark.args = Primary.args` to inherit the args.

<br>

- In CSF 3, we can spread the Primary object to carry over all its annotations:

```tsx
// CSF 3
export const PrimaryOnDark: Story = {
  ...Primary,
  parameters: { background: { default: "dark" } },
};
```

### 2.7.2 Default render functions

- In CSF 3, you specify how a story renders through a render function. We can rewrite a CSF 2 example to CSF 3 through the following steps.

```tsx
// CSF 2
// Other imports and story implementation

export const Default: ComponentStory<typeof Button> = (args) => (
  <Button {...args} />
);
```

---

```tsx
// CSF 3 - explicit render function
// Other imports and story implementation

export const Default: Story = {
  render: (args) => <Button {...args} />,
};
```

- But in CSF 2, a lot of story functions are identical: take the component specified in the default export and spread args into it. What's interesting about these stories is not the function, but the args passed into the function.

- CSF 3 provides default render functions for each renderer. If all you're doing is spreading args into your component—which is the most common case—you don't need to specify any render function at all:

// CSF 3 - default render function

```tsx
export const Default = {};
```

### 2.7.3 Generate titles automatically

```tsx
// CSF 2
export default {
  title: "components/Button",
  component: Button,
};
```

```tsx
// CSF 3
export default { component: Button };
```

# 3. How to Write Stories

## 3.1 Example with React Hooks

```tsx
// Button.stories.ts|tsx

import React, { useState } from "react";
import { Meta, StoryObj } from "@storybook/react";

import { Button } from "./Button";

const meta: Meta<typeof Button> = {
  title: "Button",
  component: Button,
};
export default meta;

type Story = StoryObj<typeof Button>;

/*
 * Example Button story with React Hooks.
 * See note below related to this example.
 */
const ButtonWithHooks = () => {
  // Sets the hooks for both the label and primary props
  const [value, setValue] = useState("Secondary");
  const [isPrimary, setIsPrimary] = useState(false);

  // Sets a click handler to change the label's value
  const handleOnChange = () => {
    if (!isPrimary) {
      setIsPrimary(true);
      setValue("Primary");
    }
  };
  return <Button primary={isPrimary} onClick={handleOnChange} label={value} />;
};

export const Primary: Story = {
  render: () => <ButtonWithHooks />,
};
```

## 3.2 Using args

- Using `args` reduces the boilerplate code we'll need to write and maintain for each story

```tsx
// Button.stories.ts|tsx
import type { Meta, StoryObj } from "@storybook/react";

import { Button } from "./Button";

const meta: Meta<typeof Button> = {
  title: "Button",
  component: Button,
};

export default meta;
type Story = StoryObj<typeof Button>;

export const Primary: Story = {
  args: {
    backgroundColor: "#ff0",
    label: "Button",
  },
};

export const Secondary: Story = {
  args: {
    ...Primary.args,
    label: "😄👍😍💯",
  },
};

export const Tertiary: Story = {
  args: {
    ...Primary.args,
    label: "📚📕📈🤓",
  },
};
```

## 3.3 Using the play function

```tsx
// LoginForm.stories.ts|tsx
import type { Meta, StoryObj } from "@storybook/react";

import { within, userEvent } from "@storybook/testing-library";

import { expect } from "@storybook/jest";

import { LoginForm } from "./LoginForm";

const meta: Meta<typeof LoginForm> = {
  title: "Form",
  component: LoginForm,
};

export default meta;
type Story = StoryObj<typeof LoginForm>;

export const EmptyForm: Story = {};

export const FilledForm: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // 👇 Simulate interactions with the component
    await userEvent.type(canvas.getByTestId("email"), "email@provider.com");

    await userEvent.type(canvas.getByTestId("password"), "a-random-password");

    await userEvent.click(canvas.getByRole("button"));

    // 👇 Assert DOM structure
    await expect(
      canvas.getByText(
        "Everything is perfect. Your account is ready and we should probably get you started!"
      )
    ).toBeInTheDocument();
  },
};
```

## 3.4 Using parameters

- Parameters are Storybook’s method of defining static metadata for stories. A story’s parameters can be used to provide configuration to various addons at the level of a story or group of stories.

```tsx
// Button.stories.ts|tsx
import type { Meta } from "@storybook/react";

import { Button } from "./Button";

const meta: Meta<typeof Button> = {
  title: "Button",
  component: Button,
  //👇 Creates specific parameters for the story
  parameters: {
    backgrounds: {
      values: [
        { name: "red", value: "#f00" },
        { name: "green", value: "#0f0" },
        { name: "blue", value: "#00f" },
      ],
    },
  },
};

export default meta;
```

## 3.5 Using decorators

- Decorators are a mechanism to wrap a component in arbitrary markup when rendering a story. Components are often created with assumptions about ‘where’ they render. Your styles might expect a theme or layout wrapper, or your UI might expect specific context or data providers.

```tsx
// Button.stories.ts|tsx
import type { Meta, StoryObj } from "@storybook/react";

import { Button } from "./Button";

const meta: Meta<typeof Button> = {
  title: "Button",
  component: Button,
  decorators: [
    (Story) => (
      <div style={{ margin: "3em" }}>
        {/* 👇 Decorators in Storybook also accept a function. Replace <Story/> with Story() to enable it  */}
        <Story />
      </div>
    ),
  ],
};

export default meta;
```
