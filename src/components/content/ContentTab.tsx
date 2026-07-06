import type { FC } from "react";
import { useCsatContext } from "../../context/CsatContext";
import { SectionCard } from "../common/SectionCard";
import { TextInput } from "../common/TextInput";
import { ToggleSwitch } from "../common/ToggleSwitch";
import { DynamicOptions } from "./DynamicOptions";
import { MediaUploader } from "./MediaUploader";
import { MessageSquare, Star, Heart } from "lucide-react";

export const ContentTab: FC = () => {
  const { content, updateContent } = useCsatContext();

  return (
    <div className="space-y-5">
      <div className="mb-4">
        <h2 className="text-xl font-bold text-gray-900">Content</h2>
        <p className="text-sm text-gray-400 mt-0.5">Configure the text and media for your CSAT popup.</p>
      </div>

      <SectionCard title="Initial Screen" icon={<MessageSquare size={18} />}>
        <TextInput
          label="Title"
          value={content.initial.title}
          onChange={(e) => updateContent("initial", "title", e.target.value)}
          maxLength={50}
          placeholder="Enter a title..."
          error={content.initial.title.trim() === "" ? "Title is required" : undefined}
        />
        <TextInput
          label="Subtitle"
          value={content.initial.subtitle}
          onChange={(e) => updateContent("initial", "subtitle", e.target.value)}
          maxLength={100}
          placeholder="Enter a subtitle..."
        />
      </SectionCard>

      <SectionCard title="Feedback Screen" icon={<Star size={18} />}>
        <div className="grid grid-cols-2 gap-3">
          <div className="space-y-1.5">
            <label htmlFor="rating-type" className="text-sm font-medium text-gray-700">Rating Type</label>
            <select
              id="rating-type"
              className="w-full px-3 py-2.5 border border-gray-200 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/40 focus:border-indigo-500 text-sm bg-white hover:border-gray-300 transition-all"
              value={content.feedback.ratingType}
              onChange={(e) => updateContent("feedback", "ratingType", e.target.value as "stars" | "numbers")}
              aria-label="Select rating type"
            >
              <option value="stars">Stars</option>
              <option value="numbers">Numbers</option>
            </select>
          </div>
          <div className="space-y-1.5">
            <label htmlFor="rating-scale" className="text-sm font-medium text-gray-700">Rating Scale</label>
          <select
            id="rating-scale"
            className="w-full px-3 py-2.5 border border-gray-200 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/40 focus:border-indigo-500 text-sm bg-white hover:border-gray-300 transition-all"
            value={content.feedback.maxRating}
            onChange={(e) => updateContent("feedback", "maxRating", parseInt(e.target.value, 10))}
            aria-label="Select rating scale"
          >
            <option value={3}>3 Stars</option>
            <option value={5}>5 Stars</option>
            <option value={10}>10 Stars</option>
          </select>
          </div>
        </div>

        <div className="pt-3 border-t border-gray-100">
          <DynamicOptions />
        </div>

        <div className="pt-3 border-t border-gray-100">
          <ToggleSwitch
            label="Enable Additional Comment"
            checked={content.feedback.showAdditionalComment}
            onChange={(checked) => updateContent("feedback", "showAdditionalComment", checked)}
          />
        </div>

        <TextInput
          label="Submit Button Text"
          value={content.feedback.submitText}
          onChange={(e) => updateContent("feedback", "submitText", e.target.value)}
          maxLength={30}
          placeholder="e.g. Submit Feedback"
          error={content.feedback.submitText.trim() === "" ? "Button text is required" : undefined}
        />
      </SectionCard>

      <SectionCard title="Thank You Screen" icon={<Heart size={18} />}>
        <MediaUploader />
        <div className="pt-3 border-t border-gray-100 space-y-4">
          <TextInput
            label="Title"
            value={content.thankYou.title}
            onChange={(e) => updateContent("thankYou", "title", e.target.value)}
            maxLength={50}
            placeholder="e.g. Thank You!"
            error={content.thankYou.title.trim() === "" ? "Title is required" : undefined}
          />
          <TextInput
            label="Subtitle"
            value={content.thankYou.subtitle}
            onChange={(e) => updateContent("thankYou", "subtitle", e.target.value)}
            maxLength={100}
            placeholder="e.g. Your feedback helps us improve."
          />
          <TextInput
            label="Button Text"
            value={content.thankYou.buttonText}
            onChange={(e) => updateContent("thankYou", "buttonText", e.target.value)}
            maxLength={30}
            placeholder="e.g. Close"
            error={content.thankYou.buttonText.trim() === "" ? "Button text is required" : undefined}
          />
        </div>
      </SectionCard>
    </div>
  );
};
