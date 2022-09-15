import { Button } from "@mantine/core";
import { UiNode, UiNodeAnchorAttributes } from "@ory/client";
import React, { useCallback } from "react";

interface Props {
  node: UiNode;
  attributes: UiNodeAnchorAttributes;
}

export const NodeAnchor = ({ attributes }: Props) => {
  const onClick = useCallback(
    (e: React.MouseEvent) => {
      e.stopPropagation();
      e.preventDefault();
      window.location.href = attributes.href;
    },
    [attributes.href]
  );

  return (
    <Button onClick={onClick} title={attributes.title.text}>
      {attributes.title.text}
    </Button>
  );
};
