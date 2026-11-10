import type { Meta, StoryObj } from "@storybook/react-vite";
import { expect, fn, userEvent, within } from "storybook/test";
import { Button } from "@darizae/marisma";

const meta = {
  title: "Components/Button",
  component: Button,
  tags: ["autodocs"],
  args: {
    children: "Save changes",
  },
  argTypes: {
    variant: {
      control: "select",
      options: ["primary", "secondary", "ghost"],
    },
    size: {
      control: "select",
      options: ["small", "default", "large"],
    },
    fullWidth: { control: "boolean" },
    loading: { control: "boolean" },
    disabled: { control: "boolean" },
  },
  parameters: {
    docs: {
      description: {
        component:
          "A native button with primary, secondary, and ghost variants; three sizes; forwarded native props; and a loading state that prevents activation while keeping its accessible name.",
      },
    },
  },
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

export const VariantsAndSizes: Story = {
  parameters: {
    docs: {
      description: {
        story:
          "Every public variant and size. Use Tab to focus each native button and Enter or Space to activate it.",
      },
    },
  },
  render: () => (
    <div className="grid gap-4 rounded-xl border border-mar-border bg-mar-card p-6">
      {(["primary", "secondary", "ghost"] as const).map((variant) => (
        <div className="flex flex-wrap items-center gap-3" key={variant}>
          {(["small", "default", "large"] as const).map((size) => (
            <Button key={size} size={size} variant={variant}>
              {variant} {size}
            </Button>
          ))}
        </div>
      ))}
    </div>
  ),
};

export const ThemeVariants: Story = {
  parameters: {
    docs: {
      description: {
        story:
          "The same primary action under all four supported accent and mode combinations.",
      },
    },
  },
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
