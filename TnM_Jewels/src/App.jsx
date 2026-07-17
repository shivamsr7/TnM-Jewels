import { Routes, Route,Navigate } from "react-router-dom";
import Cart from "./pages/Cart";
import AnnouncementBar from "./components/layout/AnnouncementBar";
import Navbar from "./components/layout/Navbar";
import Checkout from "./pages/Checkout";
import OrderSuccess from "./pages/OrderSuccess";
import Home from "./pages/Home";
import Shop from "./pages/Shop";
import ProductDetails from "./pages/ProductDetails";
import About from "./pages/About";
import Contact from "./pages/Contact";
import FAQ from "./pages/FAQ";
import Footer from "./components/layout/Footer";
import ShippingPolicy from "./pages/ShippingPolicy";
import ReturnRefund from "./pages/ReturnRefund";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import TermsConditions from "./pages/TermsConditions";
import Wishlist from "./pages/Wishlist";
import Dashboard from "./pages/admin/Dashboard";
import Products from "./pages/admin/Products";
import AddProduct from "./pages/admin/AddProduct";
import AdminLayout from "./layouts/AdminLayout";
import { useLocation } from "react-router-dom";
import EditProduct from "./pages/admin/EditProduct";
import Orders from "./pages/admin/Orders";
import SettingsLayout from "./pages/admin/SettingsLayout";
import GeneralSettings from "./pages/admin/settings/GeneralSettings";
import PaymentSettings from "./pages/admin/settings/PaymentSettings";
import NotificationSettings from "./pages/admin/settings/NotificationSettings";
import SEOSettings from "./pages/admin/settings/SEOSettings";
import MaintenanceSettings from "./pages/admin/settings/MaintenanceSettings";
export default function App() {
  const location = useLocation();
console.log(import.meta.env.VITE_RAZORPAY_KEY_ID);
const isAdminRoute = location.pathname.startsWith("/admin");
  return (
    <>
{!isAdminRoute && <AnnouncementBar />}
{!isAdminRoute && <Navbar />}

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/shop" element={<Shop />} />
        <Route path="/shop/:category" element={<Shop />} />
        <Route path="/product/:slug" element={<ProductDetails />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/faq" element={<FAQ />} />
        
<Route path="/admin" element={<AdminLayout />}>
<Route
  path="/admin/orders"
  element={<Orders />}
/>
  <Route index element={<Dashboard />} />

  <Route
    path="products"
    element={<Products />}
  />

  <Route
    path="products/add"
    element={<AddProduct />}
  />
  <Route
    path="products/edit/:id"
    element={<EditProduct />}
  />
<Route
  path="settings"
  element={<SettingsLayout />}
>

  <Route
    index
    element={<Navigate to="general" replace />}
  />

  <Route
    path="general"
    element={<GeneralSettings />}
  />

  <Route
    path="payments"
    element={<PaymentSettings />}
  />

  <Route
    path="notifications"
    element={<NotificationSettings />}
  />

  <Route
    path="seo"
    element={<SEOSettings />}
  />

  <Route
    path="maintenance"
    element={<MaintenanceSettings />}
  />

</Route>
</Route>
        <Route
  path="/wishlist"
  element={<Wishlist />}
/>
        <Route
  path="/terms"
  element={<TermsConditions />}
/>
        <Route
  path="/privacy-policy"
  element={<PrivacyPolicy />}
/>
        <Route
  path="/return-refund"
  element={<ReturnRefund />}
/>
        <Route
  path="/shipping-policy"
  element={<ShippingPolicy />}
/>
        <Route
  path="/cart"
  element={<Cart />}
/>
<Route
  path="/checkout"
  element={<Checkout />}
/>
<Route
  path="/order-success"
  element={<OrderSuccess />}
/>
      </Routes>
{!isAdminRoute && <Footer />}
    </>
  );
}