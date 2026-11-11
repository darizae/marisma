import { useState } from "react";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { expect, userEvent, within } from "storybook/test";
import { Checkbox } from "@darizae/marisma";

const meta = {
  title: "Components/Checkbox",
  component: Checkbox,
  tags: ["autodocs"],
  args: { label: "Include archived records" },
  parameters: {
    docs: {
      description: {
        component:
          "A labeled Radix checkbox with checked, unchecked, indeterminate, controlled, uncontrolled, disabled, read-only, description, and error states. Space toggles it when editable.",
      },
    },
  },
} satisfies Meta<typeof Checkbox>;

export default meta;
type Story = StoryObj<typeof meta>;

function StatesFixture() {
  const [controlled, setControlled] = useState(false);
  return (
    <div className="grid gap-4">
      <Checkbox
        defaultChecked="indeterminate"
        description="The mixed state means only some visible records are included."
        label="All visible records"
      />
      <Checkbox
        checked={controlled}
        label="Controlled selection"
        onCheckedChange={(checked) => setControlled(checked === true)}
      />
      <Checkbox defaultChecked label="Read-only selection" readOnly />
      <Checkbox disabled label="Disabled selection" />
      <Checkbox error="Confirm this choice." label="Invalid selection" />
    </div>
  );
}

export const States: Story = {
  render: () => <StatesFixture />,
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const mixed = canvas.getByRole("checkbox", { name: "All visible records" });
    await expect(mixed).toHaveAttribute("data-state", "indeterminate");
    await userEvent.click(mixed);
    await expect(mixed).toBeChecked();
    const readOnly = canvas.getByRole("checkbox", {
      name: "Read-only selection",
    });
    await userEvent.click(readOnly);
    await expect(readOnly).toBeChecked();
  },
};

export const TidalBlueDark: Story = {
  args: {
    defaultChecked: true,
    description: "Theme toolbar remains available.",
  },
  globals: { marismaAccent: "tidal-blue", marismaMode: "dark" },
};
