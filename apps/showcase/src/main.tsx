import React, { useEffect, useState, type FormEvent } from "react";
import { createRoot } from "react-dom/client";
import {
  Alert,
  Avatar,
  Badge,
  Button,
  ButtonGroup,
  Calendar,
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  Checkbox,
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
  CopyCode,
  DataPreview,
  DateField,
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
  DialogTrigger,
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  Input,
  Label,
  PageHeading,
  PageSection,
  Popover,
  PopoverContent,
  PopoverTrigger,
  RadioGroup,
  RadioGroupItem,
  RecordList,
  RecordListItem,
  SearchField,
  Select,
  Separator,
  Spinner,
  Switch,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
  TableRowHeader,
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
  Textarea,
  ToggleGroup,
  ToggleGroupItem,
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
  ToastProvider,
  useToast,
  StepProgress,
  StepProgressItem,
  PageFooter,
  Sidebar,
  SidebarContent,
  SidebarNav,
  SidebarLink,
  SidebarTrigger,
} from "@darizae/marisma";
import { families, storyHref } from "./catalog";
import leafMark from "../../../assets/brand/marisma-leaf.svg";
import "./styles.css";

type Page = "overview" | "explorer" | "forms" | "data" | "motion" | "settings";
type Accent = "reedwater" | "tidal-blue";
type Mode = "light" | "dark";
const routes: { id: Page; title: string; symbol: string; summary: string }[] = [
  {
    id: "overview",
    title: "Overview",
    symbol: "◈",
    summary: "A calm command center assembled from Marisma components.",
  },
  {
    id: "explorer",
    title: "Component explorer",
    symbol: "▦",
    summary: "Discover all 48 source-level component families.",
  },
  {
    id: "forms",
    title: "Forms & feedback",
    symbol: "✎",
    summary: "Complete a fictional survey with native and Radix controls.",
  },
  {
    id: "data",
    title: "Data & calendar",
    symbol: "▤",
    summary: "Filter and inspect fictional estuary monitoring records.",
  },
  {
    id: "motion",
    title: "Motion lab",
    symbol: "◌",
    summary: "Replay measured interaction patterns and check reduced motion.",
  },
  {
    id: "settings",
    title: "Settings",
    symbol: "⚙",
    summary: "Choose one of four semantic Marisma themes.",
  },
];
const observations = [
  {
    id: "MW-101",
    name: "North inlet",
    region: "North",
    date: "2026-11-18",
    status: "Healthy",
    level: "2.3 m",
  },
  {
    id: "MW-102",
    name: "Reedbank",
    region: "South",
    date: "2026-11-19",
    status: "Review",
    level: "2.7 m",
  },
  {
    id: "MW-103",
    name: "Harbor edge",
    region: "North",
    date: "2026-11-20",
    status: "Healthy",
    level: "2.1 m",
  },
  {
    id: "MW-104",
    name: "Low marsh",
    region: "South",
    date: "2026-11-21",
    status: "Healthy",
    level: "1.9 m",
  },
];
function AppBody() {
  const [page, setPage] = useState<Page>(() => {
    const hash = location.hash.replace("#/", "");
    return routes.some((x) => x.id === hash) ? (hash as Page) : "overview";
  });
  const [accent, setAccent] = useState<Accent>("reedwater");
  const [mode, setMode] = useState<Mode>("light");
  useEffect(() => {
    document.documentElement.setAttribute("data-marisma-accent", accent);
    document.documentElement.setAttribute("data-marisma-mode", mode);
  }, [accent, mode]);
  const [mobileNav, setMobileNav] = useState(false);
  const [query, setQuery] = useState("");
  const [region, setRegion] = useState("all");
  const [date, setDate] = useState("2026-11-20");
  const [showError, setShowError] = useState(false);
  const [showEmpty, setShowEmpty] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [notes, setNotes] = useState("");
  const [subscription, setSubscription] = useState(false);
  const [paused, setPaused] = useState(false);
  const [replay, setReplay] = useState(0);
  const [springOpen, setSpringOpen] = useState(false);
  const [filterOpen, setFilterOpen] = useState(false);
  const [search, setSearch] = useState("");
  const { toast } = useToast();
  useEffect(() => {
    const onHash = () => {
      const next = location.hash.replace("#/", "");
      if (routes.some((x) => x.id === next)) {
        setPage(next as Page);
        setMobileNav(false);
      }
    };
    window.addEventListener("hashchange", onHash);
    return () => window.removeEventListener("hashchange", onHash);
  }, []);
  const nav = (target: Page) => {
    setPage(target);
    setMobileNav(false);
    location.hash = "/" + target;
  };
  const current = routes.find((x) => x.id === page)!;
  const filtered = observations.filter(
    (x) =>
      (region === "all" || x.region === region) &&
      x.name.toLowerCase().includes(search.toLowerCase()),
  );
  const announce = (message: string) =>
    toast({
      title: message,
      description: "Local showcase only · no external changes",
    });
  const submit = (e: FormEvent) => {
    e.preventDefault();
    announce("Sample form submitted");
  };
  const catalog = families.filter(([name, cat]) =>
    (name + " " + cat).toLowerCase().includes(query.toLowerCase()),
  );
  return (
    <div
      data-marisma-accent={accent}
      data-marisma-mode={mode}
      data-marisma-motion={paused ? "paused" : "running"}
      className="showcase-shell min-h-screen font-mar-sans text-mar-text"
    >
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:top-2 focus:left-2 focus:z-[99] focus:rounded-mar-control focus:bg-mar-card focus:p-3"
      >
        Skip to content
      </a>
      <Sidebar open={mobileNav} onOpenChange={setMobileNav}>
        <SidebarContent
          title="Marisma navigation"
          header={
            <div className="flex items-center gap-3">
              <span
                className="grid size-10 place-items-center rounded-mar-control bg-mar-selection"
                aria-hidden="true"
              >
                <img src={leafMark} alt="" className="size-8 object-contain" />
              </span>
              <div>
                <div className="text-lg font-bold tracking-tight">
                  marisma<span className="text-mar-primary">.</span>
                </div>
                <div className="text-[11px] tracking-widest uppercase text-mar-muted">
                  Interactive gallery
                </div>
              </div>
            </div>
          }
          footer={
            <div className="rounded-mar-card bg-mar-card p-3">
              <Badge variant="success">Live preview</Badge>
              <p className="mt-3 text-sm font-semibold">Made for exploration</p>
              <p className="mt-1 text-xs leading-relaxed text-mar-muted">
                Fictional data, real library components.
              </p>
            </div>
          }
        >
          <p className="mb-3 px-3 text-[11px] font-bold tracking-[.16em] uppercase text-mar-muted">
            Workspace
          </p>
          <SidebarNav label="Main navigation">
            {routes.map((r) => (
              <SidebarLink
                key={r.id}
                href={`#/${r.id}`}
                current={page === r.id}
                onClick={() => nav(r.id)}
              >
                <span className="w-5 text-lg" aria-hidden="true">
                  {r.symbol}
                </span>
                {r.title}
              </SidebarLink>
            ))}
          </SidebarNav>
        </SidebarContent>
        <div className="min-w-0 lg:pl-72">
          <header className="sticky top-0 z-30 flex min-h-18 items-center justify-between gap-3 border-b border-mar-separator bg-mar-card/95 px-4 backdrop-blur sm:px-8">
            <div className="flex items-center gap-3">
              <SidebarTrigger size="small" aria-label="Open navigation">
                ☰
              </SidebarTrigger>
              <span className="text-sm text-mar-muted">
                Workspace <span aria-hidden="true">/</span>{" "}
                <strong className="font-semibold text-mar-text">
                  {current.title}
                </strong>
              </span>
            </div>
            <div className="flex items-center gap-2">
              <Select
                label="Theme accent"
                fieldClassName="hidden sm:grid"
                triggerClassName="!min-h-9 !w-38 !text-sm"
                value={accent}
                onValueChange={(v) => setAccent(v as Accent)}
                options={[
                  { value: "reedwater", label: "Reedwater" },
                  { value: "tidal-blue", label: "Tidal Blue" },
                ]}
              />
              <Button
                size="small"
                variant="secondary"
                onClick={() => setMode(mode === "light" ? "dark" : "light")}
                aria-label={`Switch to ${mode === "light" ? "dark" : "light"} mode`}
              >
                {mode === "light" ? "☾ Dark" : "☀ Light"}
              </Button>
              <DropdownMenu>
                <DropdownMenuTrigger
                  size="small"
                  aria-label="Workspace actions"
                >
                  ⋯
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem
                    onSelect={() => announce("Workspace refreshed")}
                  >
                    Refresh preview
                  </DropdownMenuItem>
                  <DropdownMenuItem onSelect={() => nav("settings")}>
                    Appearance settings
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </header>
          <main
            id="main"
            className="mx-auto max-w-6xl px-4 py-8 sm:px-8 sm:py-10"
          >
            <PageHeading
              eyebrow="Marisma · Component system"
              title={current.title}
              description={current.summary}
              actions={
                <Badge variant="info">v0.2.0 source · unreleased motion</Badge>
              }
            />
            {page === "overview" && (
              <div className="mt-8 grid gap-6">
                <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
                  {[
                    [
                      "Monitoring sites",
                      "12",
                      "Active stations in the estuary",
                    ],
                    ["Samples this week", "284", "+18% from previous week"],
                    ["Items to review", "03", "Two awaiting validation"],
                  ].map(([title, value, subtitle], i) => (
                    <Card
                      key={title}
                      className="marisma-motion-rise"
                      style={{ animationDelay: `${i * 70}ms` }}
                    >
                      <CardHeader>
                        <CardDescription>{title}</CardDescription>
                        <CardTitle className="!text-4xl tracking-tight">
                          {value}
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <p className="text-sm text-mar-muted">{subtitle}</p>
                      </CardContent>
                    </Card>
                  ))}
                </div>
                <div className="grid gap-5 lg:grid-cols-[1.5fr_1fr]">
                  <Card>
                    <CardHeader>
                      <CardTitle>Recent observations</CardTitle>
                      <CardDescription>
                        Latest fictional coastal monitoring activity
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <RecordList
                        records={observations.slice(0, 3)}
                        label="Recent observations"
                        getKey={(x) => x.id}
                        renderRecord={(x) => (
                          <RecordListItem
                            title={x.name}
                            description={x.date}
                            meta={
                              <Badge
                                variant={
                                  x.status === "Healthy" ? "success" : "warning"
                                }
                              >
                                {x.status}
                              </Badge>
                            }
                          />
                        )}
                      />
                    </CardContent>
                  </Card>
                  <Card>
                    <CardHeader>
                      <CardTitle>Quick actions</CardTitle>
                      <CardDescription>
                        Get to the tools you use most
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="grid gap-3">
                      <Button onClick={() => nav("data")}>
                        Explore monitoring data{" "}
                        <span className="marisma-motion-arrow">↗</span>
                      </Button>
                      <Button variant="secondary" onClick={() => nav("forms")}>
                        Open sample form
                      </Button>
                      <Button variant="secondary" onClick={() => nav("motion")}>
                        See motion studies
                      </Button>
                      <Alert title="Everything stays local" variant="info">
                        These examples never submit real data.
                      </Alert>
                    </CardContent>
                  </Card>
                </div>
              </div>
            )}
            {page === "explorer" && (
              <div className="mt-8">
                <SearchField
                  label="Search component families"
                  placeholder="Search by name or category…"
                  onSearch={setQuery}
                  onValueChange={setQuery}
                  value={query}
                />
                <p
                  className="mt-3 mb-5 text-sm text-mar-muted"
                  aria-live="polite"
                >
                  {catalog.length} of 48 families · live examples in this
                  gallery and comprehensive Storybook references
                </p>
                <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
                  {catalog.map(([name, category]) => (
                    <Card key={name}>
                      <CardContent className="!pt-5">
                        <div className="flex items-center justify-between gap-2">
                          <Badge>{category}</Badge>
                          <span className="showcase-dot" />
                        </div>
                        <h2 className="mt-4 font-semibold">{name}</h2>
                        <p className="mt-1 text-xs text-mar-muted">
                          Public Marisma family
                        </p>
                        <div className="mt-4 flex gap-2">
                          <a
                            className="text-sm font-semibold text-mar-primary hover:underline"
                            target="_blank"
                            rel="noreferrer"
                            href={storyHref(name)}
                          >
                            Storybook reference{" "}
                            <span aria-hidden="true">↗</span>
                          </a>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            )}
            {page === "forms" && (
              <div className="mt-8 grid gap-6 lg:grid-cols-[1.45fr_1fr]">
                <Card>
                  <CardHeader>
                    <CardTitle>Register an observation</CardTitle>
                    <CardDescription>
                      Try validation, selection, and submit feedback
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <form className="grid gap-5" onSubmit={submit}>
                      <Input
                        label="Observer name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                        placeholder="e.g. Alex Rivera"
                      />
                      <Input
                        label="Contact email"
                        inputMode="email"
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        placeholder="alex@example.test"
                      />
                      <Select
                        label="Station"
                        options={[
                          { value: "north", label: "North inlet" },
                          { value: "south", label: "Reedbank" },
                          { value: "harbor", label: "Harbor edge" },
                        ]}
                      />
                      <DateField
                        label="Observation date"
                        defaultValue="2026-11-20"
                      />
                      <Textarea
                        label="Field notes"
                        value={notes}
                        onChange={(e) => setNotes(e.target.value)}
                        placeholder="Water conditions, wildlife, or other notes…"
                      />
                      <Checkbox
                        label="Include in the weekly report"
                        checked={subscription}
                        onCheckedChange={(v) => setSubscription(v === true)}
                      />
                      <div className="flex flex-wrap gap-3">
                        <Button type="submit">Save sample observation</Button>
                        <Button
                          variant="secondary"
                          type="reset"
                          onClick={() => {
                            setName("");
                            setEmail("");
                            setNotes("");
                            setSubscription(false);
                          }}
                        >
                          Clear
                        </Button>
                      </div>
                    </form>
                  </CardContent>
                </Card>
                <div className="grid content-start gap-5">
                  <Card>
                    <CardHeader>
                      <CardTitle>Interactive feedback</CardTitle>
                    </CardHeader>
                    <CardContent className="grid gap-4">
                      <Alert variant="success" title="All systems operational">
                        Sample validation is available.
                      </Alert>
                      <div className="flex flex-wrap gap-2">
                        <Button
                          size="small"
                          onClick={() => announce("Success feedback")}
                        >
                          Success toast
                        </Button>
                        <Dialog>
                          <DialogTrigger variant="secondary">
                            Open dialog
                          </DialogTrigger>
                          <DialogContent>
                            <DialogTitle>Example confirmation</DialogTitle>
                            <DialogDescription>
                              Focus is trapped until this dialog is closed.
                              Press Escape to return to the trigger.
                            </DialogDescription>
                            <Button
                              onClick={() => announce("Example acknowledged")}
                            >
                              Acknowledge
                            </Button>
                          </DialogContent>
                        </Dialog>
                      </div>
                      <Popover>
                        <PopoverTrigger>
                          Help popover{" "}
                          <span className="marisma-motion-chevron">⌄</span>
                        </PopoverTrigger>
                        <PopoverContent>
                          <p className="font-semibold">Field guidance</p>
                          <p className="mt-2 text-sm text-mar-muted">
                            Required fields use native browser validation. This
                            is local-only.
                          </p>
                        </PopoverContent>
                      </Popover>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardHeader>
                      <CardTitle>Selection states</CardTitle>
                    </CardHeader>
                    <CardContent className="grid gap-4">
                      <Switch label="Notifications" defaultChecked />
                      <Tabs defaultValue="first">
                        <TabsList>
                          <TabsTrigger value="first">Details</TabsTrigger>
                          <TabsTrigger value="second">History</TabsTrigger>
                        </TabsList>
                        <TabsContent value="first">
                          Current setting overview
                        </TabsContent>
                        <TabsContent value="second">
                          No historical changes in this preview.
                        </TabsContent>
                      </Tabs>
                    </CardContent>
                  </Card>
                </div>
              </div>
            )}
            {page === "data" && (
              <div className="mt-8 grid gap-6">
                <div className="grid gap-5 lg:grid-cols-[1fr_1.25fr]">
                  <Card>
                    <CardHeader>
                      <CardTitle>Filter observations</CardTitle>
                      <CardDescription>
                        Selections immediately update the local records
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="grid gap-4">
                      <Popover open={filterOpen} onOpenChange={setFilterOpen}>
                        <PopoverTrigger>
                          Region: {region === "all" ? "All regions" : region}{" "}
                          <span className="marisma-motion-chevron">⌄</span>
                        </PopoverTrigger>
                        <PopoverContent align="start">
                          <div className="grid gap-3">
                            <p className="font-semibold">Choose a region</p>
                            {["all", "North", "South"].map((x) => (
                              <Button
                                variant={region === x ? "primary" : "secondary"}
                                size="small"
                                key={x}
                                onClick={() => {
                                  setRegion(x);
                                  setFilterOpen(false);
                                }}
                              >
                                {x === "all" ? "All regions" : x}
                              </Button>
                            ))}
                          </div>
                        </PopoverContent>
                      </Popover>
                      <SearchField
                        label="Find a station"
                        onSearch={setSearch}
                        onValueChange={setSearch}
                        value={search}
                      />
                      <div className="flex gap-3">
                        <Button
                          variant="secondary"
                          size="small"
                          onClick={() => {
                            setRegion("all");
                            setSearch("");
                          }}
                        >
                          Reset filters
                        </Button>
                        <Badge variant="info">{filtered.length} results</Badge>
                      </div>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardHeader>
                      <CardTitle>Calendar</CardTitle>
                      <CardDescription>Selected date: {date}</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <Calendar
                        initialMonth="2026-11-01"
                        value={date}
                        onValueChange={setDate}
                        weekStartsOn={1}
                      />
                    </CardContent>
                  </Card>
                </div>
                <Card>
                  <CardHeader>
                    <CardTitle>Station readings</CardTitle>
                    <CardDescription>
                      Sortable sample data is not claimed; use the filters
                      above.
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Table
                      aria-label="Monitoring station readings"
                      scrollLabel="Monitoring records"
                    >
                      <TableHeader>
                        <TableRow>
                          <TableHead>Station</TableHead>
                          <TableHead>Region</TableHead>
                          <TableHead>Date</TableHead>
                          <TableHead>Level</TableHead>
                          <TableHead>Status</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {filtered.map((x) => (
                          <TableRow key={x.id}>
                            <TableRowHeader>{x.name}</TableRowHeader>
                            <TableCell>{x.region}</TableCell>
                            <TableCell>{x.date}</TableCell>
                            <TableCell>{x.level}</TableCell>
                            <TableCell>
                              <Badge
                                variant={
                                  x.status === "Healthy" ? "success" : "warning"
                                }
                              >
                                {x.status}
                              </Badge>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </CardContent>
                </Card>
                <div className="flex flex-wrap gap-3">
                  <Button
                    variant="secondary"
                    onClick={() => setShowEmpty(!showEmpty)}
                  >
                    Toggle empty state
                  </Button>
                  <Button
                    variant="secondary"
                    onClick={() => setShowError(!showError)}
                  >
                    Toggle error state
                  </Button>
                </div>
                <RecordList
                  label="Data loading and failure examples"
                  records={showEmpty ? [] : filtered.slice(0, 2)}
                  error={
                    showError
                      ? "Simulated connection issue — no requests were made."
                      : undefined
                  }
                  getKey={(x) => x.id}
                  renderRecord={(x) => (
                    <RecordListItem title={x.name} description={x.status} />
                  )}
                  emptyState="Nothing here yet. Reset the filters to continue."
                />
                <DataPreview
                  label="Sample API shape"
                  data={{ selectedDate: date, region, observations: filtered }}
                />
              </div>
            )}
            {page === "motion" && (
              <div className="mt-8 grid gap-5">
                <div className="flex flex-wrap gap-3">
                  <Button onClick={() => setReplay((n) => n + 1)}>
                    Replay entrance
                  </Button>
                  <Button
                    variant="secondary"
                    aria-pressed={paused}
                    onClick={() => setPaused((x) => !x)}
                  >
                    {paused ? "Resume animations" : "Pause animations"}
                  </Button>
                </div>
                <div className="grid gap-5 lg:grid-cols-3">
                  <Card key={replay} className="marisma-motion-rise">
                    <CardHeader>
                      <Badge>500 ms · Rise</Badge>
                      <CardTitle>Soft feature entrance</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-mar-muted text-sm">
                        Transform and opacity only, with a measured rise curve.
                      </p>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardHeader>
                      <Badge>320 ms · Spring</Badge>
                      <CardTitle>Overlay reveal</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <Button
                        variant="secondary"
                        onClick={() => setSpringOpen((v) => !v)}
                        aria-expanded={springOpen}
                      >
                        Toggle spring panel{" "}
                        <span className="marisma-motion-chevron">⌄</span>
                      </Button>
                      {springOpen && (
                        <div
                          data-motion="spring"
                          className="marisma-motion-overlay mt-3 rounded-mar-control border border-mar-separator bg-mar-surface p-4 text-sm"
                        >
                          A lightweight inline study of the optional spring
                          response.
                        </div>
                      )}
                    </CardContent>
                  </Card>
                  <Card>
                    <CardHeader>
                      <Badge>1000 ms · Busy</Badge>
                      <CardTitle>Meaningful progress</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="flex items-center gap-5">
                        <Spinner
                          label="Example loading indicator"
                          size="large"
                        />
                        <span className="text-sm text-mar-muted">
                          Loading indicator
                        </span>
                      </div>
                    </CardContent>
                  </Card>
                </div>
                <Card>
                  <CardHeader>
                    <CardTitle>
                      Selection, chevron & directional feedback
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="flex flex-wrap items-center gap-5">
                    <Popover>
                      <PopoverTrigger>
                        Open filter{" "}
                        <span className="marisma-motion-chevron">⌄</span>
                      </PopoverTrigger>
                      <PopoverContent>
                        Escape closes this Radix popover and restores focus.
                      </PopoverContent>
                    </Popover>
                    <Button
                      variant="secondary"
                      onClick={() => announce("Directional action")}
                    >
                      <span>Explore details</span>
                      <span className="marisma-motion-arrow">↗</span>
                    </Button>
                    <span className="marisma-motion-pulse inline-flex items-center gap-2 text-sm text-mar-muted">
                      <span className="showcase-dot" />
                      Monitoring live
                    </span>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader>
                    <CardTitle>Optional elastic bounce</CardTitle>
                    <CardDescription>
                      620 ms · technique-only motion study, not a default
                      interaction
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="flex flex-wrap items-center gap-4">
                    <span
                      key={replay}
                      className="marisma-motion-bounce inline-grid size-12 place-items-center rounded-mar-card bg-mar-selection text-2xl text-mar-primary"
                      aria-hidden="true"
                    >
                      ◈
                    </span>
                    <Button
                      variant="secondary"
                      onClick={() => setReplay((n) => n + 1)}
                    >
                      Replay bounce
                    </Button>
                  </CardContent>
                </Card>
                <p className="text-sm text-mar-muted">
                  Motion is suppressed by the operating system’s reduced-motion
                  preference. The pause control affects repeating and decorative
                  examples; Radix focus behavior remains active.
                </p>
              </div>
            )}
            {page === "settings" && (
              <div className="mt-8 grid gap-6 lg:grid-cols-2">
                <Card>
                  <CardHeader>
                    <CardTitle>Appearance</CardTitle>
                    <CardDescription>
                      Tokens apply to both the content and portalled controls
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="grid gap-4">
                    <Select
                      label="Accent family"
                      value={accent}
                      onValueChange={(v) => setAccent(v as Accent)}
                      options={[
                        { value: "reedwater", label: "Reedwater" },
                        { value: "tidal-blue", label: "Tidal Blue" },
                      ]}
                    />
                    <Select
                      label="Color mode"
                      value={mode}
                      onValueChange={(v) => setMode(v as Mode)}
                      options={[
                        { value: "light", label: "Light" },
                        { value: "dark", label: "Dark" },
                      ]}
                    />
                    <Alert title="Scope-aware design" variant="info">
                      Both accent families support light and dark independently.
                    </Alert>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader>
                    <CardTitle>Pattern library</CardTitle>
                  </CardHeader>
                  <CardContent className="grid gap-4">
                    <StepProgress aria-label="Review stages">
                      <StepProgressItem status="complete" step={1}>
                        Explore
                      </StepProgressItem>
                      <StepProgressItem status="current" step={2}>
                        Review
                      </StepProgressItem>
                      <StepProgressItem status="upcoming" step={3}>
                        Approve
                      </StepProgressItem>
                    </StepProgress>
                    <Separator />
                    <Collapsible>
                      <CollapsibleTrigger>
                        What is this showcase?
                      </CollapsibleTrigger>
                      <CollapsibleContent>
                        This is a client-only example. No account or data
                        persistence is needed.
                      </CollapsibleContent>
                    </Collapsible>
                    <CopyCode
                      code="import { Button } from '@darizae/marisma'"
                      language="TypeScript"
                    />
                  </CardContent>
                </Card>
              </div>
            )}
          </main>
          <PageFooter className="mx-auto max-w-6xl px-4 pb-8 sm:px-8">
            Marisma · Fictional estuary data · Built with the public component
            API
          </PageFooter>
        </div>
      </Sidebar>
    </div>
  );
}
function App() {
  return (
    <ToastProvider>
      <TooltipProvider>
        <AppBody />
      </TooltipProvider>
    </ToastProvider>
  );
}
createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);
