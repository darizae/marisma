import type { Meta, StoryObj } from "@storybook/react-vite";
import { Alert, Button } from "@darizae/marisma";

const meta = {
  title: "Components/Alert",
  component: Alert,
  tags: ["autodocs"],
  args: { children: "Tide readings were refreshed.", title: "Data is current" },
  argTypes: {
    variant: {
      control: "select",
      options: ["info", "success", "warning", "danger"],
    },
  },
  parameters: {
    docs: {
      description: {
        component:
          "A semantic live-region message with informational, success, warning, and danger treatments plus optional title, icon, and action.",
      },
    },
  },
} satisfies Meta<typeof Alert>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Variants: Story = {
  render: (args) => (
    <div className="grid w-full max-w-2xl gap-3">
      <Alert {...args} icon="ⓘ" variant="info" />
      <Alert title="Changes saved" variant="success">
        Your settings are ready.
      </Alert>
      <Alert title="Review needed" variant="warning">
        Two readings are incomplete.
      </Alert>
      <Alert
        action={
          <Button size="small" variant="secondary">
            Try again
          </Button>
        }
        title="Sync failed"
        variant="danger"
      >
        The server did not respond.
      </Alert>
    </div>
  ),
};
