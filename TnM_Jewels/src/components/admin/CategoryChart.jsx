import {
  BarChart,
  Bar,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

export default function CategoryChart({ products }) {
  const categoryData = Object.values(
    products.reduce((acc, product) => {
      if (!acc[product.category]) {
        acc[product.category] = {
          category: product.category,
          count: 0,
        };
      }

      acc[product.category].count++;

      return acc;
    }, {})
  );

  return (
    <div className="rounded-2xl bg-white p-6 shadow">

      <h2 className="mb-5 text-2xl font-bold">
        Products by Category
      </h2>

      <ResponsiveContainer
        width="100%"
        height={320}
      >

        <BarChart data={categoryData}>

          <CartesianGrid strokeDasharray="3 3" />

          <XAxis dataKey="category" />

          <YAxis />

          <Tooltip />

          <Bar
            dataKey="count"
            radius={[8, 8, 0, 0]}
            fill="#C8A45C"
          />

        </BarChart>

      </ResponsiveContainer>

    </div>
  );
}