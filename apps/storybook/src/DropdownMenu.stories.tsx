import { useState } from "react";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { expect, userEvent, within } from "storybook/test";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "@darizae/marisma";

function RecordMenu() {
  const [details, setDetails] = useState(true);
  const [density, setDensity] = useState("comfortable");
  return (
    <DropdownMenu>
      <DropdownMenuTrigger>Record actions</DropdownMenuTrigger>
      <DropdownMenuContent aria-label="Record actions">
        <DropdownMenuLabel>Actions</DropdownMenuLabel>
        <DropdownMenuItem>Edit record</DropdownMenuItem>
        <DropdownMenuCheckboxItem
          checked={details}
          onCheckedChange={setDetails}
        >
          Show details
        </DropdownMenuCheckboxItem>
        <DropdownMenuSub>
          <DropdownMenuSubTrigger>Move to</DropdownMenuSubTrigger>
          <DropdownMenuSubContent aria-label="Move destination">
            <DropdownMenuItem>Active shelf</DropdownMenuItem>
            <DropdownMenuItem>Archive shelf</DropdownMenuItem>
          </DropdownMenuSubContent>
        </DropdownMenuSub>
        <DropdownMenuSeparator />
        <DropdownMenuLabel>Density</DropdownMenuLabel>
        <DropdownMenuRadioGroup onValueChange={setDensity} value={density}>
          <DropdownMenuRadioItem value="comfortable">
            Comfortable
          </DropdownMenuRadioItem>
          <DropdownMenuRadioItem value="compact">Compact</DropdownMenuRadioItem>
        </DropdownMenuRadioGroup>
        <DropdownMenuSeparator />
        <DropdownMenuItem variant="danger">Delete record</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

const meta = {
  title: "Components/Dropdown Menu",
  component: RecordMenu,
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component:
          "A portalled Radix action menu with labels, groups, checkbox/radio items, nested submenus, and an explicit danger variant. Arrow keys navigate, Right Arrow opens a submenu, Enter/Space selects, Escape dismisses, and focus returns to the trigger. Destructive actions remain consumer-owned.",
      },
    },
  },
} satisfies Meta<typeof RecordMenu>;

export default meta;
type Story = StoryObj<typeof meta>;

export const NestedAndDestructive: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const trigger = canvas.getByRole("button", { name: "Record actions" });
    await userEvent.click(trigger);
    const body = within(document.body);
    await expect(
      body.getByRole("menuitem", { name: "Delete record" }),
    ).toHaveClass("text-mar-danger");
    await userEvent.keyboard("{Escape}");
    await expect(trigger).toHaveFocus();
  },
};

export const TidalBlueDark: Story = {
  globals: { marismaAccent: "tidal-blue", marismaMode: "dark" },
};
