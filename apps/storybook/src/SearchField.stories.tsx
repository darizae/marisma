import { useState } from "react";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { expect, userEvent, within } from "storybook/test";
import { SearchField } from "@darizae/marisma";

function SearchFixture() {
  const [query, setQuery] = useState("");
  const [status, setStatus] = useState("No search submitted");
  return (
    <div className="grid max-w-lg gap-3">
      <SearchField
        description="Empty queries are disabled; surrounding whitespace is trimmed."
        label="Search stations"
        onSearch={(nextQuery) => setStatus(`Searching for ${nextQuery}`)}
        onValueChange={setQuery}
        value={query}
      />
      <p aria-live="polite" className="text-sm text-mar-muted">
        {status}
      </p>
    </div>
  );
}

const meta = {
  title: "Forms/Search Field",
  component: SearchFixture,
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component:
          "A labeled native search input with explicit clear and search actions. Enter submits the normalized query, Escape remains native input behavior, and allowEmpty controls whether an empty query may be submitted.",
      },
    },
  },
} satisfies Meta<typeof SearchFixture>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Manual: Story = {};

export const SubmitAndClear: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const input = canvas.getByRole("searchbox", { name: "Search stations" });
    await expect(canvas.getByRole("button", { name: "Search" })).toBeDisabled();
    await userEvent.type(input, " reeds ");
    await userEvent.keyboard("{Enter}");
    await expect(canvas.getByText("Searching for reeds")).toBeVisible();
    await userEvent.click(canvas.getByRole("button", { name: "Clear search" }));
    await expect(input).toHaveValue("");
    await expect(input).toHaveFocus();
  },
};
