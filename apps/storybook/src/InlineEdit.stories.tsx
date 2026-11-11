import { useState } from "react";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { expect, userEvent, within } from "storybook/test";
import { InlineEdit } from "@darizae/marisma";

function InlineEditFixture() {
  const [value, setValue] = useState("North bank");
  return (
    <InlineEdit
      description="Escape cancels the draft. Enter or Save asks the caller to commit it."
      label="Station name"
      name="stationName"
      onSave={async (nextValue) => {
        await new Promise((resolve) => window.setTimeout(resolve, 150));
        setValue(nextValue);
      }}
      required
      value={value}
    />
  );
}

const meta = {
  title: "Forms/Inline Edit",
  component: InlineEditFixture,
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component:
          "A compact display/edit composition with draft cancellation, Enter save, Escape revert, guarded pending work, and focus return. Controlled values make optimistic updates and persistence explicitly caller-owned.",
      },
    },
  },
} satisfies Meta<typeof InlineEditFixture>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Manual: Story = {};

export const SaveCancelAndRevert: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await userEvent.click(
      canvas.getByRole("button", { name: "Edit Station name" }),
    );
    const input = canvas.getByRole("textbox", { name: "Station name" });
    await userEvent.clear(input);
    await userEvent.type(input, "Estuary edge");
    await userEvent.keyboard("{Escape}");
    await expect(canvas.getByText("North bank")).toBeVisible();
    await userEvent.click(
      canvas.getByRole("button", { name: "Edit Station name" }),
    );
    const resumed = canvas.getByRole("textbox", { name: "Station name" });
    await userEvent.clear(resumed);
    await userEvent.type(resumed, "Estuary edge");
    await userEvent.keyboard("{Enter}");
    await expect(canvas.findByText("Estuary edge")).resolves.toBeVisible();
  },
};
