import hero from "../assets/hero.png";
import Container from "../ui/Container";

export default function Hero() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-[#fffdf8] to-[#f7f2ea] pt-24 pb-20 lg:min-h-screen flex items-center">
      <Container>
        <div className="grid lg:grid-cols-2 gap-16 items-center">

          {/* Left Content */}
          <div className="text-center lg:text-left">

            <p className="uppercase tracking-[6px] text-yellow-600 font-semibold text-sm">
              Luxury Jewellery
            </p>

            <h1 className="mt-6 text-5xl md:text-6xl lg:text-7xl font-bold leading-tight text-gray-900">
              Timeless
              <br />
              <span className="text-yellow-600">
                Elegance
              </span>
            </h1>

            <p className="mt-6 text-gray-600 text-lg leading-8 max-w-xl mx-auto lg:mx-0">
              Discover handcrafted jewellery designed to celebrate every
              occasion with elegance, premium craftsmanship, and everlasting
              beauty.
            </p>

            <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">

              <button className="bg-yellow-600 hover:bg-yellow-700 transition-all duration-300 hover:scale-105 text-white px-8 py-4 rounded-full font-semibold shadow-lg">
                Shop Now
              </button>

              <button className="border-2 border-yellow-600 text-yellow-600 hover:bg-yellow-600 hover:text-white transition-all duration-300 hover:scale-105 px-8 py-4 rounded-full font-semibold">
                Explore Collection
              </button>

            </div>

          </div>

          {/* Right Image */}
          <div className="relative flex justify-center">

            <div className="absolute w-80 h-80 md:w-[420px] md:h-[420px] rounded-full bg-yellow-100 blur-3xl opacity-70"></div>

            <img
              src={hero}
              alt="T&M Jewels"
              className="relative w-[280px] sm:w-[360px] lg:w-[460px] drop-shadow-2xl"
            />

          </div>

        </div>
      </Container>

      {/* Bottom Wave */}
      <div className="absolute bottom-0 left-0 w-full overflow-hidden leading-none">
        <svg
          viewBox="0 0 1440 120"
          preserveAspectRatio="none"
          className="w-full h-20 fill-white"
        >
          <path d="M0,64L1440,0L1440,120L0,120Z" />
        </svg>
      </div>
    </section>
  );
}