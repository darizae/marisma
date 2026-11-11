import { useState } from "react";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { expect, userEvent, within } from "storybook/test";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@darizae/marisma";

function StationDetails() {
  const [open, setOpen] = useState(false);
  return (
    <Collapsible onOpenChange={setOpen} open={open}>
      <CollapsibleTrigger>Station details</CollapsibleTrigger>
      <CollapsibleContent>
        Last sampled today. Keyboard focus remains on the trigger.
      </CollapsibleContent>
    </Collapsible>
  );
}

const meta = {
  title: "Components/Collapsible",
  component: StationDetails,
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component:
          "A controlled or uncontrolled Radix disclosure. Enter or Space toggles content; the trigger owns aria-expanded and remains in the ordinary Tab order.",
      },
    },
  },
} satisfies Meta<typeof StationDetails>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Controlled: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const trigger = canvas.getByRole("button", { name: "Station details" });
    await userEvent.click(trigger);
    await expect(trigger).toHaveAttribute("aria-expanded", "true");
    await expect(canvas.getByText(/Last sampled today/)).toBeVisible();
  },
};

export const TidalBlueDark: Story = {
  globals: { marismaAccent: "tidal-blue", marismaMode: "dark" },
};
