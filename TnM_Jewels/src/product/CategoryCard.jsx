import { FaArrowRight } from "react-icons/fa";

export default function CategoryCard({ category }) {
  return (
    <div className="group h-[460px] bg-white rounded-[32px] overflow-hidden shadow-md hover:shadow-[0_25px_60px_rgba(0,0,0,0.18)] transition-all duration-500 hover:-translate-y-3 cursor-pointer">

      {/* Image */}

      <div className="overflow-hidden h-[320px]">

        <img
          src={category.image}
          alt={category.name}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
        />

      </div>

      {/* Bottom Section */}

      <div className="relative bg-white pt-12 pb-10 px-8 text-center">

        {/* Category Icon */}

        <div className="absolute -top-8 left-1/2 -translate-x-1/2">

          <div className="w-16 h-16 rounded-full bg-white shadow-xl flex items-center justify-center">

            <img
              src={category.icon}
              alt={category.name}
              className="w-8 h-8 object-contain"
            />

          </div>

        </div>

        {/* Title */}

        <h3 className="text-3xl font-serif text-gray-900">

          {category.name}

        </h3>

        {/* Gold Line */}

        <div className="mx-auto mt-4 h-[2px] w-0 bg-[#C8A45C] transition-all duration-500 group-hover:w-20" />

        {/* Button */}

        <button className="mt-5 flex items-center justify-center gap-2 mx-auto uppercase tracking-[3px] text-sm text-[#C8A45C]">

          Shop Collection

          <FaArrowRight className="transition-transform duration-300 group-hover:translate-x-2" />

        </button>

      </div>

    </div>
  );
}