"use client";
import React, { useEffect, useMemo, useRef, useState } from "react";
import {
  DndContext,
  closestCenter,
  PointerSensor,
  useSensor,
  useSensors,
  DragStartEvent,
  DragMoveEvent,
  DragEndEvent,
  DragOverEvent,
  MeasuringStrategy,
  UniqueIdentifier,
} from "@dnd-kit/core";
import {
  SortableContext,
  arrayMove,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";

import {
  buildTree,
  flattenTree,
  getProjection,
  removeItem,
  removeChildrenOf,
  toggleAddChildForm,
  toggleEditForm,
  editTreeItem,
  addChildTreeItem,
  addRootTreeItem,
} from "./utilities";
import type {
  BasicItem,
  FlattenedItem,
  SensorContext,
  TreeItem,
  TreeItems,
} from "./types";
import { SortableTreeItem } from "./components";
import { EmptyStateFormSSR } from "./components/Forms/EmptyStateFormSSR";
import { RootFormSSR } from "./components/Forms";

const initialItems: TreeItems = [];

const measuring = {
  droppable: {
    strategy: MeasuringStrategy.Always,
  },
};

interface Props {
  defaultItems?: TreeItems;
}

export function SortableTree({ defaultItems = initialItems }: Props) {
  const [items, setItems] = useState(() => defaultItems);
  const [activeId, setActiveId] = useState<UniqueIdentifier | null>(null);
  const [overId, setOverId] = useState<UniqueIdentifier | null>(null);
  const [offsetLeft, setOffsetLeft] = useState(0);
  const [isVisibleInitTreeItemForm, showInitTreeItemForm] = useState(false);

  const flattenedItems = useMemo(() => {
    const flattenedTree = flattenTree(items);

    const result = flattenedTree.map((item, index) => {
      const nextDepth = flattenedTree[index + 1]?.depth ?? null;

      return { ...item, nextDepth };
    });

    return removeChildrenOf(result, activeId != null ? [activeId] : []);
  }, [activeId, items]);

  const projected =
    activeId && overId
      ? getProjection(flattenedItems, activeId, overId, offsetLeft)
      : null;

  const sensorContext: SensorContext = useRef({
    items: flattenedItems,
    offset: offsetLeft,
  });

  const sensors = useSensors(useSensor(PointerSensor));

  const sortedIds = useMemo(
    () => flattenedItems.map(({ id }) => id),
    [flattenedItems]
  );

  useEffect(() => {
    sensorContext.current = {
      items: flattenedItems,
      offset: offsetLeft,
    };
  }, [flattenedItems, offsetLeft]);

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
            measuring={measuring}
            onDragStart={handleDragStart}
            onDragMove={handleDragMove}
            onDragOver={handleDragOver}
            onDragEnd={handleDragEnd}
            onDragCancel={handleDragCancel}
          >
            <SortableContext
              items={sortedIds}
              strategy={verticalListSortingStrategy}
            >
              {flattenedItems.map(
                ({
                  id,
                  name,
                  url,
                  depth,
                  nextDepth,
                  isAddChildFormVisible,
                  isEditFormVisible,
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

  function handleDragStart({ active: { id: activeId } }: DragStartEvent) {
    setActiveId(activeId);
    setOverId(activeId);

    document.body.style.setProperty("cursor", "grabbing");
  }

  function handleDragMove({ delta }: DragMoveEvent) {
    setOffsetLeft(delta.x);
  }

  function handleDragOver({ over }: DragOverEvent) {
    setOverId(over?.id ?? null);
  }

  function handleDragEnd({ active, over }: DragEndEvent) {
    resetState();

    if (projected && over) {
      const { depth, parentId } = projected;
      const clonedItems: FlattenedItem[] = JSON.parse(
        JSON.stringify(flattenTree(items))
      );
      const overIndex = clonedItems.findIndex(({ id }) => id === over.id);
      const activeIndex = clonedItems.findIndex(({ id }) => id === active.id);
      const activeTreeItem = clonedItems[activeIndex];

      clonedItems[activeIndex] = { ...activeTreeItem, depth, parentId };

      const sortedItems = arrayMove(clonedItems, activeIndex, overIndex);
      const newItems = buildTree(sortedItems);

      setItems(newItems);
    }
  }

  function handleDragCancel() {
    resetState();
  }

  function resetState() {
    setOverId(null);
    setActiveId(null);
    setOffsetLeft(0);

    document.body.style.setProperty("cursor", "");
  }

  function handleRemove(id: UniqueIdentifier) {
    setItems((items) => removeItem(items, id));
  }

  function handleToggleAddChildForm(id: UniqueIdentifier, isVisible: boolean) {
    setItems((items) => toggleAddChildForm(items, id, isVisible));
  }

  function handleToggleEditForm(id: UniqueIdentifier, isVisible: boolean) {
    setItems((items) => toggleEditForm(items, id, isVisible));
  }

  function handleEditTreeItem(
    id: UniqueIdentifier,
    updatedData: Partial<TreeItem>
  ) {
    setItems((items) => editTreeItem(items, id, updatedData));
  }

  function handleAddChildTreeItem(
    parentId: UniqueIdentifier,
    newItemData: BasicItem & { newItemId: UniqueIdentifier }
  ) {
    setItems((items) => addChildTreeItem(items, parentId, newItemData));
  }

  function handleAddRootTreeItem(
    newItemData: BasicItem & { newItemId: UniqueIdentifier }
  ) {
    setItems((items) => addRootTreeItem(items, newItemData));
  }
}
