import { expect, test, type Page } from "@playwright/test";
import { spawn, spawnSync, type ChildProcess } from "node:child_process";
import {
  cpSync,
  existsSync,
  mkdtempSync,
  readFileSync,
  readdirSync,
  realpathSync,
  rmSync,
  writeFileSync,
} from "node:fs";
import { createServer } from "node:net";
import { tmpdir } from "node:os";
import { basename, dirname, extname, join, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const repositoryRoot = resolve(
  dirname(fileURLToPath(import.meta.url)),
  "../../..",
);
const packageDirectory = join(repositoryRoot, "packages/ui");
const expectedSource = "@source '../node_modules/@darizae/marisma/dist';";
const uniqueCompiledUtility = "min-h-12";
const suppliedTarball = process.env.MARISMA_TEST_TARBALL;
const expectedPackageVersion = process.env.MARISMA_TEST_VERSION ?? "0.1.0";

let temporaryDirectory: string;
let viteDirectory: string;
let nextDirectory: string;
let viteUrl: string;
let nextUrl: string;
const servers: ChildProcess[] = [];

function run(command: string, args: string[], cwd: string) {
  const result = spawnSync(command, args, {
    cwd,
    encoding: "utf8",
    env: {
      ...process.env,
      CI: "1",
      NEXT_TELEMETRY_DISABLED: "1",
    },
  });

  expect(
    result.status,
    [
      `${command} ${args.join(" ")} exited with ${String(result.status)}`,
      result.stdout,
      result.stderr,
    ]
      .filter(Boolean)
      .join("\n"),
  ).toBe(0);

  return result.stdout;
}

function copyFixture(source: string, destination: string) {
  cpSync(source, destination, {
    recursive: true,
    filter(path) {
      return ![
        ".next",
        "dist",
        "node_modules",
        "tsconfig.tsbuildinfo",
      ].includes(basename(path));
    },
  });
}

function installTarball(fixtureDirectory: string, tarballPath: string) {
  const manifestPath = join(fixtureDirectory, "package.json");
  const manifest = JSON.parse(readFileSync(manifestPath, "utf8"));
  manifest.dependencies["@darizae/marisma"] = `file:${tarballPath}`;
  writeFileSync(manifestPath, `${JSON.stringify(manifest, null, 2)}\n`);

  run("pnpm", ["install", "--ignore-scripts", "--offline"], fixtureDirectory);

  const installedPackage = join(
    fixtureDirectory,
    "node_modules/@darizae/marisma",
  );
  expect(existsSync(installedPackage)).toBe(true);
  expect(realpathSync(installedPackage)).not.toContain(packageDirectory);

  const installedManifest = JSON.parse(
    readFileSync(join(installedPackage, "package.json"), "utf8"),
  );
  expect(installedManifest.name).toBe("@darizae/marisma");
  expect(installedManifest.version).toBe(expectedPackageVersion);
}

function filesWithExtension(directory: string, extension: string): string[] {
  return readdirSync(directory, { withFileTypes: true }).flatMap((entry) => {
    const path = join(directory, entry.name);
    if (entry.isDirectory()) return filesWithExtension(path, extension);
    return extname(entry.name) === extension ? [path] : [];
  });
}

function assertUniqueCompiledUtility(
  fixtureDirectory: string,
  productionDirectory: string,
) {
  const applicationSources = filesWithExtension(fixtureDirectory, ".tsx")
    .map((path) => readFileSync(path, "utf8"))
    .join("\n");
  expect(applicationSources).not.toContain(uniqueCompiledUtility);

  const installedDist = join(
    fixtureDirectory,
    "node_modules/@darizae/marisma/dist",
  );
  const compiledJavaScript = filesWithExtension(installedDist, ".js")
    .map((path) => readFileSync(path, "utf8"))
    .join("\n");
  expect(compiledJavaScript).toContain(uniqueCompiledUtility);

  const productionCss = filesWithExtension(productionDirectory, ".css")
    .map((path) => readFileSync(path, "utf8"))
    .join("\n");
  expect(productionCss).toMatch(/\.min-h-12\{/);
}

function assertStylesheetContract(path: string) {
  const css = readFileSync(path, "utf8");
  const tailwindImport = '@import "tailwindcss";';
  const themeImport = '@import "@darizae/marisma/theme.css";';

  expect(css.split(tailwindImport)).toHaveLength(2);
  expect(css.split(themeImport)).toHaveLength(2);
  expect(css.split(expectedSource)).toHaveLength(2);
  expect(css.indexOf(tailwindImport)).toBeLessThan(css.indexOf(themeImport));
  expect(css.indexOf(themeImport)).toBeLessThan(css.indexOf(expectedSource));
}

async function availablePort() {
  return await new Promise<number>((resolvePort, reject) => {
    const server = createServer();
    server.once("error", reject);
    server.listen(0, "127.0.0.1", () => {
      const address = server.address();
      if (!address || typeof address === "string") {
        server.close();
        reject(new Error("Unable to allocate a local port"));
        return;
      }
      server.close((error) => {
        if (error) reject(error);
        else resolvePort(address.port);
      });
    });
  });
}

function startServer(command: string, args: string[], cwd: string) {
  const output: string[] = [];
  const child = spawn(command, args, {
    cwd,
    env: {
      ...process.env,
      CI: "1",
      NEXT_TELEMETRY_DISABLED: "1",
    },
    stdio: ["ignore", "pipe", "pipe"],
  });
  child.stdout?.on("data", (chunk) => output.push(String(chunk)));
  child.stderr?.on("data", (chunk) => output.push(String(chunk)));
  child.once("exit", (code) => {
    if (code && code !== 0) output.push(`server exited with ${code}`);
  });
  servers.push(child);
  return { child, output };
}

async function waitForServer(
  url: string,
  processState: ReturnType<typeof startServer>,
) {
  const deadline = Date.now() + 30_000;
  while (Date.now() < deadline) {
    if (processState.child.exitCode !== null) {
      throw new Error(processState.output.join("\n"));
    }
    try {
      const response = await fetch(url);
      if (response.ok) return;
    } catch {
      // The production server is still starting.
    }
    await new Promise((resolveWait) => setTimeout(resolveWait, 200));
  }
  throw new Error(
    `Timed out waiting for ${url}\n${processState.output.join("\n")}`,
  );
}

async function expectMarismaAndNativeStyles(page: Page, buttonName: string) {
  const componentButton = page.getByRole("button", {
    name: buttonName,
    exact: true,
  });
  await expect(componentButton).toBeVisible();

  const componentStyles = await componentButton.evaluate((element) => {
    const styles = getComputedStyle(element);
    return {
      backgroundColor: styles.backgroundColor,
      minHeight: styles.minHeight,
    };
  });
  expect(componentStyles.backgroundColor).toBe("rgb(50, 100, 86)");
  expect(componentStyles.minHeight).toBe("44px");

  const nativeStyles = await page.evaluate(() => {
    const nativeButton = document.createElement("button");
    nativeButton.textContent = "Unrelated native button";
    document.querySelector("main")?.append(nativeButton);
    const styles = getComputedStyle(nativeButton);
    return {
      backgroundColor: styles.backgroundColor,
      minHeight: styles.minHeight,
    };
  });
  expect(nativeStyles.backgroundColor).toBe("rgba(0, 0, 0, 0)");
  expect(nativeStyles.minHeight).not.toBe("44px");
}

test.beforeAll(async () => {
  test.setTimeout(240_000);

  const viteStyles = join(
    repositoryRoot,
    "apps/consumers/vite-react/src/styles.css",
  );
  const nextStyles = join(
    repositoryRoot,
    "apps/consumers/nextjs/app/globals.css",
  );
  assertStylesheetContract(viteStyles);
  assertStylesheetContract(nextStyles);

  const themeCss = readFileSync(
    join(packageDirectory, "src/styles/theme.css"),
    "utf8",
  );
  expect(themeCss).not.toMatch(/@import\s+['"]tailwindcss['"]/);

  temporaryDirectory = mkdtempSync(join(tmpdir(), "marisma-t006-"));
  let tarballPath: string;
  if (suppliedTarball) {
    tarballPath = resolve(suppliedTarball);
  } else {
    run("pnpm", ["run", "build"], packageDirectory);
    const packDirectory = join(temporaryDirectory, "pack");
    const packOutput = JSON.parse(
      run(
        "pnpm",
        ["pack", "--pack-destination", packDirectory, "--json"],
        packageDirectory,
      ),
    );
    tarballPath = resolve(packDirectory, packOutput.filename);
  }
  expect(existsSync(tarballPath)).toBe(true);

  viteDirectory = join(temporaryDirectory, "vite-react");
  nextDirectory = join(temporaryDirectory, "nextjs");
  copyFixture(join(repositoryRoot, "apps/consumers/vite-react"), viteDirectory);
  copyFixture(join(repositoryRoot, "apps/consumers/nextjs"), nextDirectory);

  installTarball(viteDirectory, tarballPath);
  installTarball(nextDirectory, tarballPath);
  run("pnpm", ["run", "build"], viteDirectory);
  run("pnpm", ["run", "build"], nextDirectory);

  assertUniqueCompiledUtility(
    viteDirectory,
    join(viteDirectory, "dist/assets"),
  );
  assertUniqueCompiledUtility(
    nextDirectory,
    join(nextDirectory, ".next/static"),
  );

  const vitePort = await availablePort();
  const nextPort = await availablePort();
  viteUrl = `http://127.0.0.1:${vitePort}`;
  nextUrl = `http://127.0.0.1:${nextPort}`;
  const viteServer = startServer(
    "pnpm",
    [
      "exec",
      "vite",
      "preview",
      "--host",
      "127.0.0.1",
      "--port",
      String(vitePort),
    ],
    viteDirectory,
  );
  const nextServer = startServer(
    "pnpm",
    ["exec", "next", "start", "-H", "127.0.0.1", "-p", String(nextPort)],
    nextDirectory,
  );
  await Promise.all([
    waitForServer(viteUrl, viteServer),
    waitForServer(nextUrl, nextServer),
  ]);
});

test.afterAll(async () => {
  for (const server of servers) server.kill("SIGTERM");
  await new Promise((resolveWait) => setTimeout(resolveWait, 250));
  if (temporaryDirectory) {
    rmSync(temporaryDirectory, { recursive: true, force: true });
  }
});

test("packed Vite consumer generates component CSS without restyling native controls", async ({
  page,
}) => {
  await page.goto(viteUrl);
  await expectMarismaAndNativeStyles(page, "Focus this action");

  await page.getByRole("button", { name: "Open details" }).click();
  await expect(
    page.getByRole("dialog", { name: "Vite component fixture" }),
  ).toBeVisible();
  await page.keyboard.press("Escape");

  const checkbox = page.getByRole("checkbox", {
    name: "Include archived records",
  });
  await checkbox.click();
  await expect(checkbox).not.toBeChecked();
  const select = page.getByRole("combobox", { name: "Consumer accent" });
  await select.click();
  await page.getByRole("option", { name: "Tidal Blue" }).click();
  await expect(select).toContainText("Tidal Blue");
  const dateTrigger = page.getByRole("button", {
    name: "Change date, Wednesday, 11 November 2026",
  });
  await dateTrigger.click();
  await page.getByRole("button", { name: "Friday, 13 November 2026" }).click();
  await expect(
    page.getByRole("textbox", { name: "Consumer date" }),
  ).toHaveValue("13 Nov 2026");
  const search = page.getByRole("searchbox", { name: "Consumer search" });
  await search.fill("reeds");
  await page.getByRole("button", { name: "Search", exact: true }).click();
  await expect(page.getByText("Searching for reeds")).toBeVisible();
  await expect(
    page.getByRole("table", { name: "Vite station table" }),
  ).toBeVisible();
  await page
    .getByRole("button", { name: "Open user menu for Vite user" })
    .click();
  await expect(page.getByRole("menuitem", { name: "Profile" })).toBeVisible();
});

test("packed Next.js consumer hydrates its styled interactive component", async ({
  page,
}) => {
  const hydrationProblems: string[] = [];
  page.on("console", (message) => {
    if (/hydration|did not match|server rendered html/i.test(message.text())) {
      hydrationProblems.push(message.text());
    }
  });
  page.on("pageerror", (error) => hydrationProblems.push(error.message));

  await page.goto(nextUrl);
  await expectMarismaAndNativeStyles(page, "Confirm hydration");
  await page.getByRole("textbox", { name: "Library name" }).fill("T-005");
  await page.getByRole("button", { name: "Confirm hydration" }).click();
  await expect(page.locator('p[aria-live="polite"]')).toHaveText(
    "Hydrated T-005",
  );

  await page.getByRole("button", { name: "Open details" }).click();
  await expect(
    page.getByRole("dialog", { name: "Hydrated dialog" }),
  ).toBeVisible();
  await page.keyboard.press("Escape");
  const checkbox = page.getByRole("checkbox", { name: "Hydrated checkbox" });
  await checkbox.click();
  await expect(checkbox).not.toBeChecked();
  const select = page.getByRole("combobox", { name: "Hydrated select" });
  await select.click();
  await page.getByRole("option", { name: "Tidal Blue" }).click();
  await expect(select).toContainText("Tidal Blue");
  await expect(
    page.getByRole("textbox", { name: "Hydrated date" }),
  ).toHaveValue("11 Nov 2026");
  const search = page.getByRole("searchbox", { name: "Hydrated search" });
  await search.fill("estuary");
  await page.getByRole("button", { name: "Search", exact: true }).click();
  await expect(page.locator('p[aria-live="polite"]')).toHaveText(
    "Searching for estuary",
  );
  await expect(
    page.getByRole("table", { name: "Next station table" }),
  ).toBeVisible();
  await page
    .getByRole("button", { name: "Open user menu for Next user" })
    .click();
  await expect(page.getByRole("menuitem", { name: "Profile" })).toBeVisible();
  expect(hydrationProblems).toEqual([]);
});
