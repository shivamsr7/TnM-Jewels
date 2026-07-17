import { X } from "lucide-react";
import { FaStar } from "react-icons/fa";
import { useState } from "react";
import { Link } from "react-router-dom";
import { FaHeart, FaRegHeart } from "react-icons/fa";
import { useWishlist } from "../../context/WishlistContext";
import { useCart } from "../../context/CartContext";
import toast from "react-hot-toast";
import { useEffect } from "react";
export default function QuickViewModal({
  product,
  open,
  onClose,
}) {
  const [quantity, setQuantity] = useState(1);
const [selectedImage, setSelectedImage] = useState("");
useEffect(() => {
  if (product) {
    setSelectedImage(product.images?.[0]);
    setQuantity(1);
  }
}, [product]);
const { addToCart } = useCart();

const {
  addToWishlist,
  removeFromWishlist,
  isWishlisted,
} = useWishlist();

if (!open || !product) return null;
  if (!open || !product) return null;

  return (
    <div
      className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/60 backdrop-blur-sm p-4"
      onClick={onClose}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="w-full max-w-5xl overflow-hidden rounded-[30px] bg-white shadow-2xl"
      >
        {/* Header */}

        <div className="flex items-center justify-between border-b px-8 py-5">

          <h2 className="text-2xl font-serif">
            Quick View
          </h2>

          <button
            onClick={onClose}
            className="rounded-full p-2 transition hover:bg-gray-100"
          >
            <X size={24} />
          </button>

        </div>

        {/* Body */}

<div className="grid lg:grid-cols-[40%_60%] gap-8 p-6">

  {/* LEFT COLUMN */}

  <div>

    {/* Main Image */}

    <img
      src={selectedImage || product.images?.[0]}
      alt={product.name}
      className="h-[320px] w-full rounded-3xl object-cover"
    />

    {/* Thumbnails */}

    <div className="mt-4 flex justify-center gap-2">

      {product.images?.map((image, index) => (

        <button
          key={index}
          onClick={() => setSelectedImage(image)}
          className={`overflow-hidden rounded-xl border transition-all ${
            selectedImage === image
              ? "border-[#C8A45C] shadow-md"
              : "border-gray-200"
          }`}
        >

          <img
            src={image}
            alt=""
            className="h-14 w-14 object-cover"
          />

        </button>

      ))}

    </div>

  </div>

          {/* Details */}

          <div>

            <h1 className="text-3xl font-serif">
              {product.name}
            </h1>

            <div className="mt-4 flex items-center gap-1">

              {Array.from({
                length: product.rating,
              }).map((_, index) => (

                <FaStar
                  key={index}
                  className="text-[#C8A45C]"
                />

              ))}

              <span className="ml-2 text-gray-500">
                ({product.reviews})
              </span>

            </div>

            <div className="mt-6 flex items-center gap-4">

              <span className="text-3xl font-bold text-[#C8A45C]">
                ₹{product.price}
              </span>

              <span className="text-xl text-gray-400 line-through">
                ₹{product.originalPrice}
              </span>

            </div>
<div className="mt-5">

  {product.stock > 0 ? (
    product.stock <= 5 ? (
      <p className="font-medium text-orange-500">
        ⚡ Only {product.stock} left
      </p>
    ) : (
      <p className="font-medium text-green-600">
        ✅ In Stock
      </p>
    )
  ) : (
    <p className="font-medium text-red-500">
      🔴 Out of Stock
    </p>
  )}

</div>
            <p className="mt-4 text-sm leading-6 text-gray-600">
  {product.description?.slice(0,120)}...
</p>
<div className="mt-8 flex flex-wrap gap-2">

  {product.features?.slice(0,3).map((feature) => (

    <span
      key={feature}
      className="rounded-full bg-gray-100 px-3 py-1 text-xs"
    >
      {feature}
    </span>

  ))}

</div>
<div className="mt-8 flex w-fit items-center overflow-hidden rounded-full border">

  <button
    onClick={() =>
      setQuantity(Math.max(1, quantity - 1))
    }
    className="px-4 py-2 hover:bg-gray-100"
  >
    −
  </button>

  <span className="px-6">
    {quantity}
  </span>

  <button
    onClick={() => {
      if (quantity < product.stock) {
        setQuantity(quantity + 1);
      }
    }}
    className="px-5 py-3 hover:bg-gray-100"
  >
    +
  </button>

</div>
<div className="mt-10 flex gap-4">

  <button
    onClick={() => {
      if (isWishlisted(product.id)) {
        removeFromWishlist(product.id);
      } else {
        addToWishlist(product);
      }
    }}
    className="flex h-11 w-14 items-center justify-center rounded-full border"
  >
    {isWishlisted(product.id) ? (
      <FaHeart className="text-red-500" />
    ) : (
      <FaRegHeart />
    )}
  </button>

  <button
    disabled={product.stock === 0}
    onClick={() => {
      addToCart(product, quantity);
      toast.success("Added to Cart");
      onClose();
    }}
    className="w-48 rounded-full bg-[#C8A45C] py-3 font-semibold text-white transition hover:bg-black disabled:opacity-50"
  >
    {product.stock > 0 ? "Add To Cart" : "Out of Stock"}
  </button>

</div>
<Link
  to={`/product/${product.slug}`}
  onClick={onClose}
  className="mt-8 inline-flex items-center text-[#C8A45C] font-semibold hover:underline"
>
  View Full Details →
</Link>
          </div>

        </div>

      </div>
    </div>
  );
}