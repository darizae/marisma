import { useState } from "react";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import { Checkbox } from "./checkbox";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "./collapsible";
import { RadioGroup, RadioGroupItem } from "./radio-group";
import { Switch } from "./switch";
import { Textarea } from "./textarea";
import { ToggleGroup, ToggleGroupItem } from "./toggle-group";

describe("selection and disclosure widgets", () => {
  it("supports indeterminate, uncontrolled, controlled, and read-only checkboxes", async () => {
    const user = userEvent.setup();
    const onControlledChange = vi.fn();

    function Fixture() {
      const [checked, setChecked] = useState(false);
      return (
        <>
          <Checkbox
            defaultChecked="indeterminate"
            description="Selects all visible records."
            label="All records"
          />
          <Checkbox
            checked={checked}
            error="Confirm this setting."
            label="Controlled setting"
            onCheckedChange={(next) => {
              onControlledChange(next);
              setChecked(next === true);
            }}
          />
          <Checkbox defaultChecked label="Read-only setting" readOnly />
          <Checkbox disabled label="Disabled setting" />
        </>
      );
    }

    render(<Fixture />);
    const allRecords = screen.getByRole("checkbox", { name: "All records" });
    expect(allRecords.getAttribute("data-state")).toBe("indeterminate");
    expect(allRecords).toHaveAccessibleDescription(
      "Selects all visible records.",
    );
    await user.click(allRecords);
    expect(allRecords.getAttribute("data-state")).toBe("checked");

    const controlled = screen.getByRole("checkbox", {
      name: "Controlled setting",
    });
    await user.click(controlled);
    expect(onControlledChange).toHaveBeenCalledWith(true);
    expect(controlled.getAttribute("data-state")).toBe("checked");
    expect(controlled.getAttribute("aria-invalid")).toBe("true");

    const readOnly = screen.getByRole("checkbox", {
      name: "Read-only setting",
    });
    await user.click(readOnly);
    expect(readOnly.getAttribute("data-state")).toBe("checked");
    expect(readOnly.getAttribute("aria-readonly")).toBe("true");
    expect(
      screen.getByRole("checkbox", { name: "Disabled setting" }),
    ).toBeDisabled();
  });

  it("keeps switches focusable while read-only and inactive while disabled", async () => {
    const user = userEvent.setup();
    render(
      <>
        <Switch defaultChecked={false} label="Tide alerts" />
        <Switch defaultChecked label="Locked alerts" readOnly />
        <Switch disabled label="Unavailable alerts" />
      </>,
    );

    const alerts = screen.getByRole("switch", { name: "Tide alerts" });
    await user.click(alerts);
    expect(alerts.getAttribute("aria-checked")).toBe("true");
    const locked = screen.getByRole("switch", { name: "Locked alerts" });
    await user.click(locked);
    expect(locked.getAttribute("aria-checked")).toBe("true");
    expect(locked.getAttribute("aria-readonly")).toBe("true");
    expect(
      screen.getByRole("switch", { name: "Unavailable alerts" }),
    ).toBeDisabled();
  });

  it("labels a radio group and uses arrow keys to change its value", async () => {
    const user = userEvent.setup();
    const onValueChange = vi.fn();
    render(
      <RadioGroup
        defaultValue="reedwater"
        description="Applied to this workspace."
        label="Accent family"
        onValueChange={onValueChange}
      >
        <RadioGroupItem label="Reedwater" value="reedwater" />
        <RadioGroupItem label="Tidal Blue" value="tidal-blue" />
        <RadioGroupItem disabled label="Archive gray" value="gray" />
      </RadioGroup>,
    );

    const group = screen.getByRole("radiogroup", { name: "Accent family" });
    expect(group).toHaveAccessibleDescription("Applied to this workspace.");
    const reedwater = screen.getByRole("radio", { name: "Reedwater" });
    reedwater.focus();
    await user.keyboard("{ArrowRight}");
    const tidalBlue = screen.getByRole("radio", { name: "Tidal Blue" });
    expect(document.activeElement).toBe(tidalBlue);
    await user.click(tidalBlue);
    expect(tidalBlue).toBeChecked();
    expect(onValueChange).toHaveBeenCalledWith("tidal-blue");
  });

  it("supports single and multiple toggle groups with roving focus", async () => {
    const user = userEvent.setup();
    render(
      <>
        <ToggleGroup aria-label="Alignment" defaultValue="left" type="single">
          <ToggleGroupItem value="left">Left</ToggleGroupItem>
          <ToggleGroupItem value="center">Center</ToggleGroupItem>
        </ToggleGroup>
        <ToggleGroup
          aria-label="Text styles"
          defaultValue={["bold"]}
          type="multiple"
        >
          <ToggleGroupItem value="bold">Bold</ToggleGroupItem>
          <ToggleGroupItem value="italic">Italic</ToggleGroupItem>
        </ToggleGroup>
        <ToggleGroup
          aria-label="Locked alignment"
          defaultValue="left"
          readOnly
          type="single"
        >
          <ToggleGroupItem value="left">Locked left</ToggleGroupItem>
          <ToggleGroupItem value="right">Locked right</ToggleGroupItem>
        </ToggleGroup>
      </>,
    );

    const left = screen.getByRole("radio", { name: "Left" });
    left.focus();
    await user.keyboard("{ArrowRight}{Enter}");
    expect(screen.getByRole("radio", { name: "Center" })).toHaveAttribute(
      "data-state",
      "on",
    );
    await user.click(screen.getByRole("button", { name: "Italic" }));
    expect(screen.getByRole("button", { name: "Bold" })).toHaveAttribute(
      "data-state",
      "on",
    );
    expect(screen.getByRole("button", { name: "Italic" })).toHaveAttribute(
      "data-state",
      "on",
    );
    await user.click(screen.getByRole("radio", { name: "Locked right" }));
    expect(screen.getByRole("radio", { name: "Locked left" })).toHaveAttribute(
      "data-state",
      "on",
    );
  });

  it("exposes controlled disclosure and native textarea states", async () => {
    const user = userEvent.setup();
    function Fixture() {
      const [open, setOpen] = useState(false);
      return (
        <>
          <Collapsible onOpenChange={setOpen} open={open}>
            <CollapsibleTrigger>Station details</CollapsibleTrigger>
            <CollapsibleContent>Last sampled today.</CollapsibleContent>
          </Collapsible>
          <Textarea
            description="Plain text only."
            error="A note is required."
            label="Field note"
          />
          <Textarea label="Published note" readOnly value="Locked" />
        </>
      );
    }
    render(<Fixture />);

    expect(screen.queryByText("Last sampled today.")).toBeNull();
    await user.click(screen.getByRole("button", { name: "Station details" }));
    expect(screen.getByText("Last sampled today.")).not.toBeNull();
    const note = screen.getByRole("textbox", { name: "Field note" });
    expect(note.getAttribute("aria-invalid")).toBe("true");
    expect(note).toHaveAccessibleDescription(
      "Plain text only. A note is required.",
    );
    expect(
      screen.getByRole("textbox", { name: "Published note" }),
    ).toHaveAttribute("readonly");
  });
});
