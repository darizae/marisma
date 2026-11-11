import type { Meta, StoryObj } from "@storybook/react-vite";
import { Avatar } from "@darizae/marisma";

const meta = {
  title: "Components/Avatar",
  component: Avatar,
  tags: ["autodocs"],
  args: { alt: "Ada Lovelace", fallback: "AL" },
  argTypes: {
    size: { control: "select", options: ["small", "default", "large"] },
  },
  parameters: {
    docs: {
      description: {
        component:
          "A circular image with an accessible text fallback when the source is absent or fails to load.",
      },
    },
  },
} satisfies Meta<typeof Avatar>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Fallbacks: Story = {
  render: (args) => (
    <div className="flex items-center gap-4">
      <Avatar {...args} size="small" />
      <Avatar
        {...args}
        size="default"
        src="/intentionally-missing-avatar.png"
      />
      <Avatar {...args} size="large" />
    </div>
  ),
};
