import { Link } from "react-router-dom";
import { FaTrash, FaShoppingCart, FaStar } from "react-icons/fa";
import { useWishlist } from "../context/WishlistContext";
import { useCart } from "../context/CartContext";
import toast from "react-hot-toast";

export default function WishlistCard({ product }) {
  const { removeFromWishlist } = useWishlist();
  const { addToCart } = useCart();

  const handleMoveToCart = () => {
    addToCart(product, 1);
    removeFromWishlist(product.id);
    toast.success("Moved to Cart 🛒");
  };

  return (
    <div className="group overflow-hidden rounded-3xl border border-gray-200 bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl">

      {/* Image */}

      <Link to={`/product/${product.slug}`}>
        <div className="relative h-[320px] overflow-hidden">

          <img
            src={product.images?.[0]}
            alt={product.name}
            className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
          />

        </div>
      </Link>

      {/* Content */}

      <div className="p-6">

        <Link to={`/product/${product.slug}`}>
          <h3 className="text-xl font-semibold hover:text-[#C8A45C] transition">
            {product.name}
          </h3>
        </Link>

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

        {/* Buttons */}

        <div className="mt-6 flex gap-3">

          <button
            onClick={handleMoveToCart}
            className="flex-1 rounded-full bg-[#C8A45C] py-3 font-semibold text-white transition hover:bg-black"
          >
            <div className="flex items-center justify-center gap-2">
              <FaShoppingCart />
              Move to Cart
            </div>
          </button>

          <button
            onClick={() => removeFromWishlist(product.id)}
            className="flex h-12 w-12 items-center justify-center rounded-full border border-red-200 text-red-500 transition hover:bg-red-500 hover:text-white"
          >
            <FaTrash />
          </button>

        </div>

      </div>

    </div>
  );
}