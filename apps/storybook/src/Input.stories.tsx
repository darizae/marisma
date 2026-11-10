import { useState } from "react";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { expect, userEvent, within } from "storybook/test";
import { Input } from "@darizae/marisma";

const meta = {
  title: "Components/Input",
  component: Input,
  tags: ["autodocs"],
  args: {
    label: "Project name",
  },
  argTypes: {
    label: { control: "text" },
    description: { control: "text" },
    error: { control: "text" },
    disabled: { control: "boolean" },
    placeholder: { control: "text" },
  },
  parameters: {
    docs: {
      description: {
        component:
          "A labeled native input supporting controlled or uncontrolled values, supporting text, validation text, native input props, and forwarded refs.",
      },
    },
  },
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
  parameters: {
    docs: {
      description: {
        story:
          "Tab into each field to edit it. Description and error text are both included in the invalid field's accessible description.",
      },
    },
  },
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
  globals: { marismaAccent: "tidal-blue", marismaMode: "dark" },
};
