import supabase from "../config/supabase.js";

// GET ALL PRODUCTS
export const getProducts = async (req, res) => {
  const { data, error } = await supabase
    .from("products")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }

  res.json({
    success: true,
    products: data,
  });
};

// CREATE PRODUCT
export const createProduct = async (req, res) => {
  const {
    name,
    slug,
    description,
    category,
    price,
    original_price,
    stock,
    rating,
    reviews,
    badge,
    best_seller,
    new_arrival,
    images,
    features,
    specifications,
    related_products,
  } = req.body;

  const { data, error } = await supabase
    .from("products")
    .insert([
      {
        name,
        slug,
        description,
        category,
        price,
        original_price,
        stock,
        rating,
        reviews,
        badge,
        best_seller,
        new_arrival,
        images,
        features,
        specifications,
        related_products,
      },
    ])
    .select();
if (
  !name ||
  !slug ||
  !category ||
  !price ||
  !original_price ||
  stock === undefined ||
  !description
) {
  return res.status(400).json({
    success: false,
    message: "Please fill all required fields.",
  });
}
  if (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }

  res.status(201).json({
    success: true,
    product: data[0],
  });
};
export const getProductBySlug = async (req, res) => {
  const { slug } = req.params;

  const { data, error } = await supabase
    .from("products")
    .select("*")
    .eq("slug", slug)
    .single();

  if (error) {
    return res.status(404).json({
      success: false,
      message: "Product not found",
    });
  }

  res.json({
    success: true,
    product: data,
  });
};
export const getProductsByCategory = async (req, res) => {
  const { category } = req.params;
  const { exclude } = req.query;

  let query = supabase
    .from("products")
    .select("*")
    .eq("category", category);

  // Exclude current product by id
  if (exclude) {
    query = query.neq("id", exclude);
  }

 const { data, error } = await supabase
  .from("products")
  .select("*")
  .eq("category", category)
  .neq("id", exclude)
  .order("rating", { ascending: false })
  .limit(4);

  if (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }

  const products = data.map((product) => ({
    ...product,
    originalPrice: product.original_price,
    bestSeller: product.best_seller,
    newArrival: product.new_arrival,
    relatedProducts: product.related_products,
  }));

  res.json({
    success: true,
    products,
  });
};
export const searchProducts = async (req, res) => {
  const { q } = req.query;

  if (!q || q.trim() === "") {
    return res.json({
      success: true,
      products: [],
    });
  }

  const search = q.trim();

  const { data, error } = await supabase
    .from("products")
    .select("*")
    .or(
      `name.ilike.%${search}%,category.ilike.%${search}%,description.ilike.%${search}%`
    )
    .order("rating", { ascending: false });

  if (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }

  const products = data.map((product) => ({
    ...product,
    originalPrice: product.original_price,
    bestSeller: product.best_seller,
    newArrival: product.new_arrival,
    relatedProducts: product.related_products,
  }));

  res.json({
    success: true,
    products,
  });
};
export const getCategories = async (req, res) => {
  const { data, error } = await supabase
    .from("products")
    .select("category");

  if (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }

  // Remove duplicates
  const categories = [
    "All",
    ...new Set(
      data
        .map((item) => item.category)
        .filter(Boolean)
    ),
  ];

  res.json({
    success: true,
    categories,
  });
};
export const checkSlug = async (req, res) => {
  const { slug } = req.params;

  const { data, error } = await supabase
    .from("products")
    .select("id")
    .eq("slug", slug)
    .maybeSingle();

  if (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }

  res.json({
    success: true,
    available: !data,
  });
};
export const getProductById = async (req, res) => {
  const { id } = req.params;

  const { data, error } = await supabase
    .from("products")
    .select("*")
    .eq("id", id)
    .single();

  if (error) {
    return res.status(404).json({
      success: false,
      message: error.message,
    });
  }

  res.json({
    success: true,
    product: data,
  });
};
export const updateProduct = async (req, res) => {
  const { id } = req.params;

  const { data, error } = await supabase
    .from("products")
    .update(req.body)
    .eq("id", id)
    .select()
    .single();

  if (error) {
    return res.status(400).json({
      success: false,
      message: error.message,
    });
  }

  res.json({
    success: true,
    product: data,
  });
};
export const deleteProduct = async (req, res) => {
  const { id } = req.params;

  const { error } = await supabase
    .from("products")
    .delete()
    .eq("id", id);

  if (error) {
    return res.status(400).json({
      success: false,
      message: error.message,
    });
  }

  res.json({
    success: true,
    message: "Product deleted successfully.",
  });
};
export const getDashboardStats = async (req, res) => {
    
  try {
    const { data, error } = await supabase
      .from("products")
      .select("*");

    if (error) {
      return res.status(500).json({
        success: false,
        message: error.message,
      });
    }

    const totalProducts = data.length;

    const inStock = data.filter((p) => p.stock > 0).length;

    const outOfStock = data.filter((p) => p.stock === 0).length;

    const bestSellers = data.filter((p) => p.best_seller).length;
const lowStock = data.filter(
  (product) => product.stock > 0 && product.stock <= 5
).length;
    const latestProducts = [...data]
      .sort(
        (a, b) =>
          new Date(b.created_at) -
          new Date(a.created_at)
      )
      .slice(0, 5);

res.json({
  success: true,
  stats: {
    totalProducts,
    inStock,
    lowStock,
    outOfStock,
    bestSellers,
  },
  latestProducts,
  products: data,
});

  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};