import React from "react";
import * as tw from "tailwindcss-classnames";
import { Code } from "./Typography";
import { TailwindClass } from "../lib/ui";

export interface CodeBoxProps
  extends TailwindClass<React.HTMLAttributes<HTMLPreElement>> {
  code: string;
  scrollable?: boolean;
}

export default function CodeBox({
  code,
  scrollable = true,
  className,
  ...props
}: CodeBoxProps) {
  return (
    <pre
      className={tw.classnames(
        tw.backgroundColor("bg-gray-600"),
        tw.padding("p-5"),
        tw.borderRadius("rounded-lg"),
        tw.textColor("text-blue-50"),
        tw.wordBreak("break-words"),
        tw.overflow({ "overflow-x-auto": scrollable }),
        className
      )}
      {...props}
    >
      <Code dangerouslySetInnerHTML={{ __html: code }} />
    </pre>
  );
}
