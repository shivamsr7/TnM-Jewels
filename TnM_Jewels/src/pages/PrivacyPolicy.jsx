import PolicyLayout from "../components/Policy/PolicyLayout";
import { privacyPolicy } from "../data/privacyPolicy";

export default function PrivacyPolicy() {
  return (
    <PolicyLayout
      title={privacyPolicy.title}
      subtitle={privacyPolicy.subtitle}
      sections={privacyPolicy.sections}
    />
  );
}