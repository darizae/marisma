import { createRef } from "react";
import { fireEvent, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import { Alert } from "./alert";
import { Avatar } from "./avatar";
import { Badge } from "./badge";
import { Button } from "./button";
import { ButtonGroup } from "./button-group";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./card";
import { Label } from "./label";
import { Separator } from "./separator";
import { Spinner } from "./spinner";

describe("foundation presentation components", () => {
  it("gives informational and urgent alerts suitable live-region semantics", () => {
    const { rerender } = render(<Alert title="Saved">Draft is current.</Alert>);
    expect(screen.getByRole("status").textContent).toContain("Saved");

    rerender(
      <Alert title="Upload failed" variant="danger">
        Try again.
      </Alert>,
    );
    expect(screen.getByRole("alert").textContent).toContain("Try again.");
  });

  it("shows an avatar fallback after an image failure and forwards its ref", () => {
    const ref = createRef<HTMLSpanElement>();
    render(
      <Avatar
        alt="Ada Lovelace"
        fallback="AL"
        ref={ref}
        src="/missing-avatar.png"
      />,
    );
    fireEvent.error(screen.getByRole("img", { name: "Ada Lovelace" }));
    expect(screen.queryByRole("img")).toBeNull();
    expect(screen.getByLabelText("Ada Lovelace").textContent).toBe("AL");
    expect(ref.current?.tagName).toBe("SPAN");
  });

  it("keeps badge status in text and exposes grouped native buttons", async () => {
    const user = userEvent.setup();
    render(
      <>
        <Badge variant="success">Deployment ready</Badge>
        <ButtonGroup aria-label="Record actions">
          <Button variant="secondary">Edit</Button>
          <Button variant="secondary">Archive</Button>
        </ButtonGroup>
      </>,
    );
    expect(screen.getByText("Deployment ready").className).toContain(
      "text-mar-success",
    );
    const group = screen.getByRole("group", { name: "Record actions" });
    expect(group.getAttribute("data-orientation")).toBe("horizontal");
    await user.tab();
    expect(document.activeElement).toBe(
      screen.getByRole("button", { name: "Edit" }),
    );
    await user.tab();
    expect(document.activeElement).toBe(
      screen.getByRole("button", { name: "Archive" }),
    );
  });

  it("provides semantic card slots and a native label association", () => {
    render(
      <Card aria-label="Estuary status">
        <CardHeader>
          <CardTitle>Estuary status</CardTitle>
          <CardDescription>Updated today</CardDescription>
        </CardHeader>
        <CardContent>
          <Label htmlFor="station">Station</Label>
          <input id="station" />
        </CardContent>
        <CardFooter>Fresh data</CardFooter>
      </Card>,
    );
    expect(
      screen.getByRole("region", { name: "Estuary status" }),
    ).not.toBeNull();
    expect(screen.getByRole("textbox", { name: "Station" })).not.toBeNull();
  });

  it("distinguishes decorative separators and meaningfully named spinners", () => {
    const { rerender } = render(<Separator data-testid="separator" />);
    expect(screen.getByTestId("separator").getAttribute("role")).toBe(
      "presentation",
    );

    rerender(
      <>
        <Separator decorative={false} orientation="vertical" />
        <Spinner label="Loading tide readings" />
      </>,
    );
    expect(screen.getByRole("separator").getAttribute("aria-orientation")).toBe(
      "vertical",
    );
    expect(
      screen.getByRole("status", { name: "Loading tide readings" }),
    ).not.toBeNull();
  });
});
