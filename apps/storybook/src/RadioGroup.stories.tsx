import { useState } from "react";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { expect, userEvent, within } from "storybook/test";
import { RadioGroup, RadioGroupItem } from "@darizae/marisma";

function AccentPicker() {
  const [value, setValue] = useState("reedwater");
  return (
    <RadioGroup
      description="Arrow keys move and select; Tab leaves the group."
      label="Accent family"
      onValueChange={setValue}
      value={value}
    >
      <RadioGroupItem label="Reedwater" value="reedwater" />
      <RadioGroupItem label="Tidal Blue" value="tidal-blue" />
      <RadioGroupItem disabled label="Archive gray" value="gray" />
    </RadioGroup>
  );
}

const meta = {
  title: "Components/Radio Group",
  component: AccentPicker,
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component:
          "A labeled Radix radio group. Arrow keys move selection according to orientation; Home/End and roving focus are supplied by Radix. Supports controlled, uncontrolled, disabled, required, invalid, and read-only groups.",
      },
    },
  },
} satisfies Meta<typeof AccentPicker>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Controlled: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const first = canvas.getByRole("radio", { name: "Reedwater" });
    first.focus();
    await userEvent.keyboard("{ArrowDown}");
    await expect(
      canvas.getByRole("radio", { name: "Tidal Blue" }),
    ).toBeChecked();
  },
};

export const TidalBlueDark: Story = {
  globals: { marismaAccent: "tidal-blue", marismaMode: "dark" },
};
