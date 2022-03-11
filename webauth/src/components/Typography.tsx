import React from "react";
import * as tw from "tailwindcss-classnames";
import { TailwindClass } from "../lib/ui";

export type HeadingProps = TailwindClass<
  React.HTMLAttributes<HTMLHeadingElement>
>;
export type SpanProps = TailwindClass<React.HTMLAttributes<HTMLSpanElement>>;
export type ParagraphProps = TailwindClass<
  React.HTMLAttributes<HTMLParagraphElement>
>;
export type CodeProps = TailwindClass<React.HTMLAttributes<HTMLElement>>;
export type AnchorProps = TailwindClass<
  React.AnchorHTMLAttributes<HTMLAnchorElement>
>;

export function H1({ className, ...props }: HeadingProps) {
  return (
    <h1
      className={tw.classnames(
        tw.fontFamily("font-sans"),
        tw.fontWeight("font-medium"),
        tw.fontStyle("non-italic"),
        tw.fontSize("text-3xl"),
        className
      )}
      {...props}
    />
  );
}

export function H2({ className, ...props }: HeadingProps) {
  return (
    <h2
      className={tw.classnames(
        tw.fontFamily("font-sans"),
        tw.fontWeight("font-normal"),
        tw.fontStyle("non-italic"),
        tw.fontSize("text-base"),
        className
      )}
      {...props}
    />
  );
}

export function H3({ className, ...props }: HeadingProps) {
  return (
    <h3
      className={tw.classnames(
        tw.fontFamily("font-sans"),
        tw.fontWeight("font-normal"),
        tw.fontStyle("non-italic"),
        tw.fontSize("text-sm"),
        className
      )}
      {...props}
    />
  );
}

export function Lead({ className, ...props }: SpanProps) {
  return (
    <span
      className={tw.classnames(
        tw.fontFamily("font-sans"),
        tw.fontWeight("font-light"),
        tw.fontStyle("non-italic"),
        tw.fontSize("text-base"),
        className
      )}
      {...props}
    />
  );
}

export function P({ className, ...props }: ParagraphProps) {
  return (
    <p
      className={tw.classnames(
        tw.fontFamily("font-sans"),
        tw.fontWeight("font-light"),
        tw.fontStyle("non-italic"),
        tw.fontSize("text-sm"),
        className
      )}
      {...props}
    />
  );
}

export function B({ className, ...props }: SpanProps) {
  return (
    <span
      className={tw.classnames(
        tw.fontFamily("font-sans"),
        tw.fontWeight("font-light"),
        tw.fontStyle("non-italic"),
        tw.fontSize("text-sm"),
        className
      )}
      {...props}
    />
  );
}

export function Code({ className, ...props }: CodeProps) {
  return (
    <code
      className={tw.classnames(
        tw.fontFamily("font-mono"),
        tw.fontWeight("font-normal"),
        tw.fontStyle("non-italic"),
        tw.fontSize("text-sm"),
        tw.textColor("text-gray-50"),
        className
      )}
      {...props}
    />
  );
}

export function Caption({ className, ...props }: SpanProps) {
  return (
    <span
      className={tw.classnames(
        tw.display("block"),
        tw.fontFamily("font-sans"),
        tw.fontWeight("font-light"),
        tw.fontStyle("non-italic"),
        tw.fontSize("text-xs"),
        tw.margin("mb-3.5"),
        className
      )}
      {...props}
    />
  );
}

export function Link({ className, ...props }: AnchorProps) {
  return (
    <a
      className={tw.classnames(
        tw.fontFamily("font-sans"),
        tw.fontSize("text-xs"),
        tw.textDecoration("no-underline"),
        tw.textColor(
          "text-emerald-500",
          "visited:text-emerald-600",
          "hover:text-emerald-300",
          "active:text-emerald-600"
        ),
        className
      )}
      {...props}
    />
  );
}
