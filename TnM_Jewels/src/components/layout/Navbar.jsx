import { useCart } from "../../context/CartContext";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import {
  Search,
  Heart,
  ShoppingBag,
  ChevronDown,
  Menu,
  X,
} from "lucide-react";

import logo from "../../assets/logo.jpg";
import Container from "../../ui/Container";
import { useWishlist } from "../../context/WishlistContext";
import SearchModal from "../search/SearchModal";
const links = [
  {
    title: "HOME",
    href: "/",
  },
  {
    title: "SHOP BY CATEGORY",
    dropdown: true,
    items: [
      { name: "Rings", href: "/shop/rings" },
      { name: "Bracelets", href: "/shop/bracelets" },
      { name: "Pendants", href: "/shop/pendants" },
      { name: "Earrings", href: "/shop/earrings" },
      { name: "View All Products", href: "/shop" },
    ],
  },
  {
    title: "NEW ARRIVALS",
    href: "/shop",
  },
  {
    title: "BEST SELLERS",
    href: "/shop",
  },
  {
    title: "ABOUT US",
    href: "/about",
  },
  {
    title: "CONTACT",
    href: "/contact",
  },
];

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
const { cartItems } = useCart();
const { wishlistItems } = useWishlist();
const cartCount = cartItems.reduce(
  (total, item) => total + item.quantity,
  0
);
const wishlistCount = wishlistItems.length;
const [searchOpen, setSearchOpen] = useState(false);
  useEffect(() => {
    const scroll = () => {
      setScrolled(window.scrollY > 30);
    };

    window.addEventListener("scroll", scroll);

    return () => window.removeEventListener("scroll", scroll);
  }, []);

  return (
    <header
      className={`sticky top-0 z-50 transition-all duration-500 ${
        scrolled
          ? "bg-white shadow-md"
          : "bg-white"
      }`}
    >
      <Container>

        <div className="flex justify-between items-center h-20">

          {/* Logo */}

          <div className="flex items-center gap-3 cursor-pointer">

            <img
              src={logo}
              alt="T&M Jewels"
              className="h-12 w-12 rounded-full object-cover"
            />

            <div>

              <h2 className="text-3xl font-serif leading-none">

                T&amp;M

              </h2>

              <p className="tracking-[6px] text-xs">

                JEWELS

              </p>

            </div>

          </div>

          {/* Desktop */}

          <nav className="hidden lg:flex gap-9 items-center">

  {links.map((link) => (

    <div
      key={link.title}
      className="relative group"
    >

      {!link.dropdown ? (

        <Link
          to={link.href}
          className="text-[13px] font-semibold tracking-wider hover:text-yellow-600 transition"
        >
          {link.title}
        </Link>

      ) : (

        <>
          <button className="flex items-center gap-1 text-[13px] font-semibold tracking-wider hover:text-yellow-600 transition">

            {link.title}

            <ChevronDown size={15} />

          </button>

          <div className="absolute left-0 top-full mt-4 w-56 rounded-xl bg-white shadow-xl border opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300">

            {link.items.map((item) => (

              <Link
                key={item.name}
                to={item.href}
                className="block px-5 py-3 hover:bg-[#C8A45C] hover:text-white transition"
              >
                {item.name}
              </Link>

            ))}

          </div>

        </>

      )}

    </div>

  ))}

</nav>

          {/* Icons */}

          <div className="hidden lg:flex items-center gap-6">

<button
  onClick={() => setSearchOpen(true)}
>

  <Search
    size={22}
    className="hover:text-yellow-600 transition"
  />

</button>

<Link
  to="/wishlist"
  className="relative"
>
  <Heart
    size={22}
    className="hover:text-yellow-600 transition"
  />

  {wishlistCount > 0 && (
    <span className="absolute -top-2 -right-2 flex h-4 w-4 items-center justify-center rounded-full bg-red-500 text-[10px] text-white">
      {wishlistCount}
    </span>
  )}
</Link>

            <Link
  to="/cart"
  className="relative"
>

              <ShoppingBag
                size={22}
                className="hover:text-yellow-600 transition"
              />

              <span className="absolute -top-2 -right-2 bg-yellow-600 text-white rounded-full text-[10px] w-4 h-4 flex items-center justify-center">

                {cartCount}

              </span>

            </Link>

          </div>

          {/* Mobile */}

          <button
            className="lg:hidden"
            onClick={() => setMobileOpen(!mobileOpen)}
          >

            {mobileOpen ? <X /> : <Menu />}

          </button>

        </div>

      </Container>

      {/* Mobile Drawer */}

      <div
        className={`lg:hidden overflow-hidden transition-all duration-500 ${
          mobileOpen
            ? "max-h-[500px]"
            : "max-h-0"
        }`}
      >

        <div className="bg-white border-t">

          <Container>

            <div className="py-5 flex flex-col gap-5">

              {links.map((link) => (

                <a
                  key={link.title}
                  href={link.href}
                  onClick={() => setMobileOpen(false)}
                  className="font-medium"
                >
                  {link.title}
                </a>

              ))}

            </div>

          </Container>

        </div>

      </div>
<SearchModal
  open={searchOpen}
  onClose={() => setSearchOpen(false)}
/>
    </header>
  );
}