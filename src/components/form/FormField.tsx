import type { ReactElement } from 'react';
import {
  Controller,
  useFormContext,
  type ControllerRenderProps,
  type FieldError,
  type FieldPath,
  type FieldValues,
} from 'react-hook-form';
import { View } from 'react-native';
import { Label } from '@/components/ui/label';
import { Text } from '@/components/ui/text';

type FormFieldProps<T extends FieldValues> = {
  name: FieldPath<T>;
  label?: string;
  render: (field: ControllerRenderProps<T, FieldPath<T>>) => ReactElement;
};

function FormField<T extends FieldValues>({ name, label, render }: FormFieldProps<T>) {
  const {
    control,
    formState: { errors },
  } = useFormContext<T>();
  const error = errors[name] as FieldError | undefined;

  return (
    <View className="gap-1.5">
      {label ? <Label>{label}</Label> : null}
      <Controller control={control} name={name} render={({ field }) => render(field)} />
      {error?.message ? (
        <Text className="text-sm text-destructive">{error.message}</Text>
      ) : null}
    </View>
  );
}

export { FormField };
