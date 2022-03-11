import React from "react";
import * as tw from "tailwindcss-classnames";
import { TailwindClass } from "../lib/ui";

interface ButtonContainerProps
  extends TailwindClass<React.HTMLAttributes<HTMLDivElement>> {
  disabled?: boolean;
}

export default function ButtonContainer({
  className,
  disabled,
  ...props
}: ButtonContainerProps) {
  return (
    <div
      className={tw.classnames(
        tw.boxSizing("box-border"),
        tw.lineHeight("leading-5"),
        tw.textColor("text-gray-50", { "text-gray-400": disabled }),
        tw.width("w-full"),
        tw.margin("my-1.5", "mx-0"),
        tw.borderRadius("rounded"),
        tw.borderWidth("border-2"),
        tw.borderStyle("border-solid"),
        tw.borderColor("border-transparent", {
          "focus:border-blue-300": !disabled,
          "active:border-transparent": !disabled,
        }),
        tw.outlineStyle("outline-none"),
        tw.backgroundColor("bg-emerald-500", {
          "bg-gray-200": disabled,
          "hover:bg-emerald-300": !disabled,
          "focus:bg-emerald-500": !disabled,
          "active:bg-emerald-600": !disabled,
        }),
        tw.cursor("cursor-pointer", { "cursor-not-allowed": disabled }),
        tw.textDecoration("no-underline"),
        tw.display("inline-block"),
        tw.textAlign("text-center"),
        className
      )}
      {...props}
    />
  );
}
