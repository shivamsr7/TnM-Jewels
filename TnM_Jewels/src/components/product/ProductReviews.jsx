import ReviewSummary from "./ReviewSummary";
import { useState } from "react";
import ReviewModal from "./ReviewModal";

export default function ProductReviews() {
  const reviews = [];
const [showModal, setShowModal] = useState(false);
return (
  <section className="mt-24">

    <h2 className="text-4xl font-serif mb-10">
      Customer Reviews
    </h2>

    <div className="grid lg:grid-cols-3 gap-8">

      {/* Left Side */}

      <ReviewSummary />

      {/* Right Side */}

      <div className="lg:col-span-2">

        {reviews.length === 0 ? (

          <div className="h-full rounded-3xl border border-gray-200 bg-white p-12 flex flex-col items-center justify-center text-center shadow-sm">

            <h3 className="text-4xl font-serif">
              No Reviews Yet
            </h3>

            <p className="mt-5 max-w-md leading-8 text-gray-500">
              Be the first customer to share your
              experience with this jewellery.
            </p>

<button
  onClick={() => setShowModal(true)}
  className="mt-10 rounded-full bg-[#C8A45C] px-10 py-4 text-white font-semibold transition-all duration-300 hover:-translate-y-1 hover:bg-black"
>
  Write a Review
</button>

          </div>

        ) : (

          reviews.map((review) => (
            <ReviewCard
              key={review.id}
              review={review}
            />
          ))

        )}

      </div>

    </div>

    <ReviewModal
      isOpen={showModal}
      onClose={() => setShowModal(false)}
    />

  </section>
);
}