import Container from "../../ui/Container";
import SectionHeading from "../../ui/SectionHeading";
import CategoryCard from "../../product/CategoryCard";
import categories from "../../data/categories";

export default function CategorySection() {
  return (
    <section className="py-24 bg-[#faf8f4]">
      <Container>
        <SectionHeading
          subtitle="Explore Our Collections"
          title="Shop by Category"
          description="Find your perfect jewellery by exploring our carefully curated collections."
        />

<div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-10">
  {categories.map((category) => (
    <CategoryCard
      key={category.id}
      category={category}
    />
  ))}
</div>
      </Container>
    </section>
  );
}