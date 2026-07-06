import type { ContentState, StylingState } from "../types";

export const defaultContentState: ContentState = {
  initial: {
    title: "How was your experience?",
    subtitle: "We'd love to hear your feedback.",
  },
  feedback: {
    maxRating: 5,
    ratingType: "stars",
    options: [
      { id: "1", text: "Quality" },
      { id: "2", text: "Support" },
      { id: "3", text: "Price" },
    ],
    showAdditionalComment: true,
    submitText: "Submit Feedback",
  },
  thankYou: {
    mediaUrl: null,
    mediaType: null,
    title: "Thank You!",
    subtitle: "Your feedback helps us improve.",
    buttonText: "Close",
  },
};

export const defaultStylingState: StylingState = {
  backgroundColor: "#ffffff",
  titleColor: "#111827",
  subtitleColor: "#6b7280",
  buttonBgColor: "#4f46e5",
  buttonTextColor: "#ffffff",
  fontSize: "16px",
  fontWeight: "500",
  borderRadius: "12px",
  buttonWidth: "100%",
  buttonHeight: "44px",
  ratingSelectedColor: "#fbbf24",
  ratingUnselectedColor: "#e5e7eb",
};
