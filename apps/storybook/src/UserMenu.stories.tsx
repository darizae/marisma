import { useState } from "react";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { expect, userEvent, within } from "storybook/test";
import { DropdownMenuItem, UserMenu } from "@darizae/marisma";

function UserMenuFixture() {
  const [status, setStatus] = useState("No action selected");

  return (
    <div className="grid justify-items-end gap-4">
      <UserMenu description="ada@example.test" name="Ada Lovelace">
        <DropdownMenuItem onSelect={() => setStatus("Profile selected")}>
          Profile
        </DropdownMenuItem>
        <DropdownMenuItem onSelect={() => setStatus("Settings selected")}>
          Settings
        </DropdownMenuItem>
        <DropdownMenuItem
          onSelect={() => setStatus("Sign out selected")}
          variant="danger"
        >
          Sign out
        </DropdownMenuItem>
      </UserMenu>
      <p aria-live="polite" className="text-sm text-mar-muted">
        {status}
      </p>
    </div>
  );
}

const meta = {
  title: "Page patterns/UserMenu",
  component: UserMenuFixture,
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component:
          "A composed identity trigger and accessible dropdown. Identity, menu actions, auth/session state, navigation, and async behavior are always supplied by the caller.",
      },
    },
  },
} satisfies Meta<typeof UserMenuFixture>;

export default meta;
type Story = StoryObj<typeof meta>;

export const CallerOwnedActions: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await userEvent.click(
      canvas.getByRole("button", { name: "Open user menu for Ada Lovelace" }),
    );
    const body = within(document.body);
    await userEvent.click(
      await body.findByRole("menuitem", { name: "Profile" }),
    );
    await expect(canvas.getByText("Profile selected")).toBeVisible();
  },
};
