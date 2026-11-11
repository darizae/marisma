import type { Meta, StoryObj } from "@storybook/react-vite";
import {
  Button,
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@darizae/marisma";

const meta = {
  title: "Components/Card",
  component: Card,
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component:
          "A semantic section with optional header, title, description, content, and footer slots.",
      },
    },
  },
} satisfies Meta<typeof Card>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Composition: Story = {
  render: () => (
    <Card aria-labelledby="station-title" className="w-full max-w-md">
      <CardHeader>
        <CardTitle id="station-title">Estuary station</CardTitle>
        <CardDescription>Last updated two minutes ago</CardDescription>
      </CardHeader>
      <CardContent>
        <p>Salinity and tide readings are within the expected range.</p>
      </CardContent>
      <CardFooter>
        <Button size="small">Open station</Button>
        <Button size="small" variant="ghost">
          Dismiss
        </Button>
      </CardFooter>
    </Card>
  ),
};
