import type { Meta, StoryObj } from "@storybook/react-vite";
import { Button, PageSection } from "@darizae/marisma";

const meta = {
  title: "Layout/PageSection",
  component: PageSection,
  tags: ["autodocs"],
  args: {
    actions: (
      <Button size="small" type="button" variant="secondary">
        Add station
      </Button>
    ),
    children: (
      <div className="rounded-xl border border-dashed border-mar-border bg-mar-card p-8 text-center text-mar-muted">
        Section content stays caller-owned.
      </div>
    ),
    description: "A named content section with optional contextual actions.",
    title: "Monitoring stations",
  },
  parameters: {
    docs: {
      description: {
        component:
          "A generalized named page section with heading, description, actions, and unrestricted content. Choose the heading level to preserve the page outline.",
      },
    },
  },
} satisfies Meta<typeof PageSection>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
