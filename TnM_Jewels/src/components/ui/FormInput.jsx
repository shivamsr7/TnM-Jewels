export default function FormInput({
  label,
  name,
  value,
  onChange,
  error = "",
  type = "text",
  required = false,
}) {
  return (
    <div>
      <div className="relative">
        <input
          id={name}
          name={name}
          type={type}
          value={value}
          onChange={onChange}
          placeholder=" "
          className={`peer w-full rounded-2xl border bg-white px-4 pt-6 pb-2 text-sm outline-none transition-all duration-200
            ${
              error
                ? "border-red-500"
                : "border-gray-300 focus:border-[#C8A45C] focus:ring-4 focus:ring-[#C8A45C]/20"
            }`}
        />

        <label
          htmlFor={name}
          className="pointer-events-none absolute left-4 top-4 origin-[0] bg-white px-1 text-gray-500 transition-all duration-200
          peer-placeholder-shown:translate-y-0
          peer-placeholder-shown:scale-100
          peer-focus:-translate-y-4
          peer-focus:scale-75
          -translate-y-4 scale-75"
        >
          {label}

          {required && (
            <span className="text-red-500"> *</span>
          )}
        </label>
      </div>

      {error && (
        <p className="mt-2 text-sm text-red-500">
          {error}
        </p>
      )}
    </div>
  );
}