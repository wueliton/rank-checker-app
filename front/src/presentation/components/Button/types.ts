import { VariantProps } from "tailwind-variants";
import { ButtonStyles } from "./styles";

type ButtonVariants = VariantProps<typeof ButtonStyles>;

interface ButtonProps
  extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, "prefix">,
    ButtonVariants {
  prefix?: React.ReactNode;
  isLoading?: boolean;
}

export type { ButtonProps };
