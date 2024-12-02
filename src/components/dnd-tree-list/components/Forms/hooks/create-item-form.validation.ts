'use client';

import * as Yup from 'yup';

export const useCreateItemValidationForm = () => {

  const validationSchema = Yup.object().shape({
    name: Yup.string().required('Nazwa jest obowiązkowa').max(50, "Nazwa nie może przekraczać 50 znaków"),
    url: Yup.string().nullable(),
  });

  return validationSchema;
};
