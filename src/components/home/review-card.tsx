import { StarRating } from "./star-rating";

interface ReviewCardProps {
  name: string;
  location: string;
  rating: number;
  review: string;
  propertyType?: string;
}

export function ReviewCard({ name, location, rating, review, propertyType }: ReviewCardProps) {
  return (
    <div className="bg-white rounded-2xl border border-gray-100 p-6 md:p-8 shadow-sm hover:shadow-md transition-shadow duration-300">
      <div className="mb-4">
        <h4 className="font-semibold text-primary text-lg">{name}</h4>
        <p className="text-sm text-muted-foreground">{location}{propertyType && ` · ${propertyType}`}</p>
      </div>

      <div className="mb-4">
        <StarRating rating={rating} size="sm" />
      </div>

      <p className="text-muted-foreground leading-relaxed">{review}</p>
    </div>
  );
}
