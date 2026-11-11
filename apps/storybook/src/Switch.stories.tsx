import { useState } from "react";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { expect, userEvent, within } from "storybook/test";
import { Switch } from "@darizae/marisma";

const meta = {
  title: "Components/Switch",
  component: Switch,
  tags: ["autodocs"],
  args: { label: "Tide alerts" },
  parameters: {
    docs: {
      description: {
        component:
          "An immediate-setting switch. Space toggles it; controlled and uncontrolled ownership are supported, while read-only remains focusable and disabled does not.",
      },
    },
  },
} satisfies Meta<typeof Switch>;

export default meta;
type Story = StoryObj<typeof meta>;

function StatesFixture() {
  const [controlled, setControlled] = useState(true);
  return (
    <div className="grid gap-4">
      <Switch defaultChecked={false} label="Uncontrolled alerts" />
      <Switch
        checked={controlled}
        description="The caller owns this setting."
        label="Controlled alerts"
        onCheckedChange={setControlled}
      />
      <Switch defaultChecked label="Read-only alerts" readOnly />
      <Switch disabled label="Unavailable alerts" />
    </div>
  );
}

export const States: Story = {
  render: () => <StatesFixture />,
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const uncontrolled = canvas.getByRole("switch", {
      name: "Uncontrolled alerts",
    });
    await userEvent.click(uncontrolled);
    await expect(uncontrolled).toBeChecked();
  },
};

export const TidalBlueDark: Story = {
  args: { defaultChecked: true, description: "A persistent setting." },
  globals: { marismaAccent: "tidal-blue", marismaMode: "dark" },
};
