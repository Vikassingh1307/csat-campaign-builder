import type { FC } from "react";
import { useCsatContext } from "../../context/CsatContext";
import { SectionCard } from "../common/SectionCard";
import { ColorPicker } from "../common/ColorPicker";
import { Palette, Type, Maximize2 } from "lucide-react";

export const StylingTab: FC = () => {
  const { styling, updateStyling } = useCsatContext();

  return (
    <div className="space-y-5">
      <div className="mb-4">
        <h2 className="text-xl font-bold text-gray-900">Styling</h2>
        <p className="text-sm text-gray-400 mt-0.5">Customize the visual appearance of the CSAT popup.</p>
      </div>

      <SectionCard title="Colors" icon={<Palette size={18} />}>
        <div className="space-y-4">
          <ColorPicker
            label="Background"
            value={styling.backgroundColor}
            onChange={(val) => updateStyling("backgroundColor", val)}
          />
          <div className="border-t border-gray-100 pt-3">
            <ColorPicker
              label="Title Color"
              value={styling.titleColor}
              onChange={(val) => updateStyling("titleColor", val)}
            />
          </div>
          <ColorPicker
            label="Subtitle Color"
            value={styling.subtitleColor}
            onChange={(val) => updateStyling("subtitleColor", val)}
          />
          <div className="border-t border-gray-100 pt-3">
            <ColorPicker
              label="Button Background"
              value={styling.buttonBgColor}
              onChange={(val) => updateStyling("buttonBgColor", val)}
            />
          </div>
          <ColorPicker
            label="Button Text"
            value={styling.buttonTextColor}
            onChange={(val) => updateStyling("buttonTextColor", val)}
          />
        </div>
      </SectionCard>

      <SectionCard title="Rating Colors" icon={<Palette size={18} />}>
        <ColorPicker
          label="Selected Star"
          value={styling.ratingSelectedColor}
          onChange={(val) => updateStyling("ratingSelectedColor", val)}
        />
        <ColorPicker
          label="Unselected Star"
          value={styling.ratingUnselectedColor}
          onChange={(val) => updateStyling("ratingUnselectedColor", val)}
        />
      </SectionCard>

      <SectionCard title="Typography" icon={<Type size={18} />}>
        <div className="space-y-4">
          <div className="space-y-1.5">
            <label htmlFor="font-size" className="text-sm font-medium text-gray-700">Base Font Size</label>
            <select
              id="font-size"
              className="w-full px-3 py-2.5 border border-gray-200 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/40 focus:border-indigo-500 text-sm bg-white hover:border-gray-300 transition-all"
              value={styling.fontSize}
              onChange={(e) => updateStyling("fontSize", e.target.value)}
              aria-label="Select base font size"
            >
              <option value="12px">12px — Small</option>
              <option value="14px">14px — Medium</option>
              <option value="16px">16px — Base</option>
              <option value="18px">18px — Large</option>
            </select>
          </div>

          <div className="space-y-1.5">
            <label htmlFor="font-weight" className="text-sm font-medium text-gray-700">Title Font Weight</label>
            <select
              id="font-weight"
              className="w-full px-3 py-2.5 border border-gray-200 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/40 focus:border-indigo-500 text-sm bg-white hover:border-gray-300 transition-all"
              value={styling.fontWeight}
              onChange={(e) => updateStyling("fontWeight", e.target.value)}
              aria-label="Select title font weight"
            >
              <option value="400">Normal (400)</option>
              <option value="500">Medium (500)</option>
              <option value="600">Semi-Bold (600)</option>
              <option value="700">Bold (700)</option>
            </select>
          </div>
        </div>
      </SectionCard>

      <SectionCard title="Dimensions" icon={<Maximize2 size={18} />}>
        <div className="space-y-4">
          <div className="space-y-1.5">
            <label htmlFor="border-radius" className="text-sm font-medium text-gray-700">Border Radius</label>
            <select
              id="border-radius"
              className="w-full px-3 py-2.5 border border-gray-200 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/40 focus:border-indigo-500 text-sm bg-white hover:border-gray-300 transition-all"
              value={styling.borderRadius}
              onChange={(e) => updateStyling("borderRadius", e.target.value)}
              aria-label="Select border radius"
            >
              <option value="0px">0px — Square</option>
              <option value="8px">8px — Slight</option>
              <option value="12px">12px — Rounded</option>
              <option value="24px">24px — Pill</option>
            </select>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-1.5">
              <label htmlFor="btn-width" className="text-sm font-medium text-gray-700">Button Width</label>
              <input
                id="btn-width"
                className="w-full px-3 py-2.5 border border-gray-200 rounded-lg shadow-sm text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/40 focus:border-indigo-500 bg-white hover:border-gray-300 transition-all"
                value={styling.buttonWidth}
                onChange={(e) => updateStyling("buttonWidth", e.target.value)}
                placeholder="e.g. 100% or 120px"
                aria-label="Button width"
              />
            </div>
            <div className="space-y-1.5">
              <label htmlFor="btn-height" className="text-sm font-medium text-gray-700">Button Height</label>
              <input
                id="btn-height"
                className="w-full px-3 py-2.5 border border-gray-200 rounded-lg shadow-sm text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/40 focus:border-indigo-500 bg-white hover:border-gray-300 transition-all"
                value={styling.buttonHeight}
                onChange={(e) => updateStyling("buttonHeight", e.target.value)}
                placeholder="e.g. 44px"
                aria-label="Button height"
              />
            </div>
          </div>
        </div>
      </SectionCard>
    </div>
  );
};
