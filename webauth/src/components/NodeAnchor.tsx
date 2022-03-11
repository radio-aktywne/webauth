import { UiNode, UiNodeAnchorAttributes } from "@ory/kratos-client";
import Button from "./Button";

interface Props {
  node: UiNode;
  attributes: UiNodeAnchorAttributes;
}

export const NodeAnchor = ({ attributes }: Props) => {
  return (
    <Button
      onClick={(e) => {
        e.stopPropagation();
        e.preventDefault();
        window.location.href = attributes.href;
      }}
    >
      {attributes.title.text}
    </Button>
  );
};
