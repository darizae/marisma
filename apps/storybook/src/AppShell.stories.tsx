import type { Meta, StoryObj } from "@storybook/react-vite";
import {
  AppNavbar,
  AppNavbarLink,
  AppShell,
  PageFooter,
  PageHeading,
  PageSection,
} from "@darizae/marisma";

function ShellFixture() {
  return (
    <AppShell
      footer={
        <PageFooter navigation={<a href="#privacy">Privacy</a>}>
          Marisma contributors
        </PageFooter>
      }
      header={
        <AppNavbar brand={<a href="#home">Marisma</a>}>
          <AppNavbarLink current href="#records">
            Records
          </AppNavbarLink>
          <AppNavbarLink href="#settings">Settings</AppNavbarLink>
        </AppNavbar>
      }
      mainClassName="p-5 sm:p-8"
    >
      <div className="mx-auto grid max-w-5xl gap-8">
        <PageHeading
          description="AppShell composes landmarks without owning routes, records, or global state."
          title="Workspace overview"
        />
        <PageSection title="Current work">
          <div className="min-h-64 rounded-xl border border-dashed border-mar-border bg-mar-card p-6 text-mar-muted">
            Main content
          </div>
        </PageSection>
      </div>
    </AppShell>
  );
}

const meta = {
  title: "Layout/AppShell",
  component: ShellFixture,
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component:
          "Composes a skip link, optional sidebar/header/footer regions, and one focusable main landmark. Applications retain router, data, auth, and persistence ownership.",
      },
    },
  },
} satisfies Meta<typeof ShellFixture>;

export default meta;
type Story = StoryObj<typeof meta>;

export const LandmarksAndSkipLink: Story = {};
