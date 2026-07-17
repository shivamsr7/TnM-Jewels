import RatingStars from "./RatingStars";

const ratingBreakdown = [
  { stars: 5, count: 0 },
  { stars: 4, count: 0 },
  { stars: 3, count: 0 },
  { stars: 2, count: 0 },
  { stars: 1, count: 0 },
];

export default function ReviewSummary() {
  return (
    <div className="h-full rounded-3xl border border-gray-200 bg-[#FDF8EF] p-8 shadow-sm">

      <h2 className="text-3xl font-serif">
        Customer Reviews
      </h2>

      <div className="mt-8 flex items-center gap-5">

        <span className="text-6xl font-bold">
          0.0
        </span>

        <div>

          <RatingStars rating={0} />

          <p className="mt-2 text-gray-500">
            No reviews yet
          </p>

        </div>

      </div>

      <div className="mt-10 space-y-4">

        {ratingBreakdown.map((item) => (

          <div
            key={item.stars}
            className="flex items-center gap-3"
          >

            <span className="w-5 text-sm font-medium">
              {item.stars}
            </span>

            <div className="h-2 flex-1 rounded-full bg-gray-200 overflow-hidden">

              <div
                className="h-full bg-[#C8A45C]"
                style={{ width: "0%" }}
              />

            </div>

            <span className="text-sm text-gray-500">
              {item.count}
            </span>

          </div>

        ))}

      </div>

    </div>
  );
}