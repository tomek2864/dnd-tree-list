"use client";

import React, { useState } from "react";
import {
  DndContext,
  closestCenter,
  PointerSensor,
  useSensor,
  useSensors,
  MeasuringStrategy,
} from "@dnd-kit/core";
import {
  SortableContext,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";

import type { TreeItems } from "./types";
import { SortableTreeItem } from "./components";
import { EmptyStateFormSSR } from "./components/Forms/EmptyStateFormSSR";
import { RootFormSSR } from "./components/Forms";
import { useSortableTree } from "./hooks/useSortableTree";

const initialItems: TreeItems = [];

export function SortableTree({
  defaultItems = initialItems,
}: {
  defaultItems?: TreeItems;
}) {
  const {
    flattenedItems,
    projected,
    activeId,
    handleDragStart,
    handleDragMove,
    handleDragOver,
    handleDragEnd,
    handleRemove,
    handleToggleAddChildForm,
    handleToggleEditForm,
    handleEditTreeItem,
    handleAddChildTreeItem,
    handleAddRootTreeItem,
  } = useSortableTree(defaultItems);

  const sensors = useSensors(useSensor(PointerSensor));
  const [isVisibleInitTreeItemForm, showInitTreeItemForm] = useState(false);

  return (
    <div className="flex flex-col gap-y-8">
      {flattenedItems.length === 0 && (
        <EmptyStateFormSSR
          isFormVisible={
            flattenedItems.length === 0 && isVisibleInitTreeItemForm
          }
          onShowForm={(show) => showInitTreeItemForm(show)}
          onSaveForm={(data) => {
            handleAddRootTreeItem(data);
            showInitTreeItemForm(false);
          }}
        />
      )}
      {flattenedItems.length > 0 && (
        <div className="rounded-md overflow-hidden border border-primary shadow-subtle bg-secondary">
          <DndContext
            sensors={sensors}
            collisionDetection={closestCenter}
            measuring={{ droppable: { strategy: MeasuringStrategy.Always } }}
            onDragStart={handleDragStart}
            onDragMove={handleDragMove}
            onDragOver={handleDragOver}
            onDragEnd={handleDragEnd}
          >
            <SortableContext
              items={flattenedItems.map(({ id }) => id)}
              strategy={verticalListSortingStrategy}
            >
              {flattenedItems.map(
                ({
                  id,
                  depth,
                  nextDepth,
                  isAddChildFormVisible,
                  isEditFormVisible,
                  name,
                  url,
                }) => (
                  <SortableTreeItem
                    key={id}
                    id={id}
                    value={String(id)}
                    name={name}
                    url={url ?? null}
                    depth={
                      id === activeId && projected ? projected.depth : depth
                    }
                    nextDepth={nextDepth ?? null}
                    indentationWidth={64}
                    isAddChildFormVisible={isAddChildFormVisible}
                    isEditFormVisible={isEditFormVisible}
                    onRemove={() => handleRemove(id)}
                    onStartEdit={() => {
                      handleToggleEditForm(id, true);
                      handleToggleAddChildForm(id, false);
                    }}
                    onSaveEdit={(data) => {
                      handleEditTreeItem(id, data);
                      handleToggleEditForm(id, false);
                    }}
                    onCancelEdit={() => handleToggleEditForm(id, false)}
                    onStartAdd={() => {
                      handleToggleAddChildForm(id, true);
                      handleToggleEditForm(id, false);
                    }}
                    onSaveAdd={(data) => {
                      handleAddChildTreeItem(id, data);
                      handleToggleAddChildForm(id, false);
                    }}
                    onCancelAdd={() => handleToggleAddChildForm(id, false)}
                  />
                )
              )}
              <RootFormSSR
                isShowFormButtonVisible={flattenedItems.length > 0}
                isFormVisible={isVisibleInitTreeItemForm}
                onShowForm={(show) => showInitTreeItemForm(show)}
                onSaveForm={(data) => {
                  handleAddRootTreeItem(data);
                  showInitTreeItemForm(false);
                }}
              />
            </SortableContext>
          </DndContext>
        </div>
      )}
    </div>
  );
}
