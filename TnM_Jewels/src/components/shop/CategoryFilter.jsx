export default function CategoryFilter({
  selectedCategory,
  setSelectedCategory,
}) {
  const categories = [
    "All",
    "Rings",
    "Earrings",
    "Necklaces",
    "Pendants",
    "Bracelets",
    "Kashmiri Watches",
    "Vintage Watches",
  ];

  return (
    <div className="flex flex-wrap gap-3">

      {categories.map((category) => (

        <button
          key={category}
          onClick={() => setSelectedCategory(category)}
          className={`rounded-full border px-5 py-2 transition-all duration-300
            ${
              selectedCategory === category
                ? "bg-[#C8A45C] border-[#C8A45C] text-white shadow-lg"
                : "border-gray-300 hover:bg-[#C8A45C] hover:text-white hover:border-[#C8A45C]"
            }`}
        >
          {category}
        </button>

      ))}

    </div>
  );
}