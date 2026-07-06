import type { FC, InputHTMLAttributes } from "react";
import { cn } from "../../utils/helpers";

interface TextInputProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  maxLength?: number;
  error?: string;
}

export const TextInput: FC<TextInputProps> = ({
  label,
  maxLength,
  className,
  value,
  error,
  id,
  ...props
}) => {
  const valueLength = String(value || "").length;
  const inputId = id || label.toLowerCase().replace(/\s+/g, "-");

  return (
    <div className={cn("flex flex-col space-y-1.5", className)}>
      <div className="flex justify-between items-center">
        {label && (
          <label htmlFor={inputId} className="text-sm font-medium text-gray-700">
            {label}
          </label>
        )}
        {maxLength && (
          <span
            className={cn(
              "text-xs transition-colors",
              valueLength > maxLength * 0.9 ? "text-amber-500 font-medium" : "text-gray-400"
            )}
          >
            {valueLength}/{maxLength}
          </span>
        )}
      </div>
      <input
        id={inputId}
        className={cn(
          "px-3 py-2.5 border rounded-lg shadow-sm text-sm transition-all",
          "focus:outline-none focus:ring-2 focus:ring-indigo-500/40 focus:border-indigo-500",
          "placeholder:text-gray-400",
          error
            ? "border-red-400 bg-red-50/50 shake"
            : "border-gray-200 bg-white hover:border-gray-300"
        )}
        maxLength={maxLength}
        value={value}
        aria-invalid={!!error}
        aria-describedby={error ? `${inputId}-error` : undefined}
        {...props}
      />
      {error && (
        <p id={`${inputId}-error`} className="text-xs text-red-500 mt-0.5 fade-in" role="alert">
          {error}
        </p>
      )}
    </div>
  );
};
