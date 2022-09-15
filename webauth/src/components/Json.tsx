import React from "react";
import Code, { CodeProps } from "./Code";

export type JsonProps = Omit<CodeProps, "code" | "language"> & {
  object: any;
};

export default function Json({ object, ...props }: JsonProps) {
  const code = JSON.stringify(object, null, 2);

  return <Code language="json" code={code} {...props} />;
}
