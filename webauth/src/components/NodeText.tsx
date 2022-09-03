import { UiNode, UiNodeTextAttributes, UiText } from "@ory/client";
import CodeBox from "./CodeBox";
import { P } from "./Typography";

interface Props {
  node: UiNode;
  attributes: UiNodeTextAttributes;
}

const Content = ({ attributes }: Props) => {
  switch (attributes.text.id) {
    case 1050015:
      // This text node contains lookup secrets. Let's make them a bit more beautiful!
      const secrets = (attributes.text.context as any).secrets.map(
        (text: UiText, k: number) => (
          <div key={k}>
            {/* Used lookup_secret has ID 1050014 */}
            <code>{text.id === 1050014 ? "Used" : text.text}</code>
          </div>
        )
      );
      return (
        <div>
          <div>{secrets}</div>
        </div>
      );
  }

  return (
    <div>
      <CodeBox scrollable={true} code={attributes.text.text} />
    </div>
  );
};

export const NodeText = ({ node, attributes }: Props) => {
  return (
    <>
      <P>{node.meta?.label?.text}</P>
      <Content node={node} attributes={attributes} />
    </>
  );
};
