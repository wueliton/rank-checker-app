import { ControlledField } from "../@types/ControlledField";
import { FieldValues } from "react-hook-form";

interface TextAreaProps<TFieldValues extends FieldValues = FieldValues>
  extends ControlledField<TFieldValues> {
  label: string;
  className?: string;
  hint?: React.ReactNode;
}

export type { TextAreaProps };
