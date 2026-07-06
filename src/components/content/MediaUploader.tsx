import type { FC, DragEvent, ChangeEvent } from "react";
import { useRef, useState, useCallback } from "react";
import { useCsatContext } from "../../context/CsatContext";
import { Upload, X, Loader2, FileImage } from "lucide-react";
import { cn } from "../../utils/helpers";

const ACCEPTED_TYPES = ["image/png", "image/jpeg", "image/gif", "application/json"];
const ACCEPTED_EXTENSIONS = [".png", ".jpg", ".jpeg", ".gif", ".json"];

export const MediaUploader: FC = () => {
  const { content, updateContent } = useCsatContext();
  const { mediaUrl, mediaType } = content.thankYou;
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const processFile = useCallback((file: File) => {
    setError(null);

    const isValidType = ACCEPTED_TYPES.includes(file.type);
    const isValidExtension = ACCEPTED_EXTENSIONS.some((ext) =>
      file.name.toLowerCase().endsWith(ext)
    );

    if (!isValidType && !isValidExtension) {
      setError("Unsupported format. Please upload PNG, JPG, GIF, or Lottie JSON.");
      return;
    }

    // 5MB limit
    if (file.size > 5 * 1024 * 1024) {
      setError("File too large. Maximum size is 5MB.");
      return;
    }

    setIsLoading(true);

    // Simulate a brief processing delay for UX
    setTimeout(() => {
      let type: "image" | "lottie" | null = null;

      if (file.type.startsWith("image/")) {
        type = "image";
      } else if (file.type === "application/json" || file.name.endsWith(".json")) {
        type = "lottie";
      }

      if (type) {
        const url = URL.createObjectURL(file);
        updateContent("thankYou", "mediaUrl", url);
        updateContent("thankYou", "mediaType", type);
      }

      setIsLoading(false);
    }, 400);

    // Reset input
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  }, [updateContent]);

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) processFile(file);
  };

  const handleDragOver = (e: DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  };

  const handleDragLeave = (e: DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  };

  const handleDrop = (e: DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);

    const file = e.dataTransfer.files?.[0];
    if (file) processFile(file);
  };

  const handleRemoveMedia = () => {
    if (mediaUrl) {
      URL.revokeObjectURL(mediaUrl);
    }
    updateContent("thankYou", "mediaUrl", null);
    updateContent("thankYou", "mediaType", null);
    setError(null);
  };

  return (
    <div className="space-y-2">
      <label className="text-sm font-medium text-gray-700">Upload Media</label>
      <p className="text-xs text-gray-400">Supported: PNG, JPG, JPEG, GIF, Lottie (.json) — Max 5MB</p>

      {!mediaUrl ? (
        <div
          className={cn(
            "relative border-2 border-dashed rounded-xl p-8 flex flex-col items-center justify-center text-gray-500 cursor-pointer transition-all",
            isDragging
              ? "border-indigo-500 bg-indigo-50/50 scale-[1.01]"
              : "border-gray-200 hover:bg-gray-50 hover:border-indigo-300"
          )}
          onClick={() => fileInputRef.current?.click()}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          role="button"
          tabIndex={0}
          aria-label="Upload media file"
          onKeyDown={(e) => {
            if (e.key === "Enter" || e.key === " ") fileInputRef.current?.click();
          }}
        >
          {isLoading ? (
            <div className="flex flex-col items-center space-y-2 fade-in">
              <Loader2 size={28} className="text-indigo-500 animate-spin" />
              <span className="text-sm font-medium text-indigo-600">Processing...</span>
            </div>
          ) : (
            <>
              <Upload size={28} className={cn("mb-3 transition-colors", isDragging ? "text-indigo-600" : "text-indigo-400")} />
              <span className="text-sm font-medium text-gray-600">
                {isDragging ? "Drop your file here" : "Click or drag & drop to upload"}
              </span>
              <span className="text-xs text-gray-400 mt-1">PNG, JPG, GIF, or Lottie JSON</span>
            </>
          )}
          <input
            type="file"
            ref={fileInputRef}
            className="hidden"
            accept="image/png, image/jpeg, image/gif, application/json"
            onChange={handleFileChange}
            aria-label="Choose media file"
          />
        </div>
      ) : (
        <div className="relative border border-gray-200 rounded-xl p-4 bg-gray-50/50 scale-in">
          <div className="flex items-center space-x-4">
            <div className="w-20 h-20 bg-white rounded-lg border border-gray-100 flex items-center justify-center overflow-hidden shadow-sm">
              {mediaType === "image" ? (
                <img src={mediaUrl} alt="Uploaded media preview" className="w-full h-full object-cover" />
              ) : (
                <div className="flex flex-col items-center">
                  <FileImage size={24} className="text-indigo-400" />
                  <span className="text-[10px] font-bold text-indigo-500 mt-1">LOTTIE</span>
                </div>
              )}
            </div>
            <div>
              <p className="text-sm font-medium text-gray-700">Media Uploaded ✓</p>
              <p className="text-xs text-gray-400 mt-0.5">
                {mediaType === "image" ? "Image" : "Lottie Animation"}
              </p>
            </div>
          </div>
          <button
            onClick={handleRemoveMedia}
            className="absolute -top-2 -right-2 bg-white border border-gray-200 rounded-full p-1.5 shadow-md text-gray-400 hover:text-red-500 hover:border-red-200 hover:bg-red-50 transition-all"
            title="Remove Media"
            aria-label="Remove uploaded media"
          >
            <X size={14} />
          </button>
        </div>
      )}

      {error && (
        <p className="text-xs text-red-500 fade-in" role="alert">⚠ {error}</p>
      )}
    </div>
  );
};
