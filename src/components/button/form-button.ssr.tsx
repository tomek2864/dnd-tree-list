import clsxm from "@/utils/clsxm";
import * as React from "react";

import { FormButtonProps } from "./button.props";
import Image from "next/image";

const FormButtonSSR = React.forwardRef<HTMLButtonElement, FormButtonProps>(
  (
    {
      children,
      className,
      disabled,
      isLoading,
      type = "button",
      icon = null,
      iconPosition = "right",
      ...rest
    },
    ref
  ) => {
    const Icon = icon;

    return (
      <button
        ref={ref}
        type={type}
        disabled={disabled || isLoading}
        className={clsxm(
          "btn relative inline-flex",
          "disabled:cursor-not-allowed",
          isLoading && "!text-transparent disabled:cursor-wait",
          className
        )}
        {...rest}
      >
        {isLoading && (
          <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
            <Image
              aria-hidden
              src="/icons/ic_arrow-path.svg"
              alt="loading"
              className="animate-spin"
              width={16}
              height={16}
            />
          </div>
        )}
        {iconPosition === "left" && Icon && (
          <span className="flex items-center">{Icon}</span>
        )}
        {children}
        {iconPosition === "right" && Icon && (
          <span className="flex items-center">{Icon}</span>
        )}
      </button>
    );
  }
);

FormButtonSSR.displayName = "FormButtonSSR";

export default FormButtonSSR;
