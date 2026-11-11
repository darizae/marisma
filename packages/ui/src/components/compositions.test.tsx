import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import { AppNavbar, AppNavbarLink } from "./app-navbar";
import { AppShell } from "./app-shell";
import { CardGrid, CardGridItem } from "./card-grid";
import { DataPreview } from "./data-preview";
import { ErrorView } from "./error-view";
import { PageFooter } from "./page-footer";
import { PageHeading } from "./page-heading";
import { PageSection } from "./page-section";
import { RecordList, RecordListItem } from "./record-list";
import {
  Sidebar,
  SidebarContent,
  SidebarLink,
  SidebarNav,
  SidebarTrigger,
} from "./sidebar";
import {
  StepProgress,
  StepProgressItem,
  StepProgressLink,
} from "./step-progress";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
  TableRowHeader,
} from "./table";
import { UserMenu } from "./user-menu";
import { DropdownMenuItem } from "./dropdown-menu";

describe("data and content compositions", () => {
  it("keeps table structure semantic inside a labelled overflow region", () => {
    render(
      <Table aria-label="Tide stations" scrollLabel="Tide station data">
        <TableHeader>
          <TableRow>
            <TableHead>Station</TableHead>
            <TableHead>State</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          <TableRow>
            <TableRowHeader>North bank</TableRowHeader>
            <TableCell>Ready</TableCell>
          </TableRow>
        </TableBody>
      </Table>,
    );

    expect(
      screen.getByRole("region", { name: "Tide station data" }),
    ).toHaveAttribute("tabindex", "0");
    expect(screen.getByRole("table", { name: "Tide stations" })).toBeVisible();
    expect(
      screen.getByRole("columnheader", { name: "Station" }),
    ).toHaveAttribute("scope", "col");
    expect(
      screen.getByRole("rowheader", { name: "North bank" }),
    ).toHaveAttribute("scope", "row");
  });

  it("renders caller-owned record states and large stable-key lists", () => {
    const records = Array.from({ length: 200 }, (_, index) => ({
      id: `station-${index}`,
      name: `Station ${index}`,
    }));
    const renderRecord = (record: (typeof records)[number]) => (
      <RecordListItem title={record.name}>Current reading</RecordListItem>
    );
    const getKey = (record: (typeof records)[number]) => record.id;

    const { rerender } = render(
      <RecordList
        getKey={getKey}
        label="Stations"
        loading
        records={records}
        renderRecord={renderRecord}
      />,
    );
    expect(screen.getByRole("status")).toHaveTextContent("Loading records");

    rerender(
      <RecordList
        error={<button type="button">Try again</button>}
        getKey={getKey}
        label="Stations"
        records={records}
        renderRecord={renderRecord}
      />,
    );
    expect(screen.getByRole("alert")).toContainElement(
      screen.getByRole("button", { name: "Try again" }),
    );

    rerender(
      <RecordList
        getKey={getKey}
        label="Stations"
        records={[]}
        renderRecord={renderRecord}
      />,
    );
    expect(screen.getByText("No records to show")).toBeVisible();

    rerender(
      <RecordList
        getKey={getKey}
        label="Stations"
        records={records}
        renderRecord={renderRecord}
      />,
    );
    expect(screen.getAllByRole("listitem")).toHaveLength(200);
  });

  it("uses list semantics for card grids and labels page sections", () => {
    render(
      <PageSection
        actions={<button type="button">Add card</button>}
        description="Caller-owned cards"
        title="Observations"
      >
        <CardGrid aria-label="Observation cards">
          <CardGridItem>North bank</CardGridItem>
          <CardGridItem>South inlet</CardGridItem>
        </CardGrid>
      </PageSection>,
    );

    expect(screen.getByRole("region", { name: "Observations" })).toBeVisible();
    expect(
      screen.getByRole("list", { name: "Observation cards" }),
    ).toBeVisible();
    expect(screen.getAllByRole("listitem")).toHaveLength(2);
  });

  it("renders raw values as text and enforces collapse and size limits", async () => {
    const user = userEvent.setup();
    const unsafe = "<img src=x onerror=alert(1)>";
    render(
      <DataPreview
        collapsedCharacters={24}
        data={{ unsafe, value: "x".repeat(80) }}
        label="Response payload"
        maxCharacters={60}
      />,
    );

    expect(screen.queryByRole("img")).not.toBeInTheDocument();
    expect(screen.getByText(/Previewing 60 of/)).toBeVisible();
    const code = screen.getByText((content, element) =>
      Boolean(element?.matches("code") && content.includes("<img")),
    );
    expect(code).toHaveTextContent("<img");
    expect(code.textContent?.length).toBeLessThanOrEqual(25);
    await user.click(screen.getByRole("button", { name: "Show more" }));
    expect(code.textContent?.length).toBe(60);
  });

  it("stops before expensive trailing values and distinguishes shared objects from cycles", () => {
    const shared = { value: "shared" };
    const sharedResult = render(
      <DataPreview
        data={{ first: shared, second: shared }}
        maxCharacters={200}
      />,
    );
    expect(screen.queryByText("[Circular]")).not.toBeInTheDocument();
    sharedResult.unmount();

    render(
      <DataPreview
        data={{
          leading: "x".repeat(80),
          trailing: {
            get value() {
              throw new Error("should not be read");
            },
          },
        }}
        maxCharacters={40}
      />,
    );

    expect(screen.getByText(/Previewing 40 of 40\+/)).toBeVisible();
    expect(screen.queryByText("[Circular]")).not.toBeInTheDocument();
  });
});

describe("navigation and shell compositions", () => {
  it("provides landmarks, skip navigation, current links, and footer content", () => {
    render(
      <AppShell
        footer={<PageFooter>Marisma contributors</PageFooter>}
        header={
          <AppNavbar brand={<a href="/">Marisma</a>}>
            <AppNavbarLink current href="/records">
              Records
            </AppNavbarLink>
            <AppNavbarLink href="/settings">Settings</AppNavbarLink>
          </AppNavbar>
        }
        mainId="workspace"
      >
        Workspace content
      </AppShell>,
    );

    expect(
      screen.getByRole("link", { name: "Skip to content" }),
    ).toHaveAttribute("href", "#workspace");
    expect(screen.getByRole("navigation", { name: "Primary" })).toBeVisible();
    expect(screen.getByRole("link", { name: "Records" })).toHaveAttribute(
      "aria-current",
      "page",
    );
    expect(screen.getByRole("main")).toHaveAttribute("id", "workspace");
    expect(screen.getByRole("contentinfo")).toHaveTextContent(
      "Marisma contributors",
    );
  });

  it("removes executable schemes from native navigation links", () => {
    render(
      <AppNavbar>
        <AppNavbarLink href={" \nJaVa\nScRiPt:alert(1)"}>Unsafe</AppNavbarLink>
        <AppNavbarLink href="data:text/html,unsafe">Data URL</AppNavbarLink>
        <AppNavbarLink href="/safe">Safe</AppNavbarLink>
      </AppNavbar>,
    );

    expect(screen.getByText("Unsafe")).not.toHaveAttribute("href");
    expect(screen.getByText("Data URL")).not.toHaveAttribute("href");
    expect(screen.getByRole("link", { name: "Safe" })).toHaveAttribute(
      "href",
      "/safe",
    );
  });

  it("opens and dismisses the mobile sidebar with focus restoration", async () => {
    const user = userEvent.setup();
    render(
      <Sidebar>
        <SidebarTrigger>Open navigation</SidebarTrigger>
        <SidebarContent title="Workspace navigation">
          <SidebarNav label="Workspace">
            <SidebarLink current href="/overview">
              Overview
            </SidebarLink>
            <SidebarLink href="/stations">Stations</SidebarLink>
          </SidebarNav>
        </SidebarContent>
      </Sidebar>,
    );

    const trigger = screen.getByRole("button", { name: "Open navigation" });
    await user.click(trigger);
    const dialog = screen.getByRole("dialog", { name: "Workspace navigation" });
    expect(dialog).toHaveAttribute("data-state", "open");
    expect(screen.getByRole("link", { name: "Overview" })).toHaveAttribute(
      "aria-current",
      "page",
    );
    await user.keyboard("{Escape}");
    expect(dialog).not.toBeInTheDocument();
    expect(trigger).toHaveFocus();
  });

  it("announces the current step without owning navigation", () => {
    render(
      <StepProgress label="Create station">
        <StepProgressItem status="complete" step="1">
          <StepProgressLink href="/details">Details</StepProgressLink>
        </StepProgressItem>
        <StepProgressItem status="current" step="2">
          <StepProgressLink href="/sensors">Sensors</StepProgressLink>
        </StepProgressItem>
        <StepProgressItem status="upcoming" step="3">
          Review
        </StepProgressItem>
      </StepProgress>,
    );

    expect(
      screen.getByRole("navigation", { name: "Create station" }),
    ).toBeVisible();
    expect(screen.getByRole("link", { name: /Sensors/ })).toHaveAttribute(
      "aria-current",
      "step",
    );
  });
});

describe("page-level patterns", () => {
  it("composes page titles and caller-owned error recovery", async () => {
    const user = userEvent.setup();
    const onRetry = vi.fn();
    render(
      <>
        <PageHeading
          actions={<button type="button">Export</button>}
          description="A generalized record page."
          eyebrow="Monitoring"
          title="Tide stations"
        />
        <ErrorView
          actions={
            <button onClick={onRetry} type="button">
              Try again
            </button>
          }
          description="The caller decides what retry does."
          title="Records unavailable"
        />
      </>,
    );

    expect(
      screen.getByRole("heading", { level: 1, name: "Tide stations" }),
    ).toBeVisible();
    expect(
      screen.getByRole("region", { name: "Records unavailable" }),
    ).toBeVisible();
    await user.click(screen.getByRole("button", { name: "Try again" }));
    expect(onRetry).toHaveBeenCalledOnce();
  });

  it("opens a caller-owned user menu and runs its action", async () => {
    const user = userEvent.setup();
    const onSignOut = vi.fn();
    render(
      <UserMenu description="ada@example.test" name="Ada Lovelace">
        <DropdownMenuItem onSelect={onSignOut}>Sign out</DropdownMenuItem>
      </UserMenu>,
    );

    await user.click(
      screen.getByRole("button", { name: "Open user menu for Ada Lovelace" }),
    );
    expect(screen.getByText("ada@example.test")).toBeVisible();
    await user.click(screen.getByRole("menuitem", { name: "Sign out" }));
    expect(onSignOut).toHaveBeenCalledOnce();
  });
});
