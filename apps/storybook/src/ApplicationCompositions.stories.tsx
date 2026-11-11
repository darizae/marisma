import type { Meta, StoryObj } from "@storybook/react-vite";
import {
  AppNavbar,
  AppNavbarLink,
  AppShell,
  Badge,
  Button,
  Card,
  CardContent,
  CardDescription,
  CardGrid,
  CardGridItem,
  CardHeader,
  CardTitle,
  DataPreview,
  DropdownMenuItem,
  PageFooter,
  PageHeading,
  PageSection,
  RecordList,
  RecordListItem,
  Sidebar,
  SidebarContent,
  SidebarLink,
  SidebarNav,
  SidebarTrigger,
  StepProgress,
  StepProgressItem,
  StepProgressLink,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
  TableRowHeader,
  UserMenu,
} from "@darizae/marisma";

const records = [
  { id: "north-bank", name: "North bank", status: "Current" },
  { id: "salt-marsh", name: "Salt-marsh edge", status: "Review" },
  { id: "south-inlet", name: "South inlet", status: "Current" },
];

function ApplicationPage() {
  return (
    <div className="-m-6 w-[calc(100%+3rem)] sm:-m-10 sm:w-[calc(100%+5rem)]">
      <Sidebar>
        <AppShell
          footer={
            <PageFooter navigation={<a href="#support">Support</a>}>
              Marisma monitoring fixture
            </PageFooter>
          }
          header={
            <AppNavbar
              actions={
                <UserMenu description="ada@example.test" name="Ada Lovelace">
                  <DropdownMenuItem>Profile</DropdownMenuItem>
                  <DropdownMenuItem variant="danger">Sign out</DropdownMenuItem>
                </UserMenu>
              }
              brand={<a href="#overview">Marisma</a>}
              start={<SidebarTrigger>Menu</SidebarTrigger>}
            >
              <AppNavbarLink current href="#overview">
                Overview
              </AppNavbarLink>
              <AppNavbarLink href="#stations">Stations</AppNavbarLink>
            </AppNavbar>
          }
          mainClassName="p-5 sm:p-8"
          sidebar={
            <SidebarContent title="Monitoring workspace">
              <SidebarNav label="Workspace">
                <SidebarLink current href="#overview">
                  Overview
                </SidebarLink>
                <SidebarLink href="#stations">Stations</SidebarLink>
                <SidebarLink href="#observations">Observations</SidebarLink>
                <SidebarLink href="#settings">
                  Settings with a deliberately long label
                </SidebarLink>
              </SidebarNav>
            </SidebarContent>
          }
        >
          <div className="mx-auto grid max-w-6xl gap-8" id="overview">
            <PageHeading
              actions={<Button type="button">Add station</Button>}
              description="A realistic router- and data-provider-agnostic page composition."
              eyebrow="Monitoring"
              metadata={<Badge variant="success">System current</Badge>}
              title="Estuary overview"
            />

            <StepProgress label="Station onboarding">
              <StepProgressItem status="complete" step="1">
                <StepProgressLink href="#details">Details</StepProgressLink>
              </StepProgressItem>
              <StepProgressItem status="current" step="2">
                <StepProgressLink href="#sensors">Sensors</StepProgressLink>
              </StepProgressItem>
              <StepProgressItem step="3">Review</StepProgressItem>
            </StepProgress>

            <PageSection
              description="Responsive summaries with stable caller keys."
              title="Conditions"
            >
              <CardGrid aria-label="Condition summaries">
                {["Water level", "Salinity", "Temperature"].map(
                  (label, index) => (
                    <CardGridItem key={label}>
                      <Card className="h-full">
                        <CardHeader>
                          <CardTitle>{label}</CardTitle>
                          <CardDescription>Latest observation</CardDescription>
                        </CardHeader>
                        <CardContent className="text-2xl font-semibold">
                          {index === 0
                            ? "2.4 m"
                            : index === 1
                              ? "31.8 PSU"
                              : "18.6 °C"}
                        </CardContent>
                      </Card>
                    </CardGridItem>
                  ),
                )}
              </CardGrid>
            </PageSection>

            <PageSection title="Stations">
              <RecordList
                getKey={(record) => record.id}
                label="Recent stations"
                records={records}
                renderRecord={(record) => (
                  <RecordListItem
                    actions={
                      <Button size="small" type="button" variant="secondary">
                        Open
                      </Button>
                    }
                    meta="Updated today"
                    title={record.name}
                  >
                    <Badge
                      variant={
                        record.status === "Current" ? "success" : "warning"
                      }
                    >
                      {record.status}
                    </Badge>
                  </RecordListItem>
                )}
              />
            </PageSection>

            <PageSection title="Semantic table">
              <Table
                aria-label="Station states"
                scrollLabel="Station state table"
              >
                <TableHeader>
                  <TableRow>
                    <TableHead>Station</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Updated</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {records.map((record) => (
                    <TableRow key={record.id}>
                      <TableRowHeader>{record.name}</TableRowHeader>
                      <TableCell>{record.status}</TableCell>
                      <TableCell>Today</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </PageSection>

            <DataPreview
              collapsedCharacters={180}
              data={{ records, source: "caller-owned fixture" }}
              label="Fixture data"
              maxCharacters={600}
            />
          </div>
        </AppShell>
      </Sidebar>
    </div>
  );
}

const meta = {
  title: "Compositions/Application page",
  component: ApplicationPage,
  parameters: {
    docs: {
      description: {
        component:
          "A realistic integration of every T-010 structure. Links, user identity, records, state changes, and actions are fixture-owned so the library remains provider-agnostic.",
      },
    },
  },
} satisfies Meta<typeof ApplicationPage>;

export default meta;
type Story = StoryObj<typeof meta>;

export const ReedwaterLight: Story = {
  globals: { marismaAccent: "reedwater", marismaMode: "light" },
};

export const TidalBlueDark: Story = {
  globals: { marismaAccent: "tidal-blue", marismaMode: "dark" },
};
