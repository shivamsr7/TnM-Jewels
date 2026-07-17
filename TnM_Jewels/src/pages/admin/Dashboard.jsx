import { useEffect, useState } from "react";
import {
  FaBoxOpen,
  FaCheckCircle,
  FaTimesCircle,
  FaStar,
  FaPlus,
} from "react-icons/fa";
import { Link } from "react-router-dom";
import { FaExclamationTriangle } from "react-icons/fa";
import CategoryChart from "../../components/admin/CategoryChart";
import StockChart from "../../components/admin/StockChart";
import RecentOrders from "../../components/admin/RecentOrders";
export default function Dashboard() {
  const [stats, setStats] = useState(null);
  const [latestProducts, setLatestProducts] = useState([]);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDashboard();
  }, []);

  const fetchDashboard = async () => {
    
    try {
      const res = await fetch(
        "http://localhost:5000/api/products/dashboard/stats"
      );

      const data = await res.json();

      if (data.success) {
        setStats(data.stats);
        setLatestProducts(data.latestProducts);
        setProducts(data.products);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <h2>Loading...</h2>;

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-4xl font-bold">Dashboard</h1>

        <p className="mt-2 text-gray-500">
          Welcome to T&M Jewels Admin
        </p>
      </div>

      {/* Stats Cards */}

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">

        <StatCard
          icon={<FaBoxOpen />}
          title="Products"
          value={stats.totalProducts}
          color="bg-blue-500"
        />

        <StatCard
          icon={<FaCheckCircle />}
          title="In Stock"
          value={stats.inStock}
          color="bg-green-500"
        />

        <StatCard
          icon={<FaTimesCircle />}
          title="Out of Stock"
          value={stats.outOfStock}
          color="bg-red-500"
        />

        <StatCard
          icon={<FaStar />}
          title="Best Sellers"
          value={stats.bestSellers}
          color="bg-yellow-500"
        />
<StatCard icon={<FaExclamationTriangle />} title="Low Stock" value={stats.lowStock} color="bg-orange-500" />
      </div>
<div className="grid gap-6 lg:grid-cols-2">

  <CategoryChart products={products} />

  <StockChart stats={stats} />

</div>

<RecentOrders />
      {/* Latest Products */}

      <div className="rounded-2xl bg-white shadow">

        <div className="border-b p-6">

          <h2 className="text-2xl font-bold">
            Latest Products
          </h2>

        </div>

        <div>

          {latestProducts.map((product) => (

            <div
              key={product.id}
              className="flex items-center justify-between border-b p-5 last:border-none"
            >

              <div className="flex items-center gap-4">

                <img
                  src={product.images?.[0]}
                  alt={product.name}
                  className="h-16 w-16 rounded-xl object-cover"
                />

                <div>

                  <h3 className="font-semibold">
                    {product.name}
                  </h3>

                  <p className="text-sm text-gray-500">
                    {product.category}
                  </p>

                </div>

              </div>

              <div className="text-right">

                <p className="font-semibold">
                  ₹{product.price}
                </p>

                <p className="text-sm text-gray-500">
                  Stock: {product.stock}
                </p>

              </div>

            </div>

          ))}

        </div>

      </div>

      {/* Quick Actions */}

      <div className="rounded-2xl bg-white p-6 shadow">

        <h2 className="mb-5 text-2xl font-bold">
          Quick Actions
        </h2>

        <div className="flex flex-wrap gap-4">

          <Link
            to="/admin/products/add"
            className="rounded-xl bg-[#C8A45C] px-6 py-3 font-semibold text-white hover:bg-black"
          >
            <FaPlus className="mr-2 inline" />
            Add Product
          </Link>

          <Link
            to="/admin/products"
            className="rounded-xl border px-6 py-3 font-semibold hover:bg-gray-100"
          >
            Manage Products
          </Link>

          <Link
            to="/shop"
            className="rounded-xl border px-6 py-3 font-semibold hover:bg-gray-100"
          >
            View Store
          </Link>

        </div>

      </div>

    </div>
  );
}

function StatCard({ icon, title, value, color }) {
  return (
    <div className="rounded-2xl bg-white p-6 shadow transition hover:-translate-y-1 hover:shadow-lg">

      <div
        className={`mb-4 flex h-14 w-14 items-center justify-center rounded-xl text-2xl text-white ${color}`}
      >
        {icon}
      </div>

      <h3 className="text-gray-500">
        {title}
      </h3>

      <p className="mt-2 text-3xl font-bold">
        {value}
      </p>

    </div>
  );
}
