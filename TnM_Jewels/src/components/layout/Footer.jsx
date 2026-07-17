import { Link } from "react-router-dom";
import {
  FaInstagram,
  FaWhatsapp,
  FaFacebookF,
  FaEnvelope,
  FaGem,
  FaShieldAlt,
  FaTruck,
  FaLock,
} from "react-icons/fa";

import {
  shopLinks,
  companyLinks,
  policyLinks,
  socialLinks,
} from "../../data/footerData";

import logo from "../../assets/logo.jpg"; // Update with your logo path

export default function Footer() {
  return (
    <footer className="bg-[#111111] text-white mt-20">

      {/* Top */}

      <div className="max-w-7xl mx-auto px-6 py-20">

        <div className="grid lg:grid-cols-5 gap-12">

          {/* Brand */}

          <div className="lg:col-span-2">

            <img
              src={logo}
              alt="T&M Jewels"
              className="h-16 w-auto"
            />

            <p className="mt-6 text-gray-400 leading-8 max-w-md">

              Discover premium-quality jewellery
              crafted for everyday elegance.

              Anti-tarnish • Affordable Luxury •
              Worldwide Shipping

            </p>

            {/* Social */}

            <div className="flex gap-5 mt-8">

              {socialLinks.map((social) => {
                const Icon = social.icon;

                return (
                  <a
                    key={social.label}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={social.label}
                    className="h-11 w-11 rounded-full border border-gray-700 flex items-center justify-center hover:bg-[#C8A45C] hover:border-[#C8A45C] transition"
                  >
                    <Icon />
                  </a>
                );
              })}

            </div>

          </div>

          {/* Shop */}

          <div>

            <h3 className="text-lg font-semibold mb-6">
              Shop
            </h3>

            <div className="space-y-4">

              {shopLinks.map((item) => (

                <Link
                  key={item.href}
                  to={item.href}
                  className="block text-gray-400 hover:text-[#C8A45C] transition"
                >
                  {item.title}
                </Link>

              ))}

            </div>

          </div>

          {/* Company */}

          <div>

            <h3 className="text-lg font-semibold mb-6">
              Company
            </h3>

            <div className="space-y-4">

              {companyLinks.map((item) => (

                <Link
                  key={item.href}
                  to={item.href}
                  className="block text-gray-400 hover:text-[#C8A45C] transition"
                >
                  {item.title}
                </Link>

              ))}

            </div>

          </div>

          {/* Policies */}

          <div>

            <h3 className="text-lg font-semibold mb-6">
              Policies
            </h3>

            <div className="space-y-4">

              {policyLinks.map((item) => (

                <Link
                  key={item.href}
                  to={item.href}
                  className="block text-gray-400 hover:text-[#C8A45C] transition"
                >
                  {item.title}
                </Link>

              ))}

            </div>

          </div>

        </div>
</div>

{/* Trust Strip */}

<div className="mt-20 rounded-3xl bg-[#1A1A1A] p-8">

  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">

    <div className="flex items-center gap-4">

      <div className="w-14 h-14 rounded-full bg-[#C8A45C]/10 flex items-center justify-center">
        <FaGem className="text-[#C8A45C] text-2xl" />
      </div>

      <div>
        <h4 className="font-semibold">Premium Quality</h4>
        <p className="text-gray-400 text-sm">
          Carefully curated jewellery
        </p>
      </div>

    </div>

    <div className="flex items-center gap-4">

      <div className="w-14 h-14 rounded-full bg-[#C8A45C]/10 flex items-center justify-center">
        <FaShieldAlt className="text-[#C8A45C] text-2xl" />
      </div>

      <div>
        <h4 className="font-semibold">Anti Tarnish</h4>
        <p className="text-gray-400 text-sm">
          Everyday shine that lasts
        </p>
      </div>

    </div>

    <div className="flex items-center gap-4">

      <div className="w-14 h-14 rounded-full bg-[#C8A45C]/10 flex items-center justify-center">
        <FaTruck className="text-[#C8A45C] text-2xl" />
      </div>

      <div>
        <h4 className="font-semibold">Fast Shipping</h4>
        <p className="text-gray-400 text-sm">
          Across India
        </p>
      </div>

    </div>

    <div className="flex items-center gap-4">

      <div className="w-14 h-14 rounded-full bg-[#C8A45C]/10 flex items-center justify-center">
        <FaLock className="text-[#C8A45C] text-2xl" />
      </div>

      <div>
        <h4 className="font-semibold">Secure Payments</h4>
        <p className="text-gray-400 text-sm">
          Safe & trusted checkout
        </p>
      </div>

    </div>

  </div>

{/* Newsletter */}
        

        {/* Newsletter */}

<div className="border-t border-gray-800 mt-20 pt-16">

  <div className="grid lg:grid-cols-2 gap-10 items-center">

    {/* Left */}

    <div>

      <h2 className="text-4xl font-serif text-white">
        Join Our Community
      </h2>

      <p className="mt-4 text-gray-400 leading-7">
        Subscribe to receive exclusive offers,
        new arrivals, styling inspiration and
        members-only updates.
      </p>

    </div>

    {/* Right */}

    <div>

      <form className="flex items-center bg-white rounded-full overflow-hidden shadow-[0_10px_40px_rgba(200,164,92,0.18)] border border-[#C8A45C]/20">

        {/* Icon */}

        <div className="px-6 text-gray-500">
          <FaEnvelope size={18} />
        </div>

        {/* Input */}

        <input
          type="email"
          placeholder="Enter your email"
          className="flex-1 py-5 bg-white text-gray-800 placeholder:text-gray-400 outline-none"
        />

        {/* Button */}

<button
  type="submit"
  className="bg-[#C8A45C] hover:bg-black px-10 py-5 text-white font-semibold transition-all duration-300"
>
  Subscribe
</button>

      </form>

    </div>

  </div>

</div>
</div>

      {/* Bottom */}

      <div className="border-t border-gray-800">

        <div className="max-w-7xl mx-auto px-6 py-6 flex flex-col md:flex-row justify-between items-center gap-4">

          <p className="text-gray-500 text-sm">

            © {new Date().getFullYear()} T&M Jewels.
            All Rights Reserved.

          </p>

          <p className="text-gray-500 text-sm">

            Crafted with ❤️ for jewellery lovers.

          </p>

        </div>

      </div>

    </footer>
  );
}