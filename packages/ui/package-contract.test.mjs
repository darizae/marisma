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
      "dist/components/app-navbar.d.ts",
      "dist/components/app-navbar.js",
      "dist/components/app-shell.d.ts",
      "dist/components/app-shell.js",
      "dist/components/avatar.d.ts",
      "dist/components/avatar.js",
      "dist/components/badge.d.ts",
      "dist/components/badge.js",
      "dist/components/button-group.d.ts",
      "dist/components/button-group.js",
      "dist/components/button.d.ts",
      "dist/components/button.js",
      "dist/components/calendar.d.ts",
      "dist/components/calendar.js",
      "dist/components/card-grid.d.ts",
      "dist/components/card-grid.js",
      "dist/components/card.d.ts",
      "dist/components/card.js",
      "dist/components/checkbox.d.ts",
      "dist/components/checkbox.js",
      "dist/components/collapsible.d.ts",
      "dist/components/collapsible.js",
      "dist/components/confirmation-dialog.d.ts",
      "dist/components/confirmation-dialog.js",
      "dist/components/copy-code.d.ts",
      "dist/components/copy-code.js",
      "dist/components/data-preview.d.ts",
      "dist/components/data-preview.js",
      "dist/components/date-field.d.ts",
      "dist/components/date-field.js",
      "dist/components/dialog.d.ts",
      "dist/components/dialog.js",
      "dist/components/dropdown-menu.d.ts",
      "dist/components/dropdown-menu.js",
      "dist/components/dropzone.d.ts",
      "dist/components/dropzone.js",
      "dist/components/error-view.d.ts",
      "dist/components/error-view.js",
      "dist/components/form.d.ts",
      "dist/components/form.js",
      "dist/components/inline-edit.d.ts",
      "dist/components/inline-edit.js",
      "dist/components/input.d.ts",
      "dist/components/input.js",
      "dist/components/label.d.ts",
      "dist/components/label.js",
      "dist/components/navigation-link.d.ts",
      "dist/components/navigation-link.js",
      "dist/components/page-footer.d.ts",
      "dist/components/page-footer.js",
      "dist/components/page-heading.d.ts",
      "dist/components/page-heading.js",
      "dist/components/page-section.d.ts",
      "dist/components/page-section.js",
      "dist/components/popover.d.ts",
      "dist/components/popover.js",
      "dist/components/radio-group.d.ts",
      "dist/components/radio-group.js",
      "dist/components/record-list.d.ts",
      "dist/components/record-list.js",
      "dist/components/scroll-area.d.ts",
      "dist/components/scroll-area.js",
      "dist/components/search-field.d.ts",
      "dist/components/search-field.js",
      "dist/components/select.d.ts",
      "dist/components/select.js",
      "dist/components/separator.d.ts",
      "dist/components/separator.js",
      "dist/components/sidebar.d.ts",
      "dist/components/sidebar.js",
      "dist/components/spinner.d.ts",
      "dist/components/spinner.js",
      "dist/components/step-progress.d.ts",
      "dist/components/step-progress.js",
      "dist/components/switch.d.ts",
      "dist/components/switch.js",
      "dist/components/table.d.ts",
      "dist/components/table.js",
      "dist/components/tabs.d.ts",
      "dist/components/tabs.js",
      "dist/components/textarea.d.ts",
      "dist/components/textarea.js",
      "dist/components/toast.d.ts",
      "dist/components/toast.js",
      "dist/components/toggle-group.d.ts",
      "dist/components/toggle-group.js",
      "dist/components/tooltip.d.ts",
      "dist/components/tooltip.js",
      "dist/components/user-menu.d.ts",
      "dist/components/user-menu.js",
      "dist/index.d.ts",
      "dist/index.js",
      "dist/lib/cn.js",
      "dist/lib/portal-theme.js",
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
      "calendar",
      "checkbox",
      "collapsible",
      "confirmation-dialog",
      "copy-code",
      "data-preview",
      "date-field",
      "dialog",
      "dropzone",
      "dropdown-menu",
      "form",
      "input",
      "inline-edit",
      "popover",
      "radio-group",
      "search-field",
      "select",
      "sidebar",
      "step-progress",
      "switch",
      "tabs",
      "textarea",
      "toast",
      "toggle-group",
      "tooltip",
      "user-menu",
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
        "for (const name of ['Alert', 'AppNavbar', 'AppNavbarLink', 'AppShell', 'Avatar', 'Badge', 'Button', 'ButtonGroup', 'Card', 'CardContent', 'CardFooter', 'CardGrid', 'CardGridItem', 'CopyCode', 'DataPreview', 'Dialog', 'DialogContent', 'ErrorView', 'Input', 'Label', 'PageFooter', 'PageHeading', 'PageSection', 'RecordList', 'RecordListItem', 'ScrollArea', 'Separator', 'Sidebar', 'SidebarContent', 'SidebarLink', 'SidebarNav', 'SidebarTrigger', 'Spinner', 'StepProgress', 'StepProgressItem', 'StepProgressLink', 'Table', 'TableBody', 'TableCell', 'TableHead', 'TableHeader', 'TableRow', 'TableRowHeader', 'ToastAction', 'ToastProvider', 'UserMenu', 'useToast']) assert.equal(typeof api[name], 'function', name);",
        "for (const name of ['Calendar', 'Checkbox', 'Collapsible', 'CollapsibleContent', 'CollapsibleTrigger', 'ConfirmationDialog', 'DateField', 'Dropzone', 'DropdownMenu', 'DropdownMenuContent', 'DropdownMenuItem', 'DropdownMenuSub', 'DropdownMenuSubContent', 'DropdownMenuSubTrigger', 'DropdownMenuTrigger', 'FieldCallout', 'FieldDivider', 'FieldGroup', 'Form', 'InlineEdit', 'Popover', 'PopoverContent', 'PopoverTrigger', 'RadioGroup', 'RadioGroupItem', 'SearchField', 'Select', 'Switch', 'Tabs', 'TabsContent', 'TabsList', 'TabsTrigger', 'Textarea', 'ToggleGroup', 'ToggleGroupItem', 'Tooltip', 'TooltipContent', 'TooltipProvider', 'TooltipTrigger']) assert.ok(name in api, name);",
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
        "import { Alert, AppNavbar, AppNavbarLink, AppShell, Avatar, Badge, Button, ButtonGroup, Calendar, Card, CardContent, CardGrid, CardGridItem, Checkbox, Collapsible, CollapsibleContent, CollapsibleTrigger, ConfirmationDialog, CopyCode, DataPreview, DateField, Dialog, DialogContent, DialogTitle, DialogTrigger, Dropzone, DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSub, DropdownMenuSubContent, DropdownMenuSubTrigger, DropdownMenuTrigger, ErrorView, FieldCallout, FieldDivider, FieldGroup, Form, InlineEdit, Input, Label, PageFooter, PageHeading, PageSection, Popover, PopoverContent, PopoverTrigger, RadioGroup, RadioGroupItem, RecordList, RecordListItem, ScrollArea, SearchField, Select, Separator, Sidebar, SidebarContent, SidebarLink, SidebarNav, SidebarTrigger, Spinner, StepProgress, StepProgressItem, StepProgressLink, Switch, Table, TableBody, TableCell, TableHead, TableHeader, TableRow, TableRowHeader, Tabs, TabsContent, TabsList, TabsTrigger, Textarea, ToastProvider, ToggleGroup, ToggleGroupItem, Tooltip, TooltipContent, TooltipProvider, TooltipTrigger, UserMenu } from '@darizae/marisma';",
        "import type { AlertProps, AppNavbarProps, AppShellProps, AvatarProps, BadgeProps, ButtonGroupProps, ButtonProps, CalendarProps, CardGridProps, CheckboxProps, ConfirmationDialogProps, CopyCodeProps, DataPreviewProps, DateFieldProps, DialogContentProps, DialogPortalProps, DialogProps, DropzoneProps, DropdownMenuSubProps, ErrorViewProps, FieldGroupProps, FormProps, InlineEditProps, InputProps, LabelProps, PageFooterProps, PageHeadingProps, PageSectionProps, RadioGroupProps, RecordListProps, ScrollAreaProps, SearchFieldProps, SelectProps, SeparatorProps, SidebarProps, SpinnerProps, StepProgressProps, SwitchProps, TableProps, TabsProps, TextareaProps, ToastProviderProps, ToggleGroupProps, UserMenuProps } from '@darizae/marisma';",
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
        "const calendarProps = { defaultValue: '2026-11-11', locale: 'en-GB', timeZone: 'Europe/Madrid', weekStartsOn: 1 } satisfies CalendarProps;",
        "const checkboxProps = { label: 'Include archived', defaultChecked: 'indeterminate' } satisfies CheckboxProps;",
        "const dateFieldProps = { label: 'Observation date', defaultValue: '2026-11-11', name: 'date' } satisfies DateFieldProps;",
        "const radioProps = { label: 'Accent', defaultValue: 'reedwater' } satisfies RadioGroupProps;",
        "const selectProps = { label: 'Accent', options: [{ label: 'Reedwater', value: 'reedwater' }], defaultValue: 'reedwater' } satisfies SelectProps;",
        "const switchProps = { label: 'Alerts', defaultChecked: true } satisfies SwitchProps;",
        "const tabsProps = { defaultValue: 'one' } satisfies TabsProps;",
        "const textareaProps = { label: 'Note', defaultValue: 'Calm' } satisfies TextareaProps;",
        "const toggleProps = { type: 'single', defaultValue: 'one', 'aria-label': 'View' } satisfies ToggleGroupProps;",
        "const subProps = { defaultOpen: false } satisfies DropdownMenuSubProps;",
        "const confirmationProps = { trigger: 'Remove', title: 'Remove?', description: 'Confirm removal', onConfirm() {} } satisfies ConfirmationDialogProps;",
        "const dropzoneProps = { label: 'Files', maxFiles: 2 } satisfies DropzoneProps;",
        "const fieldGroupProps = { legend: 'Details' } satisfies FieldGroupProps;",
        "const formProps = { errors: [{ fieldId: 'name', message: 'Required' }] } satisfies FormProps;",
        "const inlineProps = { label: 'Name', defaultValue: 'Marisma' } satisfies InlineEditProps;",
        "const searchProps = { label: 'Search', onSearch() {} } satisfies SearchFieldProps;",
        "const appNavbarProps = { brand: 'Marisma', sticky: false } satisfies AppNavbarProps;",
        "const appShellProps = { mainId: 'content' } satisfies AppShellProps;",
        "const gridProps = { columns: 'three' } satisfies CardGridProps;",
        "const dataProps = { data: { safe: true }, maxCharacters: 1000 } satisfies DataPreviewProps;",
        "const errorProps = { title: 'Unavailable' } satisfies ErrorViewProps;",
        "const footerProps = { navigationLabel: 'Footer' } satisfies PageFooterProps;",
        "const headingProps = { title: 'Overview' } satisfies PageHeadingProps;",
        "const sectionProps = { title: 'Stations' } satisfies PageSectionProps;",
        "const records = [{ id: 'north', name: 'North bank' }] as const;",
        "const recordProps = { records, label: 'Stations', getKey: (record: (typeof records)[number]) => record.id, renderRecord: (record: (typeof records)[number]) => <RecordListItem title={record.name} /> } satisfies RecordListProps<(typeof records)[number]>;",
        "const sidebarProps = { defaultOpen: false } satisfies SidebarProps;",
        "const progressProps = { label: 'Create station' } satisfies StepProgressProps;",
        "const tableProps = { 'aria-label': 'Stations', scrollLabel: 'Station data' } satisfies TableProps;",
        "const userProps = { name: 'Ada', children: <DropdownMenuItem>Profile</DropdownMenuItem> } satisfies UserMenuProps;",
        "const tree = <ToastProvider {...toastProps}><AppNavbar {...appNavbarProps}><AppNavbarLink href='/'>Home</AppNavbarLink></AppNavbar><AppShell {...appShellProps} footer={<PageFooter {...footerProps}>Footer</PageFooter>}><PageHeading {...headingProps} /><PageSection {...sectionProps}><CardGrid {...gridProps}><CardGridItem><Card><CardContent>Card</CardContent></Card></CardGridItem></CardGrid><RecordList {...recordProps} /><Table {...tableProps}><TableHeader><TableRow><TableHead>Name</TableHead></TableRow></TableHeader><TableBody><TableRow><TableRowHeader>North</TableRowHeader><TableCell>Current</TableCell></TableRow></TableBody></Table><DataPreview {...dataProps} /></PageSection><ErrorView {...errorProps} /><StepProgress {...progressProps}><StepProgressItem status='current' step='1'><StepProgressLink href='/'>Details</StepProgressLink></StepProgressItem></StepProgress><UserMenu {...userProps} /></AppShell><Sidebar {...sidebarProps}><SidebarTrigger>Menu</SidebarTrigger><SidebarContent title='Workspace'><SidebarNav><SidebarLink href='/'>Home</SidebarLink></SidebarNav></SidebarContent></Sidebar><Alert {...alertProps} /><Avatar {...avatarProps} /><Badge {...badgeProps} /><ButtonGroup {...groupProps}><Button {...buttonProps} /></ButtonGroup><Card><CardContent><Label {...labelProps}>Name</Label><Input {...inputProps} /></CardContent></Card><Form {...formProps}><FieldGroup {...fieldGroupProps}><FieldCallout>Help</FieldCallout><FieldDivider /></FieldGroup></Form><InlineEdit {...inlineProps} /><SearchField {...searchProps} /><Dropzone {...dropzoneProps} /><ConfirmationDialog {...confirmationProps} /><Checkbox {...checkboxProps} /><Switch {...switchProps} /><RadioGroup {...radioProps}><RadioGroupItem label='Reedwater' value='reedwater' /></RadioGroup><ToggleGroup {...toggleProps}><ToggleGroupItem value='one'>One</ToggleGroupItem></ToggleGroup><Collapsible><CollapsibleTrigger>Details</CollapsibleTrigger><CollapsibleContent>Content</CollapsibleContent></Collapsible><Textarea {...textareaProps} /><Tabs {...tabsProps}><TabsList><TabsTrigger value='one'>One</TabsTrigger></TabsList><TabsContent value='one'>Panel</TabsContent></Tabs><Popover><PopoverTrigger>Open</PopoverTrigger><PopoverContent>Content</PopoverContent></Popover><TooltipProvider><Tooltip><TooltipTrigger>Help</TooltipTrigger><TooltipContent>Help text</TooltipContent></Tooltip></TooltipProvider><DropdownMenu><DropdownMenuTrigger>Actions</DropdownMenuTrigger><DropdownMenuContent><DropdownMenuItem>Edit</DropdownMenuItem><DropdownMenuSub {...subProps}><DropdownMenuSubTrigger>Move</DropdownMenuSubTrigger><DropdownMenuSubContent><DropdownMenuItem>Archive</DropdownMenuItem></DropdownMenuSubContent></DropdownMenuSub></DropdownMenuContent></DropdownMenu><Select {...selectProps} /><Calendar {...calendarProps} /><DateField {...dateFieldProps} /><CopyCode {...copyProps} /><ScrollArea {...scrollProps}>Reading</ScrollArea><Separator {...separatorProps} /><Spinner {...spinnerProps} /><Dialog {...dialogProps}><DialogTrigger>Open</DialogTrigger><DialogContent {...contentProps}><DialogTitle>Title</DialogTitle></DialogContent></Dialog></ToastProvider>;",
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
