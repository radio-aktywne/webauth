import { Button } from "@mantine/core";
import { getNodeLabel } from "@ory/integrations/ui";
import { NodeInputProps } from "../lib/ui";
import React, { useCallback } from "react";

export function NodeInputSubmit<T>({
  node,
  attributes,
  setValue,
  disabled,
  dispatchSubmit,
}: NodeInputProps) {
  const onClick = useCallback(
    (e: React.MouseEvent) => {
      // On click, we set this value, and once set, dispatch the submission!
      setValue(attributes.value).then(() => dispatchSubmit(e));
    },
    [setValue, attributes.value, dispatchSubmit]
  );

  const label = getNodeLabel(node);

  return (
    <Button
      disabled={attributes.disabled || disabled}
      name={attributes.name}
      onClick={onClick}
      title={label}
      type="submit"
      value={attributes.value || ""}
    >
      {label}
    </Button>
  );
}
