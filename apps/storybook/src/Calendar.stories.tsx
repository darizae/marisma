import { useState } from "react";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { expect, userEvent, within } from "storybook/test";
import { Calendar } from "@darizae/marisma";

function ControlledCalendar() {
  const [value, setValue] = useState("2026-11-11");
  return (
    <Calendar
      disabledDate={(date) => date === "2026-11-12"}
      locale="en-GB"
      max="2027-01-31"
      min="2026-10-01"
      onValueChange={setValue}
      timeZone="Europe/Madrid"
      value={value}
      weekStartsOn={1}
    />
  );
}

const meta = {
  title: "Components/Calendar",
  component: ControlledCalendar,
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component:
          "A single-date Gregorian calendar using strict YYYY-MM-DD civil dates. Locale formats labels, weekStartsOn orders columns, and timeZone determines today without shifting stored values. Arrow keys move by day/week, Home/End by week edge, Page Up/Down by month, Shift+Page Up/Down by year, and Enter/Space selects. Min/max and disabled-date predicates are enforced. Range/multiple selection and broad RTL claims are not included.",
      },
    },
  },
} satisfies Meta<typeof ControlledCalendar>;

export default meta;
type Story = StoryObj<typeof meta>;

export const ControlledBoundaries: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const selected = canvas.getByRole("button", {
      name: "Wednesday, 11 November 2026, selected",
    });
    selected.focus();
    await userEvent.keyboard("{ArrowRight}");
    await expect(
      canvas.getByRole("button", { name: "Thursday, 12 November 2026" }),
    ).toHaveFocus();
    await expect(document.activeElement).toHaveAttribute(
      "aria-disabled",
      "true",
    );
    await userEvent.keyboard("{ArrowRight}{Enter}");
    await expect(
      canvas.getByRole("button", {
        name: "Friday, 13 November 2026, selected",
      }),
    ).toBeVisible();
  },
};

export const TidalBlueDark: Story = {
  globals: { marismaAccent: "tidal-blue", marismaMode: "dark" },
};
