import { PropsWithChildren } from "react";

function DialogIcon({ children }: PropsWithChildren) {
  return (
    <div className="rounded-3xl p-4 bg-blue-400 text-white w-fit">
      {children}
    </div>
  );
}

export default DialogIcon;
