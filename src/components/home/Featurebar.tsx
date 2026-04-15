import { Truck, Shield, RotateCcw, Headphones } from "lucide-react";

const features = [
  {
    icon: Truck,
    label: "Free Shipping",
    desc: "On orders over 500 EGP",
    color: "text-gray-700",
    bg: "bg-gray-100",
  },
  {
    icon: Shield,
    label: "Secure Payment",
    desc: "100% secure transactions",
    color: "text-gray-700",
    bg: "bg-gray-100",
  },
  {
    icon: RotateCcw,
    label: "Easy Returns",
    desc: "14-day return policy",
    color: "text-gray-700",
    bg: "bg-gray-100",
  },
  {
    icon: Headphones,
    label: "24/7 Support",
    desc: "Dedicated support team",
    color: "text-gray-700",
    bg: "bg-gray-100",
  },
];

export default function FeaturesBar() {
  return (
    <section className="py-8 bg-white border-b border-gray-100">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
          {features.map((f) => (
            <div
              key={f.label}
              className="flex items-center gap-4 p-4 rounded-xl hover:bg-gray-50 transition-colors"
            >
              <div
                className={`${f.bg} ${f.color} w-12 h-12 rounded-full flex items-center justify-center shrink-0`}
              >
                <f.icon className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-semibold text-gray-800 text-sm">
                  {f.label}
                </h3>
                <p className="text-xs text-gray-500">{f.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
