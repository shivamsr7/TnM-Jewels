import products from "../data/products";
import supabase from "../services/supabase";
import { useState } from "react";

export default function AdminImport() {
  const [loading, setLoading] = useState(false);

  const uploadProducts = async () => {
    setLoading(true);

    for (const product of products) {
      const { error } = await supabase.from("products").upsert({
        name: product.name,
        slug: product.slug,
        description: product.description,
        category: product.category,
        price: product.price,
        original_price: product.originalPrice,
        stock: product.stock,
        rating: product.rating,
        reviews: product.reviews,
        badge: product.badge,
        best_seller: product.bestSeller,
        new_arrival: product.newArrival,
        images: product.images,
        features: product.features,
        specifications: product.specifications,
        related_products: product.relatedProducts,
      });

      if (error) {
        console.error(error);
      } else {
        console.log(`${product.name} uploaded`);
      }
    }

    setLoading(false);

    alert("Products Imported Successfully!");
  };

  return (
    <div className="min-h-screen flex items-center justify-center">
      <button
        onClick={uploadProducts}
        disabled={loading}
        className="rounded-full bg-black px-8 py-4 text-white"
      >
        {loading ? "Uploading..." : "Import Products"}
      </button>
    </div>
  );
}