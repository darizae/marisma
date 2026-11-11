import type { Meta, StoryObj } from "@storybook/react-vite";
import { Button, ErrorView } from "@darizae/marisma";

const meta = {
  title: "Page patterns/ErrorView",
  component: ErrorView,
  tags: ["autodocs"],
  args: {
    actions: (
      <>
        <Button type="button">Try again</Button>
        <a
          className="inline-flex min-h-11 items-center rounded-lg px-4 py-2 font-semibold text-mar-text underline underline-offset-4"
          href="#overview"
        >
          Return to overview
        </a>
      </>
    ),
    code: "Error 503",
    description:
      "Monitoring records are temporarily unavailable. The application decides how retry and navigation work.",
    details: "Reference: caller-provided-status-id",
    title: "Records unavailable",
    visual: <span className="text-5xl">≈</span>,
  },
  parameters: {
    docs: {
      description: {
        component:
          "A named page-level error surface with caller-owned copy, retry controls, links, diagnostic details, and optional decorative visual. It never fetches or retries on its own.",
      },
    },
  },
} satisfies Meta<typeof ErrorView>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Recoverable: Story = {};
