import {
  Truck,
  RotateCcw,
  ShieldHalf,
  Headset,
  LucideIcon,
} from "lucide-react";

interface Feature {
  icon: LucideIcon;
  title: string;
  description: string;
}

const features: Feature[] = [
  {
    icon: Truck,
    title: "Free Shipping",
    description: "On orders over 500 EGP",
  },
  {
    icon: RotateCcw,
    title: "Easy Returns",
    description: "14-day return policy",
  },
  {
    icon: ShieldHalf,
    title: "Secure Payment",
    description: "100% secure checkout",
  },
  {
    icon: Headset,
    title: "24/7 Support",
    description: "Contact us anytime",
  },
];

export default function FeatureBanner() {
  return (
    <div className="bg-primary/5 border-y border-primary/10">
      <div className="container mx-auto px-4 py-6">
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map(({ icon: Icon, title, description }) => (
            <div key={title} className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-xl bg-primary flex items-center justify-center shrink-0 text-primary">
                <Icon className="w-5 h-5 text-white" />
              </div>
              <div>
                <h4 className="font-extrabold text-gray-900 text-md">{title}</h4>
                <p className="text-muted-foreground text-xs">{description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
