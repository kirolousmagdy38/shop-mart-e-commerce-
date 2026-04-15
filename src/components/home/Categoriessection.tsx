import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Category } from "@/types/categories";

interface Props {
  categories: Category[];
}

export default function CategoriesSection({ categories }: Props) {
  return (
    <section className="py-12 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4">
          <div className="flex items-center gap-3">
            <div className="h-8 w-1.5 bg-black rounded-full" />
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900">
              Shop By{" "}
              <span className="text-black underline decoration-gray-300">
                Category
              </span>
            </h2>
          </div>
          <Button
            variant="ghost"
            asChild
            className="text-black hover:text-gray-600 hover:bg-gray-100 font-medium gap-2"
          >
            <Link href="/categories">
              View All Categories
              <ArrowRight className="w-4 h-4" />
            </Link>
          </Button>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4">
          {categories.map((cat) => (
            <Link
              key={cat._id}
              href={`/categories/${cat._id}`}
              className="group bg-white rounded-2xl p-4 text-center shadow-sm hover:shadow-md border border-transparent hover:border-gray-200 transition-all duration-200 hover:-translate-y-1"
            >
              <div className="w-20 h-20 overflow-hidden bg-gray-100 group-hover:bg-gray-200 rounded-full flex items-center justify-center mx-auto mb-3 transition-colors">
                <Image
                  src={cat.image}
                  alt={cat.name}
                  width={80}
                  height={80}
                  className="w-full h-full object-cover"
                />
              </div>
              <h3 className="font-medium text-gray-700 text-sm group-hover:text-black transition-colors">
                {cat.name}
              </h3>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
