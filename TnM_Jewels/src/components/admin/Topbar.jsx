export default function Topbar() {
  return (
    <header className="flex h-20 items-center justify-between border-b bg-white px-8">

      <h2 className="text-3xl font-semibold">
        Admin Dashboard
      </h2>

      <div className="flex items-center gap-4">

        <div className="text-right">
          <p className="font-semibold">
            T&M Jewels
          </p>

          <p className="text-sm text-gray-500">
            Administrator
          </p>
        </div>

        <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#C8A45C] text-white font-bold">
          T
        </div>

      </div>

    </header>
  );
}