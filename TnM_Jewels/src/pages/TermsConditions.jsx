import PolicyLayout from "../components/policy/PolicyLayout";
import { termsPolicy } from "../data/termsPolicy";

export default function TermsConditions() {
  return (
    <PolicyLayout
      title={termsPolicy.title}
      subtitle={termsPolicy.subtitle}
      sections={termsPolicy.sections}
    />
  );
}