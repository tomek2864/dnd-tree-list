import type { UniqueIdentifier } from '@dnd-kit/core';
import { arrayMove } from '@dnd-kit/sortable';

import type { BasicItem, FlattenedItem, TreeItem, TreeItems } from './types';

export const iOS = /iPad|iPhone|iPod/.test(navigator.platform);

function getDragDepth(offset: number, indentationWidth: number) {
  return Math.round(offset / indentationWidth);
}

export function getProjection(
  items: FlattenedItem[],
  activeId: UniqueIdentifier,
  overId: UniqueIdentifier,
  dragOffset: number,
) {
  const overItemIndex = items.findIndex(({ id }) => id === overId);
  const activeItemIndex = items.findIndex(({ id }) => id === activeId);
  const activeItem = items[activeItemIndex];
  const newItems = arrayMove(items, activeItemIndex, overItemIndex);
  const previousItem = newItems[overItemIndex - 1];
  const nextItem = newItems[overItemIndex + 1];
  const dragDepth = getDragDepth(dragOffset, 50);
  const projectedDepth = activeItem.depth + dragDepth;
  const maxDepth = getMaxDepth({
    previousItem,
  });
  const minDepth = getMinDepth({ nextItem });
  let depth = projectedDepth;

  if (projectedDepth >= maxDepth) {
    depth = maxDepth;
  } else if (projectedDepth < minDepth) {
    depth = minDepth;
  }

  return { depth, maxDepth, minDepth, parentId: getParentId() };

  function getParentId() {
    if (depth === 0 || !previousItem) {
      return null;
    }

    if (depth === previousItem.depth) {
      return previousItem.parentId;
    }

    if (depth > previousItem.depth) {
      return previousItem.id;
    }

    const newParent = newItems
      .slice(0, overItemIndex)
      .reverse()
      .find((item) => item.depth === depth)?.parentId;

    return newParent ?? null;
  }
}

function getMaxDepth({ previousItem }: { previousItem: FlattenedItem }) {
  if (previousItem) {
    return previousItem.depth + 1;
  }

  return 0;
}

function getMinDepth({ nextItem }: { nextItem: FlattenedItem }) {
  if (nextItem) {
    return nextItem.depth;
  }

  return 0;
}

function flatten(
  items: TreeItems,
  parentId: UniqueIdentifier | null = null,
  depth = 0
): FlattenedItem[] {
  return items.reduce<FlattenedItem[]>((acc, item, index) => {
    return [
      ...acc,
      { ...item, parentId, depth, index },
      ...flatten(item.children, item.id, depth + 1),
    ];
  }, []);
}

export function flattenTree(items: TreeItems): FlattenedItem[] {
  return flatten(items);
}

export function buildTree(flattenedItems: FlattenedItem[]): TreeItems {
  const root: TreeItem = {
    id: 'root',
    name: '',
    url: null,
    children: [],
    isAddChildFormVisible: false,
    isEditFormVisible: false,
  };

  const nodes: Record<string, TreeItem> = { [root.id]: root };
  const items = flattenedItems.map((item) => ({
    ...item,
    children: [],
    isAddChildFormVisible: false,
    isEditFormVisible: false,
  }));

  for (const item of items) {
    const { id, children, name, url } = item;
    const parentId = item.parentId ?? root.id;
    const parent = nodes[parentId] ?? findItem(items, parentId);

    nodes[id] = { id, children, name, url, isAddChildFormVisible: false, isEditFormVisible: false };
    parent.children.push(item);
  }

  return root.children;
}

export function findItem(items: TreeItem[], itemId: UniqueIdentifier) {
  return items.find(({ id }) => id === itemId);
}

export function findItemDeep(
  items: TreeItems,
  itemId: UniqueIdentifier
): TreeItem | undefined {
  for (const item of items) {
    const { id, children } = item;

    if (id === itemId) {
      return item;
    }

    if (children.length) {
      const child = findItemDeep(children, itemId);

      if (child) {
        return child;
      }
    }
  }

  return undefined;
}

export function removeItem(items: TreeItems, id: UniqueIdentifier) {
  const newItems = [];

  for (const item of items) {
    if (item.id === id) {
      continue;
    }

    if (item.children.length) {
      item.children = removeItem(item.children, id);
    }

    newItems.push(item);
  }

  return newItems;
}

export function setProperty<T extends keyof TreeItem>(
  items: TreeItems,
  id: UniqueIdentifier,
  property: T,
  setter: (value: TreeItem[T]) => TreeItem[T]
) {
  for (const item of items) {
    if (item.id === id) {
      item[property] = setter(item[property]);
      continue;
    }

    if (item.children.length) {
      item.children = setProperty(item.children, id, property, setter);
    }
  }

  return [...items];
}

export function removeChildrenOf(
  items: FlattenedItem[],
  ids: UniqueIdentifier[]
) {
  const excludeParentIds = [...ids];

  return items.filter((item) => {
    if (item.parentId && excludeParentIds.includes(item.parentId)) {
      if (item.children.length) {
        excludeParentIds.push(item.id);
      }
      return false;
    }

    return true;
  });
}

export function addRootTreeItem(
  tree: TreeItems,
  newItemData: BasicItem & { newItemId: UniqueIdentifier }
): TreeItems {
  const newRootItem: TreeItem = {
    id: newItemData.newItemId,
    name: newItemData.name,
    url: newItemData.url || null,
    children: [],
    isAddChildFormVisible: false,
    isEditFormVisible: false,
  };

  return [...tree, newRootItem];
}


export function toggleAddChildForm(
  tree: TreeItems,
  id: UniqueIdentifier,
  isVisible: boolean
): TreeItems {
  return tree.map((item) => {
    if (item.id === id) {
      return { ...item, isAddChildFormVisible: isVisible };
    }

    if (item.children.length > 0) {
      return { ...item, children: toggleAddChildForm(item.children, id, isVisible) };
    }

    return item;
  });
}

export function toggleEditForm(
  tree: TreeItems,
  id: UniqueIdentifier,
  isVisible: boolean
): TreeItems {
  return tree.map((item) => {
    if (item.id === id) {
      return { ...item, isEditFormVisible: isVisible };
    }

    if (item.children.length > 0) {
      return { ...item, children: toggleEditForm(item.children, id, isVisible) };
    }

    return item;
  });
}

export function editTreeItem(
  tree: TreeItems,
  id: UniqueIdentifier,
  updatedData: Partial<TreeItem>
): TreeItems {
  return tree.map((item) => {
    if (item.id === id) {
      return { ...item, ...updatedData };
    }

    if (item.children.length > 0) {
      return { ...item, children: editTreeItem(item.children, id, updatedData) };
    }

    return item;
  });
}

export function addChildTreeItem(
  tree: TreeItems,
  parentId: UniqueIdentifier,
  newItemData: BasicItem & { newItemId: UniqueIdentifier }
): TreeItems {
  return tree.map((item) => {
    if (item.id === parentId) {
      const newChild: TreeItem = {
        id: newItemData.newItemId,
        name: newItemData.name,
        url: newItemData.url || null,
        children: [],
        isAddChildFormVisible: false,
        isEditFormVisible: false,
      };
      return { ...item, children: [...item.children, newChild] };
    }

    if (item.children.length > 0) {
      return { ...item, children: addChildTreeItem(item.children, parentId, newItemData) };
    }

    return item;
  });
}


