import { tv } from "tailwind-variants";

const ButtonStyles = tv({
  slots: {
    container:
      "font-bold py-2 px-4 rounded flex justify-center w-max cursor-pointer disabled:cursor-default disabled:opacity-50 relative",
    content: "flex gap-1",
    loadingContainer:
      "absolute left-0 top-0 w-full h-full flex items-center justify-center",
    spinLoading: "size-6 animate-spin",
  },
  variants: {
    variant: {
      default: {
        container:
          "bg-blue-500 hover:bg-blue-700 text-white disabled:hover:bg-blue-500",
        spinLoading: "fill-white text-white/20",
      },
      ghost: {
        container: "text-blue-500 hover:text-blue-700",
        spinLoading: "fill-blue-500 text-blue-50",
      },
    },
    isLoading: {
      true: {
        content: "opacity-0",
      },
    },
  },
  defaultVariants: {
    variant: "default",
  },
});

export { ButtonStyles };
