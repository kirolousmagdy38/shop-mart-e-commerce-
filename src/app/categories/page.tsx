import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Layers, ArrowRight } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { getAllCategories } from "@/services/categoriesApi";
import { Category } from "@/types/categories";
import PageHero from "@/components/shared/PageHero";

export default async function CategoriesPage() {
  const categories: Category[] = await getAllCategories();

  return (
    <div className="min-h-screen bg-gray-50/50">
      {/* Header */}
    
      <PageHero
        title="All Categories"
        description="Browse our wide range of product categories"
        icon={<Layers className="w-8 h-8 text-primary-foreground" />}
      />
      {/* Categories Grid */}
      <div className="container mx-auto px-4 py-10">
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 sm:gap-6">
          {categories.map((category) => (
            <Link key={category._id} href={`/categories/${category._id}`}>
              <Card className="group border border-gray-100 shadow-sm hover:shadow-xl hover:border-primary-200 transition-all duration-300 hover:-translate-y-1 rounded-2xl">
                <CardContent className="p-4 sm:p-6">
                  {/* Image */}
                  <div className="aspect-square rounded-xl overflow-hidden bg-gray-50 mb-4">
                    <Image
                      src={category.image}
                      alt={category.name}
                      width={300}
                      height={300}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                  </div>

                  {/* Name */}
                  <h3 className="font-bold text-gray-900 text-center group-hover:text-primary-600 transition-colors">
                    {category.name}
                  </h3>

                  {/* View Subcategories Badge */}
                  <div className="flex justify-center mt-2 opacity-0 group-hover:opacity-100 transition-opacity">
                    <Badge
                      variant="secondary"
                      className="text-xs text-primary-600 bg-primary-50 flex items-center gap-1"
                    >
                      View Subcategories
                      <ArrowRight className="w-2.5 h-2.5" />
                    </Badge>
                  </div>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
