import {
  ShieldCheck,
  Truck,
  Gem,
  HeartHandshake,
} from "lucide-react";
import SectionHeading from "../ui/SectionHeading";
import Container from "../ui/Container";

const features = [
  {
    icon: <Gem size={42} className="text-[#C8A45C]" />,
    title: "Premium Craftsmanship",
    description:
      "Every jewellery piece is carefully crafted with attention to every detail for a luxurious finish.",
  },
  {
    icon: <Truck size={42} className="text-[#C8A45C]" />,
    title: "Fast Delivery",
    description:
      "Secure packaging with fast shipping across India so your order reaches you safely.",
  },
  {
    icon: <ShieldCheck size={42} className="text-[#C8A45C]" />,
    title: "Secure Shopping",
    description:
      "Your payments and personal information are protected with complete security.",
  },
  {
    icon: <HeartHandshake size={42} className="text-[#C8A45C]" />,
    title: "Customer First",
    description:
      "Our priority is delivering an exceptional shopping experience and excellent customer support.",
  },
];

export default function WhyChooseUs() {
  return (
    <section className="py-24 bg-white">

      <Container>

        {/* Heading */}

<SectionHeading
    subtitle="Why Choose Us"
    title="Experience the T&M Difference"
    description="From premium craftsmanship to trusted customer service, every detail is designed to make your jewellery shopping experience memorable."
/>

        {/* Cards */}

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">

          {features.map((feature) => (

            <div
              key={feature.title}
              className="bg-[#faf8f4] rounded-3xl p-8 text-center shadow-sm hover:shadow-2xl hover:-translate-y-2 transition-all duration-500"
            >

              <div className="w-20 h-20 rounded-full bg-white flex items-center justify-center mx-auto shadow-md mb-6">

                {feature.icon}

              </div>

              <h3 className="text-2xl font-semibold text-gray-900">

                {feature.title}

              </h3>

              <p className="mt-4 text-gray-600 leading-7">

                {feature.description}

              </p>

            </div>

          ))}

        </div>

      </Container>

    </section>
  );
}