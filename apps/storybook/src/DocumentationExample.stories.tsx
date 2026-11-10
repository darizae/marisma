import type { Meta, StoryObj } from "@storybook/react-vite";
import { MarismaExample } from "./DocumentationExample";

const meta = {
  title: "Documentation/Getting Started",
  component: MarismaExample,
  parameters: {
    docs: {
      description: {
        component:
          "This is the exact Button, Input, and Dialog example shown in both public README files. Use the toolbar to switch accent and mode.",
      },
    },
  },
} satisfies Meta<typeof MarismaExample>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const TidalBlueDark: Story = {
  globals: { marismaAccent: "tidal-blue", marismaMode: "dark" },
};
