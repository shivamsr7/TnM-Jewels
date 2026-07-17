import { useState } from "react";
import { FaStar, FaTimes } from "react-icons/fa";
import toast from "react-hot-toast";

export default function ReviewModal({
  isOpen,
  onClose,
}) {
  const [rating, setRating] = useState(0);

  const [form, setForm] = useState({
    name: "",
    title: "",
    review: "",
  });

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();

    toast.success(
      "Review submission will be available soon!"
    );

    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/60 flex items-center justify-center p-6">

<div className="relative w-full max-w-lg rounded-3xl bg-white p-8 shadow-2xl max-h-[90vh] overflow-y-auto">

        <button
          onClick={onClose}
          className="absolute right-6 top-6"
        >
          <FaTimes size={22} />
        </button>

        <h2 className="text-4xl font-serif">

          Write a Review

        </h2>

        <p className="mt-3 text-gray-500">

          Share your experience with this product.

        </p>

        {/* Rating */}

<div className="mt-6">

  <h3 className="font-semibold mb-4">
    Overall Rating
  </h3>

  <div className="flex gap-3">

    {[1,2,3,4,5].map((star)=>(
      <FaStar
        key={star}
        size={32}
        onClick={()=>setRating(star)}
        className={`cursor-pointer transition duration-300 hover:scale-125 ${
          star<=rating
            ? "text-[#C8A45C]"
            : "text-gray-300"
        }`}
      />
    ))}

  </div>

</div>

        <form
          onSubmit={handleSubmit}
          className="space-y-4"
        >

          <input
            placeholder="Your Name"
            className="w-full rounded-2xl border border-gray-200 px-5 py-4 focus:border-[#C8A45C] focus:ring-2 focus:ring-[#C8A45C]/20 outline-none transition"
          />

          <input
            placeholder="Review Title"
            className="w-full rounded-2xl border border-gray-200 px-5 py-4 focus:border-[#C8A45C] focus:ring-2 focus:ring-[#C8A45C]/20 outline-none transition"
          />

          <textarea
            rows={5}
            placeholder="Write your review..."
            className="w-full rounded-2xl border border-gray-200 px-5 py-4 focus:border-[#C8A45C] focus:ring-2 focus:ring-[#C8A45C]/20 outline-none transition"
          />
<label className="flex items-center gap-3">

  <input
    type="checkbox"
    className="accent-[#C8A45C]"
  />

  <span className="text-sm text-gray-600">

    I confirm this review is based on my purchase.

  </span>

</label>
<div className="border-2 border-dashed rounded-2xl p-8 text-center">

  <p className="text-gray-500">

    📷 Upload Photos

  </p>

  <span className="text-sm text-gray-400">

    Coming Soon

  </span>

</div>
<button
  className="w-full rounded-full bg-[#C8A45C] hover:bg-black text-white py-4 transition-all duration-300"
>
  Submit Review
</button>

        </form>

      </div>

    </div>
  );
}