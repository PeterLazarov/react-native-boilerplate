import type { ReactNode } from 'react';
import { FormProvider, type FieldValues, type UseFormReturn } from 'react-hook-form';

type FormProps<T extends FieldValues> = {
  form: UseFormReturn<T>;
  children: ReactNode;
};

function Form<T extends FieldValues>({ form, children }: FormProps<T>) {
  return <FormProvider {...form}>{children}</FormProvider>;
}

export { Form };
