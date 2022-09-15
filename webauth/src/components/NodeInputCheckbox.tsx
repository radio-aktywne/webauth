import { Checkbox } from "@mantine/core";
import { getNodeLabel } from "@ory/integrations/ui";
import { NodeInputProps } from "../lib/ui";
import { useCallback } from "react";

export function NodeInputCheckbox<T>({
  node,
  attributes,
  setValue,
  disabled,
}: NodeInputProps) {
  // Render a checkbox

  const onChange = useCallback(
    (value: string[]) => {
      setValue(value.length > 0).then();
    },
    [setValue]
  );

  const error = node.messages
    ? node.messages.map((e) => e.text).join("\n")
    : undefined;

  const label = getNodeLabel(node);

  return (
    <Checkbox.Group
      error={error}
      onChange={onChange}
      required={attributes.required}
      value={attributes.value ? ["checkbox"] : []}
    >
      <Checkbox
        name={attributes.name}
        value="checkbox"
        disabled={attributes.disabled || disabled}
        label={label}
      />
    </Checkbox.Group>
  );
}
