export default function Button({
  children,
  variant = "gold",
  size = "lg",
  type = "button",
  disabled = false,
  className = "",
  ...props
}) {
  const base =
    "inline-flex items-center justify-center rounded-full font-semibold transition-all duration-300 hover:-translate-y-1 active:scale-95 disabled:cursor-not-allowed disabled:opacity-60";

  const variants = {
    gold:
      "bg-yellow-600 text-white hover:bg-yellow-700 hover:shadow-xl",

    black:
      "bg-black text-white hover:bg-yellow-600 hover:shadow-xl",

    outline:
      "border-2 border-yellow-600 text-yellow-600 hover:bg-yellow-600 hover:text-white",

    white:
      "bg-white text-black shadow-lg hover:bg-yellow-600 hover:text-white",

    danger:
      "bg-red-500 text-white hover:bg-red-600 hover:shadow-xl",

    success:
      "bg-green-600 text-white hover:bg-green-700 hover:shadow-xl",
  };

  const sizes = {
    sm: "px-4 py-2 text-sm",

    md: "px-6 py-3 text-base",

    lg: "px-8 py-4 text-lg",
  };

  return (
    <button
      type={type}
      disabled={disabled}
      className={`${base} ${variants[variant]} ${sizes[size]} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}