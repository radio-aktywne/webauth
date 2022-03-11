import { NodeInputProps } from "../lib/ui";

export function NodeInputHidden<T>({ attributes }: NodeInputProps) {
  // Render a hidden input field
  return (
    <input
      type={attributes.type}
      name={attributes.name}
      value={attributes.value || "true"}
    />
  );
}
