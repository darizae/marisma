import type { Meta, StoryObj } from "@storybook/react-vite";
import {
  Calendar,
  Checkbox,
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
  DateField,
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  Popover,
  PopoverContent,
  PopoverTrigger,
  RadioGroup,
  RadioGroupItem,
  Select,
  Switch,
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
  Textarea,
  ToggleGroup,
  ToggleGroupItem,
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@darizae/marisma";

const themes = [
  ["reedwater", "light", "Reedwater light"],
  ["reedwater", "dark", "Reedwater dark"],
  ["tidal-blue", "light", "Tidal Blue light"],
  ["tidal-blue", "dark", "Tidal Blue dark"],
] as const;

function WidgetSample({ label }: { label: string }) {
  return (
    <div className="grid gap-4">
      <Checkbox defaultChecked label={`${label} checkbox`} />
      <Switch defaultChecked label={`${label} switch`} />
      <RadioGroup defaultValue="calm" label={`${label} radio group`}>
        <RadioGroupItem label="Calm" value="calm" />
        <RadioGroupItem label="Brisk" value="brisk" />
      </RadioGroup>
      <ToggleGroup
        aria-label={`${label} toggles`}
        defaultValue="one"
        type="single"
      >
        <ToggleGroupItem value="one">One</ToggleGroupItem>
        <ToggleGroupItem value="two">Two</ToggleGroupItem>
      </ToggleGroup>
      <Collapsible defaultOpen>
        <CollapsibleTrigger>Disclosure</CollapsibleTrigger>
        <CollapsibleContent>Visible content</CollapsibleContent>
      </Collapsible>
      <Textarea label={`${label} note`} readOnly value="Readable native text" />
      <div className="flex flex-wrap gap-2">
        <Popover>
          <PopoverTrigger>Popover</PopoverTrigger>
          <PopoverContent aria-label="Theme popover">
            Popover content
          </PopoverContent>
        </Popover>
        <DropdownMenu>
          <DropdownMenuTrigger>Menu</DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuItem>Menu item</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger>Tooltip</TooltipTrigger>
            <TooltipContent>Tooltip content</TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>
      <Tabs defaultValue="one">
        <TabsList aria-label={`${label} tabs`}>
          <TabsTrigger value="one">One</TabsTrigger>
          <TabsTrigger value="two">Two</TabsTrigger>
        </TabsList>
        <TabsContent value="one">First panel</TabsContent>
        <TabsContent value="two">Second panel</TabsContent>
      </Tabs>
      <Select
        defaultValue="reedwater"
        label={`${label} select`}
        options={[
          { label: "Reedwater", value: "reedwater" },
          { label: "Tidal Blue", value: "tidal-blue" },
        ]}
      />
      <Calendar
        defaultValue="2026-11-11"
        label={`${label} calendar`}
        timeZone="UTC"
      />
      <DateField
        defaultValue="2026-11-11"
        label={`${label} date field`}
        timeZone="UTC"
      />
    </div>
  );
}

function InteractionThemes() {
  return (
    <div className="grid w-full gap-4 xl:grid-cols-2">
      {themes.map(([accent, mode, label]) => (
        <section
          aria-label={label}
          className="interaction-theme-sample rounded-2xl border border-mar-border bg-mar-surface p-4 text-mar-text"
          data-marisma-accent={accent}
          data-marisma-mode={mode}
          key={label}
        >
          <h2 className="mb-4 text-lg font-semibold">{label}</h2>
          <WidgetSample label={label} />
        </section>
      ))}
    </div>
  );
}

const meta = {
  title: "Foundations/Interaction themes",
  component: InteractionThemes,
  parameters: {
    docs: {
      description: {
        component:
          "All T-008 interaction families shown inside each supported accent/mode scope. Portalled surfaces additionally carry the nearest scope when opened.",
      },
    },
  },
} satisfies Meta<typeof InteractionThemes>;

export default meta;
type Story = StoryObj<typeof meta>;

export const AllWidgets: Story = {};
