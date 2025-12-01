import React from "react";
import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/shared/components/atoms/form";
import type {
  Control,
  ControllerRenderProps,
  FieldValues,
  Path,
} from "react-hook-form";
import { cn } from "@/lib/utils";

export type InputFieldProps<
  TFieldValues extends FieldValues,
  TName extends Path<TFieldValues>
> = {
  control: Control<TFieldValues>;
  name: TName;
  label?: { component: React.ReactNode; className?: string };
  message?: { className?: string };
  formItem?: { className?: string };
  className?: string;
  children: (args: {
    field: ControllerRenderProps<TFieldValues, TName>;
  }) => React.ReactNode;
};

type InputFieldComponent = <
  TFieldValues extends FieldValues,
  TName extends Path<TFieldValues>
>(
  props: InputFieldProps<TFieldValues, TName>
) => React.JSX.Element;

const InputField: InputFieldComponent = ({
  control,
  name,
  label,
  message,
  formItem,
  className,
  children,
}) => {
  const labelNode = label?.component;
  const labelClass = cn("text-foreground", label?.className);
  const messageClass = cn("text-destructive text-sm mt-1", message?.className);
  const formItemClass = cn(formItem?.className, className);

  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem className={formItemClass}>
          {labelNode ? (
            <FormLabel className={labelClass}>{labelNode}</FormLabel>
          ) : null}
          <FormControl>{children({ field })}</FormControl>
          <FormMessage className={messageClass} />
        </FormItem>
      )}
    />
  );
};

export default InputField;
