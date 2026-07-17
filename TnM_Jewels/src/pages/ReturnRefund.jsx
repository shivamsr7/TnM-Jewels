import PolicyLayout from "../components/Policy/PolicyLayout";
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