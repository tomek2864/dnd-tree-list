import React, { forwardRef, HTMLAttributes } from "react";

import clsxm from "@/utils/clsxm";
import { UniqueIdentifier } from "@dnd-kit/core";

import { BasicItem } from "../../types";
import { TreeItemForm } from "../Forms";
import { ControlPanelSSR, HandleSSR } from "../Item";

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
  name: string;
  url: string | null;
  isAddChildFormVisible: boolean;
  isEditFormVisible: boolean;
  onRemove(): void; // Triggered when the "Remove" action is triggered
  onStartEdit(): void; // Opens the form in edit mode
  onSaveEdit(data: BasicItem): void; // Saves changes after editing
  onCancelEdit(): void; // Cancels the edit operation and closes the form
  onStartAdd(): void; // Opens the form to add a new item
  onSaveAdd(data: BasicItem & { newItemId: UniqueIdentifier }): void; // Saves the new item after filling out the form
  onCancelAdd(): void; // Cancels adding a new item and closes the form
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
      name,
      url,
      isAddChildFormVisible,
      isEditFormVisible,
      wrapperRef,
      onStartEdit,
      onSaveEdit,
      onCancelEdit,
      onStartAdd,
      onSaveAdd,
      onCancelAdd,
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
            "--spacing-child-edit": `${indentationWidth * depth + 24}px`,
            "--spacing-child-add": `${
              indentationWidth + indentationWidth * depth
            }px`,
          } as React.CSSProperties
        }
        {...props}
      >
        <div
          ref={ref}
          style={style}
          className={clsxm(
            "bg-transparent ",
            "box-border border-b border-secondary"
            /* "last-of-type:border-none" */
          )}
        >
          <div
            className={clsxm(
              "relative flex items-center ml-[var(--spacing)] pr-4 bg-primary border-secondary h-[78px] py-4 px-6",
              depth > 0 && "border-l",
              depth > 0 && depth !== nextDepth && "rounded-bl-md",
              ghost && "ml-0"
            )}
          >
            <HandleSSR {...handleProps} />
            <div
              className={clsxm(
                "flex flex-col flex-grow justify-between pl-2 text-ellipsis"
              )}
            >
              <span className="text-14-600 text-primary">{name}</span>
              {url && <span className="text-14-400 text-tertiary">{url}</span>}
            </div>
            <ControlPanelSSR
              onRemove={onRemove}
              onStartEdit={onStartEdit}
              onStartAdd={onStartAdd}
            />
          </div>
        </div>
        {isAddChildFormVisible && (
          <div
            className={clsxm(
              "flex mr-6 bg-white my-5",
              "ml-[var(--spacing-child-add)]" // spacing-child because its adding a child
            )}
          >
            <div className="border border-primary bg-primary rounded-md pl-6 py-5 pr-20 w-full">
              <TreeItemForm
                initData={{
                  name: "",
                  url: null,
                }}
                onSave={onSaveAdd}
                onCancel={onCancelAdd}
              />
            </div>
          </div>
        )}
        {isEditFormVisible && (
          <div
            className={clsxm(
              "flex mx-6 bg-white my-5",
              depth > 0 && "ml-[var(--spacing-child-edit)]"
            )}
          >
            <div className="border border-primary bg-primary rounded-md pl-6 py-5 pr-20 w-full">
              <TreeItemForm
                initData={{
                  name: name,
                  url: url,
                }}
                onSave={onSaveEdit}
                onCancel={onCancelEdit}
              />
            </div>
          </div>
        )}
      </li>
    );
  }
);

TreeItemSSR.displayName = "TreeItemSSR";
