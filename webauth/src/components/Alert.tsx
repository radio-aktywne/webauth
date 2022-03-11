import React from "react";
import * as tw from "tailwindcss-classnames";
import { H3 } from "./Typography";
import { TailwindClass } from "../lib/ui";

export interface AlertProps
  extends TailwindClass<React.HTMLAttributes<HTMLDivElement>> {
  severity?: "error" | "info";
}

export default function Alert({ severity, className, ...props }: AlertProps) {
  return (
    <div
      className={tw.classnames(
        tw.borderWidth("border"),
        tw.borderStyle("border-solid"),
        tw.borderRadius("rounded"),
        tw.borderColor(
          severity === "info" ? "border-green-400" : "border-red-400"
        ),
        tw.textColor(severity === "info" ? "text-gray-900" : "text-red-500"),
        tw.margin("my-2.5", "mx-auto"),
        tw.padding("p-1"),
        className
      )}
    >
      <H3 className={tw.classnames(tw.margin("m-0"))} {...props} />
    </div>
  );
}
