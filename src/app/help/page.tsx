import Link from "next/link";
import {
  LifeBuoy,
  ShoppingCart,
  Truck,
  RotateCcw,
  CreditCard,
  UserCircle,
  Package,
  MessageCircle,
  
  ArrowLeft,
  Phone,
  Mail,
  Search,
 
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { HelpCategory } from "@/types/help";

const categories: HelpCategory[] = [
  {
    icon: ShoppingCart,
    title: "Orders",
    description: "Track, modify, or cancel your orders",
    faqs: [
      {
        question: "How do I place an order?",
        answer:
          "Browse our products, add items to your cart, and proceed to checkout. You'll need to provide your shipping address and payment details to complete your order.",
      },
      {
        question: "Can I modify my order after placing it?",
        answer:
          "You can modify your order within 1 hour of placing it. After that, the order enters processing and changes may not be possible. Contact our support team as soon as possible.",
      },
      {
        question: "How do I cancel my order?",
        answer:
          "Go to My Orders in your account, select the order you want to cancel, and click 'Cancel Order'. Cancellations are only possible before the order is shipped.",
      },
      {
        question: "Where can I find my order confirmation?",
        answer:
          "An order confirmation is sent to your registered email address immediately after placing an order. You can also view it in My Orders section of your account.",
      },
    ],
  },
  {
    icon: Truck,
    title: "Shipping & Delivery",
    description: "Delivery times, tracking, and shipping fees",
    faqs: [
      {
        question: "How long does delivery take?",
        answer:
          "Standard delivery takes 3–5 business days. Express delivery (1–2 business days) is available for an additional fee. Delivery times may vary during peak seasons.",
      },
      {
        question: "How do I track my order?",
        answer:
          "Once your order is shipped, you'll receive a tracking number via email. Use this number on the carrier's website or in the tracking section of your account.",
      },
      {
        question: "Do you offer free shipping?",
        answer:
          "Yes! Orders over 500 EGP qualify for free standard shipping. This threshold is calculated after any discounts are applied.",
      },
      {
        question: "Do you ship internationally?",
        answer:
          "Currently, we ship within Egypt only. International shipping is coming soon — stay tuned for updates.",
      },
    ],
  },
  {
    icon: RotateCcw,
    title: "Returns & Refunds",
    description: "Our return policy and refund process",
    faqs: [
      {
        question: "What is your return policy?",
        answer:
          "We accept returns within 14 days of delivery. Items must be unused, in original packaging, and accompanied by the original receipt.",
      },
      {
        question: "How do I initiate a return?",
        answer:
          "Go to My Orders, select the item you wish to return, and click 'Return Item'. Fill out the return form and we'll arrange a pickup or provide a return label.",
      },
      {
        question: "When will I receive my refund?",
        answer:
          "Refunds are processed within 5–7 business days after we receive and inspect the returned item. The amount will be credited back to your original payment method.",
      },
      {
        question: "Are there any non-returnable items?",
        answer:
          "Perishable goods, personalized items, and items marked as final sale cannot be returned. Please check product descriptions before purchasing.",
      },
    ],
  },
  {
    icon: CreditCard,
    title: "Payments",
    description: "Payment methods, billing, and security",
    faqs: [
      {
        question: "What payment methods do you accept?",
        answer:
          "We accept Visa, Mastercard, American Express, and cash on delivery. All online payments are secured with SSL encryption.",
      },
      {
        question: "Is my payment information secure?",
        answer:
          "Absolutely. We use PCI-DSS compliant payment processors and never store your full card details on our servers.",
      },
      {
        question: "Why was my payment declined?",
        answer:
          "Payments can be declined due to incorrect card details, insufficient funds, or your bank's fraud prevention. Double-check your details or contact your bank.",
      },
      {
        question: "Can I use multiple payment methods for one order?",
        answer:
          "Currently, each order supports a single payment method. We're working on adding split-payment options in the future.",
      },
    ],
  },
  {
    icon: UserCircle,
    title: "Account & Profile",
    description: "Manage your account settings and preferences",
    faqs: [
      {
        question: "How do I create an account?",
        answer:
          "Click 'Sign Up' on the top right of our homepage. Fill in your name, email address, and create a password. You'll receive a verification email to activate your account.",
      },
      {
        question: "I forgot my password. What do I do?",
        answer:
          "Click 'Forgot Password' on the login page and enter your email address. We'll send you a link to reset your password within a few minutes.",
      },
      {
        question: "How do I update my personal information?",
        answer:
          "Log in to your account and navigate to Profile Settings. You can update your name, email, phone number, and saved addresses there.",
      },
      {
        question: "How do I delete my account?",
        answer:
          "To delete your account, go to Account Settings and select 'Delete Account'. This action is permanent. Alternatively, contact our support team for assistance.",
      },
    ],
  },
  {
    icon: Package,
    title: "Products",
    description: "Product availability, quality, and information",
    faqs: [
      {
        question: "How do I know if a product is in stock?",
        answer:
          "Product availability is shown on each product page. If an item is out of stock, you can click 'Notify Me' to receive an email when it's back.",
      },
      {
        question: "Are all products genuine?",
        answer:
          "Yes. We source all products from authorized suppliers and brand partners. Every item sold on FreshCart is 100% authentic.",
      },
      {
        question: "How do I report a damaged or incorrect product?",
        answer:
          "Contact our support team within 48 hours of delivery with photos of the damaged or incorrect item. We'll arrange a replacement or full refund promptly.",
      },
      {
        question: "Can I request a product that isn't listed?",
        answer:
          "Yes! Use the 'Product Request' form in your account or email us at products@freshcart.com. We regularly review requests when sourcing new inventory.",
      },
    ],
  },
];

const contactOptions = [
  {
    icon: Phone,
    title: "Call Us",
    detail: "+1 (800) 123-4567",
    sub: "Mon–Fri, 8am–6pm",
    href: "tel:+18001234567",
  },
  {
    icon: Mail,
    title: "Email Us",
    detail: "support@freshcart.com",
    sub: "Response within 24 hours",
    href: "mailto:support@freshcart.com",
  },
  {
    icon: MessageCircle,
    title: "Live Chat",
    detail: "Chat with an agent",
    sub: "Available 24/7",
    href: "#",
  },
];

function CategoryCard({ category }: { category: HelpCategory }) {
  const Icon = category.icon;

  return (
    <Card className="rounded-3xl border border-gray-100 shadow-sm hover:shadow-lg hover:border-primary/20 transition-all duration-300 group">
      <CardContent className="p-6 sm:p-8">
        {/* Header */}
        <div className="flex items-start gap-4 mb-5">
          <div className="w-12 h-12 rounded-2xl bg-linear-to-br from-primary/10 to-primary/5 flex items-center justify-center shrink-0 group-hover:from-primary group-hover:to-primary/80 transition-all duration-300">
            <Icon className="w-5 h-5 text-primary group-hover:text-white transition-colors duration-300" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-gray-900">
              {category.title}
            </h2>
            <p className="text-sm text-muted-foreground">
              {category.description}
            </p>
          </div>
        </div>

        {/* FAQs */}
        <Accordion type="single" collapsible className="w-full">
          {category.faqs.map((faq, i) => (
            <AccordionItem
              key={i}
              value={`${category.title}-${i}`}
              className="border-gray-100"
            >
              <AccordionTrigger className="text-sm font-medium text-gray-800 hover:text-primary text-left">
                {faq.question}
              </AccordionTrigger>
              <AccordionContent className="text-sm text-muted-foreground leading-relaxed">
                {faq.answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </CardContent>
    </Card>
  );
}

export default function HelpCenterContent() {
  return (
    <div className="container mx-auto px-4 py-12">
      {/* Banner */}
      <div className="bg-linear-to-r from-primary/5 to-primary/10 border border-primary/20 rounded-3xl p-6 sm:p-10 mb-12 shadow-sm text-center">
        <div className="w-14 h-14 rounded-2xl bg-primary flex items-center justify-center mx-auto mb-4 shadow-lg shadow-primary/25">
          <LifeBuoy className="w-7 h-7 text-white" />
        </div>
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Help Center</h1>
        <p className="text-muted-foreground mb-6 max-w-xl mx-auto">
          Find answers to common questions or get in touch with our support
          team.
        </p>
        {/* Search */}
        <div className="relative max-w-md mx-auto">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input
            placeholder="Search for answers..."
            className="pl-10 rounded-xl border-gray-200 focus:border-primary"
          />
        </div>
      </div>

      {/* FAQ Categories Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8 mb-16">
        {categories.map((category) => (
          <CategoryCard key={category.title} category={category} />
        ))}
      </div>

      {/* Still need help? */}
      <Separator className="mb-12" />
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">
          Still need help?
        </h2>
        <p className="text-muted-foreground">
          Our support team is ready to assist you.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-12">
        {contactOptions.map(({ icon: Icon, title, detail, sub, href }) => (
          <a
            key={title}
            href={href}
            className="group flex flex-col items-center text-center p-6 rounded-3xl border border-gray-100 bg-white shadow-sm hover:shadow-lg hover:border-primary/20 transition-all duration-300"
          >
            <div className="w-12 h-12 rounded-2xl bg-linear-to-br from-primary/10 to-primary/5 flex items-center justify-center mb-4 group-hover:from-primary group-hover:to-primary/80 transition-all duration-300">
              <Icon className="w-5 h-5 text-primary group-hover:text-white transition-colors duration-300" />
            </div>
            <h3 className="font-semibold text-gray-900 mb-1">{title}</h3>
            <p className="text-sm font-medium text-primary">{detail}</p>
            <p className="text-xs text-muted-foreground mt-0.5">{sub}</p>
          </a>
        ))}
      </div>

      {/* Footer Nav */}
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
            <Link href="/contact">Contact Us →</Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
