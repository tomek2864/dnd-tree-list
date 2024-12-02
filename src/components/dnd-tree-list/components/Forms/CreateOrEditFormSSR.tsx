import Image from "next/image";
import clsxm from "@/utils/clsxm";
import { UniqueIdentifier } from "@dnd-kit/core";
import FormButtonSSR from "@/components/button/form-button.ssr";
import { BasicItem } from "../../types";
import { TreeItemForm } from "./TreeItemForm";

type CreateOrEditFormSSRProps = {
  className?: string;
  onShow(): void;
  onSave(data: BasicItem & { newItemId: UniqueIdentifier }): void;
  onCancel(): void;
};

export const CreateOrEditFormSSR = ({
  className = "",
  onShow,
  onSave,
  onCancel,
}: CreateOrEditFormSSRProps) => {
  return (
    <div
      className={clsxm(
        "relative border border-primary bg-primary rounded-md pl-6 py-5 pr-20 mx-6 my-4",
        className
      )}
    >
      <FormButtonSSR
        className="p-2.5 absolute top-5 right-6"
        type="button"
        onClick={onShow}
      >
        <Image
          aria-hidden
          src="/icons/ic_trash.svg"
          alt="cancel"
          width={16}
          height={16}
        />
      </FormButtonSSR>
      <TreeItemForm onSave={onSave} onCancel={onCancel} />
    </div>
  );
};
