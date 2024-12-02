import clsxm from "@/utils/clsxm";
import FormButtonSSR from "@/components/button/form-button.ssr";
import { UniqueIdentifier } from "@dnd-kit/core";

import { BasicItem } from "../../types";
import { CreateOrEditFormSSR } from "./CreateOrEditFormSSR";

type RootFormSSRProps = {
  isShowFormButtonVisible: boolean;
  isFormVisible: boolean;
  onShowForm(show: boolean): void;
  onSaveForm: (data: BasicItem & { newItemId: UniqueIdentifier }) => void;
};

export const RootFormSSR = ({
  isShowFormButtonVisible,
  isFormVisible,
  onShowForm,
  onSaveForm,
}: RootFormSSRProps) => {
  return (
    <>
      {isFormVisible && isShowFormButtonVisible && (
        <CreateOrEditFormSSR
          className="mx-6 my-4"
          onShow={() => onShowForm(false)}
          onSave={onSaveForm}
          onCancel={() => onShowForm(false)}
        />
      )}
      {isShowFormButtonVisible && (
        <div
          className={clsxm(
            "border-secondary px-6 py-4 bg-[#f5f5f5] w-full",
            isFormVisible && "border-t"
          )}
        >
          <FormButtonSSR
            type="button"
            className={clsxm(
              "flex items-center h-10",
              "shadow-subtle",
              "border rounded-md px-4 text-secondary font-semibold text-sm",
              "border-cancel bg-primary",
              "hover:text-primary",
              "focus:ring-2 focus:ring-cancel focus:outline-none"
            )}
            onClick={() => onShowForm(true)}
            disabled={isFormVisible}
          >
            Dodaj pozycję menu
          </FormButtonSSR>
        </div>
      )}
    </>
  );
};
