"use client";

import type { ReactNode } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
  type DropdownMenuContentProps,
  type DropdownMenuProps,
} from "./dropdown-menu";
import { cn } from "../lib/cn";

export type UserMenuProps = Omit<DropdownMenuProps, "children"> & {
  name: string;
  description?: ReactNode;
  avatar?: ReactNode;
  children: ReactNode;
  triggerLabel?: string;
  contentProps?: Omit<DropdownMenuContentProps, "children">;
};

function initials(name: string) {
  return (
    name
      .trim()
      .split(/\s+/)
      .slice(0, 2)
      .map((part) => part[0]?.toUpperCase())
      .join("") || "?"
  );
}

export function UserMenu({
  avatar,
  children,
  contentProps,
  description,
  name,
  triggerLabel = `Open user menu for ${name}`,
  ...props
}: UserMenuProps) {
  return (
    <DropdownMenu {...props}>
      <DropdownMenuTrigger
        aria-label={triggerLabel}
        className="max-w-64 justify-start px-2"
        variant="ghost"
      >
        {avatar ?? (
          <span
            aria-hidden="true"
            className="inline-flex size-8 shrink-0 items-center justify-center rounded-full bg-mar-primary text-xs font-semibold text-mar-on-primary"
          >
            {initials(name)}
          </span>
        )}
        <span className="min-w-0 truncate">{name}</span>
        <span aria-hidden="true" className="text-mar-muted">
          ▾
        </span>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        {...contentProps}
        align={contentProps?.align ?? "end"}
        className={cn("min-w-60", contentProps?.className)}
      >
        <DropdownMenuLabel>
          <span className="block normal-case tracking-normal text-mar-text">
            {name}
          </span>
          {description !== undefined && description !== null ? (
            <span className="mt-1 block max-w-56 truncate font-normal normal-case tracking-normal text-mar-muted">
              {description}
            </span>
          ) : null}
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        {children}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
