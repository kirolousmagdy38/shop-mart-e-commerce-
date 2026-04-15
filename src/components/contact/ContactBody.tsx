import {
  Phone,
  Mail,
  MapPin,
  Clock,
  Headset,
  Send,
  CircleHelp,
 
} from "lucide-react";
import { BsInstagram } from "react-icons/bs";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { FaFacebookF, FaLinkedinIn } from "react-icons/fa";
import { RiTwitterXLine } from "react-icons/ri";
import Link from "next/link";



interface InfoCardProps {
  icon: React.ReactNode;
  title: string;
  children: React.ReactNode;
}

function InfoCard({ icon, title, children }: InfoCardProps) {
  return (
    <Card className="rounded-2xl border border-gray-100 shadow-sm">
      <CardContent className="p-6">
        <div className="flex items-start gap-4">
          <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center shrink-0 text-primary">
            {icon}
          </div>
          <div>
            <h3 className="font-semibold text-gray-900 mb-1">{title}</h3>
            {children}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}


function ContactSidebar() {
  const socials = [
    { icon: <FaFacebookF  className="w-4 h-4" />, href: "#", label: "Facebook" },
    { icon: <RiTwitterXLine  className="w-4 h-4" />, href: "#", label: "Twitter" },
    { icon: <BsInstagram  className="w-4 h-4" />, href: "#", label: "Instagram" },
    { icon: <FaLinkedinIn  className="w-4 h-4" />, href: "#", label: "LinkedIn" },
  ];

  return (
    <div className="space-y-6">
      <InfoCard icon={<Phone className="w-5 h-5" />} title="Phone">
        <p className="text-muted-foreground text-sm mb-2">
          Mon–Fri from 8am to 6pm
        </p>
        <Link
          href="tel:+18001234567"
          className="text-primary font-medium hover:underline"
        >
          +1 (800) 123-4567
        </Link>
      </InfoCard>

      <InfoCard icon={<Mail className="w-5 h-5" />} title="Email">
        <p className="text-muted-foreground text-sm mb-2">
          We'll respond within 24 hours
        </p>
        <Link
          href="mailto:support@shopmark.com"
          className="text-primary font-medium hover:underline"
        >
          support@shopmark.com
        </Link>
      </InfoCard>

      <InfoCard icon={<MapPin className="w-5 h-5" />} title="Office">
        <p className="text-muted-foreground text-sm">
          123 Commerce Street
          <br />
          New York, NY 10001
          <br />
          United States
        </p>
      </InfoCard>

      <InfoCard icon={<Clock className="w-5 h-5" />} title="Business Hours">
        <p className="text-muted-foreground text-sm">
          Monday – Friday: 8am – 6pm
          <br />
          Saturday: 9am – 4pm
          <br />
          Sunday: Closed
        </p>
      </InfoCard>

      {/* Social Links */}
      <Card className="rounded-2xl border border-gray-100 shadow-sm">
        <CardContent className="p-6">
          <h3 className="font-semibold text-gray-900 mb-4">Follow Us</h3>
          <div className="flex items-center gap-3">
            {socials.map(({ icon, href, label }) => (
              <Link
                key={label}
                href={href}
                aria-label={label}
                className="w-10 h-10 rounded-full bg-muted flex items-center justify-center text-muted-foreground hover:bg-primary hover:text-primary-foreground transition-colors"
              >
                {icon}
              </Link>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}



export function ContactForm() {
  return (
    <div className="lg:col-span-2 space-y-6">
      {/* Form card */}
      <Card className="rounded-2xl border border-gray-100 shadow-sm">
        <CardContent className="p-6 lg:p-8">
          {/* Header */}
          <div className="flex items-center gap-3 mb-6">
            <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center text-primary">
              <Headset className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-gray-900">
                Send us a Message
              </h2>
              <p className="text-muted-foreground text-sm">
                Fill out the form and we'll get back to you
              </p>
            </div>
          </div>

          {/* Form */}
          <form className="space-y-5">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div className="space-y-2">
                <Label htmlFor="name">Full Name</Label>
                <Input
                  id="name"
                  name="name"
                  type="text"
                  placeholder="John Doe"
                  required
                  className="rounded-xl"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Email Address</Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="john@example.com"
                  required
                  className="rounded-xl"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="subject">Subject</Label>
              <Select name="subject" required>
                <SelectTrigger id="subject" className="rounded-xl">
                  <SelectValue placeholder="Select a subject" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="general">General Inquiry</SelectItem>
                  <SelectItem value="order">Order Support</SelectItem>
                  <SelectItem value="shipping">Shipping Question</SelectItem>
                  <SelectItem value="returns">Returns &amp; Refunds</SelectItem>
                  <SelectItem value="product">Product Information</SelectItem>
                  <SelectItem value="feedback">
                    Feedback &amp; Suggestions
                  </SelectItem>
                  <SelectItem value="other">Other</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="message">Message</Label>
              <Textarea
                id="message"
                name="message"
                placeholder="How can we help you?"
                rows={5}
                required
                className="rounded-xl resize-none"
              />
            </div>

            <Button type="submit" className="w-full md:w-auto rounded-xl px-8">
              <Send className="w-4 h-4 mr-2" />
              Send Message
            </Button>
          </form>
        </CardContent>
      </Card>

      {/* Help Center banner */}
      <div className="bg-primary/5 rounded-2xl p-6 border border-primary/10">
        <div className="flex items-start gap-4">
          <div className="w-12 h-12 rounded-xl bg-white flex items-center justify-center shrink-0 shadow-sm text-primary">
            <CircleHelp className="w-5 h-5" />
          </div>
          <div>
            <h3 className="font-semibold text-gray-900 mb-1">
              Looking for quick answers?
            </h3>
            <p className="text-muted-foreground text-sm mb-3">
              Check out our Help Center for frequently asked questions about
              orders, shipping, returns, and more.
            </p>
            <Link
              href="/help"
              className="text-primary font-medium text-sm hover:underline inline-flex items-center gap-1"
            >
              Visit Help Center →
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}



export default function ContactBody() {
  return (
    <div className="container mx-auto px-4 py-12">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-1">
          <ContactSidebar />
        </div>
        <ContactForm />
      </div>
    </div>
  );
}
