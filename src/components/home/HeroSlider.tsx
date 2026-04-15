"use client";

import { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";

interface Slide {
  heading: string;
  sub: string;
  gradient: string;
  primaryBtn: { label: string; href: string };
  secondaryBtn: { label: string; href: string };
}

const slides: Slide[] = [
  {
    heading: "Fresh Products Delivered to your Door",
    sub: "Get 20% off your first order",
    gradient: "from-black/80 to-black/40",
    primaryBtn: { label: "Shop Now", href: "/products" },
    secondaryBtn: { label: "View Deals", href: "/deals" },
  },
  {
    heading: "Premium Quality Guaranteed",
    sub: "Fresh from farm to your table",
    gradient: "from-black/85 to-black/45",
    primaryBtn: { label: "Shop Now", href: "/products" },
    secondaryBtn: { label: "Learn More", href: "/about" },
  },
  {
    heading: "Fast & Free Delivery",
    sub: "Same day delivery available",
    gradient: "from-black/80 to-black/35",
    primaryBtn: { label: "Order Now", href: "/products" },
    secondaryBtn: { label: "Delivery Info", href: "/delivery" },
  },
];

export default function HeroSlider() {
  const [slide, setSlide] = useState(0);

  useEffect(() => {
    const t = setInterval(() => setSlide((s) => (s + 1) % slides.length), 5000);
    return () => clearInterval(t);
  }, []);

  const prev = () => setSlide((s) => (s - 1 + slides.length) % slides.length);
  const next = () => setSlide((s) => (s + 1) % slides.length);
  const current = slides[slide];

  return (
    <section className="relative h-105 overflow-hidden">
      {slides.map((s, i) => (
        <div
          key={i}
          style={{
            backgroundImage: `url(https://ecommerce.routemisr.com/Route-Academy-products/1680403397402-cover.jpeg)`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
          className={`absolute inset-0 transition-opacity duration-700 ${i === slide ? "opacity-100" : "opacity-0"}`}
        >
          <div className={`absolute inset-0 bg-linear-to-r ${s.gradient}`} />
        </div>
      ))}

      <div className="relative h-full flex items-center px-8 md:px-20">
        <div className="max-w-lg text-white space-y-4">
          <h2 className="text-4xl font-bold leading-tight">
            {current.heading}
          </h2>
          <p className="text-white/80 text-lg">{current.sub}</p>
          <div className="flex gap-3 pt-2">
            <Button
              asChild
              className="bg-white text-black hover:bg-white/90 font-semibold px-6 rounded-xl"
            >
              <a href={current.primaryBtn.href}>{current.primaryBtn.label}</a>
            </Button>
            <Button
              asChild
              variant="outline"
              className="border-white/50 text-white bg-transparent hover:bg-white/10 font-semibold px-6 rounded-xl"
            >
              <a href={current.secondaryBtn.href}>
                {current.secondaryBtn.label}
              </a>
            </Button>
          </div>
        </div>
      </div>

      <button
        onClick={prev}
        className="absolute left-4 top-1/2 -translate-y-1/2 w-11 h-11 rounded-full bg-white/90 hover:bg-white text-black flex items-center justify-center shadow-lg transition-all hover:scale-110"
      >
        <ChevronLeft className="w-5 h-5" />
      </button>
      <button
        onClick={next}
        className="absolute right-4 top-1/2 -translate-y-1/2 w-11 h-11 rounded-full bg-white/90 hover:bg-white text-black flex items-center justify-center shadow-lg transition-all hover:scale-110"
      >
        <ChevronRight className="w-5 h-5" />
      </button>

      <div className="absolute bottom-5 left-1/2 -translate-x-1/2 flex gap-2">
        {slides.map((_, i) => (
          <button
            key={i}
            onClick={() => setSlide(i)}
            className={`h-2 rounded-full transition-all duration-300 ${i === slide ? "bg-white w-6" : "bg-white/50 w-2"}`}
          />
        ))}
      </div>
    </section>
  );
}
