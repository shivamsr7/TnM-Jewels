import { Link } from "react-router-dom";
import {
  FaShieldAlt,
  FaGem,
  FaTruck,
  FaHeart,
  FaInstagram,
  FaArrowRight,
} from "react-icons/fa";
import {
  founders,
  features,
  statistics,
} from "../data/aboutData";

export default function About() {
  return (
    <div className="bg-white">

      {/* Hero Section */}

      <section className="bg-gradient-to-r from-[#FDF8EF] to-[#FFFDF9]">

        <div className="max-w-7xl mx-auto px-6 py-28">

          <div className="text-center">

            <p className="uppercase tracking-[6px] text-[#C8A45C] font-medium">
              ABOUT T&M JEWELS
            </p>

            <h1 className="mt-6 text-5xl md:text-7xl font-serif leading-tight">

              Affordable Luxury.
              <br />
              Everyday Elegance.

            </h1>

            <p className="mt-8 max-w-3xl mx-auto text-lg text-gray-600 leading-8">

              Premium jewellery curated with love,
              designed to elevate your everyday style,
              and crafted to make luxury accessible.

            </p>

            <Link
              to="/shop"
              className="inline-flex items-center gap-3 mt-12 rounded-full bg-[#C8A45C] px-8 py-4 text-white font-semibold hover:bg-black transition"
            >
              Explore Collection
              <FaArrowRight />
            </Link>

          </div>

        </div>

      </section>

      {/* Our Story */}

      <section className="max-w-7xl mx-auto px-6 py-24">

        <div className="grid lg:grid-cols-2 gap-20 items-center">

          <div>

            <img
              src="/images/about.jpg"
              alt="T&M Jewels"
              className="rounded-[30px] shadow-xl"
            />

          </div>

          <div>

            <p className="uppercase tracking-[5px] text-[#C8A45C]">
              OUR STORY
            </p>

            <h2 className="mt-4 text-4xl font-serif">
              Jewellery That
              Speaks Your Style
            </h2>

            <p className="mt-8 text-gray-600 leading-8">

              T&M Jewels was founded by
              <strong> Tanishq Singh </strong>
              and
              <strong> Muskan Singh</strong>,
              two creators with a shared passion for
              fashion, jewellery, and building a brand
              that makes luxury accessible.

            </p>

            <p className="mt-6 text-gray-600 leading-8">

              Every design is handpicked with attention
              to quality, elegance, and affordability.
              Our mission is to offer jewellery that
              looks premium, lasts longer, and makes
              every customer feel confident every day.

            </p>

          </div>

        </div>

      </section>

            {/* Meet the Founders */}

      <section className="bg-[#F9F6F1] py-24">

        <div className="max-w-7xl mx-auto px-6">

          <div className="text-center">

            <p className="uppercase tracking-[5px] text-[#C8A45C]">
              Meet The Founders
            </p>

            <h2 className="mt-4 text-5xl font-serif">
              The Faces Behind T&M Jewels
            </h2>

            <p className="mt-6 max-w-3xl mx-auto text-gray-600 leading-8">

              T&M Jewels is proudly built by two passionate
              creators who believe jewellery should be
              beautiful, affordable, and made to last.

            </p>

          </div>

          <div className="grid md:grid-cols-2 gap-14">

  {founders.map((founder) => (

<div
  key={founder.id}
  className="bg-white rounded-3xl p-8 shadow-lg hover:shadow-2xl transition duration-300 text-center"
>

      <img
  src={founder.image}
  alt={founder.name}
  className="w-56 h-56 rounded-full object-cover mx-auto border-4 border-[#C8A45C] shadow-xl"
/>

      <h3>{founder.name}</h3>

      <p>{founder.role}</p>

      <p>{founder.description}</p>

    </div>

  ))}

</div>

        </div>

      </section>

            {/* Why Choose Us */}

      <section className="py-24">

        <div className="max-w-7xl mx-auto px-6">

          <div className="text-center">

            <p className="uppercase tracking-[5px] text-[#C8A45C]">
              Why Choose Us
            </p>

            <h2 className="mt-4 text-5xl font-serif">

              Luxury Without The Luxury Price

            </h2>

          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">

  {features.map((feature) => {

    const Icon = feature.icon;

    return (

      <div
        key={feature.title}
        className="rounded-3xl border p-8 text-center"
      >

        <Icon
          size={55}
          className="mx-auto text-[#C8A45C]"
        />

        <h3 className="mt-6 text-2xl font-semibold">
          {feature.title}
        </h3>

        <p className="mt-4 text-gray-600">
          {feature.description}
        </p>

      </div>

    );

  })}

</div>

        </div>

      </section>

            {/* Our Mission */}

      <section className="bg-[#FDF8EF] py-24">

        <div className="max-w-5xl mx-auto px-6 text-center">

          <p className="uppercase tracking-[5px] text-[#C8A45C]">
            Our Mission
          </p>

          <h2 className="mt-4 text-5xl font-serif">
            Making Luxury Accessible
          </h2>

          <p className="mt-10 text-lg leading-9 text-gray-600">

            We believe jewellery should make every
            woman feel confident, beautiful and
            celebrated.

            <br /><br />

            That's why every collection is carefully
            curated to combine premium quality,
            timeless designs and affordable pricing.

            <br /><br />

            At T&M Jewels, luxury isn't about the
            price tag—it's about how you feel
            every time you wear it.

          </p>

        </div>

      </section>

            {/* Brand Highlights */}

      <section className="py-24">

        <div className="max-w-7xl mx-auto px-6">

<div className="grid grid-cols-2 md:grid-cols-4 gap-8">

  {statistics.map((item) => (

    <div
      key={item.label}
      className="text-center"
    >

      <h3 className="text-5xl font-bold text-[#C8A45C]">
        {item.value}
      </h3>

      <p className="mt-3 text-gray-600">
        {item.label}
      </p>

    </div>

  ))}

</div>

        </div>

      </section>

            {/* Promise */}

      <section className="bg-[#F9F6F1] py-24">

        <div className="max-w-5xl mx-auto px-6 text-center">

          <h2 className="text-5xl font-serif">

            Our Promise

          </h2>

          <p className="mt-10 text-lg leading-9 text-gray-600">

            Every jewellery piece you receive from
            T&M Jewels is carefully inspected before
            dispatch.

            <br /><br />

            We are committed to offering products
            that match the quality shown online,
            backed by honest customer service and
            transparent communication.

          </p>

        </div>

      </section>

            {/* Instagram */}

      <section className="py-24">

        <div className="max-w-5xl mx-auto px-6">

          <div className="rounded-[40px] bg-gradient-to-r from-[#C8A45C] to-[#E5C98B] p-16 text-center text-white">

            <FaInstagram
              className="mx-auto"
              size={60}
            />

            <h2 className="mt-8 text-5xl font-serif">

              Follow Our Journey

            </h2>

            <p className="mt-6 text-lg max-w-2xl mx-auto">

              Discover our latest collections,
              behind-the-scenes moments,
              styling inspiration,
              exclusive launches,
              and much more.

            </p>

            <a
              href="https://instagram.com/tnmjewels"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block mt-10 rounded-full bg-white px-8 py-4 text-[#C8A45C] font-semibold hover:bg-black hover:text-white transition"
            >
              Follow on Instagram
            </a>

          </div>

        </div>

      </section>

            {/* Final CTA */}

      <section className="pb-24">

        <div className="max-w-6xl mx-auto px-6 text-center">

          <h2 className="text-5xl font-serif">

            Ready To Elevate Your Style?

          </h2>

          <p className="mt-6 text-gray-600 text-lg">

            Explore our premium collection
            and find jewellery you'll love
            wearing every day.

          </p>

          <Link
            to="/shop"
            className="inline-flex items-center gap-3 mt-10 rounded-full bg-[#C8A45C] px-10 py-4 text-white font-semibold hover:bg-black transition"
          >
            Explore Collection

            <FaArrowRight />

          </Link>

        </div>

      </section>

    </div>
  );
}