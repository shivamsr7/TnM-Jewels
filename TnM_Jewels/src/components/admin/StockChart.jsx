import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Tooltip,
  Legend,
} from "recharts";

const COLORS = [
  "#22c55e",
  "#f59e0b",
  "#ef4444",
];

export default function StockChart({ stats }) {

  const data = [
    {
      name: "In Stock",
      value: stats.inStock,
    },
    {
      name: "Low Stock",
      value: stats.lowStock,
    },
    {
      name: "Out of Stock",
      value: stats.outOfStock,
    },
  ];

  return (
    <div className="rounded-2xl bg-white p-6 shadow">

      <h2 className="mb-5 text-2xl font-bold">
        Stock Distribution
      </h2>

      <ResponsiveContainer
        width="100%"
        height={320}
      >

        <PieChart>

          <Pie
            data={data}
            dataKey="value"
            outerRadius={110}
            label
          >
            {data.map((entry, index) => (
              <Cell
                key={index}
                fill={COLORS[index]}
              />
            ))}
          </Pie>

          <Tooltip />

          <Legend />

        </PieChart>

      </ResponsiveContainer>

    </div>
  );
}