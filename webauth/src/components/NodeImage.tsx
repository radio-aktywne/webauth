import { UiNode, UiNodeImageAttributes } from "@ory/client";
import { Image } from "@mantine/core";

interface Props {
  node: UiNode;
  attributes: UiNodeImageAttributes;
}

export const NodeImage = ({ node, attributes }: Props) => {
  return <Image src={attributes.src} alt={node.meta.label?.text} />;
};
