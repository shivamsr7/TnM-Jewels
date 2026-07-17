import { useState } from "react";
import { FaChevronDown, FaChevronUp } from "react-icons/fa";
import { faqs } from "../data/faqData";
import { Link } from "react-router-dom";


export default function FAQ() {

    const [openId, setOpenId] = useState(null);

const toggleFAQ = (id) => {
  setOpenId(openId === id ? null : id);
};
  return (
    <div className="bg-white">

<section className="bg-[#FDF8EF] py-24">

  <div className="max-w-6xl mx-auto px-6 text-center">

    <p className="uppercase tracking-[6px] text-[#C8A45C]">
      FAQ
    </p>

    <h1 className="mt-6 text-6xl font-serif">
      Frequently Asked Questions
    </h1>

    <p className="mt-8 text-gray-600 max-w-3xl mx-auto leading-8">
      Find answers to the most common questions about
      T&M Jewels, our products, shipping, and more.
    </p>

  </div>

</section>
<section className="max-w-5xl mx-auto px-6 py-24">

  <div className="space-y-6">

    {faqs.map((faq) => (

      <div
        key={faq.id}
        className="rounded-3xl border border-gray-200 shadow-sm overflow-hidden"
      >

        <button
          onClick={() => toggleFAQ(faq.id)}
          className="w-full flex items-center justify-between p-6 text-left hover:bg-[#FDF8EF] transition"
        >

          <h3 className="text-lg md:text-xl font-semibold">
            {faq.question}
          </h3>

          {openId === faq.id ? (
            <FaChevronUp className="text-[#C8A45C]" />
          ) : (
            <FaChevronDown className="text-[#C8A45C]" />
          )}

        </button>

        {openId === faq.id && (

          <div className="px-6 pb-6 text-gray-600 leading-8">

            {faq.answer}

          </div>

        )}

      </div>

    ))}

  </div>

</section>
<section className="pb-24">

  <div className="max-w-5xl mx-auto px-6">

    <div className="rounded-[40px] bg-[#FDF8EF] p-12 text-center">

      <h2 className="text-4xl font-serif">
        Still Have Questions?
      </h2>

      <p className="mt-5 text-gray-600">
        Our team is always happy to help.
      </p>

      <Link
        to="/contact"
        className="inline-block mt-8 rounded-full bg-[#C8A45C] px-8 py-4 text-white font-semibold hover:bg-black transition"
      >
        Contact Us
      </Link>

    </div>

  </div>

</section>

 </div>
  );
}