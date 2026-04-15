import Link from "next/link";

import { Phone, Mail, MapPin, CreditCard } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { RiTwitterXLine } from "react-icons/ri";
import { FaFacebookF, FaYoutube } from "react-icons/fa";
import { BsInstagram } from "react-icons/bs";

interface FooterLink {
  label: string;
  href: string;
}

interface FooterSection {
  title: string;
  links: FooterLink[];
}

interface SocialLink {
  label: string;
  href: string;
  icon: React.ReactNode;
  hoverColor: string;
}

interface PaymentMethod {
  label: string;
}

const FOOTER_SECTIONS: FooterSection[] = [
  {
    title: "Shop",
    links: [
      { label: "All Products", href: "/products" },
      { label: "Categories", href: "/categories" },
      { label: "Brands", href: "/brands" },
      {
        label: "Electronics",
        href: "/products?category=6439d58a0049ad0b52b9003f",
      },
      {
        label: "Men's Fashion",
        href: "/products?category=6439d2d167d9aa4ca970649f",
      },
      {
        label: "Women's Fashion",
        href: "/products?category=6439d5b90049ad0b52b90048",
      },
    ],
  },
  {
    title: "Account",
    links: [
      { label: "My Account", href: "/profile" },
      { label: "Order History", href: "/profile/orders" },
      { label: "Wishlist", href: "/wishlist" },
      { label: "Shopping Cart", href: "/cart" },
      { label: "Sign In", href: "/login" },
      { label: "Create Account", href: "/register" },
    ],
  },
  {
    title: "Support",
    links: [
      { label: "Contact Us", href: "/contact" },
      { label: "Help Center", href: "/help" },
      { label: "Shipping Info", href: "/shipping" },
      { label: "Returns & Refunds", href: "/returns" },
      { label: "Track Order", href: "/track-order" },
    ],
  },
  {
    title: "Legal",
    links: [
      { label: "Privacy Policy", href: "/privacy" },
      { label: "Terms of Service", href: "/terms" },
      { label: "Cookie Policy", href: "/cookiespolicy" },
    ],
  },
];

const SOCIAL_LINKS: SocialLink[] = [
  {
    label: "Facebook",
    href: "#",
    icon: <FaFacebookF size={16} />,
    hoverColor: "hover:bg-blue-600",
  },
  {
    label: "Twitter",
    href: "#",
    icon: <RiTwitterXLine size={16} />,
    hoverColor: "hover:bg-sky-400",
  },
  {
    label: "Instagram",
    href: "#",
    icon: <BsInstagram size={16} />,
    hoverColor: "hover:bg-pink-500",
  },
  {
    label: "YouTube",
    href: "#",
    icon: <FaYoutube size={16} />,
    hoverColor: "hover:bg-red-600",
  },
];

const PAYMENT_METHODS: PaymentMethod[] = [
  { label: "Visa" },
  { label: "Mastercard" },
  { label: "PayPal" },
];

const CURRENT_YEAR = new Date().getFullYear();

function FooterLinkList({ section }: { section: FooterSection }) {
  return (
    <div className="lg:col-span-2">
      <h3 className="font-semibold text-lg mb-5">{section.title}</h3>
      <ul className="space-y-3">
        {section.links.map((link) => (
          <li key={link.href}>
            <Link
              href={link.href}
              className="text-gray-400 hover:text-white transition-colors text-sm"
            >
              {link.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

function SocialLinks() {
  return (
    <div className="flex items-center gap-3">
      {SOCIAL_LINKS.map((link) => (
        <Link
          key={link.label}
          href={link.href}
          aria-label={link.label}
          className={`
            w-10 h-10 flex items-center justify-center rounded-full 
            bg-gray-800 text-white transition-colors duration-300
            ${link.hoverColor}
          `}
        >
          {link.icon}
        </Link>
      ))}
    </div>
  );
}

function PaymentMethods() {
  return (
    <div className="flex items-center gap-4">
      {PAYMENT_METHODS.map((method) => (
        <div
          key={method.label}
          className="flex items-center gap-2 text-gray-500 text-sm"
        >
          <CreditCard className="size-4" />
          <span>{method.label}</span>
        </div>
      ))}
    </div>
  );
}



export default function Footer() {
  return (
    <footer id="footer" className="bg-gray-900 text-white">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8 lg:gap-12">
          {/* Brand Column */}
          <div className="lg:col-span-4">
            <Link href="/" className="inline-block mb-6">
              <div className="text-3xl font-extrabold text-white rounded-lg px-4 py-2 inline-block">
                ShopMart
              </div>
            </Link>

            <p className="text-gray-400 mb-6 text-sm leading-relaxed">
              FreshCart is your one-stop destination for quality products. From
              fashion to electronics, we bring you the best brands at
              competitive prices with a seamless shopping experience.
            </p>

            {/* Contact Info */}
            <div className="space-y-3 mb-6">
              <Link
                href="tel:+18001234567"
                className="flex items-center gap-3 text-gray-400 hover:text-white transition-colors text-sm"
              >
                <Phone className="size-4 text-white shrink-0" />
                <span>+1 (800) 123-4567</span>
              </Link>

              <Link
                href="mailto:support@freshcart.com"
                className="flex items-center gap-3 text-gray-400 hover:text-white transition-colors text-sm"
              >
                <Mail className="size-4 text-white shrink-0" />
                <span>support@freshcart.com</span>
              </Link>

              <div className="flex items-start gap-3 text-gray-400 text-sm">
                <MapPin className="size-4 text-white shrink-0 mt-0.5" />
                <span>123 Commerce Street, New York, NY 10001</span>
              </div>
            </div>

            <SocialLinks />
          </div>

          {/* Link Sections */}
          {FOOTER_SECTIONS.map((section) => (
            <FooterLinkList key={section.title} section={section} />
          ))}
        </div>
      </div>

      {/* Bottom Bar */}
      <Separator className="bg-gray-800" />
      <div className="container mx-auto px-4 py-6">
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-gray-500 text-sm text-center md:text-left">
            © {CURRENT_YEAR} FreshCart. All rights reserved.
          </p>
          <PaymentMethods />
        </div>
      </div>
    </footer>
  );
}
