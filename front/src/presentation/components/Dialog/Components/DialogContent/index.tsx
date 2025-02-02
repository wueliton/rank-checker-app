import { DialogContentProps } from "./types";

function DialogContent({ children, title }: DialogContentProps) {
  return (
    <div className="flex flex-col gap-2 items-center max-w-full w-full">
      <h3 className="text-xl font-bold">{title}</h3>
      <div className="w-full">{children}</div>
    </div>
  );
}

export default DialogContent;
