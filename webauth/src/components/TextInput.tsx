import React, { ReactNode } from "react";
import * as tw from "tailwindcss-classnames";
import { Caption, H3 } from "./Typography";
import { TailwindClass } from "../lib/ui";

export interface State {
  state?: "success" | "error" | "disabled";
}

type TitleProps = TailwindClass<React.HTMLAttributes<HTMLDivElement>> & State;

interface FieldProps
  extends TailwindClass<React.InputHTMLAttributes<HTMLInputElement>>,
    State {
  help?: boolean;
}

export interface TextInputProps extends FieldProps, State {
  subtitle?: ReactNode;
  helper?: ReactNode;
}

function textColorForState(state: string): tw.TTextColor {
  switch (state) {
    case "success":
      return "text-green-500";
    case "error":
      return "text-red-500";
    case "disabled":
      return "text-gray-400";
  }
  return "text-gray-600";
}

function borderColorForState(state: string): tw.TBorderColor {
  switch (state) {
    case "disabled":
      return "border-transparent";
    case "success":
      return "border-green-500";
    case "error":
      return "border-red-500";
  }
  return "border-gray-400";
}

function backgroundColorForState(state: string): tw.TBackgroundColor {
  switch (state) {
    case "disabled":
      return "bg-gray-200";
  }
  return "bg-transparent";
}

function Field({ help, state, className, ...props }: FieldProps) {
  return (
    <input
      className={tw.classnames(
        tw.boxSizing("box-border"),
        tw.fontFamily("font-sans"),
        tw.fontWeight("font-light"),
        tw.fontStyle("non-italic"),
        tw.fontSize("text-sm"),
        tw.textColor(textColorForState(state)),
        tw.width("w-full"),
        tw.margin("mt-2", help ? "mb-2" : "mb-3.5"),
        tw.padding("py-1", "px-3"),
        tw.borderWidth("border"),
        tw.borderStyle("border-solid"),
        tw.borderColor(
          borderColorForState(state),
          "hover:border-emerald-300",
          "focus:border-emerald-500"
        ),
        tw.borderRadius("rounded"),
        tw.backgroundColor(backgroundColorForState(state)),
        tw.overflow("overflow-visible"),
        tw.outlineStyle("outline-none"),
        className
      )}
      {...props}
    />
  );
}

function Subtitle({ state, className, ...props }: TitleProps) {
  return (
    <Caption
      className={tw.classnames(
        tw.textColor(textColorForState(state)),
        className
      )}
      {...props}
    />
  );
}

function Title({ state, className, ...props }: TitleProps) {
  return (
    <H3
      className={tw.classnames(
        tw.textColor(textColorForState(state)),
        className
      )}
      {...props}
    />
  );
}

export default function TextInput({
  state,
  className,
  title,
  subtitle,
  disabled,
  type = "text",
  ...props
}: TextInputProps) {
  if (disabled) {
    state = "disabled";
  }

  return (
    <div className={className}>
      {title && (
        <Title state={state} className={className}>
          {title}
        </Title>
      )}
      <Field {...props} state={state} type={type} className={className} />
      {subtitle && (
        <Subtitle state={state} className={className}>
          {subtitle}
        </Subtitle>
      )}
    </div>
  );
}
