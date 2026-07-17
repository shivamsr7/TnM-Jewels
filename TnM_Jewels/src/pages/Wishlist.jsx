import { Link } from "react-router-dom";
import { useWishlist } from "../context/WishlistContext";
import WishlistCard from "../product/WishlistCard";
import { useCart } from "../context/CartContext";
export default function Wishlist() {
const {
  wishlistItems,
  clearWishlist,
  moveAllToCart,
} = useWishlist();

const { addToCart } = useCart();

  return (
    <div className="min-h-screen bg-white">

      {/* Hero */}

      <section className="bg-[#FDF8EF] py-20">

        <div className="max-w-7xl mx-auto px-6">

          <h1 className="text-5xl md:text-6xl font-serif">
  My Wishlist
</h1>

<p className="mt-5 text-lg text-gray-600">
  {wishlistItems.length} Saved Item
  {wishlistItems.length !== 1 && "s"}
</p>

        </div>

      </section>

      {/* Content */}

      <section className="max-w-7xl mx-auto px-6 py-16">
       {wishlistItems.length > 0 && (

<div className="mb-10 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">

  <h2 className="text-2xl font-semibold">
    Saved Jewellery
  </h2>

  <div className="flex gap-3">

    <button
      onClick={() => moveAllToCart(addToCart)}
      className="rounded-full bg-[#C8A45C] px-6 py-3 font-semibold text-white transition hover:bg-black"
    >
      Move All to Cart
    </button>

    <button
      onClick={clearWishlist}
      className="rounded-full border border-red-300 px-6 py-3 text-red-500 transition hover:bg-red-500 hover:text-white"
    >
      Clear Wishlist
    </button>

  </div>

</div>

)}

        {wishlistItems.length === 0 ? (

          <div className="text-center py-24">

<div className="mx-auto flex h-28 w-28 items-center justify-center rounded-full bg-[#FDF8EF] text-5xl">
  ❤️
</div>

            <h2 className="mt-8 text-4xl font-serif">
              Your Wishlist is Empty
            </h2>

            <p className="mt-4 text-gray-500">
              Save your favourite jewellery to view it here.
            </p>

            <Link
              to="/shop"
              className="inline-block mt-10 rounded-full bg-[#C8A45C] px-8 py-4 text-white font-semibold hover:bg-black transition"
            >
              Continue Shopping
            </Link>

          </div>

        ) : (

          <>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">

              {wishlistItems.map((product) => (

                <WishlistCard
  key={product.id}
  product={product}
/>

              ))}

            </div>

            <div className="mt-12">

              <Link
                to="/shop"
                className="rounded-full border px-8 py-4 hover:bg-black hover:text-white transition"
              >
                ← Continue Shopping
              </Link>

            </div>

          </>

        )}

      </section>

    </div>
  );
}