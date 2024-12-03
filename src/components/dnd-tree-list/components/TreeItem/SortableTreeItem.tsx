"use client";
import React, { CSSProperties } from "react";
import { useSearchParams } from "next/navigation";

import type { UniqueIdentifier } from "@dnd-kit/core";
import { AnimateLayoutChanges, useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

import { Props as TreeItemProps, TreeItemSSR } from "./TreeItemSSR";

interface Props extends TreeItemProps {
  id: UniqueIdentifier;
}

const animateLayoutChanges: AnimateLayoutChanges = ({
  isSorting,
  wasDragging,
}) => (isSorting || wasDragging ? false : true);

export function SortableTreeItem({ id, depth, nextDepth, ...props }: Props) {
  const searchParams = useSearchParams();

  const ios = searchParams.get("ios") === "true" ? true : false;

  const {
    attributes,
    isDragging,
    isSorting,
    listeners,
    transform,
    transition,
    setDraggableNodeRef,
    setDroppableNodeRef,
  } = useSortable({
    id,
    animateLayoutChanges,
  });

  const style: CSSProperties = {
    transform: CSS.Translate.toString(transform),
    transition,
  };

  return (
    <TreeItemSSR
      ref={setDraggableNodeRef}
      wrapperRef={setDroppableNodeRef}
      style={style}
      depth={depth}
      nextDepth={nextDepth}
      ghost={isDragging}
      disableSelection={ios}
      disableInteraction={isSorting}
      handleProps={{
        ...attributes,
        ...listeners,
      }}
      {...props}
    />
  );
}
