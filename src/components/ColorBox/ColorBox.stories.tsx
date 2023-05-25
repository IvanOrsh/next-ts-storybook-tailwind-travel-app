import { StoryObj, Meta } from "@storybook/react";

import { colors, Figma } from "../../data";
import ColorBox from "./ColorBox";
import { StoryLayout } from "../layouts/StoryLayout";

type StoryColorsProps = {
  darkMode: boolean;
};

const StoryColors = (args: StoryColorsProps) => (
  <StoryLayout
    {...args}
    className="grid grid-cols-2 gap-4 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-11"
  >
    {colors.map((color) => (
      <ColorBox key={color.bgClass} color={color} />
    ))}
  </StoryLayout>
);

const meta: Meta<typeof ColorBox> = {
  title: "Colors",
  component: ColorBox,
  parameters: {
    controls: { expanded: true },
    design: {
      type: "figma",
      url: Figma.Colors,
    },
  },
};

export default meta;
type Story = StoryObj<typeof ColorBox>;

export const LightMode: Story = {
  render: () => <StoryColors darkMode={false} />,
};

export const DarkMode: Story = {
  render: () => <StoryColors darkMode={true} />,
};
