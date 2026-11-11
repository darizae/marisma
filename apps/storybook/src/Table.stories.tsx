import type { Meta, StoryObj } from "@storybook/react-vite";
import {
  Badge,
  Button,
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
  TableRowHeader,
} from "@darizae/marisma";

function StationTable() {
  return (
    <Table aria-label="Tide stations" scrollLabel="Tide station records">
      <TableCaption>
        Sorting, filtering, selection, and row actions remain caller-owned.
      </TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead>Station</TableHead>
          <TableHead>Region</TableHead>
          <TableHead>Status</TableHead>
          <TableHead>Last reading</TableHead>
          <TableHead className="text-right">Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        <TableRow>
          <TableRowHeader>North bank observation platform</TableRowHeader>
          <TableCell>Upper estuary</TableCell>
          <TableCell>
            <Badge variant="success">Online</Badge>
          </TableCell>
          <TableCell>11 Nov 2026, 09:42</TableCell>
          <TableCell className="text-right">
            <Button size="small" type="button" variant="secondary">
              View
            </Button>
          </TableCell>
        </TableRow>
        <TableRow>
          <TableRowHeader>
            A station name long enough to demonstrate bounded cell composition
          </TableRowHeader>
          <TableCell>Salt-marsh edge</TableCell>
          <TableCell>
            <Badge variant="warning">Delayed</Badge>
          </TableCell>
          <TableCell>10 Nov 2026, 23:18</TableCell>
          <TableCell className="text-right">
            <Button size="small" type="button" variant="secondary">
              View
            </Button>
          </TableCell>
        </TableRow>
      </TableBody>
    </Table>
  );
}

const meta = {
  title: "Data display/Table",
  component: StationTable,
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component:
          "A semantic native table inside a keyboard-focusable overflow region. TableHead and TableRowHeader provide column and row scopes; the caller owns records, sorting, filtering, selection, and actions. This is intentionally not a data grid.",
      },
    },
  },
} satisfies Meta<typeof StationTable>;

export default meta;
type Story = StoryObj<typeof meta>;

export const SemanticAndScrollable: Story = {};
