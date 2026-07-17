import { NavLink, Outlet } from "react-router-dom";

const tabs = [
  {
    name: "General",
    path: "general",
  },
  {
    name: "Payments",
    path: "payments",
  },
  {
    name: "Notifications",
    path: "notifications",
  },
  {
    name: "SEO",
    path: "seo",
  },
  {
    name: "Maintenance",
    path: "maintenance",
  },
];

export default function SettingsLayout() {
  return (
    <div>

      <h1 className="mb-8 text-3xl font-bold">
        Store Settings
      </h1>

      <div className="mb-8 flex flex-wrap gap-3">

        {tabs.map((tab) => (

          <NavLink
            key={tab.path}
            to={tab.path}
            className={({ isActive }) =>
              `rounded-xl px-5 py-3 font-medium transition ${
                isActive
                  ? "bg-[#C8A45C] text-white"
                  : "bg-white hover:bg-gray-100"
              }`
            }
          >
            {tab.name}
          </NavLink>

        ))}

      </div>

      <Outlet />

    </div>
  );
}