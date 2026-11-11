import type { Meta, StoryObj } from "@storybook/react-vite";
import { expect, userEvent, within } from "storybook/test";
import { Dropzone } from "@darizae/marisma";

const meta = {
  title: "Forms/Dropzone",
  component: Dropzone,
  tags: ["autodocs"],
  args: {
    accept: "image/png,.jpg",
    description: "PNG or JPG, at most two files and 1 MB each.",
    label: "Choose evidence files",
    maxFiles: 2,
    maxSize: 1_000_000,
    multiple: true,
  },
  parameters: {
    docs: {
      description: {
        component:
          "A native file input plus drag-and-drop selection with MIME/extension, size, count, duplicate, clear, reset, and reselection behavior. It reports metadata-based validation only: files are not uploaded, parsed, executed, persisted, or malware-scanned.",
      },
    },
  },
} satisfies Meta<typeof Dropzone>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Manual: Story = {};

export const SelectionAndRejection: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const input = canvas.getByLabelText("Choose evidence files");
    const accepted = new File(["image"], "marsh.png", { type: "image/png" });
    await userEvent.upload(input, accepted);
    await expect(canvas.getByText("marsh.png")).toBeVisible();

    const rejected = new File(["notes"], "notes.txt", { type: "text/plain" });
    await userEvent.upload(input, rejected, { applyAccept: false });
    await expect(canvas.getByRole("alert")).toHaveTextContent(
      "notes.txt is not an accepted file type",
    );
  },
};

export const Disabled: Story = {
  args: { disabled: true },
};

export const TidalBlueDark: Story = {
  globals: { marismaAccent: "tidal-blue", marismaMode: "dark" },
};
