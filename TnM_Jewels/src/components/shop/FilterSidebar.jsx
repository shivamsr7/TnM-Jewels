import { SlidersHorizontal } from "lucide-react";

export default function FilterSidebar({
  priceRange,
  setPriceRange,
  inStockOnly,
  setInStockOnly,
  collections,
  setCollections,
}) {
  return (
    <aside className="hidden lg:block w-72 rounded-3xl border border-gray-200 bg-white p-6 shadow-sm h-fit sticky top-28">

      <div className="flex items-center gap-3 mb-8">

        <SlidersHorizontal size={22} />

        <h2 className="text-xl font-semibold">
          Filters
        </h2>

      </div>

      {/* Price */}

      <div className="mb-10">

        <h3 className="font-semibold mb-4">
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

      <div className="mb-10">

        <h3 className="font-semibold mb-4">
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

        <h3 className="font-semibold mb-4">
          Collections
        </h3>

        {[
          "Best Sellers",
          "New Arrivals",
        ].map((item) => (

          <label
            key={item}
            className="flex items-center gap-3 mb-3"
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

    </aside>
  );
}