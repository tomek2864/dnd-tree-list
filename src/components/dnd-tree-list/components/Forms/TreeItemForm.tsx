"use client";

import Image from "next/image";
import { useId } from "react";
import { useForm } from "react-hook-form";
import InputSSR from "@/components/form-controls/input/input.ssr";
import FormButtonSSR from "@/components/button/form-button.ssr";
import clsxm from "@/utils/clsxm";
import { UniqueIdentifier } from "@dnd-kit/core";
import { yupResolver } from "@hookform/resolvers/yup";

import { BasicItem } from "../../types";
import { useCreateItemValidationForm } from "./hooks/create-item-form.validation";

type TreeItemFormType = {
  initData?: BasicItem;
  onSave: (data: BasicItem & { newItemId: UniqueIdentifier }) => void;
  onCancel: () => void;
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
      name: initData ? initData.name : "",
      url: initData ? initData.url : null,
    },
  });

  const onSubmit = handleSubmit(({ name, url }) => {
    try {
      const data = {
        newItemId: newItemId,
        name,
        url,
      };

      onSave(data);
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (e: any) {
      throw new Error(e);
    }
  });

  return (
    <form className="flex w-full flex-col" onSubmit={onSubmit}>
      <InputSSR
        label={"Nazwa"}
        placeholder={"np. Promocje"}
        className="mt-2"
        data-cy="create-item-form-input-name"
        error={errors.name?.message as string}
        {...register("name")}
      />
      <InputSSR
        label={"Link"}
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
        placeholder={"Wklej lub wyszukaj"}
        className="mt-2"
        data-cy="create-item-form-input-url"
        error={errors.url?.message as string}
        {...register("url")}
      />
      <div className="flex gap-x-2.5 mt-5">
        <FormButtonSSR
          data-cy="create-item-form-btn-reset"
          type="reset"
          className={clsxm(
            "h-10 flex items-center",
            "shadow-subtle",
            "rounded-md px-3.5",
            "border border-cancel bg-primary text-secondary font-semibold text-sm",
            "hover:text-primary",
            "focus:ring-2 focus:ring-add focus:outline-none"
          )}
          onClick={onCancel}
        >
          Anuluj
        </FormButtonSSR>
        <FormButtonSSR
          data-cy="create-item-form-btn-submit"
          type="submit"
          className={clsxm(
            "h-10 flex items-center",
            "shadow-subtle",
            "rounded-md px-3.5",
            "border border-add bg-primary text-add font-semibold text-sm",
            "hover:text-[#5e3ab2]",
            "focus:ring-2 focus:ring-add focus:outline-none",
            {
              "opacity-50 cursor-not-allowed": isSubmitting,
            }
          )}
          isLoading={isSubmitting}
          disabled={isSubmitting}
        >
          Dodaj
        </FormButtonSSR>
      </div>
    </form>
  );
};
