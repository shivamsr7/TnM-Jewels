import { ArrowRight } from "lucide-react";
import Container from "../ui/Container";
import SectionHeading from "../ui/SectionHeading";
import ProductCard from "../product/ProductCard";
import products from "../data/products";

export default function NewArrivals() {
  return (
    <section className="py-24 bg-white">

      <Container>

        {/* Heading */}

<SectionHeading
  subtitle="Latest Collection"
  title="New Arrivals"
  description="Discover the newest additions to our collection, crafted for everyday elegance and timeless style."
/>

        {/* Products */}

<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">

  {products
    .filter(product => product.newArrival)
    .map(product => (

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