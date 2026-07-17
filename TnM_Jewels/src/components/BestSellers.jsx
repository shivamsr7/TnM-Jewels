import Container from "../ui/Container";
import SectionHeading from "../ui/SectionHeading";
import ProductCard from "../product/ProductCard";
import products from "../data/products";

export default function BestSellers() {
  return (
    <section className="py-24 bg-[#faf8f4]">
      <Container>
        <SectionHeading
          subtitle="Customer Favorites"
          title="Best Sellers"
          description="Explore our most-loved jewellery pieces chosen by hundreds of happy customers for their timeless style and premium quality."
        />

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