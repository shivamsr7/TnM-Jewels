import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { FaStar } from "react-icons/fa";
import { useCart } from "../context/CartContext";
import toast from "react-hot-toast";
import ProductReviews from "../components/product/ProductReviews";
import RelatedProducts from "../components/product/RelatedProducts";
export default function ProductDetails() {
const { slug } = useParams();
const { addToCart, cartItems } = useCart();


console.log(cartItems);
const [product, setProduct] = useState(null);
const [loading, setLoading] = useState(true);

// State
const [selectedImage, setSelectedImage] = useState(
  product?.images?.[0] ?? null
);
const [zoomStyle, setZoomStyle] = useState({});
const [isZoomed, setIsZoomed] = useState(false);
const [showZoomHint, setShowZoomHint] = useState(true);
const [quantity, setQuantity] = useState(1);

// Update selected image whenever the product changes
useEffect(() => {
  const fetchProduct = async () => {
    try {
      setLoading(true);

      const response = await fetch(
        `http://localhost:5000/api/products/${slug}`
      );

      const data = await response.json();

      if (data.success) {
        const p = {
          ...data.product,
          originalPrice: data.product.original_price,
          bestSeller: data.product.best_seller,
          newArrival: data.product.new_arrival,
          relatedProducts: data.product.related_products,
        };

        setProduct(p);
        setSelectedImage(p.images?.[0]);
        setQuantity(1);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  fetchProduct();
}, [slug]);
if (loading) {
  return (
    <div className="flex h-[70vh] items-center justify-center">
      <h2 className="text-2xl font-semibold">
        Loading Product...
      </h2>
    </div>
  );
}
if (!product) {
  return (
    <div className="flex items-center justify-center h-[70vh]">
      Product Not Found
    </div>
  );
}

const discount = Math.round(
  ((product.originalPrice - product.price) /
    product.originalPrice) *
    100
);

const increaseQuantity = () => {
  if (quantity < product.stock) {
    setQuantity((prev) => prev + 1);
  }
};

const decreaseQuantity = () => {
  if (quantity > 1) {
    setQuantity((prev) => prev - 1);
  }
};
const handleMouseMove = (e) => {
  const { left, top, width, height } =
    e.currentTarget.getBoundingClientRect();

  const x = ((e.clientX - left) / width) * 100;
  const y = ((e.clientY - top) / height) * 100;

  setZoomStyle({
    transformOrigin: `${x}% ${y}%`,
    transform: "scale(2.5)",
  });
};
const handleMouseLeave = () => {
  setZoomStyle({
    transform: "scale(1)",
  });

  setIsZoomed(false);
};
  return (
     <div className="bg-white">
    <section className="px-6 lg:px-20 py-16">
      <div className="grid lg:grid-cols-2 gap-16">

        {/* Product Image */}
{/* Product Images */}

<div>

  {/* Main Image */}

  <div
    className="relative overflow-hidden rounded-3xl cursor-zoom-in"
    onMouseMove={handleMouseMove}
    onMouseEnter={() => {
      setIsZoomed(true);
      setShowZoomHint(false);
    }}
    onMouseLeave={handleMouseLeave}
  >

    {showZoomHint && (
      <div className="absolute bottom-5 left-1/2 z-20 -translate-x-1/2 rounded-full bg-black/70 px-4 py-2 text-sm text-white backdrop-blur-sm animate-pulse">
        🔍 Hover to Zoom
      </div>
    )}

    <img
      key={selectedImage}
      src={selectedImage || product.images[0]}
      alt={product.name}
      className="w-full transition-all duration-500 ease-in-out"
      style={isZoomed ? zoomStyle : {}}
    />

  </div>

  {/* Thumbnail Gallery */}

  <div className="mt-6 flex gap-4 justify-center">

    {product.images.map((image, index) => (

      <button
        key={index}
        onClick={() => setSelectedImage(image)}
        className={`overflow-hidden rounded-2xl transition-all duration-300 ${
          selectedImage === image
            ? "border-2 border-[#C8A45C] shadow-lg scale-105"
            : "border border-gray-200 hover:border-[#C8A45C] hover:scale-105"
        }`}
      >

        <img
          src={image}
          alt={`Thumbnail ${index + 1}`}
          className="h-24 w-24 object-cover transition-transform duration-300 hover:scale-110"
        />

      </button>

    ))}

  </div>

</div>

        {/* Product Details */}
        <div>

          <h1 className="text-5xl font-serif">
            {product.name}
          </h1>
<div className="mt-5 flex items-center gap-1">

  {Array.from({ length: product.rating }).map((_, index) => (

    <FaStar
      key={index}
      className="text-[#C8A45C]"
      size={18}
    />

  ))}

  <span className="ml-2 text-gray-500">
    ({product.reviews} Reviews)
  </span>

</div>
<div className="mt-6 flex items-center gap-4 flex-wrap">

  <span className="text-4xl font-bold text-[#C8A45C]">
    ₹{product.price}
  </span>

  <span className="line-through text-gray-400 text-xl">
    ₹{product.originalPrice}
  </span>

  <span className="rounded-full bg-red-500 px-3 py-1 text-sm font-semibold text-white">
    {discount}% OFF
  </span>

</div>

          <p className="mt-8 text-gray-600 leading-8">
            {product.description}
          </p>

          <div className="mt-8 flex flex-wrap gap-3">

            {product.features.map((feature) => (

              <span
                key={feature}
                className="rounded-full bg-gray-100 px-4 py-2 text-sm"
              >
                {feature}
              </span>

            ))}

          </div>
<div className="mt-10">

  <h2 className="text-2xl font-semibold mb-6">
    Specifications
  </h2>

  <div className="space-y-3">

    {Object.entries(product.specifications).map(([key, value]) => (

      <div
        key={key}
        className="flex justify-between border-b pb-3"
      >

        <span className="capitalize text-gray-500">
          {key}
        </span>

        <span className="font-medium">
          {value}
        </span>

      </div>

    ))}

  </div>

</div>
{/* Stock Status */}

<div className="mt-4">

{product.stock === 0 ? (
  <p className="font-medium text-red-500">
    🔴 Out of Stock
  </p>
) : product.stock <= 5 ? (
  <p className="font-medium text-orange-500">
    ⚡ Only {product.stock} left
  </p>
) : (
  <p className="font-medium text-green-600">
    ✅ In Stock
  </p>
)}

</div>

{/* Quantity */}
<div className="mt-10">

  <h3 className="mb-4 text-lg font-semibold">
    Quantity
  </h3>

  <div className="flex items-center gap-4">

    <button
      onClick={decreaseQuantity}
      disabled={quantity === 1}
      className="flex h-11 w-11 items-center justify-center rounded-full border"
    >
      −
    </button>

    <span className="text-xl font-semibold">
      {quantity}
    </span>

    <button
      onClick={increaseQuantity}
      disabled={quantity === product.stock}
      className="flex h-11 w-11 items-center justify-center rounded-full border"
    >
      +
    </button>

  </div>

</div>
<button
  disabled={product.stock === 0}
  onClick={() => {
    addToCart(product, quantity);
    toast.success(`${product.name} added to cart!`);
  }}
  className="mt-10 w-full rounded-full bg-[#C8A45C] py-4 text-white font-semibold hover:bg-black transition"
>
  {product.stock > 0 ? "Add to Cart" : "Out of Stock"}
</button>
        </div>

      </div>
    </section>

    {/* Customer Reviews */}

    <div className="px-6 lg:px-20 pb-20">
      <ProductReviews />
    </div>
    {/* Related Products */}
    <div className="px-6 lg:px-20 pb-10">
      <RelatedProducts currentProduct={product} />
    </div>
  </div>
);
}

