import Image from "next/image";
import clsxm from "@/utils/clsxm";
import FormButtonSSR from "@/components/button/form-button.ssr";
import { UniqueIdentifier } from "@dnd-kit/core";

import { BasicItem } from "../../types";
import { CreateOrEditFormSSR } from "./CreateOrEditFormSSR";

type EmptyStateFormSSRProps = {
  isFormVisible: boolean;
  onShowForm(show: boolean): void;
  onSaveForm: (data: BasicItem & { newItemId: UniqueIdentifier }) => void;
};

export const EmptyStateFormSSR = ({
  isFormVisible,
  onShowForm,
  onSaveForm,
}: EmptyStateFormSSRProps) => {
  return (
    <>
      <div className="w-full px-4 py-6 flex flex-col justify-center items-center bg-secondary border border-secondary gap-y-2 rounded-md">
        <div className="flex flex-col justify-center">
          <span className="text-16-600 text-primary text-center">
            Menu jest puste
          </span>
          <span className="text-14-400 text-tertiary text-center">
            W tym menu nie ma jeszcze żadnych linków.
          </span>
        </div>
        <div>
          <FormButtonSSR
            type="button"
            className={clsxm(
              "flex items-center h-10 gap-x-1.5",
              "shadow-subtle bg-btn-primary",
              "border rounded-md px-[14px] text-btn-primary font-semibold text-sm",
              "border-btn-primary",
              "hover:text-[#f1f1f1]",
              "focus:ring-2 focus:ring-cancel focus:outline-none",
              "transition-all duration-200"
            )}
            onClick={() => onShowForm(true)}
            disabled={isFormVisible}
          >
            <Image
              aria-hidden
              src="/icons/ic_add-new.svg"
              alt="add"
              width={16}
              height={16}
            />
            Dodaj pozycję menu
          </FormButtonSSR>
        </div>
      </div>
      {isFormVisible && (
        <CreateOrEditFormSSR
          onShow={() => onShowForm(false)}
          onSave={onSaveForm}
          onCancel={() => onShowForm(false)}
        />
      )}
    </>
  );
};
