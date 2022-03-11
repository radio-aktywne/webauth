import React from "react";
import * as tw from "tailwindcss-classnames";
import { TailwindClass } from "../lib/ui";

export type PanelProps = TailwindClass<React.HTMLAttributes<HTMLDivElement>>;

export default function Panel({ className, ...props }: PanelProps) {
  return (
    <div
      className={tw.classnames(
        tw.backgroundColor("bg-white"),
        tw.borderWidth("border"),
        tw.borderStyle("border-solid"),
        tw.borderColor("border-gray-200"),
        tw.display("flex"),
        tw.flexDirection("flex-col"),
        tw.alignItems("items-stretch"),
        tw.width("w-[40rem]" as tw.TTailwindString),
        tw.margin("m-1"),
        tw.padding("p-5"),
        className
      )}
      {...props}
    />
  );
}
