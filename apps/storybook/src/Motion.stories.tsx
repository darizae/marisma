import { useState } from "react";
import type { Meta, StoryObj } from "@storybook/react-vite";
import {
  Button,
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  Popover,
  PopoverContent,
  PopoverTrigger,
  Spinner,
  Select,
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@darizae/marisma";
function MotionStudies() {
  const [replay, setReplay] = useState(0);
  const [paused, setPaused] = useState(false);
  return (
    <div
      data-marisma-motion={paused ? "paused" : "running"}
      className="grid max-w-2xl gap-5 p-5"
    >
      <div className="flex flex-wrap gap-3">
        <Button onClick={() => setReplay((v) => v + 1)}>Replay entrance</Button>
        <Button
          variant="secondary"
          aria-pressed={paused}
          onClick={() => setPaused((x) => !x)}
        >
          {paused ? "Resume examples" : "Pause examples"}
        </Button>
      </div>
      <Card key={replay} className="marisma-motion-rise">
        <CardHeader>
          <CardTitle>Feature card entrance</CardTitle>
        </CardHeader>
        <CardContent>
          500ms opacity and transform transition; reduced motion disables the
          entrance.
        </CardContent>
      </Card>
      <div className="flex flex-wrap items-center gap-3">
        <Popover>
          <PopoverTrigger>
            Filter options{" "}
            <span className="marisma-motion-chevron" aria-hidden="true">
              ⌄
            </span>
          </PopoverTrigger>
          <PopoverContent aria-label="Motion filter">
            <p className="font-semibold">Filter options</p>
            <p>Escape closes and returns focus to the trigger.</p>
          </PopoverContent>
        </Popover>
        <DropdownMenu>
          <DropdownMenuTrigger>Actions</DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuItem>Option one</DropdownMenuItem>
            <DropdownMenuItem disabled>Disabled option</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
        <Spinner label="Example loading" />
      </div>
      <Select
        label="Choose a destination"
        options={[
          { label: "North marsh", value: "north" },
          { label: "South marsh", value: "south" },
        ]}
      />
      <p className="text-sm text-mar-muted">
        Keyboard: Tab to controls, Enter/Space to activate, Escape to close
        overlays. Check forced-colors and reduced-motion emulation.
      </p>
    </div>
  );
}
const meta = {
  title: "Foundations/Motion system",
  component: MotionStudies,
  tags: ["autodocs"],
} satisfies Meta<typeof MotionStudies>;
export default meta;
type Story = StoryObj<typeof meta>;
export const Interactive: Story = {};
