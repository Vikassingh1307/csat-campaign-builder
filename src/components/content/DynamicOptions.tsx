import type { FC } from "react";
import { useCsatContext } from "../../context/CsatContext";
import { TextInput } from "../common/TextInput";
import { Trash2, Plus, ListChecks } from "lucide-react";

export const DynamicOptions: FC = () => {
  const { content, updateContent } = useCsatContext();
  const { options } = content.feedback;

  const handleUpdateOption = (id: string, text: string) => {
    const newOptions = options.map((opt) => (opt.id === id ? { ...opt, text } : opt));
    updateContent("feedback", "options", newOptions);
  };

  const handleDeleteOption = (id: string) => {
    const newOptions = options.filter((opt) => opt.id !== id);
    updateContent("feedback", "options", newOptions);
  };

  const handleAddOption = () => {
    const newId = String(Date.now());
    const newOptions = [...options, { id: newId, text: `Option ${options.length + 1}` }];
    updateContent("feedback", "options", newOptions);
  };

  return (
    <div className="space-y-3">
      <label className="text-sm font-medium text-gray-700">Feedback Options</label>
      
      {options.length === 0 ? (
        /* Empty state */
        <div className="border-2 border-dashed border-gray-200 rounded-lg py-6 px-4 flex flex-col items-center text-center fade-in">
          <ListChecks size={28} className="text-gray-300 mb-2" />
          <p className="text-sm text-gray-400 font-medium">No feedback options yet</p>
          <p className="text-xs text-gray-400 mt-0.5">Add options for users to select from</p>
        </div>
      ) : (
        <div className="space-y-2">
          {options.map((opt, index) => (
            <div key={opt.id} className="flex items-center space-x-2 slide-up" style={{ animationDelay: `${index * 50}ms` }}>
              <div className="flex-1">
                <TextInput
                  label=""
                  value={opt.text}
                  onChange={(e) => handleUpdateOption(opt.id, e.target.value)}
                  placeholder="Option text..."
                  maxLength={40}
                  error={opt.text.trim() === "" ? "Option text is required" : undefined}
                  aria-label={`Feedback option ${index + 1}`}
                />
              </div>
              <button
                onClick={() => handleDeleteOption(opt.id)}
                className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-all mt-1"
                title={`Delete option: ${opt.text}`}
                aria-label={`Delete option ${opt.text}`}
              >
                <Trash2 size={16} />
              </button>
            </div>
          ))}
        </div>
      )}

      <button
        onClick={handleAddOption}
        className="flex items-center text-sm text-indigo-600 font-medium hover:text-indigo-700 bg-indigo-50 hover:bg-indigo-100 px-3 py-2 rounded-lg transition-all w-full justify-center"
        aria-label="Add a new feedback option"
      >
        <Plus size={16} className="mr-1.5" />
        Add Option
      </button>
    </div>
  );
};
