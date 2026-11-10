import { useState } from "react";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { expect, userEvent, within } from "storybook/test";
import { Input } from "@darizae/marisma";

const meta = {
  title: "Components/Input",
  component: Input,
  args: {
    label: "Project name",
  },
  decorators: [
    (Story) => (
      <div
        className="w-96 max-w-full rounded-xl bg-mar-surface p-8 font-mar-sans text-mar-text"
        data-marisma-accent="reedwater"
        data-marisma-mode="light"
      >
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof Input>;

export default meta;
type Story = StoryObj<typeof meta>;

function OwnershipFixture() {
  const [controlled, setControlled] = useState("alpha");

  return (
    <div className="grid gap-6">
      <Input defaultValue="Initial value" label="Uncontrolled value" />
      <Input
        description="The caller owns this value."
        label="Controlled value"
        onChange={(event) => setControlled(event.currentTarget.value)}
        value={controlled}
      />
      <Input
        description="Use a name other developers recognize."
        error="Project name is required."
        label="Invalid value"
      />
    </div>
  );
}

export const OwnershipAndErrors: Story = {
  render: () => <OwnershipFixture />,
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const uncontrolled = canvas.getByRole("textbox", {
      name: "Uncontrolled value",
    });
    const controlled = canvas.getByRole("textbox", {
      name: "Controlled value",
    });
    const invalid = canvas.getByRole("textbox", { name: "Invalid value" });

    await userEvent.type(uncontrolled, " retained");
    await expect(uncontrolled).toHaveValue("Initial value retained");
    await userEvent.clear(controlled);
    await userEvent.type(controlled, "beta");
    await expect(controlled).toHaveValue("beta");
    await expect(invalid).toHaveAccessibleDescription(
      "Use a name other developers recognize. Project name is required.",
    );
    await expect(invalid).toHaveAttribute("aria-invalid", "true");
  },
};

export const TidalBlueDark: Story = {
  args: {
    defaultValue: "Marisma",
    description: "Visible and announced supporting text.",
  },
  decorators: [
    (Story) => (
      <div data-marisma-accent="tidal-blue" data-marisma-mode="dark">
        <Story />
      </div>
    ),
  ],
};
