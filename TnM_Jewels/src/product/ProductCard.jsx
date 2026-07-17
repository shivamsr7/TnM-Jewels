import {
  FaHeart,
  FaRegHeart,
  FaWhatsapp,
  FaStar,
} from "react-icons/fa";
import { Link } from "react-router-dom";
import { useWishlist } from "../context/WishlistContext";
export default function ProductCard({ product,onQuickView }) {
  const {
  addToWishlist,
  removeFromWishlist,
  isWishlisted,
} = useWishlist();
    const discountPercentage = Math.round(
  ((product.originalPrice - product.price) / product.originalPrice) * 100
);
  return (
    <div className="group bg-white rounded-[30px] overflow-hidden shadow-md hover:shadow-[0_25px_60px_rgba(0,0,0,0.15)] transition-all duration-500 hover:-translate-y-2">
<Link to={`/product/${product.slug}`}>
      {/* Image Section */}
      <div className="relative h-[360px] overflow-hidden">

        {/* Primary Image */}
        <img
          src={product.images?.[0] || "https://placehold.co/600x700"}
          alt={product.name}
          className="absolute inset-0 w-full h-full object-cover transition-all duration-700 group-hover:opacity-0 group-hover:scale-110"
        />

        {/* Secondary Image */}
        <img
          src={
            product.images?.[1] ||
            product.images?.[0] ||
            "https://placehold.co/600x700"
          }
          alt={product.name}
          className="absolute inset-0 w-full h-full object-cover opacity-0 scale-110 transition-all duration-700 group-hover:opacity-100 group-hover:scale-100"
        />
        

        {/* Badge */}
        {product.badge && (
          <div className="absolute top-4 left-4 z-20 rounded-full bg-[#C8A45C] px-4 py-2 text-xs font-semibold text-white">
            {product.badge}
          </div>
        )}
        {product.originalPrice > product.price && (
  <div className="absolute top-16 left-4 z-20 rounded-full bg-red-500 px-4 py-2 text-xs font-semibold text-white">
    {discountPercentage}% OFF
  </div>
)}

        {/* Wishlist */}
<button
  onClick={(e) => {
    e.preventDefault();
    e.stopPropagation();

    if (isWishlisted(product.id)) {
      removeFromWishlist(product.id);
    } else {
      addToWishlist(product);
    }
  }}
  className="absolute top-4 right-4 z-20 flex h-11 w-11 items-center justify-center rounded-full bg-white/90 shadow-lg backdrop-blur-md transition-all duration-300 hover:bg-[#C8A45C] hover:text-white"
>
  {isWishlisted(product.id) ? (
    <FaHeart className="text-red-500" />
  ) : (
    <FaRegHeart />
  )}
</button>

        {/* Quick View */}
        <div className="absolute bottom-5 left-1/2 z-20 -translate-x-1/2 translate-y-5 opacity-0 transition-all duration-500 group-hover:translate-y-0 group-hover:opacity-100">
<button
  onClick={(e) => {
    e.preventDefault();
    e.stopPropagation();
    onQuickView(product);
  }}
  className="rounded-full bg-white/90 px-6 py-3 shadow-xl backdrop-blur-md transition-all duration-300 hover:bg-[#C8A45C] hover:text-white"
>
  Quick View
</button>
        </div>

      </div>
</Link>
      {/* Content */}
      <div className="p-6">

        <h3 className="text-xl font-semibold text-gray-900">
          {product.name}
        </h3>

        <div className="mt-3 flex items-center gap-1">
          {Array.from({ length: product.rating }).map((_, index) => (
  <FaStar
    key={index}
    className="text-[#C8A45C]"
    size={14}
  />
))}

          <span className="ml-2 text-sm text-gray-500">
            ({product.reviews})
          </span>
        </div>

        <div className="mt-4 flex items-center gap-3">
          <span className="text-2xl font-bold text-[#C8A45C]">
            ₹{product.price}
          </span>

          <span className="text-gray-400 line-through">
            ₹{product.originalPrice}
          </span>
        </div>
<div className="mt-4 flex flex-wrap gap-2">

{product.features.map((feature) => (

  <span
    key={feature}
    className="rounded-full bg-gray-100 px-3 py-1 text-xs"
  >
    {feature}
  </span>

))}

</div>
<button className="mt-6 flex w-full items-center justify-center gap-2 rounded-full bg-[#25D366] py-3 font-semibold text-white transition-all duration-300 hover:bg-[#1ebe5d]">

  <FaWhatsapp />

  Order Now

</button>

      </div>

    </div>
  );
}