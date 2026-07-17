import React from "react";

export default function PolicyLayout({
  title,
  subtitle,
  sections,
}) {
  return (
    <div className="bg-white">

      {/* Hero */}

      <section className="bg-[#FDF8EF] py-24">

        <div className="max-w-5xl mx-auto px-6 text-center">

          <p className="uppercase tracking-[6px] text-[#C8A45C]">
            T&M JEWELS
          </p>

          <h1 className="mt-6 text-5xl md:text-6xl font-serif">
            {title}
          </h1>

          <p className="mt-8 text-gray-600 leading-8 max-w-3xl mx-auto">
            {subtitle}
          </p>

        </div>

      </section>

      {/* Content */}

      <section className="max-w-5xl mx-auto px-6 py-20">

        <div className="space-y-16">

          {sections.map((section) => (

            <div key={section.heading}>

              <h2 className="text-3xl font-serif">

                {section.heading}

              </h2>

              <p className="mt-5 text-gray-600 leading-8 whitespace-pre-line">

                {section.content}

              </p>

            </div>

          ))}

        </div>

      </section>

    </div>
  );
}