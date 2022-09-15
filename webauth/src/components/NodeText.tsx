import { UiNode, UiNodeTextAttributes, UiText } from "@ory/client";
import Code from "./Code";
import { Box, Text } from "@mantine/core";
import { lookupSecretId } from "../theme/constants";
import { useLabels } from "../contexts/labels";

interface Props {
  node: UiNode;
  attributes: UiNodeTextAttributes;
}

const Content = ({ attributes }: Props) => {
  const labels = useLabels();

  switch (attributes.text.id) {
    case lookupSecretId:
      // This text node contains lookup secrets. Let's make them a bit more beautiful!
      const secrets = (attributes.text.context as any).secrets.map(
        (text: UiText, k: number) => (
          <Code
            key={k}
            code={text.id === lookupSecretId ? labels.secretUsed : text.text}
          />
        )
      );
      return <Box>{secrets}</Box>;
  }

  return <Code code={attributes.text.text} />;
};

export const NodeText = ({ node, attributes }: Props) => {
  return (
    <Box>
      <Text>{node.meta?.label?.text}</Text>
      <Content node={node} attributes={attributes} />
    </Box>
  );
};
