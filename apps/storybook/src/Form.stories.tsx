import { useState } from "react";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { expect, userEvent, within } from "storybook/test";
import {
  Button,
  FieldCallout,
  FieldDivider,
  FieldGroup,
  Form,
  Input,
  type FormError,
} from "@darizae/marisma";

function NativeFormFixture() {
  const [errors, setErrors] = useState<FormError[]>([]);
  const [status, setStatus] = useState("Not submitted");

  return (
    <Form
      className="max-w-xl"
      errors={errors}
      noValidate
      onReset={() => {
        setErrors([]);
        setStatus("Reset to native defaults");
      }}
      onSubmit={(event) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        const name = String(data.get("projectName") ?? "").trim();
        if (!name) {
          setErrors([
            {
              fieldId: "storybook-project-name",
              message: "Enter a project name.",
            },
          ]);
          setStatus("Validation failed");
          return;
        }
        setErrors([]);
        setStatus(`Submitted ${name}`);
      }}
    >
      <FieldGroup
        description="The browser owns these uncontrolled values until submission or reset."
        legend="Project details"
      >
        <Input
          error={errors.length ? "Enter a project name." : undefined}
          id="storybook-project-name"
          label="Project name"
          name="projectName"
          required
        />
        <div className="flex items-stretch gap-4">
          <Input fieldClassName="flex-1" label="Region" name="region" />
          <FieldDivider aria-label="Optional details" decorative={false} />
          <Input fieldClassName="flex-1" label="Station" name="station" />
        </div>
        <FieldCallout title="Native submission" variant="info">
          Marisma does not send, store, or persist this form.
        </FieldCallout>
      </FieldGroup>
      <div className="flex flex-wrap justify-end gap-3">
        <Button type="reset" variant="secondary">
          Reset
        </Button>
        <Button type="submit">Submit</Button>
      </div>
      <p aria-live="polite" className="text-sm text-mar-muted">
        {status}
      </p>
    </Form>
  );
}

const meta = {
  title: "Forms/Form Foundation",
  component: NativeFormFixture,
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component:
          "Native Form, FieldGroup, FieldDivider, and FieldCallout compositions. Form values, validation rules, submission, reset, and async work remain caller-owned. FieldGroup uses fieldset/legend semantics and native disabled behavior; linked error summaries target exact field ids.",
      },
    },
  },
} satisfies Meta<typeof NativeFormFixture>;

export default meta;
type Story = StoryObj<typeof meta>;

export const SubmissionValidationAndReset: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await userEvent.click(canvas.getByRole("button", { name: "Submit" }));
    await expect(
      canvas.getByRole("alert", { name: "Please fix the following" }),
    ).toBeVisible();
    const input = canvas.getByRole("textbox", { name: "Project name" });
    await userEvent.type(input, "Tidal observations");
    await userEvent.click(canvas.getByRole("button", { name: "Submit" }));
    await expect(
      canvas.getByText("Submitted Tidal observations"),
    ).toBeVisible();
    await userEvent.click(canvas.getByRole("button", { name: "Reset" }));
    await expect(input).toHaveValue("");
    await expect(canvas.getByText("Reset to native defaults")).toBeVisible();
  },
};

export const Manual: Story = {};

export const DisabledGroup: Story = {
  render: () => (
    <FieldGroup disabled legend="Archived project">
      <Input defaultValue="Protected" label="Archive reason" />
      <FieldCallout>Restore this project before editing it.</FieldCallout>
    </FieldGroup>
  ),
};
