export default function SectionHeading({
  subtitle,
  title,
  description,
  className = "",
}) {
  return (
    <div className={`text-center mb-16 ${className}`}>

      {subtitle && (
        <p className="uppercase tracking-[5px] text-yellow-600 text-sm font-semibold">
          {subtitle}
        </p>
      )}

      <h2 className="mt-3 text-4xl md:text-5xl font-bold text-gray-900">
        {title}
      </h2>

      {description && (
        <p className="mt-5 max-w-2xl mx-auto text-gray-500 leading-7">
          {description}
        </p>
      )}

    </div>
  );
}