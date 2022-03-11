import React from "react";
import ButtonContainer from "./ButtonContainer";
import { TailwindClass } from "../lib/ui";
import * as tw from "tailwindcss-classnames";

export type ButtonProps = TailwindClass<
  React.ButtonHTMLAttributes<HTMLButtonElement>
>;

export default function Button({ className, disabled, ...props }: ButtonProps) {
  return (
    <ButtonContainer className={className} disabled={disabled}>
      <button
        className={tw.classnames(
          tw.display("block"),
          tw.width("w-full"),
          tw.height("h-full"),
          tw.pointerEvents({ "pointer-events-none": disabled }),
          tw.padding("py-3", "px-3"),
          tw.borderRadius("rounded"),
          tw.margin("-m-[2px]" as tw.TTailwindString)
        )}
        {...props}
      />
    </ButtonContainer>
  );
}
