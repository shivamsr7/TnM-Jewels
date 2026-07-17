import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useCart } from "../context/CartContext";
import toast from "react-hot-toast";
import FormInput from "../components/ui/FormInput";
import FormSelect from "../components/ui/FormSelect";
import { getPaymentSettings } from "../services/paymentSettingsService";
import {
  createRazorpayOrder,
  verifyPayment,
} from "../services/paymentService";
import api from "../services/apiClient"; // adjust the path to your file
export default function Checkout() {
    const indianStates = [
  "Andhra Pradesh",
  "Arunachal Pradesh",
  "Assam",
  "Bihar",
  "Chhattisgarh",
  "Delhi",
  "Goa",
  "Gujarat",
  "Haryana",
  "Himachal Pradesh",
  "Jharkhand",
  "Karnataka",
  "Kerala",
  "Madhya Pradesh",
  "Maharashtra",
  "Manipur",
  "Meghalaya",
  "Mizoram",
  "Nagaland",
  "Odisha",
  "Punjab",
  "Rajasthan",
  "Sikkim",
  "Tamil Nadu",
  "Telangana",
  "Tripura",
  "Uttar Pradesh",
  "Uttarakhand",
  "West Bengal",
  "Andaman and Nicobar Islands",
  "Chandigarh",
  "Dadra and Nagar Haveli and Daman and Diu",
  "Jammu and Kashmir",
  "Ladakh",
  "Lakshadweep",
  "Puducherry",
];
  const { cartItems, clearCart } = useCart();
const navigate = useNavigate();
const [coupon, setCoupon] = useState("");
const [giftWrap, setGiftWrap] = useState(false);
const [orderNotes, setOrderNotes] = useState("");
const [errors, setErrors] = useState({});
const [processingPayment, setProcessingPayment] = useState(false);
  const subtotal = cartItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );
const [shippingCharge, setShippingCharge] = useState(0);
const [shippingZone, setShippingZone] = useState("");
const [loadingShipping, setLoadingShipping] = useState(false);
const [freeShippingAbove, setFreeShippingAbove] = useState(null);
const [estimatedDelivery, setEstimatedDelivery] = useState("");
const [paymentSettings, setPaymentSettings] = useState(null);
const [loadingPaymentSettings, setLoadingPaymentSettings] = useState(true);
const giftWrapCharge = giftWrap ? 49 : 0;

const total = subtotal + shippingCharge + giftWrapCharge;

const totalSavings = cartItems.reduce(
  (total, item) =>
    total +
    ((item.original_price || item.originalPrice || item.price) - item.price) *
      item.quantity,
  0
);
const [formData, setFormData] = useState(() => {
  const saved = localStorage.getItem("checkoutForm");

  return saved
    ? JSON.parse(saved)
    : {
        fullName: "",
        phone: "",
        email: "",
        address: "",
        apartment: "",
        city: "",
        state: "",
        pincode: "",
        payment: "cod",
      };
});

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };
const calculateShipping = async (pincode) => {
  if (pincode.length !== 6) {
    setShippingCharge(0);
    setShippingZone("");
    return;
  }

  try {
    setLoadingShipping(true);

const { data } = await api.post("/api/shipping/calculate", {
  pincode,
  subtotal,
});

if (data.success) {
  setShippingCharge(data.shippingCharge);
  setShippingZone(data.zone);
  setFreeShippingAbove(data.freeShippingAbove);
  setEstimatedDelivery(data.estimatedDelivery);
}

  } catch (err) {

    console.error(err);

  } finally {

    setLoadingShipping(false);

  }
};
const validateForm = () => {
  const newErrors = {};

  if (!formData.fullName.trim()) {
    newErrors.fullName = "Full name is required.";
  }

  if (!/^[6-9]\d{9}$/.test(formData.phone)) {
    newErrors.phone = "Enter a valid 10-digit mobile number.";
  }

  if (
    formData.email &&
    !/^\S+@\S+\.\S+$/.test(formData.email)
  ) {
    newErrors.email = "Enter a valid email.";
  }

  if (!formData.address.trim()) {
    newErrors.address = "Address is required.";
  }

  if (!formData.city.trim()) {
    newErrors.city = "City is required.";
  }

  if (!formData.state.trim()) {
    newErrors.state = "Please select a state.";
  }

  if (!/^\d{6}$/.test(formData.pincode)) {
    newErrors.pincode = "Enter a valid 6-digit pincode.";
  }

  setErrors(newErrors);

  return Object.keys(newErrors).length === 0;
};

const handleRazorpayPayment = async () => {
  try {
    const order = await createRazorpayOrder(total);

    const options = {
      key: import.meta.env.VITE_RAZORPAY_KEY_ID,

      amount: order.amount,

      currency: order.currency,

      name: "T&M Jewels",

      description: "Jewellery Purchase",

      order_id: order.id,

      prefill: {
        name: formData.fullName,
        email: formData.email,
        contact: formData.phone,
      },

      theme: {
        color: "#C8A45C",
      },

handler: async function (response) {

  try {

    await verifyPayment(response);

    toast.success("Payment Verified!");

    console.log(response);
console.log("Payment ID:", response.razorpay_payment_id);

    const data = await createWebsiteOrder({
  paymentMethod: "Razorpay",
  paymentStatus: "Paid",
  paymentId: response.razorpay_payment_id,
});

if (!data.success) {
  toast.error(data.message);
  return;
}

toast.success("Order placed successfully!");

clearCart();

localStorage.removeItem("checkoutForm");

navigate("/order-success", {
  state: {
    order: data.order,
  },
});

  } catch (err) {

    console.error(err);

    toast.error("Payment verification failed.");

  }

},

    };

    const razorpay = new window.Razorpay(options);

    razorpay.open();

  } catch (err) {
    console.error(err);

    toast.error("Unable to start payment.");
  }
};

const createWebsiteOrder = async ({
  paymentMethod,
  paymentStatus,
  paymentId = null,
}) => {
const { data } = await api.post("/api/orders", {
  customer_name: formData.fullName,
  customer_email: formData.email,
  customer_phone: formData.phone,
  shipping_address:
    formData.address +
    (formData.apartment ? ", " + formData.apartment : ""),
  city: formData.city,
  state: formData.state,
  pincode: formData.pincode,

  subtotal,
  shipping_charge: shippingCharge,
  total,

  payment_method: paymentMethod,
  payment_status: paymentStatus,
  payment_id: paymentId,

  order_notes: orderNotes,
  gift_wrap: giftWrap,
  coupon_code: coupon || null,

  items: cartItems.map((item) => ({
    product_id: item.id,
    product_name: item.name,
    image: item.images?.[0],
    price: item.price,
    quantity: item.quantity,
  })),
});

return data;
};
const handlePlaceOrder = async () => {
if (!validateForm()) {
  toast.error("Please fix the highlighted fields.");
  return;
}
if (!paymentSettings) {
  toast.error("Payment settings are still loading.");
  return;
}

if (
  formData.payment === "cod" &&
  !paymentSettings.cod_enabled
) {
  toast.error("Cash on Delivery is currently unavailable.");
  return;
}

if (
  formData.payment === "cod" &&
  total < paymentSettings.minimum_cod_order
) {
  toast.error(
    `COD is available only for orders above ₹${paymentSettings.minimum_cod_order}.`
  );
  return;
}

if (
  formData.payment === "cod" &&
  total > paymentSettings.maximum_cod_order
) {
  toast.error(
    `COD is available only up to ₹${paymentSettings.maximum_cod_order}.`
  );
  return;
}
try {

  const data = await createWebsiteOrder({
  paymentMethod: "Razorpay",
  paymentStatus: "Paid",
  paymentId: response.razorpay_payment_id,
});

  if (!data.success) {
    toast.error(data.message);
    return;
  }

  toast.success("Order placed successfully!");

  clearCart();

  localStorage.removeItem("checkoutForm");

  navigate("/order-success", {
    state: {
      order: data.order,
    },
  });
} catch (err) {
  console.error(err);
  toast.error("Unable to place order.");
}
};

  // Razorpay integration will go here later.
useEffect(() => {
  localStorage.setItem(
    "checkoutForm",
    JSON.stringify(formData)
  );
}, [formData]);
useEffect(() => {
  if (formData.pincode.length === 6) {
    calculateShipping(formData.pincode);
  }
}, [subtotal, formData.pincode]);
useEffect(() => {
  const loadPaymentSettings = async () => {
    try {
      const settings = await getPaymentSettings();
      setPaymentSettings(settings);
    } catch (err) {
      console.error(err);
    } finally {
      setLoadingPaymentSettings(false);
    }
  };

  loadPaymentSettings();
}, []);

console.log(paymentSettings);
if (cartItems.length === 0) {
  return (
    <section className="max-w-4xl mx-auto px-6 py-24 text-center">

      <h1 className="text-4xl font-serif mb-6">
        Your Cart is Empty
      </h1>

      <p className="text-gray-500 mb-10">
        Add some beautiful jewellery before proceeding to checkout.
      </p>

      <Link
        to="/shop"
        className="inline-block rounded-full bg-[#C8A45C] px-8 py-4 text-white font-semibold hover:bg-black transition"
      >
        Continue Shopping
      </Link>

    </section>
  );
}
  return (
    <section className="max-w-7xl mx-auto px-6 py-16">

      <h1 className="text-4xl font-serif mb-12">
        Checkout
      </h1>
<div className="mb-12 flex items-center justify-center">

  <div className="flex items-center gap-3">

    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-green-500 font-semibold text-white">
      ✓
    </div>

    <span className="font-medium">
      Cart
    </span>

    <div className="h-1 w-20 bg-[#C8A45C]" />

    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#C8A45C] font-semibold text-white">
      2
    </div>

    <span className="font-medium">
      Checkout
    </span>

    <div className="h-1 w-20 bg-gray-300" />

    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gray-300 font-semibold">
      3
    </div>

    <span className="text-gray-500">
      Success
    </span>

  </div>

</div>
      <div className="grid lg:grid-cols-3 gap-12">

        {/* Left Side */}

        <div className="lg:col-span-2">

          <div className="rounded-3xl bg-white p-8 shadow-lg">

            <h2 className="text-2xl font-semibold mb-8">
              Shipping Information
            </h2>

            <div className="grid md:grid-cols-2 gap-6">

<FormInput
  label="Full Name"
  name="fullName"
  value={formData.fullName}
  onChange={handleChange}
  error={errors.fullName}
  required
/>

<FormInput
  label="Phone Number"
  name="phone"
  value={formData.phone}
  onChange={handleChange}
  error={errors.phone}
  type="tel"
  required
/>

<FormInput
  label="Email Address"
  name="email"
  value={formData.email}
  onChange={handleChange}
  error={errors.email}
  type="email"
/>

<FormInput
  label="City"
  name="city"
  value={formData.city}
  onChange={handleChange}
  error={errors.city}
  required
/>

<FormSelect
  label="State"
  name="state"
  value={formData.state}
  onChange={handleChange}
  options={indianStates}
  error={errors.state}
  required
/>

<FormInput
  label="Pincode"
  name="pincode"
  value={formData.pincode}
  onChange={(e) => {
    handleChange(e);

    if (e.target.value.length === 6) {
      calculateShipping(e.target.value);
    }
  }}
  error={errors.pincode}
  required
/>
{shippingZone && (
  <p className="mt-2 text-sm text-green-600">
    Shipping Zone: <strong>{shippingZone}</strong>
  </p>
)}

            </div>

            <textarea
              name="address"
              placeholder="Complete Address"
              value={formData.address}
              onChange={handleChange}
              rows={4}
              className="mt-6 w-full rounded-2xl border border-gray-300 p-4 outline-none transition-all duration-200 focus:border-[#C8A45C] focus:ring-4 focus:ring-[#C8A45C]/20"
            />

<FormInput
  label="Apartment / Landmark"
  name="apartment"
  value={formData.apartment}
  onChange={handleChange}
/>

            <h2 className="text-2xl font-semibold mt-10 mb-5">
  Payment Method
</h2>

{loadingPaymentSettings ? (

  <p className="text-gray-500">
    Loading payment methods...
  </p>

) : (

  <div className="space-y-4">

    {paymentSettings?.cod_enabled && (

      <label className="flex items-center gap-3">

        <input
          type="radio"
          name="payment"
          value="cod"
          checked={formData.payment === "cod"}
          onChange={handleChange}
        />

        Cash on Delivery

      </label>

    )}

    {paymentSettings?.razorpay_enabled && (

      <label className="flex items-center gap-3">

        <input
          type="radio"
          name="payment"
          value="razorpay"
          checked={formData.payment === "razorpay"}
          onChange={handleChange}
        />

        Pay Online (Razorpay)

      </label>

    )}

    {!paymentSettings?.cod_enabled &&
      !paymentSettings?.razorpay_enabled && (

      <div className="rounded-xl bg-red-50 p-4 text-red-600">
        No payment methods are currently available.
      </div>

    )}

  </div>

)}

          </div>

        </div>

        {/* Right Side */}

        <div className="rounded-3xl border p-8 h-fit sticky top-28">

          <h2 className="text-2xl font-semibold mb-8">
            Order Summary
          </h2>
{shippingCharge > 0 && (
  <div className="mb-6 rounded-2xl bg-orange-50 p-4">

    <div className="flex justify-between text-sm">

      <span>
        Add ₹
{Math.max(
  0,
  (freeShippingAbove || 0) - subtotal
)}

<strong> more for FREE Shipping</strong>
      </span>

    </div>

    <div className="mt-3 h-2 overflow-hidden rounded-full bg-orange-200">

      <div
        className="h-full rounded-full bg-[#C8A45C]"
        style={{
          width: `${Math.min(
  (subtotal / (freeShippingAbove || 1499)) * 100,
  100
)}%`,
        }}
      />

    </div>

  </div>
)}
          <div className="space-y-5">

            {cartItems.map((item) => (

  <div
    key={item.id}
    className="flex gap-4 border-b pb-5"
  >

    <img
      src={item.images?.[0]}
      alt={item.name}
      className="h-20 w-20 rounded-xl object-cover"
    />

    <div className="flex-1">

      <h3 className="font-semibold">
        {item.name}
      </h3>

      <p className="mt-1 text-sm text-gray-500">
        Qty: {item.quantity}
      </p>

      <p className="text-sm text-gray-500">
        ₹{item.price} each
      </p>

    </div>

    <div className="font-semibold">
      ₹{item.price * item.quantity}
    </div>

  </div>

))}

          </div>

          <hr className="my-8" />

<div className="space-y-3">

  <div className="flex justify-between">

    <span>Subtotal</span>

    <span>₹{subtotal}</span>

  </div>



  <div className="flex justify-between">

    <span>Shipping</span>

    <span>
      {loadingShipping ? (
  <span className="text-gray-500">
    Calculating...
  </span>
) : shippingCharge === 0 ? (
  <span className="font-semibold text-green-600">
    FREE
  </span>
) : (
  `₹${shippingCharge}`
)}
    </span>

  </div>

  <div className="flex justify-between">

    <span>Discount</span>

    <span>₹0</span>

  </div>
<div className="flex justify-between">
  <span>Gift Wrap</span>

  <span>
    {giftWrap ? "₹49" : "₹0"}
  </span>
</div>
  <hr />
{totalSavings > 0 && (
  <div className="flex justify-between text-green-600 font-medium">

    <span>You Saved</span>

    <span>₹{totalSavings}</span>

  </div>
)}
  <div className="flex justify-between text-2xl font-bold">

    <span>Total</span>

    <span>
      ₹{total}
    </span>

  </div>

</div>
<div className="mt-8">

  <h3 className="mb-3 font-semibold">
    Have a Coupon?
  </h3>

  <div className="flex gap-3">

    <input
      value={coupon}
      onChange={(e) => setCoupon(e.target.value)}
      placeholder="Enter coupon code"
      className="flex-1 rounded-xl border p-3 outline-none focus:border-[#C8A45C]"
    />

    <button
      type="button"
      className="rounded-xl bg-[#C8A45C] px-6 text-white hover:bg-black"
    >
      Apply
    </button>

  </div>

</div>
<div className="mt-8 rounded-2xl border p-5">

  <label className="flex cursor-pointer items-center justify-between">

    <div>

      <h3 className="font-semibold">
        🎁 Gift Wrap
      </h3>

      <p className="text-sm text-gray-500">
        Premium gift packaging (+₹49)
      </p>

    </div>

    <input
      type="checkbox"
      checked={giftWrap}
      onChange={() => setGiftWrap(!giftWrap)}
      className="h-5 w-5 accent-[#C8A45C]"
    />

  </label>

</div>
<div className="mt-8 rounded-2xl border p-5">

  <h3 className="mb-3 text-lg font-semibold">
    📝 Order Notes
  </h3>

  <textarea
    rows={4}
    value={orderNotes}
    onChange={(e) => setOrderNotes(e.target.value)}
    placeholder="Gift message, landmark, delivery instructions, call before delivery..."
    className="w-full rounded-xl border p-4 outline-none transition focus:border-[#C8A45C]"
  />

  <p className="mt-2 text-sm text-gray-500">
    Optional — We'll do our best to follow your instructions.
  </p>

</div>
<button
  onClick={handleRazorpayPayment}
  disabled={processingPayment}
  className={`mt-8 w-full rounded-full py-4 font-semibold text-white transition ${
    processingPayment
      ? "cursor-not-allowed bg-gray-400"
      : "bg-[#C8A45C] hover:bg-black"
  }`}
>
  {processingPayment ? "Processing..." : "Place Order"}
</button>
<div className="mt-8 rounded-2xl bg-[#FFF9F0] p-5">

  <h3 className="font-semibold">
    🚚 Shipping Information
  </h3>

  {shippingZone ? (

    <>

      <p className="mt-4">
        <strong>Zone:</strong> {shippingZone}
      </p>

      <p className="mt-2">
        <strong>Estimated Delivery:</strong>{" "}
        {estimatedDelivery}
      </p>

      <p className="mt-2">
        <strong>Free Shipping Above:</strong>{" "}
        ₹{freeShippingAbove}
      </p>

    </>

  ) : (

    <p className="mt-3 text-gray-500">
      Enter your pincode to check shipping details.
    </p>

  )}

</div>


<div className="mt-6 rounded-2xl border p-5">

  <h3 className="mb-4 font-semibold">
    Why Shop With Us?
  </h3>

  <ul className="space-y-2 text-sm text-gray-600">

    <li>✨ Premium Quality Jewellery</li>

    <li>🛡 Anti Tarnish Finish</li>

    <li>🚚 Pan India Shipping</li>

    <li>💬 WhatsApp Support</li>

  </ul>

</div>



        </div>

      </div>

    </section>
  );
}