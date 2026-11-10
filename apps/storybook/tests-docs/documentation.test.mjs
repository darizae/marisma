import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { dirname, resolve } from "node:path";
import test from "node:test";
import { fileURLToPath } from "node:url";

const storybookDirectory = resolve(
  dirname(fileURLToPath(import.meta.url)),
  "..",
);
const repositoryRoot = resolve(storybookDirectory, "../..");
const exampleSource = readFileSync(
  resolve(storybookDirectory, "src/DocumentationExample.tsx"),
  "utf8",
).trim();

function documentedExample(path) {
  const markdown = readFileSync(path, "utf8");
  const match = markdown.match(
    /<!-- marisma-example:start -->\s*```tsx\n([\s\S]*?)\n```\s*<!-- marisma-example:end -->/,
  );
  assert.ok(match, `missing marked TSX example in ${path}`);
  return match[1].trim();
}

test("public README examples are the exact compiled Storybook example", () => {
  for (const path of [
    resolve(repositoryRoot, "README.md"),
    resolve(repositoryRoot, "packages/ui/README.md"),
  ]) {
    assert.equal(documentedExample(path), exampleSource);
  }
});
