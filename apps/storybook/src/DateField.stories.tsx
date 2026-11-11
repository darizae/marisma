import { useState } from "react";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { expect, userEvent, within } from "storybook/test";
import { DateField } from "@darizae/marisma";

function DateFieldStates() {
  const [value, setValue] = useState("2026-11-11");
  return (
    <div className="grid w-full max-w-lg gap-5">
      <DateField
        description="Stored as YYYY-MM-DD, displayed with en-GB formatting."
        label="Controlled observation date"
        locale="en-GB"
        min="2026-11-01"
        name="observationDate"
        onValueChange={setValue}
        timeZone="Europe/Madrid"
        value={value}
        weekStartsOn={1}
      />
      <DateField
        defaultValue="2026-11-15"
        label="Uncontrolled date"
        locale="en-GB"
        timeZone="Europe/Madrid"
        weekStartsOn={1}
      />
      <DateField
        error="Choose an available date."
        label="Invalid date"
        locale="en-GB"
        timeZone="Europe/Madrid"
      />
      <DateField
        defaultValue="2026-11-20"
        label="Read-only date"
        locale="en-GB"
        readOnly
        timeZone="Europe/Madrid"
      />
    </div>
  );
}

function RequiredDateFieldFixture() {
  const [submitted, setSubmitted] = useState(false);

  return (
    <form
      className="grid max-w-lg gap-4"
      onSubmit={(event) => {
        event.preventDefault();
        setSubmitted(true);
      }}
    >
      <DateField
        label="Required observation date"
        name="observationDate"
        required
      />
      <button
        className="min-h-11 rounded-lg bg-mar-accent px-4 py-2 font-semibold text-mar-accent-foreground"
        type="submit"
      >
        Submit date
      </button>
      {submitted ? <p role="status">Submitted</p> : null}
    </form>
  );
}

const meta = {
  title: "Components/Date Field",
  component: DateFieldStates,
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component:
          "A composed read-only display field plus a portalled Calendar. Values and submitted form data use strict YYYY-MM-DD civil dates; Intl formatting is display-only. Enter/Space opens the picker, the Calendar keyboard matrix applies, Escape closes, selection is announced, and focus returns to the trigger. Manual localized text parsing is intentionally unsupported.",
      },
    },
  },
} satisfies Meta<typeof DateFieldStates>;

export default meta;
type Story = StoryObj<typeof meta>;

export const OwnershipAndValidation: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const input = canvas.getByRole("textbox", {
      name: "Controlled observation date",
    });
    await expect(input).toHaveValue("11 Nov 2026");
    const trigger = canvas.getByRole("button", {
      name: "Change date, Wednesday, 11 November 2026",
    });
    await userEvent.click(trigger);
    const body = within(document.body);
    await userEvent.click(
      body.getByRole("button", { name: "Friday, 13 November 2026" }),
    );
    await expect(input).toHaveValue("13 Nov 2026");
    await expect(trigger).toHaveFocus();
  },
};

export const RequiredValidation: Story = {
  render: () => <RequiredDateFieldFixture />,
};

export const TidalBlueDark: Story = {
  globals: { marismaAccent: "tidal-blue", marismaMode: "dark" },
};
