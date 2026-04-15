import Image from "next/image";
import Link from "next/link";
import { Tags, ArrowRight } from "lucide-react";
import { Badge } from "@/components/ui/badge";


import { getAllBrands } from "@/services/brandApi";

export default async function Brands() {
  const brands = await getAllBrands();

  return (
    <div className="min-h-screen bg-gray-50/50">
      {/* Hero Header */}
      <div className="bg-linear-to-br from-violet-600 via-violet-500 to-purple-400 text-white">
        <div className="container mx-auto px-4 py-12 sm:py-16">
          {/* Breadcrumb */}
          <nav className="flex items-center gap-2 text-sm text-white/70 mb-6">
            <Link href="/" className="hover:text-white transition-colors">
              Home
            </Link>
            <span className="text-white/40">/</span>
            <span className="text-white font-medium">Brands</span>
          </nav>

          {/* Title */}
          <div className="flex items-center gap-5">
            <div className="w-16 h-16 rounded-2xl bg-white/20 backdrop-blur-sm flex items-center justify-center shadow-xl ring-1 ring-white/30">
              <Tags className="text-3xl w-8 h-8" />
            </div>
            <div>
              <h1 className="text-3xl sm:text-4xl font-bold tracking-tight">
                Top Brands
              </h1>
              <p className="text-white/80 mt-1">
                Shop from your favorite brands
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Brands Grid */}
      <div className="container mx-auto px-4 py-10">
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4 sm:gap-5">
          {brands.map((brand) => (
            <Link
              key={brand._id}
              href={`/products?brand=${brand._id}`}
              className="group bg-white rounded-2xl border border-gray-100 p-4 sm:p-5 shadow-sm hover:shadow-xl hover:border-violet-200 transition-all duration-300 hover:-translate-y-1"
            >
              {/* Brand Image */}
              <div className="aspect-square rounded-xl overflow-hidden bg-gray-50 mb-3 p-4 flex items-center justify-center">
                <Image
                  src={brand.image}
                  alt={brand.name}
                  width={120}
                  height={120}
                  className="w-full h-full object-contain group-hover:scale-110 transition-transform duration-500"
                />
              </div>

              {/* Brand Name */}
              <h3 className="font-semibold text-gray-900 text-center text-sm group-hover:text-violet-600 transition-colors truncate">
                {brand.name}
              </h3>

              {/* View Products CTA */}
              <div className="flex justify-center mt-1.5 opacity-0 group-hover:opacity-100 transition-opacity">
                <Badge
                  variant="secondary"
                  className="text-xs text-violet-600 bg-violet-50 hover:bg-violet-100 flex items-center gap-1 cursor-pointer"
                >
                  View Products
                  <ArrowRight className="w-2.5 h-2.5" />
                </Badge>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
