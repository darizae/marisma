import { render, screen, waitFor } from "@testing-library/react";
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

  it("bridges a themed subtree to portalled content", async () => {
    const user = userEvent.setup();
    render(
      <div data-marisma-accent="tidal-blue" data-marisma-mode="dark">
        <Dialog>
          <DialogTrigger>Open themed dialog</DialogTrigger>
          <DialogContent>
            <DialogTitle>Themed dialog</DialogTitle>
          </DialogContent>
        </Dialog>
      </div>,
    );

    await user.click(
      screen.getByRole("button", { name: "Open themed dialog" }),
    );
    await waitFor(() => {
      const portal = document.querySelector('[data-marisma-portal="dialog"]');
      expect(portal?.getAttribute("data-marisma-accent")).toBe("tidal-blue");
      expect(portal?.getAttribute("data-marisma-mode")).toBe("dark");
    });
  });
});
