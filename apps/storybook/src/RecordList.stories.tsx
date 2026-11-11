import type { Meta, StoryObj } from "@storybook/react-vite";
import { Badge, Button, RecordList, RecordListItem } from "@darizae/marisma";

type Station = { id: string; name: string; region: string };

const stations: Station[] = [
  { id: "north-bank", name: "North bank", region: "Upper estuary" },
  {
    id: "salt-marsh-edge",
    name: "Salt-marsh edge with an intentionally long descriptive station name",
    region: "Intertidal flats",
  },
  { id: "south-inlet", name: "South inlet", region: "Coastal mouth" },
];

function renderStation(station: Station) {
  return (
    <RecordListItem
      actions={
        <Button size="small" type="button" variant="secondary">
          Open
        </Button>
      }
      description="Caller-provided supporting content can wrap while the title remains bounded."
      meta={station.region}
      title={station.name}
    >
      <Badge variant="success">Current</Badge>
    </RecordListItem>
  );
}

function RecordListExample({
  error,
  loading = false,
  records = stations,
}: {
  error?: React.ReactNode;
  loading?: boolean;
  records?: Station[];
}) {
  return (
    <RecordList
      error={error}
      getKey={(station) => station.id}
      label="Monitoring stations"
      loading={loading}
      records={records}
      renderRecord={renderStation}
    />
  );
}

const meta = {
  title: "Data display/RecordList",
  component: RecordListExample,
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component:
          "Maps caller-owned records with a required stable-key function. Loading, empty, and error surfaces are presentational; fetching, retries, filtering, sorting, and virtualization remain application responsibilities.",
      },
    },
  },
} satisfies Meta<typeof RecordListExample>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Populated: Story = {};
export const Loading: Story = { args: { loading: true } };
export const Empty: Story = { args: { records: [] } };
export const Error: Story = {
  args: {
    error: (
      <div className="flex flex-wrap items-center justify-between gap-3">
        <span>Station records could not be loaded.</span>
        <Button size="small" type="button" variant="secondary">
          Retry
        </Button>
      </div>
    ),
  },
};

export const LargeRecordCount: Story = {
  args: {
    records: Array.from({ length: 150 }, (_, index) => ({
      id: `generated-${index}`,
      name: `Generated station ${index + 1}`,
      region: index % 2 ? "Upper estuary" : "Coastal mouth",
    })),
  },
};
