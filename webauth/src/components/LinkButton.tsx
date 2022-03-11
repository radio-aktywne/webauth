import React from "react";
import ButtonContainer from "./ButtonContainer";
import { TailwindClass } from "../lib/ui";
import * as tw from "tailwindcss-classnames";

export interface LinkButtonProps
  extends TailwindClass<React.AnchorHTMLAttributes<HTMLAnchorElement>> {
  disabled?: boolean;
}

export default function LinkButton({
  className,
  disabled,
  ...props
}: LinkButtonProps) {
  return (
    <ButtonContainer className={className} disabled={disabled}>
      <a
        className={tw.classnames(
          tw.display("block"),
          tw.width("w-full"),
          tw.height("h-full"),
          tw.pointerEvents({ "pointer-events-none": disabled }),
          tw.padding("py-3", "px-3"),
          tw.borderRadius("rounded"),
          tw.margin("-m-[2px]" as tw.TTailwindString)
        )}
        aria-disabled={disabled}
        {...props}
      />
    </ButtonContainer>
  );
}
