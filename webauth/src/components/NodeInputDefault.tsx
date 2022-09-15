import { NodeInputProps } from "../lib/ui";
import React, { useCallback } from "react";
import { TextInput } from "@mantine/core";

export function NodeInputDefault<T>(props: NodeInputProps) {
  const { node, attributes, value = "", setValue, disabled } = props;

  // Some attributes have dynamic JavaScript - this is for example required for WebAuthn.
  const onClick = useCallback(() => {
    // This section is only used for WebAuthn. The script is loaded via a <script> node
    // and the functions are available on the global window level. Unfortunately, there
    // is currently no better way than executing eval / function here at this moment.
    if (attributes.onclick) {
      const run = new Function(attributes.onclick);
      run();
    }
  }, [attributes.onclick]);

  const onChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setValue(e.target.value).then();
    },
    [setValue]
  );

  const errors = node.messages.filter((m) => m.type === "error");
  const otherMessages = node.messages.filter((m) => m.type !== "error");

  const error = errors ? errors.map((e) => e.text).join("\n") : undefined;
  const description = otherMessages
    ? otherMessages.map((e) => e.text).join("\n")
    : undefined;

  console.log(errors);

  // Render a generic text input field.
  return (
    <TextInput
      autoComplete={attributes.autocomplete}
      description={description}
      disabled={attributes.disabled || disabled}
      error={error}
      label={node.meta.label?.text}
      name={attributes.name}
      onClick={onClick}
      onChange={onChange}
      pattern={attributes.pattern}
      required={attributes.required}
      type={attributes.type}
      value={value}
    />
  );
}
