import { Search } from "lucide-react";
import shopBanner from "../assets/banners/Shop-banner.png";
import logo from "../assets/logo.jpg";
import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";

fetch("http://localhost:5000/api/products")
import ProductCard from "../product/ProductCard";
import SkeletonCard from "../components/ui/SkeletonCard";
import FilterSidebar from "../components/shop/FilterSidebar";
import MobileFilterDrawer from "../components/shop/MobileFilterDrawer";
import { SlidersHorizontal } from "lucide-react";
import QuickViewModal from "../components/product/QuickViewModal";
export default function Shop() {
  const { category } = useParams();
  const [sortBy, setSortBy] = useState("default");
  const [searchTerm, setSearchTerm] = useState("");
  const [priceRange, setPriceRange] = useState(1000);
const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);
const [products, setProducts] = useState([]);
const [loading, setLoading] = useState(true);
useEffect(() => {
  const fetchProducts = async () => {
    try {
      const res = await fetch("http://localhost:5000/api/products");
      const data = await res.json();

      if (data.success) {
        setProducts(
  data.products.map((product) => ({
    ...product,
    originalPrice: product.original_price,
    bestSeller: product.best_seller,
    newArrival: product.new_arrival,
    relatedProducts: product.related_products,
  }))
);
      }
    } catch (error) {
      console.error("Error fetching products:", error);
    } finally {
      setLoading(false);
    }
  };

  fetchProducts();
}, []);
const [inStockOnly, setInStockOnly] =
  useState(false);
const [quickViewProduct, setQuickViewProduct] =
  useState(null);
const [collections, setCollections] =
  useState([]);
  const [categories, setCategories] = useState([]);

  const [activeCategory, setActiveCategory] = useState("All");
useEffect(() => {
  const fetchCategories = async () => {
    try {
      const response = await fetch(
        "http://localhost:5000/api/products/categories"
      );

      const data = await response.json();

      if (data.success) {
        setCategories(data.categories);
      }
    } catch (error) {
      console.error(error);
    }
  };

  fetchCategories();
}, []);
  useEffect(() => {
    if (category) {
      setActiveCategory(category);
    } else {
      setActiveCategory("All");
    }
  }, [category]);
if (loading) {
  return (
    <section className="px-6 py-20 text-center">
      <h2 className="text-2xl font-semibold">
        Loading Products...
      </h2>
    </section>
  );
}
const filteredProducts = [...products]
  .filter((product) => {
    // Category
    const categoryMatch =
      activeCategory.toLowerCase() === "all" ||
      product.category.toLowerCase() === activeCategory.toLowerCase();

    // Search
    const search = searchTerm.toLowerCase();

    const searchMatch =
      product.name.toLowerCase().includes(search) ||
      product.category.toLowerCase().includes(search) ||
      product.description?.toLowerCase().includes(search);

    // Price
    const priceMatch = product.price <= priceRange;

    // Availability
const stockMatch =
  !inStockOnly || product.stock > 0;

    // Collections
    let collectionMatch = true;

    if (collections.length > 0) {
      collectionMatch = false;

      if (
        collections.includes("Best Sellers") &&
        product.bestSeller
      ) {
        collectionMatch = true;
      }

      if (
        collections.includes("New Arrivals") &&
        product.newArrival
      ) {
        collectionMatch = true;
      }
    }

    return (
      categoryMatch &&
      searchMatch &&
      priceMatch &&
      stockMatch &&
      collectionMatch
    );
  })
  .sort((a, b) => {
    switch (sortBy) {
      case "price-low":
        return a.price - b.price;

      case "price-high":
        return b.price - a.price;

      case "best":
        return Number(b.bestSeller) - Number(a.bestSeller);

      case "new":
        return Number(b.newArrival) - Number(a.newArrival);

      default:
        return 0;
    }
  });
  return (
    <section className="px-6 lg:px-20 py-16">

{/* Hero Banner */}
<div className="relative h-[420px] rounded-[40px] overflow-hidden mb-16">

  {/* Background Image */}
  <img
    src={shopBanner}
    alt="Shop Banner"
    className="absolute inset-0 w-full h-full object-cover"
  />

  {/* Dark Overlay */}
  <div className="absolute inset-0 bg-black/35"></div>

  {/* Empty content for now */}
  <div className="relative z-10 flex items-center justify-center h-full"></div>

</div>

{/* ================= FILTER BAR ================= */}

<div className="mb-12">

  {/* Categories + Search */}
  <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">

    {/* Category Buttons */}
    <div className="flex flex-wrap gap-3">

      {categories.map((cat) => {

        const isActive =
          activeCategory.toLowerCase() === cat.toLowerCase();

        return (
          <Link
            key={cat}
            to={cat === "All" ? "/shop" : `/shop/${cat.toLowerCase()}`}
          >
            <button
              className={`rounded-full px-6 py-3 text-sm font-medium transition-all duration-300 ${
                isActive
                  ? "bg-[#C8A45C] text-white shadow-lg"
                  : "bg-white border border-gray-300 hover:border-[#C8A45C] hover:text-[#C8A45C]"
              }`}
            >
              {cat}
            </button>
          </Link>
        );

      })}

    </div>

    {/* Search Box */}
{/* Search + Mobile Filter */}

<div className="flex w-full lg:w-auto items-center gap-3">

  {/* Mobile Filter Button */}

  <button
    onClick={() => setMobileFiltersOpen(true)}
    className="flex items-center gap-2 rounded-full border border-gray-300 px-5 py-3 lg:hidden"
  >
    <SlidersHorizontal size={18} />
    Filters
  </button>

  {/* Search Box */}

  <div className="relative flex-1 lg:w-[340px]">

    <Search
      size={18}
      className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
    />

    <input
      type="text"
      placeholder="Search jewellery..."
      value={searchTerm}
      onChange={(e) => setSearchTerm(e.target.value)}
      className="w-full rounded-full border border-gray-300 bg-white py-3 pl-12 pr-4 outline-none transition-all duration-300 focus:border-[#C8A45C] focus:ring-2 focus:ring-[#C8A45C]/20"
    />

  </div>

</div>

  </div>

{/* Product Count + Sort */}

<div className="mt-6">

  {/* Product Count */}

  <p className="text-gray-500 font-medium mb-4">
    Showing{" "}
    <span className="font-semibold">
      {filteredProducts.length}
    </span>{" "}
    Product{filteredProducts.length !== 1 ? "s" : ""}
  </p>

  {/* Mobile + Desktop Controls */}

  <div className="flex items-center justify-between gap-4">

    {/* Mobile Filter Button */}

    <button
      onClick={() => setMobileFiltersOpen(true)}
      className="flex items-center gap-2 rounded-full border border-gray-300 px-5 py-3 lg:hidden"
    >
      <SlidersHorizontal size={18} />
      Filters
    </button>

    {/* Sort */}

    <select
      value={sortBy}
      onChange={(e) => setSortBy(e.target.value)}
      className="ml-auto rounded-full border border-gray-300 px-5 py-3 outline-none focus:border-[#C8A45C]"
    >
      <option value="default">Sort By</option>

      <option value="price-low">
        Price: Low → High
      </option>

      <option value="price-high">
        Price: High → Low
      </option>

      <option value="best">
        Best Sellers
      </option>

      <option value="new">
        New Arrivals
      </option>

    </select>

  </div>

</div>

</div>

{/* ================= PRODUCT GRID ================= */}
<div className="flex gap-10">

  <FilterSidebar
    priceRange={priceRange}
    setPriceRange={setPriceRange}
    inStockOnly={inStockOnly}
    setInStockOnly={setInStockOnly}
    collections={collections}
    setCollections={setCollections}
  />

  <div className="flex-1">
<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">

  {filteredProducts.length > 0 ? (
    filteredProducts.map((product) => (
      <ProductCard
  key={product.id}
  product={product}
  onQuickView={setQuickViewProduct}
/>
    ))
  ) : (
<div className="col-span-full py-24 text-center">

  <div className="text-6xl mb-5">
    💎
  </div>

  <h2 className="text-3xl font-serif">
    No Jewellery Found
  </h2>

  <p className="mt-4 text-gray-500">
    Try another category or clear your filters.
  </p>

  <button
    onClick={() => {
      setSearchTerm("");
      setSortBy("default");
    }}
    className="mt-8 rounded-full bg-[#C8A45C] px-8 py-4 text-white hover:bg-black transition"
  >
    Clear Filters
  </button>

</div>
  )}

      </div>
  </div>

</div>
<MobileFilterDrawer
  open={mobileFiltersOpen}
  onClose={() => setMobileFiltersOpen(false)}
  priceRange={priceRange}
  setPriceRange={setPriceRange}
  inStockOnly={inStockOnly}
  setInStockOnly={setInStockOnly}
  collections={collections}
  setCollections={setCollections}
/>
<QuickViewModal
  open={!!quickViewProduct}
  product={quickViewProduct}
  onClose={() => setQuickViewProduct(null)}
/>
    </section>
  );
}