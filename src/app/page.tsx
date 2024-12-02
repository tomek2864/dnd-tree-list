import { SortableTree as SortableDndTree } from "@/components/dnd-tree-list/SortableTree";

export default function Home() {
  return (
    <main className="max-w-[1208px] px-5 py-6 mx-auto">
      <SortableDndTree />
    </main>
  );
}
