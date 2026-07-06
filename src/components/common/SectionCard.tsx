import type { FC, ReactNode } from "react";
import { cn } from "../../utils/helpers";

interface SectionCardProps {
  title: string;
  children: ReactNode;
  className?: string;
  icon?: ReactNode;
}

export const SectionCard: FC<SectionCardProps> = ({ title, children, className, icon }) => {
  return (
    <div className={cn("bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden transition-shadow hover:shadow-md", className)}>
      <div className="px-5 py-4 border-b border-gray-100 bg-gradient-to-r from-gray-50/80 to-white">
        <div className="flex items-center space-x-2">
          {icon && <span className="text-indigo-500">{icon}</span>}
          <h3 className="text-base font-semibold text-gray-800">{title}</h3>
        </div>
      </div>
      <div className="p-5 space-y-4">
        {children}
      </div>
    </div>
  );
};
