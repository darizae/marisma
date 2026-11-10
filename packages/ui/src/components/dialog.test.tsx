import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it } from "vitest";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogTitle,
  DialogTrigger,
} from "./dialog";

describe("Dialog", () => {
  it("provides modal labeling, Escape dismissal, and focus restoration", async () => {
    const user = userEvent.setup();
    render(
      <Dialog>
        <DialogTrigger>Open profile</DialogTrigger>
        <DialogContent>
          <DialogTitle>Edit profile</DialogTitle>
          <DialogDescription>Change the public display name.</DialogDescription>
          <input aria-label="Display name" />
          <DialogClose>Cancel</DialogClose>
        </DialogContent>
      </Dialog>,
    );

    const trigger = screen.getByRole("button", { name: "Open profile" });
    await user.click(trigger);
    expect(
      screen.getByRole("dialog", {
        name: "Edit profile",
        description: "Change the public display name.",
      }),
    ).not.toBeNull();

    await user.keyboard("{Escape}");
    expect(screen.queryByRole("dialog")).toBeNull();
    expect(document.activeElement).toBe(trigger);
  });
});
