import type { FC } from "react";
import { useState, useEffect } from "react";
import { Star } from "lucide-react";
import { useCsatContext } from "../../context/CsatContext";

export const RatingComponent: FC = () => {
  const { content, styling } = useCsatContext();
  const [hoverRating, setHoverRating] = useState(0);
  const [selectedRating, setSelectedRating] = useState(0);

  const maxRating = content.feedback.maxRating;

  // Reset selected rating when maxRating changes
  useEffect(() => {
    setSelectedRating(0);
  }, [maxRating]);

  return (
    <div className="flex justify-center flex-wrap gap-1 my-3" role="radiogroup" aria-label="Star rating">
      {Array.from({ length: maxRating }).map((_, index) => {
        const starValue = index + 1;
        const isFilled = starValue <= (hoverRating || selectedRating);
        
        if (content.feedback.ratingType === "numbers") {
          return (
            <button
              key={starValue}
              type="button"
              className="focus:outline-none transition-transform hover:scale-110 active:scale-95 flex items-center justify-center font-semibold rounded-md border"
              style={{
                width: maxRating > 5 ? '32px' : '40px',
                height: maxRating > 5 ? '32px' : '40px',
                backgroundColor: isFilled ? styling.ratingSelectedColor : 'transparent',
                borderColor: isFilled ? styling.ratingSelectedColor : styling.ratingUnselectedColor,
                color: isFilled ? '#ffffff' : styling.subtitleColor,
              }}
              onMouseEnter={() => setHoverRating(starValue)}
              onMouseLeave={() => setHoverRating(0)}
              onClick={() => setSelectedRating(starValue)}
              role="radio"
              aria-checked={selectedRating === starValue}
              aria-label={`Rating ${starValue}`}
            >
              {starValue}
            </button>
          );
        }

        return (
          <button
            key={starValue}
            type="button"
            className="focus:outline-none transition-transform hover:scale-125 active:scale-95"
            onMouseEnter={() => setHoverRating(starValue)}
            onMouseLeave={() => setHoverRating(0)}
            onClick={() => setSelectedRating(starValue)}
            role="radio"
            aria-checked={selectedRating === starValue}
            aria-label={`${starValue} star${starValue > 1 ? "s" : ""}`}
          >
            <Star
              size={maxRating > 5 ? 22 : 30}
              fill={isFilled ? styling.ratingSelectedColor : "transparent"}
              color={isFilled ? styling.ratingSelectedColor : styling.ratingUnselectedColor}
              strokeWidth={1.5}
              className="transition-colors duration-150"
            />
          </button>
        );
      })}
    </div>
  );
};
