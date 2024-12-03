"use client";

import Image from "next/image";
import { useId } from "react";
import { useForm } from "react-hook-form";
import clsxm from "@/utils/clsxm";
import InputSSR from "@/components/form-controls/input/input.ssr";
import FormButtonSSR from "@/components/button/form-button.ssr";
import { yupResolver } from "@hookform/resolvers/yup";
import { BasicItem } from "../../types";
import { useCreateItemValidationForm } from "./hooks/create-item-form.validation";
import { UniqueIdentifier } from "@dnd-kit/core";

type TreeItemFormType = {
  initData?: BasicItem;
  onSave: (data: BasicItem & { newItemId: UniqueIdentifier }) => void;
  onCancel: () => void;
};

const getButtonClasses = (
  type: "cancel" | "submit",
  isSubmitting?: boolean
) => {
  return clsxm(
    "h-10 flex items-center shadow-subtle rounded-md px-3.5 font-semibold text-sm focus:ring-2 focus:outline-none",
    type === "cancel" &&
      "border border-cancel bg-primary text-secondary hover:text-primary focus:ring-add",
    type === "submit" &&
      "border border-add bg-primary text-add hover:text-[#5e3ab2] focus:ring-add",
    isSubmitting && type === "submit" && "opacity-50 cursor-not-allowed"
  );
};

export const TreeItemForm = ({
  initData,
  onSave,
  onCancel,
}: TreeItemFormType) => {
  const validations = useCreateItemValidationForm();
  const newItemId = useId();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    mode: "onTouched",
    resolver: yupResolver(validations),
    defaultValues: {
      name: initData?.name || "",
      url: initData?.url || null,
    },
  });

  const onSubmit = handleSubmit(({ name, url }) => {
    const data = {
      newItemId,
      name,
      url,
    };
    onSave(data);
  });

  return (
    <form className="flex w-full flex-col" onSubmit={onSubmit}>
      {/* Input for Name */}
      <InputSSR
        label="Nazwa"
        placeholder="np. Promocje"
        className="mt-2"
        data-cy="create-item-form-input-name"
        error={errors.name?.message as string}
        {...register("name")}
      />

      {/* Input for URL */}
      <InputSSR
        label="Link"
        icon={
          <Image
            aria-hidden
            src="/icons/ic_search.svg"
            alt="move element"
            width={16}
            height={16}
          />
        }
        iconPosition="left"
        placeholder="Wklej lub wyszukaj"
        className="mt-2"
        data-cy="create-item-form-input-url"
        error={errors.url?.message as string}
        {...register("url")}
      />

      {/* Action Buttons */}
      <div className="flex gap-x-2.5 mt-5">
        <FormButtonSSR
          data-cy="create-item-form-btn-reset"
          type="reset"
          className={getButtonClasses("cancel")}
          onClick={onCancel}
        >
          Anuluj
        </FormButtonSSR>
        <FormButtonSSR
          data-cy="create-item-form-btn-submit"
          type="submit"
          className={getButtonClasses("submit", isSubmitting)}
          isLoading={isSubmitting}
          disabled={isSubmitting}
        >
          Dodaj
        </FormButtonSSR>
      </div>
    </form>
  );
};
