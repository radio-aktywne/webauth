import React from "react";
import { H2, HeadingProps } from "./Typography";
import * as tw from "tailwindcss-classnames";

export default function PanelTitle({ className, ...props }: HeadingProps) {
  return (
    <H2
      className={tw.classnames(
        tw.textColor("text-emerald-600"),
        tw.textAlign("text-center"),
        tw.margin("mb-3.5"),
        className
      )}
      {...props}
    />
  );
}
