import type { Meta, StoryObj } from "@storybook/react-vite";
import { Label } from "@darizae/marisma";

const meta = {
  title: "Components/Label",
  component: Label,
  tags: ["autodocs"],
  args: { children: "Station name", htmlFor: "station-name" },
  parameters: {
    docs: {
      description: {
        component:
          "A styled native label. Set htmlFor to the matching form-control id for programmatic association.",
      },
    },
  },
} satisfies Meta<typeof Label>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Association: Story = {
  render: (args) => (
    <div className="grid w-full max-w-sm gap-2">
      <Label {...args} />
      <input
        className="min-h-11 rounded-lg border border-mar-border bg-mar-card px-3"
        id="station-name"
      />
    </div>
  ),
};
