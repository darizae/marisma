"use client";

import {
  useEffect,
  useState,
  type ComponentPropsWithRef,
  type ReactNode,
} from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "../lib/cn";

export const avatarVariants = cva(
  "relative inline-flex shrink-0 items-center justify-center overflow-hidden rounded-full bg-mar-surface font-mar-sans font-semibold text-mar-muted ring-1 ring-inset ring-mar-border",
  {
    variants: {
      size: {
        small: "size-8 text-xs",
        default: "size-11 text-sm",
        large: "size-14 text-base",
      },
    },
    defaultVariants: { size: "default" },
  },
);

export type AvatarProps = Omit<ComponentPropsWithRef<"span">, "children"> &
  VariantProps<typeof avatarVariants> & {
    alt: string;
    fallback: ReactNode;
    imageClassName?: string;
    src?: string;
  };

export function Avatar({
  alt,
  className,
  fallback,
  imageClassName,
  size,
  src,
  ...props
}: AvatarProps) {
  const [failed, setFailed] = useState(false);

  useEffect(() => setFailed(false), [src]);

  return (
    <span className={cn(avatarVariants({ size }), className)} {...props}>
      {src && !failed ? (
        <img
          alt={alt}
          className={cn("size-full object-cover", imageClassName)}
          onError={() => setFailed(true)}
          src={src}
        />
      ) : (
        <span
          aria-label={alt || undefined}
          aria-hidden={alt ? undefined : true}
        >
          {fallback}
        </span>
      )}
    </span>
  );
}
