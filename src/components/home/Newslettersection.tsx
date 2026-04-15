"use client";

import { useState } from "react";
import { ArrowRight, Leaf, Truck, Tag, Apple, Smartphone } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function NewsletterSection() {
  const [email, setEmail] = useState("");

  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="relative bg-white rounded-[2rem] border border-gray-200 shadow-xl overflow-hidden">
          {/* Decorative blobs */}
          <div className="absolute top-0 right-0 w-72 h-72 bg-gray-100 rounded-full blur-3xl -translate-y-1/2 translate-x-1/4 pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-56 h-56 bg-gray-100 rounded-full blur-3xl translate-y-1/2 -translate-x-1/4 pointer-events-none" />

          <div className="relative grid lg:grid-cols-5 gap-8 p-8 lg:p-14">
            {/* Newsletter */}
            <div className="lg:col-span-3 space-y-6">
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 bg-black rounded-2xl flex items-center justify-center shadow-lg">
                  <svg
                    className="w-6 h-6 text-white"
                    fill="currentColor"
                    viewBox="0 0 512 512"
                  >
                    <path d="M48 64C21.5 64 0 85.5 0 112c0 15.1 7.1 29.3 19.2 38.4l208 156c17.1 12.8 40.5 12.8 57.6 0l208-156C504.9 141.3 512 127.1 512 112c0-26.5-21.5-48-48-48H48zM0 176v208c0 35.3 28.7 64 64 64h384c35.3 0 64-28.7 64-64V176L344 332.8c-34.1 25.6-81.1 25.6-115.2 0L0 176z" />
                  </svg>
                </div>
                <div>
                  <h3 className="text-sm font-semibold text-black uppercase tracking-wide">
                    Newsletter
                  </h3>
                  <p className="text-xs text-gray-500">50,000+ subscribers</p>
                </div>
              </div>

              <div>
                <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 leading-snug">
                  Get the Freshest Updates{" "}
                  <span className="text-black underline decoration-gray-300">
                    Delivered Free
                  </span>
                </h2>
                <p className="text-gray-500 mt-3 text-lg">
                  Weekly recipes, seasonal offers & exclusive member perks.
                </p>
              </div>

              <div className="flex flex-wrap gap-3">
                {[
                  { icon: Leaf, label: "Fresh Picks Weekly" },
                  { icon: Truck, label: "Free Delivery Codes" },
                  { icon: Tag, label: "Members-Only Deals" },
                ].map((chip) => (
                  <div
                    key={chip.label}
                    className="flex items-center gap-2.5 bg-gray-50 border border-gray-200 px-4 py-2.5 rounded-full shadow-sm"
                  >
                    <div className="w-7 h-7 bg-gray-200 rounded-full flex items-center justify-center">
                      <chip.icon className="w-3.5 h-3.5 text-gray-700" />
                    </div>
                    <span className="text-sm font-medium text-gray-700">
                      {chip.label}
                    </span>
                  </div>
                ))}
              </div>

              <div className="space-y-3 pt-2">
                <div className="flex flex-col sm:flex-row gap-3">
                  <Input
                    type="email"
                    placeholder="you@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="flex-1 h-14 pl-5 border-2 border-gray-200 rounded-2xl text-base focus:border-black focus:ring-4 focus:ring-black/10"
                  />
                  <Button className="h-14 px-8 rounded-2xl bg-black hover:bg-gray-800 text-white font-semibold text-base shadow-lg gap-2 hover:scale-[1.02] transition-transform">
                    Subscribe
                    <ArrowRight className="w-4 h-4" />
                  </Button>
                </div>
                <p className="text-xs text-gray-400 pl-1">
                  ✨ Unsubscribe anytime. No spam, ever.
                </p>
              </div>
            </div>

            {/* App Download */}
            <div className="lg:col-span-2 lg:border-l lg:border-gray-200 lg:pl-8 flex flex-col justify-center">
              <div className="bg-black rounded-3xl p-8 text-white relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full blur-2xl" />
                <div className="absolute bottom-0 left-0 w-24 h-24 bg-white/5 rounded-full blur-2xl" />
                <div className="relative space-y-5">
                  <Badge className="bg-white/10 text-white border border-white/20 hover:bg-white/10">
                    📱 MOBILE APP
                  </Badge>
                  <h3 className="text-2xl font-bold leading-tight">
                    Shop Faster on Our App
                  </h3>
                  <p className="text-gray-400 text-sm leading-relaxed">
                    Get app-exclusive deals & 15% off your first order.
                  </p>
                  <div className="flex flex-col gap-3 pt-2">
                    {[
                      { icon: Apple, top: "Download on", bottom: "App Store" },
                      {
                        icon: Smartphone,
                        top: "Get it on",
                        bottom: "Google Play",
                      },
                    ].map((btn) => (
                      <a
                        key={btn.bottom}
                        href="#"
                        className="flex items-center gap-3 bg-white/10 hover:bg-white/15 border border-white/10 px-4 py-3 rounded-xl transition-all hover:scale-[1.02]"
                      >
                        <btn.icon className="w-5 h-5" />
                        <div>
                          <div className="text-[10px] text-gray-400 uppercase tracking-wide">
                            {btn.top}
                          </div>
                          <div className="text-sm font-semibold">
                            {btn.bottom}
                          </div>
                        </div>
                      </a>
                    ))}
                  </div>
                  <div className="flex items-center gap-2 pt-2 text-sm">
                    <span className="text-yellow-400">★★★★★</span>
                    <span className="text-gray-400">4.9 • 100K+ downloads</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
