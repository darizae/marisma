import type { Meta, StoryObj } from "@storybook/react-vite";
import {
  Badge,
  Card,
  CardContent,
  CardDescription,
  CardGrid,
  CardGridItem,
  CardHeader,
  CardTitle,
} from "@darizae/marisma";

function MonitoringGrid() {
  return (
    <CardGrid aria-label="Monitoring summaries">
      {[
        ["North bank", "Upper estuary", "Current"],
        ["Salt-marsh edge", "Intertidal flats", "Current"],
        ["South inlet", "Coastal mouth", "Delayed"],
      ].map(([title, description, state]) => (
        <CardGridItem key={title}>
          <Card className="h-full">
            <CardHeader>
              <CardTitle>{title}</CardTitle>
              <CardDescription>{description}</CardDescription>
            </CardHeader>
            <CardContent>
              <Badge variant={state === "Current" ? "success" : "warning"}>
                {state}
              </Badge>
            </CardContent>
          </Card>
        </CardGridItem>
      ))}
    </CardGrid>
  );
}

const meta = {
  title: "Data display/CardGrid",
  component: MonitoringGrid,
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component:
          "A responsive list-based grid for caller-keyed cards. It provides layout only and makes no assumptions about records or card content.",
      },
    },
  },
} satisfies Meta<typeof MonitoringGrid>;

export default meta;
type Story = StoryObj<typeof meta>;

export const ResponsiveCards: Story = {};
