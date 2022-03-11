import React from "react";
import * as tw from "tailwindcss-classnames";
import { B, H3 } from "./Typography";
import { TailwindClass } from "../lib/ui";

export interface CheckboxProps
  extends TailwindClass<React.InputHTMLAttributes<HTMLInputElement>> {
  title?: string;
  subtitle?: string;
  label?: string;
  state?: "success" | "error" | "disabled";
}

export default function Checkbox({
  title,
  label,
  className,
  state,
  subtitle,
  checked,
  ...props
}: CheckboxProps) {
  const id = Math.random().toString(36).substring(2);
  return (
    <div className={tw.classnames(tw.margin("mb-3.5"), className)}>
      {title && (
        <H3
          className={tw.classnames(
            tw.textColor("text-gray-600"),
            tw.display("block"),
            tw.margin("mb-1.5")
          )}
        >
          {title}
        </H3>
      )}
      <div className={tw.classnames(tw.display("flex"))}>
        <input
          id={id}
          type="checkbox"
          className={tw.classnames(tw.display("hidden"))}
          {...props}
        />
        {label && (
          <label
            htmlFor={id}
            className={tw.classnames(
              tw.position("relative"),
              tw.display("flex"),
              tw.content("before:content-['']" as tw.TTailwindString),
              tw.width("w-[0.75rem]" as tw.TTailwindString),
              tw.height("h-[0.75rem]" as tw.TTailwindString),
              tw.borderWidth("border"),
              tw.borderStyle("border-solid"),
              tw.borderColor("border-gray-200"),
              tw.margin("mt-0.5"),
              tw.backgroundColor({ "bg-emerald-500": checked }),
              tw.textColor({ "text-gray-50": checked })
            )}
          >
            <svg
              width="8"
              height="7"
              viewBox="0 0 8 7"
              xmlns="http://www.w3.org/2000/svg"
              className={tw.classnames(
                tw.position("absolute"),
                tw.fill("fill-gray-50" as tw.TTailwindString),
                tw.inset("left-0.5", "top-1")
              )}
            >
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M7.75 1.8125L2.75 6.8125L0.25 4.3125L1.1875 3.375L2.75 4.9375L6.8125 0.875L7.75 1.8125Z"
                fill="#F9F9FA"
              />
            </svg>
            <B
              className={tw.classnames(tw.display("block"), tw.margin("ml-4"))}
            >
              {label}
            </B>
          </label>
        )}
      </div>
      {subtitle && (
        <div className={tw.classnames(tw.margin("mt-1.5"))}>{subtitle}</div>
      )}
    </div>
  );
}
