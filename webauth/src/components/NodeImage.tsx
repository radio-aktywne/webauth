import { UiNode, UiNodeImageAttributes } from "@ory/kratos-client";

interface Props {
  node: UiNode;
  attributes: UiNodeImageAttributes;
}

export const NodeImage = ({ node, attributes }: Props) => {
  return <img src={attributes.src} alt={node.meta.label?.text} />;
};
