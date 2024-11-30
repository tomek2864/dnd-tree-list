import React, { forwardRef, CSSProperties } from "react";
import clsxm from "@/utils/clsxm";

export interface Props extends React.HTMLAttributes<HTMLButtonElement> {
  cursor?: CSSProperties["cursor"];
}

export const ActionSSR = forwardRef<HTMLButtonElement, Props>(
  ({ className, cursor, style, ...props }, ref) => {
    return (
      <button
        ref={ref}
        {...props}
        className={clsxm(
          "flex p-2.5 items-center justify-center bg-transparent touch-none",
          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-0 focus-visible:ring-[rgba(76,159,254,1)]",
          "hover:bg-[var(--action-background,rgba(0,0,0,0.05))] hover:svg:fill-[#6f7b88]",
          "active:bg-[var(--background,rgba(0,0,0,0.05))] active:svg:fill-[var(--fill,#788491)]",
          className
        )}
        tabIndex={0}
        style={
          {
            ...style,
            cursor,
          } as React.CSSProperties
        }
      >
        {props.children}
      </button>
    );
  }
);

ActionSSR.displayName = "ActionSSR";
