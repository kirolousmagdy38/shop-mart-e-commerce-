import { Card, CardContent } from "@/components/ui/card";
import { ArrowLeft, ArrowRight, FolderOpen } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import {
  getSpecificCategory,
  getSubcategories,
} from "@/services/categoriesApi";
import PageHero from "@/components/shared/PageHero";

interface Props {
  params: Promise<{ categoryId: string }>;
}

export default async function CategoryPage({ params }: Props) {
  const { categoryId } = await params;

  const [category, subcategories] = await Promise.all([
    getSpecificCategory(categoryId),
    getSubcategories(categoryId),
  ]);

  return (
    <div className="min-h-screen bg-gray-50/50">
      {/* Header */}
      <PageHero
        title={category.name}
        description="Choose a subcategory to browse products"
        icon={
          <Image
            src={category.image}
            alt={category.name}
            width={48}
            height={48}
            className="w-12 h-12 object-contain"
          />
        }
      />

      {/* Content */}
      <div className="container mx-auto px-4 py-10">
        {/* Back Button */}
        <Link
          href="/categories"
          className="inline-flex items-center gap-2 text-gray-600 hover:text-primary-600 transition-colors mb-6"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Categories</span>
        </Link>

        {/* Subcategories Count */}
        <div className="mb-6">
          <h2 className="text-lg font-bold text-gray-900">
            {subcategories.length} Subcategories in {category.name}
          </h2>
        </div>

        {/* Subcategories Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
          {subcategories.map((subcategory) => (
            <Link
              key={subcategory._id}
              href={`/products?subcategory=${subcategory._id}`}
            >
              <Card className="group border border-gray-100 shadow-sm hover:shadow-xl hover:border-primary-200 transition-all duration-300 hover:-translate-y-1 rounded-2xl h-full">
                <CardContent className="p-6">
                  {/* Icon */}
                  <div className="w-14 h-14 rounded-xl bg-primary-50 flex items-center justify-center mb-4 group-hover:bg-primary-100 transition-colors">
                    <FolderOpen className="w-6 h-6 text-primary-600" />
                  </div>

                  {/* Name */}
                  <h3 className="font-bold text-gray-900 text-lg group-hover:text-primary-600 transition-colors mb-2">
                    {subcategory.name}
                  </h3>

                  {/* Browse Products */}
                  <div className="flex items-center gap-2 text-sm text-primary-600 opacity-0 group-hover:opacity-100 transition-opacity">
                    <span>Browse Products</span>
                    <ArrowRight className="w-3 h-3" />
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
