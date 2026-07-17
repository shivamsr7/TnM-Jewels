import { FaStar, FaRegStar } from "react-icons/fa";

export default function RatingStars({
  rating = 0,
  size = 18,
}) {
  return (
    <div className="flex items-center gap-1">
      {[1, 2, 3, 4, 5].map((star) =>
        star <= rating ? (
          <FaStar
            key={star}
            size={size}
            className="text-[#C8A45C]"
          />
        ) : (
          <FaRegStar
            key={star}
            size={size}
            className="text-gray-300"
          />
        )
      )}
    </div>
  );
}