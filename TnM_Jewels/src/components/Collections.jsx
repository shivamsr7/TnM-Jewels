import necklace from "../assets/collections/necklace.jpg";
import earrings from "../assets/collections/earrings.jpg";
import bracelet from "../assets/collections/bracelet.jpg";
import rings from "../assets/collections/rings.jpg";
import SectionHeading from "../ui/SectionHeading";
import ProductCard from "../product/ProductCard";
import products from "../data/products";

import Container from "../ui/Container";

export default function Collections() {
  return (
    <section className="py-24 bg-white">
      <Container>

        {/* Section Heading */}
        <SectionHeading
    subtitle="Our Collections"
    title="Featured Collections"
    description="Explore our carefully curated jewellery collections designed for every style, every occasion, and every unforgettable moment."
/>

        {/* Collection Cards */}
                <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {products
            .filter((product) => product.bestSeller)
            .map((product) => (
              <ProductCard
                key={product.id}
                product={product}
              />
            ))}
        </div>

      </Container>
    </section>
  );
}