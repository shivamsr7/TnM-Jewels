import { useEffect } from "react";
import { Search, X } from "lucide-react";
import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { FaStar } from "react-icons/fa";
import products from "../../data/products";

export default function SearchModal({
  open,
  onClose,
}) {
  const [query, setQuery] = useState("");
  const [recentSearches, setRecentSearches] = useState(() => {
    const saved = localStorage.getItem("recentSearches");
    return saved ? JSON.parse(saved) : [];
  });
  const filteredProducts = useMemo(() => {
  if (!query.trim()) return [];

  const search = query.toLowerCase();

  return products.filter((product) => {
    return (
      product.name.toLowerCase().includes(search) ||
      product.category?.toLowerCase().includes(search) ||
      product.description?.toLowerCase().includes(search)
    );
  });
}, [query]);
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape") {
        onClose();
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () =>
      window.removeEventListener(
        "keydown",
        handleKeyDown
      );
  }, [onClose]);

  if (!open) return null;
const saveRecentSearch = (text) => {
  if (!text.trim()) return;

  const updated = [
    text,
    ...recentSearches.filter(
      (item) => item.toLowerCase() !== text.toLowerCase()
    ),
  ].slice(0, 5);

  setRecentSearches(updated);
  localStorage.setItem(
    "recentSearches",
    JSON.stringify(updated)
  );
};
  return (
    <div
      className="fixed inset-0 z-[999] bg-black/50 backdrop-blur-sm flex items-start justify-center pt-24"
      onClick={onClose}
    >
      <div
        className="w-full max-w-3xl rounded-3xl bg-white shadow-2xl overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Search */}

        <div className="flex items-center gap-4 border-b px-6 py-5">

          <Search size={22} />

<input
  autoFocus
  value={query}
  onChange={(e) => setQuery(e.target.value)}
  placeholder="Search jewellery..."
  className="flex-1 text-lg outline-none"
/>

          <button onClick={onClose}>
            <X size={22} />
          </button>

        </div>

        {/* Trending */}

<div className="max-h-[500px] overflow-y-auto">

{query === "" ? (

  <div className="p-8">

    {/* Recent Searches */}

    {recentSearches.length > 0 && (

      <div className="mb-8">

<div className="flex items-center justify-between">

  <h3 className="text-sm tracking-[4px] uppercase text-gray-500">
    Recent Searches
  </h3>

  <button
    onClick={() => {
      setRecentSearches([]);
      localStorage.removeItem("recentSearches");
    }}
    className="text-xs text-red-500 hover:underline"
  >
    Clear
  </button>

</div>

        <div className="mt-5 flex flex-wrap gap-3">

          {recentSearches.map((item) => (

            <button
              key={item}
              onClick={() => setQuery(item)}
              className="rounded-full bg-gray-100 px-4 py-2 text-sm hover:bg-[#C8A45C] hover:text-white transition"
            >
              🕒 {item}
            </button>

          ))}

        </div>

      </div>

    )}

    {/* Trending Searches */}

    <h3 className="text-sm tracking-[4px] uppercase text-gray-500">
      Trending Searches
    </h3>

    <div className="mt-6 flex flex-wrap gap-4">

      {[
        "Rings",
        "Bracelets",
        "Pendants",
        "Earrings",
        "Watches",
      ].map((item) => (

        <button
          key={item}
          onClick={() => setQuery(item)}
          className="rounded-full border px-5 py-2 hover:bg-[#C8A45C] hover:text-white transition"
        >
          {item}
        </button>

      ))}

    </div>

  </div>

) : (

    <div className="divide-y">

      {filteredProducts.length === 0 ? (

        <div className="p-10 text-center text-gray-500">
          No jewellery found.
        </div>

      ) : (

        filteredProducts.map((product) => (

          <Link
            key={product.id}
            to={`/product/${product.slug}`}
            onClick={() => {
    saveRecentSearch(product.name);
    onClose();
  }}
            className="flex items-center gap-5 p-5 hover:bg-gray-50 transition"
          >

            <img
              src={product.images?.[0]}
              alt={product.name}
              className="h-20 w-20 rounded-xl object-cover"
            />

            <div className="flex-1">

              <h3 className="font-semibold">
                {product.name}
              </h3>

              <div className="mt-2 flex items-center gap-1">

                {Array.from({
                  length: product.rating,
                }).map((_, index) => (
                  <FaStar
                    key={index}
                    className="text-[#C8A45C]"
                    size={12}
                  />
                ))}

              </div>

            </div>

            <span className="font-bold text-[#C8A45C]">
              ₹{product.price}
            </span>

          </Link>

        ))

      )}

    </div>

  )}

</div>

      </div>
    </div>
  );
}