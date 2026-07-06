import type { FC } from "react";
import { cn } from "../../utils/helpers";

interface ColorPickerProps {
  label: string;
  value: string;
  onChange: (value: string) => void;
  className?: string;
}

export const ColorPicker: FC<ColorPickerProps> = ({
  label,
  value,
  onChange,
  className,
}) => {
  const pickerId = `color-${label.toLowerCase().replace(/\s+/g, "-")}`;

  return (
    <div className={cn("flex items-center justify-between group", className)}>
      <label htmlFor={pickerId} className="text-sm font-medium text-gray-700">
        {label}
      </label>
      <div className="flex items-center space-x-2.5">
        <span className="text-xs text-gray-400 uppercase font-mono tracking-wide group-hover:text-gray-600 transition-colors">
          {value}
        </span>
        <div className="relative w-9 h-9 rounded-lg overflow-hidden border-2 border-gray-200 shadow-sm cursor-pointer hover:border-indigo-400 hover:shadow-md transition-all">
          <input
            id={pickerId}
            type="color"
            value={value}
            onChange={(e) => onChange(e.target.value)}
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-14 h-14 cursor-pointer border-none p-0"
            aria-label={`Choose ${label}`}
          />
        </div>
      </div>
    </div>
  );
};
