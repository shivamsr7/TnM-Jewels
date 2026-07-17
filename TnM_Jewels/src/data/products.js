import ring1 from "../assets/Collections/rings.jpg";
import ring2 from "../assets/Collections/pendants.jpg";
const products = [

  {
    id: 1,
     slug: "royal-adjustable-ring",
    images: [
    ring1,
    ring2,
  ],

    name: "Royal Adjustable Ring",

    category: "Rings",

    price: 249,

    originalPrice: 499,
    rating: 5,

    reviews: 34,

    badge: "NEW",

    bestSeller: false,

    newArrival: true,
    stock: 2,

    description:
    "Elegant adjustable anti-tarnish ring crafted for everyday wear. Designed to give a premium look while remaining comfortable for daily use.",

  features: [
    "Anti Tarnish",
    "Adjustable",
    "Premium Quality",
    "Skin Friendly"
  ],

  specifications: {
    material: "Brass",
    color: "Gold",
    finish: "Glossy",
    size: "Adjustable",
    weight: "12g",
  },
  relatedProducts: [2, 3, 4],
},
  

  {
    id: 2,
     slug: "royal-adjustable-ring",
    images: [
    "https://placehold.co/600x700",
    "https://placehold.co/600x700",
  ],

    name: "Luxury Bracelet",

    category: "bracelet",

    price: 399,

    originalPrice: 699,

    reviews: 52,

    rating: 5,

    badge: "BEST",

    bestSeller: true,

    newArrival: false,
    stock: 0,

        description:
    "Elegant adjustable anti-tarnish bracelet crafted for everyday wear. Designed to give a premium look while remaining comfortable for daily use.",

  features: [
    "Anti Tarnish",
    "Adjustable",
    "Premium Quality"
  ],

  specifications: {
    material: "Brass",
    color: "Gold",
    finish: "Glossy",
    size: "Adjustable",
    weight: "12g",
  },
  relatedProducts: [3, 4],
  },

  {
    id: 3,
     slug: "royal-adjustable-ring",
    images: [
    "https://placehold.co/600x700",
    "https://placehold.co/600x700",
  ],

    name: "Crystal Pendant",

    category: "pendants",

    price: 299,

    originalPrice: 499,

    rating: 5,

    reviews: 21,

    badge: "NEW",

    bestSeller: false,

    newArrival: true,

    stock: 12,

        description:
    "Elegant adjustable anti-tarnish pendant crafted for everyday wear. Designed to give a premium look while remaining comfortable for daily use.",

  features: [
    "Anti Tarnish",
    "Premium Quality",
    "Skin Friendly"
  ],

  specifications: {
    material: "Brass",
    color: "Gold",
    finish: "Glossy",
    size: "Adjustable",
    weight: "12g",
  },
  relatedProducts: [2, 4],
  },

  {
    id: 4,
     slug: "royal-adjustable-ring",
    images: [
    "https://placehold.co/600x700",
    "https://placehold.co/600x700",
  ],

    name: "Premium Earrings",

    category: "earrings",

    price: 199,

    originalPrice: 399,

    reviews: 67,

    rating: 4,

    badge: "BEST",

    bestSeller: true,

    newArrival: false,

    stock: 12,

        description:
    "Elegant adjustable anti-tarnish earrings crafted for everyday wear. Designed to give a premium look while remaining comfortable for daily use.",

  features: [
    "Adjustable",
    "Premium Quality",
    "Skin Friendly",
  ],

  specifications: {
    material: "Brass",
    color: "Gold",
    finish: "Glossy",
    size: "Adjustable",
    weight: "12g",
  },
  relatedProducts: [2, 3],
  }
];

export default products;