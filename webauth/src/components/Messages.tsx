import { UiText } from "@ory/client";
import { Alert, Stack } from "@mantine/core";
import { errorAlertColor, infoAlertColor } from "../theme/constants";

interface MessageProps {
  message: UiText;
}

export const Message = ({ message }: MessageProps) => {
  return (
    <Alert color={message.type === "error" ? errorAlertColor : infoAlertColor}>
      {message.text}
    </Alert>
  );
};

interface MessagesProps {
  messages?: Array<UiText>;
}

export const Messages = ({ messages }: MessagesProps) => {
  if (!messages) {
    // No messages? Do nothing.
    return null;
  }

  return (
    <Stack>
      {messages.map((message) => (
        <Message key={message.id} message={message} />
      ))}
    </Stack>
  );
};
