import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { afterEach, describe, expect, it, vi } from "vitest";
import { CopyCode } from "./copy-code";
import { ScrollArea } from "./scroll-area";
import {
  ToastAction,
  ToastProvider,
  useToast,
  type ToastVariant,
} from "./toast";

afterEach(() => vi.restoreAllMocks());

describe("CopyCode", () => {
  it("copies text and announces success", async () => {
    const user = userEvent.setup();
    const writeText = vi.fn().mockResolvedValue(undefined);
    Object.defineProperty(navigator, "clipboard", {
      configurable: true,
      value: { writeText },
    });

    render(<CopyCode code="pnpm add @darizae/marisma" language="Shell" />);
    await user.click(screen.getByRole("button", { name: "Copy code" }));
    expect(writeText).toHaveBeenCalledWith("pnpm add @darizae/marisma");
    expect(screen.getByRole("status").textContent).toBe("Copied to clipboard.");
  });

  it("announces clipboard failure and leaves selectable code", async () => {
    const user = userEvent.setup();
    const onCopyError = vi.fn();
    Object.defineProperty(navigator, "clipboard", {
      configurable: true,
      value: { writeText: vi.fn().mockRejectedValue(new Error("denied")) },
    });

    render(<CopyCode code="safe text" onCopyError={onCopyError} />);
    await user.click(screen.getByRole("button", { name: "Copy code" }));
    expect(screen.getByRole("alert").textContent).toContain(
      "Select the code and copy it manually",
    );
    expect(screen.getByText("safe text").closest("pre")?.tabIndex).toBe(0);
    expect(onCopyError).toHaveBeenCalledOnce();
  });
});

describe("ScrollArea", () => {
  it("uses focusable native overflow as the keyboard fallback", async () => {
    const user = userEvent.setup();
    render(
      <ScrollArea aria-label="Tide readings" className="max-h-32">
        Readings
      </ScrollArea>,
    );
    await user.tab();
    expect(document.activeElement).toBe(
      screen.getByRole("region", { name: "Tide readings" }),
    );
    expect(screen.getByText("Readings").className).toContain("overflow-y-auto");
  });
});

function ToastControls({ variant = "success" }: { variant?: ToastVariant }) {
  const { dismiss, toast } = useToast();
  return (
    <>
      <button
        onClick={() =>
          toast({
            action: (
              <ToastAction onClick={() => dismiss("fixed")}>Undo</ToastAction>
            ),
            description: "The record is current.",
            id: "fixed",
            title: "Saved",
            variant,
          })
        }
        type="button"
      >
        Notify
      </button>
      <button
        onClick={() => toast({ id: "second", title: "Second" })}
        type="button"
      >
        Notify again
      </button>
    </>
  );
}

describe("Toast", () => {
  it("announces, limits, and dismisses safe React content", async () => {
    const user = userEvent.setup();
    render(
      <ToastProvider duration={0} limit={1}>
        <ToastControls />
      </ToastProvider>,
    );

    await user.click(screen.getByRole("button", { name: "Notify" }));
    const status = screen.getByRole("status");
    expect(status.textContent).toContain("Saved");
    expect(status.textContent).toContain("The record is current.");

    await user.click(screen.getByRole("button", { name: "Notify again" }));
    expect(screen.queryByText("Saved")).toBeNull();
    expect(screen.getByText("Second")).not.toBeNull();
    await user.click(
      screen.getByRole("button", { name: "Dismiss notification" }),
    );
    expect(screen.queryByText("Second")).toBeNull();
  });

  it("uses an urgent role for danger and removes timed notifications", async () => {
    render(
      <ToastProvider duration={20}>
        <ToastControls variant="danger" />
      </ToastProvider>,
    );
    await userEvent.click(screen.getByRole("button", { name: "Notify" }));
    expect(screen.getByRole("alert").textContent).toContain("Saved");
    await waitFor(() => expect(screen.queryByText("Saved")).toBeNull());
  });

  it("requires a provider", () => {
    expect(() => render(<ToastControls />)).toThrow(
      "useToast must be used within a ToastProvider",
    );
  });
});
