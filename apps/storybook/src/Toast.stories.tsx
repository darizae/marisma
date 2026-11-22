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

function ToastStackControls() {
  const { toast, dismiss } = useToast();
  return (
    <div className="flex flex-wrap gap-2">
      <Button
        onClick={() => {
          toast({
            id: "story-toast-1",
            title: "Water quality checked",
            description: "Three stations updated.",
            variant: "info",
            duration: 12000,
          });
          toast({
            id: "story-toast-2",
            title: "Record saved",
            description: "Your changes are available locally.",
            variant: "success",
            duration: 12000,
          });
          toast({
            id: "story-toast-3",
            title: "Observation archived",
            description: "You may undo this change.",
            variant: "warning",
            duration: 12000,
            action: (
              <ToastAction onClick={() => dismiss("story-toast-3")}>
                Undo
              </ToastAction>
            ),
          });
        }}
      >
        Stack three toasts
      </Button>
      <Button
        variant="secondary"
        onClick={() =>
          toast({
            title: "Unable to save",
            description: "Try again later.",
            variant: "danger",
          })
        }
      >
        Error toast
      </Button>
    </div>
  );
}

function ToastStackStory() {
  return (
    <ToastProvider duration={5000} limit={3}>
      <ToastStackControls />
    </ToastProvider>
  );
}

export const StackedAndExpandable: Story = {
  render: () => <ToastStackStory />,
  parameters: {
    docs: {
      description: {
        story:
          "Marisma's compact, neutral Sonner-inspired toast stack spreads on hover or focus; durations pause while interacting. Swipe horizontally or use the close button to dismiss. The existing provider/action API remains compatible, and reduced motion disables decorative transforms.",
      },
    },
  },
};
