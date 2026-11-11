import type { ComponentProps } from "react";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { AppNavbar, AppNavbarLink, Badge, Button } from "@darizae/marisma";

function RouterLink({
  to,
  ...props
}: Omit<ComponentProps<"a">, "href"> & { to: string }) {
  return <a href={to} {...props} />;
}

function NavbarFixture() {
  return (
    <div className="w-full min-w-0 overflow-hidden rounded-xl border border-mar-border">
      <AppNavbar
        actions={
          <Button size="small" type="button" variant="secondary">
            Create
          </Button>
        }
        brand={<a href="#home">Marisma</a>}
        sticky={false}
      >
        <AppNavbarLink current href="#records">
          Records
        </AppNavbarLink>
        <AppNavbarLink asChild>
          <RouterLink to="#monitoring">Consumer router link</RouterLink>
        </AppNavbarLink>
        <AppNavbarLink href="#activity">
          Activity with a deliberately long label
        </AppNavbarLink>
      </AppNavbar>
      <div className="flex min-h-52 items-center justify-center bg-mar-surface p-6">
        <Badge variant="info">Horizontally safe at narrow widths</Badge>
      </div>
    </div>
  );
}

const meta = {
  title: "Navigation/AppNavbar",
  component: NavbarFixture,
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component:
          "An application header with branded, navigation, leading-control, and action regions. Links are native by default and support consumer router components through asChild.",
      },
    },
  },
} satisfies Meta<typeof NavbarFixture>;

export default meta;
type Story = StoryObj<typeof meta>;

export const RouterAgnostic: Story = {};
