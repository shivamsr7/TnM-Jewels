import { useState } from "react";
import {
  FaEnvelope,
  FaWhatsapp,
  FaInstagram,
  FaClock,
  FaArrowRight,
} from "react-icons/fa";
import { contactCards } from "../data/ContactData";

export default function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
<div className="bg-white">

<section className="bg-[#FDF8EF] py-24">

<div className="max-w-6xl mx-auto px-6 text-center">

<p className="uppercase tracking-[6px] text-[#C8A45C]">

CONTACT US

</p>

<h1 className="mt-6 text-6xl font-serif">

We're Here To Help

</h1>

<p className="mt-8 max-w-3xl mx-auto text-gray-600 leading-8">

Have questions about our jewellery,
orders or shipping?

Our team is always happy to help.

</p>

</div>

</section>

<section className="max-w-6xl mx-auto px-6 py-20">

  <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">

    {contactCards.map((card) => {
      const Icon = card.icon;

      return (
        <div
          key={card.id}
          className="rounded-3xl border p-8 text-center shadow-sm hover:shadow-xl transition duration-300"
        >
          <Icon
            size={45}
            className="mx-auto text-[#C8A45C]"
          />

          <h3 className="mt-5 text-2xl font-semibold">
            {card.title}
          </h3>

          {card.link ? (
            <a
              href={card.link}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-4 block text-gray-500 hover:text-[#C8A45C] transition whitespace-pre-line"
            >
              {card.value}
            </a>
          ) : (
            <p className="mt-4 text-gray-500 whitespace-pre-line">
              {card.value}
            </p>
          )}
        </div>
      );
    })}

  </div>

</section>
<section className="max-w-5xl mx-auto px-6 pb-24">

<div className="rounded-[40px] border p-10">

<h2 className="text-4xl font-serif text-center">

Send Us A Message

</h2>
<div className="grid md:grid-cols-2 gap-6 mt-10">

<input
type="text"
name="name"
placeholder="Your Name"
value={formData.name}
onChange={handleChange}
className="border rounded-xl p-4"
/>

<input
type="email"
name="email"
placeholder="Email"
value={formData.email}
onChange={handleChange}
className="border rounded-xl p-4"
/>

<input
type="text"
name="phone"
placeholder="Phone Number"
value={formData.phone}
onChange={handleChange}
className="border rounded-xl p-4"
/>

<input
type="text"
placeholder="Subject"
className="border rounded-xl p-4"
/>

</div>
<textarea
rows={6}
name="message"
placeholder="Write your message..."
value={formData.message}
onChange={handleChange}
className="border rounded-xl p-4 mt-6 w-full"
/>
<button
className="mt-8 w-full rounded-full bg-[#C8A45C] py-4 text-white font-semibold hover:bg-black transition flex justify-center items-center gap-3"
>

Send Message

<FaArrowRight />

</button>

</div>

</section>

</div>

);
}