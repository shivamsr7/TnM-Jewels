import { NavLink } from "react-router-dom";
import {
  FaBoxOpen,
  FaShoppingCart,
  FaUsers,
  FaCog,
  FaChartPie,
} from "react-icons/fa";
import { FaShoppingBag } from "react-icons/fa";
export default function Sidebar() {
  const menus = [
    {
      name: "Dashboard",
      icon: <FaChartPie />,
      path: "/admin",
    },
    {
      name: "Products",
      icon: <FaBoxOpen />,
      path: "/admin/products",
    },
    {
      name: "Orders",
      icon: <FaShoppingCart />,
      path: "/admin/orders",
    },
    {
      name: "Customers",
      icon: <FaUsers />,
      path: "/admin/customers",
    },
    {
      name: "Settings",
      icon: <FaCog />,
      path: "/admin/settings",
    },
  ];

  return (
    <aside className="w-72 bg-[#111827] text-white flex flex-col">
      <div className="p-8 border-b border-white/10">
        <h1 className="text-2xl font-bold">
          T&M Admin
        </h1>

        <p className="text-sm text-gray-400 mt-1">
          Jewellery Dashboard
        </p>
      </div>

      <nav className="flex-1 p-4 space-y-2">
        {menus.map((menu) => (
          <NavLink
  key={menu.path}
  to={menu.path}
  end={menu.path === "/admin"}
  className={({ isActive }) =>
    `flex items-center gap-3 rounded-xl px-4 py-3 transition ${
      isActive
        ? "bg-[#C8A45C] text-white"
        : "hover:bg-white/10"
    }`
  }
>
  {menu.icon}
  {menu.name}
</NavLink>
        ))}
      </nav>
    </aside>
  );
}