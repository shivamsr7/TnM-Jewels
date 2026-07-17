import { X } from "lucide-react";

export default function MobileFilterDrawer({
  open,
  onClose,
  priceRange,
  setPriceRange,
  inStockOnly,
  setInStockOnly,
  collections,
  setCollections,
}) {
  return (
    <div
      className={`fixed inset-0 z-[999] transition ${
        open ? "visible" : "invisible"
      }`}
    >
      {/* Overlay */}

      <div
        onClick={onClose}
        className={`absolute inset-0 bg-black/40 transition-opacity ${
          open ? "opacity-100" : "opacity-0"
        }`}
      />

      {/* Drawer */}

      <div
        className={`absolute left-0 top-0 h-full w-80 max-w-[90%] bg-white shadow-2xl transition-transform duration-300 ${
          open ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex items-center justify-between border-b p-6">

          <h2 className="text-2xl font-semibold">
            Filters
          </h2>

          <button onClick={onClose}>
            <X size={24} />
          </button>

        </div>

        <div className="space-y-8 p-6">

          {/* Price */}

          <div>

            <h3 className="mb-4 font-semibold">
              Price
            </h3>

            <input
              type="range"
              min="100"
              max="1000"
              step="50"
              value={priceRange}
              onChange={(e) =>
                setPriceRange(Number(e.target.value))
              }
              className="w-full accent-[#C8A45C]"
            />

            <p className="mt-2 text-gray-500">
              Up to ₹{priceRange}
            </p>

          </div>

          {/* Availability */}

          <div>

            <h3 className="mb-4 font-semibold">
              Availability
            </h3>

            <label className="flex items-center gap-3">

              <input
                type="checkbox"
                checked={inStockOnly}
                onChange={(e) =>
                  setInStockOnly(e.target.checked)
                }
              />

              In Stock Only

            </label>

          </div>

          {/* Collections */}

          <div>

            <h3 className="mb-4 font-semibold">
              Collections
            </h3>

            {[
              "Best Sellers",
              "New Arrivals",
            ].map((item) => (

              <label
                key={item}
                className="mb-3 flex items-center gap-3"
              >

                <input
                  type="checkbox"
                  checked={collections.includes(item)}
                  onChange={() =>
                    setCollections((prev) =>
                      prev.includes(item)
                        ? prev.filter((i) => i !== item)
                        : [...prev, item]
                    )
                  }
                />

                {item}

              </label>

            ))}

          </div>

          <button
            onClick={onClose}
            className="w-full rounded-full bg-[#C8A45C] py-4 font-semibold text-white hover:bg-black transition"
          >
            Apply Filters
          </button>

        </div>
      </div>
    </div>
  );
}