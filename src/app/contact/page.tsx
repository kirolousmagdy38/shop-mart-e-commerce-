import ContactBody from "@/components/contact/ContactBody";

import FeatureBanner from "@/components/contact/FeatureBanner";
import PageHero from "@/components/shared/PageHero";
import { Headset } from "lucide-react";

export default function Contact() {
  return (
    <div>
      <PageHero
        title="Contact Us"
        description="We'd love to hear from you. Get in touch with our team."
        icon={  <Headset className="w-8 h-8 text-primary-foreground" />}
      />
      <ContactBody />
      <FeatureBanner />
    </div>
  );
}
