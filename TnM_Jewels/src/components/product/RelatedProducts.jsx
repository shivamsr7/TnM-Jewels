import { useEffect, useState } from "react";
import ProductCard from "../../product/ProductCard";


export default function RelatedProducts({ currentProduct }) {
const [relatedProducts, setRelatedProducts] = useState([]);

useEffect(() => {
  const fetchRelatedProducts = async () => {
    try {
      const response = await fetch(
        `http://localhost:5000/api/products/category/${currentProduct.category}?exclude=${currentProduct.id}`
      );

      const data = await response.json();

      if (data.success) {
        setRelatedProducts(data.products);
      }
    } catch (error) {
      console.error(error);
    }
  };

  if (currentProduct) {
    fetchRelatedProducts();
  }
}, [currentProduct]);

  if (relatedProducts.length === 0) return null;

  return (
    <section className="mt-24">
      <div className="max-w-7xl mx-auto">

        <div className="text-center mb-12">

          <p className="uppercase tracking-[5px] text-[#C8A45C] text-sm">
            You May Also Like
          </p>

          <h2 className="mt-3 text-4xl font-serif">
            Related Products
          </h2>

          <p className="mt-4 text-gray-500">
            Discover more jewellery you'll love.
          </p>

        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">

          {relatedProducts.map((product) => (

<ProductCard
  key={product.id}
  product={product}
/>

          ))}

        </div>

      </div>
    </section>
  );
}