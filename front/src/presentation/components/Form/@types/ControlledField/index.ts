import { Control, FieldValues, Path } from "react-hook-form";

interface ControlledField<TFieldValues extends FieldValues = FieldValues> {
  control: Control<TFieldValues>;
  name: Path<TFieldValues>;
}

export type { ControlledField };
