import type { Meta, StoryObj } from "@storybook/react-vite";
import {
  Alert,
  Badge,
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  Spinner,
} from "@darizae/marisma";

function ThemeFoundation() {
  return (
    <div className="grid w-full gap-4 sm:grid-cols-2">
      {(
        [
          ["reedwater", "light", "Reedwater light"],
          ["reedwater", "dark", "Reedwater dark"],
          ["tidal-blue", "light", "Tidal Blue light"],
          ["tidal-blue", "dark", "Tidal Blue dark"],
        ] as const
      ).map(([accent, mode, label]) => (
        <Card
          aria-label={label}
          className="theme-sample bg-mar-surface"
          data-marisma-accent={accent}
          data-marisma-mode={mode}
          key={label}
        >
          <CardHeader>
            <CardTitle>{label}</CardTitle>
          </CardHeader>
          <CardContent className="grid gap-3">
            <div className="flex flex-wrap gap-2">
              <Badge variant="success">Ready</Badge>
              <Badge variant="warning">Review</Badge>
              <Badge variant="danger">Failed</Badge>
            </div>
            <Alert title="Foundation status">
              Semantic feedback remains legible.
            </Alert>
            <Spinner label={`Loading ${label}`} />
          </CardContent>
        </Card>
      ))}
    </div>
  );
}

const meta = {
  title: "Foundations/Four themes",
  component: ThemeFoundation,
  parameters: {
    docs: {
      description: {
        component:
          "The T-007 foundation and semantic feedback colors shown in all four supported Marisma theme combinations.",
      },
    },
  },
} satisfies Meta<typeof ThemeFoundation>;

export default meta;
type Story = StoryObj<typeof meta>;

export const StatusTokens: Story = {};
