import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext";

export default function Cart() {
 const {
  cartItems,
  removeFromCart,
  updateQuantity,
  clearCart,
} = useCart();

  const subtotal = cartItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );
const originalTotal = cartItems.reduce(
  (total, item) =>
    total + item.originalPrice * item.quantity,
  0
);

const savings = originalTotal - subtotal;
const freeShippingLimit = 999;

const remaining = Math.max(
  0,
  freeShippingLimit - subtotal
);

const progress = Math.min(
  (subtotal / freeShippingLimit) * 100,
  100
);

  return (
    <section className="max-w-7xl mx-auto px-6 py-16">

<div className="mb-10 flex items-center justify-between">

  <h1 className="text-4xl font-serif">
    Shopping Cart
  </h1>

  {cartItems.length > 0 && (
    <button
      onClick={clearCart}
      className="rounded-full border border-red-500 px-5 py-2 text-red-500 transition hover:bg-red-500 hover:text-white"
    >
      Clear Cart
    </button>
  )}

</div>

      {cartItems.length === 0 ? (
        <div className="text-center py-20">

          <h2 className="text-2xl font-semibold">
            Your cart is empty
          </h2>

          <Link
            to="/shop"
            className="inline-block mt-8 rounded-full bg-[#C8A45C] px-8 py-4 text-white"
          >
            Continue Shopping
          </Link>

        </div>
      ) : (
        <div className="grid lg:grid-cols-3 gap-12">

          {/* Left */}
          <div className="lg:col-span-2 space-y-6">

            {cartItems.map((item) => (

              <div
                key={item.id}
                className="flex items-center gap-6 rounded-2xl border p-6"
              >

                <img
                  src={item.images[0]}
                  alt={item.name}
                  className="w-28 h-28 rounded-xl object-cover"
                />

                <div className="flex-1">

                  <h2 className="text-xl font-semibold">
                    {item.name}
                  </h2>

                  <p className="mt-2 text-[#C8A45C] font-bold">
                    ₹{item.price}
                  </p>

                  <div className="mt-4 flex items-center gap-3">

                    <button
                      onClick={() =>
                        updateQuantity(
                          item.id,
                          Math.max(1, item.quantity - 1)
                        )
                      }
                      className="h-10 w-10 rounded-full border"
                    >
                      −
                    </button>

                    <span className="text-lg">
                      {item.quantity}
                    </span>

                    <button
                      onClick={() =>
                        updateQuantity(
                          item.id,
                          Math.min(
                            item.stock,
                            item.quantity + 1
                          )
                        )
                      }
                      className="h-10 w-10 rounded-full border"
                    >
                      +
                    </button>

                  </div>

                </div>

                <div className="text-right">

                  <p className="font-bold text-xl">
                    ₹{item.price * item.quantity}
                  </p>

                  <button
                    onClick={() =>
                      removeFromCart(item.id)
                    }
                    className="mt-4 text-red-500 hover:underline"
                  >
                    Remove
                  </button>

                </div>

              </div>

            ))}

          </div>

         {/* Right */}
<div className="space-y-6">

  {/* Coupon Box */}
  <div className="rounded-3xl border p-6">

    <h3 className="text-lg font-semibold mb-4">
      Discount Code
    </h3>

    <div className="flex gap-3">

      <input
        type="text"
        placeholder="Enter coupon code"
        className="flex-1 rounded-full border px-5 py-3 outline-none focus:border-[#C8A45C]"
      />

      <button className="rounded-full bg-black px-6 text-white">
        Apply
      </button>

    </div>

  </div>

  {/* Shipping Progress */}
  <div className="rounded-3xl border p-6">

    {remaining > 0 ? (
      <>
        <p>
          Spend <strong>₹{remaining}</strong> more for FREE Shipping
        </p>

        <div className="mt-4 h-2 rounded-full bg-gray-200">

          <div
            className="h-full rounded-full bg-[#C8A45C]"
            style={{ width: `${progress}%` }}
          />

        </div>
      </>
    ) : (
      <p className="font-semibold text-green-600">
        🎉 Congratulations! You unlocked FREE Shipping.
      </p>
    )}

  </div>

  {/* Order Summary */}
  <div className="rounded-3xl border p-8 shadow-sm">

    <h2 className="text-2xl font-semibold mb-8">
      Order Summary
    </h2>

    <div className="space-y-4">

      <div className="flex justify-between">
        <span>Subtotal</span>
        <span>₹{subtotal}</span>
      </div>

      <div className="flex justify-between">
        <span>You Saved</span>
        <span className="text-green-600">
          ₹{savings}
        </span>
      </div>

      <div className="flex justify-between">
        <span>Shipping</span>
        <span className="text-green-600">
          FREE
        </span>
      </div>

    </div>

    <hr className="my-8" />

    <div className="flex justify-between text-2xl font-bold">

      <span>Total</span>

      <span>₹{subtotal}</span>

    </div>

<Link
  to="/checkout"
  className="mt-8 block w-full rounded-full bg-[#C8A45C] py-4 text-center text-white font-semibold hover:bg-black transition"
>
  Proceed to Checkout
</Link>

  </div>

</div>

        </div>
      )}

    </section>
  );
}