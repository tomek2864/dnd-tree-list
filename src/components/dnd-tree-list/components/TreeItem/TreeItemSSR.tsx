import React, { forwardRef, HTMLAttributes } from "react";

import clsxm from "@/utils/clsxm";

import { HandleSSR } from "../Item/components/Handle";
import { RemoveSSR } from "../Item/components/Remove/RemoveSSR";

export interface Props extends Omit<HTMLAttributes<HTMLLIElement>, "id"> {
  depth: number;
  nextDepth: number | null;
  disableInteraction?: boolean;
  disableSelection?: boolean;
  ghost?: boolean;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  handleProps?: any;
  indicator?: boolean;
  indentationWidth: number;
  value: string;
  onRemove?(): void;
  wrapperRef?(node: HTMLLIElement): void;
}

export const TreeItemSSR = forwardRef<HTMLDivElement, Props>(
  (
    {
      depth,
      nextDepth,
      disableSelection,
      disableInteraction,
      ghost,
      handleProps,
      indentationWidth,
      style,
      value,
      wrapperRef,
      onRemove,
      ...props
    },
    ref
  ) => {
    return (
      <li
        className={clsxm(
          "list-none box-border bg-secondary !first:rounded-md",
          ghost && "opacity-100 relative z-10 -mb-px",
          disableSelection && "select-none",
          disableInteraction && "pointer-events-none"
        )}
        ref={wrapperRef}
        style={
          {
            "--spacing": `${indentationWidth * depth}px`,
          } as React.CSSProperties
        }
        {...props}
      >
        <div
          ref={ref}
          style={style}
          className={clsxm(
            "bg-transparent",
            "box-border border-b border-secondary"
          )}
        >
          <div
            className={clsxm(
              "relative flex items-center ml-[var(--spacing)] pr-4 bg-primary border-secondary h-full py-6 px-4",
              depth > 0 && "border-l",
              depth > 0 && depth !== nextDepth && "rounded-bl-md",
              ghost && "ml-0"
            )}
          >
            <HandleSSR {...handleProps} />
            <span
              className={clsxm(
                "flex-grow pl-2 whitespace-nowrap overflow-hidden text-ellipsis"
              )}
            >
              {value}
            </span>
            {onRemove && <RemoveSSR onClick={onRemove} />}
          </div>
        </div>
      </li>
    );
  }
);

TreeItemSSR.displayName = "TreeItemSSR";
