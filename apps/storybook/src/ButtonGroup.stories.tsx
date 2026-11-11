import type { Meta, StoryObj } from "@storybook/react-vite";
import { Button, ButtonGroup } from "@darizae/marisma";

const meta = {
  title: "Components/Button Group",
  component: ButtonGroup,
  tags: ["autodocs"],
  args: { "aria-label": "Record actions" },
  argTypes: {
    orientation: { control: "select", options: ["horizontal", "vertical"] },
    attached: { control: "boolean" },
  },
  parameters: {
    docs: {
      description: {
        component:
          "A labeled semantic group that arranges native buttons without changing their normal Tab order or activation behavior.",
      },
    },
  },
} satisfies Meta<typeof ButtonGroup>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Actions: Story = {
  render: (args) => (
    <ButtonGroup {...args}>
      <Button variant="secondary">Edit</Button>
      <Button variant="secondary">Duplicate</Button>
      <Button variant="secondary">Archive</Button>
    </ButtonGroup>
  ),
};
