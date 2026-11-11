import { useState } from "react";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import { Calendar } from "./calendar";
import { DateField } from "./date-field";
import { Select } from "./select";

describe("complex selection and dates", () => {
  it("supports controlled single Select values, disabled options, errors, and read-only", async () => {
    const user = userEvent.setup();
    const onValueChange = vi.fn();

    function Fixture() {
      const [value, setValue] = useState("reedwater");
      return (
        <>
          <Select
            description="Applied immediately."
            error="Review the choice."
            label="Accent"
            onValueChange={(next) => {
              onValueChange(next);
              setValue(next);
            }}
            options={[
              { label: "Reedwater", value: "reedwater" },
              { label: "Tidal Blue", value: "tidal-blue" },
              { disabled: true, label: "Archive gray", value: "gray" },
            ]}
            value={value}
          />
          <Select
            defaultValue="fixed"
            label="Locked choice"
            options={[{ label: "Fixed", value: "fixed" }]}
            readOnly
          />
        </>
      );
    }
    render(<Fixture />);

    const trigger = screen.getByRole("combobox", { name: "Accent" });
    expect(trigger).toHaveAccessibleDescription(
      "Applied immediately. Review the choice.",
    );
    expect(trigger.getAttribute("aria-invalid")).toBe("true");
    await user.click(trigger);
    expect(
      screen.getByRole("option", { name: "Archive gray" }),
    ).toHaveAttribute("data-disabled");
    await user.click(screen.getByRole("option", { name: "Tidal Blue" }));
    expect(onValueChange).toHaveBeenCalledWith("tidal-blue");
    expect(trigger).toHaveTextContent("Tidal Blue");

    const locked = screen.getByRole("combobox", { name: "Locked choice" });
    await user.click(locked);
    expect(locked.getAttribute("aria-expanded")).toBe("false");
    expect(locked.getAttribute("aria-readonly")).toBe("true");
  });

  it("enforces boundaries and disabled dates while announcing a selection", async () => {
    const user = userEvent.setup();
    const onValueChange = vi.fn();
    render(
      <Calendar
        defaultValue="2026-11-11"
        disabledDate={(date) => date === "2026-11-12"}
        locale="en-GB"
        max="2026-11-20"
        min="2026-11-10"
        onValueChange={onValueChange}
        timeZone="Europe/Madrid"
        weekStartsOn={1}
      />,
    );

    expect(screen.getByRole("grid", { name: "November 2026" })).not.toBeNull();
    expect(screen.getAllByRole("columnheader")[0]).toHaveAttribute(
      "abbr",
      "Monday",
    );
    const disabledDay = screen.getByRole("button", {
      name: "Thursday, 12 November 2026",
    });
    expect(disabledDay.getAttribute("aria-disabled")).toBe("true");
    await user.click(disabledDay);
    expect(onValueChange).not.toHaveBeenCalled();

    await user.click(
      screen.getByRole("button", { name: "Friday, 13 November 2026" }),
    );
    expect(onValueChange).toHaveBeenCalledWith("2026-11-13");
    expect(
      screen.getByText("Selected Friday, 13 November 2026"),
    ).not.toBeNull();
    expect(
      screen.getByRole("button", { name: "Previous month" }),
    ).toBeDisabled();
    expect(screen.getByRole("button", { name: "Next month" })).toBeDisabled();
  });

  it("moves the calendar roving focus with arrows and page keys", async () => {
    const user = userEvent.setup();
    render(
      <Calendar
        defaultValue="2026-11-30"
        locale="en-US"
        timeZone="UTC"
        weekStartsOn={0}
      />,
    );

    const selected = screen.getByRole("button", {
      name: "Monday, November 30, 2026, selected",
    });
    selected.focus();
    await user.keyboard("{ArrowRight}");
    expect(document.activeElement).toBe(
      screen.getByRole("button", { name: "Tuesday, December 1, 2026" }),
    );
    await user.keyboard("{PageDown}");
    expect(document.activeElement).toBe(
      screen.getByRole("button", { name: "Friday, January 1, 2027" }),
    );
    expect(screen.getByRole("grid", { name: "January 2027" })).not.toBeNull();
  });

  it("formats DateField values, selects from its portal, and submits ISO dates", async () => {
    const user = userEvent.setup();
    const onValueChange = vi.fn();
    render(
      <DateField
        defaultValue="2026-11-11"
        description="Stored as a calendar date, not an instant."
        label="Observation date"
        locale="en-GB"
        name="observationDate"
        onValueChange={onValueChange}
        timeZone="Europe/Madrid"
        weekStartsOn={1}
      />,
    );

    const input = screen.getByRole("textbox", { name: "Observation date" });
    expect(input).toHaveValue("11 Nov 2026");
    expect(input).toHaveAccessibleDescription(
      "Stored as a calendar date, not an instant.",
    );
    const trigger = screen.getByRole("button", {
      name: "Change date, Wednesday, 11 November 2026",
    });
    await user.click(trigger);
    await user.click(
      screen.getByRole("button", { name: "Friday, 13 November 2026" }),
    );
    expect(onValueChange).toHaveBeenCalledWith("2026-11-13");
    expect(input).toHaveValue("13 Nov 2026");
    expect(screen.queryByRole("grid")).toBeNull();
    expect(document.activeElement).toBe(trigger);
    expect(
      document.querySelector<HTMLInputElement>('input[name="observationDate"]')
        ?.value,
    ).toBe("2026-11-13");
  });

  it("rejects ambiguous or impossible calendar-date values", () => {
    expect(() => render(<Calendar value="11/31/2026" />)).toThrowError(
      /YYYY-MM-DD/,
    );
    expect(() => render(<Calendar value="2026-02-30" />)).toThrowError(
      /YYYY-MM-DD/,
    );
  });
});
