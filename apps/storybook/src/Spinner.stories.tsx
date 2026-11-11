import type { Meta, StoryObj } from "@storybook/react-vite";
import { Spinner } from "@darizae/marisma";

const meta = {
  title: "Components/Spinner",
  component: Spinner,
  tags: ["autodocs"],
  args: { label: "Loading readings" },
  argTypes: {
    size: { control: "select", options: ["small", "default", "large"] },
  },
  parameters: {
    docs: {
      description: {
        component:
          "A reduced-motion-aware progress indicator. Provide label when it represents meaningful loading; omit it when nearby content already supplies the status.",
      },
    },
  },
} satisfies Meta<typeof Spinner>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Sizes: Story = {
  render: () => (
    <div className="flex items-center gap-4">
      <Spinner label="Loading small reading" size="small" />
      <Spinner label="Loading reading" />
      <Spinner label="Loading large reading" size="large" />
    </div>
  ),
};
