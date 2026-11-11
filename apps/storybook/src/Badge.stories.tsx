import type { Meta, StoryObj } from "@storybook/react-vite";
import { Badge } from "@darizae/marisma";

const meta = {
  title: "Components/Badge",
  component: Badge,
  tags: ["autodocs"],
  args: { children: "Ready" },
  argTypes: {
    variant: {
      control: "select",
      options: ["neutral", "info", "success", "warning", "danger"],
    },
  },
  parameters: {
    docs: {
      description: {
        component:
          "A compact text status. Keep a meaningful word or symbol in the badge so state is never communicated by color alone.",
      },
    },
  },
} satisfies Meta<typeof Badge>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Statuses: Story = {
  render: () => (
    <div className="flex flex-wrap gap-3">
      <Badge>Draft</Badge>
      <Badge variant="info">In review</Badge>
      <Badge variant="success">Ready</Badge>
      <Badge variant="warning">Needs attention</Badge>
      <Badge variant="danger">Failed</Badge>
    </div>
  ),
};
