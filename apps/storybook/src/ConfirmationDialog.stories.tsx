import { useState } from "react";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { expect, userEvent, within } from "storybook/test";
import { ConfirmationDialog } from "@darizae/marisma";

function ConfirmationFixture() {
  const [open, setOpen] = useState(false);
  const [pending, setPending] = useState(false);
  const [status, setStatus] = useState("Station retained");

  return (
    <div className="grid justify-items-start gap-3">
      <ConfirmationDialog
        closeOnConfirm={false}
        description="This removes the station from the caller-owned list."
        destructive
        onConfirm={() => {
          setPending(true);
          window.setTimeout(() => {
            setPending(false);
            setOpen(false);
            setStatus("Station removed by caller");
          }, 250);
        }}
        onOpenChange={setOpen}
        open={open}
        pending={pending}
        title="Remove station?"
        trigger="Remove station"
      />
      <p aria-live="polite" className="text-sm text-mar-muted">
        {status}
      </p>
    </div>
  );
}

const meta = {
  title: "Forms/Confirmation Dialog",
  component: ConfirmationFixture,
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component:
          "A confirmation composition over Dialog. Cancel and Escape close and restore trigger focus while idle; outside clicks never confirm. During caller-controlled pending work both actions and Escape are disabled, preventing repeated confirmation.",
      },
    },
  },
} satisfies Meta<typeof ConfirmationFixture>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Manual: Story = {};

export const PendingAndFocus: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const trigger = canvas.getByRole("button", { name: "Remove station" });
    await userEvent.click(trigger);
    const body = within(document.body);
    await userEvent.click(body.getByRole("button", { name: "Confirm" }));
    await expect(body.getByRole("button", { name: "Working…" })).toBeDisabled();
    await expect(
      canvas.findByText("Station removed by caller"),
    ).resolves.toBeVisible();
    await expect(trigger).toHaveFocus();
  },
};
