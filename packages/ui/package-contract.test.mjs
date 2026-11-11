import assert from "node:assert/strict";
import { execFileSync, spawnSync } from "node:child_process";
import {
  existsSync,
  mkdirSync,
  mkdtempSync,
  readFileSync,
  realpathSync,
  rmSync,
  writeFileSync,
} from "node:fs";
import { tmpdir } from "node:os";
import { dirname, join, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import test from "node:test";

const packageDirectory = dirname(fileURLToPath(import.meta.url));
const repositoryRoot = resolve(packageDirectory, "../..");

function run(command, args, options = {}) {
  const result = spawnSync(command, args, {
    cwd: options.cwd ?? repositoryRoot,
    encoding: "utf8",
    env: process.env,
  });

  assert.equal(
    result.status,
    0,
    [
      `${command} ${args.join(" ")} exited with ${String(result.status)}`,
      result.stdout,
      result.stderr,
    ]
      .filter(Boolean)
      .join("\n"),
  );

  return result.stdout;
}

test("the packed package exposes loadable ESM, declarations, and theme CSS", () => {
  const temporaryDirectory = mkdtempSync(
    join(tmpdir(), "marisma-package-contract-"),
  );

  try {
    run("pnpm", ["run", "build"], { cwd: packageDirectory });

    const packDirectory = join(temporaryDirectory, "pack");
    mkdirSync(packDirectory, { recursive: true });
    const packResult = JSON.parse(
      run("pnpm", ["pack", "--pack-destination", packDirectory, "--json"], {
        cwd: packageDirectory,
      }),
    );
    const tarballPath = resolve(packDirectory, packResult.filename);
    assert.ok(existsSync(tarballPath), `missing tarball: ${tarballPath}`);

    const fixtureDirectory = join(temporaryDirectory, "fixture");
    const installedPackageDirectory = join(
      fixtureDirectory,
      "node_modules",
      "@darizae",
      "marisma",
    );
    mkdirSync(installedPackageDirectory, { recursive: true });
    execFileSync(
      "tar",
      [
        "-xzf",
        tarballPath,
        "--strip-components=1",
        "-C",
        installedPackageDirectory,
      ],
      { encoding: "utf8" },
    );

    const manifest = JSON.parse(
      readFileSync(join(installedPackageDirectory, "package.json"), "utf8"),
    );
    const rootExport = manifest.exports["."];
    assert.equal(manifest.private, true);
    assert.equal(manifest.type, "module");
    assert.equal(rootExport.import, "./dist/index.js");
    assert.equal(rootExport.types, "./dist/index.d.ts");
    assert.equal(manifest.exports["./theme.css"], "./src/styles/theme.css");
    assert.equal(manifest.exports["./package.json"], "./package.json");
    assert.deepEqual(manifest.files, [
      "dist",
      "src/styles/theme.css",
      "README.md",
      "LICENSE",
    ]);
    assert.deepEqual(manifest.sideEffects, ["**/*.css"]);
    assert.equal(packResult.name, manifest.name);
    assert.equal(packResult.version, manifest.version);

    assert.deepEqual(packResult.files.map(({ path }) => path).sort(), [
      "LICENSE",
      "README.md",
      "dist/components/alert.d.ts",
      "dist/components/alert.js",
      "dist/components/avatar.d.ts",
      "dist/components/avatar.js",
      "dist/components/badge.d.ts",
      "dist/components/badge.js",
      "dist/components/button-group.d.ts",
      "dist/components/button-group.js",
      "dist/components/button.d.ts",
      "dist/components/button.js",
      "dist/components/card.d.ts",
      "dist/components/card.js",
      "dist/components/copy-code.d.ts",
      "dist/components/copy-code.js",
      "dist/components/dialog.d.ts",
      "dist/components/dialog.js",
      "dist/components/input.d.ts",
      "dist/components/input.js",
      "dist/components/label.d.ts",
      "dist/components/label.js",
      "dist/components/scroll-area.d.ts",
      "dist/components/scroll-area.js",
      "dist/components/separator.d.ts",
      "dist/components/separator.js",
      "dist/components/spinner.d.ts",
      "dist/components/spinner.js",
      "dist/components/toast.d.ts",
      "dist/components/toast.js",
      "dist/index.d.ts",
      "dist/index.js",
      "dist/lib/cn.js",
      "package.json",
      "src/styles/theme.css",
    ]);
    assert.match(
      readFileSync(join(installedPackageDirectory, "LICENSE"), "utf8"),
      /MIT License[\s\S]*Copyright \(c\) 2026 Marisma contributors/,
    );
    assert.equal(
      manifest.repository?.url,
      "git+https://github.com/darizae/marisma.git",
    );
    assert.equal(manifest.license, "MIT");

    for (const peer of ["react", "react-dom", "tailwindcss"]) {
      assert.ok(
        manifest.peerDependencies[peer],
        `missing peer dependency: ${peer}`,
      );
      assert.equal(manifest.dependencies?.[peer], undefined);
    }

    for (const exportedPath of [
      rootExport.import,
      rootExport.types,
      manifest.exports["./theme.css"],
      manifest.exports["./package.json"],
    ]) {
      const installedPath = join(
        installedPackageDirectory,
        exportedPath.slice(2),
      );
      assert.ok(
        existsSync(installedPath),
        `missing exported file: ${exportedPath}`,
      );
    }

    const packedPaths = new Set(packResult.files.map(({ path }) => path));
    assert.ok(packedPaths.has(rootExport.import.slice(2)));
    assert.ok(packedPaths.has(rootExport.types.slice(2)));
    assert.ok(packedPaths.has(manifest.exports["./theme.css"].slice(2)));

    for (const clientModule of [
      "avatar",
      "copy-code",
      "dialog",
      "input",
      "toast",
    ]) {
      assert.match(
        readFileSync(
          join(
            installedPackageDirectory,
            "dist",
            "components",
            `${clientModule}.js`,
          ),
          "utf8",
        ),
        /^"use client";/,
        `${clientModule} must preserve its client boundary`,
      );
    }

    const consumerDirectory = join(temporaryDirectory, "consumer");
    mkdirSync(consumerDirectory, { recursive: true });
    writeFileSync(
      join(consumerDirectory, "package.json"),
      JSON.stringify({
        name: "marisma-independent-consumer",
        private: true,
        type: "module",
        dependencies: {
          "@darizae/marisma": `file:${tarballPath}`,
          react: "19.3.1",
          "react-dom": "19.3.1",
          tailwindcss: "4.3.5",
        },
        devDependencies: {
          "@types/react": "^19.2.18",
          "@types/react-dom": "^19.2.4",
        },
      }),
    );
    run("pnpm", ["install", "--ignore-scripts", "--offline"], {
      cwd: consumerDirectory,
    });

    const consumerPackageDirectory = join(
      consumerDirectory,
      "node_modules",
      "@darizae",
      "marisma",
    );
    const runtimeFixture = join(consumerDirectory, "consumer.mjs");
    writeFileSync(
      runtimeFixture,
      [
        "import assert from 'node:assert/strict';",
        "import { fileURLToPath } from 'node:url';",
        "const api = await import('@darizae/marisma');",
        "assert.equal(typeof api, 'object');",
        "for (const name of ['Alert', 'Avatar', 'Badge', 'Button', 'ButtonGroup', 'Card', 'CardContent', 'CardFooter', 'CopyCode', 'Dialog', 'DialogContent', 'Input', 'Label', 'ScrollArea', 'Separator', 'Spinner', 'ToastAction', 'ToastProvider', 'useToast']) assert.equal(typeof api[name], 'function', name);",
        "const themePath = fileURLToPath(import.meta.resolve('@darizae/marisma/theme.css'));",
        `assert.equal(themePath, ${JSON.stringify(realpathSync(join(consumerPackageDirectory, "src/styles/theme.css")))});`,
      ].join("\n"),
    );
    run(process.execPath, [runtimeFixture], { cwd: consumerDirectory });

    const typeFixture = join(consumerDirectory, "consumer.tsx");
    writeFileSync(
      typeFixture,
      [
        "import { createRef } from 'react';",
        "import { Alert, Avatar, Badge, Button, ButtonGroup, Card, CardContent, CopyCode, Dialog, DialogContent, DialogTitle, DialogTrigger, Input, Label, ScrollArea, Separator, Spinner, ToastProvider } from '@darizae/marisma';",
        "import type { AlertProps, AvatarProps, BadgeProps, ButtonGroupProps, ButtonProps, CopyCodeProps, DialogContentProps, DialogPortalProps, DialogProps, InputProps, LabelProps, ScrollAreaProps, SeparatorProps, SpinnerProps, ToastProviderProps } from '@darizae/marisma';",
        "const buttonRef = createRef<HTMLButtonElement>();",
        "const inputRef = createRef<HTMLInputElement>();",
        "const contentRef = createRef<HTMLDivElement>();",
        "const buttonProps = { children: 'Save', loading: true, ref: buttonRef } satisfies ButtonProps;",
        "const inputProps = { defaultValue: 'Ada', label: 'Name', ref: inputRef } satisfies InputProps;",
        "const dialogProps = { defaultOpen: false, modal: true } satisfies DialogProps;",
        "const contentProps = { closeLabel: 'Close', ref: contentRef } satisfies DialogContentProps;",
        "const alertProps = { children: 'Current', variant: 'success' } satisfies AlertProps;",
        "const avatarProps = { alt: 'Ada', fallback: 'AL' } satisfies AvatarProps;",
        "const badgeProps = { children: 'Ready', variant: 'success' } satisfies BadgeProps;",
        "const groupProps = { 'aria-label': 'Actions' } satisfies ButtonGroupProps;",
        "const copyProps = { code: 'safe text' } satisfies CopyCodeProps;",
        "const labelProps = { htmlFor: 'name' } satisfies LabelProps;",
        "const scrollProps = { 'aria-label': 'Readings' } satisfies ScrollAreaProps;",
        "const separatorProps = { decorative: false } satisfies SeparatorProps;",
        "const spinnerProps = { label: 'Loading' } satisfies SpinnerProps;",
        "const toastProps = { children: null, limit: 3 } satisfies ToastProviderProps;",
        "const portalProps = { forceMount: true } satisfies DialogPortalProps;",
        "const tree = <ToastProvider {...toastProps}><Alert {...alertProps} /><Avatar {...avatarProps} /><Badge {...badgeProps} /><ButtonGroup {...groupProps}><Button {...buttonProps} /></ButtonGroup><Card><CardContent><Label {...labelProps}>Name</Label><Input {...inputProps} /></CardContent></Card><CopyCode {...copyProps} /><ScrollArea {...scrollProps}>Reading</ScrollArea><Separator {...separatorProps} /><Spinner {...spinnerProps} /><Dialog {...dialogProps}><DialogTrigger>Open</DialogTrigger><DialogContent {...contentProps}><DialogTitle>Title</DialogTitle></DialogContent></Dialog></ToastProvider>;",
        "void portalProps;",
        "void tree;",
      ].join("\n"),
    );
    run(
      process.execPath,
      [
        join(repositoryRoot, "node_modules/typescript/bin/tsc"),
        typeFixture,
        "--noEmit",
        "--strict",
        "--module",
        "NodeNext",
        "--moduleResolution",
        "NodeNext",
        "--target",
        "ES2022",
        "--jsx",
        "react-jsx",
      ],
      { cwd: consumerDirectory },
    );
  } finally {
    rmSync(temporaryDirectory, { recursive: true, force: true });
  }
});
