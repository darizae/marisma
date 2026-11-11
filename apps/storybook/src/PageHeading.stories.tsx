import type { Meta, StoryObj } from "@storybook/react-vite";
import { Badge, Button, PageHeading } from "@darizae/marisma";

const meta = {
  title: "Page patterns/PageHeading",
  component: PageHeading,
  tags: ["autodocs"],
  args: {
    actions: (
      <div className="flex flex-wrap gap-2">
        <Button type="button" variant="secondary">
          Export
        </Button>
        <Button type="button">Add station</Button>
      </div>
    ),
    breadcrumbs: (
      <div className="flex flex-wrap gap-2">
        <a href="#workspace">Workspace</a>
        <span aria-hidden="true">/</span>
        <span>Stations</span>
      </div>
    ),
    description:
      "Generalized page context, optional metadata, and caller-owned actions remain readable at narrow widths.",
    eyebrow: "Monitoring",
    metadata: <Badge variant="success">24 current stations</Badge>,
    title: "Tide stations and observation platforms",
  },
  parameters: {
    docs: {
      description: {
        component:
          "A page-level h1 composition with optional breadcrumb, eyebrow, description, metadata, and action regions. Destinations and action behavior remain caller-owned.",
      },
    },
  },
} satisfies Meta<typeof PageHeading>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
