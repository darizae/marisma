import type { Meta, StoryObj } from "@storybook/react-vite";
import { Separator } from "@darizae/marisma";

const meta = {
  title: "Components/Separator",
  component: Separator,
  tags: ["autodocs"],
  args: { decorative: true, orientation: "horizontal" },
  parameters: {
    docs: {
      description: {
        component:
          "A decorative divider by default. Set decorative=false only when the separator conveys document structure.",
      },
    },
  },
} satisfies Meta<typeof Separator>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Orientations: Story = {
  render: () => (
    <div className="grid gap-6">
      <div className="grid gap-3">
        <span>Overview</span>
        <Separator />
        <span>Details</span>
      </div>
      <div className="flex h-10 items-center gap-3">
        <span>Left</span>
        <Separator orientation="vertical" />
        <span>Right</span>
      </div>
    </div>
  ),
};
