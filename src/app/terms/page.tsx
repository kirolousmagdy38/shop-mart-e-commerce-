import Link from "next/link";
import {
  FileText,
  Handshake,
  UserCheck,
  IdCard,
  CreditCard,
  Truck,
  RotateCcw,
  Scale,
  Mail,
  ArrowLeft,
 
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { PolicySection } from "@/types/legal";
import PageHero from "@/components/shared/PageHero";
import { FaFileContract } from "react-icons/fa";

const sections: PolicySection[] = [
  {
    article: 1,
    icon: Handshake,
    title: "Acceptance of Terms",
    items: [
      {
        clause: "1.1",
        content:
          "By accessing or using the Service, you acknowledge that you have read, understood, and agree to be bound by these Terms.",
      },
      {
        clause: "1.2",
        content:
          "If you do not agree to these Terms, you must not access or use the Service.",
      },
      {
        clause: "1.3",
        content:
          "We reserve the right to modify these Terms at any time, and such modifications shall be effective immediately upon posting.",
      },
    ],
  },
  {
    article: 2,
    icon: UserCheck,
    title: "User Eligibility",
    items: [
      {
        clause: "2.1",
        content:
          "The Service is intended for users who are at least eighteen (18) years of age.",
      },
      {
        clause: "2.2",
        content:
          "By using the Service, you represent and warrant that you are of legal age to form a binding contract.",
      },
      {
        clause: "2.3",
        content:
          "If you are accessing the Service on behalf of a legal entity, you represent that you have the authority to bind such entity.",
      },
    ],
  },
  {
    article: 3,
    icon: IdCard,
    title: "Account Registration",
    items: [
      {
        clause: "3.1",
        content:
          "You may be required to create an account to access certain features of the Service.",
      },
      {
        clause: "3.2",
        content:
          "You agree to provide accurate, current, and complete information during registration.",
      },
      {
        clause: "3.3",
        content:
          "You are solely responsible for maintaining the confidentiality of your account credentials.",
      },
      {
        clause: "3.4",
        content:
          "You agree to notify us immediately of any unauthorized use of your account.",
      },
    ],
  },
  {
    article: 4,
    icon: CreditCard,
    title: "Orders and Payments",
    items: [
      {
        clause: "4.1",
        content:
          "All orders placed through the Service are subject to acceptance and availability.",
      },
      {
        clause: "4.2",
        content:
          "Prices are subject to change without notice prior to order confirmation.",
      },
      {
        clause: "4.3",
        content:
          "Payment must be made in full at the time of purchase through approved payment methods.",
      },
      {
        clause: "4.4",
        content:
          "We reserve the right to refuse or cancel any order at our sole discretion.",
      },
    ],
  },
  {
    article: 5,
    icon: Truck,
    title: "Shipping and Delivery",
    items: [
      {
        clause: "5.1",
        content: "Shipping times are estimates only and are not guaranteed.",
      },
      {
        clause: "5.2",
        content:
          "Risk of loss and title for items purchased pass to you upon delivery to the carrier.",
      },
      {
        clause: "5.3",
        content:
          "We are not responsible for delays caused by carriers, customs, or other factors beyond our control.",
      },
    ],
  },
  {
    article: 6,
    icon: RotateCcw,
    title: "Returns and Refunds",
    items: [
      {
        clause: "6.1",
        content:
          "Our return policy allows returns within 14 days of delivery for most items.",
      },
      {
        clause: "6.2",
        content: "Products must be unused and in original packaging.",
      },
      {
        clause: "6.3",
        content:
          "Refunds will be processed within 5-7 business days after receiving the returned item.",
      },
    ],
  },
  {
    article: 7,
    icon: Scale,
    title: "Limitation of Liability",
    paragraph:
      "To the maximum extent permitted by applicable law, FreshCart shall not be liable for any indirect, incidental, special, consequential, or punitive damages, or any loss of profits or revenues, whether incurred directly or indirectly.",
  },
  {
    article: 8,
    icon: Mail,
    title: "Contact Us",
    paragraph: (
      <>
        If you have any questions about these Terms, please contact us at{" "}
        <a
          href="mailto:support@freshcart.com"
          className="text-primary font-semibold hover:underline"
        >
          support@freshcart.com
        </a>
      </>
    ),
  },
];

function SectionCard({ section }: { section: PolicySection }) {
  const Icon = section.icon;

  return (
    <Card className="rounded-3xl border border-gray-100 shadow-sm hover:shadow-lg hover:border-primary/20 transition-all duration-300 group">
      <CardContent className="p-6 sm:p-8">
        {/* Header */}
        <div className="flex items-start gap-4 mb-5">
          <div className="w-12 h-12 rounded-2xl bg-linear-to-br from-primary/10 to-primary/5 flex items-center justify-center shrink-0 group-hover:from-primary group-hover:to-primary/80 transition-all duration-300">
            <Icon className="w-5 h-5 text-primary group-hover:text-white transition-colors duration-300" />
          </div>
          <div>
            <span className="text-xs font-bold text-primary uppercase tracking-wider">
              Article {section.article}
            </span>
            <h2 className="text-xl font-bold text-gray-900">{section.title}</h2>
          </div>
        </div>

        {/* Items */}
        {section.items && (
          <div className="space-y-3">
            {section.items.map(({ clause, content }) => (
              <div
                key={clause}
                className="flex items-start gap-3 text-gray-600 leading-relaxed"
              >
                <span className="text-xs font-bold text-primary bg-primary/5 px-2 py-0.5 rounded-md mt-0.5 shrink-0">
                  {clause}
                </span>
                <p className="text-sm">{content}</p>
              </div>
            ))}
          </div>
        )}

        {/* Paragraph */}
        {section.paragraph && (
          <p className="text-sm text-gray-600 leading-relaxed">
            {section.paragraph}
          </p>
        )}
      </CardContent>
    </Card>
  );
}

export default function Terms() {
  return (
    <>
      <PageHero
        title="Terms of Service"
        description="Last updated: February 2026"
        icon={<FaFileContract className="w-8 h-8 text-primary-foreground" />}
      />
      <div className="container mx-auto px-4 py-12">
        {/* Banner */}
        <div className="bg-linear-to-r from-amber-50 to-amber-100/50 border border-amber-200 rounded-3xl p-6 sm:p-8 mb-12 shadow-sm">
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 rounded-2xl bg-amber-500 flex items-center justify-center shrink-0 shadow-lg shadow-amber-500/25">
              <FileText className="w-5 h-5 text-white" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-amber-900 mb-2">
                Important Notice
              </h2>
              <p className="text-amber-800 leading-relaxed">
                By accessing and using FreshCart, you accept and agree to be
                bound by the terms and provisions of this agreement. Please read
                these terms carefully before using our services.
              </p>
            </div>
          </div>
        </div>

        {/* Sections Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8">
          {sections.map((section) => (
            <SectionCard key={section.article} section={section} />
          ))}
        </div>

        {/* Footer Nav */}
        <div className="mt-12 pt-8">
          <Separator className="mb-8" />
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <Button
              variant="secondary"
              className="rounded-xl px-6 py-3 h-auto"
              asChild
            >
              <Link href="/">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Home
              </Link>
            </Button>
            <Button
              className="rounded-xl px-6 py-3 h-auto shadow-lg shadow-primary/25"
              asChild
            >
              <Link href="/privacy">
                View Privacy Policy
                <span className="ml-2 text-lg">→</span>
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </>
  );
}
