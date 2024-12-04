import FormButtonSSR from "@/components/button/form-button.ssr";
import clsxm from "@/utils/clsxm";

export interface Props {
  onRemove(): void;
  onStartEdit(): void;
  onStartAdd(): void;
}

const getControlButtonClasses = (position: "left" | "middle" | "right") => {
  return clsxm(
    "flex items-center px-4 text-secondary font-semibold text-sm border bg-primary hover:text-primary focus:ring-2 focus:ring-cancel focus:outline-none",
    position === "left" && "rounded-tl-md rounded-bl-md border-cancel",
    position === "middle" && "border-x-0 border-y border-cancel",
    position === "right" && "rounded-tr-md rounded-br-md border-cancel"
  );
};

export const ControlPanelSSR = ({
  onRemove,
  onStartEdit,
  onStartAdd,
}: Props) => {
  return (
    <div className="hidden h-10 md:flex">
      <FormButtonSSR
        type="button"
        className={getControlButtonClasses("left")}
        onClick={onRemove}
      >
        Usuń
      </FormButtonSSR>
      <FormButtonSSR
        type="button"
        className={getControlButtonClasses("middle")}
        onClick={onStartEdit}
      >
        Edytuj
      </FormButtonSSR>
      <FormButtonSSR
        type="button"
        className={getControlButtonClasses("right")}
        onClick={onStartAdd}
      >
        Dodaj pozycję menu
      </FormButtonSSR>
    </div>
  );
};
