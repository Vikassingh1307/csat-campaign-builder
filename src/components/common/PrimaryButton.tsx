import type { FC, ButtonHTMLAttributes } from "react";
import { cn } from "../../utils/helpers";

interface PrimaryButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {}

export const PrimaryButton: FC<PrimaryButtonProps> = ({ className, children, ...props }) => {
  return (
    <button
      className={cn(
        "flex justify-center items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed",
        className
      )}
      {...props}
    >
      {children}
    </button>
  );
};
