import type { Meta, StoryObj } from "@storybook/react-vite";
import { PageFooter } from "@darizae/marisma";

const meta = {
  title: "Layout/PageFooter",
  component: PageFooter,
  tags: ["autodocs"],
  args: {
    children: "Marisma contributors · MIT",
    navigation: (
      <div className="flex flex-wrap gap-4">
        <a href="#documentation">Documentation</a>
        <a href="#license">License</a>
      </div>
    ),
  },
  parameters: {
    docs: {
      description: {
        component:
          "A content-info landmark with optional labelled navigation. All links and legal or product copy are supplied by the caller.",
      },
    },
  },
} satisfies Meta<typeof PageFooter>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
