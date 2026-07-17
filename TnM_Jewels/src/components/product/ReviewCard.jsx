import RatingStars from "./RatingStars";
import { FaCheckCircle } from "react-icons/fa";

export default function ReviewCard({
  review,
}) {
  return (
    <div className="border rounded-3xl p-6">

      <div className="flex justify-between">

        <div>

          <h3 className="font-semibold">

            {review.name}

          </h3>

          <p className="text-sm text-gray-500">

            {review.date}

          </p>

        </div>

        {review.verified && (
          <div className="flex items-center gap-2 text-green-600 text-sm">

            <FaCheckCircle />

            Verified

          </div>
        )}

      </div>

      <div className="mt-4">

        <RatingStars rating={review.rating} />

      </div>

      <h4 className="font-semibold mt-5">

        {review.title}

      </h4>

      <p className="text-gray-600 mt-3 leading-7">

        {review.review}

      </p>

    </div>
  );
}