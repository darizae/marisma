import type { ComponentProps } from "react";
import type { Meta, StoryObj } from "@storybook/react-vite";
import {
  AppNavbar,
  AppShell,
  Badge,
  Sidebar,
  SidebarContent,
  SidebarLink,
  SidebarNav,
  SidebarTrigger,
} from "@darizae/marisma";

function ConsumerLink({
  to,
  ...props
}: Omit<ComponentProps<"a">, "href"> & { to: string }) {
  return <a href={to} {...props} />;
}

function SidebarFixture() {
  return (
    <Sidebar>
      <AppShell
        header={
          <AppNavbar
            brand="Marisma"
            start={<SidebarTrigger>Menu</SidebarTrigger>}
          />
        }
        mainClassName="p-5 sm:p-8"
        sidebar={
          <SidebarContent
            footer={<p className="text-sm text-mar-muted">Calm workspace</p>}
            header={<Badge variant="success">All systems current</Badge>}
            title="Estuary workspace"
          >
            <SidebarNav label="Workspace">
              <SidebarLink current href="#overview">
                Overview
              </SidebarLink>
              <SidebarLink asChild>
                <ConsumerLink to="#stations">
                  A consumer-link label long enough to wrap safely
                </ConsumerLink>
              </SidebarLink>
              <SidebarLink href="#observations">Observations</SidebarLink>
              <SidebarLink href="#settings">Settings</SidebarLink>
            </SidebarNav>
          </SidebarContent>
        }
      >
        <section className="mx-auto max-w-4xl" id="overview">
          <h1 className="text-3xl font-semibold">Responsive sidebar</h1>
          <p className="mt-3 max-w-2xl text-mar-muted">
            Resize below 1024px to use the modal navigation. Escape and the
            overlay dismiss it and return focus to the trigger.
          </p>
        </section>
      </AppShell>
    </Sidebar>
  );
}

const meta = {
  title: "Navigation/Sidebar",
  component: SidebarFixture,
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component:
          "A router-agnostic desktop aside and Radix-backed mobile dialog. SidebarLink supports native anchors or a consumer link through asChild. The application owns destinations and route state.",
      },
    },
  },
} satisfies Meta<typeof SidebarFixture>;

export default meta;
type Story = StoryObj<typeof meta>;

export const ResponsiveNavigation: Story = {};
