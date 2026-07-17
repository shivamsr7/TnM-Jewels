import PolicyLayout from "../components/policy/PolicyLayout";
import { returnPolicy } from "../data/returnPolicy";

export default function ReturnRefund() {
  return (
    <PolicyLayout
      title={returnPolicy.title}
      subtitle={returnPolicy.subtitle}
      sections={returnPolicy.sections}
    />
  );
}