import { createContext, useContext, useState } from "react";
import type { ReactNode } from "react";
import type { ContentState, StylingState, CsatContextType } from "../types";
import { defaultContentState, defaultStylingState } from "../constants/defaultState";

const CsatContext = createContext<CsatContextType | undefined>(undefined);

export const CsatProvider = ({ children }: { children: ReactNode }) => {
  const [content, setContent] = useState<ContentState>(defaultContentState);
  const [styling, setStyling] = useState<StylingState>(defaultStylingState);

  const updateContent = (section: keyof ContentState, field: string, value: any) => {
    setContent((prev) => ({
      ...prev,
      [section]: {
        ...prev[section],
        [field]: value,
      },
    }));
  };

  const updateStyling = (field: keyof StylingState, value: string) => {
    setStyling((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const resetToDefault = () => {
    setContent(defaultContentState);
    setStyling(defaultStylingState);
  };

  return (
    <CsatContext.Provider
      value={{
        content,
        styling,
        updateContent,
        updateStyling,
        resetToDefault,
      }}
    >
      {children}
    </CsatContext.Provider>
  );
};

export const useCsatContext = () => {
  const context = useContext(CsatContext);
  if (context === undefined) {
    throw new Error("useCsatContext must be used within a CsatProvider");
  }
  return context;
};
