import React from "react";
import { Prism, PrismProps } from "@mantine/prism";
import { useLabels } from "../contexts/labels";

export type CodeProps = Omit<
  PrismProps,
  "children" | "copyLabel" | "copiedLabel" | "language"
> & {
  code: string;
  language?: PrismProps["language"];
};

export default function Code({
  code,
  language = "markdown",
  ...props
}: CodeProps) {
  const labels = useLabels();

  return (
    <Prism
      language={language}
      copyLabel={labels.copy}
      copiedLabel={labels.copied}
      {...props}
    >
      {code}
    </Prism>
  );
}
