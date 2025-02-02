import { twMerge } from "tailwind-merge";
import { ButtonProps } from "./types";
import { ButtonStyles } from "./styles";
import SpinIcon from "@components/Icons/SpinIcon";

function Button({
  prefix,
  children,
  variant,
  isLoading,
  ...props
}: ButtonProps) {
  const hasPrefix = Boolean(prefix);
  const { container, content, loadingContainer, spinLoading } = ButtonStyles({
    variant,
    isLoading,
  });

  return (
    <button {...props} className={twMerge(container(), props.className)}>
      <div className={content()}>
        {hasPrefix ? prefix : null}
        {children}
      </div>
      {isLoading ? (
        <div className={loadingContainer()}>
          <SpinIcon className={spinLoading()} />
          <span className="sr-only">Loading...</span>
        </div>
      ) : null}
    </button>
  );
}

export default Button;
