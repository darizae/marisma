import { useState } from "react";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { expect, userEvent, within } from "storybook/test";
import { Select } from "@darizae/marisma";

const options = [
  { group: "Coastal", label: "Reedwater", value: "reedwater" },
  { group: "Coastal", label: "Tidal Blue", value: "tidal-blue" },
  { disabled: true, group: "Archived", label: "Archive gray", value: "gray" },
] as const;

function SelectStates() {
  const [controlled, setControlled] = useState("reedwater");
  return (
    <div className="grid w-full max-w-md gap-5">
      <Select
        description="Single selection; typeahead is provided, search is not."
        label="Controlled accent"
        onValueChange={setControlled}
        options={options}
        value={controlled}
      />
      <Select
        defaultValue="tidal-blue"
        label="Uncontrolled accent"
        options={options}
      />
      <Select
        defaultValue="reedwater"
        error="Confirm this value."
        label="Invalid accent"
        options={options}
      />
      <Select
        defaultValue="reedwater"
        label="Read-only accent"
        options={options}
        readOnly
      />
    </div>
  );
}

const meta = {
  title: "Components/Select",
  component: SelectStates,
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component:
          "A labeled, single-value, non-searchable Radix Select. Arrow keys/typeahead navigate, Enter/Space opens or selects, Escape dismisses, and focus returns to the trigger. Supports controlled/uncontrolled values, groups, disabled options, required/invalid, read-only, empty, and portalled theme states. Multiple selection is not supported.",
      },
    },
  },
} satisfies Meta<typeof SelectStates>;

export default meta;
type Story = StoryObj<typeof meta>;

export const OwnershipAndStates: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const trigger = canvas.getByRole("combobox", { name: "Controlled accent" });
    await userEvent.click(trigger);
    const body = within(document.body);
    await expect(
      body.getByRole("option", { name: "Archive gray" }),
    ).toHaveAttribute("data-disabled");
    await userEvent.click(body.getByRole("option", { name: "Tidal Blue" }));
    await expect(trigger).toHaveTextContent("Tidal Blue");
  },
};

export const TidalBlueDark: Story = {
  globals: { marismaAccent: "tidal-blue", marismaMode: "dark" },
};
