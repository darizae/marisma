import { createRef } from "react";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it } from "vitest";
import { Input } from "./input";

describe("Input", () => {
  it("leaves uncontrolled values with the DOM and preserves defaultValue", async () => {
    const user = userEvent.setup();
    const ref = createRef<HTMLInputElement>();
    const { rerender } = render(
      <Input defaultValue="Ada" label="Name" name="name" ref={ref} />,
    );

    const input = screen.getByRole("textbox", { name: "Name" });
    expect(ref.current).toBe(input);
    await user.type(input, " Lovelace");
    expect((input as HTMLInputElement).value).toBe("Ada Lovelace");

    rerender(<Input defaultValue="Grace" label="Name" name="name" ref={ref} />);
    expect(ref.current?.value).toBe("Ada Lovelace");
  });

  it("leaves controlled value ownership with the caller", async () => {
    const user = userEvent.setup();
    const { rerender } = render(<Input label="Code" value="alpha" readOnly />);
    const input = screen.getByRole("textbox", { name: "Code" });

    await user.type(input, "beta");
    expect((input as HTMLInputElement).value).toBe("alpha");
    rerender(<Input label="Code" value="beta" readOnly />);
    expect((input as HTMLInputElement).value).toBe("beta");
  });

  it("connects its label, description, and error to the native input", () => {
    render(
      <Input
        description="Use the address your team recognizes."
        error="Enter a valid email address."
        label="Email"
        type="email"
      />,
    );

    const input = screen.getByRole("textbox", { name: "Email" });
    const describedBy =
      input.getAttribute("aria-describedby")?.split(" ") ?? [];
    expect(input.getAttribute("aria-invalid")).toBe("true");
    expect(describedBy).toHaveLength(2);
    expect(
      describedBy.map((id) => document.getElementById(id)?.textContent),
    ).toEqual([
      "Use the address your team recognizes.",
      "Enter a valid email address.",
    ]);
    expect(screen.getByRole("alert").textContent).toBe(
      "Enter a valid email address.",
    );
  });
});
