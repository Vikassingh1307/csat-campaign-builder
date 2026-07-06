import type { FC } from "react";
import { useState, useEffect } from "react";
import { useCsatContext } from "../../context/CsatContext";
import { RatingComponent } from "./RatingComponent";
import Lottie from "lottie-react";
import { RotateCcw } from "lucide-react";

export const PhonePreview: FC = () => {
  const { content, styling } = useCsatContext();
  const [step, setStep] = useState<0 | 1 | 2>(0);
  const [lottieData, setLottieData] = useState<object | null>(null);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);

  useEffect(() => {
    if (content.thankYou.mediaType === "lottie" && content.thankYou.mediaUrl) {
      fetch(content.thankYou.mediaUrl)
        .then((res) => res.json())
        .then((data: object) => setLottieData(data))
        .catch(() => setLottieData(null));
    } else {
      setLottieData(null);
    }
  }, [content.thankYou.mediaUrl, content.thankYou.mediaType]);

  const handleRestart = () => {
    setStep(0);
    setSelectedOption(null);
  };

  const renderInitialScreen = () => (
    <div className="flex flex-col h-full justify-between fade-in p-5">
      <div className="flex-1 flex flex-col justify-center items-center text-center space-y-3">
        <h2
          style={{ color: styling.titleColor, fontWeight: styling.fontWeight, fontSize: `calc(${styling.fontSize} * 1.25)` }}
          className="leading-tight"
        >
          {content.initial.title || "Your Title Here"}
        </h2>
        <p
          style={{ color: styling.subtitleColor, fontSize: styling.fontSize }}
          className="leading-relaxed"
        >
          {content.initial.subtitle || "Your subtitle here"}
        </p>
      </div>
      <button
        onClick={() => setStep(1)}
        style={{
          backgroundColor: styling.buttonBgColor,
          color: styling.buttonTextColor,
          width: styling.buttonWidth,
          height: styling.buttonHeight,
          borderRadius: styling.borderRadius,
          fontWeight: styling.fontWeight,
          fontSize: styling.fontSize,
        }}
        className="mx-auto flex items-center justify-center transition-opacity hover:opacity-90 active:opacity-80 shadow-sm"
      >
        Start
      </button>
    </div>
  );

  const renderFeedbackScreen = () => (
    <div className="flex flex-col h-full fade-in p-5 overflow-y-auto custom-scrollbar">
      <div className="flex-1 flex flex-col space-y-4">
        <div className="text-center space-y-1">
          <h2
            style={{ color: styling.titleColor, fontWeight: styling.fontWeight, fontSize: `calc(${styling.fontSize} * 1.1)` }}
            className="leading-tight"
          >
            {content.initial.title || "Your Title Here"}
          </h2>
          <RatingComponent />
        </div>

        {content.feedback.options.length > 0 && (
          <div className="space-y-2">
            {content.feedback.options.map((opt) => (
              <button
                key={opt.id}
                onClick={() => setSelectedOption(opt.id)}
                style={{
                  borderRadius: styling.borderRadius,
                  borderColor: selectedOption === opt.id ? styling.buttonBgColor : `${styling.subtitleColor}30`,
                  color: selectedOption === opt.id ? styling.buttonBgColor : styling.subtitleColor,
                  backgroundColor: selectedOption === opt.id ? `${styling.buttonBgColor}12` : "transparent",
                  fontSize: styling.fontSize,
                }}
                className="w-full text-left px-3 py-2.5 border transition-all hover:opacity-80"
              >
                {opt.text || "—"}
              </button>
            ))}
          </div>
        )}

        {content.feedback.showAdditionalComment && (
          <textarea
            placeholder="Tell us more..."
            style={{
              borderRadius: styling.borderRadius,
              borderColor: `${styling.subtitleColor}30`,
              color: styling.titleColor,
              fontSize: styling.fontSize,
            }}
            className="w-full p-3 border min-h-[80px] resize-none focus:outline-none focus:ring-1 transition-all"
          />
        )}
      </div>

      <div className="mt-4 pt-2">
        <button
          onClick={() => setStep(2)}
          style={{
            backgroundColor: styling.buttonBgColor,
            color: styling.buttonTextColor,
            width: styling.buttonWidth,
            height: styling.buttonHeight,
            borderRadius: styling.borderRadius,
            fontWeight: styling.fontWeight,
            fontSize: styling.fontSize,
          }}
          className="mx-auto flex items-center justify-center transition-opacity hover:opacity-90 active:opacity-80 shadow-sm"
        >
          {content.feedback.submitText || "Submit"}
        </button>
      </div>
    </div>
  );

  const renderThankYouScreen = () => (
    <div className="flex flex-col h-full justify-between fade-in p-5">
      <div className="flex-1 flex flex-col justify-center items-center text-center space-y-4">
        {content.thankYou.mediaUrl && (
          <div className="w-32 h-32 flex items-center justify-center mb-2 scale-in">
            {content.thankYou.mediaType === "image" && (
              <img src={content.thankYou.mediaUrl} alt="Thank you" className="max-w-full max-h-full object-contain rounded-lg" />
            )}
            {content.thankYou.mediaType === "lottie" && lottieData && (
              <Lottie animationData={lottieData} loop={true} className="w-full h-full" />
            )}
          </div>
        )}

        <h2
          style={{ color: styling.titleColor, fontWeight: styling.fontWeight, fontSize: `calc(${styling.fontSize} * 1.25)` }}
          className="leading-tight"
        >
          {content.thankYou.title || "Thank You!"}
        </h2>
        <p
          style={{ color: styling.subtitleColor, fontSize: styling.fontSize }}
          className="leading-relaxed"
        >
          {content.thankYou.subtitle || "Your feedback is appreciated."}
        </p>
      </div>

      <button
        onClick={handleRestart}
        style={{
          backgroundColor: styling.buttonBgColor,
          color: styling.buttonTextColor,
          width: styling.buttonWidth,
          height: styling.buttonHeight,
          borderRadius: styling.borderRadius,
          fontWeight: styling.fontWeight,
          fontSize: styling.fontSize,
        }}
        className="mx-auto flex items-center justify-center transition-opacity hover:opacity-90 active:opacity-80 shadow-sm"
      >
        {content.thankYou.buttonText || "Close"}
      </button>
    </div>
  );

  return (
    <div className="sticky top-24 flex flex-col items-center w-full">
      {/* Label */}
      <div className="mb-4 text-center">
        <h2 className="text-xl font-bold text-gray-900">Live Preview</h2>
        <p className="text-xs text-gray-400 mt-0.5">Changes are reflected instantly</p>
      </div>

      {/* Phone Frame */}
      <div className="relative w-[300px] h-[620px] bg-gray-900 rounded-[44px] shadow-2xl p-3 border-[5px] border-gray-800">
        {/* Notch */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-28 h-[22px] bg-gray-900 rounded-b-2xl z-20" />
        {/* Side buttons (visual detail) */}
        <div className="absolute -left-[7px] top-24 w-[3px] h-8 bg-gray-700 rounded-l-sm" />
        <div className="absolute -left-[7px] top-36 w-[3px] h-12 bg-gray-700 rounded-l-sm" />
        <div className="absolute -left-[7px] top-52 w-[3px] h-12 bg-gray-700 rounded-l-sm" />
        <div className="absolute -right-[7px] top-32 w-[3px] h-16 bg-gray-700 rounded-r-sm" />

        {/* Screen */}
        <div
          className="relative w-full h-full rounded-[34px] overflow-hidden shadow-inner"
          style={{
            backgroundColor: styling.backgroundColor,
            fontFamily: "'Inter', system-ui, sans-serif",
          }}
        >
          {/* Step indicators + restart */}
          <div className="absolute top-0 left-0 w-full pt-7 pb-2 px-4 flex justify-between items-center z-10">
            <div className="flex space-x-1.5">
              {[0, 1, 2].map((s) => (
                <button
                  key={s}
                  onClick={() => setStep(s as 0 | 1 | 2)}
                  className={`h-1.5 rounded-full transition-all ${
                    step === s ? "w-5 bg-indigo-500" : "w-1.5 bg-gray-300 hover:bg-gray-400"
                  }`}
                  aria-label={`Go to step ${s + 1}`}
                />
              ))}
            </div>
            <button
              onClick={handleRestart}
              className="text-gray-400 hover:text-gray-600 transition-colors p-1"
              aria-label="Restart preview"
            >
              <RotateCcw size={12} />
            </button>
          </div>

          <div className="h-full pt-11 pb-3">
            {step === 0 && renderInitialScreen()}
            {step === 1 && renderFeedbackScreen()}
            {step === 2 && renderThankYouScreen()}
          </div>
        </div>
      </div>

      {/* Step labels below phone */}
      <div className="mt-4 flex items-center space-x-3 text-xs text-gray-400">
        <span className={step === 0 ? "text-indigo-600 font-semibold" : ""}>Initial</span>
        <span>→</span>
        <span className={step === 1 ? "text-indigo-600 font-semibold" : ""}>Feedback</span>
        <span>→</span>
        <span className={step === 2 ? "text-indigo-600 font-semibold" : ""}>Thank You</span>
      </div>
    </div>
  );
};
