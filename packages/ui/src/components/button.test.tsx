import { createRef } from "react";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import { Button } from "./button";

describe("Button", () => {
  it("keeps native submit and click behavior", async () => {
    const user = userEvent.setup();
    const onSubmit = vi.fn((event: React.FormEvent) => event.preventDefault());
    const onClick = vi.fn();

    render(
      <form onSubmit={onSubmit}>
        <Button onClick={onClick}>Save</Button>
      </form>,
    );

    const button = screen.getByRole("button", { name: "Save" });
    expect((button as HTMLButtonElement).type).toBe("submit");
    await user.click(button);
    expect(onClick).toHaveBeenCalledOnce();
    expect(onSubmit).toHaveBeenCalledOnce();
  });

  it("blocks activation while disabled or loading and forwards its ref", async () => {
    const user = userEvent.setup();
    const onClick = vi.fn();
    const ref = createRef<HTMLButtonElement>();
    const { rerender } = render(
      <Button disabled onClick={onClick} ref={ref}>
        Delete
      </Button>,
    );

    expect(ref.current).toBe(screen.getByRole("button", { name: "Delete" }));
    await user.click(ref.current!);
    expect(onClick).not.toHaveBeenCalled();

    rerender(
      <Button loading onClick={onClick} ref={ref}>
        Delete
      </Button>,
    );
    expect(ref.current?.disabled).toBe(true);
    expect(ref.current?.getAttribute("aria-busy")).toBe("true");
    expect(ref.current?.getAttribute("data-loading")).toBe("true");
    expect(screen.getByText("Delete")).not.toBeNull();
    await user.click(ref.current!);
    expect(onClick).not.toHaveBeenCalled();
  });
});
