import type { ComponentProps } from "react";
import type { Meta, StoryObj } from "@storybook/react-vite";
import {
  StepProgress,
  StepProgressItem,
  StepProgressLink,
} from "@darizae/marisma";

function RouterLink({
  to,
  ...props
}: Omit<ComponentProps<"a">, "href"> & { to: string }) {
  return <a href={to} {...props} />;
}

function ProgressFixture() {
  return (
    <StepProgress label="Create monitoring station">
      <StepProgressItem status="complete" step="1">
        <StepProgressLink href="#details">Details</StepProgressLink>
      </StepProgressItem>
      <StepProgressItem status="current" step="2">
        <StepProgressLink asChild>
          <RouterLink to="#sensors">Sensors and thresholds</RouterLink>
        </StepProgressLink>
      </StepProgressItem>
      <StepProgressItem step="3">Review</StepProgressItem>
      <StepProgressItem step="4">Publish</StepProgressItem>
    </StepProgress>
  );
}

const meta = {
  title: "Navigation/StepProgress",
  component: ProgressFixture,
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component:
          "An ordered navigation progress composition with complete, current, and upcoming states. StepProgressLink accepts native or consumer router links; the application owns progression and navigation.",
      },
    },
  },
} satisfies Meta<typeof ProgressFixture>;

export default meta;
type Story = StoryObj<typeof meta>;

export const FourSteps: Story = {};
