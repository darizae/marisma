import { useState } from "react";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { expect, userEvent, within } from "storybook/test";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@darizae/marisma";

function StationTabs() {
  const [value, setValue] = useState("overview");
  return (
    <Tabs onValueChange={setValue} value={value}>
      <TabsList aria-label="Station sections">
        <TabsTrigger value="overview">Overview</TabsTrigger>
        <TabsTrigger value="history">History</TabsTrigger>
        <TabsTrigger disabled value="private">
          Private
        </TabsTrigger>
      </TabsList>
      <TabsContent value="overview">Overview panel</TabsContent>
      <TabsContent value="history">History panel</TabsContent>
      <TabsContent value="private">Private panel</TabsContent>
    </Tabs>
  );
}

const meta = {
  title: "Components/Tabs",
  component: StationTabs,
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component:
          "Controlled or uncontrolled Radix tabs with tab/tabpanel relationships. Arrow keys move and activate by default, Home/End jump, disabled tabs are skipped, and Tab enters the active panel's content.",
      },
    },
  },
} satisfies Meta<typeof StationTabs>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Controlled: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const overview = canvas.getByRole("tab", { name: "Overview" });
    overview.focus();
    await userEvent.keyboard("{ArrowRight}");
    await expect(canvas.getByRole("tab", { name: "History" })).toHaveAttribute(
      "aria-selected",
      "true",
    );
    await expect(
      canvas.getByRole("tabpanel", { name: "History" }),
    ).toBeVisible();
  },
};

export const TidalBlueDark: Story = {
  globals: { marismaAccent: "tidal-blue", marismaMode: "dark" },
};
