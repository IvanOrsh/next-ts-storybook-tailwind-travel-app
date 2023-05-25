import type { Meta, StoryObj } from "@storybook/react";

import { UserAvatar } from "./UserAvatar";

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction
const meta: Meta<typeof UserAvatar> = {
  component: UserAvatar,
  tags: ["autodocs"],
  argTypes: {
    darkMode: false,
  },
};

export default meta;
type Story = StoryObj<typeof UserAvatar>;

// More on writing stories with args: https://storybook.js.org/docs/react/writing-stories/args
export const Default: Story = {};
