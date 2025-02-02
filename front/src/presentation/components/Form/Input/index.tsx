import { Controller, FieldValues } from "react-hook-form";
import { InputProps } from "./types";
import { useId } from "react";
import { twMerge } from "tailwind-merge";
import Error from "../Error";

function Input<TFieldValues extends FieldValues = FieldValues>({
  control,
  name,
  label,
  className,
}: InputProps<TFieldValues>) {
  const id = useId();

  return (
    <Controller
      control={control}
      name={name}
      render={({ field: fieldProps, fieldState: { error } }) => {
        const hasErrors = error?.message;
        const errorClass = hasErrors ? "border-red-500" : "";

        return (
          <div className="flex flex-col w-full">
            <div className="relative group">
              <input
                {...fieldProps}
                value={fieldProps.value ?? ""}
                id={id}
                className={twMerge(
                  "border-black/20 border w-full rounded-sm p-3 focus:ring-0 focus:border-blue-600 peer transition-colors",
                  errorClass,
                  className
                )}
                placeholder=" "
              />
              <label
                className="absolute peer-placeholder-shown:scale-100 peer-placeholder-shown:left-3 peer-placeholder-shown:px-0 left-2 peer-focus:left-2 peer-placeholder-shown:top-3 text-black/50 peer-focus:-top-[6px] peer-focus:text-blue-500 -top-[6px] bg-white peer-focus:px-2 px-2 peer-focus:scale-60 scale-60 origin-top-left transition-all"
                htmlFor={id}
              >
                {label}
              </label>
            </div>
            {hasErrors ? <Error>{error?.message?.toString()}</Error> : null}
          </div>
        );
      }}
    />
  );
}

export default Input;
