import type { Meta, StoryObj } from '@storybook/react-vite';

function ProjectStatus() {
  return (
    <div data-marisma-accent="reedwater" className="rounded-xl border border-mar-border bg-mar-card p-8 font-mar-sans text-mar-text">
      <h2 className="text-2xl font-semibold">Marisma is in development</h2>
      <p className="mt-3 max-w-lg text-base text-mar-muted">
        This is a workspace smoke view, not a shipped library component.
      </p>
    </div>
  );
}

const meta = { title: 'Development/Status', component: ProjectStatus } satisfies Meta<typeof ProjectStatus>;
export default meta;
type Story = StoryObj<typeof meta>;
export const Scaffold: Story = {};
