import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { FaEdit, FaTrash } from "react-icons/fa";
import toast from "react-hot-toast";
import DeleteModal from "../../components/admin/DeleteModal";
import api from "../../services/apiClient";
export default function Products() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
const [search, setSearch] = useState("");
const [category, setCategory] = useState("All");
const [sortBy, setSortBy] = useState("newest");
const [categories, setCategories] = useState(["All"]);
const [deleteModal, setDeleteModal] = useState(false);

const [selectedProduct, setSelectedProduct] = useState(null);
  useEffect(() => {
    fetchProducts();
  }, []);

const fetchProducts = async () => {
  try {
const { data } = await api.get("/api/products");

    if (data.success) {
      setProducts(data.products);

      const uniqueCategories = [
        "All",
        ...new Set(data.products.map((p) => p.category)),
      ];

      setCategories(uniqueCategories);
    }
  } catch (err) {
    console.error(err);
  } finally {
    setLoading(false);
  }
};
const filteredProducts = [...products]
  .filter((product) => {
    const searchMatch =
      product.name.toLowerCase().includes(search.toLowerCase()) ||
      product.category.toLowerCase().includes(search.toLowerCase());

    const categoryMatch =
      category === "All" || product.category === category;

    return searchMatch && categoryMatch;
  })
  .sort((a, b) => {
    switch (sortBy) {
      case "priceLow":
        return a.price - b.price;

      case "priceHigh":
        return b.price - a.price;

      case "stock":
        return b.stock - a.stock;

      case "name":
        return a.name.localeCompare(b.name);

      default:
        return 0;
    }
  });
const deleteProduct = async () => {
  if (!selectedProduct) return;

  try {
const { data } = await api.delete(
  `/api/products/${selectedProduct.id}`
);

    if (data.success) {
      toast.success("Product deleted successfully");

      setProducts((prev) =>
        prev.filter((product) => product.id !== selectedProduct.id)
      );

      setDeleteModal(false);
      setSelectedProduct(null);
    } else {
      toast.error(data.message);
    }
  } catch (err) {
    console.error(err);
    toast.error("Unable to delete product.");
  }
};
  if (loading) {
    return <h2 className="text-xl">Loading...</h2>;
  }

  return (
    <div>
<div className="mb-8 flex flex-wrap items-center justify-between gap-4">

  <div>

    <h1 className="text-4xl font-bold">
      Products
    </h1>

    <p className="mt-1 text-gray-500">
      {products.length} Products
    </p>

  </div>

  <div className="flex flex-wrap items-center gap-3">

    <input
      type="text"
      placeholder="Search products..."
      value={search}
      onChange={(e) => setSearch(e.target.value)}
      className="rounded-xl border px-4 py-2 w-64"
    />

    <select
      value={category}
      onChange={(e) => setCategory(e.target.value)}
      className="rounded-xl border px-4 py-2"
    >
      {categories.map((cat) => (
        <option
          key={cat}
          value={cat}
        >
          {cat}
        </option>
      ))}
    </select>

    <select
      value={sortBy}
      onChange={(e) => setSortBy(e.target.value)}
      className="rounded-xl border px-4 py-2"
    >
      <option value="newest">Newest</option>
      <option value="priceLow">Price ↑</option>
      <option value="priceHigh">Price ↓</option>
      <option value="stock">Stock</option>
      <option value="name">Name</option>
    </select>

    <Link
      to="/admin/products/add"
      className="rounded-xl bg-[#C8A45C] px-5 py-2 font-semibold text-white hover:bg-black"
    >
      + Add Product
    </Link>

  </div>

</div>

      <div className="overflow-hidden rounded-2xl bg-white shadow">

        <table className="w-full">

          <thead className="bg-gray-100">
  <tr>
    <th className="p-4 text-left">Image</th>
    <th className="p-4 text-left">Product</th>
    <th className="p-4 text-left">Category</th>
    <th className="p-4 text-left">Price</th>
    <th className="p-4 text-left">Stock</th>
    <th className="p-4 text-left">Rating</th>
    <th className="p-4 text-center">Actions</th>
  </tr>
</thead>

          <tbody>
  {filteredProducts.map((product) => (
    <tr
      key={product.id}
      className="border-t hover:bg-gray-50 transition"
    >
      {/* IMAGE */}
      <td className="p-4">
        <img
          src={product.images?.[0]}
          alt={product.name}
          className="h-20 w-20 rounded-xl object-cover border"
        />
      </td>

      {/* PRODUCT */}
      <td className="p-4">
        <h3 className="font-semibold">
          {product.name}
        </h3>

        <p className="text-sm text-gray-500 mt-1">
          {product.slug}
        </p>

        {product.badge && (
          <span
            className={`mt-2 inline-block rounded-full px-3 py-1 text-xs font-semibold text-white
              ${
                product.badge === "NEW"
                  ? "bg-green-500"
                  : product.badge === "BEST"
                  ? "bg-blue-500"
                  : "bg-orange-500"
              }`}
          >
            {product.badge}
          </span>
        )}
      </td>

      {/* CATEGORY */}
      <td className="p-4">
        {product.category}
      </td>

      {/* PRICE */}
      <td className="p-4">
        <p className="font-semibold">
          ₹{product.price}
        </p>

        <p className="text-sm text-gray-400 line-through">
          ₹{product.original_price}
        </p>
      </td>

      {/* STOCK */}
      <td className="p-4">
        <span
          className={`rounded-full px-3 py-1 text-xs font-semibold
            ${
              product.stock > 0
                ? "bg-green-100 text-green-700"
                : "bg-red-100 text-red-700"
            }`}
        >
          {product.stock > 0
            ? `In Stock (${product.stock})`
            : "Out of Stock"}
        </span>
      </td>

      {/* RATING */}
      <td className="p-4">
        ⭐ {product.rating}
      </td>

      {/* ACTIONS */}
      <td className="p-4">
        <div className="flex justify-center gap-4">

          <Link
            to={`/admin/products/edit/${product.id}`}
            className="text-blue-600 hover:text-blue-800"
          >
            <FaEdit />
          </Link>

<button
  onClick={() => {
    setSelectedProduct(product);
    setDeleteModal(true);
  }}
  className="text-red-600 hover:text-red-800"
>
  <FaTrash />
</button>

        </div>
      </td>
    </tr>
  ))}
</tbody>

        </table>

      </div>
<DeleteModal
  isOpen={deleteModal}
  productName={selectedProduct?.name}
  onClose={() => {
    setDeleteModal(false);
    setSelectedProduct(null);
  }}
  onConfirm={deleteProduct}
/>
    </div>
  );
}