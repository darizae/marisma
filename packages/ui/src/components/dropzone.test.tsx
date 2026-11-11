import { fireEvent, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import { Dropzone } from "./dropzone";

function file(name: string, type: string, size = 4, lastModified = 1) {
  return new File([new Uint8Array(size)], name, { lastModified, type });
}

describe("Dropzone", () => {
  it("accepts matching files from the input and supports clearing and reselection", async () => {
    const user = userEvent.setup();
    const onFilesChange = vi.fn();
    render(
      <Dropzone
        accept="image/png,.jpg"
        label="Evidence files"
        maxFiles={2}
        onFilesChange={onFilesChange}
      />,
    );

    const input = screen.getByLabelText("Evidence files");
    const image = file("marsh.png", "image/png");
    await user.upload(input, image);
    expect(onFilesChange).toHaveBeenCalledWith([image]);
    expect(screen.getByText("marsh.png")).toBeVisible();

    await user.click(screen.getByRole("button", { name: "Clear files" }));
    expect(onFilesChange).toHaveBeenLastCalledWith([]);
    expect(screen.queryByText("marsh.png")).not.toBeInTheDocument();
    expect((input as HTMLInputElement).value).toBe("");

    await user.upload(input, image);
    expect(onFilesChange).toHaveBeenLastCalledWith([image]);
  });

  it("rejects type, size, count, and duplicate failures with announced reasons", () => {
    const onRejectedFiles = vi.fn();
    const existing = file("existing.png", "image/png", 4, 10);
    const tooLarge = file("large.png", "image/png", 20, 11);
    const wrongType = file("notes.txt", "text/plain", 4, 12);
    const accepted = file("new.png", "image/png", 4, 13);

    render(
      <Dropzone
        accept="image/*"
        defaultFiles={[existing]}
        label="Photos"
        maxFiles={2}
        maxSize={10}
        multiple
        onRejectedFiles={onRejectedFiles}
      />,
    );

    fireEvent.drop(screen.getByTestId("dropzone-surface"), {
      dataTransfer: {
        files: [
          existing,
          tooLarge,
          wrongType,
          accepted,
          file("extra.png", "image/png", 4, 14),
        ],
        types: ["Files"],
      },
    });

    expect(onRejectedFiles).toHaveBeenCalledOnce();
    const rejections = onRejectedFiles.mock.calls[0]?.[0];
    expect(rejections.map(({ reason }: { reason: string }) => reason)).toEqual([
      "duplicate",
      "size",
      "type",
      "count",
    ]);
    expect(screen.getByRole("alert")).toHaveTextContent(
      "4 files were rejected",
    );
    expect(screen.getByText("new.png")).toBeVisible();
  });

  it("resets with its containing native form and removes reset listeners on unmount", async () => {
    const user = userEvent.setup();
    const removeEventListener = vi.spyOn(
      HTMLFormElement.prototype,
      "removeEventListener",
    );
    const selected = file("selected.png", "image/png");
    const { unmount } = render(
      <form>
        <Dropzone label="Attachments" />
        <button type="reset">Reset form</button>
      </form>,
    );

    await user.upload(screen.getByLabelText("Attachments"), selected);
    expect(screen.getByText("selected.png")).toBeVisible();
    await user.click(screen.getByRole("button", { name: "Reset form" }));
    expect(screen.queryByText("selected.png")).not.toBeInTheDocument();

    unmount();
    expect(removeEventListener).toHaveBeenCalledWith(
      "reset",
      expect.any(Function),
    );
    removeEventListener.mockRestore();
  });
});
