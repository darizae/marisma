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
  type DialogTriggerProps,
} from "@darizae/marisma";

type ProfileDialogProps = {
  closeLabel: string;
  showCloseButton: boolean;
  triggerLabel: string;
  triggerVariant: NonNullable<DialogTriggerProps["variant"]>;
};

function ProfileDialog({
  closeLabel,
  showCloseButton,
  triggerLabel,
  triggerVariant,
}: ProfileDialogProps) {
  return (
    <Dialog>
      <DialogTrigger variant={triggerVariant}>{triggerLabel}</DialogTrigger>
      <DialogContent closeLabel={closeLabel} showCloseButton={showCloseButton}>
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
  tags: ["autodocs"],
  args: {
    closeLabel: "Close dialog",
    showCloseButton: true,
    triggerLabel: "Open profile",
    triggerVariant: "primary",
  },
  argTypes: {
    triggerVariant: {
      control: "select",
      options: ["primary", "secondary", "ghost"],
    },
    showCloseButton: { control: "boolean" },
    closeLabel: { control: "text" },
    triggerLabel: { control: "text" },
  },
  parameters: {
    docs: {
      description: {
        component:
          "A modal Radix dialog with a styled trigger, overlay, content, title, description, and close controls. Escape closes it, Tab and Shift+Tab stay inside it, and focus returns to the trigger.",
      },
    },
  },
} satisfies Meta<typeof ProfileDialog>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const KeyboardAndFocus: Story = {
  parameters: {
    docs: {
      description: {
        story:
          "Activate the trigger with Enter or Space. Escape dismisses the dialog; focus remains contained while open and returns to the trigger after dismissal.",
      },
    },
  },
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
  globals: { marismaAccent: "tidal-blue", marismaMode: "dark" },
};
