import { Star } from "lucide-react";

interface StarRatingProps {
  rating: number;
  maxRating?: number;
  size?: "sm" | "md" | "lg";
}

const sizeClasses = {
  sm: "w-4 h-4",
  md: "w-5 h-5",
  lg: "w-6 h-6",
};

export function StarRating({ rating, maxRating = 5, size = "md" }: StarRatingProps) {
  return (
    <div className="flex gap-0.5">
      {Array.from({ length: maxRating }).map((_, index) => {
        const isFilled = index < Math.floor(rating);
        const isPartial = index === Math.floor(rating) && rating % 1 !== 0;

        return (
          <Star
            key={index}
            className={`${sizeClasses[size]} ${
              isFilled || isPartial
                ? "fill-amber-400 text-amber-400"
                : "fill-gray-200 text-gray-200"
            }`}
          />
        );
      })}
    </div>
  );
}
