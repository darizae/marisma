import { useState } from "react";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import { Button } from "./button";
import { ConfirmationDialog } from "./confirmation-dialog";
import { FieldCallout, FieldDivider, FieldGroup, Form } from "./form";
import { InlineEdit } from "./inline-edit";
import { Input } from "./input";
import { SearchField } from "./search-field";

describe("native forms and composed fields", () => {
  it("submits native values, resets uncontrolled inputs, and links the error summary", async () => {
    const user = userEvent.setup();
    const onSubmit = vi.fn((event: React.FormEvent<HTMLFormElement>) => {
      event.preventDefault();
      return new FormData(event.currentTarget);
    });

    render(
      <Form
        errors={[{ fieldId: "project-name", message: "Enter a project name." }]}
        onSubmit={onSubmit}
      >
        <Input
          defaultValue="Marisma"
          error="Enter a project name."
          id="project-name"
          label="Project name"
          name="projectName"
          required
        />
        <Button type="reset" variant="secondary">
          Reset
        </Button>
        <Button type="submit">Save</Button>
      </Form>,
    );

    const input = screen.getByRole("textbox", { name: "Project name" });
    expect(input.id).toBe("project-name");
    expect(input).toHaveAccessibleDescription("Enter a project name.");
    expect(
      screen.getByRole("alert", { name: "Please fix the following" }),
    ).toHaveTextContent("Enter a project name.");
    expect(
      screen.getByRole("link", { name: "Enter a project name." }),
    ).toHaveAttribute("href", "#project-name");

    await user.clear(input);
    await user.type(input, "Tidal records");
    await user.click(screen.getByRole("button", { name: "Save" }));
    expect(onSubmit).toHaveBeenCalledOnce();
    const submitted = onSubmit.mock.results[0]?.value;
    expect(submitted?.get("projectName")).toBe("Tidal records");

    await user.click(screen.getByRole("button", { name: "Reset" }));
    expect(input).toHaveValue("Marisma");
  });

  it("uses fieldset semantics, native disabled grouping, and an explicit separator", () => {
    render(
      <FieldGroup
        description="Values inherited by the whole group."
        disabled
        legend="Archived settings"
      >
        <Input label="Archive reason" />
        <Input label="Archive owner" />
        <FieldDivider aria-label="Related settings" decorative={false} />
        <FieldCallout title="Why is this disabled?">
          Restore the record before editing it.
        </FieldCallout>
      </FieldGroup>,
    );

    const group = screen.getByRole("group", { name: "Archived settings" });
    expect(group).toBeDisabled();
    expect(group).toHaveAccessibleDescription(
      "Values inherited by the whole group.",
    );
    const reason = screen.getByRole("textbox", { name: "Archive reason" });
    const owner = screen.getByRole("textbox", { name: "Archive owner" });
    expect(reason).toBeDisabled();
    expect(owner).toBeDisabled();
    expect(reason.id).not.toBe(owner.id);
    expect(
      screen.getByRole("separator", { name: "Related settings" }),
    ).toHaveAttribute("aria-orientation", "vertical");
    expect(screen.getByRole("status")).toHaveTextContent(
      "Restore the record before editing it.",
    );
  });

  it("confirms once while pending, cancels explicitly, and restores trigger focus", async () => {
    const user = userEvent.setup();
    const onConfirm = vi.fn();
    const onCancel = vi.fn();

    function Fixture() {
      const [pending, setPending] = useState(false);
      return (
        <ConfirmationDialog
          closeOnConfirm={false}
          description="This cannot be undone."
          onCancel={onCancel}
          onConfirm={() => {
            onConfirm();
            setPending(true);
          }}
          pending={pending}
          title="Remove station?"
          trigger="Remove station"
        />
      );
    }

    render(<Fixture />);
    const trigger = screen.getByRole("button", { name: "Remove station" });
    await user.click(trigger);
    await user.click(screen.getByRole("button", { name: "Confirm" }));
    expect(onConfirm).toHaveBeenCalledOnce();
    expect(screen.getByRole("button", { name: "Working…" })).toBeDisabled();
    expect(screen.getByRole("button", { name: "Cancel" })).toBeDisabled();

    fireEvent.keyDown(document, { key: "Escape" });
    expect(
      screen.getByRole("dialog", { name: "Remove station?" }),
    ).toBeVisible();
    expect(onCancel).not.toHaveBeenCalled();
  });

  it("reports Escape cancellation and restores focus when confirmation is idle", async () => {
    const user = userEvent.setup();
    const onCancel = vi.fn();
    const onConfirm = vi.fn();
    render(
      <ConfirmationDialog
        description="No changes are made."
        onCancel={onCancel}
        onConfirm={onConfirm}
        title="Discard draft?"
        trigger="Discard"
      />,
    );

    const trigger = screen.getByRole("button", { name: "Discard" });
    await user.click(trigger);
    await user.keyboard("{Escape}");
    expect(onCancel).toHaveBeenCalledWith("escape");
    expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
    expect(trigger).toHaveFocus();

    await user.click(trigger);
    await user.click(screen.getByRole("button", { name: "Confirm" }));
    expect(onConfirm).toHaveBeenCalledOnce();
    expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
    expect(trigger).toHaveFocus();
  });

  it("cancels inline drafts, saves once, and leaves controlled optimism to the caller", async () => {
    const user = userEvent.setup();
    const onSave = vi.fn();
    render(
      <InlineEdit
        label="Station name"
        name="stationName"
        onSave={onSave}
        value="North bank"
      />,
    );

    await user.click(screen.getByRole("button", { name: "Edit Station name" }));
    const input = screen.getByRole("textbox", { name: "Station name" });
    await user.clear(input);
    await user.type(input, "Estuary edge");
    await user.keyboard("{Escape}");
    expect(screen.getByText("North bank")).toBeVisible();
    expect(onSave).not.toHaveBeenCalled();
    expect(
      screen.getByRole("button", { name: "Edit Station name" }),
    ).toHaveFocus();

    await user.click(screen.getByRole("button", { name: "Edit Station name" }));
    const secondInput = screen.getByRole("textbox", { name: "Station name" });
    await user.clear(secondInput);
    await user.type(secondInput, "Estuary edge");
    await user.keyboard("{Enter}");
    expect(onSave).toHaveBeenCalledOnce();
    expect(onSave).toHaveBeenCalledWith("Estuary edge");
    expect(screen.getByText("North bank")).toBeVisible();
    expect(
      document.querySelector<HTMLInputElement>('input[name="stationName"]'),
    ).toHaveValue("North bank");
  });

  it("keeps rejected async saves in edit mode and reports the failure", async () => {
    const user = userEvent.setup();
    const saveError = new Error("persistence failed");
    const onSave = vi.fn().mockRejectedValue(saveError);
    const onSaveError = vi.fn();

    render(
      <InlineEdit
        label="Station name"
        onSave={onSave}
        onSaveError={onSaveError}
        value="North bank"
      />,
    );

    await user.click(screen.getByRole("button", { name: "Edit Station name" }));
    const input = screen.getByRole("textbox", { name: "Station name" });
    await user.clear(input);
    await user.type(input, "Estuary edge");
    await user.click(screen.getByRole("button", { name: "Save" }));

    await waitFor(() => expect(onSaveError).toHaveBeenCalledWith(saveError));
    expect(screen.getByRole("textbox", { name: "Station name" })).toBeVisible();
    expect(
      screen.getByText("Unable to save changes. Please try again."),
    ).toBeVisible();
  });

  it("enforces the empty-search policy, submits from the keyboard, and clears with focus", async () => {
    const user = userEvent.setup();
    const onSearch = vi.fn();
    const onValueChange = vi.fn();
    render(
      <SearchField
        label="Search stations"
        onSearch={onSearch}
        onValueChange={onValueChange}
      />,
    );

    const input = screen.getByRole("searchbox", { name: "Search stations" });
    await user.keyboard("{Enter}");
    expect(onSearch).not.toHaveBeenCalled();
    await user.type(input, "  reeds  ");
    await user.keyboard("{Enter}");
    expect(onSearch).toHaveBeenCalledWith("reeds");
    await user.click(screen.getByRole("button", { name: "Clear search" }));
    expect(input).toHaveValue("");
    expect(input).toHaveFocus();
    expect(onValueChange).toHaveBeenLastCalledWith("");
  });
});
