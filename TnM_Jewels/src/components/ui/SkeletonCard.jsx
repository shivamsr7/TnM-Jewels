export default function SkeletonCard() {
  return (
    <div className="overflow-hidden rounded-3xl border border-gray-200 bg-white shadow-sm animate-pulse">
      {/* Image */}
      <div className="h-80 w-full bg-gray-200" />

      {/* Content */}
      <div className="p-5">

        <div className="h-6 w-3/4 rounded bg-gray-200" />

        <div className="mt-4 flex gap-1">
          <div className="h-4 w-4 rounded-full bg-gray-200" />
          <div className="h-4 w-4 rounded-full bg-gray-200" />
          <div className="h-4 w-4 rounded-full bg-gray-200" />
          <div className="h-4 w-4 rounded-full bg-gray-200" />
          <div className="h-4 w-4 rounded-full bg-gray-200" />
        </div>

        <div className="mt-5 h-6 w-1/3 rounded bg-gray-200" />

        <div className="mt-6 h-11 rounded-full bg-gray-200" />

      </div>
    </div>
  );
}