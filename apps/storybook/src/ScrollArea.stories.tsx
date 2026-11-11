import type { Meta, StoryObj } from "@storybook/react-vite";
import { ScrollArea } from "@darizae/marisma";

const meta = {
  title: "Components/Scroll Area",
  component: ScrollArea,
  tags: ["autodocs"],
  args: { "aria-label": "Recent tide readings" },
  parameters: {
    docs: {
      description: {
        component:
          "A focusable native overflow region that keeps browser scrolling, touch, wheel, and keyboard fallback behavior. Always provide an accessible name.",
      },
    },
  },
} satisfies Meta<typeof ScrollArea>;

export default meta;
type Story = StoryObj<typeof meta>;

export const NativeOverflow: Story = {
  render: (args) => (
    <ScrollArea
      {...args}
      className="max-h-48 w-full max-w-lg border border-mar-border bg-mar-card p-3"
    >
      <ul className="grid gap-2">
        {Array.from({ length: 18 }, (_, index) => (
          <li className="rounded-lg bg-mar-surface p-3" key={index}>
            Reading {index + 1}: {(2.4 + index / 10).toFixed(1)} m
          </li>
        ))}
      </ul>
    </ScrollArea>
  ),
};
