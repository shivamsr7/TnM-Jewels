import { FaInstagram } from "react-icons/fa";
import Container from "../ui/Container";
import SectionHeading from "../ui/SectionHeading";
const images = [
  "https://placehold.co/600x600",
  "https://placehold.co/600x600",
  "https://placehold.co/600x600",
  "https://placehold.co/600x600",
  "https://placehold.co/600x600",
  "https://placehold.co/600x600",
];

export default function InstagramGallery() {
  return (
    <section className="py-24 bg-white">

      <Container>

        {/* Heading */}

<SectionHeading
    subtitle="Follow Us"
    title="Shop Our Instagram"
    description="Discover styling inspiration, our newest launches, customer favourites, and behind-the-scenes moments from T&M Jewels."
/>

        {/* Gallery */}

        <div className="grid grid-cols-2 md:grid-cols-3 gap-6">

          {images.map((image, index) => (

            <div
              key={index}
              className="group relative overflow-hidden rounded-3xl shadow-md hover:shadow-2xl transition-all duration-500 cursor-pointer"
            >

              <img
                src={image}
                alt={`Instagram ${index + 1}`}
                className="w-full aspect-square object-cover transition-transform duration-700 group-hover:scale-110"
              />

              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-all duration-300 flex items-center justify-center">

                <FaInstagram className="text-white text-4xl opacity-0 group-hover:opacity-100 transition-all duration-300" />

              </div>

            </div>

          ))}

        </div>

        {/* CTA */}

        <div className="text-center mt-16">

          <a
            href="https://www.instagram.com/tnm_jewels?igsh=MXU2cGNxcTAxZHFrOA=="
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-3 bg-black text-white px-8 py-4 rounded-full font-semibold hover:bg-yellow-600 hover:-translate-y-1 hover:shadow-xl transition-all duration-300"
          >

            <FaInstagram className="text-xl" />

            Follow @tnm_jewels

          </a>

        </div>

      </Container>

    </section>
  );
}