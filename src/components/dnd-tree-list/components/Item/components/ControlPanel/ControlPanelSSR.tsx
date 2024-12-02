import FormButtonSSR from "@/components/button/form-button.ssr";
import clsxm from "@/utils/clsxm";

export interface Props {
  onRemove(): void;
  onStartEdit(): void;
  onStartAdd(): void;
}

export const ControlPanelSSR = ({
  onRemove,
  onStartEdit,
  onStartAdd,
}: Props) => {
  return (
    <div className="flex h-10">
      <FormButtonSSR
        type="button"
        className={clsxm(
          "flex items-center",
          "border rounded-tl-md rounded-bl-md px-4 text-secondary font-semibold text-sm",
          "border-cancel bg-primary",
          "hover:text-primary",
          "focus:ring-2 focus:ring-cancel focus:outline-none"
        )}
        onClick={onRemove}
      >
        Usuń
      </FormButtonSSR>
      <FormButtonSSR
        type="button"
        className={clsxm(
          "flex items-center",
          "border-t border-b px-4 text-secondary font-semibold text-sm",
          "border-cancel bg-primaryl",
          "hover:text-primary",
          "focus:ring-2 focus:ring-cancel focus:outline-none"
        )}
        onClick={onStartEdit}
      >
        Edytuj
      </FormButtonSSR>
      <FormButtonSSR
        type="button"
        className={clsxm(
          "flex items-center",
          "border rounded-tr-md rounded-br-md px-4 text-secondary font-semibold text-sm",
          "border-cancel bg-primary",
          "hover:text-primary",
          "focus:ring-2 focus:ring-cancel focus:outline-none"
        )}
        onClick={onStartAdd}
      >
        Dodaj pozycję menu
      </FormButtonSSR>
    </div>
  );
};
