import { ControlledField } from "../@types/ControlledField";
import { FieldValues } from "react-hook-form";

interface InputProps<TFieldValues extends FieldValues = FieldValues>
  extends ControlledField<TFieldValues> {
  label: string;
  className?: string;
}

export type { InputProps };
