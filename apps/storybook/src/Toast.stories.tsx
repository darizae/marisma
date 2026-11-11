import type { Meta, StoryObj } from "@storybook/react-vite";
import {
  Button,
  ToastAction,
  ToastProvider,
  useToast,
  type ToastVariant,
} from "@darizae/marisma";

function ToastDemo({ variant = "success" }: { variant?: ToastVariant }) {
  const { toast } = useToast();
  return (
    <Button
      onClick={() =>
        toast({
          action: <ToastAction onClick={() => undefined}>Undo</ToastAction>,
          description: "The station settings are current.",
          title: "Changes saved",
          variant,
        })
      }
    >
      Show notification
    </Button>
  );
}

function StoryComponent({ variant }: { variant?: ToastVariant }) {
  return (
    <ToastProvider duration={8000} limit={3}>
      <ToastDemo variant={variant} />
    </ToastProvider>
  );
}

const meta = {
  title: "Components/Toast",
  component: StoryComponent,
  tags: ["autodocs"],
  argTypes: {
    variant: {
      control: "select",
      options: ["info", "success", "warning", "danger"],
    },
  },
  parameters: {
    docs: {
      description: {
        component:
          "Provider-based, dependency-free notifications with polite or urgent announcement roles, explicit dismissal, timeouts, safe React content, and a configurable stack limit. Place the provider inside the active Marisma theme scope.",
      },
    },
  },
} satisfies Meta<typeof StoryComponent>;

export default meta;
type Story = StoryObj<typeof meta>;

export const AnnouncementAndDismissal: Story = { args: { variant: "success" } };
