import type { Meta, StoryObj } from "@storybook/react-vite";
import { expect, userEvent, within } from "storybook/test";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@darizae/marisma";

function StationTooltip() {
  return (
    <TooltipProvider delayDuration={100}>
      <Tooltip>
        <TooltipTrigger aria-label="Station help">?</TooltipTrigger>
        <TooltipContent>Uses the nearest active station.</TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}

const meta = {
  title: "Components/Tooltip",
  component: StationTooltip,
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component:
          "A portalled Radix tooltip for short, non-interactive supporting text. It opens on hover or keyboard focus, closes on Escape, and inherits the nearest Marisma theme. Essential or interactive content belongs in ordinary content or a Popover.",
      },
    },
  },
} satisfies Meta<typeof StationTooltip>;

export default meta;
type Story = StoryObj<typeof meta>;

export const FocusAndEscape: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const trigger = canvas.getByRole("button", { name: "Station help" });
    await userEvent.tab();
    await expect(trigger).toHaveFocus();
    await expect(
      await within(document.body).findByRole("tooltip"),
    ).toHaveTextContent("Uses the nearest active station.");
    await userEvent.keyboard("{Escape}");
    await expect(
      within(document.body).queryByRole("tooltip"),
    ).not.toBeInTheDocument();
  },
};

export const TidalBlueDark: Story = {
  globals: { marismaAccent: "tidal-blue", marismaMode: "dark" },
};
