import { useState } from "react";
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "./dropdown-menu";
import {
  Popover,
  PopoverClose,
  PopoverContent,
  PopoverTrigger,
} from "./popover";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./tabs";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "./tooltip";

describe("overlay and navigation widgets", () => {
  it("dismisses a themed popover with Escape and restores trigger focus", async () => {
    const user = userEvent.setup();
    render(
      <div data-marisma-accent="tidal-blue" data-marisma-mode="dark">
        <Popover>
          <PopoverTrigger>Open filters</PopoverTrigger>
          <PopoverContent aria-label="Filters">
            <p>Filter options</p>
            <PopoverClose>Done</PopoverClose>
          </PopoverContent>
        </Popover>
      </div>,
    );

    const trigger = screen.getByRole("button", { name: "Open filters" });
    await user.click(trigger);
    expect(screen.getByRole("dialog", { name: "Filters" })).not.toBeNull();
    await waitFor(() => {
      const portal = document.querySelector('[data-marisma-portal="popover"]');
      expect(portal?.getAttribute("data-marisma-accent")).toBe("tidal-blue");
      expect(portal?.getAttribute("data-marisma-mode")).toBe("dark");
    });
    await user.keyboard("{Escape}");
    expect(screen.queryByRole("dialog", { name: "Filters" })).toBeNull();
    expect(document.activeElement).toBe(trigger);
  });

  it("opens a nested menu, marks destructive actions, and restores focus", async () => {
    const user = userEvent.setup();
    const onArchive = vi.fn();
    render(
      <DropdownMenu>
        <DropdownMenuTrigger>Record actions</DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuItem>Edit</DropdownMenuItem>
          <DropdownMenuSub>
            <DropdownMenuSubTrigger>Move to</DropdownMenuSubTrigger>
            <DropdownMenuSubContent>
              <DropdownMenuItem>Archive shelf</DropdownMenuItem>
            </DropdownMenuSubContent>
          </DropdownMenuSub>
          <DropdownMenuItem onSelect={onArchive} variant="danger">
            Delete record
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>,
    );

    const trigger = screen.getByRole("button", { name: "Record actions" });
    await user.click(trigger);
    const danger = screen.getByRole("menuitem", { name: "Delete record" });
    expect(danger.className).toContain("text-mar-danger");
    await user.keyboard("{Escape}");
    expect(screen.queryByRole("menu")).toBeNull();
    expect(document.activeElement).toBe(trigger);

    await user.click(trigger);
    await user.click(screen.getByRole("menuitem", { name: "Delete record" }));
    expect(onArchive).toHaveBeenCalledOnce();
  });

  it("shows non-interactive tooltip content on focus and dismisses it", async () => {
    const user = userEvent.setup();
    render(
      <TooltipProvider delayDuration={0}>
        <Tooltip>
          <TooltipTrigger aria-label="Station help">?</TooltipTrigger>
          <TooltipContent>Uses the nearest active station.</TooltipContent>
        </Tooltip>
      </TooltipProvider>,
    );

    const trigger = screen.getByRole("button", { name: "Station help" });
    trigger.focus();
    expect(
      await screen.findByRole("tooltip", {
        name: "Uses the nearest active station.",
      }),
    ).not.toBeNull();
    await user.keyboard("{Escape}");
    expect(screen.queryByRole("tooltip")).toBeNull();
    expect(document.activeElement).toBe(trigger);
  });

  it("supports controlled tabs and arrow-key activation", async () => {
    const user = userEvent.setup();
    function Fixture() {
      const [tab, setTab] = useState("overview");
      return (
        <Tabs onValueChange={setTab} value={tab}>
          <TabsList aria-label="Station sections">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="history">History</TabsTrigger>
            <TabsTrigger disabled value="private">
              Private
            </TabsTrigger>
          </TabsList>
          <TabsContent value="overview">Overview panel</TabsContent>
          <TabsContent value="history">History panel</TabsContent>
          <TabsContent value="private">Private panel</TabsContent>
        </Tabs>
      );
    }
    render(<Fixture />);

    const overview = screen.getByRole("tab", { name: "Overview" });
    overview.focus();
    await user.keyboard("{ArrowRight}");
    expect(screen.getByRole("tab", { name: "History" })).toHaveAttribute(
      "aria-selected",
      "true",
    );
    expect(screen.getByRole("tabpanel", { name: "History" })).toHaveTextContent(
      "History panel",
    );
  });
});
