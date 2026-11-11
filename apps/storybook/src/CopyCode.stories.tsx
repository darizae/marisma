import type { Meta, StoryObj } from "@storybook/react-vite";
import { CopyCode } from "@darizae/marisma";

const meta = {
  title: "Components/Copy Code",
  component: CopyCode,
  tags: ["autodocs"],
  args: {
    code: 'import { Button } from "@darizae/marisma";',
    language: "TypeScript",
  },
  parameters: {
    docs: {
      description: {
        component:
          "A safe text-only code block with clipboard success and permission/failure announcements. The code stays focusable and selectable as a manual fallback.",
      },
    },
  },
} satisfies Meta<typeof CopyCode>;

export default meta;
type Story = StoryObj<typeof meta>;

export const ClipboardFeedback: Story = {
  args: { className: "w-full max-w-2xl" },
};
