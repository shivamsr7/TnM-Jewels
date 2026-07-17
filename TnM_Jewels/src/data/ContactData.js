import {
  FaEnvelope,
  FaWhatsapp,
  FaInstagram,
  FaClock,
} from "react-icons/fa";

export const contactCards = [
  {
    id: 1,
    icon: FaEnvelope,
    title: "Email",
    value: "support@tnmjewels.com",
    link: "mailto:support@tnmjewels.com",
  },
  {
    id: 2,
    icon: FaWhatsapp,
    title: "WhatsApp",
    value: "+91 98765 43210", // Replace with your number
    link: "https://wa.me/919876543210",
  },
  {
    id: 3,
    icon: FaInstagram,
    title: "Instagram",
    value: "@tnmjewels", // Replace with your username
    link: "https://instagram.com/tnmjewels",
  },
  {
    id: 4,
    icon: FaClock,
    title: "Business Hours",
    value: "Mon - Sat\n10 AM - 8 PM",
    link: null,
  },
];