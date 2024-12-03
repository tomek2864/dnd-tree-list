"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import {
    DragStartEvent,
    DragMoveEvent,
    DragEndEvent,
    DragOverEvent,
    UniqueIdentifier,
} from "@dnd-kit/core";
import {
    arrayMove,
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
} from "../utilities";
import type {
    BasicItem,
    FlattenedItem,
    SensorContext,
    TreeItem,
    TreeItems,
} from "../types";

export const useSortableTree = (defaultItems: TreeItems) => {
    const [items, setItems] = useState(defaultItems);
    const [activeId, setActiveId] = useState<UniqueIdentifier | null>(null);
    const [overId, setOverId] = useState<UniqueIdentifier | null>(null);
    const [offsetLeft, setOffsetLeft] = useState(0);

    const flattenedItems = useMemo(() => {
        const flattenedTree = flattenTree(items);
        const result = flattenedTree.map((item, index) => {
            const nextDepth = flattenedTree[index + 1]?.depth ?? null;
            return { ...item, nextDepth };
        });
        return removeChildrenOf(result, activeId != null ? [activeId] : []);
    }, [activeId, items]);

    const projected = useMemo(
        () =>
            activeId && overId
                ? getProjection(flattenedItems, activeId, overId, offsetLeft)
                : null,
        [activeId, overId, offsetLeft, flattenedItems]
    );

    const sensorContext: SensorContext = useRef({
        items: flattenedItems,
        offset: offsetLeft,
    });

    useEffect(() => {
        sensorContext.current = {
            items: flattenedItems,
            offset: offsetLeft,
        };
    }, [flattenedItems, offsetLeft]);

    const handleDragStart = ({ active: { id } }: DragStartEvent) => {
        setActiveId(id);
        setOverId(id);
        document.body.style.setProperty("cursor", "grabbing");
    };

    const handleDragMove = ({ delta }: DragMoveEvent) => {
        setOffsetLeft(delta.x);
    };

    const handleDragOver = ({ over }: DragOverEvent) => {
        setOverId(over?.id ?? null);
    };

    const handleDragEnd = ({ active, over }: DragEndEvent) => {
        resetState();
        if (projected && over) {
            const { depth, parentId } = projected;
            const clonedItems: FlattenedItem[] = JSON.parse(
                JSON.stringify(flattenTree(items))
            );
            const overIndex = clonedItems.findIndex(({ id }) => id === over.id);
            const activeIndex = clonedItems.findIndex(({ id }) => id === active.id);

            clonedItems[activeIndex] = {
                ...clonedItems[activeIndex],
                depth,
                parentId,
            };
            const sortedItems = arrayMove(clonedItems, activeIndex, overIndex);
            setItems(buildTree(sortedItems));
        }
    };

    const resetState = () => {
        setActiveId(null);
        setOverId(null);
        setOffsetLeft(0);
        document.body.style.setProperty("cursor", "");
    };

    const handleRemove = (id: UniqueIdentifier) =>
        setItems((items) => removeItem(items, id));

    const handleToggleAddChildForm = (id: UniqueIdentifier, isVisible: boolean) =>
        setItems((items) => toggleAddChildForm(items, id, isVisible));

    const handleToggleEditForm = (id: UniqueIdentifier, isVisible: boolean) =>
        setItems((items) => toggleEditForm(items, id, isVisible));

    const handleEditTreeItem = (
        id: UniqueIdentifier,
        updatedData: Partial<TreeItem>
    ) => setItems((items) => editTreeItem(items, id, updatedData));

    const handleAddChildTreeItem = (
        parentId: UniqueIdentifier,
        newItemData: BasicItem & { newItemId: UniqueIdentifier }
    ) => setItems((items) => addChildTreeItem(items, parentId, newItemData));

    const handleAddRootTreeItem = (
        newItemData: BasicItem & { newItemId: UniqueIdentifier }
    ) => setItems((items) => addRootTreeItem(items, newItemData));

    return {
        items,
        flattenedItems,
        projected,
        activeId,
        sensorContext,
        offsetLeft,
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
    };
};