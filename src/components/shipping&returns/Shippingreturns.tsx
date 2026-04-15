import { Truck, RotateCcw, ShieldHalf, Check, LucideIcon } from "lucide-react";

interface InfoPanelProps {
  icon: LucideIcon;
  iconBg: string;
  gradientFrom: string;
  gradientTo: string;
  checkColor: string;
  title: string;
  items: string[];
}

const shippingItems = [
  "Free shipping on orders over $50",
  "Standard delivery: 3-5 business days",
  "Express delivery available (1-2 business days)",
  "Track your order in real-time",
];

const returnItems = [
  "30-day hassle-free returns",
  "Full refund or exchange available",
  "Free return shipping on defective items",
  "Easy online return process",
];

function InfoPanel({
  icon: Icon,
  iconBg,
  gradientFrom,
  gradientTo,
  checkColor,
  title,
  items,
}: InfoPanelProps) {
  return (
    <div
      className={`bg-linear-to-br ${gradientFrom} ${gradientTo} rounded-lg p-6`}
    >
      <div className="flex items-center gap-3 mb-4">
        <div
          className={`h-12 w-12 ${iconBg} text-white rounded-full flex items-center justify-center shrink-0`}
        >
          <Icon className="w-5 h-5" />
        </div>
        <h4 className="font-semibold text-gray-900">{title}</h4>
      </div>
      <ul className="space-y-3">
        {items.map((item) => (
          <li
            key={item}
            className="flex items-start gap-2 text-sm text-gray-700"
          >
            <Check className={`w-4 h-4 ${checkColor} mt-0.5 shrink-0`} />
            <span>{item}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default function ShippingReturns() {
  return (
    <div className="p-6">
      <div className="space-y-6">
        {/* Two Info Panels */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <InfoPanel
            icon={Truck}
            iconBg="bg-primary"
            gradientFrom="from-primary/5"
            gradientTo="to-primary/10"
            checkColor="text-primary"
            title="Shipping Information"
            items={shippingItems}
          />
          <InfoPanel
            icon={RotateCcw}
            iconBg="bg-primary"
            gradientFrom="from-primary/5"
            gradientTo="to-primary/10"
            checkColor="text-primary"
            title="Returns & Refunds"
            items={returnItems}
          />
        </div>

        {/* Buyer Protection Banner */}
        <div className="bg-muted/50 rounded-lg p-6 flex items-center gap-4">
          <div className="h-14 w-14 bg-gray-200 text-gray-600 rounded-full flex items-center justify-center shrink-0">
            <ShieldHalf className="w-6 h-6" />
          </div>
          <div>
            <h4 className="font-semibold text-gray-900 mb-1">
              Buyer Protection Guarantee
            </h4>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Get a full refund if your order doesn't arrive or isn't as
              described. We ensure your shopping experience is safe and secure.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
