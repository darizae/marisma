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

    const runtimeFixture = join(fixtureDirectory, "consumer.mjs");
    writeFileSync(
      runtimeFixture,
      [
        "import assert from 'node:assert/strict';",
        "import { fileURLToPath } from 'node:url';",
        "import { join } from 'node:path';",
        "const api = await import('@darizae/marisma');",
        "assert.equal(typeof api, 'object');",
        "const themePath = fileURLToPath(import.meta.resolve('@darizae/marisma/theme.css'));",
        `assert.equal(themePath, ${JSON.stringify(realpathSync(join(installedPackageDirectory, "src/styles/theme.css")))});`,
      ].join("\n"),
    );
    run(process.execPath, [runtimeFixture], { cwd: fixtureDirectory });

    const typeFixture = join(fixtureDirectory, "consumer.ts");
    writeFileSync(
      typeFixture,
      [
        "import * as Marisma from '@darizae/marisma';",
        "type PublicModule = typeof import('@darizae/marisma');",
        "const api: PublicModule = Marisma;",
        "void api;",
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
      ],
      { cwd: fixtureDirectory },
    );
  } finally {
    rmSync(temporaryDirectory, { recursive: true, force: true });
  }
});
