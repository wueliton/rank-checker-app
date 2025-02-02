import { Controller, FieldValues } from "react-hook-form";
import { TextAreaProps } from "./types";
import { useId } from "react";
import { twMerge } from "tailwind-merge";
import Error from "../Error";

function TextArea<TFieldValues extends FieldValues = FieldValues>({
  control,
  name,
  label,
  className,
  hint,
}: TextAreaProps<TFieldValues>) {
  const id = useId();

  return (
    <Controller
      control={control}
      name={name}
      render={({ field: fieldProps, fieldState: { error } }) => {
        const hasErrors = Boolean(error?.message);
        const errorClass = hasErrors ? "border-red-500" : "";
        const showHint = !hasErrors && Boolean(hint);

        return (
          <div>
            <div className="relative group">
              <textarea
                {...fieldProps}
                value={fieldProps.value ?? ""}
                name={name}
                className={twMerge(
                  "border-black/20 border w-full rounded-sm p-3 focus:ring-0 focus:border-blue-600 peer transition-colors",
                  errorClass,
                  className
                )}
                id={id}
                placeholder=" "
              ></textarea>
              <label
                className="absolute peer-placeholder-shown:scale-100 peer-placeholder-shown:left-3 peer-placeholder-shown:px-0 left-2 peer-focus:left-2 peer-placeholder-shown:top-3 text-black/50 peer-focus:-top-[6px] peer-focus:text-blue-500 -top-[6px] bg-white peer-focus:px-2 px-2 peer-focus:scale-60 scale-60 origin-top-left transition-all"
                htmlFor={id}
              >
                {label}
              </label>
            </div>
            {showHint ? (
              <div className="flex justify-end text-xs text-black/60">
                {hint}
              </div>
            ) : null}
            {hasErrors ? <Error>{error?.message?.toString()}</Error> : null}
          </div>
        );
      }}
    />
  );
}

export default TextArea;
