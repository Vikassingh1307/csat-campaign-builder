import type { FC } from "react";
import { useState } from "react";
import { ContentTab } from "../components/content/ContentTab";
import { StylingTab } from "../components/styling/StylingTab";
import { PhonePreview } from "../components/preview/PhonePreview";
import { useCsatContext } from "../context/CsatContext";
import { RefreshCcw } from "lucide-react";

export const BuilderPage: FC = () => {
  const { resetToDefault } = useCsatContext();
  const [activeTab, setActiveTab] = useState<"content" | "styling">("content");

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between sticky top-0 z-30">
        <div>
          <h1 className="text-xl font-bold text-gray-900">Simplified CSAT Builder</h1>
          <p className="text-xs text-gray-500">Configure your campaign in real-time</p>
        </div>
        <button
          onClick={resetToDefault}
          className="flex items-center space-x-1.5 px-3 py-1.5 text-sm font-medium text-gray-600 bg-gray-100 hover:bg-gray-200 rounded-md transition-colors"
        >
          <RefreshCcw size={16} />
          <span>Reset to Default</span>
        </button>
      </header>

      {/* Main Content */}
      <main className="flex-1 max-w-[1600px] w-full mx-auto p-4 md:p-6 lg:p-8">
        
        {/* Mobile/Tablet Tabs (visible only on md and below) */}
        <div className="lg:hidden flex space-x-2 mb-6 bg-white p-1 rounded-lg border border-gray-200 shadow-sm">
          <button
            onClick={() => setActiveTab("content")}
            className={`flex-1 py-2 text-sm font-medium rounded-md transition-colors ${
              activeTab === "content" ? "bg-indigo-50 text-indigo-700" : "text-gray-600 hover:bg-gray-50"
            }`}
          >
            Content
          </button>
          <button
            onClick={() => setActiveTab("styling")}
            className={`flex-1 py-2 text-sm font-medium rounded-md transition-colors ${
              activeTab === "styling" ? "bg-indigo-50 text-indigo-700" : "text-gray-600 hover:bg-gray-50"
            }`}
          >
            Styling
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 h-full items-start">
          
          {/* Left Column: Editor (Content & Styling) */}
          <div className="lg:col-span-7 xl:col-span-8 flex flex-col lg:flex-row gap-8">
            
            {/* Content Tab - Hidden on mobile if styling is active */}
            <div className={`flex-1 ${activeTab !== "content" ? "hidden lg:block" : ""}`}>
              <ContentTab />
            </div>

            {/* Styling Tab - Hidden on mobile if content is active */}
            <div className={`flex-1 ${activeTab !== "styling" ? "hidden lg:block" : ""}`}>
              <StylingTab />
            </div>
            
          </div>

          {/* Right Column: Live Mobile Preview */}
          <div className="lg:col-span-5 xl:col-span-4 h-full">
            <PhonePreview />
          </div>

        </div>
      </main>
    </div>
  );
};
