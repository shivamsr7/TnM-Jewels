import { useEffect, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

import heroSlides from "../../data/heroSlides";
import Button from "../../ui/Button";

export default function HeroSlider() {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % heroSlides.length);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const nextSlide = () => {
    setCurrent((prev) => (prev + 1) % heroSlides.length);
  };

  const prevSlide = () => {
    setCurrent(
      (prev) => (prev - 1 + heroSlides.length) % heroSlides.length
    );
  };

  return (
    <section className="relative h-[85vh] overflow-hidden">

      {/* Background */}

      <img
        src={heroSlides[current].image}
        alt={heroSlides[current].title}
        className="absolute inset-0 w-full h-full object-cover transition-all duration-700"
      />

      {/* Overlay */}

      <div className="absolute inset-0 bg-black/40" />

      {/* Content */}

      <div className="relative z-10 h-full max-w-7xl mx-auto px-6 flex items-center">

        <div className="max-w-2xl text-white">

          <p className="uppercase tracking-[6px] text-yellow-400 mb-4">
            T&M Jewels
          </p>

          <h1 className="text-5xl md:text-7xl font-bold leading-tight">
            {heroSlides[current].title}
          </h1>

          <p className="mt-6 text-lg text-gray-200 leading-8">
            {heroSlides[current].subtitle}
          </p>

          <div className="mt-8">
            <Button variant="gold">
              {heroSlides[current].button}
            </Button>
          </div>

        </div>

      </div>

      {/* Left Arrow */}

      <button
        onClick={prevSlide}
        className="absolute left-6 top-1/2 -translate-y-1/2 bg-white/20 backdrop-blur-md w-12 h-12 rounded-full flex items-center justify-center text-white hover:bg-yellow-600 transition"
      >
        <ChevronLeft />
      </button>

      {/* Right Arrow */}

      <button
        onClick={nextSlide}
        className="absolute right-6 top-1/2 -translate-y-1/2 bg-white/20 backdrop-blur-md w-12 h-12 rounded-full flex items-center justify-center text-white hover:bg-yellow-600 transition"
      >
        <ChevronRight />
      </button>

      {/* Dots */}

      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex gap-3">

        {heroSlides.map((_, index) => (

          <button
            key={index}
            onClick={() => setCurrent(index)}
            className={`w-3 h-3 rounded-full transition ${
              current === index
                ? "bg-yellow-500"
                : "bg-white/50"
            }`}
          />

        ))}

      </div>

    </section>
  );
}