import type { Meta, StoryObj } from "@storybook/react-vite";
import { expect, fn, userEvent, within } from "storybook/test";
import { Button } from "@darizae/marisma";

const meta = {
  title: "Components/Button",
  component: Button,
  args: {
    children: "Save changes",
  },
  decorators: [
    (Story) => (
      <div
        className="min-w-80 rounded-xl bg-mar-surface p-8 font-mar-sans text-mar-text"
        data-marisma-accent="reedwater"
        data-marisma-mode="light"
      >
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof Button>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Behavior: Story = {
  args: { onClick: fn() },
  render: (args) => (
    <div className="flex flex-wrap gap-3">
      <Button {...args} />
      <Button disabled onClick={args.onClick} variant="secondary">
        Disabled
      </Button>
      <Button loading onClick={args.onClick}>
        Loading
      </Button>
    </div>
  ),
  play: async ({ args, canvasElement }) => {
    const canvas = within(canvasElement);
    await userEvent.click(canvas.getByRole("button", { name: "Save changes" }));
    await userEvent.click(canvas.getByRole("button", { name: "Disabled" }));
    await userEvent.click(canvas.getByRole("button", { name: "Loading" }));
    await expect(args.onClick).toHaveBeenCalledTimes(1);
    await expect(
      canvas.getByRole("button", { name: "Loading" }),
    ).toHaveAttribute("aria-busy", "true");
  },
};

export const ThemeVariants: Story = {
  render: () => (
    <div className="grid gap-3 sm:grid-cols-2">
      {(
        [
          ["reedwater", "light", "Reedwater light"],
          ["reedwater", "dark", "Reedwater dark"],
          ["tidal-blue", "light", "Tidal Blue light"],
          ["tidal-blue", "dark", "Tidal Blue dark"],
        ] as const
      ).map(([accent, mode, label]) => (
        <div
          className="rounded-lg bg-mar-surface p-4 text-mar-text"
          data-marisma-accent={accent}
          data-marisma-mode={mode}
          key={label}
        >
          <p className="mb-3 text-sm text-mar-muted">{label}</p>
          <Button>{label}</Button>
        </div>
      ))}
    </div>
  ),
};
