import PolicyLayout from "../components/policy/PolicyLayout";
import { shippingPolicy } from "../data/shippingPolicy";

export default function ShippingPolicy() {
  return (
    <PolicyLayout
      title={shippingPolicy.title}
      subtitle={shippingPolicy.subtitle}
      sections={shippingPolicy.sections}
    />
  );
}