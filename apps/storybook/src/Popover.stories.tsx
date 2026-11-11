import { useState } from "react";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { expect, userEvent, within } from "storybook/test";
import {
  Popover,
  PopoverClose,
  PopoverContent,
  PopoverTrigger,
} from "@darizae/marisma";

function FilterPopover() {
  const [open, setOpen] = useState(false);
  return (
    <Popover onOpenChange={setOpen} open={open}>
      <PopoverTrigger>Open filters</PopoverTrigger>
      <PopoverContent aria-label="Record filters">
        <h2 className="font-semibold">Record filters</h2>
        <p className="mt-2 text-sm text-mar-muted">
          Escape or outside interaction dismisses this non-modal surface.
        </p>
        <PopoverClose className="mt-4">Done</PopoverClose>
      </PopoverContent>
    </Popover>
  );
}

const meta = {
  title: "Components/Popover",
  component: FilterPopover,
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component:
          "A portalled Radix popover with controlled or uncontrolled open state, collision-aware positioning, Escape/outside dismissal, focus restoration, and nearest-subtree Marisma theme inheritance. Tab follows the non-modal document sequence.",
      },
    },
  },
} satisfies Meta<typeof FilterPopover>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Controlled: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const trigger = canvas.getByRole("button", { name: "Open filters" });
    await userEvent.click(trigger);
    const body = within(document.body);
    await expect(
      body.getByRole("dialog", { name: "Record filters" }),
    ).toBeVisible();
    await userEvent.keyboard("{Escape}");
    await expect(body.queryByRole("dialog")).not.toBeInTheDocument();
    await expect(trigger).toHaveFocus();
  },
};

export const SubtreeThemePortal: Story = {
  globals: { marismaAccent: "reedwater", marismaMode: "light" },
  render: () => (
    <div className="grid gap-6">
      <button
        className="min-h-11 rounded-lg border border-mar-border px-4"
        type="button"
      >
        Outside target
      </button>
      <div
        className="rounded-xl bg-mar-surface p-6 text-mar-text"
        data-marisma-accent="tidal-blue"
        data-marisma-mode="dark"
      >
        <FilterPopover />
      </div>
    </div>
  ),
};
