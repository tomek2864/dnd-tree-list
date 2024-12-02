import * as React from "react";
import clsxm from "@/utils/clsxm";
import { InputProps } from "./input.props";
import FormControlCaption from "../form-control-caption/form-control-caption";

const InputSSR = React.forwardRef<HTMLInputElement, InputProps>(
  (
    {
      type = "text",
      placeholder = "",
      label = "",
      name,
      error = "",
      className,
      disabled,
      icon = null,
      iconPosition = "right",
      readOnly,
      ...rest
    },
    ref
  ) => {
    const Icon = icon;

    const inputIcon = (
      Icon: React.ReactNode,
      iconPosition: "left" | "right"
    ) => (
      <div
        className={clsxm(
          "absolute",
          iconPosition === "left" && "left-3 z-10",
          iconPosition === "right" && "right-3"
        )}
      >
        {Icon}
      </div>
    );

    return (
      <div className={clsxm("relative w-full", className)}>
        {!!label?.trim() && (
          <div className="flex justify-between mb-1.5 text-14-500">
            <label
              htmlFor={name}
              className="text-14-500 text-secondary"
              data-cy={`form-input-label-${name}`}
            >
              <span>{label}</span>
            </label>
          </div>
        )}
        <div className="relative flex items-center">
          {iconPosition === "left" && Icon && inputIcon(Icon, "left")}
          <input
            ref={ref}
            type={type}
            name={name}
            placeholder={placeholder}
            disabled={disabled}
            className={clsxm(
              "border border-primary bg-primary rounded-md px-3 py-2 w-full",
              icon && iconPosition === "left" && "pl-[35px]",
              error !== "" && "border-alert-300 bg-alert-100",
              readOnly && " pointer-events-none bg-gray-100"
            )}
            data-cy={`form-input-${name}`}
            {...rest}
          />
          {iconPosition === "right" && Icon && inputIcon(Icon, "right")}
        </div>
        <FormControlCaption error={error} name={name} />
      </div>
    );
  }
);

InputSSR.displayName = "InputSSR";

export default InputSSR;
