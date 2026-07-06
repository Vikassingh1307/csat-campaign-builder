import type { FC } from "react";
import { cn } from "../../utils/helpers";

interface ToggleSwitchProps {
  label: string;
  checked: boolean;
  onChange: (checked: boolean) => void;
  className?: string;
}

export const ToggleSwitch: FC<ToggleSwitchProps> = ({
  label,
  checked,
  onChange,
  className,
}) => {
  const switchId = `toggle-${label.toLowerCase().replace(/\s+/g, "-")}`;

  return (
    <div className={cn("flex items-center justify-between", className)}>
      <label htmlFor={switchId} className="text-sm font-medium text-gray-700 cursor-pointer">
        {label}
      </label>
      <button
        id={switchId}
        type="button"
        role="switch"
        aria-checked={checked}
        aria-label={label}
        onClick={() => onChange(!checked)}
        className={cn(
          "relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2",
          checked ? "bg-indigo-600" : "bg-gray-200"
        )}
      >
        <span
          aria-hidden="true"
          className={cn(
            "pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out",
            checked ? "translate-x-5" : "translate-x-0"
          )}
        />
      </button>
    </div>
  );
};
