import { getNodeLabel } from "@ory/integrations/ui";
import { NodeInputProps } from "../lib/ui";
import { FormEvent, useCallback } from "react";
import { Button } from "@mantine/core";

export function NodeInputButton<T>({
  node,
  attributes,
  setValue,
  disabled,
  dispatchSubmit,
}: NodeInputProps) {
  // Some attributes have dynamic JavaScript - this is for example required for WebAuthn.
  const onClick = useCallback(
    (e: MouseEvent | FormEvent) => {
      // This section is only used for WebAuthn. The script is loaded via a <script> node
      // and the functions are available on the global window level. Unfortunately, there
      // is currently no better way than executing eval / function here at this moment.
      //
      // Please note that we also need to prevent the default action from happening.
      if (attributes.onclick) {
        e.stopPropagation();
        e.preventDefault();
        const run = new Function(attributes.onclick);
        run();
        return;
      }

      setValue(attributes.value).then(() => dispatchSubmit(e));
    },
    [attributes.onclick, attributes.value, setValue, dispatchSubmit]
  );

  const label = getNodeLabel(node);

  return (
    <Button
      name={attributes.name}
      onClick={onClick}
      value={attributes.value || ""}
      disabled={attributes.disabled || disabled}
      title={label}
    >
      {label}
    </Button>
  );
}
