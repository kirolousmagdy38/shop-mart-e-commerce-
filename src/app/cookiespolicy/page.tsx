import Link from "next/link";
import {
  Cookie,
  Settings,
  BarChart3,
  Target,
  Share2,
  ShieldCheck,
  ToggleLeft,
  Mail,
  ArrowLeft,
  LucideIcon,
  Info,
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";



interface PolicyItem {
  clause: string;
  content: React.ReactNode;
}

interface CookieType {
  name: string;
  badge: string;
  badgeVariant: "default" | "secondary" | "destructive" | "outline";
  description: string;
  examples: string[];
}

interface PolicySection {
  article: number;
  icon: LucideIcon;
  title: string;
  items?: PolicyItem[];
  paragraph?: React.ReactNode;
  cookieTypes?: CookieType[];
}



const cookieTypes: CookieType[] = [
  {
    name: "Strictly Necessary",
    badge: "Always Active",
    badgeVariant: "default",
    description:
      "Essential for the website to function. They cannot be disabled as the site won't work properly without them.",
    examples: [
      "Session authentication",
      "Shopping cart contents",
      "Security tokens",
    ],
  },
  {
    name: "Performance",
    badge: "Optional",
    badgeVariant: "secondary",
    description:
      "Help us understand how visitors interact with our website by collecting and reporting information anonymously.",
    examples: ["Page load times", "Error tracking", "Traffic sources"],
  },
  {
    name: "Functional",
    badge: "Optional",
    badgeVariant: "secondary",
    description:
      "Enable the website to provide enhanced functionality and personalization based on your interaction.",
    examples: ["Language preferences", "Region settings", "Saved addresses"],
  },
  {
    name: "Targeting / Advertising",
    badge: "Optional",
    badgeVariant: "outline",
    description:
      "Set through our site by advertising partners to build a profile of your interests and show you relevant ads.",
    examples: ["Ad personalization", "Remarketing", "Social media pixels"],
  },
];

const sections: PolicySection[] = [
  {
    article: 1,
    icon: Info,
    title: "What Are Cookies?",
    items: [
      {
        clause: "1.1",
        content:
          "Cookies are small text files placed on your device when you visit a website. They are widely used to make websites work efficiently and to provide reporting information.",
      },
      {
        clause: "1.2",
        content:
          "Cookies do not contain any information that personally identifies you, but personal information we store about you may be linked to the information stored in cookies.",
      },
      {
        clause: "1.3",
        content:
          "We use both session cookies (which expire when you close your browser) and persistent cookies (which remain on your device for a set period).",
      },
    ],
  },
  {
    article: 2,
    icon: Cookie,
    title: "Types of Cookies We Use",
    cookieTypes,
  },
  {
    article: 3,
    icon: BarChart3,
    title: "Analytics & Performance",
    items: [
      {
        clause: "3.1",
        content: (
          <>
            We use <strong className="text-gray-800">Google Analytics</strong>{" "}
            to collect anonymised data about how users navigate our site,
            including pages visited and time spent.
          </>
        ),
      },
      {
        clause: "3.2",
        content:
          "Analytics data is aggregated and does not identify individual users. IP addresses are anonymised before storage.",
      },
      {
        clause: "3.3",
        content:
          "You can opt out of Google Analytics tracking at any time by installing the Google Analytics Opt-out Browser Add-on.",
      },
    ],
  },
  {
    article: 4,
    icon: Target,
    title: "Advertising Cookies",
    items: [
      {
        clause: "4.1",
        content:
          "We partner with third-party ad networks to display relevant advertisements on other websites after you visit ours.",
      },
      {
        clause: "4.2",
        content:
          "These partners may use cookies to collect information about your browsing activities across websites.",
      },
      {
        clause: "4.3",
        content:
          "You can opt out of interest-based advertising through the Digital Advertising Alliance or the Network Advertising Initiative.",
      },
    ],
  },
  {
    article: 5,
    icon: Share2,
    title: "Third-Party Cookies",
    items: [
      {
        clause: "5.1",
        content:
          "Some pages on our site embed content from third-party platforms such as YouTube, Google Maps, and social media widgets.",
      },
      {
        clause: "5.2",
        content:
          "These third parties may set their own cookies when you interact with their embedded content. We have no control over these cookies.",
      },
      {
        clause: "5.3",
        content:
          "Please refer to the respective privacy policies of these third parties for information on how they use cookies.",
      },
    ],
  },
  {
    article: 6,
    icon: ToggleLeft,
    title: "Managing Your Cookie Preferences",
    items: [
      {
        clause: "6.1",
        content:
          "You can manage non-essential cookies at any time by clicking the 'Cookie Settings' button in the footer of our website.",
      },
      {
        clause: "6.2",
        content: (
          <>
            Most browsers allow you to refuse or accept cookies through their
            settings. Visit{" "}
            <a
              href="https://www.allaboutcookies.org"
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary font-medium hover:underline"
            >
              allaboutcookies.org
            </a>{" "}
            for browser-specific instructions.
          </>
        ),
      },
      {
        clause: "6.3",
        content:
          "Please note that disabling certain cookies may affect the functionality and performance of our website.",
      },
      {
        clause: "6.4",
        content:
          "Clearing your browser cookies will reset your cookie preferences and you will be asked to re-consent on your next visit.",
      },
    ],
  },
  {
    article: 7,
    icon: ShieldCheck,
    title: "Cookie Retention Periods",
    items: [
      {
        clause: "7.1",
        content:
          "Session cookies: Deleted automatically when you close your browser.",
      },
      {
        clause: "7.2",
        content:
          "Authentication cookies: Retained for up to 30 days or until you log out.",
      },
      {
        clause: "7.3",
        content: "Preference cookies: Retained for up to 12 months.",
      },
      {
        clause: "7.4",
        content: "Analytics cookies: Retained for up to 24 months.",
      },
      {
        clause: "7.5",
        content: "Advertising cookies: Retained for up to 90 days.",
      },
    ],
  },
  {
    article: 8,
    icon: Settings,
    title: "Changes to This Policy",
    paragraph:
      "We may update this Cookie Policy from time to time to reflect changes in technology, legislation, or our data practices. We will notify you of significant changes by posting a prominent notice on our website or by sending you an email.",
  },
  {
    article: 9,
    icon: Mail,
    title: "Contact Us",
    paragraph: (
      <>
        If you have any questions about our use of cookies, please contact our
        Data Protection Officer at{" "}
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



function CookieTypeCard({ ct }: { ct: CookieType }) {
  return (
    <div className="bg-muted/40 rounded-xl p-4 border border-gray-100">
      <div className="flex items-center justify-between mb-2">
        <span className="font-semibold text-sm text-gray-900">{ct.name}</span>
        <Badge variant={ct.badgeVariant} className="text-xs">
          {ct.badge}
        </Badge>
      </div>
      <p className="text-xs text-muted-foreground mb-3 leading-relaxed">
        {ct.description}
      </p>
      <div className="flex flex-wrap gap-1.5">
        {ct.examples.map((ex) => (
          <span
            key={ex}
            className="text-xs bg-white border border-gray-200 text-gray-600 px-2 py-0.5 rounded-md"
          >
            {ex}
          </span>
        ))}
      </div>
    </div>
  );
}

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

        {/* Cookie types grid */}
        {section.cookieTypes && (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {section.cookieTypes.map((ct) => (
              <CookieTypeCard key={ct.name} ct={ct} />
            ))}
          </div>
        )}

        {/* Clause items */}
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



export default function CookiePolicy() {
  return (
    <div className="container mx-auto px-4 py-12">
      {/* Banner */}
      <div className="bg-linear-to-r from-orange-50 to-amber-50/50 border border-orange-200 rounded-3xl p-6 sm:p-8 mb-12 shadow-sm">
        <div className="flex items-start gap-4">
          <div className="w-12 h-12 rounded-2xl bg-orange-500 flex items-center justify-center shrink-0 shadow-lg shadow-orange-500/25">
            <Cookie className="w-5 h-5 text-white" />
          </div>
          <div>
            <h2 className="text-lg font-bold text-orange-900 mb-2">
              Cookie Policy
            </h2>
            <p className="text-orange-800 leading-relaxed">
              This policy explains how FreshCart uses cookies and similar
              tracking technologies on our website. We are committed to being
              transparent about how we collect and use data related to your
              browsing experience.
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
          <div className="flex gap-3">
            <Button
              variant="outline"
              className="rounded-xl px-6 py-3 h-auto"
              asChild
            >
              <Link href="/privacy">Privacy Policy</Link>
            </Button>
            <Button
              className="rounded-xl px-6 py-3 h-auto shadow-lg shadow-primary/25"
              asChild
            >
              <Link href="/terms">Terms of Service →</Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
