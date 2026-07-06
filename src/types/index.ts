export interface DynamicOption {
  id: string;
  text: string;
}

export interface ContentState {
  initial: {
    title: string;
    subtitle: string;
  };
  feedback: {
    maxRating: number;
    ratingType: "stars" | "numbers";
    options: DynamicOption[];
    showAdditionalComment: boolean;
    submitText: string;
  };
  thankYou: {
    mediaUrl: string | null;
    mediaType: 'image' | 'lottie' | null;
    title: string;
    subtitle: string;
    buttonText: string;
  };
}

export interface StylingState {
  backgroundColor: string;
  titleColor: string;
  subtitleColor: string;
  buttonBgColor: string;
  buttonTextColor: string;
  fontSize: string;
  fontWeight: string;
  borderRadius: string;
  buttonWidth: string;
  buttonHeight: string;
  ratingSelectedColor: string;
  ratingUnselectedColor: string;
}

export interface CsatContextType {
  content: ContentState;
  styling: StylingState;
  updateContent: (section: keyof ContentState, field: string, value: any) => void;
  updateStyling: (field: keyof StylingState, value: string) => void;
  resetToDefault: () => void;
}
