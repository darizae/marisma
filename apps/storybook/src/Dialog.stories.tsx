import type { Meta, StoryObj } from "@storybook/react-vite";
import { expect, userEvent, within } from "storybook/test";
import {
  Button,
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogTitle,
  DialogTrigger,
  Input,
} from "@darizae/marisma";

function ProfileDialog() {
  return (
    <Dialog>
      <DialogTrigger>Open profile</DialogTrigger>
      <DialogContent>
        <DialogTitle>Edit profile</DialogTitle>
        <DialogDescription>
          Change the public name shown to your collaborators.
        </DialogDescription>
        <Input autoFocus defaultValue="Ada Lovelace" label="Display name" />
        <div className="flex justify-end gap-3 pt-2">
          <DialogClose>Cancel</DialogClose>
          <DialogClose asChild>
            <Button>Save changes</Button>
          </DialogClose>
        </div>
      </DialogContent>
    </Dialog>
  );
}

const meta = {
  title: "Components/Dialog",
  component: ProfileDialog,
  decorators: [
    (Story) => (
      <div
        className="min-w-80 rounded-xl bg-mar-surface p-8 font-mar-sans text-mar-text"
        data-marisma-accent="reedwater"
        data-marisma-mode="light"
      >
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof ProfileDialog>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const KeyboardAndFocus: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const trigger = canvas.getByRole("button", { name: "Open profile" });
    await userEvent.click(trigger);

    const body = within(document.body);
    const dialog = await body.findByRole("dialog", { name: "Edit profile" });
    await expect(dialog).toHaveAccessibleDescription(
      "Change the public name shown to your collaborators.",
    );
    await userEvent.tab();
    await expect(dialog.contains(document.activeElement)).toBe(true);
    await userEvent.keyboard("{Escape}");
    await expect(body.queryByRole("dialog")).not.toBeInTheDocument();
    await expect(trigger).toHaveFocus();
  },
};

export const TidalBlueDark: Story = {
  decorators: [
    (Story) => (
      <div data-marisma-accent="tidal-blue" data-marisma-mode="dark">
        <Story />
      </div>
    ),
  ],
};
