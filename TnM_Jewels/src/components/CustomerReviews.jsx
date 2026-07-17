import { Star, BadgeCheck } from "lucide-react";
import Container from "../ui/Container";
import SectionHeading from "../ui/SectionHeading";
const reviews = [
  {
    id: 1,
    name: "Priya S.",
    review:
      "Absolutely loved the quality! The jewellery looks even more beautiful in person.",
  },
  {
    id: 2,
    name: "Neha K.",
    review:
      "Packaging was premium and delivery was smooth. Will definitely shop again!",
  },
  {
    id: 3,
    name: "Aditi R.",
    review:
      "Looks luxurious, feels premium, and doesn't tarnish. Totally worth it!",
  },
];

export default function CustomerReviews() {
  return (
    <section className="py-24 bg-[#faf8f5]">

      <Container>

        {/* Heading */}

<SectionHeading
    subtitle="Testimonials"
    title="What Our Customers Say"
    description="Every order is packed with care and trusted by customers who love quality jewellery and exceptional service."
/>

        {/* Stats */}

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">

          <div className="bg-white rounded-3xl shadow-sm p-8 text-center">

            <h3 className="text-4xl font-bold text-yellow-600">

              50+

            </h3>

            <p className="mt-3 text-gray-600">

              Orders Delivered

            </p>

          </div>

          <div className="bg-white rounded-3xl shadow-sm p-8 text-center">

            <h3 className="text-4xl font-bold text-yellow-600">

              ★★★★★

            </h3>

            <p className="mt-3 text-gray-600">

              Happy Customers

            </p>

          </div>

          <div className="bg-white rounded-3xl shadow-sm p-8 text-center">

            <h3 className="text-4xl font-bold text-yellow-600">

              Premium

            </h3>

            <p className="mt-3 text-gray-600">

              Anti-Tarnish Quality

            </p>

          </div>

        </div>

        {/* Review Cards */}

        <div className="grid md:grid-cols-3 gap-8">

          {reviews.map((review) => (

            <div
              key={review.id}
              className="bg-white rounded-3xl p-8 shadow-md hover:shadow-2xl hover:-translate-y-2 transition-all duration-500"
            >

              <div className="flex gap-1 text-yellow-500 mb-6">

                {[...Array(5)].map((_, index) => (

                  <Star
                    key={index}
                    size={18}
                    fill="currentColor"
                  />

                ))}

              </div>

              <p className="text-gray-600 leading-8 italic">

                "{review.review}"

              </p>

              <div className="flex items-center justify-between mt-8">

                <div>

                  <h4 className="font-semibold text-gray-900">

                    {review.name}

                  </h4>

                  <p className="text-sm text-gray-500">

                    Verified Customer

                  </p>

                </div>

                <BadgeCheck
                  className="text-green-500"
                  size={26}
                />

              </div>

            </div>

          ))}

        </div>

      </Container>

    </section>
  );
}