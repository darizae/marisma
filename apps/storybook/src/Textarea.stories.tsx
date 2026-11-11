import { useState } from "react";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { expect, userEvent, within } from "storybook/test";
import { Textarea } from "@darizae/marisma";

const meta = {
  title: "Components/Textarea",
  component: Textarea,
  tags: ["autodocs"],
  args: { label: "Field note" },
  parameters: {
    docs: {
      description: {
        component:
          "A labeled native textarea with resize, forwarded native props/ref, controlled and uncontrolled values, descriptions, errors, read-only, and disabled states. Native text-editing keyboard behavior is preserved.",
      },
    },
  },
} satisfies Meta<typeof Textarea>;

export default meta;
type Story = StoryObj<typeof meta>;

function OwnershipFixture() {
  const [value, setValue] = useState("Controlled note");
  return (
    <div className="grid gap-5">
      <Textarea defaultValue="Initial note" label="Uncontrolled note" />
      <Textarea
        description="The caller owns this value."
        label="Controlled note"
        onChange={(event) => setValue(event.currentTarget.value)}
        value={value}
      />
      <Textarea error="A note is required." label="Invalid note" />
      <Textarea label="Published note" readOnly value="Locked" />
    </div>
  );
}

export const OwnershipAndErrors: Story = {
  render: () => <OwnershipFixture />,
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const controlled = canvas.getByRole("textbox", { name: "Controlled note" });
    await userEvent.clear(controlled);
    await userEvent.type(controlled, "Updated");
    await expect(controlled).toHaveValue("Updated");
    await expect(
      canvas.getByRole("textbox", { name: "Invalid note" }),
    ).toHaveAttribute("aria-invalid", "true");
  },
};

export const TidalBlueDark: Story = {
  args: { defaultValue: "Theme toolbar remains available." },
  globals: { marismaAccent: "tidal-blue", marismaMode: "dark" },
};
