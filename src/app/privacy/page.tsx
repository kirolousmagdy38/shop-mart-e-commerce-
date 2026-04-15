import Link from "next/link";
import {
  ShieldHalf,
  Database,
  UserCheck,
  Lock,
  Share2,
  Cookie,
  Clock,
  Mail,
  ArrowLeft,
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import PageHero from "@/components/shared/PageHero";
import { FaShieldAlt } from "react-icons/fa";
import { PolicySection } from "@/types/legal";

const sections: PolicySection[] = [
  {
    article: 1,
    icon: Database,
    title: "Information We Collect",
    items: [
      {
        clause: "1.1",
        content: (
          <>
            <strong className="text-gray-800">Personal Data: </strong>Name,
            email address, phone number, and shipping address.
          </>
        ),
      },
      {
        clause: "1.2",
        content: (
          <>
            <strong className="text-gray-800">Payment Data: </strong>Credit card
            information processed securely through our payment providers.
          </>
        ),
      },
      {
        clause: "1.3",
        content: (
          <>
            <strong className="text-gray-800">Technical Data: </strong>IP
            address, browser type, device information, and access times.
          </>
        ),
      },
      {
        clause: "1.4",
        content: (
          <>
            <strong className="text-gray-800">Usage Data: </strong>Pages viewed,
            products browsed, and actions taken within our platform.
          </>
        ),
      },
    ],
  },
  {
    article: 2,
    icon: UserCheck,
    title: "How We Use Your Information",
    items: [
      { clause: "2.1", content: "To process and fulfill your orders." },
      {
        clause: "2.2",
        content: "To send order confirmations and shipping updates.",
      },
      {
        clause: "2.3",
        content: "To provide customer support and respond to inquiries.",
      },
      {
        clause: "2.4",
        content: "To improve our products, services, and user experience.",
      },
      {
        clause: "2.5",
        content: "To send promotional communications (with your consent).",
      },
    ],
  },
  {
    article: 3,
    icon: Lock,
    title: "Data Protection",
    items: [
      {
        clause: "3.1",
        content:
          "We implement industry-standard encryption (SSL/TLS) for all data transfers.",
      },
      {
        clause: "3.2",
        content:
          "Payment information is processed by PCI-compliant payment providers.",
      },
      {
        clause: "3.3",
        content:
          "We conduct regular security audits and vulnerability assessments.",
      },
      {
        clause: "3.4",
        content:
          "Access to personal data is restricted to authorized personnel only.",
      },
    ],
  },
  {
    article: 4,
    icon: Share2,
    title: "Information Sharing",
    items: [
      {
        clause: "4.1",
        content:
          "We do not sell, trade, or rent your personal information to third parties.",
      },
      {
        clause: "4.2",
        content:
          "We may share data with trusted service providers who assist in our operations.",
      },
      {
        clause: "4.3",
        content:
          "We may disclose information when required by law or to protect our rights.",
      },
    ],
  },
  {
    article: 5,
    icon: UserCheck,
    title: "Your Rights",
    items: [
      {
        clause: "5.1",
        content: (
          <>
            <strong className="text-gray-800">Access: </strong>Request a copy of
            your personal data.
          </>
        ),
      },
      {
        clause: "5.2",
        content: (
          <>
            <strong className="text-gray-800">Rectification: </strong>Request
            correction of inaccurate data.
          </>
        ),
      },
      {
        clause: "5.3",
        content: (
          <>
            <strong className="text-gray-800">Erasure: </strong>Request deletion
            of your personal data.
          </>
        ),
      },
      {
        clause: "5.4",
        content: (
          <>
            <strong className="text-gray-800">Portability: </strong>Request your
            data in a portable format.
          </>
        ),
      },
      {
        clause: "5.5",
        content: (
          <>
            <strong className="text-gray-800">Opt-out: </strong>Unsubscribe from
            marketing communications at any time.
          </>
        ),
      },
    ],
  },
  {
    article: 6,
    icon: Cookie,
    title: "Cookies",
    items: [
      {
        clause: "6.1",
        content:
          "We use cookies to enhance your browsing experience and remember preferences.",
      },
      {
        clause: "6.2",
        content:
          "You can control cookie settings through your browser preferences.",
      },
      {
        clause: "6.3",
        content:
          "Disabling cookies may affect the functionality of certain features.",
      },
    ],
  },
  {
    article: 7,
    icon: Clock,
    title: "Data Retention",
    paragraph:
      "We retain your personal information only for as long as necessary to fulfill the purposes outlined in this policy, or as required by law. Account data is deleted within 30 days of account closure upon request.",
  },
  {
    article: 8,
    icon: Mail,
    title: "Contact Us",
    paragraph: (
      <>
        For questions about this Privacy Policy or to exercise your rights,
        contact our Data Protection Officer at{" "}
        <a
          href="mailto:privacy@freshcart.com"
          className="text-primary font-semibold hover:underline"
        >
          privacy@freshcart.com
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

export default function PrivacyPolicyContent() {
  return (
    <>
      <PageHero
        title="Privacy Policy"
        description="Last updated: February 2026"
        icon={<FaShieldAlt className="w-8 h-8 text-primary-foreground" />}
      />
      <div className="container mx-auto px-4 py-12">
        {/* Banner */}
        <div className="bg-linear-to-r from-primary/5 to-primary/10 border border-primary/20 rounded-3xl p-6 sm:p-8 mb-12 shadow-sm">
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 rounded-2xl bg-primary flex items-center justify-center shrink-0 shadow-lg shadow-primary/25">
              <ShieldHalf className="w-5 h-5 text-white" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-primary mb-2">
                Your Privacy Matters
              </h2>
              <p className="text-primary/80 leading-relaxed">
                This Privacy Policy describes how FreshCart collects, uses, and
                protects your personal information when you use our services. We
                are committed to ensuring that your privacy is protected.
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
              <Link href="/terms">
                View Terms of Service
                <span className="ml-2 text-lg">→</span>
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </>
  );
}
