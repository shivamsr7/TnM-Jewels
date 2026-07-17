export default function FormSelect({
  label,
  name,
  value,
  onChange,
  options,
  error = "",
  required = false,
}) {
  return (
    <div className="relative">
      <select
        id={name}
        name={name}
        value={value}
        onChange={onChange}
        className={`w-full rounded-2xl bg-white px-4 py-4 text-sm outline-none transition-all duration-200
  ${
    error
      ? "border border-red-500"
      : "border border-gray-300 focus:border-[#C8A45C] focus:ring-4 focus:ring-[#C8A45C]/20"
  }`}
      >
        <option value="">Select {label}</option>

        {options.map((option) => (
          <option
            key={option}
            value={option}
          >
            {option}
          </option>
        ))}
      </select>
{error && (
  <p className="mt-2 text-sm text-red-500">
    {error}
  </p>
)}
      <label className="absolute left-4 -top-2 bg-white px-1 text-xs text-[#C8A45C]">
        {label}
        {required && (
          <span className="text-red-500"> *</span>
        )}
      </label>
    </div>
  );
}