import { useState } from "react";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { expect, userEvent, within } from "storybook/test";
import { ToggleGroup, ToggleGroupItem } from "@darizae/marisma";

function ToggleGroups() {
  const [alignment, setAlignment] = useState("left");
  return (
    <div className="grid gap-6">
      <ToggleGroup
        aria-label="Alignment"
        onValueChange={setAlignment}
        type="single"
        value={alignment}
      >
        <ToggleGroupItem value="left">Left</ToggleGroupItem>
        <ToggleGroupItem value="center">Center</ToggleGroupItem>
        <ToggleGroupItem value="right">Right</ToggleGroupItem>
      </ToggleGroup>
      <ToggleGroup
        aria-label="Text styles"
        defaultValue={["bold"]}
        type="multiple"
      >
        <ToggleGroupItem value="bold">Bold</ToggleGroupItem>
        <ToggleGroupItem value="italic">Italic</ToggleGroupItem>
      </ToggleGroup>
    </div>
  );
}

const meta = {
  title: "Components/Toggle Group",
  component: ToggleGroups,
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component:
          "Single and multiple Radix toggle groups with roving focus. Arrow keys move between enabled items; Space or Enter toggles the focused item. Controlled, uncontrolled, disabled, horizontal/vertical, and read-only modes are supported.",
      },
    },
  },
} satisfies Meta<typeof ToggleGroups>;

export default meta;
type Story = StoryObj<typeof meta>;

export const SingleAndMultiple: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const left = canvas.getByRole("radio", { name: "Left" });
    left.focus();
    await userEvent.keyboard("{ArrowRight}{Enter}");
    await expect(canvas.getByRole("radio", { name: "Center" })).toHaveAttribute(
      "data-state",
      "on",
    );
  },
};

export const TidalBlueDark: Story = {
  globals: { marismaAccent: "tidal-blue", marismaMode: "dark" },
};
