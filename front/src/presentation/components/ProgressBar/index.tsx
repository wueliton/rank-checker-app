import { ProgressBarProps } from "./types";

function ProgressBar({ label, progress, hint }: ProgressBarProps) {
  const progressPercent = `${Math.min(Math.max(progress, 0), 100)}%`;

  return (
    <div className="flex flex-col gap-2">
      {label ? <p className="text-black/60">{label}</p> : null}
      <div className="flex flex-col gap-1">
        <div className="w-full bg-gray-200 rounded-full h-2.5 dark:bg-gray-100">
          <div
            className="bg-blue-600 h-2.5 rounded-full dark:bg-blue-500 transition-all"
            style={{ width: progressPercent }}
          ></div>
        </div>
        {hint ? (
          <div className="text-xs flex justify-end text-black/60">{hint}</div>
        ) : null}
      </div>
    </div>
  );
}

export default ProgressBar;
