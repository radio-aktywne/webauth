import React from "react";
import * as tw from "tailwindcss-classnames";
import { Link } from "./Typography";
import { TailwindClass } from "../lib/ui";

export type CenterLinkProps = TailwindClass<
  React.AnchorHTMLAttributes<HTMLAnchorElement>
>;

export default function CenterLink({ className, ...props }: CenterLinkProps) {
  return (
    <Link
      className={tw.classnames(
        tw.textAlign("text-center"),
        tw.fontSize("text-sm"),
        className
      )}
      {...props}
    />
  );
}
