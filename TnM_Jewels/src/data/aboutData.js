import tanishq from "../assets/about/Tanishq1.jpg";
import muskan from "../assets/about/Muskan.jpg";

import {
  FaShieldAlt,
  FaGem,
  FaTruck,
  FaHeart,
} from "react-icons/fa";

export const founders = [
  {
    id: 1,
    name: "Tanishq Singh",
    role: "Co-Founder",
    image: tanishq,
    description:
      "Passionate about fashion, branding and building a jewellery brand that blends premium quality with affordability.",
  },
  {
    id: 2,
    name: "Muskan Singh",
    role: "Co-Founder",
    image: muskan,
    description:
      "Focused on customer experience, product curation and ensuring every jewellery piece reflects elegance and trust.",
  },
];

export const features = [
  {
    icon: FaShieldAlt,
    title: "Premium Quality",
    description: "Carefully selected jewellery with exceptional quality.",
  },
  {
    icon: FaGem,
    title: "Anti Tarnish",
    description: "Designed for everyday elegance and durability.",
  },
  {
    icon: FaTruck,
    title: "Worldwide Shipping",
    description: "Safe and reliable delivery worldwide.",
  },
  {
    icon: FaHeart,
    title: "Customer First",
    description: "Your satisfaction is always our priority.",
  },
];

export const statistics = [
  {
    value: "50+",
    label: "Happy Customers",
  },
  {
    value: "100+",
    label: "Premium Designs",
  },
  {
    value: "100%",
    label: "Quality Checked",
  },
  {
    value: "24×7",
    label: "Customer Support",
  },
];