import type { Meta, StoryObj } from "@storybook/react-vite";
import { DataPreview } from "@darizae/marisma";

const payload = {
  station: "north-bank",
  note: "<script>untrusted text remains text</script>",
  observations: Array.from({ length: 24 }, (_, index) => ({
    id: index + 1,
    salinity: 31.4 + index / 10,
    status: index % 5 ? "current" : "review",
  })),
};

const meta = {
  title: "Data display/DataPreview",
  component: DataPreview,
  tags: ["autodocs"],
  args: {
    collapsedCharacters: 360,
    data: payload,
    label: "Observation payload",
    maxCharacters: 1_200,
  },
  parameters: {
    docs: {
      description: {
        component:
          "Serializes structured or text input into a text-only code surface. Collapse and hard character limits prevent unbounded rendering; it never injects supplied HTML.",
      },
    },
  },
} satisfies Meta<typeof DataPreview>;

export default meta;
type Story = StoryObj<typeof meta>;

export const CappedAndCollapsible: Story = {};
