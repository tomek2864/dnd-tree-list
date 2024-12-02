import type { MutableRefObject } from 'react';
import type { UniqueIdentifier } from '@dnd-kit/core';

export interface BasicItem {
  name: string;
  url?: string | null;
}

export interface TreeItem extends BasicItem {
  id: UniqueIdentifier;
  children: TreeItem[];
  isAddChildFormVisible: boolean
  isEditFormVisible: boolean
}

export type TreeItems = TreeItem[];

export interface FlattenedItem extends TreeItem {
  parentId: UniqueIdentifier | null;
  depth: number;
  nextDepth?: number | null;
  index: number;
}

export type SensorContext = MutableRefObject<{
  items: FlattenedItem[];
  offset: number;
}>;
