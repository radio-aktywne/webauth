import NextLink, { LinkProps } from "next/link";
import React from "react";

const RefWrapper = React.forwardRef<any, React.PropsWithChildren<{}>>(
  ({ children, ...props }, ref) =>
    React.isValidElement(children) ? React.cloneElement(children, props) : null
);

export default function Link({
  children,
  ...props
}: React.PropsWithChildren<LinkProps>) {
  return (
    <NextLink {...props}>
      <RefWrapper>{children}</RefWrapper>
    </NextLink>
  );
}
